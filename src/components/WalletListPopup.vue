<template>
  <el-dialog
    center
    top="0"
    :title="$t('message.walletPopup.text5')"
    :visible="getWalletListPopup"
    :modal-append-to-body="false"
    :destroy-on-close="true"
    @close="closePopup"
  >
    <!-- :visible.sync="getwalletstatus" -->
    <div class="popupbox">
      <div class="title">{{ $t("message.walletPopup.text6") }}<span>Fun Topia</span></div>
      <ul>
        <li v-for="(item, index) in walletArr" :key="index" @click="walletClick(item.walletType)">
          <img :src="item.image" alt="" />
          {{ item.name }}
        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { wallet, network, util } from "funtopia-sdk";
export default {
  name: "WalletListPopup",
  computed: { ...mapGetters(["getWalletListPopup"]), ...mapGetters(["getWalletAccount"]) },
  data() {
    return {
      walletArr: [
        { name: "Metamask", walletType: "metamask", image: this.$urlImages + "wallet_MetaMaskFox.webp" }, //metamask
        { name: "TokenPocet", walletType: "metamask", image: this.$urlImages + "wallet_TokenPocet.webp" }, //metamask
        { name: "WalletConnect", walletType: "walletconnect", image: this.$urlImages + "wallet_WalletConnect.webp" }, //walletconnect
      ],
    };
  },
  methods: {
    // 连接钱包弹窗方法
    walletClick(walletType) {
      this.walletConnect(walletType);
    },
    closePopup() {
      this.$store.commit("setWalletListPopup", false);
    },
    /**
     * 获取当前连接的钱包地址
     * @  wallet.getCurrentAccount() 获取当前连接的钱包地址
     */
    // getCurrentAccount() {
    //   wallet
    //     .getCurrentAccount()
    //     .then((res) => {
    //       this.handleAccountsChanged(res);
    //     })
    //     .catch((err) => {
    //       console.error("获取当前连接帐户失败！", err);
    //     });
    // },
    /**
     * 连接钱包
     * @param walletType string 准备连接的钱包类型
     * @  wallet.getAccount() 获取已连接的钱包地址
     * @  wallet.getChainId() 获取已连接的网络ID
     * @  onAccountChanged  监听帐户变化
     * @  onChainChanged  监听网络变化
     * @  onDisconnect  监听断开连接
     */
    async walletConnect(walletType) {
      await wallet
        .getAccount(walletType)
        .then(this.handleAccountsChanged)
        .catch((err) => {
          if (err.code === 4001) {
            console.log("如果发生这种情况，用户拒绝了连接请求");
          } else {
            console.error("wallet.getAccount()", err);
          }
        });
      await wallet
        .getChainId()
        .then(this.handleChainChanged)
        .catch((err) => {
          console.error("wallet.getChainId()", err);
        });
      wallet.onAccountChanged(this.handleAccountsChanged);
      wallet.onChainChanged(this.handleChainChanged);
    },
    /**
     * 帐户变化触发方法
     * @param accounts string[] 已连接的钱包地址
     */
    handleAccountsChanged(accounts) {
      // 关闭对应的弹窗
      if (this.getWalletListPopup) this.closePopup();
      if (accounts.length === 0) {
        this.$message({ message: this.$t("message.dao.text2"), type: "warning" });
      } else if (accounts[0] !== this.getWalletAccount) {
        this.$message({ message: this.$t("message.dao.text3"), type: "success" });
        this.$store.commit("setWalletAccount", util.getAddress(accounts[0]));
      }
    },
    /**
     * 网络变化触发方法
     * @param chainId string 已连接的网络ID
     * @  network() sdk网络的网络配置
     */
    handleChainChanged(chainId) {
      // console.log("网络变化为", chainId, network("production"));
      if (network().chainId !== chainId) {
        this.$message({ message: this.$t("message.dao.text4"), type: "warning" });
        wallet.addChain();
      }
    },
    /**
     * 断开连接
     * @  wallet.disconnect() 断开连接
     */
    walletDisconnect() {
      // wallet.disconnect();
      this.$store.commit("setWalletAccount", "");
    },
  },
};
</script>

<style lang="scss" scoped>
.popupbox {
  width: 4.5rem;
  color: #ffffff;
  font-size: 0.12rem;
  font-weight: 600;
  .title {
    text-align: center;
    font-weight: bold;
    margin-bottom: 0.3rem;
    span {
      font-weight: 600;
      color: #00b4ff;
      border-bottom: 1px solid #00b4ff;
      margin-left: 0.1rem;
      cursor: pointer;
    }
  }
  ul {
    width: fit-content;
    margin: 0 auto;
    li {
      width: 3.5rem;
      height: 0.5rem;
      margin-bottom: 0.2rem;
      background: #211f24;
      border-radius: 0.1rem;
      border: 1px solid #413f3f;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: linear-gradient(90deg, #38697f 0%, #5d4c78 100%);
      }
      img {
        width: auto;
        height: 0.3rem;
        margin-right: 0.1rem;
      }
    }
  }
}
</style>
