<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i
          class="el-icon-date hidden-xs-only"
          style="margin-right: 6px;"
        ></i>混合流降级配置</h6>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col
        :xs="24"
        :sm="18"
        :md="12"
        :lg="9"
        :xl="4"
        v-if="configForm"
      >
        <el-form
          :model="configForm"
          ref="configForm"
          class="pane-form"
          label-width="160px"
          label-position="left"
          size="small"
        >
          <el-form-item
            label="混合流接口"
            prop="bigdata"
            required
          >
            <el-select
              v-model="configForm.bigdata"
              placeholder="请选择"
            >
              <el-option
                v-for="item in percentList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="平台show_batch接口"
            prop="show_batch"
            required
          >
            <el-select
              v-model="configForm.show_batch"
              placeholder="请选择"
            >
              <el-option
                v-for="item in percentList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="广告"
            prop="uve"
            required
          >
            <el-select
              v-model="configForm.uve"
              placeholder="请选择"
            >
              <el-option
                v-for="item in percentList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="平台接口调用类型"
            prop="switch_platform_ifce"
            required
          >
            <el-select
              v-model="configForm.switch_platform_ifce"
              placeholder="请选择"
            >
              <el-option
                label="RPC"
                :value="0"
              ></el-option>
              <el-option
                label="HTTP"
                :value="1"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="重试限流"
            prop="max_mix_backend_retry"
            required
          >
            <el-input
              v-model.number="configForm.max_mix_backend_retry"
              placeholder="请输入"
              @change="configForm.max_mix_backend_retry = configForm.max_mix_backend_retry > 0 ? configForm.max_mix_backend_retry : 0"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="中高频限流"
            prop="max_mix_backend_mhf"
            required
          >
            <el-input
              v-model.number="configForm.max_mix_backend_mhf"
              placeholder="请输入"
              @change="configForm.max_mix_backend_mhf = configForm.max_mix_backend_mhf > 0 ? configForm.max_mix_backend_mhf : 0"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="低频限流"
            prop="max_mix_backend_mlf"
            required
          >
            <el-input
              v-model.number="configForm.max_mix_backend_mlf"
              placeholder="请输入"
              @change="configForm.max_mix_backend_mlf = configForm.max_mix_backend_mlf > 0 ? configForm.max_mix_backend_mlf : 0"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="后端引擎错误上限"
            prop="max_mix_backend_not200"
            required
          >
            <el-input
              v-model.number="configForm.max_mix_backend_not200"
              placeholder="请输入"
              @change="configForm.max_mix_backend_not200 = configForm.max_mix_backend_not200 > 0 ? configForm.max_mix_backend_not200 : 0"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="热点流限流"
            prop="max_hot_backend"
            required
          >
            <el-input
              v-model.number="configForm.max_hot_backend"
              placeholder="请输入"
              @change="configForm.max_hot_backend = configForm.max_hot_backend > 0 ? configForm.max_hot_backend : 0"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="过已读开关"
            prop="switch_filter_read"
            required
          >
            <el-switch
              v-model="configForm.switch_filter_read"
              :active-value="1"
              :inactive-value="2"
            >
            </el-switch>
          </el-form-item>
          <el-form-item
            label="自动恢复开关"
            prop="max_mix_automatic"
            required
          >
            <el-switch
              v-model="configForm.max_mix_automatic"
              :active-value="0"
              :inactive-value="1"
            >
            </el-switch>
          </el-form-item>
          <el-form-item
            label="redis降级开关"
            prop="redis_off"
            required
          >
            <el-switch
              v-model="configForm.redis_off"
              :active-value="0"
              :inactive-value="1"
            >
            </el-switch>
          </el-form-item>
          <el-form-item
            v-if="redisConfig && redisConfig.uve != null"
            label="广告本地配置开关"
            prop=""
            required
          >
            <el-switch
              v-model="redisConfig.uve"
              :active-value="0"
              :inactive-value="1"
            >
            </el-switch>
          </el-form-item>
          <el-form-item
            v-if="redisConfig && redisConfig.local_file != null"
            label="降级本地配置开关"
            prop=""
            required
          >
            <el-switch
              v-model="redisConfig.local_file"
              :active-value="0"
              :inactive-value="1"
            >
            </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button
              style="margin-bottom: 10px;"
              type="success"
              size="small"
              @click="saveEvent"
            >保存设置</el-button>
            <el-button
              type="info"
              size="small"
              plain
              @click="resetForm('configForm')"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <p
        v-else
        class="none-tips"
      >{{tips}}</p>
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
      // configForm: {
      //   bigdata: 0, //混合流接口
      //   show_batch: 0, //平台show_batch接口
      //   uve: 0, //广告
      //   max_mix_backend_retry: 0, //重试限流
      //   max_mix_backend_mhf: 0, //中高频限流
      //   max_mix_backend_mlf: 0, //低频限流
      //   switch_platform_ifce: 0, //平台接口调用类型
      //   max_mix_backend_not200: "", // 后端引擎错误关闭
      //   max_hot_backend: 0, // 热点流限流
      //   switch_filter_read: 1, // 过已读开关，1：过已读；2：不过已读
      //   max_mix_automatic: 0, // 自动恢复开关，0：开启；1：关闭
      //   redis_off: 0 // redis降级开关，0：开启；1：关闭
      // },
      configForm: null, //配置表
      redisConfig: null,
      // redisConfig: {
      //   local_file: 0, // 降级本地配置开关，0：开启；1：关闭
      //   uve: 0 // 广告本地配置开关，0：开启；1：关闭
      // },
      tempRedis: null, // 暂存本地配置开关，用以保存设置时判断配置是否改变，未改变则不发redis配置修改接口请求
      percentList: [
        {
          label: "0%",
          value: 0
        },
        {
          label: "25%",
          value: 1
        },
        {
          label: "50%",
          value: 2
        },
        {
          label: "75%",
          value: 3
        },
        {
          label: "100%",
          value: 4
        }
      ],
      operateText: "",
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
        this.getRedisConf();
      }
    },
    getConfig() {
      const tempData = {
        url: `${domain}/3/admin/get`,
        param: {
          source,
          staff: this.email
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res) {
          this.configForm = res;
        } else {
          this.tips = "混合流降级配置获取失败";
        }
      }, err => {
        this.tips = "混合流降级配置获取接口请求失败";
      });
    },
    getRedisConf() {
      const tempData = {
        url: `${domain}/3/admin/getdegradeconf`,
        param: {
          source,
          staff: this.email
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if(res && res.code === 0 && res.data) {
          this.redisConfig = res.data;
          res.data.local_file != null && (this.redisConfig.local_file = Number(res.data.local_file));
          res.data.uve != null && (this.redisConfig.uve = Number(res.data.uve));
          this.tempRedis = JSON.parse(JSON.stringify(this.redisConfig));
        } else {
          this.redisConfig = null;
          this.tempRedis = null;
        }
      }, err => {
        this.redisConfig = null;
        this.tempRedis = null;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.redisConfig = JSON.parse(JSON.stringify(this.tempRedis));
    },
    saveEvent() {
      if (this.configForm.max_mix_backend_retry === "" || this.configForm.max_mix_backend_retry == undefined) {
        Message({
          showClose: true,
          message: "请填写重试限流，且值大于等于0！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.configForm.max_mix_backend_mhf === "" || this.configForm.max_mix_backend_mhf == undefined) {
        Message({
          showClose: true,
          message: "请填写中高频限流，且值大于等于0！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.configForm.max_mix_backend_mlf === "" || this.configForm.max_mix_backend_mlf == undefined) {
        Message({
          showClose: true,
          message: "请填写低频限流，且值大于等于0！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.configForm.max_mix_backend_not200 === "" || this.configForm.max_mix_backend_not200 == undefined) {
        Message({
          showClose: true,
          message: "请填写后端错误引擎上限，且值大于等于0！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.configForm.max_hot_backend === "" || this.configForm.max_hot_backend == undefined) {
        Message({
          showClose: true,
          message: "请填写热点流限流，且值大于等于0！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$prompt("请输入操作说明", "确认修改配置", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "textarea",
        inputPattern: /[\s\S]/,
        inputErrorMessage: "输入内容不能为空",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            this.operateText = instance.inputValue; // 获取操作原因
          }
          done();
        }
      })
        .then(() => {
          this.saveConfig();
          this.saveRedisConfig();
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
        url: `${domain}/3/admin/set`,
        param: {
          staff: this.email,
          source: source,
          ext: this.operateText,
          data: `${this.configForm.bigdata},${this.configForm.show_batch},${
            this.configForm.uve
          },${this.configForm.max_mix_backend_retry},${
            this.configForm.max_mix_backend_mhf
          },${this.configForm.max_mix_backend_mlf},${
            this.configForm.switch_platform_ifce
          },${this.configForm.max_mix_backend_not200},${
            this.configForm.max_hot_backend},${
            this.configForm.switch_filter_read
          },${this.configForm.max_mix_automatic},${
            this.configForm.redis_off}`
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.msg === "设置成功!") {
          this.getConfig();
          Message({
            showClose: true,
            message: "设置成功!",
            type: "success",
            duration: 1000
          });
        } else {
          Message({
            showClose: true,
            message: (res && res.msg) || "设置失败！",
            type: "error",
            duration: 0
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "设置接口请求失败！",
          type: "error",
          duration: 0
        });
      });
    },
    saveRedisConfig() {
      if (this.redisConfig === null || JSON.stringify(this.redisConfig) === JSON.stringify(this.tempRedis)) return;
      const tempData = {
        url: `${domain}/3/admin/setdegradeconf`,
        param: {
          data: JSON.stringify(this.redisConfig),
          staff: this.email,
          source: source
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code === 0) {
          this.getRedisConf();
          Message({
            showClose: true,
            message: "本地配置开关设置成功!",
            type: "success",
            duration: 1000
          });
        } else {
          Message({
            showClose: true,
            message: (res && res.msg) || "本地配置开关设置失败！",
            type: "error",
            duration: 0
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "本地配置开关设置接口请求失败！",
          type: "error",
          duration: 0
        });
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
