<template>
  <el-main class="docs-list">
    <el-row>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/mark/docs' }">分类</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>文章列表</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-button style="margin-top:10px;" size="mini" type="primary" @click="creatPost">新建</el-button>
    </el-row>
    <el-row class="table-wrap">
      <el-table :data="tableData" stripe style="width: 100%" @row-click="toDetail">
        <!-- <el-table-column label="ID" width="50">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="发布日期" width="180">
          <template slot-scope="scope">
            <span>{{ getTime(scope.row.creat_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column label="文章标题" width="450">
          <template slot-scope="scope" class="cell-cente">
            <a class="page-title">{{scope.row.title}}</a>
            <span v-if="timeState(scope.row.creat_time)" style="color:red;padding-left:30px;">new</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click.stop="handleDelete(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="size-wrap">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="15"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-row>
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
      currentPage: 1,
      total: 0,
      tableData: []
    };
  },
  created() {
    this.searchList();
  },
  mounted() {},
  watch: {},
  computed: {
    timeState() {
      return function getTimeState(time) {
        return new Date(time).toDateString() === new Date().toDateString();
      };
    },
    getId() {
      return function(id) {
        return this.getIdIndex(id);
      };
    },
    getTime() {
      return function(time) {
        return new Date(parseInt(time))
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ");
      };
    },
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    getIdIndex(id) {
      return id.$index + (this.currentPage - 1) * 15;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.searchList();
    },
    handleDelete(scope) {
      const that = this;
      let id = this.getIdIndex(scope);
      var tempData = {
        url: "http://10.85.125.61:13150/del_docs.json", // 接口请求地址
        param: {
          category_idx: this.$route.query.category,
          docs_idx: id
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            that.searchList();
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
    handleEdit(index) {
      this.$router.push({
        path: "/mark/docs/edit",
        query: { category: this.$route.query.category, docs: index, state: 2 }
      });
    },
    creatPost(index) {
      this.$router.push({
        path: "/mark/docs/edit",
        query: { category: this.$route.query.category, id: index, state: 1 }
      });
    },
    toDetail(row, column, event) {
      this.$router.push({
        path: "/mark/docs/detail",
        query: { category: this.$route.query.category, id: row.id }
      });
    },
    searchList() {
      const that = this;
      var tempData = {
        url: "http://10.85.125.61:13150/query_docs_list.json", // 接口请求地址
        param: {
          category_idx: this.$route.query.category,
          page: this.currentPage,
          count: 15
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.tableData = res.result.map((row, index) => {
              row.id = res.total - (index + (this.currentPage - 1) * 15) - 1;
              return row;
            });
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
.docs-list {
  width: 100%;
  .page-title {
    display: inline-block;
    max-width: 350px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: keep-all;
  }
  .table-wrap {
    border: 1px solid #ebeef5;
    margin-top: 10px;
  }
  .size-wrap {
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
}
</style>