<template>
  <div class="box">
    <div class="title">Mystey Boxes</div>
    <div class="switch_box">
      <ul class="switch_list">
        <li v-for="(item, index) in switchList" :key="index" :class="{ active: switchIndex == index }" @click="switchTab(index)">
          {{ item.label }}({{ item.total }})
        </li>
      </ul>
      <div v-show="isShowCheck">
        <i class="iconfont icon-fuxuankuang-quanxuan"></i>
        <i class="iconfont icon-fuxuankuang-weiquanxuan"></i>
        Select all/Unselect
      </div>
    </div>
    <ul class="box_list" v-if="switchIndex == 0 && cardList.length > 0">
      <li v-for="(item, index) in cardList" :key="index" @click="toDetail(index)">
        <div class="leftbox">
          <img :src="`${$urlImages}blindbox.webp`" alt="" />
        </div>
        <div class="rightbox">
          <div>
            <p>{{ item.label }}</p>
            <p>
              Total: <span>{{ item.total }}</span>
            </p>
          </div>
          <div>View All <i class="iconfont icon-fuxuankuang-quanxuan"></i></div>
        </div>
      </li>
    </ul>
    <ul class="card_list" v-if="switchIndex == 1 && cardList.length > 0">
      <li v-for="(item, index) in cardList" :key="index">
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>{{ item.name1 }}</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>{{ item.num1 }}busd</span>
              </div>
            </div>
            <div class="row2">
              <div>{{ item.name2 }}</div>
              <div>上次成交{{ item.num2 }}busd</div>
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>{{ item.num3 }}BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
    </ul>
    <NoData v-if="cardList.length == 0"></NoData>
  </div>
</template>

<script>
import NoData from "@/components/NoData.vue";
export default {
  components: { NoData },
  name: "MysteyBoxes",
  data() {
    return {
      isShowCheck: false,
      switchIndex: 0,
      switchList: [
        { label: "Collection", total: 0 },
        { label: "On sale", total: 0 },
      ],
      cardList: [],
    };
  },
  created() {
    this.switchTab(0);
  },
  methods: {
    switchTab(index) {
      this.switchIndex = index;
      this.cardList = [];
      if (index == 0) {
        this.isShowCheck = false;
        const arr = [
          { label: "Bir Mystery Box", total: 0, id: 0 },
          { label: "Bir Mystery Box", total: 1, id: 1 },
          { label: "Bir Mystery Box", total: 2, id: 2 },
          { label: "Bir Mystery Box", total: 3, id: 3 },
        ];
        this.cardList = arr;
      } else {
        this.isShowCheck = true;
        const arr = [
          { name1: "aaaaaa", name2: "sss", num1: 88, num2: 88, num3: 90, id: 0 },
          { name1: "aaaaaa", name2: "sss", num1: 88, num2: 88, num3: 90, id: 0 },
          { name1: "aaaaaa", name2: "sss", num1: 88, num2: 88, num3: 90, id: 0 },
          { name1: "aaaaaa", name2: "sss", num1: 88, num2: 88, num3: 90, id: 0 },
          { name1: "aaaaaa", name2: "sss", num1: 88, num2: 88, num3: 90, id: 0 },
          { name1: "aaaaaa", name2: "sss", num1: 88, num2: 88, num3: 90, id: 0 },
          { name1: "aaaaaa", name2: "sss", num1: 88, num2: 88, num3: 90, id: 0 },
          { name1: "aaaaaa", name2: "sss", num1: 88, num2: 88, num3: 90, id: 0 },
          { name1: "aaaaaa", name2: "sss", num1: 88, num2: 88, num3: 90, id: 0 },
        ];
        this.cardList = arr;
      }
    },
    toDetail(id) {
      this.$router.push({ path: "/dashboard/mystey-boxes-details", query: { id: id } });
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
  height: 8rem;
  overflow-y: auto;
  li {
    float: left;
    width: 4.2rem;
    margin: 0 0.2rem 0.2rem 0;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 0.1rem;
    border: 0.01rem solid #555555;
    backdrop-filter: blur(7px);
    padding: 0.2rem 0.1rem;
    display: flex;
    cursor: pointer;
    &:nth-child(2n) {
      margin-right: 0;
    }
    .leftbox {
      width: 50%;
      padding: 0.3rem 0;
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
              color: #ffffff;
            }
            &:nth-child(2) {
              font-size: 0.15rem;
              color: #ffffff;
              span {
                font-weight: bold;
              }
            }
          }
        }
        &:nth-child(2) {
          font-size: 0.12rem;
          color: #ffffff;
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
  overflow-y: auto;
  li {
    float: left;
    width: 2.1rem;
    margin: 0 0.1rem 0.1rem 0;
    &:nth-child(4n) {
      margin-right: 0;
    }
    .card {
      width: 100%;
      padding: 0.1rem;
      background: rgba(0, 0, 0, 0.38);
      border: 0.01rem solid #3f3e43;
      backdrop-filter: blur(4px);
      border-radius: 0.08rem;
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
</style>
