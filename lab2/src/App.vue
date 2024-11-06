<script setup>
import { RouterLink, RouterView} from "vue-router"
</script>

<template>
  <nav class="bg-violet-600 p-4 fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto flex justify-between items-center">
      <div class="space-x-4">
        <RouterLink to="/" class="text-violet-50 text-lg font-bold hover:text-white">Home</RouterLink>
        <RouterLink to="/lab2" class="text-violet-50 text-lg font-bold hover:text-white">Lab2</RouterLink>
      </div>
    </div>
  </nav>
  <div class="container mx-auto mt-20">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
