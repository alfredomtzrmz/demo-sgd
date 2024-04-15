<template>
  <div class="mt-6">
    <VTextField
      v-model="querySearch"
      prepend-icon="mdi-magnify"
      variant="outlined"
      density="compact"
      placeholder="Buscar por titulo..."
      rounded="lg"
    />
    <VRow>
      <template v-if="isFetching">
        <VCol
          v-for="(_, index) in Array.from({ length: 4 })"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <VSkeletonLoader
            type="image"
            max-height="166"
            min-height="166"
            class="rounded-lg h-100 w-100"
          />
        </VCol>
      </template>
      <template v-else>
        <VCol
          v-for="document in documents"
          :key="document.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <DocumentCard
            :document="document"
            @edit="onEdit"
            @delete="onDelete"
            @download="onDownload"
          />
        </VCol>
      </template>
    </VRow>
    <VPagination
      v-model="currentPage"
      :length="totalPages"
      :disabled="isFetching"
      rounded="lg"
      density="comfortable"
      @update:model-value="onPageChange"
      class="mt-4"
    />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSnackbarStore } from '@/stores/snackbar';
import DocumentService from '@/services/DocumentService';
import { Document } from '@/services/DocumentService.types';

defineOptions({
  name: 'DocumentList',
});

const props = defineProps({
  limit: {
    type: Number,
    default: 10,
  },
});

const snackbar = useSnackbarStore();
const router = useRouter();
const documents = ref([] as Document[]);
const currentPage = ref(1);
const totalPages = ref(0);
const isFetching = ref(false);
const querySearch = ref('');
const baseURL = import.meta.env.VITE_SERVER_URL;

watch(querySearch, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    currentPage.value = 1;
    getDocuments();
  }
});

async function getDocuments() {
  isFetching.value = true;
  try {
    const response = await DocumentService.getDocuments(
      currentPage.value,
      props.limit,
      querySearch.value,
    );

    const {
      data,
      meta: { last_page, current_page },
    } = response.data;

    documents.value = data;
    totalPages.value = last_page;
    currentPage.value = current_page;
  } catch (error) {
    snackbar.setSnackbar('Error al obtener los documentos.', 'red');
  } finally {
    isFetching.value = false;
  }
}

async function onPageChange(page: number) {
  currentPage.value = page;
  await getDocuments();
}

async function onEdit(document: Document) {
  await router.push(`/documents/edit/${document.id}`);
}

async function onDelete(document: Document) {
  try {
    await DocumentService.deleteDocument(document.id);
    await getDocuments();
    snackbar.setSnackbar('Document eliminado', 'indigo-lighten-1');
  } catch (error) {
    snackbar.setSnackbar('Error al eliminar el documento.', 'red');
  }
}

function onDownload(document: Document) {
  window.open(`${baseURL}/${document.file_path}`, '_blank');
}

onMounted(() => {
  getDocuments();
});
</script>
