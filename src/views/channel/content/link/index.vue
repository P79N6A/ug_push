<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>{{title}}</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="channelList && channelList.length > 0">
        <el-form inline :model="formInline" v-if="channelList" size="mini">
          <el-form-item label="URL">
            <el-input v-model="formInline.url" placeholder="请输入URL" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择频道">
            <el-select v-model="formInline.ckey" filterable placeholder="请选择频道">
              <el-option label="所有频道" value="all:all"></el-option>
              <el-option v-if="isValid(item)" v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
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
        <div style="padding: 10px 0;" class="clearfix" v-if="channelList && channelList.length > 0">
          <el-button type="success" size="mini" class="left" @click="showAdd()">添加URL</el-button>
        </div>
        <el-dialog title="添加URL" :visible.sync="dialogVisible">
          <el-form :model="formAdd" size="small">
            <el-form-item label="选择频道" label-width="120px" required v-if="channelList">
              <el-select v-model="formAdd.ckey" filterable placeholder="请选择频道" clearable>
                <el-option v-if="isValid(item)" v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="URL" label-width="120px" required>
              <el-input type="textarea" :autosize="{ minRows: 4}" v-model="formAdd.url" placeholder="请输入URL" clearable style="max-width: 400px"></el-input>
            </el-form-item>
          </el-form>
          <div style="color: #e6a23c;text-align: right;">此处只支持单个添加，一次性添加多个请联系
            <a class="link-btn" title="QQ联系">@侯雷平（QQ：35675340）、 @李坤（QQ：46163936）</a>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-popover ref="popoverAdd" placement="top" width="200" v-model="formAdd.popover">
              <p>确定添加URL？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="formAdd.popover = false">取消</el-button>
                <el-button type="primary" round size="mini" @click="addEvent()">确定</el-button>
              </div>
            </el-popover>
            <el-button @click="cancelEvent()" size="small">取 消</el-button>
            <el-button type="primary" v-popover:popoverAdd size="small">添 加</el-button>
          </div>
        </el-dialog>
        <el-row v-if="urlList && urlList.data">
          <el-table :data="urlList.data" style="width: 100%" border stripe size="mini">
            <el-table-column fixed align="left" prop="url" label="URL">
            </el-table-column>
            <el-table-column align="left" prop="channel_name" label="频道">
            </el-table-column>
            <el-table-column align="left" prop="create_time" label="添加时间">
              <template slot-scope="scope">{{_parseTime(scope.row.create_time, '{y}-{m}-{d} {h}:{i}:{s}')}}</template>
            </el-table-column>
            <el-table-column align="left" prop="operator" label="操作人">
            </el-table-column>
            <el-table-column width="70" align="left" prop="status" label="状态">
              <template slot-scope="scope">{{scope.row.status === 1 ? '在线上' : '已下线'}}</template>
            </el-table-column>
            <el-table-column align="left" label="操作项" min-width="90">
              <template slot-scope="scope">
                <operate-link :data="scope.row" :kapi="kapi" :callback="onSearch"></operate-link>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding-top: 10px;overflow: auto;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.curPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="5" layout="total, sizes, prev, pager, next, jumper" :total="formInline.total">
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
import OperateLink from "./operate";

export default {
  name: "urlList",
  components: {
    Auth,
    OperateLink
  },
  data() {
    return {
      title: "URL黑名单（活动频道）",
      kapi: {
        //URL黑名单API
        get: "/channel/getUrlBlackByCid",
        add: "/channel/addCUrlBlack",
        set: "/channel/setCUrlBlackStatus",
        del: "/channel/delCUrlBlack"
      },
      dialogVisible: false,
      defaultChannel: "",
      formInline: {
        ckey: "all:all",
        url: "",
        curPage: 1,
        count: 5,
        total: 0
      },
      formAdd: {
        url: "",
        ckey: "",
        popover: false
      },
      urlList: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email", "channelList", "channelApi"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.setChannelList();
      }
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
      const data = {
        url: this.kapi.get,
        params: {
          cid: keyArr[1],
          channel_history: keyArr[0],
          url: this.formInline.url,
          username: this.email,
          page: this.formInline.curPage,
          count: this.formInline.count,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        this.urlList = res && res.result;
      });
    },
    showAdd() {
      this.formAdd.ckey =
        this.formInline.ckey == "all:all"
          ? this.defaultChannel
          : this.formInline.ckey;
      this.dialogVisible = true;
    },
    addEvent() {
      //添加单个URL
      this.formAdd.popover = false;
      if (!this.formAdd.ckey) {
        Message({
          showClose: true,
          message: "请选择频道！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formAdd.url) {
        Message({
          showClose: true,
          message: "请输入URL！",
          type: "error",
          duration: 1000
        });
        return;
      }
      this.dialogVisible = false;
      const keyArr = this.formAdd.ckey.split(":");
      const data = {
        url: this.kapi.add,
        params: {
          cid: keyArr[1],
          channel_history: keyArr[0],
          url: this.formAdd.url,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          const tips = res.msg || "success";
          Message({
            showClose: true,
            message: tips,
            type: "success",
            duration: 1000
          });
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
      this.formAdd = {
        url: "",
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
    isValid(obj) {
      //筛选活动频道，确认是否需要过滤掉不在运营时间范围内的？
      return obj.channel_history === 0 ? true : false;
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
        this.onSearch();
      }
    },
    urlList() {
      this.urlList && (this.formInline.total = this.urlList.total);
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
</style>