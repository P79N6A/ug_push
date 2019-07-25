<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">核心工程指标</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form
        :model="formInline"
        size="small"
      >
        <el-form-item label="时长：">
          <el-radio-group
            v-model="formInline.metric"
            @change="onSearch"
          >
            <el-radio
              border
              style="margin-left: 0;margin-right: 5px;"
              :key="key"
              v-for="(val, key) in metricMap"
              :label="key"
            >{{val}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            style="width: 170px;"
            v-model="formInline.from_dt"
            type="date"
            format="yyyy年MM月dd日"
            value-format="yyyyMMdd"
            placeholder="选择开始时间"
            @change="onSearch"
          >
          </el-date-picker>
          <el-date-picker
            style="width: 170px;"
            v-model="formInline.to_dt"
            type="date"
            format="yyyy年MM月dd日"
            value-format="yyyyMMdd"
            placeholder="选择结束时间"
            @change="onSearch"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-radio-group
            v-model="formInline.view"
            @change="onSearch"
          >
            <el-radio-button
              style="margin-left: 0;"
              :key="key"
              v-for="(val, key) in viewMap"
              :label="key"
            >{{val}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      v-if="chartList && chartList.length > 0"
      class="content-box-wrap"
    >
      <el-col
        :span="12"
        :key="key" v-for="(item, key) in chartList"
      >
        <item-chart :data="item"></item-chart>
      </el-col>
    </el-row>
    <p
      v-else
      class="none-tips"
    >暂无数据</p>
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
import { FeatureAPI } from "@/utils/config";
import { Message } from "element-ui";

export default {
  name: "project",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      FeatureAPI,
      formInline: {
        view: "showline",
        metric: "10min",
        from_dt: "",
        to_dt: ""
      },
      chartList: [],
      metricMap: {
        "10min": "10min",
        "20min": "20min",
        "30min": "30min",
        "45min": "45min",
        "60min": "60min",
        "120min": "120min",
        "300min": "300min",
        others: "其他"
      },
      viewMap: {
        showline: "曝光延时",
        actline: "行为延时",
        durline: "时长延时",
        mtline: "入库延时"
      }
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.formInline.from_dt = parseTime(
          Date.now() - 3600 * 1000 * 24 * 13,
          "{y}{m}{d}"
        );
        this.formInline.to_dt = parseTime(
          Date.now() - 3600 * 1000,
          "{y}{m}{d}"
        );
        this.onSearch();
      }
    },
    onSearch() {
      const tempData = {
        url: FeatureAPI.getCoreProject,
        param: this.formInline
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
        this.$store.dispatch("ProxyGet", params).then(res => {
          if (res.code && Number(res.code) == 200) {
            Message({
              showClose: true,
              message: "success",
              type: "success",
              duration: 1000
            });
            this.analyData(res.data);
          } else {
            this.chartList = [];
            Message({
              showClose: true,
              message: res.msg || "数据请求失败！",
              type: "error",
              duration: 3000
            });
          }
        });
    },
    analyData(arr) {
      this.chartList = [];
      if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].type === "pie") {
            this.chartList.push(this.setPieData(arr[i]));
          } else if (arr[i].type === "line" || arr[i].type === "bar") {
            this.chartList.push(this.setLineData(arr[i]));
          }
        }
      }
    },
    setLineData(chartData) {
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
        title: chartData.title || chartData.yAxis.name, //图表标题
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
    },
    setPieData(chartData) {
      if (chartData.type === "pie") {
        const series = {
          ...chartData.series,
          type: "pie", //图表类型：bar，条形图；line，折线图；饼图：pie
          radius: [0, "60%"], //圆半径
          tooltip: {
            //饼图提示工具
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          }
        };
        const res = {
          number: chartData.number || 1,
          title: chartData.title || '饼图',
          legendName: chartData.legendName,
          series,
          toolbox: {
            //工具栏，饼图默认加上
            orient: "vertical", //横向（默认）；垂直：vertical
            feature: {
              dataView: { show: true, readOnly: true }, //数据视图
              restore: { show: true },
              saveAsImage: {
                //保存为图片
                pixelRatio: 2
              }
            },
            right: 20,
            top: -6,
            emphasis: {
              iconStyle: {
                borderColor: "#409eff"
              }
            }
          }
        };
        return res;
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
  }
}
</style>