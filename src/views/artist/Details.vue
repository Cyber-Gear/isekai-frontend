<template>
  <div class="page">
    <div class="banner">
      <img :src="detail.banner" alt="" />
      <div class="back_box">
        <div @click="goBack">
          <i class="iconfont pcfanhui"></i><span>{{ $t('btns.text1') }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="avatar">
        <div><img :src="detail.avatar" alt="" /></div>
      </div>
      <div class="box1">
        <div class="linklist">
          <a v-for="(item, index) in linkList" :key="index" :href="item.href || '#'">
            <img :src="item.image" alt="" />
          </a>
        </div>
      </div>
      <div class="box2">
        <ul>
          <li>{{ $t(detail.title) }}</li>
          <li>
            <i class="iconfont pcassessed-badge"></i>
            <i class="iconfont pcgouxuan"></i>
            <i class="iconfont pcassessed-badge"></i>
          </li>
          <li>
            <div>
              <div>
                <div><span>10.0k</span></div>
                <div>{{ $t('artist.items[0]') }}</div>
              </div>
            </div>
            <div>
              <div>
                <div><span>10.0k</span></div>
                <div>{{ $t('artist.items[1]') }}</div>
              </div>
            </div>
            <div>
              <div>
                <div><img src="@/assets/cdn/images/coin.webp" alt="" />10.0k</div>
                <div>{{ $t('artist.items[2]') }}</div>
              </div>
            </div>
            <div>
              <div>
                <div><img src="@/assets/cdn/images/coin.webp" alt="" />10.0k</div>
                <div>{{ $t('artist.items[3]') }}</div>
              </div>
            </div>
          </li>
          <li>
            <pre>{{ $t(detail.des) }}</pre>
          </li>
        </ul>
      </div>
      <div class="box3">
        <ul class="card_list">
          <li v-for="(item, index) in cardList" :key="index" @click="toDetail(item.id)">
            <div class="top"><img :src="item.logo" alt="" /></div>
            <div class="center">
              <div>
                <span>{{ $t(item.name) }}</span>
                <img src="@/assets/cdn/images/icon1.webp" alt="" />
              </div>
              <div>
                <span>{{ $t(item.title) }}</span>
                <span>88busd</span>
              </div>
              <div>{{ $t('artist.text10') }}77busd</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { shikastudio, zw, akiha, negoro } from '@/mock/nftworks';
import { linkList } from '@/mock/staticdata';
export default {
  name: 'ARTISTDetails',
  data() {
    return {
      detail: null,
      cardList: [],
      isShowIntroduce: false,
      linkList: linkList
    };
  },
  created() {
    if (Object.keys(this.$route.query).length > 0) {
      const id = this.$route.query.id;
      const arr = [shikastudio, zw, akiha, negoro];
      arr.forEach((element) => {
        if (element.id === id) {
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
    toDetail(id) {
      switch (this.$route.query.id) {
        // case "zw":
        //   this.$router.push({ path: "/artist-details-zw", query: { id: id } });
        //   break;
        // case "akiha":
        //   this.$router.push({ path: "/artist-details-akiha", query: { id: id } });
        //   break;
        // case "negoro":
        //   this.$router.push({ path: "/artist-details-negoro", query: { id: id } });
        //   break;
        case 'shikastudio':
          this.$router.push({ path: '/artist-details-shikastudio', query: { id: id } });
          break;
        default:
          this.$message({ message: this.$t('tips.text12') });
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding-top: 0.8rem;
}
.banner {
  width: 100%;
  height: 3rem;
  position: relative;
  > img {
    width: 100%;
    height: 100%;
  }
}
.content {
  width: 100%;
  position: relative;
  background: url('~@/assets/cdn/images/bg5.webp') no-repeat;
  background-size: 100% 100%;
  padding-bottom: 0.8rem;
}
.avatar {
  width: 1.3rem;
  height: 1.3rem;
  padding: 0.02rem;
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
    padding: 0.05rem;
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
  width: 11.5rem;
  display: flex;
  justify-content: flex-end;
  margin: 0 auto;
  padding: 0.2rem 0;
  .linklist {
    display: flex;
    align-items: center;
    border-radius: 0.15rem;
    overflow: hidden;
    a {
      width: 0.55rem;
      height: 0.35rem;
      background: rgba(255, 255, 255, 0.21);
      backdrop-filter: blur(0.06rem);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.05rem;
      img {
        width: 50%;
        height: auto;
      }
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
  width: 11.5rem;
  margin: 0 auto;
  ul {
    max-width: 100%;
    margin: 0 auto;
    padding: 0.2rem 0;
    text-align: center;
    li {
      &:nth-child(1) {
        font-size: 0.5rem;
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
        .pcassessed-badge {
          font-size: 0.4rem;
        }
        .pcgouxuan {
          font-size: 0.3rem;
        }
      }
      &:nth-child(3) {
        width: 60%;
        margin: 0.3rem auto;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.15rem;
        overflow: hidden;
        > div {
          width: 25%;
          height: 0.9rem;
          background: rgba(255, 255, 255, 0.21);
          backdrop-filter: blur(0.06rem);
          margin-right: 0.05rem;
          padding: 0.2rem 0;
          display: flex;
          align-items: center;
          justify-content: center;
          > div {
            > div {
              display: flex;
              align-items: center;
              justify-content: center;
              &:nth-child(1) {
                font-size: 0.25rem;
                font-weight: bold;
                img {
                  width: auto;
                  height: 0.29rem;
                }
              }
              &:nth-child(2) {
                font-size: 0.15rem;
              }
            }
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
      &:nth-child(4) {
        font-size: 0.15rem;
        font-weight: 600;
        text-align: left;
      }
    }
  }
}
.box3 {
  width: 11.5rem;
  margin: 0 auto;
  padding-top: 0.5rem;
  border-top: 1px solid;
  border-image: linear-gradient(135deg, rgba(212, 135, 241, 1), rgba(82, 224, 255, 1)) 1 1;
}
.card_list {
  width: 100%;
  height: 10rem;
  padding-right: 0.05rem;
  overflow-y: auto;
  li {
    float: left;
    width: 2.735rem;
    margin: 0 0.15rem 0.15rem 0;
    background: rgba(0, 0, 0, 0.38);
    border-radius: 0.1rem;
    border: 0.01rem solid #3f3e43;
    backdrop-filter: blur(4px);
    transition: all 0.3s;
    cursor: pointer;
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:hover {
      background: rgba(51, 52, 60, 0.57);
      box-shadow: 0.05rem 0.08rem 0.1rem 0rem rgba(0, 0, 0, 0.5);
    }
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
      div {
        display: flex;
        align-items: center;
        margin: 0.05rem;
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
}
@media screen and (max-width: 750px) {
  .page {
    width: 100%;
    padding-top: 0.5rem;
  }
  .banner {
    width: 100%;
    height: 0.96rem;
  }
  .content {
    padding-bottom: 0.5rem;
  }
  .avatar {
    width: 0.66rem;
    height: 0.66rem;
    padding: 0.01rem;
    top: -0.4rem;
  }
  .box1 {
    width: 90%;
    padding: 0.1rem 0;
    .linkbox {
      > div {
        width: 0.25rem;
        height: 0.15rem;
        margin-right: 0.02rem;
        i {
          font-size: 0.12rem;
        }
      }
    }
    .linklist {
      a {
        width: 0.25rem;
        height: 0.15rem;
        margin-right: 0.02rem;
      }
    }
  }
  .box2 {
    width: 90%;
    margin: 0 auto;
    ul {
      padding: 0.1rem 0;
      li {
        &:nth-child(1) {
          font-size: 0.2rem;
          font-weight: bold;
        }
        &:nth-child(2) {
          margin-top: 0.1rem;
          i {
            color: #c9c9c9;
            margin: 0 0.05rem;
          }
          .pcassessed-badge {
            font-size: 0.2rem;
          }
          .pcgouxuan {
            font-size: 0.15rem;
          }
        }
        &:nth-child(3) {
          width: 80%;
          border-radius: 0.15rem;
          margin: 0.1rem auto;
          > div {
            width: 25%;
            height: 0.47rem;
            margin-right: 0.02rem;
            padding: 0.2rem 0;
            > div {
              > div {
                &:nth-child(1) {
                  font-size: 0.15rem;
                  font-weight: bold;
                  img {
                    width: auto;
                    height: 0.16rem;
                  }
                }
                &:nth-child(2) {
                  font-size: 0.12rem;
                }
              }
            }
          }
        }
        &:nth-child(4) {
          font-size: 0.12rem;
        }
      }
    }
  }
  .box3 {
    width: 90%;
    padding-top: 0.2rem;
  }
  .card_list {
    width: 100%;
    height: 4rem;
    padding-right: 0.05rem;
    li {
      width: 1.6rem;
      margin: 0 0.1rem 0.1rem 0;
      border-radius: 0.08rem;
      &:nth-child(2n) {
        margin-right: 0;
      }
      .center {
        div {
          margin: 0.05rem;
          font-size: 0.12rem;
          font-weight: bold;
          &:nth-child(1) {
            img {
              width: 0.14rem;
              height: auto;
              margin-left: 0.05rem;
            }
          }
          &:nth-child(3) {
            font-weight: 600;
            color: #6c6a71;
          }
        }
      }
    }
  }
}
</style>
