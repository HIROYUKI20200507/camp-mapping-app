type FetchPlacesList = {
  id: number;
  name: string;
  score: number;
  types: string[];
  userRatingsTotal: number;
}[];

export const usePlaceData = () => {
  const runtimeConfig = useRuntimeConfig();
  const fetchPlacesList = ref<FetchPlacesList>([
    {
      id: 0,
      name: "sample",
      score: 5,
      types: ["food"],
      userRatingsTotal: 10,
    },
  ]);
  const inputTextStr = ref("");

  const fetchPlaces = async (options = {}) => {
    const _urlPlaces = "/google/api/place/nearbysearch/json?";

    /**
     * URL: https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCypvMi7AHOli0500OtlLOXU8XoP5OG9Ow&location=35.6987769,139.76471&radius=300&language=ja&keyword=公園OR広場OR駅
     * 必須パラメータ
     * key: APIキー
     * location: 場所情報を取得するための緯度/経度
     * radius: 場所の結果を返す距離（メートル単位）を定義します。最大許容半径は50000メートルです
     */
    const { data: resPlaces } = await useFetch(
      `${_urlPlaces}key=${runtimeConfig.public.googleApiKey}&location=${}&keyword=${inputTextStr.value}&radius=300&language=ja`
    );

    /** FIXME: 一旦anyで型定義 */
    const res = (resPlaces.value as any).results;

    fetchPlacesList.value = res.map((r: any, i: number) => {
      return {
        id: i,
        name: r.name,
        score: r.rating,
        types: r.types,
        userRatingsTotal: r.user_ratings_total,
      };
    });
  };

  const fetchPlaceMapData = async () => {
    const _urlGeocode =
      "https://maps.googleapis.com/maps/api/geocode/json?address=緯度経度情報を調べたい住所components=country:JP&key=（ご自身で取得した）APIキー";
  };

  return { fetchPlacesList, fetchPlaces, inputTextStr };
};
