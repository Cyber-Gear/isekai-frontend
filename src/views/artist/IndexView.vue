<template>
  <div class="page">
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
          <div class="text_ellipsis_row_4">
            <pre>{{ $t(item.des) }}</pre>
          </div>
        </div>
        <img class="angle2" :src="`${$urlImages}angle2.webp`" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
import { nftworks } from "../../mock/nftworks";
export default {
  name: "ARTIST",
  data() {
    return {
      cardList: nftworks,
    };
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
  min-height: calc(100vh - 4rem);
  padding: 0.8rem 0;
  overflow: hidden;
  background: url($urlImages + "bg7.webp") no-repeat;
  background-size: 100% 100%;
}
.box_title {
  margin: 0.5rem 0;
}
.card_list {
  width: 90%;
  min-height: 9rem;
  overflow-y: auto;
  margin: 0 auto;
  li {
    float: left;
    width: 3rem;
    margin: 0.4rem;
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
      height: 2rem;
    }
    .center {
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      left: 0;
      right: 0;
      top: 1.75rem;
      margin: auto;
    }
    .bottom {
      width: 100%;
      height: auto;
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
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .page {
    width: 100%;
    padding-top: 1.8rem;
  }
  .box_title {
    margin: 1rem 0;
  }
  .card_list {
    min-height: 18rem;
    li {
      width: 5.9rem;
      margin: 0.2rem;
      border-radius: 0.2rem;
      &:hover {
        .angle2 {
        }
      }
      .angle2 {
        width: 0.3rem;
      }
      img {
      }
      .top {
        width: 100%;
        height: 3.95rem;
      }
      .center {
        width: 1rem;
        height: 1rem;
        top: 3.4rem;
      }
      .bottom {
        padding: 0.5rem 0.2rem 0.5rem 0.2rem;
        > div {
          &:nth-child(1) {
          }
          &:nth-child(2) {
            span {
              &:nth-child(2) {
              }
            }
          }
          &:nth-child(3) {
          }
        }
      }
    }
  }
}
</style>
