<template>
  <div class="home">
    <img class="absolute1" :src="`${$urlImages}absolute1.webp`" alt="" />
    <img class="absolute2" :src="`${$urlImages}absolute2.webp`" alt="" />
    <img class="absolute3" :src="`${$urlImages}absolute3.webp`" alt="" />
    <img class="absolute4" :src="`${$urlImages}absolute4.webp`" alt="" />
    <img class="absolute5" :src="`${$urlImages}absolute5.webp`" alt="" />
    <img class="absolute6" :src="`${$urlImages}absolute6.webp`" alt="" />
    <img class="absolute7" :src="`${$urlImages}absolute2.webp`" alt="" />
    <img class="absolute8" :src="`${$urlImages}absolute2.webp`" alt="" />
    <img class="absolute9" :src="`${$urlImages}absolute9.webp`" alt="" />
    <img class="absolute11" :src="`${$urlImages}absolute11.webp`" alt="" />
    <img class="absolute12" :src="`${$urlImages}absolute2.webp`" alt="" />
    <img class="absolute13" :src="`${$urlImages}absolute13.webp`" alt="" />
    <img class="absolute14" :src="`${$urlImages}absolute14.webp`" alt="" />
    <img class="absolute15" :src="`${$urlImages}bg4.webp`" alt="" />
    <div class="box1">
      <ul>
        <li>
          {{ $t("message.home.text1") }}
        </li>
        <li><div></div></li>
        <li>{{ $t("message.home.text2") }}</li>
        <li>
          <div>{{ $t("message.home.text4") }}</div>
          <div>
            <img :src="`${$urlImages}contact1.webp`" alt="" />
            <img :src="`${$urlImages}contact2.webp`" alt="" />
            <img :src="`${$urlImages}contact3.webp`" alt="" />
            <img :src="`${$urlImages}contact4.webp`" alt="" />
          </div>
        </li>
        <li>
          <img :src="`${$urlImages}logo3.webp`" alt="" />
        </li>
      </ul>
      <img class="banner_img" :src="`${$urlImages}img1.webp`" alt="" />
    </div>
    <!-- ARTIST -->
    <div class="box2">
      <div class="box_content">
        <ul class="card_list1">
          <li v-for="(item, index) in cardList1" :key="index" @click="submitInfo(index)">
            <div>
              <p>{{ $t(item.text1) }}</p>
              <p>{{ $t(item.text2) }}</p>
            </div>
          </li>
        </ul>
        <img class="img_bg3" :src="`${$urlImages}img3.webp`" alt="" />
        <ul class="card_list2">
          <li v-for="(item, index) in cardList2" :key="index" @click="toArtistPage(item.id)">
            <div class="box_border1">
              <div class="box_border2">
                <div class="box_border1">
                  <div class="box_border2">
                    <div class="box_item">
                      <pre class="text_ellipsis_row_5">{{ $t(item.des) }}</pre>
                    </div>
                    <div class="box_top">
                      <img :src="item.avatar2" alt="" />
                      <span>{{ item.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- DAO -->
    <div class="box3">
      <div class="box_title">
        <img :src="`${$urlImages}box_title1.webp`" alt="" />
        <span>{{ $t("message.home.text5") }}</span>
      </div>
      <div class="box_content">
        <ul class="cardList3">
          <li v-for="(item, index) in cardList3" :key="index">
            <div class="box_border1">
              <div class="box_border2">
                <div class="box_item">
                  <div>{{ $t(item.text1) }}</div>
                  <div>{{ $t(item.text2) }}</div>
                  <div>
                    <div class="btn">
                      <div class="box_border1">
                        <div class="box_border2">{{ $t(item.text3) }}</div>
                      </div>
                    </div>
                    <div class="progress_bar">
                      <div :style="{ width: item.progress }">{{ item.progress }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- LAUNCHPAD -->
    <div class="box4">
      <div class="box_title">
        <img :src="`${$urlImages}box_title1.webp`" alt="" />
        <span>{{ $t("message.home.text6") }}</span>
      </div>
      <div class="box_content">
        <div class="top">
          <div class="box_border1">
            <div class="box_border2">
              <span>
                {{ $t("message.home.text3") }}
              </span>
              <img :src="`${$urlImages}img7.webp`" alt="" />
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="box_border1">
              <div class="box_border2">
                <img :src="`${$urlImages}img8.webp`" alt="" />
              </div>
            </div>
          </div>
          <div class="right">
            <div><img :src="`${$urlImages}img9.webp`" alt="" /></div>
            <div><img :src="`${$urlImages}img10.webp`" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
    <!-- MARKET -->
    <div class="box5">
      <div class="box_title">
        <img :src="`${$urlImages}box_title1.webp`" alt="" />
        <span>{{ $t("message.home.text7") }}</span>
      </div>
      <div class="box_content">
        <ul class="cardList4">
          <li v-for="(item, index) in cardList4" :key="index">
            <div class="box_border1">
              <div class="box_border2">
                <ul>
                  <li><img :src="item.image" alt="" /></li>
                  <li>{{ item.name1 }}</li>
                  <li>{{ item.name2 }}</li>
                  <li>
                    <img :src="item.logo" alt="" /><span>{{ item.num }}</span>
                  </li>
                  <li>
                    <div>
                      <div class="connected" v-if="item.offer">
                        <span>{{ item.offer.name }}</span>
                        <img :src="item.logo" alt="" />
                        <span>{{ item.offer.num }}</span>
                      </div>
                      <div class="no_connect" v-else>connect</div>
                    </div>
                    <div class="btn">
                      <img :src="`${$urlImages}img15.webp`" alt="" />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- MEDIA -->
    <div class="box6">
      <div class="box_title">
        <img :src="`${$urlImages}box_title1.webp`" alt="" />
        <span>{{ $t("message.home.text8") }}</span>
      </div>
      <div class="box_content">
        <img class="title_img" :src="`${$urlImages}img4.webp`" alt="" />
        <ul class="cardList5">
          <li v-for="(item, index) in cardList5" :key="index">
            <div>
              <div>{{ $t("message.home.text10") }}</div>
              <span>{{ $t(item.time) }}</span>
              <img :src="`${$urlImages}img5.webp`" alt="" />
            </div>
            <span class="text_ellipsis_row_2">{{ $t(item.text) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- INVESTOR&PARTNER -->
    <div class="box7">
      <div class="box_title">
        <img :src="`${$urlImages}box_title1.webp`" alt="" />
        <span>{{ $t("message.home.text9") }}</span>
      </div>
      <div class="box_content">
        <ul class="cardList6">
          <li v-for="(item, index) in cardList6" :key="index">
            <img :src="item" alt="" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { nftworks } from "../../mock/nftworks";

export default {
  name: "HOME",
  data() {
    return {
      cardList1: [
        { text1: "message.home.list1[0].text1", text2: "message.home.list1[0].text2" },
        { text1: "message.home.list1[1].text1", text2: "message.home.list1[1].text2" },
        { text1: "message.home.list1[2].text1", text2: "message.home.list1[2].text2" },
      ],
      cardList2: nftworks,

      cardList3: [
        {
          text1: "message.home.list3[0].text1",
          text2: "message.home.list3[0].text2",
          text3: "message.home.list3[0].text3",
          link: "",
          progress: "88%",
        },
        {
          text1: "message.home.list3[1].text1",
          text2: "message.home.list3[1].text2",
          text3: "message.home.list3[1].text3",
          link: "",
          progress: "68%",
        },
        {
          text1: "message.home.list3[2].text1",
          text2: "message.home.list3[2].text2",
          text3: "message.home.list3[2].text3",
          link: "",
          progress: "68%",
        },
      ],
      cardList4: [
        {
          image: this.$urlImages + "img11.webp",
          name1: "name1",
          name2: "name2",
          logo: this.$urlImages + "logo_ETH.webp",
          num: 10,
          offer: {
            name: "offer",
            logo: this.$urlImages + "logo_ETH.webp",
            num: 10,
          },
        },
        {
          image: this.$urlImages + "img12.webp",
          name1: "name1",
          name2: "name2",
          logo: this.$urlImages + "logo_ETH.webp",
          num: 10,
          offer: {
            name: "offer",
            logo: this.$urlImages + "logo_ETH.webp",
            num: 10,
          },
        },
        {
          image: this.$urlImages + "img13.webp",
          name1: "name1",
          name2: "name2",
          logo: this.$urlImages + "logo_ETH.webp",
          num: 10,
          offer: {
            name: "offer",
            logo: this.$urlImages + "logo_ETH.webp",
            num: 10,
          },
        },
        {
          image: this.$urlImages + "img14.webp",
          name1: "name1",
          name2: "name2",
          logo: this.$urlImages + "logo_ETH.webp",
          num: 10,
          offer: {
            name: "offer",
            logo: this.$urlImages + "logo_ETH.webp",
            num: 10,
          },
        },
      ],
      cardList5: [
        { time: "message.home.list4[0].text1", text: "message.home.list4[0].text2" },
        { time: "message.home.list4[0].text1", text: "message.home.list4[0].text2" },
        { time: "message.home.list4[0].text1", text: "message.home.list4[0].text2" },
      ],
      cardList6: [
        this.$urlImages + "collaborators1.webp",
        this.$urlImages + "collaborators2.webp",
        this.$urlImages + "collaborators3.webp",
        this.$urlImages + "collaborators4.webp",
        this.$urlImages + "collaborators5.webp",
        this.$urlImages + "collaborators6.webp",
        this.$urlImages + "collaborators7.webp",
        this.$urlImages + "collaborators8.webp",
        this.$urlImages + "collaborators9.webp",
        this.$urlImages + "collaborators10.webp",
        this.$urlImages + "collaborators11.webp",
        this.$urlImages + "collaborators12.webp",
        this.$urlImages + "collaborators13.webp",
        this.$urlImages + "collaborators14.webp",
        this.$urlImages + "collaborators15.webp",
        this.$urlImages + "collaborators16.webp",
      ],
    };
  },
  methods: {
    submitInfo(index) {
      switch (index) {
        case 0:
          window.location.href = "https://forms.gle/zZDWkvZgGMS69LHx5";
          break;
        case 1:
          window.location.href = "https://forms.gle/K9QLDqwe1m3Np7LV8";
          break;
        default:
          break;
      }
    },
    toArtistPage(id) {
      this.$router.push({ path: "artist-details", query: { id: id } });
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  position: relative;
  background: url($urlImages + "bg2.webp") no-repeat;
  background-size: 100% auto;
  background-position: 0% 15%;
  padding-bottom: 1rem;
}

.absolute1 {
  width: 0.57rem;
  height: auto;
  position: absolute;
  left: 0;
  top: 13rem;
}
.absolute2 {
  width: 0.11rem;
  height: auto;
  position: absolute;
  left: 0.3rem;
  top: 16rem;
}
.absolute3 {
  width: 1.36rem;
  height: auto;
  position: absolute;
  right: 0;
  top: 14rem;
}
.absolute4 {
  width: 2.8rem;
  height: auto;
  position: absolute;
  left: 0;
  top: 19rem;
}
.absolute5 {
  width: 1.5rem;
  height: auto;
  position: absolute;
  right: 0;
  top: 19rem;
}
.absolute6 {
  width: 1.57rem;
  height: auto;
  position: absolute;
  left: 0;
  top: 27rem;
  z-index: 2;
}
.absolute7 {
  width: 0.07rem;
  height: auto;
  opacity: 0.3;
  transform: rotateY(180deg);
  position: absolute;
  left: 0.5rem;
  top: 34rem;
  z-index: 1;
}
.absolute8 {
  width: 0.18rem;
  height: auto;
  position: absolute;
  right: 0.5rem;
  top: 35rem;
}
.absolute9 {
  width: 0.85rem;
  height: auto;
  position: absolute;
  left: 0;
  top: 38rem;
}

.absolute11 {
  width: 1.24rem;
  height: auto;
  position: absolute;
  right: 0;
  top: 36rem;
}
.absolute12 {
  width: 0.18rem;
  height: auto;
  position: absolute;
  left: 0.5rem;
  top: 55rem;
}
.absolute13 {
  width: 0.75rem;
  height: auto;
  position: absolute;
  right: 0;
  top: 51rem;
}
.absolute14 {
  width: 0.75rem;
  height: auto;
  position: absolute;
  left: 0;
  top: 63rem;
}
.absolute15 {
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  top: 35rem;
}
.box1 {
  width: 100%;
  height: 9.5rem;
  background: url($urlImages + "bg1.webp") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: flex-end;
  padding-top: 0.8rem;
  position: relative;
  ul {
    width: calc(100% - 6.45rem);
    li {
      font-size: 0.2rem;
      font-weight: bold;
      padding-left: 0.5rem;
      &:nth-child(1) {
        font-size: 0.45rem;
        span {
          color: #74ceff;
        }
      }
      &:nth-child(2) {
        div {
          width: 0.4rem;
          height: 0.05rem;
          background: #53d0ff;
          margin: 0.2rem 0;
        }
      }
      &:nth-child(3) {
      }
      &:nth-child(4) {
        margin: 0.2rem 0;
        display: flex;
        align-items: center;
        div {
          &:nth-child(1) {
            width: fit-content;
            padding: 0 0.3rem;
            margin-right: 0.5rem;
            background: linear-gradient(136deg, #68cfe7 0%, #68cfe6 18%, #50b9d8 58%, #5967ce 100%);
            border: 1px solid;
            border-image: linear-gradient(320deg, rgba(219, 98, 255, 1), rgba(136, 253, 238, 0)) 1 1;
          }
          &:nth-child(2) {
            img {
              width: 0.5rem;
              height: 0.5rem;
              margin: 0 0.05rem;
              cursor: pointer;
            }
          }
        }
      }
      &:nth-child(5) {
        padding-left: 0;
        img {
          width: 8rem;
          height: auto;
        }
      }
    }
  }
  .banner_img {
    width: 6.45rem;
    height: 8.55rem;
    position: absolute;
    top: 1.2rem;
    right: 0;
  }
}
.box_border1,
.box_border2 {
  width: 100%;
  height: 100%;
  border-radius: 0.05rem;
}
.box_border1 {
  padding: 1px;
}
.box_border2 {
  padding: 0;
  background: rgba(8, 8, 9, 1);
  transition: all 1s;
}
.box2 {
  width: 100%;
  margin: 0 auto;
  position: relative;
  .box_content {
    width: 80%;
    margin: 0 auto;
    padding: 1rem 0;
  }
  .card_list1 {
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      cursor: pointer;
      width: 3.2rem;
      height: 1.4rem;
      background: linear-gradient(136deg, #68cfe7 0%, #68cfe6 18%, #50b9d8 58%, #5967ce 100%);
      position: relative;
      transition: all 0.3s;
      opacity: 0.8;
      border-radius: 0.05rem;
      &:hover {
        opacity: 1;
        transform: scale(1.1);
      }
      div {
        padding: 0.2rem;
        p {
          font-size: 0.12rem;
          font-weight: bold;
          &:nth-child(1) {
            font-size: 0.2rem;
            color: #000000;
            margin-bottom: 0.08rem;
          }
        }
      }
    }
  }
  .img_bg3 {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }
  .card_list2 {
    width: 100%;
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      width: 2.5rem;
      position: relative;
      cursor: pointer;
      .box_border1 {
        background-image: linear-gradient(
          to right bottom,
          rgba(0, 211, 255, 0.5),
          rgba(0, 211, 255, 0.5),
          rgba(0, 211, 255, 0),
          rgba(233, 150, 255, 0.5)
        );
        .box_border2 {
          padding: 0.1rem;
          .box_border1 {
            background-image: linear-gradient(
              to left bottom,
              rgba(0, 211, 255, 0.5),
              rgba(0, 211, 255, 0.5),
              rgba(0, 211, 255, 0),
              rgba(233, 150, 255, 0.5)
            );
            .box_border2 {
              padding: 0;
            }
          }
        }
      }
      &:hover .box_item {
        color: #000000;
        background: linear-gradient(136deg, #68cfe7 0%, #68cfe6 18%, #50b9d8 58%, #5967ce 100%);
      }
      .box_item {
        width: 100%;
        height: 100%;
        font-size: 0.12rem;
        font-weight: 600;
        padding: 0.3rem 0.2rem;
        transition: all 0.3s;
      }
      .box_top {
        display: flex;
        align-items: center;
        position: absolute;
        top: -0.55rem;
        left: -0.4rem;
        img {
          width: 1rem;
          height: 1rem;
        }
        span {
          font-size: 0.2rem;
          font-weight: bold;
          color: #00fdff;
          margin-left: 0.1rem;
          margin-bottom: 0.2rem;
        }
      }
    }
  }
}
.box3 {
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
  background: url($urlImages + "bg3.webp") no-repeat;
  background-size: 100% 50%;
  background-position: center bottom;
  .box_content {
    width: 7.8rem;
    margin: 0 auto;
    .cardList3 {
      li {
        width: 100%;
        margin-bottom: 0.5rem;
        .box_border1 {
          background-image: linear-gradient(150deg, rgba(0, 211, 255, 0.5), rgba(0, 211, 255, 0), rgba(233, 150, 255, 0), rgba(233, 150, 255, 0.5));
        }
        .box_item {
          width: 100%;
          height: 100%;
          padding: 0.2rem 0.4rem;
          > div {
            font-size: 0.2rem;
            font-weight: bold;
            &:nth-child(2) {
              font-size: 0.12rem;
              margin: 0.2rem 0;
            }
            &:nth-child(3) {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .btn {
                cursor: pointer;
                font-size: 0.15rem;
                font-weight: bold;
                &:hover .box_border2 {
                  background: linear-gradient(180deg, #02aed3 0%, rgba(8, 8, 9, 0.58) 100%);
                }
                .box_border1 {
                  background-image: linear-gradient(
                    120deg,
                    rgba(0, 211, 255, 0.5),
                    rgba(0, 211, 255, 0),
                    rgba(233, 150, 255, 0),
                    rgba(233, 150, 255, 0.5)
                  );
                  .box_border2 {
                    padding: 0.1rem 0.5rem;
                  }
                }
              }
              .progress_bar {
                width: 2rem;
                height: auto;
                div {
                  border-radius: 0.1rem;
                  text-align: right;
                  font-size: 0.1rem;
                  font-weight: bold;
                  background-image: linear-gradient(to right, rgba(0, 211, 255, 0.5), rgba(176, 108, 198, 1));
                }
              }
            }
          }
        }
      }
    }
  }
}
.box4 {
  width: 100%;
  margin-bottom: 1rem;
  position: relative;
  .box_content {
    width: 9.5rem;
    margin: 0 auto;
    .top {
      width: 100%;
      margin-bottom: 0.5rem;
      position: relative;
      .box_border1 {
        background-image: linear-gradient(120deg, rgba(0, 211, 255, 0.5), rgba(0, 211, 255, 0), rgba(233, 150, 255, 0), rgba(233, 150, 255, 0.5));
        .box_border2 {
          width: 100%;
          padding: 0.2rem;
          display: flex;
        }
      }
      span {
        font-size: 0.2rem;
        margin-left: 1.2rem;
      }
      img {
        width: 2rem;
        height: auto;
        position: absolute;
        left: -5%;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      .left {
        width: 3.8rem;
        height: 5.5rem;
        .box_border1 {
          background-image: linear-gradient(150deg, rgba(0, 211, 255, 0.5), rgba(0, 211, 255, 0.5), rgba(233, 150, 255, 0), rgba(233, 150, 255, 0.5));
          .box_border2 {
            padding: 0.24rem;
          }
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        div {
          width: 5.07rem;
          height: 2.72rem;
          &:nth-child(1) {
            margin-bottom: 0.1rem;
          }
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
.box5 {
  width: 100%;
  height: 12rem;
  margin-bottom: 1rem;
  position: relative;
  .box_content {
    .cardList4 {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > li {
        width: 2.4rem;
        margin-bottom: 0.5rem;
        &:hover .box_border2 {
          background: rgba(8, 8, 9, 0);
        }
        .box_border1 {
          background-image: linear-gradient(150deg, rgba(0, 211, 255, 0.5), rgba(0, 211, 255, 0.5), rgba(233, 150, 255, 0), rgba(233, 150, 255, 0.5));
          .box_border2 {
            padding: 0.12rem 0.12rem 0 0.12rem;
          }
        }
        ul {
          li {
            font-size: 0.2rem;
            font-weight: bold;
            &:nth-child(1) {
              img {
                width: 100%;
                height: auto;
              }
            }
            &:nth-child(2) {
              padding: 0 0.1rem;
              color: #979797;
            }
            &:nth-child(3) {
              padding: 0 0.1rem;
            }
            &:nth-child(4) {
              padding: 0.1rem;
              border-bottom: 1px solid;
              border-image: linear-gradient(63deg, rgba(7, 209, 229, 1), rgba(152, 90, 173, 1)) 1 1;
              display: flex;
              align-items: center;
              img {
                width: auto;
                height: 0.18rem;
              }
              span {
                font-size: 0.18rem;
                font-weight: bold;
                margin-left: 0.1rem;
              }
            }
            &:nth-child(5) {
              padding: 0.1rem;
              display: flex;
              align-items: center;
              justify-content: space-between;
              > div {
                font-size: 0.14rem;
                font-weight: bold;
                .no_connect {
                  color: #965aab;
                }
                .connected {
                  img {
                    width: auto;
                    height: 0.14rem;
                    margin: 0 0.1rem;
                  }
                }
              }
              > .btn {
                width: 0.38rem;
                height: 0.38rem;
                background: rgba(0, 0, 0, 0.24);
                border-radius: 0.1rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                img {
                  width: 65%;
                  height: auto;
                }
              }
            }
          }
        }
      }
    }
  }
}
.box6 {
  width: 100%;
  margin-bottom: 1rem;
  .box_content {
    width: 9.8rem;
    height: auto;
    margin: 0 auto;
    .title_img {
      width: 100%;
      height: auto;
    }
    .cardList5 {
      width: 100%;
      height: 4rem;
      overflow-y: auto;
      li {
        width: 100%;
        height: 0.5rem;
        display: flex;
        align-items: center;
        font-size: 0.15rem;
        font-weight: bold;
        border-bottom: 1px solid #979797;
        cursor: pointer;
        > div {
          height: 50%;
          display: flex;
          align-items: center;
          transition: all 1s;
          div {
            width: 0;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background: linear-gradient(136deg, #68cfe7 0%, #68cfe6 18%, #50b9d8 58%, #5967ce 100%);
            transition: all 0.5s;
          }
          span {
            margin-right: 0.2rem;
          }
          img {
            width: 0;
            height: auto;
            transition: all 0.5s;
          }
        }
        &:hover > div {
          div {
            width: 1rem;
            margin-right: 0.2rem;
            border: 1px solid;
            border-image: linear-gradient(320deg, rgba(219, 98, 255, 1), rgba(136, 253, 238, 0)) 1 1;
          }
          img {
            width: 0.3rem;
            margin-right: 0.2rem;
          }
        }
      }
    }
  }
}
.box7 {
  width: 100%;
  .box_content {
    width: 80%;
    margin: 0 auto;
    .cardList6 {
      position: relative;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      li {
        width: 25%;
        padding: 0.2rem;
        img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
        }
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .home {
    width: 100%;
    position: relative;
    background: url($urlImages + "bg2.webp") no-repeat;
    background-size: 100% auto;
    background-position: 0% 15%;
    padding-bottom: 1rem;
  }
  .absolute1,
  .absolute3,
  .absolute4,
  .absolute5,
  .absolute6,
  .absolute8,
  .absolute9,
  .absolute11,
  .absolute12,
  .absolute13,
  .absolute14 {
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
  .absolute2 {
    width: 0.08rem;
    height: auto;
    position: absolute;
    left: 0.15rem;
    top: 60vh;
  }
  .absolute7 {
    width: 0.04rem;
    height: auto;
    opacity: 0.3;
    transform: rotateY(180deg);
    position: absolute;
    left: 0.2rem;
    top: 175vh;
    z-index: 1;
  }
  .absolute15 {
    width: 100%;
    height: auto;
    position: absolute;
    left: 0;
    top: 245vh;
  }

  .box1 {
    width: 100%;
    height: 3rem;
    padding-top: 0.45rem;
    ul {
      width: calc(100% - 1.48rem);
      li {
        font-size: 0.12rem;
        font-weight: bold;
        padding-left: 0.2rem;
        &:nth-child(1) {
          font-size: 0.15rem;
          span {
          }
        }
        &:nth-child(2) {
          div {
            width: 0.1rem;
            height: 0.01rem;
            margin: 0.05rem 0;
          }
        }
        &:nth-child(3) {
        }
        &:nth-child(4) {
          margin: 0.2rem 0;
          div {
            &:nth-child(1) {
              padding: 0 0.1rem;
              margin-right: 0.1rem;
            }
            &:nth-child(2) {
              img {
                width: 0.18rem;
                height: 0.18rem;
                margin: 0 0.02rem;
              }
            }
          }
        }
        &:nth-child(5) {
          img {
            width: 2.11rem;
            height: 0.36rem;
          }
        }
      }
    }
    .banner_img {
      width: 1.48rem;
      height: 2.29rem;
      top: 0.45rem;
    }
  }
  .box_border1,
  .box_border2 {
    width: 100%;
    height: 100%;
    border-radius: 0.05rem;
  }
  .box_border1 {
    padding: 1px;
  }
  .box_border2 {
    padding: 0;
    background: rgba(8, 8, 9, 1);
    transition: all 1s;
  }
  .box2 {
    .box_content {
      width: 100%;
      padding: 0.2rem 0;
    }
    .card_list1 {
      width: 100%;
      padding: 0 10%;
      margin-bottom: 0;
      li {
        width: 100%;
        height: 0.7rem;
        border-radius: 0.05rem;
        margin-bottom: 0.2rem;
        &:hover {
        }
        div {
          padding: 0.1rem;
          p {
            font-size: 0.12rem;
            &:nth-child(1) {
              font-size: 0.12rem;
              margin-bottom: 0.08rem;
            }
          }
        }
      }
    }
    .img_bg3 {
      margin-bottom: 0.2rem;
    }
    .card_list2 {
      width: 100%;
      margin: 0.2rem 0;
      padding: 0 0.35rem;
      li {
        width: 1.33rem;
        margin-bottom: 0.35rem;
        .box_border1 {
          .box_border2 {
            padding: 0.05rem;
            .box_border1 {
              .box_border2 {
                padding: 0;
              }
            }
          }
        }
        .box_item {
          font-size: 0.12rem;
          font-weight: 600;
          padding: 0.1rem 0.1rem;
        }
        .box_top {
          top: -0.25rem;
          left: -0.25rem;
          img {
            width: 0.4rem;
            height: 0.5rem;
          }
          span {
            font-size: 0.16rem;
            font-weight: bold;
            margin-left: 0.05rem;
            margin-bottom: 0.2rem;
          }
        }
      }
    }
  }
  .box3 {
    width: 100%;
    margin-bottom: 0.5rem;
    .box_content {
      width: 80%;
      .cardList3 {
        li {
          margin-bottom: 0.2rem;
          .box_border1 {
          }
          .box_item {
            padding: 0.2rem;
            > div {
              font-size: 0.16rem;
              font-weight: bold;
              &:nth-child(1) {
              }
              &:nth-child(2) {
                font-size: 0.12rem;
                margin: 0.1rem 0;
              }
              &:nth-child(3) {
                .btn {
                  font-size: 0.12rem;
                  font-weight: bold;
                  &:hover .box_border2 {
                  }
                  .box_border1 {
                    .box_border2 {
                      padding: 0.05rem 0.2rem;
                    }
                  }
                }
                .progress_bar {
                  width: 1.5rem;
                  height: auto;
                  div {
                    border-radius: 0.1rem;
                    font-size: 0.12rem;
                    font-weight: bold;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .box4 {
    margin-bottom: 0.5rem;
    .box_content {
      width: 80%;
      .top {
        margin-bottom: 0.2rem;
        .box_border1 {
          .box_border2 {
          }
        }
        span {
          font-size: 0.12rem;
          margin-left: 0.4rem;
        }
        img {
          width: 0.95rem;
          left: -10%;
        }
      }
      .bottom {
        .left {
          width: 1.2rem;
          height: 1.85rem;
          .box_border1 {
            .box_border2 {
              padding: 0.05rem;
            }
          }
          img {
          }
        }
        .right {
          div {
            width: 1.7rem;
            height: 0.9rem;
            &:nth-child(1) {
              margin-bottom: 0.05rem;
            }
            img {
            }
          }
        }
      }
    }
  }
  .box5 {
    width: 100%;
    height: 5.5rem;
    margin-bottom: 0.5rem;
    .box_content {
      .cardList4 {
        width: 80%;
        > li {
          width: 1.4rem;
          margin-bottom: 0.2rem;
          &:hover .box_border2 {
          }
          .box_border1 {
            .box_border2 {
              padding: 0.05rem 0.05rem 0 0.05rem;
            }
          }
          ul {
            li {
              font-size: 0.12rem;
              font-weight: bold;
              &:nth-child(1) {
                img {
                }
              }
              &:nth-child(2) {
                padding: 0 0.05rem;
              }
              &:nth-child(3) {
                padding: 0 0.05rem;
              }
              &:nth-child(4) {
                padding: 0.05rem;
                img {
                  width: auto;
                  height: 0.1rem;
                }
                span {
                  font-size: 0.12rem;
                  font-weight: bold;
                  margin-left: 0.05rem;
                }
              }
              &:nth-child(5) {
                padding: 0.05rem;
                > div {
                  font-size: 0.12rem;
                  font-weight: bold;
                  .no_connect {
                    color: #965aab;
                  }
                  .connected {
                    img {
                      width: auto;
                      height: 0.1rem;
                      margin: 0 0.05rem;
                    }
                  }
                }
                > .btn {
                  width: 0.21rem;
                  height: 0.21rem;
                  border-radius: 0.1rem;
                  img {
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .box6 {
    width: 100%;
    margin-bottom: 0.5rem;
    .box_content {
      width: 80%;
      .title_img {
      }
      .cardList5 {
        width: 100%;
        height: 2rem;
        li {
          width: 100%;
          height: 0.5rem;
          font-size: 0.12rem;
          font-weight: bold;
          > div {
            div {
            }
            span {
              margin-right: 0.05rem;
            }
            img {
            }
          }
          &:hover > div {
            div {
              width: 0.5rem;
              margin-right: 0.05rem;
            }
            img {
              width: 0.2rem;
              margin-right: 0.05rem;
            }
          }
        }
      }
    }
  }
  .box7 {
    .box_content {
      .cardList6 {
        li {
          padding: 0.05rem;
          img {
          }
        }
      }
    }
  }
}
</style>
