<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap">
            <el-col :span="24">
                <h6 class="pane-title">
                    <i class="el-icon-goods hidden-xs-only" style="margin-right: 6px;"></i>置顶操作</h6>
            </el-col>
        </el-row>
        <el-row class="content-box-wrap">
            <el-col :xs="24" :sm="18" :md="12" :lg="9" :xl="4" v-if="channelList && channelList.length > 0">
                <el-form :model="formInline" ref="formInline" label-width="100px" size="small" class="pane-form">
                    <el-form-item label="选择频道" required>
                        <el-select v-model="formInline.category" filterable placeholder="请选择频道">
                            <el-option v-if="isValid(item)" v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="item.channel_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="微博mid" prop="mid">
                        <el-input suffix-icon="el-icon-edit" v-model="formInline.data" placeholder="请输入mid" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" size="small" @click="setTopEvent()">上榜</el-button>
                        <el-button type="warning" size="small" @click="deleteTopEvent()">下榜</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" v-else-if="channelApi == null">
                loading……
            </el-col>
            <el-col :span="24" v-else-if="channelApi == 'response failed'">
                <el-alert title="网络请求异常，请重试~" type="warning" show-icon :closable="false">
                </el-alert>
            </el-col>
            <el-col :span="24" v-else-if="channelApi == true">
                <el-alert title="暂无有权限的频道" type="warning" show-icon :closable="false">
                </el-alert>
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

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "setTopPage",
  components: {
    Auth
  },
  data() {
    return {
      cname: "",
      formInline: {
        category: "",
        data: ""
      }
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
    setTopEvent() {
      if (!this.formInline.category) {
        Message({
          showClose: true,
          message: "请选择频道！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formInline.data) {
        Message({
          showClose: true,
          message: "请输入mid！",
          type: "error",
          duration: 1000
        });
        return;
      }
      this.$confirm("确定上榜?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.setTopAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消上榜操作"
          });
        });
    },
    setTopAction() {
      const tempData = {
        url: `${domain}/3/admin/categoryTop`,
        param: {
          staff: this.email,
          source: source,
          type: "set",
          ...this.formInline
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.data === "success") {
          Message({
            showClose: true,
            message: "上榜成功",
            type: "success",
            duration: 1000
          });
        } else {
          Message({
            showClose: true,
            message: (res && res.info) || "上榜失败",
            type: "error",
            duration: 0
          });
        }
      });
    },
    deleteTopEvent() {
      if (!this.formInline.category) {
        Message({
          showClose: true,
          message: "请选择频道！",
          type: "error",
          duration: 1000
        });
        return;
      }
      this.$confirm("确定下榜?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.deleteTopAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下榜操作"
          });
        });
    },
    deleteTopAction() {
      const tempData = {
        url: `${domain}/3/admin/categoryTop`,
        param: {
          staff: this.email,
          source: source,
          type: "set",
          category: this.formInline.category
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.data === "success") {
          Message({
            showClose: true,
            message: "下榜成功",
            type: "success",
            duration: 1000
          });
        } else {
          Message({
            showClose: true,
            message: (res && res.info) || "下榜失败",
            type: "error",
            duration: 0
          });
        }
      });
    },
    isValid(obj) {
      //如果是活动频道，判断是否在运营时间范围内
      const cur = Date.now();
      //   return (cur >= obj.stat_time * 1000 && cur <= obj.end_time * 1000) ||
      //     obj.channel_history === 1
      //     ? true
      //     : false;
      return (cur <= obj.end_time * 1000) ||
        obj.channel_history === 1
        ? true
        : false;
    }
  },
  created() {
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    },
    channelList() {}
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