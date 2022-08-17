import Vue from "vue";
import App from "./App.vue";
import store from "@/store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//引入路由
import router from "@/router";
Vue.config.productionTip = false;

//统一接口api文件夹里面全部请求函数
import * as API from "@/api";

Vue.use(ElementUI);
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //全局事件总线
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由，下面的写法kv一致省略v【小写router】
  //注册路由信息：当这里书写router的时候，组件身上就有了$route和$router属性
  //$router:一般获取路由信息【路径、query、params等】
  //$router:一般进行编程式导航进行跳转【push|replace】
  router,
  //注册仓库：组件实例身上会多一个属性 $store
  store,
}).$mount("#app");
