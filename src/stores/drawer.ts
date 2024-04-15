import { defineStore } from 'pinia';

export interface Drawer {
  show: boolean;
}

export const useDrawerStore = defineStore('drawer', {
  state: (): Drawer => ({
    show: true,
  }),
  actions: {
    toggle(): void {
      this.show = !this.show;
    },
  },
});
