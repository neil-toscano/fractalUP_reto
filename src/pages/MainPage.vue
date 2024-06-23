<template>
  <HeaderVista />
  <InputNameCountry />
  <div class="row justify-start">
    <div
      v-for="(item, index) in listCountries"
      :key="index"
      class="col-xs-6 col-sm-4 col-md-3 q-my-sm q-px-sm"
    >
      <q-card
        @click="showCountryInfo(item.code)"
        style="border-radius: 2rem; height: 100%"
      >
        <q-img :src="item.urlImg" height="150px" alt="not found" />

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col-4">
              <img :src="item.urlImgFlag" alt="not found" style="width: 100%" />
            </div>
            <div class="col-8 q-pl-xs q-pt-xs">
              <div class="text-subtitle1 text-light-blue-13">
                {{ item.name }}
              </div>
              <div class="text-subtitle1 text-grey-7">
                {{ item.continent.name }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  <BannerCountryInfo />
</template>

<script>
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { api } from "boot/axios";
import { useInputStore } from "src/stores/input-store";
import { useBannerStore } from "src/stores/banner-store";
import { storeToRefs } from "pinia";

import HeaderVista from "src/components/HeaderVista.vue";
import InputNameCountry from "src/components/InputNameCountry.vue";
import BannerCountryInfo from "src/components/BannerCountryInfo.vue";

export default {
  components: {
    HeaderVista,
    InputNameCountry,
    BannerCountryInfo,
  },
  setup() {
    const inputStore = useInputStore();
    const bannerStore = useBannerStore();

    const { countryName, codeContinent } = storeToRefs(inputStore);
    const { updateCountryInfo, openDialog } = bannerStore;

    const showDialog = ref(false);
    const listCountries = ref([]);

    const { result, onResult, onError } = useQuery(
      gql`
        query ListCountriesByNamePrefix(
          $startsWith: String!
          $codeContinent: [String!]!
        ) {
          countries(
            filter: {
              name: { regex: $startsWith }
              continent: { in: $codeContinent }
            }
          ) {
            code
            name
            capital
            currency
            continent {
              name
            }
            languages {
              native
              name
            }
          }
        }
      `,
      {
        startsWith: countryName,
        codeContinent: codeContinent,
      }
    );

    function showCountryInfo(code) {
      const data = listCountries.value.filter(
        (element) => element.code === code
      );
      updateCountryInfo(data[0]);
      openDialog();
    }

    async function callEndpoint(element) {
      const { data } = await api.get(
        `?key=44528691-4fb091d41bdf0200493200984&q=${element.capital}+${element.name}&image_type=photo&per_page=3`
      );
      return {
        ...element,
        urlImg: data.hits[0].webformatURL,
        urlImgFlag: `https://flagsapi.com/${element.code}/flat/64.png`,
      };
    }
    async function getCapitalPhotoByCountry(countries) {
      const promises = countries.map((element) => callEndpoint(element));
      const results = await Promise.all(promises);
      listCountries.value = results;
    }

    onResult((result, context) => {
      if (result.loading) return;
      getCapitalPhotoByCountry(result.data.countries);
    });

    onError((error) => {
      console.log(error);
    });

    return {
      showDialog,
      listCountries,
      showCountryInfo,
    };
  },
};
</script>
<style lang="scss" scoped>
.my-card {
  width: 100%;
}
</style>
