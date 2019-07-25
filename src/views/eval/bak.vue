<template>
  <el-container direction="vertical">
    <item-header></item-header>
    <el-main v-if="pageAuth === 1">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23">
          <el-dialog title="Excel批量操作" :visible.sync="isUpload">
            <upload-excel :callback="getExcel" :initdata="mids" :example="uploadExample"></upload-excel>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="addsEvent()">导入</el-button>
              <el-button @click="cancelUpload()">取 消</el-button>
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
            <item-list :key="idx" :callback="handleSelectChange" :item="item" :inputs="inputList[idx]" :index="idx + 1" v-for="(item, idx) in dataList"></item-list>
          </div>
          <div v-else class="none-tips">暂无数据</div>
          <div style="padding-top: 10px;overflow: auto;">
            <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[5, 10, 20, 30, 40]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="formInline.total">
            </el-pagination> -->
          </div>
        </el-col>
      </el-row>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
      <auth></auth>
    </el-main>
  </el-container>
</template>

<script>
import ItemHeader from "@/components/ItemHeader";
import Auth from "@/components/Tips/Auth";
import UploadExcel from "./components/UploadExcel";
import ItemList from "./components/ItemList";
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  name: "manage",
  components: {
    ItemHeader,
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
      const data = {
        url: "/lab/showbatch",
        params: {
          ids: this.mids.join(",")
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        this.dataList = [];
        for(let i=0,j=0;i<this.inputList.length;i++,j++) { //i表示this.inputList下角标;j表示res下角标
          if(this.inputList[i].mid == res[j].id) {
            this.dataList.push(res[j]);
          } else {
            this.dataList.push('');
            j--;
          }
        }
      });
    },
    showUpload() {
      this.isUpload = true;
    },
    getExcel(val) {
      this.mids = [];
      this.exportList = [];
      if (val && val.length > 0) {
        this.inputList = val;
        for (let i = 0; i < val.length; i++) {
          this.mids.push(val[i].mid);
          this.exportList.push({
            cate: val[i].cate,
            mid: val[i].mid,
            content: val[i].content,
            "0": "",
            "1": "",
            "2": "",
            "3": "",
            "4": "",
            "5": "",
            "6": "",
            "7": "",
            "8": "",
            "9": ""
          });
        }
      }
    },
    addsEvent() {
      this.isUpload = false;
      this.onSearch();
    },
    cancelUpload() {
      this.isUpload = false;
      this.mids = null;
    },
    handleSizeChange(val) {
      this.formInline.count = val;
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.onSearch();
    },
    handleSelectChange(idx, val) {
      if (val && val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          this.exportList[idx][i] = (val[i] && val[i].join(";")) || "";
        }
      } else {
        this.exportList[idx][0] = "";
        this.exportList[idx][1] = "";
        this.exportList[idx][2] = "";
        this.exportList[idx][3] = "";
        this.exportList[idx][4] = "";
        this.exportList[idx][5] = "";
        this.exportList[idx][6] = "";
        this.exportList[idx][7] = "";
        this.exportList[idx][8] = "";
        this.exportList[idx][9] = "";
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
          "机器/人工评估0",
          "机器/人工评估1",
          "机器/人工评估2",
          "机器/人工评估3",
          "机器/人工评估4",
          "机器/人工评估5",
          "机器/人工评估6",
          "机器/人工评估7",
          "机器/人工评估8",
          "机器/人工评估9"
        ];
        const filterVal = [
          "index",
          "cate",
          "mid",
          "content",
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9"
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
    dataList(){}
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
