<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">
                <i class="el-icon-date hidden-xs-only" style="margin-right: 6px;"></i>刷新机制</h6>
        </el-row>
        <!-- 自动刷新uvpv及占比数据 -->
        <el-row v-if="uvpvData" class="content-box-wrap">
            <div class="table-title left">自动刷新uvpv及占比数据</div>
            <el-date-picker class="left" :clearable="false" style="width: 290px;" v-model="formUvPv.date" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" size="mini" @change="getUvPvData()">
            </el-date-picker>
            <!-- <el-button class="right" type="primary" size="mini" :loading="downloadEntireLoading" @click="handleDownloadEntire">导出</el-button> -->
            <el-table :data="uvpvData" style="width: 100%;" border stripe size="mini">
                <el-table-column prop="uv" label="UV" fixed>
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.uv)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="uv_ratio" label="UV占比">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.uv_ratio)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pv" label="PV">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.pv)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pv_ratio" label="PV占比">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.pv_ratio)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 自动刷新间隔区间数据 -->
        <el-row v-if="sectionData" class="content-box-wrap">
            <div class="table-title left">自动刷新间隔区间数据</div>
            <el-date-picker class="left" :clearable="false" style="width: 290px;" v-model="formSection.date" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" size="mini" @change="getSectionData()">
            </el-date-picker>
            <!-- <el-button class="right" type="primary" size="mini" :loading="downloadHotLoading" @click="handleDownloadHot">导出</el-button> -->
            <el-table :data="sectionData" style="width: 100%;" border stripe size="mini">
                <el-table-column type="index" width="60" align="center" label="序号" fixed>
                </el-table-column>
                <el-table-column prop="section" label="区间" fixed>
                    <template slot-scope="scope">
                        <span>{{scope.row.section}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="num" label="数量">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.num)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 自动刷新流量来源数据 -->
        <el-row v-if="luicodeData" class="content-box-wrap">
            <div class="table-title left">自动刷新流量来源数据</div>
            <el-date-picker class="left" :clearable="false" style="width: 290px;" v-model="formLuicode.date" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" size="mini" @change="getLuicodeData()">
            </el-date-picker>
            <!-- <el-button class="right" type="primary" size="mini" :loading="downloadEntireLoading" @click="handleDownloadCallback">导出</el-button> -->
            <el-table :data="luicodeData" style="width: 100%;" max-height='500' border stripe size="mini" :default-sort="{prop: 'num', order: 'descending'}">
                <el-table-column type="index" width="60" align="center" label="序号" fixed>
                </el-table-column>
                <el-table-column prop="luicode" label="来源">
                    <template slot-scope="scope">
                        <span>{{scope.row.luicode}}</span>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="num" label="数量">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.num)}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 中低频用户复返刷新数据 -->
        <el-row v-if="returnData" class="content-box-wrap">
            <div class="table-title left">中低频用户复返刷新数据</div>
            <el-date-picker class="left" style="width: 290px;" v-model="formReturn.date" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" size="mini" @change="getReturnData()">
            </el-date-picker>
            <!-- <el-button class="right" type="primary" size="mini" :loading="downloadMaterialSourcesLoading" @click="handleDownloadMaterialSources">导出</el-button> -->
            <el-table :data="returnData" style="width: 100%;" border stripe size="mini">
                <el-table-column prop="avg_expo_time_diff" label="平均复返刷新时间">
                    <template slot-scope="scope">
                        <span>{{scope.row.avg_expo_time_diff}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="uv" label="UV">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.uv)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="uv_ratio" label="UV占比">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.uv_ratio)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pv" label="PV">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.pv)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="pv_ratio" label="PV占比">
                    <template slot-scope="scope">
                        <span>{{_parsePercent(scope.row.pv_ratio)}}</span>
                    </template>
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
  name: "dataFresh",
  components: {
    Auth
  },
  data() {
    return {
      formUvPv: {
        date: []
      },
      formSection: {
        date: []
      },
      formLuicode: {
        date: []
      },
      formReturn: {
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
      uvpvData: [], //自动刷新uvpv及占比数据
      sectionData: [], //自动刷新间隔区间数据
      luicodeData: [], //自动刷新流量来源数据
      returnData: [] //中低频用户复返刷新数据
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        const start = parseTime(Date.now() - 3600 * 1000 * 24 * 8, "{y}{m}{d}");
        const end = parseTime(Date.now() - 3600 * 1000 * 24 * 2, "{y}{m}{d}");
        this.formUvPv.date = [start, end];
        this.formSection.date = [start, end];
        this.formLuicode.date = [start, end];
        this.formReturn.date = [start, end];
        this.getUvPvData(); // 获取uvpv数据
        this.getSectionData(); // 获取区间-数量数据
        this.getLuicodeData(); // 获取流量数据
        this.getReturnData(); // 获取重返刷新数据
      }
    },
    getUvPvData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getAutoRefreshUvpv.html",
        param: {
          dt_start: this.formUvPv.date[0],
          dt_end: this.formUvPv.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          let obj = {}
          if ( res.data ) {
              res.data.forEach( val => {
                obj = Object.assign(obj, val)
              });
              this.uvpvData = [obj];
          } else {
              this.uvpvData = []
          }
        } else {
          Message({
            showClose: true,
            message: "自动刷新uvpv及占比数据获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "自动刷新uvpv及占比数据接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    getLuicodeData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getAutoRefreshLuicode.html",
        param: {
          dt_start: this.formLuicode.date[0],
          dt_end: this.formLuicode.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          this.luicodeData = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "自动刷新流量来源数据获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "自动刷新流量来源数据接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    // 这个数据做了处理，有待商议
    getSectionData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getAutoRefreshDiff.html",
        param: {
          dt_start: this.formSection.date[0],
          dt_end: this.formSection.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
            if ( res.data ) {
                this.sectionData = res.data.map( val => {
                    return {
                        section: Object.keys(val)[0],
                        num: Object.values(val)[0]
                    }
                });
            } else {
                this.sectionData = [];
            }
        } else {
          Message({
            showClose: true,
            message: "自动刷新间隔区间数据获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "自动刷新间隔区间数据接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    getReturnData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getAutoRefreshRepeate.html",
        param: {
          dt_start: this.formReturn.date[0],
          dt_end: this.formReturn.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.code == 200) {
          let obj = {}
          if ( res.data ) {
              res.data.forEach( val => {
                obj = Object.assign(obj, val)
              });
              this.returnData = [obj];
          } else {
              this.returnData = []
          }
        } else {
          Message({
            showClose: true,
            message: "中低频用户复返刷新数据数据获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "中低频用户复返刷新数据数据接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
      return parsePercent(num);
    },
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
    // background-color: #f0f2f5;
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
    .table-title {
      padding: 5px 10px;
      color: #409eff;
      border-left: 2px solid #409eff;
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>
