interface PlaceData {
  id: number;
  name: string;
  score: number;
  types: string[];
  userRatingsTotal: number;
}

interface PlaceState {
  placesList: PlaceData[];
  inputTextStr: string;
}

export const usePlaceStore = () => {
  const state = useState<PlaceState>("place_state", () => ({
    placesList: [{ id: 0, name: "", score: 0, types: [], userRatingsTotal: 0 }],
    inputTextStr: "",
  }));
  return {
    state: readonly(state),
    updatePlacesList: updatePlacesList(state),
    updateInputText: updateInputText(state),
    fetchPlaces: fetchPlaces(state),
  };
};

const updatePlacesList = (state: Ref<PlaceState>) => {
  return (val: PlaceData[]) => (state.value.placesList = val);
};

const updateInputText = (state: Ref<PlaceState>) => {
  return (val: string) => (state.value.inputTextStr = val);
};

/**
 * @param location 緯度経度
 * @param options 検索オプション
 */

const fetchPlaces = (state: Ref<PlaceState>) => {
  return async (location: { lat: number; lng: number }, options = {}) => {
    const runtimeConfig = useRuntimeConfig();
    const _urlPlaces = "/google/api/place/nearbysearch/json?";

    /**
     * URL: https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyCypvMi7AHOli0500OtlLOXU8XoP5OG9Ow&location=35.6987769,139.76471&radius=300&language=ja&keyword=公園OR広場OR駅
     * 必須パラメータ
     * key: APIキー
     * location: 場所情報を取得するための緯度/経度
     * radius: 場所の結果を返す距離（メートル単位）を定義します。最大許容半径は50000メートルです
     */
    const { data: resPlaces } = await useFetch(
      `${_urlPlaces}key=${runtimeConfig.public.googleApiKey}&location=${location.lat},${location.lng}&keyword=${state.value.inputTextStr}&radius=50000&language=ja&types=cafe`
    );

    /** FIXME: 一旦anyで型定義 */
    const res = (resPlaces.value as any).results;

    state.value.placesList = res.map((r: any, i: number) => {
      return {
        id: i,
        name: r.name,
        score: r.rating,
        types: r.types,
        userRatingsTotal: r.user_ratings_total,
      };
    });
  };
};
