<script setup lang="ts">
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import useAuth from '@/composables/useAuth';
const { userState, resendVerificationEmail } = useAuth();

const email = ref<string>('')
const password = ref<string>('')

const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      sendEmailVerification(user)
        .then(() => {
          alert('Verification email sent. Please check your inbox.')
        })
        .catch((error) => {
          console.error('Error sending verification email:', error)
          alert(error.message)
        })
    })
    .catch((error) => {
      console.error('Error creating user:', error)
      alert(error.message)
    })
};
</script>

<template>
  <div v-if="!userState.authorized" class="userform">
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <div v-if="(userState.authorized && !userState.user?.emailVerified)">
      <button @click="resendVerificationEmail">Resend verification email</button>
    </div>
    <p>
      <button v-if="!userState.authorized" type="submit" @click="register">Register</button>
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
