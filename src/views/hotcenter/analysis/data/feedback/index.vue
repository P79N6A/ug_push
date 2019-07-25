<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">负反馈分析</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form
        :model="formInline"
        size="mini"
      >
        <el-form-item>
          <el-date-picker
            style="width: 170px;"
            v-model="formInline.start_time"
            type="date"
            format="yyyy年MM月dd日"
            value-format="yyyyMMdd"
            placeholder="选择开始时间"
            @change="getLineData"
          >
          </el-date-picker>
          <el-date-picker
            style="width: 170px;"
            v-model="formInline.end_time"
            type="date"
            format="yyyy年MM月dd日"
            value-format="yyyyMMdd"
            placeholder="选择结束时间"
            @change="getLineData"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      v-if="chartData"
      class="content-box-wrap"
    >
      <el-col :span="24">
        <item-chart :data="chartData"></item-chart>
      </el-col>
    </el-row>
    <p
      v-else
      class="none-tips"
    >暂无数据</p>
    <el-row class="content-box-wrap">
      <div class="table-title left">负反馈分析数据{{tableTitle ? `（${tableTitle}）`: ''}}</div>
      <el-date-picker
        style="width: 170px;"
        size="mini"
        v-model="formTable.time"
        type="date"
        format="yyyy年MM月dd日"
        value-format="yyyyMMdd"
        placeholder="选择开始时间"
        @change="getTableData"
      >
      </el-date-picker>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        stripe
        size="mini"
        :default-sort="{prop: 'count', order: 'descending'}"
      >
        <el-table-column
          type='index'
          label="序号"
          align='center'
          width='80'
        >
        </el-table-column>
        <el-table-column
          prop="type_name"
          label="负反馈分析类型"
        ></el-table-column>
        <el-table-column
          prop="count"
          sortable
          label="数量"
        >
          <template slot-scope="scope">
            <span>{{formatNum(scope.row.count)}}（{{scope.row.count}}）</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          sortable
          label="时间"
        ></el-table-column>
      </el-table>
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
import { parseTime, formatNum } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "ratePage",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      formatNum,
      formInline: {
        start_time: "",
        end_time: ""
      },
      formTable: {
        time: ""
      },
      chartData: null,
      tableData: null,
      tableTitle: ""
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.formTable.time = parseTime(Date.now(), "{y}{m}{d}");
        this.tableTitle = this.formTable.time;
        this.formInline.start_time = parseTime(
          Date.now() - 3600 * 1000 * 24 * 7,
          "{y}{m}{d}"
        );
        this.formInline.end_time = parseTime(Date.now(), "{y}{m}{d}");
        this.getTableData();
        this.getLineData();
      }
    },
    getTableData() {
      const data = {
        url: "/unlink/getList",
        params: this.formTable
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          this.tableTitle =
            this.formTable.time || parseTime(Date.now(), "{y}{m}{d}");
          if (res.code && Number(res.code) == 200) {
            Message({
              showClose: true,
              message: "success",
              type: "success",
              duration: 1000
            });
            this.tableData = res.result;
          } else {
            this.tableData = null;
            Message({
              showClose: true,
              message: res.msg || "数据请求失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          this.tableTitle =
            this.formTable.time || parseTime(Date.now(), "{y}{m}{d}");
          this.tableData = null;
          Message({
            showClose: true,
            message: "数据接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    getLineData() {
      if (!this.formInline.start_time || !this.formInline.end_time) {
        return;
      }
      const data = {
        url: "/unlink/getListMap",
        params: this.formInline
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            Message({
              showClose: true,
              message: "success",
              type: "success",
              duration: 1000
            });
            const title = res.result.title || res.result.yAxis.name;
            this.chartData = this.setAnalyData(res.result, `${title}-趋势图`);
          } else {
            this.chartData = null;
            Message({
              showClose: true,
              message: res.msg || "数据请求失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          this.chartData = null;
          Message({
            showClose: true,
            message: "数据接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    setAnalyData(chartData, title) {
      const series = chartData.series;
      let seriesList = [];
      for (let i = 0; i < series.length; i++) {
        seriesList.push({
          name: series[i].name, //图例名称
          type: series[i].type || chartData.type || "line", //图表类型：bar，条形图；line，折线图
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
            name: chartData.yAxis.name, //y坐标轴名称 chartData.yAxis.name
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
    .none-tips {
      padding-top: 20px;
      text-align: center;
      color: #666;
    }
    .table-title {
      padding: 5px 10px;
      color: #409eff;
      border-left: 2px solid #409eff;
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>