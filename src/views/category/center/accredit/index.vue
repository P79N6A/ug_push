<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-edit-outline hidden-xs-only" style="margin-right: 6px;"></i>领域授权</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="cateList && cateList.length > 0">
        <el-form inline :model="formInline" label-position="left" size="mini">
          <el-form-item label="邮箱前缀" label-width="70px">
            <el-input v-model="formInline.prefix" placeholder="请输入邮箱前缀" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择领域" label-width="70px">
            <el-select v-model="formInline.field_id" filterable placeholder="请选择领域">
              <el-option label="所有领域" value="" v-if="hasAllAuth"></el-option>
              <el-option v-for="(item, key) in cateList" :key="key" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="onSearch">
              <span class="hidden-xs-only">查询</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" v-else>
        <el-alert :title="tips" type="warning" show-icon :closable="false">
        </el-alert>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap" v-if="cateList && cateList.length > 0">
      <el-col :span="24">
        <div style="padding: 10px 0;" class="clearfix">
          <el-button type="success" size="mini" class="left" @click="dialogVisible = true">添加领域业务方</el-button>
        </div>
        <el-dialog title="添加领域业务方" :visible.sync="dialogVisible">
          <el-form :model="formAdd" ref="formAdd" size="small">
            <el-form-item prop="field_id" label="选择领域" label-width="120px" required v-if="cateList">
              <el-select v-model="formAdd.field_id" placeholder="请选择领域" filterable>
                <el-option v-for="(item, key) in cateList" :key="key" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="prefix" label="邮箱前缀" label-width="120px" required>
              <el-input style="max-width: 400px;" v-model="formAdd.prefix" placeholder="输入用户邮箱前缀"></el-input>
            </el-form-item>
            <el-form-item label="用户名" label-width="120px">
              <el-input style="max-width: 400px;" v-model="realname" placeholder="请输入中文名"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEvent()" size="small">取 消</el-button>
            <el-button type="primary" @click="addEvent()" size="small">添 加</el-button>
          </div>
        </el-dialog>
        <el-row>
          <el-table :data="dataList" style="width: 100%" border stripe size="mini">
            <el-table-column fixed align="center" prop="id" label="领域id" width="70px">
            </el-table-column>
            <el-table-column align="left" prop="name" label="授权领域">
            </el-table-column>
            <el-table-column align="left" prop="account" label="邮箱">
              <template slot-scope="scope">
                <span>{{formatEmailList(scope.row.account)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="update_time" label="授权时间">
              <template slot-scope="scope">
                <span>{{(scope.row.update_time || scope.row.create_time) && _parseTime(scope.row.update_time || scope.row.create_time) || '未知'}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="operator" label="操作人">
            </el-table-column>
            <el-table-column align="left" label="操作项" min-width="90">
              <template slot-scope="scope">
                <operate-field :data="scope.row" :callback="onSearch" :apiconf="apiConf"></operate-field>
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
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";
import OperateField from "./operate";

export default {
  name: "categoryList",
  components: {
    Auth,
    OperateField
  },
  data() {
    return {
      apiConf: {
        //领域管理API
        getField: "/field/getFieldList",
        getUserRole: "/role/getUserRole",
        addFieldAccount: "/field/addFieldAccount",
        setFieldAccount: "/field/setFieldAccount"
      },
      dialogVisible: false,
      cateList: null,
      dataList: null,
      formInline: {
        field_id: "",
        prefix: ""
      },
      formAdd: {
        field_id: "",
        prefix: ""
      },
      realname: "",
      tips: "loading...",
      hasAllAuth: false, //是否有所有领域授权权限
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getUserRole();
      }
    },
    getUserRole() {
      const data = {
        url: this.apiConf.getUserRole,
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          if (res.result && (res.result.permission.indexOf(5) > -1 || res.result.permission.indexOf(4) > -1)) {
            this.cateList = res.result && res.result.field || [];
            this.hasAllAuth = res.result.permission.indexOf(4) > -1 ? true : false;
            if (this.cateList.length > 0) {
              this.formAdd.field_id = this.cateList[0].id;
              !this.hasAllAuth && (this.formInline.field_id = this.cateList[0].id);
              this.onSearch();
            } else {
              this.tips = "暂无可授权的领域";
            }
          } else {
            this.tips = "暂无可授权的领域";
          }
        } else {
          this.tips = "暂无可授权的领域";
        }
      },err => {
        this.tips = "接口异常";
      });
    },
    onSearch() {
      const data = {
        url: this.apiConf.getField,
        params: {
          ...this.formInline,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "success!",
            type: "success",
            duration: 1000
          });
          this.dataList = res.result;
        }
      });
    },
    addEvent() {
      //添加领域业务方
      if (!this.formAdd.prefix) {
        Message({
          showClose: true,
          message: "请输入用户邮箱前缀！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.addHotUser();
    },
    addHotUser() {
      //将用户添加到热门管理平台
      const data = {
        url: "/user/add",
        params: {
          userid: this.formAdd.prefix,
          realname: this.realname,
          type: "2",
          usergroup: "outer",
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.addFieldAccount();
        } else {
          if (res && res.msg == 'The data has already existed') {
            this.addFieldAccount();
          } else {
            Message({
              showClose: true,
              message: res.msg || "用户添加失败！",
              type: "error",
              duration: 0
            });
          }
        }
      });
    },
    addFieldAccount() {
      const data = {
        url: this.apiConf.addFieldAccount,
        params: {
          ...this.formAdd,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "添加成功!",
            type: "success",
            duration: 1000
          });
          this.dialogVisible = false;
          this.cancelEvent();
          this.onSearch();
        } else {
          Message({
            showClose: true,
            message: res.msg || "添加失败!",
            type: "error",
            duration: 0
          });
        }
      });
    },
    cancelEvent() {
      this.dialogVisible = false;
      this.$refs["formAdd"].resetFields();
    },
    formatEmailList(account) {
      if (account && account.length > 0) {
        let arr = [];
        for (let i = 0; i < account.length; i++) {
          arr.push(account[i].email_prefix);
        }
        return arr.join("、");
      } else {
        return "暂无";
      }
    },
    _parseTime(time, option) {
      return parseTime(time, option);
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