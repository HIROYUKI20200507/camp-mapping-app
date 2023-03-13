interface CityData {
  id: number;
  name: string;
}

interface PrefectureData {
  id: number;
  name: string;
}

interface SelectedPrefectureLocation {
  lat: number;
  lng: number;
}

interface InputPrefecture {
  id: number;
  name: string;
}

interface InputCity {
  id: number;
  name: string;
}

type PrefectureState = {
  fetchPrefectureList: PrefectureData[];
  fetchCitiesList: CityData[];
  inputPref: InputPrefecture;
  inputCity: InputCity;
  selectedPrefLocation: SelectedPrefectureLocation;
};

export const usePrefectureStore = () => {
  const state = useState<PrefectureState>("prefecture_state", () => ({
    fetchPrefectureList: [{ id: 0, name: "" }],
    fetchCitiesList: [{ id: 0, name: "" }],
    inputPref: { id: 0, name: "" },
    inputCity: { id: 0, name: "" },
    selectedPrefLocation: {
      lat: 0,
      lng: 0,
    },
  }));
  return {
    state: readonly(state),
    fetchPrefectures: fetchPrefectures(state),
    fetchCities: fetchCities(state),
    fetchGeocode: fetchGeocode(state),
    updatePref: updatePref(state),
    updateCity: updateCity(state),
  };
};

const updatePref = (state: Ref<PrefectureState>) => (val: InputPrefecture) => {
  return () => (state.value.inputPref = val);
};

const updateCity = (state: Ref<PrefectureState>) => (val: InputCity) => {
  return () => (state.value.inputCity = val);
};

const fetchPrefectures = async (state: Ref<PrefectureState>) => {
  const runtimeConfig = useRuntimeConfig();
  const _urlPrefectures =
    "https://opendata.resas-portal.go.jp/api/v1/prefectures";

  /**
   * FYI; https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
   * 必須パラメータ
   * key: APIキー
   */
  const { data: resPrefectures } = await useFetch(_urlPrefectures, {
    headers: { "X-API-KEY": runtimeConfig.public.resasApiKey },
  });

  /** FIXME: 一旦anyで型定義 */
  const res = await (resPrefectures.value as any).result;

  const newVal = res.map((r: { prefCode: number; prefName: string }) => {
    return {
      id: r.prefCode,
      name: r.prefName,
    };
  });

  /**
   * 2023/3/12(日)メモ
   * TODO:
   * 1. useStateを利用した書き方に変更する
   * 2. 都道府県が更新されない問題を解決する
   * 3. 市区町村の方をuseStateを利用した書き方にする
   */
  return () => (state.value.fetchPrefectureList = newVal);
};

const fetchCities = async (state: Ref<PrefectureState>) => {
  const runtimeConfig = useRuntimeConfig();
  const _urlCities = `https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=`;

  const { data: resCities } = await useFetch(
    `${_urlCities}${state.value.inputPref.id}`,
    {
      headers: { "X-API-KEY": runtimeConfig.public.resasApiKey },
    }
  );

  /** FIXME: 一旦anyで型定義 */
  const res = await (resCities.value as any).result;

  const newVal = res.map(
    (r: {
      prefCode: number;
      cityCode: string;
      cityName: string;
      bigCityFlag: string;
    }) => {
      return {
        id: r.cityCode,
        name: r.cityName,
      };
    }
  );

  return () => (state.value.fetchCitiesList = newVal);
};

const fetchGeocode = async (state: Ref<PrefectureState>) => {
  const runtimeConfig = useRuntimeConfig();
  const _urlGeocode = "https://maps.googleapis.com/maps/api/geocode/json?";

  const { data: prefData } = await useFetch(
    `${_urlGeocode}key=${runtimeConfig.public.googleGeoCodingApiKey}&address=${state.value.inputPref.name}${state.value.inputCity.name}&components=country:JP`
  );

  const { lat, lng } = (prefData.value as any).results[0].geometry.location;

  return () => (state.value.selectedPrefLocation = { lat, lng });
};
