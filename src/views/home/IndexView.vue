<template>
  <div class="home">
    <span class="absolute_text1">Create a MAG Community on Web3</span>
    <span class="absolute_text2">Create a MAG Community on Web3</span>
    <img class="absolute1" src="../../assets/images/absolute1.png" alt="" />
    <img class="absolute2" src="../../assets/images/absolute2.png" alt="" />
    <img class="absolute3" src="../../assets/images/absolute3.png" alt="" />
    <img class="absolute4" src="../../assets/images/absolute4.png" alt="" />
    <img class="absolute5" src="../../assets/images/absolute5.png" alt="" />
    <img class="absolute6" src="../../assets/images/absolute6.png" alt="" />
    <img class="absolute7" src="../../assets/images/absolute2.png" alt="" />
    <img class="absolute8" src="../../assets/images/absolute2.png" alt="" />
    <img class="absolute9" src="../../assets/images/absolute9.png" alt="" />
    <img class="absolute10" src="../../assets/images/absolute10.png" alt="" />
    <img class="absolute11" src="../../assets/images/absolute11.png" alt="" />
    <img class="absolute12" src="../../assets/images/absolute2.png" alt="" />
    <img class="absolute13" src="../../assets/images/absolute13.png" alt="" />
    <img class="absolute14" src="../../assets/images/absolute14.png" alt="" />
    <img class="absolute15" src="../../assets/images/bg4.png" alt="" />
    <div class="box1">
      <ul>
        <li>
          <!-- Create a <span>MAG</span>
          <br />
          Community on Web3 -->
          {{ $t("message.home.text1") }}
        </li>
        <li><div></div></li>
        <li>{{ $t("message.home.text2") }}</li>
        <li>
          <div>WHITE PAGE</div>
          <div>
            <img src="../../assets/images/contact1.png" alt="" />
            <img src="../../assets/images/contact2.png" alt="" />
            <img src="../../assets/images/contact3.png" alt="" />
            <img src="../../assets/images/contact4.png" alt="" />
          </div>
        </li>
        <li>
          <img src="../../assets/images/logo3.png" alt="" />
        </li>
      </ul>
      <img class="banner_img" src="../../assets/images/img1.png" alt="" />
    </div>
    <div class="box2">
      <div class="box_content">
        <ul class="card_list1">
          <li v-for="(item, index) in cardList1" :key="index">
            <p>{{ $t(item.text1) }}</p>
            <div>{{ $t(item.text2) }}</div>
          </li>
        </ul>
        <img class="img_bg3" src="../../assets/images/img3.png" alt="" />
        <ul class="card_list2">
          <li v-for="(item, index) in cardList2" :key="index">
            <div class="box_border1">
              <div class="box_border2">
                <div class="box_border1">
                  <div class="box_border2">
                    <div class="box_item">
                      {{ $t(item.text) }}
                    </div>
                    <div class="box_top">
                      <img :src="item.image" alt="" />
                      <span>{{ $t(item.name) }}</span>
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
        <img src="../../assets/images/box_title1.png" alt="" />
        <span>DAO</span>
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
        <img src="../../assets/images/box_title1.png" alt="" />
        <span>LAUNCHPAD</span>
      </div>
      <div class="box_content">
        <div class="top">
          <div class="box_border1">
            <div class="box_border2">
              <span>
                {{ $t("message.home.text3") }}
              </span>
              <img src="../../assets/images/img7.png" alt="" />
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <div class="box_border1">
              <div class="box_border2">
                <img src="../../assets/images/img8.png" alt="" />
              </div>
            </div>
          </div>
          <div class="right">
            <div><img src="../../assets/images/img9.png" alt="" /></div>
            <div><img src="../../assets/images/img10.png" alt="" /></div>
          </div>
        </div>
      </div>
    </div>
    <!-- MARKET -->
    <div class="box5">
      <div class="box_title">
        <img src="../../assets/images/box_title1.png" alt="" />
        <span>MARKET</span>
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
                      <img src="../../assets/images/img15.png" alt="" />
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
        <img src="../../assets/images/box_title1.png" alt="" />
        <span>MEDIA</span>
      </div>
      <div class="box_content">
        <img class="title_img" src="../../assets/images/img4.png" alt="" />
        <ul class="cardList5">
          <li v-for="(item, index) in cardList5" :key="index">
            <div>
              <div>TAG</div>
              <span>{{ $t(item.time) }}</span>
              <img src="../../assets/images/img5.png" alt="" />
            </div>
            <span>{{ $t(item.text) }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- INVESTOR&PARTNER -->
    <div class="box7">
      <div class="box_title">
        <img src="../../assets/images/box_title1.png" alt="" />
        <span>INVESTOR&PARTNER</span>
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
export default {
  name: "HOME",
  data() {
    return {
      cardList1: [
        { text1: "message.home.list1[0].text1", text2: "message.home.list1[0].text2" },
        { text1: "message.home.list1[1].text1", text2: "message.home.list1[1].text2" },
        { text1: "message.home.list1[2].text1", text2: "message.home.list1[2].text2" },
      ],
      cardList2: [
        {
          image: require("../../assets/images/card_img1.png"),
          name: "message.home.list2[0].text1",
          text: "message.home.list2[0].text2",
        },
        {
          image: require("../../assets/images/card_img4.png"),
          name: "message.home.list2[1].text1",
          text: "message.home.list2[1].text2",
        },
        {
          image: require("../../assets/images/card_img2.png"),
          name: "message.home.list2[2].text1",
          text: "message.home.list2[2].text2",
        },
        { image: require("../../assets/images/card_img3.png"), name: "message.home.list2[3].text1", text: "message.home.list2[3].text2" },
      ],
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
          image: require("../../assets/images/img11.png"),
          name1: "name1",
          name2: "name2",
          logo: require("../../assets/images/logo_ETH.png"),
          num: 10,
          offer: {
            name: "offer",
            logo: require("../../assets/images/logo_ETH.png"),
            num: 10,
          },
        },
        {
          image: require("../../assets/images/img12.png"),
          name1: "name1",
          name2: "name2",
          logo: require("../../assets/images/logo_ETH.png"),
          num: 10,
          offer: {
            name: "offer",
            logo: require("../../assets/images/logo_ETH.png"),
            num: 10,
          },
        },
        {
          image: require("../../assets/images/img13.png"),
          name1: "name1",
          name2: "name2",
          logo: require("../../assets/images/logo_ETH.png"),
          num: 10,
          offer: {
            name: "offer",
            logo: require("../../assets/images/logo_ETH.png"),
            num: 10,
          },
        },
        {
          image: require("../../assets/images/img14.png"),
          name1: "name1",
          name2: "name2",
          logo: require("../../assets/images/logo_ETH.png"),
          num: 10,
          offer: {
            name: "offer",
            logo: require("../../assets/images/logo_ETH.png"),
            num: 10,
          },
        },
      ],
      cardList5: [{ time: "message.home.list4[0].text1", text: "message.home.list4[0].text2" }],
      cardList6: [
        require("../../assets/images/collaborators1.png"),
        require("../../assets/images/collaborators2.png"),
        require("../../assets/images/collaborators3.png"),
        require("../../assets/images/collaborators4.png"),
        require("../../assets/images/collaborators5.png"),
        require("../../assets/images/collaborators6.png"),
        require("../../assets/images/collaborators7.png"),
        require("../../assets/images/collaborators8.png"),
        require("../../assets/images/collaborators9.png"),
        require("../../assets/images/collaborators10.png"),
        require("../../assets/images/collaborators11.png"),
        require("../../assets/images/collaborators12.png"),
        require("../../assets/images/collaborators13.png"),
        require("../../assets/images/collaborators14.png"),
        require("../../assets/images/collaborators15.png"),
        require("../../assets/images/collaborators16.png"),
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  position: relative;
  background: url("../../assets/images/bg2.png") no-repeat;
  background-size: 100% auto;
  background-position: 0% 15%;
}
.absolute_text1 {
  white-space: nowrap;
  font-size: 0.15rem;
  color: #ffa332;
  letter-spacing: 0.75rem;
  transform: rotate(90deg);
  position: absolute;
  left: -80%;
  top: 63%;
}
.absolute_text2 {
  white-space: nowrap;
  font-size: 0.15rem;
  color: #ffa332;
  letter-spacing: 0.75rem;
  transform: rotate(90deg);
  position: absolute;
  left: 5%;
  top: 60%;
}
.absolute1 {
  width: 0.57rem;
  height: auto;
  position: absolute;
  left: 0;
  top: 20%;
}
.absolute2 {
  width: 0.11rem;
  height: auto;
  position: absolute;
  left: 2%;
  top: 24%;
}
.absolute3 {
  width: 1.36rem;
  height: auto;
  position: absolute;
  right: 0;
  top: 21%;
}
.absolute4 {
  width: 2.8rem;
  height: auto;
  position: absolute;
  left: 0;
  top: 31%;
}
.absolute5 {
  width: 1.5rem;
  height: auto;
  position: absolute;
  right: 0;
  top: 30%;
}
.absolute6 {
  width: 1.57rem;
  height: auto;
  position: absolute;
  left: 0;
  top: 43%;
  z-index: 2;
}
.absolute7 {
  width: 0.07rem;
  height: auto;
  opacity: 0.3;
  transform: rotateY(180deg);
  position: absolute;
  left: 5%;
  top: 54%;
  z-index: 1;
}
.absolute8 {
  width: 0.18rem;
  height: auto;
  position: absolute;
  right: 3%;
  top: 51%;
}
.absolute9 {
  width: 0.85rem;
  height: auto;
  position: absolute;
  left: 0;
  top: 59.7%;
}
.absolute10 {
  width: 1.05rem;
  height: auto;
  position: absolute;
  left: 0;
  top: 70%;
}
.absolute11 {
  width: 1.24rem;
  height: auto;
  position: absolute;
  right: 0;
  top: 65%;
}
.absolute12 {
  width: 0.18rem;
  height: auto;
  position: absolute;
  left: 4%;
  top: 83.8%;
}
.absolute13 {
  width: 0.75rem;
  height: auto;
  position: absolute;
  right: 0;
  top: 88.2%;
}
.absolute14 {
  width: 0.75rem;
  height: auto;
  position: absolute;
  left: 0;
  bottom: 0;
}
.absolute15 {
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  top: 54%;
}
.box1 {
  width: 100%;
  height: 9.4rem;
  background: url("../../assets/images/bg1.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: flex-end;
  padding: 0.5rem 0;
  position: relative;
  ul {
    width: 55%;
    li {
      padding-left: 1rem;
      &:nth-child(1) {
        font-size: 0.45rem;
        font-weight: bold;
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
        font-size: 0.2rem;
        font-weight: bold;
        letter-spacing: 2px;
      }
      &:nth-child(4) {
        margin: 0.8rem 0 0.2rem 0;
        display: flex;
        align-items: center;
        div {
          &:nth-child(1) {
            width: fit-content;
            padding: 0 0.3rem;
            margin-right: 0.5rem;
            font-size: 0.25rem;
            font-weight: bold;
            background: linear-gradient(136deg, #68cfe7 0%, #68cfe6 18%, #50b9d8 58%, #5967ce 100%);
            border: 0.01rem solid;
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
        padding-left: 0.2rem;
        img {
          width: 8rem;
          height: auto;
        }
      }
    }
  }
  .banner_img {
    width: 6.45rem;
    height: auto;
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
  padding: 0.01rem;
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
    li {
      width: 3.2rem;
      height: 1.4rem;
      background: linear-gradient(136deg, #68cfe7 0%, #68cfe6 18%, #50b9d8 58%, #5967ce 100%);
      border: 0.01rem solid;
      border-image: linear-gradient(320deg, rgba(219, 98, 255, 1), rgba(136, 253, 238, 0)) 1 1;
      position: relative;
      p {
        text-align: center;
        font-size: 0.2rem;
        font-weight: 600;
        color: #000000;
        line-height: 0.5rem;
      }
      div {
        width: 3.5rem;
        height: 1.4rem;
        font-size: 0.12rem;
        font-weight: bold;
        position: absolute;
        top: 0.3rem;
        right: 0.05rem;
        background: url("../../assets/images/img2.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.5rem;
      }
    }
  }
  .img_bg3 {
    width: 100%;
    height: auto;
    margin-bottom: 1.5rem;
  }
  .card_list2 {
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
      width: 2.7rem;
      height: 1.8rem;
      position: relative;
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
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.2rem;
        transition: all 1s;
      }
      .box_top {
        display: flex;
        align-items: center;
        position: absolute;
        top: -0.55rem;
        left: 0;
        img {
          width: 0.9rem;
          height: 1rem;
        }
        span {
          font-size: 0.2rem;
          font-weight: bold;
          color: #00fdff;
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
  background: url("../../assets/images/bg3.png") no-repeat;
  background-size: 100% 50%;
  background-position: center bottom;
  .box_content {
    width: 100%;
    display: flex;
    justify-content: center;
    .cardList3 {
      li {
        width: 7.8rem;
        margin-bottom: 0.5rem;
        .box_border1 {
          background-image: linear-gradient(150deg, rgba(0, 211, 255, 0.5), rgba(0, 211, 255, 0), rgba(233, 150, 255, 0), rgba(233, 150, 255, 0.5));
        }
        .box_item {
          width: 100%;
          height: 100%;
          padding: 0.2rem 0.4rem;
          > div {
            &:nth-child(1) {
              font-size: 0.2rem;
              font-weight: bold;
            }
            &:nth-child(2) {
              font-size: 0.12rem;
              font-weight: bold;
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
                  padding-right: 0.1rem;
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
          padding: 0.2rem 0.2rem 0.2rem 2rem;
        }
      }
      span {
        font-size: 0.2rem;
      }
      img {
        width: 2rem;
        height: auto;
        position: absolute;
        left: -5%;
        top: -25%;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      .left {
        .box_border1 {
          background-image: linear-gradient(150deg, rgba(0, 211, 255, 0.5), rgba(0, 211, 255, 0.5), rgba(233, 150, 255, 0), rgba(233, 150, 255, 0.5));
        }
        img {
          width: 3.4rem;
          height: 5rem;
          margin: 0.24rem;
        }
      }
      .right {
        div {
          &:nth-child(1) {
            margin-bottom: 0.1rem;
          }
          img {
            width: 5rem;
            height: auto;
          }
        }
      }
    }
  }
}
.box5 {
  width: 100%;
  height: 8rem;
  margin-bottom: 1rem;
  position: relative;
  .box_content {
    .cardList4 {
      width: 80%;
      margin: 0 auto;
      padding: 1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      > li {
        &:hover .box_border2 {
          background: rgba(8, 8, 9, 0);
        }
        .box_border1 {
          background-image: linear-gradient(150deg, rgba(0, 211, 255, 0.5), rgba(0, 211, 255, 0.5), rgba(233, 150, 255, 0), rgba(233, 150, 255, 0.5));
          .box_border2 {
            padding: 0.18rem 0.12rem;
          }
        }
        ul {
          li {
            &:nth-child(1) {
              img {
                width: 100%;
                height: auto;
              }
            }
            &:nth-child(2) {
              padding: 0 0.1rem;
              font-size: 0.2rem;
              font-weight: bold;
            }
            &:nth-child(3) {
              padding: 0 0.1rem;
              font-size: 0.2rem;
              font-weight: bold;
            }
            &:nth-child(4) {
              padding: 0.1rem;
              border-bottom: 0.01rem solid;
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
                .no_connect {
                  font-weight: bold;
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
                border-radius: 5px;
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
  .box_title {
    margin-bottom: 0.1rem;
  }
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
        line-height: 0.25rem;
        border-bottom: 0.01rem solid #979797;
        cursor: pointer;
        &:hover > div {
          div {
            width: 8em;
            margin-right: 0.2rem;
            border: 0.01rem solid;
            border-image: linear-gradient(320deg, rgba(219, 98, 255, 1), rgba(136, 253, 238, 0)) 1 1;
          }
          img {
            width: 0.3rem;
            margin-right: 0.2rem;
          }
        }
        > div {
          height: 60%;
          display: flex;
          align-items: center;
          transition: all 1s;
          div {
            width: 0;
            height: 100%;
            text-align: center;
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
</style>
