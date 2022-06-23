<template>
  <div class="box">
    <div class="title">NFT Asstet</div>
    <div class="switch_box">
      <ul class="switch_list">
        <li class="active">ollection (0)</li>
        <li>on sale (0)</li>
      </ul>
      <div>
        <i class="iconfont icon-fuxuankuang-quanxuan"></i>
        <i class="iconfont icon-fuxuankuang-weiquanxuan"></i>
        Select all/Unselect
      </div>
    </div>
    <ul class="card_list">
      <li v-for="(item, index) in cardList" :key="index">
        <div class="card">
          <div class="top"><img :src="item.logo" alt="" /></div>
          <div class="center">
            <div>
              <span>{{ $t(item.name) }}</span>
              <img :src="`${$urlImages}icon1.webp`" alt="" />
            </div>
            <div>
              <span>{{ $t(item.title) }}</span>
              <span>88busd</span>
            </div>
            <div>{{ $t("message.artist.text10") }}77busd</div>
          </div>
          <div class="bottom">
            <i class="iconfont icon-favorites"></i>
          </div>
          <img class="angle2" :src="`${$urlImages}angle2.webp`" alt="" />
        </div>
        <div class="cancel_box">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { nftworks } from "../../mock/nftworks";
export default {
  name: "NFTAsstet",
  data() {
    return {
      cardList: [],
    };
  },
  created() {
    nftworks.forEach((element) => {
      if (element.id === "shikastudio") {
        this.cardList = element.works;
      }
    });
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
  margin-bottom: 0.2rem;
  i {
    font-size: 0.3rem;
    margin-right: 0.1rem;
  }
}
.switch_box {
  width: 100%;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ul {
    li {
      display: inline-block;
      cursor: pointer;
      width: fit-content;
      height: 0.3rem;
      line-height: 0.3rem;
      padding: 0 0.1rem;
      font-size: 0.12rem;
      font-weight: bold;
      border-radius: 0.07rem;
      &.active {
        background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
      }
    }
  }
  > div {
    cursor: pointer;
    font-size: 0.12rem;
    font-weight: bold;
    i {
      font-size: 0.15rem;
    }
  }
}
.card_list {
  width: 100%;
  height: 8rem;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  li {
    width: fit-content;
    height: fit-content;
    margin: 0 0.1rem 0.1rem 0;
    .card {
      border-radius: 0.1rem;
      overflow: hidden;
      border: 1px solid #3f3e43;
      backdrop-filter: blur(0.04rem);
      background: rgba(0, 0, 0, 0.38);
      cursor: pointer;
      transition: all 0.3s;
      .top {
        width: 2.5rem;
        height: 2.5rem;
      }
      .center {
        width: 100%;
        border-bottom: 1px solid rgba(132, 125, 125, 0.2);
        div {
          display: flex;
          align-items: center;
          padding: 0.05rem;
          font-size: 0.12rem;
          font-weight: bold;
          &:nth-child(1) {
            color: #00b1ff;
            img {
              width: 0.24rem;
              height: auto;
              margin-left: 0.1rem;
            }
          }
          &:nth-child(2) {
            justify-content: space-between;
          }
          &:nth-child(3) {
            justify-content: flex-end;
            font-weight: 600;
            color: #6c6a71;
          }
        }
      }
      .bottom {
        width: 100%;
        padding: 0.05rem 0.2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        i {
          color: #6c6a71;
          font-size: 0.25rem;
        }
      }
      img {
        width: 100%;
        height: 100%;
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
    &:hover,
    &.active {
      .card {
        background: rgba(51, 52, 60, 0.57);
        box-shadow: 5px 8px 10px 0px rgba(0, 0, 0, 0.5);
        .angle2 {
          opacity: 1;
        }
      }
      .cancel_box {
        background: rgba(51, 52, 60, 0.57);
      }
    }
    .cancel_box {
      width: 100%;
      height: 0.4rem;
      line-height: 0.4rem;
      background: rgba(0, 0, 0, 0.38);
      border-radius: 0.08rem;
      display: flex;
      justify-content: space-between;
      margin-top: 0.1rem;
      padding-left: 0.1rem;
      span {
        font-size: 0.15rem;
        font-weight: 400;
      }
      .el-button {
        width: 0.75rem;
        height: 0.4rem;
        font-size: 0.15rem;
        font-weight: 400;
      }
    }
  }
}
</style>
