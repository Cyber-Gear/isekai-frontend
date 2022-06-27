<template>
  <div class="box">
    <div class="title">
      <div class="left">Orders</div>
      <div class="right">
        <el-select v-model="selectKey" @change="selectChange">
          <el-option v-for="item in selectOptions" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
        </el-select>
        <el-date-picker v-model="dateTime" type="daterange" range-separator="-" start-placeholder="YYYY-MM-DD" end-placeholder="YYYY-MM-DD">
        </el-date-picker>
      </div>
    </div>
    <ul class="switch_list1">
      <li v-for="(item, index) in switchList1" :key="index" :class="{ active: switchIndex1 == index }" @click="switchTab1(index)">
        {{ item.label }}
      </li>
    </ul>
    <ul class="switch_list2">
      <li v-for="(item, index) in switchList2" :key="index" :class="{ active: switchIndex2 == index }" @click="switchTab2(index)">
        {{ item.label }}
      </li>
    </ul>
    <ul class="card_list" v-if="cardList.length > 0">
      <li v-for="(item, index) in cardList" :key="index">
        <div class="card">
          <div class="top"><img :src="item.logo" alt="" /></div>
          <div class="center">
            <div>
              <span>{{ $t(item.name) }}</span>
              <img :src="`${$urlImages}icon1.webp`" alt="" />
            </div>
            <div>
              <span>{{ $t(item.title) }}</span>
              <span>88busd</span>
            </div>
            <div>{{ $t("artist.text10") }}77busd</div>
          </div>
          <div class="bottom">
            <i class="iconfont icon-favorites"></i>
          </div>
          <img class="angle2" :src="`${$urlImages}angle2.webp`" alt="" />
        </div>
      </li>
    </ul>
    <NoData v-if="cardList.length == 0"></NoData>
  </div>
</template>

<script>
import { shikastudio } from "@/mock/nftworks";
import NoData from "@/components/NoData.vue";
export default {
  components: { NoData },
  name: "Orders",
  data() {
    return {
      selectKey: 1,
      selectOptions: [
        { value: 1, label: "status.text4" },
        { value: 2, label: "status.text5" },
        // { value: 3, label: "status.text6" },
        { value: 3, label: "status.text7" },
        { value: 4, label: "status.text8" },
        { value: 5, label: "status.text9" },
      ],
      dateTime: "",
      switchList1: [{ label: "Purchase History" }, { label: "Sales History" }, { label: "Selling Order" }],
      switchList2: [{ label: "NFTs(Marketplace)" }, { label: "Mastery Boxes" }],
      switchIndex1: 0,
      switchIndex2: 0,
      cardList: [],
    };
  },
  created() {
    this.switchTab1(0);
  },
  methods: {
    selectChange(e) {
      switch (e) {
        case 1:
          break;
        case 2:
          break;
        case 3:
          break;
        case 4:
          break;
        case 5:
          break;
        default:
          break;
      }
    },
    switchTab1(index) {
      this.switchIndex1 = index;
      this.switchTab2(0);
    },
    switchTab2(index) {
      this.switchIndex2 = index;
      this.cardList = [];
      switch (this.switchIndex1) {
        case 0:
          if (this.switchIndex2 == 0) this.cardList = shikastudio.works;
          break;
        case 1:
          if (this.switchIndex2 == 0) this.cardList = shikastudio.works;
          break;
        case 2:
          if (this.switchIndex2 == 0) this.cardList = shikastudio.works;
          break;
        default:
          break;
      }
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
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  backdrop-filter: blur(7px);
  padding: 0 0.1rem;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    font-size: 0.3rem;
    font-weight: bold;
  }
  .right {
    display: flex;
    align-items: center;
    .el-select {
      width: 1.5rem;
      height: 0.35rem;
      line-height: 0.35rem;
      margin-right: 0.1rem;
    }
    .el-date-editor {
    }
  }
}
.switch_list1,
.switch_list2 {
  width: 100%;
  height: 0.5rem;
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
  }
}
.switch_list1 li.active {
  background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
}
.switch_list2 li.active {
  background: rgba(87, 91, 105, 0.79);
}
.card_list {
  width: 100%;
  height: 8rem;
  overflow-y: auto;
  li {
    float: left;
    width: 2.05rem;
    margin: 0 0.15rem 0.15rem 0;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .card {
      border: 1px solid #3f3e43;
      backdrop-filter: blur(0.04rem);
      background: rgba(0, 0, 0, 0.38);
      border-radius: 0.1rem;
      transition: all 0.3s;
      cursor: pointer;
      .top {
        width: 100%;
        height: auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .center {
        width: 100%;
        border-bottom: 1px solid rgba(132, 125, 125, 0.2);
        div {
          display: flex;
          align-items: center;
          padding: 0.05rem;
          font-size: 0.12rem;
          font-weight: bold;
          &:nth-child(1) {
            color: #00b1ff;
            img {
              width: 0.24rem;
              height: auto;
              margin-left: 0.1rem;
            }
          }
          &:nth-child(2) {
            justify-content: space-between;
          }
          &:nth-child(3) {
            justify-content: flex-end;
            font-weight: 600;
            color: #6c6a71;
          }
        }
      }
      .bottom {
        width: 100%;
        padding: 0.05rem 0.2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        i {
          color: #6c6a71;
          font-size: 0.25rem;
        }
      }

      .angle2 {
        width: 0.1rem;
        height: auto;
        position: absolute;
        right: 0.1rem;
        bottom: 0.1rem;
        opacity: 0;
      }
    }
    &:hover,
    &.active {
      .card {
        background: rgba(51, 52, 60, 0.57);
        box-shadow: 5px 8px 10px 0px rgba(0, 0, 0, 0.5);
        .angle2 {
          opacity: 1;
        }
      }
    }
  }
}
</style>
