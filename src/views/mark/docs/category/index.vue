<template>
<el-main v-if="pageAuth === 1" class="mark-docs-wrap">
  <el-row class="pane-title-wrap">
    <el-col :span="24">
      <h6 class="pane-title">文档管理-归档
        <router-link v-if="categoryList[0] && categoryList[0].category_id" :to="`/mark/docs/list?category=${categoryList[0].category_id}`"><el-link type="warning">文章列表</el-link></router-link>
        <el-button class="right" size="mini" type="success" @click="creatPost">添加文章</el-button>
      </h6>
    </el-col>
  </el-row>
  <div class="mark-content">
    <el-card shadow="always" class="box-card" v-for="item in categoryList" :key="item.category_id">
      <div slot="header" class="clearfix">
        <el-tooltip class="category-title" effect="dark" :content="`${item.category_name}（${item.category_total || 0 }）`" placement="top">
          <span>{{item.category_name}}（{{item.category_total || 0 }}）</span>
        </el-tooltip>
        <el-button style="float: right; padding: 3px 0;" type="text">
          <router-link :to="`/mark/docs/list?category=${item.category_id}`">更多</router-link>
        </el-button>
        <el-button
          type="danger"
          style="float: right;margin-right:10px;"
          @click="delCategoryPopup(item.category_id)"
          icon="el-icon-delete"
          size="mini"
          circle
        ></el-button>
        <el-button
          type="primary"
          style="float: right;"
          icon="el-icon-edit"
          size="mini"
          @click="openEditCategory(item.category_id, item.category_name)"
          circle
        ></el-button>
      </div>
      <div v-if="item.sample_doc && item.sample_doc.length > 0">
        <div
          v-for="(row, n) in item.sample_doc"
          :key="row.doc_id"
          class="text item"
          @click="toDetail(row.doc_id)"
        >
          <el-tooltip class="page-title" effect="dark" :content="`${n+1}、${row.title}`" placement="top">
            <span>{{n+1}}、{{row.title}}</span>
          </el-tooltip>
          <span v-if="getTime(row.creat_time)" style="color:red;padding-left:30px;">new</span>
        </div>
      </div>
      <p v-else class="none-tip">暂无文章</p>
    </el-card>
    <el-card shadow="always" class="add-card">
      <div class="add-wrap" @click="addCategoryPopup">
        <i class="el-icon-plus"></i>
      </div>
    </el-card>
  </div>
</el-main>
<el-main v-else-if="pageAuth === 0">
  <auth></auth>
</el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";

export default {
  components: {
    Auth
  },
  props: {},
  data() {
    return {
      API: {
        getCategory: "http://10.85.125.61:13150/query_category.json", // 分类查询
        setCategory: "http://10.85.125.61:13150/edit_category.json" // 分类操作：增、删、改
      },
      categoryList: []
    };
  },
  watch: {},
  computed: {
    getTime() {
      return function getTimeState(time) {
        return new Date(time).toDateString() === new Date().toDateString();
      };
    },
    ...mapGetters(["pageAuth", "email"])
  },
  mounted() {},
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.searchCategory();
      }
    },
    openEditCategory(cid, name) {
      this.$prompt("请输入新名称", `编辑分类【${name}】`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "输入分类新名称",
        inputValidator: (val) => {
          return val && val.trim() ? true : '分类名称不能为空！';
        }
      })
        .then(({ value }) => {
          this.editCategory(cid, value);
        })
        .catch(err => {
          this.$message({
              type: "info",
              message: "已取消修改"
            });
        });
    },
    editCategory(cid, value) {
      const tempData = {
        url: this.API.setCategory,
        param: {
          type: 2,
          category_id: cid,
          category_name: value,
	        username: this.email, // 修改用户
        }
      };
      let params = new URLSearchParams();
      params.append("data", JSON.stringify(tempData));
      params.append("cip", 230);
      this.$store.dispatch("ProxyPost", params).then(
        res => {
          if (res && res.code == 200) {
            this.searchCategory();
          } else {
            Message({
              showClose: true,
              message: "分类保存失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "分类保存接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    delCategoryPopup(cid) {
      this.$confirm(
        "此操作将永久删除该分类以及分类下的文档, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.delCategory(cid);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delCategory(cid) {
      var tempData = {
        url: this.API.setCategory,
        param: {
          type: 3,
          category_id: cid,
          username: this.email
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.searchCategory();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          } else {
            Message({
              showClose: true,
              message: "删除异常！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "删除接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    toDetail(id) {
      this.$router.push({
        path: "/mark/docs/detail",
        query: { id: id  }
      });
    },
    searchCategory() {
      this.categoryList = [];
      var tempData = {
        url: this.API.getCategory,
        param: {
          samples_ct: 6
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.categoryList = res.result;
          } else {
            Message({
              showClose: true,
              message: "查询异常！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "查询接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    addCategoryPopup() {
      this.$prompt("请输入新添加分类名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPlaceholder: "输入分类名称",
        inputValidator: (val) => {
          return val && val.trim() ? true : '分类名称不能为空！';
        }
      })
        .then(({ value }) => {
          this.addCategory(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加"
          });
        });
    },
    addCategory(value) {
      const tempData = {
        url: this.API.setCategory,
        param: {
          type: 1,
          category_name: value,
          username: this.email,
        }
      };
      let params = new URLSearchParams();
      params.append("data", JSON.stringify(tempData));
      params.append("cip", 230);
      this.$store.dispatch("ProxyPost", params).then(
        res => {
          if (res && res.code == 200) {
            this.searchCategory();
          } else {
            Message({
              showClose: true,
              message: "分类添加失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "分类添加接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    creatPost(index) {
      this.$router.push({
        path: "/mark/docs/add",
        query: { category: this.category_id}
      });
    }
  },
  created() {
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    }
  }
};
</script>
<style lang="scss">
.mark-content {
  .add-card {
    .el-card__body {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
<style lang="scss" scoped>
.mark-docs-wrap {
  background-color: #f0f2f5;
}
.el-main {
  padding: 0;
  color: #333;
  line-height: 100%;
  .pane-title-wrap {
    padding: 20px 14px;
    background: #fff;
    border-bottom: 1px solid #f0f2f5;
    .pane-title {
      font-size: 16px;
      color: #409eff;
      text-align: left;
    }
  }
}
.mark-content {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  .page-title {
    display: inline-block;
    max-width: 260px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
  }
  .category-title {
    display: inline-block;
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
  }
  .text {
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .item {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #eee;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 350px !important;
    height: 310px;
    margin: 15px !important;
  }
  .add-card {
    width: 350px !important;
    height: 310px;
    margin: 15px !important;
    .el-card__body {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .add-wrap {
      height: 150px;
      width: 150px;
      margin: auto;
      border: 2px dotted #aaa;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
    }
    .add-wrap:hover {
      border: 2px dotted #409eff;
      i {
        color: #409eff;
      }
    }
  }
  .none-tip {
    padding-top: 80px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
}
</style>