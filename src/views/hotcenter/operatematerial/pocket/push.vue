<template>
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
        label="push限流"
        prop="limit_qps"
        required
      >
        <el-input
          v-model.number="configForm.limit_qps"
          placeholder="请输入"
          @change="configForm.limit_qps = configForm.limit_qps > 0 ? configForm.limit_qps : 0"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="开启后端引擎开关"
        prop="push_recommend"
      >
        <el-switch
          v-model="configForm.push_recommend"
          :active-value="0"
          :inactive-value="1"
        >
        </el-switch>
      </el-form-item>
      <el-form-item
        label="开启redis资源开关"
        prop="push_redis"
      >
        <el-switch
          v-model="configForm.push_redis"
          :active-value="0"
          :inactive-value="1"
        >
        </el-switch>
      </el-form-item>
      <el-form-item
        label="开启push广告开关"
        prop="push_uve"
      >
        <el-switch
          v-model="configForm.push_uve"
          :active-value="0"
          :inactive-value="1"
        >
        </el-switch>
      </el-form-item>
      <el-form-item
        label="开启日志开关"
        prop="push_log"
      >
        <el-switch
          v-model="configForm.push_log"
          :active-value="0"
          :inactive-value="1"
        >
        </el-switch>
      </el-form-item>
      <div class="clearfix">
        <el-button
          class="right"
          type="info"
          size="small"
          plain
          @click="resetForm('configForm')"
        >重置</el-button>
        <el-button
          class="right"
          style="margin-bottom: 10px;margin-right: 10px;"
          type="success"
          size="small"
          @click="saveEvent"
        >保存设置</el-button>
      </div>
    </el-form>
  </el-col>
  <p
    v-else
    class="none-tips"
  >{{tips}}</p>
</template>

<script>
import { formatNum } from "@/utils";
import { Message } from "element-ui";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "PockectPush",
  props: ["email"],
  data() {
    return {
      //   configForm: {
      //     limit_qps: 3000, //push限流
      //     push_recommend: 0, //后端引擎开关
      //     push_redis: 0, //redis资源开关
      //     push_uve: 0, //push广告开关，0：开启；1：关闭
      //     push_log: 0 //日志开关
      //   },
      configForm: null, //配置表
      operateText: "",
      tips: "loading…" //push降级配置获取失败
    };
  },
  methods: {
    init() {
      this.getConfig();
    },
    getConfig() {
      const tempData = {
        url: `${domain}/3/admin/getPush`,
        param: { source }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res) {
          this.configForm = res;
        } else {
          this.tips = "Push降级配置获取失败";
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    saveEvent() {
      if (this.configForm.limit_qps === "") {
        Message({
          showClose: true,
          message: "请填写push限流，且值大于等于0！",
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
        url: `${domain}/3/admin/setPush`,
        param: {
          staff: this.email,
          source: source,
          ext: this.operateText,
          data: `${this.configForm.limit_qps},${
            this.configForm.push_recommend
          },${this.configForm.push_redis},${this.configForm.push_uve},${
            this.configForm.push_log
          }`
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
  }
};
</script>

<style lang="scss" scoped>
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
</style>
