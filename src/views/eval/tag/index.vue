<template>
  <el-main v-if="pageAuth === 1" style="padding: 20px 14px;">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23">
        <el-dialog title="Excel批量操作" :visible.sync="isUpload">
          <upload-excel :callback="getExcel" :initdata="excelData" :example="uploadExample" :showexample="true"></upload-excel>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addsEvent()" size="small">导入</el-button>
            <el-button @click="cancelUpload()" size="small">取 消</el-button>
          </div>
        </el-dialog>
        <div class="clearfix">
          <span class="table-title left">标签评估</span>
          <el-button v-if="exportList && exportList.length > 0" style="margin-left: 5px;" type="success" size="mini" class="right" title="批量导出全部 Excel" :loading="downloadLoading" @click="handleDownload">
            <span>导出评估结果</span>
          </el-button>
          <el-button type="primary" size="mini" class="right" title="Excel批量导入" @click="showUpload()">
            <span>Excel导入</span>
          </el-button>
        </div>
        <div v-if="dataList && dataList.length > 0">
          <item-list :key="item.id" :callback="handleSelectChange" :selectedarr="getCheckedArr(idx)" :item="item" :inputs="inputList[(page -1)*count + idx]" :index="(page -1)*count + idx + 1" v-for="(item, idx) in dataList"></item-list>
        </div>
        <div v-else class="none-tips">暂无数据</div>
        <div style="padding-top: 10px;overflow: auto;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="count" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import UploadExcel from "./components/UploadExcel";
