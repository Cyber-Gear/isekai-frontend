<template>
  <div class="home">
    <div class="row1">
      <div class="info">
        <pre>{{ $t('home.text1') }}</pre>
        <div>
          <div class="tag">{{ $t('home.text4') }}</div>
          <div class="linklist">
            <a v-for="(item, index) in linkList" :key="index" :href="item.href">
              <img :src="item.image" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row2">
      <div class="item" v-for="(item, index) in formsList" :key="index" @click="toOtherPage(item.href)">
        <div class="top">
          <img :src="item.img" alt="" />
          <i class="iconfont" :class="item.icon"></i>
        </div>
        <div class="box">
          <div class="radialbg"></div>
          <div class="item_title">{{ $t(item.text1) }}</div>
          <p>{{ $t(item.text2) }}</p>
        </div>
      </div>
    </div>
    <!-- INTRODUCTION -->
    <div class="row3">
      <div class="row_title">INTRODUCTION</div>
      <ul class="pc list">
        <li
          v-for="(item, index) in infoList"
          :key="index"
          @click="switchInfo(index)"
          :class="{ active: infoIndex == index }"
          :style="infoIndex == index ? { backgroundImage: `url(${item.logo2})` } : {}">
          <div>
            <img :src="item.avatar" alt="" />
            <div>{{ item.name }}</div>
            <pre :class="{ text_ellipsis_row_3: infoIndex !== index }">{{ $t(item.des) }}</pre>
          </div>
        </li>
      </ul>
      <div class="mobile tabbox">
        <div class="tab">
          <img
            v-for="(item, index) in infoList"
            :key="index"
            @click="switchInfo(index)"
            :class="{ active: infoIndex == index }"
            :src="item.avatar"
            alt="" />
        </div>
        <div class="card" :style="{ backgroundImage: `url(${infoList[infoIndex].logo2})` }">
          <div>
            <img :src="infoList[infoIndex].avatar" alt="" />
            <div>{{ infoList[infoIndex].name }}</div>
            <pre>{{ $t(infoList[infoIndex].des) }}</pre>
          </div>
        </div>
      </div>
    </div>
    <!-- DAO -->
    <div class="row4">
      <div class="row_title">DAO</div>
      <ul class="list">
        <li v-for="(item, index) in daoList" :key="index">
          <div class="radialbg"></div>
          <p>
            {{ $t(item.text1) }}
            <span>{{ $t('status.text9') }}</span>
          </p>
          <pre>{{ $t(item.text2) }}</pre>
          <div class="btn">
            <el-button>{{ $t(item.text3) }}</el-button>
            <div class="progress_bar">
              <div :style="{ width: item.progress }">
                <span>{{ item.progress }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- LAUNCHPAD -->
    <div class="row5">
      <div class="row_title">LAUNCHPAD</div>
      <div class="titlebox">
        <img :src="`${$urlImages}img7.webp`" alt="" />
        <pre>{{ $t('home.text3') }}</pre>
      </div>
      <div class="contentbox">
        <img :src="`${$urlImages}img8.webp`" alt="" />
        <div>
          <img :src="`${$urlImages}img9.webp`" alt="" />
          <img :src="`${$urlImages}img10.webp`" alt="" />
        </div>
      </div>
    </div>
    <!-- MARKET -->
    <div class="row6" v-if="showSwiper">
      <div class="row_title">MARKET</div>
      <swiper class="market_swiper" :options="marketOption" ref="marketSwiper">
        <swiper-slide v-for="(item, index) in marketList" :key="index">
          <div class="card">
            <img :src="item.card" alt="" />
            <span v-if="item.name">{{ $t(item.name) }}</span>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- MEDIA -->
    <div class="row7">
      <div class="row_title">MEDIA</div>
      <div class="titlebox">
        <img :src="`${$urlImages}img4.webp`" alt="" />
      </div>
      <ul class="list">
        <li v-for="(item, index) in mediasList" :key="index">
          <div class="tag">{{ $t('home.text10') }}</div>
          <div class="time">{{ item.time }}</div>
          <div class="round"></div>
          <div class="text text_ellipsis">{{ $t(item.text) }}</div>
        </li>
      </ul>
    </div>
    <!-- INVESTOR&PARTNER -->
    <!-- <div class="row8">
      <div class="row_title">INVESTOR&PARTNER</div>
      <ul>
        <li v-for="(item, index) in partnerList" :key="index">
          <img :src="item" alt="" />
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { shikastudio, zw, akiha, negoro, merlingames } from '@/mock/nftworks';
export default {
  name: 'HOME',
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
      ],
      formsList: [
        {
          href: 'https://forms.gle/zZDWkvZgGMS69LHx5',
          img: this.$urlImages + 'info1.webp',
          icon: 'pcbussiness-man',
          text1: 'home.forms[0].text1',
          text2: 'home.forms[0].text2'
        },
        {
          href: 'https://forms.gle/K9QLDqwe1m3Np7LV8',
          img: this.$urlImages + 'info2.webp',
          icon: 'pchezuo',
          text1: 'home.forms[1].text1',
          text2: 'home.forms[1].text2'
        },
        {
          href: '',
          img: this.$urlImages + 'info3.webp',
          icon: 'pctoupiao',
          text1: 'home.forms[2].text1',
          text2: 'home.forms[2].text2'
        }
      ],
      infoIndex: 0,
      infoList: [shikastudio, merlingames, akiha, negoro],
      marketList: [...shikastudio.works, ...merlingames.works],
      marketIndex: 0,
      marketOption: {
        loop: true,
        initialSlide: 0,
        effect: 'slide',
        // effect: "coverflow",
        centeredSlides: true,
        slidesPerView: 5,
        // spaceBetween: "1%",
        freeMode: true,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my_pagination',
          bulletActiveClass: 'my_pagination_active',
          clickable: true
        },
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true
        },
        on: {
          slideChange: () => {
            this.marketIndex = this.$refs.marketSwiper.swiper.activeIndex;
          }
        }
      },
      daoList: [
        {
          text1: 'home.daos[0].text1',
          text2: 'home.daos[0].text2',
          text3: 'home.daos[0].text3',
          link: '',
          progress: '88%'
        },
        {
          text1: 'home.daos[1].text1',
          text2: 'home.daos[1].text2',
          text3: 'home.daos[1].text3',
          link: '',
          progress: '68%'
        },
        {
          text1: 'home.daos[2].text1',
          text2: 'home.daos[2].text2',
          text3: 'home.daos[2].text3',
          link: '',
          progress: '68%'
        }
      ],
      mediasList: [{ time: '2022.04.13', text: 'home.medias[0].text' }],
      partnerList: [
        this.$urlImages + 'collaborators1.webp',
        this.$urlImages + 'collaborators2.webp',
        this.$urlImages + 'collaborators3.webp',
        this.$urlImages + 'collaborators4.webp',
        this.$urlImages + 'collaborators5.webp',
        this.$urlImages + 'collaborators6.webp',
        this.$urlImages + 'collaborators7.webp',
        this.$urlImages + 'collaborators8.webp',
        this.$urlImages + 'collaborators9.webp',
        this.$urlImages + 'collaborators10.webp',
        this.$urlImages + 'collaborators11.webp',
        this.$urlImages + 'collaborators12.webp',
        this.$urlImages + 'collaborators13.webp',
        this.$urlImages + 'collaborators14.webp',
        this.$urlImages + 'collaborators15.webp',
        this.$urlImages + 'collaborators16.webp'
      ],
      showSwiper: false
    };
  },
  computed: { ...mapGetters(['isEnLang']) },
  mounted() {
    setTimeout(() => {
      this.showSwiper = true;
    }, 3000);
  },
  methods: {
    toOtherPage(href) {
      if (href) window.location.href = href;
    },
    switchInfo(index) {
      this.infoIndex = index;
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  position: relative;
  background: url($urlImages + 'bg10.webp') no-repeat;
  background-size: 100% 100%;
  padding: 0.8rem 0;
}
.row1 {
  width: 11.5rem;
  margin: 1.5rem auto;
  padding-top: 1rem;
  .info {
    width: 6.5rem;
    > pre {
      font-size: 0.48rem;
      font-weight: bold;
      line-height: 0.6rem;
      letter-spacing: 0.07rem;
    }
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.2rem;
      .tag {
        width: 2.3rem;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: center;
        background: linear-gradient(136deg, #68cfe7 0%, #68cfe6 18%, #50b9d8 58%, #5967ce 100%);
        border-radius: 0.18rem;
        font-size: 0.24rem;
        font-weight: 500;
        margin-right: 0.2rem;
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
.row2 {
  width: 11.5rem;
  margin: 1.5rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .item {
    cursor: pointer;
    width: 3.2rem;
    height: 1.5rem;
    background: #2d2d35;
    border-radius: 0.2rem;
    backdrop-filter: blur(0.3rem);
    position: relative;
    &:nth-child(1) {
      .top {
        position: absolute;
        top: -0.34rem;
        left: -0.2rem;
        img {
          width: 0.96rem;
          height: 0.68rem;
        }
        .iconfont {
          font-size: 0.35rem;
          position: absolute;
          top: 0.05rem;
          left: 0.3rem;
        }
      }
    }
    &:nth-child(2),
    &:nth-child(3) {
      .top {
        position: absolute;
        top: -0.34rem;
        left: -0.2rem;
        img {
          width: 0.72rem;
          height: 0.69rem;
        }
        .iconfont {
          font-size: 0.4rem;
          position: absolute;
          top: 0.12rem;
          left: 0.15rem;
        }
      }
    }
    &:nth-child(2) .box .radialbg {
      background-image: radial-gradient(circle, #6a1f67 0%, rgba(44, 44, 51, 0.34) 62%, rgba(45, 45, 53, 0) 100%);
    }
    &:nth-child(3) .box .radialbg {
      background-image: radial-gradient(circle, #684214 0%, rgba(44, 44, 51, 0.4) 77%, rgba(45, 45, 53, 0) 100%);
    }
    .box {
      position: relative;
      padding: 0.1rem;
      overflow: hidden;
      .radialbg {
        width: 1.6rem;
        height: 1.6rem;
        background-image: radial-gradient(circle, #3a519e 0%, #2a3764 40%, #2b2d3b 64%, #2c2c33 81%, #2d2d35 100%);
        position: absolute;
        top: -0.5rem;
        left: -0.5rem;
        z-index: -1;
      }
      .item_title {
        font-size: 0.2rem;
        font-weight: bold;
        line-height: 0.3rem;
        margin-top: 0.4rem;
      }
      p {
        font-size: 0.14rem;
        font-weight: 500;
        line-height: 0.2rem;
      }
    }
  }
}
.row_title {
  text-align: center;
  font-size: 0.36rem;
  font-weight: bold;
  color: #53d0ff;
  margin-bottom: 0.5rem;
}
.row3 {
  width: 11.5rem;
  margin: 1.5rem auto;
  .list {
    width: 100%;
    height: 4.5rem;
    display: flex;
    align-items: center;
    li {
      cursor: pointer;
      width: 25%;
      height: 2.5rem;
      background: linear-gradient(180deg, #2d2d35 0%, #2d2d35 100%);
      border: 0.01rem solid #5b5b6c;
      transition: all 0.3s;
      &:nth-child(1) {
        border-radius: 0.14rem 0 0 0.14rem;
      }
      &:nth-child(4) {
        border-radius: 0 0.14rem 0.14rem 0;
      }
      > div {
        width: 100%;
        height: 100%;
        padding: 0.2rem;
        img {
          width: 0.5rem;
          height: 0.5rem;
        }
        div {
          font-size: 0.21rem;
          font-weight: bold;
          color: #757582;
          line-height: 0.5rem;
        }
        pre {
          font-size: 0.14rem;
          font-weight: 600;
          color: #757582;
          line-height: 0.18rem;
        }
      }
      &.active {
        border: none;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        border-radius: 0;
        > div {
          backdrop-filter: blur(0.05rem);
          div,
          pre {
            color: #ffffff;
          }
        }
      }
    }
  }
}
.row4 {
  width: 9.5rem;
  margin: 1.5rem auto;
  .list {
    li {
      background: #2d2d35;
      box-shadow: 0rem 0.14rem 0.27rem -0.08rem rgba(0, 0, 0, 0.49);
      border-radius: 0.2rem;
      backdrop-filter: blur(31px);
      padding: 0.2rem 0.4rem;
      margin-bottom: 0.4rem;
      position: relative;
      overflow: hidden;
      .radialbg {
        width: 2.4rem;
        height: 2.4rem;
        background-image: radial-gradient(
          circle,
          rgba(58, 81, 158, 1),
          rgba(58, 81, 158, 0.6),
          rgba(58, 81, 158, 0.4),
          rgba(44, 44, 51, 0),
          rgba(44, 44, 51, 0)
        );
        position: absolute;
        top: -1.2rem;
        left: 0.2rem;
        z-index: -1;
      }
      p {
        font-size: 0.2rem;
        font-weight: bold;
        line-height: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: 0.12rem;
          font-weight: 400;
          color: #53d0ff;
        }
      }
      pre {
        font-size: 0.14rem;
        font-weight: 500;
        line-height: 0.2rem;
        margin: 0.2rem 0;
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-button {
          width: 1.5rem;
          height: 0.3rem;
        }
        .progress_bar {
          width: 2.5rem;
          height: 0.05rem;
          background: #000;
          border-radius: 0.05rem;
          div {
            position: relative;
            width: 80%;
            height: 100%;
            background: linear-gradient(134deg, rgba(0, 211, 255, 1), rgba(176, 108, 198, 1));
            border-radius: 0.05rem;
            span {
              position: absolute;
              right: 0;
              bottom: 0.05rem;
              font-size: 0.12rem;
            }
          }
        }
      }
    }
  }
}
.row5 {
  width: 9.5rem;
  margin: 1.5rem auto;
  .titlebox {
    width: 100%;
    padding: 0.2rem 0.4rem;
    display: flex;
    align-items: center;
    background: #2d2d35;
    box-shadow: 0rem 0.14rem 0.27rem -0.08rem rgba(0, 0, 0, 0.49);
    border-radius: 0.2rem;
    backdrop-filter: blur(31px);
    margin-bottom: 0.5rem;
    img {
      width: 2rem;
      height: auto;
    }
    pre {
      font-size: 0.2rem;
      font-weight: 500;
      line-height: 0.27rem;
    }
  }
  .contentbox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    > img {
      width: 44%;
      height: 5.5rem;
    }
    > div {
      width: 54%;
      img {
        display: block;
        width: 100%;
        height: 2.7rem;
        &:nth-child(1) {
          margin-bottom: 0.1rem;
        }
      }
    }
  }
}
.row6 {
  width: 100%;
  margin: 1.5rem auto;
  .market_swiper {
    width: 100%;
    padding-bottom: 0.5rem;
    .swiper-slide {
      width: fit-content;
      height: fit-content;
      transition: all 0.3s;
      transform: scale(0.8);
      &.swiper-slide-next,
      &.swiper-slide-prev {
        transform: scale(0.9);
      }
      &.swiper-slide-active {
        transform: scale(1);
      }
      .card {
        // width: 3.4rem;
        // height: 5.3rem;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        span {
          font-size: 0.15rem;
          font-weight: 400;
          position: absolute;
          top: 8%;
          left: 8%;
        }
      }
    }
    /deep/ .swiper-pagination {
      display: flex;
      justify-content: center;
      .my_pagination {
        cursor: pointer;
        width: 0.1rem;
        height: 0.1rem;
        background: #636370;
        border-radius: 0.1rem;
        margin: 0 0.1rem;
      }
      .my_pagination_active {
        background: linear-gradient(90deg, rgba(228, 138, 255, 1), rgba(79, 149, 255, 1));
      }
    }
  }
}

.row7 {
  width: 9.5rem;
  margin: 1.5rem auto;
  .titlebox {
    img {
      width: 100%;
      height: auto;
    }
  }
  .list {
    li {
      width: 100%;
      height: 0.5rem;
      line-height: 0.5rem;
      display: flex;
      align-items: center;
      border-bottom: 0.01rem solid #979797;
      font-size: 0.15rem;
      font-weight: bold;
      cursor: pointer;
      .time {
        margin-right: 0.1rem;
      }
      .tag {
        overflow: hidden;
        width: 0;
        height: 0.35rem;
        line-height: 0.35rem;
        text-align: center;
        background: linear-gradient(136deg, #68cfe7 0%, #68cfe6 18%, #50b9d8 58%, #5967ce 100%);
        border-radius: 0.18rem;
        transition: all 0.3s;
      }
      .round {
        width: 0;
        height: 0.17rem;
        background: linear-gradient(136deg, #68cfe7 0%, #68cfe6 18%, #50b9d8 58%, #5967ce 100%);
        border-radius: 50%;
        transition: all 0.3s;
      }
      &:hover,
      &.active {
        .tag {
          width: 1.6rem;
          margin-right: 0.1rem;
        }
        .round {
          min-width: 0.17rem;
          margin-right: 0.1rem;
        }
      }
    }
  }
}
.row8 {
  width: 9.5rem;
  margin: 0 auto;
  ul {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    li {
      width: 25%;
      padding: 0.2rem;
      img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .home {
    padding: 0.5rem 0;
  }
  .row1 {
    width: 90vw;
    margin: 0.5rem auto;
    padding-top: 0.5rem;
    .info {
      width: 100%;
      > pre {
        font-size: 0.22rem;
        line-height: 0.3rem;
        letter-spacing: 0.05rem;
      }
      > div {
        margin-top: 0.2rem;
        .tag {
          width: 1.5rem;
          height: 0.3rem;
          line-height: 0.3rem;
          border-radius: 0.3rem;
          font-size: 0.15rem;
          margin-right: 0.1rem;
        }
        .linklist {
          a {
            width: 0.3rem;
            height: 0.3rem;
            margin: 0 0.05rem;
          }
        }
      }
    }
  }
  .row2 {
    width: 90vw;
    margin: 0.5rem auto;
    justify-content: center;
    flex-wrap: wrap;
    .item {
      width: 90%;
      height: 0.9rem;
      border-radius: 0.1rem;
      margin-bottom: 0.2rem;
      &:nth-child(1) {
        .top {
          top: -0.15rem;
          left: -0.1rem;
          img {
            width: 0.49rem;
            height: 0.34rem;
          }
          .iconfont {
            font-size: 0.14rem;
            top: 0.05rem;
            left: 0.18rem;
          }
        }
      }
      &:nth-child(2),
      &:nth-child(3) {
        .top {
          top: -0.15rem;
          left: -0.08rem;
          img {
            width: 0.34rem;
            height: 0.33rem;
          }
          .iconfont {
            font-size: 0.17rem;
            top: 0.08rem;
            left: 0.08rem;
          }
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
      .box {
        padding: 0.1rem;
        .radialbg {
          width: 1rem;
          height: 1rem;
          top: -0.2rem;
          left: -0.2rem;
        }
        .item_title {
          font-size: 0.14rem;
          line-height: 0.18rem;
          margin-top: 0.1rem;
        }
        p {
          font-size: 0.12rem;
          font-weight: 500;
          line-height: 0.2rem;
        }
      }
    }
  }
  .row_title {
    text-align: center;
    font-size: 0.25rem;
    font-weight: bold;
    color: #53d0ff;
    margin-bottom: 0.3rem;
  }
  .row3 {
    width: 80vw;
    margin: 0.5rem auto;
    .tabbox {
      flex-wrap: wrap;
      .tab {
        width: 100%;
        margin-bottom: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        img {
          width: 0.41rem;
          height: auto;
          opacity: 0.3;
          &.active {
            opacity: 1;
          }
        }
      }
      .card {
        width: 100%;
        height: 3.8rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        > div {
          width: 100%;
          height: 100%;
          padding: 0.4rem 0.2rem;
          backdrop-filter: blur(0.05rem);
          img {
            width: 0.45rem;
            height: auto;
          }
          div {
            font-size: 0.12rem;
            font-weight: bold;
            line-height: 0.18rem;
            margin-bottom: 0.1rem;
          }
          pre {
            font-size: 0.12rem;
            font-weight: 500;
            line-height: 0.15rem;
          }
        }
      }
    }
  }
  .row4 {
    width: 90vw;
    margin: 0.5rem auto;
    .list {
      li {
        margin-bottom: 0.2rem;
        border-radius: 0.1rem;
        padding: 0.1rem 0.2rem;
        .radialbg {
          width: 1.4rem;
          height: 1.4rem;
          top: -0.6rem;
          left: 0.2rem;
        }
        p {
          font-size: 0.16rem;
          line-height: 0.25rem;
        }
        pre {
          font-size: 0.12rem;
          line-height: 0.15rem;
          margin: 0.1rem 0;
        }
        .btn {
          .el-button {
            width: 0.8rem;
            height: 0.3rem;
          }
          .progress_bar {
            width: 1.2rem;
            height: 0.05rem;
          }
        }
      }
    }
  }
  .row5 {
    width: 90vw;
    margin: 0.5rem auto;
    .titlebox {
      width: 100%;
      padding: 0.1rem;
      border-radius: 0.1rem;
      margin-bottom: 0.2rem;
      img {
        width: 0.6rem;
        height: auto;
      }
      pre {
        font-size: 0.12rem;
        font-weight: 500;
        line-height: 0.15rem;
      }
    }
    .contentbox {
      > img {
        height: 1.85rem;
      }
      > div {
        img {
          height: 0.9rem;
          &:nth-child(1) {
            margin-bottom: 0.05rem;
          }
        }
      }
    }
  }
  .row6 {
    width: 100vw;
    margin: 0.5rem auto;
    .market_swiper {
      padding-bottom: 0.3rem;
      .swiper-slide {
        .card {
          span {
            font-size: 0.12rem;
            top: 3%;
            left: 8%;
          }
        }
      }
      /deep/ .swiper-pagination {
        .my_pagination {
          width: 0.08rem;
          height: 0.08rem;
          border-radius: 0.08rem;
          margin: 0 0.05rem;
        }
      }
    }
  }

  .row7 {
    width: 90vw;
    margin: 0.5rem auto;
    .list {
      li {
        width: 100%;
        height: 0.35rem;
        line-height: 0.35rem;
        font-size: 0.12rem;
        font-weight: 500;
        .time {
          margin-right: 0.05rem;
        }
        .tag {
          height: 0.2rem;
          line-height: 0.2rem;
          border-radius: 0.2rem;
        }
        .round {
          height: 0.1rem;
        }
        &:hover,
        &.active {
          .tag {
            width: 1.6rem;
            margin-right: 0.05rem;
          }
          .round {
            min-width: 0.1rem;
            margin-right: 0.05rem;
          }
        }
      }
    }
  }
  .row8 {
    width: 90vw;
    margin: 0 auto;
    ul {
      li {
        width: 25%;
        padding: 0.1rem;
      }
    }
  }
}
</style>
