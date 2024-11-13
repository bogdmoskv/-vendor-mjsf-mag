<script setup lang="ts">

import { inject, onMounted, ref } from 'vue'
import type {Category} from "@/types";
// import serviceProvider from "@/services";
import CategoryWrapper from "@/components/category/CategoryWrapper.vue";

const serviceProvider = inject('serviceProvider');
const serviceInstance = ref(null);
serviceInstance.value = serviceProvider.getCategoriesService();

const categories = ref<Category[]>([]);
const loading = ref<boolean>(false);
const fetchCategories = async () => {
    try {
        loading.value = true;
        categories.value = await serviceProvider.getCategoriesService().get({limit: 4, offset: 0});
    } catch (e) {
        console.error(e);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchCategories();
})
</script>

<template>
    <main class="container mx-auto">
        <h1 class="text-center font-semibold p-8"> My Shop Products Categories </h1>
        <CategoryWrapper :items ="categories" :loading="loading" />
    </main>
</template>


