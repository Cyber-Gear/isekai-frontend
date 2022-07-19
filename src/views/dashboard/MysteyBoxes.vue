<template>
  <div class="box">
    <div class="title">Mystey Boxes</div>
    <div class="switch_box">
      <ul class="switch_list">
        <li v-for="(item, index) in switchList" :key="index" :class="{ active: switchIndex == index }" @click="switchTab(index)">
          {{ $t(item.label) }}({{ item.total }})
        </li>
      </ul>
      <div v-show="switchIndex == 1">
        <i class="iconfont pcfuxuankuang-quanxuan"></i>
        <i class="iconfont pcfuxuankuang-weiquanxuan"></i>
        {{ $t("dashboard.text14") }}/{{ $t("dashboard.text15") }}
      </div>
    </div>
    <ul class="box_list" v-if="switchIndex == 0 && boxList.length > 0">
      <li v-for="(item, index) in boxList" :key="index" @click="toDetail(item)">
        <div class="leftbox">
          <LottieAnimation></LottieAnimation>
        </div>
        <div class="rightbox">
          <div>
            <p>{{ item.label }}</p>
            <p>
              {{ $t("dashboard.text17") }}: <span>{{ item.list.length }}</span>
            </p>
          </div>
          <div>{{ $t("dashboard.text18") }} <i class="iconfont pcfuxuankuang-quanxuan"></i></div>
        </div>
      </li>
    </ul>
    <ul class="card_list" v-if="switchIndex == 1 && cardList.length > 0">
      <li v-for="(item, index) in cardList" :key="index">
        <div class="card">
          <div class="top">
            <LottieAnimation></LottieAnimation>
          </div>
          <div class="center">
            <div class="row1">
              <div>
                <span>{{ item.name1 }}</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <!-- <span>{{ item.num1 }}busd</span> -->
              </div>
            </div>
            <div class="row2">
              <div>{{ item.name2 }}</div>
              <!-- <div>上次成交{{ item.num2 }}busd</div> -->
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>{{ item.num3 }}BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
    </ul>
    <NoData v-if="(switchIndex == 0 && boxList.length == 0) || (switchIndex == 1 && cardList.length == 0)"></NoData>
  </div>
</template>

