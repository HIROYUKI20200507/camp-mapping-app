<script setup lang="ts">
const { state, updatePref, fetchPrefectures, fetchCities, fetchGeocode } =
  usePrefectureStore();

// 都道府県一覧を取得
fetchPrefectures();

const onChange = async (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const selectedId = target.value;

  const selectPref: { id: number; name: string }[] =
    state.value.fetchPrefectureList.filter(
      (elm: any) => elm.id === +selectedId
    );

  const setPref = {
    id: selectPref[0].id,
    name: selectPref[0].name,
  };

  updatePref(setPref);

  fetchCities;
  fetchGeocode;
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
