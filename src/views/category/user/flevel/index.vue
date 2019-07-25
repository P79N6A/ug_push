<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24" class="clearfix">
        <h6 class="pane-title left">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>新增头部用户</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="cateList && cateList.length > 0">
        <el-form inline :model="formInline" v-if="cateList" label-position="left" size="mini">
          <el-form-item>
            <el-select v-model="formInline.F_level" placeholder="请选择F层级" style="max-width: 120px;">
              <el-option :key="key" v-for="(item, key) in flevelList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.field_id" filterable placeholder="请选择领域">
              <el-option label="所有领域" value=""></el-option>
              <el-option v-for="(item, key) in cateList" :key="key" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="onSearch">
              <span class="hidden-xs-only">查询</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" v-else>
        <el-alert :title="tips" type="warning" show-icon :closable="false">
        </el-alert>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="24">
        <div style="padding: 10px 0;" class="clearfix" v-if="cateList && cateList.length > 0">
          <el-button round size="mini" class="left" @click="passAllEvent()">勾选名单通过</el-button>
          <el-button v-if="showDownLoadAll" type="danger" size="mini" class="right" title="批量导出全部 Excel" :loading="downloadAllLoading" @click="handleDownloadAll">
            <span>导出全部</span>
          </el-button>
          <el-button type="warning" size="mini" class="right" title="批量导出当前页数据 Excel" :loading="downloadCurLoading" @click="handleDownloadCur">
            <span>导出当前页</span>
          </el-button>
        </div>
        <el-row v-if="topUsers && topUsers.data">
            <el-table :data="topUsers.data" style="width: 100%" border stripe @selection-change="handleSelectionChange" size="mini">
              <el-table-column
                type="selection"
                width="55"
                fixed="left">
              </el-table-column>
              <el-table-column width="100" prop="uid" label="uid">
                <template slot-scope="scope">
                  <a class="link-btn" :href="`//weibo.com/u/${scope.row.uid}`" target="_blank" title="跳转至微博主页">{{scope.row.uid}}</a>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="user_name" label="昵称">
                <template slot-scope="scope">
                  <a :class="scope.row.user_name ? 'link-btn' : 'errorBtn'" :href="`//weibo.com/u/${scope.row.uid}`" target="_blank" title="跳转至微博主页">{{scope.row.user_name || '未知'}}</a>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="field_name" label="领域">
                <template slot-scope="scope">{{scope.row.field_name || '无领域'}}</template>
              </el-table-column>
              <el-table-column width="55" align="left" prop="F_level" label="F层级">
                <template slot-scope="scope">{{scope.row.F_level.toLowerCase() === 'null' ? "其他" : scope.row.F_level}}</template>
              </el-table-column>
              <el-table-column align="left" prop="verified_type" label="认证类型">
                <template slot-scope="scope">
                  <span>{{verifiedTypeMap[scope.row.verified_type] || '普通用户'}}</span>
                </template>
              </el-table-column>
              <el-table-column width="70" align="left" prop="verified" label="认证状态">
                <template slot-scope="scope">
                  <span>{{scope.row.verified ? '已认证' : '未认证'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="description" label="简介" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.description || "暂无"}}</span>
                </template>
              </el-table-column>
              <el-table-column width="140" align="left" prop="create_time" label="操作时间">
                <template slot-scope="scope">{{_parseTime(scope.row.create_time)}}</template>
              </el-table-column>
              <el-table-column width="120" align="left" label="操作项">
                <template slot-scope="scope">
                  <operate-flevel :data="scope.row" :callback="onSearch" :role="formInline.belong_to"></operate-flevel>
                </template>
              </el-table-column>
            </el-table>
          <div style="padding-top: 10px;overflow: auto;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
import { mapGetters } from "vuex";
import { parseTime, parsePercent, formatNum } from "@/utils";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";
import OperateFlevel from "./operate";
import UploadExcel from "../../components/UploadExcel";

