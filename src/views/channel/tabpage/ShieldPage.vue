<template>
    <div>
        <el-row class="pane-title-wrap" type="flex" justify="center">
            <el-col :span="23">
                <h6 class="pane-title">
                    <i class="el-icon-goods" style="margin-right: 6px;"></i>屏蔽操作</h6>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="23">
                <el-form :model="formInline">
                    <el-form-item label="输入物料" required>
                        <!-- <el-select v-model="formInline.content" multiple filterable allow-create default-first-option placeholder="输入mid 选中/回车分隔" :no-data-text="`输入mid 选中/回车分隔`">
                            <el-option v-for="item in []" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select> -->
                        <el-input type="textarea" style="max-width: 400px;" v-model="formInline.content" placeholder="输入mid 多个值,分隔" :autosize="{ minRows: 2, maxRows: 6 }" :clearable="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-popover ref="popover" placement="right" width="200" v-model="formInline.popover">
                            <p>确定屏蔽以上物料？</p>
                            <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="formInline.popover = false">取消</el-button>
                                <el-button type="primary" round size="mini" @click="onSubmit()">确定</el-button>
                            </div>
                        </el-popover>
                        <el-button type="success" size="small" v-popover:popover>屏蔽物料</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "shieldPage",
  data() {
    return {
      cname: "",
      formInline: {
        popover: false,
        content: ""
      }
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  methods: {
    onSubmit() {
      this.formInline.popover = false;
      // const content = this.formInline.content.join(',');
      if (!this.formInline.content) {
          Message({
            showClose: true,
            message: "请输入mid！",
            type: "error",
            duration: 1000
          });
          return;
      }
      const tempData = {
        url: `${domain}/3/admin/apiAgent`,
        param: {
          staff: this.email,
          source: source,
          action: 'off',
          flow: 3,
          type: 1,
          data: this.formInline.content
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ShieldMaterial", params);
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.pane-title-wrap {
  margin-bottom: 20px;
  .pane-title {
    font-size: 20px;
    color: #409eff;
    text-align: left;
  }
}
</style>