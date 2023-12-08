<template>
  <div class="page">
    <div class="container">
      <TheHeader></TheHeader>
      <TheSidebar></TheSidebar>
      <TheMain></TheMain>
    </div>
  </div>
</template>
<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheMain from "./components/layout/TheMain.vue";
import TheSidebar from "./components/layout/TheSidebar.vue";



export default {
  name: "App",
  components: {
    TheHeader,
    TheSidebar,
    TheMain,
  },
};
</script>
<style>
@import url("./css/layout.css");
</style>
