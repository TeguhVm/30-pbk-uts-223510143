import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    title: 'TUDOS',
  }),
  actions: {
    setTitle(newTitle) {
      this.title = newTitle;
    }
  }
});
