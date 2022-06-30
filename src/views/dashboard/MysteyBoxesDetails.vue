<template>
  <div class="box">
    <div class="title">Mystey Boxes Details</div>
    <div class="back_titlebox">
      <i class="iconfont pcfanhui" @click="goBack"></i>
      {{ boxInfo.label }} ({{ boxInfo.list.length }})
    </div>
    <ul class="card_list">
      <li v-for="(item, index) in boxInfo.list" :key="index" @click="selectBox(item)" :class="{ active: item.checked }">
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>Cybergear</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>{{ item.cbId }}busd</span>
              </div>
            </div>
            <div class="row2">
              <div>{{ boxInfo.label + " #" + item.cbId }}</div>
              <div>上次成交{{ item.cbId }}busd</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="btn">
      <el-button :disabled="checkList.length == 0" @click="openBoxes"> {{ "Open" }}({{ checkList.length }}) </el-button>
    </div>
    <el-dialog
      center
      top="0"
      :title="'打开盲盒详情'"
      :visible.sync="isShowPopup"
      @close="closePopup"
      :modal-append-to-body="false"
      :destroy-on-close="true"
    >
      <BlindResultsPopup v-if="isShowPopup" :openedCnIds="openedCnIds"></BlindResultsPopup>
    </el-dialog>
  </div>
</template>

<script>
import { cb, getSigner } from "funtopia-sdk";
import { mapGetters } from "vuex";
import BlindResultsPopup from "@/components/BlindResultsPopup.vue";
export default {
  name: "MysteyBoxesDetails",
  components: { BlindResultsPopup },
  data() {
    return {
      boxList: null,
      boxInfo: null,
      checkList: [],
      openedCnIds: [],
      isShowPopup: false,
    };
  },
  computed: { ...mapGetters(["getWalletAccount"]) },
  watch: {
    getWalletAccount: {
      handler(newVal) {
        if (newVal) history.go(-1);
      },
      // immediate: true, // 页面初始化后立即执行
    },
  },
  created() {
    if (Object.keys(this.$route.query).length > 0 && sessionStorage.getItem("MysteyBoxes")) {
      const id = this.$route.query.id;
      this.boxList = JSON.parse(sessionStorage.getItem("MysteyBoxes"));
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
      this.openedCnIds = cnIds.map((item) => {
        return Number(item);
      });
      this.isShowPopup = true;
      console.log("关闭动画，打开弹窗", Number(amount), this.openedCnIds);
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
      console.log(this.checkList);
      cb()
        .connect(getSigner())
        .openBoxes(this.checkList)
        .then((res) => {
          console.log("播放开盲盒动画", res);
        })
        .catch((err) => {
          console.error("openBoxes", err);
        });
    },
    closePopup() {
      this.checkList.forEach((element) => {
        this.boxInfo.list = this.boxInfo.list.filter((item) => {
          return item.cbId !== element;
        });
      });
      this.boxList.forEach((element) => {
        if (element.boxType == this.boxInfo.boxType) {
          element = this.boxInfo;
          sessionStorage.setItem("MysteyBoxes", JSON.stringify(this.boxList));
        }
      });
      this.isShowPopup = false;
      this.checkList = [];
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
  margin-bottom: 0.2rem;
  i {
    font-size: 0.3rem;
    margin-right: 0.1rem;
  }
}
.back_titlebox {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
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
              text-align: right;
            }
          }
        }
      }
    }
  }
}
.btn {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.3rem;
  .el-button {
    width: 3.6rem;
    height: 0.45rem;
    line-height: 0.45rem;
    font-size: 0.15rem;
    font-weight: 600;
    color: #999999;
  }
}
</style>
