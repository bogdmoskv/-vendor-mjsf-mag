<script setup lang="ts">
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';
import type { ProductCardProps } from "@/components/product/types";
import serviceProvider from '@/services';
import EditProductModal from '@/components/product/EditProductModal.vue';

const props = defineProps<ProductCardProps>();
const emit = defineEmits(['productDeleted', 'refreshProducts']);

const showEditModal = ref(false);

const deleteProduct = async (id: number) => {
  try {
    await serviceProvider.getProductsService().delete(id);
    alert("Product deleted successfully.");
    emit('productDeleted', id);
    emit('refreshProducts');
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product.");
  }
};

const openEditModal = () => {
  showEditModal.value = true;
};
</script>

<template>
  <div class="relative bg-white shadow-md rounded-lg p-4">
    <button
        @click="deleteProduct(props.item.id)"
        class="absolute top-2 right-2 bg-red-500 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 font-semibold py-2 px-4 rounded-full">
      X
    </button>
    <button
        @click="openEditModal"
        class="absolute top-2 right-12 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold py-2 px-4 rounded-full">
      Edit
    </button>

    <router-link :to="`/product/${props.item.id}`">
      <figure>
        <img class="aspect-square" :src="props.item.images[0]" :alt="props.item.title" />
        <figcaption class="font-semibold text-center py-2">{{ props.item.title }}</figcaption>
        <p class="text-center text-gray-600">${{ props.item.price.toFixed(2) }}</p>
      </figure>
    </router-link>

    <EditProductModal v-if="showEditModal" :product="props.item" @close="showEditModal = false" @refreshProducts="emit('refreshProducts')" />
  </div>
</template>
