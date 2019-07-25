<template>
  <el-container direction="vertical">
    <item-header></item-header>
    <el-main v-if="pageAuth === 1">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="整体数据">
          <el-row class="pane-title-wrap">
            <h6 class="pane-title">
              <i class="el-icon-bell" style="margin-right: 6px;"></i>热门流-整体数据分析（{{curEntireTime}}）</h6>
          </el-row>
          <el-row type="flex">
            <el-form>
              <el-form-item>
                <el-date-picker v-model="entireDate" align="right" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" placeholder="选择日期" :picker-options="pickerOptions">
                </el-date-picker>
                <el-button type="primary" @click="searchEntire()">查询</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <el-row v-if="entireData">
            <el-table :data="entireData" style="width: 100%" border stripe>
              <el-table-column align="center" width="140" prop="name" label="KPI指标" fixed>
                <template slot-scope="scope">
                  <a class="link-btn" target="_blank" :href="`/hot/#/hotcenter/analydata`">{{scope.row.name}}</a>
                </template>
              </el-table-column>
              <el-table-column align="left" width="160" prop="day_num" sortable label="当日数据">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.day_num)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="120" prop="day_rate" sortable label="天环比">
                <template slot-scope="scope">
                  <span class="numBox">{{_formatNum(scope.row.yesterday_num)}}</span>
                  <el-tag :type="entireRate(scope.row.day_rate)">{{ _parsePercent(scope.row.day_rate) }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="120" prop="week_rate" sortable label="周环比">
                <template slot-scope="scope">
                  <span class="numBox">{{_formatNum(scope.row.week_num)}}</span>
                  <el-tag :type="entireRate(scope.row.week_rate)">{{ _parsePercent(scope.row.week_rate) }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column align="left" min-width="120" prop="month_rate" sortable label="月环比">
                <template slot-scope="scope">
                  <span class="numBox">{{_formatNum(scope.row.month_num)}}</span>
                  <el-tag :type="entireRate(scope.row.month_rate)">{{ _parsePercent(scope.row.month_rate) }}</el-tag>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="KPI指标分析">
          <el-row class="pane-title-wrap">
            <h6 class="pane-title">
              <i class="el-icon-bell" style="margin-right: 6px;"></i>热门流-KPI指标分析（{{curTime}}）</h6>
          </el-row>
          <el-row type="flex">
            <el-form :model="formInline" inline>
              <el-form-item label="指标">
                <el-select style="width: 150px;" v-model="formInline.type" placeholder="请选择">
                  <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分析项">
                <el-select style="width: 590px;" v-model="formInline.items" multiple placeholder="请选择">
                  <el-option v-for="item in itemsList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="时间">
                <el-date-picker v-model="formInline.date" align="right" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" placeholder="选择日期" :picker-options="pickerOptions">
                </el-date-picker>
                <el-button type="primary" @click="onSearch">查询</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <monitor-item v-if="dataMonitor && dataMonitor[val]" :key="key" v-for="(val, key) in formInline.items" :data="dataMonitor[val]" :name="itemMap.get(val)" :type="typeList[typeMap.get(curType)]" :item="val"></monitor-item>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
      <auth></auth>
    </el-main>
  </el-container>
</template>

<script>
import ItemHeader from "@/components/ItemHeader";
import Auth from "@/components/Tips/Auth";
import MonitorItem from "./components/MonitorItem";
import { mapGetters } from "vuex";
import { formatNum, parseTime, parsePercent } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "datamonitor",
  components: {
    ItemHeader,
    Auth,
    MonitorItem
  },
  data() {
    return {
      tabPosition: "left",
      dataMonitor: null,
      entireData: null,
      itemMap: null,
      typeMap: null,
      curType: "thd_click",
      curTime: "",
      entireDate: "",
      formInline: {
        type: "thd_click",
        items: [
          "recommend_source",
          "agent_version",
          "system",
          "network_type",
          "hotwb_frequency_type",
          "all_frequency_type",
          "age",
          "gender",
          "mid_type",
          "user_c_level",
          "user_v_level",
          "source",
          "wm",
          "ispageup",
          "luicode",
          "refresh"
        ],
        date: ""
      },
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
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 > Date.now();
        },
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.formInline.date = parseTime(
          Date.now() - 3600 * 1000 * 48,
          "{y}{m}{d}"
        );
        this.entireDate = this.formInline.date;
        this.curTime = this.formInline.date;
        this.curEntireTime = this.formInline.date;
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
        this.typeMap = new Map([
          ["thd_click", 0],
          ["thd_act", 1],
          ["average_fresh_times", 2],
          ["pv", 3],
          ["uv", 4],
          ["exposure", 5],
          ["two_save_rate", 6],
          ["two_feed_save_rate", 7]
        ]);
        this.searchEntire();
        this.onSearch();
      }
    },
    searchEntire() {
      const that = this;
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getKpiMonitorData.html",
        param: {
          dt: this.entireDate
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetDataMonitor", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
          that.entireData = (res.data && res.data.entire) || [];
          this.curEntireTime = this.entireDate;
        }
      });
    },
    onSearch() {
      const that = this;
      const items = this.formInline.items.join(",");
      if (!items) {
        Message({
          showClose: true,
          message: "请选择监控项！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getKpiMonitorData.html",
        param: {
          dt: this.formInline.date,
          items: items,
          type: this.formInline.type
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetDataMonitor", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
          that.dataMonitor = res.data;
          that.updateData();
        }
      });
    },
    updateData() {
      this.curType = this.formInline.type;
      this.curTime = this.formInline.date;
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
      return num ? parsePercent(num) : "0%";
    },
    entireRate(num, d) {
      if (num < -0.1) {
        return "danger";
      } else if (num > 0.1) {
        return "success";
      } else {
        return "info";
      }
    }
  },
  created() {
    if (window.isPhone) {
      this.tabPosition = "top";
    }
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    },
    dataMonitor() {}
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
    padding-bottom: 40px;
    color: #333;
    line-height: 100%;
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
  }
}
</style>
