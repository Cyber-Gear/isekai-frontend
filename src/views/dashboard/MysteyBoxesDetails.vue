<template>
  <div class="box">
    <div class="title">{{ $t("dashboard.text27") }}</div>
    <div class="back_titlebox">
      <i class="iconfont pcfanhui" @click="goBack"></i>
      {{ boxInfo.label }} ({{ boxInfo.list.length }})
    </div>
    <ul class="card_list">
      <li v-for="(item, index) in boxInfo.list" :key="index" @click="selectBox(item)" :class="{ active: item.checked }">
        <div class="card">
          <div class="top">
            <LottieAnimation></LottieAnimation>
          </div>
          <div class="center">
            <div class="row1">
              <div>
                <span>Cybergear</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <!-- <span>88busd</span> -->
              </div>
            </div>
            <div class="row2">
              <div>{{ boxInfo.label + " #" + item.cbId }}</div>
              <!-- <div>上次成交88busd</div> -->
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="btn" v-show="checkList.length > 0">
      <el-button type="primary" @click="openBoxes"> {{ $t("dashboard.text28") }} ({{ checkList.length }}) </el-button>
    </div>
    <el-dialog center top="0" :title="$t('dashboard.text19')" :visible.sync="isShowPopup" :modal-append-to-body="false" :destroy-on-close="true">
      <BlindResultsPopup v-if="isShowPopup" :openedCnIds="openedCnIds"></BlindResultsPopup>
    </el-dialog>
  </div>
</template>

