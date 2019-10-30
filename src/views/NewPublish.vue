<template>
  <div class="publish">
    <el-form
      ref="publishment"
      :model="publishment"
      :rules="rules"
      label-position="left"
      label-width="200px"
    >
      <el-form-item label="发布名称" prop="name">
        <el-input v-model="publishment.name" placeholder="eg: develop_youxuan_supplier_web"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="publishment.description" placeholder="eg: 妈妈优选供应商web端（线下环境）"></el-input>
      </el-form-item>
      <el-form-item label="git仓库地址" prop="git_repo_id">
        <el-select
          v-model="publishment.git_repo_id"
          filterable
          default-first-option
          placeholder="请选择"
        >
          <el-option
            v-for="item in git_repo_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="git分支" prop="git_branches">
        <el-select
          v-model="publishment.git_branches"
          multiple
          placeholder="请选择（支持多选）"
          @click.native="get_git_repo_branches()"
        >
          <el-option
            v-for="item in git_branch_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布环境" prop="profile">
        <el-select v-model="publishment.profile" placeholder="请选择">
          <el-option
            v-for="item in profile_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="目标服务器用户名" prop="to_username">
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
      <el-form-item label="目标服务器" prop="to_ip">
        <el-select
          v-model="publishment.to_ip"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择或输入（支持多项）"
          @click.native="change_ip_group()"
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
      <el-form-item label="目标服务器项目目录" prop="to_project_home">
        <el-input
          v-model="publishment.to_project_home"
          placeholder="eg: /data/project/mama_[project_name]"
        ></el-input>
      </el-form-item>
      <el-form-item label="目标服务器进程名关键词" prop="to_process_name">
        <el-input
          v-model="publishment.to_process_name"
          placeholder="eg: xiaodian-usercenter(-1.0.0-SNAPSHOT.jar) 杀死进程和发布时版本通常省略"
        ></el-input>
      </el-form-item>
      <el-form-item label="java变量" prop="to_java_opts">
        <el-input
          v-model="publishment.to_java_opts"
          placeholder="eg: -Xms768m -Xmx768m 线下可配置区间值如：-Xms256m -Xmx1024m"
        ></el-input>
      </el-form-item>
      <el-form-item label="发布完毕合并到git分支" prop="git_merged_branch">
        <el-select
          v-model="publishment.git_merged_branch"
          clearable
          placeholder="请选择"
          @click.native="get_git_repo_branches()"
        >
          <el-option
            v-for="item in git_branch_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布完毕后打标签名" prop="git_tag_version">
        <el-input v-model="publishment.git_tag_version" placeholder="eg: v1.0.0"></el-input>
      </el-form-item>
      <el-form-item label="发布完毕后打标签注释" prop="git_tag_comment">
        <el-input v-model="publishment.git_tag_comment" placeholder="eg: 项目的第一个版本"></el-input>
      </el-form-item>
      <el-form-item label="发布完毕后是否删除临时分支" prop="git_delete_temp_branch">
        <el-checkbox v-model="publishment.git_delete_temp_branch">删除临时分支</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>|
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import http from "../util/http.js";
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
      git_branch_options: [
        {
          value: "master",
          label: "master"
        }
      ],
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
      rules: {
        name: [
          { required: true, message: "请输入发布名称", trigger: "blur" },
          { min: 3, max: 20, message: "长度在3到20个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入发布名称", trigger: "blur" },
          { min: 5, max: 40, message: "长度在5到40个字符", trigger: "blur" }
        ],
        git_repo_id: [
          { required: true, message: "请选择git仓库地址", trigger: "change" }
        ],
        git_branches: [
          { required: true, message: "请选择git分支名称", trigger: "change" }
        ],
        profile: [
          { required: true, message: "请选择发布环境", trigger: "change" }
        ],
        to_username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        to_ip: null,
        to_project_home: null,
        to_process_name: null
      }
    };
  },
  methods: {
    list_git_repos() {
      http.get("/git/repos").then(response => {
        this.git_repo_options.length = 0;
        response.data.forEach(repo => {
          this.git_repo_options.push({
            value: repo.id,
            label: repo.ssh_url_to_repo + " (" + repo.description + ")"
          });
        });
      });
    },
    get_git_repo_branches() {
      if (!this.publishment.git_repo_id) {
        return;
      }
      http
        .get("/git/repo/" + this.publishment.git_repo_id + "/branches")
        .then(response => {
          this.git_branch_options.length = 0;
          response.data.forEach(branch => {
            this.git_branch_options.push({ value: branch, label: branch });
          });
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
    onSubmit() {
      var _this = this;
      this.$refs["publishment"].validate(valid => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      http
        .request({ url: "/publishment", method: "PUT", data: this.publishment })
        .then(response => {
          console.log(response);
          _this.$message({
            showClose: true,
            message: "保存成功",
            type: "success"
          });
          _this.$router.push({ path: "/publishList" });
        })
        .catch(function(error) {
          console.log(error);
          _this.$message.error("保存失败");
        });
    },
    resetForm() {
      this.$refs["publishment"].resetFields();
    }
  },
  created() {
    this.list_git_repos();
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
