<template>
  <div v-if="data">
    <el-dialog :title="`编辑【${data.channel_name}】频道`" :visible.sync="dialogVisible">
      <el-form>
        <el-form-item label="频道名称" label-width="120px" required>
          <el-input v-model="data.channel_name" placeholder="请输入频道名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="频道id" label-width="120px" required>
          <el-input v-model="data.channel_id" placeholder="频道id" clearable></el-input>
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
        <el-button type="primary" v-popover:popoverUpdate>保 存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-popover ref="popDelBtn" placement="top" width="200" v-model="delBtnPopover">
      <p>确定从频道列表删除？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="delBtnPopover = false">取消</el-button>
        <el-button type="primary" round size="mini" @click="deleteEvent()">确定</el-button>
      </div>
    </el-popover>
    <el-button v-if="data.channel_history === 1" style="margin-left: 5px;margin-bottom: 5px;" type="primary" icon="el-icon-edit" plain size="mini" title="编辑" @click="dialogVisible = true"><span class="hidden-xs-only"></span></el-button>
    <el-button style="margin-left: 5px;" type="danger" icon="el-icon-delete" plain size="mini" v-popover:popDelBtn title="删除频道"><span class="hidden-xs-only"></span></el-button>
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
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["data", "callback"],
  methods: {
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    deleteEvent() {
      this.delBtnPopover = false;
      const data = {
        url: "/Channel/",
        params: {
          channel_id: data.channel_id,
          channel_history: data.channel_history,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "删除成功！",
            type: "success",
            duration: 1000
          });
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
        url: "/Channel/",
        params: {
          channel_id: data.channel_id,
          channel_name: data.channel_name,
          channel_history: data.channel_history,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "保存成功！",
            type: "success",
            duration: 1000
          });
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
  },
  watch: {
    data() {}
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