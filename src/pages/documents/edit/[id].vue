<template>
  <div>
    <FullForm class="mt-6" :document="document" v-if="!isFetching" />
  </div>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '@/stores/snackbar';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import DocumentService from '@/services/DocumentService';
import { Document } from '@/services/DocumentService.types';

defineOptions({
  name: 'DocumentsEdit',
});

const snackbar = useSnackbarStore();
const route = useRoute();
const documentId = route.params.id;
const document = ref({} as Document);
const isFetching = ref(false);

async function fetchDocument() {
  isFetching.value = true;
  try {
    const response = await DocumentService.getDocument(Number(documentId));
    document.value = response.data.data;
  } catch (error) {
    snackbar.setSnackbar('Error al obtener el documento.', 'red');
  } finally {
    isFetching.value = false;
  }
}

onMounted(() => {
  fetchDocument();
});
</script>
