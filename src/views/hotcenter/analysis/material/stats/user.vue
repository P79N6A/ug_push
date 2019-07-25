<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-printer" style="margin-right: 6px;"></i>白名单账号</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form inline :model="formInline" size="mini">
        <el-form-item label="日期">
          <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.dt_start" type="date" format="yyyy年MM月dd日" value-format="yyyyMMdd" placeholder="选择开始时间">
          </el-date-picker>
          <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.dt_end" type="date" format="yyyy年MM月dd日" value-format="yyyyMMdd" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="分析项">
          <el-select style="width: 260px;" v-model="formInline.status" placeholder="请选择" filterable>
            <el-option v-for="(val, key) in statusMap" :key="key" :label="val" :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch()">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col>
        <el-row class="chartWrap">
          <el-col :span="24" style="margin-bottom: 10px;">
            <item-chart :data="chartItem"></item-chart>
          </el-col>
        </el-row>
        <el-row class="table-wrap" v-if="usersTable">
          <el-col>
            <div class="table-title left">{{curTime}}</div>
            <el-button v-if="usersTable.length > 0" class="right" type="primary" plain size="mini" :loading="downloadLoading" @click="handleDownload">
              <i class="el-icon-download"></i> <span class="hidden-xs-only">导出</span></el-button>
            <el-table :data="usersTable" style="width: 100%" border stripe size="mini">
              <el-table-column prop="dt" label="日期">
              </el-table-column>
              <el-table-column prop="entire_white_user" label="白名单总量" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.entire_white_user)}}</template>
              </el-table-column>
              <el-table-column prop="daily_write_user" label="白名单中当天发博用户数" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.daily_write_user)}}</template>
              </el-table-column>
              <el-table-column prop="daily_ruku_user" label="日新增入库用户量" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.daily_ruku_user)}}</template>
              </el-table-column>
              <el-table-column prop="daily_expo_user" label="日新增曝光用户量" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.daily_expo_user)}}</template>
              </el-table-column>
              <el-table-column min-width="90" prop="daily_write_user_rate" label="日新增发博用户／白名单总量" sortable>
                <template slot-scope="scope">
                  <el-tag>{{_parsePercent(scope.row.daily_write_user_rate)}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column min-width="90" prop="daily_expo_user_rate" label="日新增曝光用户量／白名单总量" sortable>
                <template slot-scope="scope">
                  <el-tag>{{_parsePercent(scope.row.daily_expo_user_rate)}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="daily_weibo_number" label="日新增发博总量" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.daily_weibo_number)}}</template>
              </el-table-column>
              <el-table-column min-width="90" prop="daily_weibo_number_increase_rate" label="日新增发博总量对比上周同期增长率" sortable>
                <template slot-scope="scope">
                  <el-tag>{{_parsePercent(scope.row.daily_weibo_number_increase_rate)}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="daily_origin_weibo_num" label="日新增原创发博量" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.daily_origin_weibo_num)}}</template>
              </el-table-column>
              <el-table-column prop="daily_transmit_weibo_num" label="日新增转发微博量" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.daily_transmit_weibo_num)}}</template>
              </el-table-column>
              <el-table-column prop="whole_ruku_user" label="有效期物料所有入库用户数" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.whole_ruku_user)}}</template>
              </el-table-column>
              <el-table-column prop="whole_expo_user" label="有效期物料所有曝光用户数" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.whole_expo_user)}}</template>
              </el-table-column>
              <el-table-column prop="whole_ave_expo" label="有效期内人均曝光量" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.whole_ave_expo)}}</template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import ItemChart from "@/components/ItemChart";
