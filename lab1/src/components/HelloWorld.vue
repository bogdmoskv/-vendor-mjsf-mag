<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="personal-info">
    <h2>Інформація стосовно мене</h2>
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
</style>
