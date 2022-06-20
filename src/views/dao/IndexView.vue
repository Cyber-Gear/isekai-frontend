<template>
  <div class="page">
    <div class="box">
      <div class="leftbox" v-if="spaceObj">
        <div class="avatar">
          <img :src="`${$urlImages}logo1.webp`" alt="" />
        </div>
        <div class="title"><span>FUN TOPIA</span><i class="iconfont icon-telegram"></i></div>
        <div class="linkbox">
          <div><i class="iconfont icon-telegram"></i></div>
          <div><i class="iconfont icon-tuite"></i></div>
          <div><i class="iconfont icon-discord"></i></div>
          <div><i class="iconfont icon-medium"></i></div>
        </div>
        <div class="lis">
          <div><i class="iconfont icon-Customermanagement-fill"></i>{{ $t("message.dao.text2") }}</div>
          <div>{{ spaceObj.members.length }}</div>
        </div>
        <div class="btn">{{ $t("message.dao.text3") }}</div>
      </div>
      <div class="rightbox">
        <div class="title">
          <div>{{ $t("message.dao.text1") }}</div>
          <div class="selectbox">
            <el-select v-model="selectKey" @change="selectChange">
              <el-option v-for="item in selectOptions" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <ul class="list">
          <li v-for="item in proposalsArr" :key="item.id" @click="toDetail(item)">
            <ul>
              <li>
                <div>
                  {{ $t("message.dao.text4") }} <span>{{ item.author | ellipsisWallet }}</span> {{ $t("message.dao.text5") }}
                </div>
                <div class="status">
                  <template v-if="item.state == 'active'"> {{ $t("message.status.text7") }} </template>
                  <template v-if="item.state == 'pending'"> {{ $t("message.status.text8") }} </template>
                  <template v-if="item.state == 'closed'"> {{ $t("message.status.text9") }} </template>
                </div>
              </li>
              <li>{{ item.title }} <img :src="`${$urlImages}box_title3.webp`" alt="" /></li>
              <li>
                <pre>{{ item.body }}</pre>
              </li>
              <li>
                <div>
                  <!-- <span>{{ $utils.formatDate(item.start * 1000) }}</span>
                  <span>-</span>
                  <span>{{ $utils.formatDate(item.end * 1000) }}</span> -->
                  <span>{{ countdown(item.start * 1000) }}</span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { vote } from "funtopia-sdk";

