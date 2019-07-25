<template>
  <div v-if="data">
    <el-dialog :title="`【${data.field_name}】领域 白名单编辑`" :visible.sync="dialogVisible" width="60%">
      <el-form :inline="true" label-position="left" size="small">
        <el-form-item label="作者UID" label-width="65px">
          <el-tag type="info">{{data.uid}}</el-tag>
        </el-form-item>
        <el-form-item label="用户名" label-width="54px">
          <el-tag type="info">{{data.user_name || '未知'}}</el-tag>
        </el-form-item>
        <el-form-item label="认证状态" label-width="70px">
          <el-tag type="info">{{data.verified ? '已认证' : '未认证'}}</el-tag>
        </el-form-item>
        <el-form-item label="认证类型" label-width="70px">
          <el-tag type="info">{{verifiedTypeMap[data.verified_type] || '普通用户'}}</el-tag>
        </el-form-item>
        <el-form-item label="认证信息" label-width="70px">
          <el-tag type="info">{{data.verified_reason || '暂无'}}</el-tag>
        </el-form-item>
        <el-form-item label="互动度" label-width="60px">
          <el-tag type="info">{{_formatNum(data.interaction)}}</el-tag>
        </el-form-item>
        <el-form-item label="日发博频次" label-width="90px">
          <el-tag type="info">{{_formatNum(data.send_weibo_hz)}}</el-tag>
        </el-form-item>
        <el-form-item label="工具发博比例" label-width="100px">
          <el-tag type="info">{{_parsePercent(data.tool_weibo_rate)}}</el-tag>
        </el-form-item>
        <el-form-item label="一级能力标签" label-width="100px">
          <el-tag type="info">{{formartAbility(ability1)}}</el-tag>
        </el-form-item>
        <el-form-item label="二级能力标签" label-width="100px">
          <el-tag type="info">{{formartAbility(ability2)}}</el-tag>
        </el-form-item>
        <el-form-item label="F层级" label-width="52px">
          <el-tag type="info">{{getFLevel(data.F_level)}}</el-tag>
        </el-form-item>
        <el-form-item label="C层级" label-width="52px">
          <el-tag type="info">{{data.C_level || '未知'}}</el-tag>
        </el-form-item>
        <el-form-item label="添加时间" label-width="70px">
          <el-tag type="info">{{_parseTime(data.create_time, '{y}-{m}-{d} {h}:{i}:{s}')}}</el-tag>
        </el-form-item>
      </el-form>
      <div>
        <el-checkbox v-model="new_v" disabled>是新拓展的大V</el-checkbox>
      </div>
      <div class="clearfix">
        <div class="table-title left">【操作区域】</div>
      </div>
      <el-form v-if="whiteList" label-position="left" size="small">
        <el-form-item>
          <el-checkbox v-model="whiteList.frequency_loss">有降频流失的风险</el-checkbox>
          <el-checkbox v-model="whiteList.mcn">已加入MCN机构</el-checkbox>
        </el-form-item>
        <el-form-item label="账号类型（可多选）" required>
          <el-checkbox-group v-model="whiteList.account_type" :min="1">
            <el-checkbox style="margin-left:10px;" :key="key" v-for="(val, key) in accountMap" :label="key">{{val}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="原创度" label-width="70px" required>
          <el-select class="white-item left" v-model="whiteList.origin_degree" placeholder="请选择原创度" clearable @change="degreeChange">
            <el-option v-for="(item, key) in originList" :key="key" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span class="white-tips left">（考量直发微博中，原创和搬运内容的比例）</span>
        </el-form-item>
        <el-form-item label="垂直度" label-width="70px" required>
          <el-select class="white-item left" v-model="whiteList.vertical_degree" placeholder="请选择垂直度" clearable @change="degreeChange">
            <el-option v-for="(item, key) in verticalList" :key="key" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span class="white-tips left">（考量直发微博中，其内容是否跟当前垂直领域一致）</span>
        </el-form-item>
        <el-form-item label="健康度" label-width="70px" required>
          <el-select class="white-item left" v-model="whiteList.health_degree" placeholder="请选择健康度" clearable @change="degreeChange">
            <el-option v-for="(item, key) in healthList" :key="key" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <span class="white-tips left">（考量发布微博中，违规、不良或广告营销信息的比例）</span>
        </el-form-item>
      </el-form>
      <!-- <div>
        <el-button type="primary" size="mini" @click="showMacDegree()">查看机器打分结果</el-button>
        <ul v-if="isShowMac === 1">
          <li>
            <label>原创度：</label>
            <span>{{origin_mac_text}}</span>
          </li>
          <li>
            <label>垂直度：</label>
            <span>{{vertical_mac_text}}</span>
          </li>
          <li>
            <label>健康度：</label>
            <span>{{health_mac_text}}</span>
          </li>
        </ul>
        <p v-if="isShowMac === -1">请填写完整后再查看机器打分结果！</p>
      </div> -->
      <el-row>
        <el-button type="primary" size="mini" @click="showMacDegree()" style="margin-bottom: 10px;">查看机器打分结果</el-button>
        <el-col v-if="isShowMac === 1">
          <el-row>
            <label>原创度：</label>
            <span>{{origin_mac_text}}</span>
          </el-row>
          <el-row>
            <label>垂直度：</label>
            <span>{{vertical_mac_text}}</span>
          </el-row>
          <el-row>
            <label>健康度：</label>
            <span>{{health_mac_text}}</span>
          </el-row>
        </el-col>
        <p v-if="isShowMac === -1">请填写完整后再查看机器打分结果！</p>
      </el-row>
      <!-- <el-row v-if="logList">
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
      </el-row> -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="updateEvent()">保 存</el-button>
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择下线理由及有效期" :visible.sync="delDialogVisible">
      <el-form size="small">
        <el-form-item label="选择有效期" label-width="100px" required>
          <el-radio-group v-model="is_expired">
            <el-radio style="margin-top: 5px;margin-left: 10px;" :label="0" @change="changeEpireTime">永久</el-radio>
            <el-radio style="margin-top: 5px;margin-left: 10px;" :label="1">自定义</el-radio>
          </el-radio-group>
          <transition name="fade">
          <el-date-picker v-show="is_expired" style="margin-bottom: 5px; margin-left: 10px; width: 160px;" v-model="expire_time" type="date" format="yyyy年MM月dd日" value-format="timestamp" placeholder="请选择日期">
          </el-date-picker>
          </transition>
        </el-form-item>
        <el-form-item label="博主发布内容：">
          <el-radio-group v-model="deleteCause">
            <el-radio style="margin-top: 5px;margin-left: 10px;" :key="key" v-for="(item, key) in delResonList" :label="item.value">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteEvent()" size="small">确 定</el-button>
      </div>
    </el-dialog>
    <el-button style="margin-left: 5px;margin-bottom: 5px;" type="primary" icon="el-icon-edit" plain size="mini" title="编辑" @click="showEditDialog()">
      <span class="hidden-xs-only">编辑</span>
    </el-button>
    <el-button v-if="data.audit_type === 0 || hasaudit" style="margin-left: 5px;margin-bottom: 5px;" type="danger" icon="el-icon-delete" plain size="mini" title="下线" @click="delDialogVisible = true;deleteCause = '2';">
      <span class="hidden-xs-only">下线</span>
    </el-button>
    <!-- <el-button v-if="data.field_id !== 0" style="margin-left: 5px;" type="warning" icon="el-icon-remove-outline" plain size="mini" title="下线" @click="removeEvent()">
      <span class="hidden-xs-only">非本领域</span>
    </el-button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime, parsePercent, formatNum } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "operateWhite",
  data() {
    return {
      apiConf: {
        //API
        getFeature: "/feature/getFeature",
        delFieldWhite: "/field/delFieldWhite", //白名单下线
        delUserField: "/field/delUserField", //白名单不属于本领域
        updateFieldWhiteList: "/field/updateFieldWhiteList" //白名单修改
      },
      dialogVisible: false,
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
          label: "极好｜不健康内容占比0%-4%"
        },
        {
          value: 4,
          label: "良好｜不健康内容占比5%-10%"
        },
        {
          value: 3,
          label: "一般｜不健康内容占比11%-20%"
        },
        {
          value: 2,
          label: "较低｜不健康内容占比21%-50%"
        },
        {
          value: 1,
          label: "极低｜不健康内容占比51%以上"
        }
      ],
      isShowMac: 0, // 0 关闭；-1 提示未填写打分；1 显示机器打分情况
      origin_mac_text: "暂时无法计算原创度",
      vertical_mac_text: "暂时无法计算垂直度",
      health_mac_text: "暂时无法计算健康度",
      delDialogVisible: false,
      deleteCause: "2",
      expire_time: '',
      is_expired: 0,
      delResonList: [
        {
          label: "广告营销",
          value: "2"
        },
        {
          label: "搬运低质",
          value: "3"
        },
        {
          label: "恶意涨粉涨互动",
          value: "6"
        },
        {
          label: "博主发博与领域严重不符且低质",
          value: "1"
        },
        {
          label: "色情",
          value: "4"
        },
        {
          label: "政治敏感",
          value: "5"
        },
        {
          label: "不实造谣炒作",
          value: "7"
        },
        {
          label: "其他",
          value: "8"
        }
      ],
      accountMap: {
        "1": "真人账号",
        "2": "自媒体",
        "3": "媒体",
        "4": "企业",
        "5": "营销号",
        "6": "纯明星",
        "7": "政府",
        "8": "其他机构",
        "9": "粉丝团"
      },
      verifiedTypeMap: {
        "0": "名人",
        "1": "政府",
        "2": "企业",
        "3": "媒体",
        "4": "校园",
        "5": "网站",
        "6": "应用",
        "7": "团体",
        "-1": "普通用户",
        "8": "待审企业",
        "200": "初级达人",
        "220": "通过审核的达人",
        "400": "已故认证用户"
      },
      whiteList: null,
      logList: null,
      ability1: null,
      ability2: null,
      new_v: false,
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["data", "callback", "hasaudit"],
  methods: {
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
      return parsePercent(num);
    },
    changeEpireTime() {
      if (!this.is_expired) {
        this.expire_time = "";
      }
    },
    showEditDialog() {
      this.isShowMac = 0;
      this.setMacDegree();
      this.whiteList = {
        origin_degree: this.data.origin_degree || "",
        vertical_degree: this.data.vertical_degree || "",
        health_degree: this.data.health_degree || "",
        frequency_loss: this.data.frequency_loss == 1 ? true : false,
        mcn: this.data.mcn == 1 ? true : false,
        account_type: this.data.account_type && this.data.account_type.toString().split(',') || []
      };
      this.dialogVisible = true;
      this.getUserInfo();
      this.getUserNewVip();
    },
    getUserInfo() {
      const userdata = {
        url: this.apiConf.getFeature,
        params: {
          input: this.data.uid,
          flag: 1,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", userdata).then(res => {
        if (res.code && Number(res.code) == 200) {
          const result = res.result;
          this.ability1 = result.ability1;
          this.ability2 = result.ability2;
        }
      });
    },
    getUserNewVip() {
      const tempData = {
        url:
          "http://pub.admin.weibo.com/api/expand_check.php",
        param: {
          source: 99075054,
          uid: this.data.uid
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code && Number(res.code) == 100000) {
          const result = res.result;
          this.new_v = result.status && result.status == 5 ? true : false;
        }
      });
    },
    deleteEvent() {
      if (this.is_expired && !this.expire_time) {
        Message({
          showClose: true,
          message: "请选择有效期！",
          type: "error",
          duration: 1000
        });
        return;
      }
      this.$confirm("确定下线?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.deleteAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    deleteAction() {
      const data = {
        url: this.apiConf.delFieldWhite,
        params: {
          expire_time: this.expire_time,
          is_expired: this.is_expired,
          cause: this.deleteCause,
          uid: this.data.uid,
          audit_type: this.hasaudit ? 1 : 0, //审核人员置为1；其他置为0
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
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
            duration: 0
          });
        }
        this.delDialogVisible = false
      });
    },
    // removeEvent() {
    //   this.$confirm("确定移出本领域?", "", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "success"
    //   })
    //     .then(() => {
    //       this.removeAction();
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "取消操作"
    //       });
    //     });
    // },
    // removeAction() {
    //   const data = {
    //     url: this.apiConf.delUserField,
    //     params: {
    //       field_id: this.data.field_id,
    //       uid: this.data.uid,
    //       username: this.email,
    //       cip: 230
    //     }
    //   };
    //   this.$store.dispatch("CommonGet", data).then(res => {
    //     if (res.code && Number(res.code) == 200) {
    //       Message({
    //         showClose: true,
    //         message: "操作成功！",
    //         type: "success",
    //         duration: 1000
    //       });
    //       this.dialogVisible = false;
    //       this.callback();
    //     } else {
    //       Message({
    //         showClose: true,
    //         message: res.msg || "操作失败!",
    //         type: "error",
    //         duration: 0
    //       });
    //     }
    //   });
    // },
    updateEvent() {
      const accounType = this.whiteList.account_type.join(',');
      if (!accounType) {
        Message({
          showClose: true,
          message: "请选择账号类型！",
          type: "error",
          duration: 3000
        });
        return;
      }
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
      this.$confirm("确定保存本次修改?", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.updateAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    updateAction() {
      const accounType = this.whiteList.account_type.join(',');
      const data = {
        url: this.apiConf.updateFieldWhiteList,
        params: {
          id: this.data.id,
          field_id: this.data.field_id,
          uid: this.data.uid,
          user_name: this.data.user_name, //后期支持可编辑
          health_degree: this.whiteList.health_degree,
          vertical_degree: this.whiteList.vertical_degree,
          origin_degree: this.whiteList.origin_degree,
          frequency_loss: Number(this.whiteList.frequency_loss),
          mcn: Number(this.whiteList.mcn),
          account_type: accounType || 0,
          audit_type: this.data.audit_type,
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
    formartAbility(arr) {
      if (!arr || arr.length < 1) {
        return "暂无";
      }
      let res = [];
      for (let i = 0; i < arr.length; i++) {
        res.push(arr[i].display_name);
      }
      return res.join("、");
    },
    getFLevel(str) {
      return !str || str.toLowerCase() === 'null' ? "未知" : str;
    },
    setMacDegree() {
      const origin = this.data.origin_degree_mac;
      const vertical = this.data.vertical_degree_mac;
      const health = this.data.health_degree_mac;
      const origin_percent = parsePercent(this.data.origin_degree_mac);
      const vertical_percent = parsePercent(this.data.vertical_degree_mac);
      const health_percent = parsePercent(this.data.health_degree_mac);
      // 转换原创度机器打分结果
      switch(true)
      {
        case (origin > 1): 
          this.origin_mac_text = '暂时无法计算原创度';
          break;
        case (origin > 0.8):
          this.origin_mac_text = `极好｜原创占比为${origin_percent}`;
          break;
        case (origin > 0.6):
          this.origin_mac_text = `良好｜原创占比为${origin_percent}`;
          break;
        case (origin > 0.4):
          this.origin_mac_text = `一般｜原创占比为${origin_percent}`;
          break;
        case (origin > 0.2):
          this.origin_mac_text = `较低｜原创占比为${origin_percent}`;
          break;
        case (origin <= 0.2):
          this.origin_mac_text = `极低｜原创占比为${origin_percent}`;
          break;
        default:
          this.origin_mac_text = '暂时无法计算原创度';
          break;
      }
      // 转换垂直度机器打分结果
      switch(true)
      {
        case (vertical > 1): 
          this.vertical_mac_text = '暂时无法计算垂直度';
          break;
        case (vertical > 0.8):
          this.vertical_mac_text = `极好｜同领域匹配度${vertical_percent}`;
          break;
        case (vertical > 0.6):
          this.vertical_mac_text = `良好｜同领域匹配度${vertical_percent}`;
          break;
        case (vertical > 0.4):
          this.vertical_mac_text = `一般｜同领域匹配度${vertical_percent}`;
          break;
        case (vertical > 0.2):
          this.vertical_mac_text = `较低｜同领域匹配度${vertical_percent}`;
          break;
        case (vertical <= 0.2):
          this.vertical_mac_text = `极低｜同领域匹配度${vertical_percent}`;
          break;
        default:
          this.vertical_mac_text = '暂时无法计算垂直度';
          break;
      }
      // 转换健康度机器打分结果
      switch(true)
      {
        case (health > 1): 
          this.health_mac_text = '暂时无法计算健康度';
          break;
        case (health <= 0.04):
          this.health_mac_text = `极好｜不健康内容占比${health_percent}`;
          break;
        case (health <= 0.1):
          this.health_mac_text = `良好｜不健康内容占比${health_percent}`;
          break;
        case (health <= 0.2):
          this.health_mac_text = `一般｜不健康内容占比${health_percent}`;
          break;
        case (health <= 0.5):
          this.health_mac_text = `较低｜不健康内容占比${health_percent}`;
          break;
        case (health > 0.5):
          this.health_mac_text = `极低｜不健康内容占比${health_percent}`;
          break;
        default:
          this.health_mac_text = '暂时无法计算健康度';
          break;
      }
    },
    showMacDegree() {
      if (this.whiteList.origin_degree && this.whiteList.vertical_degree && this.whiteList.health_degree){
        this.isShowMac = 1;
      } else {
        this.isShowMac = -1;
      }
    },
    degreeChange() {
      if (this.isShowMac === 0) {
        return
      }
      if (!this.whiteList.origin_degree || this.whiteList.vertical_degree || this.whiteList.health_degree){
        this.isShowMac = -1;
      }
    }
  },
  watch: {
    data() {},
    hasaudit() {}
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>