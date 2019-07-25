<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-service hidden-xs-only" style="margin-right: 6px;"></i>我的频道 {{cname}}</h6>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="23" v-if="channelList && channelList.length > 0">
        <!-- <el-form inline :model="formInline" size="small">
          <el-form-item label="选择频道">
            <el-select v-model="formInline.ckey" filterable placeholder="请选择频道" @change="onSearch">
              <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
            </el-select>
          </el-form-item>
        </el-form> -->
        <div class="clearfix">
          <el-form inline :model="formInline" size="mini" class="left">
            <el-form-item label=" 选择频道">
              <el-select v-model="formInline.ckey" filterable placeholder="请选择频道" @change="onSearch">
                <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <operate-channel class="left" v-if="channelData && channelData[0]" :data="channelData[0]" :callback="onSearch"></operate-channel>
        </div>
        <div v-if="channelData && channelData[0]">
          <div class="item-box">
            <label>【频道名称】</label>
            <el-tag>{{channelData[0].channel_name}}</el-tag>
          </div>
          <div class="item-box">
            <label>【繁体名称】</label>
            <el-tag>{{channelData[0].channel_name_tw || '暂无'}}</el-tag>
          </div>
          <div class="item-box">
            <label>【英文名称】</label>
            <el-tag>{{channelData[0].channel_name_us || '暂无'}}</el-tag>
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
          <div v-if="channelData[0].channel_history === 0">
            <div class="item-box">
              <label>【物料库物料库物料有效期】</label>
              <el-tag type="warning">{{formatExpiredTime(channelData[0].channel_expired_timestamp)}}</el-tag>
            </div>
            <div class="item-box">
              <label>【排序方式】</label>
              <el-tag type="info">{{getRankType(channelData[0].triggers)}}</el-tag>
            </div>
            <div class="item-box clearfix">
              <label class="left">【物料加权】</label>
              <el-checkbox-group class="left" v-model="priorityList" disabled>
                <el-checkbox label="channel_video_priority">视频</el-checkbox>
                <el-checkbox label="channel_pic_priority">图片</el-checkbox>
                <el-checkbox label="channel_article_priority">文章</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="item-box">
              <label>【UID白名单加权】</label>
              <el-tag type="info">{{setUidPriority(channelData[0].triggers)}}</el-tag>
            </div>
            <div class="item-box">
              <label>【是否放开物料分发限制】</label>
              <el-tag type="info">{{channelData[0].triggers && channelData[0].triggers.indexOf('cancel_limit') > -1 ? '是' : '否'}}</el-tag>
            </div>
            <div class="item-box">
              <label>【不过物料基础门槛】</label>
              <el-tag type="info">{{channelData[0].triggers && channelData[0].triggers.indexOf('more_doc') > -1 ? '是' : '否'}}</el-tag>
            </div>
            <div class="item-box">
              <label>【运营图标】</label>
              <el-form size="mini" class="inner-form-box" disabled>
                <el-form-item label="配置个数">
                  <el-tag type="info">{{channelData[0].cardlist && channelData[0].cardlist.length || 0}}</el-tag>
                </el-form-item>
                <div v-if="channelData[0].cardlist && channelData[0].cardlist.length > 0">
                  <el-form-item :label="`位置${idx+1}`" :key="idx" v-for="(obj, idx) in channelData[0].cardlist">
                    <el-input v-model="obj.title_sub" placeholder="图标底部对应文案" style="max-width: 180px"></el-input>
                    <el-input v-model="obj.pic" placeholder="图标地址" style="max-width: 360px" type="textarea" autosize></el-input>
                    <el-input v-model="obj.scheme" placeholder="链接跳转地址" style="max-width: 360px" type="textarea" autosize></el-input>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </div>
          <div class="item-box" v-if="channelData[0].channel_id">
            <label>【频道 ID】</label>
            <el-tag type="success">{{channelData[0].channel_id}}</el-tag>
          </div>
          <div class="item-box" v-if="channelData[0].channel_history === 0 && channelData[0].channel_id">
            <label>【在线预览】</label>
            <el-input style="max-width: 280px;" v-model="uid" placeholder="请输入uid 再预览" clearable>
              <el-button type="primary" slot="append" @click="toDetailPage()">在线预览频道</el-button>
            </el-input>
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
import OperateChannel from "@/views/channel/center/showchannel/operate";

