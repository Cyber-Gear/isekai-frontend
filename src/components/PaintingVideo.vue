<template>
  <el-dialog
    center
    top="0"
    :title="getPlayVideoPopup.name"
    :visible.sync="getPlayVideoPopup.isShow"
    :modal-append-to-body="false"
    :destroy-on-close="true"
  >
    <div class="popupbox">
      <video loop autoplay muted>
        <source :src="getPlayVideoPopup.url" type="video/mp4" />
      </video>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "PaintingVideo",
  computed: { ...mapGetters(["getPlayVideoPopup"]) },
};
</script>

<style lang="scss" scoped>
.popupbox {
  width: 5rem;
  height: 5rem;
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
