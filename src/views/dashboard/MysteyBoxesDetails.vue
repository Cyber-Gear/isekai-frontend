<template>
  <div class="box">
    <div class="title">Mystey Boxes Details</div>
    <div class="back_titlebox">
      <i class="iconfont icon-fanhui" @click="goBack"></i>
      Bir Mystery Box ({{ cardList.length }})
    </div>
    <ul class="card_list">
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
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MysteyBoxesDetails",
  data() {
    return {
      cardList: [],
    };
  },
  created() {
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
  },
  methods: {
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
    &:nth-child(4n) {
      margin-right: 0;
    }
    .card {
      width: 100%;
      background: rgba(0, 0, 0, 0.38);
      border: 0.01rem solid #3f3e43;
      backdrop-filter: blur(4px);
      border-radius: 0.08rem;
      .top {
        width: 100%;
        padding: 0.3rem 0;
        text-align: center;
        background: linear-gradient(230deg, rgba(52, 44, 86, 0.5) 0%, rgba(28, 57, 90, 0.8) 45%, rgba(96, 78, 157, 0) 100%);
        border-bottom: 0.01rem solid #3f3e43;
        img {
          width: 70%;
          height: auto;
        }
      }
      .center {
        padding: 0.1rem 0.05rem;
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
