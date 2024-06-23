<template>
  <HeaderVista />
  <div class="q-pa-md">
    <div class="text-h5">Vista 2</div>
    {{ lorem }}
  </div>
</template>

<script>
import HeaderVista from "src/components/HeaderVista.vue";
export default {
  components: {
    HeaderVista,
  },
  setup() {
    return {
      lorem:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    };
  },
};
</script>

<style lang="sass" scoped></style>
