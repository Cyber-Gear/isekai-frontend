<template>
  <div class="box">
    <div class="title">{{ $t('dashboard.text10') }}</div>
    <ul class="card_list">
      <li v-for="(item, index) in cardList" :key="index">
        <div class="top"><img :src="item.logo" alt="" /></div>
        <div class="center">
          <div>
            <span>{{ $t(item.name) }}</span>
            <img src="@/assets/cdn/images/icon1.webp" alt="" />
          </div>
          <div>
            <span>{{ $t(item.title) }}</span>
            <span>88busd</span>
          </div>
          <div>{{ $t('artist.text10') }}77busd</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { shikastudio } from '@/mock/nftworks';
export default {
  name: 'MyFavorites',
  data() {
    return {
      cardList: []
    };
  },
  created() {
    this.cardList = shikastudio.works;
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  height: auto;
}
.title {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.3rem;
  font-weight: bold;
  background: rgba(129, 129, 151, 0.19);
  border-radius: 0.08rem;
  backdrop-filter: blur(7px);
  padding: 0 0.1rem;
}
.card_list {
  width: 100%;
  height: 8rem;
  padding-right: 0.05rem;
  overflow-y: auto;
  li {
    float: left;
    width: 2.06rem;
    margin: 0 0.15rem 0.15rem 0;
    background: rgba(0, 0, 0, 0.38);
    border-radius: 0.1rem;
    border: 0.01rem solid #3f3e43;
    backdrop-filter: blur(4px);
    transition: all 0.3s;
    cursor: pointer;
    &:nth-child(4n) {
      margin-right: 0;
    }
    &:hover {
      background: rgba(51, 52, 60, 0.57);
      box-shadow: 0.05rem 0.08rem 0.1rem 0rem rgba(0, 0, 0, 0.5);
    }
    .top {
      width: 100%;
      height: auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .center {
      width: 100%;
      div {
        display: flex;
        align-items: center;
        padding: 0.05rem;
        font-size: 0.12rem;
        font-weight: bold;
        &:nth-child(1) {
          color: #00b1ff;
          img {
            width: 0.24rem;
            height: auto;
            margin-left: 0.1rem;
          }
        }
        &:nth-child(2) {
          justify-content: space-between;
        }
        &:nth-child(3) {
          justify-content: flex-end;
          font-weight: 600;
          color: #6c6a71;
        }
      }
    }
  }
}
</style>
