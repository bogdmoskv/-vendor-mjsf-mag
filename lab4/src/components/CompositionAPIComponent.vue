<script lang="ts">
import { inject, onMounted, ref } from 'vue';
import type { Category } from "@/types";
import CategoryWrapper from "@/components/category/CategoryWrapper.vue";

export default {
  name: 'CategoryList',

  components: {
    CategoryWrapper
  },

  setup() {
    const serviceProvider = inject('serviceProvider');
    if (!serviceProvider) {
      throw new Error("serviceProvider is not provided.");
    }

    const categories = ref<Category[]>([]);
    const loading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchCategories = async () => {
      loading.value = true;
      error.value = null;

      try {
        const categoryService = serviceProvider.getCategoriesService();
        categories.value = await categoryService.get({ limit: 4, offset: 0 });
      } catch (e) {
        console.error("Failed to fetch categories:", e);
        error.value = "An error occurred while fetching categories.";
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchCategories();
    });

    return {
      categories,
      loading,
      error
    };
  }
};
</script>

<template>
  <main class="container mx-auto">
    <h1 class="text-center font-semibold p-8">Categories in format of Composition API</h1>
    <p v-if="error" class="text-center text-red-500">{{ error }}</p>
    <CategoryWrapper :items="categories" :loading="loading" />
  </main>
</template>
