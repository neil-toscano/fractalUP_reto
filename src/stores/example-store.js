import { defineStore } from "pinia";
import { ref } from "vue";

export const useDrawerStore = defineStore("drawer", () => {
  const leftDrawerOpen = ref(false);
  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }

  return { leftDrawerOpen, toggleLeftDrawer };
});
