import { defineStore } from 'pinia';

export interface Snackbar {
  show: boolean;
  message: string;
  color: string;
}

export const useSnackbarStore = defineStore('snackbar', {
  state: (): Snackbar => ({
    show: false,
    message: '',
    color: '',
  }),
  actions: {
    setSnackbar(message: string, color: string): void {
      this.show = true;
      this.message = message;
      this.color = color;
    },
  },
});
