<template>
  <div>
    <q-toolbar
      class="text-dark shadow-2 rounded-borders q-py-md no-shadow justify-center"
    >
      <div class="col-xs-12 col-sm-9">
        <q-input
          bg-color="white"
          color="grey-5"
          rounded
          outlined
          v-model="countryName"
          label="País"
          style="width: 100%"
          class="q-mx-auto"
        >
          <template v-slot:append>
            <q-chip
              @click="upperFirstLetter"
              size="1rem"
              color="primary"
              text-color="white"
            >
              <q-avatar icon="search"> </q-avatar>
              Buscar
            </q-chip>
          </template>
          <q-menu style="width: 500px">
            <div class="row">
              <div
                v-for="(item, index) in continents"
                :key="index"
                class="col-xs-6 col-sm-4 col-md-4 q-px-sm q-py-sm"
              >
                <q-card
                  class="card-continent shadow-1"
                  :class="link.includes(item.code) ? 'link-active' : ''"
                  @click="filterByContinent(item.code)"
                >
                  <q-img
                    :src="`src/assets/${item.imgUrl}`"
                    style="width: 100%; height: 80px"
                    spinner-color="white"
                  />
                  <q-card-section class="text-grey-9">
                    {{ item.label }}
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-menu>
        </q-input>
      </div>
    </q-toolbar>
  </div>
</template>
<script>
import { defineComponent, ref, computed } from "vue";
import { useInputStore } from "src/stores/input-store";
const continents = [
  {
    label: "América",
    name: "america",
    imgUrl: "america.jpg",
    code: "SA",
  },
  {
    label: "Europa",
    name: "europa",
    imgUrl: "europa.jpg",
    code: "EU",
  },
  {
    label: "Oceanía",
    name: "oceania",
    imgUrl: "oceania.jpg",
    code: "OC",
  },
  {
    label: "Asia",
    name: "asia",
    imgUrl: "asia.png",
    code: "AS",
  },
  {
    label: "Africa",
    name: "africa",
    imgUrl: "africa.png",
    code: "AF",
  },
];
export default defineComponent({
  name: "InputNameCountry",

  setup() {
    const defaultContinents = ref(["EU", "SA", "AF", "AS", "AN", "NA", "OC"]);
    const link = ref([]);
    const debounceValue = ref("");
    const debounceTimeout = ref();

    const store = useInputStore();
    const { updateCountryName, updateCodeContinent } = store;

    function upperFirstLetter() {
      if (debounceValue.value.length !== 0) {
        const countryName =
          "^" +
          debounceValue.value.charAt(0).toUpperCase() +
          debounceValue.value.slice(1);

        updateCountryName(countryName);
      }
    }
    function filterByContinent(continentCode) {
      if (link.value.includes(continentCode)) {
        link.value = link.value.filter((item) => item !== continentCode);
      } else {
        link.value.push(continentCode);
      }
      if (link.value.length === 0) {
        updateCodeContinent(defaultContinents.value);
      } else {
        const continentCodes = modifyArray(link.value);
        updateCodeContinent(continentCodes);
      }
    }
    function modifyArray(array) {
      const newArray = [...array];
      if (newArray.includes("SA")) {
        newArray.push("NA");
      }
      return newArray;
    }

    return {
      link,
      continents,
      upperFirstLetter,
      filterByContinent,
      countryName: computed({
        get() {
          return debounceValue.value;
        },
        set(val) {
          if (debounceTimeout.value) clearTimeout(debounceTimeout.value);

          debounceTimeout.value = setTimeout(() => {
            debounceValue.value = val;
            upperFirstLetter();
          }, 1500);
        },
      }),
    };
  },
});
</script>

<style lang="scss" scoped>
.link-active {
  border: 3px solid rgb(67, 169, 209);
  border-radius: 1.2rem;
}
.card-continent {
  width: 100%;
  border-radius: 1.2rem;
}
</style>
