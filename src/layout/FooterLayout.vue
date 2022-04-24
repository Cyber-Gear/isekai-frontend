<template>
  <div class="footer_box">
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.footer_box {
  width: 100%;
  height: 35vw;
  text-align: center;
  padding-top: 0.8rem;
  > img {
    width: 4.3rem;
    height: auto;
  }
  > div {
    width: 4.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0.2rem auto;
    img {
      width: 0.5rem;
      height: 0.5rem;
      cursor: pointer;
    }
  }
  > p {
    font-size: 0.15rem;
    font-weight: bold;
  }
}
</style>
