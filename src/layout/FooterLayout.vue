<template>
  <div class="footer_box">
    <div class="center">
      <div>
        <img class="logo" src="@/assets/images/logo2.webp" alt="" />
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
  background: url("~@/assets/images/bg11.webp") no-repeat;
  background-size: 100% auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .center {
    p {
      font-size: 0.15rem;
      font-weight: bold;
      line-height: 0.5rem;
      letter-spacing: 0.06rem;
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .logo {
        width: 2.95rem;
        height: auto;
      }
      .linklist {
        display: flex;
        a {
          width: 0.35rem;
          height: 0.35rem;
          background: linear-gradient(90deg, rgba(143, 179, 234, 0.53) 0%, rgba(97, 103, 195, 0.53) 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 0.1rem;
          img {
            width: 60%;
            height: auto;
          }
        }
      }
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
