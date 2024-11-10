<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import type { User } from "@/types";
import serviceProvider from "@/services";
import UserWrapper from "@/components/user/UserWrapper.vue";
import AddUserModal from '@/components/user/AddUserModal.vue';
import EditUserModal from '@/components/user/EditUserModal.vue';

const users = ref<User[]>([]);
const loading = ref<boolean>(false);
const showAddModal = ref(false);
const showEditModal = ref(false);

const fetchUsers = async () => {
  try {
    loading.value = true;
    const userList = await serviceProvider.getUsersService().getAll();
    users.value = userList.sort((a, b) => a.id - b.id);
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const sortedUsers = computed(() => {
  return [...users.value].sort((a, b) => b.id - a.id);
});

onMounted(() => {
  fetchUsers();
});

const handleRefreshUsers = () => {
  fetchUsers();
};
</script>

<template>
  <main class="container mx-auto">
    <h1 class="text-center font-semibold p-8">Our Users</h1>
    <button @click="showAddModal = true" class="btn-primary mb-4">Add User</button>
    <UserWrapper
        :items="sortedUsers"
        :loading="loading"
        @refreshUsers="handleRefreshUsers"
    />
    <AddUserModal v-if="showAddModal" @close="showAddModal = false" @refreshUsers="handleRefreshUsers" />
    <EditUserModal v-if="showEditModal" @close="showEditModal = false" @refreshUsers="handleRefreshUsers" />
  </main>
</template>

<style scoped>
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
</style>
