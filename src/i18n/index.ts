import Vue from "vue";
import VueI18n from "vue-i18n";
import utils from "../utils/index";
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: utils.getCookie("LANG") || "en",
  messages: {
    en: require("./en"),
    zh: require("./zh"),
  },
});
export default i18n;
