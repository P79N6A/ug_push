<template>
  <div>
    <el-dialog
      v-if="dialogVisible && formData"
      title="编辑服务kv值"
      :visible.sync="dialogVisible"
    >
      <el-form
        :model="formData"
        label-width="70px"
        label-position="left"
        :rules="rules"
        size="small"
      >
        <el-form-item
          label="服务名称"
          prop="name"
        >
          <span>{{formData.parent_name}}</span>
        </el-form-item>
        <el-form-item
          label="key"
          prop="key"
          required
        >
          <span>{{formData.key}}</span>
        </el-form-item>
        <el-form-item
          label="value"
          prop="value"
          required
        >
          <el-input
            type="textarea"
            autosize
            v-model.trim="formData.value"
            placeholder="请输入value值"
            clearable
            style="max-width: 360px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="描述"
          prop="description"
        >
          <el-input
            type="textarea"
            autosize
            v-model.trim="formData.description"
            placeholder="请输入描述"
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
      type="primary"
      icon="el-icon-edit"
      plain
      size="mini"
      title="编辑"
      @click="handleEdit()"
    ><span class="hidden-xs-only">编辑</span></el-button>
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
        value: [
          { required: true, message: "请输入value值", trigger: "blur" },
          { required: true, message: "请输入value值", trigger: "change" }
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
    handleEdit() {
      const temp = JSON.parse(JSON.stringify(this.data));
      this.formData = {
        ...temp,
        parent_id: this.$route.query.parent_id,
        parent_name: this.$route.query.name
      };
      this.dialogVisible = true;
    },
    setEvent() {
      // 修改服务kv值
      if (this.formData.value == undefined) {
        Message({
          showClose: true,
          message: "value值不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.formData.description == undefined) {
        Message({
          showClose: true,
          message: "描述不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将保存服务kv值, 是否继续?", "提示", {
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
        params.append("parent_name", this.formData.parent_name);
        params.append("parent_id", this.formData.parent_id);
        params.append("key", this.formData.key);
        params.append("id", this.formData.id);
        params.append("value", this.formData.value);
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
              reject(res.msg || "服务kv值保存失败！");
            }
          },
          err => {
            reject(res.msg || "服务kv值保存接口请求失败！");
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