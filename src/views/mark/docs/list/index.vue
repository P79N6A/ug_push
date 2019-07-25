<template>
  <el-main class="docs-list mark-docs-wrap">
    <el-row class="nav-wrap">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/mark/docs' }">全部分类</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>文章列表</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="content-wrap">
      <el-row class="clearfix" style="margin-top:20px;">
        <el-select class="left" style="max-width: 360px;min-width: 200px;" v-model="category_id" placeholder="请选择文章分类" size="mini" @change="searchList" clearable filterable>
          <el-option
            v-for="item in categoryList"
            :key="item.category_id"
            :label="`${item.category_name}（${item.category_total}）`"
            :value="item.category_id.toString()">
          </el-option>
        </el-select>
        <el-button class="right" size="mini" type="success" @click="creatPost">添加文章</el-button>
      </el-row>
      <el-row class="table-wrap">
        <el-table :data="tableData" stripe style="width: 100%" size="mini">
          <el-table-column type="index" label="序号" width="55">
            <template slot-scope="scope">{{(page-1) * count + scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column label="发布日期" width="180">
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.creat_time) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="发布人" width="180"></el-table-column>
          <el-table-column label="文章标题" min-width="450" show-overflow-tooltip>
            <template slot-scope="scope" class="cell-cente">
              <router-link :to="`/mark/docs/detail?id=${scope.row.doc_id}`">
                <el-link type="primary" class="page-title">{{scope.row.title}}</el-link>
                <span v-if="timeState(scope.row.creat_time)" style="color:red;padding-left:30px;">new</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click.stop="handleDelete(scope.row.doc_id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row class="size-wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 15, 20]"
          :page-size="count"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-row>
    </el-row>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";
import { parseTime } from "@/utils"

export default {
  components: {
    Auth
  },
  props: {},
  data() {
    return {
      parseTime,
      API: {
        getCategory: "http://10.85.125.61:13150/query_category.json", // 分类查询
        getDocs: "http://10.85.125.61:13150/query_docs_list.json", // 获取某分类下的文章
        setDoc: "http://10.85.125.61:13150/edit_docs.json" // 文章操作：增、删、改
      },
      page: 1,
      count: 15,
      total: 0,
      category_id: "",
      categoryList: [],
      tableData: []
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  watch: {},
  computed: {
    timeState() {
      return function getTimeState(time) {
        return new Date(time).toDateString() === new Date().toDateString();
      };
    },
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      this.category_id = this.$route.query.category ? this.$route.query.category.toString() : "";
      this.searchCategory();
      this.searchList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.searchList();
    },
    handleSizeChange(val) {
      this.count = val;
      this.searchList();
    },
    handleDelete(doc_id) {
      this.$confirm(
        "将删除该文章, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deleteDoc(doc_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteDoc(doc_id) {
      var tempData = {
        url: this.API.setDoc,
        param: {
          type: 3,
          doc_id: doc_id // 文章ID(会自动寻找类别ID)
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.searchList();
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
    creatPost(index) {
      this.$router.push({
        path: "/mark/docs/add",
        query: { category: this.category_id}
      });
    },
    searchCategory() {
      var tempData = {
        url: this.API.getCategory,
        param: {
          samples_ct: 0
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.categoryList = res.result || [];
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
    searchList() {
      if (!this.category_id) {
        this.tableData = [];
        return;
      }
      var tempData = {
        url: this.API.getDocs,
        param: {
          category_id: this.category_id,
          page: this.page,
          count: this.count
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.tableData = res.result;
            this.total = res.total;
          } else {
            Message({
              showClose: true,
              message: "查询列表异常！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "查询列表接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    }
  }
};
</script>
<style lang="scss">
.docs-list {
  .cell {
    display: flex;
    align-items: center;
  }
}
</style>
<style lang="scss" scoped>
.mark-docs-wrap {
  background-color: #f0f2f5;
}
.el-main {
  padding: 0;
  width: 100%;
  color: #333;
  line-height: 100%;
  .nav-wrap {
    padding: 20px 15px;
    background-color: #fff;
  }
  .content-wrap {
    padding: 0 15px;
  }
  .page-title {
    display: inline-block;
    max-width: 350px;
    font-size: 12px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .table-wrap {
    border: 1px solid #ebeef5;
    margin-top: 10px;
  }
  .size-wrap {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>