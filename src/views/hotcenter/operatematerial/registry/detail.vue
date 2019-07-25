<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title left">注册中心 | 服务详情 - {{this.formInline.name}}</h6>
        <router-link class="link-btn right" to="/hotcenter/operatematerial/registry">返回服务列表</router-link>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="24">
        <div style="padding: 10px 0;" class="clearfix">
          <el-button type="success" size="mini" class="left" @click="dialogVisible = true;">
            <i class="el-icon-plus hidden-xs-only"></i> 添加
          </el-button>
        </div>
        <el-dialog title="添加服务kv值" :visible.sync="dialogVisible">
          <el-form :model="formAdd" label-width="70px" label-position="left" :rules="rules" size="small">
            <el-form-item label="服务名称">
                <span>{{this.formInline.name}}</span>
            </el-form-item>
            <el-form-item label="key" prop="key" required>
              <el-input type="textarea" autosize v-model.trim="formAdd.key" placeholder="请输入key值" clearable style="max-width: 360px"></el-input>
            </el-form-item>
            <el-form-item label="value" prop="value" required>
              <el-input type="textarea" autosize v-model.trim="formAdd.value" placeholder="请输入value值" clearable style="max-width: 360px"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" autosize v-model.trim="formAdd.description" placeholder="请输入描述" clearable style="max-width: 360px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEvent()" size="small">取 消</el-button>
            <el-button type="primary" size="small" @click="addEvent()">添 加</el-button>
          </div>
        </el-dialog>
        <el-row v-if="dataList">
          <el-table :data="dataList" style="width: 100%" border stripe size="mini">
            <el-table-column type="index" label="序号" width="50">
            </el-table-column>
            <el-table-column prop="key" label="key">
            </el-table-column>
            <el-table-column prop="value" label="value">
            </el-table-column>
            <el-table-column prop="description" label="描述" show-overflow-tooltip>
                <template slot-scope="scope">{{scope.row.description == undefined || scope.row.description === "" ? '暂无' : scope.row.description}}</template>
            </el-table-column>
            <el-table-column align="left" label="操作项" width="94">
              <template slot-scope="scope">
                <operate-detail :data="scope.row" :rapi="Reg_API" :callback="onSearch"></operate-detail>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { tags } from "@/utils/tagmap";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";
import OperateDetail from "./OperateDetail";

export default {
  name: "RegistryCenter",
  components: {
    Auth,
    OperateDetail
  },
  data() {
    return {
      parseTime,
      Reg_API: {
        //注册中心服务详情API
        get: "/regconf/getConfDetails",
        set: "/regconf/setConfDetail",
      },
      dialogVisible: false,
      formInline: {
        parent_id: "",
        name: ""
      },
      formAdd: {
        id: 0,
        key: "",
        value: "",
        description: ""
      },
      rules: {
          key: [
            { required: true, message: "请输入key值", trigger: "blur" },
            { required: true, message: "请输入key值", trigger: "change" }
          ],
          value: [
            { required: true, message: "请输入value值", trigger: "blur" },
            { required: true, message: "请输入value值", trigger: "change" }
          ]
      },
      dataList: []
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.formInline.parent_id = this.$route.query.parent_id;
        this.formInline.name = this.$route.query.name;
        this.onSearch();
      }
    },
    onSearch() {
      this.getDetail().then(info => {
          Message({
            showClose: true,
            message: info,
            type: "success",
            duration: 1000
          });
      }, err => {
          Message({
            showClose: true,
            message: err,
            type: "error",
            duration: 3000
          });
      });
    },
    getDetail() {
        return new Promise((resolve, reject) => {
            const data = {
                url: this.Reg_API.get,
                params: {
                    ...this.formInline,
                    username: this.email
                }
            };
            this.$store.dispatch("CommonGet", data).then(res => {
                if (res && res.code == 200) {
                    this.dataList = res.data || [];
                    resolve(res.msg || 'Success!');
                } else {
                    reject(res.msg || '注册服务详情获取失败！');
                }
            }, err => {
                reject('注册服务详情获取接口请求失败！');
            });
        });
    },
    addEvent() {
      //添加服务kv值
      if (!this.formAdd.key) {
        Message({
          showClose: true,
          message: "key值不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.formAdd.value == undefined) {
        Message({
          showClose: true,
          message: "value值不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.formAdd.description == undefined) {
        Message({
          showClose: true,
          message: "描述不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将添加服务kv值, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.addAction().then(() => {
              this.onSearch();
          }, err => {
              Message({
                showClose: true,
                message: err,
                type: "error",
                duration: 3000
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加！"
          });
        });
    },
    addAction() {
        return new Promise((resolve, reject) => {
            let params = new URLSearchParams();
            params.append("parent_name", this.formInline.name);
            params.append("parent_id", this.formInline.parent_id);
            params.append("key", this.formAdd.key);
            params.append("id", this.formAdd.id);
            params.append("value", this.formAdd.value);
            params.append("description", this.formAdd.description);
            params.append("username", this.email);
            const data = {
                url: this.Reg_API.set,
                params: params
            };
            this.$store.dispatch("CommonPost", data).then(res => {
                if (res.code && res.code == 200) {
                    this.dialogVisible = false;
                    resolve();
                } else {
                    reject(res.msg || '服务kv添加失败！');
                }
            }, err => {
                reject(res.msg || '服务kv添加接口请求失败！');
            });
        });
    },
    cancelEvent() {
      this.dialogVisible = false;
      this.formAdd = {
        id: 0,
        key: "",
        value: "",
        description: ""
      };
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

<style lang="scss" scoped>
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
  .content-box-wrap {
    padding: 10px;
  }
}
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
</style>