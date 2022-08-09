<template>
  <div class="page">
    <div class="box" :class="{ hidden: !isShowSelectionList }">
      <div class="selectionlist">
        <div class="title">
          <i class="iconfont pcconditions" @click="openSelectionList"></i>
          <i class="iconfont pcjiantou_qiehuanzuo" @click="closeSelectionList"></i>
        </div>
        <div class="list">
          <el-collapse accordion v-model="activeName" @change="changeSelectionList">
            <el-collapse-item v-for="(item, index) in selectionList" :key="index" :name="index.toString()">
              <template slot="title">
                <div class="checkbox_title"><i :class="item.icon"></i> {{ item.title }}</div>
              </template>
              <div class="gradient_border">
                <div>
                  <div class="input_list" v-if="index == 1">
                    <div class="inputbox">
                      <input type="number" placeholder="min" v-model="item.checkboxList[0].min" />
                      <span>-</span>
                      <input type="number" placeholder="max" v-model="item.checkboxList[0].max" />
                    </div>
                    <div class="btn" @click="clickOK(item.checkboxList[0])">OK</div>
                  </div>
                  <ul class="checkbox_content" v-else>
                    <li v-for="(ite, ind) in item.checkboxList" :key="ind" @click="checkboxClick(ite)">
                      <div class="check">
                        <i class="iconfont pcfuxuankuang-quanxuan" v-show="ite.isChecked"></i>
                        <i class="iconfont pcfuxuankuang-weiquanxuan" v-show="!ite.isChecked"></i>
                      </div>
                      <div class="label">{{ ite.label }}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>

      <div class="boxlist">
        <div class="title">
          <i class="iconfont pcconditions" v-if="!isShowDrawer" @click="openDrawer"></i>
          <div class="input_group">
            <i class="iconfont pcsousuo"></i>
            <input type="text" :placeholder="$t('market.text7')" />
          </div>

          <el-button @click="toOrder">{{ $t("market.text8") }}</el-button>
        </div>
        <div class="result">{{ cardList.length }} {{ $t("market.text9") }}</div>
        <div class="checkedbox" v-show="tagList.length > 0">
          <div class="taglist">
            <el-tag closable v-for="(item, index) in tagList" :key="index" @close="clearTag(item, index)">
              {{ item.label }}
            </el-tag>
          </div>
          <div class="btn">
            <span @click="clearAllTag">{{ $t("market.text26") }}</span>
          </div>
        </div>

        <ul class="card_list">
          <li
            v-for="(item, index) in cardList"
            :key="index"
            @click="toDetail(item.nft, item.nft_type, item.nftId, item.data.id, item.price, item.seller, item.token, item.token_type)"
          >
            <div class="hero_card" v-if="item.nft_type == 'hero'">
              <div class="top"><img :src="item.data.logo" alt="" /></div>
              <div class="center">
                <div>
                  <span>{{ $t(item.data.name) }}</span>
                  <img :src="`${$urlImages}icon1.webp`" alt="" />
                </div>
                <div>
                  <span>{{ $t(item.data.title) }}</span>
                  <span>{{ item.price }} {{ item.token_type }}</span>
                </div>
                <div v-if="item.lastPrice">{{ $t("artist.text10") }} {{ item.lastPrice }} {{ item.token_type }}</div>
                <div v-else>{{ $t("artist.text10") }} ----</div>
              </div>
              <div class="bottom">
                <el-button @click="cancel(item.nft, item.nftId)" :disabled="item.seller != getWalletAccount.toLowerCase()">Cancel</el-button>
                <i class="iconfont pcaccount"></i>
                <span>2</span>
              </div>
            </div>
            <div class="box_card" v-else-if="item.nft_type == 'box'">
              <div class="top">
                <LottieAnimation></LottieAnimation>
              </div>
              <div class="center">
                <div>
                  <span>Cybergear</span>
                  <img :src="`${$urlImages}icon1.webp`" alt="" />
                </div>
                <div>
                  <span>{{ "Bir Mystery Box" + " #" + item.nftId }}</span>
                  <span>{{ item.price }} {{ item.token_type }}</span>
                </div>
                <div v-if="item.lastPrice">{{ $t("artist.text10") }} {{ item.lastPrice }} {{ item.token_type }}</div>
                <div v-else>{{ $t("artist.text10") }} ----</div>
              </div>
              <div class="bottom">
                <i class="iconfont pcaccount"></i>
                <span>2</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-drawer :visible.sync="isShowDrawer" :with-header="false" direction="ltr" class="market_drawer">
      <div class="selectionlist">
        <div class="title">
          <i class="iconfont pcconditions"></i>
          <i class="iconfont pcjiantou_qiehuanzuo" @click="isShowDrawer = false"></i>
        </div>
        <div class="list">
          <el-collapse accordion v-model="activeName" @change="changeSelectionList">
            <el-collapse-item v-for="(item, index) in selectionList" :key="index" :name="index.toString()">
              <template slot="title">
                <div class="checkbox_title"><i :class="item.icon"></i> {{ item.title }}</div>
              </template>
              <div class="gradient_border">
                <div>
                  <div class="input_list" v-if="index == 1">
                    <div class="inputbox">
                      <input type="number" placeholder="min" v-model="item.checkboxList[0].min" />
                      <span>-</span>
                      <input type="number" placeholder="max" v-model="item.checkboxList[0].max" />
                    </div>
                    <div class="btn" @click="clickOK(item.checkboxList[0])">OK</div>
                  </div>
                  <ul class="checkbox_content" v-else>
                    <li v-for="(ite, ind) in item.checkboxList" :key="ind" @click="checkboxClick(ite)">
                      <div class="check">
                        <i class="iconfont pcfuxuankuang-quanxuan" v-show="ite.isChecked"></i>
                        <i class="iconfont pcfuxuankuang-weiquanxuan" v-show="!ite.isChecked"></i>
                      </div>
                      <div class="label">{{ ite.label }}</div>
                    </li>
                  </ul>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import { marketInfo, market, util, getSigner, token } from "funtopia-sdk";
