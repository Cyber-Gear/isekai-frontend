<template>
  <div class="page">
    <div class="box">
      <div class="box_title">
        <img :src="`${$urlImages}box_title1.webp`" alt="" />
        <span>{{ $t("message.dashboard.text1") }}</span>
      </div>
      <div class="box_content">
        <div class="info">
          <ul>
            <li>Welcome back Zhaochangpeng!</li>
            <li><pre>See you once again, n\ Let's participate in more activities!</pre></li>
            <li>
              <div v-for="(item, index) in tagList" :key="index">#{{ item.label }}</div>
            </li>
          </ul>
          <div class="info2">
            <img src="http://cdn.funtopia.io/funtopia_assets_test/images/Akiha/avatar.webp" alt="" />
            <p>0x4590.....890345</p>
          </div>
          <div class="iconbtn" v-if="!isShowDrawer" @click="openDrawer"><i class="iconfont icon-category"></i></div>
        </div>
        <div class="nftbox">
          <div class="leftbox">
            <div class="title"><i class="iconfont icon-category"></i>MY NFT</div>
            <div class="list">
              <el-menu class="el-menu-dashboard" :default-active="defaultActive" :default-openeds="defaultOpeneds" active-text-color="#00B5FF" router>
                <el-submenu index="asstet">
                  <template slot="title">
                    <i class="iconfont icon-bussiness-man"></i>
                    <span>Asstet</span>
                  </template>
                  <el-menu-item index="nft-asstet">NFT Asstet</el-menu-item>
                  <el-menu-item index="mystey-boxes">Mystey Boxes</el-menu-item>
                  <el-menu-item index="crypto-asstet">Crypto Asstet</el-menu-item>
                </el-submenu>
                <el-submenu index="history">
                  <template slot="title">
                    <i class="iconfont icon-bussiness-man"></i>
                    <span>History</span>
                  </template>
                  <el-menu-item index="orders">Orders</el-menu-item>
                </el-submenu>
                <el-submenu index="favorites">
                  <template slot="title">
                    <i class="iconfont icon-favorites"></i>
                    <span>Favorites</span>
                  </template>
                  <el-menu-item index="my-favorites">My Favorites</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </div>
          <div class="rightbox">
            <router-view />
          </div>
        </div>
      </div>
      <el-drawer :visible.sync="isShowDrawer" :with-header="false">
        <div class="drawer_box">
          <div class="title">
            <span>Register/Login/Logout</span>
            <span @click="closeDrawer"><i class="iconfont icon-guanbi"></i></span>
          </div>
          <div class="box1">
            <img src="http://cdn.funtopia.io/funtopia_assets_test/images/Akiha/avatar.webp" alt="" />
            <div>
              <div class="textbox">
                <span>zhaochangpeng</span>
                <i class="iconfont icon-fuxuankuang-weiquanxuan"></i>
              </div>
              <div class="inputbox">
                <input type="text" value="zhaochangpeng" />
                <i class="iconfont icon-fuxuankuang-weiquanxuan"></i>
              </div>
            </div>
            <div>
              <div class="textbox">
                <span>bsc ceo ,working web3.0</span>
                <i class="iconfont icon-fuxuankuang-weiquanxuan"></i>
              </div>
              <div class="inputbox">
                <input type="text" value="bsc ceo ,working web3.0" />
                <i class="iconfont icon-fuxuankuang-weiquanxuan"></i>
              </div>
            </div>
          </div>
          <div class="box2">
            <div>标签</div>
            <ul>
              <li v-for="(item, index) in tagList" :key="index">#{{ item.label }}</li>
            </ul>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
