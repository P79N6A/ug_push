<template>
    <div>
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">
                <i class="el-icon-printer" style="margin-right: 6px;"></i>兴趣标签覆盖率</h6>
        </el-row>
        <el-row>
            <el-form inline :model="formInline">
                <el-form-item label="数据库">
                    <el-select v-model="formInline.database" placeholder="请选择数据库">
                        <el-option label="原始数据" value="offline"></el-option>
                        <el-option label="入库数据" value="online"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="维度">
                    <el-select v-model="formInline.status" placeholder="请选择查询维度" style="min-width: 250px;">
                        <el-option :key="key" v-for="(item, key) in statusList" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="领域">
                    <el-select v-model="formInline.items" placeholder="请选择领域，支持搜索" filterable multiple>
                        <el-option :key="key" v-for="(item, key) in itemsList" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="formInline.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="yyyyMMdd" :picker-options="pickerOptions">
                    </el-date-picker>
                    <el-button type="primary" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="chartWrap" type="flex" justify="space-between" v-if="chartData">
            <el-col :span="24" style="margin-right: 5px;">
                <item-chart :data="chartData"></item-chart>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import ItemChart from "@/components/ItemChart";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "ratePage",
  components: {
    ItemChart
  },
  data() {
    return {
      formInline: {
        database: "offline",
        status: "second_tag_rate_material",
        date: [],
        items: ['1042015:tagCategory_050']
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
      itemsList: null,
      statusList: [
        {
          label: "内容标签2级覆盖率(按物料统计)",
          value: "second_tag_rate_material"
        },
        {
          label: "内容标签3级覆盖率(按物料统计)",
          value: "third_tag_rate_material"
        },
        {
          label: "内容标签2级覆盖率(按曝光统计)",
          value: "second_tag_rate_expose"
        },
        {
          label: "内容标签3级覆盖率(按曝光统计)",
          value: "third_tag_rate_expose"
        },
        {
          label: "用户2级兴趣匹配度(按曝光统计)",
          value: "second_user_rate_expose"
        },
        {
          label: "用户3级兴趣匹配度(按曝光统计)",
          value: "third_user_rate_expose"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      const start = parseTime(Date.now() - 3600 * 1000 * 24 * 30, "{y}{m}{d}");
      const end = parseTime(Date.now() - 3600 * 1000 * 24 * 1, "{y}{m}{d}");
      this.formInline.date = [start, end];
      this.getSourceList();
    },
    onSearch() {
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
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getMaterialLineData.html",
        param: {
          database: this.formInline.database,
          type: "source",
          items: items,
          status: this.formInline.status,
          dt_start: this.formInline.date[0],
          dt_end: this.formInline.date[1]
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetBaseAnaly", params).then(res => {
        Message({
          showClose: true,
          message: "success",
          type: "success",
          duration: 1000
        });
        if (res.code && Number(res.code) == 200) {
          this.chartData = this.setAnalyData(res.data, `趋势分析`);
        }
      });
    },
    getSourceList() {
      const tempData = {
        url: "http://172.16.105.67:8091/newtest1011/getMaterialWeiduName.html",
        param: {
          type: "rate"
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetSourceList", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.itemsList = res.data;
        }
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