<template>
  <div class="page">
    <div class="box">
      <div class="leftbox" v-if="spaceObj">
        <div>
          <div class="avatar">
            <img :src="`${$urlImages}logo1.webp`" alt="" />
          </div>
          <div class="title"><span>FUN TOPIA</span><i class="iconfont pctelegram"></i></div>
          <div class="linklist">
            <a v-for="(item, index) in linkList" :key="index" :href="item.href">
              <img :src="item.image" alt="" />
            </a>
          </div>
          <div class="lis">
            <div><i class="iconfont pcCustomermanagement-fill"></i>{{ $t("dao.text2") }}</div>
            <div>{{ spaceObj.members.length }}</div>
          </div>
          <div class="btn">
            <el-button :disabled="true" @click="aBill"> {{ $t("dao.text3") }} </el-button>
          </div>
        </div>
      </div>
      <div class="rightbox">
        <div class="title">
          <div>{{ $t("dao.text1") }}</div>
          <el-select v-model="selectKey" @change="selectChange" v-show="spaceObj">
            <el-option v-for="item in selectOptions" :key="item.value" :label="$t(item.label)" :value="item.value"></el-option>
          </el-select>
        </div>
        <ul class="list">
          <li v-for="item in proposalsArr" :key="item.id" @click="toDetail(item)">
            <ul>
              <li>
                <div>
                  {{ $t("dao.text4") }} <span>{{ item.author | ellipsisWallet }}</span> {{ $t("dao.text5") }}
                </div>
                <div class="status">
                  <template v-if="item.state == 'active'">{{ $t("status.text7") }} </template>
                  <template v-if="item.state == 'pending'">{{ $t("status.text8") }} </template>
                  <template v-if="item.state == 'closed'">{{ $t("status.text9") }} </template>
                </div>
              </li>
              <li>{{ item.title }} <img :src="`${$urlImages}box_title3.webp`" alt="" /></li>
              <li>
                <pre class="text_ellipsis_row_3">{{ item.body }}</pre>
              </li>
              <li v-if="item.state == 'pending'">
                <div>
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
        { value: 1, label: "status.text4" },
        { value: 2, label: "status.text5" },
        // { value: 3, label: "status.text6" },
        { value: 3, label: "status.text7" },
        { value: 4, label: "status.text8" },
        { value: 5, label: "status.text9" },
      ],
      linkList: [
        { image: this.$urlImages + "contact_Gitbook.webp", href: "https://funtopia.gitbook.io/fun-topia/create-a-fun-metaverse/about-fun-topia" },
        { image: this.$urlImages + "contact_Twitter.webp", href: "https://twitter.com/FuntopiaNFT" },
        { image: this.$urlImages + "contact_Discord.webp", href: "https://discord.gg/Gtq9JsPcPN" },
        { image: this.$urlImages + "contact_Medium.webp", href: "https://medium.com/@funtopiagame" },
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
      this.$router.push({ path: "/dao-details", query: { id: item.id } });
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
        if (Y > 0) return `${this.$t("date.left") + " " + Y + " " + this.$t("date.year")}`;
        if (M > 0) return `${this.$t("date.left") + " " + M + " " + this.$t("date.month")}`;
        if (D > 0) return `${this.$t("date.left") + " " + D + " " + this.$t("date.day")}`;
        if (h > 0) return `${this.$t("date.left") + " " + h + " " + this.$t("date.hour")}`;
        if (m > 0) return `${this.$t("date.left") + " " + m + " " + this.$t("date.minute")}`;
      }
    },
    /**发起提案 */
    aBill() {
      // console.log("发起提案");
    },
    /**提交提案 */
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
  width: 11.5rem;
  margin: 0.5rem auto;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  border: 1px solid #535151;
  backdrop-filter: blur(0.07rem);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0.8rem 0.5rem 0.5rem 0.5rem;
}
.leftbox {
  width: 3.5rem;
  height: fit-content;
  > div {
    width: 100%;
    height: 100%;
    position: relative;
    background: rgba(24, 24, 28, 0.8);
    border-radius: 0.06rem;
    padding: 0.8rem 0.2rem 0.2rem 0.2rem;
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
    .linklist {
      width: fit-content;
      margin: 0.2rem auto;
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
    .lis {
      width: 100%;
      padding: 0.2rem;
      border-bottom: 1px solid;
      margin: 0 auto;
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
      width: fit-content;
      margin: 0.2rem auto;
      .el-button {
        width: 2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.15rem;
      }
    }
  }
}
.rightbox {
  width: calc(100% - 3.5rem);
  .title {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.3rem;
    font-weight: bold;
    padding: 0 0.2rem;
    margin-bottom: 0.1rem;
    .el-select {
      width: 1.5rem;
      height: 0.4rem;
    }
  }
  > .list {
    width: 100%;
    height: 6rem;
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
    margin: 0.2rem auto;
    padding: 0.5rem 0 0 0;
  }
  .leftbox {
    width: 100%;
    height: fit-content;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    > div {
      padding: 0.5rem 0 0.2rem 0;
      .avatar {
        width: 0.8rem;
        height: 0.8rem;
        padding: 0.05rem;
        top: -0.4rem;
      }
      .title {
        font-size: 0.2rem;
        font-weight: bold;
        i {
          font-size: 0.2rem;
          margin-left: 0.1rem;
        }
      }
      .linklist {
        width: fit-content;
        margin: 0.1rem auto;
        a {
          width: 0.25rem;
          height: 0.15rem;
          margin-right: 0.02rem;
        }
      }
      .lis {
        width: 70%;
        padding: 0.1rem;
        div {
          font-size: 0.12rem;
          font-weight: 300;
          i {
            font-size: 0.2rem;
            margin-right: 0.1rem;
          }
        }
      }
      .btn {
        width: fit-content;
        margin: 0.1rem auto;
        .el-button {
          width: 1.5rem;
          height: 0.35rem;
          line-height: 0.35rem;
          font-size: 0.12rem;
        }
      }
    }
  }
  .rightbox {
    width: 100%;
    padding: 0 0.1rem;
    .title {
      width: 100%;
      font-size: 0.2rem;
      font-weight: 500;
      padding: 0 0.1rem;
      margin-bottom: 0.05rem;
      .el-select {
        width: 1.2rem;
        height: 0.3rem;
      }
    }
    > .list {
      width: 100%;
      height: 4rem;
      padding: 0 0.1rem;
      > li {
        margin: 0.1rem 0;
        padding: 0 0.1rem 0 0.2rem;
        ul {
          li {
            margin: 0.1rem 0;
            &:nth-child(1) {
              font-size: 0.12rem;
              font-weight: 600;
              span {
                margin: 0 0.05rem;
                padding: 0 0.1rem;
              }
              .status {
                font-size: 0.12rem;
                font-weight: 600;
                color: #00b2fe;
              }
            }
            &:nth-child(2) {
              font-size: 0.15rem;
              font-weight: 600;
              img {
                width: 0.08rem;
                left: -0.15rem;
                top: 0.05rem;
              }
            }
            &:nth-child(3) {
              font-size: 0.12rem;
              font-weight: 300;
            }
            &:nth-child(4) {
              font-size: 0.12rem;
              font-weight: 600;
              span {
                margin-right: 0.05rem;
              }
            }
          }
        }
      }
    }
  }
}
</style>
