<script setup lang="ts">
import PrefSelect from "~~/components/common/PrefSelect.vue";
// import CitySelect from "~~/components/common/CitySelect.vue";
import InputText from "~~/components/Basic/InputText.vue";
import Card from "~/Components/Basic/Card.vue";

const { fetchPlaces, updateInputText } = usePlaceStore();

const prefectureStore = usePrefectureStore();
const { state, fetchGeocode } = prefectureStore;

const onSubmit = async () => {
  await fetchGeocode();
  await fetchPlaces(state.value.selectedPrefLocation);
};

const inputText = (val: string) => {
  updateInputText(val);
};
</script>
<template>
  <div>
    <div class="my-5 text-center">
      <form action="" @submit.prevent="onSubmit">
        <div class="flex items-center gap-3">
          <PrefSelect />
          <!-- <CitySelect /> -->
          <InputText @onChange="inputText" :inputValue="''" />
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-3 rounded"
            type="submit"
          >
            検索
          </button>
        </div>
      </form>
    </div>
    <div class="grid grid-cols-3 gap-5">
      <Card />
    </div>
  </div>
</template>
