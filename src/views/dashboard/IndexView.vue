<template>
  <div class="page">
    <div class="box">
      <div class="box_title">
        <img :src="`${$urlImages}box_title1.webp`" alt="" />
        <span>{{ $t("dashboard.text1") }}</span>
      </div>
      <div class="box_content">
        <div class="info">
          <ul>
            <li>Welcome back Zhaochangpeng!</li>
            <li><pre>See you once again, Let's participate in more activities!</pre></li>
            <li>
              <div v-for="(item, index) in tagList" :key="index">#{{ item.label }}</div>
            </li>
          </ul>
          <div class="info2">
            <img src="http://cdn.funtopia.io/funtopia_assets_test/images/Akiha/avatar.webp" alt="" />
            <p @click="$utils.handleCopy(addr)">{{ addr | ellipsisWallet }}</p>
          </div>
          <div class="iconbtn" v-if="!isShowDrawer" @click="openDrawer"><i class="iconfont pccategory"></i></div>
        </div>
        <div class="nftbox">
          <div class="leftbox">
            <div class="list">
              <el-menu class="el-menu-dashboard" :default-active="defaultActive" :default-openeds="defaultOpeneds" active-text-color="#00B5FF" router>
                <el-submenu v-for="(item, index) in menuList" :key="index" :index="item.index">
                  <template slot="title">
                    <i class="iconfont" :class="item.icon"></i>
                    <span>{{ $t(item.label) }}</span>
                  </template>
                  <el-submenu v-for="(item2, index2) in item.children" :key="index2" :index="item2.index">
                    <template slot="title">
                      <i class="iconfont" :class="item2.icon"></i>
                      <span>{{ $t(item2.label) }}</span>
                    </template>
                    <el-menu-item v-for="(item3, index3) in item2.children" :key="index3" :index="item3.index">{{ $t(item3.label) }}</el-menu-item>
                  </el-submenu>
                </el-submenu>
              </el-menu>
            </div>
          </div>
          <div class="rightbox">
            <router-view />
          </div>
        </div>
      </div>
      <el-drawer :visible.sync="isShowDrawer" :with-header="false" class="dashboard_drawer">
        <div class="drawer_box">
          <div class="title">
            <span>Register/Login/Logout</span>
            <span @click="closeDrawer"><i class="iconfont pcguanbi"></i></span>
          </div>
          <div class="box1">
            <img src="http://cdn.funtopia.io/funtopia_assets_test/images/Akiha/avatar.webp" alt="" />
            <div>
              <div class="textbox">
                <span>zhaochangpeng</span>
                <i class="iconfont pcxiugai"></i>
              </div>
              <div class="inputbox">
                <input type="text" value="zhaochangpeng" />
                <i class="iconfont pcgou"></i>
              </div>
            </div>
            <div>
              <div class="textbox">
                <span>bsc ceo, working web3.0</span>
                <i class="iconfont pcxiugai"></i>
              </div>
              <div class="inputbox">
                <input type="text" value="bsc ceo ,working web3.0" />
                <i class="iconfont pcgou"></i>
              </div>
            </div>
          </div>
          <div class="box2">
            <div>{{ $t("dashboard.text11") }}</div>
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
import { token } from "funtopia-sdk";
import { mapGetters } from "vuex";
export default {
  name: "DASHBOARD",
  data() {
    return {
      defaultActive: "",
      defaultOpeneds: ["mynft", "asstet", "history", "favorites"],
      isShowDrawer: false,
      addr: "",
      menuList: [
        {
          index: "mynft",
          icon: "pccategory",
          label: "dashboard.text2",
          children: [
            {
              index: "asstet",
              icon: "pcshequn",
              label: "dashboard.text3",
              children: [
                { index: "nft-asstet", label: "dashboard.text4" },
                { index: "mystey-boxes", label: "dashboard.text5" },
                { index: "crypto-asstet", label: "dashboard.text6" },
              ],
            },
            { index: "history", icon: "pchistory", label: "dashboard.text7", children: [{ index: "orders", label: "dashboard.text8" }] },
            // { index: "favorites", icon: "pcfavorites", label: "dashboard.text9", children: [{ index: "my-favorites", label: "dashboard.text10" }] },
          ],
        },
      ],
      tagList: [{ label: "video favor" }, { label: "singer" }, { label: "cool" }, { label: "artist" }, { label: "love" }],
    };
  },
  computed: { ...mapGetters(["getWalletAccount"]) },
  watch: {
    $route(to) {
      this.initPage(to.path);
    },
    getWalletAccount: {
      handler(newVal) {
        this.initPage(this.$route.path);
        if (newVal) {
          // console.log("获取钱包", newVal);
        }
      },
      immediate: true, // 页面初始化后立即执行
    },
  },

  methods: {
    initPage(path) {
      const str = path.replace("/dashboard/", "");
      this.defaultActive = str == "mystey-boxes-details" ? "mystey-boxes" : str;
      this.addr = token().FUN;
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
  width: 11.5rem;
  margin: 0 auto;
  .box_title {
    margin: 0.5rem 0;
  }
  .box_content {
    width: 100%;
  }
}
.info {
  position: relative;
  width: 100%;
  height: auto;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  border: 0.01rem solid #436e77;
  backdrop-filter: blur(7px);
  padding: 0.1rem 0.2rem;
  margin-top: 0.8rem;
  ul {
    width: 100%;
    li {
      width: 40%;
      margin: 0.1rem 0;
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
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        div {
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
    width: fit-content;
    text-align: center;
    position: absolute;
    top: -1rem;
    left: 0;
    right: 0;
    margin: auto;
    img {
      width: 2rem;
      height: 2rem;
    }
    p {
      cursor: pointer;
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
  width: 100%;
  // min-height: 5rem;
  height: fit-content;
  margin: 0.2rem 0;
  display: flex;
  justify-content: space-between;
  .leftbox {
    width: 2.5rem;
  }
  .rightbox {
    width: calc(100% - 2.5rem);
    padding-left: 0.2rem;
  }
}
.dashboard_drawer {
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
          float: left;
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
}

@media screen and (max-width: 750px) {
  .page {
    width: 100%;
    padding: 0.5rem 0;
  }
  .box {
    width: 90%;
    .box_title {
      margin: 0.2rem 0;
    }
  }
  .info {
    padding: 0.5rem 0.1rem 0.1rem 0.1rem;
    margin-top: 0.5rem;
    ul {
      li {
        width: 100%;
        margin: 0.1rem 0;
        &:nth-child(1) {
          font-size: 0.25rem;
          line-height: 0.32rem;
        }
        &:nth-child(2) {
          font-size: 0.15rem;
          line-height: 0.3rem;
        }
        &:nth-child(3) {
          justify-content: flex-start;
          div {
            height: 0.24rem;
            line-height: 0.24rem;
            font-size: 0.12rem;
            font-weight: 600;
            padding: 0 0.05rem;
            margin-right: 0.05rem;
            &:last-child {
              margin-right: 0;
            }
          }
        }
      }
    }
    .info2 {
      top: -0.4rem;
      img {
        width: 0.8rem;
        height: 0.8rem;
      }
      p {
        font-size: 0.12rem;
        line-height: 0.3rem;
      }
    }
    .iconbtn {
      width: 0.3rem;
      height: 0.3rem;
      line-height: 0.3rem;
      right: 0;
      top: -0.5rem;
      i {
        font-size: 0.25rem;
      }
    }
  }
  .nftbox {
    width: 100%;
    margin: 0.1rem 0;
    flex-wrap: wrap;
    .leftbox {
      width: 100%;
    }
    .rightbox {
      width: 100%;
      padding-left: 0;
      margin-top: 0.1rem;
    }
  }
  .dashboard_drawer {
    .drawer_box {
      padding: 0.8rem 0.2rem;
      .title {
        i {
          font-size: 0.2rem;
        }
      }
      .box1 {
        img {
          width: 1rem;
          height: 1rem;
        }
        > div {
          .textbox,
          .inputbox {
            height: 0.3rem;
            line-height: 0.3rem;
            margin: 0.05rem auto;
            i {
              width: 0.3rem;
              font-size: 0.15rem;
            }
          }
        }
      }
      .box2 {
        > div {
          margin: 0.1rem 0;
        }
        ul {
          li {
            height: 0.24rem;
            line-height: 0.24rem;
            border-radius: 0.04rem;
            padding: 0 0.1rem;
            margin: 0 0.1rem 0.1rem 0;
          }
        }
      }
    }
  }
}
</style>
