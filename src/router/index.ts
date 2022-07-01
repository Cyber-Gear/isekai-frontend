import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err: any) => err);
};

const routes: Array<RouteConfig> = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/home/IndexView.vue"),
  },
  {
    path: "/artist",
    name: "ARTIST",
    component: () => import("../views/artist/IndexView.vue"),
  },
  {
    path: "/artist-details",
    name: "ARTISTDetails",
    component: () => import("../views/artist/Details.vue"),
  },
  {
    path: "/artist-details-zw",
    name: "DetailsZW",
    component: () => import("../views/artist/DetailsZW.vue"),
  },
  {
    path: "/artist-details-akiha",
    name: "DetailsAkiha",
    component: () => import("../views/artist/DetailsAkiha.vue"),
  },
  {
    path: "/artist-details-negoro",
    name: "DetailsNegoro",
    component: () => import("../views/artist/DetailsNegoro.vue"),
  },
  {
    path: "/artist-details-shikastudio",
    name: "DetailsShikastudio",
    component: () => import("../views/artist/DetailsShikastudio.vue"),
  },
  {
    path: "/dao",
    name: "DAO",
    component: () => import("../views/dao/IndexView.vue"),
  },
  {
    path: "/dao-details",
    name: "DAODetails",
    component: () => import("../views/dao/Details.vue"),
  },
  {
    path: "/launchpad",
    name: "LAUNCHPAD",
    component: () => import("../views/launchpad/IndexView.vue"),
  },
  {
    path: "/market",
    name: "MARKET",
    component: () => import("../views/market/IndexView.vue"),
  },
  {
    path: "/market-details",
    name: "MARKETDetails",
    component: () => import("../views/market/Details.vue"),
  },
  {
    path: "/market-order",
    name: "MARKETOrder",
    component: () => import("../views/market/Order.vue"),
  },
  {
    path: "/dashboard",
    // name: "DASHBOARD",
    component: () => import("../views/dashboard/IndexView.vue"),
    children: [
      { path: "/", redirect: "nft-asstet" },
      {
        path: "nft-asstet",
        name: "NFTAsstet",
        component: () => import("../views/dashboard/NFTAsstet.vue"),
      },
      {
        path: "mystey-boxes",
        name: "MysteyBoxes",
        component: () => import("../views/dashboard/MysteyBoxes.vue"),
      },
      {
        path: "mystey-boxes-details",
        name: "MysteyBoxesDetails",
        component: () => import("../views/dashboard/MysteyBoxesDetails.vue"),
      },
      {
        path: "crypto-asstet",
        name: "CryptoAsstet",
        component: () => import("../views/dashboard/CryptoAsstet.vue"),
      },
      {
        path: "orders",
        name: "Orders",
        component: () => import("../views/dashboard/Orders.vue"),
      },
      {
        path: "my-favorites",
        name: "MyFavorites",
        component: () => import("../views/dashboard/MyFavorites.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

// 跳转后返回顶部
router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default router;
