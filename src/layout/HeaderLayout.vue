<template>
  <div class="nav">
    <img src="../assets/images/logo1.png" alt="" />
    <ul>
      <li v-for="(item, index) in navArr" :key="index" :class="{ active: navActive == index }" @click="toRoute(item.link)">
        <span>{{ $t(item.label) }}</span>
      </li>
    </ul>
    <div class="lang_box" @mouseover="showLangSelect = true" @mouseleave="showLangSelect = false">
      <img class="lang_img" :src="languageImage" alt="" />
      <img class="angle" src="../assets/images/angle.png" alt="" />
      <transition name="select-lang" appear>
        <ul v-show="showLangSelect">
          <li v-for="(item, index) in langArr" :key="index" @click="selectLang(item)">
            <img :src="item.image" alt="" />
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navActive: 0,
      navArr: [
        { label: "message.nav.text1", link: "/home" },
        { label: "message.nav.text2", link: "/home" },
        { label: "message.nav.text3", link: "/home" },
        { label: "message.nav.text4", link: "/home" },
      ],
      showLangSelect: false,
      languageImage: "",
      langArr: [
        { lang: "cn", image: require("../assets/images/national_cn.png") },
        { lang: "en", image: require("../assets/images/national_us.png") },
      ],
    };
  },
  watch: {
    $route(to, from) {
      if (from.matched.length && to.matched[0].path !== from.matched[0].path) {
        window.scrollTo(0, 0);
      }
      if (to.path == "/home") {
        this.navActive = 0;
      } else if (to.path == "/nft") {
        this.navActive = 1;
      }
    },
  },
  created() {
    this.languageImage = this.$i18n.locale == "cn" ? this.langArr[0].image : this.langArr[1].image;
  },
  methods: {
    toRoute(link) {
      if (link) this.$router.push(link);
    },
    selectLang(item) {
      if (this.$i18n.locale == item.lang) return (this.showLangSelect = false);
      this.$i18n.locale = item.lang;
      this.languageImage = item.image;
      this.$utils.setCookie("LANG", this.$i18n.locale);
      // location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100vw;
  height: 0.8rem;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: all 0.5s;
  border-bottom: 1px solid #29a7e1;
  > img {
    width: 1.3rem;
    height: auto;
  }
  > ul {
    height: 100%;
    display: flex;
    align-items: center;
    li {
      height: 80%;
      font-size: 0.19rem;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0 2vw;
      border-right: 1px solid;
      border-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), #29a7e1, rgba(0, 0, 0, 0)) 1 1;
      &:last-child {
        border-right: 0;
      }
      &.active {
        color: #29a7e1;
        background: url("../assets/images/nav_active.png") no-repeat;
        background-size: 75% auto;
        background-position: center;
      }
    }
  }
  .lang_box {
    cursor: pointer;
    padding: 0.05rem 0.1rem;
    background: url("../assets/images/btn_bg2.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    align-items: center;
    img {
      width: 0.2rem;
      height: auto;
    }
    ul {
      width: 100%;
      background: rgba(0, 0, 0, 0.5);
      text-align: center;
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 99;
      transition: transform 0.3s;
      transform-origin: top center;
      li {
        padding: 0.1rem 0;
        &:hover {
          background: #000;
        }
      }
    }
  }
  .select-lang-enter,
  .select-lang-leave-to {
    transform: scaleY(0);
  }
  .select-lang-enter-to,
  .select-lang-leave {
    transform: scaleY(1);
  }
}
</style>
