<template>
  <div>
    <el-dialog
      v-if="dialogVisible && formData"
      title="编辑配置服务"
      :visible.sync="dialogVisible"
    >
      <el-form
        :model="formData"
        label-width="80px"
        :rules="rules"
        size="small"
      >
        <el-form-item
          label="服务名称"
          prop="name"
        >
          <span>{{formData.name}}</span>
        </el-form-item>
        <el-form-item
          label="服务描述"
          prop="description"
          required
        >
          <el-input
            type="textarea"
            autosize
            v-model.trim="formData.description"
            placeholder="请输入服务描述"
            clearable
            style="max-width: 360px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="dialogVisible = false;"
          size="small"
        >取 消</el-button>
        <el-button
          type="primary"
          size="small"
          @click="setEvent()"
        >保 存</el-button>
      </div>
    </el-dialog>
    <el-button
      style="margin: 5px;"
      type="primary"
      icon="el-icon-edit"
      plain
      size="mini"
      title="编辑"
      @click="handleEdit()"
    ><span class="hidden-xs-only">编辑</span></el-button>
    <el-button
      style="margin: 5px;"
      type="danger"
      icon="el-icon-delete"
      plain
      size="mini"
      title="删除"
      @click="deleteEvent()"
    ><span class="hidden-xs-only">删除</span></el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  name: "operateWhite",
  data() {
    return {
      dialogVisible: false,
      rules: {
        description: [
          { required: true, message: "请输入配置服务描述", trigger: "blur" },
          { required: true, message: "请输入配置服务描述", trigger: "change" }
        ]
      },
      formData: null
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["data", "rapi", "callback"],
  methods: {
    deleteEvent() {
      this.$confirm("将删除配置服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.deleteAction().then(
            () => {
              this.callback();
            },
            err => {
              Message({
                showClose: true,
                message: err,
                type: "error",
                duration: 3000
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除！"
          });
        });
    },
    deleteAction() {
      return new Promise((resolve, reject) => {
        const data = {
          url: this.rapi.del,
          params: {
            id: this.data.id,
            username: this.email,
            cip: 230
          }
        };
        this.$store.dispatch("CommonGet", data).then(
          res => {
            if (res.code && Number(res.code) == 200) {
              resolve();
            } else {
              reject(res.msg || "配置服务删除失败！");
            }
          },
          err => {
            reject(res.msg || "配置服务删除请求接口失败！");
          }
        );
      });
    },
    handleEdit() {
      this.formData = JSON.parse(JSON.stringify(this.data));
      this.dialogVisible = true;
    },
    setEvent() {
      // 修改配置服务
      if (this.formData.description == undefined || this.formData.description === "") {
        Message({
          showClose: true,
          message: "服务描述不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将保存配置服务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.setAction().then(
            () => {
              this.callback();
            },
            err => {
              Message({
                showClose: true,
                message: err,
                type: "error",
                duration: 3000
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消编辑！"
          });
        });
    },
    setAction() {
      return new Promise((resolve, reject) => {
        let params = new URLSearchParams();
        params.append("id", this.formData.id);
        params.append("description", this.formData.description);
        params.append("username", this.email);
        const data = {
          url: this.rapi.set,
          params: params
        };
        this.$store.dispatch("CommonPost", data).then(
          res => {
            if (res.code && res.code == 200) {
              this.dialogVisible = false;
              resolve();
            } else {
              reject(res.msg || "配置服务保存失败！");
            }
          },
          err => {
            reject(res.msg || "配置服务保存接口请求失败！");
          }
        );
      });
    }
  },
  watch: {
    data() {}
  }
};
</script>