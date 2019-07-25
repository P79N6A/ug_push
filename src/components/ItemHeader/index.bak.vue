<template>
  <div>
    <el-header height="auto">
      <el-row type="flex" align="middle" justify="space-between" class="header-top">
        <el-col>
          <img src="//mlplat.intra.weibo.com/static/layout/img/logo.png" alt="mlplat-logo" class="header-logo hidden-xs-only">
          <span>热门微博管理后台</span>
        </el-col>
        <el-col>
          <a :href="logoutLink" class="right linkBtn" v-if="isLogin">退出</a>
          <a :href="loginLink" class="right linkBtn" v-else>登录</a>
          <span class="right" style="margin-right: 10px;">{{email}}</span>
          <span v-if="isPhone" @click="isShowMenu = !isShowMenu" class="right" style="margin-right: 10px;margin-top: 2px;"><i class="el-icon-menu"></i></span>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" class="nav-wrapper" v-if="isLogin && !isPhone">
        <!-- <el-menu
        :default-active="$route.meta.activeidx"
        class="el-header-menu"
        mode="horizontal"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">主页</template>
              <el-menu-item index="1-1"><a href="//mlplat.intra.weibo.com">平台介绍</a></el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">特征平台</template>
                <el-menu-item index="2-1"><a href="//mlplat.intra.weibo.com/feature/photo">用户画像</a></el-menu-item>
                <el-menu-item index="2-2"><a href="//mlplat.intra.weibo.com/feature/weibo">微博画像</a></el-menu-item>
                <el-menu-item index="2-3"><a href="//mlplat.intra.weibo.com/feature/table">特征查询</a></el-menu-item>
                <el-menu-item index="2-4"><a href="//mlplat.intra.weibo.com/feature/apply">特征应用</a></el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">基础平台</template>
                <el-menu-item index="3-1"><a href="//mlplat.intra.weibo.com">统计展示</a></el-menu-item>
                <el-submenu index="3-2">
                    <template slot="title">机器资源</template>
                    <el-menu-item index="3-2-1"><a href="//mlplat.intra.weibo.com/math/machineinfo">内网</a></el-menu-item>
                    <el-menu-item index="3-2-2"><a href="//mlplat.intra.weibo.com/math/detailtable?type=emr">EMR</a></el-menu-item>
                    <el-menu-item index="3-2-3"><a href="//mlplat.intra.weibo.com/math/detailtable?type=odps">ODPS</a></el-menu-item>
                    <el-menu-item index="3-2-4"><a href="//mlplat.intra.weibo.com/math/detailtable?type=ecs">ECS</a></el-menu-item>
                    <el-menu-item index="3-2-5"><a href="//mlplat.intra.weibo.com/math/detailtable?type=gpu">GPU</a></el-menu-item>
                </el-submenu>
                <el-submenu index="3-3">
                    <template slot="title">任务模块</template>
                    <el-menu-item index="3-3-1"><a href="//mlplat.intra.weibo.com/math/admintask">任务管理</a></el-menu-item>
                    <el-menu-item index="3-3-2"><a href="//mlplat.intra.weibo.com/math/task">任务提交</a></el-menu-item>
                    <el-menu-item index="3-3-3"><a href="//mlplat.intra.weibo.com/math/search">任务查询</a></el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">数据平台</template>
                <el-menu-item index="4-1"><a href="//mlplat.intra.weibo.com/monitor/data">业务报表</a></el-menu-item>
                <el-menu-item index="4-2"><a href="//mlplat.intra.weibo.com/monitor/qps">业务流量</a></el-menu-item>
                <el-menu-item index="4-3"><a href="//mlplat.intra.weibo.com/dataview/hotblog">数据分析</a></el-menu-item>
                <el-menu-item index="4-4"><a href="//mlplat.intra.weibo.com/dataview/freshreview">用户回看</a></el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">效果演示</template>
                <el-menu-item index="5-1"><a href="//mlplat.intra.weibo.com/lab/ocr">OCR</a></el-menu-item>
                <el-menu-item index="5-2"><a href="//mlplat.intra.weibo.com/lab/audio">语音识别</a></el-menu-item>
                <el-menu-item index="5-3"><a href="//mlplat.intra.weibo.com/lab/recorder">实时语音识别</a></el-menu-item>
                <el-menu-item index="5-4"><a href="//mlplat.intra.weibo.com/lab/gender">性别识别</a></el-menu-item>
                <el-menu-item index="5-5"><a href="//mlplat.intra.weibo.com/lab/idiomsolitaire">成语接龙</a></el-menu-item>
                <el-menu-item index="5-6"><a href="//mlplat.intra.weibo.com/lab/audioControl">语音控制</a></el-menu-item>
                <el-menu-item index="5-7"><a href="//mlplat.intra.weibo.com/lab/pic">图片识别</a></el-menu-item>
                <el-menu-item index="5-8"><a href="//mlplat.intra.weibo.com/lab/face">人脸识别</a></el-menu-item>
                <el-menu-item index="5-9"><a href="//mlplat.intra.weibo.com/lab/smart">图片智能分析</a></el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">项目管理</template>
                <el-menu-item index="6-1"><a href="//mlplat.intra.weibo.com/project/projectManage">项目管理</a></el-menu-item>
                <el-submenu index="6-2">
                    <template slot="title">服务器管理</template>
                    <el-menu-item index="6-2-1"><a href="//mlplat.intra.weibo.com/math/machineindex">概览</a></el-menu-item>
                    <el-menu-item index="6-2-2"><a href="//mlplat.intra.weibo.com/math/machinesbyproducttype">按产品线</a></el-menu-item>
                    <el-menu-item index="6-2-3"><a href="//mlplat.intra.weibo.com/math/machinesbygrouptype">按业务组</a></el-menu-item>
                    <el-menu-item index="6-2-4"><a href="//mlplat.intra.weibo.com/math/searchmachine">搜索</a></el-menu-item>
                    <el-menu-item index="6-2-5"><a href="//mlplat.intra.weibo.com/math/serverapplyflow">服务器申请流程</a></el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-submenu index="7" v-if="Number(auth) > 0">
                <template slot="title">热门管理</template>
                <el-menu-item index="7-1"><a href="/hot/#/hotcenter/querymaterial">物料查询</a></el-menu-item>
                <el-menu-item index="7-2"><a href="/hot/#/hotcenter/operatematerial">物料管理</a></el-menu-item>
                <el-menu-item index="7-3"><a href="/hot/#/hotcenter/monitormaterial">物料库监控</a></el-menu-item>
            </el-submenu>
        </el-menu> -->

        <el-menu :default-active="$route.meta.activeidx" class="el-header-menu" mode="horizontal" background-color="#304156" text-color="#fff" active-text-color="#ffd04b" v-if="menulist">
          <!-- <item-menu :item="obj" v-for="obj in menulist"></item-menu> -->

          <el-submenu :key="obj.id" :index="`${obj.id}`" v-for="obj in menulist">
            <template slot="title">{{obj.name}}</template>
            <item-menu :key="item.id" :preindex="`${obj.id}`" :item="item" v-for="item in obj.list" v-if="obj.list && item.visible"></item-menu>
          </el-submenu>
        </el-menu>
      </el-row>
      <el-row class="nav-wrapper" v-else-if="isLogin && isPhone" v-show="isShowMenu">
        <el-menu unique-opened :default-active="$route.meta.activeidx" class="el-header-menu" mode="vertical" background-color="#304156" text-color="#fff" active-text-color="#ffd04b" v-if="menulist">
          <el-submenu :key="obj.id" :index="`${obj.id}`" v-for="obj in menulist">
            <template slot="title">{{obj.name}}</template>
            <item-menu :key="item.id" :preindex="`${obj.id}`" :item="item" v-for="item in obj.list" v-if="obj.list && item.visible"></item-menu>
          </el-submenu>
        </el-menu>
      </el-row>
      <el-main v-else-if="isLogin == null">Loading···</el-main>
      <el-main v-else>请先登录</el-main>
      <el-main v-if="pageAuth == 'response failed'">
        <el-alert title="网络异常，请重试一下" type="info" show-icon center :closable="false">
        </el-alert>
      </el-main>
    </el-header>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import ItemMenu from "@/components/ItemHeader/ItemMenu";

