<template>
    <div>
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">
                <i class="el-icon-phone-outline" style="margin-right: 6px;"></i>用户兴趣标签覆盖率</h6>
        </el-row>
        <el-row type="flex">
            <el-form inline :model="formInline">
                <el-form-item>
                    <el-date-picker size="small" v-model="formInline.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" @change="getDropList()">
                    </el-date-picker>
                    <el-button size="small" type="primary" icon="el-icon-search" @click="onSearch"><span class="hidden-xs-only">查询</span></el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row v-if="rateData">
            <el-table :data="rateData" style="width: 100%" stripe>
                <el-table-column align="center" width="100" prop="dt" label="日期" fixed>
                    <template slot-scope="scope">
                        <span>{{_parseTime(scope.row.dt)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="70" prop="day" label="星期">
                </el-table-column>
                <el-table-column prop="all" sortable label="总体" min-width="80">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.all)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="long" sortable label="长期兴趣" min-width="100">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.long)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" sortable label="短期兴趣" min-width="100">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.short)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="long_level1" sortable label="长期兴趣一级标签" min-width="160">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.long_level1)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="long_level2" sortable label="长期兴趣 二级标签" min-width="160">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.long_level2)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="long_level3" sortable label="长期兴趣 三级标签" min-width="160">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.long_level3)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" sortable label="短期兴趣 一级标签" min-width="160">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.short_level1)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" sortable label="短期兴趣 二级标签" min-width="160">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.short_level2)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="" sortable label="短期兴趣 三级标签" min-width="160">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.short_level3)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
import ItemHeader from "@/components/ItemHeader";
import Auth from "@/components/Tips/Auth";
import { Message } from "element-ui";
import { mapGetters } from "vuex";
import { formatNum, parsePercent, parseTime } from "@/utils";

export default {
  name: "querymaterial",
  components: {
    ItemHeader,
    Auth,
  },
  data() {
    return {
      formInline: {
        date: []
      },
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
      rateData: null,
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        const start = parseTime(Date.now() - 3600 * 1000 * 24 * 8, "{y}{m}{d}");
        const end = parseTime(Date.now() - 3600 * 1000 * 24 * 2, "{y}{m}{d}");
        this.formInline.date = [start, end];
        this.onSearch();
      }
    },
    onSearch() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getUserInterestRateDayTableData.html",
        param: {
          dt_start: this.formInline.date[0],
          dt_end: this.formInline.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetUserRate", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.rateData = res.data;
        } else {
          const tips = res.msg || "查询失败";
          Message({
            showClose: true,
            message: tips,
            type: "error",
            duration: 3000
          });
        }
      });
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
        return parsePercent(num)
    },
    _parseTime(time) {
      const year = time.substr(0, 4);
      const month = time.substr(4, 2);
      const date = time.substr(6, 2);
      return `${year}-${month}-${date}`;
    }
  },
  created() {
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    },
    email() {}
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
