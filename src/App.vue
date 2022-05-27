<template>
  <div id="container" :class="isEnLang ? 'fontfamily_en' : 'fontfamily_zh'" @scroll="handleScrollScroll($event)">
    <HeaderLayout />
    <div id="container_body">
      <div id="container_view">
        <router-view />
      </div>
      <FooterLayout />
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import HeaderLayout from "./layout/HeaderLayout";
import FooterLayout from "./layout/FooterLayout";
export default {
  components: { HeaderLayout, FooterLayout },
  computed: { ...mapGetters(["isEnLang"]) },
  data() {
    return {
      showToTop: false,
    };
  },
  mounted() {
    window.addEventListener("load", () => {
      this.resetRem();
    });
    window.addEventListener("resize", () => {
      this.resetRem();
    });
  },
  destroyed() {
    window.removeEventListener("load", this.resetRem());
    window.removeEventListener("resize", this.resetRem());
  },
  methods: {
    resetRem() {
      const clientWidth = document.body.clientWidth;
      let rem = 0;
      if (clientWidth > 1440) {
        // rem = (1440 * 100) / 1440;
        rem = 100;
      } else if (clientWidth <= 1440) {
        rem = (clientWidth * 100) / 1440;
      }
      document.getElementsByTagName("html")[0].style.fontSize = rem + "px";
    },
    handleScrollScroll(e) {
      this.showToTop = e.srcElement.scrollTop > 900;
      // console.log(this.showToTop);
    },
  },
};
</script>

<style lang="scss">
#container {
  width: 100%;
  min-height: 100vh;
  position: relative;
  color: #ffffff;
  background: #16161a;
  overflow: auto;
}
#container_body {
  width: 100%;
  min-height: 100vh;
  #container_view {
    width: 100%;
    min-height: calc(100vh - 4rem);
  }
}
</style>
