<template>
  <div class="page">
    <div class="banner">
      <div class="back_box" @click="goBack">
        <i class="iconfont pcfanhui"></i>
        <span>{{ $t("btns.text1") }}</span>
      </div>
      <div class="box_title">
        <img :src="`${$urlImages}box_title1.webp`" alt="" />
        <span>{{$t("market.text19")}}</span>
      </div>
    </div>

    <div class="content_box">
      <div class="filter">
        <div class="select">
          <el-select v-model="value" placeholder="all" v-show="true">
          </el-select>
          <el-select v-model="value" placeholder="all" v-show="true">
          </el-select>
          <el-select v-model="value" placeholder="all" v-show="true">
          </el-select>
        </div>
        <div class="selectAll" @click="allCheckHandler">
          <span class="input">
            <i
              class="iconfont pcfuxuankuang-quanxuan"
              v-show="isAllChecked"
            ></i>
            <i
              class="iconfont pcfuxuankuang-weiquanxuan"
              v-show="!isAllChecked"
            ></i>
          </span>
          <span v-show="!isAllChecked">{{$t("market.text20")}}</span>
          <span v-show="isAllChecked">{{$t("market.text27")}}</span>
        </div>
      </div>
      <div class="card_list">
        <div
          class="card"
          v-for="(item, index) in cardList"
          :key="index"
          @click="checkHandler(item)"
        >
          <span class="input">
            <i
              class="iconfont pcfuxuankuang-quanxuan"
              v-show="item.isChecked"
            ></i>
            <i
              class="iconfont pcfuxuankuang-weiquanxuan"
              v-show="!item.isChecked"
            ></i>
          </span>
          <img :src="item.card" alt="" />
          <span>{{ $t(item.name) }}</span>
        </div>
      </div>
      <div class="confirm">
        <el-button @click="openOrder">{{$t("market.text21")}}</el-button>
      </div>
    </div>
    <el-dialog
      center
      top="0"
      :title="$t('orderPopup.text1')"
      :visible.sync="isShowOrder"
      :modal-append-to-body="false"
      :destroy-on-close="true"
    >
      <div class="popupbox">
        <div class="box_body">
          <div class="row">
            <span>{{$t("market.text22")}}</span>
            <div>
              <input
                type="text"
                v-model="fee"
                :placeholder="$t('tips.text14')"
                @input="fee = fee.replace(/[^\d]/g, '')"
              />
              <span>BUSD</span>
            </div>
          </div>
          <div class="row">
            <span>{{$t("market.text23")}}</span>
            <div>
              <input
                type="text"
                v-model="price"
                :placeholder="$t('tips.text14')"
                @input="price = price.replace(/[^\d]/g, '')"
              />
              <span>BUSD</span>
            </div>
          </div>
          <div class="row">
            <span>{{$t("market.text24")}}</span>
            <div>
              <input type="text" disabled />
              <span>BUSD</span>
            </div>
          </div>
          <el-button>{{$t("market.text21")}}</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import PaintingVideo from "@/components/PaintingVideo.vue";
import { shikastudio } from "@/mock/nftworks";
export default {
  name: "MarketOrder",
  // components: { PaintingVideo },
  data() {
    return {
      cardList: null,
      name: null,
      isShowPopup: false,
      isShowOrder: false,
      isAllChecked: false,
      price: null,
      fee: null,
      value: null,
    };
  },
  created() {
    let work = null;
    for (work of shikastudio.works) {
      work.isChecked = false;
    }
    this.cardList = shikastudio.works;
    // console.log(this.cardList);
  },
  methods: {
    openVideo() {
      this.isShowPopup = true;
    },
    allCheckHandler() {
      let item = null;
      this.isAllChecked = !this.isAllChecked;
      for (item of this.cardList) {
        item.isChecked = !item.isChecked;
      }
    },
    checkHandler(item) {
      console.log(item);
      item.isChecked = !item.isChecked;
    },
    openOrder() {
      this.isShowOrder = true;
    },
    goBack() {
      history.go(-1);
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
  margin-bottom: 0.8rem;
  .back_box {
    top: -1rem;
    left: 1.84rem;
  }
  .box_title {
    margin: 1.5rem 0 1.5rem 0.2rem;
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
}

.content_box {
  width: 11.5rem;
  height: 7.8rem;
  //   background-color: grey;
  margin: 0 auto 2rem auto;
  .filter {
    width: 100%;
    height: 0.27rem;
    .select {
      float: left;
      width: 4.2rem;
      display: flex;
      justify-content: space-between;
      .el-select {
        width: 1.2rem;
        height: 0.27rem;
      }
    }
    .selectAll {
      cursor: pointer;
      width: 1.21rem;
      height: 100%;
      float: right;
      font-size: 0.16rem;
      color: #adadb2;
      i {
        font-size: 0.2rem;
        margin-right: 0.05rem;
      }
    }
  }
  .card_list {
    width: 100%;
    height: 7rem;
    overflow-y: auto;
    // background-color: green;
    margin-top: 0.69rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 0.2rem;
    .card {
      cursor: pointer;
      width: 2rem;
      height: 3.12rem;
      position: relative;
      margin-bottom: 0.45rem;
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
    }
  }

  .confirm {
    width: 100%;
    height: 1rem;
    position: relative;
    .el-button {
      font-size: 0.17rem;
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
          width: 2.5rem;
          height: 100%;
          text-align: center;
          font-size: 0.17rem;
          color: #414040;
        }
        span {
          font-size: 0.17rem;
          font-weight: 500;
        }
      }
    }
    .el-button {
      font-weight: 600;
      width: 1.29rem;
      height: 0.53rem;
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
    margin-bottom: 0.42rem;
    .back_box {
      top: -0.3rem;
      left: 0.2rem;
    }
    .box_title {
      margin-top: 0.5rem;
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
  }

  .content_box {
    width: 3.15rem;
    margin-bottom: 0.8rem;
    .filter {
      height: 0.2rem;
      .select {
        width: 2.1rem;
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
        width: 1.46rem;
        height: 2.25rem;
        margin-bottom: 0.15rem;
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