<template>
  <div v-if="curData">
    <el-dialog :title="`编辑【${curData.name}】`" :visible.sync="dialogVisible" width="60%">
      <el-form size="small">
        <el-form-item label="项目名称" required>
          <el-input style="max-width: 260px;" v-model="curData.name" placeholder="请输入项目名称" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="分类" required>
          <el-radio-group v-model="curData.type" size="small">
            <el-radio :label="1">A级</el-radio>
            <el-radio :label="2">B级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" required>
          <el-radio-group v-model="curData.state" size="small">
            <el-radio :label="1">进行中</el-radio>
            <el-radio :label="2">已完成</el-radio>
            <el-radio :label="3">已关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="需求人" required>
          <el-input type="textarea" style="max-width: 260px;" v-model="curData.demander" placeholder="请输入需求人 多个用值用英文逗号(,)分隔" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="负责人" required>
          <el-input type="textarea" style="max-width: 260px;" v-model="curData.responsible" placeholder="请输入负责人 多个用值用英文逗号(,)分隔" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="参与者" required>
          <el-input type="textarea" style="max-width: 260px;" v-model="curData.participant" placeholder="请输入参与者 多个用值用英文逗号(,)分隔" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="项目描述">
          <el-input type="textarea" style="max-width: 260px;" v-model="curData.describe" placeholder="请输入项目描述" size="small" clearable></el-input>
        </el-form-item>
      </el-form>
      <el-row v-if="curData.subtaskList">
        <h6 class="clearfix">
          <div class="table-title left">【子任务】</div>
          <el-button class="right" type="success" round size="mini" @click="isShowAdd = true">新增子任务</el-button>
        </h6>
        <el-form label-position="left" v-if="isShowAdd" size="small">
          <el-form-item label="子任务名称" required>
            <el-input style="max-width: 260px;" v-model="formAdd.name" placeholder="请输入子任务名称" size="small" clearable></el-input>
          </el-form-item>
          <el-form-item label=" 完 成 时 间" required>
            <el-date-picker v-model="formAdd.end_time" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="addEvent()">添加</el-button>
            <el-button size="mini" @click="cancelAdd()">取消</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="curData.subtaskList" style="width: 100%" border stripe>
          <el-table-column align="left" prop="name" label="名称">
          </el-table-column>
          <el-table-column align="left" prop="create_time" label="完成日期">
            <template slot-scope="scope">
              <div v-if="scope.row.time_list">
                <span class="task-overtime" :key="idx" v-for="(obj, idx) in scope.row.time_list.split(',')">{{obj}}<br /></span>
              </div>
              <span>{{scope.row.end_time}}</span>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="create_time" label="操作">
            <template slot-scope="scope">
              <operate-subtask :data="scope.row" :callback="callback"></operate-subtask>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
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
      <p>确定删除该项目？</p>
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
import OperateSubtask from "./OperateSubtask";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "operateProject",
  components: {
    OperateSubtask
  },
  data() {
    return {
      dialogVisible: false,
      delBtnPopover: false,
      updatePopover: false,
      curData: null,
      isShowAdd: false,
      formAdd: {
        name: "",
        end_time: ""
      }
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
        id: this.curData.id
      };
      const param = {
        url: "/project/delProject",
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
          message: "请填写项目名称！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.curData.demander) {
        Message({
          showClose: true,
          message: "请填写项目需求人！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.curData.responsible) {
        Message({
          showClose: true,
          message: "请填写项目负责人！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.curData.participant) {
        Message({
          showClose: true,
          message: "请填写项目参与者！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const condition = {
        id: this.curData.id
      };
      const data = {
        name: this.curData.name,
        state: this.curData.state,
        type: this.curData.type,
        describe: this.curData.describe,
        demander: this.curData.demander,
        responsible: this.curData.responsible,
        participant: this.curData.participant
      };
      const param = {
        url: "/project/setProject",
        params: {
          where: JSON.stringify(condition),
          data: JSON.stringify(data),
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
    addEvent() {
      if (!this.formAdd.name) {
        Message({
          showClose: true,
          message: "请填子任务名称！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formAdd.end_time) {
        Message({
          showClose: true,
          message: "请选择子任务完成日期！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const subtaskData = {
        project_id: this.curData.id,
        name: this.formAdd.name,
        end_time: this.formAdd.end_time
      };
      const param = {
        url: "/project/addSubtask",
        params: {
          subtaskData: JSON.stringify(subtaskData),
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", param).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "添加成功！",
            type: "success",
            duration: 1000
          });
          this.cancelAdd();
          this.callback();
        }
      });
    },
    cancelAdd() {
      this.isShowAdd = false;
      this.formAdd = {
        name: "",
        end_time: ""
      };
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
.task-overtime {
  color: #f56c6c;
  text-decoration: line-through;
}
</style>