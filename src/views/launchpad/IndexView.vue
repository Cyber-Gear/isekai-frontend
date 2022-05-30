<template>
  <div class="page">
    <div class="tip_box">当前项目处于上架状态</div>
    <div class="box">
      <div class="leftbox">
        <div class="blindbox">
          <img src="../../assets/images/card_img1.webp" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LAUNCHPAD",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding-top: 0.8rem;
  padding-bottom: 1rem;
}
.tip_box {
  max-width: 1050px;
  width: 100%;
  height: 0.75rem;
  line-height: 0.75rem;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  backdrop-filter: blur(0.07rem);
  margin: 0.4rem auto;
  font-size: 0.2rem;
  font-weight: 600;
  color: #969494;
  text-align: center;
}
.box {
  width: 100%;
  height: auto;
}
</style>
