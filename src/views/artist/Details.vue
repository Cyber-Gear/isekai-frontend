<template>
  <div class="page">
    <div class="banner">
      <img src="../../assets/images/artist_banner.webp" alt="" />
      <div class="back_box" @click="goBack">
        <i class="iconfont icon-fanhui"></i>
        <span>{{ $t("message.btns.text1") }}</span>
      </div>
    </div>
    <div class="content">
      <div class="avatar">
        <div><img src="../../assets/images/logo1.webp" alt="" /></div>
      </div>
      <div class="box1">
        <div class="linkbox">
          <div><i class="iconfont icon-telegram"></i></div>
          <div><i class="iconfont icon-tuite"></i></div>
          <div><i class="iconfont icon-discord"></i></div>
          <div><i class="iconfont icon-medium"></i></div>
        </div>
      </div>
      <div class="box2">
        <ul>
          <li>{{ $t(detail.title) }}</li>
          <li>
            <i class="iconfont icon-assessed-badge"></i>
            <i class="iconfont icon-gouxuan"></i>
            <i class="iconfont icon-assessed-badge"></i>
          </li>
          <li>
            <div>
              <div><span>10.0k</span></div>
              <div>{{ $t("message.artist.items[0]") }}</div>
            </div>
            <div>
              <div><span>10.0k</span></div>
              <div>{{ $t("message.artist.items[1]") }}</div>
            </div>
            <div>
              <div><img src="../../assets/images/logo_ETH.webp" alt="" />10.0k</div>
              <div>{{ $t("message.artist.items[2]") }}</div>
            </div>
            <div>
              <div><img src="../../assets/images/logo_ETH.webp" alt="" />10.0k</div>
              <div>{{ $t("message.artist.items[3]") }}</div>
            </div>
          </li>
          <li :class="{ hidden: !isShowIntroduce }">
            <pre>{{ $t(detail.des) }}</pre>
          </li>
          <li @click="isShowIntroduce = !isShowIntroduce" :class="{ active: isShowIntroduce }">
            <i class="iconfont icon-arrow-up"></i>
          </li>
        </ul>
      </div>
      <div class="box3">
        <ul class="card_list">
          <li v-for="(item, index) in cardList" :key="index" @click="toDetail(index)">
            <div class="top"><img :src="item.logo" alt="" /></div>
            <div class="center">
              <div>
                <span>{{ $t(item.name) }}</span>
                <img src="../../assets/images/icon1.webp" alt="" />
              </div>
              <div>
                <span>{{ $t(detail.title) }}</span>
                <span>88busd</span>
              </div>
              <div>{{ $t("message.artist.text10") }}77busd</div>
            </div>
            <div class="bottom">
              <i class="iconfont icon-favorites"></i>
              <!-- <i class="iconfont icon-favorites-fill"></i>
              <span>3</span> -->
            </div>
            <img class="angle2" src="../../assets/images/angle2.webp" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { nftworks } from "./nftworks";
