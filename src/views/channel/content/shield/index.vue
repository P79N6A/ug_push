<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-goods hidden-xs-only" style="margin-right: 6px;"></i>屏蔽操作（活动频道）</h6>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :xs="24" :sm="18" :md="12" :lg="9" :xl="4">
        <el-form :model="formInline" ref="formInline" label-width="80px" size="small" class="pane-form">
          <el-form-item label="选择频道" required>
            <el-select v-model="channel_id" placeholder="请选择选择频道">
              <el-option v-if="isValid(item)" v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="item.channel_id"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="屏蔽类型" required>
            <el-select v-model="formInline.type" placeholder="请选择屏蔽类型" @change="formInline.value = ''">
              <el-option v-for="(item, key) in typeList" :key="key" :label="item" :value="key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="输入物料" required>
            <el-input type="textarea" style="max-width: 100%;" v-model="formInline.value" :placeholder="placeholder[formInline.type]" :autosize="{ minRows: 2}"></el-input>
          </el-form-item> -->
          <el-form-item>
            <!-- <el-button type="success" size="small" @click="blackEvent('channel_black_content_add')">屏蔽物料</el-button>
            <el-button type="warning" size="small" @click="blackEvent('channel_black_content_cancel')">取消屏蔽</el-button> -->
            <el-button type="danger" size="small" @click="clearEvent()">清除历史库</el-button>
          </el-form-item>
        </el-form>
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
  name: "shieldPage",
  components: {
    Auth
  },
  data() {
    return {
      typeList: {
        uid: "UID",
        url: "URL",
        keyword: "关键字"
      },
      placeholder: {
        uid: "请输入uid 多个值英文逗号（,）分割",
        url: "请输入url 多个值英文逗号（,）分割",
        keyword: "请输入关键字 多个值同组内英文逗号（,）分割 不同组 | 分割"
      },
      formInline: {
        type: "uid",
        value: ""
      },
      channel_id: ""
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email", "channelList", "channelApi"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.setChannelList();
      }
    },
    setChannelList() {
      const data = {
        url: "/channel/getAuthChannelList",
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("SetChannelList", data);
    },
    blackEvent(type) {
      if (!this.formInline.value) {
        Message({
          showClose: true,
          message: this.placeholder[this.formInline.type],
          type: "error",
          duration: 3000
        });
        return;
      }
      const text =
        type === "channel_black_content_add"
          ? "确定屏蔽物料？"
          : "确定取消屏蔽？";
      this.$confirm(text, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.blackAction(type);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    blackAction(type) {
      const tempData = {
        url: "http://10.75.28.123:7020/channel_business",
        param: {
          staff: this.email,
          type: type,
          value: JSON.stringify(this.formInline)
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      console.log(tempData);
      // this.$store.dispatch("ProxyGet", params).then(res => {
      //   if (res && res.result === "True") {
      //     Message({
      //       showClose: true,
      //       message: (res && res.msg) || "操作成功",
      //       type: "success",
      //       duration: 1000
      //     });
      //   } else {
      //     Message({
      //       showClose: true,
      //       message: (res && res.msg) || "操作失败",
      //       type: "error",
      //       duration: 0
      //     });
      //   }
      // });
    },
    clearEvent() {
      if (!this.channel_id) {
        Message({
          showClose: true,
          message: "请选择频道！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("确定清除历史库？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.clearAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    },
    clearAction() {
      const tempData = {
        url: "http://172.16.140.62:9999/clean", //清除历史库接口地址
        param: {
          staff: this.email,
          channel_id: this.channel_id
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store
        .dispatch("ProxyGet", params)
        .then(res => {
          this.$alert("正在清除历史库，请稍后验证！", "", {
            confirmButtonText: "确定",
            callback: action => {
              this.channel_id = "";
            }
          });
        })
        .catch(err => {
          Message({
            showClose: true,
            message: "操作失败",
            type: "error",
            duration: 3000
          });
        });
    },
    isValid(obj) {
      //筛选活动频道，确认是否需要过滤掉不在运营时间范围内的？
      return obj.channel_history === 0 ? true : false;
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
.pane-title-wrap {
  margin-bottom: 20px;
  .pane-title {
    font-size: 16px;
    color: #409eff;
    text-align: left;
  }
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
    .pane-form {
      padding: 20px;
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);
      border: 1px solid #ebebeb;
      border-radius: 3px;
    }
  }
}
</style>