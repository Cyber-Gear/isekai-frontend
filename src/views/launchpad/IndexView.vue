<template>
  <div class="page">
    <div class="tip_box">{{ $t("message.launchpad.text1") }} {{ $t(nowStatusText) }}</div>
    <div class="box">
      <div class="leftbox">
        <div class="blindbox">
          <img :src="`${$urlImages}blindbox.webp`" alt="" />
        </div>
        <div class="tabs">
          <div :class="{ active: nowCategoryIndex == 0 }" @click="switchCategory(0)">{{ $t("message.launchpad.text2") }}1</div>
          <div :class="{ active: nowCategoryIndex == 1 }" @click="switchCategory(1)">{{ $t("message.launchpad.text2") }}2</div>
        </div>
        <div class="info">
          <div>
            <span>{{ $t("message.launchpad.text3") }}</span>
            <span>{{ categoryArr[nowCategoryIndex].amount }} {{ $t("message.launchpad.text11") }}</span>
          </div>
          <div>
            <span>{{ $t("message.launchpad.text4") }}</span> <span>{{ categoryArr[nowCategoryIndex].price }} U</span>
          </div>
          <div>
            <span>{{ $t("message.launchpad.text5") }}</span>
            <span>{{ categoryArr[nowCategoryIndex].forPurchasing }} {{ $t("message.launchpad.text11") }}</span>
          </div>
        </div>
      </div>
      <div class="rightbox">
        <div class="stepsbox">
          <el-steps :active="nowStatusIndex" align-center>
            <el-step v-for="(item, index) in stepsArr" :key="index" :title="$t(item.title)" :description="item.des">
              <template slot="icon">
                <div @click="changeSteps(item, index)">
                  <img v-if="index < nowStatusIndex" :src="`${$urlImages}progress_img_active.webp`" alt="" />
                  <img v-else :src="`${$urlImages}progress_img_normal.webp`" alt="" />
                </div>
              </template>
            </el-step>
          </el-steps>
        </div>
        <div class="box1">
          <div class="title">
            <div><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ $t("message.launchpad.text6") }}</div>
            <ul>
              <li>{{ $t("message.launchpad.text7") }}</li>
              <li>{{ $t("message.launchpad.text8") }}</li>
              <li>{{ $t("message.launchpad.text9") }}</li>
              <li>{{ $t("message.launchpad.text10") }}</li>
            </ul>
          </div>
          <div class="box2">
            <div class="row">
              <pre>{{ $t("message.launchpad.introduction1") }}</pre>
            </div>
            <div class="row">
              <div class="hasbeenon" v-if="nowStatusIndex == 1">
                <div class="buying">
                  <span>{{ $t("message.launchpad.text12") }}</span>
                </div>
                <div class="times">
                  <div>
                    <p>05</p>
                    <p>{{ $t("message.launchpad.text13") }}</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>05</p>
                    <p>{{ $t("message.launchpad.text14") }}</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>05</p>
                    <p>{{ $t("message.launchpad.text15") }}</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>05</p>
                    <p>{{ $t("message.launchpad.text16") }}</p>
                  </div>
                </div>
              </div>
              <div class="selling" v-if="nowStatusIndex > 1">
                <div class="left">
                  <div>{{ $t("message.launchpad.text17") }}</div>
                  <div class="inputbox" :class="{ disabled: nowStatusIndex == 3 }">
                    <span class="span1">-</span>
                    <input type="number" value="" :disabled="nowStatusIndex == 3" />
                    <span class="span2">+</span>
                  </div>
                  <div>
                    <span>{{ $t("message.launchpad.text18") }} 400U</span><span>0/0</span>
                  </div>
                </div>
                <div class="right">
                  <div class="btn" v-if="nowStatusIndex == 2">{{ $t("message.launchpad.text19") }}</div>
                  <div class="btn disabled" v-if="nowStatusIndex == 3">{{ $t("message.launchpad.text20") }}</div>
                </div>
              </div>
            </div>
            <div class="row">
              <div>{{ $t("message.launchpad.text21") }}</div>
              <div class="progress_bar">
                <div :style="{ width: progressWidth }">{{ progressWidth }}</div>
              </div>
              <div>5,000 / 5,000</div>
            </div>
          </div>
        </div>
        <div class="box1">
          <div class="title">
            <div><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ $t("message.launchpad.text22") }}</div>
          </div>
          <div class="content">
            <pre>{{ $t("message.launchpad.introduction2") }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LAUNCHPAD",
  data() {
    return {
      nowCategoryIndex: 0,
      categoryArr: [
        { amount: 5000, price: 100, forPurchasing: 10 },
        { amount: 500, price: 10, forPurchasing: 5 },
      ],
      nowStatusText: "",
      nowStatusIndex: 0,
      stepsArr: [
        { title: "message.status.text1", des: "2022.12.21 16:20" },
        { title: "message.status.text2", des: "2022.12.21 16:20" },
        { title: "message.status.text3", des: "2022.12.21 16:20" },
      ],
      progressWidth: "0%",
    };
  },
  created() {
    this.nowStatusText = this.stepsArr[0].title;
    this.nowStatusIndex = 1;
    this.nowCategoryIndex = 0;
  },
  methods: {
    changeSteps(item, index) {
      this.nowStatusText = item.title;
      this.nowStatusIndex = index + 1;
      if (this.nowStatusIndex == 1) {
        this.progressWidth = "0%";
      } else if (this.nowStatusIndex == 2) {
        this.progressWidth = "70%";
      } else if (this.nowStatusIndex == 3) {
        this.progressWidth = "100%";
      }
    },
    switchCategory(index) {
      this.nowCategoryIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding-top: 0.8rem;
  padding-bottom: 1rem;
}
.tip_box {
  width: 11.5rem;
  height: 0.75rem;
  line-height: 0.75rem;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  backdrop-filter: blur(0.07rem);
  margin: 0.4rem auto;
  font-size: 0.2rem;
  font-weight: 600;
  color: #969494;
  text-align: center;
}
.box {
  width: 11.5rem;
  margin: 0 auto;
  height: auto;
  display: flex;
  justify-content: space-between;
}
.leftbox {
  width: 4.2rem;
  height: auto;
  .blindbox {
    width: 100%;
    height: 5rem;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 8px;
    border: 1px solid #436e77;
    backdrop-filter: blur(0.07rem);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.4rem;
    img {
      width: 2.3rem;
      height: auto;
    }
  }
  .tabs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    div {
      cursor: pointer;
      width: 1.8rem;
      height: 0.45rem;
      line-height: 0.45rem;
      text-align: center;
      background: rgba(129, 129, 151, 0.19);
      border-radius: 8px;
      border: 1px solid #436e77;
      backdrop-filter: blur(0.07rem);
      font-size: 0.2rem;
      font-weight: 600;
      &.active {
        background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
      }
    }
  }
  .info {
    width: 100%;
    height: 2.4rem;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 8px;
    border: 1px solid #436e77;
    backdrop-filter: blur(0.07rem);
    padding: 0.2rem;
    div {
      width: 100%;
      height: 33%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.2rem;
      font-weight: 600;
      border-bottom: 1px solid;
      border-image: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44)) 1 1;
      &:last-child {
        border: none;
      }
    }
  }
}

