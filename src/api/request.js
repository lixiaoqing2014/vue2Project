//对于axios进行二次封装
import axios from "axios";

//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
  //配置对象
  baseURL: "https://elm.cangdu.org",
  //代表请求超时的时间5s
  timeout: 2000,
});

requests.interceptors.request.use((config) => {
  //config：配置对象，对象里面有一个属性很重要，header请求头
  console.log("请求拦截器");
  return config;
});

//响应拦截器：
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，做一些事情
    //进度条结束
    console.log("响应拦截器");
    console.log(res.data);
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error("faile"));
  }
);
//对外暴露
export default requests;
