<template>
  <div class="box">
    <div class="title">Mystey Boxes</div>
    <div class="switch_box">
      <ul class="switch_list">
        <li class="active">ollection (0)</li>
        <li>on sale (0)</li>
      </ul>
      <div>
        <i class="iconfont icon-fuxuankuang-quanxuan"></i>
        <i class="iconfont icon-fuxuankuang-weiquanxuan"></i>
        Select all/Unselect
      </div>
    </div>
    <!-- <ul class="box_list">
      <li>
        <div class="leftbox">
          <img :src="`${$urlImages}blindbox.webp`" alt="" />
        </div>
        <div class="rightbox">
          <div>
            <p>Bir Mystery Box</p>
            <p>Total: <span>1</span></p>
          </div>
          <div>View All <i class="iconfont icon-fuxuankuang-quanxuan"></i></div>
        </div>
      </li>
      <li>
        <div class="leftbox">
          <img :src="`${$urlImages}blindbox.webp`" alt="" />
        </div>
        <div class="rightbox">
          <div>
            <p>Bir Mystery Box</p>
            <p>Total: <span>1</span></p>
          </div>
          <div>View All <i class="iconfont icon-fuxuankuang-quanxuan"></i></div>
        </div>
      </li>
      <li>
        <div class="leftbox">
          <img :src="`${$urlImages}blindbox.webp`" alt="" />
        </div>
        <div class="rightbox">
          <div>
            <p>Bir Mystery Box</p>
            <p>Total: <span>1</span></p>
          </div>
          <div>View All <i class="iconfont icon-fuxuankuang-quanxuan"></i></div>
        </div>
      </li>
      <li>
        <div class="leftbox">
          <img :src="`${$urlImages}blindbox.webp`" alt="" />
        </div>
        <div class="rightbox">
          <div>
            <p>Bir Mystery Box</p>
            <p>Total: <span>1</span></p>
          </div>
          <div>View All <i class="iconfont icon-fuxuankuang-quanxuan"></i></div>
        </div>
      </li>
    </ul> -->
    <ul class="card_list">
      <li>
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>aaaaaa</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>88busd</span>
              </div>
            </div>
            <div class="row2">
              <div>isekai…</div>
              <div>上次成交88busd</div>
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
      <li>
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>aaaaaa</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>88busd</span>
              </div>
            </div>
            <div class="row2">
              <div>isekai…</div>
              <div>上次成交88busd</div>
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
      <li>
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>aaaaaa</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>88busd</span>
              </div>
            </div>
            <div class="row2">
              <div>isekai…</div>
              <div>上次成交88busd</div>
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
      <li>
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>aaaaaa</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>88busd</span>
              </div>
            </div>
            <div class="row2">
              <div>isekai…</div>
              <div>上次成交88busd</div>
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
      <li>
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>aaaaaa</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>88busd</span>
              </div>
            </div>
            <div class="row2">
              <div>isekai…</div>
              <div>上次成交88busd</div>
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
      <li>
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>aaaaaa</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>88busd</span>
              </div>
            </div>
            <div class="row2">
              <div>isekai…</div>
              <div>上次成交88busd</div>
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
      <li>
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>aaaaaa</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>88busd</span>
              </div>
            </div>
            <div class="row2">
              <div>isekai…</div>
              <div>上次成交88busd</div>
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
      <li>
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>aaaaaa</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>88busd</span>
              </div>
            </div>
            <div class="row2">
              <div>isekai…</div>
              <div>上次成交88busd</div>
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
      <li>
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>aaaaaa</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>88busd</span>
              </div>
            </div>
            <div class="row2">
              <div>isekai…</div>
              <div>上次成交88busd</div>
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
      <li>
        <div class="card">
          <div class="top"><img :src="`${$urlImages}blindbox.webp`" alt="" /></div>
          <div class="center">
            <div class="row1">
              <div>
                <span>aaaaaa</span>
                <img :src="`${$urlImages}icon1.webp`" alt="" />
              </div>
              <div>
                <span>88busd</span>
              </div>
            </div>
            <div class="row2">
              <div>isekai…</div>
              <div>上次成交88busd</div>
            </div>
          </div>
        </div>
        <div class="cancel_box">
          <span>90 BUSD</span>
          <el-button type="primary">Cancel</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MysteyBoxes",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: auto;
}
.title {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.3rem;
  font-weight: bold;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  backdrop-filter: blur(7px);
  padding: 0 0.5rem;
  i {
    font-size: 0.3rem;
    margin-right: 0.1rem;
  }
}
.switch_box {
  width: 100%;
  height: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ul {
    li {
      display: inline-block;
      cursor: pointer;
      width: fit-content;
      height: 0.3rem;
      line-height: 0.3rem;
      padding: 0 0.1rem;
      font-size: 0.12rem;
      font-weight: bold;
      border-radius: 0.07rem;
      &.active {
        background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
      }
    }
  }
  > div {
    cursor: pointer;
    font-size: 0.12rem;
    font-weight: bold;
    i {
      font-size: 0.15rem;
    }
  }
}
.box_list {
  width: 100%;
  height: 8rem;
  overflow-y: auto;
  li {
    float: left;
    width: 3.9rem;
    height: fit-content;
    margin: 0 0.2rem 0.2rem 0;
    background: rgba(129, 129, 151, 0.19);
    border-radius: 0.1rem;
    border: 0.01rem solid #555555;
    backdrop-filter: blur(7px);
    padding: 0.2rem 0.1rem;
    display: flex;
    &:nth-child(2n) {
      margin-right: 0;
    }
    .leftbox {
      padding: 0.1rem;
      background: rgba(0, 0, 0, 0.32);
      border-radius: 0.1rem;
      backdrop-filter: blur(7px);
      img {
        width: 1.35rem;
        height: 1.2rem;
      }
    }
    .rightbox {
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      div {
        width: 100%;
        height: fit-content;
        margin-left: 0.1rem;
        &:nth-child(1) {
          p {
            &:nth-child(1) {
              font-size: 0.2rem;
              font-weight: bold;
              color: #ffffff;
            }
            &:nth-child(2) {
              font-size: 0.15rem;
              color: #ffffff;
              span {
                font-weight: bold;
              }
            }
          }
        }
        &:nth-child(2) {
          font-size: 0.12rem;
          color: #ffffff;
          text-align: right;
          cursor: pointer;
          i {
            font-size: 0.15rem;
          }
        }
      }
    }
  }
}

