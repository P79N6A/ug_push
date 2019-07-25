<template>
    <div>
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">
                <i class="el-icon-printer" style="margin-right: 6px;"></i>热门流-KPI指标趋势</h6>
        </el-row>
        <el-row>
            <el-form inline :model="formInline">
                <el-form-item label="时间选择">
                    <el-date-picker v-model="formInline.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="指标选择">
                    <el-select v-model="formInline.type" placeholder="请选择查询维度">
                        <el-option label="千次点击" value="thd_click"></el-option>
                        <el-option label="千次互动" value="thd_act"></el-option>
                        <el-option label="人均刷新" value="average_fresh_times"></el-option>
                        <el-option label="PV" value="pv"></el-option>
                        <el-option label="UV" value="uv"></el-option>
                        <el-option label="曝光量" value="exposure"></el-option>
                        <el-option label="次日留存率(仅热门)" value="two_save_rate"></el-option>
                        <el-option label="次日留存率(包含首页)" value="two_feed_save_rate"></el-option>
                    </el-select>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="chartWrap" type="flex" justify="space-between" v-if="chartEntire">
            <el-col :span="24" style="margin-right: 5px;">
                <item-chart :data="chartEntire"></item-chart>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import ItemChart from "@/components/ItemChart";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "datamonitor",
  components: {
    ItemChart
  },
  data() {
    return {
      formInline: {
        type: "",
        date: []
      },
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
      typeMap: null,
      chartEntire: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "analyData"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        const start = parseTime(Date.now() - 3600 * 1000 * 24 * 30, "{y}{m}{d}");
        const end = parseTime(Date.now() - 3600 * 1000 * 24 * 1, "{y}{m}{d}");
        this.formInline.date = [start, end];
        this.formInline.type = this.$route.query.type || "thd_click";
        this.typeMap = new Map([
            ["thd_click", "千次点击"],
            ["thd_act", "千次互动"],
            ["average_fresh_times", "人均刷新"],
            ["pv", "PV"],
            ["uv", "UV"],
            ["exposure", "曝光量"],
            ["two_save_rate", "次日留存(热门)"],
            ["two_feed_save_rate", "次日留存(首页)"]
        ]);
      }
    },
    onSearch() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getKpiLine.html",
        param: {
          dt_start: this.formInline.date[0],
          dt_end: this.formInline.date[1],
          type: this.formInline.type
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetAnalyData", params);
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
            name: chartData.yAxis.name, //y坐标轴名称
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
    },
    analyData() {
      if (this.analyData) {
        this.chartEntire = this.setAnalyData(this.analyData.entire, `${this.typeMap.get(this.formInline.type)}-趋势分析`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>