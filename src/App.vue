<template>
<div id="app" class="all-wrapper">
  <div v-if="isPhone && isShowMenu" class="drawer-bg" @click="handleClickOutside"></div>
  <el-container v-if="!hasHeader">
    <router-view />
  </el-container>
  <el-container v-else>
    <el-header height="56px" :style="`position: fixed;top: 0;z-index: 2000;padding: 0;width: 100%;border-bottom: 6px solid #303e50;`">
      <item-header :toggleclick="toggleSideBar" :showmenu="isShowMenu"></item-header>
    </el-header>
    <el-container style="padding-top: 56px;">
      <item-aside :showmenu="isShowMenu"></item-aside>
      <el-container>
        <router-view v-if="isLogin || unlogin" />
        <el-main v-else-if="isLogin == null">Loading···</el-main>
        <el-main v-else-if="!isLogin" style="text-align: center;margin-top: 20px;">请先登录</el-main>
        <el-main v-else-if="pageAuth === 'response failed'">
          <el-alert title="网络异常，请重试一下" type="info" show-icon center :closable="false">
          </el-alert>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
  <el-backtop class="all-up-btn-box" target=".all-wrapper" :bottom="40" :right="20" :visibility-height="10">
    <i class="el-icon-position all-up-btn"></i>
  </el-backtop>
</div>
</template>

<script>
import {
  mapGetters
} from "vuex";
import ItemHeader from "@/components/ItemHeader";
import ItemAside from "@/components/ItemAside";
import Auth from "@/components/Tips/Auth";
import { pagelist, unloginpage } from "@/utils/pageConf";

export default {
  name: "app",
  components: {
    ItemHeader,
    ItemAside,
    Auth
  },
  data() {
    return {
      isShowMenu: false,
      isPhone: false,
      hasHeader: true,
      unlogin: false
    }
  },
  methods: {
    init() {
      this.isPhone = window.isPhone;
      this.getWhitePage();
    },
    pathUpdate() {
      document.title = this.$route.meta.title;
      this.isShowMenu = false;
      this.init();
    },
    handleClickOutside() {
      this.isShowMenu = false;
    },
    toggleSideBar(val) {
      this.isShowMenu = val;
    },
    getWhitePage() {
      this.hasHeader = true;
      this.unlogin = false;
      pagelist.map((val, i) => {
        if (this.$route.path && this.$route.path == val) {
          this.hasHeader = false;
        }
      });
      unloginpage.map((val, i) => {
        if (this.$route.path && this.$route.path == val) {
          this.unlogin = true;
        }
      });
    },
    setAppHeight(doc, win) {
      var docEl = doc.documentElement,
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          recalc = function() {
            document.getElementById('app').style=`height:${win.innerHeight}px;`;
          };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
    }
  },
  computed: mapGetters(["isLogin", "pageAuth"]),
  created() {
    this.init();
  },
  mounted() {
    // 兼容windows双滚动条问题
    this.setAppHeight(document, window);
  },
  watch: {
    "$route.fullPath": "pathUpdate",
    isShowMenu() {}
  }
};
</script>

<style lang="scss" scoped>
.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: fixed;
    z-index: 2001;
}
.all-wrapper {
  width: 100%;
  overflow-y: scroll;
  .all-up-btn-box {
    z-index: 2000;
    background-color: rgba(0,0,0,.8);
    color: #fff;
    &:hover {
      background-color: rgb(230, 162, 60);
      box-shadow: 0 2px 12px 0 rgba(230, 162, 60, 0.8);
    }
  }
  .all-up-btn {
    margin-top: 6px;
    transform: rotate(-45deg);
    font-size: 24px;
  }
}
</style>
