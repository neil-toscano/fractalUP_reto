<template>
  <q-layout view="lHh Lpr lFf" class="bg-light-blue-1">
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-8">
      <div
        class="q-mx-md q-my-md text-h4 logo-container row justify-center items-center"
      >
        Logo
      </div>

      <q-list class="q-px-md">
        <q-item
          v-for="(item, index) in linksList"
          :key="index"
          clickable
          v-ripple
          class="q-my-md text-h6 link-item text-white"
          :active="link === item.name"
          active-class="my-menu-link"
          @click="handleRoute(item.link, item.name)"
        >
          <q-item-section> {{ item.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useDrawerStore } from "src/stores/example-store";

const linksList = [
  {
    title: "Home",
    name: "home",
    link: "home",
  },
  {
    title: "Vista1",
    name: "vista1",
    link: "vista_uno",
  },
  {
    title: "Vista2",
    name: "vista2",
    link: "vista_dos",
  },
];

export default defineComponent({
  name: "MainLayout",

  setup() {
    const link = ref("home");
    const store = useDrawerStore();
    const router = useRouter();
    const { leftDrawerOpen } = storeToRefs(store);
    function handleRoute(name, linkName) {
      link.value = linkName;
      router.push({ name: name });
    }
    return {
      link,
      text: ref(""),
      linksList,
      leftDrawerOpen,
      handleRoute,
    };
  },
});
</script>
<style lang="scss" scoped>
.link-item {
  width: 100%;
  border-radius: 10px;
}

.logo-container {
  border-radius: 10px;
  background-color: rgb(194, 191, 191);
  height: 4rem;
}

.my-menu-link {
  color: white;
  background: #f2c037;
}
</style>
