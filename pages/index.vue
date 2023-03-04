<script setup lang="ts">
import IconSelect from "~~/components/Basic/IconSelect.vue";
import InputText from "~~/components/Basic/InputText.vue";
import Card from "~/Components/Basic/Card.vue";

const { fetchPlaces, fetchPlacesList, inputTextStr } = usePlaceData();
const {
  fetchPrefectures,
  fetchPrefectureList,
  inputPref,
  fetchGeocode,
  selectedPrefLocation,
} = getPrefectureData();

fetchPrefectures();

const onSubmit = async () => {
  await fetchPlaces(selectedPrefLocation);
};

const inputText = (val: string) => {
  inputTextStr.value = val;
};

const onChange = async (val: any) => {
  inputPref.id = val.id;
  inputPref.name = val.name;
  console.log(inputPref);

  await fetchGeocode();
};
</script>

<template>
  <div>
    <div class="my-5 text-center">
      <form action="" @submit.prevent="onSubmit">
        <div class="flex items-center gap-3">
          <div class="max-w-sm">
            <IconSelect
              :values="fetchPrefectureList"
              @on-change="onChange"
            ></IconSelect>
          </div>
          <div>
            <InputText @onChange="inputText" :inputValue="''"></InputText>
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded"
          >
            検索
          </button>
        </div>
      </form>
    </div>
    <div class="grid grid-cols-3 gap-5">
      <Card :placesList="fetchPlacesList"></Card>
    </div>
  </div>
</template>
