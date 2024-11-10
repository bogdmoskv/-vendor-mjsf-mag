<script setup lang="ts">
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import type { UserCardProps } from "@/components/user/types";
import serviceProvider from '@/services';
import EditUserModal from '@/components/user/EditUserModal.vue';

const props = defineProps<UserCardProps>();
const emit = defineEmits(['userDeleted', 'refreshUsers']);

const showEditModal = ref(false);

const deleteUser = async (id: number) => {
  try {
    await serviceProvider.getUsersService().delete(id);
    alert("User deleted successfully.");
    emit('userDeleted', id);
    emit('refreshUsers');
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Failed to delete user.");
  }
};

const openEditModal = () => {
  showEditModal.value = true;
};
</script>

<template>
  <div class="relative bg-white shadow-md rounded-lg p-4">
    <button
        @click="deleteUser(props.item.id)"
        class="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-700 font-semibold py-2 px-4 rounded-full">
      X
    </button>
    <button
        @click="openEditModal"
        class="absolute top-2 right-12 bg-blue-500 text-white hover:bg-blue-700 font-semibold py-2 px-4 rounded-full">
      Edit
    </button>

    <figure>
      <img class="aspect-square" :src="props.item.avatar" :alt="props.item.name" />
      <figcaption class="font-semibold text-center py-2">{{ props.item.name }}</figcaption>
      <p class="text-center text-gray-600">{{ props.item.email }}</p>
    </figure>

    <EditUserModal v-if="showEditModal" :user="props.item" @close="showEditModal = false" @refreshUsers="emit('refreshUsers')" />
  </div>
</template>
