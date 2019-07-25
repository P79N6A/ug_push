<template>
  <div>
    <el-row class="pane-title-wrap" type="flex" justify="center">
      <el-col :span="23">
        <h6 class="pane-title">
          <i class="el-icon-service" style="margin-right: 6px;"></i>我的频道 {{cname}}</h6>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="23" v-if="channelList && channelList.length > 0">
        <el-form inline :model="formInline">
          <el-form-item label="选择频道">
            <el-select v-model="formInline.ckey" filterable placeholder="请选择频道" @change="onSearch">
              <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div v-if="channelData && channelData[0]">
          <div class="item-box">
            <label>【频道名称】</label>
            <el-tag>{{channelData[0].channel_name}}</el-tag>
          </div>
          <div class="item-box">
            <label>【频道属性】</label>
            <el-tag type="warning">{{channelData[0].channel_history === 1 ? '历史频道' : '自定义频道'}}</el-tag>
          </div>
          <div class="item-box" v-if="channelData[0].channel_type">
            <label>【频道类型】</label>
            <el-tag type="success">{{channelData[0].channel_type}}</el-tag>
          </div>
          <div class="item-box" v-if="channelData[0].stat_time">
            <label>【运营时间】</label>
            <el-tag type="danger">{{_parseTime(channelData[0].stat_time, '{y}-{m}-{d}')}} 到 {{_parseTime(channelData[0].end_time, '{y}-{m}-{d}')}}</el-tag>
          </div>
          <div class="item-box" v-if="channelData[0].source">
            <label>【内容来源】</label>
            <el-tag>{{channelData[0].source}}</el-tag>
          </div>
          <div class="item-box" v-if="channelData[0].tag_id">
            <label>【分类选择】</label>
            <el-tag type="warning">{{channelData[0].tag_id}}</el-tag>
          </div>
          <div class="item-box" v-if="channelData[0].order">
            <label>【排序方式】</label>
            <el-tag type="info">{{channelData[0].order}}</el-tag>
          </div>
          <div class="item-box" v-if="channelData[0].channel_id">
            <label>【频道 ID】</label>
            <el-tag type="success">{{channelData[0].channel_id}}</el-tag>
          </div>
          <div class="item-box" v-if="channelData[0].channel_history === 0 && channelData[0].channel_id">
            <label>【在线预览】</label>
            <a class="link-btn" target="_blank" :href="`/hot/#/hotcenter/channel/material?cname=${channelData[0].channel_name}&containerid=102803_ctg1_${channelData[0].channel_id}_-_ctg1_${channelData[0].channel_id}`">{{`在线预览${channelData[0].channel_name}频道`}}</a>
          </div>
        </div>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "minePage",
  data() {
    return {
      cname: "",
      formInline: {
        ckey: ""
      }
    };
  },
  computed: {
    ...mapGetters(["email", "channelList", "channelData", "channelApi"])
  },
  methods: {
    onSearch() {
      const keyArr = this.formInline.ckey.split(':');
      const data = {
        url: "/channel/getDetailByCid",
        params: {
          cid: keyArr[1],
          channel_history: keyArr[0],
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("GetChannelData", data);
    },
    _parseTime(time, option) {
      return parseTime(time, option);
    }
  },
  watch: {
    channelList() {
      if (this.channelList && this.channelList[0] && this.channelList[0].cid) {
        this.formInline.ckey = `${this.channelList[0].channel_history}:${this.channelList[0].cid}`;
        this.onSearch();
      }
    },
    channelData() {
      this.channelData && (this.cname = this.channelData[0].channel_name);
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
.item-box {
  padding: 10px 0;
  font-size: 14px;
  label {
    margin-right: 10px;
  }
  .link-btn {
    color: #409eff;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>