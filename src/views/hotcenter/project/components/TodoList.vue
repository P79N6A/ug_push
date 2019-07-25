<template>
  <div class="todo-list-box">
    <el-dialog title="添加待办事项" :visible.sync="dialogVisible" width="60%">
      <el-form label-position="left" size="small">
        <el-form-item label="事项描述" required>
          <el-input type="textarea" style="max-width: 260px;" v-model="formAdd.item" placeholder="请输入事项描述" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="相关人员" required>
          <el-input style="max-width: 260px;" v-model="formAdd.name" placeholder="请输入相关人员" size="small" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-popover ref="popoverAdd" placement="top" width="200" v-model="addPopover">
          <p>确定添加待办事项？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="addPopover = false">取消</el-button>
            <el-button type="primary" round size="mini" @click="addEvent()">提交</el-button>
          </div>
        </el-popover>
        <el-button @click="cancelEvent()" size="small">取 消</el-button>
        <el-button type="primary" v-popover:popoverAdd size="small">添 加</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="`修改【${curList}】`" :visible.sync="updateVisible" width="60%">
      <el-form label-position="left" size="small">
        <el-form-item label="事项描述" required>
          <el-input type="textarea" style="max-width: 260px;" v-model="formUpdate.item" placeholder="请输入事项描述" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="相关人员" required>
          <el-input style="max-width: 260px;" v-model="formUpdate.name" placeholder="请输入相关人员" size="small" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-popover ref="popoverUpdate" placement="top" width="200" v-model="updatePopover">
          <p>确定保存待办事项？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="updatePopover = false">取消</el-button>
            <el-button type="primary" round size="mini" @click="updateEvent()">确定</el-button>
          </div>
        </el-popover>
        <el-button @click="updateVisible = false" size="small">取 消</el-button>
        <el-button type="primary" v-popover:popoverUpdate size="small">保 存</el-button>
      </div>
    </el-dialog>
    <el-card>
      <div slot="header" class="clearfix">
        <span class="table-title left">待办事项</span>
        <el-button v-if="!readonly" style="float: right;" type="success" size="mini" @click="dialogVisible = true">新增</el-button>
      </div>
      <div v-if="todoList && todoList.length > 1" :style="`animation: moveing ${2 * todoList.length}s ease-in-out infinite;`">
        <div v-for="(item, key) in todoList" :key="key" class="todo-list">
          {{ `${key+1}、${item.item} `}}
          <a class="link-btn">@{{item.name}}</a>
          <el-button v-if="!readonly" class="right" type="danger" icon="el-icon-delete" size="mini" @click="deleteEvent(item.id)"></el-button>
          <el-button v-if="!readonly" style="margin-right: 5px;" class="right" type="primary" icon="el-icon-edit" size="mini" @click="showUpdate(item, key)"></el-button>
        </div>
      </div>
      <div v-else-if="todoList && todoList.length == 1" style="margin-top: -162px;">
        <div v-for="(item, key) in todoList" :key="key" class="todo-list">
          {{ `${key+1}、${item.item} `}}
          <a class="link-btn">@{{item.name}}</a>
          <el-button v-if="!readonly" class="right" type="danger" icon="el-icon-delete" size="mini" @click="deleteEvent(item.id)"></el-button>
          <el-button v-if="!readonly" style="margin-right: 5px;" class="right" type="primary" icon="el-icon-edit" size="mini" @click="showUpdate(item, key)"></el-button>
        </div>
      </div>
      <div class="none-tips" v-else>
        <i class="el-icon-info"></i>
        <span>暂无待办事项</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  name: "todoList",
  data() {
    return {
      dialogVisible: false,
      addPopover: false,
      formAdd: {
        item: "",
        name: ""
      },
      updateVisible: false,
      updatePopover: false,
      formUpdate: {
        item: "",
        name: ""
      },
      curList: "",
      todoList: null
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["readonly"],
  methods: {
    init() {
      this.onSearch();
    },
    onSearch() {
      const param = {
        url: "/project/getBacklog",
        params: {
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", param).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.todoList = res.result;
        }
      });
    },
    deleteEvent(id) {
      this.$confirm("确定删除当前待办事项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.deleteAction(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
            duration: 1000
          });
        });
    },
    deleteAction(id) {
      const condition = {
        id: id
      };
      const param = {
        url: "/project/delBacklog",
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
          this.onSearch();
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
    showUpdate(item, key) {
      this.formUpdate = Object.assign({}, item);
      this.curList = `${key + 1}、${item.item}`;
      this.updateVisible = true;
    },
    updateEvent() {
      this.updatePopover = false;
      if (!this.formUpdate.item) {
        Message({
          showClose: true,
          message: "请填写待办事项描述！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formUpdate.name) {
        Message({
          showClose: true,
          message: "请填写相关人员！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const condition = {
        id: this.formUpdate.id
      };
      const tempData = {
        item: this.formUpdate.item,
        name: this.formUpdate.name
      };
      const param = {
        url: "/project/setBacklog",
        params: {
          where: JSON.stringify(condition),
          data: JSON.stringify(tempData),
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
          this.updateVisible = false;
          this.onSearch();
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
      this.addPopover = false;
      if (!this.formAdd.item) {
        Message({
          showClose: true,
          message: "请填写待办事项描述！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formAdd.name) {
        Message({
          showClose: true,
          message: "请填写相关人员！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const tempData = {
        item: this.formAdd.item,
        name: this.formAdd.name
      };
      const param = {
        url: "/project/addBacklog",
        params: {
          data: JSON.stringify(tempData),
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
          this.cancelEvent();
          this.onSearch();
        }
      });
    },
    cancelEvent() {
      this.dialogVisible = false;
      this.formAdd = {
        item: "",
        name: ""
      };
    }
  },
  created() {
    this.init();
  },
  watch: {
    readonly() {}
  }
};
</script>

<style lang="scss" scoped>
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
.table-title {
  padding: 5px 10px;
  color: #409eff;
  border-bottom: 2px solid #409eff;
}
.pane-title-wrap {
  margin-bottom: 20px;
  .pane-title {
    font-size: 20px;
    color: #409eff;
    text-align: left;
  }
}
.todo-list-box {
  margin-left: 10px;
  margin-bottom: 20px;
}
.todo-list {
  margin-bottom: 10px;
  padding: 8px;
  min-height: 44px;
  line-height: 1.8;
  color: #888;
  font-size: 14px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 1px 1px 2px 2px #ccc;
  cursor: pointer;
}
</style>
<style lang="scss">
@keyframes moveing {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
}
.todo-list-box {
  .el-card__header {
    padding: 10px;
  }
  .el-card__body {
    position: relative;
    padding: 162px 0 0;
    overflow: auto;
    max-height: 164px;
  }
  .none-tips {
    position: absolute;
    color: #e6a23c;
    font-size: 14px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
}
</style>