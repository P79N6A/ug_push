<template>
  <div v-if="data">
    <el-dialog title="编辑角色用户" :visible.sync="dialogVisible">
      <el-form size="small" label-width="100px">
        <el-form-item label="领域业务方">
          <el-input style="max-width: 400px;" v-model="data.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱前缀">
          <el-select v-model="prefix" multiple default-first-option placeholder="输入用户邮箱前缀">
          <!-- <el-select v-model="prefix" multiple filterable allow-create default-first-option placeholder="输入用户邮箱前缀"> -->
            <el-option v-for="item in data.account" :key="item.id" :label="item.email_prefix" :value="item.email_prefix">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelEvent()" size="small">取 消</el-button>
        <el-button type="primary" icon="el-icon-edit" title="编辑" size="mini" @click="setEvent()">
          <span class="hidden-xs-only">保存</span>
        </el-button>
      </div>
    </el-dialog>
    <el-button type="primary" icon="el-icon-edit" title="编辑" size="mini" @click="dialogVisible = true">
      <span class="hidden-xs-only">编辑</span>
    </el-button>
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
      prefix: []
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["data", "apiconf", "callback"],
  methods: {
    init() {
      this.prefix = [];
      if (this.data.account && this.data.account.length > 0) {
        for (let i = 0; i < this.data.account.length; i++) {
          this.prefix.push(this.data.account[i].email_prefix);
        }
      }
    },
    setEvent() {
      const data = {
        url: this.apiconf.setFieldAccount,
        params: {
          field_id: this.data.id,
          prefix: this.prefix.join(","),
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
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
            duration: 0
          });
        }
      });
    },
    cancelEvent() {
      this.dialogVisible = false;
      this.init();
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