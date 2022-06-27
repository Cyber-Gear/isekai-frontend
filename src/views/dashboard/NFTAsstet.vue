<template>
  <div class="box">
    <div class="title">NFT Asstet</div>
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
              <span>88busd</span>
            </div>
            <div>{{ $t("artist.text10") }}77busd</div>
          </div>
          <div class="bottom">
            <i class="iconfont icon-favorites"></i>
          </div>
          <img class="angle2" :src="`${$urlImages}angle2.webp`" alt="" />
        </div>
        <div class="cancel_box" v-if="isShowCheck">
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
      isShowCheck: false,
      switchIndex: 0,
      switchList: [
        { label: "Collection", total: 0 },
        { label: "On sale", total: 0 },
      ],
      cardList: shikastudio.works,
      newCardList: [],
    };
  },
  computed: { ...mapGetters(["getWalletAccount"]) },
  watch: {
    getWalletAccount: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
        if (newVal) this.switchTab(this.switchIndex);
      },
      deep: true, // 深度监听
      immediate: true, // 立即执行  oval 为undefined  newVal 为data中的初始值
    },
  },
  // created() {
  //   this.switchTab(0);
  // },
  methods: {
    switchTab(index) {
      this.switchIndex = index;
      if (index == 0) {
        this.isShowCheck = false;
        this.newCardList = [];
        this.tokensOfOwnerBySize();
      } else {
        this.isShowCheck = true;
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
          // console.log("获取NFTs", res[0], Number(res[1]._hex));
          const cnIds = res[0];
          cnIds.forEach((element) => {
            this.getHeroId(Number(element._hex));
          });
        })
        .catch((err) => {
          console.error("tokensOfOwnerBySize", err);
        });
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
          // console.log("获取某英雄的某单数据字段的数据", res, Number(res._hex));
          const heroId = Number(res._hex);
          const obj = this.cardList.find((item) => item.id == heroId);
          this.newCardList.push(obj);
        })
        .catch((err) => {
          console.error("data", err);
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
      .cancel_box {
        background: rgba(51, 52, 60, 0.57);
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
