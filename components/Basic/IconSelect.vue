<script setup lang="ts">
import { emit } from "process";

interface Props {
  values: {
    id: number;
    name: string;
  }[];
}
interface Emits {
  (e: "onChange", newValue: string): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const onChange = (e: Event) => {
  emits("onChange", (e.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="relative">
    <template v-if="values.length">
      <select @change="onChange">
        <template v-for="value in values" :key="value.id">
          <option :value="value.name">
            {{ value.name }}
          </option>
        </template>
      </select>
    </template>
  </div>
</template>
