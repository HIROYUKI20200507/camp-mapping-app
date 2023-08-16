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

const updatePref = (state: Ref<PrefectureState>) => {
  return (val: InputPrefecture) => (state.value.inputPref = val);
};

const updateCity = (state: Ref<PrefectureState>) => {
  return (val: InputCity) => (state.value.inputCity = val);
};

const fetchPrefectures = (state: Ref<PrefectureState>) => {
  return async () => {
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

    state.value.fetchPrefectureList = newVal;
  };
};

const fetchCities = (state: Ref<PrefectureState>) => {
  return async () => {
    const { data: cityData } = await useFetch("/api/city", {
      method: "POST",
      body: {
        prefId: `${state.value.inputPref.id}`,
      },
    });

    const { result } = await (cityData.value as any);

    const newVal = result.map(
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

    state.value.fetchCitiesList = newVal;
  };
};

const fetchGeocode = (state: Ref<PrefectureState>) => {
  return async () => {
    const { data: prefData } = await useFetch("/api/geocode", {
      method: "POST",
      body: {
        address: `${state.value.inputPref.name}${state.value.inputCity.name}`,
      },
    });

    const { lat, lng } = (prefData.value as any).results[0].geometry.location;

    state.value.selectedPrefLocation = { lat, lng };
  };
};
