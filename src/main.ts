import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import "./styles/reset.scss";
import "./styles/global.scss";
import "./assets/iconfonts/iconfont.css";

import utils from "./utils/index";
Vue.prototype.$utils = utils;

import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
Vue.use(VueAwesomeSwiper);

import { Icon, Button, Message, Steps, Step, Dialog, Collapse, CollapseItem, Tag, Select, Option } from "element-ui";
Vue.use(Icon);
Vue.use(Button);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Dialog);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Tag);
Vue.use(Select);
Vue.use(Option);

Vue.prototype.$message = (option: any) => {
  option.offset = 200;
  option.customClass = i18n.locale == "en" ? "fontfamily_en" : "fontfamily_zh";
  // this.$message({ message: this.$t("message.message.text1") });
  // this.$message({ message: this.$t("message.message.text1"), type: "success" });
  // this.$message({ message: this.$t("message.message.text1"), type: "warning" });
  // this.$message({ message: this.$t("message.message.text1"), type: "error" });
  return Message(option);
};

const isProd = process.env.NODE_ENV == "production";
const cdn = isProd ? "//cdn.funtopia.io/funtopia_assets_main/" : "//cdn.funtopia.io/funtopia_assets_test/";
Vue.prototype.$urlImages = cdn + "images/";
Vue.prototype.$urlVideos = cdn + "videos/";

import filters from "./utils/filters";
Vue.filter("ellipsisWallet", filters["ellipsisWallet"]);
Vue.filter("ellipsisIpfs", filters["ellipsisIpfs"]);
Vue.filter("thousandthsNumber", filters["thousandthsNumber"]);

// Object.keys(filters).forEach((key) => {
//   Vue.filter(key, filters[key]);// 报错
// });

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