export default {
  name: "ItemHeader",
  components: {
    ItemMenu
  },
  data() {
    return {
      loginLink: "",
      logoutLink: "",
      isPhone: false,
      isShowMenu: false,
    };
  },
  computed: {
    ...mapGetters(["email", "isLogin", "pageAuth", "menulist"])
  },
  methods: {
    init() {
      const service = encodeURIComponent(location.href);
      this.loginLink = `http://cas.erp.sina.com.cn/cas/login?service=${service}`;
      this.logoutLink = `http://cas.erp.sina.com.cn/cas/logout?service=${service}`;
      document.title = this.$route.meta.title;
      if (this.isLogin) {
        this.setMenu();
        this.getPageAuth();
        this.setAuth();
      }
    },
    setAuth() {
      const params = {
        username: this.email,
        cip: 230
      };
      this.$store.dispatch("GetAuth", params);
    },
    setMenu() {
      const params = {
        userid: this.email,
        username: this.email,
        cip: 230
      };
      this.$store.dispatch("GetMenu", params);
    },
    getPageAuth() {
      const path = this.$route.query.source ? this.$route.query.source : this.$route.path;
      const params = {
        userid: this.email,
        username: this.email,
        // path: `/hot/#${this.$route.path}`,
        path: `/hot/#${path}`,
        cip: 230
      };
      this.$store.dispatch("GetPageAuth", params);
    }
  },
  created() {
    this.isPhone = window.isPhone;
    this.init();
    if (!this.isLogin) {
      this.$store.dispatch("GetUserInfo");
    }
  },
  watch: {
    email() {},
    isLogin() {
      this.init();
    },
    menulist() {},
    pageAuth() {}
  }
};
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0;
  background-color: rgba(48, 65, 86, 0.96);
  color: #fff;
  .header-top {
    padding: 10px 20px;
  }
  .header-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
  .nav-wrapper {
    background-color: #304156;
  }
  .el-menu--horizontal {
    border-bottom: none;
  }
  .linkBtn {
    cursor: pointer;
    &:hover {
      color: #ffd04b;
      text-decoration: underline;
    }
  }
  .el-main {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 100%;
  }
}
.el-menu--horizontal a {
  display: inline-block;
  width: 100%;
}
</style>
