<template>
  <div>
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-bell" style="margin-right: 6px;"></i>热门流-数据监控-{{data.label}}（{{titleDate}}）</h6>
    </el-row>
    <el-row type="flex">
      <el-col :span="8">
        <el-form :model="formInline">
          <el-form-item label="监控选项">
            <el-select style="width: 300px;" v-model="formInline.category" multiple placeholder="请选择">
              <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间选择">
            <el-date-picker v-model="formInline.date" align="right" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" placeholder="选择日期" :picker-options="pickerOptions">
            </el-date-picker>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col v-if="dataMonitor && dataMonitor.entire" :span="16">
        <el-table :data="dataMonitor.entire" style="width: 100%" max-height="220" border stripe size="mini">
          <el-table-column align="center" width="120" prop="name" label="维度" fixed>
            <template slot-scope="scope">
              <a class="link-btn" target="_blank" :href="`/hot/#/hotcenter/analydata?type=${data.value}`">{{scope.row.name}}</a>
            </template>
          </el-table-column>
          <el-table-column align="left" width="160" prop="day_num" sortable label="当日数据">
            <template slot-scope="scope">
              <span>{{_formatNum(scope.row.day_num)}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="day_rate" sortable label="天环比">
            <template slot-scope="scope">
              <span class="numBox">{{_formatNum(scope.row.yesterday_num)}}</span>
              <el-tag :type="entireRate(scope.row.day_rate)">{{ _parsePercent(scope.row.day_rate) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="week_rate" sortable label="周环比">
            <template slot-scope="scope">
              <span class="numBox">{{_formatNum(scope.row.week_num)}}</span>
              <el-tag :type="entireRate(scope.row.week_rate)">{{ _parsePercent(scope.row.week_rate) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="month_rate" sortable label="月环比">
            <template slot-scope="scope">
              <span class="numBox">{{_formatNum(scope.row.month_num)}}</span>
              <el-tag :type="entireRate(scope.row.month_rate)">{{ _parsePercent(scope.row.month_rate) }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <monitor-item v-if="dataMonitor && dataMonitor[val]" :key="key" v-for="(val, key) in formInline.category" :data="dataMonitor[val]" :name="itemMap.get(val)" :type="data" :item="val"></monitor-item>
  </div>
</template>

<script>
import MonitorItem from "./MonitorItem";
import { mapGetters } from "vuex";
import { formatNum, parseTime, parsePercent } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "monitorPage",
  props: ["data"],
  components: {
    MonitorItem
  },
  data() {
    return {
      titleDate: '',
      dataMonitor: null,
      itemMap: null,
      formInline: {
        category: [
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
          "source"
        ],
        date: ""
      },
      categoryList: [
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
    ...mapGetters(["usergroup"])
  },
  methods: {
    init() {
      this.formInline.date = parseTime(
        Date.now() - 3600 * 1000 * 48,
        "{y}{m}{d}"
      );
      this.updateTime();
      this.itemMap = new Map([
        ['recommend_source', '来源'],
        ['agent_version', '客户端版本'],
        ['system', '操作系统'],
        ['network_type', '网络环境'],
        ['hotwb_frequency_type', '分登录频次-热门'],
        ['all_frequency_type', '分登录频次-全站'],
        ['age', '年龄'],
        ['gender', '性别'],
        ['mid_type', '内容形式'],
        ['user_c_level', 'C类型'],
        ['user_v_level', 'V类型'],
        ['source', '领域'],
      ]);
      if (this.usergroup == "inner") {
        this.onSearch();
      } else {
        console.log("用户未登录");
      }
    },
    updateTime() {
      this.titleDate = this.formInline.date
    },
    onSearch() {
      const that = this;
      const items = this.formInline.category.join(",");
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
          type: this.data.value
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetDataMonitor", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          // Message({
          //   showClose: true,
          //   message: "success",
          //   type: "success",
          //   duration: 1000
          // });
          this.updateTime();
          this.dataMonitor = res.data;
        }
      });
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
    },
  },
  created() {
    this.init();
  },
  watch: {
    dataMonitor() {},
    data() {}
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
