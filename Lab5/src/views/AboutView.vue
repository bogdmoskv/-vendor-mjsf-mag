<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="personal-info">
      <h3 class="text-2xl">Інформація стосовно мене</h3>
      <p>Богдан Москвичов</p>
      <p>Группа: 8.1213-іпз-1</p>
      <p>Особиста інформація: .NET + Angular розробник. Працюю у фінтех-компанії UNITY-BARS.</p>
      <p>Підтримую проект СЕП (система електронних платежів) та МП (миттєві перекази) для НБУ та Ощадбанку.</p>
    </div>
  </div>
</template>

<style>
.about {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
