<template>
  <div>
    <el-row class="pane-title-wrap" type="flex" justify="center">
      <el-col :span="23">
        <h6 class="pane-title">
          <i class="el-icon-edit-outline" style="margin-right: 6px;"></i>频道创建</h6>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <el-form :model="formInline" label-width="80px">
          <el-form-item label="频道名称" required>
            <el-input v-model="formInline.channel_name" placeholder="请输入频道名称" clearable autofocus style="max-width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="繁体名称" required>
            <el-input v-model="formInline.channel_name_tw" placeholder="请输入频道繁体字名称" clearable autofocus style="max-width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="英文名称" required>
            <el-input v-model="formInline.channel_name_us" placeholder="请输入频道英文名称" clearable autofocus style="max-width: 350px"></el-input>
          </el-form-item>
          <el-form-item label="频道类型" required>
            <el-select v-model="formInline.channel_type" placeholder="请选择频道类型">
              <el-option :key="key" v-for="(item, key) in channelType" :label="item.type_name" :value="item.tid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运营时间" required>
            <el-date-picker v-model="formInline.date" align="center" unlink-panels type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="timestamp" :picker-options="pickerOptions" :clearable="false">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="内容来源" required>
            <el-select v-model="formInline.source" placeholder="请选择内容来源">
              <el-option label="白名单" :value="0"></el-option>
              <el-option label="分类" :value="1"></el-option>
              <el-option label="白名单+分类" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类选择" v-if="formInline.source !== 0 && channelTag" required>
            <el-select v-model="formInline.tag_id" placeholder="请选择分类，支持搜索" filterable clearable>
              <el-option :key="key" v-for="(item, key) in channelTag" :label="item.tag_name" :value="item.tag_id"></el-option>
            </el-select>
            <span style="color: #e6a23c;">（只有内容来源选择了分类才可选）</span>
          </el-form-item>
          <el-form-item label="排序方式" required>
            <el-select v-model="formInline.order" placeholder="请选择排序方式">
              <el-option label="时间序" :value="1"></el-option>
              <el-option label="模型序" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-popover ref="popoverAdd" placement="right" width="200" v-model="formInline.popover">
              <p>确定创建新频道？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="formInline.popover = false">取消</el-button>
                <el-button type="primary" round size="mini" @click="onSubmit()">确定</el-button>
              </div>
            </el-popover>
            <el-button type="primary" v-popover:popoverAdd>立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "addChannel",
  data() {
    return {
      cname: "",
      formInline: {
        channel_name: "",
        channel_name_tw: "", // 频道繁体名
        channel_name_us: "", // 频道英文名
        channel_type: 1,
        date: [],
        source: 0,
        tag_id: "",
        order: 1,
        popover: false
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      }
    };
  },
  computed: {
    ...mapGetters(["email", "channelType", "channelTag"])
  },
  methods: {
    init() {
      const start = Date.now();
      this.formInline.date = [start, start];
    },
    onSubmit() {
      this.formInline.popover = false;
      if (!this.formInline.channel_name) {
        Message({
          showClose: true,
          message: "请输入频道名称！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formInline.channel_name_tw) {
        Message({
          showClose: true,
          message: "请输入频道繁体字名称！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formInline.channel_name_us) {
        Message({
          showClose: true,
          message: "请输入频道英文名称！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (this.formInline.source === 0) {
        this.formInline.tag_id = "";
      } else {
        if (!this.formInline.tag_id) {
          Message({
            showClose: true,
            message: "请选择分类！",
            type: "error",
            duration: 1000
          });
          return;
        }
      }
      const data = {
        url: "/channel/addChannel",
        params: {
          channel_name: this.formInline.channel_name,
          channel_name_tw: this.formInline.channel_name_tw,
          channel_name_us: this.formInline.channel_name_us,
          channel_type: this.formInline.channel_type,
          stat_time: this.formInline.date[0],
          end_time: this.formInline.date[1],
          source: this.formInline.source,
          tag_id: this.formInline.tag_id,
          order: this.formInline.order,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("SetChannelData", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.$alert(
            "系统正在紧张的创建中，请一个小时后再来查看！",
            `【${this.formInline.channel_name}】频道的创建已经申请成功！`,
            {
              confirmButtonText: "确定",
              callback: action => {
                location.reload();
              }
            }
          );
        } else {
          Message({
            showClose: true,
            message: res.msg || "频道创建失败！",
            type: "error",
            duration: 3000
          });
        }
      });
    }
  },
  created() {
    this.init();
  },
  watch: {
    email() {
      this.init();
    },
    channelType() {
      this.channelType &&
        (this.formInline.channel_type = this.channelType[0].tid);
    },
    channelTag() {}
  }
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
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
</style>