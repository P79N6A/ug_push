<template>
  <div>
    <el-dialog :title="`UID详情 - ${uid}`" :visible.sync="dialogVisible" width="60%">
      <div v-if="data">
        <el-form :inline="true" label-position="left" size="small">
            <el-form-item label="作者UID" label-width="65px">
            <el-tag type="info">{{uid}}</el-tag>
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
        <div v-if="whiteList">
            <el-checkbox v-model="new_v" disabled>是新拓展的大V</el-checkbox>
            <el-checkbox v-model="whiteList.frequency_loss" disabled>有降频流失的风险</el-checkbox>
            <el-checkbox v-model="whiteList.mcn" disabled>已加入MCN机构</el-checkbox>
        </div>
        <el-form v-if="whiteList" label-position="left" size="small">
            <el-form-item label="账号类型（多选）">
            <el-checkbox-group v-model="whiteList.account_type" :min="1" disabled>
                <el-checkbox style="margin-left:10px;" :key="key" v-for="(val, key) in accountMap" :label="key">{{val}}</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
            <div class="clearfix">
                <div class="table-title left">人工打分结果</div>
            </div>
            <el-form-item label="原创度" label-width="70px">
            <el-select class="white-item left" v-model="whiteList.origin_degree" placeholder="暂无" disabled>
                <el-option v-for="(item, key) in originList" :key="key" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span class="white-tips left">（考量直发微博中，原创和搬运内容的比例）</span>
            </el-form-item>
            <el-form-item label="垂直度" label-width="70px">
            <el-select class="white-item left" v-model="whiteList.vertical_degree" placeholder="暂无" disabled>
                <el-option v-for="(item, key) in verticalList" :key="key" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span class="white-tips left">（考量直发微博中，其内容是否跟当前垂直领域一致）</span>
            </el-form-item>
            <el-form-item label="健康度" label-width="70px">
            <el-select class="white-item left" v-model="whiteList.health_degree" placeholder="暂无" disabled>
                <el-option v-for="(item, key) in healthList" :key="key" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <span class="white-tips left">（考量发布微博中，违规、不良或广告营销信息的比例）</span>
            </el-form-item>
        </el-form>
        <el-row>
            <div class="clearfix">
                <div class="table-title left">机器打分结果</div>
            </div>
            <el-col>
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
        </el-row>
      </div>
      <div v-else>暂无详情数据</div>
    </el-dialog>
    <el-button v-if="uid" type="primary" plain size="mini" @click="showEditDialog()" title="查看uid详情">
      <span>{{uid}}</span>
    </el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime, parsePercent, formatNum } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "UserDetail",
  data() {
    return {
      apiConf: {
        //API
        getFeature: "/feature/getFeature",
        getFieldUidDetail: "/field/getFieldUidDetail"
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
      origin_mac_text: "暂时无法计算原创度",
      vertical_mac_text: "暂时无法计算垂直度",
      health_mac_text: "暂时无法计算健康度",
      delDialogVisible: false,
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
      ability1: null,
      ability2: null,
      new_v: false,
      data: null
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["uid", "iswhite"],
  methods: {
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    _parsePercent(num) {
      return parsePercent(num);
    },
    _formatNum(num) {
      return formatNum(num);
    },
    showEditDialog() {
      this.getUserInfo();
      this.getUserNewVip();
      this.getUidDetail();
    },
    getUidDetail() {
      let params = {
        uid: this.uid,
        is_white: this.iswhite === 0 ? 0 : 1,
        username: this.email,
        cip: 230
      };
      const data = {
        url: this.apiConf.getFieldUidDetail,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.data = res.result || "";
          this.initInfo();
        }
      });
    },
    initInfo() {
      this.whiteList = "";
      if (this.data) {
        this.whiteList = {
            origin_degree: this.data.origin_degree || "",
            vertical_degree: this.data.vertical_degree || "",
            health_degree: this.data.health_degree || "",
            frequency_loss: this.data.frequency_loss == 1 ? true : false,
            mcn: this.data.mcn == 1 ? true : false,
            account_type: this.data.account_type && this.data.account_type.toString().split(',') || []
        };
        this.setMacDegree();
      }
      this.dialogVisible = true;
    },
    getUserInfo() {
      const userdata = {
        url: this.apiConf.getFeature,
        params: {
          input: this.uid,
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
          uid: this.uid
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