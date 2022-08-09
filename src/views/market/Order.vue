<template>
  <div class="page">
    <div class="banner">
      <div class="back_box">
        <div @click="goBack">
          <i class="iconfont pcfanhui"></i><span>{{ $t("btns.text1") }}</span>
        </div>
      </div>
    </div>
    <div class="box_title">
      <img :src="`${$urlImages}box_title1.webp`" alt="" />
      <span>{{ $t("market.text19") }}</span>
    </div>
    <div class="content_box">
      <div class="filter">
        <div class="select">
          <el-select v-for="(filter, index) in filters" :key="index" v-model="filter.value" :placeholder="filter.name">
            <el-option v-for="item in filter.options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </div>
        <div class="selectAll" @click="allCheckHandler">
          <span class="input">
            <i class="iconfont pcfuxuankuang-quanxuan" v-show="isAllChecked"></i>
            <i class="iconfont pcfuxuankuang-weiquanxuan" v-show="!isAllChecked"></i>
          </span>
          <span v-show="!isAllChecked">{{ $t("market.text20") }}</span>
          <span v-show="isAllChecked">{{ $t("market.text27") }}</span>
        </div>
      </div>
      <div class="card_list">
        <div class="card" v-for="(item, index) in cardList" :key="index" @click="checkHandler(item)">
          <span class="input">
            <i class="iconfont pcfuxuankuang-quanxuan" v-show="item.isChecked"></i>
            <i class="iconfont pcfuxuankuang-weiquanxuan" v-show="!item.isChecked"></i>
          </span>
          <img v-if="item.cardInfo && item.cardInfo.card" :src="item.cardInfo.card" alt="" />
          <span v-if="item.cardInfo && item.cardInfo.name">{{ $t(item.cardInfo.name) }}</span>
        </div>
      </div>
      <div class="confirm">
        <el-button @click="openOrder" v-show="!disable">{{ $t("market.text21") }}</el-button>
      </div>
    </div>
    <el-dialog
      center
      top="0"
      :title="$t('orderPopup.text1')"
      :visible.sync="isShowOrder"
      :modal-append-to-body="false"
      :destroy-on-close="true"
      @close="closeOrder"
    >
      <div class="popupbox">
        <div class="box_body">
          <div class="row">
            <span>{{ $t("market.text22") }}</span>
            <div>
              <input
                type="text"
                v-model="price"
                :placeholder="$t('tips.text14')"
                @input="price = price.replace(/[^\d]/g, '')"
                :disabled="sellLoading"
              />
              <span>USDT</span>
            </div>
          </div>
          <div class="row">
            <span>{{ $t("market.text23") }}</span>
            <div>
              <input type="text" :value="fees" disabled />
              <span>USDT</span>
            </div>
          </div>
          <div class="row">
            <span>{{ $t("market.text24") }}</span>
            <div>
              <input type="text" :value="income" disabled />
              <span>USDT</span>
            </div>
          </div>
          <el-button :loading="sellLoading" @click="beforeSell('USDT')" :disabled="enabled">{{ $t("market.text21") }}</el-button>
        </div>
      </div>
    </el-dialog>
    <ApprovePopup :operation="operation" :loading="sellLoading"></ApprovePopup>
  </div>
</template>

