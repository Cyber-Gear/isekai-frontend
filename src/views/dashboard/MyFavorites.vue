<template>
  <div class="box">
    <div class="title">My Favorites</div>
  </div>
</template>

<script>
export default {
  name: "MyFavorites",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: auto;
}
.title {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.3rem;
  font-weight: bold;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  backdrop-filter: blur(7px);
  padding: 0 0.5rem;
  i {
    font-size: 0.3rem;
    margin-right: 0.1rem;
  }
}
</style>
