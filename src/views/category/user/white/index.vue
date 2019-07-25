<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24" class="clearfix">
        <h6 class="pane-title left">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>领域白名单</h6>
        <a v-if="dataAuth" href="/hot/#/channel/user/whitelist/document" target="_blank" class="help-doc-tips left">
          <i class="el-icon-question"></i>
          用户分级标准与编辑手册
        </a>
        <a v-if="hasAudit" :href="file_audit" target="_blank" class="help-doc-tips left">
          审核热门流白名单标准 下载
        </a>
        <span v-if="hasAudit" class="mode-text link-btn left" @click="handleModeChange()">{{mode_type ? '切换审核模式' : '切回编辑模式'}}</span>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="cateList && cateList.length > 0">
        <el-form inline :model="formInline" v-if="cateList" label-position="left" size="mini">
          <el-form-item>
            <el-input v-model="formInline.uid" placeholder="请输入作者UID" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker style="margin-bottom: 5px;width: 160px;" v-model="formInline.start_time" type="date" format="yyyy年MM月dd日" value-format="timestamp" placeholder="选择开始时间">
            </el-date-picker>
            <el-date-picker style="margin-bottom: 5px;width: 160px;" v-model="formInline.end_time" type="date" format="yyyy年MM月dd日" value-format="timestamp" placeholder="选择结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item v-if="mode_type">
            <el-select v-model="formInline.edit_type" placeholder="请选择编辑状态" style="width: 130px;">
              <el-option :key="key" v-for="(item, key) in editList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="!mode_type">
            <el-select v-model="formInline.audit_type" placeholder="请选择编辑状态" style="max-width: 130px;">
              <el-option :key="key" v-for="(item, key) in auditList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="!mode_type">
            <el-input v-model="formInline.operator" placeholder="请输入操作人邮箱前缀" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item v-if="!mode_type" label="操作者类型">
            <el-select v-model="formInline.role_id" filterable placeholder="请选择领域" style="max-width: 120px;">
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
            <el-select v-model="formInline.field_id" filterable placeholder="请选择领域">
              <el-option label="所有领域" value="" v-if="hasAllAuth"></el-option>
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
              <upload-excel :callback="getExcel" :initdata="formUpload.uids" :example="uploadExample" :showexample="true"></upload-excel>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addsEvent()" size="small">添加</el-button>
            <el-button @click="cancelUpload()" size="small">取 消</el-button>
          </div>
        </el-dialog>
        <div style="padding: 10px 0;" class="clearfix" v-if="cateList && cateList.length > 0">
          <el-button round size="mini" class="left" v-show="!mode_type" @click="passAllEvent()">勾选名单通过</el-button>
          <el-button type="success" size="mini" class="left" @click="showAdd()">添加白名单</el-button>
          <el-button v-if="hasBatch" type="primary" size="mini" class="left" title="Excel批量导入uid" @click="showUpload()">
            <span>批量导入</span>
          </el-button>
          <el-button v-if="formInline.field_id !== ''" type="danger" size="mini" class="right" title="批量导出全部 Excel" :loading="downloadAllLoading" @click="handleDownloadAll">
            <span>导出全部</span>
          </el-button>
          <el-button type="warning" size="mini" class="right" title="批量导出当前页数据 Excel" :loading="downloadCurLoading" @click="handleDownloadCur">
            <span>导出当前页</span>
          </el-button>
        </div>
        <el-dialog title="添加白名单账号" :visible.sync="dialogVisible" width="60%">
          <el-form :model="formAdd" label-position="left">
            <el-form-item label="选择领域" label-width="80px" required v-if="cateList">
              <el-select class="white-item" v-model="formAdd.field_id" filterable placeholder="请选择领域" clearable>
                <el-option v-for="(item, key) in cateList" :key="key" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作者UID" label-width="80px" required>
              <el-input class="white-item" v-model="formAdd.uid" placeholder="请输入作者UID" clearable></el-input>
            </el-form-item>
            <el-form-item label="作者昵称" label-width="80px" required>
              <el-input class="white-item" v-model="formAdd.user_name" placeholder="请输入作者昵称" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="frequency_loss">有降频流失的风险</el-checkbox>
              <el-checkbox v-model="mcn">已加入MCN机构</el-checkbox>
            </el-form-item>
            <el-form-item label="账号类型（可多选）" required>
              <el-checkbox-group v-model="account_type" :min="1">
                <el-checkbox style="margin-left:10px;" :key="key" v-for="(val, key) in accountMap" :label="key">{{val}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="原创度" label-width="80px" required>
              <el-select class="white-item left" v-model="origin_degree" placeholder="请选择原创度" clearable>
                <el-option v-for="(item, key) in originList" :key="key" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <span class="white-tips left">（考量直发微博中，原创和搬运内容的比例）</span>
            </el-form-item>
            <el-form-item label="垂直度" label-width="80px" required>
              <el-select class="white-item left" v-model="vertical_degree" placeholder="请选择垂直度" clearable>
                <el-option v-for="(item, key) in verticalList" :key="key" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <span class="white-tips left">（考量直发微博中，其内容是否跟当前垂直领域一致）</span>
            </el-form-item>
            <el-form-item label="健康度" label-width="80px" required>
              <el-select class="white-item left" v-model="health_degree" placeholder="请选择健康度" clearable>
                <el-option v-for="(item, key) in healthList" :key="key" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <span class="white-tips left">（考量发布微博中，违规、不良或广告营销信息的比例）</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-popover ref="popoverAdd" placement="top" width="200" v-model="formAdd.popover">
              <p>确定添加到白名单？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="formAdd.popover = false">取消</el-button>
                <el-button type="primary" round size="mini" @click="addEvent()">确定</el-button>
              </div>
            </el-popover>
            <el-button @click="cancelEvent()" size="small">取 消</el-button>
            <el-button type="primary" v-popover:popoverAdd size="small">添 加</el-button>
          </div>
        </el-dialog>
        <el-row v-if="whiteList && whiteList.data">
          <div v-show="mode_type">
            <el-table :data="whiteList.data" style="width: 100%" border stripe size="mini">
              <el-table-column width="130" prop="uid" label="uid">
                <template slot-scope="scope">
                  <user-detail :uid="scope.row.uid" :iswhite="1"></user-detail>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="user_name" label="昵称">
                <template slot-scope="scope">
                  <a :class="scope.row.user_name ? 'link-btn' : 'errorBtn'" :href="`//weibo.com/u/${scope.row.uid}`" target="_blank" title="跳转至微博主页">{{scope.row.user_name || '未知'}}</a>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="field_name" label="领域">
              </el-table-column>
              <el-table-column width="80" align="left" prop="" label="编辑状态">
                <template slot-scope="scope">
                  <span :class="scope.row.edit_type == 1 ? '' : 'errorBtn'">{{scope.row.edit_type == 1 ? '已编辑' : '未编辑'}}</span>
                </template>
              </el-table-column>
              <el-table-column width="70" align="left" prop="origin_degree" label="原创度">
                <template slot-scope="scope">
                  <span v-if="scope.row.origin_degree">{{scope.row.origin_degree}}级</span>
                  <span v-else style="color: #c0c4cc">暂无</span>
                </template>
              </el-table-column>
              <el-table-column width="70" align="left" prop="origin_degree" label="垂直度">
                <template slot-scope="scope">
                  <span v-if="scope.row.vertical_degree">{{scope.row.vertical_degree}}级</span>
                  <span v-else style="color: #c0c4cc">暂无</span>
                </template>
              </el-table-column>
              <el-table-column width="70" align="left" prop="origin_degree" label="健康度">
                <template slot-scope="scope">
                  <span v-if="scope.row.health_degree">{{scope.row.health_degree}}级</span>
                  <span v-else style="color: #c0c4cc">暂无</span>
                </template>
              </el-table-column>
              <el-table-column width="160" align="left" prop="update_time" label="操作时间">
                <template slot-scope="scope">{{_parseTime(scope.row.update_time)}}</template>
              </el-table-column>
              <el-table-column align="left" prop="operator" label="操作人">
              </el-table-column>
              <el-table-column width="120" align="left" label="操作项">
                <template slot-scope="scope">
                  <span v-if="scope.row.audit_type === 1 && !hasAudit">已审核，无需操作</span>
                  <operate-white v-else :data="scope.row" :formInline="formInline" :callback="onSearch" :hasaudit="hasAudit"></operate-white>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div v-show="!mode_type">
            <el-table :data="whiteList.data" style="width: 100%" border stripe @selection-change="handleSelectionChange" size="mini">
              <el-table-column type="selection" width="55" fixed="left">
              </el-table-column>
              <el-table-column width="130" prop="uid" label="uid">
                <template slot-scope="scope">
                  <user-detail :uid="scope.row.uid" :iswhite="1"></user-detail>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="user_name" label="昵称">
                <template slot-scope="scope">
                  <a :class="scope.row.user_name ? 'link-btn' : 'errorBtn'" :href="`//weibo.com/u/${scope.row.uid}`" target="_blank" title="跳转至微博主页">{{scope.row.user_name || '未知'}}</a>
                </template>
              </el-table-column>
              <el-table-column align="left" prop="field_name" label="领域">
              </el-table-column>
              <el-table-column width="80" align="left" prop="" label="审核状态">
                <template slot-scope="scope">
                  <span :class="scope.row.audit_type == 1 ? '' : 'errorBtn'">{{scope.row.audit_type == 1 ? '已审核' : '未审核'}}</span>
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
              <el-table-column align="left" prop="interaction" label="互动度">
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
              <el-table-column align="left" prop="operator" label="操作人">
              </el-table-column>
              <el-table-column width="100" align="left" label="操作项">
                <template slot-scope="scope">
                  <span v-if="scope.row.audit_type === 1 && !hasAudit">已审核，无需操作</span>
                  <operate-audit v-else :data="scope.row" :formInline="formInline" :callback="onSearch"></operate-audit>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page-box">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="formInline.count" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
import OperateWhite from "./operate";
import OperateAudit from "./operateaudit";
import UploadExcel from "../../components/UploadExcel";
import file_audit from "@/assets/file/audit.pdf";
import UserDetail from "../../components/UserDetail";

export default {
  name: "whiteList",
  components: {
    Auth,
    OperateWhite,
    OperateAudit,
    UploadExcel,
    UserDetail
  },
  data() {
    return {
      file_audit,
      apiConf: {
        //API
        getField: "/field/getFieldList", //获取所有领域列表
        getUserRole: "/role/getUserRole", //权限获取
        getFieldWhiteList: "/field/getFieldWhiteList", //获取白名单列表
        addFieldWhiteList: "/field/addFieldWhiteList", //添加单个白名单
        importFieldWhiteList: "/field/importFieldWhiteList", //批量导入用户接口
        whiteAuditPassMore: "/field/whiteAuditPassMore" //白名单批量审核通过
      },
      whiteList: null,
      isUpload: false,
      downloadAllLoading: false,
      downloadCurLoading: false,
      dialogVisible: false,
      mode_type: true, //true 编辑模式；false审核模式
      hasAllAuth: false, //是否有所有领域授权权限
      hasAudit: false, //是否有审核权限
      hasBatch: false, //是否有批量导入权限
      total: 0,
      formInline: {
        role_id: "",
        uid: "",
        start_time: "",
        end_time: "",
        F_level: "",
        field_id: "",
        edit_type: "", //1已编辑；0未编辑
        audit_type: "", //1已审核；0未审核
        operator: "",
        page: 1,
        count: 10
      },
      formAdd: {
        field_id: "",
        user_name: "",
        uid: "",
        popover: false
      },
      formUpload: {
        field_id: "",
        uids: null
      },
      uidsIsLegal: false, //批量导入的uid是否符合规范
      illegalUidTips: "",
      frequency_loss: false,
      mcn: false,
      account_type: [],
      health_degree: "",
      vertical_degree: "",
      origin_degree: "",
      originList: [
        {
          value: "5",
          label: "极好｜81%－100%为原创"
        },
        {
          value: "4",
          label: "良好｜61%－80%为原创"
        },
        {
          value: "3",
          label: "一般｜41％－60%为原创"
        },
        {
          value: "2",
          label: "较低｜21%－40%为原创"
        },
        {
          value: "1",
          label: "极低｜20%以下为原创"
        }
      ],
      verticalList: [
        {
          value: "5",
          label: "极好｜同领域匹配度81%－100％"
        },
        {
          value: "4",
          label: "良好｜同领域匹配度 61%-80%"
        },
        {
          value: "3",
          label: "一般｜同领域匹配度 41%-60%"
        },
        {
          value: "2",
          label: "较低｜同领域匹配度21%-40%"
        },
        {
          value: "1",
          label: "极低｜同领域匹配度20%以下"
        }
      ],
      healthList: [
        {
          value: 5,
          label: "极好｜不健康内容占比0%-4%"
        },
        {
          value: 4,
          label: "良好｜不健康内容占比5%-10%"
        },
        {
          value: 3,
          label: "一般｜不健康内容占比11%-20%"
        },
        {
          value: 2,
          label: "较低｜不健康内容占比21%-50%"
        },
        {
          value: 1,
          label: "极低｜不健康内容占比51%以上"
        }
      ],
      editList: [
        {
          value: "",
          label: "所有编辑状态"
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
      accountMap: {
        "1": "真人账号",
        "2": "自媒体",
        "3": "媒体",
        "4": "企业",
        "5": "营销号",
        "6": "纯明星",
        "7": "政府",
        "8": "其他机构",
        "9": "粉丝团"
      },
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
      uploadExample: {
        tableHeader: ["uid", "user_name"],
        tableData: [
          {
            uid: "1111681197",
            user_name: "来去之间"
          }
        ]
      },
      cateList: null,
      checkedIds: [],
      tips: "loading...", //暂无有权限的领域
      dataAuth: false, //是否有数据权限
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
            this.cateList = res.result.field || [];
            if (this.cateList.length > 0) {
              if (res.result.permission.indexOf(4) > -1) {
                this.hasAllAuth = true;
              } else {
                this.formInline.field_id = this.cateList[0].id;
              }
              this.dataAuth = true;
              this.hasAudit = res.result.permission.indexOf(12) > -1;
              this.hasBatch = res.result.permission.indexOf(6) > -1;
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
      let params = {
        ...this.formInline,
        username: this.email,
        cip: 230
      };
      const data = {
        url: this.apiConf.getFieldWhiteList,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.whiteList = res.result;
        }
      });
    },
    showAdd() {
      this.dialogVisible = true;
    },
    addEvent() {
      //添加单个白名单
      this.formAdd.popover = false;
      const accounType = this.account_type.join(",");
      if (isNaN(this.formAdd.field_id) && !this.formAdd.field_id) {
        Message({
          showClose: true,
          message: "请选择领域！",
          type: "error",
          duration: 1000
        });
        return;
      }
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
      if (!accounType) {
        Message({
          showClose: true,
          message: "请选择账号类型！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.origin_degree) {
        Message({
          showClose: true,
          message: "请选择原创度！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.vertical_degree) {
        Message({
          showClose: true,
          message: "请选择垂直度！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.health_degree) {
        Message({
          showClose: true,
          message: "请选择健康度！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const data = {
        url: this.apiConf.addFieldWhiteList,
        params: {
          field_id: this.formAdd.field_id,
          uid: this.formAdd.uid,
          user_name: this.formAdd.user_name,
          health_degree: this.health_degree,
          vertical_degree: this.vertical_degree,
          origin_degree: this.origin_degree,
          frequency_loss: Number(this.frequency_loss),
          mcn: Number(this.mcn),
          account_type: accounType || 0,
          edit_type: 1,
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
        field_id: ""
      };
      this.health_degree = "";
      this.vertical_degree = "";
      this.origin_degree = "";
      this.frequency_loss = false;
      this.mcn = false;
      this.account_type = [];
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
    showUpload() {
      this.isUpload = true;
    },
    addsEvent() {
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
          message: "请导入用户uid与昵称！",
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
      this.$confirm("将批量添加用户到白名单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.setUids();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消批量添加！"
          });
        });
    },
    cancelUpload() {
      this.isUpload = false;
      this.formUpload.uids = null;
    },
    setUids() {
      let params = new URLSearchParams();
      params.append("field_id", this.formUpload.field_id);
      params.append("field_whitelist", JSON.stringify(this.formUpload.uids));
      params.append("audit_type", 0); //有审核权限为1，否则为0
      params.append("username", this.email);
      params.append("cip", 230);
      const data = {
        url: this.apiConf.importFieldWhiteList, //批量导入用户白名单接口
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
    handleDownloadAll() {
      this.downloadAllLoading = true;
      let params = {
        uid: this.formInline.uid,
        F_level: this.formInline.F_level,
        field_id: this.formInline.field_id,
        edit_type: this.formInline.edit_type,
        audit_type: this.formInline.audit_type,
        operator: this.formInline.operator,
        role_id: this.formInline.role_id,
        username: this.email,
        page: 1,
        count: this.total,
        cip: 230
      };
      const data = {
        url: this.apiConf.getFieldWhiteList,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.downloadAll(res.result.data);
        } else {
          this.downloadAllLoading = false;
        }
      });
    },
    downloadAll(list) {
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "whitelist";
        const tHeader = [
          "序号",
          "uid",
          "昵称",
          "领域",
          "编辑状态",
          "原创度",
          "垂直度",
          "健康度",
          "原创度（机器打分）",
          "垂直度（机器打分）",
          "健康度（机器打分）",
          "操作时间",
          "操作人",
          "有降频流失的风险",
          "已加入MCN机构",
          "账号类型"
        ];
        const filterVal = [
          "index",
          "uid",
          "user_name",
          "field_name",
          "edit_type",
          "origin_degree",
          "vertical_degree",
          "health_degree",
          "origin_degree_mac",
          "vertical_degree_mac",
          "health_degree_mac",
          "update_time",
          "operator",
          "frequency_loss",
          "mcn",
          "account_type"
        ];
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadAllLoading = false;
      });
    },
    handleDownloadCur() {
      this.downloadCurLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "whitelist";
        const tHeader = [
          "序号",
          "uid",
          "昵称",
          "领域",
          "编辑状态",
          "原创度",
          "垂直度",
          "健康度",
          "原创度（机器打分）",
          "垂直度（机器打分）",
          "健康度（机器打分）",
          "认证状态",
          "认证类型",
          "认证信息",
          "互动度",
          "日发博频次",
          "工具发博比例",
          "简介",
          "操作时间",
          "操作人",
          "有降频流失的风险",
          "已加入MCN机构",
          "账号类型"
        ];
        const filterVal = [
          "index",
          "uid",
          "user_name",
          "field_name",
          "edit_type",
          "origin_degree",
          "vertical_degree",
          "health_degree",
          "origin_degree_mac",
          "vertical_degree_mac",
          "health_degree_mac",
          "verified",
          "verified_type",
          "verified_reason",
          "interaction",
          "send_weibo_hz",
          "tool_weibo_rate",
          "description",
          "update_time",
          "operator",
          "frequency_loss",
          "mcn",
          "account_type"
        ];
        const list = this.whiteList.data;
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
          } else if (j === "edit_type") {
            return v[j] === 1 ? "已编辑" : "未编辑";
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
          } else if (j === "frequency_loss" || j === "mcn") {
            return v[j] === 1 ? "是" : "否";
          } else if (j === "account_type") {
            return this.getAccountList(v[j]);
          } else if (j === "origin_degree_mac") {
            return this.getOriginMac(v[j]);
          } else if (j === "vertical_degree_mac") {
            return this.getVerticalMac(v[j]);
          } else if (j === "health_degree_mac") {
            return this.getHealthMac(v[j]);
          } else{
            return v[j];
          }
        })
      );
    },
    getOriginMac(val) {
      const origin_percent = parsePercent(val);
      let res = "一年内未发博，无法计算原创度";
      switch(true)
      {
        case (val > 1): 
          res = '一年内未发博，无法计算原创度';
          break;
        case (val > 0.8):
          res = `5级｜原创占比为${origin_percent}`;
          break;
        case (val > 0.6):
          res = `4级｜原创占比为${origin_percent}`;
          break;
        case (val > 0.4):
          res = `3级｜原创占比为${origin_percent}`;
          break;
        case (val > 0.2):
          res = `2级｜原创占比为${origin_percent}`;
          break;
        case (val <= 0.2):
          res = `1级｜原创占比为${origin_percent}`;
          break;
        default:
          res = '一年内未发博，无法计算原创度';
          break;
      }
      return res;
    },
    getVerticalMac(val) {
      const vertical_percent = parsePercent(val);
      let res = "一年内未发博，无法计算垂直度";
      switch(true)
      {
        case (val > 1): 
          res = '一年内未发博，无法计算垂直度';
          break;
        case (val > 0.8):
          res = `5级｜同领域匹配度${vertical_percent}`;
          break;
        case (val > 0.6):
          res = `4级｜同领域匹配度${vertical_percent}`;
          break;
        case (val > 0.4):
          res = `3级｜同领域匹配度${vertical_percent}`;
          break;
        case (val > 0.2):
          res = `2级｜同领域匹配度${vertical_percent}`;
          break;
        case (val <= 0.2):
          res = `1级｜同领域匹配度${vertical_percent}`;
          break;
        default:
          res = '一年内未发博，无法计算垂直度';
          break;
      }
      return res;
    },
    getHealthMac(val) {
      const health_percent = parsePercent(val);
      let res = "半年内未发博，无法计算健康度";
      switch(true)
      {
        case (val > 1): 
          res = '半年内未发博，无法计算健康度';
          break;
        case (val <= 0.04):
          res = `5级｜不健康内容占比${health_percent}`;
          break;
        case (val <= 0.1):
          res = `4级｜不健康内容占比${health_percent}`;
          break;
        case (val <= 0.2):
          res = `3级｜不健康内容占比${health_percent}`;
          break;
        case (val <= 0.5):
          res = `2级｜不健康内容占比${health_percent}`;
          break;
        case (val > 0.5):
          res = `1级｜不健康内容占比${health_percent}`;
          break;
        default:
          res = '半年内未发博，无法计算健康度';
          break;
      }
      return res;
    },
    getAccountList(type) {
      if (type == 0) {
        return "暂无";
      } else {
        const arr = type.toString().split(",");
        let res = [];
        for (let i = 0; i < arr.length; i++) {
          res.push(this.accountMap[arr[i]]);
        }
        return res.join("、");
      }
    },
    handleModeChange() {
      this.mode_type = !this.mode_type;
      this.formInline = {
        role_id: "",
        uid: "",
        start_time: "",
        end_time: "",
        F_level: "",
        field_id: this.hasAllAuth ? "" : this.cateList[0].id, // 若没有“所有领域”权限，默认查询有权限的第1个领域
        edit_type: "", //1已编辑；0未编辑
        audit_type: "", //1已审核；0未审核
        operator: "",
        page: 1,
        count: 10
      };
      this.onSearch();
    },
    handleSelectionChange(val) {
      this.checkedIds = [];
      if (val && val.length > 0) {
        for (let i = 0; i < val.length; i++) {
          val[i].audit_type === 0 && this.checkedIds.push(val[i].id);
        }
      }
    },
    passAllEvent() {
      if (!this.checkedIds.join(",")) {
        Message({
          showClose: true,
          message: "请勾选未审核白名单用户！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("所选白名单将通过审核, 是否继续?", "提示", {
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
        url: this.apiConf.whiteAuditPassMore,
        params: {
          ids: this.checkedIds.join(","),
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
    whiteList() {
      this.whiteList && (this.total = this.whiteList.total || 0);
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
    .page-box {
      padding-top: 10px;
      overflow: auto;
    }
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
.white-item {
  max-width: 100%;
  width: 270px;
}
.white-tips {
  margin-top: 6px;
  line-height: 1.5;
  color: #e6a23c;
  font-size: 12px;
}
.help-doc-tips {
  margin-top: 4px;
  margin-left: 10px;
  font-size: 14px;
  color: #e6a23c;
  &:hover {
    text-decoration: underline;
  }
}
.mode-text {
  margin-top: 4px;
  margin-left: 10px;
  font-size: 14px;
  cursor: pointer;
}
</style>