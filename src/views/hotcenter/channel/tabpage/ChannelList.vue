<template>
  <div>
    <el-row type="flex" justify="center" class="pane-title-wrap">
      <el-col :span="23">
        <h6 class="pane-title">
          <i class="el-icon-document" style="margin-right: 6px;"></i>频道列表</h6>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-form inline :model="formInline">
          <el-form-item label="">
            <el-input v-model="formInline.cname" placeholder="请输入频道名称" clearable></el-input>
          </el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch"><span class="hidden-xs-only">查询</span></el-button>
        </el-form>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-row v-if="channelData">
          <el-table :data="channelData" style="width: 100%" max-height="600" border stripe>
            <el-table-column type="index" align="center" width="50" label="序号" fixed>
            </el-table-column>
            <el-table-column fixed align="center" prop="channel_name" label="频道名称">
              <template slot-scope="scope">
                <a v-if="scope.row.channel_history === 1">{{scope.row.channel_name}}</a>
                <a v-else class="link-btn" target="_blank"  :href="`/hot/#/hotcenter/channel/material?cname=${scope.row.channel_name}&containerid=102803_ctg1_${scope.row.channel_id}_-_ctg1_${scope.row.channel_id}`">{{scope.row.channel_name}}</a>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="channel_id" label="频道id">
              <template slot-scope="scope">{{scope.row.channel_id || '--'}}</template>
            </el-table-column>
            <el-table-column align="center" prop="channel_history" label="频道属性">
                <template slot-scope="scope">{{scope.row.channel_history === 1 ? '历史频道' : '自定义频道'}}</template>
            </el-table-column>
            <el-table-column align="center" prop="channel_type" label="频道类型">
                <template slot-scope="scope">{{scope.row.channel_type || '--'}}</template>
            </el-table-column>
            <el-table-column width="160" align="center" prop="" label="运营时间">
              <template slot-scope="scope">
                  <span v-if="scope.row.stat_time">{{_parseTime(scope.row.stat_time, '{y}-{m}-{d}')}} 到 {{_parseTime(scope.row.end_time, '{y}-{m}-{d}')}}</span>
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
            <!-- <el-table-column align="left" label="操作项">
              <template slot-scope="scope">
                <operate-channel :data="scope.row" :formInline="formInline" :callback="onSearch"></operate-channel>
              </template>
            </el-table-column> -->
          </el-table>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";
import OperateChannel from "./operate/channel";

export default {
  name: "channelList",
  components: {
    OperateChannel
  },
  data() {
    return {
      dialogVisible: false,
      formInline: {
        cname: "",
      },
      channelData: []
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email", "allChannel"])
  },
  methods: {
    onSearch() { //获取所有频道列表
      const data = {
        url: "/channel_auth/getChannelList",
        params: {
          channel_name: this.formInline.cname,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("GetChannelList", data).then(res => {
          if (res.code && Number(res.code) == 200) {
              this.channelData = res.result;
          }
      });
    },
    _parseTime(time, option) {
      return parseTime(time, option);
    }
  },
  watch: {
    allChannel() {
      this.allChannel && this.allChannel.length > 0 && (this.channelData = this.allChannel);
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
</style>