export default {
  name: "DASHBOARD",
  data() {
    return {
      defaultActive: "nft-asstet",
      defaultOpeneds: ["asstet", "history", "favorites"],
      isShowDrawer: false,
      tagList: [{ label: "video favor" }, { label: "singer" }, { label: "cool" }, { label: "artist" }, { label: "love" }],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    openDrawer() {
      this.isShowDrawer = true;
    },
    closeDrawer() {
      this.isShowDrawer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding: 0.8rem 0;
  background: url($urlImages + "bg7.webp") no-repeat;
  background-size: 100% 100%;
}
.box {
  .box_title {
    margin: 0.5rem 0;
  }
  .box_content {
    width: fit-content;
    margin: 0 auto;
    padding: 0.5rem 0;
  }
}
.info {
  position: relative;
  width: 11.5rem;
  height: auto;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  border: 0.01rem solid #436e77;
  backdrop-filter: blur(7px);
  padding: 0.1rem 0.3rem;
  ul {
    width: 100%;
    li {
      width: 40%;
      margin: 0.2rem 0;
      &:nth-child(1) {
        font-size: 0.25rem;
        font-weight: bold;
        line-height: 0.5rem;
      }
      &:nth-child(2) {
        font-size: 0.2rem;
        color: #979494;
        line-height: 0.3rem;
      }
      &:nth-child(3) {
        width: 100%;
        text-align: right;
        div {
          display: inline-block;
          width: fit-content;
          height: 0.3rem;
          line-height: 0.3rem;
          font-size: 0.12rem;
          font-weight: 600;
          background: rgba(255, 255, 255, 0.19);
          border-radius: 0.07rem;
          backdrop-filter: blur(7px);
          padding: 0 0.1rem;
          margin-right: 0.1rem;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
  .info2 {
    text-align: center;
    position: absolute;
    top: -35%;
    left: 45%;
    img {
      width: 2rem;
      height: 2rem;
    }
    p {
      font-size: 0.15rem;
      font-weight: bold;
      line-height: 0.5rem;
    }
  }
  .iconbtn {
    width: 0.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    background: rgba(129, 129, 151, 0.11);
    border-radius: 0.04rem;
    backdrop-filter: blur(7px);
    text-align: center;
    cursor: pointer;
    position: absolute;
    right: -0.6rem;
    top: 0;
    i {
      font-size: 0.35rem;
      color: #565454;
    }
  }
}
.nftbox {
  width: 11.5rem;
  min-height: 5rem;
  margin: 0.2rem 0;
  display: flex;
  justify-content: space-between;
  .leftbox {
    width: 3rem;
    .title {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.3rem;
      font-weight: bold;
      margin-bottom: 0.2rem;
      i {
        font-size: 0.3rem;
        margin-right: 0.1rem;
      }
    }
  }
  .rightbox {
    width: calc(100% - 3rem);
    padding-left: 0.5rem;
  }
}
.drawer_box {
  padding: 0.8rem 0.2rem;
  .title {
    font-size: 0.15rem;
    font-weight: bold;
    color: #acacac;
    display: flex;
    align-items: center;
    justify-content: space-between;
    i {
      cursor: pointer;
      font-size: 0.35rem;
    }
  }
  .box1 {
    text-align: center;
    margin: 0.2rem 0;
    img {
      width: 1.55rem;
      height: 1.55rem;
    }
    > div {
      .textbox,
      .inputbox {
        width: fit-content;
        height: 0.35rem;
        line-height: 0.35rem;
        margin: 0.1rem auto;
        color: #ffffff;
        display: flex;
        i {
          cursor: pointer;
          width: 0.3rem;
          font-size: 0.2rem;
        }
      }
      .textbox {
        font-size: 0.15rem;
        font-weight: bold;
      }
      .inputbox {
        background: rgba(24, 24, 28, 0.8);
        border-radius: 0.04rem;
        border: 1px solid #606060;
        input {
          font-size: 0.15rem;
          color: #ffffff;
        }
      }
    }
  }
  .box2 {
    > div {
      font-size: 0.15rem;
      font-weight: 500;
      margin: 0.2rem 0;
    }
    ul {
      li {
        display: inline-block;
        width: fit-content;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.12rem;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.19);
        border-radius: 0.07rem;
        backdrop-filter: blur(7px);
        padding: 0 0.1rem;
        margin: 0 0.1rem 0.1rem 0;
        cursor: pointer;
        &:hover,
        &.active {
          background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
        }
      }
    }
  }
}
</style>
