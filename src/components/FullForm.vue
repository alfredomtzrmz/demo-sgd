<template>
  <BasicForm
    :document="document"
    :is-loading="isLoading"
    @submit="onHandleSubmit"
  />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useSnackbarStore } from '@/stores/snackbar';
import DocumentService from '@/services/DocumentService';
import { Document } from '@/services/DocumentService.types';

defineOptions({
  name: 'FullForm',
});

const props = defineProps({
  document: {
    type: Object as PropType<Document>,
    default: () => ({}),
  },
});

const isLoading = ref(false);
const router = useRouter();
const snackbar = useSnackbarStore();

async function onHandleSubmit(payload: Document) {
  isLoading.value = true;
  try {
    if (props.document.title) {
      await updateDocument(payload);
    } else {
      await createDocument(payload);
    }
  } catch (error) {
    snackbar.setSnackbar('Error', 'red');
  } finally {
    isLoading.value = false;
  }
}

async function createDocument(document: Document) {
  try {
    let formData = new FormData();
    formData.append('file', document.file);
    await DocumentService.createDocument(document);
    await router.push('/documents');
    snackbar.setSnackbar('Documento creado correctamente.', 'green');
  } catch (error) {
    snackbar.setSnackbar('Error al crear el documento.', 'red');
  }
}

async function updateDocument(document: Document) {
  try {
    let formData = new FormData();
    formData.append('file', document.file ? document.file : '');
    await DocumentService.updateDocument(document, props.document.id);
    await router.push('/documents');
    snackbar.setSnackbar('Documento actualizado correctamente.', 'green');
  } catch (error) {
    snackbar.setSnackbar('Error al actualizar el documento.', 'red');
  }
}
</script>
