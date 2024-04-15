<template>
  <VForm enctype="multipart/form-data" class="mt-6" @submit.prevent>
    <VCard
      elevation="0"
      border
      rounded="lg"
      title="Ingresa los datos de tu documento"
    >
      <VRow class="px-8 pb-4 mt-2 mt-sm-0">
        <VCol cols="12" sm="6" class="pa-0 pr-0 pr-sm-4">
          <VTextField
            label="Titulo"
            name="title"
            variant="underlined"
            density="comfortable"
            v-model="title.value.value"
            :error-messages="title.errors.value"
          />
          <VTextField
            label="Proveedor"
            variant="underlined"
            density="comfortable"
            v-model="provider_name.value.value"
            :error-messages="provider_name.errors.value"
          />
          <VTextField
            label="Fecha de creación"
            variant="underlined"
            density="comfortable"
            type="date"
            v-model="register_date.value.value"
            :error-messages="register_date.errors.value"
          />
        </VCol>
        <VCol cols="12" sm="6" class="pa-0 pl-0 pl-sm-4">
          <VTextField
            label="Descripción"
            variant="underlined"
            density="comfortable"
            v-model="description.value.value"
            :error-messages="description.errors.value"
          />
          <VFileInput
            label="Adjuntar archivo"
            variant="underlined"
            prepend-icon=""
            density="comfortable"
            placeholder="jshajksasa"
            accept=".pdf"
            v-model="file.value.value"
          />
        </VCol>
      </VRow>
      <div class="d-flex justify-end mx-4 mb-4">
        <VBtn
          color="indigo-lighten-1"
          prepend-icon="mdi-content-save"
          variant="flat"
          rounded="lg"
          :ripple="false"
          :loading="isLoading"
          @click="onHandleSubmit()"
        >
          Guardar
        </VBtn>
        <VBtn
          class="ml-4"
          color="black"
          prepend-icon="mdi-close"
          variant="flat"
          rounded="lg"
          :ripple="false"
          :disabled="isLoading"
          to="/documents"
        >
          Cancelar
        </VBtn>
      </div>
    </VCard>
  </VForm>
</template>

<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';

import { Document } from '@/services/DocumentService.types';

defineOptions({
  name: 'BasicForm',
});

const props = defineProps({
  document: {
    type: Object as PropType<Document>,
    default: () => ({}),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['submit']);
const localModel = ref(props.document);

const schema = yup.object({
  title: yup.string().required('El titulo es requerido.'),
  provider_name: yup.string().required('El proveedor es requerido.'),
  register_date: yup.date().required('La fecha de creación es requerida.'),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    title: localModel.value.title,
    description: localModel.value.description,
    provider_name: localModel.value.provider_name,
    register_date: localModel.value.register_date,
    file: localModel.value.file_path,
  },
});

const title = useField('title');
const description = useField('description');
const provider_name = useField('provider_name');
const register_date = useField('register_date');
const file = useField<File>('file');

const onHandleSubmit = handleSubmit((values) => {
  emit('submit', values);
});
</script>
