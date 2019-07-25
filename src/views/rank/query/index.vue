<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap">
            <el-col :span="24">
                <h6 class="pane-title">
                    <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>物料上榜查询</h6>
            </el-col>
        </el-row>
        <el-row class="search-form-wrap">
            <el-col :span="24">
                <el-form inline :model="formInline" size="mini">
                    <el-form-item label="mid">
                        <el-input v-model="formInline.mid" placeholder="请输入mid" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSearch">
                            <span class="hidden-xs-only">查询</span>
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="content-box-wrap">
            <el-col :span="8" :xs="24" v-if="on_board_list" class="table-wrap" style="margin-right: 10px;">
                <div class="table-title left">上榜列表</div>
                <el-table :data="on_board_list" style="width: 100%" border stripe size="mini">
                    <el-table-column prop="board_type" label="榜单类型">
                        <template slot-scope="scope">{{scope.row.board_type || '未知'}}</template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="15" :xs="24" v-if="reject_reason_list" class="table-wrap">
                <div class="table-title left">被拒榜单列表</div>
                <el-table :data="reject_reason_list" style="width: 100%" border stripe size="mini">
                    <el-table-column prop="board_type" label="榜单类型">
                        <template slot-scope="scope">{{scope.row.board_type || '未知'}}</template>
                    </el-table-column>
                    <el-table-column prop="reject_reason" label="原因">
                        <template slot-scope="scope">{{scope.row.reject_reason || '未知'}}</template>
                    </el-table-column>
                </el-table>
            </el-col>
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
        mid: "4293173360951194"
      },
      on_board_list: null,
      reject_reason_list: null
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
        url: "http://10.77.136.62:8083/query/mid",
        param: this.formInline
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.on_board_list = res.on_board_list;
            this.reject_reason_list = res.reject_reason_list;
          } else {
            Message({
              showClose: true,
              message: res.msg || "榜单查询失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "榜单查询接口异常！",
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
    .table-wrap {
      margin-bottom: 20px;
    }
    .table-title {
      padding: 5px 10px;
      color: #409eff;
      border-bottom: 2px solid #409eff;
      margin-bottom: 10px;
    }
  }
}
</style>