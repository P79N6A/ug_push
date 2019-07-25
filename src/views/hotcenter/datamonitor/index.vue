<template>
  <el-container direction="vertical">
    <item-header></item-header>
    <el-main v-if="usergroup == 'inner'">
      <el-tabs tab-position="left">
        <el-tab-pane label="整体数据">
          <el-row class="pane-title-wrap">
            <h6 class="pane-title">
              <i class="el-icon-bell" style="margin-right: 6px;"></i>热门流-数据监控-整体数据</h6>
          </el-row>
          <el-row type="flex">
            <el-form inline :model="formInline">
              <el-form-item>
                <el-date-picker v-model="formInline.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" @change="getDropList()">
                </el-date-picker>
                <el-button type="primary" @click="onSearch">查询</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row v-if="entireMonitor">
            <el-table :data="entireMonitor" style="width: 100%" border stripe>
              <el-table-column align="center" width="100" prop="dt" label="日期" fixed>
                <template slot-scope="scope">
                  <span>{{_parseTime(scope.row.dt)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" width="70" prop="day" label="星期">
              </el-table-column>
              <el-table-column prop="thd_click" sortable label="千次点击">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.thd_click)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="thd_act" sortable label="千次互动">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.thd_act)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="average_fresh_times" sortable label="人均刷新">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.average_fresh_times)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="pv" sortable label="PV">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.pv)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="uv" sortable label="UV">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.uv)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="exposure" sortable label="曝光量">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.exposure)}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="90" prop="two_save_rate" sortable label="次日留存(热门)">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.two_save_rate)}}</span>
                </template>
              </el-table-column>
              <el-table-column min-width="90" prop="two_feed_save_rate" sortable label="次日留存(首页)">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.two_feed_save_rate)}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>
        <el-tab-pane :key="key" v-for="(item, key) in tabList" :label="item.label">
          <monitor-page :data="item"></monitor-page>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-main v-else-if="usergroup != null && usergroup != 'response failed'">
      <auth></auth>
    </el-main>
    <div class="maskerSkip" v-show="showMasker"></div>
    <div class="maskerTips" v-show="showMasker">
      页面内容已迁移至
      <a href="/hot/#/hotcenter/analysis/data" title="跳转至【热门管理-数据分析】">热门管理-数据分析</a>当前页面即将废弃~</div>
  </el-container>
</template>

<script>
import ItemHeader from "@/components/ItemHeader";
import Auth from "@/components/Tips/Auth";
import MonitorPage from "./components/MonitorPage";
import { mapGetters } from "vuex";
import { formatNum, parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "datamonitor",
  components: {
    ItemHeader,
    Auth,
    MonitorPage
  },
  data() {
    return {
      formInline: {
        date: []
      },
      tabList: [
        {
          label: "千次点击",
          value: "thd_click"
        },
        {
          label: "千次互动",
          value: "thd_act"
        },
        {
          label: "人均刷新",
          value: "average_fresh_times"
        },
        {
          label: "PV",
          value: "pv"
        },
        {
          label: "UV",
          value: "uv"
        },
        {
          label: "曝光量",
          value: "exposure"
        },
        {
          label: "次日留存(热门)",
          value: "two_save_rate"
        },
        {
          label: "次日留存(首页)",
          value: "two_feed_save_rate"
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 > Date.now();
        },
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      showMasker: true
    };
  },
  computed: {
    ...mapGetters(["email", "usergroup", "entireMonitor"])
  },
  methods: {
    init() {
      const start = parseTime(Date.now() - 3600 * 1000 * 24 * 8, "{y}{m}{d}");
      const end = parseTime(Date.now() - 3600 * 1000 * 24 * 2, "{y}{m}{d}");
      this.formInline.date = [start, end];
      if (this.usergroup == "inner") {
        this.onSearch();
      } else {
        console.log("用户未登录");
      }
    },
    onSearch() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getEntireDayTableData.html",
        param: {
          dt_start: this.formInline.date[0],
          dt_end: this.formInline.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetEntireMonitor", params);
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parseTime(time) {
      const year = time.substr(0,4);
      const month = time.substr(4,2);
      const date = time.substr(6,2);
      return `${year}-${month}-${date}`;
    },
    autoHide(evt) {
      this.showMasker = false;
    },
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
    .el-noauth {
      background-color: #fff;
    }
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
    background-color: #f0f2f5;
    padding-bottom: 40px;
    color: #333;
    line-height: 100%;
    .pane-title-wrap {
      margin-bottom: 20px;
      .pane-title {
        font-size: 20px;
        color: #409eff;
        text-align: center;
      }
    }
    .numBox {
      margin-right: 5px;
    }
    .link-btn {
      color: #409eff;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
