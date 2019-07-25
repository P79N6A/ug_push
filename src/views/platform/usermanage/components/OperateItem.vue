<template>
  <div v-if="data">
    <el-dialog :title="`编辑【${data.userid}】用户信息`" :visible.sync="dialogVisible">
      <el-form v-if="userInfo" size="small">
        <el-form-item label="用户名" label-width="120px">
          <el-input style="max-width: 190px;" v-model="userInfo.username" placeholder="请输入中文名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="type" label="选择平台" label-width="120px">
          <el-select v-model="type" placeholder="请选择平台" disabled>
            <el-option label="机器学习平台" value="1"></el-option>
            <el-option label="热门管理平台" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户组" label-width="120px" required>
          <el-select v-model="userInfo.usergroup" placeholder="请选择用户组">
            <el-option label="内部" value="inner"></el-option>
            <el-option label="外部" value="outer"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="授权特殊页" label-width="120px" v-if="type == 2 && specialMenu">
          <!-- <el-select style="min-width: 200px;" v-model="pageids" placeholder="请选择需要授权的特殊页面" multiple filterable clearable>
            <el-option :key="key" v-for="(item, key) in specialMenu" :label="item.name" :value="item.id"></el-option>
          </el-select> -->

          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-checkbox-group v-model="pageids" @change="handleCheckedPagesChange">
            <el-checkbox style="margin-left: 10px;" :key="key" v-for="(item, key) in specialMenu" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>

          <el-popover ref="popoverSpecial" placement="top" width="200" v-model="spePopover">
            <p>确定修改页面授权？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="spePopover = false">取消</el-button>
              <el-button type="primary" round size="mini" @click="setMenuAuth()">确定</el-button>
            </div>
          </el-popover>
          <el-button type="success" plain v-popover:popoverSpecial size="small">修改授权</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-popover ref="popoverDel" placement="top" width="200" v-model="delPopover">
          <p>确定将【{{data.userid}}】删除？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="delPopover = false">取消</el-button>
            <el-button type="primary" round size="mini" @click="deleteEvent()">确定</el-button>
          </div>
        </el-popover>
        <el-popover ref="popoverUpdate" placement="top" width="200" v-model="updatePopover">
          <p>确定保存当前修改？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="updatePopover = false">取消</el-button>
            <el-button type="primary" round size="mini" @click="updateEvent()">确定</el-button>
          </div>
        </el-popover>
        <el-button type="primary" v-popover:popoverUpdate size="small">保 存</el-button>
        <el-button v-popover:popoverDel size="small">删 除</el-button>
      </div>
    </el-dialog>
    <el-popover ref="popDelBtn" placement="top" width="200" v-model="delBtnPopover">
      <p>确定将【{{data.userid}}】删除？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="delBtnPopover = false">取消</el-button>
        <el-button type="primary" round size="mini" @click="deleteEvent()">确定</el-button>
      </div>
    </el-popover>
    <el-button style="margin-left: 10px;margin-bottom: 5px;" type="primary" icon="el-icon-edit" plain size="mini" title="编辑" @click="showEditDialog()"><span class="hidden-xs-only">编辑</span></el-button>
    <el-button type="danger" icon="el-icon-delete" plain size="mini" v-popover:popDelBtn title="删除"><span class="hidden-xs-only">删除</span></el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "operateItem",
  data() {
    return {
      dialogVisible: false,
      delPopover: false,
      delBtnPopover: false,
      updatePopover: false,
      spePopover: false,
      userInfo: null,
      pageids: [],
      checkAll: false,
      isIndeterminate: true,
      pageIdList: []
    };
  },
  computed: {
    ...mapGetters(["email", "specialMenu"])
  },
  props: ["data", "type", "refresh"],
  methods: {
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    showEditDialog() {
      const data = {
        url: "/user/getInfo",
        params: {
          userid: this.data.userid,
          type: this.type,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("GetUser", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.pageids = [];
          this.userInfo = res.result;
          this.userInfo.specialmenu &&
            this.userInfo.specialmenu.length > 0 &&
            this.setPageIds(this.userInfo.specialmenu);
          this.dialogVisible = true;
        }
      });
    },
    setPageId(arr) {
      if (arr) {
        this.pageIdList = [];
        for (let i = 0; i < arr.length; i ++) {
          this.pageIdList.push(arr[i].id);
        }
      }
    },
    handleCheckAllChange(val) {
      this.pageids = val ? this.pageIdList : [];
      this.isIndeterminate = false;
    },
    handleCheckedPagesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.pageIdList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.pageIdList.length;
    },
    setPageIds(data) {
      for (let i = 0; i < data.length; i++) {
        this.pageids.push(data[i].id);
      }
    },
    deleteEvent() {
      this.delPopover = false;
      this.delBtnPopover = false;
      const data = {
        url: "/user/del",
        params: {
          id: this.data.id,
          type: this.type,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("DeleteUser", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "删除成功！",
            type: "success",
            duration: 1000
          });
          this.dialogVisible = false;
          this.refresh();
        } else {
          Message({
            showClose: true,
            message: res.msg || "删除失败！",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    updateEvent() {
      this.updatePopover = false;
      const data = {
        url: "/user/set",
        params: {
          id: this.data.id,
          type: this.type,
          usergroup: this.userInfo.usergroup,
          realname: this.userInfo.username,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("SetUserInfo", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "保存成功！",
            type: "success",
            duration: 1000
          });
          this.refresh();
        } else {
          Message({
            showClose: true,
            message: res.msg || "保存失败！",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    setMenuAuth() {
      this.spePopover = false;
      const data = {
        url: "/menu/specialMenuAuth",
        params: {
          userid: this.data.userid,
          ids: this.pageids.join(","),
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("SetMenuAuth", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "授权成功！",
            type: "success",
            duration: 1000
          });
        } else {
          Message({
            showClose: true,
            message: res.msg || "授权失败！",
            type: "error",
            duration: 3000
          });
        }
      });
    }
  },
  watch: {
    data() {},
    email() {},
    specialMenu() {
      this.setPageId(this.specialMenu || false);
    }
  }
};
</script>

<style lang="scss" scoped>
.table-title {
  padding: 5px 10px;
  color: #409eff;
  border-bottom: 2px solid #409eff;
  margin-bottom: 10px;
}
.pane-title-wrap {
  margin-bottom: 20px;
  .pane-title {
    font-size: 20px;
    color: #409eff;
    text-align: left;
  }
}
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
</style>