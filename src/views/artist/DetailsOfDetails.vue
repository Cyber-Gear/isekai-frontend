<template>
  <div class="page">
    <div class="banner">
      <div class="back_box" @click="goBack">
        <i class="iconfont icon-fanhui"></i>
        <span>返回主页面</span>
      </div>
    </div>
    <div class="content">
      <div class="leftbox">
        <div class="cardbox">
          <img src="../../assets/images/nft.png" alt="" />
        </div>
        <div class="workbox">
          <div class="titlebtn">
            <div>
              <i class="iconfont icon-integral-fill"></i>
              作品介绍
            </div>
            <div><i class="iconfont icon-arrow-up"></i></div>
          </div>
          <div class="text">
            <div>
              Shika Studio was established in May 19, by a group of senior MAG lover, open working atmosphere makes all the team become a higher
              pursuit of …Shika Studio was established in May 19, by a group of senior MAG lover, open working atmosphere makes all the team become a
              higher pursuit of …Shika Studio was established in May 19, by a group of senior MAG lover, open working atmosphere makes all the team
              become a higher pursuit of …
            </div>
          </div>
        </div>
      </div>
      <div class="rightbox">
        <ul class="introbox1">
          <li>Lord</li>
          <li>
            <div><i class="iconfont icon-shuxingchaxun"></i>属性</div>
            Heat
          </li>
          <li>
            <div><i class="iconfont icon-pingfendengjiRating11"></i>等级</div>
            Heat
          </li>
          <li>
            <div><i class="iconfont icon-pingfendengjiRating15"></i>星级</div>
            Heat
          </li>
          <li>
            <div><i class="iconfont icon-dengji"></i>稀有度</div>
            MR
          </li>
        </ul>
        <div class="introbox2">
          <div class="title">人物介绍</div>
          <div class="text">
            <div>
              A high level Executor of the P.T.H. Group and one of the ten Governors who control the Group. A smiling tyrant.She is an extreme control
              freak who speaks calmly and treats people politely. She is a high level Executor of the P.T.H. Group and one of the ten Governors who
              control the Group. She's never exposed her true strength. Her behaviors may seem casual and unpredictable, but she actually plans her
              every move very carefully. A high level Executor of the P.T.H. Group and one of the ten Governors who control the Group. A smiling
              tyrant.She is an extreme control freak who speaks calmly and treats people politely. She is a high level Executor of the P.T.H. Group
              and one of the ten Governors who control the Group. She's never exposed her true strength. Her behaviors may seem casual and
              unpredictable, but she actually plans her every move very carefully. A high level Executor of the P.T.H. Group and one of the ten
              Governors who control the Group. A smiling tyrant.She is an extreme control freak who speaks calmly and treats people politely. She is a
              high level Executor of the P.T.H. Group and one of the ten Governors who control the Group. She's never exposed her true strength. Her
              behaviors may seem casual and unpredictable, but she actually plans her every move very carefully.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsOfDetails",
  data() {
    return {};
  },
  created() {
    if (Object.keys(this.$route.query).length > 0) {
      // console.log(this.$route.query.key);
    }
  },
  methods: {
    goBack() {
      history.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding-top: 0.8rem;
}
.banner {
  width: 100%;
  height: 1rem;
  position: relative;
}
.content {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: url("../../assets/images/bg6.png") no-repeat;
  background-size: 100% auto;
  padding: 0.3rem 0;
}
.leftbox {
  .cardbox {
    width: 3.35rem;
    height: 5.2rem;
    position: relative;
    > img {
      width: 100%;
      height: 100%;
    }
  }
  .workbox {
    width: 3.15rem;
    margin: 0 auto;
    background: #18181c;
    border-radius: 0.04rem;
    border: 1px solid #535151;
    backdrop-filter: blur(0.07rem);
    .titlebtn {
      width: 100%;
      height: 0.6rem;
      background: rgba(129, 129, 151, 0.19);
      backdrop-filter: blur(0.07rem);
      padding: 0 0.1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        display: flex;
        align-items: center;
        font-size: 0.15rem;
        font-weight: 600;
        i {
          font-size: 0.35rem;
        }
      }
    }
    .text {
      width: 100%;
      height: 1.15rem;
      font-size: 0.15rem;
      font-weight: 600;
      color: #81838b;
      padding: 0.1rem;
      div {
        width: 100%;
        height: 100%;
        padding: 0 0.1rem;
        overflow-y: auto;
      }
    }
  }
}
.rightbox {
  width: 7.7rem;
  height: 6.8rem;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.06rem;
  border: 1px solid #535151;
  backdrop-filter: blur(0.07rem);
  padding: 0 0.3rem;
  margin-left: 0.2rem;
  .introbox1 {
    li {
      display: flex;
      align-items: center;
      font-size: 0.12rem;
      font-weight: 600;
      padding: 0.2rem 0;
      &:nth-child(1) {
        font-size: 0.3rem;
        padding: 0.3rem 0;
      }
      i {
        font-size: 0.35rem;
        margin-right: 0.2rem;
      }
      div {
        width: 1.5rem;
        display: flex;
        align-items: center;
      }
    }
  }
  .introbox2 {
    width: 100%;
    height: 2.15rem;
    background: #18181c;
    border-radius: 0.06rem;
    padding: 0.1rem;
    margin-top: 0.5rem;
    .title {
      width: 100%;
      height: 0.3rem;
      padding: 0 0.1rem;
      font-size: 0.15rem;
      font-weight: 600;
    }
    .text {
      width: 100%;
      height: calc(100% - 0.3rem);
      padding: 0 0.1rem;
      font-size: 0.15rem;
      font-weight: bold;
      color: #81838b;
      overflow-y: auto;
    }
  }
}
</style>
