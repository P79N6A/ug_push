<template>
  <el-row v-if="item">
    <el-col v-if="item.showbatch" :xs="24" :sm="23" :md="23" :lg="23" :xl="23" class="item-wrapper">
      <el-row>
        <div class="item-status-box clearfix">
          <span>NO.{{index}}</span>
          <span class="item-status-mid">{{item.id}}</span>
          <span>{{item.recommend_title}}</span>
        </div>
      </el-row>
      <show-batch :item="item.showbatch"></show-batch>
      <el-row class="item-tag-box" v-if="item.tags_data">
        <span v-if="item.tags_data.first && item.tags_data.first.length > 0">
          <el-tag class="item-tag" size="small" :key="idx" v-for="(tag, idx) in (item.tags_data.first)">{{tag.name}} (1)</el-tag>
        </span>
        <span v-if="item.tags_data.second && item.tags_data.second.length > 0">
          <el-tag class="item-tag" type="success" size="small" :key="idx" v-for="(tag, idx) in (item.tags_data.second)">{{tag.name}} (2)</el-tag>
        </span>
        <span v-if="item.tags_data.third && item.tags_data.third.length > 0">
          <el-tag class="item-tag" type="warning" size="small" :key="idx" v-for="(tag, idx) in (item.tags_data.third)">{{tag.name}} (3)</el-tag>
        </span>
      </el-row>
      <el-row type="flex" class="item-footer" v-if="item.stat">
        <el-col :xs="24">
          <el-row>
            <el-col class="footer-list multiple-list" :xs="7">
              <label>曝光数 </label><br />
              <span>{{formatNum(item.stat.expose_num)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7">
              <label>点击数 </label><br />
              <span>{{formatNum(item.stat.act_num)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7">
              <label>热门流转 </label><br />
              <span>{{formatNum(item.stat.hot_ret_num)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7">
              <label>热门流评 </label><br />
              <span>{{formatNum(item.stat.hot_cmt_num)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7">
              <label>热门流赞 </label><br />
              <span>{{formatNum(item.stat.hot_like_num)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7">
              <label>热门流互动 </label><br />
              <span>{{formatNum(item.stat.inter_act_num)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7">
              <label>全站转 </label><br />
              <span>{{formatNum(item.stat.ret_num)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7">
              <label>全站评 </label><br />
              <span>{{formatNum(item.stat.cmt_num)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7">
              <label>全站赞 </label><br />
              <span>{{formatNum(item.stat.like_num)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7">
              <label>全站互动 </label><br />
              <span>{{formatNum((item.stat.ret_num || 0) + (item.stat.cmt_num || 0) + (item.stat.like_num || 0))}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7">
              <label>真实曝光 </label><br />
              <span>{{formatNum(item.stat.real_read_uv)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7" v-if="item.stat.real_read_uv">
              <label>人均阅读时长 </label><br />
              <span>{{formatNum((item.stat.real_read_duration_total / 1000) / item.stat.real_read_uv)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7" v-if="item.stat.expose_num">
              <label>点击率 </label><br />
              <span>{{formatNum(item.stat.act_num / item.stat.expose_num)}}</span>
            </el-col>
            <el-col class="footer-list multiple-list" :xs="7" v-if="item.stat.expose_num">
              <label>互动率 </label><br />
              <span>{{formatNum(item.stat.inter_act_num / item.stat.expose_num)}}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" class="item-footer" v-if="item.debuginfo">
        <el-col class="footer-list">
          <label>ctr模型预估分数 </label>
          <span>{{formatNum(item.debuginfo.predict_ctr)}}</span>
        </el-col>
        <el-col class="footer-list">
          <label>itr模型预估分数 </label>
          <span>{{formatNum(item.debuginfo.predict_itr)}}</span>
        </el-col>
        <el-col class="footer-list">
          <label>time模型预估分数 </label>
          <span>{{formatNum(item.debuginfo.predict_time)}}</span>
        </el-col>
         <el-col class="footer-list" style="border: 0">
          <label>最终模型预估分数 </label>
          <span>{{formatNum(item.debuginfo.predict_final)}}</span>
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
  props: ["item", "index"],
  data() {
    return {
      formatNum
    };
  },
  watch: {
    item() {},
    index() {}
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
    span {
      color: #666;
      font-size: 14px;
    }
    .item-status-mid {
      font-weight: bold;
      border-bottom: 1px solid #000;
    }
  }
  .item-tag-box {
    padding-top: 10px;
    .item-tag {
      margin-right: 5px;
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
    .multiple-list {
      margin: 2px;
      max-width: 110px;
      border: 1px solid #ccc;
    }
  }
}
</style>
