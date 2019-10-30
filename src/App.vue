<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <router-link to="/">首页</router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">发布系统</template>
        <el-menu-item index="2-1">
          <router-link to="/newPublish">新建发布</router-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <router-link to="/publishList">发布列表</router-link>
        </el-menu-item>
        <el-menu-item index="2-3">最近发布</el-menu-item>
      </el-submenu>
      <el-menu-item index="3">
        <a href="#" target="_blank">
          <router-link to="/about">用户管理</router-link>
        </a>
      </el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 60px;
}
</style>
