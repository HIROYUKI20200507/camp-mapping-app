<script setup lang="ts">
const prefectureStore = usePrefectureStore();
const { state, updatePref, fetchCities, fetchGeocode } = prefectureStore;

console.log(state.value.fetchPrefectureList);


const onChange = async (e: Event) => {
  const selectedOption = e.target as HTMLSelectElement;
  const selectedValue =
    selectedOption.options[selectedOption.selectedIndex].value;

  const selectPref: { id: number; name: string }[] =
    state.value.fetchPrefectureList.filter(
      (elm: any) => elm.id === +selectedValue
    );

  const setPref = {
    id: selectPref[0].id,
    name: selectPref[0].name,
  };

  updatePref(setPref);

  await fetchCities;
  await fetchGeocode;
};
</script>

<template>
  <template v-if="state.fetchPrefectureList.length">
    <select @change="onChange" class="border rounded px-3 py-2">
      <option value="0" selected>--都道府県を選択--</option>
      <template v-for="value in state.fetchPrefectureList" :key="value.id">
        <option :value="value.id">
          {{ value.name }}
        </option>
      </template>
    </select>
  </template>
</template>