<script>
import { cb, getSigner } from "funtopia-sdk";
import { mapGetters } from "vuex";
import BlindResultsPopup from "@/components/BlindResultsPopup.vue";
import LottieAnimation from "@/components/LottieAnimation";
export default {
  name: "MysteyBoxesDetails",
  components: { BlindResultsPopup, LottieAnimation },
  data() {
    return {
      boxList: null,
      boxInfo: null,
      checkList: [],
      openedCnIds: [],
      isShowPopup: false,
      loadingFullScreen: null,
    };
  },
  computed: { ...mapGetters(["getWalletAccount"]) },
  watch: {
    getWalletAccount: {
      handler() {
        history.go(-1);
      },
      // immediate: true, // 页面初始化后立即执行
    },
  },
  created() {
    if (Object.keys(this.$route.query).length > 0 && sessionStorage.getItem("MysteyBoxesList")) {
      const id = this.$route.query.id;
      this.boxList = JSON.parse(sessionStorage.getItem("MysteyBoxesList"));
      this.boxList.forEach((element) => {
        if (element.boxType == id) this.boxInfo = element;
      });
    } else {
      this.goBack();
    }
  },
  mounted() {
    /**
     * event SpawnCns(address user, uint256 amount, uint256[] cnIds)
     * 监听开盲盒结果，获取某用户开出来的英雄的数量和ID数组
     * 用户钱包地址，生成英雄数量，英雄ID数组
     */
    cb().on("SpawnCns", (user, amount, cnIds) => {
      if (this.isShowPopup) return;
      if (this.loadingFullScreen) {
        this.$nextTick(() => {
          this.loadingFullScreen.close(); // 以服务的方式调用的 Loading 需要异步关闭
          this.loadingFullScreen = null;
          this.isShowPopup = true;
          // console.log("关闭动画，打开弹窗", Number(amount), this.openedCnIds);
          this.openedCnIds = cnIds.map((item) => {
            return Number(item);
          });
          this.checkList.forEach((element) => {
            this.boxInfo.list = this.boxInfo.list.filter((item) => {
              return item.cbId !== element;
            });
          });
          this.boxList.forEach((element) => {
            if (element.boxType == this.boxInfo.boxType) {
              element = this.boxInfo;
              this.checkList = [];
              sessionStorage.setItem("MysteyBoxesList", JSON.stringify(this.boxList));
              if (sessionStorage.getItem("NFTAsstetList")) sessionStorage.removeItem("NFTAsstetList");
            }
          });
        });
      }
    });
  },
  methods: {
    selectBox(item) {
      item.checked = !item.checked;
      if (item.checked) {
        this.checkList.push(item.cbId);
      } else {
        const index = this.checkList.findIndex((ele) => ele == item.cbId);
        this.checkList.splice(index, 1);
      }
    },
    /**
     * openBoxes(uint256[] cbIds)
     * 用户开盲盒，传入盲盒ID数组
     * 入参：盲盒ID数组
     */
    openBoxes() {
      cb()
        .connect(getSigner())
        .openBoxes(this.checkList)
        .then((res) => {
          // console.log("播放开盲盒动画", res);
          this.loadingFullScreen = this.$loading({
            target: "#app",
            lock: true, // 禁止页面滚动，必须要挂载在#app上，其他不生效
            text: this.$t("tips.text13"),
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.8)",
          });
        })
        .catch((err) => {
          console.error("openBoxes", err);
        });
    },
    goBack() {
      history.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: auto;
  position: relative;
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
.back_titlebox {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.2rem;
  font-weight: bold;
  i {
    font-size: 0.3rem;
    margin-right: 0.1rem;
    cursor: pointer;
    &:hover {
      color: #53ddfc;
    }
  }
}
.card_list {
  width: 100%;
  height: 6.5rem;
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
      .card {
        background: rgba(51, 52, 60, 0.57);
        box-shadow: 0.05rem 0.08rem 0.1rem 0rem rgba(0, 0, 0, 0.5);
        .top {
          background: radial-gradient(circle, #342c56 0%, #1c395a 33%, rgba(96, 78, 157, 0.72) 100%);
        }
      }
    }
    .card {
      width: 100%;
      padding: 0.1rem 0.1rem 0 0.1rem;
      background: rgba(0, 0, 0, 0.38);
      border-radius: 0.1rem;
      border: 0.01rem solid #3f3e43;
      backdrop-filter: blur(4px);
      transition: all 0.3s;
      .top {
        width: 100%;
        text-align: center;
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
            &:nth-child(1) {
              color: #00b1ff;
              display: flex;
              align-items: center;
              img {
                width: 0.24rem;
                height: auto;
                margin-left: 0.1rem;
              }
            }
          }
        }
        .row2 {
          div {
            font-size: 0.12rem;
            font-weight: bold;
            &:nth-child(2) {
              color: #6c6a71;
              text-align: right;
            }
          }
        }
      }
    }
  }
}
.btn {
  width: fit-content;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  margin: auto;
  .el-button {
    width: 3.5rem;
    height: 0.45rem;
    line-height: 0.45rem;
    font-size: 0.15rem;
    font-weight: 600;
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
  .back_titlebox {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.12rem;
    font-weight: 600;
    i {
      font-size: 0.15rem;
      margin-right: 0.05rem;
    }
  }
  .card_list {
    width: 100%;
    height: 5.5rem;
    li {
      width: 1.6rem;
      margin: 0 0.1rem 0.1rem 0;
      &:nth-child(2n) {
        margin-right: 0;
      }
      .card {
        width: 100%;
        padding: 0.05rem 0.05rem 0 0.05rem;
        border-radius: 0.04rem;
        .top {
          width: 100%;
          border-radius: 0.04rem;
        }
        .center {
          padding: 0.05rem 0;
          .row1 {
            div {
              font-size: 0.12rem;
              font-weight: 400;
              &:nth-child(1) {
                img {
                  width: 0.12rem;
                  height: auto;
                  margin-left: 0.05rem;
                }
              }
            }
          }
          .row2 {
            div {
              font-size: 0.12rem;
              font-weight: 400;
            }
          }
        }
      }
    }
  }
  .btn {
    bottom: 0.1rem;
    .el-button {
      width: 50vw;
      height: 0.35rem;
      line-height: 0.35rem;
    }
  }
}
</style>
