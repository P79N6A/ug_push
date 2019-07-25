<template>
  <el-main class="detail-wrap">
    <div class="show-wrap">
      <div class="edit-content">
        <el-input v-model="title" style="margin-top:10px;" placeholder="请输入标题"></el-input>
        <el-select v-model="selectCategory" style="margin-top:10px;" placeholder="请选择文章分类">
          <el-option
            v-for="(item,index) in tabList"
            :key="index"
            :label="item.category"
            :value="index"
          ></el-option>
        </el-select>
        <el-button style="margin-left:5px" type="success" size="mini" @click="pushPage" round>发布</el-button>
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
      selectCategory: "",
      categoryName: "",
      // categoryState: false,
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
    ...mapGetters(["email"])
  },
  methods: {
    imgAdd(pos, $file) {
      const that = this;
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
    searchDocs() {
      const that = this;
      var tempData = {
        url: "http://10.85.125.61:13150/query_docs.json", // 接口请求地址
        param: {
          category_idx: this.$route.query.category,
          docs_idx: this.$route.query.docs
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

            console.log(this.selectCategory);
            this.categoryName = this.tabList[this.selectCategory].category;
          } else {
            Message({
              showClose: true,
              message: "保存失败异常！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "保存接口异常！",
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
      this.$store
        .dispatch("ProxyGet", params)
        .then(
          res => {
            if (res && res.code == 200) {
              this.tabList = res.result;
              this.selectCategory = Number(this.$route.query.category);
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
    pushPage() {
      const that = this;
      if (
        this.$route.query.state == 2 &&
        this.selectCategory != this.$route.query.category
      ) {
        const that = this;
        var tempData = {
          url: "http://10.85.125.61:13150/del_docs.json", // 接口请求地址
          param: {
            category_idx: this.$route.query.category,
            docs_idx: this.$route.query.docs
          }
        };
        const params = {
          data: JSON.stringify(tempData),
          cip: 230
        };
        this.$store.dispatch("ProxyGet", params).then(
          res => {
            if (res && res.code == 200) {
              var tempData = {
                url: "http://10.85.125.61:13150/edit_docs.json", // 接口请求地址
                param: {
                  category_idx: this.selectCategory,
                  docs_idx: this.$route.query.docs
                    ? this.$route.query.docs
                    : 0,
                  type: 1,
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
                    this.tableData = res.result;
                    this.$router.push({
                      path: "/mark/docs/list",
                      query: { category: this.selectCategory }
                    });
                  } else {
                    Message({
                      showClose: true,
                      message: "保存失败异常！",
                      type: "error",
                      duration: 0
                    });
                  }
                },
                err => {
                  Message({
                    showClose: true,
                    message: "保存接口异常！",
                    type: "error",
                    duration: 0
                  });
                }
              );
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
      } else {
        var tempData = {
          url: "http://10.85.125.61:13150/edit_docs.json", // 接口请求地址
          param: {
            category_idx: this.selectCategory,
            docs_idx: this.$route.query.docs_idx
              ? this.$route.query.docs_idx
              : 0,
            type: Number(this.$route.query.state),
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
              this.tableData = res.result;
              this.$router.push({
                path: "/mark/docs/list",
                query: { category: this.$route.query.category }
              });
            } else {
              Message({
                showClose: true,
                message: "保存失败异常！",
                type: "error",
                duration: 0
              });
            }
          },
          err => {
            Message({
              showClose: true,
              message: "保存接口异常！",
              type: "error",
              duration: 0
            });
          }
        );
      }
    }
  },
  created() {
    this.searchCategory();
  },
  mounted() {}
};
</script>
<style lang="scss">
.detail-wrap {
  width: 100%;
  background: #fbfbfb;
  .v-note-wrapper .v-note-panel {
    border: none;
  }
  .v-note-panel {
    border: none;
  }
  .show-wrap {
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