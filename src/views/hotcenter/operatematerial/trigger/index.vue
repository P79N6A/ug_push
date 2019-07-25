<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-date hidden-xs-only" style="margin-right: 6px;"></i>trigger配置</h6>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :xs="24" :span="23" v-if="userList">
        <el-form :model="configForm" ref="configForm" class="pane-form" label-width="70px" label-position="left" size="small">
          <el-form-item label="用户" prop="users" required>
            <el-select class="left" style="width: 100%;" v-model="configForm.users" placeholder="请选择用户，可输入搜索" filterable @change="getConfig">
              <el-option v-for="(item, key) in userList" :key="key" :label="item" :value="key">
              </el-option>
            </el-select>
            <span class="info-tips left hidden-xs-only">（可输入搜索选择用户）</span>
          </el-form-item>
          <el-form-item label="trigger值" prop="triggers">
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="configForm.triggers" clearable placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="saveEvent">保存配置</el-button>
            <el-button type="info" size="small" plain @click="resetForm('configForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <p v-else class="none-tips">{{tips}}</p>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { formatNum } from "@/utils";
import { Message } from "element-ui";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "operatematerial",
  components: {
    Auth
  },
  data() {
    return {
      configForm: {
        users: "",
        triggers: ""
      }, //配置表
      userList: null,
      tempTriggers: "",
      tips: "loading…" //trigger白名单获取失败
    };
  },
  computed: {
    ...mapGetters(["email", "pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getUserList();
      }
    },
    getUserList() {
      const tempData = {
        url: `${domain}/3/admin/gettriggeruserlist`,
        param: { source }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && Object.keys(res)[0]) {
          this.userList = res;
          this.configForm.users = Object.keys(res)[0];
          this.getConfig();
        } else {
          this.tips = "trigger白名单获取失败";
        }
      });
    },
    getConfig() {
      if (this.configForm.users) {
        let users = [];
        users.push(this.configForm.users);
        const tempData = {
          url: `${domain}/3/admin/gettriggers`,
          param: {
            source,
            users: JSON.stringify(users)
          }
        };
        const params = {
          data: JSON.stringify(tempData),
          cip: 230
        };
        this.$store.dispatch("ProxyGet", params).then(res => {
          if (res) {
            this.configForm.triggers =
              (res && res.data && res.data[this.configForm.users]) || "";
            this.tempTriggers =
              (res && res.data && res.data[this.configForm.users]) || "";
          } else {
            Message({
              showClose: true,
              message: "trigger配置获取失败",
              type: "error",
              duration: 3000
            });
          }
        });
      }
    },
    resetForm(formName) {
      this.configForm.triggers = this.tempTriggers;
    },
    saveEvent() {
      if (!this.configForm.users) {
        Message({
          showClose: true,
          message: "请选择需要配置的用户！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("保存当前配置, 是否继续?", "确认修改配置", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.saveConfig();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    saveConfig() {
      let triggers = {};
      triggers[this.configForm.users] = this.configForm.triggers;
      const tempData = {
        url: `${domain}/3/admin/settriggers`,
        param: {
          staff: this.email,
          source,
          triggers: JSON.stringify(triggers)
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.data === "ok") {
          this.tempTriggers = this.configForm.triggers;
          Message({
            showClose: true,
            message: "设置成功",
            type: "success",
            duration: 1000
          });
        } else {
          Message({
            showClose: true,
            message: (res && res.data) || "设置失败",
            type: "error",
            duration: 0
          });
        }
      });
    }
  },
  created() {
    this.init();
  },
  watch: {
    email() {},
    pageAuth() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  .el-container {
    margin-bottom: 40px;
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
    .pane-form {
      padding: 20px;
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);
      border: 1px solid #ebebeb;
      border-radius: 3px;
    }
    .none-tips {
      margin-top: 10px;
      padding: 10px;
      font-size: 14px;
      text-align: center;
      color: #999;
      background-color: #fff;
      border-radius: 5px;
    }
    .info-tips {
      margin-top: 6px;
      line-height: 1.5;
      color: #e6a23c;
      font-size: 12px;
    }
  }
}
</style>
