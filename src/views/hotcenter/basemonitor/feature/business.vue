<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">核心业务指标</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form
        :model="formInline"
        size="small"
      >
        <el-form-item>
          <el-radio-group v-model="formInline.metric" @change="onSearch">
            <el-radio
              border
              style="margin-left: 0;margin-right: 5px;margin-bottom: 5px;"
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
import { FeatureAPI } from "@/utils/config";
import { Message } from "element-ui";

export default {
  name: "business",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      FeatureAPI,
      formInline: {
        view: "diff",
        metric: "show",
        from_dt: "",
        to_dt: ""
      },
      chartData: null,
      metricMap: {
        show: "曝光量",
        ctr1: "4+3+1种行为内部去重求和/曝光*1000",
        pic_ctr: "图片点击率",
        vid_ctr: "视频点击率",
        txt_ctr: "正文页点击率",
        lng_ctr: "长文点击率",
        itr1: "3种互动行为（不去重）求和/曝光*1000",
        itr2: "3种互动行为整体去重求和/曝光*1000",
        ret_itr: "转发率",
        cmt_itr: "评论率",
        lik_itr: "赞率",
        dur: "列表页人均时长"
      },
      viewMap: {
        diff: "对比趋势",
        offline: "离线趋势",
        online: "在线趋势"
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
          Date.now() - 3600 * 1000 * 24 * 14,
          "{y}{m}{d}"
        );
        this.formInline.to_dt = parseTime(Date.now() - 3600 * 1000 * 24, "{y}{m}{d}");
        this.onSearch();
      }
    },
    onSearch() {
      const tempData = {
        url: FeatureAPI.getCoreBusiness,
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
          const title = res.data.title || res.data.yAxis.name;
          this.chartData = this.setAnalyData(res.data, title);
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