<template>
  <div class="footer_box">
    <div class="center">
      <div>
        <img class="logo" src="@/assets/cdn/images/logo2.webp" alt="" />
        <div class="linklist">
          <a v-for="(item, index) in linkList" :key="index" :href="item.href">
            <img :src="item.image" alt="" />
          </a>
        </div>
      </div>
      <p>{{ $t('footer.text1') }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FooterLayout',
  data() {
    return {
      linkList: [
        {
          image: this.$urlImages + 'contact_Gitbook.webp',
          href: 'https://funtopia.gitbook.io/fun-topia/create-a-fun-metaverse/about-fun-topia'
        },
        { image: this.$urlImages + 'contact_Twitter.webp', href: 'https://twitter.com/FuntopiaNFT' },
        { image: this.$urlImages + 'contact_Discord.webp', href: 'https://discord.gg/Gtq9JsPcPN' },
        { image: this.$urlImages + 'contact_Medium.webp', href: 'https://medium.com/@funtopiagame' }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.footer_box {
  width: 100%;
  height: 3rem;
  background: linear-gradient(180deg, #252637 0%, #0f0f12 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  .center {
    width: 6.5rem;
    text-align: center;
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
    p {
      font-size: 0.15rem;
      font-weight: bold;
      line-height: 0.5rem;
      letter-spacing: 0.06rem;
    }
  }
}
@media screen and (max-width: 750px) {
  .footer_box {
    width: 100%;
    height: 1rem;
    .center {
      width: 80vw;
      > div {
        .logo {
          width: 1.5rem;
          height: auto;
        }
        .linklist {
          a {
            width: 0.2rem;
            height: 0.2rem;
            margin: 0 0.05rem;
          }
        }
      }
      p {
        font-size: 0.12rem;
        font-weight: 400;
        line-height: 0.3rem;
        letter-spacing: 0;
      }
    }
  }
}
</style>
