import { reqUserLogin, reqAdminInfo, reqGetUserlist } from "@/api";
const state = {
  adminInfo: {
    avatar: "default.jpg",
  },
};
const mutations = {
  //获取管理员信息
  GETADMINDATA(state, adminInfo) {
    state.adminInfo = adminInfo;
  },
  // GETUSERLIST(state,userlist){
  //   state.userlist=userlist
  // }
};
const actions = {
  async userLogin({ commit }, user) {
    console.log("请求登录");
    const result = await reqUserLogin(user);
    console.log("结果 = ", result);
    if (result.status == 1) {
      return "ok";
    } else {
      return Promise.reject(new Error("登陆失败"));
    }
  },
  async getAdminData({ commit }) {
    const res = await reqAdminInfo();
    console.log("获取管理员信息", res);
    if (res.status == 1) {
      console.log("adminInfo提交到store中");
      commit("GETADMINDATA", res.data);
    } else {
      return Promise.reject(new Error("获取管理员信息失败"));
    }
  },
  async getUserlist({ commit }) {
    const result = await reqGetUserlist();
    console.log(result);
    if (result.status == 200) {
      console.log(result.data);
      //  commit('GETUSERLIST',result.data)
    } else {
      return Promise.reject(new Error("获取用户列表失败"));
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
