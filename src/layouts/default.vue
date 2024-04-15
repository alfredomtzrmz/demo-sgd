<template>
  <VApp id="inspire">
    <Sidebar />
    <Navbar />
    <VMain>
      <VContainer fluid tag="div" class="pa-lg-12 pa-8">
        <RouterView />
        <VSnackbar
          v-model="snackbar.show"
          :color="snackbar.color"
          timeout="2500"
        >
          {{ snackbar.message }}
        </VSnackbar>
      </VContainer>
    </VMain>
    <AppFooter />
  </VApp>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '@/stores/snackbar';

defineOptions({
  name: 'DocumentsIndex',
});

const snackbar = useSnackbarStore();
</script>
