<template>
  <VNavigationDrawer
    v-model="drawer.show"
    class="bg-grey-lighten-5 px-3 py-3 position-fixed"
  >
    <div class="d-flex align-center">
      <img
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=400"
        alt="logo"
        class="w-25 mr-4"
      />
      <span class="font-weight-medium text-subtitle-2">
        Gestión Documentos
      </span>
    </div>
    <VList
      density="compact"
      nav
      :items="sidebarItems"
      class="mt-6"
      color="indigo"
    />
  </VNavigationDrawer>
</template>

<script setup lang="ts">
import { useDrawerStore } from '@/stores/drawer';

defineOptions({
  name: 'Sidebar',
});

const drawer = useDrawerStore();
const sidebarItems = [
  {
    title: 'Home',
    value: 'home',
    props: {
      prependIcon: 'mdi-home',
      ripple: false,
      rounded: 'lg',
      to: '/',
    },
  },
  { type: 'subheader', title: 'Gestión de Documentos' },
  {
    title: 'Documentos',
    value: 'documents',
    props: {
      prependIcon: 'mdi-file-outline',
      ripple: false,
      rounded: 'lg',
      to: '/documents',
      exact: true,
    },
  },
  {
    title: 'Nuevo documento',
    value: 'new-document',
    props: {
      prependIcon: 'mdi-plus-circle-outline',
      ripple: false,
      rounded: 'lg',
      to: '/documents/new',
      exact: true,
    },
  },
];
</script>