.rightbox {
  width: 6.5rem;
  height: auto;
  padding-left: 0.2rem;
  .stepsbox {
    margin-bottom: 0.4rem;
  }
  .box1 {
    width: 100%;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 0.08rem;
    border: 1px solid #436e77;
    backdrop-filter: blur(0.07rem);
    margin-bottom: 0.4rem;
    &:last-child {
      margin-bottom: 0;
    }
    .title {
      background: rgba(0, 0, 0, 0.41);
      border-bottom: 1px solid #436e77;
      backdrop-filter: blur(0.07rem);
      padding: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        font-size: 0.2rem;
        font-weight: 600;
        img {
          width: 0.12rem;
          height: auto;
          margin-right: 0.1rem;
        }
      }
      ul {
        display: flex;
        align-items: center;
        li {
          width: fit-content;
          height: 0.2rem;
          line-height: 0.2rem;
          margin-left: 0.1rem;
          padding: 0 0.05rem;
          background: #535363;
          border-radius: 0.08rem;
          font-size: 0.12rem;
          font-weight: 400;
          text-align: center;
          cursor: pointer;
          &:hover {
            background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
          }
        }
      }
    }
    .box2 {
      width: 100%;
      padding: 0.2rem 0;
      .row {
        font-size: 0.12rem;
        padding: 0 0.5rem;
        &:nth-child(1) {
          font-weight: 400;
        }
        &:nth-child(2) {
          padding: 0;
          height: 1.3rem;
        }
        &:nth-child(3) {
          font-weight: bold;
        }
        .progress_bar {
          width: 100%;
          height: auto;
          background: #17181b;
          border-radius: 0.1rem;
          margin: 0.1rem 0;
          div {
            transition: all 1s;
            text-align: right;
            font-size: 0.1rem;
            font-weight: 600;
            background-image: linear-gradient(to right, rgba(0, 211, 255, 0.5), rgba(176, 108, 198, 1));
            border-radius: 0.1rem;
          }
        }
      }
      .hasbeenon {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .buying {
          width: 2.05rem;
          height: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url($urlImages + "bg8.webp") no-repeat;
          background-size: 100% 100%;
          span {
            font-size: 0.12rem;
            font-weight: bold;
            border-bottom: 1px solid;
            border-image: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44)) 1 1;
          }
        }
        .times {
          width: 3.4rem;
          height: 1.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url($urlImages + "bg9.webp") no-repeat;
          background-size: 100% 100%;
          text-align: center;
          font-weight: bold;
          span {
            font-size: 0.25rem;
            margin: 0 0.1rem;
          }
          p {
            &:nth-child(1) {
              font-size: 0.25rem;
            }
            &:nth-child(2) {
              font-size: 0.12rem;
            }
          }
        }
      }
      .selling {
        width: 100%;
        height: 100%;
        padding: 0 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          div {
            font-size: 0.12rem;
            &:nth-child(1) {
              font-weight: bold;
              position: relative;
              &::before {
                content: "";
                width: 0.02rem;
                height: 100%;
                background: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44));
                position: absolute;
                top: 0;
                left: -0.1rem;
              }
            }
            &:nth-child(3) {
              font-weight: 400;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          }
          .inputbox {
            width: 1.7rem;
            height: 0.3rem;
            margin: 0.1rem 0;
            background: rgba(24, 24, 28, 0.8);
            border-radius: 0.08rem;
            border: 1px solid #606060;
            display: flex;
            align-items: center;
            input {
              width: 100%;
              height: 100%;
              font-size: 0.15rem;
              font-weight: 400;
              color: #ffffff;
              text-align: center;
            }
            &.disabled {
              cursor: not-allowed;
              input,
              .span1,
              .span2 {
                cursor: not-allowed;
              }
            }
            .span1,
            .span2 {
              width: 0.5rem;
              height: 80%;
              font-size: 0.15rem;
              font-weight: 400;
              color: #555557;
              text-align: center;
              border-image: linear-gradient(180deg, rgba(85, 85, 87, 0), rgba(85, 85, 87, 1), rgba(85, 85, 87, 1), rgba(85, 85, 87, 0)) 1 1;
              cursor: pointer;
            }
            .span1 {
              border-right: 1px solid;
            }
            .span2 {
              border-left: 1px solid;
            }
          }
        }
        .right {
          .btn {
            width: 1.2rem;
            height: 0.3rem;
            background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
            border-radius: 0.08rem;
            font-size: 0.2rem;
            font-weight: 400;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &.disabled {
              color: #424242;
              background: #17181b;
              cursor: not-allowed;
            }
          }
        }
      }
    }
    .content {
      width: 100%;
      height: 5rem;
      padding: 0.2rem 0.5rem;
      font-size: 0.12rem;
      font-weight: 600;
      overflow-y: auto;
    }
  }
}
</style>
