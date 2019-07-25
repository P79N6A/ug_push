<template>
  <div class="detail-wrap">
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/mark/docs' }">分类</el-breadcrumb-item>
        <el-breadcrumb-item :to="toListUrl">文章列表</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a>{{title}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="title">
      <span>{{title}}</span>
    </div>
    <div class="time">
      <span>{{getTime(time)}}</span>
      <span style="margin-left:20px;">{{username}}</span>
      <el-button size="mini" @click.stop="handleEdit">编辑</el-button>
      <el-button size="mini" type="danger" @click.stop="openHandleDelete">删除</el-button>
    </div>
    <div>
      <div class="show-wrap">
        <mavon-editor
          class="show_markdown"
          :subfield="false"
          :defaultOpen="defaultData"
          :toolbarsFlag="false"
          :boxShadow="false"
          v-model="content"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  components: {},
  props: {},
  data() {
    return {
      time: "",
      username: "",
      defaultData: "preview",
      title: "",
      content: "",
      tabList: [],
      editConfig: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  watch: {},
  computed: {
    toListUrl() {
      return {
        path: "/mark/docs/list",
        query: { category: this.$route.query.category }
      };
    },
    getTime() {
      return function(time) {
        return new Date(parseInt(time))
          .toLocaleString()
          .replace(/:\d{1,2}$/, " ");
      };
    }
  },
  methods: {
    openHandleDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleDelete();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDelete() {
      console.log(11111)
      const that = this;
      var tempData = {
        url: "http://10.85.125.61:13150/del_docs.json", // 接口请求地址
        param: {
          category_idx: this.$route.query.category,
          docs_idx: this.$route.query.id
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.$router.push({
              path: "/mark/docs/list",
              query: { category: this.$route.query.category }
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
    handleEdit() {
      this.$router.push({
        path: "/mark/docs/edit",
        query: {
          category: this.$route.query.category,
          docs: this.$route.query.id,
          state: 2
        }
      });
    },
    searchDocs() {
      const that = this;
      var tempData = {
        url: "http://10.85.125.61:13150/query_docs.json", // 接口请求地址
        param: {
          category_idx: this.$route.query.category,
          docs_idx: this.$route.query.id
        }
      };
      let params = new URLSearchParams();
      params.append("data", JSON.stringify(tempData));
      params.append("cip", 230);
      this.$store.dispatch("ProxyPost", params).then(
        res => {
          if (res && res.code == 200) {
            this.content = res.result.content;
            this.title = res.result.title;
            this.time = res.result.creat_time;
            this.username = res.result.username;
            // this.selectCategory = Number(this.$route.query.category);
            // this.categoryName = this.tabList[this.selectCategory].category;
          } else {
            Message({
              showClose: true,
              message: "浏览文章异常！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "浏览文章接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    searchCategory() {
      const that = this;
      var tempData = {
        url: "http://10.85.125.61:13150/query_category.json", // 接口请求地址
        param: {}
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.tabList = res.result;
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
    }
  },
  created() {
    this.searchCategory();
    this.searchDocs();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.detail-wrap {
  width: 100%;
  padding: 20px;
  background: #fbfbfb;
  .v-note-wrapper .v-note-panel {
    border: none;
  }
  .v-note-panel {
    border: none;
  }
  .title {
    border-bottom: 1px solid #e0e0e0;
    margin: 10px 0 10px 0;
    span {
      font-size: 50px;
      font-weight: 700;
    }
  }
  .time {
    font-size: 16px;
    padding: 8px;
    color: #909090;
  }
}
</style>