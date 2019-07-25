<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24" class="clearfix">
        <h6 class="pane-title left">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>频道数据统计</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24" v-if="channelList && channelList.length > 0">
        <el-form inline :model="formInline" v-if="channelList" label-position="left" size="mini">
          <el-form-item label="选择频道" label-width="70px">
            <el-select v-model="formInline.channel_id" filterable placeholder="请选择频道">
              <el-option label="所有频道" value="all"></el-option>
              <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="item.channel_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.data_date" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="选择开始日期">
            </el-date-picker>
            <el-date-picker style="margin-bottom: 5px;width: 170px;" v-model="formInline.end_date" type="date" format="yyyy年MM月dd日" value-format="yyyy-MM-dd" placeholder="选择结束日期">
            </el-date-picker>
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
    <el-row class="content-box-wrap" v-if="channelList && channelList.length > 0">
      <el-col :span="24">
        <el-row>
          <el-table :data="dataList" style="width: 100%" border stripe size="mini">
            <el-table-column type="index" fixed width="50" label="序号">
            </el-table-column>
            <el-table-column fixed prop="channel_name" label="频道名称" min-width="80">
            </el-table-column>
            <el-table-column prop="data_date" label="日期" min-width="90" sortable>
              <template slot-scope="scope">{{_parseTime(scope.row.data_date, '{y}-{m}-{d}')}}</template>
            </el-table-column>
            <el-table-column prop="refresh_user_num" label="刷新人数" min-width="94" sortable>
              <template slot-scope="scope">{{_formatNum(scope.row.refresh_user_num)}}</template>
            </el-table-column>
            <el-table-column prop="refresh_num" label="刷新次数" min-width="94" sortable>
               <template slot-scope="scope">{{_formatNum(scope.row.refresh_num)}}</template> 
            </el-table-column>
            <el-table-column prop="exposure_num" label="曝光量" min-width="90" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.exposure_num)}}</template> 
            </el-table-column>
            <el-table-column prop="interact_num" label="互动量" min-width="90" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.interact_num)}}</template> 
            </el-table-column>
            <el-table-column prop="k_click" label="千次曝光点击量" min-width="124" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.k_click)}}</template> 
            </el-table-column>
            <el-table-column prop="add_attention" label="加关注量" min-width="94" sortable>
                <template slot-scope="scope">{{_formatNum(scope.row.add_attention)}}</template> 
            </el-table-column>
            <el-table-column prop="morrow_rate" label="次日留存率" width="106" sortable>
                <template slot-scope="scope">{{_parsePercent(scope.row.morrow_rate)}}</template>
            </el-table-column>
            <el-table-column prop="three_rate" label="3日留存率" width="100" sortable>
                <template slot-scope="scope">{{_parsePercent(scope.row.three_rate)}}</template>
            </el-table-column>
            <el-table-column prop="seven_rate" label="7日留存率" width="100" sortable>
                <template slot-scope="scope">{{_parsePercent(scope.row.seven_rate)}}</template>
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
import { mapGetters } from "vuex";
import { formatNum, parsePercent, parseTime } from "@/utils";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";

export default {
  name: "ChannelStats",
  components: {
    Auth
  },
  data() {
    return {
      downloadLoading: false,
      defaultChannel: "",
      formInline: {
        channel_id: "all",
        data_date: "",
        end_date: ""
      },
      dataList: [],
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email", "channelList", "channelApi"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.setChannelList();
        this.formInline.data_date = parseTime(Date.now() - 3600 * 1000 * 24, "{y}-{m}-{d}");
        this.formInline.end_date = parseTime(Date.now() - 3600 * 1000 * 24, "{y}-{m}-{d}");
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
      let params = new URLSearchParams();
      params.append("channel_id", this.formInline.channel_id === 'all' ? this.getAllChannelId() : this.formInline.channel_id);
      params.append("data_date", this.formInline.data_date);
      params.append("end_date", this.formInline.end_date);
      params.append("username", this.email);
      params.append("cip", 230);
      const data = {
        url: "/channel/getChannelStatistics",
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.dataList = res.result;
        }
      });
    },
    getAllChannelId() {
        const arr = this.channelList;
        let res = [];
        for (let i=0;i<arr.length;i++) {
            res.push(arr[i].channel_id);
        }
        return res.join(',');
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
      return num ? parsePercent(num) : "0%";
    },
    _parseTime(time, option) {
      return parseTime(time, option);
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
        // this.formInline.channel_id = this.channelList[0].channel_id;
        this.onSearch();
      }
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