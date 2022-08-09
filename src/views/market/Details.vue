<template>
  <div class="page">
    <div class="banner">
      <div class="back_box">
        <div @click="goBack">
          <i class="iconfont pcfanhui"></i><span>{{ $t("btns.text1") }}</span>
        </div>
      </div>
    </div>
    <div class="pc-content-box pc">
      <div class="character">
        <div class="leftbox">
          <img :src="card.card" alt="" />
          <span>{{ $t(card.name) }}</span>
          <div class="level_btn" :class="card.rarity" @click="openVideo">
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
            <span>{{ $t("market.text10") }}</span>
            <span>{{ price }} {{ token_type }}</span>
          </div>
          <div>
            <span>{{ $t("market.text25") }}</span>
            <span>{{ seller }}</span>
            <el-button @click="beforeBuy" :loading="buyLoading">{{ $t("market.text11") }}</el-button>
          </div>
          <div>
            <i class="iconfont pcshuxingchaxun"></i>
            <span>{{ $t("market.text12") }}</span>
          </div>
          <div class="attr_content">
            <ul class="left_box">
              <li>
                <span>{{ $t("market.text13") }}</span>
                <span>{{ $t(card.attribute) }}</span>
              </li>
              <li>
                <span>{{ $t("market.text14") }}</span>
                <span>{{ $t(card.level) }}</span>
              </li>
              <li>
                <span>{{ $t("market.text15") }}</span>
                <span>{{ $t(card.starlevel) }}</span>
              </li>
              <li>
                <span>{{ $t("market.text16") }}</span>
                <span>{{ card.rarity }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="description">
        <div class="introduction">
          <span>{{ $t("market.text17") }}</span>
          <div class="content">
            <div>
              <pre>{{ $t(card.nftdes) }}</pre>
            </div>
          </div>
        </div>
        <div class="history">
          <span>{{ $t("market.text18") }}</span>
          <div class="content">
            <div v-if="!history.length">{{ $t("nodata.text3") }}</div>
            <ul v-else>
              <li v-for="(item, index) in history" :key="index">
                <span>{{ $t("market.text31") }}</span>
                <span>{{ item.seller2 }}</span>
                <span>{{ $t("market.text32") }}</span>
                <span>{{ item.buyer2 }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="mobile-content-box mobile">
      <div class="cardbox">
        <img :src="card.card" alt="" />
        <span>{{ $t(card.name) }}</span>
        <div class="level_btn" :class="card.rarity" @click="openVideo">
          {{ $t("artist.text11") }}
        </div>
      </div>
      <div class="title">
        <div class="row1">{{ $t(card.title) }} - {{ $t(card.name) }}</div>
        <div class="row2">
          <div class="row_left">
            <span>{{ name }}</span>
            <img :src="`${$urlImages}icon1.webp`" alt="" />
          </div>
        </div>
      </div>
      <div class="purchase box">
        <div class="header">
          <i class="iconfont pcqianbao2-mianxing"></i>
          <span>{{ $t("market.text29") }}</span>
        </div>
        <div class="pur_body">
          <div>
            <img :src="`${$urlImages}coin.webp`" alt="" />
            <span>12</span>
            <span>($123)</span>
          </div>
          <el-button>
            <i class="iconfont pcqianbao2-mianxing"></i>
            <span>{{ $t("market.text28") }}</span>
          </el-button>
        </div>
      </div>
      <div class="attribute box">
        <div class="header">
          <i class="iconfont pcshuxingchaxun"></i>
          <span>{{ $t("market.text12") }}</span>
        </div>
        <div class="attr_body">
          <ul>
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>{{ $t("market.text13") }}</span>
              <span>{{ $t(card.attribute) }}</span>
            </li>
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>{{ $t("market.text14") }}</span>
              <span>{{ $t(card.level) }}</span>
            </li>
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>{{ $t("market.text15") }}</span>
              <span>{{ $t(card.starlevel) }}</span>
            </li>
            <li>
              <i class="iconfont pcshuxingchaxun"></i>
              <span>{{ $t("market.text16") }}</span>
              <span>{{ card.rarity }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="description box">
        <div class="header">
          <i class="iconfont pcshuxingchaxun"></i>
          <span>{{ $t("market.text17") }}</span>
        </div>
        <div class="des_body">
          <div>
            <pre>{{ $t(card.nftdes) }}</pre>
          </div>
        </div>
      </div>
      <div class="history box">
        <div class="header">
          <i class="iconfont pcshuxingchaxun"></i>
          <span>{{ $t("market.text18") }}</span>
        </div>
        <div class="his_body">
          <ul>
            <li v-if="!history.length">{{ $t("nodata.text3") }}</li>
            <li v-else v-for="(item, index) in history" :key="index">
              <span>{{ $t("market.text31") }}</span>
              <span>{{ item.seller2 }}</span>
              <span>{{ $t("market.text32") }}</span>
              <span>{{ item.buyer2 }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <el-dialog center top="0" :title="$t(card.name)" :visible.sync="isShowPopup" :modal-append-to-body="false" :destroy-on-close="true">
      <PaintingVideo :videoUrl="card.video"></PaintingVideo>
    </el-dialog>
    <ApprovePopup :operation="operation" :loading="buyLoading"></ApprovePopup>
  </div>
</template>
<script>
import { marketInfo, market, util, getSigner, erc20, contract } from "funtopia-sdk";
import PaintingVideo from "@/components/PaintingVideo.vue";
import ApprovePopup from "@/components/ApprovePopup.vue";
import { shikastudio } from "@/mock/nftworks";
import { mapGetters } from "vuex";
export default {
  name: "MarketDetails",
  components: { PaintingVideo, ApprovePopup },
  data() {
    return {
      card: null,
      name: null,
      isShowPopup: false,
      nft_type: null,
      nftId: null,
      price: null,
      seller: null,
      token_type: null,
      token_addr: null,
      nft_addr: null,
      history: [],
      operation: {
        name: this.$t("approvePopup.text1"),
        func: "buyNfts",
      },
      buyLoading: false,
    };
  },
  computed: { ...mapGetters(["getWalletAccount"]), ...mapGetters(["getApprovePopup"]) },
  watch: {
    getWalletAccount: {
      handler(newVal) {
        // if (newVal) { }
      },
    },
  },
  created() {
    if (Object.keys(this.$route.query).length > 0) {
      const id = this.$route.query.id;
      this.card = shikastudio.works.find((item) => item.id == id);
      this.name = shikastudio.name;
      this.nftId = this.$route.query.nftId;
      this.nft_type = this.$route.query.nft_type;
      this.price = this.$route.query.price;
      const tmp = this.$route.query.seller;
      this.seller = tmp.slice(0, 2) + tmp.slice(2, 4).toUpperCase() + "..." + tmp.slice(-4).toUpperCase();
      //this.token = this.$route.query.token == token().USDT ? "USDT" : (this.$route.query.token  == token().FUN ? "FUN" : "ETH");
      this.token_type = this.$route.query.token_type;
      // if (this.token == "USDT") this.token_addr = token().USDT;
      // if (this.token == "FUN") this.token_addr = token().FUN;
      this.nft_addr = this.$route.query.nft;
      this.token_addr = this.$route.query.token;
      // if (this.nft_type == "hero") this.nft_addr = token().CN;
      // if (this.nft_type == "box") this.nft_addr = token().CB;
      // if (this.nft_type == "shard") this.nft_addr = token().CS;
      marketInfo
        .getBuyInfos(
          30,
          0,
          "buyTime",
          "desc",
          undefined,
          undefined,
          this.nft_addr,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          this.$route.query.id - 1,
        )
        .then((res) => {
          let data = JSON.parse(JSON.stringify(res.data.buyInfos));
          this.history = data.filter((item) => item.nftId == this.nftId);
          this.history.forEach((item) => {
            item.buyer2 = item.buyer.slice(0, 2) + item.buyer.slice(2, 4).toUpperCase() + "..." + item.buyer.slice(-4).toUpperCase();
            item.seller2 = item.seller.slice(0, 2) + item.seller.slice(2, 4).toUpperCase() + "..." + item.seller.slice(-4).toUpperCase();
          });
          // console.log(this.history);
        });
    }
  },
  methods: {
    openVideo() {
      this.isShowPopup = true;
    },
    goBack() {
      history.go(-1);
    },

    //contract
    beforeBuy() {
      if (!this.getWalletAccount) return this.$store.commit("setWalletConnectPopup", true);
      this.buyLoading = true;
      // 授权检查
      if (this.token_addr) {
        erc20(this.token_addr)
          .allowance(this.getWalletAccount, contract().Market)
          .then((res) => {
            console.log(Number(res._hex));
            console.log(this.price);
            if (Number(res._hex) > this.price) {
              this.buyNfts();
            } else {
              this.$store.commit("setApprovePopup", true);
              this.buyLoading = false;
            }
          })
          .catch((err) => {
            console.error("allowance", err);
            this.buyLoading = false;
          });
      }
    },

    /**去授权 */
    async toApprove() {
      const tx = await erc20(this.token_addr).connect(getSigner()).approve(contract().Market, util.parseUnits((1e10).toString()));
      await tx.wait();
    },
    async buyNfts() {
      this.buyLoading = true;
      try {
        const tx = this.token_addr
          ? await market().connect(getSigner()).buy([this.nft_addr], [this.nftId])
          : await market().connect(getSigner()).buy([this.nft_addr], [this.nftId], { value: this.price });
        // const etReceipt = await tx.wait(); // 请求已发出，等待矿工打包进块，交易成功，返回交易收据
        // console.log("交易收据", etReceipt);
        await tx.wait();
        if (this.getApprovePopup) this.$store.commit("setApprovePopup", false);
        this.buyloading = false;
        this.$message({ message: this.$t("tips.text11") });
        this.$router.push({ path: "/market" });
      } catch (err) {
        this.buyloading = false;
        console.error("buyNfts", err);
      }
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
          display: flex;
          justify-content: flex-start;
          align-items: center;
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
                display: inline-block;
                width: 1.2rem;
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
        height: 0.28rem;
        border-left: #12b2cb solid 0.02rem;
        padding-left: 0.16rem;
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
        height: 0.28rem;
        border-left: #12b2cb solid 0.02rem;
        padding-left: 0.16rem;
        margin-bottom: 0.28rem;
        font-size: 0.2rem;
      }
      .content {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #2a2a32;
        border-radius: 0.1rem;
        border: 0.01rem solid #436e77;
        padding: 0.23rem 0.2rem 0.2rem 0.26rem;
        div {
          position: absolute;
          font-size: 0.3rem;
          color: #aeaeb1;
          font-weight: 600;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
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
  margin: 0 auto 0.2rem auto;
  flex-direction: column;
  justify-content: space-between;
  .title {
    .row1 {
      width: 2.62rem;
      height: 0.32rem;
      font-size: 0.25rem;
      margin-bottom: 0.03rem;
    }
    .row2 {
      display: flex;
      justify-content: space-between;

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
    }
  }
  .cardbox {
    width: 3.07rem;
    height: 4.79rem;
    position: relative;
    margin: 0 auto;
    > img {
      width: 100%;
      height: 100%;
    }

    span {
      font-size: 0.14rem;
      position: absolute;
      left: 0.2rem;
      top: 0.37rem;
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
    }
  }

  .purchase {
    height: 1.7rem;
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
        width: 100%;
        height: 0.5rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        img {
          width: 0.15rem;
          height: 0.21rem;
        }
        span {
          display: inline-block;
          vertical-align: top;
          &:nth-child(2) {
            font-size: 0.2rem;
            margin: 0 0.1rem 0 0.07rem;
          }
          &:nth-child(3) {
            margin-top: 0.045rem;
          }
        }
      }

      .el-button {
        width: 2.84rem;
        height: 0.45rem;
        margin: 0 auto;
        margin-top: 0.07rem;
        background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);

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
    }
  }
  .attribute {
    height: auto;
    .attr_body {
      padding: 0.1rem 0.41rem;
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
            display: inline-block;
            width: 1.59rem;
            margin-left: 0.1rem;
          }
        }
      }
    }
  }
  .description {
    height: auto;
    .des_body {
      width: 100%;
      height: fit-content;
      padding: 0.1rem;
      div {
        height: 100%;
        overflow-y: auto;
        pre {
          font-size: 0.12rem;
          line-height: 0.18rem;
        }
      }
    }
  }
  .history {
    height: auto;
    .his_body {
      position: relative;
      width: 100%;
      max-height: 2rem;
      padding: 0.1rem;
      div {
        position: absolute;
        font-size: 0.12rem;
        color: #aeaeb1;
        font-weight: 600;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      ul {
        height: 100%;
        font-size: 0.12rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        overflow-y: auto;
        li {
          margin: 0 auto;
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
}

@media screen and (max-width: 750px) {
  .page {
    width: 100%;
    padding: 0.5rem 0;
  }
  .banner {
    width: 100%;
    height: 0.5rem;
  }
}
</style>
