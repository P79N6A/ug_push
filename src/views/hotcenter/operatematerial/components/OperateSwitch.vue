<template>
  <div>
    <el-form
      v-if="configForm"
      label-width="60px"
      class="pane-form"
      size="small"
    >
      <el-form-item>
        <el-switch
          v-model="configForm.common_top"
          active-text="置顶开关"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="configForm.black_mid"
          active-text="屏蔽mid开关"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="configForm.black_word"
          active-text="屏蔽关键词开关"
          :active-value="1"
          :inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button
          type="success"
          size="small"
          @click="saveEvent()"
        >保存</el-button>
      </el-form-item>
    </el-form>
    <div class="pane-form">
      <div class="clearfix">
        <h6 class="table-title left">配置开关操作记录</h6>
      </div>
      <el-table
        :data="recordData"
        style="width: 100%"
        class="table-wrap"
        border
        size="mini"
      >
        <el-table-column
          align="left"
          width="190"
          sortable
          prop="time"
          label="时间"
        >
          <template slot-scope="scope">
            <i class="el-icon-time hidden-xs-only"></i>
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          min-width="120"
          prop="name"
          label="操作人"
        >
        </el-table-column>
        <el-table-column
          align="left"
          min-width="300"
          prop="content"
          label="内容"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "OperateSwitchPane",
  data() {
    return {
      // configForm: {
      //   common_top: 0, // 置顶开关，0:关闭；1：开启
      //   black_mid: 0, // 屏蔽mid开关
      //   black_word: 0 // 屏蔽关键词开关
      // },
      configForm: null,
      recordData: []
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getConfig();
      this.getRecords();
    },
    getConfig() {
      const tempData = {
        url: `${domain}/3/admin/getDegradeValue`,
        param: {
          name: "special_config",
          staff: this.email,
          source: source
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res.data) {
            this.configForm = JSON.parse(res.data);
          } else {
            this.configForm = false;
          }
        },
        err => {
          Message({
            showClose: true,
            message: "开关配置获取接口请求失败！",
            type: "error",
            duration: 3000
          });
          this.configForm = false;
        }
      );
    },
    saveEvent() {
      this.$confirm("将保存开关配置, 是否继续?", "确认保存", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.saveConfig();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    saveConfig() {
      const tempData = {
        url: `${domain}/3/admin/setSpecial`,
        param: {
          data: `${this.configForm.common_top},${this.configForm.black_mid},${
            this.configForm.black_word
          }`,
          staff: this.email,
          source: source
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (Number(res.code) === 200) {
            this.init();
            Message({
              showClose: true,
              message: "设置成功!",
              type: "success",
              duration: 1000
            });
          } else {
            Message({
              showClose: true,
              message: (res && res.msg) || "设置失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "设置接口请求失败！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    getRecords() {
      const tempData = {
        url: `${domain}/3/admin/getalllog`,
        param: {
          ext: "特殊配置设置",
          staff: this.email,
          source: source
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res.list) {
            this.recordData = res.list;
          } else {
            this.recordData = [];
          }
        },
        err => {
          this.recordData = [];
          Message({
            showClose: true,
            message: "操作记录接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    }
  },
  watch: {
    email() {
      this.init();
    }
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
.table-wrap {
  margin-top: 10px;
}
.table-title {
  padding: 5px 20px;
  color: #409eff;
  border-bottom: 2px solid #409eff;
  margin-bottom: 10px;
}
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
.text-info {
  font-size: 12px;
  color: #e6a23c;
}
</style>