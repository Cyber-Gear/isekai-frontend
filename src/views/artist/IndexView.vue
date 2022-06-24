<template>
  <div class="page">
    <div class="box">
      <div class="box_title">
        <img :src="`${$urlImages}box_title1.webp`" alt="" />
        <span>{{ $t("artist.text1") }}</span>
      </div>
      <ul class="card_list">
        <li v-for="(item, index) in cardList" :key="index" @click="toDetail(item.id)">
          <div class="top"><img :src="item.logo" alt="" /></div>
          <div class="center"><img :src="item.avatar" alt="" /></div>
          <div class="bottom">
            <div>{{ $t(item.title) }}</div>
            <div>
              <span>{{ $t("artist.text2") }} </span>
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
  </div>
</template>

<script>
import { nftworks } from "@/mock/nftworks";
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
  padding: 0.8rem 0;
  background: url($urlImages + "bg7.webp") no-repeat;
  background-size: 100% 100%;
}
.box {
  width: 11.5rem;
  height: auto;
  margin: 0 auto;
}
.box_title {
  margin: 0.5rem 0;
}
.card_list {
  width: 100%;
  height: 9rem;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 0.1rem;
  justify-items: center;
  li {
    width: 2.75rem;
    height: fit-content;
    border-radius: 0.1rem;
    border: 1px solid #514f4f;
    position: relative;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background: #2f2e38;
      box-shadow: 0.08rem 0.1rem 0.1rem 0px #000000;
      backdrop-filter: blur(0.04rem);
      .angle2 {
        opacity: 1;
      }
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
    .angle2 {
      width: 0.1rem;
      height: auto;
      position: absolute;
      right: 0.1rem;
      bottom: 0.1rem;
      opacity: 0;
    }
  }
}
@media screen and (max-width: 750px) {
  .page {
    width: 100%;
    padding: 0.5rem 0;
  }
  .box {
    width: 100%;
    height: auto;
  }
  .box_title {
    margin: 0.3rem 0;
  }
  .card_list {
    width: 90%;
    height: 4.7rem;
    grid-template-columns: repeat(2, auto);
    grid-gap: 0.05rem;
    li {
      width: 1.6rem;
      border-radius: 0.05rem;
      .top {
        width: 100%;
        height: 1.05rem;
      }
      .center {
        width: 0.25rem;
        height: 0.25rem;
        top: 0.9rem;
      }
      .bottom {
        padding: 0.15rem 0.1rem 0.1rem 0.1rem;
        > div {
          &:nth-child(1) {
            font-size: 0.12rem;
            font-weight: bold;
          }
          &:nth-child(2) {
            font-size: 0.12rem;
          }
          &:nth-child(3) {
            margin-top: 0.1rem;
            font-size: 0.12rem;
          }
        }
      }
      .angle2 {
        width: 0.08rem;
        height: auto;
        right: 0.05rem;
        bottom: 0.05rem;
      }
    }
  }
}
</style>
