import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import i18n from "../i18n/index";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentLanguage: i18n.locale,
    showWalletListPopup: false,
    showWalletConnectPopup: false,
    showPlayVideoPopup: { isShow: false, name: "", url: "" },

    currentAccount: "",
    // accountInfo: { currentAccount: "", isConnected: false },
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

    getCurrentAccount(state) {
      return state.currentAccount;
    },
    // getAccountInfo(state) {
    //   return state.accountInfo;
    // },
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

    setCurrentAccount(state, data) {
      state.currentAccount = data;
    },
    // setAccountInfo(state, data) {
    //   state.accountInfo = data;
    // },
  },
  actions: {},
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      reducer(val) {
        return {
          currentAccount: val.currentAccount,
          // accountInfo: val.accountInfo,
        };
      },
    }),
  ],
});
