<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-printer hidden-xs-only" style="margin-right: 6px;"></i>曝光常规检测</h6>
    </el-row>
    <el-row class="content-box-wrap" v-if="chartData">
      <el-col>
        <el-row style="margin-bottom: 5px;">
          <el-radio-group class="left" v-model="formInline.status" @change="onSearch" size="mini">
            <el-radio label="expose_author_num" border>曝光作者数量</el-radio>
            <el-radio label="expose_mid_num" border>曝光微博数量</el-radio>
          </el-radio-group>
          <el-date-picker class="left" style="width: 290px; margin-left: 20px;" v-model="formInlineDate.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="onSearch()">
          </el-date-picker>
        </el-row>
        <el-row>
          <el-col :span="24" style="margin-right: 5px;">
            <item-chart :data="chartData"></item-chart>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 曝光博文领域分布 -->
    <el-row class="content-box-wrap">
      <div class="table-title left">曝光博文领域分布</div>
      <el-date-picker class="left" style="width: 290px;" v-model="formField.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="getFieldData()">
      </el-date-picker>
      <el-table :data="fieldDataList" style="width: 100%" border stripe max-height='500' size="mini">
          <el-table-column type='index' label="序号" align='center' width='50'>
          </el-table-column>
          <el-table-column prop="name" label="领域">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="ex_num" sortable label="曝光总数">
              <template slot-scope="scope">
                <span>{{_formatNum(scope.row.ex_num)}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="mid_num" sortable label="曝光微博个数">
              <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.mid_num)}}</span>
              </template>
          </el-table-column>
      </el-table>
    </el-row>
    <!-- 曝光博文曝光量区间分布 -->
    <el-row class="content-box-wrap">
      <div class="table-title left">曝光博文曝光量区间分布</div>
      <el-date-picker class="left" style="width: 290px;" v-model="formSection.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="getSectionData()">
      </el-date-picker>
      <el-table :data="sectionDataList" :default-sort="{prop: 'flag', order: 'descending'}" style="width: 100%" border stripe size="mini">
          <el-table-column type="index" width="50" label="序号" align="center" fixed></el-table-column>
          <el-table-column prop="flag" label="曝光量区间" sortable>
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="ex_num" sortable label="曝光总数">
              <template slot-scope="scope">
                <span>{{_formatNum(scope.row.ex_num)}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="mid_num" sortable label="曝光微博个数">
              <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.mid_num)}}</span>
              </template>
          </el-table-column>
      </el-table>
    </el-row>
    <!-- 曝光博文内容形式分布 -->
    <el-row class="content-box-wrap">
      <div class="table-title left">曝光博文内容形式分布</div>
      <el-date-picker class="left" style="width: 290px;" v-model="formType.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="getTypeData()">
      </el-date-picker>
      <el-table :data="typeDataList" style="width: 100%" border stripe size="mini">
          <el-table-column prop="name" label="内容形式">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
          </el-table-column>
          <el-table-column  prop="ex_num" sortable label="曝光总数">
              <template slot-scope="scope">
                <span>{{_formatNum(scope.row.ex_num)}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="mid_num" sortable label="曝光微博个数">
              <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.mid_num)}}</span>
              </template>
          </el-table-column>
      </el-table>
    </el-row>
    <!-- 各个标签的博主数量统计 -->
    <el-row class="content-box-wrap">
      <div class="table-title left">各个标签的博主数量统计</div>
      <el-date-picker class="left" style="width: 290px;" v-model="formAuthorAreaCount.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="getAuthorAreaCountData()">
      </el-date-picker>
      <el-table :data="authorAreaCount" style="width: 100%" border stripe max-height='500' size="mini">
          <el-table-column type='index' label="序号" align='center' width='80'>
          </el-table-column>
          <el-table-column prop="tag_category_name" label="标签">
              <template slot-scope="scope">
                <span>{{scope.row.tag_category_name}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="count" sortable label="博主个数">
              <template slot-scope="scope">
                <span>{{_formatNum(scope.row.count)}}</span>
              </template>
          </el-table-column>
      </el-table>
    </el-row>
    <!-- 各个曝光数区间的博主数量统计 -->
    <el-row class="content-box-wrap">
      <div class="table-title left">各个曝光数区间的博主数量统计</div>
      <el-date-picker class="left" style="width: 290px;" v-model="formAuthorExpoW.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="getAuthorExpoWData()">
      </el-date-picker>
      <el-table :data="authorExpoW" style="width: 100%" border stripe size="mini">
          <el-table-column prop="bucket" label="区间">
              <template slot-scope="scope">
                <span>{{scope.row.bucket}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="count" sortable label="博主个数">
              <template slot-scope="scope">
                <span>{{_formatNum(scope.row.count)}}</span>
              </template>
          </el-table-column>
      </el-table>
    </el-row>
    <!-- 各个博主类型的博主数量统计 -->
    <el-row class="content-box-wrap">
      <div class="table-title left">各个博主类型的博主数量统计</div>
      <el-date-picker class="left" style="width: 290px;" v-model="formAuthorType.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="getAuthorTypeData()">
      </el-date-picker>
      <el-table :data="authorType" style="width: 100%" border stripe max-height='500' size="mini">
          <el-table-column type='index' label="序号" align='center' width='80'>
          </el-table-column>
          <el-table-column prop="author_type" label="类型">
              <template slot-scope="scope">
                <span>{{scope.row.author_type}}</span>
              </template>
          </el-table-column>
          <el-table-column prop="count" sortable label="博主个数">
              <template slot-scope="scope">
                <span>{{_formatNum(scope.row.count)}}</span>
              </template>
          </el-table-column>
      </el-table>
    </el-row>
    <!-- 分领域的微博点击阅读情况 -->
    <el-row class="content-box-wrap">
      <div class="table-title left">分领域的微博点击阅读情况</div>
      <el-date-picker class="left" style="width: 290px;" v-model="formWeiboRead.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="getWeiboReadData()">
      </el-date-picker>
      <el-button class="right" type="primary" size="mini" :loading="downloadReadLoading" @click="handleDownloadRead">导出</el-button>
      <el-table :data="weiboRead" style="width: 100%" border stripe max-height='500' size="mini">
          <el-table-column type='index' label="序号" align='center' width='80'>
          </el-table-column>
          <el-table-column prop="tag" label="领域">
            <template slot-scope="scope">
              <span>{{scope.row.tag}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="thd_click" sortable label="千曝点击">
            <template slot-scope="scope">
              <span>{{_formatNum(scope.row.thd_click)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="thd_act" sortable label="千曝互动">
            <template slot-scope="scope">
              <span>{{_formatNum(scope.row.thd_act)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="avg_duration" sortable label="平均时长">
            <template slot-scope="scope">
              <span>{{_formatNum(scope.row.avg_duration)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="exposure" sortable label="曝光量">
            <template slot-scope="scope">
              <span>{{_formatNum(scope.row.exposure)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="count_mid" sortable label="曝光微博数量">
            <template slot-scope="scope">
              <span>{{_formatNum(scope.row.count_mid)}}</span>
            </template>
          </el-table-column>
      </el-table>
    </el-row>
    <!-- 分领域（新体系）的微博点击阅读情况 -->
    <el-row class="content-box-wrap">
      <div class="table-title left">分领域（新体系）的微博点击阅读情况</div>
      <el-date-picker class="left" style="width: 290px;" v-model="formNewWeiboRead.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions" :clearable="false" size="mini" @change="getNewWeiboReadData()">
      </el-date-picker>
      <el-button class="right" type="primary" size="mini" :loading="downloadNewReadLoading" @click="handleDownloadNewRead">导出</el-button>
      <el-table :data="newWeiboRead" style="width: 100%" border stripe max-height='500' size="mini">
          <el-table-column type='index' label="序号" align='center' width='80'>
          </el-table-column>
          <el-table-column prop="tag" label="领域">
            <template slot-scope="scope">
              <span>{{scope.row.tag}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="thd_click" sortable label="千曝点击">
            <template slot-scope="scope">
              <span>{{_formatNum(scope.row.thd_click)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="thd_act" sortable label="千曝互动">
            <template slot-scope="scope">
              <span>{{_formatNum(scope.row.thd_act)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="avg_duration" sortable label="平均时长">
            <template slot-scope="scope">
              <span>{{_formatNum(scope.row.avg_duration)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="exposure" sortable label="曝光量">
            <template slot-scope="scope">
              <span>{{_formatNum(scope.row.exposure)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="count_mid" sortable label="曝光微博数量">
            <template slot-scope="scope">
              <span>{{_formatNum(scope.row.count_mid)}}</span>
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
import { parseTime, formatNum } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "materialPage",
  components: {
    Auth,
    ItemChart
  },
  data() {
    return {
      downloadReadLoading: false,
      downloadNewReadLoading: false,
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
      formInline: {
        status: "expose_author_num",
        item_names: "entire",
      },
      formInlineDate: {
        date: []
      },
      formField: {
        date: []
      },
      formSection: {
        date: []
      },
      formType: {
        date: []
      },
      formAuthorAreaCount: {
        date: []
      },
      formAuthorExpoW: {
        date: []
      },
      formAuthorType: {
        date: []
      },
      formWeiboRead: {
        date: []
      },
      formNewWeiboRead: {
        date: []
      },
      chartData: null,
      itemsList: null,
      fieldDataList: [], //曝光博文领域分布
      sectionDataList: [], //曝光博文曝光量区间分布
      typeDataList: [], //曝光博文内容形式分布
      authorAreaCount: [], // 各个标签的博主数量统计
      authorExpoW: [], // 各个曝光数区间的博主数量统计
      authorType: [], // 各个博主类型的博主数量统计
      weiboRead: [], // 分领域的微博点击阅读情况
      newWeiboRead: []// 分领域（新体系）的微博点击阅读情况

    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        const start = parseTime(Date.now() - 3600 * 1000 * 24 * 7, "{y}{m}{d}");
        const end = parseTime(Date.now() - 3600 * 1000 * 24 * 1, "{y}{m}{d}");
        this.formInlineDate.date = [start, end];
        this.formField.date = [start, end];
        this.formSection.date = [start, end];
        this.formType.date = [start, end];
        this.formAuthorAreaCount.date = [start, end];
        this.formAuthorExpoW.date = [start, end];
        this.formAuthorType.date = [start, end];
        this.formWeiboRead.date = [start, end];
        this.formNewWeiboRead.date = [start, end];
        this.onSearch();
        this.getFieldData();
        this.getSectionData();
        this.getTypeData();
        this.getAuthorAreaCountData();
        this.getAuthorExpoWData();
        this.getAuthorTypeData();
        this.getWeiboReadData();
        this.getNewWeiboReadData();
      }
    },
    onSearch() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getHotwbMidExposeLine.html",
        param: {
          ...this.formInline,
          dt_start: this.formInlineDate.date[0],
          dt_end: this.formInlineDate.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.chartData = this.setAnalyData(res.data, `趋势分析`);
        } else {
          Message({
            showClose: true,
            message: "曝光趋势分析图数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "曝光趋势分析图数据接口请求失败",
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
    getFieldData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getExposureCountByCategory.html",
        param: {
          dt_start: this.formField.date[0],
          dt_end: this.formField.date[1]
        }
      }
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      }
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.fieldDataList = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "曝光博文领域分布数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "曝光博文领域分布数据接口请求失败",
            type: "error",
            duration: 1000
          });
      })
    },
    getSectionData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getExposureCountByExposure.html",
        param: {
          dt_start: this.formSection.date[0],
          dt_end: this.formSection.date[1]
        }
      }
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      }
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.sectionDataList = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "曝光博文曝光量区间分布数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "曝光博文曝光量区间分布数据接口请求失败",
            type: "error",
            duration: 1000
          });
      })
    },
    getTypeData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getExposureCountByContentType.html",
        param: {
          dt_start: this.formType.date[0],
          dt_end: this.formType.date[1]
        }
      }
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      }
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.typeDataList = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "曝光博文内容形式分布数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "曝光博文内容形式分布数据接口请求失败",
            type: "error",
            duration: 1000
          });
      })
    },
    getAuthorAreaCountData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getAuthorAreaCount.html",
        param: {
          dt_start: this.formAuthorAreaCount.date[0],
          dt_end: this.formAuthorAreaCount.date[1]
        }
      }
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      }
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.authorAreaCount = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "各个标签的博主数量统计数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "各个标签的博主数量统计数据接口请求失败",
            type: "error",
            duration: 1000
          });
      })
    },
    getAuthorExpoWData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getAuthorExpoW.html",
        param: {
          dt_start: this.formAuthorExpoW.date[0],
          dt_end: this.formAuthorExpoW.date[1]
        }
      }
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      }
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.authorExpoW = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "各个曝光数区间的博主数量统计数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "各个曝光数区间的博主数量统计数据接口请求失败",
            type: "error",
            duration: 1000
          });
      })
    },
    getAuthorTypeData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getAuthorType.html",
        param: {
          dt_start: this.formAuthorType.date[0],
          dt_end: this.formAuthorType.date[1]
        }
      }
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      }
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.authorType = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "各个博主类型的博主数量统计数据获取失败",
            type: "error",
            duration: 1000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "各个博主类型的博主数量统计数据接口请求失败",
            type: "error",
            duration: 1000
          });
      })
    },
    getWeiboReadData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getTagMonitorData.html",
        param: {
          dt_start: this.formWeiboRead.date[0],
          dt_end: this.formWeiboRead.date[1]
        }
      }
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      }
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.weiboRead = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "分领域的微博点击阅读情况数据获取失败",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "分领域的微博点击阅读情况数据接口请求失败",
            type: "error",
            duration: 3000
          });
      })
    },
    getNewWeiboReadData() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getNewTagMonitorData.html",
        param: {
          dt_start: this.formNewWeiboRead.date[0],
          dt_end: this.formNewWeiboRead.date[1]
        }
      }
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      }
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.newWeiboRead = res.data || [];
        } else {
          Message({
            showClose: true,
            message: "分领域（新体系）的微博点击阅读情况数据获取失败",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
            showClose: true,
            message: "分领域（新体系）的微博点击阅读情况接口请求失败",
            type: "error",
            duration: 3000
          });
      })
    },
    _formatNum(num) {
      return formatNum(num);
    },
    handleDownloadRead() {
      this.downloadReadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "分领域的微博点击阅读情况";
        const tHeader = [
          "序号",
          "领域",
          "千曝点击",
          "千曝互动",
          "平均时长",
          "曝光量",
          "曝光微博数量"
        ];
        const filterVal = [
          "index",
          "tag",
          "thd_click",
          "thd_act",
          "avg_duration",
          "exposure",
          "count_mid"
        ];
        const list = this.weiboRead;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadReadLoading = false;
      });
    },
    handleDownloadNewRead() {
      this.downloadNewReadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "分领域（新体系）的微博点击阅读情况";
        const tHeader = [
          "序号",
          "领域",
          "千曝点击",
          "千曝互动",
          "平均时长",
          "曝光量",
          "曝光微博数量"
        ];
        const filterVal = [
          "index",
          "tag",
          "thd_click",
          "thd_act",
          "avg_duration",
          "exposure",
          "count_mid"
        ];
        const list = this.newWeiboRead;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadNewReadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, i) =>
        filterVal.map(j => {
          if (j === "index") {
            return i+1;
          } else {
            return v[j];
          }
        })
      );
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