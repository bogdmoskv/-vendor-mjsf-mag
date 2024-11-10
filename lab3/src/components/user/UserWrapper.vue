<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import type { UserWrapperProps } from "@/components/user/types";
import UserCard from "@/components/user/UserCard.vue";
import UserSkeleton from "@/components/user/UserSkeleton.vue";

const props = defineProps<UserWrapperProps>();
const emit = defineEmits(['refreshUsers']);

const items = ref(props.items);

watchEffect(() => {
  items.value = props.items;
});

const handleUserDeleted = (id: number) => {
  items.value = items.value.filter(item => item.id !== id);
  emit('refreshUsers');
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <template v-if="!props.loading">
      <UserCard
          v-for="user in items"
          :key="user.id"
          :item="user"
          @userDeleted="handleUserDeleted"
          @refreshUsers="emit('refreshUsers')"
      />
    </template>

    <template v-else>
      <UserSkeleton v-for="index in 4" :key="index" />
    </template>
  </div>
</template>