<script>
import { cb } from "funtopia-sdk";
import { mapGetters } from "vuex";
import NoData from "@/components/NoData.vue";
import LottieAnimation from "@/components/LottieAnimation";
export default {
  components: { NoData, LottieAnimation },
  name: "MysteyBoxes",
  data() {
    return {
      isShowCheck: false,
      switchIndex: 0,
      switchList: [
        { label: "dashboard.text12", total: 0 },
        // { label: "dashboard.text13", total: 0 },
      ],
      idArr: [],
      cardList: [],
      boxList: [],
      requestTimer: null,
    };
  },
  computed: { ...mapGetters(["getWalletAccount"]) },
  watch: {
    getWalletAccount: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) sessionStorage.removeItem("MysteyBoxesList");
        if (newVal) {
          this.switchTab(this.switchIndex);
        }
      },
      immediate: true, // 页面初始化后立即执行
    },
  },
  beforeDestroy() {
    clearTimeout(this.requestTimer);
    this.requestTimer = null;
  },
  methods: {
    switchTab(index) {
      this.switchIndex = index;
      this.boxList = [];
      if (index == 0) {
        this.switchList[0].total = 0;
        if (sessionStorage.getItem("MysteyBoxesList")) {
          this.boxList = JSON.parse(sessionStorage.getItem("MysteyBoxesList"));
          this.boxList.forEach((element) => {
            this.switchList[0].total += element.list.length;
          });
        } else {
          this.tokensOfOwnerBySize();
        }
      } else {
        this.switchList[1].total = 0;
      }
    },
    /**
     * tokensOfOwnerBySize(address user, uint256 cursor, uint256 size)
     * 获取某用户基于指针（从0开始）和数量的盲盒ID数组，以及最后一个数据的指针
     * 入参：用户钱包地址，指针，数量(秒)
     * 出参：盲盒ID数组，最后指针
     */
    tokensOfOwnerBySize() {
      cb()
        .tokensOfOwnerBySize(this.getWalletAccount, 0, 10000)
        .then((res) => {
          // console.log("获取用户已购买的盲盒", res[0], Number(res[1]._hex));
          this.switchList[0].total = res[0].length;
          if (res[0].length > 0) {
            res[0].forEach((element) => {
              this.cbIdToType(Number(element));
            });
            this.restructuring(res[0]);
          }
        })
        .catch((err) => {
          console.error("tokensOfOwnerBySize", err);
        });
    },
    /**筛选类型重组 */
    restructuring(cbIds) {
      this.requestTimer = setInterval(() => {
        if (this.idArr.length === cbIds.length) {
          clearInterval(this.requestTimer);
          this.requestTimer = null;
          this.idArr.sort((a, b) => a.cbId - b.cbId);
          const arr = this.$utils.unique(this.idArr, "boxType"); // 去重
          if (arr.length > 1) arr.sort((a, b) => a.boxType - b.boxType);
          arr.forEach((element) => {
            const list = this.idArr.filter((item) => {
              return item.boxType == element.boxType;
            });
            const obj = { boxType: element.boxType, label: "", list: list, checked: false };
            switch (element.boxType) {
              case 0:
                obj.label = "Bir Mystery Box";
                break;
              default:
                break;
            }
            this.boxList.push(obj);
          });
          sessionStorage.setItem("MysteyBoxesList", JSON.stringify(this.boxList));
        }
      }, 200);
    },
    /**
     * cbIdToType(uint256 cbId)
     * returns(uint256 boxType)
     * 获取某ID的盲盒的类型 入参：盲盒ID 出参：盲盒类型
     */
    cbIdToType(cbId) {
      cb()
        .cbIdToType(cbId)
        .then((res) => {
          // console.log("获取某ID的盲盒的类型", Number(res), Number(res._hex));
          this.idArr.push({ cbId: cbId, boxType: Number(res) });
        })
        .catch((err) => {
          console.error("cbIdToType", err);
          clearInterval(this.requestTimer);
          this.requestTimer = null;
        });
    },
    toDetail(item) {
      if (item.list.length > 0) this.$router.push({ path: "/dashboard/mystey-boxes-details", query: { id: item.boxType } });
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
.switch_box {
  width: 100%;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .switch_list {
    li {
      float: left;
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
.box_list {
  width: 100%;
  li {
    float: left;
    width: 4.27rem;
    margin: 0 0.2rem 0.2rem 0;
    padding: 0.2rem 0.1rem;
    display: flex;
    background: rgba(51, 52, 60, 0.57);
    backdrop-filter: blur(0.04rem);
    border-radius: 0.1rem;
    border: 1px solid #3f3e43;
    transition: all 0.3s;
    cursor: pointer;
    &:nth-child(2n) {
      margin-right: 0;
    }
    .leftbox {
      width: 50%;
      text-align: center;
      background: rgba(0, 0, 0, 0.32);
      border-radius: 0.1rem;
      backdrop-filter: blur(7px);
      img {
        width: 70%;
        height: auto;
      }
    }
    .rightbox {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      div {
        width: 100%;
        margin-left: 0.1rem;
        &:nth-child(1) {
          p {
            &:nth-child(1) {
              font-size: 0.2rem;
              font-weight: bold;
            }
            &:nth-child(2) {
              font-size: 0.2rem;
              margin-top: 0.2rem;
              span {
                font-size: 0.3rem;
                font-weight: bold;
              }
            }
          }
        }
        &:nth-child(2) {
          font-size: 0.12rem;
          text-align: right;
          cursor: pointer;
          i {
            font-size: 0.15rem;
          }
        }
      }
    }
  }
}
.card_list {
  width: 100%;
  height: 8rem;
  padding-right: 0.05rem;
  overflow-y: auto;
  li {
    float: left;
    width: 2.06rem;
    margin: 0 0.15rem 0.15rem 0;
    cursor: pointer;
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:hover,
    &.active {
      .card,
      .cancel_box {
        background: rgba(51, 52, 60, 0.57);
        box-shadow: 0.05rem 0.08rem 0.1rem 0rem rgba(0, 0, 0, 0.5);
      }
    }
    .card {
      width: 100%;
      padding: 0.1rem;
      background: rgba(0, 0, 0, 0.38);
      border-radius: 0.1rem;
      border: 0.01rem solid #3f3e43;
      backdrop-filter: blur(4px);
      transition: all 0.3s;
      .top {
        width: 100%;
        padding: 0.3rem 0;
        text-align: center;
        background: radial-gradient(circle, #342c56 0%, #1c395a 33%, rgba(96, 78, 157, 0.72) 100%);
        border-radius: 0.08rem;
        img {
          width: 70%;
          height: auto;
        }
      }
      .center {
        padding: 0.05rem 0;
        > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .row1 {
          div {
            font-size: 0.12rem;
            font-weight: bold;
            color: #ffffff;
            &:nth-child(1) {
              color: #00b1ff;
              display: flex;
              align-items: center;
            }
          }
        }
        .row2 {
          div {
            font-size: 0.12rem;
            font-weight: bold;
            color: #ffffff;
            &:nth-child(2) {
              color: #6c6a71;
            }
          }
        }
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
      margin-top: 0.05rem;
      padding-left: 0.1rem;
      transition: all 0.3s;
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
  .box_list {
    width: 100%;
    li {
      width: 100%;
      margin: 0 0 0.2rem 0;
      padding: 0.1rem 0.05rem;
      border-radius: 0.04rem;
      .leftbox {
        width: 50%;
        border-radius: 0.04rem;
        img {
          width: 80%;
          height: auto;
        }
      }
      .rightbox {
        div {
          &:nth-child(1) {
            p {
              &:nth-child(1) {
                font-size: 0.15rem;
              }
              &:nth-child(2) {
                font-size: 0.15rem;
                margin-top: 0.1rem;
                span {
                  font-size: 0.25rem;
                }
              }
            }
          }
        }
      }
    }
  }
  .card_list {
    width: 100%;
    height: 8rem;
    padding-right: 0.05rem;
    overflow-y: auto;
    li {
      float: left;
      width: 2.06rem;
      margin: 0 0.15rem 0.15rem 0;
      cursor: pointer;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        .card,
        .cancel_box {
          background: rgba(51, 52, 60, 0.57);
          box-shadow: 0.05rem 0.08rem 0.1rem 0rem rgba(0, 0, 0, 0.5);
        }
      }
      .card {
        width: 100%;
        padding: 0.1rem;
        background: rgba(0, 0, 0, 0.38);
        border-radius: 0.1rem;
        border: 0.01rem solid #3f3e43;
        backdrop-filter: blur(4px);
        transition: all 0.3s;
        .top {
          width: 100%;
          padding: 0.3rem 0;
          text-align: center;
          background: radial-gradient(circle, #342c56 0%, #1c395a 33%, rgba(96, 78, 157, 0.72) 100%);
          border-radius: 0.08rem;
          img {
            width: 70%;
            height: auto;
          }
        }
        .center {
          padding: 0.05rem 0;
          > div {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .row1 {
            div {
              font-size: 0.12rem;
              font-weight: bold;
              color: #ffffff;
              &:nth-child(1) {
                color: #00b1ff;
                display: flex;
                align-items: center;
              }
            }
          }
          .row2 {
            div {
              font-size: 0.12rem;
              font-weight: bold;
              color: #ffffff;
              &:nth-child(2) {
                color: #6c6a71;
              }
            }
          }
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
        margin-top: 0.05rem;
        padding-left: 0.1rem;
        transition: all 0.3s;
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
}
</style>
