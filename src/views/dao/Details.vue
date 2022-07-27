<template>
  <div class="page">
    <div class="banner">
      <div class="back_box">
        <div @click="goBack">
          <i class="iconfont pcfanhui"></i><span>{{ $t("btns.text1") }}</span>
        </div>
      </div>
    </div>
    <div class="contentbox" v-if="someProposals">
      <div class="leftbox">
        <div class="box1">
          <div class="title">
            <span><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ someProposals.title }}</span>
            <span>
              <template v-if="someProposals.state == 'active'"> {{ $t("status.text7") }} </template>
              <template v-if="someProposals.state == 'pending'"> {{ $t("status.text8") }} </template>
              <template v-if="someProposals.state == 'closed'"> {{ $t("status.text9") }} </template>
            </span>
          </div>
          <div class="content">
            <div class="text_image" v-for="(item, index) in proposalsInfo" :key="index">
              <pre v-if="item.type == 'text'">{{ item.text }}</pre>
              <div v-if="item.type == 'image'"><img :src="item.image" :alt="item.text" /></div>
            </div>
          </div>
          <div class="mask" v-if="oldProposalsInfo.length > 5">
            <el-button @click="showMoreProposalsInfo">
              <!-- {{ isShowMoreProposalsInfo ? $t("dao.text38") : $t("dao.text37") }} -->
              <i class="iconfont pcarrow-up" v-show="isShowMoreProposalsInfo"></i>
              <i class="iconfont pcarrow-down" v-show="!isShowMoreProposalsInfo"></i>
            </el-button>
          </div>
        </div>
        <div class="box2">
          <!-- Cast your vote -->
          <div class="box4" v-if="someProposals.state == 'active'">
            <div class="title">
              <img :src="`${$urlImages}box_title3.webp`" alt="" /><span>{{ $t("dao.text15") }}</span>
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
                <el-button type="primary" :disabled="voteBtnDisabled" @click="handleVote">{{ $t("dao.text25") }}</el-button>
              </div>
            </div>
          </div>
          <!-- Discuss -->
          <div class="box5">
            <div class="title">
              <img :src="`${$urlImages}box_title3.webp`" alt="" /><span>{{ $t("dao.text17") }}</span>
            </div>
            <div class="linkbox">
              <a :href="someProposals.discussion">{{ someProposals.discussion }}</a>
            </div>
          </div>
          <!-- Votes -->
          <div class="box6" v-if="someProposals.state !== 'pending'">
            <div class="title">
              <img :src="`${$urlImages}box_title3.webp`" alt="" /><span>{{ $t("dao.text16") }}</span>
              <div v-if="someProposals.votes">{{ someProposals.votes }}</div>
            </div>
            <ul class="list">
              <li v-for="(item, index) in votesList" :key="index">
                <div class="address" @click="voterLink(item.voter)">{{ item.voter | ellipsisWallet }}</div>
                <div>
                  <template v-if="checkboxList.length > 0">{{ checkboxList[item.choice - 1] ? checkboxList[item.choice - 1].label : "" }}</template>
                </div>
                <div>{{ item.vp | numberTally }} FUN</div>
              </li>
              <li class="nothing" v-if="votesList.length == 0">
                <div>{{ $t("dao.text39") }}</div>
              </li>
              <li class="more" v-if="hasMore">
                <span @click="getMore">{{ $t("dao.text37") }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="rightbox">
        <div class="box1">
          <div class="title"><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ $t("dao.text26") }}</div>
          <ul class="list">
            <li>
              <div>{{ $t("dao.text27") }}</div>
              <div>
                <img v-if="someProposals.space.id == 'fun-topia.eth'" :src="`${$urlImages}logo1.webp`" alt="" />
              </div>
            </li>
            <li>
              <div>{{ $t("dao.text28") }}</div>
              <div @click="ipfsLink">#{{ someProposals.ipfs | ellipsisNormal }}<i class="iconfont pcchakan"></i></div>
            </li>
            <li>
              <div>{{ $t("dao.text29") }}</div>
              <div>{{ $t("dao.text32") }}</div>
            </li>
            <li>
              <div>{{ $t("dao.text30") }}</div>
              <div>{{ $utils.formatDate(someProposals.start * 1000) }}</div>
            </li>
            <li>
              <div>{{ $t("dao.text31") }}</div>
              <div>{{ $utils.formatDate(someProposals.end * 1000) }}</div>
            </li>
            <li>
              <div>{{ $t("dao.text36") }}</div>
              <div>#{{ someProposals.snapshot | numberThousands }}</div>
            </li>
          </ul>
        </div>
        <div class="box1">
          <div class="title"><img :src="`${$urlImages}box_title3.webp`" alt="" />{{ $t("dao.text35") }}</div>
          <ul class="progressbarlist">
            <li v-for="(item, index) in resultList" :key="index">
              <div>
                <span class="text_ellipsis">{{ item.label }}</span>
                <p>
                  <span class="text_ellipsis">{{ item.amount | numberTally }} FUN</span>
                  <span>{{ item.percent | numberToFixed(2) }}%</span>
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
      oldProposalsInfo: [],
      proposalsInfo: [],
      isShowMoreProposalsInfo: false,
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
    isShowMoreProposalsInfo: {
      handler(newVal) {
        this.proposalsInfo = newVal ? this.oldProposalsInfo : this.oldProposalsInfo.slice(0, 5);
      },
      deep: true,
    },
  },
  created() {
    if (this.$route.query.id) this.getProposals(this.$route.query.id);
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
      this.oldProposalsInfo = [];
      const arr = str.split("\n");
      arr.forEach((element) => {
        const element1 = element.replaceAll("\n", "");
        if (element1) {
          // ![logo.jpeg](ipfs://QmTSKrVxnzAyGzjKryWAyun7V5ZDqBCLPNfsXH9qmYZvwn)
          // https://snapshot.mypinata.cloud/ipfs/QmTSKrVxnzAyGzjKryWAyun7V5ZDqBCLPNfsXH9qmYZvwn
          if (element1.indexOf("![") !== -1) {
            const index1 = element1.indexOf("]");
            const str1 = element1.substring(2, index1);
            const str2 = "https://snapshot.mypinata.cloud/ipfs/" + element1.substring(index1 + 9, element1.length - 1);
            this.oldProposalsInfo.push({ type: "image", text: str1, image: str2 });
          } else {
            this.oldProposalsInfo.push({ type: "text", text: element1 });
          }
        }
      });
      const flag = this.oldProposalsInfo.length > 5;
      this.proposalsInfo = !flag ? this.oldProposalsInfo : this.oldProposalsInfo.slice(0, 5);
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
      if (this.someProposals.state !== "pending") this.getVotes();
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
      if (!isCheckedItem) return this.$message({ message: this.$t("tips.text5"), type: "warning" });

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
    showMoreProposalsInfo() {
      this.isShowMoreProposalsInfo = !this.isShowMoreProposalsInfo;
    },
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
  padding: 0.8rem 0;
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
  flex-wrap: wrap;
}

