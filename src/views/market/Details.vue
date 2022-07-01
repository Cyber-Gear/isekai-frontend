<template>
  <div class="page">
    <div class="banner">
      <div class="back_box" @click="goBack">
        <i class="iconfont pcfanhui"></i>
        <span>{{ $t("btns.text1") }}</span>
      </div>
    </div>
    <div class="content-box">
      <div class="character">
        <div class="leftbox">
          <img :src="card.card" alt="" />
          <span>{{ $t(card.name) }}</span>
          <div class="btn" :class="card.rarity" @click="openVideo">
            {{ $t("artist.text11") }}
          </div>
        </div>
        <div class="rightbox">
          <div>{{ $t(card.title) }} - {{ $t(card.name) }}</div>
          <div>
            <span>{{ $t("artist.text2") }} </span>
            <span> {{ name }}</span>
          </div>
          <div></div>
          <div>
            <i class="iconfont pcdollar"></i>
            <span>价格</span>
            <span>50BUSD</span>
          </div>
          <div>
            <span>属于</span>
            <span>0x88...98g7</span>
            <el-button>购买</el-button>
          </div>
          <div>
            <i class="iconfont pcshuxingchaxun"></i>
            <span>属性</span>
          </div>
          <div class="attr_content">
            <ul class="left_box">
              <li>
                <span>属性</span>
                <span>{{ $t(card.attribute) }}</span>
              </li>
              <li>
                <span>等级</span>
                <span>一级</span>
              </li>
              <li>
                <span>星级</span>
                <span>一级</span>
              </li>
              <li>
                <span>稀有度</span>
                <span>{{ $t(card.rarity) }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="introduction">
        <span>人物介绍</span>
        <div class="content">
          <div>
            <pre>{{ $t(card.nftdes) }}</pre>
          </div>
        </div>
      </div>

      <div class="history">
        <span>交易记录</span>
        <div class="content">
          <ul>
            <li v-for="index of 10" :key="index">
              <span>From</span>
              <span>0x23...56e4</span>
              <span>to</span>
              <span>0x45...4e53</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog center top="0" :title="$t(card.name)" :visible.sync="isShowPopup" :modal-append-to-body="false" :destroy-on-close="true">
      <PaintingVideo :videoUrl="card.video"></PaintingVideo>
    </el-dialog>
  </div>
</template>
<script>
import PaintingVideo from "@/components/PaintingVideo.vue";
import { shikastudio } from "@/mock/nftworks";
export default {
  name: "MarketDetails",
  components: { PaintingVideo },
  data() {
    return {
      card: null,
      name: null,
      isShowPopup: false,
    };
  },
  created() {
    if (Object.keys(this.$route.query).length > 0) {
      const id = this.$route.query.id;
      this.card = shikastudio.works.find((item) => item.id == id);
      this.name = shikastudio.name;
    }
  },
  methods: {
    openVideo() {
      this.isShowPopup = true;
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
  background: url($urlImages + "bg5.webp") no-repeat;
  background-size: 100% 100%;
}
.banner {
  width: 100%;
  height: 1rem;
  position: relative;
}
.content-box {
  width: 14.94rem;
  height: 10.17rem;
  margin: 0.8rem auto 1.65rem auto;
  .character {
    width: 100%;
    height: 6.17rem;
    background-color: #2a2a32;
    border-radius: 0.15rem;
    border: 3px solid #2f464d;
    margin-bottom: 0.36rem;
    position: relative;
    .leftbox {
      width: 3.8rem;
      height: 6rem;
      position: absolute;
      transform: translate(0, -50%);
      margin-left: 1.8rem;
      top: 50%;
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

    .rightbox {
      width: 6.6rem;
      height: 5rem;
      position: absolute;
      top: 46%;
      left: 45%;
      transform: translate(0, -50%);
      margin-left: 0.56rem;
      > div {
        &:nth-child(1) {
          font-size: 0.3rem;
          font-weight: 600;
        }
        &:nth-child(2) {
          margin-top: 0.11rem;
          margin-left: 0.11rem;
          font-size: 0.17rem;
          font-weight: bold;
          span {
            &:nth-child(2) {
              color: #13aac2;
              margin-left: 0.02rem;
            }
          }
        }
        &:nth-child(3) {
          width: 6.6rem;
          height: 0.02rem;
          border-radius: 0.01rem;
          background-image: linear-gradient(to right, #5f466e, #366371);
          margin: 0.1rem 0 0.34rem 0;
        }
        &:nth-child(4) {
          margin-bottom: 0.35rem;
          i {
            font-size: 0.36rem;
            vertical-align: bottom;
            margin-right: 0.05rem;
          }
          span {
            font-size: 0.26rem;
            font-weight: 600;
            &:nth-child(3) {
              color: #13aac2;
              margin-left: 0.4rem;
            }
          }
        }
        &:nth-child(5) {
          display: flex;
          align-items: center;
          font-size: 0.2rem;
          font-weight: 600;
          color: #5e5d5e;
          width: 100%;
          height: 0.5rem;
          border-radius: 0.065rem;
          padding: 0 0.1rem 0 0.15rem;
          background-color: #1d1d22;
          span {
            &:nth-child(1) {
              margin-right: 0.06rem;
            }
          }
          .el-button {
            width: 1.06rem;
            height: 0.36rem;
            border-radius: 0.015rem;
            font-size: 0.18rem;
            margin-left: auto;
            background-image: linear-gradient(to right, #366371, #5f466e);
            color: #d5dbe1;
          }
        }
        &:nth-child(6) {
          margin: 0.24rem 0;
          font-size: 0.26rem;
          font-weight: 600;
          i {
            font-size: 0.27rem;
            margin: 0 0.11rem 0 0.07rem;
          }
        }
      }
      .attr_content {
        width: 100%;
        height: 2.07rem;
        background-color: #1d1d22;
        border-radius: 0.085rem;
        display: flex;
        justify-content: space-between;
        .left_box {
          width: 1.82rem;
          height: 2.05rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.15rem;
          li {
            font-size: 0.17rem;
            font-weight: bold;
            span {
              &:nth-child(1) {
                margin-right: 0.67rem;
              }
            }
          }
        }
      }
    }
  }

  .introduction {
    float: left;
    width: 7.17rem;
    height: 2.97rem;
    span {
      display: inline-block;
      text-align: right;
      width: 1.33rem;
      height: 0.33rem;
      border-left: #12b2cb solid 0.05rem;
      margin-bottom: 0.28rem;
      font-size: 0.26rem;
      font-weight: 600;
    }
    .content {
      width: 100%;
      height: 3rem;
      background-color: #2a2a32;
      border-radius: 0.15rem;
      border: 3px solid #2f464d;
      padding: 0.3rem 0.35rem 0.3rem 0;
      div {
        height: 100%;
        overflow-y: auto;
        padding: 0.2rem;
        pre {
          color: #aeaeb1;
          font-size: 0.17rem;
          font-weight: 600;
          line-height: 0.24rem;
        }
      }
    }
  }

  .history {
    float: right;
    width: 7.17rem;
    height: 2.97rem;
    > span {
      display: inline-block;
      text-align: right;
      width: 1.33rem;
      height: 0.33rem;
      border-left: #12b2cb solid 0.05rem;
      margin-bottom: 0.28rem;
      font-size: 0.26rem;
      font-weight: 600;
    }
    .content {
      width: 100%;
      height: 3rem;
      background-color: #2a2a32;
      border-radius: 0.15rem;
      border: 3px solid #2f464d;
      padding: 0.3rem 0.2rem 0.3rem 0.3rem;

      ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        li {
          font-size: 0.19rem;
          font-weight: 600;
          color: #bdbdbf;
          margin-bottom: 0.4rem;
          span {
            &:nth-child(1) {
              margin-right: 0.63rem;
            }
            &:nth-child(3) {
              margin: 0 1.1rem;
            }
            &:nth-child(4) {
              margin-left: 0.25rem;
            }
          }
        }
      }
    }
  }
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