export default {
  name: "DAO",
  data() {
    return {
      spaceObj: null,
      oldProposalsParams: { first: 10, skip: 0, orderBy: "created", orderDirection: "desc", id: "", state: "", author: "" },
      newProposalsParams: null,
      proposalsArr: [],
      selectKey: 1,
      selectOptions: [
        { value: 1, label: "message.status.text4" },
        { value: 2, label: "message.status.text5" },
        // { value: 3, label: "message.status.text6" },
        { value: 3, label: "message.status.text7" },
        { value: 4, label: "message.status.text8" },
        { value: 5, label: "message.status.text9" },
      ],
    };
  },

  created() {
    this.getSpace();
    this.selectChange(1);
  },
  methods: {
    selectChange(e) {
      this.proposalsArr = [];
      const author = "0x105A80A5Da83997c32818716846BB609C5Ffe35d"; // 全老板
      this.newProposalsParams = JSON.parse(JSON.stringify(this.oldProposalsParams));
      switch (e) {
        case 1:
          break;
        case 2:
          this.newProposalsParams.author = author;
          break;
        case 3:
          this.newProposalsParams.state = "active";
          break;
        case 4:
          this.newProposalsParams.state = "pending";
          break;
        case 5:
          this.newProposalsParams.state = "closed";
          break;
        default:
          break;
      }
      this.getProposals();
    },
    /**获取空间 */
    getSpace() {
      vote
        .getSpace()
        .then((res) => {
          // console.log("获取空间", res.data.space);
          this.spaceObj = res.data.space;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**获取提案 */
    getProposals() {
      const { first, skip, orderBy, orderDirection, id, state, author } = this.newProposalsParams;
      vote
        .getProposals(first, skip, orderBy, orderDirection, id, state, author)
        .then((res) => {
          // console.log("获取提案", res.data.proposals);
          this.proposalsArr = res.data.proposals;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toDetail(item) {
      this.$router.push({ path: "dao-details", query: { id: item.id } });
    },
    /**DAO提案倒计时 */
    countdown(endTime) {
      let nowTime = new Date().getTime();
      let t = endTime - nowTime;
      if (t > 0) {
        let Y = Math.floor(t / (365 * 24 * 60 * 60 * 1000));
        let M = Math.floor((t / (30 * 24 * 60 * 60 * 1000)) % 12);
        let D = Math.floor((t / (24 * 60 * 60 * 1000)) % 30);
        let h = Math.floor((t / (60 * 60 * 1000)) % 24);
        let m = Math.floor((t / (60 * 1000)) % 60);
        if (Y > 0) return `${this.$t("message.date.left") + " " + Y + " " + this.$t("message.date.year")}`;
        if (M > 0) return `${this.$t("message.date.left") + " " + M + " " + this.$t("message.date.month")}`;
        if (D > 0) return `${this.$t("message.date.left") + " " + D + " " + this.$t("message.date.day")}`;
        if (h > 0) return `${this.$t("message.date.left") + " " + h + " " + this.$t("message.date.hour")}`;
        if (m > 0) return `${this.$t("message.date.left") + " " + m + " " + this.$t("message.date.minute")}`;
      }
    },

    // 提交提案
    createProposal() {
      // account: string, title: string, body: string, discussion: string, choices: string[], start: number, end: number
      // vote
      //   .createProposal(params)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
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
  width: 11rem;
  margin: 1rem auto;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  border: 1px solid #535151;
  backdrop-filter: blur(0.07rem);
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 0.5rem 0.5rem 0.5rem;
}
.leftbox {
  width: 3rem;
  height: fit-content;
  background: rgba(24, 24, 28, 0.8);
  border-radius: 0.06rem;
  position: relative;
  padding: 0.8rem 0.2rem;
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
  .title {
    font-size: 0.3rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 0.3rem;
      margin-left: 0.1rem;
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
      margin-right: 0.05rem;
      i {
        font-size: 0.22rem;
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
    &.disabled {
      color: #424242;
      background: #17181b;
      cursor: not-allowed;
    }
  }
}
.rightbox {
  width: 7rem;
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.3rem;
    font-weight: 500;
    padding: 0 0.2rem;
    margin-bottom: 0.1rem;
    .selectbox {
      width: 1.5rem;
      height: 0.45rem;
    }
  }
  > .list {
    width: 100%;
    max-height: 8rem;
    padding: 0 0.2rem;
    overflow-y: auto;
    > li {
      width: 100%;
      background: rgba(24, 24, 28, 0.8);
      border-radius: 0.06rem;
      border: 1px solid #4e4e52;
      margin: 0.2rem 0;
      padding: 0 0.2rem 0 0.4rem;
      &:hover {
        box-shadow: 0px 0px 11px 1px rgba(255, 255, 255, 0.26);
      }
      ul {
        li {
          cursor: pointer;
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
              padding: 0 0.2rem;
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
          }
          pre {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 750px) {
  .page {
    width: 100%;
    padding: 1.8rem 0;
  }
  .box {
    width: 90%;
    margin: 1rem auto;
    padding: 2rem 0.5rem 0.5rem 0.5rem;
    flex-wrap: wrap;
  }
  .leftbox {
    width: 100%;
    padding: 1.5rem 3rem 1rem 3rem;
    margin-bottom: 1rem;
    .avatar {
      width: 2.5rem;
      height: 2.5rem;
      padding: 0.2rem;
      top: -1.25rem;
      img {
      }
    }
    .title {
      font-size: 0.3rem;
      i {
        font-size: 0.3rem;
        margin-left: 0.2rem;
      }
    }
    .linkbox {
      margin: 0.4rem auto;
      border-radius: 0.3rem;
      > div {
        width: 1rem;
        height: 0.6rem;
        i {
          font-size: 0.15rem;
        }
        &:last-child {
        }
        &:hover {
        }
      }
    }
    .lis {
      div {
        font-size: 0.15rem;
        font-weight: 300;
        i {
          font-size: 0.35rem;
          margin-right: 0.2rem;
        }
      }
    }
    .btn {
    }
  }
  .rightbox {
    width: 100%;
    .title {
      font-size: 0.3rem;
      font-weight: 500;
      padding: 0;
      margin-bottom: 0.1rem;
      .selectbox {
        width: 2.7rem;
        height: 1.2rem;
      }
    }
    > .list {
      width: 100%;
      max-height: 16rem;
      padding: 0;
      padding-right: 0.2rem;
      > li {
        margin: 0.4rem 0;
        padding: 0 0.2rem 0 0.4rem;
        &:hover {
        }
        ul {
          li {
            margin: 0.4rem 0;
            &:nth-child(1) {
              font-size: 0.15rem;
              font-weight: 300;
              span {
                display: inline-block;
                background: #000000;
                border-radius: 0.1rem;
                margin: 0 0.2rem;
                padding: 0 0.2rem;
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
            }
            pre {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
  }
}
</style>
