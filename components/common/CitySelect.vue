<script setup lang="ts">
interface Props {
  values: {
    id: number;
    name: string;
  }[];
}
interface Emits {
  (e: "onChange", newValue: { id: number; name: string }): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const onChange = (e: Event) => {
  const selectedOption = e.target as HTMLSelectElement;
  const selectedValue =
    selectedOption.options[selectedOption.selectedIndex].value;
  const parsedValue = JSON.parse(selectedValue);
  emits("onChange", parsedValue);
};
</script>

<template>
  <template v-if="values.length">
    <select @change="onChange" class="border rounded px-3 py-2">
      <option value="" selected>--市区町村を選択--</option>
      <template v-for="value in values" :key="value.id">
        <option :value="JSON.stringify({ id: value.id, name: value.name })">
          {{ value.name }}
        </option>
      </template>
    </select>
  </template>
</template>
