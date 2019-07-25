<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>内容评估操作记录</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="!tips">
        <el-form inline :model="formInline" size="mini">
          <el-form-item>
            <el-date-picker v-model="formInline.score_date" type="date" format="yyyy年MM月dd日" value-format="timestamp" placeholder="选择操作日期">
            </el-date-picker>
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
    <el-row class="content-box-wrap" v-if="!tips">
      <el-col :span="24">
        <el-row v-if="markData" class="table-wrap">
          <div class="table-title left">{{cur_date && _parseTime(cur_date, '{y}-{m}-{d}')}} 操作记录</div>
          <el-table :data="markData" style="width: 100%" max-height="500" border stripe size="mini">
            <el-table-column type="index" align="center" width="50" label="序号" fixed>
            </el-table-column>
            <el-table-column prop="title" label="Title">
            </el-table-column>
            <el-table-column prop="level" label="分级">
            </el-table-column>
            <el-table-column prop="state" label="分级意义">
                <template slot-scope="scope">
                    <div :key="key" v-for="(val, key) in scope.row.state">{{key}}：{{val}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="score_date" label="操作时间">
                <template slot-scope="scope">{{_parseTime(scope.row.score_date, '{y}-{m}-{d}')}}</template>
            </el-table-column>
            <el-table-column prop="operator" label="操作人">
            </el-table-column>
            <el-table-column prop="cnt" label="操作数量" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.cnt)}}</template>
            </el-table-column>
            <el-table-column prop="score_rate" label="结果占比">
                <template slot-scope="scope">
                    <div :key="key" v-for="(val, key) in scope.row.score_rate">{{key}}：（{{_parsePercent(val)}}）</div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <operate :data="{mark_id: scope.row.mark_id, score_date: cur_date}"></operate>
                </template>
            </el-table-column>
          </el-table>
          <div style="padding-top: 10px;overflow: auto;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="formInline.page"
              :page-sizes="[5, 10, 20]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
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
import { formatNum, parseTime, parsePercent } from "@/utils";
import { Message } from "element-ui";
import Operate from "./operate";

export default {
  name: "EvalRecords",
  components: {
    Auth,
    Operate
  },
  data() {
    return {
      apiConf: {
        //API
        getUserRole: "/role/getUserRole",
        getMarkList: "/material/getMarkList"
      },
      formInline: {
        score_date: "",
        page: 1,
        count: 10
      },
      total: 0,
      cur_date: "",
      markData: null,
      tips: "loading...", //暂无有权限的领域
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
            if (res.result && res.result.permission.indexOf(15) > -1) {
              //判断是否有权限
              this.tips = "";
              this.onSearch();
            } else {
              this.tips = "暂无物料内容评估权限";
            }
          } else {
            this.tips = "暂无物料内容评估权限";
          }
        },
        err => {
          this.tips = "接口异常";
        }
      );
    },
    onSearch() {
      //获取所有领域操作记录列表
      const data = {
        url: this.apiConf.getMarkList,
        params: {
          ...this.formInline,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          const t = Date.now();
          const f = this._parseTime(t, '{y},{m},{d}');
          const cur = new Date(f).getTime();
          this.cur_date = this.formInline.score_date || cur;
          this.total = res.total || 0;
          const markMap = res.result || "";
          this.markData = Object.keys(markMap).map(key => markMap[key]);
        } else {
          Message({
            showClose: true,
            message: res.msg || "操作记录查询失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "操作记录接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    handleSizeChange(val) {
      this.formInline.count = val;
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.onSearch();
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parseTime(time, cFormat) {
      return parseTime(time, cFormat);
    },
    _parsePercent(n, d) {
        return parsePercent(n, d);
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