<template>
  <div class="page">
    <div class="box">
      <div class="popup">
        <i class="iconfont icon-guanbi close_btn" @click="closeWalletPopup"></i>
        <div class="title1">CONNECT WALLET</div>
        <div class="title2">By connecting your wallet,you agree to <span>Fun Topia</span></div>
        <ul>
          <li>
            <img src="../assets/images/wallet_MetaMaskFox.png" alt="" />
            Metamask
          </li>
          <li>
            <img src="../assets/images/wallet_TokenPocet.png" alt="" />
            Wallet Connect
          </li>
          <li>
            <img src="../assets/images/wallet_WalletConnect.png" alt="" />
            Token Pocet
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WalletPopup",
  methods: {
    closeWalletPopup() {
      this.$parent.isShowWalletPopup = false;
      this.$utils.restoreTheScroll();
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(0.1rem);
  .box {
    width: 100%;
    height: 100%;
    background: url("../assets/images/bg2.png") no-repeat;
    background-size: 100% auto;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.popup {
  width: 4.8rem;
  height: auto;
  padding: 0.2rem 0;
  background: #211f24;
  border-radius: 0.2rem;
  border: 1px solid #504e4e;
  text-align: center;
  position: relative;
  .close_btn {
    cursor: pointer;
    display: block;
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    font-size: 0.35rem;
    transition: all 0.3s;
    &:hover {
      color: #00b4ff;
      transform: scale(0.8);
    }
  }
  .title1 {
    font-size: 0.2rem;
    font-weight: bold;
  }
  .title2 {
    font-size: 0.12rem;
    font-weight: bold;
    margin: 0.3rem 0;
    span {
      font-weight: 600;
      color: #00b4ff;
      border-bottom: 1px solid #00b4ff;
      margin-left: 0.2rem;
      cursor: pointer;
    }
  }
  ul {
    li {
      cursor: pointer;
      margin: 0.25rem auto;
      width: 3.6rem;
      height: 0.45rem;
      background: #211f24;
      border-radius: 0.1rem;
      border: 1px solid #413f3f;
      font-size: 0.12rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
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
