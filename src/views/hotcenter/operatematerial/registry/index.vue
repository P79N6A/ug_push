<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">注册中心 - 服务列表</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24">
        <el-form inline :model="formInline" size="mini">
          <el-form-item label="服务名称">
            <el-input v-model="formInline.name" placeholder="请输入服务名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSearch">
              <span class="hidden-xs-only">查询</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="24">
        <div style="padding: 10px 0;" class="clearfix">
          <el-button type="success" size="mini" class="left" @click="dialogVisible = true;">
            <i class="el-icon-plus hidden-xs-only"></i> 添加
          </el-button>
        </div>
        <el-dialog title="添加配置服务" :visible.sync="dialogVisible">
          <el-form :model="formAdd" label-width="80px" :rules="rules" size="small">
            <el-form-item label="服务名称" prop="name" required>
              <el-input type="textarea" autosize v-model.trim="formAdd.name" placeholder="请输入服务名称" clearable style="max-width: 360px"></el-input>
            </el-form-item>
            <el-form-item label="服务描述" prop="description" required>
              <el-input type="textarea" autosize v-model.trim="formAdd.description" placeholder="请输入服务描述" clearable style="max-width: 360px"></el-input>
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
            <el-table-column prop="name" label="服务名称">
              <template slot-scope="scope">
                <router-link class="link-btn" :to="`/hotcenter/operatematerial/registry/detail?name=${scope.row.name}&parent_id=${scope.row.id}`">{{scope.row.name}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="服务描述" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.description == undefined || scope.row.description === "" ? '暂无' : scope.row.description}}</template>
            </el-table-column>
            <el-table-column align="left" prop="create_time" label="添加时间" width="140">
              <template slot-scope="scope">{{parseTime(scope.row.create_time, '{y}-{m}-{d} {h}:{i}:{s}')}}</template>
            </el-table-column>
            <el-table-column align="left" prop="operator" label="操作人">
            </el-table-column>
            <el-table-column align="left" label="操作项" min-width="90">
              <template slot-scope="scope">
                <operate-list :data="scope.row" :rapi="Reg_API" :callback="onSearch"></operate-list>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding-top: 10px;overflow: auto;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[5, 10, 20, 30, 40]" :page-size="formInline.count" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
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
import OperateList from "./OperateList";

export default {
  name: "RegistryCenter",
  components: {
    Auth,
    OperateList
  },
  data() {
    return {
      parseTime,
      Reg_API: {
        //注册中心服务API
        get: "/regconf/getRegConf",
        add: "/regconf/addRegConf",
        set: "/regconf/editRegConf",
        del: "/regconf/delRegConf"
      },
      dialogVisible: false,
      formInline: {
        name: "",
        page: 1,
        count: 10,
      },
      total: 0,
      formAdd: {
        name: "",
        description: ""
      },
      rules: {
          name: [
            { required: true, message: "请输入配置服务名称", trigger: "blur" },
            { required: true, message: "请输入配置服务名称", trigger: "change" }
          ],
          description: [
            { required: true, message: "请输入配置服务描述", trigger: "blur" },
            { required: true, message: "请输入配置服务描述", trigger: "change" }
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
        this.onSearch();
      }
    },
    onSearch() {
      this.getList().then(info => {
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
    getList() {
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
                    this.dataList = res.result || [];
                    this.total = res.total;
                    resolve(res.msg || 'Success!');
                } else {
                    reject(res.msg || '注册服务列表获取失败！');
                }
            }, err => {
                reject('注册服务列表获取接口请求失败！');
            });
        });
    },
    addEvent() {
      //添加配置服务
      if (this.formAdd.name == undefined || this.formAdd.name === "") {
        Message({
          showClose: true,
          message: "服务名称不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.formAdd.description == undefined || this.formAdd.description === "") {
        Message({
          showClose: true,
          message: "服务描述不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将添加配置服务, 是否继续?", "提示", {
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
            params.append("name", this.formAdd.name);
            params.append("description", this.formAdd.description);
            params.append("username", this.email);
            const data = {
                url: this.Reg_API.add,
                params: params
            };
            this.$store.dispatch("CommonPost", data).then(res => {
                if (res.code && res.code == 200) {
                    this.dialogVisible = false;
                    resolve();
                } else {
                    reject(res.msg || '配置服务添加失败！');
                }
            }, err => {
                reject(res.msg || '配置服务添加接口请求失败！');
            });
        });
    },
    cancelEvent() {
      this.dialogVisible = false;
      this.formAdd = {
        name: "",
        description: ""
      };
    },
    handleSizeChange(val) {
      this.formInline.count = val;
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.onSearch();
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
  .search-form-wrap {
    padding-left: 14px;
    padding-top: 18px;
    background-color: #fff;
    border-bottom: 1px solid #f0f2f5;
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