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
        path: "Layout",
        name: "Layout",
        component: () =>
          import(/* webpackChunkName: "Layout" */ "../views/Layout.vue"),
      },
    ],
  },
  
];

const router = new VueRouter({
  routes,
});

export default router;
