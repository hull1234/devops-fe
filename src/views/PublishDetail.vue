<template>
  <div class="publish" ref="log_output"></div>
</template>
<script>
import http from "../util/http.js";
export default {
  data() {
    return {};
  },
//   sockets: {
//     my_response: function(data) {
//         console.log('==-==-==' + JSON.stringify(data));
//     }
//   },
  methods: {
    publish_init() {
      var _this = this;
      console.log(this.$route.query.id);
      http
        .post("/publish", { 'id': this.$route.query.id })
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
      this.$socket.emit('my_event', {'data': 'params'});
      this.sockets.subscribe("my_response", (data) => {
        this.$refs.log_output.innerHTML+=data.data + '<br/>';
      });
    }
  },
  created() {
    this.publish_init();
  }
};
</script>
<style scoped>
.publish{
    text-align: left;
}
</style>