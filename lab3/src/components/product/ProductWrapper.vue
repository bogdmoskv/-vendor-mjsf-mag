<script setup lang="ts">
import { ref, watch } from 'vue';
import { defineProps, defineEmits } from 'vue';
import type { ProductWrapperProps } from "@/components/product/types";
import ProductCard from "@/components/product/ProductCard.vue";
import ProductSkeleton from "@/components/product/ProductSkeleton.vue";

const props = defineProps<ProductWrapperProps>();
const emit = defineEmits(['refreshProducts']);

const items = ref(props.items);

watch(() => props.items, (newItems) => {
  items.value = newItems;
});

const handleProductDeleted = (id: number) => {
  items.value = items.value.filter(item => item.id !== id);
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <template v-if="!props.loading">
      <ProductCard
          v-for="product in items"
          :key="product.id"
          :item="product"
          @productDeleted="handleProductDeleted"
          @refreshProducts="emit('refreshProducts')"
      />
    </template>

    <template v-else>
      <ProductSkeleton v-for="index in 4" :key="index" />
    </template>
  </div>
</template>

