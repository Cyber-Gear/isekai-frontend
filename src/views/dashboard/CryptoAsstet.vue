<template>
  <div class="box">
    <div class="title">Crypto Asstet</div>
    <div class="topbox">
      <div>
        Balance余额
        <i class="iconfont pcchakan1" v-show="!isShow" @click="isShow = true"></i>
        <i class="iconfont pcNotvisible" v-show="isShow" @click="isShow = false"></i>
      </div>
      <div>{{ "Balance余额" }}</div>
    </div>
    <ul class="card_list">
      <li v-for="(item, index) in cardList" :key="index">
        <ul>
          <li>
            <div><img :src="`${$urlImages}coin_FUN.webp`" alt="" /> FUN</div>
            <div>{{ item.num1 }}</div>
          </li>
          <li>
            <div></div>
            <div>=${{ item.num2 }}</div>
          </li>
          <li>
            <div>Available</div>
            <div>Contract</div>
          </li>
          <li>
            <div>{{ item.num3 }}</div>
            <div>
              <span>{{ item.num4 }}</span>
              <span><i class="iconfont pcjiahao"></i></span>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { util, erc20, token } from "funtopia-sdk";
import { mapGetters } from "vuex";
export default {
  name: "CryptoAsstet",
  computed: { ...mapGetters(["getWalletAccount"]), ...mapGetters(["getApprovePopup"]) },
  watch: {
    getWalletAccount: {
      handler(newVal) {
        if (newVal) {
          this.getBalanceOf();
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      isShow: false,
      balanceText: "experienceexp",
      cardList: [
        { num1: "币个数", num2: "总价值", num3: "可用余额", num4: "币的合约地址" },
        { num1: 0.000000001777, num2: 0.0000395, num3: 21212, num4: "121212343413312" },
        { num1: 0.000000001777, num2: 0.0000395, num3: 21212, num4: "121212343413312" },
        { num1: 0.000000001777, num2: 0.0000395, num3: 21212, num4: "121212343413312" },
      ],
    };
  },

  methods: {
    /**钱包余额 */
    getBalanceOf() {
      erc20(token().USDT)
        .balanceOf(this.getWalletAccount)
        .then((res) => {
          console.log("钱包余额USDT", Number(util.formatEther(res._hex)));
        })
        .catch((err) => {
          console.error("erc20(token().USDC).balanceOf", err);
        });
      erc20(token().FUN)
        .balanceOf(this.getWalletAccount)
        .then((res) => {
          console.log("钱包余额FUN", Number(util.formatEther(res._hex)));
        })
        .catch((err) => {
          console.error("erc20(token().USDC).balanceOf", err);
        });
      erc20(token().WAVAX)
        .balanceOf(this.getWalletAccount)
        .then((res) => {
          console.log("钱包余额WAVAX", Number(util.formatEther(res._hex)));
        })
        .catch((err) => {
          console.error("erc20(token().USDC).balanceOf", err);
        });
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
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.3rem;
  font-weight: bold;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  backdrop-filter: blur(7px);
  padding: 0 0.1rem;
  i {
    font-size: 0.3rem;
    margin-right: 0.1rem;
  }
}
.topbox {
  width: 100%;
  margin-top: 0.2rem;
  > div {
    height: 0.5rem;
    line-height: 0.5rem;
    &:nth-child(1) {
      display: flex;
      align-items: center;
      font-size: 0.2rem;
      font-weight: bold;
      i {
        font-size: 0.25rem;
        margin-left: 0.2rem;
        cursor: pointer;
      }
    }
    &:nth-child(2) {
      font-size: 0.3rem;
    }
  }
}
.card_list {
  width: 100%;
  height: auto;
  margin-top: 0.2rem;
  > li {
    float: left;
    width: 2.1rem;
    padding: 0.1rem;
    margin: 0 0.13rem 0.13rem 0;
    background: rgba(51, 52, 60, 0.57);
    border-radius: 0.1rem;
    border: 0.01rem solid #3f3e43;
    backdrop-filter: blur(4px);
    &:nth-child(4n) {
      margin-right: 0;
    }
    // &:hover {
    //   background: rgba(51, 52, 60, 0.57);
    //   box-shadow: 0.05rem 0.08rem 0.1rem 0rem rgba(0, 0, 0, 0.5);
    // }
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
              color: #ffffff;
              display: flex;
              align-items: center;
              img {
                width: 0.21rem;
                height: 0.21rem;
                margin-right: 0.05rem;
              }
            }
            &:nth-child(2) {
              font-size: 0.12rem;
              font-weight: bold;
              color: #ffffff;
            }
          }
        }
        &:nth-child(2) {
          font-size: 0.12rem;
          color: #a7a7a7;
          margin-bottom: 0.1rem;
        }
        &:nth-child(3) {
          font-size: 0.12rem;
          color: #a7a7a7;
        }
        &:nth-child(4) {
          font-size: 0.12rem;
          color: #ffffff;
          div {
            &:nth-child(2) {
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: right;
              span {
                &:nth-child(2) {
                  background: rgba(40, 38, 38, 0.8);
                  border-radius: 0.03rem;
                  margin-left: 0.05rem;
                  &:hover {
                    background: rgba(51, 52, 60, 0.57);
                  }
                  i {
                    font-size: 0.2rem;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
