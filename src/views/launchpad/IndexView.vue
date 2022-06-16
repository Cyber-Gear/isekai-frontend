<template>
  <div class="page">
    <div class="tip_box">{{ $t("message.launchpad.text1") }} {{ $t(nowStatusText) }}</div>
    <div class="box">
      <div class="leftbox">
        <div class="blindbox">
          <img :src="`${$urlImages}blindbox.webp`" alt="" />
        </div>
        <div class="info">
          <div>
            <span>{{ $t("message.launchpad.text3") }}</span>
            <span>{{ remainingAmount }} {{ $t("message.launchpad.text11") }}</span>
          </div>
          <div>
            <span>{{ $t("message.launchpad.text4") }}</span> <span>{{ boxPrice | digitalCutZero }} U</span>
          </div>
          <div>
            <span>{{ $t("message.launchpad.text5") }}</span>
            <span>{{ hourlyBuyAmount }} {{ $t("message.launchpad.text11") }}</span>
          </div>
        </div>
      </div>
      <div class="rightbox">
        <div class="stepsbox">
          <el-steps :active="nowStatusIndex" align-center>
            <el-step v-for="(item, index) in stepsArr" :key="index" :title="$t(item.title)" :description="item.des">
              <template slot="icon">
                <div @click="changeSteps(item, index)">
                  <img v-if="index < nowStatusIndex" :src="`${$urlImages}progress_img_active.webp`" alt="" />
                  <img v-else :src="`${$urlImages}progress_img_normal.webp`" alt="" />
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
        <div class="box1">
          <div class="title">
            <div><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ $t("message.launchpad.text6") }}</div>
            <ul>
              <li>{{ $t("message.launchpad.text7") }}</li>
              <li>{{ $t("message.launchpad.text8") }}</li>
              <li>{{ $t("message.launchpad.text9") }}</li>
              <li>{{ $t("message.launchpad.text10") }}</li>
            </ul>
          </div>
          <div class="box2">
            <div class="row">
              <pre>{{ $t("message.launchpad.introduction1") }}</pre>
            </div>
            <div class="row">
              <div class="hasbeenon" v-if="nowStatusIndex == 1">
                <div class="buying">
                  <span>{{ $t("message.launchpad.text12") }}</span>
                </div>
                <div class="times">
                  <div>
                    <p>{{ countdownObj.d }}</p>
                    <p>{{ $t("message.launchpad.text13") }}</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>{{ countdownObj.h }}</p>
                    <p>{{ $t("message.launchpad.text14") }}</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>{{ countdownObj.m }}</p>
                    <p>{{ $t("message.launchpad.text15") }}</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>{{ countdownObj.s }}</p>
                    <p>{{ $t("message.launchpad.text16") }}</p>
                  </div>
                </div>
              </div>
              <div class="buy_box" v-if="nowStatusIndex == 2">
                <div class="left">
                  <div>{{ $t("message.launchpad.text17") }}</div>
                  <div class="inputbox">
                    <span class="span1"><i class="iconfont icon-jianhao" @click="subtraction"></i></span>
                    <input type="number" v-model="inputAmount" oninput="value=value.replace(/^(0+)|[^\d]+/g,'')" :disabled="buyloading" />
                    <span class="span2"><i class="iconfont icon-jiahao" @click="addition"></i></span>
                  </div>
                  <div>
                    <span>{{ $t("message.launchpad.text18") }} {{ totalPrice | digitalConversionInThousandths }} U</span>
                  </div>
                </div>
                <div class="right">
                  <el-button type="primary" :loading="buyloading" @click="buyBoxesBefore">{{ $t(btnText) }}</el-button>
                </div>
              </div>
              <div class="progress_bar_box" v-if="nowStatusIndex !== 1 && progressWidth">
                <div>
                  <div>{{ $t("message.launchpad.text21") }}</div>
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
            <div><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ $t("message.launchpad.text22") }}</div>
          </div>
          <div class="content">
            <pre>{{ $t("message.launchpad.introduction2") }}</pre>
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
import ApprovePopup from "../../components/ApprovePopup";

