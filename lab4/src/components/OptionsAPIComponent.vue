<script lang="ts">
import type { Category } from "@/types";
import CategoryWrapper from "@/components/category/CategoryWrapper.vue";

export default {
  name: 'CategoryList',

  components: {
    CategoryWrapper
  },

  data() {
    return {
      categories: [] as Category[],
      loading: false,
      error: null as string | null
    };
  },

  inject: {
    serviceProvider: {
      from: 'serviceProvider',
      default: null
    }
  },

  mounted() {
    this.fetchCategories();
  },

  methods: {
    async fetchCategories() {
      if (!this.serviceProvider) {
        this.error = "Service provider not found.";
        console.error("Service provider not injected properly.");
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const categoryService = this.serviceProvider.getCategoriesService();
        this.categories = await categoryService.get({ limit: 5, offset: 0 });
      } catch (e) {
        console.error("Failed to fetch categories:", e);
        this.error = "An error occurred while fetching categories.";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <main class="container mx-auto">
    <h1 class="text-center font-semibold p-8">Categories in format of Options API</h1>
    <p v-if="error" class="text-center text-red-500">{{ error }}</p> <!-- Error message display -->
    <CategoryWrapper :items="categories" :loading="loading" />
  </main>
</template>
