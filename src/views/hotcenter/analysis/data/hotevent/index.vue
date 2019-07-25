<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap clearfix">
            <h6 class="pane-title left">
                <i class="el-icon-date hidden-xs-only" style="margin-right: 6px;"></i>大事件追溯</h6>
            <el-button class="right" type="success" plain size="mini" @click="handleAdd()">添加</el-button>
        </el-row>
        <!-- <el-row type="flex" class="search-form-wrap">
            <el-form size="small" inline>
                <el-form-item>
                    <el-date-picker v-model="formInline.dt" align="right" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-button type="primary" icon="el-icon-search" @click="onSearch()">
                        <span class="hidden-xs-only">查询</span>
                    </el-button>
                </el-form-item>
            </el-form>
        </el-row> -->
        <el-dialog title="添加大事件" :visible.sync="dialogVisible" width="60%">
            <el-form :model="formAdd" label-position="left" size="small">
                <el-form-item label="标题" required>
                    <el-input type="textarea" autosize v-model.trim="formAdd.title" placeholder="请输入大事件标题" clearable style="max-width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="描述" required>
                    <el-input type="textarea" autosize v-model.trim="text" placeholder="请输入简要描述大事件" clearable style="max-width: 360px"></el-input>
                </el-form-item>
                <el-form-item label="时间" required>
                    <el-date-picker v-model="formAdd.event_date" type="datetime" placeholder="选择日期时间" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="监控图" required>
                    <el-upload action="" accept="image/jpeg,image/png" :on-change="handleFile" :on-remove="handleRemove" list-type="picture-card" :auto-upload="false" :file-list="fileList">
                        <i class="el-icon-plus"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" size="small" @click="addEvent()">添 加</el-button>
            </div>
        </el-dialog>
        <el-row class="content-box-wrap">
            <el-col :span="24" v-if="datalist && datalist.length > 0">
                <el-timeline>
                    <el-timeline-item :key="item.id" v-for="(item, idx) in datalist" :timestamp="parseTime(item.event_date)" placement="top">
                        <!-- <item-list :callback="onSearch" :item="item" :index="(formInline.page - 1) * formInline.count + idx + 1"></item-list> -->
                        <item-list :callback="refreshData" :item="item" :index="idx + 1"></item-list>
                    </el-timeline-item>
                </el-timeline>
                <p class="none-tips" v-if="formInline.page >= totalPage">到底了，没有更多数据…</p>
                <!-- <div style="padding-top: 10px;overflow: auto;">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[2, 5, 10]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div> -->
            </el-col>
        </el-row>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
        <auth></auth>
    </el-main>
</template>

