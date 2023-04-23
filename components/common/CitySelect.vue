<script setup lang="ts">
const { state, updateCity } = usePrefectureStore();

const onChange = (e: Event) => {
  const selectedOption = e.target as HTMLSelectElement;
  const selectedValue =
    selectedOption.options[selectedOption.selectedIndex].value;
  const parsedValue = JSON.parse(selectedValue);

  updateCity(parsedValue);
};
</script>

<template>
  <select @change="onChange" class="border rounded px-3 py-2">
    <option :value="JSON.stringify({ id: 0, name: '' })" selected>
      --市区町村を選択--
    </option>
    <template v-for="city in state.fetchCitiesList" :key="city.id">
      <option :value="JSON.stringify({ id: city.id, name: city.name })">
        {{ city.name }}
      </option>
    </template>
  </select>
</template>
