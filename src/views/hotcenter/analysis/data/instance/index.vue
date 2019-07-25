<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i
          class="el-icon-date hidden-xs-only"
          style="margin-right: 6px;"
        ></i>样本数据统计</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form
        inline
        :model="formInline"
        size="small"
      >
        <el-form-item label="数据类型">
          <el-select
            style="width: 100px;"
            v-model="formInline.dtype"
            placeholder="请选择数据类型"
            @change="onSearch"
          >
            <el-option
              :key="key"
              v-for="(label, key) in dtypeList"
              :label="label"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="平台类型">
          <el-select
            style="width: 90px;"
            v-model="formInline.pltfm"
            placeholder="请选泽平台类型"
            @change="onSearch"
          >
            <el-option
              :key="key"
              v-for="(label, key) in pltfmList"
              :label="label"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阅读类型">
          <el-select
            style="width: 90px;"
            v-model="formInline.read"
            placeholder="请选泽阅读类型"
            @change="onSearch"
          >
            <el-option
              :key="key"
              v-for="(label, key) in readList"
              :label="label"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据项">
          <el-select
            style="width: 120px;"
            v-model="formInline.value"
            placeholder="请选泽数据项"
            filterable
            @change="onSearch"
          >
            <el-option
              :key="key"
              v-for="(label, key) in valueList"
              :label="label"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视图类型">
          <el-select
            style="width: 100px;"
            v-model="formInline.view"
            placeholder="请选泽视图类型"
            @change="onSearch"
          >
            <el-option
              :key="key"
              v-for="(label, key) in viewList"
              :label="label"
              :value="key"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            style="width: 190px;"
            v-model="formInline.start"
            type="datetime"
            format="yyyy年MM月dd日HH时"
            value-format="yyyyMMddHH"
            placeholder="选择开始时间"
            @change="onSearch"
          >
          </el-date-picker>
          <el-date-picker
            style="width: 190px;"
            v-model="formInline.to"
            type="datetime"
            format="yyyy年MM月dd日HH时"
            value-format="yyyyMMddHH"
            placeholder="选择结束时间"
            @change="onSearch"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      v-if="chartData"
      class="content-box-wrap"
      type="flex"
      justify="space-between"
    >
      <el-col
        :span="24"
        style="margin-right: 5px;"
      >
        <item-chart :data="chartData"></item-chart>
      </el-col>
    </el-row>
    <p v-else class="none-tips">暂无数据</p>
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
  name: "ratePage",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      formInline: {
        dtype: "data_normal",
        pltfm: "wap",
        read: "read",
        value: "expo",
        view: "hd",
        start: "",
        to: ""
      },
      chartData: null,
      dtypeList: {
        data_normal: "正常",
        data_dupexpo: "重复曝光",
        data_nomidinfo: "无MID",
        data_error: "日志错误",
        data_others: "其他",
        data_all: "全部"
      },
      pltfmList: { wap: "客户端", pc: "PC端", null: "未知", all: "全部" },
      readList: { read: "读过", noread: "未读过" },
      valueList: {
        expo: "曝光量",
        click: "点击率",
        inter: "互动率",
        duration: "平均时长",
        click_pic: "图片点击率",
        click_vid: "视频点击率",
        click_text: "正文点击率",
        click_lngtxt: "长文点击率",
        ret: "转",
        cmt: "评",
        like: "赞",
        follow: "关注",
        list_duration: "列表页时长",
        detail_duration: "详情页时长",
        dark_duration: "黑灯流时长"
      },
      viewList: { hh: "HH趋势", hd: "HD趋势", dd: "DD趋势", dh: "DH对比" }
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.formInline.start = parseTime(
          Date.now() - 3600 * 1000 * 24 * 30,
          "{y}{m}{d}{h}"
        );
        this.formInline.to = parseTime(
          Date.now(),
          "{y}{m}{d}{h}"
        );
        this.onSearch();
      }
    },
    onSearch() {
      const tempData = {
        url: "http://172.16.139.44:8090/",
        param: this.formInline
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetBaseAnaly", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
          this.chartData = this.setAnalyData(res.data, res.data.yAxis.name);
        } else {
           this.chartData = null;
           Message({
            showClose: true,
            message: res.msg || '数据请求失败！',
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
          type: series[i].type || "line", //图表类型：bar，条形图；line，折线图
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