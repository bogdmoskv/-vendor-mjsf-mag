<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  multiple: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:selected'])

const searchText = ref('')
const showDropdown = ref(false)
const focusedIndex = ref(0)
const selectedItems = ref([])

const openDropdown = async () => {
  await nextTick() // Ensures the click event fully finishes before setting the dropdown to true
  showDropdown.value = true
}

const filteredItems = computed(() => {
  if (!searchText.value) return props.items
  return props.items.filter(item =>
      item.label.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

watch(searchText, () => {
  focusedIndex.value = 0
})

const isSelected = (item) => selectedItems.value.some(selected => selected.value === item.value)

const selectItem = (item) => {
  if (props.multiple) {
    if (isSelected(item)) {
      selectedItems.value = selectedItems.value.filter(i => i.value !== item.value)
    } else {
      selectedItems.value.push(item)
    }
  } else {
    selectedItems.value = [item]
    showDropdown.value = false
  }
  emit('update:selected', selectedItems.value)
  searchText.value = ''
}

const removeItem = (item) => {
  selectedItems.value = selectedItems.value.filter(i => i.value !== item.value)
  emit('update:selected', selectedItems.value)
}

const moveFocus = (direction) => {
  const totalItems = filteredItems.value.length
  focusedIndex.value = (focusedIndex.value + direction + totalItems) % totalItems
}

const selectFocusedItem = () => {
  if (filteredItems.value[focusedIndex.value]) {
    selectItem(filteredItems.value[focusedIndex.value])
  }
}

const clearSelection = () => {
  selectedItems.value = []
  searchText.value = ''
  emit('update:selected', selectedItems.value)
}

const onClickOutside = (event) => {
  if (!event.target.closest('.dropdown-container')) {
    showDropdown.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <div class="relative w-full max-w-lg dropdown-container" @mousedown="openDropdown">
    <div class="relative flex justify-between items-center flex-nowrap gap-2 px-2 py-1 border rounded-md cursor-pointer">
      <span
          v-for="item in selectedItems"
          :key="item.value"
          class="bg-blue-500 text-white px-0.5 rounded-md text-sm flex items-center "
      >
        <span>{{ item.label }}</span>
        <button @click.stop="removeItem(item)" class="bg-blue-500 ml-1 px-2 py-0">✕</button>
      </span>
      <input
          v-show="multiple || !selectedItems.length"
          type="text"
          v-model="searchText"
          @focus="openDropdown"
          @keydown.arrow-down.prevent="moveFocus(1)"
          @keydown.arrow-up.prevent="moveFocus(-1)"
          @keydown.enter.prevent="selectFocusedItem"
          placeholder="Select an option"
          class="flex-grow focus:outline-none bg-transparent"
      />
      <button
          v-if="selectedItems.length"
          @click="clearSelection"
          class=" text-gray-500 text-sm p-1"
      >
        ✕
      </button>
    </div>
    <div
        v-if="showDropdown"
        class="absolute left-0 z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-y-auto"
    >
      <template v-if="filteredItems.length">
        <div
            v-for="(item, index) in filteredItems"
            :key="item.value"
            :class="[
            'px-4 py-2 cursor-pointer text-violet-500 flex items-center space-x-2',
            index === focusedIndex ? 'bg-blue-300' : 'hover:bg-gray-100',
            isSelected(item) ? 'bg-gray-200' : ''
          ]"
            @click="selectItem(item)"
            @mouseenter="focusedIndex = index"
        >
          <slot name="item" :item="item">
            {{ item.label }}
          </slot>
        </div>
      </template>

      <div v-else class="px-4 py-2 text-gray-500">Nothing found</div>
    </div>
  </div>
</template>

<style scoped>

</style>
