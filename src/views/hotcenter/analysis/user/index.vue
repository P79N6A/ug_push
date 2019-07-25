<template>
  <el-container direction="vertical">
    <item-header></item-header>
    <el-main v-if="pageAuth === 1">
      <el-tabs v-model="activeName" :tab-position="tabPosition">
        <el-tab-pane label="单个用户分析">
          <query-page></query-page>
        </el-tab-pane>
        <el-tab-pane label="兴趣标签覆盖率">
          <tag-page></tag-page>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
      <auth></auth>
    </el-main>
  </el-container>
</template>

<script>
import ItemHeader from "@/components/ItemHeader";
import Auth from "@/components/Tips/Auth";
import QueryPage from "./tabpage/QueryPage";
import TagPage from "./tabpage/TagPage";
import { mapGetters } from "vuex";
import { formatNum } from "@/utils";

export default {
  name: "analysisuser",
  components: {
    ItemHeader,
    Auth,
    QueryPage,
    TagPage
  },
  data() {
    return {
      tabPosition: "left",
      activeName: "0",
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {}
  },
  created() {
    if (window.isPhone) {
      this.tabPosition = "top";
    }
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    },
    email() {}
  }
};
</script>

<style lang="scss" scoped>
body {
  .el-container {
    margin-bottom: 40px;
    .el-noauth {
      background-color: #fff;
    }
  }
  .el-main {
    background-color: #f0f2f5;
    color: #333;
    line-height: 100%;
  }
  .pane-title-wrap {
    margin-bottom: 10px;
    .pane-title {
      font-size: 20px;
      color: #409eff;
      text-align: center;
    }
  }
  .pane-form {
    padding: 20px;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border: 1px solid #ebebeb;
    border-radius: 3px;
  }
  .table-title {
    padding: 5px 20px;
    color: #409eff;
    border-bottom: 2px solid #409eff;
    margin-bottom: 10px;
  }
  .page-wrap {
    padding: 20px 0;
  }
}
</style>
