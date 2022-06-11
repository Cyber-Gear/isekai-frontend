<template>
  <div class="page">
    <div class="banner">
      <div class="back_box" @click="goBack">
        <i class="iconfont icon-fanhui"></i>
        <span>{{ $t("message.btns.text1") }}</span>
      </div>
    </div>
    <div class="content">
      <div class="leftbox">
        <div class="cardbox">
          <img :src="card.card" alt="" />
          <span>{{ $t(card.name) }}</span>
          <div class="btn" :class="card.rarity" @click="openVideo">{{ $t("message.artist.text11") }}</div>
        </div>
        <div class="workbox">
          <div class="titlebtn">
            <div>
              <i class="iconfont icon-integral-fill"></i>
              {{ $t("message.artist.text4") }}
            </div>
            <!-- <div><i class="iconfont icon-arrow-up"></i></div> -->
          </div>
          <div class="text">
            <div>
              <pre>{{ $t(card.worddes) }}</pre>
            </div>
          </div>
        </div>
      </div>
      <div class="rightbox">
        <div :style="{ backgroundImage: `url(${card.card2})` }">
          <ul class="introbox1">
            <li>{{ $t(card.name) }}</li>
            <li>
              <div><i class="iconfont icon-shuxingchaxun"></i>{{ $t("message.artist.text5") }}</div>
              {{ $t(card.attribute) }}
            </li>
            <li>
              <div><i class="iconfont icon-pingfendengjiRating11"></i>{{ $t("message.artist.text6") }}</div>
              {{ $t(card.level) }}
            </li>
            <li>
              <div><i class="iconfont icon-pingfendengjiRating15"></i>{{ $t("message.artist.text7") }}</div>
              {{ $t(card.starlevel) }}
            </li>
            <li>
              <div><i class="iconfont icon-dengji"></i>{{ $t("message.artist.text8") }}</div>
              {{ card.rarity }}
            </li>
          </ul>
          <div class="introbox2">
            <div class="title">{{ $t("message.artist.text9") }}</div>
            <div class="text">
              <div>
                <pre>{{ $t(card.nftdes) }}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <PaintingVideo></PaintingVideo>
  </div>
</template>

<script>
import { nftworks } from "../../mock/nftworks";
import PaintingVideo from "../../components/PaintingVideo.vue";

export default {
  name: "DetailsShikastudio",
  components: { PaintingVideo },
  data() {
    return {
      card: null,
    };
  },
  created() {
    if (Object.keys(this.$route.query).length > 0) {
      nftworks.forEach((element) => {
        if (element.id === "shikastudio") {
          this.card = element.works[this.$route.query.id];
        }
      });
    }
  },
  methods: {
    openVideo() {
      this.$store.commit("setPlayVideoPopup", { isShow: true, name: this.$t(this.card.name), url: this.card.video });
    },
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
  padding-bottom: 1rem;
}
.banner {
  width: 100%;
  height: 1rem;
  position: relative;
}
.content {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: url($urlImages + "bg6.webp") no-repeat;
  background-size: 100% auto;
  padding: 0.3rem 0;
}
.leftbox {
  .cardbox {
    width: 3.35rem;
    height: 5.2rem;
    position: relative;
    > img {
      width: 100%;
      height: 100%;
    }
    span {
      font-size: 0.15rem;
      position: absolute;
      left: 0.2rem;
      top: 0.4rem;
    }
    .btn {
      cursor: pointer;
      width: 1.8rem;
      height: 0.4rem;
      font-size: 0.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0.4rem;
      margin: auto;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      transition: all 0.3s;
      &:hover {
        transform: scale(0.8);
      }
      &.MR {
        background-image: url($urlImages + "ShikaStudio/btn-MR.webp");
      }
      &.R {
        background-image: url($urlImages + "ShikaStudio/btn-R.webp");
      }
      &.SR {
        background-image: url($urlImages + "ShikaStudio/btn-SR.webp");
      }
      &.UR {
        background-image: url($urlImages + "ShikaStudio/btn-UR.webp");
      }
    }
  }
  .workbox {
    width: 3.15rem;
    margin: 0 auto;
    background: #18181c;
    border-radius: 0.04rem;
    border: 1px solid #535151;
    backdrop-filter: blur(0.07rem);
    .titlebtn {
      width: 100%;
      height: 0.6rem;
      background: rgba(129, 129, 151, 0.19);
      backdrop-filter: blur(0.07rem);
      padding: 0 0.1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        font-size: 0.15rem;
        font-weight: 600;
        i {
          font-size: 0.35rem;
        }
      }
    }
    .text {
      width: 100%;
      height: 1.15rem;
      font-size: 0.15rem;
      font-weight: 600;
      color: #81838b;
      padding: 0.1rem;
      div {
        width: 100%;
        height: 100%;
        padding: 0 0.1rem;
        overflow-y: auto;
      }
    }
  }
}
.rightbox {
  width: 7.7rem;
  height: 6.8rem;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.06rem;
  border: 1px solid #535151;
  backdrop-filter: blur(0.07rem);
  margin-left: 0.2rem;
  > div {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: right top;
    padding: 0 0.3rem;
    .introbox1 {
      li {
        display: flex;
        align-items: center;
        font-size: 0.12rem;
        font-weight: 600;
        padding: 0.2rem 0;
        &:nth-child(1) {
          font-size: 0.3rem;
          padding: 0.3rem 0;
        }
        i {
          font-size: 0.35rem;
          margin-right: 0.2rem;
        }
        div {
          width: 1.5rem;
          display: flex;
          align-items: center;
        }
      }
    }
    .introbox2 {
      width: 100%;
      height: 2.15rem;
      background: #18181c;
      border-radius: 0.06rem;
      padding: 0.1rem;
      margin-top: 0.5rem;
      .title {
        width: 100%;
        height: 0.3rem;
        padding: 0 0.1rem;
        font-size: 0.15rem;
        font-weight: 600;
      }
      .text {
        width: 100%;
        height: calc(100% - 0.3rem);
        font-size: 0.15rem;
        font-weight: bold;
        color: #81838b;
        div {
          width: 100%;
          height: 100%;
          padding: 0 0.1rem;
          overflow-y: auto;
        }
      }
    }
  }
}
</style>