export default {
  name: "LAUNCHPAD",
  components: { ApprovePopup },
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
        { title: "message.status.text1", des: "2022/06/12 15:00" },
        { title: "message.status.text2", des: "2022/06/14 15:00" },
        { title: "message.status.text3", des: "" },
      ],
      countdownObj: { d: 0, h: 0, m: 0, s: 0 },
      countdownTimer: null,
      nowStatusText: "message.status.text1",
      nowStatusIndex: 0,
      progressWidth: 0,
      isApproved: false,
      btnText: "message.launchpad.text19",
      popupActive: 1,
      approvedloading: false,
      buyloading: false,
    };
  },
  computed: { ...mapGetters(["getWalletAccount"]), ...mapGetters(["getApprovePopup"]) },

  watch: {
    getWalletAccount: {
      handler(newVal) {
        if (newVal) {
          if (this.isOpenWhitelist) this.getWhiteListExistence();
          this.getUserHourlyBoxesLeftSupply();
          this.getBalanceOf();
        }
      },
      deep: true, // 深度监听
      immediate: true, // 立即执行  oval 为undefined  newVal 为data中的初始值
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
      deep: true, // 深度监听
    },
  },
  created() {
    this.getAmount(this.boxType);
    this.getPriceAddrs(this.boxType);
  },
  beforeDestroy() {
    clearTimeout(this.countdownTimer);
    this.countdownTimer = null;
  },
  methods: {
    subtraction() {
      if (this.buyloading) return;
      if (this.inputAmount > 0) this.inputAmount--;
    },
    addition() {
      if (this.buyloading) return;
      if (this.inputAmount < this.remainingAmount) this.inputAmount++;
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
      if (!this.inputAmount) return this.$message({ message: this.$t("请输入购买数量") });
      // 库存检查
      if (this.inputAmount > this.remainingAmount) {
        this.inputAmount = this.remainingAmount;
        return this.$message({ message: this.$t("库存检查失败，请重新输入") });
      }
      // 余额检查
      if (this.totalPrice > this.balanceAmount) {
        this.inputAmount = this.balanceAmount / this.boxPrice;
        return this.$message({ message: this.$t("余额不足") });
      }
      // 频控检查
      if (this.inputAmount > this.hourRemainingAmount) {
        this.inputAmount = this.hourRemainingAmount;
        return this.$message({ message: this.$t("某用户某小时剩余购买数量不足") });
      }
      // 白名单检查
      if (!this.isWhite) return this.$message({ message: this.$t("用户不在白名单中") });
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
          console.log("购买成功", res);
          this.$message({ message: this.$t("购买成功") });
          this.buyloading = false;
          if (this.getApprovePopup) this.$store.commit("setApprovePopup", false);
          setTimeout(() => {
            location.reload();
          }, 1000);
          // this.getAmount();
          // this.getUserHourlyBoxesLeftSupply();
          // this.getBalanceOf();
        })
        .catch((err) => {
          this.buyloading = false;
          console.error("buyBoxes", err);
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
    /**
     * @boxesMaxSupply 获取某类型的盲盒的总销售数量 入参：盲盒类型 出参：总数量
     * @totalBoxesLength 获取某类型的盲盒的已售出数量 入参：盲盒类型 出参：已售出数量
     * @getBoxesLeftSupply 获取某类型的盲盒的剩余可销售数量 入参：盲盒类型 出参：剩余数量
     */
    async getAmount(boxType) {
      let now = Date.parse(new Date());
      let time1 = Date.parse(this.stepsArr[0].des);
      let time2 = Date.parse(this.stepsArr[1].des);
      let index = now > time1 && now < time2 ? 0 : 1;
      await cb()
        .getBoxesLeftSupply(boxType)
        .then((res) => {
          this.remainingAmount = Number(res._hex);
          // this.remainingAmount = 0;
          if (this.remainingAmount == 0) index = 2;
          // console.log("获取某类型的盲盒的剩余可销售数量", this.remainingAmount);
        })
        .catch((err) => {
          console.error("getBoxesLeftSupply", err);
        });
      this.nowStatusText = this.stepsArr[index].title;
      this.nowStatusIndex = index + 1;
      await cb()
        .boxesMaxSupply(boxType)
        .then((res) => {
          this.totalAmount = Number(res._hex);
          // console.log("获取某类型的盲盒的总销售数量", this.totalAmount);
        })
        .catch((err) => {
          console.error("boxesMaxSupply", err);
        });
      await cb()
        .totalBoxesLength(boxType)
        .then((res) => {
          this.soldAmount = Number(res._hex);
          // console.log("获取某类型的盲盒的已售出数量", this.soldAmount);
        })
        .catch((err) => {
          console.error("totalBoxesLength", err);
        });
      if (this.nowStatusIndex == 1) {
        this.countdownFun(time2);
      } else {
        this.progressWidth = ((this.soldAmount / this.totalAmount) * 100).toFixed(0);
      }
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
    getPriceAddrs(boxType) {
      cb()
        .boxTokenPrices(boxType)
        .then((res) => {
          this.boxPrice = util.formatEther(res._hex);
          // console.log("获取某类型的盲盒的支付代币单价", this.boxPrice);
        })
        .catch((err) => {
          console.error("boxTokenPrices", err);
        });
      cb()
        .tokenAddrs(boxType)
        .then((res) => {
          this.paymentAddress = res;
          // console.log("获取某类型的盲盒的支付代币地址", this.paymentAddress);
        })
        .catch((err) => {
          console.error("tokenAddrs", err);
        });
      cb()
        .whiteListFlags(boxType)
        .then((res) => {
          this.isOpenWhitelist = res;
          // console.log("获取某类型的盲盒是否开启白名单", this.isOpenWhitelist);
        })
        .catch((err) => {
          console.error("whiteListFlags", err);
        });
      cb()
        .hourlyBuyLimits(this.boxType)
        .then((res) => {
          this.hourlyBuyAmount = Number(res._hex);
          // console.log("每小时限购数量", res, Number(res._hex));
        })
        .catch((err) => {
          console.error("hourlyBuyLimits", err);
        });
    },
    /**判断某用户是否在某类型的盲盒的白名单 入参：盲盒类型，用户钱包地址 出参：是否在白名单 */
    getWhiteListExistence() {
      cb()
        .getWhiteListExistence(this.boxType, this.getWalletAccount)
        .then((res) => {
          this.isWhite = res;
          // console.log("判断某用户是否在某类型的盲盒的白名单", this.isWhite);
        })
        .catch((err) => {
          console.error("getWhiteListExistence", err);
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
    /**返回该类型盲盒某角色的出现概率，除1e4*100% 入参：盲盒类型，角色ID 出参：概率 */
    // heroProbabilities() {},
    /**获取某ID的盲盒的类型 入参：盲盒ID 出参：盲盒类型 */
    // cbIdToType() {},
    /**获取某用户基于指针（从0开始）和数量的盲盒ID数组，以及最后一个数据的指针 入参：用户钱包地址，指针，数量(秒) 出参：盲盒ID数组，最后指针 */
    // tokensOfOwnerBySize() {},
    /**监听开盲盒结果，获取某用户开出来的英雄的数量和ID数组 用户钱包地址，生成英雄数量，英雄ID数组 */
    // event SpawnCns(address user, uint256 amount, uint256[] cnIds)

    changeSteps(item, index) {
      this.nowStatusText = item.title;
      this.nowStatusIndex = index + 1;
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
}
.leftbox {
  width: 4.2rem;
  height: auto;
  .blindbox {
    width: 100%;
    height: 5rem;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 8px;
    border: 1px solid #436e77;
    backdrop-filter: blur(0.07rem);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.4rem;
    img {
      width: 2.3rem;
      height: auto;
    }
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
  }
  .box1 {
    width: 100%;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 0.08rem;
    border: 1px solid #436e77;
    backdrop-filter: blur(0.07rem);
    margin-bottom: 0.4rem;
    &:last-child {
      margin-bottom: 0;
    }
    .title {
      background: rgba(0, 0, 0, 0.41);
      border-bottom: 1px solid #436e77;
      backdrop-filter: blur(0.07rem);
      padding: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        font-size: 0.2rem;
        font-weight: 600;
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
          width: fit-content;
          height: 0.2rem;
          line-height: 0.2rem;
          margin-left: 0.1rem;
          padding: 0 0.05rem;
          background: #535363;
          border-radius: 0.08rem;
          font-size: 0.12rem;
          font-weight: 400;
          text-align: center;
          cursor: pointer;
          &:hover {
            background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
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
          font-weight: bold;
          span {
            font-size: 0.25rem;
            margin: 0 0.1rem;
          }
          p {
            &:nth-child(1) {
              font-size: 0.25rem;
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
            width: 1.7rem;
            height: 0.35rem;
            margin: 0.1rem 0;
            background: rgba(24, 24, 28, 0.8);
            border-radius: 0.08rem;
            border: 1px solid #606060;
            display: flex;
            align-items: center;
            input {
              width: 100%;
              height: 100%;
              font-size: 0.15rem;
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
          font-weight: bold;
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
      height: 4rem;
      padding: 0.2rem 0.5rem;
      font-size: 0.15rem;
      font-weight: 600;
      overflow-y: auto;
    }
  }
}
</style>
