import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';
import './styles/reset.scss';
import './styles/global.scss';
import './assets/local/iconfonts/iconfont.css';

const isProd = process.env.NODE_ENV == 'production';
Vue.prototype.$isProd = isProd;
const cdn = '//bafybeif3ij6i3lw5ackugtbm54butxhk2dpdt5uxuz3xnesumfwkdls2xu.ipfs.nftstorage.link/';

Vue.prototype.$urlNfts = cdn + 'nfts/';
Vue.prototype.$urlFonts = cdn + 'fonts/';
Vue.prototype.$urlVideos = cdn + 'videos/';
Vue.prototype.$urlImages = cdn + 'images/';
Vue.prototype.$urlArtists = cdn + 'artists/';
Vue.prototype.$urlBlindBoxs = cdn + 'blindboxs/';

import utils from './utils/index';
Vue.prototype.$utils = utils;
import filters from './utils/filters';
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

import api from './api/api';
Vue.prototype.$api = api;

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);

import {
  Icon,
  Button,
  Message,
  Steps,
  Step,
  Dialog,
  Collapse,
  CollapseItem,
  Tag,
  Select,
  Option,
  Tooltip,
  Backtop,
  Drawer,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  DatePicker,
  Loading,
  Popover
} from 'element-ui';
Vue.use(Icon);
Vue.use(Button);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Dialog);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Tag);
Vue.use(Select);
Vue.use(Option);
Vue.use(Tooltip);
Vue.use(Backtop);
Vue.use(Drawer);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(DatePicker);
Vue.use(Popover);
Vue.prototype.$message = (option: any) => {
  // option.duration = 0;
  option.customClass = i18n.locale == 'en' ? 'fontfamily_en' : 'fontfamily_zh';
  return Message(option);
};
Vue.use(Loading); // 使用服务方式的话，只安装Loading即可
Vue.use(Loading.directive); //  指令方式(v-loading)的话这两行都得有

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
