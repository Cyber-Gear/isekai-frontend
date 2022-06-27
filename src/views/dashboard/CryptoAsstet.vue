<template>
  <div class="box">
    <div class="title">Crypto Asstet</div>
    <div class="topbox">
      <div>
        Balance
        <i class="iconfont icon-chakan1" v-show="!isShow" @click="isShow = true"></i>
        <i class="iconfont icon-block" v-show="isShow" @click="isShow = false"></i>
      </div>
      <div>{{ isShow ? balanceText : "******" }}</div>
    </div>
    <ul class="card_list">
      <li v-for="(item, index) in cardList" :key="index">
        <ul>
          <li>
            <div><img :src="`${$urlImages}coin_FUN.webp`" alt="" /> FUN</div>
            <div>{{ item.num1 | numberToFixed(12) }}</div>
          </li>
          <li>
            <div></div>
            <div>=${{ item.num2 | numberToFixed(5) }}</div>
          </li>
          <li>
            <div>Available</div>
            <div>Contract</div>
          </li>
          <li>
            <div>{{ isShow ? item.num3 : "******" }}</div>
            <div>{{ item.num4 | ellipsisWallet }}</div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CryptoAsstet",
  data() {
    return {
      isShow: false,
      balanceText: "experienceexp",
      cardList: [
        { num1: 0.000000001777, num2: 0.0000395, num3: 21212, num4: "121212343413312" },
        { num1: 0.000000001777, num2: 0.0000395, num3: 21212, num4: "121212343413312" },
        { num1: 0.000000001777, num2: 0.0000395, num3: 21212, num4: "121212343413312" },
        { num1: 0.000000001777, num2: 0.0000395, num3: 21212, num4: "121212343413312" },
      ],
    };
  },
  methods: {},
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
  i {
    font-size: 0.3rem;
    margin-right: 0.1rem;
  }
}
.topbox {
  width: 100%;
  margin-top: 0.2rem;
  > div {
    height: 0.5rem;
    line-height: 0.5rem;
    &:nth-child(1) {
      display: flex;
      align-items: center;
      font-size: 0.2rem;
      font-weight: bold;
      i {
        font-size: 0.25rem;
        margin-left: 0.2rem;
        cursor: pointer;
      }
    }
    &:nth-child(2) {
      font-size: 0.3rem;
    }
  }
}
.card_list {
  margin-top: 0.2rem;
  > li {
    width: 2.1rem;
    float: left;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 0.09rem;
    border: 0.01rem solid #555555;
    backdrop-filter: blur(7px);
    padding: 0.1rem;
    margin: 0 0.13rem 0.13rem 0;
    &:nth-child(4n) {
      margin-right: 0;
    }
    ul {
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          &:nth-child(1) {
            width: 40%;
          }
          &:nth-child(2) {
            width: 60%;
            text-align: right;
          }
        }
        &:nth-child(1) {
          div {
            &:nth-child(1) {
              font-size: 0.15rem;
              font-weight: bold;
              color: #ffffff;
              display: flex;
              align-items: center;
              img {
                width: 0.21rem;
                height: 0.21rem;
                margin-right: 0.05rem;
              }
            }
            &:nth-child(2) {
              font-size: 0.12rem;
              font-weight: bold;
              color: #ffffff;
            }
          }
        }
        &:nth-child(2) {
          font-size: 0.12rem;
          color: #a7a7a7;
          margin-bottom: 0.1rem;
        }
        &:nth-child(3) {
          font-size: 0.12rem;
          color: #a7a7a7;
        }
        &:nth-child(4) {
          font-size: 0.12rem;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
