<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import useAuth from '@/composables/useAuth';
const { userState } = useAuth();
import router from '@/router'

const isLoggedIn = ref<boolean>(false)

let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      router.push('/login')
    })
    .catch((error) => {
      console.log(error)
    })
}

</script>


<template>
  <main>
    <h1>TODO Page</h1>
    <div class="green"> Current user email: {{userState.user.email}}</div>
    <button @click="handleSignOut" v-if="isLoggedIn"> Sign out </button>
  </main>
</template>

<style scoped>
button {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  background-color: var(--color-primary);
  color: #00bd7e;
  border: #00bd7e 1px solid;
  cursor: pointer;
}
</style>
