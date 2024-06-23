import { defineStore } from "pinia";
import { ref } from "vue";

export const useInputStore = defineStore("input", () => {
  const countryName = ref("^Ca"); //al cargar la pagina trae estos paises que empiezen por 'Ca'
  const codeContinent = ref(["EU", "SA", "AF", "AS", "AN", "NA", "OC"]); //continentes por defecto

  function updateCountryName(newCountryName) {
    countryName.value = newCountryName;
  }

  function updateCodeContinent(newCodeContinent) {
    codeContinent.value = newCodeContinent;
  }

  return { countryName, updateCountryName, updateCodeContinent, codeContinent };
});
