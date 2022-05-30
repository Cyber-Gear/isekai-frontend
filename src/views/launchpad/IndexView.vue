<template>
  <div class="page">
    <div class="tip_box">当前项目处于上架状态</div>
    <!-- <el-button :plain="true" @click="open1">消息</el-button>
    <el-button :plain="true" @click="open2">成功</el-button>
    <el-button :plain="true" @click="open3">警告</el-button>
    <el-button :plain="true" @click="open4">错误</el-button> -->
    <div class="box">
      <div class="leftbox">
        <div class="blindbox">
          <img src="../../assets/images/blindbox.webp" alt="" />
        </div>
        <div class="tabs">
          <div class="active">品类1</div>
          <div>品类2</div>
        </div>
        <div class="info">
          <div><span>总共出售的数量</span> <span>5000个</span></div>
          <div><span>每个NFT的价格</span> <span>100U</span></div>
          <div><span>每个账号限购</span> <span>5个</span></div>
        </div>
      </div>
      <div class="rightbox">
        <div class="stepsbox">
          <el-steps :active="1" align-center>
            <el-step title="已上架" description="2022.12.21 16:20">
              <template slot="icon">
                <img src="../../assets/images/progress_img_active.webp" alt="" />
              </template>
            </el-step>
            <el-step title="开始发售" description="2022.12.21 16:20">
              <template slot="icon">
                <img src="../../assets/images/progress_img_normal.webp" alt="" />
              </template>
            </el-step>
            <el-step title="完成发售" description="2022.12.21 16:20">
              <template slot="icon">
                <img src="../../assets/images/progress_img_normal.webp" alt="" />
              </template>
            </el-step>
          </el-steps>
        </div>
        <div class="box1">
          <div class="title">
            <div><img src="../../assets/images/box_title3.webp" alt="" />NFT名称</div>
            <ul>
              <li class="active">查看</li>
              <li>分享</li>
              <li>社群</li>
              <li>官网</li>
            </ul>
          </div>
          <div class="box2">
            <div class="row">
              <pre>
                NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍vNFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍NFT介绍
              </pre>
            </div>
            <div class="row">
              <div class="hasbeenon">
                <div class="buying"><span>buying phse ends in</span></div>
                <div class="times">
                  <div>
                    <p>05</p>
                    <p>days</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>05</p>
                    <p>hours</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>05</p>
                    <p>minutes</p>
                  </div>
                  <span>:</span>
                  <div>
                    <p>05</p>
                    <p>seconds</p>
                  </div>
                </div>
              </div>
              <!-- <div class="selling">
                <div class="left">
                  <div>AMOUNT</div>
                  <div class="inputbox"><span class="span1">-</span><input type="number" value="5" /><span class="span2">+</span></div>
                  <div><span>共计：400U</span><span>0/0</span></div>
                </div>
                <div class="right">
                  <div class="btn">购买</div>
                  <div class="btn disable">已售罄</div>
                </div>
              </div> -->
            </div>
            <div class="row">
              <div>PROGRESS</div>
              <div class="progress_bar">
                <div :style="{ width: '0%' }">{{ "0%" }}</div>
              </div>
              <div>5,000 / 5,000</div>
            </div>
          </div>
        </div>
        <div class="box1">
          <div class="title">
            <div><img src="../../assets/images/box_title3.webp" alt="" />Introduction</div>
          </div>
          <div class="content">
            <pre>
              一.项目介绍
              HASHLAND是融合了多元价值资产的新型NFT资产合成平台，HASHLAND的首款合成资产融合了动漫IP和算力资源、通过比特币算力挖矿的保值收益以及gamefi的主动收益P2E。对NFT进行多种价值捕捉，为用户提供多重收益保障。

              HASHLAND现已接入200P比特币算力，每张NFT卡牌锚定1T满存算力，首批发行量为6W张NFT，60P算力，始终保有一半以上冗余，当有机器出现故障时随时可以将补上。用户无论是在市场挂单交易，还是参与游戏时，都可享受算力挖矿带来的被动收益。于此同时，NFT产出20%的BTC将流入DAO池，用于采购新的机器以实现永续的目的，即便没有新的资金流入，用户持有NFT锚定的算力也会越来越多，这对于早期参与的用户是巨大的红利。

              HASHLAND团队自研多款链游，其中包括3D即时动作ARPG、沙盒、MOBA、FPS等多种类型，无论是趣味性是游戏的丰富度都将刷新GAMEFI赛道以往记录，HASHLAND将在12月份上线1款3D即时动作ARPG游戏，其中包含PVP、PVE、GVG、GVE等模式，不同的模式奖励也不同，玩家可以通过参与游戏，获取装备、道具从而赚取平台币HC，获得不菲的收入。丰富的游戏体系以及完备的奖励模型，极有可能定义下一代GameFi赛道标准。

              二.HASHLAND优势
              1、NFT有价值资产支撑（满存、永续、保值，自有合规矿场算力超额支撑，一半以上冗余保障满算力释放收益）。
              2、有丰富的游戏场景支撑（3D即时动作ARPG、沙盒、MOBA、FPS等多种类型游戏场景、种类多、收益高、品质高）。
              3、FREE TO EARN，每个玩家注册即送2个英雄可参与游戏对战赚取收益。
              4、赛季制公平性，赛季结束游戏内英雄等级，成长属性等数据清零，保留装备等上链数据。可以让每个赛季用户都从同一起点开始竞争，不会出现长期霸服等缺点。

              三.卡牌介绍
              HashLand发售的第一批卡牌总量6W张，通过币安NFT市场、合作渠道进行发售，首批卡牌锚定比特币的永续算力。每张NFT均有2个参数，左边的是平台币HC挖矿系数，右边的是比特币BTC挖矿系数。
              单张NFT的比特币收益=BTC挖矿系数/全网BTC挖矿系数之和
              同理单张NFT的HC收益=HC挖矿系数/全网HC挖矿系数之和
              NFT有5个等级，1级最低，只可挖BTC，从2级开始可以同时产出BTC和平台币HC。不同级别的NFT在gamefi场景中也对应更高的属性。
              卡牌合成：4张同级卡消耗一定量的HC可升级为高级卡牌，升级后的卡牌在BTC、HC的挖矿系数上也会有所加成。具体合成消耗加成参数见下表。
              合成技巧：四张同样角色的卡牌合成加成会最强，四张完全不同角色的卡牌合成加成会最弱。

              卡槽
              初始赠送两个卡槽，后续卡槽需消耗HC开启，消耗HC数量依次为4，16，64 游戏中会赠送初始两名角色，玩家最低需要凑齐3位英雄方可开始游戏，即最低需要准备1张NFT，每开启一个卡槽网站中可增加一个卡牌质押位，同时游戏中可多上阵一名角色

              卡牌收益计算
              收益计算公式：
              个人APR=(每日HC产出价值+每日BTC产出价值）/（卡牌价值+个人合成卡牌消耗HC价值）*100%*365

              四.HashWarfare介绍
              Hash Warfare 是 HashLand 元宇宙中引入的第一个 3D ARPG即时战斗游戏，用户可以在其中收集、交易、挖矿、日常任务并最终通过游戏赚取收益，打造将增强元宇宙游戏未来的工具。HashWarfare游戏有多种对战模式选项，PvE探险模式、PvP玩家对决和GvG公会对战模式等。同时，HashLand平台通过调配 GameFi 生态拥有的资产，最大化资产效用，并与资产所有人分享资产的利润。其 Beta 测试将于 12 月 15 日开始。

              哈希战争游戏玩法：
              1.卡片可以进行升阶，4个同等级的NFT可以通过消耗HC组合到更高的阶位。每张卡都有不同的计算能力和初始属性。
              2.卡可以插入Hashland.com的插槽参与质押挖矿，同时，玩家依然可以使用卡牌参与gameFi中的4种战斗：PVE PVP GVE GVG
              4.玩家可以在PVE中获得少量的HC奖励，获得药水等各种道具。
            </pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LAUNCHPAD",
  data() {
    return {};
  },
  methods: {
    // open1() {
    //   this.$message({
    //     message: "这是一条消息提示",
    //     type: "info",
    //   });
    // },
    // open2() {
    //   this.$message({
    //     message: "恭喜你，这是一条成功消息",
    //     type: "success",
    //   });
    // },
    // open3() {
    //   this.$message({
    //     message: "警告哦，这是一条警告消息",
    //     type: "warning",
    //   });
    // },
    // open4() {
    //   this.$message({
    //     message: "错了哦，这是一条错误消息",
    //     type: "error",
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  padding-top: 0.8rem;
  padding-bottom: 1rem;
}
.tip_box {
  width: 11.5rem;
  height: 0.75rem;
  line-height: 0.75rem;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  backdrop-filter: blur(0.07rem);
  margin: 0.4rem auto;
  font-size: 0.2rem;
  font-weight: 600;
  color: #969494;
  text-align: center;
}
.box {
  width: 11.5rem;
  margin: 0 auto;
  height: auto;
  display: flex;
  justify-content: space-between;
}
.leftbox {
  width: 4.2rem;
  height: auto;
  .blindbox {
    width: 100%;
    height: 5rem;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 8px;
    border: 1px solid #436e77;
    backdrop-filter: blur(7px);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0.4rem;
    img {
      width: 2.3rem;
      height: auto;
    }
  }
  .tabs {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    div {
      cursor: pointer;
      width: 1.8rem;
      height: 0.45rem;
      line-height: 0.45rem;
      text-align: center;
      background: rgba(129, 129, 151, 0.19);
      border-radius: 8px;
      border: 1px solid #436e77;
      backdrop-filter: blur(0.07rem);
      font-size: 0.2rem;
      font-weight: 600;
      &.active {
        background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
      }
    }
  }
  .info {
    width: 100%;
    height: 2.4rem;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 8px;
    border: 1px solid #436e77;
    backdrop-filter: blur(7px);
    padding: 0.2rem;
    div {
      width: 100%;
      height: 33%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.2rem;
      font-weight: 600;
      border-bottom: 1px solid;
      border-image: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44)) 1 1;
      &:last-child {
        border: none;
      }
    }
  }
}

