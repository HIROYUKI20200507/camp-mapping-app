<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

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

const selectPrefecture = props.values;
</script>

<template>
  <Listbox as="div" v-model="selectPrefecture">
    <div class="relative">
      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            as="template"
            v-for="person in selectPrefecture"
            :key="person.id"
            :value="person"
          >
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
