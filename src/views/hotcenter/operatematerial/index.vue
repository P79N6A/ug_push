<template>
    <el-main v-if="pageAuth === 1">
      <el-row>
        <el-col :span="24">
          <el-tabs style="padding-top: 18px;padding-left: 14px;padding-right: 14px;" v-model="currentTab">
            <el-tab-pane label="配置开关" name="0">
              <h6 class="pane-title hidden-xs-only">配置开关</h6>
              <operate-switch v-if="this.currentTab === '0'"></operate-switch>
            </el-tab-pane>
            <el-tab-pane label="置顶操作" name="1">
              <h6 class="pane-title hidden-xs-only">置顶操作</h6>
              <top-mid v-if="this.currentTab === '1'"></top-mid>
            </el-tab-pane>
            <el-tab-pane label="置顶过已读" name="2">
              <h6 class="pane-title hidden-xs-only">置顶过已读</h6>
              <top-read v-if="this.currentTab === '2'"></top-read>
            </el-tab-pane>
            <el-tab-pane label="前端屏蔽" name="3">
              <h6 class="pane-title hidden-xs-only">前端屏蔽</h6>
              <front-shield v-if="this.currentTab === '3'"></front-shield>
            </el-tab-pane>
            <el-tab-pane label="物料库屏蔽" name="4">
              <h6 class="pane-title hidden-xs-only">物料库屏蔽</h6>
              <library-shield v-if="this.currentTab === '4'"></library-shield>
            </el-tab-pane>
            <el-tab-pane label="GroupID屏蔽" name="5">
              <h6 class="pane-title hidden-xs-only">GroupID屏蔽</h6>
              <group-shield></group-shield>
            </el-tab-pane>
            <el-tab-pane label="首位广告" name="6">
              <h6 class="pane-title hidden-xs-only">首位广告开关</h6>
              <advert-switch v-if="this.currentTab === '6'"></advert-switch>
            </el-tab-pane>
            <el-tab-pane label="操作记录" name="7">
              <h6 class="pane-title hidden-xs-only">物料操作记录查询</h6>
              <operate-record v-if="this.currentTab === '7'"></operate-record>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
      <auth></auth>
    </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import OperateSwitch from "./components/OperateSwitch";
import TopMid from "./components/TopMid";
import TopRead from "./components/TopRead";
import FrontShield from "./components/FrontShield";
import LibraryShield from "./components/LibraryShield";
import GroupShield from "./components/GroupShield";
import AdvertSwitch from "./components/AdvertSwitch";
import OperateRecord from "./components/OperateRecord";
import { mapGetters } from "vuex";
import { Message } from "element-ui";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "operatematerial",
  components: {
    Auth,
    OperateSwitch,
    TopMid,
    TopRead,
    FrontShield,
    LibraryShield,
    GroupShield,
    AdvertSwitch,
    OperateRecord
  },
  data() {
    return {
      currentTab: '-1',
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        // 渲染第一个pane
        this.currentTab = (this.$route && this.$route.query && this.$route.query.tab) ? this.$route.query.tab : '0';
      }
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
body {
  .el-container {
    margin-bottom: 40px;
  }
  .el-main {
    padding: 0;
    color: #333;
    line-height: 100%;
  }
  .pane-title {
    font-size: 16px;
    padding: 10px 0;
    color: #409eff;
    text-align: left;
  }
}
</style>