<template>
  <VCard
    variant="tonal"
    color="indigo-darken-2"
    class="border w-100"
    rounded="lg"
    :title="document.title"
    :subtitle="providerName"
  >
    <template v-slot:text>
      <p class="text-truncate">
        {{ document.description }}
      </p>
    </template>
    <VCardActions class="d-flex justify-end">
      <VBtn
        color="indigo-darken"
        variant="tonal"
        icon="mdi-download"
        rounded="lg"
        density="comfortable"
        @click="onClickDownload"
      />
      <VBtn
        color="indigo-darken"
        :ripple="false"
        variant="tonal"
        icon="mdi-pencil-outline"
        rounded="lg"
        density="comfortable"
        @click="onClickEdit"
      />
      <VBtn
        color="red"
        variant="tonal"
        icon="mdi-trash-can-outline"
        rounded="lg"
        density="comfortable"
        @click="onClickDelete"
      />
    </VCardActions>
  </VCard>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Document } from '@/services/DocumentService.types';

defineOptions({
  name: 'DocumentCard',
});

const emit = defineEmits(['edit', 'delete', 'download']);

const props = defineProps({
  document: {
    type: Object as PropType<Document>,
    required: true,
  },
});

const providerName = computed(
  () => `Proveedor: ${props.document.provider_name}`,
);

function onClickEdit() {
  emit('edit', props.document);
}

function onClickDelete() {
  emit('delete', props.document);
}

function onClickDownload() {
  emit('download', props.document);
}
</script>
