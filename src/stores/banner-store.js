import { defineStore } from "pinia";
import { ref } from "vue";

export const useBannerStore = defineStore("banner", () => {
  const showDialog = ref(false);
  const countryInfo = ref({});
  function closeDialog() {
    showDialog.value = false;
  }

  function openDialog() {
    showDialog.value = true;
  }
  function updateCountryInfo(newCountryInfo) {
    countryInfo.value = newCountryInfo;
  }

  return {
    showDialog,
    closeDialog,
    openDialog,
    countryInfo,
    updateCountryInfo,
  };
});
