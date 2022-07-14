<template>
  <div class="footer_box">
    <img :src="`${$urlImages}footer_bg1.webp`" alt="" />
    <div class="center">
      <div class="top">
        <img class="logo2" :src="`${$urlImages}logo2.webp`" alt="" />
        <div class="linklist">
          <a v-for="(item, index) in linkList" :key="index" :href="item.href">
            <img :src="item.image" alt="" />
          </a>
        </div>
      </div>
      <p>{{ $t("footer.text1") }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "FooterLayout",
  data() {
    return {
      linkList: [
        { image: this.$urlImages + "contact_Gitbook.webp", href: "https://funtopia.gitbook.io/fun-topia/create-a-fun-metaverse/about-fun-topia" },
        { image: this.$urlImages + "contact_Twitter.webp", href: "https://twitter.com/FuntopiaNFT" },
        { image: this.$urlImages + "contact_Discord.webp", href: "https://discord.gg/Gtq9JsPcPN" },
        { image: this.$urlImages + "contact_Medium.webp", href: "https://medium.com/@funtopiagame" },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.footer_box {
  width: 100%;
  height: 4rem;
  background: url($urlImages + "footer_bg2.webp") no-repeat;
  background-size: 100% auto;
  text-align: center;
  border-top: 2px solid #244647;
  display: flex;
  align-items: center;
  position: relative;
  > img {
    width: 3.9rem;
    height: auto;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .center {
    width: 6rem;
    margin: 0 auto;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo2 {
        width: auto;
        height: 0.5rem;
      }
      .linklist {
        display: flex;
        a {
          width: 0.5rem;
          height: 0.5rem;
          margin: 0 0.05rem;
          background: url($urlImages + "contact_border.webp") no-repeat;
          background-size: 100% 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 55%;
            height: auto;
          }
        }
      }
    }
    p {
      margin: 0.3rem auto;
      font-size: 0.15rem;
      font-weight: bold;
      color: #c1c3c5;
      letter-spacing: 0.05rem;
    }
  }
}
@media screen and (max-width: 750px) {
  .footer_box {
    width: 100%;
    height: 1rem;
    > img {
      width: 1rem;
      height: 1.2rem;
    }
    .center {
      width: 1.8rem;
      left: 1rem;
      .top {
        .logo2 {
          width: auto;
          height: 0.2rem;
        }
        .linklist {
          a {
            width: 0.18rem;
            height: 0.18rem;
            margin: 0 0.01rem;
          }
        }
      }
      p {
        margin: 0.05rem auto;
        font-size: 0.12rem;
        font-weight: bold;
        letter-spacing: 0.01rem;
      }
    }
  }
}
</style>
