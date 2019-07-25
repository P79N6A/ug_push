<template>
    <el-header height="auto">
      <el-row type="flex" align="middle" justify="space-between" class="header-top">
        <el-col>
          <img src="//mlplat.intra.weibo.com/static/layout/img/logo.png" alt="mlplat-logo" class="header-logo hidden-xs-only">
          <span>机器学习平台 WML</span>
        </el-col>
        <el-col>
          <a :href="logoutLink" class="right linkBtn" v-if="isLogin">退出</a>
          <a :href="loginLink" class="right linkBtn" v-else>登录</a>
          <span class="right" style="margin-right: 10px;">{{email}}</span>
          <span v-if="isPhone" @click="isShowMenu = !isShowMenu" class="right" style="margin-right: 10px;margin-top: 2px;"><i class="el-icon-menu"></i></span>
        </el-col>
      </el-row>
    </el-header>
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
        // this.setMenu();
        // this.getPageAuth();
        // this.setAuth();
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
