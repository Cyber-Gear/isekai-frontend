<template>
  <div class="page">
    <div class="banner">
      <div class="back_box" @click="goBack">
        <i class="iconfont pcfanhui"></i>
        <span>{{ $t("btns.text1") }}</span>
      </div>
    </div>
    <div class="pc-content-box pc">
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
            <el-button @click="toOrder">挂单</el-button>
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
      <div class="description">
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
    </div>

    <div class="mobile-content-box mobile">
      <div class="title">
        <div class="row1">
          <div class="row_left">
            <span>{{ name }}</span>
            <img :src="`${$urlImages}icon1.webp`" alt="" />
          </div>
          <div class="row_right">
            <img :src="`${$urlImages}contact1.webp`" alt="" />
            <img :src="`${$urlImages}contact2.webp`" alt="" />
            <img :src="`${$urlImages}contact3.webp`" alt="" />
            <img :src="`${$urlImages}contact4.webp`" alt="" />
          </div>
        </div>
        <div class="row2">{{ $t(card.title) }} - {{ $t(card.name) }}</div>
      </div>

      <div class="cardbox">
        <div class="header"></div>
        <div class="box_content">
          <img :src="card.logo" alt="" />
          <div class="btn" :class="card.rarity" @click="openVideo">
            {{ $t("artist.text11") }}
          </div>
        </div>
      </div>
      <div class="purchase box">
        <div class="header">
          <i class="iconfont pcqianbao2-mianxing"></i>
          <span>Sale ends July 15, 2022 at 4:48pm GMT+8 </span>
        </div>
        <div class="pur_body">
          <div>Current price</div>
          <div>
            <img :src="`${$urlImages}coin.webp`" alt="" />
            <span>12</span>
            <span>($123)</span>
          </div>
          <div class="btn_list">
            <div>
              <el-button>
                <i class="iconfont pcqianbao2-mianxing"></i>
                <span>Buy now</span>
              </el-button>
            </div>
            <div>
              <el-button>
                <i class="iconfont pcdollar"></i>
                <span>Make offer</span>
              </el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="attribute box">
        <div class="header" @click="clickHandler1">
          <i class="iconfont pcshuxingchaxun"></i>
          <span>属性</span>
          <span class="arrow">
            <i
              class="el-collapse-item__arrow el-icon-arrow-right"
              v-show="!contentBox[0].isActived"
            ></i>
            <i
              class="el-collapse-item__arrow el-icon-arrow-right is-active"
              v-show="contentBox[0].isActived"
            ></i>
          </span>
        </div>
        <div class="attr_body" v-show="contentBox[0].isCollapase">
          <ul>
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>属性</span>
              <span>{{ $t(card.attribute) }}</span>
            </li>
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>等级</span>
              <span>一级</span>
            </li>
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>星级</span>
              <span>一级</span>
            </li>
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>稀有度</span>
              <span>{{ $t(card.rarity) }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="description box">
        <div class="header" @click="clickHandler2">
          <i class="iconfont pcshuxingchaxun"></i>
          <span>NFT介绍</span>
          <span class="arrow">
            <i
              class="el-collapse-item__arrow el-icon-arrow-right"
              v-show="!contentBox[1].isActived"
            ></i>
            <i
              class="el-collapse-item__arrow el-icon-arrow-right is-active"
              v-show="contentBox[1].isActived"
            ></i>
          </span>
        </div>
        <div class="des_body" v-show="contentBox[1].isCollapase">
          <div>
            <pre>{{ $t(card.nftdes) }}</pre>
          </div>
        </div>
      </div>

      <div class="history box">
        <div class="header" @click="clickHandler3">
          <i class="iconfont pcshuxingchaxun"></i>
          <span>交易记录</span>
          <span class="arrow">
            <i
              class="el-collapse-item__arrow el-icon-arrow-right"
              v-show="!contentBox[2].isActived"
            ></i>
            <i
              class="el-collapse-item__arrow el-icon-arrow-right is-active"
              v-show="contentBox[2].isActived"
            ></i>
          </span>
        </div>
        <div class="his_body" v-show="contentBox[2].isCollapase">
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
      <!-- <el-collapse>
        <el-collapse-item>
          <template slot="title">
            <div class="header">
              <i class="iconfont pcshuxingchaxun"></i>
              <span>属性</span>
            </div>
          </template>
          <ul class="box">
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>属性</span>
              <span>{{ $t(card.attribute) }}</span>
            </li>
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>等级</span>
              <span>一级</span>
            </li>
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>星级</span>
              <span>一级</span>
            </li>
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>稀有度</span>
              <span>{{ $t(card.rarity) }}</span>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <i class="header-icon el-icon-info"></i>NFT介绍
          </template>
          <div class="description">
            <pre>{{ $t(card.nftdes) }}</pre>
          </div>
        </el-collapse-item>
        <el-collapse-item>
          <template slot="title">
            <i class="iconfont pcshuxingchaxun"></i>交易记录
          </template>
          <ul>
            <li v-for="index of 10" :key="index">
              <span>From</span>
              <span>0x23...56e4</span>
              <span>to</span>
              <span>0x45...4e53</span>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse> -->
    </div>
    <el-dialog
      center
      top="0"
      :title="$t(card.name)"
      :visible.sync="isShowPopup"
      :modal-append-to-body="false"
      :destroy-on-close="true"
    >
      <PaintingVideo :videoUrl="card.video"></PaintingVideo>
    </el-dialog>
  </div>
</template>
<script>
import PaintingVideo from "@/components/PaintingVideo.vue";
import { shikastudio } from "@/mock/nftworks";
import { Descriptions } from "element-ui";
export default {
  name: "MarketDetails",
  components: { PaintingVideo },
  data() {
    return {
      card: null,
      name: null,
      isShowPopup: false,
      contentBox: [
        { title: "attribute", isCollapase: false, isActived: false },
        { title: "description", isCollapase: false, isActived: false },
        { title: "history", isCollapase: false, isActived: false },
      ],
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
    toOrder() {
      this.$router.push({ path: "/market-order" });
    },

    clickHandler1() {
      this.contentBox[0].isCollapase = !this.contentBox[0].isCollapase;
      this.contentBox[0].isActived = !this.contentBox[0].isActived;
    },
    clickHandler2() {
      this.contentBox[1].isCollapase = !this.contentBox[1].isCollapase;
      this.contentBox[1].isActived = !this.contentBox[1].isActived;
    },
    clickHandler3() {
      this.contentBox[2].isCollapase = !this.contentBox[2].isCollapase;
      this.contentBox[2].isActived = !this.contentBox[2].isActived;
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
.pc-content-box {
  width: 11.5rem;
  height: 7.7rem;
  margin: 0.7rem auto 1.65rem auto;
  display: flex;
  flex-direction: column;
  .character {
    width: 100%;
    height: 4.8rem;
    background-color: #2a2a32;
    border-radius: 0.1rem;
    border: 0.01rem solid #436e77;
    margin-bottom: 0.36rem;
    position: relative;
    justify-content: space-between;
    display: flex;
    .leftbox {
      width: 2.95rem;
      height: 4.7rem;
      position: relative;
      margin-left: 1.35rem;
      margin-top: 0.08rem;
      > img {
        width: 100%;
        height: 100%;
      }
      span {
        font-size: 0.15rem;
        position: absolute;
        left: 0.25rem;
        top: 0.35rem;
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
      width: 5rem;
      height: 100%;
      margin: 0.26rem 0.77rem auto 0.33rem;
      > div {
        &:nth-child(1) {
          font-size: 0.25rem;
          font-weight: 600;
        }
        &:nth-child(2) {
          margin-top: 0.15rem;
          margin-left: 0.11rem;
          font-size: 0.13rem;
          font-weight: bold;
          span {
            &:nth-child(2) {
              color: #13aac2;
              margin-left: 0.02rem;
            }
          }
        }
        &:nth-child(3) {
          width: 5rem;
          height: 0.02rem;
          border-radius: 0.01rem;
          background-image: linear-gradient(to right, #5f466e, #366371);
          margin: 0.1rem 0 0.26rem 0;
        }
        &:nth-child(4) {
          margin-bottom: 0.26rem;
          i {
            font-size: 0.25rem;
            margin-right: 0.05rem;
          }
          span {
            font-size: 0.2rem;
            &:nth-child(3) {
              color: #13aac2;
              margin-left: 0.4rem;
            }
          }
          .el-button {
            width: 1.06rem;
            height: 0.36rem;
            border-radius: 0.015rem;
            font-size: 0.18rem;
            margin-right: 0.5rem;
            background-image: linear-gradient(to right, #366371, #5f466e);
            color: #d5dbe1;
          }
        }
        &:nth-child(5) {
          display: flex;
          align-items: center;
          font-size: 0.15rem;
          color: #5e5d5e;
          width: 100%;
          height: 0.43rem;
          border-radius: 0.065rem;
          padding: 0 0.1rem 0 0.15rem;
          background-color: #1d1d22;
          span {
            &:nth-child(1) {
              margin-right: 0.06rem;
            }
          }
          .el-button {
            width: 0.84rem;
            height: 0.31rem;
            border-radius: 0.015rem;
            font-size: 0.15rem;
            margin-left: auto;
            background-image: linear-gradient(to right, #366371, #5f466e);
            color: #d5dbe1;
          }
        }
        &:nth-child(6) {
          margin: 0.16rem 0 0.1rem 0;
          font-size: 0.22rem;
          i {
            font-size: 0.175rem;
            margin: 0 0.11rem 0 0.07rem;
          }
          span {
            font-size: 0.2rem;
          }
        }
      }
      .attr_content {
        width: 100%;
        height: 1.6rem;
        background-color: #1d1d22;
        border-radius: 0.085rem;
        display: flex;
        justify-content: space-between;
        .left_box {
          width: 1.82rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.15rem;
          li {
            font-size: 0.12rem;
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
  .description {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    .introduction {
      float: left;
      width: 5.4rem;
      height: 2.25rem;
      max-width: 100%;

      span {
        display: inline-block;
        text-align: right;
        width: 1rem;
        height: 0.28rem;
        border-left: #12b2cb solid 0.02rem;
        margin-bottom: 0.28rem;
        font-size: 0.2rem;
      }
      .content {
        width: 100%;
        height: 100%;
        background-color: #2a2a32;
        border-radius: 0.1rem;
        border: 0.01rem solid #436e77;
        padding: 0.21rem 0.27rem 0.2rem 0;
        div {
          height: 100%;
          overflow-y: auto;
          padding: 0.18rem;
          pre {
            color: #aeaeb1;
            font-size: 0.15rem;
            line-height: 0.18rem;
          }
        }
      }
    }

    .history {
      float: right;
      width: 5.4rem;
      height: 2.25rem;
      max-width: 100%;
      > span {
        display: inline-block;
        text-align: right;
        width: 1rem;
        height: 0.28rem;
        border-left: #12b2cb solid 0.02rem;
        margin-bottom: 0.28rem;
        font-size: 0.2rem;
      }
      .content {
        width: 100%;
        height: 100%;
        background-color: #2a2a32;
        border-radius: 0.1rem;
        border: 0.01rem solid #436e77;
        padding: 0.23rem 0.2rem 0.2rem 0.26rem;

        ul {
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          li {
            font-size: 0.15rem;
            color: #bdbdbf;
            margin-bottom: 0.22rem;
            span {
              &:nth-child(1) {
                margin-right: 0.6rem;
              }
              &:nth-child(3) {
                margin: 0 0.7rem;
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
}

.mobile-content-box {
  width: 3.15rem;
  height: auto;
  margin: 0.2rem auto;
  // background-color: PINK;
  flex-direction: column;
  justify-content: space-between;
  .title {
    .row1 {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.12rem;

      .row_left {
        width: 1.82rem;
        height: 0.18rem;
        font-size: 0.15rem;
        span {
          color: #13aac2;
          vertical-align: top;
        }
        img {
          width: 0.15rem;
          height: 0.15rem;
          margin: 0.025rem 0 0 0.05rem;
        }
      }
      .row_right {
        display: flex;
        justify-content: space-between;
        width: 0.95rem;
        img {
          width: 0.2rem;
          height: 0.2rem;
          vertical-align: middle;
        }
      }
    }
    .row2 {
      width: 2.62rem;
      height: 0.32rem;
      font-size: 0.25rem;
    }
  }
  .cardbox {
    width: 100%;
    height: auto;
    position: relative;
    margin-top: 0.05rem;
    border: 0.01rem solid #5a5a5a;
    border-radius: 0.04rem;

    .header {
      width: 100%;
      height: 0.5rem;
      border-bottom: 0.01rem solid #5a5a5a;
    }
    .box_content {
      width: 100%;
      height: auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .btn {
      padding: 0 0 0.05rem 0.2rem;
      width: 1.8rem;
      height: 0.4rem;
      font-size: 0.15rem;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0.18rem;
      margin: auto;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      transition: all 0.3s;
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

  .box {
    width: 3.15rem;
    height: 2.4rem;
    background: rgba(24, 24, 28, 0.8);
    border-radius: 0.04rem;
    border: 0.01rem solid #535151;
    margin-top: 0.1rem;
    .header {
      width: 100%;
      height: 0.5rem;
      background: rgba(129, 129, 151, 0.19);
      line-height: 0.5rem;
      > i {
        font-size: 0.19rem;
        margin: 0 0.1rem 0 0.17rem;
      }
      span {
        display: inline-block;
        height: 100%;
        font-size: 0.15rem;
        vertical-align: top;
      }
      .arrow {
        float: right;
        margin-right: 0.2rem;
        font-size: 0.15rem;
      }
    }
  }

  .purchase {
    .header {
      span {
        font-size: 0.12rem;
      }
    }
    .pur_body {
      width: 100%;
      height: 100%;
      padding: 0 0.14rem 0 0.18rem;
      div {
        font-size: 0.12rem;
        &:nth-child(1) {
          margin: 0.13rem 0;
        }
        &:nth-child(2) {
          img {
            width: 0.15rem;
            height: 100%;
          }
          > span {
            display: inline-block;
            vertical-align: top;
            &:nth-child(2) {
              font-size: 0.2rem;
              margin: 0 0.08rem;
            }
            &:nth-child(3) {
              margin-top: 0.045rem;
            }
          }
        }
      }
      .btn_list {
        width: 100%;
        height: 0.92rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-top: 0.07rem;
        div {
          .el-button {
            width: 2.84rem;
            height: 0.45rem;
            margin: 0 auto;
            i {
              font-size: 0.2rem;
              margin-right: 0.12rem;
            }
            span {
              display: inline-block;
              margin-bottom: 0.045rem;
              vertical-align: middle;
            }
          }
          &:nth-child(2) {
            .el-button {
              background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
              i {
                margin-right: 0.02rem;
              }
            }
          }
        }
      }
    }
  }

  .attribute {
    height: auto;
    .attr_body {
      padding: 0.1rem 0.4rem;

      ul {
        height: 1.25rem;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        font-size: 0.12rem;
      }
      li {
        i {
          font-size: 0.15rem;
        }
        span {
          &:nth-child(2) {
            margin: 0 1.5rem 0 0.1rem;
          }
        }
      }
    }
  }

  .description {
    height: auto;
    .des_body {
      width: 3.15rem;
      height: 1.87rem;
      padding: 0.16rem 0.12rem;
      div {
        height: 100%;
        overflow-y: auto;
        padding: 0.18rem;
        pre {
          font-size: 0.12rem;
          line-height: 0.18rem;
        }
      }
    }
  }

  .history {
    height: auto;
    margin-bottom: 0.37rem;

    .his_body {
      width: 100%;
      height: 0.84rem;
      padding: 0.15rem 0.1rem 0.15rem 0.16rem;
      ul {
        height: 100%;
        font-size: 0.12rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: auto;

        li {
          margin-bottom: 0.04rem;
          span {
            &:nth-child(2) {
              margin: 0 0.45rem 0 0.5rem;
            }
            &:nth-child(3) {
              margin-right: 0.2rem;
            }
          }
        }
      }
    }
  }
  // .el-collapse {

  //   .el-collapse-item{
  //     height: auto;
  //     >>>.el-collapse-item__header{
  //       height: 0.4rem !important;
  //     }
  //   }

  //   .box {
  //     width: 100%;
  //     height: 100%;
  //     font-size: 0.12rem;
  //     background: rgba(24, 24, 28, 0.8);
  //     padding: 0.1rem 0.39rem;
  //     color: #fff;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: space-between;
  //     li {
  //       i {
  //         font-size: 0.15rem;
  //       }
  //       span {
  //         &:nth-child(2) {
  //           margin: 0 1.59rem 0 0.1rem;
  //         }
  //       }
  //     }
  //   }
  //   .description {
  //     pad pre {
  //       background: rgba(24, 24, 28, 0.8);
  //     }
  //   }
  // }
  // .el-collapse {
  //   .el-collapse-item__content {
  //     display: flex;
  //   }
  // }
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
