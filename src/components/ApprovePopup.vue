<template>
  <el-dialog
    center
    top="0"
    :title="'授权&购买'"
    :visible="getApprovePopup"
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    :destroy-on-close="true"
    @close="closePopup"
  >
    <div class="popupbox">
      <el-steps direction="vertical" :active="$parent.popupActive">
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
      </el-steps>
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
.popupbox {
  width: 3rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-step.is-vertical .el-step__main {
  display: flex !important;
}
</style>
