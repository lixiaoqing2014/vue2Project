//当前这个模块，API进行统一管理
import axios from "axios";
import requests from "./request";
//三级联动接口
//  /api/product/getBaseCategoryList   get请求  无参数
//发请求:axios发请求返回对象是Promise对象

//登录
export const reqUserLogin = (data) => {
  console.log("调用登录方法");
  return axios({
    url: "https://elm.cangdu.org/admin/login",
    method: "post",
    data,
  });
};

export const reqAdminInfo = () => {
  console.log("调用reqAdminInfo方法");
  return axios({
    url: "https://elm.cangdu.org/admin/info",
    method: "GET",
  });
};
export const reqGetUserlist = () =>
  requests({
    url: "/v1/user/list",
    method: "get",
  });

export const getShoplist = (data) => {
  console.log("调用getShoplist方法");
  return axios({
    url: "https://elm.cangdu.org/shopping/restaurants",
    method: "GET",
    params: data,
  });
};
export const updateShop = (data) => {
  return axios({
    url: "https://elm.cangdu.org/shopping/updateshop",
    method: "post",
    data,
  });
};
export const reqGetCategory = () => {
  return axios({
    url: "https://elm.cangdu.org/shopping/v2/restaurant/category",
    method: "get",
  });
};
export const addshop = (data) => {
  requests({
    url: "/shopping/addShop",
    method: "post",
    data: data,
  });
};
