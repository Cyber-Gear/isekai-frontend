<template>
  <el-dialog
    center
    top="0"
    :title="$t('message.approvePopup.text2') + '&' + $t('message.approvePopup.text1')"
    :visible="getApprovePopup"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="closePopup"
  >
    <div class="popupbox">
      <el-steps :active="$parent.popupActive" align-center>
        <el-step>
          <template slot="icon">
            <div class="normal_icon">
              <div class="icon1">
                <div><i class="iconfont icon-bussiness-man"></i></div>
              </div>
            </div>
          </template>
          <template slot="description">
            <div class="normal_des active">
              <div class="title">{{ $t("message.approvePopup.text3") }}</div>
              <div class="status">
                <div>{{ $parent.popupActive == 1 ? $t("message.status.text10") : $t("message.status.text11") }}</div>
              </div>
              <el-button size="small" type="primary" :loading="$parent.approvedloading" @click="toApprove">
                {{ $t("message.approvePopup.text2") }}
              </el-button>
            </div>
          </template>
        </el-step>
        <el-step>
          <template slot="icon">
            <div class="normal_icon">
              <div class="icon2" :class="{ active: $parent.popupActive == 2 }">
                <div>
                  <div><i class="iconfont icon-qianbao2-mianxing"></i></div>
                </div>
              </div>
            </div>
          </template>
          <template slot="description">
            <div class="normal_des">
              <div class="title">{{ $t("message.approvePopup.text4") }}</div>
              <div class="status">
                <div v-show="$parent.popupActive == 2">{{ $t("message.status.text10") }}</div>
              </div>
              <el-button size="small" type="primary" :disabled="$parent.popupActive == 1" :loading="$parent.buyloading" @click="toBuy">
                {{ $t("message.approvePopup.text1") }}
              </el-button>
            </div>
          </template>
        </el-step>
      </el-steps>
      <!-- <el-steps direction="vertical" :active="$parent.popupActive">
        <el-step>
          <template slot="description">
            <el-button type="primary" :disabled="$parent.popupActive == 2" :loading="$parent.approvedloading" @click="toApprove">授权</el-button>
          </template>
        </el-step>
        <el-step>
          <template slot="description">
            <el-button type="primary" :disabled="$parent.popupActive == 1" :loading="$parent.buyloading" @click="toBuy">购买</el-button>
          </template>
        </el-step>
      </el-steps> -->
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ApprovePopup",
  computed: { ...mapGetters(["getApprovePopup"]) },
  data() {
    return {};
  },

  methods: {
    toApprove() {
      this.$parent.toApprove();
    },
    toBuy() {
      this.$parent.buyBoxes();
    },
    closePopup() {
      this.$store.commit("setApprovePopup", false);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-step__main {
  margin-top: 0.2rem;
}
.popupbox {
  width: 4rem;
  padding: 0.3rem 0;
  .normal_icon {
    min-width: 0.5rem;
    min-height: 0.5rem;
    width: 0.5rem;
    height: 0.5rem;
    .icon1 {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      padding: 0.05rem;
      background: linear-gradient(90deg, rgba(68, 129, 157, 0.37) 0%, rgba(122, 100, 158, 0.37) 100%);
      > div {
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #44819d 0%, #7a649e 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          font-size: 0.35rem;
          color: #ffffff;
        }
      }
    }
    .icon2 {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      padding: 0.02rem;
      background: #5b5b5b;
      > div {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        padding: 0.02rem;
        background: #211f24;
        > div {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: #5b5b5b;
          display: flex;
          align-items: center;
          justify-content: center;
          i {
            font-size: 0.35rem;
            color: #211f24;
          }
        }
      }
      &.active {
        background: linear-gradient(90deg, rgba(68, 129, 157, 0.37) 0%, rgba(122, 100, 158, 0.37) 100%);
        > div {
          > div {
            background: linear-gradient(90deg, #44819d 0%, #7a649e 100%);
            i {
              color: #ffffff;
            }
          }
        }
      }
    }
  }
  .normal_des {
    .title {
      font-size: 12px;
      font-weight: bold;
      color: #ffffff;
    }
    .status {
      width: 1rem;
      height: 0.2rem;
      margin: 0.1rem auto;
      > div {
        width: 100%;
        height: 100%;
        font-size: 12px;
        font-weight: bold;
        color: #ffffff;
        background: linear-gradient(90deg, #44819d 0%, #7a649e 100%);
        border-radius: 4px;
      }
    }
  }
}
</style>
