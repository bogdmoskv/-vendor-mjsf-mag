import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ProductService } from '@/services/products.service';
import httpClient from '@/utils/http-client';

const productService = new ProductService(httpClient);

export const useProductsStore = defineStore('products', () => {
    const products = ref([]);
    const loading = ref(false);

    async function fetchProducts() {
        loading.value = true;
        try {
            products.value = await productService.get({});
        } finally {
            loading.value = false;
        }
    }

    return { products, loading, fetchProducts };
});
