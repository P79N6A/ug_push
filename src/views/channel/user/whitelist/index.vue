<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24" class="clearfix">
        <h6 class="pane-title left">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>用户管理</h6>
        <a href="/hot/#/channel/user/whitelist/document" target="_blank" class="help-doc-tips left">
          <i class="el-icon-question"></i>
          用户分级标准与编辑手册
        </a>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="channelList && channelList.length > 0">
        <el-form inline :model="formInline" v-if="channelList" label-position="left" size="mini">
          <el-form-item label="UID" label-width="40px">
            <el-input v-model="formInline.uid" placeholder="请输入作者UID" clearable></el-input>
          </el-form-item>
          <el-form-item label="编辑状态" label-width="70px">
            <el-select v-model="formInline.mark" placeholder="请选择编辑状态">
              <el-option :key="key" v-for="(item, key) in markList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="F层级" label-width="70px">
            <el-select v-model="formInline.flevel" placeholder="请选择F层级">
              <el-option :key="key" v-for="(item, key) in flevelList" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择频道" label-width="70px">
            <el-select v-model="formInline.ckey" filterable placeholder="请选择频道">
              <el-option label="所有频道" value="all:all"></el-option>
              <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="onSearch">
              <span class="hidden-xs-only">查询</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" v-else-if="channelApi == null">
        loading……
      </el-col>
      <el-col :span="24" v-else-if="channelApi == 'response failed'">
        <el-alert title="网络请求异常，请重试~" type="warning" show-icon :closable="false">
        </el-alert>
      </el-col>
      <el-col :span="24" v-else-if="channelApi == true">
        <el-alert title="暂无有权限的频道" type="warning" show-icon :closable="false">
        </el-alert>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="24">
        <el-dialog title="Excel批量操作" :visible.sync="isUpload">
          <el-form :model="formUpload">
            <el-form-item label="用户类型" label-width="80px" required>
              <el-radio-group v-model="formUpload.status">
                <el-radio :label="1">白名单</el-radio>
                <el-radio :label="-1">黑名单</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="选择频道" label-width="90px" required v-if="channelList">
              <el-select v-model="formUpload.ckey" filterable placeholder="请选择频道" clearable>
                <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <upload-excel :callback="getExcel" :initdata="formUpload.uids" :example="uploadExample" :showexample="true"></upload-excel>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button type="success">上线</el-button>
            <el-button type="warning">下线</el-button> -->
            <el-button type="primary" @click="addsEvent()" size="small">添加</el-button>
            <el-button @click="cancelUpload()" size="small">取 消</el-button>
          </div>
        </el-dialog>
        <div style="padding: 10px 0;" class="clearfix" v-if="channelList && channelList.length > 0">
          <el-button type="success" size="mini" class="left" @click="showAdd()">添加用户</el-button>
          <el-button v-if="!readonly" type="primary" size="mini" class="left" title="Excel批量导入uid" @click="showUpload()">
            <span>uid导入</span>
          </el-button>
          <el-button type="danger" size="mini" class="right" title="批量导出全部 Excel" :loading="downloadAllLoading" @click="handleDownloadAll">
            <span>导出全部</span>
          </el-button>
          <el-button type="warning" size="mini" class="right" title="批量导出当前页数据 Excel" :loading="downloadCurLoading" @click="handleDownloadCur">
            <span>导出当前页</span>
          </el-button>
        </div>
        <el-dialog title="添加用户账号" :visible.sync="dialogVisible" width="60%">
          <el-form :model="formWhite" label-position="left">
            <el-form-item label="用户类型" label-width="80px" required>
              <el-radio-group v-model="formWhite.status">
                <el-radio :label="1">白名单</el-radio>
                <el-radio :label="-1">黑名单</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="选择频道" label-width="80px" required v-if="channelList">
              <el-select class="white-item" v-model="formWhite.ckey" filterable placeholder="请选择频道" clearable>
                <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作者UID" label-width="80px" required>
              <el-input class="white-item" v-model="formWhite.uid" placeholder="请输入作者UID" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="new_v">是新拓展的大V</el-checkbox>
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
            <el-popover ref="popoverAdd" placement="top" width="200" v-model="formWhite.popover">
              <p>确定添加到用户列表？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="formWhite.popover = false">取消</el-button>
                <el-button type="primary" round size="mini" @click="addEvent()">确定</el-button>
              </div>
            </el-popover>
            <el-button @click="cancelEvent()" size="small">取 消</el-button>
            <el-button type="primary" v-popover:popoverAdd size="small">添 加</el-button>
          </div>
        </el-dialog>
        <el-row v-if="whiteList && whiteList.data">
          <el-table :data="whiteList.data" style="width: 100%" border stripe size="mini">
            <el-table-column fixed width="120" align="left" prop="uid" label="uid">
              <template slot-scope="scope">
                <a class="link-btn" :href="`//weibo.com/u/${scope.row.uid}`" target="_blank" title="跳转至微博主页">{{scope.row.uid}}</a>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="username" label="昵称">
              <template slot-scope="scope">
                <a :class="scope.row.username ? 'link-btn' : 'errorBtn'" :href="`//weibo.com/u/${scope.row.uid}`" target="_blank" title="跳转至微博主页">{{scope.row.username || '未知'}}</a>
              </template>
            </el-table-column>
            <el-table-column align="left" prop="channel_name" label="频道">
            </el-table-column>
            <el-table-column width="80" align="left" prop="" label="编辑状态">
              <template slot-scope="scope">
                <span :class="scope.row.mark == 1 ? '' : 'errorBtn'">{{scope.row.mark == 1 ? '已编辑' : '未编辑'}}</span>
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
            <el-table-column width="160" align="left" prop="modify_time" label="操作时间">
            </el-table-column>
            <el-table-column align="left" prop="operator" label="操作人">
            </el-table-column>
            <el-table-column width="70" align="left" prop="status" label="状态">
              <template slot-scope="scope">{{getStatusCN(scope.row.status)}}</template>
            </el-table-column>
            <el-table-column align="left" label="操作项">
              <template slot-scope="scope">
                <operate-white :data="scope.row" :formInline="formInline" :callback="onSearch"></operate-white>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding-top: 10px;overflow: auto;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.curPage" :page-sizes="[5, 10, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="formInline.total">
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
import { parseTime } from "@/utils";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";
import OperateWhite from "./operate";
import UploadExcel from "../../components/UploadExcel";
import { operatelist } from "./operatelist";

export default {
  name: "whiteList",
  components: {
    Auth,
    OperateWhite,
    UploadExcel
  },
  data() {
    return {
      readonly: true,
      whiteList: null,
      isUpload: false,
      downloadAllLoading: false,
      downloadCurLoading: false,
      dialogVisible: false,
      defaultChannel: "",
      formInline: {
        ckey: "all:all",
        uid: "",
        mark: "",
        flevel: "",
        curPage: 1,
        count: 10,
        total: 0
      },
      formWhite: {
        uid: "",
        ckey: "",
        popover: false,
        status: 1
      },
      formUpload: {
        status: 1, // 1 白名单；-1 黑名单
        ckey: "",
        uids: null
      },
      uidsIsLegal: false, //批量导入的uid是否符合规范
      illegalUidTips: "",
      new_v: false,
      frequency_loss: false,
      mcn: false,
      account_type: [],
      checkList: ["1"],
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
      markList: [
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
      flevelList: [
        {
          value: "",
          label: "全部"
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
          value: "NULL", //else
          label: "其他"
        }
      ],
      accountMap: {
        "1": "个人账号",
        "2": "自媒体",
        "3": "媒体",
        "4": "企业",
        "5": "营销号",
        "6": "纯明星",
        "7": "政府",
        "8": "其他机构"
      },
      uploadExample: {
        tableHeader: ["uid"],
        tableData: [
          {
            uid: "2675435273"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email", "channelList", "channelApi"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.setChannelList();
        this.setReadonly();
      }
    },
    setReadonly() {
      operatelist.map((obj, i) => {
        if (this.email && this.email == obj.email) {
          this.readonly = false;
        }
      });
    },
    setChannelList() {
      const data = {
        url: "/channel/getAuthChannelList",
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("SetChannelList", data);
    },
    onSearch() {
      const keyArr = this.formInline.ckey.split(":");
      let params = {
        cid: keyArr[1],
        channel_history: keyArr[0],
        uid: this.formInline.uid,
        username: this.email,
        page: this.formInline.curPage,
        count: this.formInline.count,
        cip: 230
      };
      this.formInline.mark != "" && (params["mark"] = this.formInline.mark);
      this.formInline.flevel != "" &&
        (params["F_level"] = this.formInline.flevel);
      const data = {
        url: "/channel/getWhiteListByCid",
        params: params
      };
      this.$store.dispatch("GetWhiteList", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.whiteList = res.result;
        }
      });
    },
    showAdd() {
      this.formWhite.ckey =
        this.formInline.ckey == "all:all"
          ? this.defaultChannel
          : this.formInline.ckey;
      this.dialogVisible = true;
    },
    addEvent() {
      //添加单个用户
      this.formWhite.popover = false;
      const accounType = this.account_type.join(",");
      if (!this.formWhite.ckey) {
        Message({
          showClose: true,
          message: "请选择频道！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.formWhite.uid) {
        Message({
          showClose: true,
          message: "请输入作者UID！",
          type: "error",
          duration: 3000
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
          duration: 3000
        });
        return;
      }
      if (!this.vertical_degree) {
        Message({
          showClose: true,
          message: "请选择垂直度！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.health_degree) {
        Message({
          showClose: true,
          message: "请选择健康度！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.dialogVisible = false;
      const keyArr = this.formWhite.ckey.split(":");
      const data = {
        url: "/channel/addChannelWhiteList",
        params: {
          status: this.formWhite.status,
          cid: keyArr[1],
          channel_history: keyArr[0],
          uid: this.formWhite.uid,
          health_degree: this.health_degree,
          vertical_degree: this.vertical_degree,
          origin_degree: this.origin_degree,
          new_v: Number(this.new_v),
          frequency_loss: Number(this.frequency_loss),
          mcn: Number(this.mcn),
          account_type: accounType || 0,
          mark: 1,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("AddWhiteList", data).then(() => {
        this.cancelEvent();
        this.onSearch();
      });
    },
    cancelEvent() {
      this.dialogVisible = false;
      this.formWhite = {
        uid: "",
        ckey: "",
        popover: false,
        status: 1
      };
      this.health_degree = "";
      this.vertical_degree = "";
      this.origin_degree = "";
      this.new_v = false;
      this.frequency_loss = false;
      this.mcn = false;
      this.account_type = [];
    },
    handleSizeChange(val) {
      this.formInline.count = val;
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.formInline.curPage = val;
      this.onSearch();
    },
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    showUpload() {
      this.formUpload.ckey =
        this.formInline.ckey == "all:all"
          ? this.defaultChannel
          : this.formInline.ckey;
      this.isUpload = true;
    },
    addsEvent() {
      if (!this.formUpload.ckey) {
        Message({
          showClose: true,
          message: "请选择频道！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.formUpload.uids) {
        Message({
          showClose: true,
          message: "请导入用户uid！",
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
      const keyArr = this.formUpload.ckey.split(":");
      let params = new URLSearchParams();
      params.append("status", this.formUpload.status);
      params.append("cid", keyArr[1]);
      params.append("channel_history", keyArr[0]);
      params.append("channel_whitelist", JSON.stringify(this.formUpload.uids));
      params.append("username", this.email);
      params.append("cip", 230);
      const data = {
        url: "/channel/importChannelWhiteList",
        params: params
      };
      this.$store.dispatch("AddChannelUids", data).then(res => {
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
          this.illegalUidTips = '表头没有uid，请参考样例！';
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
      const keyArr = this.formInline.ckey.split(":");
      let params = {
        cid: keyArr[1],
        channel_history: keyArr[0],
        uid: this.formInline.uid,
        username: this.email,
        page: 1,
        count: this.formInline.total,
        cip: 230
      };
      this.formInline.mark != "" && (params["mark"] = this.formInline.mark);
      this.formInline.flevel != "" &&
        (params["F_level"] = this.formInline.flevel);
      const data = {
        url: "/channel/getWhiteListByCid",
        params: params
      };
      this.$store.dispatch("GetWhiteList", data).then(res => {
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
          "频道",
          "编辑状态",
          "原创度",
          "垂直度",
          "健康度",
          "操作时间",
          "操作人",
          "状态",
          "新拓展的大V",
          "有降频流失的风险",
          "已加入MCN机构",
          "账号类型"
        ];
        const filterVal = [
          "index",
          "uid",
          "channel_name",
          "mark",
          "origin_degree",
          "vertical_degree",
          "health_degree",
          "modify_time",
          "operator",
          "status",
          "new_v",
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
          "频道",
          "编辑状态",
          "原创度",
          "垂直度",
          "健康度",
          "操作时间",
          "操作人",
          "状态",
          "新拓展的大V",
          "有降频流失的风险",
          "已加入MCN机构",
          "账号类型"
        ];
        const filterVal = [
          "index",
          "uid",
          "username",
          "channel_name",
          "mark",
          "origin_degree",
          "vertical_degree",
          "health_degree",
          "modify_time",
          "operator",
          "status",
          "new_v",
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
          } else if (j === "mark") {
            return v[j] === 1 ? "已编辑" : "未编辑";
          } else if (j === "status") {
            return this.getStatusCN(v[j]);
          } else if (
            j === "origin_degree" ||
            j === "vertical_degree" ||
            j === "health_degree"
          ) {
            return (v[j] && `${v[j]}级`) || "暂无";
          } else if (j === "new_v" || j === "frequency_loss" || j === "mcn") {
            return v[j] === 1 ? "是" : "否";
          } else if (j === "account_type") {
            return this.getAccountList(v[j]);
          } else {
            return v[j];
          }
        })
      );
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
    getStatusCN(status) {
      let res = "已下线";
      if (status === 1) {
        res = "在线上";
      } else if (status === -1) {
        res = "已拉黑";
      }
      return res;
    }
  },
  created() {
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    },
    channelList() {
      if (this.channelList && this.channelList.length > 0) {
        this.defaultChannel = `${this.channelList[0].channel_history}:${
          this.channelList[0].cid
        }`;
        this.formInline.ckey = this.defaultChannel;
        this.onSearch();
      }
    },
    whiteList() {
      this.whiteList && (this.formInline.total = this.whiteList.total || 0);
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
</style>