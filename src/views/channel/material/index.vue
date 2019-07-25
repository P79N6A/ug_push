<template>
    <el-main>
        <h2 class="channel-title">
            <label>{{cname}}频道</label>
        </h2>
        <div v-if="list && list.length > 0">
            <item-list :key="idx" :item="item" v-for="(item, idx) in list"></item-list>
            <p class="more-btn-box" @click="handleLoadMore()"><i v-if="!isDataOver" class="el-icon-plus"></i><span>{{moreBtnText}}</span></p>
        </div>
        <p v-else class="none-tips">{{tips}}</p>
    </el-main>
</template>

<script>
import ItemList from "./ItemList";
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";

export default {
  name: "datamonitor",
  components: {
    ItemList,
    Auth
  },
  data() {
    return {
      list: [],
      cname: "热门",
      containerid: "102803",
      tips: "加载中……",
      moreBtnText: "加载更多",
      isDataOver: false,
      dataStore: [],
      page: 0,
    };
  },
  methods: {
    init() {
      this.cname = this.$route.query.cname || "热门";
      this.channelid = this.$route.query.channelid || "";
      this.containerid = this.channelid && `102803_ctg1_${this.channelid}_-_ctg1_${this.channelid}` || "102803";
      this.uid = this.$route.query.uid || "2675435273";
      this.getList();
    },
    getList() {
      //获取频道物料
      const tempData = {
        url: "http://i.hot.weibo.com/mobile_trendtop/getlist",
        param: {
          networktype: "wifi",
          uicode: 10000495,
          fromlog: `102803${this.channelid}`,
          featurecode: 10000001,
          c: "android",
          ua: "OPPO-OPPO R9tm__weibo__8.10.2__android__android5.1",
          wm: "9847_0002",
          fid: this.containerid,
          v_p: 67,
          from: "108A295010",
          lang: "zh_CN",
          refresh: "pulldown",
          extparam: "discover|new_feed",
          need_jump_scheme: 1,
          tz: "Asia/Shanghai",
          lat: 40.03858,
          lon: 116.2709,
          uid: this.uid,
          count: 25,
          containerid: this.containerid,
          since_id: 0,
          page_up: 1,
          page_down: 0,
          reload: 0,
          cip: "10.75.13.189",
          loadmode: 0,
          newinstall: 1,
          type: "NORMAL",
          registration_days: 1458,
          recall_date: -1,
          position:
            '{"objectid":"8008611000000000000","name":"\\u5317\\u4eac"}',
          source: 3439264077
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res && res.statuses && res.statuses.length > 0) {
            this.list = [...this.list,...res.statuses];
            // this.dataStore = [...res.statuses,...this.dataStore]
            // this.list = this.dataStore.slice(this.page*res.statuses.length, this.page*res.statuses.length+res.statuses.length);
            // this.page ++;
        } else {
            this.tips = "暂无数据";
            this.moreBtnText = "没有更多数据"
            this.isDataOver = true;
        }
      });
    },
    handleLoadMore() {
      this.getList();
    }
  },
  created() {
    this.init();
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
    background-color: #f0f2f5;
    padding: 10px 0;
    color: #333;
    line-height: 100%;
    .channel-title {
      padding: 0;
      margin-top: 20px;
      margin-bottom: 20px;
      text-align: center;
      label {
        display: inline-block;
        padding: 4px 0;
        font-size: 18px;
        border-radius: 4px;
        border-bottom: 2px solid #ff8200;
      }
    }
    .none-tips {
      line-height: 2;
      text-align: center;
      color: #666;
    }
    .more-btn-box {
        text-align: center;
        color: #999;
        padding: 20px 10px;
        cursor: pointer;
    }
  }
}
</style>
