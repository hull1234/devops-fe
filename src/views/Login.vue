<template>
  <div class="login">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userLoginInfo.loginName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="userLoginInfo.passwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import http from '../util/http.js'
export default {
  data() {
    return {
      userLoginInfo: {
        loginName: "",
        passwd: ""
      }
    };
  },
  methods: {
    onSubmit() {
      //   http
      //     .post("/user/login", this.userLoginInfo)
      //     .then(function(response) {
      //       console.log(response);
      //       if(response.id) {
      //         this.router.push({
      //           path: "/"
      //         })
      //       }
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
    }
  }
};
</script>
<style scoped>
.login {
  width: 350px;
  margin: auto;
  margin-top: 100px;
}
</style>
