<template>
  <div id="container" :class="isEnLang ? 'fontfamily_en' : 'fontfamily_zh'">
    <HeaderLayout />
    <div id="container_body">
      <div id="container_view">
        <router-view />
      </div>
      <FooterLayout />
    </div>
    <el-backtop></el-backtop>
    <WalletListPopup></WalletListPopup>
    <WalletConnectPopup></WalletConnectPopup>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HeaderLayout from "./layout/HeaderLayout.vue";
import FooterLayout from "./layout/FooterLayout.vue";
import WalletListPopup from "./components/WalletListPopup.vue";
import WalletConnectPopup from "./components/WalletConnectPopup.vue";

export default {
  components: { HeaderLayout, FooterLayout, WalletListPopup, WalletConnectPopup },
  computed: { ...mapGetters(["isEnLang"]) },
  data() {
    return {};
  },
  mounted() {
    window.addEventListener("load", () => {
      this.resetRem();
    });
    window.addEventListener("resize", () => {
      this.resetRem();
    });
    this.$utils.addEventListenerFun();
  },
  beforeDestroy() {
    window.removeEventListener("load", this.resetRem());
    window.removeEventListener("resize", this.resetRem());
  },
  methods: {
    resetRem() {
      const clientWidth = document.body.clientWidth;
      let rem = 0;
      if (clientWidth >= 1440) {
        rem = 100;
      } else {
        rem = (clientWidth * 100) / 1440;
      }
      // if (clientWidth >= 1440) {
      //   rem = 100;
      // } else if (clientWidth > 750 && clientWidth < 1440) {
      //   rem = (clientWidth * 100) / 1440;
      // } else if (clientWidth <= 750) {
      //   rem = (clientWidth * 100) / 375;
      // }
      console.log(rem);
      document.getElementsByTagName("html")[0].style.fontSize = rem + "px";
    },
  },
};
</script>

<style lang="scss">
#container {
  width: 100%;
  height: 100vh;
  position: relative;
  color: #ffffff;
  background: #16161a;
  overflow: auto;
}
#container_body {
  width: 100%;
  height: 100%;
  #container_view {
    width: 100%;
    min-height: calc(100vh - 4rem);
  }
}
@media screen and (max-width: 750px) {
  #container {
    height: calc(100vh - 3rem);
  }
  #container_body {
    width: 100%;
    height: 100%;
    #container_view {
      width: 100%;
      min-height: calc(100vh - 4rem - 3rem);
    }
  }
}
</style>
