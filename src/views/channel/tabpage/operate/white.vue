<template>
  <div v-if="data">
    <el-dialog :title="`【${data.channel_name}】频道 白名单编辑`" :visible.sync="dialogVisible" width="60%">
      <el-form v-if="whiteList" :inline="true" label-position="left">
        <el-form-item label="作者UID" label-width="64px">
          <el-tag type="info">{{whiteList.uid}}</el-tag>
        </el-form-item>
        <el-form-item label="用户名" label-width="54px">
          <el-tag type="info">{{whiteList.username || '未知'}}</el-tag>
        </el-form-item>
        <el-form-item label="认证信息" label-width="70px">
          <el-tag type="info">{{whiteList.verified_reason || '暂无'}}</el-tag>
        </el-form-item>
        <el-form-item label="一级能力标签" label-width="100px">
          <el-tag type="info">{{formartAbility(ability1)}}</el-tag>
        </el-form-item>
        <el-form-item label="二级能力标签" label-width="100px">
          <el-tag type="info">{{formartAbility(ability2)}}</el-tag>
        </el-form-item>
        <el-form-item label="F层级" label-width="52px">
          <el-tag type="info">{{getFLevel(whiteList.F_level)}}</el-tag>
        </el-form-item>
        <el-form-item label="C层级" label-width="52px">
          <el-tag type="info">{{clevel}}</el-tag>
        </el-form-item>
        <el-form-item label="添加时间" label-width="70px">
          <el-tag type="info">{{_parseTime(whiteList.create_time, '{y}-{m}-{d} {h}:{i}:{s}')}}</el-tag>
        </el-form-item>
      </el-form>
      <div class="clearfix"><div class="table-title left">【操作区域】</div></div>
      <el-form v-if="whiteList" label-position="left">
        <el-form-item>
          <el-checkbox v-model="new_v">是新拓展的大V</el-checkbox>
          <el-checkbox v-model="frequency_loss">有降频流失的风险</el-checkbox>
          <el-checkbox v-model="mcn">已加入MCN机构</el-checkbox>
        </el-form-item>
        <el-form-item label="账号类型（可多选）">
          <el-checkbox-group v-model="account_type">
            <el-checkbox :key="key" v-for="(item, key) in accountList" :label="item.value">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="原创度" label-width="70px" required>
          <el-select class="white-item left" v-model="whiteList.origin_degree" placeholder="请选择原创度" clearable>
            <el-option v-for="(item, key) in originList" :key="key" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span class="white-tips left">（考量直发微博中，原创和搬运内容的比例）</span>
        </el-form-item>
        <el-form-item label="垂直度" label-width="70px" required>
          <el-select class="white-item left" v-model="whiteList.vertical_degree" placeholder="请选择垂直度" clearable>
            <el-option v-for="(item, key) in verticalList" :key="key" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span class="white-tips left">（考量直发微博中，其内容是否跟当前垂直领域一致）</span>
        </el-form-item>
        <el-form-item label="健康度" label-width="70px" required>
          <el-select class="white-item left" v-model="whiteList.health_degree" placeholder="请选择健康度" clearable>
            <el-option v-for="(item, key) in healthList" :key="key" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span class="white-tips left">（考量发布微博中，违规、不良或广告营销信息的比例）</span>
        </el-form-item>
      </el-form>
      <el-row v-if="logList">
        <div class="table-title left">【操作日志】</div>
        <el-table :data="logList" style="width: 100%" max-height="200" border stripe>
          <el-table-column align="left" prop="operator" label="操作人">
          </el-table-column>
          <el-table-column align="left" prop="create_time" label="时间">
            <template slot-scope="scope">{{_parseTime(scope.row.create_time, '{y}-{m}-{d} {h}:{i}:{s}')}}</template>
          </el-table-column>
          <el-table-column align="left" prop="content" label="内容">
          </el-table-column>
        </el-table>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-popover ref="popoverUpdate" placement="top" width="200" v-model="updatePopover">
          <p>确定保存当前修改？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="updatePopover = false">取消</el-button>
            <el-button type="primary" round size="mini" @click="updateEvent()">确定</el-button>
          </div>
        </el-popover>
        <el-button type="primary" v-popover:popoverUpdate>保 存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-popover ref="popAddBtn" placement="top" width="200" v-model="addBtnPopover" v-if="data.status === 0">
      <p>确定上线到白名单？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="addBtnPopover = false">取消</el-button>
        <el-button type="primary" round size="mini" @click="setEvent()">确定</el-button>
      </div>
    </el-popover>
    <el-popover ref="popDelBtn" placement="top" width="200" v-model="delBtnPopover" v-if="data.status === 1">
      <p>确定从白名单下线？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="delBtnPopover = false">取消</el-button>
        <el-button type="primary" round size="mini" @click="deleteEvent()">确定</el-button>
      </div>
    </el-popover>
    <el-button style="margin-left: 5px;margin-bottom: 5px;" type="primary" icon="el-icon-edit" plain size="mini" title="编辑" @click="showEditDialog()"><span class="hidden-xs-only">编辑</span></el-button>
    <el-button v-if="data.status === 0" style="margin-left: 5px;" type="success" icon="el-icon-check" plain size="mini" v-popover:popAddBtn title="上线"><span class="hidden-xs-only">上线</span></el-button>
    <el-button v-if="data.status === 1" style="margin-left: 5px;" type="danger" icon="el-icon-delete" plain size="mini" v-popover:popDelBtn title="下线"><span class="hidden-xs-only">下线</span></el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "operateWhite",
  data() {
    return {
      dialogVisible: false,
      delBtnPopover: false,
      updatePopover: false,
      addBtnPopover: false,
      new_v: false,
      frequency_loss: false,
      mcn: false,
      account_type: [],
      originList: [
        {
          value: 5,
          label: "极好｜81%－100%为原创"
        },
        {
          value: 4,
          label: "良好｜61%－80%为原创"
        },
        {
          value: 3,
          label: "一般｜41％－60%为原创"
        },
        {
          value: 2,
          label: "较低｜21%－40%为原创"
        },
        {
          value: 1,
          label: "极低｜20%以下为原创"
        }
      ],
      verticalList: [
        {
          value: 5,
          label: "极好｜同领域匹配度81%－100％"
        },
        {
          value: 4,
          label: "良好｜同领域匹配度 61%-80%"
        },
        {
          value: 3,
          label: "一般｜同领域匹配度 41%-60%"
        },
        {
          value: 2,
          label: "较低｜同领域匹配度21%-40%"
        },
        {
          value: 1,
          label: "极低｜同领域匹配度20%以下"
        }
      ],
      healthList: [
        {
          value: 5,
          label: "极好｜没有不健康内容"
        },
        {
          value: 4,
          label: "良好｜不健康内容比例2%以下"
        },
        {
          value: 3,
          label: "一般｜不健康内容比例3%－5%以下"
        },
        {
          value: 2,
          label: "较低｜不健康内容比例6%－10%下"
        },
        {
          value: 1,
          label: "极低｜不健康内容比例10%以上"
        }
      ],
      accountList: [
        {
          value: "1",
          label: "个人账号"
        },
        {
          value: "2",
          label: "自媒体"
        },
        {
          value: "3",
          label: "媒体"
        },
        {
          value: "4",
          label: "企业"
        },
        {
          value: "5",
          label: "营销号"
        }
      ],
      whiteList: null,
      logList: null,
      ability1: null,
      ability2: null,
      clevel: 0,
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["data", "callback"],
  methods: {
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    showEditDialog() {
      const data = {
        url: "/Channel/editChannelWhiteList",
        params: {
          wid: this.data.id,
          channel_history: this.data.channel_history,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("editWhiteList", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.whiteList = res.result && res.result.whiteList[0];
          this.whiteList.origin_degree = this.whiteList.origin_degree || "";
          this.whiteList.vertical_degree = this.whiteList.vertical_degree || "";
          this.whiteList.health_degree = this.whiteList.health_degree || "";
          this.new_v = this.whiteList.new_v == 1 ? true : false;
          this.frequency_loss = this.whiteList.frequency_loss == 1 ? true : false;
          this.mcn = this.whiteList.mcn == 1 ? true : false;
          this.account_type = this.whiteList.account_type && this.whiteList.account_type.toString().split(',') || [];
          this.logList = res.result && res.result.logList;
          this.dialogVisible = true;
        }
      });

      const userdata = {
        url: "/feature/getFeature",
        params: {
          input: this.data.uid,
          flag: 1,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("GetFeature", userdata).then(res => {
        if (res.code && Number(res.code) == 200) {
          const result = res.result;
          this.ability1 = result.ability1;
          this.ability2 = result.ability2;
          this.clevel = result.acount_status && (result.acount_status.user_C_level === 0 ? 0 : (result.acount_status.user_C_level || '未知'));
          this.dialogVisible = true;
        }
      });
    },
    deleteEvent() {
      this.delBtnPopover = false;
      const data = {
        url: "/Channel/delChannelWhiteList",
        params: {
          wid: this.data.id,
          channel_history: this.data.channel_history,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("delWhiteList", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "下线成功！",
            type: "success",
            duration: 1000
          });
          this.dialogVisible = false;
          this.callback();
        } else {
          Message({
            showClose: true,
            message: res.msg || "下线失败!",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    updateEvent() {
      this.updatePopover = false;
      if (!this.whiteList.origin_degree) {
        Message({
          showClose: true,
          message: "请选择原创度！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.whiteList.vertical_degree) {
        Message({
          showClose: true,
          message: "请选择垂直度！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.whiteList.health_degree) {
        Message({
          showClose: true,
          message: "请选择健康度！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const accounType = this.account_type.join(',');
      const data = {
        url: "/Channel/editSaveChannelWhiteList",
        params: {
          wid: this.data.id,
          channel_history: this.data.channel_history,
          health_degree: this.whiteList.health_degree,
          vertical_degree: this.whiteList.vertical_degree,
          origin_degree: this.whiteList.origin_degree,
          new_v: Number(this.new_v),
          frequency_loss: Number(this.frequency_loss),
          mcn: Number(this.mcn),
          account_type: accounType || 0,
          mark: 1,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("updateWhiteList", data).then(res => {
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
            duration: 3000
          });
        }
      });
    },
    setEvent() {
      this.addBtnPopover = false;
      const data = {
        url: "/channel/setCWLStatus",
        params: {
          wid: this.data.id,
          channel_history: this.data.channel_history,
          status: 1,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("SetWhiteList", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "上线成功！",
            type: "success",
            duration: 1000
          });
          this.dialogVisible = false;
          this.callback();
        } else {
          Message({
            showClose: true,
            message: res.msg || "上线失败!",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    formartAbility(arr) {
      if (!arr || arr.length < 1) {
        return '暂无'
      }
      let res = []; 
      for(let i = 0 ;i < arr.length;i++) {
        res.push(arr[i].display_name);
      }
      return res.join('、');
    },
    getFLevel(str) {
      let res = '未知';
      switch(str) {
        case 'F0':
          res = 'F0';
          break;
        case 'F1':
          res = 'F1';
          break;
        case 'F2':
          res = 'F2';
          break;
        default:
          res = '未知';
      }
      return res;
    }
  },
  watch: {
    data() {}
  }
};
</script>

<style lang="scss" scoped>
.table-title {
  padding: 5px 10px;
  color: #409eff;
  border-bottom: 2px solid #409eff;
  margin-bottom: 10px;
}
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
.white-item {
  max-width: 100%;
  width: 270px;
}
.white-tips {
  margin-top: 6px;
  line-height: 1.5;
  color: #e6a23c;
  font-size: 12px;
}
</style>