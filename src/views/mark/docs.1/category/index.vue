<template>
  <div v-if="pageAuth === 1" class="mark-content">
    <el-card shadow="always" class="box-card" v-for="(item,index) in tabList" :key="index">
      <div slot="header" class="clearfix">
        <span class="category-title">{{item.category}}</span>
        <el-button style="float: right; padding: 3px 0;" @click="toList(index)" type="text">更多</el-button>
        <el-button
          type="danger"
          style="float: right;margin-right:10px;"
          @click="delCategoryPopup(index)"
          icon="el-icon-delete"
          size="mini"
          circle
        ></el-button>
        <el-button
          type="primary"
          style="float: right;"
          icon="el-icon-edit"
          size="mini"
          @click="openEditCategory(index)"
          circle
        ></el-button>
      </div>
      <div
        v-for="(row,idx) in item.children"
        :key="idx"
        class="text item"
        @click="toDetail(index,idx,item.len)"
      >
        <span class="page-title">{{row.title}}</span>
        <span v-if="getTime(row.creat_time)" style="color:red;padding-left:30px;">new</span>
      </div>
    </el-card>
    <el-card shadow="always" class="add-card">
      <div class="add-wrap" @click="addCategoryPopup">
        <i class="el-icon-plus"></i>
      </div>
    </el-card>
    <!-- <el-dialog title="编辑" id="edit" :visible.sync="editCategoryPopup" width="40%">
      <el-input placeholder="请输入编辑分类" v-model="editCategoryValue" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCategoryPopup = false">取 消</el-button>
        <el-button type="primary" @click="editCategory">确 定</el-button>
      </span>
    </el-dialog>-->
    <!-- <el-dialog title="添加" id="add" :visible.sync="addCategoryPopup" width="40%">
      <el-input placeholder="请输入新添分类" v-model="addCategoryValue" clearable></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCategoryPopup = false">取 消</el-button>
        <el-button type="primary" @click="addCategory">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
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
      addCategoryValue: "",
      editCategoryPopup: false,
      editCategoryValue: "",
      editCategoryIndex: "",
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
    getTime() {
      return function getTimeState(time) {
        return new Date(time).toDateString() === new Date().toDateString();
      };
    },
    ...mapGetters(["pageAuth", "email"])
  },
  created() {
    this.searchCategory();
  },
  mounted() {},
  methods: {
    openEditCategory(index) {
      this.editCategoryIndex = index;

      this.$prompt("请输入新名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.editCategory(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    editCategory(value) {
      const that = this;
      const tempData = {
        url: "http://10.85.125.61:13150/edit_category.json", // 接口请求地址
        param: {
          type: 3,
          idx: this.editCategoryIndex,
          category: value
        }
      };
      let params = new URLSearchParams();
      params.append("data", JSON.stringify(tempData));
      params.append("cip", 230);
      this.$store.dispatch("ProxyPost", params).then(
        res => {
          if (res && res.code == 200) {
            this.searchCategory();
            this.editCategoryValue = "";
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
    delCategoryPopup(index) {
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
          this.delCategory(index);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delCategory(index) {
      var tempData = {
        url: "http://10.85.125.61:13150/edit_category.json", // 接口请求地址
        param: {
          type: 2,
          idx: index
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
    toDetail(index, idx,len) {
      // 修改部分 ***********
      let doc_id = len - idx - 1
      this.$router.push({
        path: "/mark/docs/detail",
        query: { category: index, id: doc_id  }
      });
    },
    searchCategory() {
      console.log(111);
      this.tabList = [];
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
            this.tabList = res.result.map((item, index) => {
              return {
                category: item.category,
                children: item.children.reverse().slice(0, 6),
                //修复部分 ***********************
                len:item.children.length
              };
            });
            console.log(2);
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
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          this.addCategory(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    addCategory(value) {
      const that = this;
      const tempData = {
        url: "http://10.85.125.61:13150/edit_category.json", // 接口请求地址
        param: {
          type: 1,
          idx: 1,
          category: value // 用户邮箱前缀
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
    toList(index) {
      this.$router.push({
        path: "/mark/docs/list",
        query: { category: index }
      });
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
.mark-content {
  //   width: 100%;
  //   display: flex;
  //   flex-direction: row;
  // position: absolute;
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
    margin-bottom: 18px;
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
}
</style>