import LottieAnimation from "@/components/LottieAnimation";
import { mapGetters } from "vuex";
import { shikastudio } from "@/mock/nftworks";
export default {
  name: "MARKET",
  components: { LottieAnimation },
  computed: { ...mapGetters(["getWalletAccount"]) },
  data() {
    return {
      activeName: "0",
      selectionList: [
        {
          title: this.$t("market.text1"),
          icon: "iconfont pcnav-list",
          checkboxList: [
            { label: "Cybergear", tagName: "cybergear", isChecked: false },
            { label: "Puck", tagName: "puck", isChecked: false },
            { label: "Moonbird", tagName: "moonbird", isChecked: false },
          ],
        },
        {
          title: this.$t("market.text2"),
          icon: "iconfont pcdollar",
          checkboxList: [{ label: this.$t("market.text30"), min: 0, max: 0 }],
        },
        {
          title: this.$t("market.text3"),
          icon: "iconfont pczijin",
          checkboxList: [
            { label: "FUN", tagName: "fun", isChecked: false },
            { label: "USDT", tagName: "usdt", isChecked: false },
            { label: "ETH", tagName: "eth", isChecked: false },
          ],
        },
        {
          title: this.$t("market.text4[0]"),
          icon: "iconfont pcall",
          checkboxList: [
            { label: this.$t("market.text4[1]"), tagName: "box", isChecked: false },
            { label: this.$t("market.text4[2]"), tagName: "hero", isChecked: false },
            { label: this.$t("market.text4[3]"), tagName: "shard", isChecked: false },
          ],
        },
        {
          title: this.$t("market.text5"),
          icon: "iconfont pcdengji",
          checkboxList: [
            { label: "MR", isChecked: false },
            { label: "UR", isChecked: false },
            { label: "SR", isChecked: false },
            { label: "R", isChecked: false },
          ],
        },
        {
          title: this.$t("market.text6[0]"),
          icon: "iconfont pcshuxingchaxun",
          checkboxList: [
            { label: this.$t("market.text6[1]"), isChecked: false },
            { label: this.$t("market.text6[2]"), isChecked: false },
            { label: this.$t("market.text6[3]"), isChecked: false },
          ],
        },
      ],
      cardList: [],
      tmpCardList: [],
      tagList: [],
      isShowSelectionList: true,
      isShowDrawer: false,
      requestTimer: null,
    };
  },
  watch: {
    tagList: {
      handler(newVal) {
        if (newVal) {
          this.UpdateCardByFilter();
        }
      },
      // deep:true,
    },
  },

  created() {
    this.getCardInfo(30, 0, "sellTime", "desc");
    this.requestTimer = setInterval(() => {
      if (this.tmpCardList.length) {
        clearInterval(this.requestTimer);
        this.requestTimer = null;
        // this.cardList = JSON.parse(JSON.stringify(this.tmpCardList));
        this.cardList = this.tmpCardList;
        this.tmpCardList = [];
      }
    }, 200);
    // this.cardList = shikastudio.works;
  },
  beforeDestroy() {
    clearInterval(this.requestTimer);
    this.requestTimer = null;
  },
  methods: {
    openSelectionList() {
      this.isShowSelectionList = true;
    },
    closeSelectionList() {
      this.activeName = "";
      setTimeout(() => {
        this.isShowSelectionList = false;
      }, 300);
    },
    openDrawer() {
      this.isShowDrawer = true;
    },
    closeDrawer() {
      this.isShowDrawer = false;
    },
    changeSelectionList(activeNames) {
      // console.log(activeNames);
      if (!this.isShowSelectionList) {
        this.isShowSelectionList = true;
        setTimeout(() => {
          this.activeName = activeNames;
        }, 300);
      }
    },

    clickOK(item) {
      //
    },

    checkboxClick(ite) {
      ite.isChecked = !ite.isChecked;
      if (ite.isChecked) {
        this.tagList.push(ite);
      } else {
        const index = this.tagList.findIndex((it) => it.label === ite.label);
        this.tagList.splice(index, 1);
      }
    },
    clearTag(item, index) {
      // const index = this.tagList.findIndex((ite) => ite.label === item.label);
      this.tagList.splice(index, 1);
      this.selectionList.forEach((element) => {
        element.checkboxList.forEach((ele) => {
          if (ele.label == item.label) ele.isChecked = false;
        });
      });
    },
    clearAllTag() {
      this.tagList = [];
      this.selectionList.forEach((element) => {
        element.checkboxList.forEach((ele) => {
          if (ele.isChecked) ele.isChecked = false;
        });
      });
    },
    toDetail(nft, nft_type, nftId, id, price, seller, token, token_type) {
      console.log(id);
      this.$router.push({
        path: "/market-details",
        query: { nft: nft, nft_type: nft_type, nftId: nftId, id: id, price: price, seller: seller, token: token, token_type: token_type },
      });
    },
    toOrder() {
      if (!this.getWalletAccount) return this.$store.commit("setWalletConnectPopup", true);
      else this.$router.push({ path: "/market-order" });
    },

    // Contract
    getCardInfo(first, skip, orderBy, orderDirection, seller, nft, toke_n, price_gte, price_lte, hero, rarity, boxType) {
      marketInfo
        .getSellInfos(first, skip, orderBy, orderDirection, seller, nft, toke_n, price_gte, price_lte, hero, rarity, boxType)
        .then((res) => {
          let data = JSON.parse(JSON.stringify(res.data.sellInfos));
          data.forEach((element) => {
            element.data = shikastudio.works.find((item) => item.id == Number(element.hero) + 1);
            if (element.token == token().USDT.toLowerCase()) element.token_type = "USDT";
            else if (element.token == token().FUN.toLowerCase()) element.token_type = "FUN";
            else element.token_type = "ETH";
            if (element.nft == token().CN.toLowerCase()) element.nft_type = "hero";
            else if (element.nft == token().CB.toLowerCase()) element.nft_type = "box";
            else element.nft_type = "shard";
            element.price = Number(util.formatEther(element.price));
            marketInfo.getBuyInfos(1000, 0, "buyTime", "desc", undefined, undefined, element.nfts).then((res) => {
              let data = JSON.parse(JSON.stringify(res.data.buyInfos)).find((item) => item.nftId == Number(element.nftId));
              if (data && data.price) {
                console.log("data.price", data.price, Number(util.formatEther(data.price)));
                element.lastPrice = Number(util.formatEther(data.price));
              }
              // console.log(element);
              this.tmpCardList.push(element);
            });
          });
        })
        .catch((err) => {
          console.error("getSellInfos", err);
        });
    },

    UpdateCardByFilter() {
      console.log("tag", this.tagList);
      if (!this.tagList.length) {
        this.getCardInfo(30, 0, "sellTime", "desc");
      }

      if (this.tagList.find((item) => item.tagName == "cybergear") || this.tagList.find((item) => item.tagName == "hero")) {
        this.getCardInfo(30, 0, "sellTime", "desc", undefined, token().CN);
      }

      if (this.tagList.find((item) => item.tagName == "cybergear") || this.tagList.find((item) => item.tagName == "box")) {
        this.getCardInfo(30, 0, "sellTime", "desc", undefined, token().CB);
      }

      this.requestTimer = setInterval(() => {
        if (this.tmpCardList.length) {
          clearInterval(this.requestTimer);
          this.requestTimer = null;
          this.cardList = this.tmpCardList;
          this.tmpCardList = [];
        }
      }, 200);
    },

    async cancel(nft, nftId) {
      try {
        const tx = await market().connect(getSigner()).cancel([nft], [nftId]);
        // const etReceipt = await tx.wait(); // 请求已发出，等待矿工打包进块，交易成功，返回交易收据
        // console.log("交易收据", etReceipt);
        await tx.wait();
        location.reload();
      } catch (err) {
        console.error("sellNfts", err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  min-height: calc(100vh - 4rem);
  background: url($urlImages + "bg5.webp") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.8rem;
  padding-bottom: 1rem;
}
.box {
  width: 11.5rem;
  margin: 0.4rem auto 0 auto;
  display: flex;
  justify-content: center;
  &.hidden {
    .selectionlist {
      width: 0.25rem;
    }
    .boxlist {
      width: calc(100% - 0.25rem);
      .card_list {
        li {
          width: 2.08rem;
          &:nth-child(4n) {
            margin-right: 0.15rem;
          }
          &:nth-child(5n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
.selectionlist {
  width: 2.5rem;
  overflow: hidden;
  transition: all 0.3s;
  .title {
    width: 2.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-image: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44)) 1 1;
    i {
      font-size: 0.25rem;
      cursor: pointer;
    }
  }
  .list {
    width: 2.5rem;
    .checkbox_title {
      width: 100%;
      color: #ffffff;
      font-size: 0.2rem;
      i {
        font-size: 0.25rem;
        margin-right: 0.1rem;
      }
    }
    .checkbox_content {
      width: 100%;
      padding: 0.1rem;
      li {
        cursor: pointer;
        width: 50%;
        height: auto;
        display: flex;
        align-items: center;
        font-size: 0.12rem;
        font-weight: 600;
        color: #ffffff;
        padding: 0.1rem;
        .check {
          margin-right: 0.08rem;
        }
      }
    }
    .input_list {
      width: 100%;
      padding: 0.1rem;
      font-size: 0.15rem;
      font-weight: 400;
      color: #ffffff;
      .inputbox {
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          width: 0.8rem;
          height: 0.3rem;
          background: rgba(24, 24, 28, 0.8);
          border-radius: 0.08rem;
          border: 1px solid #606060;
          color: #ffffff;
          text-align: center;
        }
        span {
          margin: 0 0.1rem;
        }
      }
      .btn {
        width: 0.8rem;
        height: 0.3rem;
        background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
        border-radius: 0.08rem;
        font-size: 0.15 rem;
        font-weight: 400;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 0.1rem;
        &.disabled {
          color: #424242;
          background: #17181b;
          cursor: not-allowed;
        }
      }
    }
  }
}
.boxlist {
  width: calc(100% - 2.5rem);
  padding-left: 0.15rem;
  transition: all 0.3s;
  .title {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-image: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44)) 1 1;
    font-size: 0.15rem;
    font-weight: 600;
    color: #828282;
    > i {
      display: none;
    }
    .input_group {
      display: flex;
      align-items: center;
      width: calc(100% - 2rem);
      height: 0.4rem;
      background: #3f3e3e;
      border-radius: 0.2rem;
      i {
        color: #c1c1c1;
        margin-left: 0.21rem;
        font-size: 0.2rem;
      }
      input {
        width: 100%;
        height: 100%;
        margin-left: 0.11rem;
        font-size: 0.14rem;
        color: #ffffff;
      }
    }
    .el-button {
      width: 1.5rem;
      height: 0.4rem;
      background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
      border-radius: 0.2rem;
    }
  }
  .result {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.15rem;
    font-weight: 600;
    color: #828282;
  }
  .checkedbox {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    margin-bottom: 0.1rem;
    .taglist {
      max-width: calc(100% - 0.8rem);
      height: 100%;
      overflow-x: auto;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      &::-webkit-scrollbar {
        width: 0;
        height: 0;
      }
    }
    .btn {
      width: 0.8rem;
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      span {
        font-size: 0.12rem;
        font-weight: bold;
        cursor: pointer;
      }
    }
  }

  .card_list {
    width: 100%;
    height: 10rem;
    padding-right: 0.05rem;
    overflow-y: auto;
    li {
      float: left;
      width: 2.07rem;
      margin: 0 0.15rem 0.15rem 0;
      background: rgba(0, 0, 0, 0.38);
      border-radius: 0.1rem;
      border: 0.01rem solid #3f3e43;
      backdrop-filter: blur(4px);
      transition: all 0.3s;
      overflow: hidden;
      cursor: pointer;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:hover {
        background: rgba(51, 52, 60, 0.57);
        box-shadow: 0.05rem 0.08rem 0.1rem 0rem rgba(0, 0, 0, 0.5);
      }
      .hero_card {
        .top {
          width: 100%;
          height: auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .box_card {
        .top {
          width: 100%;
          height: auto;
          img {
            width: 70%;
            height: auto;
          }
        }
      }
      .center {
        width: 100%;
        padding-top: 0.05rem;
        div {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 0 0.05rem;
          &:nth-child(1) {
            font-size: 0.12rem;
            font-weight: bold;
            color: #00b1ff;
            img {
              width: 0.24rem;
              height: auto;
              margin-left: 0.1rem;
            }
          }
          &:nth-child(2) {
            justify-content: space-between;
            font-size: 0.12rem;
            font-weight: bold;
          }
          &:nth-child(3) {
            justify-content: flex-end;
            border-bottom: 0.01rem solid #3f3e43;
            font-size: 0.12rem;
            font-weight: 600;
            color: #6c6a71;
          }
        }
      }
      .bottom {
        width: 100%;
        height: 0.36rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #6c6a71;
        .el-button {
          width: 0.6rem;
          height: 0.3rem;
          background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
          border-radius: 0.2rem;
        }
        i {
          font-size: 0.2rem;
          margin-right: 0.09rem;
        }
        span {
          font-size: 0.12rem;
          font-weight: 600;
          margin-right: 0.2rem;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .page {
    width: 100%;
    min-height: calc(100vh - 1rem);
    padding: 0.5rem 0;
  }
  .box {
    width: 100%;
    margin-top: 0.18rem;
    &.hidden {
      .selectionlist {
        display: none;
      }
      .boxlist {
        width: 90%;
        .card_list {
          li {
            width: 1.6rem;
            &:nth-child(4n) {
              margin-right: 0;
            }
            &:nth-child(odd) {
              margin-right: 0.1rem;
            } //奇数行
            &:nth-child(even) {
              margin-right: 0;
            } //偶数行
          }
        }
      }
    }
  }
  .selectionlist {
    display: none;
  }
  .boxlist {
    width: 90%;
    padding-left: 0;
    .title {
      height: 0.35rem;
      line-height: 0.3rem;
      font-size: 0.12rem;
      display: flex;
      i {
        display: block;
        font-size: 0.25rem;
        color: #fff;
      }
      .input_group {
        width: 1.6rem;
        height: 0.26rem;
        margin-left: auto;
        margin-right: 0.08rem;
        i {
          font-size: 0.14rem;
          margin-left: 0.13rem;
        }
        input {
          width: 60%;
          margin-left: 0.1rem;
        }
      }

      .el-button {
        width: 0.6rem;
        height: 0.26rem;
        font-size: 0.14rem;
      }
    }
    .result {
      height: 0.3rem;
      line-height: 0.3rem;
      font-size: 0.12rem;
    }
    .checkedbox {
      margin-bottom: 0.09rem;
      height: 0.22rem;
      .taglist {
        max-width: calc(100% - 0.6rem);
      }
      .btn {
        width: 0.6rem;
      }
    }

    .card_list {
      width: 100%;
      height: 5rem;
      padding-right: 0.05rem;
      li {
        width: 1.6rem;
        margin: 0 0.1rem 0.1rem 0;
        &:nth-child(odd) {
          margin-right: 0.1rem;
        } //奇数行
        &:nth-child(even) {
          margin-right: 0;
        } //偶数行
      }
    }
  }
  .market_drawer {
    .selectionlist {
      display: block;
      width: 100%;
      .list {
        width: 100%;
        .checkbox_title {
          width: 100%;
          font-size: 0.18rem;
          i {
            font-size: 0.2rem;
            margin-right: 0.05rem;
          }
        }
        .checkbox_content {
          width: 100%;
          padding: 0.05rem;
          li {
            padding: 0.05rem;
            .check {
              margin-right: 0.1rem;
            }
          }
        }
        .input_list {
          width: 100%;
          padding: 0.05rem;
          .inputbox {
            input {
              width: 35%;
              height: 0.3rem;
            }
            span {
              margin: 0 0.1rem;
            }
          }
          .btn {
            width: 40%;
            height: 0.3rem;
            font-size: 0.15rem;
            margin-top: 0.05rem;
          }
        }
      }
    }
  }
}
</style>
