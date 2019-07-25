<template>
  <div v-if="data && data.status === 0"> 
    <el-popover ref="popAddBtn" placement="top" width="200" v-model="addBtnPopover">
      <p>确定上线URL？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="addBtnPopover = false">取消</el-button>
        <el-button type="primary" round size="mini" @click="setEvent()">确定</el-button>
      </div>
    </el-popover>
    <el-button type="success" icon="el-icon-check" plain size="mini" v-popover:popAddBtn title="上线"><span class="hidden-xs-only">上线</span></el-button>
  </div>
  <div v-else-if="data && data.status === 1">
      <el-popover ref="popDelBtn" placement="top" width="200" v-model="delBtnPopover">
      <p>确定下线URL？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="delBtnPopover = false">取消</el-button>
        <el-button type="primary" round size="mini" @click="deleteEvent()">确定</el-button>
      </div>
    </el-popover>
    <el-button type="danger" icon="el-icon-delete" plain size="mini" v-popover:popDelBtn title="下线"><span class="hidden-xs-only">下线</span></el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  name: "operateURL",
  data() {
    return {
      delPopover: false,
      delBtnPopover: false,
      addBtnPopover: false,
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["data", "kapi", "callback"],
  methods: {
    deleteEvent() {
      this.delPopover = false;
      this.delBtnPopover = false;
      const data = {
        url: this.kapi.del,
        params: {
          kid: this.data.id,
          channel_history: this.data.channel_history,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "下线成功！",
            type: "success",
            duration: 1000
          });
          this.callback();
        } else {
          Message({
            showClose: true,
            message: res.msg || "下线失败!",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    setEvent() {
      this.addBtnPopover = false;
      const data = {
        url: this.kapi.set,
        params: {
          kid: this.data.id,
          channel_history: this.data.channel_history,
          status: 1,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "上线成功！",
            type: "success",
            duration: 1000
          });
          this.dialogVisible = false;
          this.callback();
        } else {
          Message({
            showClose: true,
            message: res.msg || "上线失败!",
            type: "error",
            duration: 3000
          });
        }
      });
    }
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
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
</style>