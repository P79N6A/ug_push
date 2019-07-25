<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap">
            <el-col :span="24">
                <h6 class="pane-title">
                    <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>物料召回查询</h6>
            </el-col>
        </el-row>
        <el-row class="search-form-wrap">
            <el-col :span="24" v-if="channelList && channelList.length > 0">
                <el-form inline :model="formInline" size="mini">
                    <el-form-item label="选择频道">
                        <el-select v-model="formInline.channel_id" filterable placeholder="请选择频道">
                            <el-option v-for="(item, key) in channelList" :key="key" :label="item.channel_name" :value="item.channel_id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="mid">
                        <el-input v-model.trim="formInline.mid" placeholder="请输入mid" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSearch">
                            <span class="hidden-xs-only">查询</span>
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <p v-else class="none-tips">{{tips}}</p>
        </el-row>
        <el-row class="content-box-wrap" v-if="result">
            <el-table :data="[result]" style="width: 100%" border stripe size="mini">
                <el-table-column prop="reason" label="召回理由">
                    <template slot-scope="scope">{{scope.row.reason || '未知'}}</template>
                </el-table-column>
                <el-table-column prop="from" label="数据来源">
                    <template slot-scope="scope">{{scope.row.from || '未知'}}</template>
                </el-table-column>
            </el-table>
        </el-row>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
        <auth></auth>
    </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";

export default {
  name: "MaterialRecall",
  components: {
    Auth
  },
  data() {
    return {
      formInline: {
        channel_id: "",
        mid: ""
      },
      channelList: null,
      result: null,
      tips: "loading…"
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getChannelList();
      }
    },
    getChannelList() {
      const data = {
        url: "/channel/getAuthChannelList",
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res && res.code == 200) {
            if (res.result && res.result.length > 0) {
              this.channelList = res.result;
              this.formInline.channel_id = this.channelList[0].channel_id || "";
            } else {
              this.tips = "暂无有权限的频道";
            }
          } else {
            this.tips = res.msg || "频道列表获取失败";
          }
        },
        err => {
          this.tips = "频道列表获取失败";
        }
      );
    },
    onSearch() {
      if (!this.formInline.channel_id) {
        Message({
          showClose: true,
          message: "请选择频道！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.formInline.mid) {
        Message({
          showClose: true,
          message: "请填写要查询的mid！",
          type: "error",
          duration: 3000
        });
        return;
      }
      const tempData = {
        url: "http://10.75.28.123:39988/fk",
        param: this.formInline
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.result = res.result;
          } else {
            Message({
              showClose: true,
              message: res.msg || "物料召回理由查询失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "物料召回理由查询接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
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