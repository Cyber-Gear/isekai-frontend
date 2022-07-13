<template>
  <div class="footer_box">
    <img :src="`${$urlImages}footer_bg1.webp`" alt="" />
    <div class="center">
      <div class="top">
        <img :src="`${$urlImages}logo2.webp`" alt="" />
        <div class="linklist">
          <a href="https://funtopia.gitbook.io/fun-topia/create-a-fun-metaverse/about-fun-topia">
            <img :src="`${$urlImages}contact1.webp`" alt="" />
          </a>
          <a href="https://twitter.com/FuntopiaNFT"><img :src="`${$urlImages}contact2.webp`" alt="" /></a>
          <a href="https://discord.gg/Gtq9JsPcPN"><img :src="`${$urlImages}contact3.webp`" alt="" /></a>
          <a href="https://medium.com/@funtopiagame"><img :src="`${$urlImages}contact4.webp`" alt="" /></a>
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
    return {};
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
    width: 7rem;
    margin: 0 auto;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      > img {
        width: 3rem;
        height: 0.5rem;
      }
      .linklist {
        img {
          width: 0.5rem;
          height: 0.5rem;
          margin: 0 0.05rem;
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
        > img {
          width: 0.78rem;
          height: 0.13rem;
        }
        .linklist {
          img {
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
