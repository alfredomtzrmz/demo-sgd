<template>
  <VDialog v-model="isOpen" width="auto" persistent>
    <VCard
      max-width="400"
      :prepend-icon="prependIcon"
      :title="title"
      :text="text"
    >
      <template v-slot:actions>
        <VSpacer />
        <VBtn
          :color="mainBtnColor"
          variant="flat"
          @click="onConfirm"
          :loading="isLoading"
        >
          {{ mainBtnText }}
        </VBtn>
        <VBtn
          :color="secondaryBtnColor"
          variant="flat"
          @click="onDismiss"
          :disabled="isLoading"
        >
          {{ secondaryBtnText }}
        </VBtn>
      </template>
    </VCard>
  </VDialog>
</template>

<script setup lang="ts">
defineOptions({
  name: 'BaseModal',
});

const emit = defineEmits(['update:modelValue', 'confirm', 'dismiss']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  prependIcon: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  mainBtnColor: {
    type: String,
    default: 'indigo-lighten-1',
  },
  mainBtnText: {
    type: String,
    default: 'Confirmar',
  },
  secondaryBtnColor: {
    type: String,
    default: 'black',
  },
  secondaryBtnText: {
    type: String,
    default: 'Cancelar',
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

function onConfirm() {
  emit('confirm');
}

function onDismiss() {
  emit('dismiss');
}
</script>
