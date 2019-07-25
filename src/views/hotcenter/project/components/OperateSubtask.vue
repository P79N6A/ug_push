<template>
    <div v-if="curData">
        <el-dialog :title="`编辑子任务【${curData.name}】`" :visible.sync="dialogVisible" width="60%">
            <el-form label-position="left" size="small">
                <el-form-item label="名称" required>
                    <el-input style="max-width: 260px;" v-model="curData.name" placeholder="请输入子任务名称" size="small" clearable></el-input>
                </el-form-item>
                <el-form-item label="完成时间" required>
                    <!-- <el-date-picker v-model="curData.end_time" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="timestamp"> -->
                    <el-date-picker v-model="curData.end_time" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
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
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
            </div>
        </el-dialog>
        <el-popover ref="popDelBtn" placement="top" width="200" v-model="delBtnPopover">
            <p>确定删除该子任务？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="delBtnPopover = false">取消</el-button>
                <el-button type="primary" round size="mini" @click="deleteEvent()">确定</el-button>
            </div>
        </el-popover>
        <el-button style="margin-left: 5px;margin-bottom: 5px;" type="primary" icon="el-icon-edit" plain size="mini" title="编辑" @click="showEditDialog()">
            <span class="hidden-xs-only">编辑</span>
        </el-button>
        <el-button style="margin-left: 5px;" type="danger" icon="el-icon-delete" plain size="mini" v-popover:popDelBtn title="删除">
            <span class="hidden-xs-only">删除</span>
        </el-button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "operateProject",
  data() {
    return {
      dialogVisible: false,
      delBtnPopover: false,
      updatePopover: false,
      curData: null
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["data", "callback"],
  methods: {
    init() {
      this.curData = Object.assign({}, this.data);
    },
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    showEditDialog() {
      this.init();
      this.dialogVisible = true;
    },
    deleteEvent() {
      this.delBtnPopover = false;
      const condition = {
        id: this.curData.id,
        // project_id: this.curData.project_id
      };
      const param = {
        url: "/project/delSubtask",
        params: {
          where: JSON.stringify(condition),
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", param).then(res => {
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
      if (!this.curData.name) {
        Message({
          showClose: true,
          message: "请填子任务名称！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.curData.end_time) {
        Message({
          showClose: true,
          message: "请选择子任务完成日期！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const condition = {
        id: this.curData.id,
        // project_id: this.curData.project_id
      };
      let timeline = [];
      if (this.data.time_list) {
          timeline = this.data.time_list.split(',');
      }
      timeline.push(this.data.end_time);
      const subtaskData = {
        name: this.curData.name,
        end_time: this.curData.end_time,
        time_list: timeline.join(',')
      };
      const param = {
        url: "/project/setSubtask",
        params: {
          where: JSON.stringify(condition),
          data: JSON.stringify(subtaskData),
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", param).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "保存成功！",
            type: "success",
            duration: 1000
          });
          this.dialogVisible = false;
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