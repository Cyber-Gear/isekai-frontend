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
            <i class="iconfont pcfuxuankuang-quanxuan" v-show="isChecked"></i>
            <i
              class="iconfont pcfuxuankuang-weiquanxuan"
              v-show="!isChecked"
            ></i>
          </span>
          <span>全部选择</span>
        </div>
      </div>
      <div class="card_list">
        <div class="card" v-for="(item, index) in cardList" :key="index">
          <span class="input" @click="checkHandler">
            <i class="iconfont pcfuxuankuang-quanxuan" v-show="isChecked"></i>
            <i
              class="iconfont pcfuxuankuang-weiquanxuan"
              v-show="!isChecked"
            ></i>
          </span>
          <img :src="item.card" alt="" />
          <span>{{ $t(item.name) }}</span>
          <div class="btn" :class="item.rarity" @click="openVideo">
            {{ $t("artist.text11") }}
          </div>
        </div>
      </div>
      <div class="confirm">
        <el-button>确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { shikastudio } from "@/mock/nftworks";

export default {
  name: "MARKETOrder",
  data() {
    return {
      cardList: null,
      name: null,
      isChecked: true,
    };
  },
  created() {
    this.cardList = shikastudio.works;
  },
  methods: {
    checkHandler() {
      this.isChecked = !this.isChecked;
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
  height: 20rem;
//   background-color: grey;
  margin: 0 auto 2rem auto;
  .filter {
    width: 100%;
    height: 0.6rem;
    .select {
      float: left;
      width: 5.44rem;
      display: flex;
      justify-content: space-between;
      .el-select {
        width: 1.55rem;
        height: 0.3rem;
        border: white solid 2px;
      }
    }
    .selectAll {
      width: 1.21rem;
      height: 100%;
      float: right;
      font-size: 0.2rem;
      color: #adadb2;
      font-weight: 500;
      i {
        font-size: 0.2rem;
        margin-right: 0.05rem;
      }
    }
  }
  .card_list {
    width: 100%;
    height: 15.82rem;
    // background-color: green;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .card {
      width: 2.65rem;
      height: 4.17rem;
      position: relative;
      margin-left: 0.2rem;
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
        left: 0.2rem;
        top: 0.4rem;
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
    height: 1rem;
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
</style>