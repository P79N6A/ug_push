<template>
    <el-main>
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">
                <i class="el-icon-news hidden-xs-only" style="margin-right: 6px;"></i>达尔文推荐系统</h6>
        </el-row>
        <el-row class="search-form-wrap">
            <el-form :model="formInline" size="small">
                <el-form-item>
                    <el-input autosize type="textarea" v-model.trim="formInline.url" placeholder="请输入" clearable></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-search" @click="onSearch">
                    <span class="hidden-xs-only">查询</span>
                  </el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="content-box-wrap" v-if="datalist && datalist.length > 0">
          <item-list :key="item.id" :item="item" :index="idx+1" v-for="(item, idx) in datalist"></item-list>
        </el-row>
        <el-row v-else style="padding: 10px;text-align: center;color: #ccc;">{{tips}}</el-row>
    </el-main>
</template>

<script>
import ItemList from "./components/ItemList";
import { Message } from "element-ui";
import { mapGetters } from "vuex";
import { formatNum, parsePercent, parseTime } from "@/utils";

export default {
  name: "freshreview",
  components: {
    ItemList
  },
  data() {
    return {
      formInline: {
          url: ""
      },
      datalist: null,
      tips: "暂无数据"
    };
  },
  methods: {
    onSearch() {
      this.tips =  "Loading···";
      let params = new URLSearchParams();
      params.append("url", this.formInline.url);
      params.append("cip", 230);
      const data = {
        url: "/dataview/darwinView",
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
          this.datalist = res.result && res.result.results || '';
          this.tips = this.datalist ? '' : "暂无数据";
        } else {
          Message({
            showClose: true,
            message: res.msg || "数据获取失败！",
            type: "error",
            duration: 3000
          });
          this.datalist = '';
          this.tips = "暂无数据";
        }
      }, err => {
        Message({
          showClose: true,
          message: "数据获取接口请求失败！",
          type: "error",
          duration: 3000
        });
        this.datalist = '';
        this.tips = "暂无数据";
      });
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
      return parsePercent(num);
    },
    _parseTime(time, cFormat) {
      return parseTime(time, cFormat);
    }
  }
};
</script>

<style lang="scss" scoped>
body {
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
      padding-right: 14px;
      padding-top: 18px;
      background-color: #fff;
      border-bottom: 1px solid #f0f2f5;
    }
    .content-box-wrap {
      padding: 10px;
      .content-box-title {
        padding: 10px 0;
        border-bottom: 1px dashed #ddd;
      }
      .stats-box {
        padding-top: 10px;
      }
      .data-list-title,.stats-title {
        display: inline-block;
        padding: 5px 20px;
        font-size: 14px;
        color: #409eff;
      }
      .data-list-title {
        margin-top: 30px;
        border-bottom: 2px solid #409eff;
      }
      .color-box {
        margin-top: 10px;
        font-size: 12px;
        text-align: center;
        .color-box-item {
          margin-left: 10px;
        }
      }
    }
    .user-btn {
      color: #f56c6c;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
