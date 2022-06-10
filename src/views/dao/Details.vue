<template>
  <div class="page">
    <div class="banner">
      <div class="back_box" @click="goBack">
        <i class="iconfont icon-fanhui"></i>
        <span>{{ $t("message.btns.text1") }}</span>
      </div>
    </div>
    <div class="contentbox" v-if="someProposals">
      <div class="leftbox">
        <div class="box1">
          <div class="title">
            <span><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ someProposals.title }}</span>
            <span>
              <template v-if="someProposals.state == 'active'"> {{ $t("message.status.text7") }} </template>
              <template v-if="someProposals.state == 'pending'"> {{ $t("message.status.text8") }} </template>
              <template v-if="someProposals.state == 'closed'"> {{ $t("message.status.text9") }} </template>
            </span>
          </div>
          <div class="content">
            <pre>{{ proposalsInfo.body }}</pre>
            <template v-if="proposalsInfo.imageList.length > 0">
              <div v-for="(item, index) in proposalsInfo.imageList" :key="index">
                <img :src="item.image" :alt="item.alt" />
              </div>
            </template>
          </div>
        </div>
        <div class="box2">
          <div class="box4">
            <div class="title">
              <img :src="`${$urlImages}box_title3.webp`" alt="" /><span>{{ $t("message.dao.text15") }}</span>
            </div>
            <div class="check_boxs">
              <div
                class="gradient_border"
                v-for="(item, index) in checkboxList"
                :key="index"
                @click="checkboxClick(item)"
                :class="{ active: item.isChecked }"
              >
                <div>
                  <div class="text">{{ item.label }}</div>
                </div>
              </div>
              <div class="btn">
                <el-button type="primary" :disabled="voteBtnDisabled" @click="handleVote">{{ $t("message.dao.text25") }}</el-button>
              </div>
            </div>
          </div>
          <div class="box5">
            <div class="title">
              <img :src="`${$urlImages}box_title3.webp`" alt="" /><span>{{ $t("message.dao.text17") }}</span>
            </div>
            <div class="linkbox">
              <a :href="someProposals.discussion">{{ someProposals.discussion }}</a>
            </div>
          </div>
          <div class="box6">
            <div class="title">
              <img :src="`${$urlImages}box_title3.webp`" alt="" /><span>{{ $t("message.dao.text16") }}</span>
              <div>{{ someProposals.votes }}</div>
            </div>
            <ul class="list">
              <li v-for="(item, index) in votesList" :key="index">
                <div @click="voterLink(item.voter)">{{ item.voter | ellipsisWallet }}</div>
                <div>
                  <template v-if="checkboxList.length > 0">{{ checkboxList[item.choice - 1] ? checkboxList[item.choice - 1].label : "" }}</template>
                </div>
                <div>{{ item.vp | thousandthsNumber }} FUN</div>
              </li>
            </ul>
            <div class="footer" v-if="hasMore">
              <span class="more" @click="getMore">{{ $t("message.dao.text37") }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rightbox">
        <div class="box1">
          <div class="title"><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ $t("message.dao.text26") }}</div>
          <ul class="list">
            <li>
              <div>{{ $t("message.dao.text27") }}</div>
              <div>
                <img v-if="someProposals.space.id == 'fun-topia.eth'" :src="`${$urlImages}logo1.webp`" alt="" />
              </div>
            </li>
            <li>
              <div>{{ $t("message.dao.text28") }}</div>
              <div @click="ipfsLink">#{{ someProposals.ipfs | ellipsisIpfs }}<i class="iconfont icon-chakan"></i></div>
            </li>
            <li>
              <div>{{ $t("message.dao.text29") }}</div>
              <div>{{ $t("message.dao.text32") }}</div>
            </li>
            <li>
              <div>{{ $t("message.dao.text30") }}</div>
              <div>{{ $utils.formatDate(someProposals.start * 1000) }}</div>
            </li>
            <li>
              <div>{{ $t("message.dao.text31") }}</div>
              <div>{{ $utils.formatDate(someProposals.end * 1000) }}</div>
            </li>
            <li>
              <div>{{ $t("message.dao.text36") }}</div>
              <div>#{{ someProposals.snapshot | thousandthsNumber }}</div>
            </li>
          </ul>
        </div>
        <div class="box1">
          <div class="title"><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ $t("message.dao.text35") }}</div>
          <ul class="progressbarlist">
            <li v-for="(item, index) in resultList" :key="index">
              <div>
                <span>{{ item.label }}</span>
                <p>
                  <span>{{ item.amount | thousandthsNumber }} FUN</span>
                  <span>{{ item.percent.toFixed(2) }}%</span>
                </p>
              </div>
              <div><div :style="{ width: item.percent + '%' }"></div></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { vote } from "funtopia-sdk";