.rightbox {
  width: 6.5rem;
  height: auto;
  padding-left: 0.2rem;
  .stepsbox {
    margin-bottom: 0.4rem;
  }
  .box1 {
    width: 100%;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 8px;
    border: 1px solid #436e77;
    backdrop-filter: blur(7px);
    margin-bottom: 0.4rem;
    &:last-child {
      margin-bottom: 0;
    }
    .title {
      background: rgba(0, 0, 0, 0.41);
      border-bottom: 1px solid #436e77;
      backdrop-filter: blur(7px);
      padding: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div {
        font-size: 0.2rem;
        font-weight: 600;
        img {
          width: 0.12rem;
          height: auto;
          margin-right: 0.1rem;
        }
      }
      ul {
        display: flex;
        align-items: center;
        li {
          width: 0.5rem;
          height: 0.2rem;
          line-height: 0.2rem;
          margin-left: 0.1rem;
          background: #535363;
          border-radius: 9px;
          font-size: 12px;
          font-weight: 400;
          text-align: center;
          cursor: pointer;
          &.active {
            background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
          }
        }
      }
    }
    .box2 {
      width: 100%;
      padding: 0.2rem 0;
      .row {
        font-size: 12px;
        padding: 0 0.5rem;
        &:nth-child(1) {
          font-weight: 400;
        }
        &:nth-child(2) {
          padding: 0;
          height: 130px;
        }
        &:nth-child(3) {
          font-weight: bold;
        }
        .progress_bar {
          width: 100%;
          height: auto;
          background: #17181b;
          border-radius: 0.1rem;
          margin: 0.1rem 0;
          div {
            text-align: right;
            font-size: 0.1rem;
            font-weight: 600;
            background-image: linear-gradient(to right, rgba(0, 211, 255, 0.5), rgba(176, 108, 198, 1));
            border-radius: 0.1rem;
          }
        }
      }
      .hasbeenon {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .buying {
          width: 2.05rem;
          height: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url("../../assets/images/bg8.webp") no-repeat;
          background-size: 100% 100%;
          span {
            font-size: 12px;
            font-weight: bold;
            border-bottom: 1px solid;
            border-image: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44)) 1 1;
          }
        }
        .times {
          width: 3.4rem;
          height: 1.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: url("../../assets/images/bg9.webp") no-repeat;
          background-size: 100% 100%;
          text-align: center;
          font-weight: bold;
          span {
            font-size: 25px;
            margin: 0 0.1rem;
          }
          p {
            &:nth-child(1) {
              font-size: 25px;
            }
            &:nth-child(2) {
              font-size: 12px;
            }
          }
        }
      }
      .selling {
        padding: 0 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left {
          div {
            font-size: 12px;
            &:nth-child(1) {
              font-weight: bold;
              position: relative;
              &::before {
                content: "";
                width: 0.02rem;
                height: 100%;
                background: linear-gradient(135deg, rgba(212, 135, 241, 0.44), rgba(82, 224, 255, 0.44));
                position: absolute;
                top: 0;
                left: -0.1rem;
              }
            }
            &:nth-child(3) {
              font-weight: 400;
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
          }
          .inputbox {
            width: 1.7rem;
            height: 0.3rem;
            margin: 0.1rem 0;
            background: rgba(24, 24, 28, 0.8);
            border-radius: 6px;
            border: 1px solid #606060;
            display: flex;
            align-items: center;
            input {
              width: 100%;
              height: 100%;
              font-size: 15px;
              font-weight: 400;
              color: #ffffff;
              text-align: center;
            }
            .span1,
            .span2 {
              width: 0.5rem;
              height: 80%;
              font-size: 15px;
              font-weight: 400;
              color: #555557;
              text-align: center;
              border-image: linear-gradient(180deg, rgba(85, 85, 87, 0), rgba(85, 85, 87, 1), rgba(85, 85, 87, 1), rgba(85, 85, 87, 0)) 1 1;
              cursor: pointer;
              &:hover {
                color: #29a7e1;
              }
            }
            .span1 {
              border-right: 1px solid;
            }
            .span2 {
              border-left: 1px solid;
            }
          }
        }
        .right {
          .btn {
            width: 1.2rem;
            height: 0.3rem;
            background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
            border-radius: 6px;
            font-size: 20px;
            font-weight: 400;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &.disable {
              color: #424242;
              background: #17181b;
              cursor: not-allowed;
            }
          }
        }
      }
    }
    .content {
      width: 100%;
      height: 5rem;
      padding: 0.2rem 0.5rem;
      font-size: 12px;
      font-weight: 600;
      overflow-y: auto;
    }
  }
}
</style>
