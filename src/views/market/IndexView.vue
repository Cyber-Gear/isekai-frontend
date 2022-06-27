<template>
  <div class="page">
    <div class="box" :class="{ hidden: !isShowSelectionList }">
      <div class="selectionlist">
        <div class="title">
          <i class="iconfont icon-conditions" @click="openSelectionList"></i>
          <i class="iconfont icon-jiantou_qiehuanzuo" @click="closeSelectionList"></i>
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
                      <div class="input">
                        <i class="iconfont icon-fuxuankuang-quanxuan" v-show="ite.isChecked"></i>
                        <i class="iconfont icon-fuxuankuang-weiquanxuan" v-show="!ite.isChecked"></i>
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
        <div class="title">9，914，463 results</div>
        <div class="checkedbox">
          <div class="taglist">
            <el-tag closable v-for="(item, index) in tagList" :key="index" @close="clearTag(item, index)"> {{ item.label }} </el-tag>
          </div>
          <div class="btn" v-show="tagList.length > 0"><span @click="clearAllTag">Clear All</span></div>
        </div>
        <ul class="card_list">
          <li v-for="(item, index) in cardList" :key="index" @click="toDetail(index)">
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
              <!-- <i class="iconfont icon-favorites-fill"></i>
              <span>3</span> -->
            </div>
            <img class="angle2" :src="`${$urlImages}angle2.webp`" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { shikastudio } from "@/mock/nftworks";
export default {
  name: "MARKET",
  data() {
    return {
      activeName: "0",
      selectionList: [
        {
          title: "合集筛选",
          icon: "iconfont icon-nav-list",
          checkboxList: [
            { label: "Cybergear", isChecked: false },
            { label: "Puck", isChecked: false },
            { label: "Moonbird", isChecked: false },
          ],
        },
        {
          title: "价格筛选",
          icon: "iconfont icon-dollar",
          checkboxList: [{ label: "价格范围", min: 0, max: 0 }],
        },
        {
          title: "币种筛选",
          icon: "iconfont icon-zijin",
          checkboxList: [
            { label: "FUN", isChecked: false },
            { label: "USDT", isChecked: false },
            { label: "AVAX", isChecked: false },
          ],
        },
        {
          title: "类型筛选",
          icon: "iconfont icon-all",
          checkboxList: [
            { label: "盲盒", isChecked: false },
            { label: "角色", isChecked: false },
            { label: "碎片", isChecked: false },
          ],
        },
        {
          title: "稀有度筛选",
          icon: "iconfont icon-dengji",
          checkboxList: [
            { label: "MR", isChecked: false },
            { label: "UR", isChecked: false },
            { label: "SR", isChecked: false },
            { label: "R", isChecked: false },
          ],
        },
        {
          title: "属性筛选",
          icon: "iconfont icon-shuxingchaxun",
          checkboxList: [
            { label: "职业", isChecked: false },
            { label: "等级", isChecked: false },
            { label: "角色", isChecked: false },
          ],
        },
      ],
      cardList: [],
      tagList: [],
      isShowSelectionList: true,
    };
  },

  created() {
    this.cardList = shikastudio.works;
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
      // console.log(item);
      // this.tagList.push(ite);
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
    toDetail(index) {
      console.log(index);
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
          margin: 0 0.2rem 0.2rem 0;
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
    height: 0.9rem;
    line-height: 0.9rem;
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
      display: flex;
      flex-wrap: wrap;
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
        .input {
          margin-right: 0.2rem;
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
        font-size: 0.2rem;
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
  padding-left: 0.2rem;
  transition: all 0.3s;
  .title {
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    border-bottom: 1px solid;
    border-image: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44)) 1 1;
    font-size: 0.15rem;
    font-weight: 600;
    color: #828282;
  }
  .checkedbox {
    width: 100%;
    height: 0.9rem;
    line-height: 0.9rem;
    display: flex;
    align-items: center;
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
      height: 100%;
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
    overflow-y: auto;
    li {
      float: left;
      width: 2rem;
      margin: 0 0.2rem 0.2rem 0;
      border: 1px solid #3f3e43;
      backdrop-filter: blur(0.04rem);
      background: rgba(0, 0, 0, 0.38);
      border-radius: 0.1rem;
      transition: all 0.3s;
      overflow: hidden;
      cursor: pointer;
      &:nth-child(4n) {
        margin-right: 0;
      }
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
          padding: 0 0.05rem;
          &:nth-child(1) {
            font-size: 0.12rem;
            font-weight: bold;
            color: #00b1ff;
            padding: 0.05rem;
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
            font-size: 0.1rem;
            font-weight: 600;
            color: #6c6a71;
          }
        }
      }
      .bottom {
        width: 100%;
        height: 0.35rem;
        padding: 0 0.2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: 0.1rem;
        font-weight: 600;
        color: #6c6a71;
        i {
          font-size: 0.25rem;
          margin-right: 0.1rem;
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
      &:hover {
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
