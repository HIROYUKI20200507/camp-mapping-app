type FetchPrefectureList = {
  id: number;
  name: string;
}[];

export const getPrefectureData = () => {
  const runtimeConfig = useRuntimeConfig();
  const fetchPrefectureList = ref<FetchPrefectureList>([]);

  const fetchPrefectures = async () => {
    const _urlPrefectures =
      "https://opendata.resas-portal.go.jp/api/v1/prefectures";

    /**
     * FYI; https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
     * 必須パラメータ
     * key: APIキー
     */
    const { data: resPrefectures, refresh } = await useFetch(_urlPrefectures, {
      headers: { "X-API-KEY": runtimeConfig.public.resasApiKey },
    });

    /** FIXME: 一旦anyで型定義 */
    const res = await (resPrefectures.value as any).result;
    fetchPrefectureList.value = res.map((r: any, i: number) => {
      return {
        id: i,
        name: r.name,
      };
    });
  };
  return { fetchPrefectures, fetchPrefectureList };
};
