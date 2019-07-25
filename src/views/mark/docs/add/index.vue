<template>
  <el-main class="mark-docs-wrap">
    <div class="nav-wrap">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/mark/docs' }">全部分类</el-breadcrumb-item>
        <el-breadcrumb-item :to="`/mark/docs/list?category=${category_id}`">文章列表</el-breadcrumb-item>
        <el-breadcrumb-item>
          <span>添加文章</span> 
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="show-wrap">
      <div class="edit-content">
        <el-input
          v-model.trim="title"
          style="margin:10px 0;"
          placeholder="请输入标题"
          size="small"
          clearable
        ></el-input>
        <el-select
          v-model="category_id"
          style="max-width: 360px;min-width: 200px;"
          placeholder="请选择文章分类"
          size="mini"
          filterable
        >
          <el-option
            v-for="item in categoryList"
            :key="item.category_id"
            :label="item.category_name"
            :value="item.category_id.toString()"
          ></el-option>
        </el-select>
        <el-button
          style="margin-left:5px"
          type="success"
          size="mini"
          @click="handleAdd"
          round
        >发布</el-button>
      </div>
      <mavon-editor
        ref="md"
        class="show_markdown"
        @imgAdd="imgAdd"
        :ishljs="true"
        :toolbars="editConfig"
        v-model="content"
      />
    </div>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  components: {},
  props: {},
  data() {
    return {
      API: {
        getCategory: "http://10.85.125.61:13150/query_category.json", // 分类查询
        setDoc: "http://10.85.125.61:13150/edit_docs.json" // 文章操作：增、删、改
      },
      title: "",
      category_id: "",
      categoryList: [],
      content: "",
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
    ...mapGetters(["email"])
  },
  methods: {
    init() {
      this.category_id = this.$route.query.category || "";
      this.searchCategory();
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
      this.$store
        .dispatch("ProxyGet", params)
        .then(
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
        )
        .then(() => {
          if (this.$route.query.state == 2) {
            this.searchDocs();
          } else {
          }
        });
    },
    imgAdd(pos, $file) {
      const tempData = {
        url: "http://10.85.125.61:13150/push_images.json", // 接口请求地址
        param: {
          pic_data: $file.miniurl
        }
      };

      let params = new URLSearchParams();
      params.append("data", JSON.stringify(tempData));
      params.append("cip", 230);
      this.$store.dispatch("ProxyPost", params).then(
        res => {
          if (res && res.code == 200) {
            let url = "http://10.85.125.61:13150" + res.result.url;
            this.$refs.md.$img2Url(pos, url);
          } else {
            Message({
              showClose: true,
              message: "上传图片失败异常！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "上传图片接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    handleAdd() {
      if (!this.title) {
        Message({
          showClose: true,
          message: "请输入文章标题！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.category_id) {
        Message({
          showClose: true,
          message: "请选择文章分类！",
          type: "error",
          duration: 3000
        });
        return;
      }
      const content = this.content ? this.content.trim() : "";
      if (!content) {
        Message({
          showClose: true,
          message: "请输入文章内容！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将发布新增文章，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addDoc();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消添加"
          });
        });
    },
    addDoc() {
      var tempData = {
        url: this.API.setDoc,
        param: {
          type: 1,
          category_id: this.category_id,
          content: this.content,
          title: this.title,
          username: this.email
        }
      };
      let params = new URLSearchParams();
      params.append("data", JSON.stringify(tempData));
      params.append("cip", 230);
      this.$store.dispatch("ProxyPost", params).then(
        res => {
          if (res && res.code == 200) {
            this.$router.push({
              path: "/mark/docs/detail",
              query: { id: res.result.doc_id, category: this.category_id }
            });
          } else {
            Message({
              showClose: true,
              message: "添加文章失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "添加文章接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    }
  },
  created() {
    this.init();
  },
  mounted() {}
};
</script>
<style lang="scss">
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
  .v-note-wrapper .v-note-panel {
    border: none;
  }
  .v-note-panel {
    border: none;
  }
  .show-wrap {
    padding: 0 15px;
    width: 100%;
    height: 100%;
  }
  .show_markdown {
    margin-top: 10px;
    height: 100%;
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