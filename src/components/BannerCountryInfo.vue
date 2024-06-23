<template>
  <q-banner
    v-if="showDialog"
    class="bg-white text-dark q-pa-none"
    style="position: fixed; bottom: 0; right: 0; max-width: 300px"
  >
    <q-card class="my-card">
      <q-card-section class="row items-start">
        <q-img
          class="col-10 q-mt-md"
          :src="countryInfo.urlImg"
          style="height: 150px; border-radius: 1rem"
          alt="not found"
        />
        <q-space />
        <q-btn
          class="q-mt-none"
          @click="closeDialog"
          icon="close"
          flat
          round
          dense
        />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="row">
          <div class="col-4">
            <img :src="countryInfo.urlImgFlag" alt="not found" />
          </div>
          <div class="col-8">
            <div class="text-h6 text-light-blue-13">
              {{ countryInfo.name }}
            </div>
            <div class="text-subtitle1 text-grey-7">
              {{ countryInfo.continent.name }}
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-xs">
        <div class="text-h6 text-light-blue-13">
          Capital:
          <span class="text-h6 text-grey-7">{{ countryInfo.capital }}</span>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-xs">
        <div class="text-h6 text-light-blue-13">
          Language:
          <span class="text-h6 text-grey-7">{{
            countryInfo.languages[0].name
          }}</span>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-xs">
        <div class="text-h6 text-light-blue-13">
          Population: <span class="text-h6 text-grey-7">500K people</span>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none q-pb-xs">
        <div class="text-h6 text-light-blue-13">
          currency:
          <span class="text-h6 text-grey-7">{{ countryInfo.currency }}</span>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-h6 text-light-blue-13">
          Region:
          <span class="text-h6 text-grey-7">{{
            countryInfo.continent.name
          }}</span>
        </div>
      </q-card-section>
    </q-card>
  </q-banner>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useBannerStore } from "src/stores/banner-store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "BannerCountryInfo",

  setup() {
    const store = useBannerStore();
    const { closeDialog } = store;
    const { showDialog, countryInfo } = storeToRefs(store);

    return {
      showDialog,
      closeDialog,
      countryInfo,
    };
  },
});
</script>
