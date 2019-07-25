<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-edit-outline hidden-xs-only" style="margin-right: 6px;"></i>频道授权</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="channelData && channelData.length > 0">
        <el-form inline :model="formInline" v-if="channelData" size="mini">
          <el-form-item label="邮箱前缀">
            <el-input v-model="formInline.userid" placeholder="请输入用户邮箱前缀" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择频道">
            <el-select v-model="formInline.ckey" filterable placeholder="请选择频道">
              <el-option label="所有频道" value="all:all"></el-option>
              <el-option v-for="(item, key) in channelData" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-search" @click="onSearch">
              <span class="hidden-xs-only">查询</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="24">
        <div style="padding: 10px 0;" class="clearfix" v-if="channelData && channelData.length > 0">
          <el-button type="success" size="mini" class="left" @click="showAdd()">添加授权用户</el-button>
        </div>
        <el-dialog title="添加授权用户" :visible.sync="dialogVisible">
          <el-form :model="formWhite" size="small">
            <el-form-item label="选择频道" label-width="120px" required v-if="channelData">
              <el-select v-model="formWhite.ckey" filterable placeholder="请选择频道" clearable>
                <el-option v-for="(item, key) in channelData" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="邮箱前缀" label-width="120px" required>
              <el-input type="textarea" v-model="formWhite.userids" placeholder="输入用户邮箱前缀 多个值,分隔" clearable style="max-width: 194px"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-popover ref="popoverAdd" placement="top" width="200" v-model="formWhite.popover">
              <p>确定授权？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="formWhite.popover = false">取消</el-button>
                <el-button type="primary" round size="mini" @click="addEvent()">确定</el-button>
              </div>
            </el-popover>
            <el-button @click="cancelEvent()" size="small">取 消</el-button>
            <el-button type="primary" v-popover:popoverAdd size="small">添 加</el-button>
          </div>
        </el-dialog>
        <el-row v-if="userlist && userlist.data">
          <el-table :data="userlist.data" style="width: 100%" border stripe size="mini">
            <el-table-column align="left" prop="username" label="用户">
            </el-table-column>
            <el-table-column align="left" prop="channellist" label="频道">
              <template slot-scope="scope">{{getChannelName(scope.row.channellist)}}</template>
            </el-table-column>
            <el-table-column width="160" align="left" prop="modify_time" label="授权时间">
            </el-table-column>
            <el-table-column align="left" prop="operator" label="操作人">
            </el-table-column>
            <el-table-column align="left" label="操作项">
              <template slot-scope="scope">
                <operate-authuser :data="scope.row" :default-channel="defaultChannel" :channels="channelData" :callback="onSearch"></operate-authuser>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding-top: 10px;overflow: auto;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.curPage" :page-sizes="[5, 10, 20]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="formInline.total">
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
import { parseTime } from "@/utils";
import { Message } from "element-ui";
import OperateAuthuser from "./operate";

export default {
  name: "accredit",
  components: {
    Auth,
    OperateAuthuser
  },
  data() {
    return {
      userlist: null,
      dialogVisible: false,
      defaultChannel: "",
      channelData: [],
      formInline: {
        ckey: "all:all",
        userid: "",
        curPage: 1,
        count: 5,
        total: 0
      },
      formWhite: {
        userids: "",
        ckey: "",
        popover: false
      }
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getChannels().then(() => {
          if (this.channelData && this.channelData.length > 0) {
            this.defaultChannel = `${this.channelData[0].channel_history}:${
              this.channelData[0].cid
            }`;
            this.onSearch();
          }
        }, err => {
          Message({
            showClose: true,
            message: err,
            type: "error",
            duration: 3000
          });
        });
      }
    },
    getChannels() {
      return new Promise((resolve, reject) => {
        const data = {
          url: "/channel_auth/getChannelList",
          params: {
            channel_name: "",
            username: this.email,
            cip: 230
          }
        };
        this.$store.dispatch("CommonGet", data).then(res => {
          if (res.code && Number(res.code) == 200) {
            this.channelData = res.result || [];
            resolve();
          } else {
            reject(res.msg || '频道列表获取失败！');
          }
        }, err => {
          reject('频道列表获取接口请求失败！');
        });
      });
    },
    onSearch() {
      const keyArr = this.formInline.ckey.split(":");
      const data = {
        url: "/channel_auth/getChannelAuthByCid",
        params: {
          cid: keyArr[1],
          channel_history: keyArr[0],
          userid: this.formInline.userid,
          username: this.email,
          page: this.formInline.curPage,
          count: this.formInline.count,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.userlist = res.result;
          this.userlist && (this.formInline.total = this.userlist.total || 0);
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
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
      if (!this.formWhite.userids) {
        Message({
          showClose: true,
          message: "请输入用户邮箱前缀！",
          type: "error",
          duration: 1000
        });
        return;
      }
      this.dialogVisible = false;
      const data = {
        url: "/channel_auth/addChannelAuth",
        params: {
          channellist: this.formWhite.ckey,
          userids: this.formWhite.userids,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.cancelEvent();
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
    cancelEvent() {
      this.dialogVisible = false;
      this.formWhite = {
        userids: "",
        ckey: ""
      };
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
    getChannelName(list) {
      let res = "暂无";
      if (list && list.length > 0) {
        let arr = [];
        for (let i = 0; i < list.length; i++) {
          arr.push(list[i].channel_name);
        }
        res = arr.join("、");
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
</style>