<template>
  <el-row type="flex" justify="center" v-if="data" class="table-wrap">
    <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23">
      <div class="table-title left">【{{type.label}}】{{name}}</div>
      <el-table :data="data" style="width: 100%" max-height="400" border stripe>
        <el-table-column type="index" align="center" width="50" label="序号" fixed>
        </el-table-column>
        <el-table-column align="left" prop="name" :label="name">
          <template slot-scope="scope">
            <a class="link-btn" target="_blank" :href="`/hot/#/hotcenter/analydata?items=${item}&type=${type.value}`">{{scope.row.name}}</a>
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
</template>

<script>
import { formatNum, parsePercent } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "monitorItem",
  props: ["data", "name", "type", "item"],
  methods: {
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
  watch: {
    data() {}
  }
};
</script>

<style lang="scss" scoped>
    .table-wrap {
      margin-bottom: 20px;
    }
    .table-title {
      padding: 5px 10px;
      color: #409eff;
      border-bottom: 2px solid #409eff;
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
</style>