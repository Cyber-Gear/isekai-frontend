<template>
  <div class="nav">
    <div class="nav_inset">
      <img class="logo" :src="`${$urlImages}logo1.webp`" alt="" />
      <ul class="menu_pc pc">
        <li v-for="(item, index) in navArr" :key="index" :class="{ active: navActive == index }" @click="toRoute(item)">
          <span>{{ $t(item.label) }}</span>
        </li>
      </ul>
      <ul class="menu_mobile mobile">
        <li v-for="(item, index) in navArr" :key="index" :class="{ active: navActive == index }" @click="toRoute(item)">
          <div>
            <i class="iconfont" :class="item.icon"></i>
            <div>{{ $t(item.label) }}</div>
          </div>
        </li>
      </ul>
      <div class="connect_lang">
        <div class="connect" @mouseover="showDisconnectFun" @mouseleave="hiddenDisconnectFun">
          <span v-if="getWalletAccount">
            {{ getWalletAccount | ellipsisWallet }}
          </span>
          <span v-else @click="openWalletPopup">{{ $t("message.nav.text6") }}</span>
          <transition name="showDisconnect" appear>
            <div v-show="showDisconnect" class="disconnect" @click="clickDisconnect">
              <span>{{ $t("message.nav.text7") }}</span>
              <i class="iconfont icon-block"></i>
            </div>
          </transition>
        </div>
        <div class="lang_box" @mouseover="showLangSelect = true" @mouseleave="showLangSelect = false">
          <span>{{ $i18n.locale.toUpperCase() }}</span>
          <img class="angle" :src="`${$urlImages}angle.webp`" alt="" />
          <transition name="showLangSelect" appear>
            <ul v-show="showLangSelect">
              <li v-for="(item, index) in langArr" :key="index" @click="selectLang(item)">
                <span> {{ item.toUpperCase() }}</span>
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "HeaderLayout",
  data() {
    return {
      navActive: 0,
      navArr: [
        { label: "message.nav.text1", icon: "icon-home", link: "/home", isOpen: true },
        { label: "message.nav.text2", icon: "icon-bussiness-man", link: "/artist", isOpen: true },
        { label: "message.nav.text3", icon: "icon-qukuailian", link: "/dao", isOpen: true },
        { label: "message.nav.text4", icon: "icon-boxhezi", link: "/launchpad", isOpen: true },
        { label: "message.nav.text5", icon: "icon-tradingvolume", link: "/market", isOpen: false },
      ],
      showLangSelect: false,
      showDisconnect: false,
      langArr: ["en", "zh"],
    };
  },
  computed: { ...mapGetters(["getWalletAccount"]) },
  watch: {
    $route(to) {
      window.scrollTo(0, 0);
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
      // this.showLangSelect = false;
      // this.$i18n.locale = item;
      this.$utils.setCookie("LANG", item);
      location.reload();
    },
    openWalletPopup() {
      this.$store.commit("setWalletListPopup", true);
    },
    showDisconnectFun() {
      if (this.getWalletAccount) this.showDisconnect = true;
    },
    hiddenDisconnectFun() {
      if (this.getWalletAccount) this.showDisconnect = false;
    },
    clickDisconnect() {
      this.showDisconnect = false;
      this.$utils.walletDisconnect();
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
  .nav_inset {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0 5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 0.7rem;
      height: auto;
    }
    .connect_lang {
      display: flex;
      align-items: center;
      .connect {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.15rem;
        font-weight: 400;
        padding: 0.05rem 0.1rem;
        background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
        border-radius: 0.03rem;
        position: relative;
        .disconnect {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
          border-radius: 0.03rem;
          position: absolute;
          top: 110%;
          transition: transform 0.3s;
          transform-origin: top center;
        }
      }
      .lang_box {
        cursor: pointer;
        padding: 0.05rem 0.1rem;
        background: url($urlImages + "btn_bg2.webp") no-repeat;
        background-size: 100% 100%;
        position: relative;
        margin-left: 0.2rem;
        display: flex;
        align-items: center;
        font-size: 0.15rem;
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
  }

  .showLangSelect-enter,
  .showLangSelect-leave-to,
  .showDisconnect-enter,
  .showDisconnect-leave-to {
    transform: scaleY(0);
  }
  .showLangSelect-enter-to,
  .showLangSelect-leave,
  .showDisconnect-enter-to,
  .showDisconnect-leave {
    transform: scaleY(1);
  }
}
.menu_pc {
  height: 100%;
  display: flex;
  align-items: center;
  li {
    height: 80%;
    font-size: 0.2rem;
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
      background: url($urlImages + "nav_active.webp") no-repeat;
      background-size: 75% auto;
      background-position: center;
    }
  }
}
.menu_mobile {
  width: 100vw;
  height: 0.8rem;
  background: #0a0a0d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0 0.2rem;
  li {
    font-size: 0.12rem;
    font-weight: 400;
    color: #ffffff;
    i {
      font-size: 0.3rem;
    }
    &.active {
      color: #29a7e1;
    }
  }
}

@media screen and (max-width: 750px) {
  .nav {
    width: 100vw;
    height: 0.45rem;
    .nav_inset {
      padding: 0 0.3rem;
      .logo {
        width: 0.44rem;
        height: auto;
      }
      .connect_lang {
        .connect {
          font-size: 0.12rem;
          font-weight: 400;
          padding: 0.05rem 0.1rem;
          border-radius: 0.03rem;
          .disconnect {
            border-radius: 0.03rem;
          }
        }
        .lang_box {
          font-size: 0.12rem;
          padding: 0.05rem 0.1rem;
          margin-left: 0.2rem;
          img {
            width: 0.2rem;
            height: auto;
          }
          ul {
            li {
              padding: 0.1rem 0;
              &:hover {
              }
            }
          }
        }
      }
    }
  }
}
</style>
