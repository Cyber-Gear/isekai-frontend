<template>
  <div class="page">
    <div class="box" :class="{ hidden: !isShowSelectionList }">
      <div class="selectionlist">
        <div class="title">
          <i class="iconfont pcconditions" @click="openSelectionList"></i>
          <i
            class="iconfont pcjiantou_qiehuanzuo"
            @click="closeSelectionList"
          ></i>
        </div>
        <div class="list">
          <el-collapse
            accordion
            v-model="activeName"
            @change="changeSelectionList"
          >
            <el-collapse-item
              v-for="(item, index) in selectionList"
              :key="index"
              :name="index.toString()"
            >
              <template slot="title">
                <div class="checkbox_title">
                  <i :class="item.icon"></i> {{ item.title }}
                </div>
              </template>
              <div class="gradient_border">
                <div>
                  <div class="input_list" v-if="index == 1">
                    <div class="inputbox">
                      <input
                        type="number"
                        placeholder="min"
                        v-model="item.checkboxList[0].min"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="max"
                        v-model="item.checkboxList[0].max"
                      />
                    </div>
                    <div class="btn" @click="clickOK(item.checkboxList[0])">
                      OK
                    </div>
                  </div>
                  <ul class="checkbox_content" v-else>
                    <li
                      v-for="(ite, ind) in item.checkboxList"
                      :key="ind"
                      @click="checkboxClick(ite)"
                    >
                      <div class="check">
                        <i
                          class="iconfont pcfuxuankuang-quanxuan"
                          v-show="ite.isChecked"
                        ></i>
                        <i
                          class="iconfont pcfuxuankuang-weiquanxuan"
                          v-show="!ite.isChecked"
                        ></i>
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
          <i
            class="iconfont pcconditions"
            v-if="!isShowDrawer"
            @click="openDrawer"
          ></i>
          <div class="input_group">
            <i class="iconfont pcsousuo"></i>
            <input type="text" placeholder="搜索" />
          </div>

          <el-button @click="toOrder">SELL</el-button>
        </div>
        <div class="checkedbox_group">
          <div class="result">9，914，463 results</div>
          <div class="checkedbox">
            <div class="taglist">
              <el-tag
                closable
                v-for="(item, index) in tagList"
                :key="index"
                @close="clearTag(item, index)"
              >
                {{ item.label }}
              </el-tag>
            </div>
            <div class="btn" v-show="tagList.length > 0">
              <span @click="clearAllTag">Clear All</span>
            </div>
          </div>
        </div>

        <ul class="card_list">
          <li
            v-for="(item, index) in cardList"
            :key="index"
            @click="toDetail(index)"
          >
            <div class="top"><img :src="item.logo" alt="" /></div>
            <div class="center">
              <div>
                <span>{{ $t(item.name) }}</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>{{ $t(item.title) }}</span>
                <!-- <span>88busd</span> -->
              </div>
              <!-- <div>{{ $t("artist.text10") }}77busd</div> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
    <el-drawer
      :visible.sync="isShowDrawer"
      :with-header="false"
      direction="ltr"
      class="market_drawer"
    >
      <div class="selectionlist">
        <div class="title">
          <i class="iconfont pcconditions"></i>
          <i
            class="iconfont pcjiantou_qiehuanzuo"
            @click="isShowDrawer = false"
          ></i>
        </div>
        <div class="list">
          <el-collapse
            accordion
            v-model="activeName"
            @change="changeSelectionList"
          >
            <el-collapse-item
              v-for="(item, index) in selectionList"
              :key="index"
              :name="index.toString()"
            >
              <template slot="title">
                <div class="checkbox_title">
                  <i :class="item.icon"></i> {{ item.title }}
                </div>
              </template>
              <div class="gradient_border">
                <div>
                  <div class="input_list" v-if="index == 1">
                    <div class="inputbox">
                      <input
                        type="number"
                        placeholder="min"
                        v-model="item.checkboxList[0].min"
                      />
                      <span>-</span>
                      <input
                        type="number"
                        placeholder="max"
                        v-model="item.checkboxList[0].max"
                      />
                    </div>
                    <div class="btn" @click="clickOK(item.checkboxList[0])">
                      OK
                    </div>
                  </div>
                  <ul class="checkbox_content" v-else>
                    <li
                      v-for="(ite, ind) in item.checkboxList"
                      :key="ind"
                      @click="checkboxClick(ite)"
                    >
                      <div class="check">
                        <i
                          class="iconfont pcfuxuankuang-quanxuan"
                          v-show="ite.isChecked"
                        ></i>
                        <i
                          class="iconfont pcfuxuankuang-weiquanxuan"
                          v-show="!ite.isChecked"
                        ></i>
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
import { shikastudio } from "@/mock/nftworks";
export default {
  name: "MARKET",
  data() {
    return {
      activeName: "0",
      selectionList: [
        {
          title: "合集筛选",
          icon: "iconfont pcnav-list",
          checkboxList: [
            { label: "Cybergear", isChecked: false },
            { label: "Puck", isChecked: false },
            { label: "Moonbird", isChecked: false },
          ],
        },
        {
          title: "价格筛选",
          icon: "iconfont pcdollar",
          checkboxList: [{ label: "价格范围", min: 0, max: 0 }],
        },
        {
          title: "币种筛选",
          icon: "iconfont pczijin",
          checkboxList: [
            { label: "FUN", isChecked: false },
            { label: "USDT", isChecked: false },
            { label: "AVAX", isChecked: false },
          ],
        },
        {
          title: "类型筛选",
          icon: "iconfont pcall",
          checkboxList: [
            { label: "盲盒", isChecked: false },
            { label: "角色", isChecked: false },
            { label: "碎片", isChecked: false },
          ],
        },
        {
          title: "稀有度筛选",
          icon: "iconfont pcdengji",
          checkboxList: [
            { label: "MR", isChecked: false },
            { label: "UR", isChecked: false },
            { label: "SR", isChecked: false },
            { label: "R", isChecked: false },
          ],
        },
        {
          title: "属性筛选",
          icon: "iconfont pcshuxingchaxun",
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
      isShowDrawer: false,
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
    toDetail(id) {
      console.log(id);
      this.$router.push({ path: "/market-details", query: { id: id + 1 } });
    },
    toOrder() {
      this.$router.push({ path: "/market-order" });
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
    border-image: linear-gradient(
        135deg,
        rgba(212, 135, 241, 0.44),
        rgba(82, 224, 255, 0.44)
      )
      1 1;
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
        .check {
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
  padding-left: 0.15rem;
  transition: all 0.3s;
  .title {
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid;
    border-image: linear-gradient(
        135deg,
        rgba(212, 135, 241, 0.44),
        rgba(82, 224, 255, 0.44)
      )
      1 1;
    font-size: 0.15rem;
    font-weight: 600;
    color: #828282;
    > i {
      display: none;
    }
    .input_group {
      display: flex;
      align-items: center;
      width: 7.14rem;
      height: 0.4rem;
      background: #3f3e3e;
      border-radius: 0.2rem;
      i {
        color: #c1c1c1;
        margin-left: 0.21rem;
        font-size: 0.2rem;
      }
      input {
        width: 75%;
        height: 100%;
        margin-left: 0.11rem;
        font-size: 0.14rem;
        color: #ffffff;
      }
    }
    .el-button {
      width: 1.4rem;
      height: 0.4rem;
      background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
      border-radius: 0.2rem;
    }
  }
  .checkedbox_group {
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 0.1rem 0 0.15rem 0;
    .result {
      width: 2.43rem;
      height: 0.21rem;
      line-height: 0.21rem;
      font-size: 0.15rem;
      font-weight: 600;
      color: #828282;
    }

    .checkedbox {
      width: 100%;
      height: auto;
      display: flex;
      align-items: center;
      margin-top: 0.09rem;

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
        padding: 0.05rem 0;
        div {
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
            font-size: 0.1rem;
            font-weight: 600;
            color: #6c6a71;
          }
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

    .checkedbox_group {
      flex-direction: row-reverse;
      align-items: center;
      justify-content: flex-end;
      .result {
        width: 1.2rem;
        font-size: 0.12rem;
        margin-left: 0.05rem;
      }
      .checkedbox {
        width: auto;
        margin: 0;
        .taglist {
          max-width: 1.5rem;
        }
        .btn {
          width: 0.6rem;
        }
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
