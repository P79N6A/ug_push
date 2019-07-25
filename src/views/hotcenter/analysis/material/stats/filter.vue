<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-printer" style="margin-right: 6px;"></i>白名单账号发博过滤</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form inline :model="formInline" size="mini">
        <el-form-item label="日期">
          <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.dt_start" type="date" format="yyyy年MM月dd日" value-format="yyyyMMdd" placeholder="选择开始时间">
          </el-date-picker>
          <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.dt_end" type="date" format="yyyy年MM月dd日" value-format="yyyyMMdd" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="过滤环节">
          <el-select style="width: 140px;" v-model="formInline.item_names" placeholder="请选择" filterable>
            <el-option v-for="(val, key) in itemMap" :key="key" :label="val" :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分析项">
          <el-select style="width: 270px;" v-model="formInline.status" placeholder="请选择" filterable>
            <el-option v-for="(val, key) in statusMap" :key="key" :label="val" :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsersLine()">查询</el-button>
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
            <el-date-picker class="left" style="margin-left: 10px;width: 170px;" v-model="dt_table" type="date" format="yyyy年MM月dd日" value-format="yyyyMMdd" placeholder="选择时间" size="mini" @change="getUsersTable()">
            </el-date-picker>
            <el-button v-if="usersTable.length > 0" class="right" type="primary" plain size="mini" :loading="downloadLoading" @click="handleDownload">
              <i class="el-icon-download"></i> <span class="hidden-xs-only">导出</span></el-button>
            <el-table :data="usersTable" :default-sort="{prop: 'daily_ruku_num', order: 'descending'}" style="width: 100%" border stripe size="mini">
              <el-table-column type="index" prop="index" label="序号" width="50" align="center">
              </el-table-column>
              <el-table-column prop="name" label="白名单物料库过滤环节">
              </el-table-column>
              <el-table-column prop="" label="过滤量" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.daily_ruku_num)}}</template>
              </el-table-column>
              <el-table-column prop="" label="过滤后物料存量" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.daily_expo_weibo)}}</template>
              </el-table-column>
              <el-table-column prop="" label="过滤后物料存量占比" sortable>
                <template slot-scope="scope">
                  <el-tag>{{_parsePercent(scope.row.daily_ruku_number_increase_rate)}}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="" label="过滤量对比上周同期增长率" sortable>
                <template slot-scope="scope">
                  <el-tag>{{_parsePercent(scope.row.daily_ruku_number_increase_rate)}}</el-tag>
                </template>
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
  name: "materialFilter",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      formInline: {
        status: "daily_ruku_num",
        item_names: "entire",
        dt_start: "",
        dt_end: ""
      },
      dt_table: "",
      statusMap: {
        daily_ruku_num: "日新增入库物料量",
        daily_expo_weibo: "日新增曝光物料量",
        daily_expo_num: "日新增物料曝光量",
        whole_ruku_num: "有效期内入库物料量",
        whole_expo_weibo: "有效期内曝光物料量",
        whole_expo_num: "有效期内物料曝光量",
        daily_ruku_number_increase_rate: "日新增入库物料量对比上周同期增长率"
      },
      itemMap: {
        entire: "总量",
        total_cf: "全站协同",
        mannual_tag: "人工标签",
        short_video: "小视频",
        vertical_operate: "垂直运营",
        local: "本地",
        douyin: "抖音",
        dujia: "独家",
        bangdan: "榜单",
        hot_event: "热点事件",
        F0: "F0转发",
        F1: "F1转发",
        white_user_origin: "白名单原创物料"
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
      this.dt_table = this.formInline.dt_end;
      this.curTime = this.dt_table;
      if (this.pageAuth === 1) {
        this.getUsersTable();
        this.getUsersLine();
      }
    },
    getUsersLine() {
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
      const tempData = {
        url:
          "http://172.16.105.67:8091/newtest1011/getMaterialComponentsLine.html",
        param: this.formInline
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          // this.chartItem = this.setAnalyData(res.data, res.data.yAxis.name);
        }
      });
    },
    getUsersTable() {
      if (!this.dt_table) {
        Message({
          showClose: true,
          message: "请选择数据查询日期！",
          type: "error",
          duration: 3000
        });
        return;
      }
      const tempData = {
        url:
          "http://172.16.105.67:8091/newtest1011/getMaterialComponentsTable.html",
        param: {
          dt: this.dt_table
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          // if (res.code && Number(res.code) == 200) {
          //   this.curTime = this.dt_table;
          //   this.usersTable = res.data;
          // } else {
          //   this.curTime = this.dt_table;
          //   this.usersTable = [];
          // }
          this.curTime = this.dt_table;
          this.usersTable = [];
        },
        err => {
          this.curTime = this.dt_table;
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
        const filename = `白名单账号发博过滤_${this.curTime}`;
        const tHeader = [
          "序号",
          "白名单物料库过滤环节",
          "过滤量",
          "过滤后物料存量",
          "过滤后物料存量占比",
          "过滤量对比上周同期增长率"
        ];
        const filterVal = [
          "index",
          "name",
          "daily_ruku_num",
          "daily_expo_weibo",
          "daily_ruku_number_increase_rate",
          "daily_ruku_number_increase_rate"
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
          if (j === "index") {
            return i + 1;
          } else if (j === "daily_ruku_number_increase_rate") {
            return _parsePercent(v[j]);
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
