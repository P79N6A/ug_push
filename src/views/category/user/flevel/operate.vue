<template>
  <div v-if="data">
    <el-dialog
      title="选择不通过理由及有效期"
      :visible.sync="delDialogVisible"
    >
      <el-form size="small">
        <el-form-item
          label="选择有效期"
          label-width="100px"
          required
        >
          <el-radio-group v-model="is_expired">
            <el-radio
              style="margin-top: 5px;margin-left: 10px;"
              :label="0"
              @change="changeEpireTime"
            >永久</el-radio>
            <el-radio
              style="margin-top: 5px;margin-left: 10px;"
              :label="1"
            >自定义</el-radio>
          </el-radio-group>
          <transition name="fade">
            <el-date-picker
              v-show="is_expired"
              style="margin-bottom: 5px; margin-left: 10px; width: 160px;"
              v-model="expire_time"
              type="date"
              format="yyyy年MM月dd日"
              value-format="timestamp"
              placeholder="请选择日期"
            >
            </el-date-picker>
          </transition>
        </el-form-item>
        <el-form-item label="博主发布内容：">
          <el-radio-group v-model="deleteCause">
            <el-radio
              style="margin-top: 5px;margin-left: 10px;"
              :key="key"
              v-for="(item, key) in delResonList"
              :label="item.value"
            >{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="delDialogVisible = false"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="deleteEvent()"
          size="small"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-button
      style="margin-left: 5px;margin-bottom: 5px;"
      type="success"
      icon="el-icon-check"
      plain
      size="mini"
      title="通过为白名单"
      @click="passEvent()"
    >
      <span class="hidden-xs-only">通过</span>
    </el-button>
    <el-button
      style="margin-left: 5px;"
      type="danger"
      icon="el-icon-delete"
      plain
      size="mini"
      title="不通过进入到黑名单"
      @click="delDialogVisible = true;deleteCause = '2';"
    >
      <span class="hidden-xs-only">不通过</span>
    </el-button>
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
      apiConf: {
        //API
        setOnline: "/field/setOnline"//头部用户加入白名单（通过）/黑名单（不通过）
      },
      delDialogVisible: false,
      deleteCause: "2",
      is_expired: 0,
      expire_time: "",
      delResonList: [
        {
          label: "广告营销",
          value: "2"
        },
        {
          label: "搬运低质",
          value: "3"
        },
        {
          label: "恶意涨粉涨互动",
          value: "6"
        },
        {
          label: "博主发博与领域严重不符且低质",
          value: "1"
        },
        {
          label: "色情",
          value: "4"
        },
        {
          label: "政治敏感",
          value: "5"
        },
        {
          label: "不实造谣炒作",
          value: "7"
        },
        {
          label: "其他",
          value: "8"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["data", "callback", "role"],
  methods: {
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    changeEpireTime() {
      if (!this.is_expired) {
        this.expire_time = "";
      }
    },
    deleteEvent() {
      if (this.is_expired && !this.expire_time) {
        Message({
          showClose: true,
          message: "请选择有效期！",
          type: "error",
          duration: 1000
        });
        return;
      }
      this.$confirm("确定不通过，加入黑名单?", "不通过提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.deleteAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    deleteAction() {
      const data = {
        url: this.apiConf.setOnline,
        params: {
          ids: this.data.id,
          type: 2,
          audit_type: this.role === 3 ? 0 : 1,
          expire_time: this.expire_time,
          is_expired: this.is_expired,
          cause: this.deleteCause,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.delDialogVisible = false;
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
            duration: 0
          });
        }
      });
    },
    passEvent() {
      this.$confirm("确定通过为白名单？", "通过提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.passAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    passAction() {
      let params = {
        ids: this.data.id,
        type: 1,
        audit_type: this.role === 3 ? 0 : 1,
        username: this.email,
        cip: 230
      };
      const data = {
        url: this.apiConf.setOnline,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: res.msg || "成功通过为白名单！",
            type: "success",
            duration: 1000
          });
          this.callback();
        } else {
          Message({
            showClose: true,
            message: res.msg || "通过为白名单失败!",
            type: "error",
            duration: 0
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "通过为白名单接口请求失败!",
          type: "success",
          duration: 0
        });
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
.white-item {
  max-width: 100%;
  width: 270px;
}
.white-tips {
  margin-top: 6px;
  line-height: 1.5;
  color: #e6a23c;
  font-size: 12px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>