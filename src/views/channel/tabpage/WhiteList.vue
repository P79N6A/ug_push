<template>
  <div>
    <el-row type="flex" justify="center" class="pane-title-wrap">
      <el-col :span="23">
        <h6 class="pane-title">
          <i class="el-icon-document" style="margin-right: 6px;"></i>用户白名单</h6>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="23" v-if="channelList && channelList.length > 0">
        <el-form inline :model="formInline" v-if="channelList" label-position="left">
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
      <el-col :span="23" v-else-if="channelApi == null">
        loading……
      </el-col>
      <el-col :span="23" v-else-if="channelApi == 'response failed'">
        <el-alert title="网络请求异常，请重试~" type="warning" show-icon :closable="false">
        </el-alert>
      </el-col>
      <el-col :span="23" v-else-if="channelApi == true">
        <el-alert title="暂无有权限的频道" type="warning" show-icon :closable="false">
        </el-alert>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-dialog title="Excel批量操作" :visible.sync="isUpload">
          <el-form :model="formUpload">
            <el-form-item label="选择频道" label-width="90px" required v-if="channelList">
              <el-select v-model="formUpload.ckey" filterable placeholder="请选择频道" clearable>
                <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <upload-excel :callback="getExcel" :initdata="formUpload.uids" :example="uploadExample" ></upload-excel>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button type="success">上线</el-button>
            <el-button type="warning">下线</el-button> -->
            <el-button type="primary" @click="addsEvent()">添加</el-button>
            <el-button @click="cancelUpload()">取 消</el-button>
          </div>
        </el-dialog>
        <div class="pane-title-wrap clearfix" v-if="channelList && channelList.length > 0">
          <el-button type="success" round size="mini" class="left" @click="showAdd()">添加白名单</el-button>
          <el-button type="danger" size="mini" class="right" title="批量导出全部 Excel" :loading="downloadAllLoading" @click="handleDownloadAll">
            <span>导出全部</span>
          </el-button>
          <el-button type="warning" size="mini" class="right" title="批量导出当前页数据 Excel" :loading="downloadCurLoading" @click="handleDownloadCur">
            <span>导出当前页</span>
          </el-button>
          <el-button type="info" size="mini" class="right" title="Excel批量导入uid" @click="showUpload()">
            <span>uid导入</span>
          </el-button>
        </div>
        <el-dialog title="添加白名单账号" :visible.sync="dialogVisible" width="60%">
          <el-form :model="formWhite" label-position="left">
            <el-form-item label="选择频道" label-width="80px" required v-if="channelList">
              <el-select class="white-item" v-model="formWhite.ckey" filterable placeholder="请选择频道" clearable>
                <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作者UID" label-width="80px" required>
              <el-input class="white-item" v-model="formWhite.uid" auto-complete="off" placeholder="请输入作者UID" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="new_v">是新拓展的大V</el-checkbox>
              <el-checkbox v-model="frequency_loss">有降频流失的风险</el-checkbox>
              <el-checkbox v-model="mcn">已加入MCN机构</el-checkbox>
            </el-form-item>
            <el-form-item label="账号类型（可多选）">
              <el-checkbox-group v-model="account_type">
                <el-checkbox :key="key" v-for="(item, key) in accountList" :label="item.value">{{item.label}}</el-checkbox>
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
              <p>确定添加到白名单？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="formWhite.popover = false">取消</el-button>
                <el-button type="primary" round size="mini" @click="addEvent()">确定</el-button>
              </div>
            </el-popover>
            <el-button @click="cancelEvent()">取 消</el-button>
            <el-button type="primary" v-popover:popoverAdd>添 加</el-button>
          </div>
        </el-dialog>
        <el-row v-if="whiteList && whiteList.data">
          <el-table :data="whiteList.data" style="width: 100%" border stripe>
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
              <template slot-scope="scope"><span :class="scope.row.mark == 1 ? '' : 'errorBtn'">{{scope.row.mark == 1 ? '已编辑' : '未编辑'}}</span></template>
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
              <template slot-scope="scope">{{scope.row.status === 1 ? '在线上' : '已下线'}}</template>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";
