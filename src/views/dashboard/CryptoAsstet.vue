<template>
  <div class="box">
    <div class="title">{{ $t("dashboard.text6") }}</div>
    <div class="topbox">
      <div>
        {{ $t("dashboard.text20") }}
        <i class="iconfont pcNotvisible" v-show="!isShow" @click="isShow = true"></i>
        <i class="iconfont pcchakan1" v-show="isShow" @click="isShow = false"></i>
      </div>
      <div>
        <span v-show="isShow">{{ balanceAmount | numberToFixed(2) }}</span>
        <span v-show="!isShow">******</span>
      </div>
    </div>
    <ul class="card_list">
      <li v-for="(item, index) in cardList" :key="index">
        <ul>
          <li>
            <div><img :src="`${$urlImages}${item.logo}.webp`" alt="" /> {{ item.label }}</div>
            <div>
              <span v-show="isShow">{{ item.totalCoin | numberToFixed(2) }}</span>
              <span v-show="!isShow">******</span>
            </div>
          </li>
          <li>
            <div></div>
            <div>
              <span v-show="isShow">=${{ item.totalPrice | numberToFixed(2) }}</span>
              <span v-show="!isShow">=$******</span>
            </div>
          </li>
          <li>
            <div>{{ $t("dashboard.text21") }}</div>
            <div v-if="item.coinAddr">{{ $t("dashboard.text22") }}</div>
          </li>
          <li>
            <div>
              <span v-show="isShow">{{ item.availableBalance | numberToFixed(2) }}</span>
              <span v-show="!isShow">******</span>
            </div>
            <div class="btns" v-if="item.coinAddr" @click="$utils.handleCopy(item.coinAddr)">
              <span>{{ item.coinAddr | ellipsisWallet }}</span>
              <span class="btn" v-if="item.label == 'FUN'" @click.stop="addAddress(item)"><i class="iconfont pcjiahao"></i></span>
              <span class="btn" v-else><i class="iconfont pcfuzhi"></i></span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { util, erc20, token, wallet, getProvider } from "funtopia-sdk";
