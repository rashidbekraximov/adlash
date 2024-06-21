<template>
  <MainHeader />
  <MainSidebar />
  <div class="main-content d-flex flex-column transition overflow-hidden">
    <router-view />
    <MainFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import stateStore from "@/utils/store";

import MainHeader from "@/components/Layouts/MainHeader.vue";
// import Login from "@/view/Login.vue";
import MainSidebar from "@/components/Layouts/MainSidebar.vue";
import MainFooter from "@/components/Layouts/MainFooter.vue";

export default defineComponent({
  name: "App",
  components: {
    MainHeader,
    MainSidebar,
    MainFooter,
    // Login
  },
  data(){
    return {
      id: 0,
    }
  },
  mounted() {
    document.body.classList.add("bg-body-secondary");
  },
  setup() {
    const stateStoreInstance = stateStore;
    watchEffect(() => {
      if (stateStoreInstance.open) {
        document.body.classList.remove("sidebar-show");
        document.body.classList.add("sidebar-hide");
        console.log("show");
      } else {
        document.body.classList.remove("sidebar-hide");
        document.body.classList.add("sidebar-show");

        console.log("hide");
      }
    });
    return {};
  },
  created() {
    console.log(localStorage.getItem("lang"))
    if (localStorage.getItem("lang") !== null){
      this.id = 1;
    }else {
      this.id = 0;
    }
  }
});
</script>
<style scoped>

</style>