<template>
  <div class="nav">
  
  </div>
</template>

<script>
export default {
  data() {
    return {
  
    };
  },
  watch: {
    $route(to) {
      // if (from.matched.length && to.matched[0].path !== from.matched[0].path) {
      //  window.scrollTo(0, 0);
      // }
      if (to.path == "/home") {
      } else if (to.path == "/nft") {
      }
    },
  },
  created() {
  },
  methods: {

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
}

.select-lang-enter,
.select-lang-leave-to {
  transform: scaleY(0);
}
.select-lang-enter-to,
.select-lang-leave {
  transform: scaleY(1);
}
</style>
