<template>
  <div class="page">
    <div class="tip_box">{{ $t("launchpad.text1") }} {{ $t(nowStatusText) }}</div>
    <div class="box">
      <div class="leftbox">
        <div class="blindbox">
          <LottieAnimation></LottieAnimation>
        </div>
        <div class="info">
          <div>
            <span>{{ $t("launchpad.text3") }}</span>
            <span>{{ remainingAmount }} {{ $t("launchpad.text11") }}</span>
          </div>
          <div>
            <span>{{ $t("launchpad.text4") }}</span> <span>{{ boxPrice }} U</span>
          </div>
          <div>
            <span>{{ $t("launchpad.text5") }}</span>
            <span>{{ hourlyBuyAmount }} {{ $t("launchpad.text11") }}</span>
          </div>
        </div>
      </div>
      <div class="rightbox">
        <div class="stepsbox">
          <el-steps :active="nowStatusIndex" align-center>
            <el-step v-for="(item, index) in stepsArr" :key="index" :title="$t(item.label)" :description="item.time">
              <template slot="icon">
                <!-- <div @click="changeSteps(item, index)"> -->
                <div>
                  <img class="stepsbox_img" v-if="index < nowStatusIndex" :src="`${$urlImages}progress_img_active.webp`" alt="" />
                  <img class="stepsbox_img" v-else :src="`${$urlImages}progress_img_normal.webp`" alt="" />
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
        <div class="box1">
          <div class="title">
            <div><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ $t("launchpad.text6") }}</div>
            <ul>
              <li>
                <el-tooltip class="item" effect="dark" :content="$t('launchpad.text7')" placement="top">
                  <div><i class="iconfont pcchakan1"></i></div>
                </el-tooltip>
              </li>
              <li>
                <el-tooltip class="item" effect="dark" :content="$t('launchpad.text8')" placement="top">
                  <div><i class="iconfont pcfenxiang"></i></div>
                </el-tooltip>
              </li>
              <li>
                <el-tooltip class="item" effect="dark" :content="$t('launchpad.text9')" placement="top">
                  <div><i class="iconfont pcshequn"></i></div>
                </el-tooltip>
              </li>
              <li>
                <el-tooltip class="item" effect="dark" :content="$t('launchpad.text10')" placement="top">
                  <div><i class="iconfont pcweiguanwang-"></i></div>
                </el-tooltip>
              </li>
            </ul>
          </div>
          <div class="box2">
            <div class="row">
              <pre>{{ $t("launchpad.introduction1") }}</pre>
            </div>
            <div class="row">
              <div class="hasbeenon" v-if="nowStatusIndex == 1">
                <div class="buying">
                  <span>{{ $t("launchpad.text12") }}</span>
                </div>
                <div class="times">
                  <div>
                    <p>{{ countdownObj.d }}</p>
                    <p>{{ $t("launchpad.text13") }}</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>{{ countdownObj.h }}</p>
                    <p>{{ $t("launchpad.text14") }}</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>{{ countdownObj.m }}</p>
                    <p>{{ $t("launchpad.text15") }}</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>{{ countdownObj.s }}</p>
                    <p>{{ $t("launchpad.text16") }}</p>
                  </div>
                </div>
              </div>
              <div class="buy_box" v-if="nowStatusIndex == 2">
                <div class="left">
                  <div>{{ $t("launchpad.text17") }}</div>
                  <div class="inputbox">
                    <span class="span1"><i class="iconfont pcjianhao" @click="subtraction"></i></span>
                    <input type="number" v-model="inputAmount" oninput="value=value.replace(/^(0+)|[^\d]+/g,'')" :disabled="buyloading" />
                    <span class="span2"><i class="iconfont pcjiahao" @click="addition"></i></span>
                  </div>
                  <div>
                    <span>{{ $t("launchpad.text18") }} {{ totalPrice | numberThousands }} U</span>
                  </div>
                </div>
                <div class="right">
                  <el-button type="primary" :loading="buyloading" @click="buyBoxesBefore">{{ $t("launchpad.text19") }}</el-button>
                </div>
              </div>
              <div class="progress_bar_box" v-if="nowStatusIndex !== 1">
                <div>
                  <div>{{ $t("launchpad.text21") }}</div>
                  <div class="progress_bar">
                    <div :style="{ width: progressWidth + '%' }">{{ progressWidth + "%" }}</div>
                  </div>
                  <div>{{ soldAmount }} / {{ totalAmount }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box1">
          <div class="title">
            <div><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ $t("launchpad.text22") }}</div>
          </div>
          <div class="content">
            <pre>{{ $t("launchpad.introduction2") }}</pre>
          </div>
        </div>
      </div>
    </div>
    <ApprovePopup></ApprovePopup>
  </div>
