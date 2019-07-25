<template>
  <div v-if="option || data">
    <el-dialog :title="`编辑【${list.channel_name}】频道`" :visible.sync="dialogVisible" v-if="list">
      <el-form size="small" label-width="80px" label-position="left">
        <el-form-item label="频道名称">
          <el-input :disabled="true" v-model="list.channel_name" placeholder="请输入频道名称"></el-input>
        </el-form-item>
        <el-form-item label="频道id">
          <el-input :disabled="true" v-model="list.channel_id" placeholder="请输入频道id"></el-input>
        </el-form-item>
        <el-form-item label="英文名称" required>
          <el-input v-model="list.channel_name_us" placeholder="请输入频道英文名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="繁体名称" required>
          <el-input v-model="list.channel_name_tw" placeholder="请输入频道繁体名称" clearable></el-input>
        </el-form-item>
        <div v-if="list.channel_history === 0">
          <el-form-item label="运营时间" required v-if="list.stat_time && list.end_time">
            <el-date-picker v-model="list.stat_time" type="date" placeholder="开始日期" format="yyyy年MM月dd日" value-format="timestamp" :picker-options="pickerOptions">
            </el-date-picker>
            <span class="hidden-xs-only">-</span>
            <el-date-picker v-model="list.end_time" type="date" placeholder="结束日期" format="yyyy年MM月dd日" value-format="timestamp" :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="物料库物料有效期">
            <el-input v-model.number="channel_expired_day" @change="channel_expired_day = channel_expired_day > 0 ? channel_expired_day : 0" placeholder="请输入天数" style="max-width: 80px"></el-input>
            <span class="info-tip">单位（天）</span>
            <el-input v-model.number="channel_expired_hour" @change="channel_expired_hour = channel_expired_hour > 0 ? channel_expired_hour : 0" placeholder="请输入小时数" style="max-width: 80px"></el-input>
            <span class="info-tip">单位（小时）</span>
          </el-form-item>
          <el-form-item label="排序方式" required>
              <el-select v-model="rankType" placeholder="请选择排序方式">
                <el-option label="自定义排序" :value="1"></el-option>
                <el-option label="持续热点事件排序" :value="2"></el-option>
                <el-option label="持续热度节目排序" :value="3"></el-option>
                <el-option label="周期性节目排序" :value="4"></el-option>
              </el-select>
              <el-form size="small" class="inner-form-box" style="margin-left: 0;">
                <el-form-item v-show="rankType === 1" label-width="0px">
                  <el-select v-model="rank_default" placeholder="请选择">
                    <el-option label="ctr排序" value=""></el-option>
                    <el-option label="时间序" value="rank_channel_by_time"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-show="rankType === 2" label-width="0px">
                  <el-input v-model.number="rank_by_hour" @change="rank_by_hour = rank_by_hour > 1 ? rank_by_hour : 1" placeholder="请输入物料跨段时间" style="max-width: 150px"></el-input>
                  <span class="info-tip">单位（小时）</span>
                </el-form-item>
                <el-form-item v-show="rankType === 3">
                  <el-time-picker is-range v-model="rank_by_time" value-format="HH:mm" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                  </el-time-picker>
                </el-form-item>
                <el-form-item v-show="rankType === 4">
                  <el-select v-model="rank_by_weekly_day" placeholder="请选择日期">
                    <el-option label="星期一" :value="1"></el-option>
                    <el-option label="星期二" :value="2"></el-option>
                    <el-option label="星期三" :value="3"></el-option>
                    <el-option label="星期四" :value="4"></el-option>
                    <el-option label="星期五" :value="5"></el-option>
                    <el-option label="星期六" :value="6"></el-option>
                    <el-option label="星期日" :value="7"></el-option>
                  </el-select>
                  <el-time-picker v-model="rank_by_weekly_time" value-format="HH:mm" placeholder="选择时间">
                  </el-time-picker>
                </el-form-item>
              </el-form>
            </el-form-item>
          <el-form-item label="物料加权">
            <el-checkbox-group v-model="priorityList">
              <el-checkbox label="channel_video_priority">视频</el-checkbox>
              <el-checkbox label="channel_pic_priority">图片</el-checkbox>
              <el-checkbox label="channel_article_priority">文章</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="UID 加权">
            <el-input v-model="uid1" placeholder="请输入uid" clearable style="max-width: 160px"></el-input>
            <el-input v-model="uid2" placeholder="请输入uid" clearable style="max-width: 160px"></el-input>
          </el-form-item>
          <el-form-item label-width="0px">
              <el-checkbox v-model="cancel_limit" true-label="cancel_limit" false-label="">是否放开物料分发限制</el-checkbox>
            </el-form-item>
            <el-form-item label-width="0px">
              <el-checkbox v-model="more_doc" true-label="more_doc" false-label="">不过物料基础门槛</el-checkbox>
            </el-form-item>
          <el-form-item label-width="0px">
              <el-checkbox v-model="isAddCard" @change="handelCardState()">运营图标</el-checkbox>
              <el-form v-if="isAddCard" size="mini" class="inner-form-box">
                <el-form-item label="配置个数">
                  <el-radio-group v-model="cardNum">
                    <el-radio :label="1">1</el-radio>
                    <el-radio :label="2">2</el-radio>
                    <el-radio :label="3">3</el-radio>
                    <el-radio :label="4">4</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="位置1" v-if="cardNum > 0">
                  <el-input v-model="cardlist[0].title_sub" placeholder="请输入图标底部对应文案" clearable style="max-width: 360px"></el-input><span class="info-tip">（图标底部对应文案）</span>
                  <el-input v-model="cardlist[0].pic" placeholder="请输入图标地址" clearable style="max-width: 360px;margin-left: 48px;margin-top: 5px;" type="textarea" autosize></el-input><span class="info-tip">（图标地址）</span>
                  <el-input v-model="cardlist[0].scheme" placeholder="请输入链接跳转地址" clearable style="max-width: 360px;margin-left: 48px;margin-top: 5px;" type="textarea" autosize></el-input><span class="info-tip">（链接跳转地址）</span>
                </el-form-item>
                <el-form-item label="位置2" v-if="cardNum > 1">
                  <el-input v-model="cardlist[1].title_sub" placeholder="请输入图标底部对应文案" clearable style="max-width: 360px"></el-input><span class="info-tip">（图标底部对应文案）</span>
                  <el-input v-model="cardlist[1].pic" placeholder="请输入图标地址" clearable style="max-width: 360px;margin-left: 48px;margin-top: 5px;" type="textarea" autosize></el-input><span class="info-tip">（图标地址）</span>
                  <el-input v-model="cardlist[1].scheme" placeholder="请输入链接跳转地址" clearable style="max-width: 360px;margin-left: 48px;margin-top: 5px;" type="textarea" autosize></el-input><span class="info-tip">（链接跳转地址）</span>
                </el-form-item>
                <el-form-item label="位置3" v-if="cardNum > 2">
                  <el-input v-model="cardlist[2].title_sub" placeholder="请输入图标底部对应文案" clearable style="max-width: 360px"></el-input><span class="info-tip">（图标底部对应文案）</span>
                  <el-input v-model="cardlist[2].pic" placeholder="请输入图标地址" clearable style="max-width: 360px;margin-left: 48px;margin-top: 5px;" type="textarea" autosize></el-input><span class="info-tip">（图标地址）</span>
                  <el-input v-model="cardlist[2].scheme" placeholder="请输入链接跳转地址" clearable style="max-width: 360px;margin-left: 48px;margin-top: 5px;" type="textarea" autosize></el-input><span class="info-tip">（链接跳转地址）</span>
                </el-form-item>
                <el-form-item label="位置4" v-if="cardNum > 3">
                  <el-input v-model="cardlist[3].title_sub" placeholder="请输入图标底部对应文案" clearable style="max-width: 360px"></el-input><span class="info-tip">（图标底部对应文案）</span>
                  <el-input v-model="cardlist[3].pic" placeholder="请输入图标地址" clearable style="max-width: 360px;margin-left: 48px;margin-top: 5px;" type="textarea" autosize></el-input><span class="info-tip">（图标地址）</span>
                  <el-input v-model="cardlist[3].scheme" placeholder="请输入链接跳转地址" clearable style="max-width: 360px;margin-left: 48px;margin-top: 5px;" type="textarea" autosize></el-input><span class="info-tip">（链接跳转地址）</span>
                </el-form-item>
              </el-form>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-popover ref="popoverUpdate" placement="top" width="200" v-model="updatePopover">
          <p>确定保存当前修改？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="updatePopover = false">取消</el-button>
            <el-button type="primary" round size="mini" @click="updateEvent()">确定</el-button>
          </div>
        </el-popover>
        <el-button type="primary" v-popover:popoverUpdate>保 存</el-button>
        <el-button @click="cancelEvent()">取 消</el-button>
      </div>
    </el-dialog>
    <!-- <el-popover ref="popDelBtn" placement="top" width="200" v-model="delBtnPopover">
      <p>确定从频道列表删除？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="delBtnPopover = false">取消</el-button>
        <el-button type="primary" round size="mini" @click="deleteEvent()">确定</el-button>
      </div>
    </el-popover> -->
    <el-button style="margin-left: 5px;margin-bottom: 5px;" type="primary" icon="el-icon-edit" plain size="mini" title="编辑" @click="updateClick()"><span class="hidden-xs-only">编辑</span></el-button>
    <!-- <el-button style="margin-left: 5px;" type="danger" icon="el-icon-delete" plain size="mini" v-popover:popDelBtn title="删除频道"><span class="hidden-xs-only"></span></el-button> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "OperateChannel",
  data() {
    return {
      dialogVisible: false,
      delBtnPopover: false,
      updatePopover: false,
      list: null,
      isAddCard: false,
      cardNum: 0,
      cardlist: [
        {
          title_sub: "",
          pic: "",
          scheme: ""
        },
        {
          title_sub: "",
          pic: "",
          scheme: ""
        },
        {
          title_sub: "",
          pic: "",
          scheme: ""
        },
        {
          title_sub: "",
          pic: "",
          scheme: ""
        }
      ],
      cancel_limit: "",
      more_doc: "",
      triggerList: [],
      channel_expired_day: 0,
      channel_expired_hour: 0,

      rankType: 1,
      rank_default: "",
      rank_by_hour: 1,
      rank_by_time: ['00:00', '23:59'],
      rank_by_weekly_day: 1,
      rank_by_weekly_time: "",

      priorityList: [],
      uid1: "",
      uid2: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      }
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  props: ["option", "data", "callback"],
  methods: {
    getData() {
      const data = {
        url: "/channel/getDetailByCid",
        params: {
          cid: this.option.cid,
          channel_history: this.option.channel_history,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res && res.code == 200) {
          this.list = res.result && res.result[0] && Object.assign({}, res.result[0]) || "";
          this.setDefault();
          this.dialogVisible = true
        }
      });
    },
    updateClick() {
      if (this.data) {
        this.list = this.data && Object.assign({}, this.data) || "";
        this.setDefault();
        this.dialogVisible = true
      } else {
        this.getData();
      }
    },
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    /* deleteEvent() {
      this.delBtnPopover = false;
      const data = {
        url: "/Channel/",
        params: {
          channel_id: this.list.channel_id,
          channel_history: this.list.channel_history,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "删除成功！",
            type: "success",
            duration: 1000
          });
          this.dialogVisible = false;
          this.callback();
        } else {
          Message({
            showClose: true,
            message: res.msg || "删除失败!",
            type: "error",
            duration: 3000
          });
        }
      });
    }, */
    updateEvent() {
      this.updatePopover = false;
      if (!this.list.channel_name_tw) {
        Message({
          showClose: true,
          message: "请输入频道繁体字名称！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.list.channel_name_us) {
        Message({
          showClose: true,
          message: "请输入频道英文名称！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (this.list.channel_history === 1) { //历史频道修改保存
        this.updateHistory();
        return;
      }
      if (!this.list.stat_time || !this.list.end_time) {
        Message({
          showClose: true,
          message: "请选择运营时间！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (this.list.stat_time >= this.list.end_time) {
        Message({
          showClose: true,
          message: "结束日期必须大于开始日期！",
          type: "error",
          duration: 3000
        });
        return;
      }
      let cardlist;
      if (this.isAddCard) {
        cardlist = []
        for (let i = 0; i < this.cardNum; i++) {
          if (!this.cardlist[i].title_sub) {
            Message({
              showClose: true,
              message: `请填写位置${i+1}的图标对应文案！`,
              type: "error",
              duration: 3000
            });
            return;
          }
          if (!this.cardlist[i].pic) {
            Message({
              showClose: true,
              message: `请填写位置${i+1}的图标地址！`,
              type: "error",
              duration: 3000
            });
            return;
          }
          if (!this.cardlist[i].scheme) {
            Message({
              showClose: true,
              message: `请填写位置${i+1}的链接跳转地址！`,
              type: "error",
              duration: 3000
            });
            return;
          }
          cardlist.push(this.cardlist[i]);
        }
      }
      if (this.uid1 && this.uid1.indexOf(',') > -1) {
        Message({
          showClose: true,
          message: "UID格式不对！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.uid2 && this.uid2.indexOf(',') > -1) {
        Message({
          showClose: true,
          message: "UID格式不对！",
          type: "error",
          duration: 3000
        });
        return;
      }

      this.updateStrTrigger(this.cancel_limit, 'cancel_limit');
      this.updateStrTrigger(this.more_doc, 'more_doc');
      this.updateMaterialPriority();
      this.updateUidPriority();
      const rankValue = this.getRankType();
      if (rankValue === 'return') {
        return;
      } else {
        this.updateRank();
        rankValue && this.triggerList.push(rankValue);
      }

      const data = {
        url: "/channel/editChannel",
        params: {
          cid: this.list.cid,
          channel_history: this.list.channel_history,
          channel_id: this.list.channel_id,
          // channel_name: this.list.channel_name,
          channel_name_tw: this.list.channel_name_tw,
          channel_name_us: this.list.channel_name_us,
          stat_time: this.list.stat_time/1000,
          end_time: this.list.end_time/1000,
          cardlist: cardlist && JSON.stringify(cardlist) || "",
          triggers: this.triggerList.join(","),
          channel_expired_timestamp: this.getExpiredTime() || "",
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.dialogVisible = false;
          this.callback(); //刷新页面数据
          Message({
            showClose: true,
            message: "保存成功！",
            type: "success",
            duration: 1000
          });
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
    updateHistory() {
      const data = {
        url: "/channel/editChannel",
        params: {
          cid: this.list.cid,
          channel_history: this.list.channel_history,
          channel_id: this.list.channel_id,
          channel_name_tw: this.list.channel_name_tw,
          channel_name_us: this.list.channel_name_us,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.dialogVisible = false;
          this.callback(); //刷新页面数据
          Message({
            showClose: true,
            message: "保存成功！",
            type: "success",
            duration: 1000
          });
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
    updateStrTrigger(val, str) {
      const index = this.triggerList.indexOf(str);
      if (val && index == -1) { // val配置不为空且str不存在，添加
        this.triggerList.push(str);
      }
      if (!val && index > -1) { // val配置为空且str存在，删除
        this.triggerList.splice(index, 1);
      }
    },
    updateMaterialPriority() {
      const video = this.priorityList.indexOf('channel_video_priority') > -1 ? 'channel_video_priority' : '';
      const pic = this.priorityList.indexOf('channel_pic_priority') > -1 ? 'channel_pic_priority' : '';
      const article = this.priorityList.indexOf('channel_article_priority') > -1 ? 'channel_article_priority' : '';
      this.updateStrTrigger(video, 'channel_video_priority');
      this.updateStrTrigger(pic, 'channel_pic_priority');
      this.updateStrTrigger(article, 'channel_article_priority');
    },
    updateUidPriority() {
      const arr = this.triggerList;
      const len = arr.length;
      for (let i=0;i<arr.length; i++) {
        const index = arr[i].indexOf('channel_uid_priority_');
        if(index > -1) {
          this.triggerList.splice(i, 1);
          i--;
        }
      }
      this.uid1 && this.triggerList.push(`channel_uid_priority_${this.uid1}`);
      this.uid2 && this.triggerList.push(`channel_uid_priority_${this.uid2}`);
    },
    updateRank() {
      const arr = this.triggerList;
      for (let i=0;i<arr.length; i++) {
        const index = arr[i].indexOf('rank_channel_');
        if(index > -1) {
          this.triggerList.splice(i, 1);
          break;
        }
      } 
    },
    getRankType() {
      let res = "";
      switch (this.rankType) {
        case 1:
          res = this.rank_default;
          break;
        case 2:
          res = `rank_channel_split_by_hour_${this.rank_by_hour}`;
          break;
        case 3:
          if (!(this.rank_by_time && this.rank_by_time[0] && this.rank_by_time[1])) {
            Message({
              showClose: true,
              message: "请选择节目热度时间！",
              type: "error",
              duration: 3000
            });
            res = 'return';
          } else {
            res = `rank_channel_time_segement_${this.rank_by_time[0]}_${this.rank_by_time[1]}`;
          }
          break;
        case 4:
          if (!this.rank_by_weekly_day || !this.rank_by_weekly_time) {
            Message({
              showClose: true,
              message: "请选择节目周期时间！",
              type: "error",
              duration: 3000
            });
            res = 'return';
          } else {
            res = `rank_channel_tvshow_weekly_${this.rank_by_weekly_day}_${this.rank_by_weekly_time}`;
          }
          break;
      }
      return res;
    },
    getExpiredTime() {
      return this.channel_expired_day * 24 * 3600 + this.channel_expired_hour * 3600;
    },
    cancelEvent() {
      this.dialogVisible = false;
    },
    handelCardState() {
      if (this.isAddCard && !this.cardNum) {
        this.cardNum = 3;
      }
    },
    setDefault() {
      if (this.list.channel_history === 1) { //历史频道，不可配置trigger与运营图标
        return;
      }
      if (this.list.stat_time) {
        this.list.stat_time = this.list.stat_time * 1000;
      }
      if (this.list.end_time) {
        this.list.end_time = this.list.end_time * 1000;
      }
      if (this.list.channel_expired_timestamp) {
        this.channel_expired_day = Math.floor(this.list.channel_expired_timestamp / (24 * 3600));
        this.channel_expired_hour = Math.round((this.list.channel_expired_timestamp % (24 * 3600))/3600);
      }

      if (this.list.triggers) {
        this.triggerList = this.list.triggers.split(',');
        this.cancel_limit = this.setStrValue('cancel_limit');
        this.more_doc = this.setStrValue('more_doc');
        this.setMaterialPriority();
        this.setUidPriority();
        this.setRank();
      } else {
        this.triggerList = [];
        this.cancel_limit = "";
        this.more_doc = "";
        this.priorityList = [];
        this.uid1 = "";
        this.uid2 = "";
      }
      this.cardlist = [
        {
          title_sub: "",
          pic: "",
          scheme: ""
        },
        {
          title_sub: "",
          pic: "",
          scheme: ""
        },
        {
          title_sub: "",
          pic: "",
          scheme: ""
        },
        {
          title_sub: "",
          pic: "",
          scheme: ""
        }
      ];
      this.cardNum = this.list.cardlist && this.list.cardlist.length || 0;
      this.isAddCard = this.cardNum ? true : false;
      for (let i = 0; i< this.cardNum; i++) {
        this.cardlist[i] = Object.assign({}, this.list.cardlist[i]);
      }
    },
    setMaterialPriority() {
      this.pushMaterial('channel_video_priority');
      this.pushMaterial('channel_pic_priority');
      this.pushMaterial('channel_article_priority');
    },
    pushMaterial(val) {
      this.triggerList.indexOf(val) > -1 && this.priorityList.push(val);
    },
    setUidPriority() {
      let res = [];
      const arr = this.triggerList;
      for (let i=0;i<arr.length; i++) {
        if(arr[i].indexOf('channel_uid_priority_') > -1) {
          res.push(arr[i].split('channel_uid_priority_')[1]);
        }
      }
      res[0] && (this.uid1 = res[0]);
      res[1] && (this.uid2 = res[1]);
    },
    setRank() {
      let res = "";
      const arr = this.triggerList;
      for (let i=0;i<arr.length; i++) {
        if(arr[i].indexOf('rank_channel_') > -1) {
          res = arr[i];
          break;
        }
      }
      const hourStr = 'rank_channel_split_by_hour_';
      const timeStr = 'rank_channel_time_segement_';
      const weekStr = 'rank_channel_tvshow_weekly_';

      if (!res || res === 'rank_channel_by_time') {
        this.rankType = 1;
        this.rank_default = res;
      } else if (res.indexOf(hourStr) > -1) {
        this.rankType = 2;
        this.rank_by_hour = res.split(hourStr)[1];
      } else if (res.indexOf(timeStr) > -1) {
        this.rankType = 3;
        const timeArr = res.split(timeStr)[1].split('_');
        this.rank_by_time = timeArr;
      } else if (res.indexOf(weekStr) > -1) {
        this.rankType = 4;
        const weekArr = res.split(weekStr)[1].split('_');
        this.rank_by_weekly_day = Number(weekArr[0]);
        this.rank_by_weekly_time = weekArr[1];
      }
    },
    setStrValue(val) {
      return this.triggerList.indexOf(val) > -1 ? val : "";
    }
  },
  watch: {
    data() {},
    option() {},
    list() {}
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
.inner-form-box {
  margin-top: 10px;
  margin-left: 24px;
  padding: 10px;
  border: 1px dashed #ddd;
  border-radius: 5px;
}
.info-tip {
  font-size: 14px;
  color: #ebb563;
}
</style>