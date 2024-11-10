<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import type { Product } from "@/types";
import serviceProvider from '@/services';

const props = defineProps<{ product: Product }>();
const emit = defineEmits(['close', 'refreshProducts']);

const updatedProduct = ref({ ...props.product });

const updateProduct = async () => {
  try {
    updatedProduct.value.images = updatedProduct.value.images.map(image => image.trim());
    const product = await serviceProvider.getProductsService().update(props.product.id, updatedProduct.value);
    alert(`Product updated: ${product.title}`);
    emit('close');
    emit('refreshProducts');
  } catch (error) {
    console.error("Error updating product:", error);
    alert("Failed to update product.");
  }
};
</script>

<template>
  <div class="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white space-y-2 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-lg font-semibold text-gray-700">Edit Product</h2>

      <input v-model="updatedProduct.title" placeholder="Title" class="input" />
      <input v-model.number="updatedProduct.price" type="number" placeholder="Price" class="input" />
      <textarea v-model="updatedProduct.description" placeholder="Description" class="input h-32"></textarea>
      <input v-model="updatedProduct.images[0]" placeholder="Image URL 1" class="input" />
      <input v-model="updatedProduct.images[1]" placeholder="Image URL 2" class="input" />

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="emit('close')" class="btn-secondary">Cancel</button>
        <button @click="updateProduct" class="btn-primary">Update</button>
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