export default {
  name: "DAODetails",
  data() {
    return {
      someProposals: null,
      proposalsParams: { first: 10, skip: 0, orderBy: "created", orderDirection: "desc" },
      votesParams: { first: 10, skip: 0, orderBy: "created", orderDirection: "desc", proposal: "" },
      checkboxList: [],
      resultList: [],
      totalAmount: 0,
      oldVotesList: [],
      votesList: [],
      hasMore: false,
      voteBtnDisabled: true,
      proposalsInfo: { body: "", imageList: [] },
    };
  },
  computed: { ...mapGetters(["getWalletAccount"]) },
  watch: {
    checkboxList: {
      handler(newVal) {
        const isCheckedItem = newVal.find((item) => item.isChecked);
        if (isCheckedItem) this.voteBtnDisabled = false;
      },
      deep: true,
    },
  },
  created() {
    if (this.$route.query.id) {
      this.getProposals(this.$route.query.id);
    }
    // 1000  K
    // 1000000 M
  },
  methods: {
    /**获取提案 */
    getProposals(id) {
      const { first, skip, orderBy, orderDirection } = this.proposalsParams;
      vote
        .getProposals(first, skip, orderBy, orderDirection, id)
        .then((res) => {
          // console.log("获取提案", res.data.proposals[0]);
          this.someProposals = res.data.proposals[0];
          this.createTextAndImage(this.someProposals.body);
          this.initData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**字符串转换 */
    createTextAndImage(str) {
      const arr = str.split("![");
      this.proposalsInfo.body = arr[0];
      this.proposalsInfo.imageList = [];
      if (arr.length <= 1) return;
      arr.splice(0, 1);
      arr.forEach((element) => {
        // ![logo.jpeg](ipfs://QmTSKrVxnzAyGzjKryWAyun7V5ZDqBCLPNfsXH9qmYZvwn)
        // https://snapshot.mypinata.cloud/ipfs/QmTSKrVxnzAyGzjKryWAyun7V5ZDqBCLPNfsXH9qmYZvwn
        const index1 = element.indexOf("]");
        const index2 = element.indexOf("(") + 8;
        const index3 = element.indexOf(")");
        const str1 = element.substring(0, index1);
        const str2 = "https://snapshot.mypinata.cloud/ipfs/" + element.substring(index2, index3);
        this.proposalsInfo.imageList.push({ alt: str1, image: str2 });
      });
    },
    /**初始化数据 */
    initData() {
      let indexNum = 0;
      this.totalAmount = 0;
      this.checkboxList = [];
      this.votesList = [];
      this.someProposals.scores.forEach((element) => {
        this.totalAmount = this.totalAmount + element;
        indexNum++;
      });
      let timer = setInterval(() => {
        if (indexNum == this.someProposals.scores.length) {
          clearInterval(timer);
          this.someProposals.choices.forEach((element, index) => {
            const oneChoice = { label: element, choice: index, percent: 0, amount: 0, isChecked: false };
            this.checkboxList.push(oneChoice);
          });
          this.someProposals.scores.forEach((element, index) => {
            this.checkboxList[index].amount = element;
            if (this.totalAmount) this.checkboxList[index].percent = (element / this.totalAmount) * 100; // 0 / 0 NAN
          });
          const arr = JSON.parse(JSON.stringify(this.checkboxList));
          this.resultList = arr.sort((a, b) => b.amount - a.amount);
        }
      }, 200);
      this.votesParams.skip = 0;
      this.getVotes();
    },

    /**获取投票纪录 */
    getVotes() {
      // first: number, skip: number, orderBy: string, orderDirection: string, proposal?: string,
      this.votesParams.proposal = this.someProposals.id;
      const { first, skip, orderBy, orderDirection, proposal } = this.votesParams;
      vote
        .getVotes(first, skip, orderBy, orderDirection, proposal)
        .then((res) => {
          this.hasMore = res.loading;
          if (res.data.votes.length > 0) {
            // console.log("获取投票纪录", res.data.votes);
            this.votesList = [...this.votesList, ...res.data.votes];
            // this.oldVotesList = JSON.parse(JSON.stringify(res.data.votes));
            // let voterArr = [];
            // this.oldVotesList.forEach((element) => {
            //   voterArr.push(element.voter);
            // });
            // this.getScores(voterArr);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**获取更多 */
    getMore() {
      this.votesParams.skip = this.votesParams.skip + 10;
      this.getVotes();
    },
    // 投票
    handleVote() {
      const isCheckedItem = this.checkboxList.find((item) => item.isChecked);
      if (!isCheckedItem) return this.$message({ message: this.$t("message.tips.text5"), type: "warning" });

      if (!this.getWalletAccount) return this.$store.commit("setWalletConnectPopup", true);
      // account: string, proposal: string, choice: number
      vote
        .castVote(this.getWalletAccount, this.someProposals.id, isCheckedItem.choice + 1)
        .then(() => {
          // console.log("投了", isCheckedItem.label, isCheckedItem.choice + 1);
          // this.getProposals(this.someProposals.id);
          location.reload(); // 投票成功后要刷新最新数据
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**获取投票份额 */
    // getScores(voterArr) {
    //   // voters: string[], blockNumber: number
    //   vote
    //     .getScores(voterArr, Number(this.someProposals.snapshot))
    //     .then((res) => {
    //       const arr = res[0];
    //       Object.keys(arr).forEach((key) => {
    //         const index = this.oldVotesList.findIndex((item) => item.voter == key);
    //         this.oldVotesList[index].score = arr[key];
    //       });
    //       this.votesList = [...this.votesList, ...this.oldVotesList];
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },

    checkboxClick(item) {
      this.checkboxList.forEach((element) => {
        element.isChecked = false;
      });
      item.isChecked = true;
    },
    voterLink(voter) {
      window.location.href = `https://bscscan.com/address/${voter}`;
    },
    ipfsLink() {
      window.location.href = `https://snapshot.mypinata.cloud/ipfs/${this.someProposals.ipfs}`;
    },
    goBack() {
      localStorage.removeItem("someProposals");
      history.go(-1);
    },
    changeHash(idName) {
      document.querySelector(idName).scrollIntoView(true);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  min-height: calc(100vh - 4rem);
  padding: 0.8rem 0;
  overflow: hidden;
  background: url($urlImages + "bg7.webp") no-repeat;
  background-size: 100% 100%;
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
    border-bottom: 1px solid #535151;
    padding: 0.2rem 0.5rem;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      margin-bottom: 0.2rem;
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
    .content {
      div {
        margin-bottom: 0.2rem;
        img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 5rem;
        }
      }
      pre {
        width: 100%;
        min-height: 1rem;
        font-size: 0.15rem;
        font-weight: 300;
      }
    }
  }
  .box2 {
    padding: 0.2rem 0.3rem;
    .box4,
    .box5 {
      width: 100%;
      padding: 0.2rem;
      margin-bottom: 0.2rem;
      background: rgba(24, 24, 28, 0.71);
      box-shadow: 0px 6px 10px 0px rgba(22, 22, 26, 0.98);
      border-radius: 0.02rem;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 0.2rem;
        img {
          width: 0.12rem;
          height: auto;
          margin-right: 0.1rem;
        }
        span {
          font-size: 0.2rem;
          font-weight: 600;
        }
      }
    }
    .check_boxs {
      padding: 0 0.22rem;
      .gradient_border {
        margin: 0.1rem auto;
        border-radius: 0.2rem;
        background: rgba(146, 146, 146, 0.4);
        cursor: pointer;
        &.active {
          background-image: linear-gradient(to right, rgba(0, 255, 246, 0.7), rgba(255, 56, 148, 0.7), rgba(229, 108, 255, 0.7));
        }
        div {
          border-radius: 0.2rem;
          .text {
            width: 100%;
            height: 0.5rem;
            font-size: 0.2rem;
            font-weight: 300;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .linkbox {
      padding: 0 0.22rem;
      a {
        text-decoration: none;
        font-size: 0.15rem;
        font-weight: 300;
        color: #ffffff;
        &:hover {
          color: #00b2fe;
        }
      }
    }
    .box6 {
      width: 100%;
      // min-height: calc(0.75rem * 4);
      background: rgba(0, 0, 0, 0.19);
      border-radius: 0.08rem;
      border: 1px solid #4b4b4b;
      backdrop-filter: blur(0.07rem);
      .title {
        width: 100%;
        height: 0.75rem;
        background: rgba(0, 0, 0, 0.24);
        border-radius: 0.08rem 0.08rem 0 0;
        border-bottom: 1px solid #535151;
        display: flex;
        align-items: center;
        padding: 0 0.2rem;
        font-size: 0.2rem;
        font-weight: 600;
        img {
          width: 0.12rem;
          height: auto;
          margin-right: 0.1rem;
        }
        > div {
          background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
          border-radius: 0.03rem;
          font-size: 0.12rem;
          padding: 0.05rem 0.1rem;
          margin-left: 0.2rem;
        }
      }
      .list {
        li {
          width: 100%;
          height: 0.75rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #535151;
          padding: 0 0.2rem;
          &:last-child {
            border-bottom: none;
          }
          div {
            font-size: 0.18rem;
            font-weight: bold;
            text-align: center;
            &:nth-child(1) {
              width: 25%;
              cursor: pointer;
              &:hover {
                color: #00b2fe;
              }
            }
            &:nth-child(2) {
              width: 50%;
            }
            &:nth-child(3) {
              width: 25%;
              text-align: right;
              i {
                margin-left: 0.1rem;
                cursor: pointer;
              }
            }
          }
        }
      }
      .footer {
        width: 100%;
        height: 0.75rem;
        background: rgba(0, 0, 0, 0.24);
        border-radius: 0 0 0.08rem 0.08rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.2rem;
        font-weight: 600;
        color: #878787;
        span {
          &.more {
            cursor: pointer;
          }
        }
      }
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
        &:nth-child(2) div:nth-child(2) {
          cursor: pointer;
          &:hover {
            color: #00b4ff;
          }
        }
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
              font-size: 0.25rem;
              margin-left: 0.1rem;
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
