<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-date hidden-xs-only" style="margin-right: 6px;"></i>Tip配置</h6>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :xs="24" :sm="18" :md="16" :lg="12" :xl="4" v-if="configForm">
        <el-form class="pane-form" label-width="120px" label-position="left" size="small">
          <el-form-item label="选择频道" required>
            <el-select class="left" v-model="channel_id" placeholder="请选择" @change="getConfig" filterable>
              <el-option v-if="isValid(item)" v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="item.channel_id">
              </el-option>
            </el-select>
            <span class="info-tips left hidden-xs-only">（可输入搜索选择频道）</span>
          </el-form-item>
          <el-form-item label="提示文案" required>
            <el-input type="textarea" v-model="configForm.text" placeholder="请输入提示文案"></el-input>
          </el-form-item>
          <el-form-item label="提示次数" required>
            <el-input v-model.number="configForm.times" placeholder="请输入提示次数" @change="configForm.times = configForm.times > 1 ? configForm.times : 1"></el-input>
          </el-form-item>
          <el-form-item label="间隔时间（秒）" required>
            <el-input v-model.number="configForm.interval" placeholder="请输入间隔时间" @change="configForm.interval = configForm.interval > 1 ? configForm.interval : 1"></el-input>
          </el-form-item>
          <el-form-item label="插入序号" required>
            <el-input v-model.number="configForm.insert_index" placeholder="请输入插入序号" @change="configForm.insert_index = configForm.insert_index > 1 ? configForm.insert_index : 1"></el-input>
          </el-form-item>
          <el-form-item label="开始时间" required>
            <el-date-picker v-model="configForm.start_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间" required>
            <el-date-picker v-model="configForm.end_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button style="margin-bottom: 10px;" type="success" size="small" @click="saveEvent">保存设置</el-button>
            <el-button style="margin-bottom: 10px;" type="danger" size="small" @click="deleteEvent">删除配置</el-button>
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
      // configForm: {
      //   text: "测试测试",
      //   times: 1,
      //   interval: 2,
      //   insert_index: 3,
      //   start_time: "2018-10-10 00:00:00",
      //   end_time: "2018-10-30 00:00:00"
      // },
      configForm: {}, //配置表
      channel_id: "",
      channelList: null,
      tips: "loading…" //频道已配置Icon获取失败
    };
  },
  computed: {
    ...mapGetters(["email", "pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getChannelList();
      }
    },
    getChannelList() {
      const data = {
        url: "/channel/getAuthChannelList",
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res && res.code == 200) {
            this.channelList = this.getValidChannel(res.result);
            if (this.channelList.length > 0) {
              this.channel_id = this.channelList[0] && this.channelList[0].channel_id || "";
              this.channel_id && this.getConfig();
            } else {
              this.tips = "暂无有权限的频道";
            }
          } else {
            this.tips = res.msg || "频道列表获取失败";
          }
        },
        err => {
          this.tips = "频道列表获取失败";
        }
      );
    },
    getConfig() {
      if (!this.channel_id) {
        return;
      }
      const tempData = {
        url: `${domain}/3/admin/configChannel`,
        param: {
          staff: this.email,
          source: source,
          type: "tip",
          action: "get",
          value: this.channel_id
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          this.configForm = res.data || false;
        } else {
          Message({
            showClose: true,
            message: (res && res.msg) || "频道已配置Tip获取失败",
            type: "error",
            duration: 0
          });
          this.tips = (res && res.msg) || "频道已配置Tip获取失败";
        }
      });
    },
    saveEvent() {
      if (!this.channel_id) {
        Message({
          showClose: true,
          message: "请选择频道！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.configForm.text) {
          Message({
          showClose: true,
          message: "请输入提示文案！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.configForm.times !== 0 && !this.configForm.times) {
          Message({
          showClose: true,
          message: "请输入提示次数！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.configForm.interval !== 0 && !this.configForm.interval) {
          Message({
          showClose: true,
          message: "请输入间隔时间！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.configForm.insert_index !== 0 && !this.configForm.insert_index) {
          Message({
          showClose: true,
          message: "请输入插入序号！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.configForm.start_time) {
          Message({
          showClose: true,
          message: "请输入开始时间！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.configForm.end_time) {
          Message({
          showClose: true,
          message: "请输入结束时间！",
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
          this.setConfig();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    setConfig() {
      const tempData = {
        url: `${domain}/3/admin/configChannel`,
        param: {
          staff: this.email,
          source: source,
          type: "tip",
          action: "set",
          value: `${this.channel_id},${this.configForm.text},${this.configForm.times},${this.configForm.interval},${this.configForm.insert_index}`,
          start_time: this.configForm.start_time,
          end_time: this.configForm.end_time
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          this.getConfig();
          Message({
            showClose: true,
            message: "配置成功!",
            type: "success",
            duration: 1000
          });
        } else {
          Message({
            showClose: true,
            message: (res && res.msg) || "配置失败",
            type: "error",
            duration: 0
          });
        }
      });
    },
    deleteEvent() {
      this.$confirm(`将删除所有频道配置?`, "确认删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.deleteConfig();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    deleteConfig() {
      const tempData = {
        url: `${domain}/3/admin/configChannel`,
        param: {
          staff: this.email,
          source: source,
          type: "tip",
          action: "del"
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          this.getConfig();
          Message({
            showClose: true,
            message: "删除成功!",
            type: "success",
            duration: 1000
          });
        } else {
          Message({
            showClose: true,
            message: (res && res.msg) || "删除失败",
            type: "error",
            duration: 0
          });
        }
      });
    },
    isValid(obj) {
      //如果是活动频道，判断是否在运营结束时间之前
      const cur = Date.now();
      return (cur <= obj.end_time * 1000) ||
        obj.channel_history === 1
        ? true
        : false;
    },
    getValidChannel(arr) {
      let res = [];
      if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (this.isValid(arr[i])) {
            res.push(arr[i]);
          }
        }
      }
      return res;
    }
  },
  created() {
    this.init();
  },
  watch: {
    email() {},
    pageAuth() {
      this.init();
    },
    channelList() {}
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
