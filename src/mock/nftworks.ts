import Vue from "vue";
const urlImages = Vue.prototype.$urlImages;
const urlNfts = Vue.prototype.$urlNfts;
export const shikastudio = {
  // logo 作品集大图
  // avatar 画师头像
  // title 作品集标题
  // name 画师名字
  // des 画师描述
  id: "shikastudio",
  name: "Shika studio",
  banner: urlImages + "ShikaStudio/banner.webp",
  logo: urlImages + "ShikaStudio/logo.webp",
  avatar: urlImages + "ShikaStudio/avatar.webp",
  avatar2: urlImages + "ShikaStudio/avatar2.webp",
  title: "nftworks.shikastudio.title",
  des: "nftworks.shikastudio.des",
  works: [
    // logo 卡牌大头贴
    // name 卡牌名称
    // card 卡牌图
    // card2 卡牌背景图
    // attribute 属性
    // level 等级
    // starlevel 星级
    // rarity 稀有度
    // worddes 作品介绍
    // nftdes NFT介绍
    {
      id: 1,
      logo: urlImages + "ShikaStudio/Katarina.webp",
      card: urlNfts + "ShikaStudio/hero1.webp",
      card2: urlImages + "ShikaStudio/Katarina-2.webp",
      video: urlNfts + "ShikaStudio/hero1.mp4",
      rarity: "R",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[0].name",
      attribute: "nftworks.shikastudio.works[0].attribute",
      worddes: "nftworks.shikastudio.works[0].worddes",
      nftdes: "nftworks.shikastudio.works[0].nftdes",
    },
    {
      id: 2,
      logo: urlImages + "ShikaStudio/Asuka.webp",
      card2: urlImages + "ShikaStudio/Asuka-2.webp",
      card: urlNfts + "ShikaStudio/hero2.webp",
      video: urlNfts + "ShikaStudio/hero2.mp4",
      rarity: "R",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[1].name",
      attribute: "nftworks.shikastudio.works[1].attribute",
      worddes: "nftworks.shikastudio.works[1].worddes",
      nftdes: "nftworks.shikastudio.works[1].nftdes",
    },
    {
      id: 3,
      logo: urlImages + "ShikaStudio/Carol.webp",
      card2: urlImages + "ShikaStudio/Carol-2.webp",
      card: urlNfts + "ShikaStudio/hero3.webp",
      video: urlNfts + "ShikaStudio/hero3.mp4",
      rarity: "R",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[2].name",
      attribute: "nftworks.shikastudio.works[2].attribute",
      worddes: "nftworks.shikastudio.works[2].worddes",
      nftdes: "nftworks.shikastudio.works[2].nftdes",
    },
    {
      id: 4,
      logo: urlImages + "ShikaStudio/Una.webp",
      card2: urlImages + "ShikaStudio/Una-2.webp",
      card: urlNfts + "ShikaStudio/hero4.webp",
      video: urlNfts + "ShikaStudio/hero4.mp4",
      rarity: "SR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[3].name",
      attribute: "nftworks.shikastudio.works[3].attribute",
      worddes: "nftworks.shikastudio.works[3].worddes",
      nftdes: "nftworks.shikastudio.works[3].nftdes",
    },
    {
      id: 5,
      logo: urlImages + "ShikaStudio/Rin.webp",
      card2: urlImages + "ShikaStudio/Rin-2.webp",
      card: urlNfts + "ShikaStudio/hero5.webp",
      video: urlNfts + "ShikaStudio/hero5.mp4",
      rarity: "SR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[4].name",
      attribute: "nftworks.shikastudio.works[4].attribute",
      worddes: "nftworks.shikastudio.works[4].worddes",
      nftdes: "nftworks.shikastudio.works[4].nftdes",
    },
    {
      id: 6,
      logo: urlImages + "ShikaStudio/Shino.webp",
      card2: urlImages + "ShikaStudio/Shino-2.webp",
      card: urlNfts + "ShikaStudio/hero6.webp",
      video: urlNfts + "ShikaStudio/hero6.mp4",
      rarity: "SR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[5].name",
      attribute: "nftworks.shikastudio.works[5].attribute",
      worddes: "nftworks.shikastudio.works[5].worddes",
      nftdes: "nftworks.shikastudio.works[5].nftdes",
    },
    {
      id: 7,
      logo: urlImages + "ShikaStudio/Rika.webp",
      card2: urlImages + "ShikaStudio/Rika-2.webp",
      card: urlNfts + "ShikaStudio/hero7.webp",
      video: urlNfts + "ShikaStudio/hero7.mp4",
      rarity: "UR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[6].name",
      attribute: "nftworks.shikastudio.works[6].attribute",
      worddes: "nftworks.shikastudio.works[6].worddes",
      nftdes: "nftworks.shikastudio.works[6].nftdes",
    },
    {
      id: 8,
      logo: urlImages + "ShikaStudio/Maki.webp",
      card2: urlImages + "ShikaStudio/Maki-2.webp",
      card: urlNfts + "ShikaStudio/hero8.webp",
      video: urlNfts + "ShikaStudio/hero8.mp4",
      rarity: "UR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[7].name",
      attribute: "nftworks.shikastudio.works[7].attribute",
      worddes: "nftworks.shikastudio.works[7].worddes",
      nftdes: "nftworks.shikastudio.works[7].nftdes",
    },
    {
      id: 9,
      logo: urlImages + "ShikaStudio/Tina.webp",
      card2: urlImages + "ShikaStudio/Tina-2.webp",
      card: urlNfts + "ShikaStudio/hero9.webp",
      video: urlNfts + "ShikaStudio/hero9.mp4",
      rarity: "UR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[8].name",
      attribute: "nftworks.shikastudio.works[8].attribute",
      worddes: "nftworks.shikastudio.works[8].worddes",
      nftdes: "nftworks.shikastudio.works[8].nftdes",
    },
    {
      id: 10,
      logo: urlImages + "ShikaStudio/Kate.webp",
      card2: urlImages + "ShikaStudio/Kate-2.webp",
      card: urlNfts + "ShikaStudio/hero10.webp",
      video: urlNfts + "ShikaStudio/hero10.mp4",
      rarity: "UR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[9].name",
      attribute: "nftworks.shikastudio.works[9].attribute",
      worddes: "nftworks.shikastudio.works[9].worddes",
      nftdes: "nftworks.shikastudio.works[9].nftdes",
    },
    {
      id: 11,
      logo: urlImages + "ShikaStudio/Alice.webp",
      card2: urlImages + "ShikaStudio/Alice-2.webp",
      card: urlNfts + "ShikaStudio/hero11.webp",
      video: urlNfts + "ShikaStudio/hero11.mp4",
      rarity: "UR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[10].name",
      attribute: "nftworks.shikastudio.works[10].attribute",
      worddes: "nftworks.shikastudio.works[10].worddes",
      nftdes: "nftworks.shikastudio.works[10].nftdes",
    },
    {
      id: 12,
      logo: urlImages + "ShikaStudio/Lord.webp",
      card2: urlImages + "ShikaStudio/Lord-2.webp",
      card: urlNfts + "ShikaStudio/hero12.webp",
      video: urlNfts + "ShikaStudio/hero12.mp4",
      rarity: "MR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[11].name",
      attribute: "nftworks.shikastudio.works[11].attribute",
      worddes: "nftworks.shikastudio.works[11].worddes",
      nftdes: "nftworks.shikastudio.works[11].nftdes",
    },
    {
      id: 13,
      logo: urlImages + "ShikaStudio/Mia.webp",
      card2: urlImages + "ShikaStudio/Mia-2.webp",
      card: urlNfts + "ShikaStudio/hero13.webp",
      video: urlNfts + "ShikaStudio/hero13.mp4",
      rarity: "MR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[12].name",
      attribute: "nftworks.shikastudio.works[12].attribute",
      worddes: "nftworks.shikastudio.works[12].worddes",
      nftdes: "nftworks.shikastudio.works[12].nftdes",
    },
    {
      id: 14,
      logo: urlImages + "ShikaStudio/Ichika.webp",
      card2: urlImages + "ShikaStudio/Ichika-2.webp",
      card: urlNfts + "ShikaStudio/hero14.webp",
      video: urlNfts + "ShikaStudio/hero14.mp4",
      rarity: "MR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[13].name",
      attribute: "nftworks.shikastudio.works[13].attribute",
      worddes: "nftworks.shikastudio.works[13].worddes",
      nftdes: "nftworks.shikastudio.works[13].nftdes",
    },
    {
      id: 15,
      logo: urlImages + "ShikaStudio/Kasey.webp",
      card2: urlImages + "ShikaStudio/Kasey-2.webp",
      card: urlNfts + "ShikaStudio/hero15.webp",
      video: urlNfts + "ShikaStudio/hero15.mp4",
      rarity: "MR",
      title: "nftworks.shikastudio.title",
      level: "nftworks.shikastudio.level",
      starlevel: "nftworks.shikastudio.starlevel",
      name: "nftworks.shikastudio.works[14].name",
      attribute: "nftworks.shikastudio.works[14].attribute",
      worddes: "nftworks.shikastudio.works[14].worddes",
      nftdes: "nftworks.shikastudio.works[14].nftdes",
    },
  ],
};
export const zw = {
  id: "zw",
  name: "Z.W.",
  banner: urlImages + "ZW/banner.webp",
  logo: urlImages + "ZW/logo.webp",
  avatar: urlImages + "ZW/avatar.webp",
  avatar2: urlImages + "ZW/avatar2.webp",
  title: "nftworks.zw.title",
  des: "nftworks.zw.des",
  works: [
    { logo: urlImages + "ZW/A.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[0].name" },
    { logo: urlImages + "ZW/Akemi_Homura.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[1].name" },
    { logo: urlImages + "ZW/Card_game.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[2].name" },
    { logo: urlImages + "ZW/Joker.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[3].name" },
    { logo: urlImages + "ZW/Kaguya_sama.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[4].name" },
    { logo: urlImages + "ZW/Kanna.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[5].name" },
    { logo: urlImages + "ZW/Kuro.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[6].name" },
    { logo: urlImages + "ZW/Makia.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[7].name" },
    { logo: urlImages + "ZW/Misa.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[8].name" },
    { logo: urlImages + "ZW/Noshiro.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[9].name" },
    { logo: urlImages + "ZW/Satono_Diamond.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[10].name" },
    { logo: urlImages + "ZW/Tomoyo_Daidoji.webp", title: "nftworks.zw.title", name: "nftworks.zw.works[11].name" },
  ],
};
export const akiha = {
  id: "akiha",
  name: "Akiha",
  banner: urlImages + "Akiha/banner.webp",
  logo: urlImages + "Akiha/logo.webp",
  avatar: urlImages + "Akiha/avatar.webp",
  avatar2: urlImages + "Akiha/avatar2.webp",
  title: "nftworks.akiha.title",
  des: "nftworks.akiha.des",
  works: [
    {
      logo: urlImages + "Akiha/Armed_girl.webp",
      title: "nftworks.akiha.title",
      name: "nftworks.akiha.works[0].name",
    },
    {
      logo: urlImages + "Akiha/Crying_in_the_gym.webp",
      title: "nftworks.akiha.title",
      name: "nftworks.akiha.works[1].name",
    },
    { logo: urlImages + "Akiha/Fall.webp", title: "nftworks.akiha.title", name: "nftworks.akiha.works[2].name" },
    { logo: urlImages + "Akiha/Windy.webp", title: "nftworks.akiha.title", name: "nftworks.akiha.works[3].name" },
    {
      logo: urlImages + "Akiha/After_jogging.webp",
      title: "nftworks.akiha.title",
      name: "nftworks.akiha.works[4].name",
    },
    { logo: urlImages + "Akiha/Summer.webp", title: "nftworks.akiha.title", name: "nftworks.akiha.works[5].name" },
    { logo: urlImages + "Akiha/Shadow.webp", title: "nftworks.akiha.title", name: "nftworks.akiha.works[6].name" },
    { logo: urlImages + "Akiha/X.webp", title: "nftworks.akiha.title", name: "nftworks.akiha.works[7].name" },
    { logo: urlImages + "Akiha/Witch.webp", title: "nftworks.akiha.title", name: "nftworks.akiha.works[8].name" },
    {
      logo: urlImages + "Akiha/White_hair_angel.webp",
      title: "nftworks.akiha.title",
      name: "nftworks.akiha.works[9].name",
    },
    {
      logo: urlImages + "Akiha/The_happy_ending_of_a_dying_girl.webp",
      title: "nftworks.akiha.title",
      name: "nftworks.akiha.works[10].name",
    },
    {
      logo: urlImages + "Akiha/Encountered_and_got_knocked_down.webp",
      title: "nftworks.akiha.title",
      name: "nftworks.akiha.works[11].name",
    },
  ],
};
export const negoro = {
  id: "negoro",
  name: "Negoro",
  banner: urlImages + "Negoro/banner.webp",
  logo: urlImages + "Negoro/logo.webp",
  avatar: urlImages + "Negoro/avatar.webp",
  avatar2: urlImages + "Negoro/avatar2.webp",
  title: "nftworks.negoro.title",
  des: "nftworks.negoro.des",
  works: [
    {
      logo: urlImages + "Negoro/The_duel.webp",
      title: "nftworks.negoro.title",
      name: "nftworks.negoro.works[0].name",
    },
    { logo: urlImages + "Negoro/Irelia.webp", title: "nftworks.negoro.title", name: "nftworks.negoro.works[1].name" },
    { logo: urlImages + "Negoro/Ishtar.webp", title: "nftworks.negoro.title", name: "nftworks.negoro.works[2].name" },
    { logo: urlImages + "Negoro/Luna.webp", title: "nftworks.negoro.title", name: "nftworks.negoro.works[3].name" },
    { logo: urlImages + "Negoro/Lucia.webp", title: "nftworks.negoro.title", name: "nftworks.negoro.works[4].name" },
    { logo: urlImages + "Negoro/Nezuko.webp", title: "nftworks.negoro.title", name: "nftworks.negoro.works[5].name" },
    { logo: urlImages + "Negoro/Yor.webp", title: "nftworks.negoro.title", name: "nftworks.negoro.works[6].name" },
    {
      logo: urlImages + "Negoro/Princess_knight.webp",
      title: "nftworks.negoro.title",
      name: "nftworks.negoro.works[7].name",
    },
    { logo: urlImages + "Negoro/Rose.webp", title: "nftworks.negoro.title", name: "nftworks.negoro.works[8].name" },
    {
      logo: urlImages + "Negoro/Kamisato_Ayaka.webp",
      title: "nftworks.negoro.title",
      name: "nftworks.negoro.works[9].name",
    },
    {
      logo: urlImages + "Negoro/Okita_Sōji.webp",
      title: "nftworks.negoro.title",
      name: "nftworks.negoro.works[10].name",
    },
    {
      logo: urlImages + "Negoro/Kaedehara_Kazuha.webp",
      title: "nftworks.negoro.title",
      name: "nftworks.negoro.works[11].name",
    },
  ],
};
