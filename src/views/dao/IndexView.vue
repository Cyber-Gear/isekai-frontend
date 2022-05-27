<template>
  <div class="page">
    <div class="bgbox">
      <img class="absolute1" src="../../assets/images/bg2.png" alt="" />
      <img class="absolute2" src="../../assets/images/bg3.png" alt="" />
    </div>
    <div class="box">
      <div class="leftbox">
        <div class="avatar">
          <img src="../../assets/images/logo1.png" alt="" />
        </div>
        <div class="linkbox">
          <div><i class="iconfont icon-telegram"></i></div>
          <div><i class="iconfont icon-tuite"></i></div>
          <div><i class="iconfont icon-discord"></i></div>
          <div><i class="iconfont icon-medium"></i></div>
        </div>
        <div class="lis">
          <div><i class="iconfont icon-zhili"></i>治理数</div>
          <div>123</div>
        </div>
        <div class="lis">
          <div><i class="iconfont icon-Customermanagement-fill"></i>成员数</div>
          <div>123</div>
        </div>
        <div class="btn">发起提案</div>
      </div>
      <ul class="rightbox">
        <li>
          <ul>
            <li>
              <div>当前提案由<span>Oxlk325kl3j32...04569s</span>发起</div>
              <div class="status">进行中</div>
            </li>
            <li>推选第一款上架Launchpad的项目 <img src="../../assets/images/box_title3.png" alt="" /></li>
            <li><pre>本期竞选的项目有3个，来自shika studio、metalulu、cryptopuck等</pre></li>
            <li>
              <div>还剩5天</div>
              <div class="btn" @click="toDetail(1)">参与治理</div>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              <div>当前提案由<span>Oxlk325kl3j32...04569s</span>发起</div>
              <div class="status">已完成</div>
            </li>
            <li>Aqueen <img src="../../assets/images/box_title3.png" alt="" /></li>
            <li>
              <pre>{{ `The fund will provide investors access to buy the newest miners. \n The fund will be distributed into 3 stages.` }}</pre>
            </li>
            <li>
              <div><span>✔ 通过提案</span><span>200人支持</span></div>
              <div class="btn">参与治理</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "DAO",
  data() {
    return {};
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: "dao-details", query: { id: id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding-top: 0.8rem;
  overflow: hidden;
}
.bgbox {
  width: 100%;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
  }
  .absolute1 {
    top: 0;
  }
  .absolute2 {
    top: 5rem;
  }
}
.box {
  width: fit-content;
  margin: 1rem auto;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  border: 1px solid #535151;
  backdrop-filter: blur(0.07rem);
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0.2rem;
}
.leftbox {
  width: 3rem;
  height: 4.5rem;
  background: rgba(24, 24, 28, 0.8);
  border-radius: 0.06rem;
  position: relative;
  padding: 0.8rem 0.3rem;
  .avatar {
    width: 1.2rem;
    height: 1.2rem;
    padding: 0.1rem;
    border-radius: 50%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -0.5rem;
    left: 0;
    right: 0;
    margin: auto;
    img {
      width: 100%;
      height: auto;
    }
  }
  .linkbox {
    width: fit-content;
    margin: 0.2rem auto;
    display: flex;
    align-items: center;
    border-radius: 0.15rem;
    overflow: hidden;
    > div {
      cursor: pointer;
      width: 0.55rem;
      height: 0.35rem;
      background: rgba(255, 255, 255, 0.21);
      backdrop-filter: blur(0.06rem);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.22rem;
      margin-right: 0.02rem;
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
        box-shadow: 0px 0px 8px 4px #000000;
      }
    }
  }
  .lis {
    width: 100%;
    padding: 0.2rem;
    border-bottom: 1px solid;
    border-image: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44)) 1 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.15rem;
      font-weight: 300;
      i {
        font-size: 0.35rem;
        margin-right: 0.1rem;
      }
    }
  }
  .btn {
    width: 100%;
    height: auto;
    margin: 0.2rem auto;
    background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
    border-radius: 0.04rem;
    font-size: 0.15rem;
    font-weight: 300;
    text-align: center;
    padding: 0.2rem 0;
    cursor: pointer;
  }
}
.rightbox {
  width: 7rem;
  max-height: 8rem;
  padding: 0 0.1rem;
  overflow-y: auto;
  > li {
    width: 100%;
    background: rgba(24, 24, 28, 0.8);
    border-radius: 0.06rem;
    border: 1px solid #4e4e52;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem 0 0.4rem;
    ul {
      li {
        margin: 0.2rem 0;
        &:nth-child(1) {
          font-size: 0.15rem;
          font-weight: 300;
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            display: inline-block;
            background: #000000;
            border-radius: 0.1rem;
            margin: 0 0.2rem;
            padding: 0 0.5rem;
          }
          .status {
            font-size: 0.12rem;
            font-weight: 600;
            color: #00b2fe;
          }
        }
        &:nth-child(2) {
          font-size: 0.2rem;
          font-weight: 600;
          position: relative;
          img {
            width: 0.12rem;
            height: auto;
            position: absolute;
            left: -0.25rem;
            top: 0.08rem;
          }
        }
        &:nth-child(3) {
          font-size: 0.15rem;
          font-weight: 300;
        }
        &:nth-child(4) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.12rem;
          font-weight: 600;
          color: #00b2fe;
          span {
            margin-right: 0.1rem;
          }
          .btn {
            color: #ffffff;
            background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
            border-radius: 0.07rem;
            padding: 0.1rem 0.2rem;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
