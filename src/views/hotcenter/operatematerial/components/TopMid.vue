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
        :model="goTopForm"
        :rules="goTopRules"
        ref="goTopForm"
        label-width="100px"
        class="pane-form"
        size="small"
      >
        <el-form-item
          label="微博mid"
          prop="mid"
        >
          <el-input
            suffix-icon="el-icon-edit"
            v-model="goTopForm.mid"
            placeholder="请输入mid"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="物料类型"
          prop="type"
        >
          <el-checkbox-group v-model="goTopForm.type">
            <el-checkbox
              label="混合流"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="访客流"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-popover
            ref="popoverUp"
            placement="bottom"
            width="200"
            v-model="goTopForm.upPopover"
          >
            <p>确定上榜？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="goTopForm.upPopover = false"
              >取消</el-button>
              <el-button
                type="primary"
                round
                size="mini"
                @click="goTopEvent('goTopForm', 'up')"
              >确定</el-button>
            </div>
          </el-popover>
          <el-popover
            ref="popoverDown"
            placement="bottom"
            width="200"
            v-model="goTopForm.downPopover"
          >
            <p>确定下榜？</p>
            <div style="text-align: right; margin: 0">
              <el-button
                size="mini"
                type="text"
                @click="goTopForm.downPopover = false"
              >取消</el-button>
              <el-button
                type="primary"
                round
                size="mini"
                @click="goTopEvent('goTopForm', 'down')"
              >确定</el-button>
            </div>
          </el-popover>
          <el-button
            type="success"
            size="small"
            v-popover:popoverUp
          >上榜</el-button>
          <el-button
            type="warning"
            size="small"
            v-popover:popoverDown
          >下榜</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "MidGoTopPane",
  data() {
    return {
        goTopForm: {
        mid: "",
        type: ["混合流"],
        flow: {
          混合流: 1,
          访客流: 2
        },
        upPopover: false,
        downPopover: false
      },
      goTopRules: {
        mid: [{ required: true, message: "mid不能为空", trigger: "blur" }],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个流",
            trigger: "change"
          }
        ]
      },
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  methods: {
    goTopEvent(formName, type) {
      const that = this;
      const urlType = type == "up" ? "set19top" : "del19top";
      this.goTopForm.upPopover = false;
      this.goTopForm.downPopover = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          const flowStr = that.goTopForm.type;
          let flowArr = [];
          for (let i = 0; i < flowStr.length; i++) {
            flowArr.push(that.goTopForm.flow[flowStr[i]]);
          }
          const tempData = {
            url: `${domain}/3/admin/${urlType}`,
            param: {
              staff: that.email,
              source: source,
              data: that.goTopForm.mid,
              flow: flowArr.join(",")
            }
          };
          const params = {
            data: JSON.stringify(tempData),
            cip: 230
          };
          this.$store.dispatch("TopMaterial", params);
        } else {
          console.log(`error ${urlType}`);
          return false;
        }
      });
    },
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
