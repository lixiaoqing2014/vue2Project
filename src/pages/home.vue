<template>
  <div>
    <Header></Header>
    <p>我是首页 home组件</p>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "Home",
  components: { Header },
};
</script>

<style scoped></style>