import ItemList from "./components/ItemList";
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  name: "manage",
  components: {
    Auth,
    UploadExcel,
    ItemList
  },
  data() {
    return {
      isUpload: false,
      uploadExample: {
        tableHeader: ["cate", "mid", "content"],
        tableData: [
          {
            cate: "领域1",
            mid: "2675435273",
            content:
              "一级标签id:名字,一级标签id:名字;二级标签id:名字,二级标签id:名字;三级标签id:名字,三级标签id:名字;keyword,keyword|一级标签id:名字,一级标签id:名字;二级标签id:名字,二级标签id:名字;三级标签id:名字,三级标签id:名字;keyword,keyword|一级标签id:名字,一级标签id:名字;二级标签id:名字,二级标签id:名字;三级标签id:名字,三级标签id:名字;keyword,keyword"
          }
        ]
      },
      downloadLoading: false,
      page: 1,
      count: 5,
      total: 0,
      excelData: null,
      mids: null,
      inputList: null,
      dataList: null,
      exportList: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {},
    onSearch() {
      const cur_page_mids = this.mids.slice((this.page -1) * this.count, this.page * this.count );
      const data = {
        url: "/lab/showbatch",
        params: {
          ids: cur_page_mids.join(",")
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        this.dataList = [];
        for (let i = 0, j = 0; i < cur_page_mids.length; i++, j++) {
          //i表示当前页面mids（cur_page_mids）下角标;j表示res下角标
          if (res[j] && cur_page_mids[i] == res[j].id) {
            this.dataList.push(res[j]);
          } else {
            this.dataList.push("");
            j--;
          }
        }
      });
    },
    showUpload() {
      this.isUpload = true;
    },
    getExcel(val) {
      this.excelData = val;
    },
    setExcelData() {
      const val = this.excelData;
      this.page = 1;
      this.inputList = null;
      this.dataList = null;
      this.mids = [];
      this.exportList = [];
      if (val && val.length > 0) {
        this.inputList = val;
        for (let i = 0; i < val.length; i++) {
          this.mids.push(val[i].mid);
          this.exportList.push({
            checkedArr: [],
            cate: val[i].cate,
            mid: val[i].mid,
            content: val[i].content,
            "00": "",
            "01": "",
            "02": "",
            "03": "",
            "10": "",
            "11": "",
            "12": "",
            "13": "",
            "20": "",
            "21": "",
            "22": "",
            "23": "",
            "30": "",
            "31": "",
            "32": "",
            "33": "",
            "40": "",
            "41": "",
            "42": "",
            "43": "",
            "50": "",
            "51": "",
            "52": "",
            "53": "",
            "60": "",
            "61": "",
            "62": "",
            "63": "",
            "70": "",
            "71": "",
            "72": "",
            "73": "",
            "80": "",
            "81": "",
            "82": "",
            "83": "",
            "90": "",
            "91": "",
            "92": "",
            "93": ""
          });
        }
      }
      this.total = this.mids && this.mids.length || 0;
    },
    addsEvent() {
      this.isUpload = false;
      this.setExcelData();
      this.onSearch();
    },
    cancelUpload() {
      this.isUpload = false;
      this.excelData = null;
    },
    getCheckedArr(idx) {
      return this.exportList[(this.page -1)*this.count + idx] && this.exportList[(this.page -1)*this.count + idx].checkedArr || [];
    },
    handleSizeChange(val) {
      this.$store.dispatch("updateVideo", ""); //取消所有视频播放
      this.count = val;
      this.mids && this.mids.length > 0 && this.onSearch();
    },
    handleCurrentChange(val) {
      this.$store.dispatch("updateVideo", ""); //取消所有视频播放
      this.page = val;
      this.mids && this.mids.length > 0 && this.onSearch();
    },
    handleSelectChange(idx, val, arr) {
      this.exportList[idx].checkedArr = arr;
      if (val && val.length > 0) {
        console.log(val);
        for (let i = 0; i < val.length; i++) {
          if (val[i] && val[i].length > 0) {
            for (let j = 0; j < val[i].length; j++) {
              this.exportList[idx][`${i}${j}`] = val[i][j] || "";
            }
          } else {
            this.exportList[idx][`${i}0`] = "";
            this.exportList[idx][`${i}1`] = "";
            this.exportList[idx][`${i}2`] = "";
            this.exportList[idx][`${i}3`] = "";
          }
        }
      } else {
        this.exportList[idx]["00"] = "";
        this.exportList[idx]["01"] = "";
        this.exportList[idx]["02"] = "";
        this.exportList[idx]["03"] = "";
        this.exportList[idx]["10"] = "";
        this.exportList[idx]["11"] = "";
        this.exportList[idx]["12"] = "";
        this.exportList[idx]["13"] = "";
        this.exportList[idx]["20"] = "";
        this.exportList[idx]["21"] = "";
        this.exportList[idx]["22"] = "";
        this.exportList[idx]["23"] = "";
        this.exportList[idx]["30"] = "";
        this.exportList[idx]["31"] = "";
        this.exportList[idx]["32"] = "";
        this.exportList[idx]["33"] = "";
        this.exportList[idx]["40"] = "";
        this.exportList[idx]["41"] = "";
        this.exportList[idx]["42"] = "";
        this.exportList[idx]["43"] = "";
        this.exportList[idx]["50"] = "";
        this.exportList[idx]["51"] = "";
        this.exportList[idx]["52"] = "";
        this.exportList[idx]["53"] = "";
        this.exportList[idx]["60"] = "";
        this.exportList[idx]["61"] = "";
        this.exportList[idx]["62"] = "";
        this.exportList[idx]["63"] = "";
        this.exportList[idx]["70"] = "";
        this.exportList[idx]["71"] = "";
        this.exportList[idx]["72"] = "";
        this.exportList[idx]["73"] = "";
        this.exportList[idx]["80"] = "";
        this.exportList[idx]["81"] = "";
        this.exportList[idx]["82"] = "";
        this.exportList[idx]["83"] = "";
        this.exportList[idx]["90"] = "";
        this.exportList[idx]["91"] = "";
        this.exportList[idx]["92"] = "";
        this.exportList[idx]["93"] = "";
      }
      console.log("exportList:", this.exportList[idx]);
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "demo_export";
        const tHeader = [
          "序号",
          "cate",
          "mid",
          "content",
          "机器/人工0_一级标签",
          "机器/人工0_二级标签",
          "机器/人工0_三级标签",
          "机器/人工0_关键词",
          "机器/人工1_一级标签",
          "机器/人工1_二级标签",
          "机器/人工1_三级标签",
          "机器/人工1_关键词",
          "机器/人工2_一级标签",
          "机器/人工2_二级标签",
          "机器/人工2_三级标签",
          "机器/人工2_关键词",
          "机器/人工3_一级标签",
          "机器/人工3_二级标签",
          "机器/人工3_三级标签",
          "机器/人工3_关键词",
          "机器/人工4_一级标签",
          "机器/人工4_二级标签",
          "机器/人工4_三级标签",
          "机器/人工4_关键词",
          "机器/人工5_一级标签",
          "机器/人工5_二级标签",
          "机器/人工5_三级标签",
          "机器/人工5_关键词",
          "机器/人工6_一级标签",
          "机器/人工6_二级标签",
          "机器/人工6_三级标签",
          "机器/人工6_关键词",
          "机器/人工7_一级标签",
          "机器/人工7_二级标签",
          "机器/人工7_三级标签",
          "机器/人工7_关键词",
          "机器/人工8_一级标签",
          "机器/人工8_二级标签",
          "机器/人工8_三级标签",
          "机器/人工8关键词",
          "机器/人工9_一级标签",
          "机器/人工9_二级标签",
          "机器/人工9_三级标签",
          "机器/人工9_关键词"
        ];
        const filterVal = [
          "index",
          "cate",
          "mid",
          "content",
          "00",
          "01",
          "02",
          "03",
          "10",
          "11",
          "12",
          "13",
          "20",
          "21",
          "22",
          "23",
          "30",
          "31",
          "32",
          "33",
          "40",
          "41",
          "42",
          "43",
          "50",
          "51",
          "52",
          "53",
          "60",
          "61",
          "62",
          "63",
          "70",
          "71",
          "72",
          "73",
          "80",
          "81",
          "82",
          "83",
          "90",
          "91",
          "92",
          "93"
        ];
        const data = this.formatJson(filterVal, this.exportList);
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
    email() {},
    pageAuth() {
      this.init();
    },
    dataList() {}
  }
};
</script>

<style lang="scss" scoped>
body {
  .el-main {
    padding: 20px 10px;
    color: #333;
    line-height: 100%;
    background-color: #f0f2f5;
  }
  .none-tips {
    margin-top: 10px;
    padding: 10px;
    font-size: 14px;
    text-align: center;
    color: #999;
    background-color: #fff;
    border-radius: 5px;
  }
  .table-title {
    padding: 5px 20px;
    color: #409eff;
    border-bottom: 2px solid #409eff;
  }
}
</style>
