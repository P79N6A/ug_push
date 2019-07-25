<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-printer hidden-xs-only" style="margin-right: 6px;"></i>物料日增规模</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form inline :model="formInline" size="mini">
        <el-form-item label="数据库">
          <el-select style="width: 110px;" v-model="formInline.database" placeholder="请选择数据库">
            <el-option label="原始数据" value="offline"></el-option>
            <el-option label="入库数据" value="online"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="维度">
          <el-select style="width: 110px;" v-model="formInline.type" placeholder="请选择查询维度">
            <el-option label="整体数据" value="entire"></el-option>
            <el-option label="分领域" value="source" v-if="itemsList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领域" v-if="formInline.type == 'source'">
          <el-select v-model="formInline.items" filterable placeholder="请选择领域，支持搜索" multiple>
            <el-option :key="key" v-for="(item, key) in itemsList" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker style="width: 290px;" :clearable="false" v-model="formInline.date" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions">
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" @click="onSearch"><span class="hidden-xs-only">查询</span></el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="content-box-wrap" type="flex" justify="space-between" v-if="chartData">
      <el-col :span="24" style="margin-right: 5px;">
        <item-chart :data="chartData"></item-chart>
      </el-col>
    </el-row>
    <!-- 物料库数据———来源分布 -->
    <el-row class="content-box-wrap">
      <div class="table-title left">物料库数据—来源分布</div>
      <el-date-picker class="left" style="width: 290px;" v-model="formOrigin.date" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="getOriginData()">
      </el-date-picker>
      <el-table :data="originDataList" style="width: 100%" border stripe size="mini">
          <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
          <el-table-column prop="source_name" label="物料来源">
              <template slot-scope="scope">
                <span>{{scope.row.source_name}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="materiel_source" sortable label="可分发物料量">
              <template slot-scope="scope">
                <span>{{_formatNum(scope.row.materiel_source)}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="expo_materiel_source" sortable label="曝光物料个数">
              <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.expo_materiel_source)}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="expo_materiel_source_cnt" sortable label="物料曝光量">
              <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.expo_materiel_source_cnt)}}</span>
              </template>
          </el-table-column>
      </el-table>
    </el-row>
    <!-- 物料库数据———领域分布 -->
    <el-row class="content-box-wrap">
      <div class="table-title left">物料库数据—领域分布</div>
      <el-date-picker class="left" style="width: 290px;" v-model="formField.date" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="getFieldData()">
      </el-date-picker>
      <el-table :data="fieldDataList" style="width: 100%" border stripe size="mini" max-height='500'>
          <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
          <el-table-column prop="tag_category_name" label="领域">
              <template slot-scope="scope">
                <span>{{category[scope.row.tag_category_name] || scope.row.tag_category_name}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="tag_category_materiels" sortable label="领域可分发物料量">
              <template slot-scope="scope">
                <span>{{_formatNum(scope.row.tag_category_materiels)}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="user_ability_statistic_materiels" sortable label="领域可分发博主物料量">
              <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.user_ability_statistic_materiels)}}</span>
              </template>
          </el-table-column>
      </el-table>
    </el-row>
    <!-- 物料库数据———类型分布 -->
    <el-row class="content-box-wrap">
      <div class="table-title left">物料库数据—类型分布</div>
      <el-date-picker class="left" style="width: 290px;" v-model="formType.date" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="getTypeData()">
      </el-date-picker>
      <el-table :data="typeDataList" style="width: 100%" border stripe size="mini" max-height='500'>
          <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
          <el-table-column prop="statistic_type_name" label="物料类型">
              <template slot-scope="scope">
                <span>{{scope.row.statistic_type_name}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="value" sortable label="可分发物料量">
              <template slot-scope="scope">
                <span>{{_formatNum(scope.row.value)}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="value_ratio" sortable label="可分发物料占比">
              <template slot-scope="scope">
                  <span>{{_parsePercent(scope.row.value_ratio)}}</span>
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
import ItemChart from "@/components/ItemChart";
import { mapGetters } from "vuex";
import { parseTime, formatNum, parsePercent } from "@/utils";
import { category } from "@/utils/config";
import { Message } from "element-ui";

export default {
  name: "materialPage",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      category,
      formOrigin: {
        date: []
      },
      formField: {
        date: []
      },
      formType: {
        date: []
      },
      originDataList: [],
      fieldDataList: [],
      typeDataList: [],
      formInline: {
        database: "offline",
        type: "entire",
        date: [],
        items: []
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
      chartData: null,
      itemsList: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        const start = parseTime(
          Date.now() - 3600 * 1000 * 24 * 30,
          "{y}{m}{d}"
        );
        const end = parseTime(Date.now() - 3600 * 1000 * 24 * 1, "{y}{m}{d}");
        this.formInline.date = [start, end];
        this.formOrigin.date = [start, end];
        this.formField.date = [start, end];
        this.formType.date = [start, end];
        this.getSourceList();
        this.onSearch();
        this.getOriginData();
        this.getFieldData();
        this.getTypeData();
      }
    },
    onSearch() {
      let param = {
        database: this.formInline.database,
        type: this.formInline.type,
        dt_start: this.formInline.date[0],
        dt_end: this.formInline.date[1],
        status: "total_num"
      };
      if (this.formInline.type == "source") {
        const items = this.formInline.items.join(",");
        if (!items) {
          Message({
            showClose: true,
            message: "请选择查询领域！",
            type: "error",
            duration: 1000
          });
          return;
        }
        param["items"] = items;
      }
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getMaterialLineData.html",
        param: param
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetBaseAnaly", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.chartData = this.setAnalyData(res.data, `趋势分析`);
        } else {
          Message({
            showClose: true,
            message: "物料日增规模趋势分析图数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "物料日增规模趋势分析图数据接口请求失败",
            type: "error",
            duration: 1000
          });
      });
    },
    getSourceList() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getMaterialWeiduName.html",
        param: {
          type: "material"
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetSourceList", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.itemsList = res.data;
        } else {
          Message({
            showClose: true,
            message: "领域列表获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "领域列表接口请求失败",
            type: "error",
            duration: 1000
          });
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
            name: chartData.yAxis.name, //y坐标轴名称
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
    getOriginData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getHotwbHotmblogMaterielsSource.html",
        param: {
          dt_start: this.formOrigin.date[0],
          dt_end: this.formOrigin.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.originDataList = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "物料库数据———来源分布数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "物料库数据———来源分布数据接口请求失败",
            type: "error",
            duration: 1000
          });
      });
    },
    getFieldData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getHotwbHotmblogMaterielsTag.html",
        param: {
          dt_start: this.formField.date[0],
          dt_end: this.formField.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.fieldDataList = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "物料库数据———领域分布数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "物料库数据———领域分布数据接口请求失败",
            type: "error",
            duration: 1000
          });
      });
    },
    getTypeData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getHotwbHotmblogMaterielsType.html",
        param: {
          dt_start: this.formType.date[0],
          dt_end: this.formType.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.typeDataList = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "物料库数据———类型分布数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "物料库数据———类型分布数据接口请求失败",
            type: "error",
            duration: 1000
          });
      });
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
      return  parsePercent(num);
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