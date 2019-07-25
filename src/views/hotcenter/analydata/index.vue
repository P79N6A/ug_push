<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-printer" style="margin-right: 6px;"></i>热门流数据分析</h6>
    </el-row>
    <el-row>
      <el-form inline :model="formInline" size="small">
        <el-form-item label="时间">
          <el-date-picker style="width: 290px;" v-model="formInline.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" @change="getDropList()">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维度选择">
          <el-select style="width: 140px;" v-model="formInline.type" placeholder="请选择查询维度">
            <el-option :key="key" v-for="(item, key) in typeList" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分析项">
          <el-select style="width: 150px;" v-model="formInline.items" placeholder="请选择" @change="getDropList()">
            <el-option v-for="item in itemsList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.charts" multiple filterable placeholder="请选择，支持搜索">
            <el-option v-for="item in analyDropList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="chartWrap">
      <el-col :xs="24" :sm="11" :md="11" :lg="11" :xl="11" style="margin-right: 5px;margin-bottom: 10px;">
        <item-chart :data="chartEntire"></item-chart>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
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
        type: "",
        items: "author_c_level",
        date: [],
        charts: []
      },
      typeList: [
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
        },
        {
          label: "转发量",
          value: "retweet"
        },
        {
          label: "评论量",
          value: "comment"
        },
        {
          label: "点赞量",
          value: "like_volume"
        },
        {
          label: "互动量",
          value: "interact_volume"
        }
      ],
      itemsList: [
        {
          value: "recommend_source",
          label: "来源"
        },
        {
          value: "agent_version",
          label: "客户端版本"
        },
        {
          value: "system",
          label: "操作系统"
        },
        {
          value: "network_type",
          label: "网络环境"
        },
        {
          value: "hotwb_frequency_type",
          label: "分登录频次-热门"
        },
        {
          value: "all_frequency_type",
          label: "分登录频次-全站"
        },
        {
          value: "age",
          label: "年龄"
        },
        {
          value: "gender",
          label: "性别"
        },
        {
          value: "mid_type",
          label: "内容形式"
        },
        {
          value: "user_c_level",
          label: "C类型"
        },
        {
          value: "user_v_level",
          label: "V类型"
        },
        {
          value: "source",
          label: "领域"
        },
        {
          value: "wm",
          label: "渠道"
        },
        {
          value: "ispageup",
          label: "刷新方向"
        },
        {
          value: "luicode",
          label: "入口"
        },
        {
          value: "refresh",
          label: "刷新方式"
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
      itemMap: null,
      chartItem: null,
      chartEntire: null
    };
  },
  computed: {
    ...mapGetters(["email", "pageAuth", "analyDropList", "analyData"])
  },
  methods: {
    init() {
      const start = parseTime(Date.now() - 3600 * 1000 * 24 * 30, "{y}{m}{d}");
      const end = parseTime(Date.now() - 3600 * 1000 * 24 * 1, "{y}{m}{d}");
      this.formInline.date = [start, end];
      this.formInline.type = this.$route.query.type || "thd_click";
      this.formInline.items = this.$route.query.items || "recommend_source";
      this.itemMap = new Map([
        ["recommend_source", "来源"],
        ["agent_version", "客户端版本"],
        ["system", "操作系统"],
        ["network_type", "网络环境"],
        ["hotwb_frequency_type", "分登录频次-热门"],
        ["all_frequency_type", "分登录频次-全站"],
        ["age", "年龄"],
        ["gender", "性别"],
        ["mid_type", "内容形式"],
        ["user_c_level", "C类型"],
        ["user_v_level", "V类型"],
        ["source", "领域"],
        ["wm", "渠道"],
        ["ispageup", "刷新方向"],
        ["luicode", "入口"],
        ["refresh", "刷新方式"]
      ]);
      if (this.pageAuth === 1) {
        this.getDropList();
      }
    },
    onSearch() {
      const name = this.formInline.charts.join(",");
      if (!name) {
        Message({
          showClose: true,
          message: "请选择数据分析列表项！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getKpiLine.html",
        param: {
          dt_start: this.formInline.date[0],
          dt_end: this.formInline.date[1],
          type: this.formInline.type,
          items: this.formInline.items,
          items_name: name
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetAnalyData", params);
    },
    getDropList() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getKpiWeiduName.html",
        param: {
          dt_start: this.formInline.date[0],
          dt_end: this.formInline.date[1],
          items: this.formInline.items
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetAnalyDrop", params);
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
    analyDropList() {
      this.formInline.charts = [];
      this.analyDropList[0] &&
        this.formInline.charts.push(this.analyDropList[0].value);
      this.onSearch();
    },
    analyData() {
      if (this.analyData) {
        this.chartItem = this.setAnalyData(
          this.analyData.item,
          `${this.itemMap.get(this.formInline.items)}-${this.analyData.item.yAxis.name}`
        );
        this.chartEntire = this.setAnalyData(this.analyData.entire, `整体-${this.analyData.entire.yAxis.name}`);
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
    background-color: #f0f2f5;
    color: #333;
    line-height: 100%;
    .pane-title-wrap {
      margin-bottom: 20px;
      .pane-title {
        font-size: 16px;
        color: #409eff;
        text-align: left;
      }
    }
    .chartWrap {
      margin-bottom: 20px;
    }
  }
}
</style>
