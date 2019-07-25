<template>
  <el-button
    v-if="data"
    type="warning"
    @click="handleDownload()"
    size="mini"
    icon="el-icon-download"
  >
    <span class="hidden-xs-only">导出详情</span>
  </el-button>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  name: "EvalRecordsOperate",
  data() {
    return {
      apiConf: {
        //API
        exportMaterial: "/material/getExportMaterial", //获取打分详情
      },  
      downloadLoading: false
    };
  },
  props: ["data"],
  computed: {
    ...mapGetters(["email"])
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true;
      let params = {
        ...this.data,
        count: this.total,
        cip: 230
      };
      const data = {
        url: this.apiConf.exportMaterial,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200 && res.data) {
          this.downloadData(res.data);
        } else {
          this.downloadLoading = false;
          Message({
            showClose: true,
            message: "打分详情获取失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
          this.downloadLoading = false;
          Message({
            showClose: true,
            message: "打分详情接口请求失败！",
            type: "error",
            duration: 3000
          });
      });
    },
    downloadData(list) {
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "内容评估打分详情";
        const tHeader = ["序号", "Title", "mid", "uid", "领域", "F层级", "C层级", "分级", "打分", "操作人"];
        const filterVal = ["index", "title", "mid", "uid", "field_name", "F_level", "C_level", "level", "score", "operator"];
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
          } else {
            return typeof v[j] === 'number' ? v[j].toString() : v[j];
          }
        })
      );
    }
  },
  watch: {
    data() {}
  }
};
</script>
