<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import serviceProvider from '@/services';
import { defineEmits } from 'vue';

const emit = defineEmits(['close']);

const newProduct = ref({
  title: '',
  price: 0,
  description: '',
  categoryId: 1,
  images: [],
});

const router = useRouter();

const addProduct = async () => {
  try {
    const createdProduct = await serviceProvider.getProductsService().create(newProduct.value);
    alert(`Product added: ${createdProduct.title}`);
    emit('close');
    router.push(`/product/${createdProduct.id}`);
  } catch (error) {
    console.error("Error adding product:", error);
    alert("Failed to add product.");
  }
};
</script>

<template>
  <div class="fixed z-50 inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white space-y-2 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-lg ml-4 font-semibold text-gray-700">Add Product</h2>

      <input v-model="newProduct.title" placeholder="Title" class="input" />
      <input v-model.number="newProduct.price" type="number" placeholder="Price" class="input" />
      <textarea v-model="newProduct.description" placeholder="Description" class="input h-32"></textarea>
      <input v-model="newProduct.images[0]" placeholder="Image URL 1" class="input" />
      <input v-model="newProduct.images[1]" placeholder="Image URL 2" class="input" />

      <div class="flex justify-end space-x-2 mt-4">
        <button @click="emit('close')" class="btn-secondary">Cancel</button>
        <button @click="addProduct" class="btn-primary">Add</button>
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