export default {
  name: "topUsers",
  components: {
    Auth,
    OperateFlevel,
    UploadExcel
  },
  data() {
    return {
      apiConf: {
        //API
        getUserRole: "/role/getUserRole",
        getTopUsers: "/field/getTopUsers", //获取头部用户列表
        setOnline: "/field/setOnline"//头部用户加入白名单（通过）/黑名单（不通过）
      },
      topUsers: null,
      downloadAllLoading: false,
      downloadCurLoading: false,
      total: 0,
      showDownLoadAll: "",
      formInline: {
        F_level: "",
        field_id: "",
        belong_to: "",
        page: 1,
        count: 10
      },
      flevelList: [
        {
          value: "",
          label: "全部F层级"
        },
        {
          value: "F0",
          label: "F0"
        },
        {
          value: "F1",
          label: "F1"
        },
        {
          value: "F2",
          label: "F2"
        },
        {
          value: "F3",
          label: "F3"
        },
        {
          value: "F4",
          label: "F4"
        },
        {
          value: "NULL", //else
          label: "其他"
        }
      ],
      verifiedTypeMap: {
        "0": "名人",
        "1": "政府",
        "2": "企业",
        "3": "媒体",
        "4": "校园",
        "5": "网站",
        "6": "应用",
        "7": "团体",
        "-1": "普通用户",
        "8": "待审企业",
        "200": "初级达人",
        "220": "通过审核的达人",
        "400": "已故认证用户"
      },
      cateList: null,
      checkedIds: [],
      tips: "loading..." //暂无有权限的领域
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
          cip: 189
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          if (res.result && res.result.role) { //角色是否存在
            this.cateList = res.result && res.result.field || [];
            if (this.cateList.length > 0) {
              this.formInline.belong_to = res.result.role;
              this.onSearch();
            } else {
              this.tips = "暂无有权限的领域";
            }
          } else {
            this.tips = "暂无新增头部用户权限";
          }
        } else {
          this.tips = "暂无新增头部用户权限";
        }
      },err => {
        this.tips = "接口异常";
      });
    },
    onSearch() {
      let params = {
        ...this.formInline,
        username: this.email,
        cip: 189
      };
      const data = {
        url: this.apiConf.getTopUsers,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.topUsers = res.result;
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
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    _parsePercent(num) {
      return parsePercent(num);
    },
    _formatNum(num) {
      return formatNum(num);
    },
    handleDownloadAll() {
      this.downloadAllLoading = true;
      let params = {
        F_level: this.formInline.F_level,
        field_id: this.formInline.field_id,
        belong_to: this.formInline.belong_to,
        username: this.email,
        page: 1,
        count: this.total,
        cip: 189
      };
      const data = {
        url: this.apiConf.getTopUsers,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.downloadAll(res.result.data);
        } else {
          Message({
            showClose: true,
            message: "数据获取失败！",
            type: "error",
            duration: 1000
          });
          this.downloadAllLoading = false;
        }
      }, error => {
        Message({
            showClose: true,
            message: "请求失败，可能是数据量过大！",
            type: "error",
            duration: 1000
          });
          this.downloadAllLoading = false;
      });
    },
    downloadAll(list) {
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "FlevelList";
        const tHeader = [
          "序号",
          "uid",
          "昵称",
          "领域",
          "F层级",
          "认证类型",
          "认证状态",
          "简介",
          "操作时间"
        ];
        const filterVal = [
          "index",
          "uid",
          "user_name",
          "field_name",
          "F_level",
          "verified_type",
          "verified",
          "description",
          "create_time"
        ];
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadAllLoading = false;
      });
    },
    handleDownloadCur() {
      this.downloadCurLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "FlevelList";
        const tHeader = [
          "序号",
          "uid",
          "昵称",
          "领域",
          "F层级",
          "认证类型",
          "认证状态",
          "简介",
          "操作时间"
        ];
        const filterVal = [
          "index",
          "uid",
          "user_name",
          "field_name",
          "F_level",
          "verified_type",
          "verified",
          "description",
          "create_time"
        ];
        const list = this.topUsers.data;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadCurLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, i) =>
        filterVal.map(j => {
          if (j === "index") {
            return i + 1;
          } else if (j === "verified") {
            return v[j] ? "已认证" : "未认证";
          } else if (j === "verified_type") {
            return this.verifiedTypeMap[v[j]] || '普通用户';
          } else if (j === "create_time") {
            return this._parseTime(v[j]);
          } else if(j === "F_level") {
            return v[j].toLowerCase() === 'null' ? "其他" : v[j]
          } else {
            return v[j] || '暂无';
          }
        })
      );
    },
    handleSelectionChange(val) {
      this.checkedIds = [];
      if (val && val.length > 0) {
        for (let i =0; i< val.length; i++) {
          this.checkedIds.push(val[i].id);
        }
      }
    },
    passAllEvent() {
      if (!this.checkedIds.join(',')) {
        Message({
          showClose: true,
          message: "请勾选需要通过的头部用户！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("所选头部用户将通过, 是否继续?", "批量通过加入到白名单", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.passAllAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消批量通过！"
          });
        });
    },
    passAllAction() {
      const data = {
        url: this.apiConf.setOnline,
        params: {
          ids: this.checkedIds.join(','),
          type: 1, // 1白名单；2黑名单
          audit_type: this.formInline.belong_to === 3 ? 0 : 1, // 1已审核，0未审核；领域业务方添加的名单需要审核
          username: this.email,
          cip: 189
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: res.msg || "批量通过成功!",
            type: "success",
            duration: 1000
          });
          this.onSearch();
        } else {
          Message({
            showClose: true,
            message: res.msg || "批量通过失败!",
            type: "error",
            duration: 0
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "批量通过接口请求失败!",
          type: "success",
          duration: 0
        });
      });
    }
  },
  created() {
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    },
    topUsers() {
      this.topUsers && (this.total = this.topUsers.total || 0);
      this.showDownLoadAll = this.formInline.field_id !== '' && this.total < 100000;
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
.warningBtn {
  color: #E6A23C;
  &:hover {
    text-decoration: underline;
  }
}
.white-item {
  max-width: 100%;
  width: 270px;
}
.table-title {
  padding: 5px 10px;
  color: #409eff;
  border-bottom: 2px solid #409eff;
  margin-bottom: 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>