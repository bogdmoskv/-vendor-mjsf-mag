<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import type { Product } from '@/types';
import serviceProvider from '@/services';

const route = useRoute();
const product = ref<Product | null>(null);
const loading = ref<boolean>(false);

const fetchProduct = async (id: number) => {
  try {
    loading.value = true;
    product.value = await serviceProvider.getProductsService().getById(id);
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  const productId = Number(route.params.id);
  if (productId) {
    fetchProduct(productId);
  }
});
</script>

<template>
  <div v-if="loading" class="text-center">Loading...</div>
  <div v-else-if="product" class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ product.title }}</h1>
    <img :src="product.images[0]" :alt="product.title" class="w-full h-auto mb-4" />
    <p class="text-lg mb-4">{{ product.description }}</p>
    <p class="text-xl font-semibold mb-4">${{ product.price.toFixed(2) }}</p>
  </div>
  <div v-else class="text-center">Product not found.</div>
</template>

<style scoped>
.container {
  max-width: 800px;
}
</style>
