<template>
  <div class="page">
    <div class="bgbox">
      <img class="absolute1" src="../../assets/images/bg2.png" alt="" />
      <img class="absolute2" src="../../assets/images/bg3.png" alt="" />
    </div>
    <div class="banner">
      <div class="back_box" @click="goBack">
        <i class="iconfont icon-fanhui"></i>
        <span>{{ $t("message.artist.text3") }}</span>
      </div>
    </div>
    <div class="box_title">
      <img src="../../assets/images/box_title1.png" alt="" />
      <span>Explore Artist</span>
    </div>
    <div class="contentbox">
      <div class="leftbox">
        <div class="box1">
          <div>
            <span><img src="../../assets/images/box_title3.png" alt="" />推选第一款上架Launchpad的项目</span>
            <span>进行中</span>
          </div>
          <div><pre>本期竞选的项目有3个，来自shika studio、metalulu、cryptopuck等，详情请看</pre></div>
        </div>
        <div class="box2">
          <div class="menu">
            <span @click="changeHash('#Detail')">Detail</span>
            <span @click="changeHash('#Vote')">Vote</span>
            <span @click="changeHash('#Comment')">Comment</span>
          </div>
          <div class="box3" id="Detail">
            <div>
              <span>Shika Studio是来自于XXXXXXX</span>
              <div><i class="iconfont icon-chakan"></i><span>点击可以查看艺术作品</span></div>
            </div>
            <div>
              <span>Shika Studio是来自于XXXXXXX</span>
              <div><i class="iconfont icon-chakan"></i><span>点击可以查看艺术作品</span></div>
            </div>
            <div>
              <span>Shika Studio是来自于XXXXXXX</span>
              <div><i class="iconfont icon-chakan"></i><span>点击可以查看艺术作品</span></div>
            </div>
          </div>
          <div class="box4" id="Vote">
            <div class="title">
              <span><img src="../../assets/images/box_title3.png" alt="" />进行中</span>
              <span>October 01, 2020 - October 03, 2020 </span>
            </div>
            <div class="des">
              The project passes the audit and starts the lock-in plan. The investors can lock the fund through the smart contract and support the
              project
            </div>
            <div class="check_boxs">
              <div class="check">
                <div class="check_icon"></div>
                <div class="text"><span>Shika Studio </span><span>(60%，2000)</span></div>
              </div>
              <div class="check">
                <div class="check_icon"></div>
                <div class="text"><span>Shika Studio </span><span>(60%，2000)</span></div>
              </div>
              <div class="check">
                <div class="check_icon"></div>
                <div class="text"><span>Shika Studio </span><span>(60%，2000)</span></div>
              </div>
            </div>
            <div class="inputboxs">
              <div class="inputbox">
                <div class="text1">Ticket</div>
                <input type="text" />
                <div class="text2">MAX</div>
              </div>
              <div class="btn">Lock</div>
            </div>
          </div>
          <div class="box5" id="Comment">Comment</div>
        </div>
      </div>
      <div class="rightbox">
        <div class="box1">
          <div class="title"><img src="../../assets/images/box_title3.png" alt="" />信息</div>
          <ul class="list">
            <li>
              <div>策略</div>
              <div><img src="../../assets/images/logo1.png" alt="" /></div>
            </li>
            <li>
              <div>IPFS</div>
              <div>#QmcEIKN<i class="iconfont icon-chakan"></i></div>
            </li>
            <li>
              <div>投票制度</div>
              <div>单选投票</div>
            </li>
            <li>
              <div>开始日期</div>
              <div>may23,2022,11:55AM</div>
            </li>
            <li>
              <div>结束日期</div>
              <div>may31,2022,12:00PM</div>
            </li>
            <li>
              <div></div>
              <div>#18,041,584</div>
            </li>
          </ul>
        </div>
        <div class="box1">
          <div class="title"><img src="../../assets/images/box_title3.png" alt="" />当前结果</div>
          <ul class="progressbarlist">
            <li>
              <div>
                <span>UNverse</span>
                <p><span>0 HC</span><span>0 %</span></p>
              </div>
              <div><div></div></div>
            </li>
            <li>
              <div>
                <span>DTland</span>
                <p><span>0 HC</span><span>0 %</span></p>
              </div>
              <div><div></div></div>
            </li>
            <li>
              <div>
                <span>TMkown</span>
                <p><span>0 HC</span><span>0 %</span></p>
              </div>
              <div><div></div></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DAODetails",
  data() {
    return {};
  },
  data() {
    return {
      detail: null,
    };
  },
  created() {
    if (Object.keys(this.$route.query).length > 0) {
      console.log(this.$route.query);
    }
  },
  methods: {
    changeHash(idName) {
      document.querySelector(idName).scrollIntoView(true);
    },
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
  padding-bottom: 1rem;
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
.banner {
  width: 100%;
  height: 1rem;
  position: relative;
}
.contentbox {
  display: flex;
  justify-content: center;
}
.leftbox {
  width: 7.4rem;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  border: 1px solid #436e77;
  backdrop-filter: blur(0.07rem);
  .box1 {
    box-shadow: 0px 2px 5px 1px #000000;
    border-bottom: 1px solid #535151;
    padding: 0.2rem 0.5rem;
    div {
      &:nth-child(1) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        img {
          width: 0.12rem;
          height: auto;
          position: absolute;
          left: -0.25rem;
          top: 0.08rem;
        }
        span {
          font-size: 0.2rem;
          font-weight: 600;
          &:nth-child(2) {
            color: #00b2fe;
          }
        }
      }
      &:nth-child(2) {
        font-size: 0.15rem;
        font-weight: 300;
        width: 100%;
        height: 1rem;
        padding-top: 0.2rem;
      }
    }
  }
  .box2 {
    padding: 0.2rem 0.3rem;
    .menu {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 0.2rem 0;
      span {
        cursor: pointer;
        margin-right: 0.5rem;
        font-size: 0.12rem;
        font-weight: 600;
        &.active,
        &:hover {
          color: #00b2fe;
        }
      }
    }
    .box3 {
      width: 100%;
      height: 2.5rem;
      background: rgba(24, 24, 28, 0.71);
      box-shadow: 0px 6px 10px 0px rgba(22, 22, 26, 0.98);
      border-radius: 0.02rem;
      overflow-y: auto;
      padding: 0.2rem;
      margin-bottom: 0.2rem;
      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.15rem;
        font-weight: 300;
        padding: 0.1rem 0;
        div {
          cursor: pointer;
          display: flex;
          align-items: center;
          padding-right: 0.5rem;
          &:hover {
            color: #00b2fe;
          }
          i {
            font-size: 0.2rem;
            margin-right: 0.1rem;
          }
        }
      }
    }
    .box4 {
      width: 100%;
      padding: 0.2rem;
      margin-bottom: 0.2rem;
      background: rgba(24, 24, 28, 0.71);
      box-shadow: 0px 6px 10px 0px rgba(22, 22, 26, 0.98);
      border-radius: 0.02rem;
      .title {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 0.12rem;
          height: auto;
          margin-right: 0.1rem;
        }
        span {
          &:nth-child(1) {
            font-size: 0.15rem;
            font-weight: 300;
          }
          &:nth-child(2) {
            font-size: 0.12rem;
            font-weight: 300;
            color: #888787;
          }
        }
      }
      .des {
        font-size: 0.15rem;
        font-weight: 300;
        padding: 0.2rem 0;
      }
      .check_boxs {
        padding: 0 0.2rem;
        .check {
          display: flex;
          align-items: center;
          padding: 0.05rem 0;
          cursor: pointer;
          &.active .check_icon {
            background: #6cebff;
          }
          .check_icon {
            width: 0.15rem;
            height: 0.15rem;
            border-radius: 0.04rem;
            border: 1px solid;
            border-image: linear-gradient(180deg, rgba(65, 240, 255, 1), rgba(207, 85, 225, 1)) 1 1;
          }
          .text {
            width: 3rem;
            display: flex;
            justify-content: space-between;
            font-size: 0.15rem;
            font-weight: 300;
            margin-left: 0.1rem;
          }
        }
      }
      .inputboxs {
        display: flex;
        padding: 0.2rem 0;
        .inputbox {
          width: 4.5rem;
          height: 0.35rem;
          border-radius: 0.08rem;
          border: 1px solid;
          border-image: radial-gradient(circle, rgba(0, 255, 246, 1), rgba(255, 56, 148, 1), rgba(229, 108, 255, 1)) 1 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 0.2rem;
          margin-right: 0.2rem;
          .text1,
          .text2 {
            height: 80%;
            display: flex;
            align-items: center;
            font-size: 0.12rem;
            font-weight: 400;
          }
          .text1 {
            width: 0.5rem;
            border-right: 1px solid;
            border-image: linear-gradient(180deg, rgba(102, 114, 146, 1), rgba(67, 142, 160, 1)) 1 1;
          }
          .text2 {
            width: 0.3rem;
            color: #00b4ff;
          }
          input {
            width: calc(100% - 0.8rem);
            height: 100%;
            padding: 0 0.2rem;
            font-size: 0.12rem;
            font-weight: 400;
          }
        }
        .btn {
          width: 0.9rem;
          height: 0.35rem;
          background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
          border-radius: 0.06rem;
          font-size: 0.12rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      }
    }
    .box5 {
      width: 100%;
      background: rgba(24, 24, 28, 0.71);
      box-shadow: 0px 6px 10px 0px rgba(22, 22, 26, 0.98);
      border-radius: 0.02rem;
      font-size: 0.15rem;
      font-weight: 300;
      padding: 0.2rem;
    }
  }
}
.rightbox {
  .box1 {
    width: 4rem;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 0.08rem;
    border: 1px solid #436e77;
    backdrop-filter: blur(0.07rem);
    margin-left: 0.2rem;
    margin-bottom: 0.2rem;
    .title {
      background: rgba(0, 0, 0, 0.41);
      border-bottom: 1px solid #436e77;
      backdrop-filter: blur(0.07rem);
      font-size: 0.2rem;
      font-weight: 600;
      padding: 0.2rem;
      img {
        width: 0.12rem;
        height: auto;
        margin-right: 0.1rem;
      }
    }
    .list {
      padding-bottom: 0.2rem;
      li {
        padding: 0.1rem 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          &:nth-child(1) {
            font-size: 0.15rem;
            font-weight: 600;
            color: #6a7074;
          }
          &:nth-child(2) {
            font-size: 0.15rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            img {
              width: 0.5rem;
              height: auto;
            }
            i {
              cursor: pointer;
              font-size: 0.25rem;
              margin-left: 0.1rem;
              &:hover {
                color: #00b4ff;
              }
            }
          }
        }
      }
    }
    .progressbarlist {
      li {
        padding: 0.2rem 0.3rem;
        > div {
          &:nth-child(1) {
            font-size: 0.15rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.1rem 0;
            p {
              span {
                &:nth-child(2) {
                  margin-left: 0.2rem;
                }
              }
            }
          }
          &:nth-child(2) {
            width: 100%;
            height: 0.1rem;
            border-radius: 0.05rem;
            background: #1d1d22;
            > div {
              width: 50%;
              height: 100%;
              border-radius: 0.05rem;
              background: linear-gradient(90deg, rgba(56, 104, 126, 1), rgba(93, 76, 120, 1));
            }
          }
        }
      }
    }
  }
}
</style>
