<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">
                <i class="el-icon-printer" style="margin-right: 6px;"></i>流量分析详情</h6>
        </el-row>
        <el-row class="search-form-wrap">
            <el-form inline :model="formInline" size="small">
                <el-form-item>
                    <el-date-picker style="width: 170px;" v-model="formInline.dt_start" type="date" placeholder="请选择开始日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" @change="getDropList()">
                    </el-date-picker>
                    <el-date-picker style="width: 170px;" v-model="formInline.dt_end" type="date" placeholder="请选择结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" @change="getDropList()">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="指标">
                    <el-select style="width: 80px;" v-model="formInline.status" placeholder="请选择">
                        <el-option label="PV" value="pv"></el-option>
                        <el-option label="UV" value="uv"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务">
                    <el-select style="width: 120px;" v-model="formInline.stream_name" placeholder="请选择" @change="getDropList()">
                        <el-option :key="key" v-for="(val, key) in streamList" :label="val" :value="key"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="from值">
                    <el-select v-model="item_names" placeholder="请选择" multiple>
                        <el-option v-for="item in itemsList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="content-box-wrap">
            <el-col :span="24">
                <item-chart :data="chartItem"></item-chart>
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
import { formatNum, parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "datamonitor",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      formInline: {
        dt_start: "",
        dt_end: "",
        status: "pv", //指标
        stream_name: "hotwb", //业务
        item_names: "" //from值
      },
      item_names: [], //from值
      itemsList: null,
      streamList: {
        hotwb: "热门流",
        top_rank: "榜单流",
        channel: "频道流",
        visit: "访客流"
      },
      charts: [],
      chartItem: null
    };
  },
  computed: {
    ...mapGetters(["email", "pageAuth"])
  },
  methods: {
    init() {
      const start = parseTime(Date.now() - 3600 * 1000 * 24 * 30, "{y}{m}{d}");
      const end = parseTime(Date.now() - 3600 * 1000 * 24 * 1, "{y}{m}{d}");
      this.formInline.dt_start = start;
      this.formInline.dt_end = end;
      this.formInline.status = this.$route.query.status || "pv";
      if (this.pageAuth === 1) {
        this.getDropList();
      }
    },
    onSearch() {
      this.formInline.item_names = this.item_names.join(",");
      if (!this.formInline.dt_start) {
        Message({
          showClose: true,
          message: "请选择开始日期！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formInline.dt_end) {
        Message({
          showClose: true,
          message: "请选择结束日期！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formInline.item_names) {
        Message({
          showClose: true,
          message: "请选择from值！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getPvuvLineFromVal.html",
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
            `流量分析-${this.streamList[this.formInline.stream_name]}`
          );
        }
      });
    },
    getDropList() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getFromValWeiduName.html",
        param: {
          dt_start: this.formInline.dt_start,
          dt_end: this.formInline.dt_end,
          stream_name: this.formInline.stream_name
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.itemsList = res.data || "";
          const item_names = (res.data && res.data[0].value) || "";
          this.item_names = (item_names && [item_names]) || [];
          this.onSearch();
        }
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
  }
}
</style>