<script>
import { cn, market, util, getSigner, token, contract } from "funtopia-sdk";
import { mapGetters } from "vuex";
import ApprovePopup from "@/components/ApprovePopup.vue";
import { shikastudio } from "@/mock/nftworks";
export default {
  name: "MarketOrder",
  components: { ApprovePopup },
  data() {
    return {
      cardList: [],
      heroIdList: [],
      filters: [
        {
          name: "Series",
          options: [
            {
              value: 0,
              label: "Cybergear",
            },
            {
              value: 1,
              label: "Puck",
            },
            {
              value: 2,
              label: "Moonbird",
            },
          ],
          value: "",
        },
        {
          name: "Type",
          options: [
            {
              value: 0,
              label: "Box",
            },
            {
              value: 1,
              label: "Character",
            },
            {
              value: 2,
              label: "Shard",
            },
          ],
          value: "",
        },
        {
          name: "Rarity",
          options: [
            {
              value: 0,
              label: "MR",
            },
            {
              value: 1,
              label: "UR",
            },
            {
              value: 2,
              label: "SR",
            },
            {
              value: 3,
              label: "R",
            },
          ],
          value: "",
        },
        {
          name: "Attribute",
          options: [
            {
              value: 0,
              label: "Class",
            },
            {
              value: 1,
              label: "Grade",
            },
            {
              value: 2,
              label: "Character",
            },
          ],
          value: "",
        },
      ],
      tokens: [
        { label: "USDT", addr: token().USDT },
        { label: "FUN", addr: token().FUN },
        { label: "ETH", addr: "" },
      ],
      operation: {
        name: this.$t("approvePopup.text5"),
        func: "sellNfts",
      },
      sellList: {},
      name: null,
      isShowPopup: false,
      isShowOrder: false,
      isAllChecked: false,
      isApproved: false,
      popupActive: 1,
      approvedloading: false,
      sellLoading: false,
      price: "",
      fee: 0,
      value: "",
      balance: 0,
      disable: true,
      requestTimer: null,
    };
  },
  computed: {
    ...mapGetters(["getWalletAccount"]),
    fees: function () {
      return ((this.fee * this.price) / 100).toFixed(4);
    },
    income: function () {
      return this.price - this.fees;
    },
    enabled: function () {
      return this.price == "";
    },
  },
  watch: {
    getWalletAccount: {
      handler(newVal, oldVal) {
        this.getFee();
        //有值即已登录状态
        if (newVal) {
          console.log("登陆状态下的跳转");
          if (sessionStorage.getItem("HeroAssetList")) {
            console.log("立即读取");
            this.heroIdList = JSON.parse(sessionStorage.getItem("HeroAssetList"));
            this.cardListInit();
          } else {
            console.log("首次跳转到此页面 加载");
            this.tokensOfOwner();
          }
        } else {
          //未连接或断开操作
          sessionStorage.removeItem("HeroAssetList");
          // this.cardList = [];
          this.$router.push({ path: "/market" });
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    clearInterval(this.requestTimer);
    this.requestTimer = null;
  },
  methods: {
    openVideo() {
      this.isShowPopup = true;
    },

    allCheckHandler() {
      let item = null;
      for (item of this.cardList) {
        item.isChecked = !this.isAllChecked;
      }
      this.isAllChecked = !this.isAllChecked;
      if (this.cardList.find((item) => item.isChecked == true)) this.disable = false;
      else this.disable = true;
    },

    checkHandler(item) {
      // console.log("sad", item);
      item.isChecked = !item.isChecked;
      if (this.cardList.find((item) => item.isChecked == true)) this.disable = false;
      else this.disable = true;
    },

    openOrder() {
      this.sellList = {};
      let data = {
        nftIds: [],
        types: [],
        tokens: [],
        prices: [],
        total: 0,
      };
      this.cardList.forEach((item) => {
        if (item.isChecked) {
          data.nftIds.push(item.nftId);
          data.types.push(token().CN);
          data.tokens.push(token().USDT);
          data.total++;
        }
      });
      this.sellList = data;
      this.isShowOrder = true;
      console.log(this.sellList);
    },

    closeOrder() {
      this.price = "";
      this.isShowOrder = false;
      this.sellLoading = false;
    },

    goBack() {
      history.go(-1);
    },

    getFee() {
      market()
        .fee()
        .then((res) => {
          this.fee = Number(res._hex) / 10000;
          // console.log(this.fee);
        });
    },

    cardListInit() {
      this.heroIdList.forEach((element) => {
        const obj = {};
        obj.cardInfo = shikastudio.works.find((item) => item.id == element.id);
        obj.nftId = element.nftId;
        obj.isChecked = false;
        this.cardList.push(obj);
      });
      console.log(this.cardList);
    },

    // 获取钱包的所有NFT ids
    tokensOfOwner() {
      // console.log(this.balance);
      cn()
        .tokensOfOwnerBySize(this.getWalletAccount, 0, 10000)
        .then((res) => {
          // console.log(res);
          if (res[0].length > 0) {
            const cnIds = res[0].map((item) => {
              return Number(item);
            });
            this.getHeroList(cnIds);
          }
        })
        .catch((err) => {
          console.error("tokensOfOwnerBySize", err);
        });
    },

    //获取所有nftId的角色id对应列表
    getHeroList(cnIds) {
      cnIds.forEach((element) => {
        cn()
          .data(element, "hero")
          .then((res) => {
            // console.log("获取某英雄的某单数据字段的数据", res, Number(res));
            const hero = {};
            hero.nftId = element;
            hero.id = Number(res);
            this.heroIdList.push(hero);
          })
          .catch((err) => {
            console.error("data", err);
            clearInterval(this.requestTimer);
            this.requestTimer = null;
          });
      });
      //设置定时器等上述数据全部get
      this.requestTimer = setInterval(() => {
        if (this.heroIdList.length === cnIds.length) {
          clearInterval(this.requestTimer);
          this.requestTimer = null;
          this.cardListInit();
          sessionStorage.setItem("HeroAssetList", JSON.stringify(this.heroIdList));
        }
      }, 100);
    },

    /**去授权 */
    async toApprove() {
      const tx = await cn().connect(getSigner()).setApprovalForAll(contract().Market, true);
      await tx.wait();
    },

    beforeSell(whichToken) {
      console.log(this.sellList);
      let tokenAddr = "";
      if (whichToken == "USDT") tokenAddr = token().USDT;
      else if (whichToken == "FUN") tokenAddr = token().FUN;
      console.log(tokenAddr);
      this.sellLoading = true;
      // this.$store.commit("setApprovePopup", true);
      // 授权检查
      cn()
        .isApprovedForAll(this.getWalletAccount, contract().Market)
        .then((res) => {
          // Number(res._hex) 可付款额度
          console.log("授权了吗", res);
          // console.log("额度", this.price);
          // this.isApproved = Number(res._hex) > this.totalPrice;
          if (res) {
            this.sellNfts();
          } else {
            // this.isShowOrder = false;
            console.log("去授权");
            this.sellLoading = false;
            this.$store.commit("setApprovePopup", true);
          }
        })
        .catch((err) => {
          console.error("allowance", err);
          this.isApproved = false;
        });
    },

    async sellNfts() {
      this.sellLoading = true;
      for (let i = 0; i < this.sellList.total; i++) {
        this.sellList.prices.push(util.parseEther(this.price));
      }
      try {
        const tx = await market().connect(getSigner()).sell(this.sellList.types, this.sellList.nftIds, this.sellList.tokens, this.sellList.prices);
        // const etReceipt = await tx.wait(); // 请求已发出，等待矿工打包进块，交易成功，返回交易收据
        // console.log("交易收据", etReceipt);
        await tx.wait();
        if (this.getApprovePopup) this.$store.commit("setApprovePopup", false);
        this.$message({ message: this.$t("tips.text16") });
        sessionStorage.removeItem("HeroAssetList");
        // this.sellLoading = false;
        // this.isShowOrder =false;
        // this.sellList = {};
        // this.isShowOrder =false;
        location.reload();
      } catch (err) {
        this.sellLoading = false;
        console.error("sellNfts", err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding-top: 0.8rem;
  background: url($urlImages + "bg7.webp") no-repeat;
  background-size: 100% 100%;
}
.banner {
  width: 100%;
  height: 1rem;
  position: relative;
}
.box_title {
  span {
    font-size: 0.35rem;
    margin-left: 0.17rem;
    margin-bottom: 0.1rem;
    &::before {
      top: 0.37rem;
      left: 0.1rem;
      background-size: 110%;
    }
  }
  img {
    width: 3.75rem;
  }
}
.content_box {
  width: 11.5rem;
  max-height: 7.8rem;
  margin: 0 auto 2rem auto;
  .filter {
    width: 100%;
    height: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .select {
      width: 5.5rem;
      display: flex;
      justify-content: space-between;
      .el-select {
        width: 1.2rem;
        height: 0.3rem;
      }
    }
    .selectAll {
      cursor: pointer;
      font-size: 0.16rem;
      color: #adadb2;
      i {
        font-size: 0.16rem;
        margin-right: 0.05rem;
      }
    }
  }
  .card_list {
    width: 100%;
    max-height: 7.2rem;
    overflow-y: auto;
    margin-top: 0.69rem;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 0.2rem;
    .card {
      cursor: pointer;
      width: 2rem;
      height: 3.12rem;
      position: relative;
      margin-bottom: 0.45rem;
      margin-right: 0.26rem;
      .input {
        position: absolute;
        top: 2%;
        left: -8.2%;
        i {
          font-size: 0.16rem;
          font-weight: 600;
          color: #939597;
        }
        .pcfuxuankuang-quanxuan {
          color: #5f466e;
        }
      }
      > img {
        width: 100%;
        height: 100%;
      }
      span {
        font-size: 0.12rem;
        position: absolute;
        left: 0.2rem;
        top: 0.22rem;
      }
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }

  .confirm {
    width: 100%;
    height: 1rem;
    position: relative;
    .el-button {
      font-size: 0.15rem;
      font-weight: 600;
      width: 1rem;
      height: 0.4rem;
      position: absolute;
      border-radius: 0.06rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0);
      background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
      color: #d5dbe1;
    }
  }
}

.popupbox {
  width: 7rem;
  height: 3.9rem;
  .box_body {
    width: 5rem;
    height: 4rem;
    margin: 0.24rem auto 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .row {
      width: 4.5rem;
      height: 0.5rem;
      margin: 0 auto;
      > span {
        display: inline-block;
        width: 1.1rem;
        height: 100%;
        font-size: 0.17rem;
        color: #d0cfd1;
        font-weight: 500;
      }

      div {
        width: 3.25rem;
        height: 100%;
        display: inline-block;
        position: relative;
        border-radius: 0.08rem;
        border: 2px solid #414040;
        background-color: #181819;

        input {
          width: 2.3rem;
          height: 100%;
          text-align: center;
          font-size: 0.17rem;
          color: #414040;
        }
        span {
          font-size: 0.17rem;
          font-weight: 500;
        }
        .select {
          width: 0.8rem;
        }
      }
    }
    .el-button {
      font-weight: 600;
      width: 1.29rem;
      height: 0.45rem;
      margin: 0 auto;
      background-image: linear-gradient(to right, #366371, #5f466e);
      color: #d5dbe1;
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
  .box_title {
    span {
      font-size: 0.2rem;
      margin-left: 0.05rem;
      &::before {
        top: 0.2rem;
        left: 0rem;
        background-size: 110%;
      }
    }
    img {
      width: 1.8rem;
      margin-left: -1.2rem;
    }
  }

  .content_box {
    width: 3.15rem;
    margin-bottom: 0.8rem;
    .filter {
      height: 0.2rem;
      .select {
        width: 2.4rem;
        .el-select {
          width: 0.66rem;
          height: 0.2rem;
        }
      }
      .selectAll {
        width: 0.71rem;
        font-size: 0.12rem;
        i {
          font-size: 0.12rem;
        }
      }
    }

    .card_list {
      padding: 0 0 0 0.12rem;
      margin-top: 0.25rem;
      .card {
        width: 1.4rem;
        height: 2.2rem;
        margin-bottom: 0.15rem;
        margin-right: 0.1rem;
        .input {
          top: 2%;
          left: -7.2%;
          i {
            font-size: 0.12rem;
          }
        }
        span {
          font-size: 0.1rem;
          left: 0.15rem;
          top: 0.15rem;
        }
        &:nth-child(5n) {
          margin-right: 0.1rem;
        }
      }
    }

    .confirm {
      height: 0.5rem;
      .el-button {
        width: 0.85rem;
        height: 0.35rem;
        font-size: 0.12rem;
      }
    }
  }

  .popupbox {
    width: 3.15rem;
    height: 2.23rem;
    .box_body {
      width: 2.7rem;
      height: 100%;
      margin-top: 0.02rem;
      .row {
        width: 2.6rem;
        height: 0.4rem;
        > span {
          width: 0.65rem;
          font-size: 0.12rem;
        }

        div {
          width: 1.87rem;
          height: 0.4rem;
          border-radius: 0.04rem;
          border: 0;
          input {
            width: 1.4rem;
            font-size: 0.12rem;
            color: #fff;
          }

          span {
            font-size: 0.12rem;
          }
        }
      }
      .el-button {
        width: 0.8rem;
        height: 0.3rem;
        font-size: 0.12rem;
      }
    }
  }
}
</style>
