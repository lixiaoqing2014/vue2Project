<template>
  <div class="manage_page fillcontain">
    <el-row class="tac" style="height: 100%">
      <el-col :span="4" style="min-height: 100%">
        <el-menu
          :default-active="defaultActive"
          background-color="#545c64"
          text-color="#fff"
          style="min-height: 100%"
          theme="dark"
          router
        >
          <el-menu-item index="manage"
            ><i class="el-icon-menu"></i>首页</el-menu-item
          >
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-document"></i>数据管理</template
            >
            <el-menu-item index="userList">用户列表</el-menu-item>
            <el-menu-item index="shopList">商家列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-plus"></i>添加数据</template
            >
            <el-menu-item index="addShop">添加商铺</el-menu-item>
            <el-menu-item index="addGoods">添加商品</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"
              ><i class="el-icon-star-on"></i>图表</template
            >
            <el-menu-item index="visitor">用户分布</el-menu-item>
            <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-edit"></i>编辑</template>
            <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
            <el-menu-item index="vueEdit">文本编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"
              ><i class="el-icon-setting"></i>设置</template
            >
            <el-menu-item index="adminSet">管理员设置</el-menu-item>
            <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"
              ><i class="el-icon-warning"></i>说明</template
            >
            <el-menu-item index="explain">说明</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%; overflow: auto">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Manage",
  methods: {},
  computed: {
    defaultActive: function () {
      console.log("当前路由：", this.$route.path.replace("/", ""));
      return this.$route.path.replace("/", "");
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.manage_page {
}
.fillcontain {
  height: 100%;
  width: 100%;
}
</style>
