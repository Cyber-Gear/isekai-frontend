<template>
  <div class="page">
    <div class="bgbox">
      <img class="absolute1" :src="`${$urlImages}bg2.webp`" alt="" />
      <img class="absolute2" :src="`${$urlImages}bg3.webp`" alt="" />
    </div>
    <div class="box_title">
      <img :src="`${$urlImages}box_title1.webp`" alt="" />
      <span>{{ $t("message.artist.text1") }}</span>
    </div>
    <ul class="card_list">
      <li v-for="(item, index) in cardList" :key="index" @click="toDetail(item.id)">
        <div class="top"><img :src="item.logo" alt="" /></div>
        <div class="center"><img :src="item.avatar" alt="" /></div>
        <div class="bottom">
          <div>{{ $t(item.title) }}</div>
          <div>
            <span>{{ $t("message.artist.text2") }} </span>
            <span> {{ item.name }}</span>
          </div>
          <div>
            <pre>{{ $t(item.des) }}</pre>
          </div>
        </div>
        <img class="angle2" :src="`${$urlImages}angle2.webp`" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
import { nftworks } from "./nftworks";
export default {
  name: "ARTIST",
  data() {
    return {
      cardList: [],
    };
  },
  created() {
    this.cardList = nftworks;
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: "artist-details", query: { id: id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding-top: 0.8rem;
  padding-bottom: 1rem;
  overflow: hidden;
}
.bgbox {
  width: 100%;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
  }
  .absolute1 {
    top: 0;
  }
  .absolute2 {
    top: 5rem;
  }
}
.box_title {
  margin: 0.5rem 0;
}
.card_list {
  max-width: 85%;
  height: 12rem;
  overflow-y: auto;
  margin: 0 auto;
  // display: flex;
  // flex-wrap: wrap;
  // display: grid;
  // grid-gap: 5vw;
  // grid-template-columns: repeat(3, 1fr);
  li {
    float: left;
    width: 3rem;
    height: 4rem;
    margin: 0.5rem;
    overflow: hidden;
    border-radius: 0.1rem;
    border: 1px solid #514f4f;
    position: relative;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: #2f2e38;
      box-shadow: 0.08rem 0.1rem 0.1rem 0px #000000;
      backdrop-filter: blur(0.04rem);
      .angle2 {
        opacity: 1;
      }
    }
    .angle2 {
      width: 0.1rem;
      height: auto;
      position: absolute;
      right: 0.1rem;
      bottom: 0.1rem;
      opacity: 0;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .top {
      width: 100%;
      height: 50%;
    }
    .center {
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .bottom {
      width: 100%;
      height: 50%;
      padding: 0.3rem 0.1rem 0.1rem 0.1rem;
      > div {
        text-align: center;
        &:nth-child(1) {
          font-size: 0.2rem;
          font-weight: 600;
        }
        &:nth-child(2) {
          font-size: 0.12rem;
          font-weight: bold;
          span {
            &:nth-child(2) {
              color: #00d6ff;
            }
          }
        }
        &:nth-child(3) {
          margin-top: 0.2rem;
          font-size: 0.12rem;
          text-align: left;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
