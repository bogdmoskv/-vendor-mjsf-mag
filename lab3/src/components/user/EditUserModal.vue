<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { User } from "@/types";
import serviceProvider from '@/services';

const props = defineProps<{ user?: User }>();
const emit = defineEmits(['close', 'refreshUsers']);

const updatedUser = ref({ ...props.user });

const updateUser = async () => {
  try {
    const user = await serviceProvider.getUsersService().update(props.user.id, updatedUser.value);
    alert(`User updated: ${user.name}`);
    emit('close');
    emit('refreshUsers');
  } catch (error) {
    console.error("Error updating user:", error);
    alert("Failed to update user.");
  }
};
</script>

<template>
  <div class="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white space-y-2 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-lg font-semibold text-gray-700">Edit User</h2>

      <input v-model="updatedUser.name" placeholder="Name" class="input" />
      <input v-model="updatedUser.email" placeholder="Email" class="input" />
      <input v-model="updatedUser.role" placeholder="Role" class="input" />

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="emit('close')" class="btn-secondary">Cancel</button>
        <button @click="updateUser" class="btn-primary">Update</button>
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