</template>

<script>
import { cb, util, getSigner, erc20, token } from "funtopia-sdk";
import { mapGetters } from "vuex";
import ApprovePopup from "@/components/ApprovePopup";
import LottieAnimation from "@/components/LottieAnimation";

export default {
  name: "LAUNCHPAD",
  components: { ApprovePopup, LottieAnimation },
  data() {
    return {
      boxType: 0,
      totalAmount: 0,
      soldAmount: 0,
      remainingAmount: 0,
      hourRemainingAmount: 0,

      boxPrice: 0,
      hourlyBuyAmount: 0,
      paymentAddress: "",
      isOpenWhitelist: false,
      isWhite: true,
      inputAmount: null,
      totalPrice: 0,
      balanceAmount: 0,
      stepsArr: [
        { label: "status.text1", time: "2022/07/10 15:00" },
        { label: "status.text2", time: "2022/07/19 18:31" },
        { label: "status.text3", time: "" },
      ],
      countdownObj: { d: 0, h: 0, m: 0, s: 0 },
      countdownTimer: null,
      nowStatusText: "",
      nowStatusIndex: 0,
      progressWidth: 0,
      isApproved: false,
      popupActive: 1,
      approvedloading: false,
      buyloading: false,
    };
  },
  computed: { ...mapGetters(["getWalletAccount"]), ...mapGetters(["getApprovePopup"]) },
  watch: {
    getWalletAccount: {
      handler(newVal) {
        this.getAmount();
        this.getPriceAddrs();
        if (newVal) {
          this.getUserHourlyBoxesLeftSupply();
          this.getBalanceOf();
        }
      },
      immediate: true,
    },
    inputAmount: {
      handler(newVal) {
        if (newVal) {
          this.inputAmount = newVal < this.remainingAmount ? newVal : this.remainingAmount;
          this.totalPrice = this.inputAmount * this.boxPrice;
        } else {
          this.totalPrice = 0;
        }
      },
    },
  },

  beforeDestroy() {
    clearTimeout(this.countdownTimer);
    this.countdownTimer = null;
  },
  methods: {
    /**
     * @boxesMaxSupply 获取某类型的盲盒的总销售数量 入参：盲盒类型 出参：总数量
     * @totalBoxesLength 获取某类型的盲盒的已售出数量 入参：盲盒类型 出参：已售出数量
     * @getBoxesLeftSupply 获取某类型的盲盒的剩余可销售数量 入参：盲盒类型 出参：剩余数量
     */
    getAmount() {
      this.nowStatusText = "status.text12";
      this.nowStatusIndex = 0;
      if (!this.stepsArr[0].time) return; // 未上架

      this.nowStatusText = this.stepsArr[0].label;
      this.nowStatusIndex = 1;
      if (!this.stepsArr[1].time) return; // 已上架，未发售

      let now = Date.parse(new Date());
      let time = Date.parse(this.stepsArr[1].time);
      if (now < time) return this.countdownFun(time); // 未发售，开始倒计时

      this.nowStatusText = this.stepsArr[1].label; // 开始发售
      this.nowStatusIndex = 2;

      cb()
        .boxesMaxSupply(this.boxType)
        .then((res) => {
          // console.log("获取某类型的盲盒的总销售数量", Number(res._hex));
          this.totalAmount = Number(res._hex);
          cb()
            .getBoxesLeftSupply(this.boxType)
            .then((res2) => {
              // console.log("获取某类型的盲盒的剩余可销售数量", Number(res2._hex));
              this.remainingAmount = Number(res2._hex);
              if (this.remainingAmount) {
                this.soldAmount = this.totalAmount - this.remainingAmount;
                this.progressWidth = ((this.soldAmount / this.totalAmount) * 100).toFixed(0);
              } else {
                this.nowStatusText = this.stepsArr[2].label; // 售罄
                this.nowStatusIndex = 3;
              }
            })
            .catch((err2) => {
              console.error("getBoxesLeftSupply", err2);
            });
        })
        .catch((err) => {
          console.error("boxesMaxSupply", err);
        });
      // cb()
      //   .totalBoxesLength(this.boxType)
      //   .then((res) => {
      //     // console.log("获取某类型的盲盒的已售出数量", Number(res._hex));
      //     this.soldAmount = Number(res._hex);
      //   })
      //   .catch((err) => {
      //     console.error("totalBoxesLength", err);
      //   });
    },
    /**开售倒计时 */
    countdownFun(end) {
      const msec = end - Date.parse(new Date());
      if (msec < 0) return;
      let d = parseInt(msec / 1000 / 60 / 60 / 24);
      let h = parseInt((msec / 1000 / 60 / 60) % 24);
      let m = parseInt((msec / 1000 / 60) % 60);
      let s = parseInt((msec / 1000) % 60);
      this.countdownObj.d = d > 9 ? d : "0" + d;
      this.countdownObj.h = h > 9 ? h : "0" + h;
      this.countdownObj.m = m > 9 ? m : "0" + m;
      this.countdownObj.s = s > 9 ? s : "0" + s;
      // console.log("开售倒计时", this.countdownObj.s);
      if (d >= 0 && h >= 0 && m >= 0 && s >= 0) {
        if (d == 0 && h == 0 && m == 0 && s == 0) {
          clearTimeout(this.countdownTimer);
          this.countdownTimer = null;
          this.getAmount();
        } else {
          this.countdownTimer = setTimeout(() => {
            this.countdownFun(end);
          }, 1000);
        }
      }
    },

    /**
     * @boxTokenPrices 获取某类型的盲盒的支付代币单价 入参：盲盒类型 出参：盲盒单价
     * @tokenAddrs 获取某类型的盲盒的支付代币地址 入参：盲盒类型 出参：支付代币地址
     * @whiteListFlags 获取某类型的盲盒是否开启白名单 入参：盲盒类型 出参：开启状态
     * @hourlyBuyLimits 每小时限购数量 入参：盲盒类型 出参：每小时限购数量
     */
    getPriceAddrs() {
      cb()
        .boxTokenPrices(this.boxType)
        .then((res) => {
          this.boxPrice = Number(util.formatEther(res._hex));
          // console.log("获取某类型的盲盒的支付代币单价", this.boxPrice);
        })
        .catch((err) => {
          console.error("boxTokenPrices", err);
        });
      cb()
        .tokenAddrs(this.boxType)
        .then((res) => {
          this.paymentAddress = res;
          // console.log("获取某类型的盲盒的支付代币地址", this.paymentAddress);
        })
        .catch((err) => {
          console.error("tokenAddrs", err);
        });
      cb()
        .whiteListFlags(this.boxType)
        .then((res) => {
          this.isOpenWhitelist = res;
          // console.log("获取某类型的盲盒是否开启白名单", this.isOpenWhitelist);
          if (this.isOpenWhitelist) this.getWhiteListExistence();
        })
        .catch((err) => {
          console.error("whiteListFlags", err);
        });
      cb()
        .hourlyBuyLimits(this.boxType)
        .then((res) => {
          this.hourlyBuyAmount = Number(res._hex);
          // console.log("每小时限购数量", res, this.hourlyBuyAmount);
        })
        .catch((err) => {
          console.error("hourlyBuyLimits", err);
        });
    },
    /**获取某类型的盲盒下某用户某小时剩余购买数量 入参：盲盒类型，用户钱包地址，时间戳(秒) 出参：剩余数量 */
    getUserHourlyBoxesLeftSupply() {
      const timestamp = Date.parse(new Date()); //精度秒
      cb()
        .getUserHourlyBoxesLeftSupply(this.boxType, this.getWalletAccount, timestamp)
        .then((res) => {
          this.hourRemainingAmount = Number(res._hex);
          // console.log("某用户某小时剩余购买数量", this.hourRemainingAmount);
        })
        .catch((err) => {
          console.error("getUserHourlyBoxesLeftSupply", err);
        });
    },
    /**钱包余额 */
    getBalanceOf() {
      erc20(token().USDT)
        .balanceOf(this.getWalletAccount)
        .then((res) => {
          this.balanceAmount = Number(util.formatEther(res._hex));
          // console.log("钱包余额", this.balanceAmount);
        })
        .catch((err) => {
          console.error("erc20(token().USDC).balanceOf", err);
        });
    },
    /**判断某用户是否在某类型的盲盒的白名单 入参：盲盒类型，用户钱包地址 出参：是否在白名单 */
    getWhiteListExistence() {
      cb()
        .getWhiteListExistence(this.boxType, this.getWalletAccount)
        .then((res) => {
          this.isWhite = res;
          // console.log("判断某用户是否在某类型的盲盒的白名单", this.isWhite);
          if (!this.isWhite) return this.$message({ message: this.$t("用户不在白名单中") });
        })
        .catch((err) => {
          console.error("getWhiteListExistence", err);
        });
    },

    /**去授权 */
    async toApprove() {
      this.approvedloading = true;
      try {
        const tx = await erc20(token().USDT).connect(getSigner()).approve(token().CB, util.parseUnits((1e10).toString()));
        await tx.wait();
        // const etReceipt = await tx.wait();
        this.approvedloading = false;
        this.isApproved = true;
        this.popupActive = 2;
      } catch (err) {
        console.error("approve", err);
        this.approvedloading = false;
        this.isApproved = false;
        this.popupActive = 1;
      }
    },
    // 用户购买某种类型的盲盒，需要通过以下检查才可购买；
    // 频控检查：单次购买盲盒数量必须大于0小于等于该用户该盲盒类型当前小时剩余购买数量；
    // 余额检查：前端要将盲盒数量乘该盲盒支付代币单价和用户的该盲盒支付代币余额比较，不要让他输入超过最大余额的盲盒数量，且至少余额要大于1个盲盒的价格才能从0变成1；
    // 库存检查：购买要求盲盒剩余可销售数量要大于等于用户要购买的数量，不要让用户输入超过剩余数量；
    // 白名单检查：如果某类型的盲盒开启了白名单，则需要用户在白名单中才可购买；
    // 授权检查：需要先去该盲盒支付代币合约授权；
    /**购买 */
    buyBoxesBefore() {
      if (!this.getWalletAccount) return this.$store.commit("setWalletConnectPopup", true);
      if (!this.inputAmount) return this.$message({ message: this.$t("tips.text6") });
      // 库存检查
      if (this.inputAmount > this.remainingAmount) {
        this.inputAmount = this.remainingAmount;
        return this.$message({ message: this.$t("tips.text7") });
      }
      // 余额检查
      if (this.totalPrice > this.balanceAmount) {
        this.inputAmount = this.balanceAmount / this.boxPrice;
        return this.$message({ message: this.$t("tips.text8") });
      }
      // 频控检查
      if (this.inputAmount > this.hourRemainingAmount) {
        this.inputAmount = this.hourRemainingAmount;
        return this.$message({ message: this.$t("tips.text9") });
      }
      // 白名单检查
      if (!this.isWhite) return this.$message({ message: this.$t("tips.text10") });
      // 授权检查
      erc20(token().USDT)
        .allowance(this.getWalletAccount, token().CB)
        .then((res) => {
          // Number(res._hex) 可付款额度
          this.isApproved = Number(res._hex) > this.totalPrice;
          if (this.isApproved) {
            this.buyBoxes();
          } else {
            this.$store.commit("setApprovePopup", true);
          }
        })
        .catch((err) => {
          console.error("allowance", err);
          this.isApproved = false;
        });
    },
    /**用户购买某种类型的盲盒 */
    buyBoxes() {
      // buyBoxes(uint256 amount, uint256 boxType, {value: avaxAmount})
      this.buyloading = true;
      cb()
        .connect(getSigner())
        .buyBoxes(this.inputAmount, this.boxType)
        .then((res) => {
          setTimeout(() => {
            if (this.getApprovePopup) this.$store.commit("setApprovePopup", false);
            this.$message({ message: this.$t("tips.text11") });
            sessionStorage.removeItem("MysteyBoxesList");
            this.buyloading = false;
            this.inputAmount = null;
            this.getAmount();
            this.getUserHourlyBoxesLeftSupply();
            this.getBalanceOf();
          }, 2000);
          // location.reload();
        })
        .catch((err) => {
          this.buyloading = false;
          console.error("buyBoxes", err);
        });
    },

    subtraction() {
      if (this.buyloading) return;
      if (this.inputAmount > 0) this.inputAmount--;
    },
    addition() {
      if (this.buyloading) return;
      if (this.inputAmount < this.remainingAmount) this.inputAmount++;
    },
    /**返回该类型盲盒某角色的出现概率，除1e4*100% 入参：盲盒类型，角色ID 出参：概率 */
    // heroProbabilities() {},
    // changeSteps(item, index) {
    //   this.nowStatusText = item.title;
    //   this.nowStatusIndex = index + 1;
    // },
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
.tip_box {
  width: 11.5rem;
  height: 0.75rem;
  line-height: 0.75rem;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  backdrop-filter: blur(0.07rem);
  margin: 0.4rem auto;
  font-size: 0.2rem;
  font-weight: 600;
  color: #969494;
  text-align: center;
}
.box {
  width: 11.5rem;
  margin: 0 auto;
  height: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.leftbox {
  width: 4.2rem;
  height: auto;
  .blindbox {
    width: 100%;
    height: 4.2rem;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 8px;
    border: 1px solid #436e77;
    backdrop-filter: blur(0.07rem);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.4rem;
  }

  .info {
    width: 100%;
    height: 2.4rem;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 8px;
    border: 1px solid #436e77;
    backdrop-filter: blur(0.07rem);
    padding: 0.2rem;
    div {
      width: 100%;
      height: 33%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.2rem;
      font-weight: 600;
      border-bottom: 1px solid;
      border-image: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44)) 1 1;
      &:last-child {
        border: none;
      }
    }
  }
}

.rightbox {
  width: 6.5rem;
  height: auto;
  padding-left: 0.2rem;
  .stepsbox {
    margin-bottom: 0.4rem;
    .stepsbox_img {
      width: 0.3rem;
      height: 0.3rem;
    }
  }
  .box1 {
    width: 100%;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 0.08rem;
    border: 1px solid #436e77;
    backdrop-filter: blur(0.07rem);
    margin-bottom: 0.4rem;
    overflow: hidden;
    &:last-child {
      margin-bottom: 0;
    }
    .title {
      background: rgba(0, 0, 0, 0.41);
      border-bottom: 1px solid #436e77;
      backdrop-filter: blur(0.07rem);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 0.2rem;
      width: 100%;
      height: 0.5rem;
      font-size: 0.2rem;
      font-weight: 600;
      div {
        img {
          width: 0.12rem;
          height: auto;
          margin-right: 0.1rem;
        }
      }
      ul {
        display: flex;
        align-items: center;
        li {
          width: 0.5rem;
          height: 0.25rem;
          line-height: 0.25rem;
          margin-left: 0.1rem;
          padding: 0 0.05rem;
          background: #535363;
          border-radius: 0.08rem;
          cursor: pointer;
          &:hover {
            background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
          }
          div {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
              font-size: 0.15rem;
              font-weight: 400;
            }
          }
        }
      }
    }
    .box2 {
      width: 100%;
      padding: 0.2rem 0;
      .row {
        font-size: 0.15rem;
        padding: 0 0.5rem;
        &:nth-child(1) {
          font-weight: 400;
          color: #979494;
        }
        &:nth-child(2) {
          padding: 0;
          height: auto;
        }
      }
      .hasbeenon {
        width: 100%;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .buying {
          width: 2rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url($urlImages + "bg8.webp") no-repeat;
          background-size: 100% 100%;
          span {
            font-size: 0.15rem;
            font-weight: bold;
            border-bottom: 1px solid;
            border-image: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44)) 1 1;
          }
        }
        .times {
          width: 3.5rem;
          height: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url($urlImages + "bg9.webp") no-repeat;
          background-size: 100% 100%;
          text-align: center;
          span {
            font-size: 0.25rem;
            font-weight: bold;
            margin: 0 0.1rem;
          }
          p {
            &:nth-child(1) {
              font-size: 0.25rem;
              font-weight: bold;
            }
            &:nth-child(2) {
              font-size: 0.12rem;
            }
          }
        }
      }
      .buy_box {
        width: 100%;
        height: 1.5rem;
        padding: 0 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          div {
            font-size: 0.12rem;
            &:nth-child(1) {
              font-weight: bold;
              position: relative;
              &::before {
                content: "";
                width: 0.02rem;
                height: 100%;
                background: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44));
                position: absolute;
                top: 0;
                left: -0.1rem;
              }
            }
          }
          .inputbox {
            width: 2rem;
            height: 0.4rem;
            margin: 0.1rem 0;
            background: rgba(24, 24, 28, 0.8);
            border-radius: 0.08rem;
            border: 1px solid #606060;
            display: flex;
            align-items: center;
            input {
              width: 100%;
              height: 100%;
              font-size: 0.2rem;
              font-weight: 400;
              color: #ffffff;
              text-align: center;
            }
            .span1,
            .span2 {
              width: 0.5rem;
              height: 80%;
              border-image: linear-gradient(180deg, rgba(85, 85, 87, 0), rgba(85, 85, 87, 1), rgba(85, 85, 87, 1), rgba(85, 85, 87, 0)) 1 1;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              &:hover i {
                color: #29a7e1;
              }
              i {
                font-size: 0.25rem;
                font-weight: 400;
                color: #555557;
              }
            }
            .span1 {
              border-right: 1px solid;
            }
            .span2 {
              border-left: 1px solid;
            }
          }
        }
        .right {
          .el-button {
            width: 1.2rem;
            height: 0.4rem;
            line-height: 0.4rem;
            font-size: 0.15rem;
          }
        }
      }
      .progress_bar_box {
        width: 100%;
        height: 1rem;
        padding: 0 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        > div {
          width: 100%;
          height: auto;
          font-size: 0.12rem;
          > div:nth-child(1) {
            font-weight: bold;
          }
          .progress_bar {
            width: 100%;
            height: auto;
            background: #17181b;
            border-radius: 0.1rem;
            margin: 0.1rem 0;
            div {
              width: 0;
              transition: all 1s;
              text-align: right;
              font-size: 0.1rem;
              font-weight: 600;
              background-image: linear-gradient(to right, rgba(0, 211, 255, 0.5), rgba(176, 108, 198, 1));
              border-radius: 0.1rem;
            }
          }
        }
      }
    }
    .content {
      width: 100%;
      padding: 0.2rem 0.5rem;
      font-size: 0.15rem;
      font-weight: 600;
      overflow-y: auto;
    }
  }
}
@media screen and (max-width: 750px) {
  .page {
    width: 100%;
    min-height: calc(100vh - 1rem);
    padding: 0.5rem 0;
  }
  .tip_box {
    width: 90%;
    height: 0.3rem;
    line-height: 0.3rem;
    border-radius: 0.04rem;
    margin: 0.1rem auto;
    font-size: 0.12rem;
    font-weight: 600;
  }
  .box {
    width: 90%;
    margin: 0 auto;
    height: auto;
    display: flex;
    justify-content: space-between;
  }
  .leftbox {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .blindbox {
      width: 1.5rem;
      height: 1.8rem;
      margin-bottom: 0;
    }
    .info {
      width: 1.7rem;
      height: 1.8rem;
      padding: 0.1rem;
      div {
        font-size: 0.12rem;
        font-weight: 600;
      }
    }
  }
  .rightbox {
    width: 100%;
    height: auto;
    padding-left: 0;
    .stepsbox {
      margin-bottom: 0.2rem;
      .stepsbox_img {
        width: 0.2rem;
        height: 0.2rem;
      }
    }
    .box1 {
      margin-bottom: 0.2rem;
      .title {
        width: 100%;
        height: 0.4rem;
        padding: 0 0.1rem;
        font-size: 0.15rem;
        font-weight: 600;
        div {
          img {
            width: 0.07rem;
            height: auto;
            margin-right: 0.05rem;
          }
        }
        ul {
          display: flex;
          align-items: center;
          li {
            width: 0.36rem;
            height: 0.15rem;
            line-height: 0.15rem;
            margin-left: 0.05rem;
            padding: 0 0.05rem;
            div {
              i {
                font-size: 0.12rem;
                font-weight: 400;
              }
            }
          }
        }
      }
      .box2 {
        width: 100%;
        padding: 0.1rem 0;
        .row {
          font-size: 0.12rem;
          padding: 0 0.2rem;
          &:nth-child(1) {
            font-weight: 400;
            color: #979494;
          }
          &:nth-child(2) {
            padding: 0;
            height: auto;
          }
        }
        .hasbeenon {
          width: 100%;
          height: 1rem;
          .buying {
            width: 1.5rem;
            height: 0.5rem;
            span {
              font-size: 0.12rem;
              font-weight: bold;
            }
          }
          .times {
            width: 100%;
            height: 0.5rem;
            justify-content: space-between;
            padding: 0 0.2rem;
            span {
              font-size: 0.25rem;
              margin: 0 0.1rem;
            }
            p {
              &:nth-child(1) {
                font-size: 0.15rem;
              }
              &:nth-child(2) {
                font-size: 0.12rem;
              }
            }
          }
        }
        .buy_box {
          width: 100%;
          height: 1.2rem;
          padding: 0 0.2rem;
          .left {
            div {
              font-size: 0.12rem;
            }
            .inputbox {
              width: 1.5rem;
              height: 0.35rem;
              margin: 0.1rem 0;
              input {
                font-size: 0.15rem;
                font-weight: 400;
              }
              .span1,
              .span2 {
                width: 0.5rem;
              }
            }
          }
          .right {
            .el-button {
              width: 1rem;
              height: 0.35rem;
              line-height: 0.35rem;
              font-size: 0.12rem;
            }
          }
        }
        .progress_bar_box {
          width: 100%;
          height: 0.8rem;
          padding: 0 0.2rem;
          > div {
            font-size: 0.12rem;
            > div:nth-child(1) {
              font-weight: bold;
            }
            .progress_bar {
              border-radius: 0.1rem;
              margin: 0.1rem 0;
            }
          }
        }
      }
      .content {
        width: 100%;
        padding: 0.1rem 0.2rem;
        font-size: 0.12rem;
      }
    }
  }
}
</style>
