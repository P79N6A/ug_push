<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-printer" style="margin-right: 6px;"></i>热门流-数据分析-真实曝光</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form inline :model="formInline" size="small">
        <el-form-item label="时间段">
          <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.dt_start" type="date" format="yyyy年MM月dd日" value-format="yyyyMMdd" placeholder="选择开始时间">
          </el-date-picker>
          <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.dt_end" type="date" format="yyyy年MM月dd日" value-format="yyyyMMdd" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col>
        <el-row class="chartWrap" v-if="chartItem">
          <el-col :span="24" style="margin-bottom: 10px;">
            <item-chart :data="chartEntire"></item-chart>
          </el-col>
          <el-col :xs="24" :span="12" v-for="(item,index) in chartItem" :key="index" style="margin-bottom: 10px;">
            <item-chart :data="item"></item-chart>
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
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "datamonitor",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      analyData: null,
      formInline: {
        type: "exposure",
        items: "real_read_data",
        date: [],
        dt_start: "",
        dt_end: ""
      },
      chartItem: [],
      chartEntire: null
    };
  },
  computed: {
    ...mapGetters(["email", "pageAuth"])
  },
  methods: {
    init() {
      this.formInline.dt_start = parseTime(
        Date.now() - 3600 * 1000 * 24 * 30,
        "{y}{m}{d}"
      );
      this.formInline.dt_end = parseTime(
        Date.now() - 3600 * 1000 * 24 * 1,
        "{y}{m}{d}"
      );
      if (this.pageAuth === 1) {
        this.onSearch();
      }
    },
    onSearch() {
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
      this.getKpiLine();
    },
    getKpiLine() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getKpiLine.html",
        param: {
          dt_start: this.formInline.dt_start,
          dt_end: this.formInline.dt_end,
          type: this.formInline.type,
          items: this.formInline.items
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.analyData = res.data;
        } else {
          Message({
            showClose: true,
            message: res.msg || '数据获取失败',
            type: 'error',
            duration: 0
          })
        }
      },err => {
          Message({
            showClose: true,
            message: '数据接口请求失败',
            type: 'error',
            duration: 0
          })
      });
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
    }
  },
  created() {
    this.init();
  },
  watch: {
    email() {},
    pageAuth() {
      this.init();
    },
    analyData() {
      if (this.analyData) {
        this.chartItem = this.analyData.item.legendName.map((val, idx) => {
          return this.setAnalyData({
            legendName: [val],
            series: [this.analyData.item.series[idx]],
            xAxis: this.analyData.item.xAxis,
            yAxis: this.analyData.item.yAxis
          },
            `真实曝光-${val}`);
        });
        this.chartEntire = this.setAnalyData(
          this.analyData.entire,
          "真实曝光-整体"
        );
      }
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
    .moreTips {
      text-align: center;
      font-size: 14px;
      color: #999;
    }
    .markTips {
      padding: 10px 0;
      clear: both;
      background-color: #91d470;
      font-weight: bold;
      color: #fff;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #79bf57;
      }
    }
  }
}
</style>
