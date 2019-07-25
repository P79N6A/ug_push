<template>
    <div v-if="data">
        <el-dialog title="请选择有效期" :visible.sync="dialogFormVisible">
          <el-form size="small">
            <el-form-item label="有效期至" label-width="80px" required>
              <el-radio-group v-model="is_expired">
                <el-radio style="margin-top: 5px;margin-left: 10px;" :label="0" @change="changeEpireTime">永久</el-radio>
                <el-radio style="margin-top: 5px;margin-left: 10px;" :label="1">自定义</el-radio>
              </el-radio-group>
              <transition name="fade">
              <el-date-picker v-show="is_expired" style="margin-bottom: 5px; margin-left: 10px; width: 160px;" v-model="expire_time" type="date" format="yyyy年MM月dd日" value-format="timestamp" placeholder="请选择日期">
              </el-date-picker>
              </transition>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="passEvent" size="small">确 定</el-button>
          </div>
        </el-dialog>
        <el-button v-if="data.audit_type === 0" style="margin-left: 5px;margin-bottom: 5px;" type="success" icon="el-icon-check" plain size="mini" title="通过审核" @click="passEvent()">
            <span class="hidden-xs-only">通过</span>
        </el-button>
        <el-button v-if="data.audit_type === 2" style="margin-left: 5px;margin-bottom: 5px;" type="success" icon="el-icon-check" plain size="mini" title="重审通过" @click="showPass()">
            <span class="hidden-xs-only">重审通过</span>
        </el-button>
        <el-button v-if="data.do_online === 0" style="margin-left: 5px;" type="danger" icon="el-icon-delete" plain size="mini" title="重新上线" @click="deleteEvent()">
            <span class="hidden-xs-only">重新上线</span>
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
        delFieldBlack: "/field/delFieldBlack", //黑名单重新上线
        blackAuditPass: "/field/blackAuditPass" //黑名单通过审核
      },
      dialogFormVisible: false,
      is_expired: 0,
      expire_time: ''
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
    changeEpireTime() {
      if (!this.is_expired) {
        this.expire_time = "";
      }
    },
    deleteEvent() {
      this.$confirm("确定重新上线?", "", {
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
        url: this.apiConf.delFieldBlack,
        params: {
          uid: this.data.uid,
          audit_type: 1, //审核人员审核重新上线，普通用户不可再操作
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
            duration: 0
          });
        }
      });
    },
    showPass() {
      this.dialogFormVisible = true;
      
    },
    passEvent() {
      let tip = '';
      if (this.data.audit_type === 2) {
        tip = "确定通过重审？";
      } else {
        tip = "确定通过审核?";
      }
      this.$confirm(tip, "", {
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
        field_id: this.data.field_id,
        uid: this.data.uid,
        audit_type: 1, //审核人员审核黑名单通过，普通用户不可再操作
        username: this.email,
        cip: 230
      }
      if (this.data.audit_type === 2) {
        params.is_expired = this.is_expired;
        params.expire_time = this.expire_time;
        if (this.is_expired && !this.expire_time) {
            Message({
              showClose: true,
              message: "请选择有效期！",
              type: "error",
              duration: 1000
            });
            return;
          }
      }
      const data = {
        url: this.apiConf.blackAuditPass,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "审核成功！",
            type: "success",
            duration: 1000
          });
          this.callback();
        } else {
          Message({
            showClose: true,
            message: res.msg || "审核失败!",
            type: "error",
            duration: 0
          });
        }
      });
      this.dialogFormVisible = false;
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>