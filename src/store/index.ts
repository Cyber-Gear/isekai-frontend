import Vue from "vue";
import Vuex from "vuex";
import i18n from "../i18n/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentLanguage: i18n.locale,
    showWalletListPopup: false,
    showWalletConnectPopup: false,
    showPlayVideoPopup: { isShow: false, name: "", url: "" },
  },
  getters: {
    isEnLang(state) {
      return state.currentLanguage == "en";
    },
    getWalletListPopup(state) {
      return state.showWalletListPopup;
    },
    getWalletConnectPopup(state) {
      return state.showWalletConnectPopup;
    },
    getPlayVideoPopup(state) {
      return state.showPlayVideoPopup;
    },
  },
  mutations: {
    setWalletListPopup(state, data) {
      state.showWalletListPopup = data;
    },
    setWalletConnectPopup(state, data) {
      state.showWalletConnectPopup = data;
    },
    setPlayVideoPopup(state, data) {
      state.showPlayVideoPopup = data;
    },
  },
  actions: {},
});
