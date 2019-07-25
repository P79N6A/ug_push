<template>
  <el-row type="flex" align="middle" justify="space-between" class="header-top">
    <el-col>
      <img src="//mlplat.intra.weibo.com/static/layout/img/logo.png" alt="mlplat-logo" class="header-logo hidden-xs-only">
      <span class="header-title">热门微博管理后台</span>
    </el-col>
    <el-col>
      <a class="right linkBtn" v-if="isLogin" @click="logoutEvent()">退出</a>
      <a :href="loginLink" class="right linkBtn" v-else>登录</a>
      <span class="right" style="margin-right: 10px;">{{email || 'visitor'}}</span>
      <span v-if="isPhone && isLogin" @click="toggleSideBar()" class="right" style="margin-right: 10px;margin-top: 2px;">
        <i class="el-icon-menu"></i>
      </span>
    </el-col>
  </el-row>
</template>
<script>
import { mapGetters } from "vuex";
import { _setCookie, _getCookie, _encodeStr, _decodeStr } from "@/utils";

export default {
  name: "ItemHeader",
  props: ["showmenu", "toggleclick"],
  data() {
    return {
      loginLink: "",
      logoutLink: "",
      isPhone: false,
      isShowMenu: false,
      curLink: "", // 去掉ticket与ext参数的当前页面地址
      curQuery: {}, // 地址栏参数
      curPath: "" //当前页面路由地址
    };
  },
  computed: {
    ...mapGetters(["email", "isLogin"])
  },
  methods: {
    init() {
      this.setCurQuery();
      this.setCurLink();
      const service = encodeURIComponent(this.curLink);
      this.loginLink = `http://cas.erp.sina.com.cn/cas/login?service=${service}`;
      this.logoutLink = `http://cas.erp.sina.com.cn/cas/logout?service=${service}`;
      document.title = this.$route.meta.title;
      if (this.isLogin) {
        if (this.curQuery.ticket) { // 去除链接中的ticket和ext参数
          location.href = this.curLink;
          return;
        }
        this.setMenu();
        this.getPageAuth();
      }
    },
    setCurQuery() {
      const hashArr = location.hash.split('?');
      this.curQuery = {};
      this.curPath = hashArr[0] ? hashArr[0].split('#')[1] : "";
      if(hashArr[1]) {
        hashArr[1].split('&').map((item, key, ary) => {
          const query = item.split('=');
          this.curQuery[query[0]] = query[1];
        })
      }
    },
    setCurLink () {
      // 去除链接中的ticket和ext参数
      let arr = [];
      const obj = this.curQuery;
      for (let k in obj) {
        if (k !== 'ticket' && k !== 'ext') {
          arr.push(`${k}=${obj[k]}`);
        }
      }
      const urlParams = arr.length > 0 ? `?${arr.join('&')}` : '';
      this.curLink = `${location.origin}/hot/#${this.curPath}${urlParams}`;
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
      const path = this.curQuery.source
        ? decodeURIComponent(this.curQuery.source)
        : this.curPath;
      const params = {
        userid: this.email,
        username: this.email,
        path: `/hot/#${path}`,
        cip: 230
      };
      this.$store.dispatch("GetPageAuth", params);
    },
    toggleSideBar() {
      this.isShowMenu = !this.isShowMenu;
      this.toggleclick(this.isShowMenu);
    },
    getValidateInfo(ticket) { //获取用户信息
      const data = {
        url: "/proxy/login",
        params: {
          ticket: ticket,
          service: encodeURIComponent(this.curLink),
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.email && res.email) {
          _setCookie('mlplat_name', _encodeStr(res.email, '名'), 7); //设置cookie，7天有限期
          this.$store.commit('SET_USER_INFO', { data: res, isLogin: true })
        } else {
          this.$store.commit('SET_USER_INFO', { isLogin: false })
        }
      }, err => {
        this.$store.commit('SET_USER_INFO', { isLogin: false })
      });
    },
    logoutEvent() {
      _setCookie('mlplat_name', '', -1); //删除cookie
      location.href = this.logoutLink;
    }
  },
  created() {
    this.isPhone = window.isPhone;
    this.isShowMenu = this.showmenu || false;
    this.init();
    const mlplat_name = _getCookie('mlplat_name');
    if (mlplat_name) { //cookie存在
      this.$store.commit('SET_USER_INFO', { data: { email: _decodeStr(mlplat_name, '名')}, isLogin: true })
    } else {
      if (this.curQuery.ticket) {
        this.getValidateInfo(this.curQuery.ticket);
      } else {
        this.$store.commit('SET_USER_INFO', { isLogin: false })
      }
    }
  },
  watch: {
    email() {},
    isLogin() {
      this.init();
    },
    showmenu() {
      this.isShowMenu = this.showmenu || false;
    },
    "$route.fullPath": "init",
  }
};
</script>

<style lang="scss" scoped>
.header-top {
  padding: 0 10px;
  line-height: 50px;
}
.header-logo {
  margin-right: 6px;
  width: 28px;
  height: 28px;
  vertical-align: middle;
  box-shadow: -1px -1px 2px #ccc;
  background-color: #203046;
  border-radius: 50%;
}
.header-title {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 2px;
  text-shadow: 3px 3px 2px #999;
}
.linkBtn {
  cursor: pointer;
  &:hover {
    color: #ffd04b;
    text-decoration: underline;
  }
}
</style>
<style>
.el-header {
  background-color: rgba(48, 65, 86, 0.96);
  color: #fff;
}
</style>
