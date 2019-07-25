<template>
  <el-container direction="vertical">
    <item-header></item-header>
    <el-main v-if="pageAuth === 1">
      <h2 class="channel-title"><label>{{cname}}频道</label></h2>
      <div v-if="list && list.length > 0">
        <item-list :key="idx" :item="item" v-for="(item, idx) in list"></item-list>
      </div>
      <p v-else class="none-tips">暂无数据</p>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
      <auth></auth>
    </el-main>
  </el-container>
</template>

<script>
import ItemHeader from "@/components/ItemHeader";
import ItemList from "./ItemList"
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";

export default {
  name: "datamonitor",
  components: {
    ItemHeader,
    ItemList,
    Auth
  },
  data() {
    return {
      list: null,
      cname: '热门',
      containerid: '102803'
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      this.cname = this.$route.query.cname || '热门';
      this.containerid = this.$route.query.containerid || '102803';
      if (this.pageAuth === 1) {
        this.getList();
      }
    },
    getList() {
      //获取频道物料
      const tempData = {
        url: "https://m.weibo.cn/api/container/getIndex",
        param: {
          containerid: this.containerid,
          openApp: 0,
          // since_id: 1
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then( res => {
          if (res.ok == 1) {
            this.list = res.data && res.data.cards || [];
          }
      });
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
    background-color: #f0f2f5;
    padding: 10px 0;
    color: #333;
    line-height: 100%;
    .channel-title {
      padding: 0;
      margin-bottom: 20px;
      text-align: center;
      label {
        padding: 4px 0;
        font-size: 18px;
        border-radius: 4px;
        border-bottom: 2px solid #FF8200;
      }
    }
    .none-tips {
      line-height: 2;
      text-align: center;
      color: #666;
    }
  }
}
</style>
