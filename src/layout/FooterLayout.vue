<template>
  <div class="footer_box">
    <div class="center">
      <img src="../assets/images/logo1.png" alt="" />
      <div>
        <img src="../assets/images/contact1.png" alt="" />
        <img src="../assets/images/contact2.png" alt="" />
        <img src="../assets/images/contact3.png" alt="" />
        <img src="../assets/images/contact4.png" alt="" />
      </div>
    </div>
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
  height: 4rem;
  background: url("../assets/images/footer_bg1.png") no-repeat;
  background-size: 100% auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .center {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > img {
      width: auto;
      height: 0.65rem;
    }
    > div {
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin: 0 0.05rem;
        cursor: pointer;
      }
    }
  }
}
</style>
