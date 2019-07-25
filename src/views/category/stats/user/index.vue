<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>分领域白名单生产与曝光统计</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="cateList && cateList.length > 0">
        <el-form inline :model="formInline" size="mini">
          <el-form-item label="日期">
            <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.start_time" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="选择开始时间">
            </el-date-picker>
            <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.end_time" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="选择结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="领域">
            <el-select v-model="curField" filterable placeholder="请选择领域" @change="setField()">
              <el-option label="所有领域" value=",所有领域" v-if="hasAllAuth"></el-option>
              <el-option v-for="(item, key) in cateList" :key="key" :label="item.name" :value="`${item.id},${item.name}`"></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch" size="mini">
            <span class="hidden-xs-only">查询</span>
          </el-button>
        </el-form>
      </el-col>
      <el-col :span="24" v-else>
        <el-alert :title="tips" type="warning" show-icon :closable="false">
        </el-alert>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap" v-if="cateList && cateList.length > 0">
      <el-col :span="24">
        <el-row class="chartWrap" v-if="chartOption">
          <el-radio-group v-model="item" size="mini" @change="handleChart()">
            <el-radio style="margin-left:0;margin-right: 10px;margin-bottom: 10px;" :key="key" v-for="(val, key) in itemMap" :label="key" border>{{val}}</el-radio>
          </el-radio-group>
          <item-chart :data="chartOption"></item-chart>
        </el-row>
        <el-row class="table-wrap">
          <div class="table-title left">数据统计</div>
            <el-button v-if="reportData && reportData.length > 0" class="right" type="primary" plain size="mini" :loading="downloadLoading" @click="handleDownload">
              <i class="el-icon-download"></i> <span class="hidden-xs-only">导出</span></el-button>
          <el-table :data="reportData" :default-sort="{prop: 'data_date', order: 'descending'}" style="width: 100%" max-height="500" border stripe size="mini">
            <el-table-column width="100" prop="data_date" label="日期" fixed sortable>
            </el-table-column>
            <el-table-column width="70" prop="exposure_ranking" label="曝光量分领域排名">
            </el-table-column>
            <el-table-column label="领域">
              <template slot-scope="scope">{{curFieldName}}</template>
            </el-table-column>
            <el-table-column prop="user_sum" label="领域用户总量">
              <template slot-scope="scope">{{_formatNum(scope.row.user_sum)}}</template>
            </el-table-column>
            <el-table-column prop="f_c_sum" label="F01&C12总量">
              <template slot-scope="scope">{{_formatNum(scope.row.f_c_sum)}}</template>
            </el-table-column>
            <el-table-column prop="white_sum" label="白名单总量">
              <template slot-scope="scope">{{_formatNum(scope.row.white_sum)}}</template>
            </el-table-column>
            <el-table-column prop="new_white" label="新增白名单量">
              <template slot-scope="scope">{{_formatNum(scope.row.new_white)}}</template>
            </el-table-column>
            <el-table-column prop="white_send_weibo" label="白名单发博用户量">
              <template slot-scope="scope">{{_formatNum(scope.row.white_send_weibo)}}</template>
            </el-table-column>
            <el-table-column prop="original_sum" label="原创微博总量">
              <template slot-scope="scope">{{_formatNum(scope.row.original_sum)}}</template>
            </el-table-column>
            <el-table-column prop="forward_sum" label="转发微博总量">
              <template slot-scope="scope">{{_formatNum(scope.row.forward_sum)}}</template>
            </el-table-column>
            <el-table-column prop="original_tag_sum" label="原创微博标签覆盖量">
              <template slot-scope="scope">{{_formatNum(scope.row.original_tag_sum)}}</template>
            </el-table-column>
            <el-table-column prop="interest_sum" label="兴趣用户总量" align="center">
              <template slot-scope="scope">{{scope.row.field_id === 10000 && '—' || _formatNum(scope.row.interest_sum)}}</template>
            </el-table-column>
            <!-- <el-table-column prop="consume_material_sum" label="消费物料用户总量">
                <template slot-scope="scope">{{_formatNum(scope.row.consume_material_sum)}}</template>
              </el-table-column> -->
            <el-table-column width="80" prop="storage_material_sum" label="当天发布当天入库物料总量">
              <template slot-scope="scope">{{_formatNum(scope.row.storage_material_sum)}}</template>
            </el-table-column>
            <el-table-column width="80" prop="exposure_material_sum" label="当天发布当天入库当天曝光的物料量">
              <template slot-scope="scope">{{_formatNum(scope.row.exposure_material_sum)}}</template>
            </el-table-column>
            <el-table-column width="80" prop="exposure_sum" label="当天发布当天入库当天曝光量">
              <template slot-scope="scope">{{_formatNum(scope.row.exposure_sum)}}</template>
            </el-table-column>
            <el-table-column prop="exposure_blogger" label="当天曝光博主人数">
              <template slot-scope="scope">{{_formatNum(scope.row.exposure_blogger)}}</template>
            </el-table-column>
            <el-table-column prop="exposure_material_all_sum" label="当天曝光物料量">
              <template slot-scope="scope">{{_formatNum(scope.row.exposure_material_all_sum)}}</template>
            </el-table-column>
            <el-table-column prop="exposure_all_sum" label="当天曝光量">
              <template slot-scope="scope">{{_formatNum(scope.row.exposure_all_sum)}}</template>
            </el-table-column>
            <el-table-column prop="send_weibo_rate" label="发博量较前1天增长率" min-width="90">
              <template slot-scope="scope">
                <el-tag>{{isNaN(scope.row.send_weibo_rate) && '-' || `${scope.row.send_weibo_rate}%`}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="growth_rate" label="曝光量较前1天增长率" min-width="90">
              <template slot-scope="scope">
                <el-tag>{{isNaN(scope.row.growth_rate) && '-' || `${scope.row.growth_rate}%`}}</el-tag>
              </template>
            </el-table-column>
          </el-table>
          <p class="table-info">
            数据口径说明：<br />
            原创微博标签覆盖量：白名单博主发布的原创微博，打上一级标签的覆盖量;<br />
            兴趣用户总量:DAU（客户端主版本）中的兴趣用户量（权重>60）;<br />
            当天曝光物料量：白名单博主近7天发博（原创&转发）在当天曝光的微博量（站内整体热门）;<br />
            当天曝光量：白名单博主近7天发博（原创&转发）在当天的曝光量（站内整体热门）。
          </p>
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
import { formatNum, parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "categoryList",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      apiConf: {
        //API
        getUserRole: "/role/getUserRole",
        getDataReport: "/field/getDataReport"
      },
      formInline: {
        field_id: "",
        start_time: "",
        end_time: ""
      },
      curField: ",所有领域",
      curFieldName: "所有领域",
      hasAllAuth: false,
      reportData: [],
      cateList: null,
      tips: "loading...", //暂无有权限的领域
      downloadLoading: false,
      itemMap: {
        white_sum: "白名单总量",
        new_white: "新增白名单量",
        white_send_weibo: "白名单发博用户量",
        original_sum: "原创微博总量",
        forward_sum: "转发微博总量",
        original_tag_sum: "原创微博标签覆盖量",
        storage_material_sum: "当天发布当天入库物料总量",
        exposure_material_sum: "当天发布当天入库当天曝光的物料量",
        exposure_sum: "当天发布当天入库当天曝光量",
        exposure_blogger: "当天曝光博主人数",
        exposure_material_all_sum: "当天曝光物料量",
        exposure_all_sum: "当天曝光量"
      },
      item: "white_sum",
      chartMap: null,
      chartOption: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getUserRole();
      }
    },
    getUserRole() {
      const data = {
        url: this.apiConf.getUserRole,
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            this.cateList = res.result.field || [];
            if (this.cateList.length > 0) {
              if (res.result.permission.indexOf(13) > -1) {
                this.hasAllAuth = true;
              } else {
                this.formInline.field_id = this.cateList[0].id;
                this.curField = `${this.cateList[0].id},${
                  this.cateList[0].name
                }`;
              }
              this.onSearch();
            } else {
              this.tips = "暂无有权限的领域";
            }
          } else {
            this.tips = "暂无有权限的领域";
          }
        },
        err => {
          this.tips = "接口异常";
        }
      );
    },
    onSearch() {
      const data = {
        url: this.apiConf.getDataReport,
        params: {
          ...this.formInline,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.reportData = res.result || [];
          this.curFieldName = this.curField.split(",")[1];
          this.chartMap = res.data;
          this.handleChart();
        }
      });
    },
    _formatNum(num) {
      return formatNum(num);
    },
    setField() {
      this.formInline.field_id = this.curField.split(",")[0];
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = `分领域白名单生产与曝光统计_${parseTime(Date.now(),"{y}{m}{d}")}`;
        const tHeader = [
          "日期",
          "曝光量分领域排名",
          "领域",
          "领域用户总量",
          "F01&C12总量",
          "白名单总量",
          "新增白名单量",
          "白名单发博用户量",
          "原创微博总量",
          "转发微博总量",
          "原创微博标签覆盖量",
          "兴趣用户总量",
          "当天发布当天入库物料总量",
          "当天发布当天入库当天曝光的物料量",
          "当天发布当天入库当天曝光量",
          "当天曝光博主人数",
          "当天曝光物料量",
          "当天曝光量",
          "发博量较前1天增长率",
          "曝光量较前1天增长率"
        ];
        const filterVal = [
          "data_date",
          "exposure_ranking",
          "field_name",
          "user_sum",
          "f_c_sum",
          "white_sum",
          "new_white",
          "white_send_weibo",
          "original_sum",
          "forward_sum",
          "original_tag_sum",
          "interest_sum",
          "storage_material_sum",
          "exposure_material_sum",
          "exposure_sum",
          "exposure_blogger",
          "exposure_material_all_sum",
          "exposure_all_sum",
          "send_weibo_rate",
          "growth_rate"
        ];
        const list = this.reportData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, i) =>
        filterVal.map(j => {
          if (j === "index") {
            return i + 1;
          } else if (j === "field_name") {
            return this.curFieldName;
          } else if (j === "send_weibo_rate" || j === "growth_rate") {
            return isNaN(v[j]) && '-' || `${v[j]}%`;
          } else {
            return v[j];
          }
        })
      );
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
    handleChart() {
      this.chartOption = null;
      this.chartMap && (this.chartOption = this.setAnalyData(this.chartMap[this.item], this.itemMap[this.item]));
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
    border-bottom: 2px solid #409eff;
    margin-bottom: 10px;
  }
  .chartWrap {
    margin-bottom: 20px;
  }
}
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
.table-info {
  font-size: 14px;
  color: #e6a23c;
  padding-top: 10px;
  line-height: 1.5;
}
</style>