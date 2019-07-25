<template>
  <el-container direction="vertical">
    <item-header></item-header>
    <el-main v-if="usergroup == 'inner'">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
          <el-row type="flex" justify="space-between" class="pane-title-wrap">
            <h6 class="pane-title">
              <i class="el-icon-goods"></i>物料库现状</h6>
            <el-button type="success" plain size="mini" @click="onSearch">
              <i class="el-icon-refresh"></i> 刷新</el-button>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="20" :md="20" :lg="20" :xl="20">
          <el-table :data="materialStatus && materialStatus.material" style="width: 100%" class="pane-table" border>
            <el-table-column type="index" align="center" width="50" label="序号" fixed>
            </el-table-column>
            <el-table-column fixed align="left" prop="name" label="所属领域">
            </el-table-column>
            <el-table-column align="left" sortable prop="mysql_num" label="原始数据（条）" :formatter="setNum">
            </el-table-column>
            <el-table-column align="left" sortable prop="online_num" label="入库数据（条）" :formatter="setNum">
            </el-table-column>
            <el-table-column align="left" sortable prop="expo_num" label="领域曝光（条）" :formatter="setNum">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
    <el-main v-else-if="usergroup != null && usergroup != 'response failed'">
      <auth></auth>
    </el-main>
    <div class="maskerSkip" v-show="showMasker"></div>
    <div class="maskerTips" v-show="showMasker">
      页面内容已迁移至
      <a href="/hot/#/hotcenter/analysis/material" title="跳转至【热门管理-物料分析-物料库规模">热门管理-物料分析-物料库规模</a>当前页面即将废弃~</div>
  </el-container>
</template>

<script>
import ItemHeader from "@/components/ItemHeader";
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { formatNum } from "@/utils";

export default {
  name: "operatematerial",
  components: {
    ItemHeader,
    Auth
  },
  data() {
    return {
      showMasker: true
    };
  },
  computed: {
    ...mapGetters(["isLogin", "email", "materialStatus", "usergroup"])
  },
  methods: {
    init() {
      if (this.usergroup == "inner") {
        this.onSearch();
      } else {
        console.log("用户未登录");
      }
    },
    onSearch() {
      const tempData = {
        url: "http://172.16.139.44:10999/get_materials_status"
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetStatus", params);
    },
    setNum(row, column, cellValue) {
      return formatNum(cellValue);
    },
    autoHide(evt) {
      this.showMasker = false;
    }
  },
  created() {
    this.init();
  },
  mounted() {
    document.addEventListener("click", this.autoHide, false);
  },
  destroyed() {
    document.removeEventListener("click", this.autoHide, false);
  },
  watch: {
    materialStatus() {},
    isLogin() {},
    email() {},
    usergroup() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  .el-container {
    margin-bottom: 40px;
    .maskerSkip {
      position: absolute;
      top: 0;
      z-index: 100;
      width: 100%;
      height: 800px;
      background-color: rgba(0, 0, 0, 0.8);
    }
    .maskerTips {
      position: absolute;
      z-index: 100;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      a {
        margin: 0 10px;
        color: #409eff;
        font-size: 18px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .el-main {
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
