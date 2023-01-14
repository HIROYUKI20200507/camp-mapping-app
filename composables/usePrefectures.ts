export const getPrefectureData = () => {
  const runtimeConfig = useRuntimeConfig();
  const fetchPrefectureList = ref([
    {
      id: 0 as number,
      name: "" as string,
    },
  ]);
  const inputPref = reactive({
    name: "" as string,
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

    fetchPrefectureList.value = res.map((r: any, i: number) => {
      return {
        id: i,
        name: r.prefName,
      };
    });
  };

  const fetchGeocode = async () => {
    const _urlGeocode = "https://maps.googleapis.com/maps/api/geocode/json?";

    const { data: prefData } = await useFetch(
      `${_urlGeocode}key=${runtimeConfig.public.googleGeoCodingApiKey}&address=${inputPref}&components=country:JP`
    );

    console.log({ prefData });
  };

  return { fetchPrefectures, fetchPrefectureList, fetchGeocode, inputPref };
};