<script>
import Vue from 'vue'
import Auth from "@/components/Tips/Auth";
import ItemList from "./components/ItemList";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "datamonitor",
  components: {
    Auth,
    ItemList
  },
  data() {
    return {
      parseTime,
      datalist: [],
      /* pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 > Date.now();
        },
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }, */
      dialogVisible: false,
      formInline: {
        page: 1,
        count: 3
      },
      formAdd: {
        title: "",
        event_date: "",
        img: [],
        description: {}
      },
      text: "",
      total: 0, // 总条数
      totalPage: 0, // 总页码
      imgObj: {},
      fileList: [],
      isLoading: false,
      isFirst: true
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.onSearch();
      }
    },
    onSearch() {
      const data = {
        url: "/event/getEventList",
        params: {
          ...this.formInline,
          username: this.email,
          cip: 230
        },
        isLoad: this.isFirst
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            this.isFirst = false;
            const temp = res.result || []
            this.datalist = this.datalist.concat(temp);
            this.total = res.total;
            this.totalPage = Math.ceil(this.total / this.formInline.count);
            this.isLoading = false;
          } else {
            Message({
              showClose: true,
              message: res.msg || "查询失败",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "查询接口请求失败",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    /* handleSizeChange(val) {
      this.formInline.count = val;
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.onSearch();
    },
    deleteEvent() {
        //todo delete
    }, */
    handleRemove(file, fileList) {
      if (this.imgObj.hasOwnProperty(file.uid)) {
        delete this.imgObj[file.uid];
      }
    },
    handleFile(file) {
      const url = this.blobToDataURL(file.url, file.uid, this.setImgUrl);
    },
    setImgUrl(url, uid) {
      // this.imgObj[uid] = {uid: uid, url: url};
      this.imgObj[uid] = url;
    },
    addEvent() {
      if (!this.formAdd.title) {
        Message({
          showClose: true,
          message: "请填写标题！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.text) {
        Message({
          showClose: true,
          message: "请填写事件描述！",
          type: "error",
          duration: 3000
        });
        return;
      } else {
        this.formAdd.description["text"] = this.text;
      }
      if (!this.formAdd.event_date) {
        Message({
          showClose: true,
          message: "请选择事件发生日期时间！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (JSON.stringify(this.imgObj) == "{}") {
        Message({
          showClose: true,
          message: "请上传监控图！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将添加大事件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.addAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加！"
          });
        });
    },
    addAction() {
      this.formAdd.img = [];
      for (let i in this.imgObj) {
        this.formAdd.img.push(this.imgObj[i]);
      }
      let params = new URLSearchParams();
      params.append("title", this.formAdd.title);
      params.append("event_date", this.formAdd.event_date);
      params.append("description", JSON.stringify(this.formAdd.description));
      params.append("img", JSON.stringify(this.formAdd.img));
      params.append("username", this.email);
      params.append("cip", 230);
      const data = {
        url: "/event/addEvent",
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.dialogVisible = false;
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
          location.reload();
        } else {
          Message({
            showClose: true,
            message: res.msg || "操作失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "操作接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    refreshData(idx) {
      const data = {
        url: "/event/getEventList",
        params: {
          page: idx,
          count: 1,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            Message({
              showClose: true,
              message: "success",
              type: "success",
              duration: 1000
            });
            const temp = res.result ? res.result[0] : ""
            Vue.set(this.datalist, idx -1, temp); // 更新修改的内容
          } else {
            Message({
              showClose: true,
              message: res.msg || "查询失败",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "查询接口请求失败",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    blobToDataURL(blob, uid, callback) {
      fetch(blob)
        .then(data => {
          const blob = data.blob();
          return blob;
        })
        .then(blob => {
          let reader = new window.FileReader();
          reader.onloadend = function() {
            const data = reader.result;
            callback(data, uid);
          };
          reader.readAsDataURL(blob);
        });
    },
    handleAdd() {
      this.fileList = [];
      this.imgObj = {};
      this.formAdd = {
        title: "",
        event_date: "",
        img: [],
        description: {}
      };
      this.text = "";
      this.dialogVisible = true;
    },
    setScrollListen() {
      const that = this;
      var dom = document.getElementById('app'),
          winHeight = window.innerHeight,
          recalc = function() {
            const page = Math.ceil(dom.scrollTop / winHeight);
            if (!that.isLoading && page >= (2 * that.formInline.page) && that.formInline.page < that.totalPage) {
              that.isLoading = true;
              that.formInline.page = that.formInline.page + 1;
              that.onSearch();
            }
          };
      dom.addEventListener('scroll', recalc, false);
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.setScrollListen();
  },
  watch: {
    pageAuth() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  .el-container {
    .el-noauth {
      background-color: #fff;
    }
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
    .search-form-wrap {
      padding-left: 14px;
      padding-top: 18px;
      background-color: #fff;
      border-bottom: 1px solid #f0f2f5;
    }
    .content-box-wrap {
      padding: 10px;
    }
    .numBox {
      margin-right: 5px;
    }
    .link-btn {
      color: #409eff;
      &:hover {
        text-decoration: underline;
      }
    }
    .none-tips {
      text-align: center;
      padding: 10px 0;
      color: #999;
    }
  }
}
</style>
