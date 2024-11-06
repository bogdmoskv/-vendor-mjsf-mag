<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['red', 'blue', 'green', 'yellow', 'gray'].includes(value)
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  icon: {
    type: [Object, Function],
    default: null
  }
});

const emits = defineEmits(['click']);

const buttonClass = computed(() => {
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-600 text-white',
    red: 'bg-red-500 hover:bg-red-600 text-white',
    green: 'bg-green-500 hover:bg-green-600 text-white',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    gray: 'bg-gray-500 hover:bg-gray-600 text-white'
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  return [
    'inline-flex items-center font-semibold rounded shadow',
    colorClasses[props.color],
    sizeClasses[props.size]
  ].join(' ');
});

function handleClick(event) {
  emits('click', event);
}
</script>

<template>
  <button :class="buttonClass" @click="handleClick">
    <span v-if="icon" class="mr-2">
      <component :is="icon" class="w-5 h-5" />
    </span>
    <span>{{ label }}</span>
  </button>

</template>

<style scoped>

</style>
