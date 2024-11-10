<script setup lang="ts">
import { ref } from 'vue';
import serviceProvider from '@/services';
import { defineEmits } from 'vue';

const emit = defineEmits(['close', 'refreshUsers']);

const newUser = ref({
  name: '',
  email: '',
  role: '',
  password: '',
  avatar: '',
});

const addUser = async () => {
  try {
    const createdUser = await serviceProvider.getUsersService().create(newUser.value);
    alert(`User added: ${createdUser.name}`);
    emit('close');
    emit('refreshUsers');
  } catch (error) {
    console.error("Error adding user:", error);
    alert("Failed to add user.");
  }
};
</script>

<template>
  <div class="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white space-y-2 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-lg ml-4 font-semibold text-gray-700">Add Product</h2>

      <input v-model="newUser.name" placeholder="Name" class="input" />
      <input v-model="newUser.email" type="Email" placeholder="Email" class="input" />
      <input v-model="newUser.password" type="password" placeholder="Password" class="input" />
      <input v-model="newUser.role" placeholder="Role" class="input" />
      <input v-model="newUser.avatar" placeholder="Avatar url" class="input" />

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="emit('close')" class="btn-secondary">Cancel</button>
        <button @click="addUser" class="btn-primary">Add</button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  outline: none;
  transition: border-color 0.3s;
}
.input:focus {
  border-color: #3b82f6;
}
.btn-primary {
  background-color: #3b82f6;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
}
.btn-primary:hover {
  background-color: #2563eb;
}
.btn-secondary {
  background-color: #e2e8f0;
  color: #000000;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
}
.btn-secondary:hover {
  background-color: #cbd5e1;
}
</style>
