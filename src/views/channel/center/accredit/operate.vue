<template>
  <div v-if="data">
    <el-dialog :title="`【${data.username}】用户 频道授权`" :visible.sync="dialogVisible">
      <el-form  size="small">
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="data.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="授权频道" label-width="120px" required v-if="channels">
            <el-select v-model="selectedChannel" filterable multiple placeholder="请选择频道" clearable>
                <el-option v-for="(item, key) in channels" :key="key" :label="item.channel_name" :value="`${item.channel_history}:${item.cid}`"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-popover ref="popoverUpdate" placement="top" width="200" v-model="updatePopover">
          <p>确定保存当前修改？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="updatePopover = false">取消</el-button>
            <el-button type="primary" round size="mini" @click="updateEvent()">确定</el-button>
          </div>
        </el-popover>
        <el-button type="primary" v-popover:popoverUpdate size="small">保 存</el-button>
        <el-button @click="cancelEvent()" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-popover ref="popDelBtn" placement="top" width="200" v-model="delBtnPopover">
      <p>确定删除所有授权频道？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="delBtnPopover = false">取消</el-button>
        <el-button type="primary" round size="mini" @click="deleteEvent()">确定</el-button>
      </div>
    </el-popover>
    <el-button style="margin-left: 5px;margin-bottom: 5px;" type="primary" icon="el-icon-edit" plain size="mini" title="编辑" @click="dialogVisible = true"><span class="hidden-xs-only"></span></el-button>
    <el-button style="margin-left: 5px;" type="danger" icon="el-icon-delete" plain size="mini" v-popover:popDelBtn title="删除授权用户"><span class="hidden-xs-only"></span></el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "operateWhite",
  data() {
    return {
      dialogVisible: false,
      delBtnPopover: false,
      updatePopover: false,
      selectedChannel: [],
      tempval: []
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["data", "callback", "defaultChannel", "channels"],
  methods: {
    init() {
        const list = this.data.channellist;
        if (list && list.length > 0) {
          this.selectedChannel = [];
          for (let i=0; i<list.length; i++) {
            this.selectedChannel.push(`${list[i].channel_history}:${list[i].cid}`);
          }
          this.tempval = this.selectedChannel;
        }
    },
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    deleteEvent() {
      this.delBtnPopover = false;
      const data = {
        url: "/channel_auth/delCAuthByUnames",
        params: {
          userids: this.data.username,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.dialogVisible = false;
          this.callback();
        } else {
          Message({
            showClose: true,
            message: res.msg || "删除失败!",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    updateEvent() {
      this.updatePopover = false;
      const data = {
        url: "/channel_auth/setCAuthByuserid",
        params: {
          channellist: this.selectedChannel.join(','),
          userid: this.data.username,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.callback();
        } else {
          Message({
            showClose: true,
            message: res.msg || "保存失败!",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    cancelEvent() {
        this.dialogVisible = false;
        this.selectedChannel = this.tempval;
    }
  },
  created() {
      this.init();
  },
  watch: {
    data() {
        this.init();
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
</style>