import { mapGetters } from "vuex";
import { parseTime, formatNum, parsePercent } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "whiteAccounts",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      formInline: {
        status: "entire_white_user",
        item_names: "white_list_info",
        dt_start: "",
        dt_end: ""
      },
      statusMap: {
        entire_white_user: "白名单总量",
        daily_write_user: "白名单中当天发博用户数",
        daily_weibo_number: "日新增发博总量",
        daily_origin_weibo_num: "日新增原创发博量",
        daily_transmit_weibo_num: "日新增转发微博量",
        daily_ruku_user: "日新增入库用户量",
        daily_expo_user: "日新增曝光用户量",
        daily_write_user_rate: "日新增发博用户／白名单总量",
        daily_expo_user_rate: "日新增曝光用户量／白名单总量",
        daily_weibo_number_increase_rate: "日新增发博总量对比上周同期增长率",
        whole_ruku_user: "有效期物料所有入库用户数",
        whole_expo_user: "有效期物料所有曝光用户数",
        whole_ave_expo: "有效期内人均曝光量"
      },
      chartItem: null,
      usersTable: null,
      curTime: "",
      downloadLoading: false
    };
  },
  computed: {
    ...mapGetters(["email", "pageAuth"])
  },
  methods: {
    init() {
      this.formInline.dt_start = parseTime(
        Date.now() - 3600 * 1000 * 24 * 7,
        "{y}{m}{d}"
      );
      this.formInline.dt_end = parseTime(
        Date.now() - 3600 * 1000 * 24 * 3,
        "{y}{m}{d}"
      );
      if (this.pageAuth === 1) {
        this.onSearch();
      }
    },
    onSearch(){
      if (!this.formInline.dt_start) {
        Message({
          showClose: true,
          message: "请选择开始时间！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.formInline.dt_end) {
        Message({
          showClose: true,
          message: "请选择结束时间！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.formInline.status) {
        Message({
          showClose: true,
          message: "请选择分析项！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.getUsersTable();
      this.getUsersLine();
    },
    getUsersLine() {
      const tempData = {
        url:
          "http://172.16.105.67:8091/newtest1011/getMaterialWhiteUsersLine.html",
        param: this.formInline
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.chartItem = this.setAnalyData(
            res.data,
            this.statusMap[res.data.yAxis.name]
          );
        }
      });
    },
    getUsersTable() {
      const tempData = {
        url:
          "http://172.16.105.67:8091/newtest1011/getMaterialWhiteUsersTableManyDt.html",
        param: {
          dt_start: this.formInline.dt_start,
          dt_end: this.formInline.dt_end
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          this.curTime = `${this.formInline.dt_start}-${this.formInline.dt_end}`;
          if (res.code && Number(res.code) == 200) {
            this.usersTable = res.data;
          } else {
            this.usersTable = [];
          }
        },
        err => {
          this.curTime = `${this.formInline.dt_start}-${this.formInline.dt_end}`;
          this.usersTable = [];
        }
      );
    },
    setAnalyData(chartData, title) {
      const series = chartData.series;
      let seriesList = [];
      for (let i = 0; i < series.length; i++) {
        seriesList.push({
          name: series[i].name, //图例名称
          type: "line", //图表类型：bar，条形图；line，折线图
          data: series[i].data, //每个条形图的数值
          smooth: true
        });
      }
      const res = {
        title: title, //图表标题
        width: "100%", //图表宽
        height: "400px", //图表高
        legendName: chartData.legendName, //图例名称
        xAxis: [
          //x轴配置
          {
            type: "category",
            data: chartData.xAxis.data, //每个刻度标签对应的名称
            name: chartData.xAxis.name, //x坐标轴名称
            axisLabel: {
              rotate: 0 //刻度标签旋转的角度，旋转的角度从 -90 度到 90 度
            },
            axisLine: {
              //坐标轴是否带箭头
              symbol: ["none", "arrow"]
            },
            splitLine: {
              //坐标轴在 grid 区域中的分隔线
              show: true
            },
            axisTick: {
              //是否显示坐标轴刻度
              show: false
            }
          }
        ],
        yAxis: [
          //y轴配置，与x轴一致
          {
            type: "value",
            name: "", //y坐标轴名称 chartData.yAxis.name
            axisLine: {
              symbol: ["none", "arrow"]
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: seriesList
      };
      return res;
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = `白名单账号_${this.curTime}`;
        const tHeader = [
          "日期",
          "白名单总量",
          "白名单中当天发博用户数",
          "日新增入库用户量",
          "日新增曝光用户量",
          "日新增发博用户／白名单总量",
          "日新增曝光用户量／白名单总量",
          "日新增发博总量",
          "日新增发博总量对比上周同期增长率",
          "日新增原创发博量",
          "日新增转发微博量",
          "有效期物料所有入库用户数",
          "有效期物料所有曝光用户数",
          "有效期内人均曝光量"
        ];
        const filterVal = [
          "dt",
          "entire_white_user",
          "daily_write_user",
          "daily_ruku_user",
          "daily_expo_user",
          "daily_write_user_rate",
          "daily_expo_user_rate",
          "daily_weibo_number",
          "daily_weibo_number_increase_rate",
          "daily_origin_weibo_num",
          "daily_transmit_weibo_num",
          "whole_ruku_user",
          "whole_expo_user",
          "whole_ave_expo"
        ];
        const list = this.usersTable;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, i) =>
        filterVal.map(j => {
          if (j === "daily_write_user_rate" || j === "daily_expo_user_rate" || j === "daily_weibo_number_increase_rate") {
            return this._parsePercent(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num, dec) {
      return parsePercent(num, dec);
    }
  },
  created() {
    this.init();
  },
  watch: {
    email() {},
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
    .table-wrap {
      margin-bottom: 20px;
    }
    .table-title {
      padding: 5px 10px;
      color: #409eff;
      border-left: 2px solid #409eff;
      margin-bottom: 10px;
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
    .chartWrap {
      margin-bottom: 20px;
    }
  }
}
</style>
