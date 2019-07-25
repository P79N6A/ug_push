<template>
<el-main class="mark-docs-wrap">
  <div class="nav-wrap">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/mark/docs' }">全部分类</el-breadcrumb-item>
      <el-breadcrumb-item :to="`/mark/docs/list?category=${tempDoc.category_id}`">文章列表</el-breadcrumb-item>
      <el-breadcrumb-item v-if="tempDoc">
        <span v-if="categoryMap[tempDoc.category_id] && categoryMap[tempDoc.category_id].category_name">{{categoryMap[tempDoc.category_id].category_name}}</span> | <span v-if="tempDoc.title">{{tempDoc.title}}</span> 
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="content-wrap">
    <div class="title" v-show="!isEditable">
      <span>{{tempDoc.title}}</span>
    </div>
    <div class="time">
      <span>{{parseTime(docData.creat_time)}}</span>
      <span style="margin:0 20px;">{{docData.username}}</span>
      <el-button size="mini" type="primary" plain @click.stop="toggleEdit">{{isEditable ? '取消编辑' : '编辑'}}</el-button>
      <el-button size="mini" type="danger" @click.stop="handleDelete">删除</el-button>
      <el-button class="right" size="mini" type="success" @click="creatPost">添加文章</el-button>
    </div>
    <div>
      <div class="show-wrap">
        <div class="edit-content" v-show="isEditable">
          <el-input
            v-model.trim="docData.title"
            style="margin:10px 0;"
            placeholder="请输入标题"
            size="small"
            clearable
          ></el-input>
          <el-select
            v-model="docData.category_id"
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
            @click="handleEdit"
            round
          >发布</el-button>
        </div>
        <mavon-editor
          ref="md"
          class="show_markdown"
          :defaultOpen="defaultData"
          :ishljs="isEditable"
          :subfield="isEditable"
          :toolbarsFlag="isEditable"
          :boxShadow="isEditable"
          @imgAdd="imgAdd"
          v-model="docData.content"
        />
      </div>
    </div>
  </div>
</el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import { parseTime } from "@/utils"

export default {
  components: {},
  props: {},
  data() {
    return {
      parseTime,
      API: {
        getCategory: "http://10.85.125.61:13150/query_category.json", // 分类查询
        getDoc: "http://10.85.125.61:13150/query_docs_content.json", // 获取文章详情
        setDoc: "http://10.85.125.61:13150/edit_docs.json", // 文章操作：增、删、改
      },
      categoryMap: {},
      categoryList: [],
      doc_id: "",
      docData: {},
      tempDoc: {},
      isEditable: false,
      defaultData: "preview",
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
  methods: {
    init() {
      this.doc_id = this.$route.query.id ? this.$route.query.id.toString() : "";
      this.searchCategory();
      this.searchDoc();
    },
    searchCategory() {
      var tempData = {
        url: this.API.getCategory, // 接口请求地址
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
            this.setCategoryMap(this.categoryList);
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
    setCategoryMap(arr) {
      this.categoryMap = {};
      arr.map((val)=>{
        let res = {}
        res[val.category_id] = val;
        Object.assign(this.categoryMap, res);
      })
    },
    searchDoc() {
      var tempData = {
        url: this.API.getDoc, // 接口请求地址
        param: {
          doc_id: this.doc_id
        }
      };
      let params = new URLSearchParams();
      params.append("data", JSON.stringify(tempData));
      params.append("cip", 230);
      this.$store.dispatch("ProxyPost", params).then(
        res => {
          if (res && res.code == 200) {
            this.docData = res.result;
            this.docData.category_id = this.docData.category_id .toString();
            this.tempDoc = JSON.parse(JSON.stringify(this.docData));
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
    handleDelete() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteDoc();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteDoc() {
      var tempData = {
        url: this.API.setDoc, // 接口请求地址
        param: {
          type: 3,
          doc_id: this.doc_id,
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
    toggleEdit() {
      if(this.isEditable) { // 编辑 => 取消编辑
        this.docData = JSON.parse(JSON.stringify(this.tempDoc));
      }
      this.isEditable = !this.isEditable;
    },
    handleEdit() {
      if (!this.docData.title) {
        Message({
          showClose: true,
          message: "请输入文章标题！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.docData.category_id) {
        Message({
          showClose: true,
          message: "请选择文章分类！",
          type: "error",
          duration: 3000
        });
        return;
      }
      const content = this.docData.content ? this.docData.content.trim() : "";
      if (!content) {
        Message({
          showClose: true,
          message: "请输入文章内容！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将发布最新修改，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.editDoc();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消保存"
          });
        });
    },
    editDoc() {
      var tempData = {
        url: this.API.setDoc,
        param: {
          type: 2,
          category_id: this.docData.category_id,
          doc_id: this.docData.doc_id,
          content: this.docData.content,
          title: this.docData.title,
          username: this.email
        }
      };
      let params = new URLSearchParams();
      params.append("data", JSON.stringify(tempData));
      params.append("cip", 230);
      this.$store.dispatch("ProxyPost", params).then(
        res => {
          if (res && res.code == 200) {
            this.isEditable = false;
            this.searchDoc();
          } else {
            Message({
              showClose: true,
              message: "保存文章失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "保存文章接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
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
    creatPost(index) {
      this.$router.push({
        path: "/mark/docs/add",
        query: { category: this.category_id}
      });
    },
  },
  created() {
    this.init();
  },
  mounted() {}
};
</script>
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
    width: 100%;
    .v-note-wrapper .v-note-panel {
      border: none;
    }
    .v-note-panel {
      border: none;
    }
    .show_markdown {
      margin-top: 10px;
      height: 100%;
    }
    .title {
      margin: 10px 0;
      padding: 10px 0;
      text-align: center;
      border-bottom: 2px solid #e0e0e0;
      border-radius: 4px;
      span {
        font-size: 24px;
        font-weight: 700;
      }
    }
    .time {
      font-size: 16px;
      padding: 8px;
      color: #909090;
    }
  }
}
</style>