<template>
  <div class="publish">
    <el-form ref="form" :model="publishment" label-width="200px" v-loading="loading">
      <el-form-item label="发布名称">
        <el-input v-model="publishment.name" placeholder="eg: develop_youxuan_supplier_web"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="publishment.description" placeholder="eg: 妈妈优选供应商web端（线下环境）"></el-input>
      </el-form-item>
      <el-form-item label="git仓库地址">
        <el-select
          v-model="publishment.git_repo_id"
          filterable
          default-first-option
          placeholder="请选择"
          @click="list_git_repos()"
        >
          <el-option
            v-for="item in git_repo_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>*
      </el-form-item>
      <el-form-item label="git分支">
        <el-select
          v-model="publishment.git_branches"
          multiple
          placeholder="请选择（支持多选）"
          @focus="get_git_repo_branches()"
        >
          <el-option
            v-for="item in git_branch_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布环境">
        <el-select v-model="publishment.profile" placeholder="请选择">
          <el-option
            v-for="item in profile_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目标服务器用户名">
        <el-select
          v-model="publishment.to_username"
          filterable
          allow-create
          default-first-option
          placeholder="请选择或输入"
        >
          <el-option
            v-for="item in username_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目标服务器">
        <el-select
          v-model="publishment.to_ip"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择或输入（支持多项）"
          @click="change_ip_group()"
          @focus="change_ip_group()"
        >
          <el-option-group v-for="group in to_ip_options" :key="group.label" :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      <el-form-item label="目标服务器项目目录">
        <el-input
          v-model="publishment.to_project_home"
          placeholder="eg: /data/project/mama_[project_name]"
        ></el-input>
      </el-form-item>
      <el-form-item label="目标服务器进程名关键词">
        <el-input
          v-model="publishment.to_process_name"
          placeholder="eg: xiaodian-usercenter(-1.0.0-SNAPSHOT.jar) 杀死进程和发布时版本通常省略"
        ></el-input>
      </el-form-item>
      <el-form-item label="java变量">
        <el-input
          v-model="publishment.to_java_opts"
          placeholder="eg: -Xms768m -Xmx768m 线下可配置区间值如：-Xms256m -Xmx1024m"
        ></el-input>
      </el-form-item>
      <el-form-item label="发布完毕合并到git分支">
        <el-select
          v-model="publishment.git_merged_branch"
          clearable
          placeholder="请选择"
          @click="get_git_repo_branches()"
        >
          <el-option
            v-for="item in git_branch_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布完毕后打标签名">
        <el-input v-model="publishment.git_tag_version" placeholder="eg: v1.0.0"></el-input>
      </el-form-item>
      <el-form-item label="发布完毕后打标签注释">
        <el-input v-model="publishment.git_tag_comment" placeholder="eg: 项目的第一个版本"></el-input>
      </el-form-item>
      <el-form-item label="发布完毕后是否删除临时分支">
        <el-checkbox v-model="publishment.git_delete_temp_branch">删除临时分支</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import http from "../util/http.js";
import { async } from "q";
export default {
  data() {
    return {
      publishment: {
        name: null,
        description: null,
        git_repo_id: null,
        git_branches: null,
        profile: null,
        to_username: null,
        to_ip: null,
        to_project_home: null,
        to_process_name: null,
        to_java_opts: null,
        git_merged_branch: null,
        git_tag_version: null,
        git_tag_comment: null,
        git_delete_temp_branch: null
      },
      git_repo_options: [],
      git_branch_options: [],
      profile_options: [
        {
          value: "dev",
          label: "开发环境（dev）"
        },
        {
          value: "test",
          label: "测试环境（test）"
        },
        {
          value: "pre",
          label: "预发环境（pre）"
        },
        {
          value: "online",
          label: "生产环境（online）"
        }
      ],
      username_options: [
        {
          value: "root",
          label: "root"
        },
        {
          value: "javaer",
          label: "javaer"
        }
      ],
      to_ip_options: [
        {
          label: "线下",
          options: [
            {
              value: "192.168.1.248",
              label: "192.168.1.248"
            },
            {
              value: "192.168.1.249",
              label: "192.168.1.249"
            },
            {
              value: "192.168.1.251",
              label: "192.168.1.251"
            }
          ]
        },
        {
          label: "预发",
          options: [
            {
              value: "47.96.18.198",
              label: "47.96.18.198"
            }
          ]
        },
        {
          label: "线上",
          options: [
            {
              value: "114.55.232.195",
              label: "114.55.232.195"
            },
            {
              value: "118.178.128.57",
              label: "118.178.128.57"
            },
            {
              value: "47.110.153.206",
              label: "47.110.153.206"
            },
            {
              value: "47.110.154.253",
              label: "47.110.154.253"
            }
          ]
        }
      ],
      loading: false
    };
  },
  methods: {
    get_publishment() {
      http.get("/publishment/" + this.$route.query.id).then(response => {
        console.log(response.data);
        this.publishment = response.data;
      });
    },
    list_git_repos() {
      var _this = this;
      _this.loading = true;
      http
        .get("/git/repos")
        .then(response => {
          this.git_repo_options.length = 0;
          response.data.forEach(repo => {
            this.git_repo_options.push({
              value: repo.id,
              label: repo.ssh_url_to_repo + " (" + repo.description + ")"
            });
          });
        })
        .catch(function() {
          console.log("error");
        })
        .then(function() {
          _this.loading = false;
        });
    },
    get_git_repo_branches() {
      if (!this.publishment.git_repo_id) {
        return;
      }
      var _this = this;
      _this.loading = true;
      http
        .get("/git/repo/" + this.publishment.git_repo_id + "/branches")
        .then(response => {
          this.git_branch_options.length = 0;
          response.data.forEach(branch => {
            this.git_branch_options.push({ value: branch, label: branch });
          });
        })
        .then(function() {
          _this.loading = false;
        });
    },
    change_ip_group() {
      console.log("========" + this.publishment.profile);
      // console.log(this._to_ip_options);
      if (!this.publishment.profile) {
        return;
      }
      // if (this.publishment.profile == 'dev') {
      //   this.to_ip_options.length = 0;
      //   this.to_ip_options.push(this._to_ip_options[0]);
      // } else if (this.publishment.profile == 'pre') {
      //   this.to_ip_options.length = 0;
      //   this.to_ip_options.push(this._to_ip_options[1]);
      // } else if (this.publishment.profile == 'online') {
      //   this.to_ip_options.length = 0;
      //   this.to_ip_options.push(this._to_ip_options[2]);
      // }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    onSubmit() {
      var _this = this;
      http
        .request({
          url: "/publishment",
          method: "POST",
          data: this.publishment
        })
        .then(function(response) {
          console.log(response);
          _this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          // _this.sleep(1200).then(() => {
          //   _this.$router.go(0);
          // });
          _this.get_publishment();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.list_git_repos();
    this.get_git_repo_branches();
    this.get_publishment();
  }
};
</script>
<style scoped>
.publish {
  width: 800px;
  margin: auto;
}
.publish .el-select {
  width: 500px;
}
</style>
