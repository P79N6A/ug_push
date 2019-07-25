<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24" class="clearfix">
        <h6 class="pane-title left">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>领域黑名单</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="cateList && cateList.length > 0">
        <el-form inline :model="formInline" v-if="cateList" label-position="left" size="mini">
          <el-form-item>
            <el-input v-model="formInline.uid" placeholder="请输入作者UID" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.audit_type" placeholder="请选择编辑状态" style="max-width: 130px;">
              <el-option :key="key" v-for="(item, key) in auditList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="formInline.operator" placeholder="请输入操作人邮箱前缀" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="操作者类型" label-width="90px">
            <el-select v-model="formInline.role_id" filterable placeholder="请选择操作者类型" style="max-width: 120px;">
              <el-option label="所有业务方" value=""></el-option>
              <el-option label="PM" :value="1"></el-option>
              <el-option label="RD" :value="2"></el-option>
              <el-option label="业务方" :value="3"></el-option>
              <el-option label="实习生" :value="4"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>
            <el-select v-model="formInline.F_level" placeholder="请选择F层级" style="max-width: 120px;">
              <el-option :key="key" v-for="(item, key) in flevelList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="formInline.cause" placeholder="请选择拉黑理由" clearable style="max-width: 140px;">
              <el-option :key="key" v-for="(item, key) in delResonList" :label="item.label" :value="item.value"></el-option>
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
        <el-dialog title="Excel批量操作" :visible.sync="isUpload">
          <el-form :model="formUpload">
            <el-form-item label="选择领域" label-width="90px" required v-if="cateList">
              <el-select v-model="formUpload.field_id" filterable placeholder="请选择领域" clearable>
                <el-option v-for="(item, key) in cateList" :key="key" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <upload-excel :callback="getExcel" :initdata="formUpload.uids" :tips="true" :example="uploadExample" :showexample="true"></upload-excel>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addsEvent()" size="small">添加</el-button>
            <el-button @click="cancelUpload()" size="small">取 消</el-button>
          </div>
        </el-dialog>
        <div style="padding: 10px 0;" class="clearfix" v-if="cateList && cateList.length > 0">
          <el-button round size="mini" class="left" @click="passAllEvent()">勾选名单通过</el-button>
          <el-button type="success" size="mini" class="left" @click="showAdd()">添加黑名单</el-button>
          <el-button v-if="hasBatch" type="primary" size="mini" class="left" title="Excel批量导入uid" @click="showUpload()">
            <span>批量导入</span>
          </el-button>
          <el-button v-if="showDownLoadAll" type="danger" size="mini" class="right" title="批量导出全部 Excel" :loading="downloadAllLoading" @click="handleDownloadAll">
            <span>导出全部</span>
          </el-button>
          <el-button type="warning" size="mini" class="right" title="批量导出当前页数据 Excel" :loading="downloadCurLoading" @click="handleDownloadCur">
            <span>导出当前页</span>
          </el-button>
        </div>
        <el-dialog title="添加黑名单账号" :visible.sync="dialogVisible" width="60%">
          <el-form :model="formAdd" label-position="left" size="small">
            <el-form-item label="作者UID" label-width="80px" required>
              <el-input class="white-item" v-model="formAdd.uid" placeholder="请输入作者UID" clearable></el-input>
            </el-form-item>
            <el-form-item label="作者昵称" label-width="80px" required>
              <el-input class="white-item" v-model="formAdd.user_name" placeholder="请输入作者昵称" clearable></el-input>
            </el-form-item>
            <el-form-item label="有效期至" label-width="80px" required>
              <el-radio-group v-model="formAdd.is_expired">
                <el-radio style="margin-top: 5px;margin-left: 10px;" :label="0" @change="changeEpireTime">永久</el-radio>
                <el-radio style="margin-top: 5px;margin-left: 10px;" :label="1">自定义</el-radio>
              </el-radio-group>
              <transition name="fade">
              <el-date-picker v-show="formAdd.is_expired" style="margin-bottom: 5px; margin-left: 10px; width: 160px;" v-model="formAdd.expire_time" type="date" format="yyyy年MM月dd日" value-format="timestamp" placeholder="请选择日期">
              </el-date-picker>
              </transition>
            </el-form-item>
            <div class="clearfix">
              <span class="table-title left">选择添加黑名单的理由</span>
            </div>
            <el-form-item label="博主发布内容：">
              <el-radio-group v-model="formAdd.cause">
                <el-radio style="margin-top: 5px;margin-left: 10px;" :key="key" v-for="(item, key) in delResonList" :label="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEvent()" size="small">取 消</el-button>
            <el-button type="primary" size="small" @click="addEvent()">添 加</el-button>
          </div>
        </el-dialog>
        <el-row v-if="blackList && blackList.data">
            <el-table :data="blackList.data" style="width: 100%" border stripe @selection-change="handleSelectionChange" size="mini">
              <el-table-column
                type="selection"
                width="55"
                fixed="left">
              </el-table-column>
              <el-table-column width="130" prop="uid" label="uid">
                <template slot-scope="scope">
                  <user-detail :uid="scope.row.uid" :iswhite="0"></user-detail>
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
              <el-table-column align="left" prop="cause" label="下线理由">
                <template slot-scope="scope">{{scope.row.cause && delResonMap[scope.row.cause] || '暂无'}}</template>
              </el-table-column>
              <el-table-column width="80" align="left" prop="" label="审核状态">
                <template slot-scope="scope">
                  <span :class="auditTypeMap[scope.row.audit_type].class">{{auditTypeMap[scope.row.audit_type].label}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="verified" label="认证状态">
                <template slot-scope="scope">
                  <span>{{scope.row.verified ? '已认证' : '未认证'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="verified_type" label="认证类型">
                <template slot-scope="scope">
                  <span>{{verifiedTypeMap[scope.row.verified_type] || '普通用户'}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="verified_reason" label="认证信息" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.verified_reason || "暂无"}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="send_weibo_hz" label="互动度">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.interaction)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="send_weibo_hz" label="日发博频次">
                <template slot-scope="scope">
                  <span>{{_formatNum(scope.row.send_weibo_hz)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="tool_weibo_rate" label="工具发博比例">
                <template slot-scope="scope">
                  <span>{{_parsePercent(scope.row.tool_weibo_rate)}}</span>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="description" label="简介" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{scope.row.description || "暂无"}}</span>
                </template>
              </el-table-column>
              <el-table-column width="160" align="left" prop="update_time" label="操作时间">
                <template slot-scope="scope">{{_parseTime(scope.row.update_time)}}</template>
              </el-table-column>
              <el-table-column width="160" align="left" prop="is_expired" label="有效期">
                <template slot-scope="scope">{{scope.row.is_expired ? _parseTime(scope.row.expire_time) : "永久"}}</template>
              </el-table-column>
              <el-table-column align="left" prop="operator" label="操作人">
              </el-table-column>
              <el-table-column width="120" align="left" label="操作项" fixed="right">
                <template slot-scope="scope">
                  <operate-black :data="scope.row" :callback="onSearch"></operate-black>
                </template>
              </el-table-column>
            </el-table>
          <div style="padding-top: 10px;overflow: auto;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
import OperateBlack from "./operate";
import UploadExcel from "../../components/UploadExcel";
import UserDetail from "../../components/UserDetail";

export default {
  name: "blackList",
  components: {
    Auth,
    OperateBlack,
    UploadExcel,
    UserDetail
  },
  data() {
    return {
      apiConf: {
        //API
        getUserRole: "/role/getUserRole",
        getFieldBlackList: "/field/getFieldBlackList", //获取黑名单列表
        addFieldBlackList: "/field/addFieldBlackList", //添加黑名单
        importFieldBlackList: "/field/importFieldBlackList", //批量添加黑名单
        blackAuditPassMore: "/field/blackAuditPassMore" //黑名单批量通过审核
      },
      blackList: null,
      isUpload: false,
      hasBatch: '',
      downloadAllLoading: false,
      downloadCurLoading: false,
      dialogVisible: false,
      total: 0,
      showDownLoadAll: "",
      formUpload: {
        uids: null,
        field_id: ""
      },
      auditTypeMap: {
        "0": {
          label: '未审核',
          class: 'errorBtn'
        },
        "1": {
          label: '已审核',
          class: ''
        },
        "2": {
          label: '需重审(已过有效期)',
          class: 'warningBtn'
        }
      },
      uploadExample: {
        tableHeader: ["uid", "user_name", "cause"],
        tableData: [
          {
            uid: "1111681197",
            user_name: "来去之间",
            cause: 1
          }
        ]
      },
      formInline: {
        uid: "",
        audit_type: "", //1已审核；0未审核
        operator: "",
        role_id: "",
        F_level: "",
        field_id: "",
        cause: "",
        belong_to: null,
        page: 1,
        count: 10
      },
      formAdd: {
        uid: "",
        user_name: "",
        cause: "2",
        expire_time: '',
        is_expired: 0
      },
      editList: [
        {
          value: "",
          label: "所有状态"
        },
        {
          value: "1",
          label: "已编辑"
        },
        {
          value: "0",
          label: "未编辑"
        }
      ],
      auditList: [
        {
          value: "",
          label: "所有审核状态"
        },
        {
          value: "1",
          label: "已审核"
        },
        {
          value: "0",
          label: "未审核"
        },
        {
          value: "2",
          label: "需重审"
        }
      ],
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
      delResonMap: {
        "1": "博主发博与领域严重不符且低质",
        "2": "广告营销",
        "3": "搬运低质",
        "4": "色情",
        "5": "政治敏感",
        "6": "恶意涨粉涨互动",
        "7": "不实造谣炒作",
        "8": "其他"
      },
      delResonList: [
        {
          label: "广告营销",
          value: "2"
        },
        {
          label: "搬运低质",
          value: "3"
        },
        {
          label: "恶意涨粉涨互动",
          value: "6"
        },
        {
          label: "博主发博与领域严重不符且低质",
          value: "1"
        },
        {
          label: "色情",
          value: "4"
        },
        {
          label: "政治敏感",
          value: "5"
        },
        {
          label: "不实造谣炒作",
          value: "7"
        },
        {
          label: "其他",
          value: "8"
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
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          if (res.result && res.result.permission.indexOf(11) > -1) { //管理黑名单权限
            this.cateList = res.result && res.result.field || [];
            if (this.cateList.length > 0) {
              this.hasBatch = res.result.permission.indexOf(19) > -1; //黑名单批量操作权限
              this.formInline.belong_to = res.result.role;
              this.onSearch();
            } else {
              this.tips = "暂无有权限的领域";
            }
          } else {
            this.tips = "暂无黑名单审核权限";
          }
        } else {
          this.tips = "暂无黑名单审核权限";
        }
      },err => {
        this.tips = "接口异常";
      });
    },
    onSearch() {
      let params = {
        ...this.formInline,
        username: this.email,
        cip: 230
      };
      const data = {
        url: this.apiConf.getFieldBlackList,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.blackList = res.result;
        }
      });
    },
    changeEpireTime() {
      if (!this.formAdd.is_expired) {
        this.formAdd.expire_time = "";
      }
    },
    showAdd() {
      this.dialogVisible = true;
    },
    showUpload() {
      this.isUpload = true;
    },
    getExcel(val) {
      this.formUpload.uids = val;
      if (val && val.length > 0) {
        if (!val[0].hasOwnProperty('uid')) {
          this.illegalUidTips = '表头没有uid/uid拼写格式错误，请参考样例！';
          Message({
            showClose: true,
            message: this.illegalUidTips,
            type: "error",
            duration: 0
          });
          return;
        }
        if (!val[0].hasOwnProperty('user_name')) {
          this.illegalUidTips = '表头没有user_name/user_name拼写格式错误，请参考样例！';
          Message({
            showClose: true,
            message: this.illegalUidTips,
            type: "error",
            duration: 0
          });
          return;
        }
        if (!val[0].hasOwnProperty('cause')) {
          this.illegalUidTips = '表头没有cause/cause拼写格式错误，请参考样例！';
          Message({
            showClose: true,
            message: this.illegalUidTips,
            type: "error",
            duration: 0
          });
          return;
        }
        for (let i = 0; i < val.length; i++) {
          if (!val[i].uid) {
            this.illegalUidTips = `第${i+1}行 uid不能为空！`;
            Message({
              showClose: true,
              message: this.illegalUidTips,
              type: "error",
              duration: 0
            });
            return;
          }
          if (!val[i].user_name) {
            this.illegalUidTips = `第${i+1}行 user_name不能为空！`;
            Message({
              showClose: true,
              message: this.illegalUidTips,
              type: "error",
              duration: 0
            });
            return;
          }
          if (!val[i].cause) {
            this.illegalUidTips = `第${i+1}行 cause不能为空！`;
            Message({
              showClose: true,
              message: this.illegalUidTips,
              type: "error",
              duration: 0
            });
            return;
          }
          let reg = /^(1|2|3|4|5|6|7|8)$/;
          if (!reg.test(val[i].cause)) {
            this.illegalUidTips = `第${i+1}行 cause的值不符合规范！，请填写1~8之间的正整数`;
            Message({
              showClose: true,
              message: this.illegalUidTips,
              type: "error",
              duration: 0
            });
            return;
          }
        }
        this.uidsIsLegal = true; //数据合法，可添加
      } else {
        Message({
          showClose: true,
          message: tips,
          type: "导入Excel为空!",
          duration: 0
        });
      }
    },
    addEvent() {
      //添加单个黑名单
      if (!this.formAdd.uid) {
        Message({
          showClose: true,
          message: "请输入作者UID！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formAdd.user_name) {
        Message({
          showClose: true,
          message: "请输入作者昵称！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (this.formAdd.is_expired && !this.formAdd.expire_time) {
        Message({
          showClose: true,
          message: "请选择有效期！",
          type: "error",
          duration: 1000
        });
        return;
      }
      this.$confirm("确定添加到黑名单?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.addAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    addsEvent() {
      // 批量添加黑名单
      if (this.formUpload.field_id !== 0 && !this.formUpload.field_id) {
        Message({
          showClose: true,
          message: "请选择领域！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.formUpload.uids) {
        Message({
          showClose: true,
          message: "请导入用户uid、昵称与下线理由！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.uidsIsLegal) {
        Message({
          showClose: true,
          message: this.illegalUidTips,
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将批量添加用户到黑名单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.setUids();
        })
        .catch((error) => {
          this.$message({
            type: "info",
            message: "已取消批量添加！"
          });
          throw(error)
        });
    },
    setUids() {
      let params = new URLSearchParams();
      params.append("field_id", this.formUpload.field_id);
      params.append("field_blacklist", JSON.stringify(this.formUpload.uids));
      // params.append("audit_type", 0); //有审核权限为1，否则为0
      params.append("username", this.email);
      // params.append("cip", 230);
      const data = {
        url: this.apiConf.importFieldBlackList, //批量导入用户黑名单接口
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          const tips = res.msg || "success";
          Message({
            showClose: true,
            message: tips,
            type: "success",
            duration: 0
          });
          this.onSearch();
        } else {
          Message({
            showClose: true,
            message: res.msg || "操作失败！",
            type: "error",
            duration: 0
          });
        }
      });
    },
    cancelUpload() {
      this.isUpload = false;
      this.formUpload.uids = null;
    },
    addAction() {
      const data = {
        url: this.apiConf.addFieldBlackList,
        params: {
          ...this.formAdd,
          audit_type: 0, //有审核权限为1，否则为0
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.dialogVisible = false;
          Message({
            showClose: true,
            message: "添加成功!",
            type: "success",
            duration: 1000
          });
          this.cancelEvent();
          this.onSearch();
        } else {
          Message({
            showClose: true,
            message: res.msg || "添加失败!",
            type: "error",
            duration: 0
          });
        }
      });
    },
    cancelEvent() {
      this.dialogVisible = false;
      this.formAdd = {
        uid: "",
        user_name: "",
        cause: "2"
      };
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
        uid: this.formInline.uid,
        F_level: this.formInline.F_level,
        field_id: this.formInline.field_id,
        audit_type: this.formInline.audit_type,
        role_id: this.formInline.role_id,
        username: this.email,
        page: 1,
        count: this.total,
        cip: 230
      };
      const data = {
        url: this.apiConf.getFieldBlackList,
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
        const filename = "blacklist";
        const tHeader = [
          "序号",
          "uid",
          "昵称",
          "领域",
          "下线理由",
          "审核状态",
          "原创度",
          "垂直度",
          "健康度",
          "操作时间",
          "有效期",
          "操作人"
        ];
        const filterVal = [
          "index",
          "uid",
          "user_name",
          "field_name",
          "cause",
          "audit_type",
          "origin_degree",
          "vertical_degree",
          "health_degree",
          "update_time",
          "is_expired",
          "operator"
        ];
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadAllLoading = false;
      });
    },
    handleDownloadCur() {
      this.downloadCurLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "blacklist";
        const tHeader = [
          "序号",
          "uid",
          "昵称",
          "领域",
          "下线理由",
          "审核状态",
          "原创度",
          "垂直度",
          "健康度",
          "认证状态",
          "认证类型",
          "认证信息",
          "互动度",
          "日发博频次",
          "工具发博比例",
          "简介",
          "操作时间",
          "有效期",
          "操作人"
        ];
        const filterVal = [
          "index",
          "uid",
          "user_name",
          "field_name",
          "cause",
          "audit_type",
          "origin_degree",
          "vertical_degree",
          "health_degree",
          "verified",
          "verified_type",
          "verified_reason",
          "send_weibo_hz",
          "tool_weibo_rate",
          "interaction",
          "description",
          "update_time",
          "is_expired",
          "operator"
        ];
        const list = this.blackList.data;
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
          } else if (j === "cause") {
            return v[j] && this.delResonMap[v[j]] || '暂无';
          } else if (j === "audit_type") {
            return this.auditTypeMap[v[j]].label;
          } else if (j === "status") {
            return v[j] === 1 ? "在线上" : "已下线";
          } else if (
            j === "origin_degree" ||
            j === "vertical_degree" ||
            j === "health_degree"
          ) {
            return (v[j] && `${v[j]}级`) || "暂无";
          } else if (j === "verified") {
            return v[j] ? "已认证" : "未认证";
          } else if (j === "verified_type") {
            return this.verifiedTypeMap[v[j]] || '普通用户';
          } else if (j === "verified_reason" || j === "description") {
            return v[j] || "暂无";
          } else if (j === "update_time") {
            return this._parseTime(v[j]);
          } else if (j === "is_expired") {
            return v[j] ? this._parseTime(v["expire_time"]) : '永久';
          } else {
            return v[j];
          }
        })
      );
    },
    handleSelectionChange(val) {
      this.checkedIds = [];
      if (val && val.length > 0) {
        for (let i =0; i< val.length; i++) {
          val[i].audit_type === 0 && this.checkedIds.push(val[i].id);
        }
      }
    },
    passAllEvent() {
      if (!this.checkedIds.join(',')) {
        Message({
          showClose: true,
          message: "请勾选未审核黑名单用户！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("所选黑名单将通过审核, 是否继续?", "提示", {
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
            message: "已取消批量审核！"
          });
        });
    },
    passAllAction() {
      const data = {
        url: this.apiConf.blackAuditPassMore,
        params: {
          ids: this.checkedIds.join(','),
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "批量审核成功!",
            type: "success",
            duration: 1000
          });
          this.cancelEvent();
          this.onSearch();
        } else {
          Message({
            showClose: true,
            message: res.msg || "批量审核失败!",
            type: "error",
            duration: 0
          });
        }
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
    blackList() {
      this.blackList && (this.total = this.blackList.total || 0);
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