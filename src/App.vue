<template>
  <div id="app">
    <!-- 路由组件出口的位置 -->
    <router-view></router-view>
    <!-- 在Home和Search组件显示，在登录、注册组件隐藏 -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
