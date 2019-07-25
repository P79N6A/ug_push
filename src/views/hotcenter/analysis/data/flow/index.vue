<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">
                <i class="el-icon-date hidden-xs-only" style="margin-right: 6px;"></i>流量分析</h6>
        </el-row>
        <!-- 整体流量分析列表 -->
        <el-row class="content-box-wrap">
            <div class="table-title left">热门微博整体流量分析（{{curEntireTime}}）</div>
            <el-date-picker :clearable="false" :editable="false" class="left" v-model="formInline.dt" align="right" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" placeholder="选择日期" size="mini" :picker-options="pickerOptions" @change="onSearch()">
            </el-date-picker>
            <el-radio-group v-model="formInline.status" style="display:block;" @change="onSearch()" size="mini">
              <el-radio style="margin-bottom: 10px;margin-right: 10px;margin-left: 20px;" label="pv" border>pv</el-radio>
              <el-radio style="margin-bottom: 10px;margin-right: 10px;margin-left: 0;" label="uv" border>uv</el-radio>
            </el-radio-group>
            <el-table :data="datalist" style="width: 100%" border stripe size="mini">
                <el-table-column align="center" width="140" prop="name" label="from值" fixed>
                    <template slot-scope="scope">
                        <a class="link-btn" target="_blank" :href="`/hot/#/hotcenter/analysis/data/flow/detail?status=${formInline.status}`">{{scope.row.name}}</a>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="hotwb" sortable label="热门流">
                    <template slot-scope="scope">
                        <span>{{scope.row.hotwb && _formatNum(scope.row.hotwb) || '暂无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="top_rank" sortable label="榜单流">
                    <template slot-scope="scope">
                        <span>{{scope.row.top_rank && _formatNum(scope.row.top_rank) || '暂无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="channel" sortable label="频道流">
                    <template slot-scope="scope">
                        <span>{{scope.row.channel && _formatNum(scope.row.channel) || '暂无'}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="visit" sortable label="访客流">
                    <template slot-scope="scope">
                        <span>{{scope.row.visit && _formatNum(scope.row.visit) || '暂无'}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <!-- 流量来源列表 -->
        <el-row class="content-box-wrap">
            <div class="table-title left">热门流流量来源列表（{{curOriginTime}}）</div>
            <el-date-picker :clearable="false" :editable="false" class="left" v-model="originList.dt" align="right" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" placeholder="选择日期" size="mini" :picker-options="pickerOptions" @change="onSearchOrigin()">
            </el-date-picker>
            <el-radio-group v-model="originList.os" style="display:block;" @change="onSearchOrigin()" size="mini">
              <el-radio style="margin-bottom: 10px;margin-right: 10px;margin-left: 20px;" label="Android" border>Android</el-radio>
              <el-radio style="margin-bottom: 10px;margin-right: 10px;margin-left: 0;" label="IOS" border>IOS</el-radio>
              <el-radio style="margin-bottom: 10px;margin-right: 10px;margin-left: 0;" label="other" border>other</el-radio>
            </el-radio-group>
            <el-table :data="originDataList" :default-sort="{prop: 'pv', order: 'descending'}" style="width: 100%" border stripe size="mini">
                <el-table-column type="index" align="center" width="50" label="序号" fixed></el-table-column>
                <el-table-column align="center" width="120" prop="luicode" label="luicode" fixed>
                    <template slot-scope="scope">
                      <span>{{scope.row.luicode}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="120" prop="name" label="来源" fixed>
                    <template slot-scope="scope">
                      <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" width="120" prop="pv" sortable label="PV">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.pv)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="yesterday_pv" sortable label="PV天环比">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.yesterday_pv)}}</span>
                        <el-tag :type="checkRate(scope.row.pv_daily_ring_ratio)">{{ _parsePercent(scope.row.pv_daily_ring_ratio) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="left" width="120" prop="uv" sortable label="UV">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.uv)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="yesterday_uv" sortable label="UV天环比">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.yesterday_uv)}}</span>
                        <el-tag :type="checkRate(scope.row.uv_daily_ring_ratio)">{{ _parsePercent(scope.row.uv_daily_ring_ratio) }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="left" width="120" prop="exposure" sortable label="曝光">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.exposure)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="left" prop="yesterday_exposure" sortable label="曝光天环比">
                    <template slot-scope="scope">
                        <span>{{_formatNum(scope.row.yesterday_exposure)}}</span>
                        <el-tag :type="checkRate(scope.row.exposure_daily_ring_ratio)">{{ _parsePercent(scope.row.exposure_daily_ring_ratio) }}</el-tag>
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
  name: "datamonitor",
  components: {
    Auth
  },
  data() {
    return {
      datalist: [],
      originDataList: [],
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
      },
      formInline: {
        status: "pv",
        dt: ""
      },
      originList: {
        os: 'Android',
        dt: ''
      },
      curEntireTime: '',
      curOriginTime: ''
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.formInline.dt = parseTime(
          Date.now() - 3600 * 1000 * 48,
          "{y}{m}{d}"
        );
        this.originList.dt = parseTime(
          Date.now() - 3600 * 1000 * 48,
          "{y}{m}{d}"
        );
        this.curEntireTime = this.formInline.dt;
        this.curOriginTime = this.originList.dt;
        this.onSearch();
        this.onSearchOrigin();
      }
    },
    onSearch() {
      const that = this;
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getPvuvFromVal.html",
        param: this.formInline
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          that.datalist = res.data || [];
          this.curEntireTime = this.formInline.dt;
        } else {
          Message({
            showClose: true,
            message: "热门微博整体流量分析数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, error => {
        Message({
            showClose: true,
            message: "热门微博整体流量分析数据接口请求失败",
            type: "error",
            duration: 1000
          });
      });
    },
    onSearchOrigin() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getEntranceFlowStat.html",
        param: this.originList
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
            this.originDataList = res.data || [];
            this.curOriginTime = this.originList.dt;
          } else {
            Message({
              showClose: true,
              message: "热门流流量来源数据获取失败",
              type: "error",
              duration: 1000
            });
          }
        }, error => {
          Message({
              showClose: true,
              message: "热门流流量来源数据接口请求失败",
              type: "error",
              duration: 1000
            });
        });
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
      return parsePercent(num);
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
