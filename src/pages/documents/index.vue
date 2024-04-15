<template>
  <div class="d-flex flex-column">
    <PageHeader subtitle="Visualiza tus documentos" title="Documentos" />
    <DocumentList class="mt-6" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DocumentsIndex',
});
</script>
