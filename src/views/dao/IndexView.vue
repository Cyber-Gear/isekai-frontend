<template>
  <div class="page">
    <div class="box">
      <div class="leftbox">
        <div class="avatar">
          <img :src="`${$urlImages}logo1.webp`" alt="" />
        </div>
        <div class="linkbox">
          <div><i class="iconfont icon-telegram"></i></div>
          <div><i class="iconfont icon-tuite"></i></div>
          <div><i class="iconfont icon-discord"></i></div>
          <div><i class="iconfont icon-medium"></i></div>
        </div>
        <!-- <div class="lis">
          <div><i class="iconfont icon-zhili"></i>{{ $t("message.dao.text1") }}</div>
          <div>123</div>
        </div> -->
        <div class="lis">
          <div><i class="iconfont icon-Customermanagement-fill"></i>{{ $t("message.dao.text2") }}</div>
          <div>{{ spaceObj.members.length }}</div>
        </div>
        <div class="btn disabled">{{ $t("message.dao.text3") }}</div>
      </div>
      <ul class="rightbox">
        <li>
          <ul>
            <li>
              <div>{{ $t("message.dao.text4") }} <span>Oxlk32...04569s</span> {{ $t("message.dao.text5") }}</div>
              <div class="status">{{ $t("message.status.text4") }}</div>
            </li>
            <li>{{ $t("message.dao.text6") }} <img :src="`${$urlImages}box_title3.webp`" alt="" /></li>
            <li>
              <pre>{{ $t("message.dao.text7") }}</pre>
            </li>
            <li>
              <div>{{ $t("message.dao.text8") }}</div>
              <!-- <div>
                <span>✔ {{ $t("message.dao.text10") }}</span>
                <span>{{ $t("message.dao.text11") }}</span>
              </div> -->
              <div class="btn" @click="toDetail(1)">{{ $t("message.dao.text12") }}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { vote } from "funtopia-sdk";

export default {
  name: "DAO",
  data() {
    return {
      spaceObj: {
        admins: [""],
        filters: { minScore: 0 },
        members: [],
        strategies: [],
        validation: {},
      },
    };
  },
  created() {
    // this.getSpace();
    this.getProposals();
  },
  methods: {
    // 获取空间
    getSpace() {
      vote
        .getSpace()
        .then((res) => {
          console.log(res.data.space);
          const space = res.data.space;
          this.spaceObj.admins = space.admins;
          this.spaceObj.filters.minScore = space.filters.minScore;
          this.spaceObj.members = space.members;
          this.spaceObj.strategies = space.strategies;
          this.spaceObj.validation = space.validation;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取提案
    getProposals() {
      const first = 10;
      const skip = 0;
      const orderBy = "created";
      const orderDirection = "desc";
      // const state = "";
      // const author = "";
      // const author_not = "";
      vote
        .getProposals(first, skip, orderBy, orderDirection)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getVotes() {
      const params = {
        first: number,
        skip: number,
        orderBy: string,
        orderDirection: string,
        // proposal?: string,
      };
      vote
        .getVotes(params)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getScores() {
      // voters: string[]
      vote
        .getScores(voters)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 投票
    castVote() {
      const params = {
        // account: string, proposal: string, choice: number
      };
      vote
        .castVote(params)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 提交提案
    createProposal() {
      const params = {
        // account: string, title: string, body: string, discussion: string, choices: string[], start: number, end: number
      };
      vote
        .createProposal(params)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toDetail(id) {
      this.$router.push({ path: "dao-details", query: { id: id } });
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
.box {
  width: fit-content;
  margin: 1rem auto;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  border: 1px solid #535151;
  backdrop-filter: blur(0.07rem);
  display: flex;
  justify-content: space-between;
  padding: 0.6rem 0.2rem;
}
.leftbox {
  width: 3rem;
  height: 4.5rem;
  background: rgba(24, 24, 28, 0.8);
  border-radius: 0.06rem;
  position: relative;
  padding: 0.8rem 0.3rem;
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
  max-height: 8rem;
  padding: 0 0.1rem;
  overflow-y: auto;
  > li {
    width: 100%;
    background: rgba(24, 24, 28, 0.8);
    border-radius: 0.06rem;
    border: 1px solid #4e4e52;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem 0 0.4rem;
    ul {
      li {
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
          .btn {
            color: #ffffff;
            background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
            border-radius: 0.07rem;
            padding: 0.1rem 0.2rem;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
