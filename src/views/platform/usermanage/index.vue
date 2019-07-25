<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-document" style="margin-right: 6px;"></i>用户信息管理</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24">
        <el-form inline :model="formInline" size="mini">
          <el-form-item label="邮箱前缀">
            <el-input style="width: 200px" v-model="formInline.userid" placeholder="请输入用户邮箱前缀" clearable></el-input>
          </el-form-item>
          <el-form-item label="选择平台">
            <el-select v-model="formInline.type" filterable placeholder="请选择平台">
              <el-option label="机器学习平台" value="1"></el-option>
              <el-option label="热门管理平台" value="2"></el-option>
            </el-select>
            <el-button type="primary" @click="getUserList">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="24">
        <el-dialog title="添加用户" :visible.sync="dialogVisible">
          <el-form :model="addForm" :rules="addRules" ref="addForm" size="small">
            <el-form-item prop="realname" label="用户名" label-width="120px">
              <el-input v-model="addForm.realname" placeholder="请输入中文名" clearable></el-input>
            </el-form-item>
            <el-form-item prop="userid" label="邮箱前缀" label-width="120px" required>
              <el-input v-model="addForm.userid" placeholder="请输入邮箱前缀" clearable></el-input>
            </el-form-item>
            <el-form-item prop="type" label="选择平台" label-width="120px" required>
              <el-select v-model="addForm.type" placeholder="请选择平台">
                <el-option label="机器学习平台" value="1"></el-option>
                <el-option label="热门管理平台" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="usergroup" label="用户组" label-width="120px" required>
              <el-select v-model="addForm.usergroup" placeholder="请选择用户组">
                <el-option label="内部" value="inner"></el-option>
                <el-option label="外部" value="outer"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-popover ref="popoverAdd" placement="top" width="200" v-model="addForm.popover">
              <p>确定添加新用户？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="addForm.popover = false">取消</el-button>
                <el-button type="primary" round size="mini" @click="addEvent()">确定</el-button>
              </div>
            </el-popover>
            <el-button @click="cancelEvent()" size="small">取 消</el-button>
            <el-button type="primary" v-popover:popoverAdd size="small">添 加</el-button>
          </div>
        </el-dialog>
        <el-row v-if="userList">
          <div class="clearfix">
            <div class="table-title left">{{typeName}}用户列表</div>
            <el-button type="success" size="mini" class="right" @click="dialogVisible = true">添加用户</el-button>
          </div>
          <el-table :data="userList" style="width: 100%" border stripe size="mini">
            <el-table-column type="index" align="center" width="50" label="序号" fixed>
            </el-table-column>
            <el-table-column align="left" prop="userid" label="邮箱前缀">
            </el-table-column>
            <el-table-column align="left" prop="username" label="用户名">
            </el-table-column>
            <el-table-column align="left" prop="usergroup" label="用户组">
            </el-table-column>
            <el-table-column align="left" prop="add_time" label="添加时间" width="160">
            </el-table-column>
            <el-table-column align="left" label="操作项">
              <template slot-scope="scope">
                <operate-item :data="scope.row" :type="curType" :refresh="getUserList"></operate-item>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding-top: 10px;overflow: auto;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="formInline.total">
            </el-pagination>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import OperateItem from "./components/OperateItem";
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "datamonitor",
  components: {
    Auth,
    OperateItem
  },
  data() {
    return {
      dialogVisible: false,
      addRules: {
        userid: [
          { required: true, message: "邮箱前缀不能为空！", trigger: "blur" }
        ]
      },
      addForm: {
        popover: false,
        userid: "",
        realname: "",
        type: "2",
        usergroup: "outer"
      },
      formInline: {
        userid: "",
        type: "2",
        total: 0,
        page: 1,
        count: 10
      },
      userList: null,
      typeName: "机器学习平台",
      curType: "1"
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getUserList();
        this.getSpecialMenu();
      }
    },
    getSpecialMenu() {
      const data = {
        url: "/menu/getSpecialMenu",
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("GetSpecialMenu", data);
    },
    getUserList() {
      //获取用户列表
      const data = {
        url: "/user/get",
        params: {
          userid: this.formInline.userid,
          type: this.formInline.type,
          page: this.formInline.page,
          count: this.formInline.count,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("GetUserList", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.typeName =
            Number(this.formInline.type) == 1 ? "机器学习平台" : "热门管理平台";
          this.curType = this.formInline.type;
          this.userList = (res.result && res.result.data) || [];
          this.formInline.total = (res.result && res.result.total) || 0;
        }
      });
    },
    addEvent() {
      this.addForm.popover = false;
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          const data = {
            url: "/user/add",
            params: {
              userid: this.addForm.userid,
              realname: this.addForm.realname,
              type: this.addForm.type,
              usergroup: this.addForm.usergroup,
              username: this.email,
              cip: 230
            }
          };
          this.$store.dispatch("SetUser", data).then(res => {
            if (res.code && Number(res.code) == 200) {
              Message({
                showClose: true,
                message: "success",
                type: "success",
                duration: 1000
              });
              this.getUserList();
            } else {
              Message({
                showClose: true,
                message: res.msg || "添加失败！",
                type: "error",
                duration: 3000
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    cancelEvent() {
      this.$refs["addForm"].resetFields();
      this.dialogVisible = false;
    },
    handleSizeChange(val) {
      this.formInline.count = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.getUserList();
    },
    _parseTime(time, option) {
      return parseTime(time, option);
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
    padding: 0;
    color: #333;
    line-height: 100%;
    .pane-title-wrap {
      padding: 20px 14px;
      background: #fff;
      border-bottom: 1px solid #f0f2f5;
      .pane-title {
        font-size: 16px;
        color: #409eff;
        text-align: left;
      }
    }
    .search-form-wrap {
      padding-left: 14px;
      padding-top: 18px;
      background-color: #fff;
      border-bottom: 1px solid #f0f2f5;
    }
    .content-box-wrap {
        padding: 10px;
    }
    .table-wrap {
      margin-bottom: 20px;
    }
    .table-title {
      padding: 5px 20px;
      color: #409eff;
      border-bottom: 2px solid #409eff;
      margin-bottom: 10px;
    }
  }
}
</style>
