<template>
  <div class="publish_detail">
    <el-scrollbar style="height: 100%;" ref="el_scrollbar">
      <div class="publish" ref="log_output" style="overflow-y: auto; width: 1300px; height: 550px;"></div>
    </el-scrollbar>
    <el-backtop target=".publish" :bottom="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 25px;
        color: #1989fa;
      }"
      >UP</div>
    </el-backtop>
  </div>
</template>
<script>
import http from "../util/http.js";
export default {
  data() {
    return {};
  },
  //   sockets: {
  //     publish_response: function(data) {
  //         console.log('==-==-==' + JSON.stringify(data));
  //     }
  //   },
  methods: {
    publish_init() {
      var _this = this;
      console.log(this.$route.query.id);
      http
        .post("/publish", { id: this.$route.query.id })
        .then(response => {
          console.log(response);
          _this.$message({
            showClose: true,
            message: "正在发布...",
            type: "success"
          });
        })
        .catch(error => {
          console.error(error);
        })
        .then(() => {});
      this.$socket.emit("publish_event", { id: this.$route.query.id });
      this.sockets.subscribe("publish_response", data => {
        this.$refs.log_output.innerHTML += data.data + "<br/>";
      });

      // console.log(this.$refs.el_scrollbar)
      // var div = this.$refs.el_scrollbar.wrap;
      // this.$nextTick(() => {
      //   div.scrollTop = div.scrollHeight;
      // });
    }
  },
  created() {
    this.publish_init();
  }
};
</script>
<style scoped>
.publish {
  text-align: left;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
