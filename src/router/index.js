import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: {
      name: "Login",
    },
    children: [
      {
        path: "Login",
        name: "Login",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Login.vue"),
      },
      {
        path: "Portal",
        name: "Portal",
        component: () =>
          import(/* webpackChunkName: "Portal" */ "../views/Portal.vue"),
      },
      {
        path: "word_export",
        name: "word_export",
        meta: {
          activeRule: "/main/#/word_export",
        },
        component: () =>
          import(/* webpackChunkName: "Layout" */ "../views/Layout.vue"),
        children: [],
      },
      {
        path: "blog",
        name: "blog",
        meta: {
          activeRule: "/main/#/MyBlog",
        },
        component: () =>
          import(/* webpackChunkName: "Layout" */ "../views/Layout.vue"),
        children: [],
      },
      {
        path: "oms",
        name: "oms",
        meta: {
          activeRule: "/main/#/oms",
        },
        component: () =>
          import(/* webpackChunkName: "Layout" */ "../views/Layout.vue"),
        children: [],
      },
      {
        path: "intro",
        name: "intro",
        meta: {
          activeRule: "/main/#/intro",
        },
        component: () =>
          import(/* webpackChunkName: "Layout" */ "../views/Layout.vue"),
        children: [],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
