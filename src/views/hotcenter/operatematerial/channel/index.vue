<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">
                <i class="el-icon-date hidden-xs-only" style="margin-right: 6px;"></i>频道流降级开关</h6>
        </el-row>
        <el-row class="content-box-wrap">
            <el-col :xs="24" :sm="18" :md="12" :lg="9" :xl="4" v-if="tips === 'success'">
                <el-form :model="configForm" ref="configForm" class="pane-form" size="small">
                    <el-form-item label="开启降级" prop="data">
                        <el-switch v-model="configForm.data">
                        </el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" size="small" @click="saveEvent">保存设置</el-button>
                        <el-button type="info" size="small" plain @click="resetForm()">重置</el-button>
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
  name: "operateMixture",
  components: {
    Auth
  },
  data() {
    return {
      configForm: {
        data: null
      }, //配置表
      tempDegrade: false,
      tips: "loading…" //混合流降级配置获取失败
    };
  },
  computed: {
    ...mapGetters(["email", "pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getConfig();
      }
    },
    getConfig() {
      const tempData = {
        url: `${domain}/3/admin/getChannel`,
        param: {
          source,
          t: Date.now()
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res) {
          this.configForm.data = res.channel_degrade === 1 ? true : false;
          this.tempDegrade = res.channel_degrade === 1 ? true : false;
          this.tips = "success";
        } else {
          this.tips = "频道流降级配置获取失败";
        }
      });
    },
    resetForm(formName) {
      this.configForm.data = this.tempDegrade;
    },
    saveEvent() {
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
      const tempData = {
        url: `${domain}/3/admin/setChannel`,
        param: {
          staff: this.email,
          source: source,
          t: Date.now(),
          data: this.configForm.data ? 1 : 0
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      console.log(tempData);
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.msg === "设置成功!") {
          this.tempDegrade = this.configForm.data;
          Message({
            showClose: true,
            message: "设置成功!",
            type: "success",
            duration: 1000
          });
        } else {
          Message({
            showClose: true,
            message: (res && res.msg) || "设置失败",
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
  }
}
</style>
