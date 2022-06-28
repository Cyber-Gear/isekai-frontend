<template>
  <div class="box">
    <div class="title">Mystey Boxes Details</div>
    <div class="back_titlebox">
      <i class="iconfont icon-fanhui" @click="goBack"></i>
      {{ blindBoxSeries.label }} ({{ blindBoxSeries.list.length }})
    </div>
    <ul class="card_list">
      <li v-for="(item, index) in blindBoxSeries.list" :key="index" @click="openBoxes(item)">
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>{{ item.cbId }}</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>{{ item.cbId }}busd</span>
              </div>
            </div>
            <div class="row2">
              <div>{{ item.cbId }}</div>
              <div>上次成交{{ item.cbId }}busd</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { cb, getSigner } from "funtopia-sdk";
import { mapGetters } from "vuex";
export default {
  name: "MysteyBoxesDetails",
  data() {
    return {
      blindBoxSeries: null,
      cardList: [],
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
    if (Object.keys(this.$route.query).length > 0) {
      const id = this.$route.query.id;
      const arr = JSON.parse(sessionStorage.getItem("blindBoxSeries"));
      arr.forEach((element) => {
        if (element.boxType == id) {
          this.blindBoxSeries = element;
        }
      });
    }
  },
  methods: {
    /**
     * openBoxes(uint256[] cbIds)
     * 用户开盲盒，传入盲盒ID数组
     * 入参：盲盒ID数组
     */
    openBoxes(item) {
      cb()
        .connect(getSigner())
        .openBoxes([item.cbId])
        .then((res) => {
          console.log("开盲盒", res);
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
  height: 8rem;
  overflow-y: auto;
  li {
    float: left;
    width: 2.1rem;
    margin: 0 0.1rem 0.1rem 0;
    cursor: pointer;
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:hover,
    &.active {
      .card {
        background: rgba(51, 52, 60, 0.57);
      }
    }
    .card {
      width: 100%;
      padding: 0.1rem;
      background: rgba(0, 0, 0, 0.38);
      backdrop-filter: blur(0.04rem);
      border-radius: 0.1rem;
      border: 1px solid #3f3e43;
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
            }
          }
        }
      }
    }
  }
}
</style>
