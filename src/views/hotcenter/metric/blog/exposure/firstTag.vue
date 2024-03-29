<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">一级领域分布（曝光）</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form
        :model="formInline"
        size="small"
      >
        <el-form-item>
          <el-date-picker
            style="width: 170px;"
            v-model="formInline.dt_start"
            type="date"
            format="yyyy年MM月dd日"
            value-format="yyyyMMdd"
            placeholder="选择开始时间"
            @change="onSearch"
          >
          </el-date-picker>
          <el-date-picker
            style="width: 170px;"
            v-model="formInline.dt_end"
            type="date"
            format="yyyy年MM月dd日"
            value-format="yyyyMMdd"
            placeholder="选择结束时间"
            @change="onSearch"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="一级标签：">
          <el-select v-model="filterValue" filterable multiple placeholder="请选择一级标签 可多选" style="min-width: 80%;max-width: 100%;">
            <el-option
              v-for="(label, tagid) in category"
              :key="tagid"
              :label="label"
              :value="tagid">
            </el-option>
          </el-select>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      v-if="chartData"
      class="content-box-wrap"
    >
      <el-col
        :span="24"
      >
        <item-chart :data="chartData"></item-chart>
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
import { category } from "@/utils/config";
import { Message } from "element-ui";

export default {
  name: "ScaleTarget",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      category,
      filterValue: ['1042015:newTagCategory_001'],
      formInline: {
        subclass: "tag",
        type: "exposure",
        dt_start: "",
        dt_end: ""
      },
      chartData: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.formInline.dt_start = parseTime(
          Date.now() - 3600 * 1000 * 24 * 14,
          "{y}{m}{d}"
        );
        this.formInline.dt_end = parseTime(Date.now() - 3600 * 1000 * 24, "{y}{m}{d}");
        this.onSearch();
      }
    },
    onSearch() {
      if(!this.filterValue || this.filterValue.length < 1) {
        Message({
          showClose: true,
          message: "请选择需要查询的一级标签！",
          type: "error",
          duration: 3000
        });
        return;
      }
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getUnionMonitorData.html",
        param: {
          ...this.formInline,
          filterValue: this.filterValue.join(',')
        }
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
          if (res.data) {
            const title = res.data.title || res.data.yAxis.name;
            this.chartData = this.setAnalyData(res.data, title);
          } else {
            this.chartData = null;
          }
        } else {
          this.chartData = null;
          Message({
            showClose: true,
            message: res.msg || "数据请求失败！",
            type: "error",
            duration: 3000
          });
        }
      });
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
  }
}
</style>