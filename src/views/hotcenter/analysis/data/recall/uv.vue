<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-date hidden-xs-only" style="margin-right: 6px;"></i>UV的设备分布（{{curDate}}）</h6>
    </el-row>
    <el-row type="flex" class="search-form-wrap">
      <el-form size="mini">
        <el-form-item>
          <el-date-picker v-model="dt" align="right" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" @click="onSearch()"><span class="hidden-xs-only">查询</span></el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="content-box-wrap">
      <el-table :data="data" style="width: 100%" border stripe :default-sort="{prop: 'num', order: 'descending'}" size="mini">
        <el-table-column type="index" width="60" label="序号" fixed>
        </el-table-column>
        <el-table-column prop="name" label="品牌" fixed>
        </el-table-column>
        <el-table-column prop="num" label="UV" sortable>
          <template slot-scope="scope">{{_formatNum(scope.row.num)}}</template>
        </el-table-column>
        <el-table-column prop="num_ratio" label="UV占比" sortable>
          <template slot-scope="scope"><el-tag>{{_parsePercent(scope.row.num_ratio)}}</el-tag></template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { formatNum, parseTime, parsePercent } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "datamonitor",
  components: {
    Auth
  },
  data() {
    return {
      data: [],
      dt: "",
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
        this.dt = parseTime(Date.now() - 3600 * 1000 * 48, "{y}{m}{d}");
        this.curDate = this.dt;
        this.onSearch();
      }
    },
    onSearch() {
      const that = this;
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getDevNumByUv.html",
        param: {
          dt: this.dt
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            Message({
              showClose: true,
              message: "success",
              type: "success",
              duration: 1000
            });
            that.data = res.data || [];
            this.curDate = this.dt;
          } else {
            Message({
              showClose: true,
              message: "数据获取失败",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "数据获取接口请求失败",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num, dec) {
      return num ? parsePercent(num, dec) : "0%";
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
  }
}
</style>
