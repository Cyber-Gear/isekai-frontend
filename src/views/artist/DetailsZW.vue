<template>
  <div class="page">
    <div class="banner">
      <div class="back_box" @click="goBack">
        <i class="iconfont icon-fanhui"></i>
        <span>{{ $t("message.btns.text1") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { nftworks } from "../../mock/nftworks";
export default {
  name: "DetailsZW",
  data() {
    return {
      card: null,
    };
  },
  created() {
    if (Object.keys(this.$route.query).length > 0) {
      nftworks.forEach((element) => {
        if (element.id === "zw") {
          this.card = element.works[this.$route.query.id];
        }
      });
    }
  },
  methods: {
    goBack() {
      history.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding-top: 0.8rem;
}
.banner {
  width: 100%;
  height: 1rem;
  position: relative;
}
@media screen and (max-width: 750px) {
  .page {
    width: 100%;
    padding-top: 0.5rem;
  }
  .banner {
    width: 100%;
    height: 0.5rem;
  }
}
</style>
