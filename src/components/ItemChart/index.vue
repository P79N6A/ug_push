<template>
  <div class="chartsBox" v-if="data">
    <div :style="`width:${width};height:${height}`">
      <vue-echarts v-if="options" :options="options" loading="true"></vue-echarts>
    </div>
  </div>
</template>

<script>
import VueEcharts from "vue-echarts";
import { formatNum, parseTime } from "@/utils";

export default {
  name: "templateChart",
  components: {
    VueEcharts
  },
  props: ["data"],
  data() {
    return {
      options: null,
      width: "100%",
      height: "400px",
      title: "统计图表"
    };
  },
  created() {
    this.data && this.setChart();
  },
  methods: {
    setChart() {
      this.title = this.data.title || this.title;
      this.width = this.data.width || this.width;
      this.height = this.data.height || this.height;
      this.options = {
        color: [
          "#fc97af",
          "#87f7cf",
          "#fcce10",
          "#72ccff",
          "#f7c5a0",
          "#d4a4eb",
          "#d2f5a6",
          "#76f2f2"
        ],
        title: {
          text: this.title,
          x: 'center',
          textStyle: {
            color: '#516b91',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: "axis",
          // axisPointer: {
          //   // 坐标轴指示器，坐标轴触发有效
          //   type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          // },
          axisPointer: {
            type: 'cross'
          },
          formatter: function (params, ticket, callback) {
            let arr = [];
            for(let i = 0; i < params.length; i ++) {
              const res = isNaN(params[i].value) ? params[i].value : `${formatNum(params[i].value)}（${params[i].value}）`;
              arr.push(`${params[i].marker}${params[i].seriesName}：${res}`);
            }
            return `${params[0].name}<br />${arr.join('<br />')}`;
          }
        },
        legend: {
          type: "scroll",
          bottom: 10,
          data: this.data.legendName
        },
        toolbox: this.data.toolbox || {
          orient: 'vertical',
          feature: {
            dataView: { show: true, readOnly: true },
            magicType: {
              show: true,
              type: ["line", "bar", "stack", "tiled"]
            },
            restore: { show: true },
            saveAsImage: {
              pixelRatio: 2
            }
          },
          right: 20,
          top: -6,
          emphasis: {
            iconStyle: {
              borderColor: '#409eff'
            }
          }
        },
        grid: {
          left: '1%',
          containLabel: true
        },
        xAxis: this.data.xAxis,
        yAxis: this.data.yAxis,
        series: this.data.series
      };
    }
  },
  watch: {
    data() {
      this.data && this.setChart();
    }
  }
};
</script>

<style lang="scss" scoped>
.chartsBox {
  padding: 10px;
  width: 100%;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
  border: 2px solid #f0f2f5;
  overflow: scroll;
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>