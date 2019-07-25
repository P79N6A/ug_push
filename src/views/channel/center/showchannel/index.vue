<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>频道列表</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24">
        <el-form inline :model="formInline" size="mini">
          <el-form-item label="">
            <el-input v-model="formInline.cname" placeholder="请输入频道名称" clearable></el-input>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch" size="mini">
            <span class="hidden-xs-only">查询</span>
          </el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="24">
        <el-row v-if="channelData">
          <el-table :data="channelData" style="width: 100%" max-height="600" border stripe size="mini">
            <el-table-column type="index" align="center" width="50" label="序号" fixed>
            </el-table-column>
            <el-table-column fixed align="center" prop="channel_name" label="频道名称">
              <template slot-scope="scope">
                <a v-if="scope.row.channel_history === 1">{{scope.row.channel_name}}</a>
                <a v-else class="link-btn" target="_blank" :href="`/hot/#/hotcenter/channel/material?cname=${scope.row.channel_name}&containerid=102803_ctg1_${scope.row.channel_id}_-_ctg1_${scope.row.channel_id}`">{{scope.row.channel_name}}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="channel_id" label="频道id">
              <template slot-scope="scope">{{scope.row.channel_id || '--'}}</template>
            </el-table-column>
            <el-table-column align="center" prop="channel_name_tw" label="繁体名称">
              <template slot-scope="scope">{{scope.row.channel_name_tw || '暂无'}}</template>
            </el-table-column>
            <el-table-column align="center" prop="channel_name_us" label="英文名称">
              <template slot-scope="scope">{{scope.row.channel_name_us || '暂无'}}</template>
            </el-table-column>
            <el-table-column align="center" prop="channel_history" label="频道属性">
              <template slot-scope="scope">{{scope.row.channel_history === 1 ? '历史频道' : '自定义频道'}}</template>
            </el-table-column>
            <el-table-column align="center" prop="channel_type" label="频道类型">
              <template slot-scope="scope">{{scope.row.channel_type || '--'}}</template>
            </el-table-column>
            <el-table-column width="200" align="center" prop="" label="运营时间">
              <template slot-scope="scope">
                <span v-if="scope.row.stat_time">{{parseTime(scope.row.stat_time, '{y}-{m}-{d}')}} 到 {{parseTime(scope.row.end_time, '{y}-{m}-{d}')}}</span>
                <span v-else>--</span>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="source" label="内容来源">
              <template slot-scope="scope">{{scope.row.source || '--'}}</template>
            </el-table-column>
            <el-table-column align="center" prop="tag_id" label="分类选择">
              <template slot-scope="scope">{{scope.row.tag_id || '--'}}</template>
            </el-table-column>
            <el-table-column align="center" prop="order" label="排序方式">
              <template slot-scope="scope">{{scope.row.order || '--'}}</template>
            </el-table-column>
            <el-table-column align="left" label="操作项">
              <template slot-scope="scope">
                <operate-channel :option="scope.row" :callback="onSearch"></operate-channel>
              </template>
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
import { parseTime } from "@/utils";
import { Message } from "element-ui";
import OperateChannel from "./operate";

export default {
  name: "ChannelList",
  components: {
    Auth,
    OperateChannel
  },
  data() {
    return {
      parseTime,
      dialogVisible: false,
      formInline: {
        cname: ""
      },
      channelData: []
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.onSearch();
      }
    },
    onSearch() {
      this.getChannels().then(() => {}, err => {
        Message({
          showClose: true,
          message: err,
          type: "error",
          duration: 3000
        });
      });
    },
    getChannels() {
      //获取所有频道列表
      return new Promise((resolve, reject)=> {
        const data = {
          url: "/channel_auth/getChannelList",
          params: {
            channel_name: this.formInline.cname,
            username: this.email,
            cip: 230
          }
        };
        this.$store.dispatch("CommonGet", data).then(res => {
          if (res.code && Number(res.code) == 200) {
            this.channelData = res.result;
            resolve();
          } else {
            reject(res.msg || '频道列表获取失败！');
          }
        }, err => {
          reject('频道列表获取接口请求失败！');
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