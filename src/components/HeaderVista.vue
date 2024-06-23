<template>
  <div class="q-gutter-y-sm">
    <q-toolbar class="text-white bg-primary q-mx-none q-my-none">
      <q-btn flat round dense icon="menu" @click="toggleLeftDrawer" />
      <q-toolbar-title> FractalUP </q-toolbar-title>
    </q-toolbar>
  </div>
</template>
<script>
import { defineComponent } from "vue";
import { useDrawerStore } from "src/stores/example-store";
export default defineComponent({
  name: "HeaderVista",

  setup() {
    const store = useDrawerStore();
    const { toggleLeftDrawer } = store;

    return {
      toggleLeftDrawer,
    };
  },
});
</script>
