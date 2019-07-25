<template>
  <el-main v-if="pageAuth === 1">
    <el-row>
      <el-col :span="24">
        <div class="pane-title-wrap">
          <h6 class="pane-title">
            <i class="el-icon-menu hidden-xs-only"></i> 导航栏设置</h6>
        </div>
        <el-dialog width="50%" :title="editTitle" :visible.sync="editFormVisible">
          <el-form :model="editForm" :rules="editRules" ref="editForm">
            <el-form-item label="导航名称" prop="name" :label-width="formLabelWidth">
              <el-input v-model="editForm.name" clearable placeholder="请输入导航名称"></el-input>
            </el-form-item>
            <el-form-item label="导航地址" :label-width="formLabelWidth">
              <el-input v-model="editForm.path" clearable placeholder="请输入导航地址"></el-input>
            </el-form-item>
            <el-form-item label="所属模式" prop="type" :label-width="formLabelWidth">
              <el-select v-model="editForm.type" clearable placeholder="请选择所属模式">
                <el-option v-for="item in typeArr" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="页面权限" :label-width="formLabelWidth" required>
              <el-checkbox-group v-model="checkUpdate" :min="1">
                <el-checkbox :key="key" v-for="(item, key) in authList" :label="item.value">{{item.label}}</el-checkbox>
                <span class="add-tips">（至少选择一种权限）</span>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="导航显示" :label-width="formLabelWidth">
              <el-checkbox v-model="visibleUpdate"></el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="menu-btn" @click="cancelEdit">取 消</el-button>
            <el-button class="menu-btn" type="primary" @click="editItem">修 改</el-button>
          </div>
        </el-dialog>
        <el-dialog width="50%" :title="addTitle" :visible.sync="addFormVisible">
          <el-form :model="addForm" :rules="addRules" ref="addForm">
            <el-form-item label="导航名称" prop="name" :label-width="formLabelWidth">
              <el-input v-model="addForm.name" clearable placeholder="请输入导航名称"></el-input>
            </el-form-item>
            <el-form-item label="导航地址" :label-width="formLabelWidth">
              <el-input v-model="addForm.path" clearable placeholder="请输入导航地址"></el-input>
            </el-form-item>
            <el-form-item label="所属模式" prop="type" :label-width="formLabelWidth">
              <el-select v-model="addForm.type" clearable placeholder="请选择所属模式">
                <el-option v-for="item in typeArr" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="页面权限" :label-width="formLabelWidth" required>
              <el-checkbox-group v-model="checkAdd" :min="1">
                <el-checkbox :key="key" v-for="(item, key) in authList" :label="item.value">{{item.label}}</el-checkbox>
                <span class="add-tips">（至少选择一种权限）</span>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="导航显示" :label-width="formLabelWidth">
              <el-checkbox v-model="visibleAdd"></el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="menu-btn" type="success" @click="addItem(-1)">向前添加</el-button>
            <el-button class="menu-btn" type="warning" @click="addItem(1)">向后添加</el-button>
            <el-button class="menu-btn" type="primary" @click="addItem('child')">添加子项</el-button>
            <el-button class="menu-btn" @click="cancelAdd">取 消</el-button>
          </div>
        </el-dialog>
        <el-row class="content-box-wrap" type="flex" justify="center">
          <el-col :xs="24" :span="23">
          <div class="menu-form">
            <el-tree :data="menuData" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent" v-if="menuData" :props="defaultProps" highlight-current>
            </el-tree>
          </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "setmenu",
  components: {
    Auth
  },
  data() {
    return {
      menuData: null,
      editFormVisible: false,
      addFormVisible: false,
      editTitle: "导航修改",
      addTitle: "导航添加",
      editForm: {
        name: "",
        path: "",
        type: ""
      },
      editRules: {
        name: [
          { required: true, message: "导航名称不能为空", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择所属模式", trigger: "change" }]
      },
      checkAdd: ["inner"],
      checkUpdate: ["inner"],
      visibleAdd: true,
      visibleUpdate: true,
      authList: [
        {
          label: "内部权限可见",
          value: "inner"
        },
        {
          label: "外部权限可见",
          value: "outer"
        },
        {
          label: "特殊权限可见",
          value: "special"
        }
      ],
      addForm: {
        name: "",
        path: "",
        type: ""
      },
      addRules: {
        name: [
          { required: true, message: "导航名称不能为空", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择所属模式", trigger: "change" }]
      },
      typeArr: [
        {
          value: 1,
          label: "全部模式"
        },
        {
          value: 2,
          label: "应用模式"
        },
        {
          value: 3,
          label: "开发模式"
        }
      ],
      formLabelWidth: "80px",
      defaultProps: {
        children: "list",
        label: "name"
      }
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email", "menulist"])
  },
  methods: {
    init() {
      if (this.pageAuth == 1) {
        this.menuData = this.objToArr(this.menulist);
      }
    },
    setMenu() {
      const params = {
        userid: this.email,
        username: this.email,
        cip: 230
      };
      this.$store.dispatch("GetMenu", params).then(() => {
        Message({
          showClose: true,
          message: "success",
          type: "success",
          duration: 1000
        });
      });
    },
    renderContent(h, { node, data, store }) {
      const delParam = {
        title: "提示",
        message: "将删除菜单及其子项, 是否继续?",
        cancelMsg: "已取消删除",
        callback: this.deleteItem,
        callbackData: data.id
      }
      return (
        <span
          class="custom-tree-node"
        >
          <span class="menu-label" draggable="false">
            {node.label}
          </span>
          <span draggable="false">
            <i
              title="修改"
              class="el-icon-edit menu-edit"
              on-click={() => this.editEvent(data)}
            />
            <i
              title="添加"
              class="el-icon-circle-plus menu-add"
              on-click={() => this.addEvent(data)}
            />
            <i
              title="删除"
              class="el-icon-delete menu-delete"
              on-click={() => this.alertBox(delParam)}
            />
          </span>
        </span>
      )
    },
    deleteItem(id) {
      const params = {
        id: id,
        username: this.email,
        cip: 230
      };
      this.$store.dispatch("DeleteItem", params).then(() => {
        this.setMenu();
      });
    },
    editEvent(data) {
      this.editTitle = `【${data.name}】— 修改`;
      this.editForm = {
        name: data.name,
        path: data.path || "",
        type: data.type,
        id: data.id,
        level: data.level,
        fid: data.fid,
        time: data.time
      };
      this.checkUpdate = data.auth.split(",");
      this.visibleUpdate = Boolean(data.visible);
      this.editFormVisible = true;
    },
    editItem() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.editFormVisible = false;
          const defaultObj = {
            username: this.email,
            cip: 230
          };
          const params = {
            ...this.editForm,
            ...defaultObj,
            ...{
              auth: this.checkUpdate.join(","),
              visible: Number(this.visibleUpdate)
            }
          };
          this.$store.dispatch("EditItem", params).then(() => {
            this.setMenu();
          });
        } else {
          return false;
        }
      });
    },
    cancelEdit() {
      this.$refs["editForm"].resetFields();
      this.editFormVisible = false;
    },
    addEvent(data) {
      this.addTitle = `【${data.name}】— 添加`;
      this.addForm = {
        name: "",
        path: "",
        id: data.id,
        level: data.level,
        fid: data.fid,
        time: data.time
      };
      this.checkAdd = ["inner"];
      this.visibleAdd = true;
      this.addFormVisible = true;
    },
    addItem(t) {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          if (t == "child") {
            this.addForm.level = (Number(this.addForm.level) + 1).toString();
            this.addForm.fid = this.addForm.id;
            delete this.addForm.time;
          } else {
            this.addForm.time += t;
          }
          delete this.addForm.id;

          const defaultObj = {
            username: this.email,
            cip: 230
          };
          const params = {
            ...this.addForm,
            ...defaultObj,
            ...{
              auth: this.checkAdd.join(","),
              visible: Number(this.visibleAdd)
            }
          };
          this.$store.dispatch("AddItem", params).then(res => {
            if (res.code && Number(res.code) == 200) {
              this.addFormVisible = false;
              this.setMenu();
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
    cancelAdd() {
      this.$refs["addForm"].resetFields();
      this.checkAdd = ["inner"];
      this.visibleAdd = true;
      this.addFormVisible = false;
    },
    alertBox(params) {
      this.$confirm(params.message, params.title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          params.callback && params.callback(params.callbackData);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: params.cancelMsg,
            duration: 1000
          });
        });
    },
    objToArr(obj) {
      let res = [];
      for (let i in obj) {
        if (obj[i].list) {
          obj[i].list = this.objToArr(obj[i].list);
        }
        res.push(obj[i]);
      }
      return res;
    }
    // drag(ev) {
    //   ev.dataTransfer.setData("Text", ev.target.id);
    // },
    // allowDrop(ev) {
    //   ev.preventDefault();
    // },
    // drop(ev) {
    //   ev.preventDefault();
    //   const data = ev.dataTransfer.getData("Text");
    //   console.log('drag data:', data);
    //   console.log('drop event:', ev.target)
    //   console.log('drop data:', ev.target.id);
    // }
  },
  created() {
    this.init();
  },
  watch: {
    email() {},
    pageAuth() {
      this.init();
    },
    menulist() {
      this.init();
    }
  }
};
</script>

<style lang="scss">
body {
  .el-container {
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
      .content-box-wrap {
        padding: 10px;
      }
    }
    .menu-form {
      padding: 20px;
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
        0 2px 4px 0 rgba(232, 237, 250, 0.5);
      border: 1px solid #ebebeb;
      border-radius: 3px;
    }
    .menu-btn {
      margin-top: 10px;
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
      .menu-add {
        margin-left: 10px;
        color: #67c23a;
      }
      .menu-edit {
        margin-left: 10px;
        color: #409eff;
      }
      .menu-delete {
        margin-left: 10px;
        color: #f56c6c;
      }
      .menu-drag {
        margin-left: 10px;
        color: #909399;
        cursor: move;
      }
    }
    .add-tips {
      margin-left: 1rem;
      font-size: 0.7rem;
      color: #e6a23c;
    }
  }
}
</style>
