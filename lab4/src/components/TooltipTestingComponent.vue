<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="space-x-4">
      <button class="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-300" v-tooltip="tooltipOptions1">Hover me</button>
      <button class="px-6 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition-colors duration-300" v-tooltip="tooltipOptions2">Click me</button>
      <button class="px-6 py-2 text-white bg-purple-500 rounded hover:bg-purple-600 transition-colors duration-300" v-tooltip="tooltipOptions3">Focus me</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const tooltipOptions1 = {
  content: 'This is a tooltip',
  html: false,
  delay: 500,
  trigger: 'hover',
  show: false
};

const tooltipOptions2 = {
  content: '<strong>HTML</strong> tooltip',
  html: true,
  delay: 300,
  trigger: 'click',
  show: false
};

const tooltipOptions3 = {
  content: 'Focus to see tooltip',
  html: false,
  delay: 200,
  trigger: 'focus',
  show: false
};
</script>

<style>
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip-content {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%; /* Position the tooltip above the text */
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip-content::after {
  content: '';
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip-visible {
  visibility: visible;
  opacity: 1;
}

</style>
