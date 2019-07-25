<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-date hidden-xs-only" style="margin-right: 6px;"></i>Icon配置</h6>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :xs="24" :sm="18" :md="16" :lg="12" :xl="4" v-if="channelList && channelList.length > 0">
        <el-form class="pane-form" label-width="80px" label-position="left" size="small">
          <el-form-item label="选择频道" required>
            <el-select class="left" v-model="channel_id" placeholder="请选择" @change="getConfig" filterable>
              <el-option v-for="item in channelList" :key="item.channel_id" :label="item.channel_name" :value="item.channel_id">
              </el-option>
            </el-select>
            <span class="info-tips left hidden-xs-only">（可输入搜索选择频道）</span>
          </el-form-item>
          <el-form-item label="图标地址" required>
            <el-input type="textarea" :autosize="{ minRows: 4}" v-model="icon_url" placeholder="请输入图标（Icon）地址" @change="fiterEvent()"></el-input>
            <span class="info-tips left hidden-xs-only">（图标地址中不可包含英文逗号,）</span>
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
      channel_id: "",
      icon_url: "",
      channelList: null,
      channelMap: new Map(),
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
              this.setChannelMap();
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
    setChannelMap() {
      const arr = this.channelList;
      for (let i = 0;i < arr.length; i++) {
        this.channelMap.set(arr[i].channel_id, arr[i].channel_name);
      }
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
          type: "icon",
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
          this.icon_url = res.data[this.channel_id];
        } else {
          Message({
            showClose: true,
            message: (res && res.msg) || "频道已配置Icon获取失败",
            type: "error",
            duration: 0
          });
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
      if (!this.icon_url) {
        Message({
          showClose: true,
          message: "请填写图标地址！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.icon_url.indexOf(',') > -1) {
        Message({
          showClose: true,
          message: "图标地址中不能有英文逗号（,）",
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
          type: "icon",
          action: "set",
          value: `${this.channel_id},${this.icon_url}`
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
      this.$confirm(`将删除【${this.channelMap.get(this.channel_id)}】频道配置?`, "确认删除", {
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
          type: "icon",
          action: "del",
          value: `${this.channel_id}`
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
    },
    fiterEvent() {
      if (this.icon_url.indexOf(',') > -1) {
        Message({
          showClose: true,
          message: "图标地址中不能有英文逗号（,）",
          type: "error",
          duration: 3000
        });
      }
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
