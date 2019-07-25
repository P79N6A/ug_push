<template>
  <el-row class="auth-wrapper">
    <div>
      <el-alert
        title="暂无页面权限"
        type="warning"
        show-icon
        center
        :closable="false"
      >
      </el-alert>
    </div>
    <div class="btn-box">
      <a
        title="邮件联系"
        :href="`mailto:${emailLink}`"
      >
        <el-button
          type="primary"
          plain
        >
          <i
            class="el-icon-message"
            style="margin-right: 5px;"
          ></i>立即发邮件 申请权限
        </el-button>
      </a>
    </div>
    <div class="tips-box">
      <h6>邮件格式如下，</h6>
      <ul>
        <li>
          <label>邮件主题：</label>
          <span>热门微博管理后台-页面权限申请</span>
        </li>
        <li>
          <label>申请页面：</label>
          <span>{{$route.meta.title}}</span>
        </li>
        <li>
          <label>页面地址：</label>
          <span><a
              :href="getPageUrl()"
              target="_blank"
            >{{getPageUrl()}}</a></span>
        </li>
        <li>
          <label>申请原因：</label>
          <span>查看数据分析</span>
        </li>
        <li>
          <label>用户信息：</label>
          <el-table
            :data="tableData"
            style="margin-top: 6px;width: 100%"
            border
            size="small"
          >
            <el-table-column
              prop="name"
              label="姓名"
            >
            </el-table-column>
            <el-table-column
              prop="email"
              label="邮箱（erp可登录）"
            >
            </el-table-column>
            <el-table-column
              prop="team"
              label="所属团队"
            >
            </el-table-column>
          </el-table>
        </li>
      </ul>
    </div>
  </el-row>
</template>
<script>
export default {
  name: "AuthTips",
  props: ["admin"],
  data() {
    return {
      emailLink: "wangyang29@staff.weibo.com,juanmin@staff.weibo.com",
      tableData: [
        {
          name: "张三",
          email: "zhangsan@staff.weibo.com",
          team: "热门微博"
        },
        {
          name: "李四",
          email: "lisi@staff.weibo.com",
          team: "热门微博"
        }
      ]
    };
  },
  methods: {
    init() {
      this.emailLink = this.admin || this.emailLink;
    },
    getPageUrl() {
      return location.href;
    }
  },
  created() {
    this.init();
  },
  watch: {
    admin() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.auth-wrapper {
  padding: 20px 10px;
  .btn-box {
    padding-top: 20px;
    text-align: center;
  }
  .tips-box {
    margin-top: 20px;
    padding: 10px 0;
    font-size: 14px;
    color: #666;
    line-height: 20px;
    border-top: 1px dashed #e6e6e6;
    ul,
    li {
      list-style: none;
    }
    h6 {
      padding-bottom: 5px;
      font-size: 14px;
    }
    span {
      color: #409eff;
    }
  }
}
</style>