.card_list {
  width: 100%;
  height: 8rem;
  overflow-y: auto;
  li {
    float: left;
    width: 2.5rem;
    height: fit-content;
    margin: 0 0.2rem 0.2rem 0;
    &:nth-child(3n) {
      margin-right: 0;
    }
    .card {
      width: 100%;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.38);
      border: 0.01rem solid #3f3e43;
      backdrop-filter: blur(4px);
      border-radius: 0.08rem;
      .top {
        width: 100%;
        padding: 0.3rem 0;
        text-align: center;
        background: pink;
        img {
          width: 70%;
          height: auto;
        }
      }
      .center {
        padding: 0.1rem 0.05rem;
        > div {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .row1 {
          div {
            font-size: 0.12rem;
            font-weight: bold;
            color: #ffffff;
            &:nth-child(1) {
              color: #00b1ff;
              display: flex;
              align-items: center;
            }
          }
        }
        .row2 {
          div {
            font-size: 0.12rem;
            font-weight: bold;
            color: #ffffff;
            &:nth-child(2) {
              color: #6c6a71;
            }
          }
        }
      }
    }
    .cancel_box {
      width: 100%;
      height: 0.4rem;
      line-height: 0.4rem;
      background: rgba(0, 0, 0, 0.38);
      border-radius: 0.08rem;
      display: flex;
      justify-content: space-between;
      margin-top: 0.1rem;
      padding-left: 0.1rem;
      span {
        font-size: 0.15rem;
        font-weight: 400;
      }
      .el-button {
        width: 0.75rem;
        height: 0.4rem;
        font-size: 0.15rem;
        font-weight: 400;
      }
    }
  }
}
</style>
