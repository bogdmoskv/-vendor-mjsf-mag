<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Product } from "@/types";
import serviceProvider from "@/services";
import ProductWrapper from "@/components/product/ProductWrapper.vue";
import AddProductModal from '@/components/product/AddProductModal.vue';

const products = ref<Product[]>([]);
const loading = ref<boolean>(false);
const showAddModal = ref(false);

const fetchProducts = async () => {
  try {
    loading.value = true;
    const rawProducts = await serviceProvider.getProductsService().get({ limit: 8, offset: 0 });
    rawProducts.map(product => {
      return product.images = product.images.map(image => image.replace(/["\[\]]/g, ''));
    });
    products.value = rawProducts;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts();
});

const handleRefreshProducts = () => {
  fetchProducts();
};
</script>

<template>
  <main class="container mx-auto">
    <h1 class="text-center font-semibold p-8">Our Products</h1>
    <button @click="showAddModal = true" class="btn-primary mb-4">Add Product</button>
    <ProductWrapper
        :items="products"
        :loading="loading"
        @refreshProducts="handleRefreshProducts"
    />
    <AddProductModal v-if="showAddModal" @close="showAddModal = false" @refreshProducts="handleRefreshProducts" />
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
