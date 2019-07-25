<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-printer" style="margin-right: 6px;"></i>热门流-数据分析-{{typeMap[formInline.type]}}</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form inline :model="formInline" size="small">
        <el-form-item label="时间段">
          <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.dt_start" type="date" format="yyyy年MM月dd日" value-format="yyyyMMdd" placeholder="选择开始时间" @change="getDropList()">
          </el-date-picker>
          <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.dt_end" type="date" format="yyyy年MM月dd日" value-format="yyyyMMdd" placeholder="选择结束时间" @change="getDropList()">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="formInline.items" @change="getDropList()" size="mini">
            <el-radio style="margin-bottom: 10px;margin-right: 10px;margin-left: 0;" v-for="(val, key) in itemsMap" :key="key" :label="key" border>{{val}}</el-radio>
          </el-radio-group>
          <!-- <el-select style="min-width:340px;" v-model="formInline.charts" multiple filterable :placeholder="`请选择${itemsMap[formInline.items]}，支持搜索`">
            <el-option v-for="item in analyDropList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" @click="onSearch">查询</el-button> -->
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
          <p v-if="curPage > total" class="moreTips">没有更多数据</p>
          <p v-else @click="getKpiLine()" class="moreTips markTips">
            <i class="el-icon-plus"></i>
            点击加载更多···
          </p>
        </el-row>
        <el-row class="table-wrap" v-if="dataMonitor">
          <el-col>
            <div class="table-title left">{{itemsMap[formInline.items]}}（{{curTime}}）</div>
            <el-date-picker class="left" style="margin-left: 10px;width: 170px;" v-model="formInline.dt_monitor" type="date" format="yyyy年MM月dd日" value-format="yyyyMMdd" placeholder="选择时间" size="mini" @change="getMonitorData()">
            </el-date-picker>
            <el-table :data="dataMonitor[formInline.items]" style="width: 100%" border stripe max-height="500" size="mini">
              <el-table-column type="index" align="center" width="50" label="序号" fixed>
              </el-table-column>
              <el-table-column align="left" prop="name" :label="itemsMap[formInline.items]">
                <template slot-scope="scope">
                  <!-- <a class="link-btn" target="_blank" :href="`/hot/#/hotcenter/analydata?items=${formInline.items}&type=${formInline.type}`">{{scope.row.name}}</a> -->
                  <a class="link-btn">{{scope.row.name}}</a>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="110" prop="day_num" sortable label="当日数据">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.day_num)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="280" prop="day_rate" sortable label="天环比 (当日数据-前天数据)/前天数据">
                <template slot-scope="scope">
                  <span class="numBox">{{_formatNum(scope.row.yesterday_num)}}</span>
                  <el-tag :type="checkRate(scope.row.day_rate)">{{ _parsePercent(scope.row.day_rate) }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="280" prop="week_rate" sortable label="周环比 (本周均值-上周均值)/上周均值">
                <template slot-scope="scope">
                  <span class="numBox">{{_formatNum(scope.row.week_num)}}</span>
                  <el-tag :type="checkRate(scope.row.week_rate)">{{ _parsePercent(scope.row.week_rate) }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="280" prop="month_rate" sortable label="月环比 (本月均值-上月均值)/上月均值">
                <template slot-scope="scope">
                  <span class="numBox">{{_formatNum(scope.row.month_num)}}</span>
                  <el-tag :type="checkRate(scope.row.month_rate)">{{ _parsePercent(scope.row.month_rate) }}</el-tag>
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
import { formatNum, parsePercent, parseTime } from "@/utils";
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
        type: "",
        items: "recommend_source",
        date: [],
        dt_start: "",
        dt_end: "",
        dt_monitor: "",
        charts: []
      },
      typeMap: {
        thd_click: "千次点击",
        thd_act: "千次互动",
        average_fresh_times: "人均刷新",
        pv: "PV",
        uv: "UV",
        exposure: "曝光量",
        two_save_rate: "次日留存(热门)",
        two_feed_save_rate: "次日留存(首页)",
        retweet: "转发量",
        comment: "评论量",
        like_volume: "点赞量",
        interact_volume: "互动量"
      },
      itemsMap: {
        recommend_source: "来源",
        agent_version: "客户端版本",
        system: "操作系统",
        network_type: "网络环境",
        hotwb_frequency_type: "热门登录频次",
        all_frequency_type: "全站登录频次",
        age: "年龄",
        gender: "性别",
        mid_type: "内容形式",
        user_c_level: "C类型",
        user_v_level: "V类型",
        source: "领域",
        wm: "渠道",
        ispageup: "刷新方向",
        luicode: "入口",
        refresh: "刷新方式"
      },
      itemsListMap: {
        thd_click: {
          recommend_source: "来源",
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别",
          mid_type: "内容形式",
          user_c_level: "C类型",
          user_v_level: "V类型",
          source: "领域"
        },
        thd_act: {
          recommend_source: "来源",
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别",
          mid_type: "内容形式",
          user_c_level: "C类型",
          user_v_level: "V类型",
          source: "领域"
        },
        average_fresh_times: {
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别"
        },
        pv: {
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别",
          wm: "渠道",
          ispageup: "刷新方向",
          luicode: "入口",
          refresh: "刷新方式"
        },
        uv: {
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别",
          wm: "渠道",
          ispageup: "刷新方向",
          luicode: "入口",
          refresh: "刷新方式"
        },
        exposure: {
          recommend_source: "来源",
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别",
          mid_type: "内容形式",
          user_c_level: "C类型",
          user_v_level: "V类型",
          source: "领域"
        },
        two_save_rate: {
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别"
        },
        two_feed_save_rate: {
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别"
        },
        retweet: {
          recommend_source: "来源",
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别",
          mid_type: "内容形式",
          user_c_level: "C类型",
          user_v_level: "V类型",
          source: "领域"
        },
        comment: {
          recommend_source: "来源",
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别",
          mid_type: "内容形式",
          user_c_level: "C类型",
          user_v_level: "V类型",
          source: "领域"
        },
        like_volume: {
          recommend_source: "来源",
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别",
          mid_type: "内容形式",
          user_c_level: "C类型",
          user_v_level: "V类型",
          source: "领域"
        },
        interact_volume: {
          recommend_source: "来源",
          agent_version: "客户端版本",
          system: "操作系统",
          network_type: "网络环境",
          hotwb_frequency_type: "热门登录频次",
          all_frequency_type: "全站登录频次",
          age: "年龄",
          gender: "性别",
          mid_type: "内容形式",
          user_c_level: "C类型",
          user_v_level: "V类型",
          source: "领域"
        }
      },
      chartItem: [],
      chartEntire: null,
      analyDropList: null,
      dataMonitor: null,
      curTime: "",
      curPage: 1,
      total: 1,
      itemsList: []
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
      this.formInline.dt_monitor = this.formInline.dt_start;
      this.curTime = this.formInline.dt_monitor;
      this.formInline.type = this.$route.meta.type || "thd_click";
      this.formInline.items = this.$route.query.items || "agent_version";
      this.itemsMap = this.itemsListMap[this.formInline.type];
      if (this.pageAuth === 1) {
        this.getDropList();
      }
    },
    onSearch() {
      const start = (this.curPage - 1) * 10;
      const end = this.curPage === this.total ? this.itemsList.length : this.curPage * 10;
      this.formInline.charts = this.itemsList.slice(start, end);
      const name = this.formInline.charts.join(",");
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
      if (!this.formInline.dt_monitor) {
        Message({
          showClose: true,
          message: "请选择数据查询日期！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!name) {
        Message({
          showClose: true,
          message: "请选择数据分析列表项！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.getKpiLine();
      this.getMonitorData();
    },
    getKpiLine() {
      if (this.curPage !== 1) {
        const start = (this.curPage - 1) * 10;
        const end = this.curPage === this.total ? this.itemsList.length : this.curPage * 10;
        this.formInline.charts = this.itemsList.slice(start, end);
      }
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getKpiLine.html",
        param: {
          dt_start: this.formInline.dt_start,
          dt_end: this.formInline.dt_end,
          type: this.formInline.type,
          items: this.formInline.items,
          items_name: this.formInline.charts.join(",")
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.analyData = res.data;
          this.curPage ++;
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
    getMonitorData() {
      if (!this.formInline.dt_monitor) {
        Message({
          showClose: true,
          message: "请选择数据查询日期！",
          type: "error",
          duration: 3000
        });
        return;
      }
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getKpiMonitorData.html",
        param: {
          dt: this.formInline.dt_monitor,
          items: this.formInline.items,
          type: this.formInline.type
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        time: 20,
        cip: 230
      };
      this.$store.dispatch("ProxyGetTimeout", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.curTime = this.formInline.dt_monitor;
          this.dataMonitor = res.data;
        }
      });
    },
    getDropList() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getKpiWeiduName.html",
        param: {
          dt_start: this.formInline.dt_start,
          dt_end: this.formInline.dt_end,
          items: this.formInline.items
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.curPage = 1;
          this.total = 1;
          this.chartItem = [];
          this.analyDropList = res.data || [];
          this.itemsList = [];
          if (this.analyDropList && this.analyDropList.length) {
            this.analyDropList.forEach((val, idx) => {
              if (val.value === "￶" || val.value === "-1") {
                this.analyDropList.splice(idx, 1)
              }
            });
            this.itemsList = this.analyDropList.map( val => {
              return val.value.trim();
            })
            this.total = parseInt(this.itemsList.length / 10) + 1;
          }
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
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
      return num ? parsePercent(num) : "0%";
    },
    checkRate(num, d) {
      if (num < -0.15) {
        return "danger";
      } else if (num > 0.15) {
        return "success";
      } else {
        return "info";
      }
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
        const chartItem = this.analyData.item.legendName.map((val, idx) => {
          return this.setAnalyData({
            legendName: [val],
            series: [this.analyData.item.series[idx]],
            xAxis: this.analyData.item.xAxis,
            yAxis: this.analyData.item.yAxis
          },
            `${this.analyData.item.yAxis.name}-${this.itemsMap[this.formInline.items]}（${val}）`);
        });
        this.chartItem = this.chartItem.concat(chartItem);
        this.chartEntire = this.setAnalyData(
          this.analyData.entire,
          `${this.analyData.entire.yAxis.name}-整体`
        );
      }
    },
    "$route.fullPath": "init"
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
