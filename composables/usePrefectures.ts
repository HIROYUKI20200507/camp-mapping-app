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

interface PrefectureDataResponse {
  result: Array<{
    prefCode: number;
    prefName: string;
  }>;
}

interface CityDataResponse {
  result: Array<{
    prefCode: number;
    cityCode: string;
    cityName: string;
    bigCityFlag: string;
  }>;
}

export const getPrefectureData = () => {
  const runtimeConfig = useRuntimeConfig();

  const fetchPrefectureList: Ref<PrefectureData[]> = ref([{ id: 0, name: "" }]);
  const fetchCitiesList: Ref<CityData[]> = ref([{ id: 0, name: "" }]);
  const inputPref: InputPrefecture = reactive({ id: 0, name: "" });
  const inputCity: InputCity = reactive({ id: 0, name: "" });
  const selectedPrefLocation: SelectedPrefectureLocation = reactive({
    lat: 0,
    lng: 0,
  });

  const fetchPrefectures = async () => {
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

    fetchPrefectureList.value = res.map(
      (r: { prefCode: number; prefName: string }) => {
        return {
          id: r.prefCode,
          name: r.prefName,
        };
      }
    );
  };

  const fetchCities = async () => {
    const _urlCities = `https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=`;

    const { data: resCities } = await useFetch(`${_urlCities}${inputPref.id}`, {
      headers: { "X-API-KEY": runtimeConfig.public.resasApiKey },
    });

    /** FIXME: 一旦anyで型定義 */
    const res = await (resCities.value as any).result;

    fetchCitiesList.value = res.map(
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
  };

  const fetchGeocode = async () => {
    const _urlGeocode = "https://maps.googleapis.com/maps/api/geocode/json?";

    const { data: prefData } = await useFetch(
      `${_urlGeocode}key=${runtimeConfig.public.googleGeoCodingApiKey}&address=${inputPref.name}&components=country:JP`
    );

    const { lat, lng } = (prefData.value as any).results[0].geometry.location;
    selectedPrefLocation.lat = lat;
    selectedPrefLocation.lng = lng;
  };

  return {
    fetchPrefectures,
    fetchPrefectureList,
    fetchCities,
    fetchCitiesList,
    fetchGeocode,
    inputPref,
    inputCity,
    selectedPrefLocation,
  };
};
