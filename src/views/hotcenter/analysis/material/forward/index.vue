<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">
        <i class="el-icon-news hidden-xs-only" style="margin-right: 6px;"></i>转发物料</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form inline size="small">
        <el-form-item label="F层级">
          <el-select style="width: 120px;" v-model="formInline.user_type" placeholder="请选择F层级" size="small">
            <el-option label="全部" value=""></el-option>
            <el-option label="F0转发" value="0"></el-option>
            <el-option label="F1转发" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序方式">
          <el-select style="width: 140px;" v-model="formInline.sort_type" placeholder="请选择排序方式" size="small" clearable>
            <el-option label="曝光值" value="expo"></el-option>
            <el-option label="点击值" value="click_num"></el-option>
            <el-option label="点击率" value="click_rate"></el-option>
            <el-option label="热度值" value="hot_num"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="搜索方式">
          <el-select style="width: 70px;" v-model="way" placeholder="请选择" size="small">
            <el-option label="mid" value="mid"></el-option>
            <el-option label="uid" value="uid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input style="width: 100%;max-width: 320px;" v-model="content" :placeholder="`请输入${way}`" clearable size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch" size="small">
            <span class="hidden-xs-only">查询</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="content-box-wrap">
      <div v-if="dataList && dataList.length > 0">
        <item-list :key="(formInline.page - 1) * formInline.count + idx + 1" :item="item" :index="(formInline.page - 1) * formInline.count + idx + 1" v-for="(item, idx) in dataList"></item-list>
      </div>
      <div v-else class="none-tips">{{tips}}</div>
      <div style="padding-top: 10px;overflow: auto;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[5, 10, 20, 30, 40]" :page-size="formInline.count" layout="total, sizes, prev, pager, next, jumper" :total="formInline.total">
        </el-pagination>
      </div>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import ItemList from "./components/ItemList";
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  name: "tagPage",
  components: {
    Auth,
    ItemList
  },
  data() {
    return {
      dataList: null,
      way: "mid",
      content: "",
      formInline: {
        mid: "",
        uid: "",
        user_type: "",
        sort_type: "",
        page: 1,
        count: 5
      },
      total: 0,
      tips: "loading…" //暂无数据
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.onSearch();
      }
    },
    onSearch() {
      this.formInline[this.way] = this.content;
      const tempData = {
        url: "http://10.85.115.126:6088/query_repeat_mid",
        param: this.formInline
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) === 200) {
          this.formInline.total = res.total_length || 0;
          this.dataList = res.data || null;
          this.tips = "暂无数据";
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
        } else {
          Message({
            showClose: true,
            message: res && res.msg || "转发物料获取失败",
            type: "error",
            duration: 3000
          });
          this.tips = "暂无数据";
        }
      });
    },
    handleSizeChange(val) {
      this.formInline.count = val;
      this.$store.dispatch("updateVideo", "");
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.$store.dispatch("updateVideo", "");
      this.onSearch();
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
body {
  .el-container {
    .el-noauth {
      background-color: #fff;
    }
  }
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
    .page-wrap {
      padding: 20px 0;
    }
  }
  .none-tips {
    margin-top: 10px;
    padding: 10px;
    font-size: 14px;
    text-align: center;
    color: #999;
    background-color: #fff;
    border-radius: 5px;
  }
}
</style>
