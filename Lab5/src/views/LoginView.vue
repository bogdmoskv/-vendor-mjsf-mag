<script setup lang="ts">
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth';
const { userState } = useAuth();

const router = useRouter();
const email = ref<string>('')
const password = ref<string>('')
const errMsg = ref<string>('')

const login = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.push('/todo')
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/user-not-found':
          errMsg.value = 'User not found'
          break;
        case 'auth/invalid-email':
          errMsg.value = 'No account with that email was found'
          break;
        case 'auth/invalid-login-credentials':
          errMsg.value = 'Wrong email or password'
          break;
        case 'auth/wrong-password':
          errMsg.value = 'Wrong password'
          break;
        default:
          errMsg.value = error.message
      }
    })
};
</script>

<template>
  <div v-if="!userState.authorized">
    <h1>Login</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p>
      <button @click="login">Login</button>
    </p>
  </div>
</template>

<style scoped>
input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
}

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
