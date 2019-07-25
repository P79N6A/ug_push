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
        prop="max_mix_backend_timeout"
        required
      >
        <el-input
          v-model.number="configForm.max_mix_backend_timeout"
          placeholder="请输入"
          @change="configForm.max_mix_backend_timeout = configForm.max_mix_backend_timeout > 0 ? configForm.max_mix_backend_timeout : 0"
        ></el-input>
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
  name: "operateMixture",
  props: ["email"],
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
      //   max_mix_backend_timeout: "" // 后端引擎错误关闭
      // },
      configForm: null, //配置表
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
  methods: {
    init() {
      this.getConfig();
    },
    getConfig() {
      const tempData = {
        url: `${domain}/3/admin/get`,
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
          this.tips = "混合流降级配置获取失败";
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    saveEvent() {
      if (this.configForm.max_mix_backend_retry === "") {
        Message({
          showClose: true,
          message: "请填写重试限流，且值大于等于0！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.configForm.max_mix_backend_mhf === "") {
        Message({
          showClose: true,
          message: "请填写中高频限流，且值大于等于0！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.configForm.max_mix_backend_mlf === "") {
        Message({
          showClose: true,
          message: "请填写低频限流，且值大于等于0！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.configForm.max_mix_backend_timeout === "") {
        Message({
          showClose: true,
          message: "请填写后端错误引擎上限，且值大于等于0！",
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
          },${this.configForm.max_mix_backend_timeout}`
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