export default {
  name: "minePage",
  components: {
    Auth,
    OperateChannel
  },
  data() {
    return {
      cname: "",
      formInline: {
        ckey: ""
      },
      uid: "",
      priorityList: []
    };
  },
  computed: {
    ...mapGetters([
      "pageAuth",
      "email",
      "channelList",
      "channelData",
      "channelApi"
    ])
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
    },
    toDetailPage() {
      if (!this.uid) {
        Message({
          showClose: true,
          message: "预览前，请先填写uid！",
          type: "error",
          duration: 3000
        });
        return;
      }
      location.href = `/hot/#/hotcenter/channel/material?cname=${this.channelData[0].channel_name}&channelid=${this.channelData[0].channel_id}&uid=${this.uid}`;
    },
    formatExpiredTime(timestamp) {
      const day = Math.floor(timestamp / (24 * 3600));
      const hour = Math.round((timestamp % (24 * 3600))/3600);
      const dayStr = day && `${day}天` || '';
      const hourStr = hour && `${hour}小时` || '';
      if (!dayStr && !hourStr) {
        return '0小时';
      } else {
        return dayStr + hourStr;
      }
    },
    getRankType(str) {
      const arr = str.split(',');
      let res = "";
      let rankStr = "自定义排序 ctr序";
      for (let i=0;i<arr.length; i++) {
        if(arr[i].indexOf('rank_channel_') > -1) {
          res = arr[i];
          break;
        }
      }
      const hourStr = 'rank_channel_split_by_hour_';
      const timeStr = 'rank_channel_time_segement_';
      const weekStr = 'rank_channel_tvshow_weekly_';
      if (res === 'rank_channel_by_time') {
        rankStr = "自定义排序 时间序"
      } else if (res.indexOf(hourStr) > -1) {
        rankStr = `持续热点事件排序 ${res.split(hourStr)[1]}小时`;
      } else if (res.indexOf(timeStr) > -1) {
        const timeArr = res.split(timeStr)[1].split('_');
        this.rank_by_time = timeArr;
        rankStr = `持续热度节目排序 ${timeArr[0]}-${timeArr[1]}`;
      } else if (res.indexOf(weekStr) > -1) {
        const weekArr = res.split(weekStr)[1].split('_');
        this.rank_by_weekly_day = Number(weekArr[0]);
        this.rank_by_weekly_time = weekArr[1];
        rankStr = `周期性节目排序 星期${this.numUpperCase(weekArr[0])} ${weekArr[1]}`;
      }

      return rankStr;
    },
    numUpperCase(n) {
      let res = '一';
      switch (Number(n)) {
        case 1: 
          res = '一'; break;
        case 2: 
          res = '二'; break;
        case 3: 
          res = '三'; break;
        case 4: 
          res = '四'; break;
        case 5: 
          res = '五'; break;
        case 6: 
          res = '六'; break;
        case 7: 
          res = '日'; break;
      }
      return res;
    },
    setMaterialPriority() {
      this.priorityList = [];
      this.pushMaterial('channel_video_priority');
      this.pushMaterial('channel_pic_priority');
      this.pushMaterial('channel_article_priority');
    },
    pushMaterial(val) {
      this.channelData[0].triggers.indexOf(val) > -1 && this.priorityList.push(val);
    },
    setUidPriority(str) {
      let res = [];
      const arr = str.split(',');
      for (let i=0;i<arr.length; i++) {
        if(arr[i].indexOf('channel_uid_priority_') > -1) {
          res.push(arr[i].split('channel_uid_priority_')[1]);
        }
      }
      return res.join('、') || '暂无';
    },
  },
  created() {
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    },
    channelList() {
      if (this.channelList && this.channelList[0] && this.channelList[0].cid) {
        this.formInline.ckey = `${this.channelList[0].channel_history}:${
          this.channelList[0].cid
        }`;
        this.onSearch();
      }
    },
    channelData() {
      this.channelData && (this.cname = this.channelData[0].channel_name);
      this.setMaterialPriority();
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
  .content-box-wrap {
    padding: 14px;
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
.inner-form-box {
  margin-top: 10px;
  margin-left: 24px;
  padding: 10px;
  border: 1px dashed #ddd;
  border-radius: 5px;
}
</style>