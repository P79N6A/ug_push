<template>
  <el-container direction="vertical">
    <item-header></item-header>
    <el-main v-if="pageAuth === 1">
      <el-tabs :tab-position="tabPosition" v-model="activeName">
        <el-tab-pane label="我的频道">
          <mine-page></mine-page>
        </el-tab-pane>
        <el-tab-pane label="频道创建">
          <add-channel></add-channel>
        </el-tab-pane>
        <el-tab-pane label="频道列表" v-if="channelAuth">
          <channel-list></channel-list>
        </el-tab-pane>
        <el-tab-pane label="频道授权" v-if="channelAuth">
          <Accredit></Accredit>
        </el-tab-pane>
        <el-tab-pane label="用户白名单">
          <white-list></white-list>
        </el-tab-pane>
        <el-tab-pane label="关键词白名单">
          <keyword-list title="关键词白名单" :kapi="channelApi.w"></keyword-list>
        </el-tab-pane>
        <el-tab-pane label="关键词黑名单">
          <keyword-list title="关键词黑名单" :kapi="channelApi.b"></keyword-list>
        </el-tab-pane>
        <el-tab-pane label="mid屏蔽">
          <shield-page></shield-page>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
      <auth></auth>
    </el-main>
  </el-container>
</template>

<script>
import ItemHeader from "@/components/ItemHeader";
import Auth from "@/components/Tips/Auth";
import MinePage from "./tabpage/MinePage";
import AddChannel from "./tabpage/AddChannel";
import ChannelList from "./tabpage/ChannelList";
import Accredit from "./tabpage/Accredit";
import WhiteList from "./tabpage/WhiteList";
import KeywordList from "./tabpage/KeywordList";
import ShieldPage from "./tabpage/ShieldPage";
import { mapGetters } from "vuex";

export default {
  name: "datamonitor",
  components: {
    ItemHeader,
    Auth,
    MinePage,
    ChannelList,
    Accredit,
    WhiteList,
    AddChannel,
    KeywordList,
    ShieldPage
  },
  data() {
    return {
      tabPosition: "left",
      activeName: "0",
      channelApi: {
        w: {
          //关键词白名单API
          get: "/channel/getKeywordByCid",
          add: "/channel/addChannelKeyword",
          set: "/channel/setCKeyStatus",
          del: "/channel/delChannelKeyword"
        },
        b: {
          //关键词黑名单API
          get: "/channel/getKeyBlackByCid",
          add: "/channel/addCKeyBlack",
          set: "/channel/setCKeyBlackStatus",
          del: "/channel/delCKeyBlack"
        }
      },
      channelAuth: 0,
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getChannelAuth();
        this.setChannelList();
        this.getChannelDrop();
      }
    },
    getChannelDrop() {
      //获取频道类型下拉列表和标签列表
      const data = {
        url: "/channel/getList",
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("GetChannelDrop", data);
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
    getAllChannel() {
      const data = {
        url: "/channel_auth/getChannelList",
        params: {
          channel_name: "",
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("GetAllChannel", data);
    },
    getChannelAuth() {
      const params = {
        userid: this.email,
        username: this.email,
        path: `/hot/#/hotcenter/channel/auth`,
        cip: 230
      };
      this.$store.dispatch("GetChannelAuth", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.channelAuth = res.result;
          this.getAllChannel();
        }
      });
    }
  },
  created() {
    if (window.isPhone) {
      this.tabPosition = "top";
    }
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
    padding-bottom: 40px;
    color: #333;
    line-height: 100%;
  }
}
</style>
