
<script setup>
import { ref } from 'vue'
import Button from './Button.vue';
import { ArrowRightIcon } from '@heroicons/vue/20/solid';
import SearchableDropdown from './SearchableDropdown.vue'


const colors = ['blue', 'red', 'green'];

const icons = {
  ArrowRightIcon
};

function handleClick(event) {
  console.log('Button clicked!', event);
}


const demoItems = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
  { label: 'Option 4', value: 4 }
]

const demoItemsWithIcons = [
  { label: 'Option 1', value: 1, icon: 'https://img.icons8.com/ios-filled/50/000000/document.png' },
  { label: 'Option 2', value: 2, icon: 'https://img.icons8.com/ios-filled/50/000000/image.png' },
  { label: 'Option 3', value: 3, icon: 'https://img.icons8.com/ios-filled/50/000000/video.png' },
  { label: 'Option 4', value: 4, icon: 'https://img.icons8.com/ios-filled/50/000000/video.png' }
]

const selected = ref([])
const selectedMultiple = ref([])
const selectedCustom = ref([])

const onSelect = (value) => {
  selected.value = value
}

const onSelectMultiple = (value) => {
  selectedMultiple.value = value
}

const onSelectCustom = (value) => {
  selectedCustom.value = value
}
</script>

<template>
  <div class="flex">
    <div class="button">
      <div class="p-6 space-y-4">
        <h1 class="text-2xl font-bold mb-4">Button Component Demo</h1>
        <div v-for="color in colors" :key="color" class="space-y-2">
          <h2 class="text-xl font-semibold">{{ color }} buttons</h2>
          <div class="flex space-x-4">
            <Button :label="`Small ${color}`" :color="color" size="small" @click="handleClick" />
            <Button :label="`Medium ${color}`" :color="color" size="medium" @click="handleClick" />
            <Button :label="`Large ${color}`" :color="color" size="large" @click="handleClick" />
          </div>
          <div class="flex space-x-4">
            <Button :label="`Small ${color} with Icon`" :color="color" size="small" :icon="icons.ArrowRightIcon" @click="handleClick" />
            <Button :label="`Medium ${color} with Icon`" :color="color" size="medium" :icon="icons.ArrowRightIcon" @click="handleClick" />
            <Button :label="`Large ${color} with Icon`" :color="color" size="large" :icon="icons.ArrowRightIcon" @click="handleClick" />
          </div>
        </div>
      </div>
    </div>
    <div class="dropdown p-8 space-y-6">
      <h2 class="text-2xl font-semibold">SearchableDropdown Demo</h2>

      <div>
        <h3 class="font-medium">Single Selection</h3>
        <SearchableDropdown
            :items="demoItems"
            @update:selected="onSelect"
        />
      </div>

      <div>
        <h3 class="font-medium">Multiple Selection</h3>
        <SearchableDropdown
            :items="demoItems"
            :multiple="true"
            @update:selected="onSelectMultiple"
        />
      </div>

      <div>
        <h3 class="font-medium">Custom Display of Options (With Icons)</h3>
        <SearchableDropdown
            :items="demoItemsWithIcons"
            @update:selected="onSelectCustom"
        >
          <template #item="{ item }">
            <div class="flex items-center space-x-2">
              <img :src="item.icon" class="w-5 h-5" alt="icon"/>
              <span>{{ item.label }}</span>
            </div>
          </template>
        </SearchableDropdown>
      </div>

      <div class="mt-6 max-w-md">
        <h3 class="font-medium">Selected Values:</h3>
        <div>Single Selection: {{ selected }}</div>
        <div>Multiple Selection: {{ selectedMultiple }}</div>
        <div>Custom Display: {{ selectedCustom }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>


