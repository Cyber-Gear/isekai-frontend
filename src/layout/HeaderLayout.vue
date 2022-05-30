<template>
  <div class="nav">
    <div>
      <img class="logo" src="../assets/images/logo1.webp" alt="" />
      <ul class="menu">
        <li v-for="(item, index) in navArr" :key="index" :class="{ active: navActive == index }" @click="toRoute(item)">
          <span>{{ $t(item.label) }}</span>
        </li>
      </ul>
      <div class="connect">
        <span @click="openWalletPopup">{{ $t("message.nav.text6") }}</span>
        <!-- <span>Ox8652....583D</span> -->
      </div>
      <div class="lang_box" @mouseover="showLangSelect = true" @mouseleave="showLangSelect = false">
        <span>{{ $i18n.locale.toUpperCase() }}</span>
        <img class="angle" src="../assets/images/angle.webp" alt="" />
        <transition name="select-lang" appear>
          <ul v-show="showLangSelect">
            <li v-for="(item, index) in langArr" :key="index" @click="selectLang(item)">
              <span> {{ item.toUpperCase() }}</span>
            </li>
          </ul>
        </transition>
      </div>
    </div>
    <WalletPopup v-if="isShowWalletPopup"></WalletPopup>
  </div>
</template>
<script>
import WalletPopup from "../components/WalletPopup.vue";
export default {
  components: { WalletPopup },
  data() {
    return {
      navActive: 0,
      navArr: [
        { label: "message.nav.text1", link: "/home", isOpen: true },
        { label: "message.nav.text2", link: "/artist", isOpen: true },
        { label: "message.nav.text3", link: "/dao", isOpen: true },
        { label: "message.nav.text4", link: "/launchpad", isOpen: true },
        { label: "message.nav.text5", link: "/market", isOpen: false },
      ],
      showLangSelect: false,
      langArr: ["en", "zh"],
      isShowWalletPopup: false,
    };
  },
  watch: {
    $route(to) {
      if (to.path == "/home") {
        this.navActive = 0;
      } else if (to.path.indexOf("/artist") !== -1) {
        this.navActive = 1;
      } else if (to.path.indexOf("/dao") !== -1) {
        this.navActive = 2;
      } else if (to.path.indexOf("/launchpad") !== -1) {
        this.navActive = 3;
      } else if (to.path.indexOf("/market") !== -1) {
        this.navActive = 4;
      }
    },
  },
  methods: {
    toRoute(item) {
      if (item.isOpen) this.$router.push(item.link);
      else this.$message({ message: this.$t("message.tips.text1") });
    },
    selectLang(item) {
      if (this.$i18n.locale == item) return (this.showLangSelect = false);
      this.showLangSelect = false;
      this.$i18n.locale = item;
      this.$utils.setCookie("LANG", this.$i18n.locale);
      // location.reload();
    },
    openWalletPopup() {
      this.isShowWalletPopup = true;
      this.$utils.forbiddenScroll();
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
  transition: all 0.5s;
  border-bottom: 1px solid #29a7e1;
  > div {
    width: 11.5rem;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 0.7rem;
      height: auto;
    }
    .menu {
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
          background: url("../assets/images/nav_active.webp") no-repeat;
          background-size: 75% auto;
          background-position: center;
        }
      }
    }
    .connect {
      cursor: pointer;
      font-size: 0.12rem;
      font-weight: 400;
      border-radius: 0.03rem;
      padding: 0.05rem 0.2rem;
      background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
    }
    .lang_box {
      cursor: pointer;
      padding: 0.05rem 0.1rem;
      background: url("../assets/images/btn_bg2.webp") no-repeat;
      background-size: 100% 100%;
      position: relative;
      display: flex;
      align-items: center;
      font-size: 0.14rem;
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
