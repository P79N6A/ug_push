<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i
          class="el-icon-date hidden-xs-only"
          style="margin-right: 6px;"
        ></i>前端白名单配置</h6>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="24">
        <el-dialog
          title="测试验证"
          :visible.sync="dialogFormVisible"
        >
          <a class="link-btn" :href="dcp_link_test" target="_blank">去验证</a>
          <div
            slot="footer"
            class="dialog-footer"
          >
            <el-button
              @click="stepActive = 3;dialogFormVisible = false;"
              size="small"
            >验证不通过</el-button>
            <el-button
              type="success"
              @click="checkPass()"
              size="small"
            >验证通过</el-button>
          </div>
        </el-dialog>
        <el-collapse v-model="activeNames">
          <el-collapse-item :name="1">
            <template slot="title">
              <div class="collapse-title">发布流程</div>
            </template>
            <el-steps
              :active="stepActive"
              finish-status="success"
              align-center
            >
              <el-step
                :description="testDesc"
                :status="testStatus[stepActive]"
              >
                <template slot="title">
                  <div style="padding-bottom: 10px;">
                    <el-button
                      v-if="stepActive === 0"
                      icon="el-icon-caret-right"
                      type="primary"
                      round
                      size="mini"
                      :loading="testLoading"
                      @click="testEvent()"
                    >启动测试</el-button>
                    <div v-else-if="stepActive === 1">
                      <el-button
                        type="primary"
                        icon="el-icon-caret-right"
                        round
                        size="mini"
                        :loading="testLoading"
                        @click="testEvent()"
                      >重启测试</el-button>
                      <el-button
                        type="warning"
                        icon="el-icon-refresh"
                        round
                        size="mini"
                        @click="testRollbackEvent()"
                      >回滚</el-button>
                    </div>
                    <p v-else>启动测试</p>
                  </div>
                </template>
              </el-step>
              <el-step
                :description="checkDesc"
                :status="checkStatus[stepActive]"
              >
                <template slot="title">
                  <div style="padding-bottom: 10px;">
                    <div v-if="stepActive === 2">
                      <el-button
                        icon="el-icon-caret-right"
                        type="primary"
                        round
                        size="mini"
                        @click="dialogFormVisible = true"
                      >测试验证</el-button>
                      <el-button
                        round
                        size="mini"
                        @click="checkPass();"
                      >跳过验证</el-button>
                    </div>
                    <div v-else-if="stepActive === 3">
                      <el-button
                        type="warning"
                        icon="el-icon-refresh"
                        round
                        size="mini"
                        @click="checkRollbackEvent()"
                      >回滚</el-button>
                      <el-button
                        round
                        size="mini"
                        @click="checkPass()"
                      >跳过验证</el-button>
                    </div>
                    <p v-else>测试验证</p>
                  </div>
                </template>
              </el-step>
              <el-step
                :description="deployDesc"
                :status="deployStatus[stepActive]"
              >
                <template slot="title">
                  <div style="padding-bottom: 10px;">
                    <el-button
                      v-if="stepActive === 4"
                      icon="el-icon-caret-right"
                      type="primary"
                      round
                      size="mini"
                      :loading="deployLoading"
                      @click="deployEvent()"
                    >启动部署</el-button>
                    <el-button
                      v-else-if="stepActive === 5"
                      type="primary"
                      icon="el-icon-caret-right"
                      round
                      size="mini"
                      :loading="deployLoading"
                      @click="deployEvent()"
                    >重启部署</el-button>
                    <p v-else>启动部署</p>
                  </div>
                </template>
              </el-step>
              <el-step
                title="部署成功"
                description="白名单配置文件全量部署成功"
                :status="deployBackStatus[stepActive]"
              >
              </el-step>
            </el-steps>
            <div v-if="stepActive === 6" class="btn-box" style="padding-left: 20px;">
              <a class="link-btn" :href="dcp_link_deploy" target="_blank">查看部署结果</a>
            </div>
          </el-collapse-item>
          <el-collapse-item :name="2">
            <template slot="title">
              <div class="collapse-title">白名单配置</div>
            </template>
            <div class="content-edit-box">
              <pre
                v-if="!editable"
                v-html="resourceContent || '暂无内容'"
                style="color: #000;font-size: 14px;padding: 5px 0px;line-height: 1.5;"
              ></pre>
              <el-input
                v-if="editable"
                type="textarea"
                autosize
                placeholder="请输入内容"
                v-model.trim="resourceContent"
              />
              <div class="operate-box">
                <el-button
                  v-if="editable"
                  size="small"
                  type="success"
                  @click="saveEvent()"
                >保存修改</el-button>
                <el-button
                  size="small"
                  type="primary"
                  @click="toggleEditEvent()"
                >{{editable ? '取消编辑' : '编辑文档'}}</el-button>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  name: "WhiteListConfig",
  components: {
    Auth
  },
  data() {
    return {
      editable: false,
      tempData: "",
      resourceContent: "",
      activeNames: [1, 2],
      stepActive: 0,
      testStatus: {
        0: "process",
        1: "error", //启动测试请求失败
        2: "success", //启动测试请求成功
        3: "success",
        4: "success",
        5: "success",
        6: "success"
      },
      checkStatus: {
        0: "wait",
        1: "wait",
        2: "process",
        3: "error", //测试验证不通过
        4: "success", //测试验证通过
        5: "success",
        6: "success"
      },
      deployStatus: {
        0: "wait",
        1: "wait",
        2: "wait",
        3: "wait",
        4: "process",
        5: "error",
        6: "success"
      },
      deployBackStatus: {
        0: "wait",
        1: "wait",
        2: "wait",
        3: "wait",
        4: "wait",
        5: "wait",
        6: "success"
      },
      testLoading: false,
      testDesc: "最新版本白名单配置发布至180脚本",
      dialogFormVisible: false,
      checkDesc: "白名单配置发布验证",
      deployLoading: false,
      deployDesc: "白名单配置文件全量上线",
      // dcp_link_test: "javascript: void(0)",
      dcp_link_test: "http://mlplat.intra.weibo.com/proxy/getWhiteList?cip=230",
      dcp_link_deploy: "javascript: void(0)"
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
    deployInit() {
      this.stepActive = 0;
      // this.dcp_link_test = "javascript: void(0)";
      this.dcp_link_deploy = "javascript: void(0)";
    },
    getConfig() {
      this.deployInit();
      const data = {
        url: "/proxy/yaconf",
        params: {
          action: "get",
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (Number(res.code) === 0) {
            Message({
              showClose: true,
              message: "Success",
              type: "success",
              duration: 1000
            });
            this.editable = false;
            this.resourceContent =
              res.data && res.data.resourceContent
                ? res.data.resourceContent
                : "";
            this.tempData = JSON.parse(JSON.stringify(this.resourceContent));
          } else {
            Message({
              showClose: true,
              message: res.msg || "前端白名单配置获取失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "前端白名单配置获取接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    toggleEditEvent() {
      if (this.editable) {
        this.resourceContent = JSON.parse(JSON.stringify(this.tempData));
      }
      this.editable = !this.editable;
    },
    saveEvent() {
      if (!this.resourceContent) {
        Message({
          showClose: true,
          message: "配置文件不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("确定保存修改?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.saveAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    saveAction() {
      let params = new URLSearchParams();
      params.append("resourceContent", this.resourceContent);
      params.append("action", "modify");
      params.append("username", this.email);
      params.append("cip", 230);
      const data = {
        url: "/proxy/setYaconf",
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(
        res => {
          if (Number(res.code) === 0) {
            this.getConfig();
          } else {
            Message({
              showClose: true,
              message: res.msg || "保存失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "前端白名单保存接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    testEvent() {
      this.testLoading = true;
      let params = new URLSearchParams();
      params.append("action", "test");
      params.append("username", this.email);
      params.append("cip", 230);
      const data = {
        url: "/proxy/yaconf",
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(
        res => {
          this.testLoading = false;
          if (Number(res.code) === 0) {
            this.stepActive = 2;
            this.testDesc = "最新版本白名单配置发布至180脚本";
            // this.dcp_link_test = (res.data && res.data.dcp_link) ? res.data.dcp_link : 'javascript: void(0)';
          } else {
            this.stepActive = 1;
            this.testDesc = res.msg || "测试启动失败";
          }
        },
        err => {
          this.testLoading = false;
          this.stepActive = 1;
          this.testDesc = "测试启动接口请求失败";
        }
      );
    },
    testRollbackEvent() {
      let params = new URLSearchParams();
      params.append("type", 1);
      params.append("username", this.email);
      params.append("cip", 230);
      const data = {
        url: "/proxy/rollback",
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(
        res => {
          this.stepActive = 1;
          if (Number(res.code) === 0) {
            this.testDesc = "回滚成功，请重新提交白名单配置文件";
          } else {
            this.testDesc = res.msg || "回滚失败";
          }
        },
        err => {
          this.stepActive = 1;
          this.testDesc = "回滚接口请求失败";
        }
      );
    },
    checkRollbackEvent() {
      let params = new URLSearchParams();
      params.append("type", 2);
      params.append("username", this.email);
      params.append("cip", 230);
      const data = {
        url: "/proxy/rollback",
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(
        res => {
          if (Number(res.code) === 0) {
            this.checkDesc = "白名单配置发布验证";
            Message({
              showClose: true,
              message: "回滚成功！",
              type: "success",
              duration: 3000
            });
            this.deployInit();
          } else {
            this.stepActive = 3;
            this.checkDesc = res.msg || "回滚失败";
          }
        },
        err => {
          this.stepActive = 3;
          this.checkDesc = "回滚接口请求失败";
        }
      );
    },
    checkPass() {
      this.dialogFormVisible = false;
      this.stepActive = 4;
      this.checkDesc = "白名单配置发布验证";
    },
    deployEvent() {
      this.deployLoading = true;
      let params = new URLSearchParams();
      params.append("action", "deploy");
      params.append("username", this.email);
      params.append("cip", 230);
      const data = {
        url: "/proxy/yaconf",
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(
        res => {
          this.deployLoading = false;
          if (Number(res.code) === 0) {
            this.stepActive = 6;
            this.deployDesc = "白名单配置文件全量上线";
            this.dcp_link_deploy = (res.data && res.data.dcp_link) ? res.data.dcp_link : 'javascript: void(0)';
          } else {
            this.stepActive = 5;
            this.deployDesc = res.msg || "部署启动失败";
          }
        },
        err => {
          this.deployLoading = false;
          this.stepActive = 5;
          this.deployDesc = "部署启动接口请求失败";
        }
      );
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
    .content-box-wrap {
      padding: 10px;
      background-color: #f5f5f5;
      .collapse-title {
        padding: 0 10px;
        color: #e6a23c;
        font-size: 14px;
        font-weight: bold;
      }
      .content-edit-box {
        padding: 0 10px;
      }
      .operate-box {
        position: fixed;
        right: 0px;
        top: 127px;
        top: 387px;
        padding: 20px;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, 0.8);
      }
      .btn-box {
        padding: 10px 0;
        text-align: center;
        font-size: 16px;
      }
      .link-btn {
        color: #409eff;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

