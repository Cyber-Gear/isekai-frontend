import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import "./styles/reset.scss";
import "./styles/global.scss";
import "./assets/iconfonts/iconfont.css";

import utils from "./utils";
Vue.prototype.$utils = utils;

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);

import { Icon, Button, Message, Steps, Step, Dialog } from "element-ui";
Vue.use(Icon);
Vue.use(Button);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Dialog);
Vue.prototype.$message = (option: any) => {
  // option.duration = 0;
  option.offset = 100;
  option.customClass = i18n.locale == "en" ? "fontfamily_en" : "fontfamily_zh";
  // this.$message({ message: this.$t("message.message.text1") });
  // this.$message({ message: this.$t("message.message.text1"), type: "success" });
  // this.$message({ message: this.$t("message.message.text1"), type: "warning" });
  // this.$message({ message: this.$t("message.message.text1"), type: "error" });
  return Message(option);
};

const production = process.env.NODE_ENV === "production";
const aws = production ? "https://cdn.funtopia.fans/funtopia_assets_main" : "https://cdn.funtopia.fans/funtopia_assets_test";
Vue.prototype.$urlImages = aws + "/images/";
Vue.prototype.$urlVideos = aws + "/videos/";
Vue.prototype.$urlFonts = aws + "/fonts/";

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
