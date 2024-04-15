<template>
  <VAppBar elevation="0" class="bg-grey-lighten-5 border-b position-fixed">
    <VAppBarNavIcon @click="drawer.toggle()" />
  </VAppBar>
</template>

<script setup lang="ts">
import { useDrawerStore } from '@/stores/drawer';

defineOptions({
  name: 'Navbar',
});
const drawer = useDrawerStore();
</script>
