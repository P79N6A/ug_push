<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>角色管理</h6>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="24" v-if="hasRoleAuth">
        <div style="padding: 10px 0;" class="clearfix">
          <el-button type="success" size="mini" class="left" @click="dialogVisible = true">添加角色用户</el-button>
        </div>
        <el-dialog title="添加角色用户" :visible.sync="dialogVisible">
          <el-form :model="formAdd" ref="formAdd" size="small">
            <el-form-item prop="role_id" label="选择角色" label-width="120px" required v-if="roleList">
              <el-select v-model="formAdd.role_id" placeholder="请选择角色" filterable>
                <el-option v-for="(item, key) in roleList" :key="key" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="field_id" label="选择领域" label-width="120px" required v-if="cateList && formAdd.role_id == 3">
              <el-select v-model="formAdd.field_id" filterable placeholder="请选择领域">
                <el-option v-for="(item, key) in cateList" :key="key" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="prefix" label="邮箱前缀" label-width="120px" required>
              <el-input style="max-width: 400px;" v-model="formAdd.prefix" placeholder="输入用户邮箱前缀"></el-input>
            </el-form-item>
            <el-form-item label="用户名" label-width="120px">
              <el-input style="max-width: 400px;" v-model="formAdd.realname" placeholder="请输入中文名"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEvent()" size="small">取 消</el-button>
            <el-button type="primary" @click="addEvent()" size="small">添 加</el-button>
          </div>
        </el-dialog>
        <el-row v-if="roleList">
          <el-table :data="roleList" style="width: 100%" border stripe size="mini">
            <el-table-column fixed align="left" prop="name" label="角色">
            </el-table-column>
            <el-table-column align="left" prop="permission" label="权限">
              <template slot-scope="scope">
                <span :key="key" v-for="(val, key) in scope.row.permission">☑{{val.permission_name}}<br /></span>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="account" label="邮箱">
              <template slot-scope="scope">
                <span>{{formatEmailList(scope.row.account)}}</span>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="operator" label="操作人">
            </el-table-column>
            <el-table-column align="left" label="操作项" min-width="90">
              <template slot-scope="scope">
                <operate-role :data="scope.row" :callback="getRoleList" :apiconf="apiConf"></operate-role>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-col>
      <el-col :span="24" v-else>
        <el-alert :title="tips" type="warning" show-icon :closable="false">
        </el-alert>
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
import OperateRole from "./operate";

export default {
  name: "roleList",
  components: {
    Auth,
    OperateRole
  },
  data() {
    return {
      apiConf: {
        //角色管理API
        getRole: "/role/getRoleList",
        getUserRole: "/role/getUserRole",
        addRoleAccount: "/role/addRoleAccount",
        setRoleAccount: "/role/setRoleAccount",
        addFieldAccount: "/field/addFieldAccount"
      },
      dialogVisible: false,
      cateList: null,
      roleList: null,
      formAdd: {
        role_id: 1,
        field_id: "",
        prefix: "",
        realname: ""
      },
      hasRoleAuth: false,
      tips: "loading..."
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
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            if (res.result && res.result.permission.indexOf(1) > -1) {
              this.hasRoleAuth = true;
              this.cateList = (res.result && res.result.field) || [];
              this.getRoleList();
            } else {
              this.tips = "暂无角色管理页面权限";
            }
          } else {
            this.tips = "暂无角色管理页面权限";
          }
        },
        err => {
          this.tips = "接口异常";
        }
      );
    },
    getRoleList() {
      const data = {
        url: this.apiConf.getRole,
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.roleList = res.result;
        } else {
          Message({
            showClose: true,
            message: res.msg || "查询失败!",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    addEvent() {
      //添加角色用户
      if (
        this.formAdd.role_id == 3 &&
        isNaN(this.formAdd.field_id) &&
        !this.formAdd.field_id
      ) {
        Message({
          showClose: true,
          message: "请选择领域业务方！",
          type: "error",
          duration: 3000
        });
        return;
      }
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
          realname: this.formAdd.realname,
          type: "2",
          usergroup: "outer",
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.addAccount();
        } else {
          if (res && res.msg == 'The data has already existed') {
            this.addAccount();
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
    addAccount() {
      if (this.formAdd.role_id == 3) {
        this.addFieldAccount();
      } else {
        this.addRoleAccount();
      }
    },
    addRoleAccount() {
      const data = {
        url: this.apiConf.addRoleAccount,
        params: {
          role_id: this.formAdd.role_id,
          prefix: this.formAdd.prefix,
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
          this.getRoleList();
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
    addFieldAccount() {
      const data = {
        url: this.apiConf.addFieldAccount,
        params: {
          field_id: this.formAdd.field_id,
          prefix: this.formAdd.prefix,
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
          this.getRoleList();
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
        return [...new Set(arr)].join("、"); // 去重然后转化为、分割的字符串
      } else {
        return "暂无";
      }
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