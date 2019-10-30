<template>
  <div class="publishList" v-loading="loading">
    <el-button type="primary" @click.native="updateGitRepo2Db()">更新git仓库信息</el-button>
    <div style="margin: auto; margin-top: 15px; margin-bottom: 15px; width: 300px;">
      <el-input placeholder="请输入关键词" v-model="keyword" clearable class="search_txt">
        <el-button slot="append" icon="el-icon-search" @click="search_projects_publishment()"></el-button>
      </el-input>
    </div>

    <el-table :data="publishList" border style="width: 100%">
      <el-table-column prop="id" label="发布系统id"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="git_repo_id" label="git仓库id"></el-table-column>
      <el-table-column prop="git_branches" label="git发布分支"></el-table-column>
      <el-table-column prop="profile" label="maven打包环境"></el-table-column>
      <el-table-column prop="to_username" label="目标服务器用户名"></el-table-column>
      <el-table-column prop="to_ip" label="目标服务器ip"></el-table-column>
      <el-table-column prop="to_project_home" label="目标服务器项目主目录"></el-table-column>
      <el-table-column prop="to_process_name" label="目标服务器项目进程关键词"></el-table-column>
      <el-table-column prop="to_java_opts" label="目标服务器上java应用运行变量"></el-table-column>
      <el-table-column prop="git_merged_branch" label="git合并到的分支名"></el-table-column>
      <el-table-column prop="git_tag_version" label="git打标签名"></el-table-column>
      <el-table-column prop="git_tag_comment" label="git打标签备注"></el-table-column>
      <el-table-column prop="git_delete_temp_branch" label="是否删除临时分支"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click.native="toPublish(scope.row.id)">发布</el-button>|
          <el-button type="danger" @click.native="toUpdate(scope.row.id)">修改</el-button>
          <el-button type="danger" @click.native="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        background
        @current-change="search_projects_publishment"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import http from "../util/http.js";
export default {
  data() {
    return {
      publishList: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      keyword: null,
      loading: false
    };
  },
  methods: {
    search_projects_publishment() {
      var _this = this;
      console.log(this.keyword + "-" + this.currentPage);
      http
        .get("/publishment/list", {
          params: { keyword: this.keyword, current_page: this.currentPage }
        })
        .then(response => {
          this.publishList = response.data.data;
          this.total = response.data.total;
        })
        .catch(function(error) {
          console.log(error);
          _this.$message.error("查询失败");
        });
      // http
      //   .post("/publishment/login", this.userLoginInfo)
      //   .then(function(response) {
      //     console.log(response);
      //     if (response.id) {
      //       this.router.push({
      //         path: "/"
      //       });
      //     }
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    toUpdate(id) {
      this.$router.push({
        path: "/updatePublish",
        query: {
          id: id
        }
      });
    },
    deleteItem(id) {
      console.log(id);
      var _this = this;
      _this
        .$confirm("确认删除？")
        .then(_ => {
          http
            .delete("/publishment", { data: { id: id } })
            .then(response => {
              console.log(response.data);
              _this.$message({
                showClose: true,
                message: "删除成功",
                type: "success"
              });
              this.list_projects_publishment();
            })
            .catch(function(error) {
              console.log(error);
              _this.$message.error("删除失败");
            });
        })
        .catch(_ => {
          _this.$message("已取消");
        });
    },
    updateGitRepo2Db() {
      var _this = this;
      _this.loading = true;
      http
        .post("/git/repos/database")
        .then(response => {
          console.log(response);
          _this.$message({
            showClose: true,
            message: "同步git信息成功",
            type: "success"
          });
        })
        .catch(error => {
          console.error(error);
          _this.$message.error("更新失败");
        })
        .then(() => {
          _this.loading = false;
        });
    },
    toPublish(id) {
      this.$router.push({
        path: "/publishDetail",
        query: {
          id: id
        }
      });
    }
  },
  created() {
    this.search_projects_publishment();
  }
};
</script>
<style scoped>
.publishList {
  margin: auto;
  margin-top: 10px;
  width: 100%;
}
.publishList td {
  width: 100px;
}
</style>
