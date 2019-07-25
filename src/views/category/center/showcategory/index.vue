<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>领域操作记录</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="cateList && cateList.length > 0">
        <el-form inline :model="formInline" size="mini">
          <el-form-item>
            <el-date-picker v-model="formInline.data_date" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.field_name" placeholder="请输入领域名称" clearable></el-input>
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
    <el-row class="content-box-wrap">
      <el-col :span="24">
        <el-row v-if="categoryData" class="table-wrap">
          <div class="table-title left">{{cur_date}} 操作记录</div>
          <el-button v-if="categoryData.length > 0" class="right" type="primary" plain size="mini" :loading="downloadLoading" @click="handleDownload">
            <i class="el-icon-download"></i> <span class="hidden-xs-only">导出</span></el-button>
          <el-table :data="categoryData" style="width: 100%" max-height="500" border stripe show-summary :summary-method="getSummaries" size="mini">
            <el-table-column type="index" align="center" width="50" label="序号" fixed>
            </el-table-column>
            <el-table-column align="center" prop="field_name" label="领域名称">
            </el-table-column>
            <el-table-column align="center" prop="white_sum" label="白名单总数" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.white_sum)}}</template>
            </el-table-column>
            <el-table-column align="center" prop="balck_sum" label="黑名单总数" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.balck_sum)}}</template>
            </el-table-column>
            <el-table-column align="center" prop="edit_sum" label="已编辑总数" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.edit_sum)}}</template>
            </el-table-column>
            <el-table-column align="center" prop="white_audit_sum" label="已审核白名单总数" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.white_audit_sum)}}</template>
            </el-table-column>
            <el-table-column align="center" prop="black_audit_sum" label="已审核黑名单总数" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.black_audit_sum)}}</template>
            </el-table-column>
            <el-table-column align="center" prop="new_white" label="当日新增白名单" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.new_white)}}</template>
            </el-table-column>
            <el-table-column align="center" prop="new_balck" label="当日新增黑名单" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.new_balck)}}</template>
            </el-table-column>
            <el-table-column align="center" prop="new_edit" label="当日新增编辑白名单" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.new_edit)}}</template>
            </el-table-column>
            <el-table-column align="center" prop="new_white_audit" label="当日新增审核白名单" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.new_white_audit)}}</template>
            </el-table-column>
            <el-table-column align="center" prop="new_black_audit" label="当日新增审核黑名单" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.new_black_audit)}}</template>
            </el-table-column>
          </el-table>
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
import { mapGetters } from "vuex";
import { formatNum, parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "categoryList",
  components: {
    Auth
  },
  data() {
    return {
      apiConf: {
        //API
        getUserRole: "/role/getUserRole",
        getFieldStatisticsList: "/field/getFieldStatisticsList"
      },
      dialogVisible: false,
      formInline: {
        field_name: "",
        data_date: ""
      },
      cur_date: "",
      categoryData: null,
      cateList: null,
      tips: "loading...", //暂无有权限的领域
      downloadLoading: false
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.formInline.data_date = parseTime(
          Date.now() - 3600 * 1000 * 24 * 1,
          "{y}-{m}-{d}"
        );
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
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          if (res.result && res.result.permission.indexOf(2) > -1) {
            this.cateList = res.result && res.result.field || [];
            if (this.cateList.length > 0) {
              this.onSearch();
            } else {
              this.tips = "暂无有权限的领域";
            }
          } else {
            this.tips = "暂无领域操作记录页面权限";
          }
        } else {
          this.tips = "暂无领域操作记录页面权限";
        }
      },err => {
        this.tips = "接口异常";
      });
    },
    onSearch() {
      //获取所有领域操作记录列表
      const data = {
        url: this.apiConf.getFieldStatisticsList,
        params: {
          ...this.formInline,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.cur_date = this.formInline.data_date;
          this.categoryData = res.result || [];
        }
      });
    },
    _formatNum(num) {
      return formatNum(num);
    },
    getSummaries(options) {
      const { columns, data } = options;
      let sums = [];
      columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
            return;
          }
          if (index === 1) {
            sums[index] = '所有领域';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = formatNum(sums[index]);
          }
        });
      return sums;
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = `领域操作记录_${this.cur_date}`;
        const tHeader = [
          "序号",
          "领域",
          "白名单总数",
          "黑名单总数",
          "已编辑总数",
          "已审核白名单总数",
          "已审核黑名单总数",
          "当日新增白名单",
          "当日新增黑名单",
          "当日新增编辑白名单",
          "当日新增审核白名单",
          "当日新增审核黑名单"
        ];
        const filterVal = [
          "index",
          "field_name",
          "white_sum",
          "balck_sum",
          "edit_sum",
          "white_audit_sum",
          "black_audit_sum",
          "new_white",
          "new_balck",
          "new_edit",
          "new_white_audit",
          "new_black_audit"
        ];
        const list = this.categoryData;
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
}
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
</style>