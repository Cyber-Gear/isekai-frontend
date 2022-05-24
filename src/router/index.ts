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
    name: "Details",
    component: () => import("../views/artist/Details.vue"),
  },
  {
    path: "/artist-detailsofdetails",
    name: "DetailsOfDetails",
    component: () => import("../views/artist/DetailsOfDetails.vue"),
  },
  {
    path: "/dao",
    name: "DAO",
    component: () => import("../views/dao/IndexView.vue"),
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
];

const router = new VueRouter({
  routes,
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default router;