export default {
  name: "ARTISTDetails",
  data() {
    return {
      detail: null,
      cardList: [],
      isShowIntroduce: false,
    };
  },
  created() {
    if (Object.keys(this.$route.query).length > 0) {
      nftworks.forEach((element) => {
        if (element.id === this.$route.query.id) {
          this.detail = element;
          this.cardList = element.works;
        }
      });
    }
  },
  methods: {
    goBack() {
      history.go(-1);
    },
    toDetail(index) {
      switch (this.$route.query.id) {
        // case "zw":
        //   this.$router.push({ path: "artist-details-zw", query: { id: index } });
        //   break;
        // case "akiha":
        //   this.$router.push({ path: "artist-details-akiha", query: { id: index } });
        //   break;
        // case "negoro":
        //   this.$router.push({ path: "artist-details-negoro", query: { id: index } });
        //   break;
        case "shikastudio":
          this.$router.push({ path: "artist-details-shikastudio", query: { id: index } });
          break;
        default:
          this.$message({ message: this.$t("message.message.text1") });
          break;
      }
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
  height: 2.2rem;
  position: relative;
  > img {
    width: 100%;
    height: 100%;
  }
}
.content {
  width: 100%;
  position: relative;
  background: url("../../assets/images/bg5.webp") no-repeat;
  background-size: 100% auto;
  padding-bottom: 1rem;
}
.avatar {
  width: 1.3rem;
  height: 1.3rem;
  padding: 0.05rem;
  border-radius: 50%;
  background: #ffffff;
  position: absolute;
  left: 0;
  right: 0;
  top: -0.5rem;
  margin: auto;
  > div {
    width: 100%;
    height: 100%;
    padding: 0.1rem;
    border-radius: 50%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 100%;
      height: auto;
    }
  }
}
.box1 {
  display: flex;
  justify-content: flex-end;
  padding: 0.2rem 1rem;
  .linkbox {
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
}
.box2 {
  width: 100%;
  ul {
    max-width: 6rem;
    margin: 0 auto;
    padding: 0.2rem 0;
    text-align: center;
    li {
      &:nth-child(1) {
        font-size: 0.3rem;
        font-weight: 600;
      }
      &:nth-child(2) {
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          color: #c9c9c9;
          margin: 0 0.05rem;
        }
        .icon-assessed-badge {
          font-size: 0.4rem;
        }
        .icon-gouxuan {
          font-size: 0.3rem;
        }
      }
      &:nth-child(3) {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.15rem;
        overflow: hidden;
        margin: 0.3rem 0;
        > div {
          width: 25%;
          height: 0.9rem;
          background: rgba(255, 255, 255, 0.21);
          backdrop-filter: blur(0.06rem);
          margin-right: 0.02rem;
          padding: 0.2rem 0;
          &:last-child {
            margin-right: 0;
          }
          > div {
            display: flex;
            align-items: center;
            justify-content: center;
            &:nth-child(1) {
              font-size: 0.25rem;
              font-weight: bold;
              img {
                width: 0.18rem;
                height: auto;
              }
            }
            &:nth-child(2) {
              font-size: 0.15rem;
              font-weight: bold;
            }
          }
        }
      }
      &:nth-child(4) {
        font-size: 0.15rem;
        font-weight: 600;
        text-align: left;
        &.hidden {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
      &:nth-child(5) {
        cursor: pointer;
        margin: 0.2rem auto;
        width: 3.8rem;
        background: rgba(216, 216, 216, 0.29);
        border-radius: 0.1rem;
        &.active i {
          transform: rotate(180deg);
        }
        i {
          display: inline-block;
          font-size: 0.3rem;
          font-weight: 400;
          transition: all 0.3s;
        }
      }
    }
  }
}
.box3 {
  max-width: 85%;
  margin: 0 auto;
  padding-top: 0.5rem;
  border-top: 1px solid;
  border-image: linear-gradient(135deg, rgba(212, 135, 241, 1), rgba(82, 224, 255, 1)) 1 1;
}
.card_list {
  width: 100%;
  height: 13rem;
  overflow-y: auto;
  display: grid;
  grid-gap: 0.3rem;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  li {
    width: 2.7rem;
    height: 3.8rem;
    border-radius: 0.1rem;
    overflow: hidden;
    border: 1px solid #3f3e43;
    backdrop-filter: blur(4px);
    background: rgba(0, 0, 0, 0.38);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: rgba(51, 52, 60, 0.57);
      box-shadow: 5px 8px 10px 0px rgba(0, 0, 0, 0.5);
      .angle2 {
        opacity: 1;
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
    img {
      width: 100%;
      height: 100%;
    }
    .top {
      width: 100%;
      height: 2.7rem;
    }
    .center {
      width: 100%;
      height: 0.75rem;
      border-bottom: 1px solid rgba(132, 125, 125, 0.2);
      div {
        display: flex;
        align-items: center;
        padding: 0 0.05rem;
        &:nth-child(1) {
          font-size: 0.12rem;
          font-weight: bold;
          color: #00b1ff;
          padding: 0.05rem;
          img {
            width: 0.24rem;
            height: auto;
            margin-left: 0.1rem;
          }
        }
        &:nth-child(2) {
          justify-content: space-between;
          font-size: 0.12rem;
          font-weight: bold;
        }
        &:nth-child(3) {
          justify-content: flex-end;
          font-size: 0.1rem;
          font-weight: 600;
          color: #6c6a71;
        }
      }
    }
    .bottom {
      width: 100%;
      height: 0.35rem;
      padding: 0 0.2rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 0.1rem;
      font-weight: 600;
      color: #6c6a71;
      i {
        font-size: 0.25rem;
        margin-right: 0.1rem;
      }
    }
  }
}
</style>
