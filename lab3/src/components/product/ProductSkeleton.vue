<script setup lang="ts">

</script>

<template>
  <div class="bg-white shadow-md rounded-lg p-4">
    <figure role="status" class="animate-pulse flex flex-col">
      <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded">
        <!-- SVG Placeholder for loading -->
      </div>
      <div class="w-full mt-5">
        <div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2"></div>
        <div class="h-2 bg-gray-200 rounded-full max-w-[190px] mb-2"></div>
      </div>
      <span class="sr-only">Loading...</span>
    </figure>
  </div>
</template>

<style scoped>

</style>
