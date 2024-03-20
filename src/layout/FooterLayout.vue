<template>
  <div class="footer_box">
    <div class="center">
      <div>
        <img class="logo" src="@/assets/cdn/images/logo2.webp" alt="" />
        <div class="linklist">
          <a v-for="(item, index) in linkList" :key="index" :href="item.href || '#'">
            <img :src="item.image" alt="" />
          </a>
        </div>
      </div>
      <p>{{ $t('footer.text1') }}</p>
    </div>
  </div>
</template>
<script>
import { linkList } from '@/mock/staticdata';
export default {
  name: 'FooterLayout',
  data() {
    return {
      linkList: linkList
    };
  }
};
</script>
<style lang="scss" scoped>
.footer_box {
  width: 100%;
  height: 2rem;
  background: linear-gradient(180deg, #252637 0%, #0f0f12 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  .center {
    width: 8rem;
    text-align: center;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.2rem;
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
      letter-spacing: 0.02rem;
    }
  }
}
@media screen and (max-width: 750px) {
  .footer_box {
    width: 100%;
    height: 1rem;
    .center {
      width: 90vw;
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
        letter-spacing: 0;
      }
    }
  }
}
</style>
