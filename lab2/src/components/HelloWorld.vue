<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div class="flex flex-row justify-center gap-0">
    <a class="basis-48" href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a class="basis-48" href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <a class="basis-36" href="https://tailwindcss.com/" target="_blank">
      <img src="../assets/tailwind.png" class="logo size-3/4" alt="Tailwind logo">
    </a>
  </div>
  <h1>{{ msg }}</h1>
  <div class="personal-info">
    <h2 class="text-2xl">Інформація стосовно мене</h2>
    <p>Богдан Москвичов</p>
    <p>Группа: 8.1213-іпз-1</p>
    <p>Особиста інформація: .NET + Angular розробник. Працюю у фінтех-компанії UNITY-BARS.</p>
    <p>Підтримую проект СЕП (система електронних платежів) та МП (миттєві перекази) для НБУ та Ощадбанку.</p>
  </div>
</template>

<style scoped>
.personal-info {
  margin-top: 20px;
  font-size: 16px;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

</style>
