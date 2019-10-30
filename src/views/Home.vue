<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
const axios = require("axios");

export default {
  name: "home",
  components: {
    HelloWorld
  },
  methods: {
    login() {
      axios
        .get("/user/info")
        .then(function(response) {
          // handle success
          console.log(response);
          if(!response.id) {
            this.router.push({
              path: "/login"
            })
          }
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })
        .then(function() {
          // always executed
        });
    },
    logout: function() {}
  }
};
</script>
