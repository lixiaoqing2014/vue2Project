<template>
  <div class="box">
    <div class="box2" v-show="showForm">
      <h2 class="title">后台管理系统</h2>
      <el-form
        ref="user"
        :model="user"
        label-width="80px"
        :rules="rules"
        class="elform"
      >
        <el-form-item prop="name">
          <el-input v-model="user.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" class="elbutton" @click="submitForm('user')"
          >登录</el-button
        >
        <p class="pp">未注册的用户，点击登录，自动注册并登录</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      showForm: true,
    };
  },
  mounted() {
    // this.showForm = true;
    // if (!this.adminInfo) {
    //   this.getAdminData();
    // }
  },
  // computed: {
  //   ...mapState(["adminInfo"]),
  // },

  methods: {
    // ...mapActions(["userLogin"]),
    submitForm(formName) {
      //alert(formName); user
      //是否校验成功
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let uu = this.user;
          console.log("发送登录请求");
          //this.$router.push("/manage");
          // this.userLogin({
          //   user_name: data.name,
          //   password: data.password,
          // });
          axios({
            url: "https://elm.cangdu.org/admin/login",
            method: "post",
            data: {
              user_name: uu.name,
              password: uu.password,
            },
          })
            .then((res) => {
              console.log("成功请求，返回结果：", res);
              console.log(res.data.status);
              if (res.data.status == 1) {
                alert(res.data.success);
                this.$router.push("/manage");
              } else {
                alert(res.data.message);
              }
            })
            .catch((err) => {
              console.log("请求失败", err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  // watch: {
  //   adminInfo: function (newValue) {
  //     if (newValue) {
  //       alert("检测您之前登陆过，将自动登录");
  //       this.$router.push("/manage");
  //     }
  //   },
  // },
};
</script>

<style scoped>
.box {
  height: 100%;
  width: 100%;
  background-color: pink;
}
.box2 {
  background-color: pink;
  width: 400px;
  height: 210px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  text-align: center;
}
.title {
  color: gray;
  margin-bottom: 20px;
}
.elform {
  margin-right: 50px;
}
.elbutton {
  width: 270px;
  margin-left: 77px;
  text-align: center;
}
.pp {
  color: red;
  margin-top: 5px;
  margin-left: 77px;
}
</style>
