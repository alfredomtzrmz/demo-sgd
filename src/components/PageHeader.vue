<template>
  <VCard
    :subtitle="subtitle"
    color="indigo-lighten-1"
    elevation="0"
    rounded="lg"
    border
  >
    <template v-slot:title>
      <div class="d-flex justify-space-between">
        {{ title }}
      </div>
    </template>
  </VCard>
</template>

<script setup lang="ts">
defineOptions({
  name: 'PageHeader',
});

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
});
</script>
