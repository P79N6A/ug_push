<template>
  <el-row v-if="item">
    <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23" class="item-wrapper">
      <el-row>
        <div class="item-status-box clearfix">
          <span>No.{{index}}</span>
          <a class="item-status-mid" :href="item.link" target="_blank" title="查看微博详情">{{item.mid}}</a>
          <p class="item-mid-info" v-if="item.id && info[item.id]">相关信息：{{info[item.id]}}</p>
        </div>
      </el-row>
      <show-batch :item="item"></show-batch>
      <el-row type="flex" class="item-footer">
        <el-col class="footer-list">
          <i class="el-icon-share hidden-xs-only"></i>
          <label>转发 </label>
          <span>{{formatNum(item.reposts_count)}}</span>
        </el-col>
        <el-col class="footer-list">
          <i class="el-icon-chat-dot-round hidden-xs-only"></i>
          <label>评论 </label>
          <span>{{formatNum(item.comments_count)}}</span>
        </el-col>
         <el-col class="footer-list" style="border: 0">
          <i class="el-icon-thumb hidden-xs-only"></i>
          <label>点赞 </label>
          <span>{{formatNum(item.attitudes_count)}}</span>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { formatNum } from "@/utils";
import ShowBatch from "@/components/ShowBatch";

export default {
  name: "itemList",
  components: {
    ShowBatch
  },
  props: ["item", "index", "info"],
  data() {
    return {
      formatNum
    };
  },
  watch: {
    index() {},
    info() {},
    item() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.item-wrapper {
  margin-top: 10px;
  padding: 15px 10px 4px;
  background-color: #fff;
  font-size: 16px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  border: 2px solid #f0f2f5;
  border-radius: 5px;
  .item-status-box {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    span, a {
      color: #666;
      font-size: 14px;
    }
    .item-status-mid {
      font-weight: bold;
      text-decoration: underline;
      &:hover {
        color: #409eff;
      }
    }
    .item-mid-info {
      padding-top:10px;
      font-size: 14px;
      color: #e6a23c;
    }
  }
  .item-footer {
    margin-top: 10px;
    padding: 10px 0;
    color: #666;
    border-top: 1px solid #f2f2f5;
    .footer-list {
      font-size: 12px;
      text-align: center;
      border-right: 1px solid #ccc;
    }
  }
}
</style>