import OperateWhite from "./operate/white";
import UploadExcel from "../components/UploadExcel";

export default {
  name: "whiteList",
  components: {
    OperateWhite,
    UploadExcel
  },
  data() {
    return {
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
        popover: false
      },
      formUpload: {
        ckey: "",
        uids: null
      },
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
          value: "5",
          label: "极好｜没有不健康内容"
        },
        {
          value: "4",
          label: "良好｜不健康内容比例2%以下"
        },
        {
          value: "3",
          label: "一般｜不健康内容比例3%－5%以下"
        },
        {
          value: "2",
          label: "较低｜不健康内容比例6%－10%下"
        },
        {
          value: "1",
          label: "极低｜不健康内容比例10%以上"
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
      accountList: [
        {
          value: "1",
          label: "个人账号"
        },
        {
          value: "2",
          label: "自媒体"
        },
        {
          value: "3",
          label: "媒体"
        },
        {
          value: "4",
          label: "企业"
        },
        {
          value: "5",
          label: "营销号"
        }
      ],
      uploadExample: {
        tableHeader:['uid'],
        tableData: [
          {
            uid: '2675435273'
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      "pageAuth",
      "email",
      "channelList",
      "channelApi"
    ])
  },
  methods: {
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
      this.formInline.mark != '' && (params['mark'] = this.formInline.mark);
      this.formInline.flevel != '' && (params['F_level'] = this.formInline.flevel);
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
      this.formWhite.ckey = this.formInline.ckey == 'all:all' ? this.defaultChannel : this.formInline.ckey;
      this.dialogVisible = true
    },
    addEvent() {
      //添加单个白名单
      this.formWhite.popover = false;
      if (!this.formWhite.ckey) {
        Message({
          showClose: true,
          message: "请选择频道！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formWhite.uid) {
        Message({
          showClose: true,
          message: "请输入作者UID！",
          type: "error",
          duration: 1000
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
      this.dialogVisible = false;
      const keyArr = this.formWhite.ckey.split(":");
      const accounType = this.account_type.join(',');
      const data = {
        url: "/channel/addChannelWhiteList",
        params: {
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
        ckey: ""
      };
      this.health_degree = "";
      this.vertical_degree = "";
      this.origin_degree = "";
      this.new_v =  false;
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
      this.formUpload.ckey = this.formInline.ckey == 'all:all' ? this.defaultChannel : this.formInline.ckey;
      this.isUpload = true;
    },
    addsEvent() {
      if (!this.formUpload.ckey) {
        Message({
          showClose: true,
          message: "请选择频道！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formUpload.uids) {
        Message({
          showClose: true,
          message: "请导入用户uid！",
          type: "error",
          duration: 1000
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
      params.append('cid', keyArr[1]);
      params.append('channel_history', keyArr[0]);
      params.append('channel_whitelist', JSON.stringify(this.formUpload.uids));
      params.append('username', this.email);
      params.append('cip', 230);
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
            duration: 1000
          });
          this.onSearch();
        } else {
          Message({
            showClose: true,
            message: res.msg || "操作失败！",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    getExcel(val) {
      this.formUpload.uids = val;
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
      this.formInline.mark != '' && (params['mark'] = this.formInline.mark);
      this.formInline.flevel != '' && (params['F_level'] = this.formInline.flevel);
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
          "状态"
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
          "status"
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
          "状态"
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
          "status"
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
          } else if(j === 'mark'){
            return v[j] === 1 ? '已编辑' : '未编辑';
          }else if(j === 'status'){
            return v[j] === 1 ? '在线上' : '已下线';
          } else if (
            j === "origin_degree" ||
            j === "vertical_degree" ||
            j === "health_degree"
          ) {
            return v[j] && `${v[j]}级` || '暂无';
          } else {
            return v[j];
          }
        })
      );
    }
  },
  watch: {
    channelList() {
      if (this.channelList && this.channelList.length > 0) {
        this.defaultChannel = `${this.channelList[0].channel_history}:${this.channelList[0].cid}`;
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
.pane-title-wrap {
  margin-bottom: 20px;
  .pane-title {
    font-size: 20px;
    color: #409eff;
    text-align: left;
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
</style>