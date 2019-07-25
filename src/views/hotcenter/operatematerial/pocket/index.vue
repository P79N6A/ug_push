<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap clearfix">
      <h6 class="pane-title left">
        <i
          class="el-icon-date hidden-xs-only"
          style="margin-right: 6px;"
        ></i>降级配置
        </h6>
        <el-tag type="warning" class="right" size="small">{{email}}</el-tag>
    </el-row>
    <el-row class="content-box-wrap">
      <el-tabs
        tab-position="top"
        style="padding-top: 18px;padding-left: 14px;"
      >
        <el-tab-pane label="PUSH降级">
          <push email="email"></push>
        </el-tab-pane>
        <el-tab-pane label="混合流降级">
          <mixture email="email"></mixture>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0" style="padding: 0 10px;">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { formatNum } from "@/utils";
import { Message } from "element-ui";
import Push from "./push"
import Mixture from "./mixture"

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "operateMixture",
  components: {
    Auth,
    Push,
    Mixture
  },
  data() {
    return {
      email: "juanmin"
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      document.title = this.$route.meta.title;
      if (this.email) {
        this.getPageAuth();
      } else {
        // 从cookie中读取email
        // 或者从url中获取email
      }
    },
    getPageAuth() {
      const params = {
        userid: this.email,
        username: this.email,
        path: "/hot/#/hotcenter/operatematerial/pocket",
        cip: 230
      };
      this.$store.dispatch("GetPageAuth", params);
    },
  },
  created() {
    this.init();
  },
  watch: {
    email() {
      this.init();
    },
    pageAuth() {}
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
        line-height: 24px;
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
