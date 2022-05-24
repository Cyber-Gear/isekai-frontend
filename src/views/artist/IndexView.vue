<template>
  <div class="page">
    <div class="bgbox">
      <img class="absolute1" src="../../assets/images/bg2.png" alt="" />
      <img class="absolute2" src="../../assets/images/bg3.png" alt="" />
    </div>
    <div class="box_title">
      <img src="../../assets/images/box_title1.png" alt="" />
      <span>Explore Artist</span>
    </div>
    <ul class="card_list">
      <li v-for="(item, index) in cardList" :key="index" @click="toDetail(item)">
        <div class="top"><img :src="item.image1" alt="" /></div>
        <div class="center"><img :src="item.image2" alt="" /></div>
        <div class="bottom">
          <div>{{ item.text1 }}</div>
          <div>
            <span>by </span><span> {{ item.text2 }}</span>
          </div>
          <div>{{ item.text3 }}</div>
        </div>
        <img class="angle2" src="../../assets/images/angle2.png" alt="" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ARTIST",
  data() {
    return {
      cardList: [
        {
          image1: require("../../assets/images/artist/zw/logo.png"),
          image2: require("../../assets/images/artist/zw/avatar.png"),
          text1: "Shadow&Light",
          text2: "Z.W.",
          id: "zw",
          text3:
            'Pixiv artist, game illustrator. Participated in the character setting of the Korean MOBA game "Chaos Online"; the card design of the Japanese RPG game "Blue Archive"; Switches back and forth between dark and cute & sexy style , and is good at painting the female characters in his works with a mysterious veil through the cool tones and melancholy characters.',
          //           Pixiv画师，游戏插画师。参与过韩国MOBA网游《魔狱军团》担当角色设定；日本二次元RPG游戏《碧蓝档案》卡牌绘制；
          // 暗黑系风格和纯欲风来回切换，善于通过色调清冷和人物忧郁的刻画，给作品中的女角色们蒙上了一层神秘的面纱.
        },
        {
          image1: require("../../assets/images/artist/akiha/logo.png"),
          image2: require("../../assets/images/artist/akiha/avatar.png"),
          text1: "Secret of seasons",
          text2: "Akiha",
          id: "akiha",
          text3:
            'A Korean freelance illustrator who specializes in using unique colors and shadows to express his works. A very unique use of color and light and shadow of the artist, seems to be very fond of the combination of sailor suit, beautiful girls and Japanese swords. The distinctive style of painting light and shade and color are beautiful, and the characters in the illustrations are unforgettable with their changing demeanor. He has worked on several light novel works such as "The "Hentai" Prince and the Stony Cat" and "Sister Life".',
          // 韩国自由插画师，擅长使用独特的色彩光影来表现作品画面。一位色彩以及光影的使用很独特的画师，似乎很钟意水手服、美少女和日本刀的组合。鲜明个性的画风光影和色彩都很漂亮，插画中的人物神态变化万千，让人过目难忘。曾参与多个轻小说作品绘画工作例如《变态王子和不笑猫》、《妹妹人生》
        },
        {
          image1: require("../../assets/images/artist/negoro/logo.png"),
          image2: require("../../assets/images/artist/negoro/avatar.png"),
          text1: "Fanart world",
          text2: "Negoro",
          id: "negoro",
          text3:
            'Illustrator and concept designer, once participated in the design of "Onmyoji" character painting. Featured with neat outline sketch and fresh color collocation. Keens on fanart creation. ',
          // 插画师、概念设计师，曾参与过《阴阳师》立绘设计，干净利落的线稿，色彩搭配上清新雅致。非常喜欢画同人图。
        },
        {
          image1: require("../../assets/images/artist/shikastudio/logo.png"),
          image2: require("../../assets/images/artist/shikastudio/avatar.png"),
          text1: "Cybergear",
          text2: "Shika studio",
          id: "shikastudio",
          text3:
            'Shika Studio was established in May 19, by a group of senior MAG lover, open working atmosphere makes all the team become a higher pursuit of the game. Team members have participated in several commercial MAG senior game producer such as "Girls\' Frontline", but also with the love has been carrying out independent game development passionate gamer producers. So far, the studio has developed many handheld games and has mature global operation experience.',
          // Shika工作室成立于19年5月，由一群资深的二次元爱好者，开放的工作氛围使得所有团队成为对游戏有了更高的追求。团队成员参与过多个商业化的二次元产品资深游戏人例如《少女前线》，也有凭着热爱一直在进行独立游戏开发的激情游戏人。迄今工作室已开发多款手游，拥有成熟的全球运营经验。
        },
      ],
    };
  },
  methods: {
    toDetail(item) {
      this.$router.push({ path: "artist-details", query: { key: item.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 20rem;
  padding-top: 0.8rem;
  position: relative;
}
.bgbox {
  width: 100%;
  position: absolute;
  top: 0;
  img {
    width: 100%;
    height: auto;
  }
}
.box_title {
  margin: 0.5rem 0;
}
.card_list {
  max-width: 85%;
  height: 18rem;
  overflow-y: auto;
  margin: 0 auto;
  // display: flex;
  // flex-wrap: wrap;
  // display: grid;
  // grid-gap: 5vw;
  // grid-template-columns: repeat(3, 1fr);
  li {
    float: left;
    width: 3rem;
    height: 4rem;
    margin: 0.5rem;
    overflow: hidden;
    border-radius: 0.1rem;
    border: 1px solid #514f4f;
    position: relative;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background: #2f2e38;
      box-shadow: 0.08rem 0.1rem 0.1rem 0px #000000;
      backdrop-filter: blur(0.04rem);
      .angle2 {
        opacity: 1;
      }
    }
    .angle2 {
      width: 0.1rem;
      height: auto;
      position: absolute;
      right: 0.1rem;
      bottom: 0.1rem;
      opacity: 0;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .top {
      width: 100%;
      height: 50%;
    }
    .center {
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
    .bottom {
      width: 100%;
      height: 50%;
      padding: 0.3rem 0.1rem 0.1rem 0.1rem;
      > div {
        text-align: center;
        &:nth-child(1) {
          font-size: 0.2rem;
          font-weight: 600;
        }
        &:nth-child(2) {
          font-size: 0.12rem;
          font-weight: bold;
          span {
            &:nth-child(2) {
              color: #00d6ff;
            }
          }
        }
        &:nth-child(3) {
          width: 100%;
          margin-top: 0.2rem;
          font-size: 0.12rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
