<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-bell hidden-xs-only" style="margin-right: 6px;"></i>热门流-整体数据分析（{{curEntireTime}}）</h6>
    </el-row>
    <el-row type="flex" class="search-form-wrap">
      <el-form size="mini">
        <el-form-item>
          <el-date-picker v-model="entireDate" align="right" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" @click="onSearch()"><span class="hidden-xs-only">查询</span></el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row v-if="entireData" class="content-box-wrap">
      <el-table :data="entireData" style="width: 100%" border stripe size="mini">
        <el-table-column align="center" width="140" prop="name" label="KPI指标" fixed>
          <template slot-scope="scope">
            <a class="link-btn" target="_blank" :href="`/hot/#/hotcenter/analydata`">{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <el-table-column align="left" width="160" prop="day_num" sortable label="当日数据">
          <template slot-scope="scope">
            <span>{{_formatNum(scope.row.day_num)}}</span>
          </template>
        </el-table-column>
        <el-table-column align="left" min-width="120" prop="day_rate" sortable label="天环比">
          <template slot-scope="scope">
            <span class="numBox">{{_formatNum(scope.row.yesterday_num)}}</span>
            <el-tag :type="entireRate(scope.row.day_rate)">{{ _parsePercent(scope.row.day_rate) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" min-width="120" prop="week_rate" sortable label="周环比">
          <template slot-scope="scope">
            <span class="numBox">{{_formatNum(scope.row.week_num)}}</span>
            <el-tag :type="entireRate(scope.row.week_rate)">{{ _parsePercent(scope.row.week_rate) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="left" min-width="120" prop="month_rate" sortable label="月环比">
          <template slot-scope="scope">
            <span class="numBox">{{_formatNum(scope.row.month_num)}}</span>
            <el-tag :type="entireRate(scope.row.month_rate)">{{ _parsePercent(scope.row.month_rate) }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { formatNum, parseTime, parsePercent } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "datamonitor",
  components: {
    Auth
  },
  data() {
    return {
      entireData: null,
      entireDate: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 > Date.now();
        },
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.entireDate = parseTime(Date.now() - 3600 * 1000 * 48, "{y}{m}{d}");
        this.curEntireTime = this.entireDate;
        this.onSearch();
      }
    },
    onSearch() {
      const that = this;
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getKpiMonitorData.html",
        param: {
          dt: this.entireDate
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetDataMonitor", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
          that.entireData = (res.data && res.data.entire) || [];
          this.curEntireTime = this.entireDate;
        }
      });
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
      return num ? parsePercent(num) : "0%";
    },
    entireRate(num, d) {
      if (num < -0.1) {
        return "danger";
      } else if (num > 0.1) {
        return "success";
      } else {
        return "info";
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
    .el-noauth {
      background-color: #fff;
    }
  }
  .el-main {
    padding: 0;
    // background-color: #f0f2f5;
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