.leftbox {
  width: 7.4rem;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  border: 1px solid #436e77;
  backdrop-filter: blur(0.07rem);
  .box1 {
    padding: 0 0.3rem 0.3rem 0.3rem;
    position: relative;
    .mask {
      width: 100%;
      height: 0.3rem;
      position: absolute;
      bottom: 0;
      left: 0;
      // background: rgba(0, 0, 0, 0.2);
      // backdrop-filter: blur(0.07rem);
      display: flex;
      justify-content: center;
      align-items: center;
      .el-button {
        width: 2rem;
        height: 0.3rem;
        line-height: 0.3rem;
        i {
          font-size: 0.3rem;
        }
      }
    }
    .title {
      width: 100%;
      height: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      margin-bottom: 0.2rem;
      font-size: 0.2rem;
      font-weight: 600;
      img {
        width: 0.12rem;
        height: auto;
        position: absolute;
        left: -0.25rem;
        top: 0.2rem;
      }
      span {
        &:nth-child(2) {
          color: #00b2fe;
        }
      }
    }
    .content {
      .text_image {
        margin-bottom: 0.2rem;
        pre {
          width: 100%;
          font-size: 0.15rem;
          font-weight: 300;
          color: #828182;
        }
        div img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 5rem;
        }
      }
    }
  }
  .box2 {
    padding: 0.2rem 0.3rem;
    .box4,
    .box5 {
      width: 100%;
      padding: 0 0.2rem 0.1rem 0.2rem;
      margin-bottom: 0.2rem;
      background: rgba(24, 24, 28, 0.71);
      box-shadow: 0px 6px 10px 0px rgba(22, 22, 26, 0.98);
      border-radius: 0.02rem;
      .title {
        width: 100%;
        height: 0.5rem;
        display: flex;
        align-items: center;
        font-size: 0.2rem;
        font-weight: 600;
        img {
          width: 0.12rem;
          height: auto;
          margin-right: 0.1rem;
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
            font-size: 0.2rem;
            font-weight: 300;
            padding: 0.15rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
      .btn {
        width: fit-content;
        margin: 0 auto;
        .el-button {
          width: 1.2rem;
          height: 0.5rem;
          line-height: 0.5rem;
          font-size: 0.15rem;
        }
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
      background: rgba(0, 0, 0, 0.19);
      border-radius: 0.08rem;
      border: 1px solid #4b4b4b;
      backdrop-filter: blur(0.07rem);
      .title {
        background: rgba(0, 0, 0, 0.24);
        border-radius: 0.08rem 0.08rem 0 0;
        border-bottom: 1px solid #535151;
        display: flex;
        align-items: center;
        padding: 0 0.2rem;
        width: 100%;
        height: 0.5rem;
        font-size: 0.2rem;
        font-weight: 600;
        img {
          width: 0.12rem;
          height: auto;
          margin-right: 0.1rem;
        }
        > div {
          font-size: 0.12rem;
          padding: 0.05rem 0.1rem;
          margin-left: 0.2rem;
          background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
          border-radius: 0.03rem;
        }
      }
      .list {
        min-height: 0.5rem;
        li {
          width: 100%;
          height: 0.5rem;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #535151;
          padding: 0 0.2rem;
          &:last-child {
            border-bottom: none;
          }
          > div {
            font-size: 0.18rem;
            font-weight: bold;
            text-align: center;
            .address {
              cursor: pointer;
              &:hover {
                color: #00b2fe;
              }
            }
            &:nth-child(1) {
              width: 25%;
            }
            &:nth-child(2) {
              width: 50%;
            }
            &:nth-child(3) {
              width: 25%;
              text-align: right;
            }
          }
          &.nothing {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.2rem;
            font-weight: 600;
            color: #878787;
          }
          &.more {
            width: 100%;
            background: rgba(0, 0, 0, 0.24);
            border-radius: 0 0 0.08rem 0.08rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.2rem;
            font-weight: 600;
            color: #cac8c8;
            cursor: pointer;
          }
        }
      }
    }
  }
}
.rightbox {
  width: 4rem;
  .box1 {
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
      display: flex;
      align-items: center;
      padding: 0 0.2rem;
      width: 100%;
      height: 0.5rem;
      font-size: 0.2rem;
      font-weight: 600;
      img {
        width: 0.12rem;
        height: auto;
        margin-right: 0.1rem;
      }
    }
    .list {
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
              width: auto;
              height: 0.25rem;
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
            > span {
              width: 50%;
            }
            p {
              width: 50%;
              display: flex;
              justify-content: space-between;
              span {
                &:nth-child(1) {
                  width: 65%;
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
@media screen and (max-width: 750px) {
  .page {
    width: 100%;
    padding: 0.5rem 0;
  }
  .banner {
    width: 100%;
    height: 0.5rem;
  }
  .leftbox {
    width: 90%;
    margin-bottom: 0.2rem;
    .box1 {
      padding: 0 0.2rem 0.2rem 0.2rem;
      position: relative;
      .mask {
        width: 100%;
        height: 0.2rem;
        .el-button {
          width: 1rem;
          height: 0.2rem;
          line-height: 0.2rem;
          i {
            font-size: 0.2rem;
          }
        }
      }
      .title {
        width: 100%;
        height: 0.4rem;
        margin-bottom: 0.1rem;
        font-size: 0.15rem;
        font-weight: 600;
        img {
          width: 0.07rem;
          height: auto;
          left: -0.15rem;
          top: 0.18rem;
        }
      }
      .content {
        .text_image {
          margin-bottom: 0.1rem;
          pre {
            font-size: 0.12rem;
            font-weight: 300;
          }
          div img {
            max-width: 100%;
            max-height: 1rem;
          }
        }
      }
    }
    .box2 {
      padding: 0.1rem;
      .box4,
      .box5 {
        width: 100%;
        padding: 0 0.1rem 0.1rem 0.1rem;
        margin-bottom: 0.1rem;
        .title {
          width: 100%;
          height: 0.4rem;
          font-size: 0.15rem;
          font-weight: 600;
          img {
            width: 0.07rem;
            height: auto;
            margin-right: 0.05rem;
          }
        }
      }
      .check_boxs {
        padding: 0 0.1rem;
        .gradient_border {
          margin: 0.1rem auto;
          border-radius: 0.2rem;
          div {
            border-radius: 0.2rem;
            .text {
              width: 100%;
              padding: 0.12rem 0;
              font-size: 0.15rem;
              font-weight: 300;
            }
          }
        }
        .btn {
          .el-button {
            width: 1rem;
            height: 0.35rem;
            line-height: 0.35rem;
            font-size: 0.12rem;
          }
        }
      }
      .linkbox {
        padding: 0 0.1rem;
        a {
          font-size: 0.12rem;
          font-weight: 300;
        }
      }
      .box6 {
        .title {
          width: 100%;
          height: 0.4rem;
          padding: 0 0.1rem;
          font-size: 0.15rem;
          font-weight: 600;
          img {
            width: 0.07rem;
            height: auto;
            margin-right: 0.05rem;
          }
          > div {
            font-size: 0.12rem;
            padding: 0.05rem;
            margin-left: 0.1rem;
          }
        }
        .list {
          min-height: 0.5rem;
          li {
            width: 100%;
            height: 0.5rem;
            padding: 0 0.05rem;
            > div {
              font-size: 0.12rem;
              font-weight: bold;
            }
            &.nothing {
              font-size: 0.12rem;
              font-weight: 600;
            }
            &.more {
              font-size: 0.12rem;
              font-weight: 600;
            }
          }
        }
      }
    }
  }
  .rightbox {
    width: 90%;
    .box1 {
      margin-left: 0;
      margin-bottom: 0.2rem;
      .title {
        width: 100%;
        height: 0.4rem;
        padding: 0 0.1rem;
        font-size: 0.15rem;
        font-weight: 600;
        img {
          width: 0.07rem;
          height: auto;
          margin-right: 0.05rem;
        }
      }
      .list {
        li {
          padding: 0.1rem 0.15rem;
          div {
            &:nth-child(1) {
              font-size: 0.12rem;
              font-weight: 600;
            }
            &:nth-child(2) {
              font-size: 0.12rem;
              font-weight: bold;
              img {
                width: 0.28rem;
                height: auto;
              }
              i {
                font-size: 0.15rem;
                margin-left: 0.05rem;
              }
            }
          }
        }
      }
      .progressbarlist {
        li {
          padding: 0.1rem 0.15rem;
          > div {
            &:nth-child(1) {
              font-size: 0.12rem;
              font-weight: bold;
              padding: 0.05rem 0;
            }
            &:nth-child(2) {
              height: 0.05rem;
            }
          }
        }
      }
    }
  }
}
</style>
