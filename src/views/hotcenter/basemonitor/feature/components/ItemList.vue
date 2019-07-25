<template>
  <el-row v-if="item">
    <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23" class="item-wrapper">
      <el-row>
        <div class="item-status-box clearfix">
          <span>NO.{{index}}</span>
          <a class="item-status-mid" :href="`http://172.16.139.44:65531/?mids=${item.mid}&region=21`" target="_blank" title="查看微博详情">{{item.mid}}</a>
        </div>
      </el-row>
      <show-batch v-if="showbatchData" :item="showbatchData"></show-batch>
      <el-row type="flex" class="item-footer">
        <el-col class="footer-list">
          <label>曝光 </label>
          <span>{{formatNum(item.expo)}}</span>
        </el-col>
        <el-col class="footer-list">
          <label>点击率 </label>
          <span>{{formatNum(item.ctr)}}</span>
        </el-col>
        <el-col class="footer-list">
          <label>互动率 </label>
          <span>{{formatNum(item.itr)}}</span>
        </el-col>
         <el-col class="footer-list" style="border: 0">
          <label>时长 </label>
          <span>{{formatNum(item.dur)}}</span>
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
      formatNum,
      showbatchData: false
    };
  },
  methods: {
    init() {
      this.showbatchData = this.item.showbatch && this.item.showbatch[0] ? this.item.showbatch[0] : false;
    }
  },
  created() {
    this.init();
  },
  watch: {
    item() {
      this.init();
    },
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