import { mapGetters } from "vuex";
export default {
  name: "CryptoAsstet",
  computed: { ...mapGetters(["getWalletAccount"]), ...mapGetters(["getApprovePopup"]) },
  watch: {
    getWalletAccount: {
      handler(newVal) {
        if (newVal) {
          this.getUSDT();
          this.getETH();
          this.getFUN();
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      isShow: false,
      balanceAmount: null,
      cardList: [
        {
          label: "USDT",
          logo: "coin-usdt",
          coinAddr: token().USDT,
          totalCoin: 0,
          totalPrice: 0,
          availableBalance: 0,
        },
        {
          label: "ETH",
          logo: "coin-eth",
          coinAddr: "",
          totalCoin: 0,
          totalPrice: 0,
          availableBalance: 0,
        },
        {
          label: "FUN",
          logo: "coin-fun",
          coinAddr: token().FUN,
          totalCoin: 0,
          totalPrice: 0,
          availableBalance: 0,
        },
      ],
    };
  },

  methods: {
    // https://www.coingecko.com/zh
    // https://www.coingecko.com/zh/api/documentation
    getUSDT() {
      erc20(token().USDT)
        .balanceOf(this.getWalletAccount)
        .then((res) => {
          const totalCoin = Number(util.formatEther(res._hex));
          // console.log("USDT", totalCoin);
          this.balanceAmount = totalCoin;
          this.cardList[0].totalCoin = totalCoin; //币个数
          this.cardList[0].availableBalance = totalCoin; //可用余额
          this.$api.getCoinPrice("tether").then((res2) => {
            const price = res2.data["tether"].usd;
            this.cardList[0].totalPrice = price * totalCoin; //总价值
          });
        })
        .catch((err) => {
          console.error("getUSDT", err);
        });
    },
    getETH() {
      getProvider()
        .getBalance(this.getWalletAccount)
        .then((res) => {
          const totalCoin = Number(util.formatEther(res._hex));
          // console.log("ETH", totalCoin);
          this.cardList[1].totalCoin = totalCoin; //币个数
          this.cardList[1].availableBalance = totalCoin; //可用余额
          this.$api.getCoinPrice("ethereum").then((res2) => {
            const price = res2.data["ethereum"].usd;
            this.cardList[1].totalPrice = price * totalCoin; //总价值
          });
        })
        .catch((err) => {
          console.error("getETH", err);
        });
    },
    getFUN() {
      erc20(token().FUN)
        .balanceOf(this.getWalletAccount)
        .then((res) => {
          const totalCoin = Number(util.formatEther(res._hex));
          // console.log("FUN", totalCoin);
          this.cardList[2].totalCoin = totalCoin; //币个数
          this.cardList[2].availableBalance = totalCoin; //可用余额
          const price = 0;
          this.cardList[2].totalPrice = price * totalCoin; //总价值
        })
        .catch((err) => {
          console.error("getFUN", err);
        });
    },
    addAddress(item) {
      wallet.addFUN(`${this.$urlImages}${item.logo}.webp`);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: auto;
}
.title {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.3rem;
  font-weight: bold;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  backdrop-filter: blur(7px);
  padding: 0 0.1rem;
}
.topbox {
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    font-size: 0.3rem;
    font-weight: bold;
    margin-right: 0.2rem;
    i {
      font-size: 0.3rem;
      margin-left: 0.2rem;
      cursor: pointer;
    }
  }
}
.card_list {
  width: 100%;
  height: fit-content;
  > li {
    float: left;
    width: 2.83rem;
    padding: 0.1rem;
    margin: 0 0.15rem 0.15rem 0;
    background: rgba(51, 52, 60, 0.57);
    border-radius: 0.1rem;
    border: 0.01rem solid #3f3e43;
    backdrop-filter: blur(4px);
    &:nth-child(3n) {
      margin-right: 0;
    }
    ul {
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          &:nth-child(1) {
            width: 40%;
          }
          &:nth-child(2) {
            width: 60%;
            text-align: right;
          }
        }
        &:nth-child(1) {
          div {
            &:nth-child(1) {
              font-size: 0.15rem;
              font-weight: bold;
              display: flex;
              align-items: center;
              img {
                width: 0.21rem;
                height: 0.21rem;
                margin-right: 0.05rem;
              }
            }
            &:nth-child(2) {
              font-size: 0.15rem;
              font-weight: bold;
            }
          }
        }
        &:nth-child(2) {
          font-size: 0.15rem;
          color: #a7a7a7;
          margin-bottom: 0.1rem;
        }
        &:nth-child(3) {
          font-size: 0.15rem;
          color: #a7a7a7;
          margin-bottom: 0.1rem;
        }
        &:nth-child(4) {
          font-size: 0.15rem;
        }
        .btns {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: right;
          .btn {
            background: rgba(40, 38, 38, 0.8);
            border-radius: 0.04rem;
            margin-left: 0.1rem;
            i {
              font-size: 0.2rem;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .title {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    border-radius: 0.04rem;
    font-size: 0.12rem;
    font-weight: 600;
    padding: 0 0.2rem;
  }
  .switch_box {
    width: 100%;
    height: 0.4rem;
    ul {
      li {
        height: 0.25rem;
        line-height: 0.25rem;
        padding: 0 0.05rem;
        font-size: 0.12rem;
        font-weight: 600;
        border-radius: 0.04rem;
      }
    }
  }
  .topbox {
    width: 100%;
    height: 0.8rem;
    div {
      font-size: 0.15rem;
      font-weight: bold;
      margin-right: 0.1rem;
      i {
        font-size: 0.2rem;
        margin-left: 0.1rem;
      }
    }
  }
  .card_list {
    > li {
      width: 100%;
      padding: 0.05rem 0.1rem;
      margin: 0 0 0.1rem 0;
      background: rgba(51, 52, 60, 0.57);
      border-radius: 0.04rem;
      ul {
        li {
          &:nth-child(1) {
            div {
              &:nth-child(1) {
                font-size: 0.15rem;
                font-weight: bold;
              }
              &:nth-child(2) {
                font-size: 0.15rem;
                font-weight: bold;
              }
            }
          }
          &:nth-child(2) {
            font-size: 0.15rem;
            margin-bottom: 0.05rem;
          }
          &:nth-child(3) {
            font-size: 0.15rem;
            margin-bottom: 0.05rem;
          }
          &:nth-child(4) {
            font-size: 0.15rem;
          }
          .btns {
            .btn {
              margin-left: 0.05rem;
              i {
                font-size: 0.15rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
