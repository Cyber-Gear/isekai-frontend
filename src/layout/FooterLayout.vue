<template>
  <div class="footer_box">
    <img src="../assets/images/footer_bg1.png" alt="" />
    <div class="center">
      <img src="../assets/images/logo1.png" alt="" />
      <div>
        <img src="../assets/images/contact1.png" alt="" />
        <img src="../assets/images/contact2.png" alt="" />
        <img src="../assets/images/contact3.png" alt="" />
        <img src="../assets/images/contact4.png" alt="" />
      </div>
    </div>
    <p>{{ $t("message.footer.text1") }}</p>
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
  background: url("../assets/images/footer_bg2.png") no-repeat;
  background-size: 100% auto;
  text-align: center;
  padding-top: 1.5rem;
  margin-top: 2rem;
  border-top: 2px solid #244647;
  position: relative;
  > img {
    width: 4rem;
    height: auto;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .center {
    width: 48%;
    margin: 0 auto;
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
  p {
    width: 50%;
    margin: 0.3rem auto;
    font-size: 0.15rem;
    font-weight: bold;
    color: #c1c3c5;
    letter-spacing: 0.08rem;
  }
}
</style>
