export default [
  {
    //重定向：项目跑起来的时候，访问/  立马让它定向到首页
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/pages/login"),
  },
  {
    path: "/test",
    component: () => import("@/pages/test"),
  },
  {
    path: "/manage",
    component: () => import("@/pages/manage"),
    children: [
      {
        path: "",
        component: () => import("@/pages/home"),
        meta: [],
      },
      {
        path: "/userlist",
        component: () => import("@/pages/userlist"),
        meta: ["数据管理", "用户列表"],
      },
      {
        path: "/shoplist",
        component: () => import("@/pages/shoplist"),
        meta: ["数据管理", "商家列表"],
      },
      {
        path: "/addshop",
        component: () => import("@/pages/addshop"),
        meta: ["添加数据", "添加商铺"],
      },
      {
        path: "/addgoods",
        component: () => import("@/pages/addgood"),
        meta: ["添加数据", "添加商品"],
      },
    ],
  },
];
