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
                    <span class="table-title left">图片评估</span>
                    <el-button type="primary" size="mini" class="right" title="Excel批量导入" @click="showUpload()">
                        <span>Excel导入</span>
                    </el-button>
                </div>
                <div class="clearfix" v-if="dataList && dataList.length > 0">
                    <div class="left">
                        <h4 class="list-title">label {{page -1}} 共有{{dataList.length}}条数据</h4>
                        <item-list :key="`${item.mid}:${item.pid}`" :item="item" v-for="item in dataList"></item-list>
                    </div>
                    <div class="mids-box left">
                        <h4>mids:（{{dataList.length}}）</h4><br />
                        <p :key="`${item.mid}:${item.pid}`" v-for="item in dataList">{{item.mid}}</p>
                    </div>
                </div>
                <div v-else class="none-tips">暂无数据</div>
                <div style="padding-top: 10px;overflow: auto;">
                    <el-pagination @current-change="handleCurrentChange" :current-page="page" layout="prev, pager, next, jumper" :page-count="total">
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
        tableHeader: ["pid", "score", "mid", "label"],
        tableData: [
          {
            pid: "006p0nePgy1fv6jtrjw1hj30ho0aq14y",
            score: "2",
            mid: "4283374123847783",
            label: "0"
          }
        ]
      },
      page: 1,
      total: 2,
      excelData: [
        {
          pid: "005Zp2CMly1ftlpg2nghrj30j61gm46g",
          score: "5",
          mid: "4283474732518230",
          label: "0"
        },
        {
          pid: "006p0nePgy1fv6jtrjw1hj30ho0aq14y",
          score: "2",
          mid: "4283374123847783",
          label: "0"
        },
        {
          pid: "0061xXZ6ly1fv5x8qd3ijj30jg0ymjuv",
          score: "3",
          mid: "4283499815172877",
          label: "1"
        }
      ],
      dataList: [
        {
          pid: "005Zp2CMly1ftlpg2nghrj30j61gm46g",
          score: "5",
          mid: "4283474732518230",
          label: "0"
        },
        {
          pid: "006p0nePgy1fv6jtrjw1hj30ho0aq14y",
          score: "2",
          mid: "4283374123847783",
          label: "0"
        }
      ],
      tempData: null, //暂存excel数据
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
        this.tempData = this.excelData;
    },
    onSearch() {
      this.dataList = [];
      const val = this.excelData;
      for (let i = 0; i < val.length; i++) {
        if (val[i].label == this.page - 1) {
          this.dataList.push(val[i]);
        }
      }
    },
    showUpload() {
      this.isUpload = true;
    },
    getExcel(val) {
      this.excelData = val;
    },
    setExcelData() {
      if (this.excelData) {
        this.page = Number(this.excelData[0].label) + 1;
        this.total =
          Number(this.excelData[this.excelData.length - 1].label) + 1;
      } else {
          this.page = 1;
          this.total = 0;
      }
    },
    addsEvent() {
      this.isUpload = false;
      this.tempData = this.excelData;
      this.setExcelData();
      this.onSearch();
    },
    cancelUpload() {
      this.isUpload = false;
      this.excelData = this.tempData;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.onSearch();
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
  .list-title {
    margin-top: 10px;
    color: #666;
  }
  .mids-box {
    position: fixed;
    right: 20px;
    top: 120px;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0.7);
    border-radius: 3px;
    box-shadow: 1px 1px 2px 2px #666;
    font-size: 16px;
    color: #fff;
  }
}
</style>
