<template>
  <div class="page">
    <div class="banner">
      <div class="back_box" @click="goBack">
        <i class="iconfont pcfanhui"></i>
        <span>{{ $t("btns.text1") }}</span>
      </div>
      <div class="box_title">
        <img :src="`${$urlImages}box_title1.webp`" alt="" />
        <span>挂单</span>
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
        <div class="selectAll">
          <span class="input" @click="checkHandler">
            <i
              class="iconfont pcfuxuankuang-quanxuan"
              v-show="isAllChecked"
            ></i>
            <i
              class="iconfont pcfuxuankuang-weiquanxuan"
              v-show="!isAllChecked"
            ></i>
          </span>
          <span>全部选择</span>
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
          <div class="btn" :class="item.rarity" @click="openVideo">
            {{ $t("artist.text11") }}
          </div>
          <el-dialog
            center
            top="0"
            :title="$t(item.name)"
            :visible.sync="isShowPopup"
            :modal-append-to-body="false"
            :destroy-on-close="true"
          >
            <PaintingVideo :videoUrl="item.video"></PaintingVideo>
          </el-dialog>
        </div>
      </div>
      <div class="confirm">
        <el-button @click="openOrder">确定</el-button>
      </div>
    </div>
    <!-- <el-dialog center top="0" :title="$t(card.name)" :visible.sync="isShowPopup" :modal-append-to-body="false" :destroy-on-close="true">
      <PaintingVideo :videoUrl="card.video"></PaintingVideo>
    </el-dialog> -->
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
            <span>挂单价格</span>
            <div>
              <input type="text" placeholder="请输入价格" />
              <span>BUSD</span>
            </div>
          </div>
          <div class="row">
            <span>手续费</span>
            <div>
              <input type="text" placeholder="请输入价格" />
              <span>BUSD</span>
            </div>
          </div>
          <div class="row">
            <span>实际收益</span>
            <div>
              <input type="text" disabled />
              <span>BUSD</span>
            </div>
          </div>
          <el-button>确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PaintingVideo from "@/components/PaintingVideo.vue";

import { shikastudio } from "@/mock/nftworks";

export default {
  name: "MARKETOrder",
  components: { PaintingVideo },
  data() {
    return {
      cardList: null,
      name: null,
      isShowPopup: false,
      isShowOrder: true,
      isAllChecked: false,
    };
  },
  created() {
    let work = null;
    for(work of shikastudio.works){
      work.isChecked = false;
    }
    this.cardList = shikastudio.works;
    // console.log(this.cardList);
  },
  methods: {
    openVideo() {
      this.isShowPopup = true;
    },
    checkHandler() {
      console.log(this.isAllChecked);
      this.isAllChecked = !this.isAllChecked;
      // console.log(item);
      // item.isChecked = !item.isChecked;
      // console.log(this.cardList);
    },
    openOrder() {
      console.log(111);
      this.isShowOrder = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding-top: 0.8rem;
}
.banner {
  width: 100%;
  height: 1rem;
  position: relative;
  margin-bottom: 1rem;
  .back_box {
    top: -1rem;
    left: 1.84rem;
  }
  .box_title {
    margin: 1.5rem 0 1.5rem 0.2rem;
    span {
      font-size: 0.45rem;
      font-weight: 500;
      margin-left: 0.01rem;
      margin-bottom: 0.03rem;
      &::before {
        top: 0.44rem;
        left: 0.18rem;
        background-size: 110%;
      }
    }
    img {
      width: 3.75rem;
    }
  }
}

.content_box {
  width: 15.37rem;
  height: 11.5rem;
  //   background-color: grey;
  margin: 0 auto 2rem auto;
  .filter {
    width: 100%;
    height: 0.6rem;
    .select {
      float: left;
      width: 5.8rem;
      display: flex;
      justify-content: space-between;
      .el-select {
        width: 1.7rem;
        height: 0.38rem;
        border: 2px solid;
        border-image: linear-gradient(to left, #366371, #5f466e) 1;
        > .el-input > .el-input__inner {
          border-radius: 0.2rem !important;
        }
      }
    }
    .selectAll {
      cursor: pointer;
      width: 1.21rem;
      height: 100%;
      float: right;
      font-size: 0.2rem;
      color: #adadb2;
      font-weight: 600;
      i {
        font-size: 0.2rem;
        margin-right: 0.05rem;
      }
    }
  }
  .card_list {
    width: 100%;
    height: 9rem;
    overflow-y: auto;
    // background-color: green;
    margin-top: 0.75rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 0.2rem;
    .card {
      cursor: pointer;
      width: 2.8rem;
      height: 4.3rem;
      position: relative;
      margin-bottom: 0.45rem;
      .input {
        position: absolute;
        top: 2%;
        left: -8%;
        i {
          font-size: 0.2rem;
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
        font-size: 0.15rem;
        position: absolute;
        left: 0.3rem;
        top: 0.33rem;
      }
      .btn {
        cursor: pointer;
        width: 1.8rem;
        height: 0.4rem;
        font-size: 0.15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0.4rem;
        margin: auto;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        transition: all 0.3s;
        &:hover {
          transform: scale(0.8);
        }
        &.MR {
          background-image: url($urlImages + "ShikaStudio/btn-MR.webp");
        }
        &.R {
          background-image: url($urlImages + "ShikaStudio/btn-R.webp");
        }
        &.SR {
          background-image: url($urlImages + "ShikaStudio/btn-SR.webp");
        }
        &.UR {
          background-image: url($urlImages + "ShikaStudio/btn-UR.webp");
        }
      }
    }
  }

  .confirm {
    width: 100%;
    height: 1.2rem;
    position: relative;
    .el-button {
      font-size: 0.17rem;
      font-weight: 600;
      width: 1.29rem;
      height: 0.53rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, 0);
      background-image: linear-gradient(to right, #366371, #5f466e);
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
    .el-button{
            font-weight: 600;
      width: 1.29rem;
      height: 0.53rem;
      margin: 0 auto;
      background-image: linear-gradient(to right, #366371, #5f466e);
      color: #d5dbe1;
    }
  }
}
</style>