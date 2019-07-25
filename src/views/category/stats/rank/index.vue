<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>UID曝光排行榜</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="cateList && cateList.length > 0">
        <el-form inline :model="formInline" size="mini">
          <el-form-item label="日期">
            <el-date-picker v-model="formInline.exposure_date" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="选择开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="领域">
            <el-select v-model="formInline.field_id" filterable placeholder="请选择领域">
              <el-option label="所有领域" value="" v-if="hasAllAuth"></el-option>
              <el-option v-for="(item, key) in cateList" :key="key" :label="item.name" :value="item.id"></el-option>
            </el-select>
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
      <el-col :span="24" v-if="reportData">
        <el-table :data="reportData" style="width: 100%" border stripe size="mini">
          <el-table-column type="index" :index="indexMethod" width="50" label="排名" fixed>
          </el-table-column>
          <el-table-column width="130" prop="uid" label="uid">
            <template slot-scope="scope">
              <user-detail :uid="scope.row.uid" :iswhite="1"></user-detail>
            </template>
          </el-table-column>
          <el-table-column prop="" label="昵称">
            <template slot-scope="scope">
              <a :class="scope.row.user_name ? 'link-btn' : 'errorBtn'" :href="`//weibo.com/u/${scope.row.uid}`" target="_blank" title="跳转至微博主页">{{scope.row.user_name || '未知'}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="exposure" label="曝光量">
            <template slot-scope="scope">{{_formatNum(scope.row.exposure)}}</template>
          </el-table-column>
          <el-table-column prop="count_mid" label="曝光量条数">
            <template slot-scope="scope">{{_formatNum(scope.row.count_mid)}}</template>
          </el-table-column>
          <el-table-column prop="growth_rate" label="曝光量较昨天增长率" min-width="90">
            <template slot-scope="scope">
              <el-tag>{{isNaN(scope.row.growth_rate) && '-' || `${scope.row.growth_rate}%`}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="left" label="操作项">
            <template slot-scope="scope">
              <operate :data="scope.row" :cur_exposure_date="cur_exposure_date"></operate>
            </template>
          </el-table-column>
        </el-table>
        <div style="padding-top: 10px;overflow: auto;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[20]" :page-size="formInline.count" layout="total, sizes, prev, pager, next, jumper" :total="100">
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
import Operate from "./operate";
import { mapGetters } from "vuex";
import { formatNum, parseTime } from "@/utils";
import { Message } from "element-ui";
import UserDetail from "../../components/UserDetail";

export default {
  name: "categoryList",
  components: {
    Auth,
    Operate,
    UserDetail
  },
  data() {
    return {
      apiConf: {
        //API
        getUserRole: "/role/getUserRole",
        getExposureTop: "/field/getExposureTop"
      },
      formInline: {
        field_id: "",
        exposure_date: "",
        page: 1,
        count: 20,
      },
      cur_page: 1,
      cur_exposure_date: "",
      hasAllAuth: false,
      reportData: null,
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
        this.getUserRole();
        this.formInline.exposure_date = parseTime(
          Date.now() - 3600 * 1000 * 24 * 1,
          "{y}-{m}-{d}"
        );
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
            this.cateList = res.result.field || [];
            if (this.cateList.length > 0) {
              if (res.result.permission.indexOf(13) > -1) {
                this.hasAllAuth = true;
              } else {
                this.formInline.field_id = this.cateList[0].id;
              }
              this.onSearch();
            } else {
              this.tips = "暂无有权限的领域";
            }
          } else {
            this.tips = "暂无有权限的领域";
          }
        },
        err => {
          this.tips = "接口异常";
        }
      );
    },
    onSearch() {
      if (!this.formInline.exposure_date) {
        Message({
          showClose: true,
          message: "请选择查询日期！",
          type: "error",
          duration: 3000
        });
        return;
      }
      const data = {
        url: this.apiConf.getExposureTop,
        params: {
          ...this.formInline,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.cur_exposure_date = this.formInline.exposure_date;
          this.cur_page = this.formInline.page;
          this.reportData = res.result || [];
        }
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
    indexMethod(index) {
      return (this.cur_page - 1) * 20 + index + 1;
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
.errorBtn {
  color: #f56c6c;
  &:hover {
    text-decoration: underline;
  }
}
</style>