<template>
  <div class="popupbox">
    <ul class="card_list" v-if="newCardList.length > 0">
      <li v-for="(item, index) in newCardList" :key="index">
        <img :src="item.card" alt="" />
        <span>{{ $t(item.name) }}</span>
        <div class="btn" :class="item.rarity">{{ $t("artist.text11") }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { cn } from "funtopia-sdk";
import { shikastudio } from "@/mock/nftworks";
export default {
  name: "BlindResultsPopup",
  props: {
    openedCnIds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      cardList: shikastudio.works,
      newCardList: [],
    };
  },
  created() {
    this.openedCnIds.forEach((element) => {
      this.getHeroId(element);
    });
    console.log(this.newCardList);
  },
  methods: {
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
          const obj = this.cardList.find((item) => item.id == Number(res));
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
.popupbox {
  .card_list {
    max-width: 10rem;
    max-height: 6.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    overflow-y: auto;
    li {
      width: 2rem;
      height: 3rem;
      position: relative;
      margin: 0.1rem;
      font-size: 0.15rem;
      color: #ffffff;
      > img {
        width: 100%;
        height: 100%;
      }
      span {
        font-size: 0.15rem;
        position: absolute;
        left: 10%;
        top: 7%;
      }
      .btn {
        cursor: pointer;
        width: 1.5rem;
        height: 0.3rem;
        font-size: 0.15rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0.3rem;
        margin: auto;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center center;
        transition: all 0.3s;
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
}
</style>
