<template>
  <div class="nav">
    <img src="../assets/images/logo1.png" alt="" />
    <ul>
      <li v-for="(item, index) in navArr" :key="index" :class="{ active: navActive == index }" @click="toRoute(item.link)">
        <span>{{ $t(item.label) }}</span>
      </li>
    </ul>
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
  methods: {
    toRoute(link) {
      if (link) this.$router.push(link);
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
  ul {
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
}
</style>
