<template>
  <div class="box">
    <div class="title">{{ $t("dashboard.text4") }}</div>
    <div class="switch_box">
      <ul class="switch_list">
        <li v-for="(item, index) in switchList" :key="index" :class="{ active: switchIndex == index }" @click="switchTab(index)">
          {{ $t(item.label) }}({{ item.total }})
        </li>
      </ul>
      <div v-show="switchIndex == 1">
        <i class="iconfont pcfuxuankuang-quanxuan"></i>
        <i class="iconfont pcfuxuankuang-weiquanxuan"></i>
        {{ $t("dashboard.text14") }}/{{ $t("dashboard.text15") }}
      </div>
    </div>
    <ul class="card_list" v-if="newCardList.length > 0">
      <li v-for="(item, index) in newCardList" :key="index">
        <div class="card">
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
        </div>
        <div class="cancel_box" v-if="switchIndex == 1">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
    </ul>
    <NoData v-if="newCardList.length == 0"></NoData>
  </div>
</template>

<script>
import { cn } from "funtopia-sdk";
import { mapGetters } from "vuex";
import { shikastudio } from "@/mock/nftworks";
import NoData from "@/components/NoData.vue";
export default {
  components: { NoData },
  name: "NFTAsstet",
  data() {
    return {
      isloading: false,
      switchIndex: 0,
      switchList: [
        { label: "dashboard.text12", total: 0 },
        // { label: "dashboard.text13", total: 0 },
      ],
      cardList: shikastudio.works,
      heroIdList: [],
      newCardList: [],
      requestTimer: null,
    };
  },
  computed: { ...mapGetters(["getWalletAccount"]) },
  watch: {
    getWalletAccount: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) sessionStorage.removeItem("NFTAsstetList");
        if (newVal) this.switchTab(0);
      },
      immediate: true, // 页面初始化后立即执行
    },
  },
  beforeDestroy() {
    clearInterval(this.requestTimer);
    this.requestTimer = null;
  },
  methods: {
    switchTab(index) {
      this.switchIndex = index;
      this.newCardList = [];
      console.log("switchTab");
      if (index == 0) {
        this.switchList[0].total = 0;
        if (sessionStorage.getItem("NFTAsstetList")) {
          this.newCardList = JSON.parse(sessionStorage.getItem("NFTAsstetList"));
          console.log("NFTAsstetList", this.newCardList);
          this.switchList[0].total = this.newCardList.length;
        } else {
          this.tokensOfOwnerBySize();
        }
      } else {
        this.switchList[1].total = 0;
      }
    },
    /**
     * tokensOfOwnerBySize(address user, uint256 cursor, uint256 size)
     * returns(uint256[] cnIds, uint256 cursor)
     * 获取某用户基于指针（从0开始）和数量的英雄ID数组，以及最后一个数据的指针
     * 入参：用户钱包地址，指针，数量
     * 出参：英雄ID数组，最后指针
     */
    tokensOfOwnerBySize() {
      cn()
        .tokensOfOwnerBySize(this.getWalletAccount, 0, 10000)
        .then((res) => {
          // console.log("获取NFTs", res[0], Number(res[1]));
          this.switchList[0].total = res[0].length;
          if (res[0].length > 0) {
            const cnIds = res[0].map((item) => {
              return Number(item);
            });
            this.getHeroList(cnIds);
          }
        })
        .catch((err) => {
          console.error("tokensOfOwnerBySize", err);
        });
    },
    getHeroList(cnIds) {
      cnIds.forEach((element) => {
        this.getHeroId(element);
      });
      this.requestTimer = setInterval(() => {
        if (this.heroIdList.length === cnIds.length) {
          clearInterval(this.requestTimer);
          this.requestTimer = null;
          this.heroIdList.forEach((element) => {
            const obj = this.cardList.find((item) => item.id == element);
            this.newCardList.push(obj);
          });
          console.log(this.newCardList);
          sessionStorage.setItem("NFTAsstetList", JSON.stringify(this.newCardList));
        }
      }, 200);
    },
    /**
     * data(uint256 cnId, string slot)
     * returns(uint256 characterId)
     * 获取某英雄的某单数据字段的数据；查询某英雄的角色的字段名为hero，返回1-15，分别对应15个角色
     * 入参：英雄ID，字段名
     * 出参：角色ID
     */
    getHeroId(cnId) {
      cn()
        .data(cnId, "hero")
        .then((res) => {
          // console.log("获取某英雄的某单数据字段的数据", res, Number(res));
          this.heroIdList.push(Number(res));
        })
        .catch((err) => {
          console.error("data", err);
          clearInterval(this.requestTimer);
          this.requestTimer = null;
        });
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
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.3rem;
  font-weight: bold;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  backdrop-filter: blur(7px);
  padding: 0 0.1rem;
}
.switch_box {
  width: 100%;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ul {
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
.card_list {
  width: 100%;
  height: 8rem;
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
      .card,
      .cancel_box {
        background: rgba(51, 52, 60, 0.57);
        box-shadow: 0.05rem 0.08rem 0.1rem 0rem rgba(0, 0, 0, 0.5);
      }
    }
    .card {
      background: rgba(0, 0, 0, 0.38);
      border-radius: 0.08rem;
      border: 0.01rem solid #3f3e43;
      backdrop-filter: blur(4px);
      transition: all 0.3s;
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
        padding: 0.05rem;
        div {
          display: flex;
          align-items: center;
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
@media screen and (max-width: 750px) {
  .title {
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    border-radius: 0.04rem;
    font-size: 0.12rem;
    font-weight: 600;
    padding: 0 0.2rem;
  }
  .switch_box {
    width: 100%;
    height: 0.4rem;
    ul {
      li {
        height: 0.25rem;
        line-height: 0.25rem;
        padding: 0 0.05rem;
        font-size: 0.12rem;
        font-weight: 600;
        border-radius: 0.04rem;
      }
    }
  }
  .card_list {
    width: 100%;
    height: 5.5rem;
    li {
      width: 1.6rem;
      margin: 0 0.1rem 0.1rem 0;
      &:nth-child(2n) {
        margin-right: 0;
      }
      .card {
        .center {
          padding: 0.05rem;
          div {
            &:nth-child(1) {
              img {
                width: 0.12rem;
                height: auto;
                margin-left: 0.05rem;
              }
            }
          }
        }
      }
      .cancel_box {
        width: 100%;
        height: 0.3rem;
        line-height: 0.3rem;
        padding-left: 0.05rem;
        span {
          font-size: 0.12rem;
          font-weight: 400;
        }
        .el-button {
          width: 0.5rem;
          height: 0.3rem;
          font-size: 0.12rem;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
