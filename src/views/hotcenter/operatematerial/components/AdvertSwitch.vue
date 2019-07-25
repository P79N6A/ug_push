<template>
  <el-row
    type="flex"
    align="middle"
    justify="start"
  >
    <el-col
      :xs="24"
      :sm="18"
      :md="12"
      :lg="9"
      :xl="4"
    >
      <el-form
        :model="advertForm"
        ref="advertForm"
        label-width="60px"
        class="pane-form"
        size="small"
      >
        <el-form-item
          label="类型"
          prop="type"
        >
          <el-select
            v-model="advertForm.type"
            placeholder="请选择"
          >
            <el-option
              v-for="item in advertForm.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="data">
          <el-switch
            v-model="advertForm.data"
            active-text="开启过滤生效"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-popover
            ref="advertPop"
            placement="bottom"
            width="200"
            v-model="advertForm.popover"
          >
            <p>确定保存？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="advertForm.popover = false"
              >取消</el-button>
              <el-button
                type="primary"
                round
                size="mini"
                @click="advertEvent()"
              >确定</el-button>
            </div>
          </el-popover>
          <el-button
            type="success"
            size="small"
            v-popover:advertPop
          >保存</el-button>
          <el-button
            type="info"
            size="small"
            plain
            @click="resetForm('advertForm')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "AdvertSwitchPane",
  data() {
    return {
        advertForm: {
        type: "hotmblog_ad_top",
        data: true,
        popover: false,
        options: [
          {
            value: "hotmblog_ad_top",
            label: "position为0的广告"
          },
          {
            value: "hotmblog_ad_top_banner",
            label: "微博之夜"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    advertEvent() {
      this.advertForm.popover = false;
      const tempData = {
        url: `${domain}/3/admin/activeAd`,
        param: {
          staff: this.email,
          source: source,
          type: this.advertForm.type,
          data: this.advertForm.data ? 2 : 1,
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("FilterAdvert", params);
    }
  },
  watch: {
    email() {}
  }
};
</script>

<style lang="scss" scoped>
.pane-form {
  margin-top: 10px;
  padding: 20px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  border: 1px solid #ebebeb;
  border-radius: 3px;
}
</style>