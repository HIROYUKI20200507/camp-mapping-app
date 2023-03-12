<script setup lang="ts">
interface Props {
  inputValue: string;
}
interface Emits {
  (e: "onChange", newValue: string): void;
}
const props = withDefaults(defineProps<Props>(), {
  inputValue: "",
});
const emits = defineEmits<Emits>();

const InputText = computed({
  get(): string {
    return props.inputValue;
  },
  set(value: string) {
    emits("onChange", value);
  },
});
</script>

<template>
  <div class="flex flex-wrap">
    <div class="w-full px-3">
      <input
        v-model="InputText"
        class="inline-block appearance-none w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-text"
        type="text"
        placeholder="フリーワード"
      />
    </div>
  </div>
</template>
