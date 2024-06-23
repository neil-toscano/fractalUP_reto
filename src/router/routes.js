const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "home", component: () => import("pages/MainPage.vue") },
      {
        path: "vista-uno",
        name: "vista_uno",
        component: () => import("pages/FirstPage.vue"),
      },
      {
        path: "vista-dos",
        name: "vista_dos",
        component: () => import("src/pages/SecondPage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
