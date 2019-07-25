<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">
          <i class="el-icon-edit-outline hidden-xs-only" style="margin-right: 6px;"></i>频道创建</h6>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col :span="24">
        <el-form :model="formInline" size="small" label-width="80px" label-position="left">
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
            <el-date-picker v-model="formInline.stat_time" type="date" placeholder="开始日期" format="yyyy年MM月dd日" value-format="timestamp" :picker-options="pickerOptions">
            </el-date-picker>
            <span class="hidden-xs-only">-</span>
            <el-date-picker v-model="formInline.end_time" type="date" placeholder="结束日期" format="yyyy年MM月dd日" value-format="timestamp" :picker-options="pickerOptions">
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
            <span class="info-tip">（只有内容来源选择了分类才可选）</span>
          </el-form-item>
          <el-form-item label="物料库物料有效期">
            <el-input v-model.number="channel_expired_day" @change="channel_expired_day = channel_expired_day > 0 ? channel_expired_day : 0" placeholder="请输入天数" style="max-width: 80px"></el-input>
            <span class="info-tip">单位（天）</span>
            <el-input v-model.number="channel_expired_hour" @change="channel_expired_hour = channel_expired_hour > 0 ? channel_expired_hour : 0" placeholder="请输入小时数" style="max-width: 80px"></el-input>
            <span class="info-tip">单位（小时）</span>
          </el-form-item>
          <!-- <el-form-item label="排序方式" required>
            <el-select v-model="formInline.order" placeholder="请选择排序方式">
              <el-option label="时间序" :value="1"></el-option>
              <el-option label="模型序" :value="2"></el-option>
            </el-select>
          </el-form-item> -->
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
                <el-input v-model="cardlist[0].title_sub" placeholder="请输入图标底部对应文案" clearable style="max-width: 180px"></el-input>
                <el-input v-model="cardlist[0].pic" placeholder="请输入图标地址" clearable style="max-width: 360px" type="textarea" autosize></el-input>
                <el-input v-model="cardlist[0].scheme" placeholder="请输入链接跳转地址" clearable style="max-width: 360px" type="textarea" autosize></el-input>
              </el-form-item>
              <el-form-item label="位置2" v-if="cardNum > 1">
                <el-input v-model="cardlist[1].title_sub" placeholder="请输入图标底部对应文案" clearable style="max-width: 180px"></el-input>
                <el-input v-model="cardlist[1].pic" placeholder="请输入图标地址" clearable style="max-width: 360px" type="textarea" autosize></el-input>
                <el-input v-model="cardlist[1].scheme" placeholder="请输入链接跳转地址" clearable style="max-width: 360px" type="textarea" autosize></el-input>
              </el-form-item>
              <el-form-item label="位置3" v-if="cardNum > 2">
                <el-input v-model="cardlist[2].title_sub" placeholder="请输入图标底部对应文案" clearable style="max-width: 180px"></el-input>
                <el-input v-model="cardlist[2].pic" placeholder="请输入图标地址" clearable style="max-width: 360px" type="textarea" autosize></el-input>
                <el-input v-model="cardlist[2].scheme" placeholder="请输入链接跳转地址" clearable style="max-width: 360px" type="textarea" autosize></el-input>
              </el-form-item>
              <el-form-item label="位置4" v-if="cardNum > 3">
                <el-input v-model="cardlist[3].title_sub" placeholder="请输入图标底部对应文案" clearable style="max-width: 180px"></el-input>
                <el-input v-model="cardlist[3].pic" placeholder="请输入图标地址" clearable style="max-width: 360px" type="textarea" autosize></el-input>
                <el-input v-model="cardlist[3].scheme" placeholder="请输入链接跳转地址" clearable style="max-width: 360px" type="textarea" autosize></el-input>
              </el-form-item>
            </el-form>
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
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  name: "addChannel",
  components: {
    Auth
  },
  data() {
    return {
      cname: "",
      formInline: {
        channel_name: "",
        channel_name_tw: "", // 频道繁体名
        channel_name_us: "", // 频道英文名
        channel_type: 1,
        stat_time: "",
        end_time: "",
        source: 0,
        tag_id: "",
        order: 1,
        popover: false
      },
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
      cancel_limit: "",
      more_doc: "",
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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 < Date.now();
        }
      }
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email", "channelType", "channelTag"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getChannelDrop();
      }
    },
    getChannelDrop() {
      //获取频道类型下拉列表和标签列表
      const data = {
        url: "/channel/getList",
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("GetChannelDrop", data);
    },
    onSubmit() {
      this.formInline.popover = false;
      if (!this.formInline.channel_name) {
        Message({
          showClose: true,
          message: "请输入频道名称！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.formInline.channel_name_tw) {
        Message({
          showClose: true,
          message: "请输入频道繁体字名称！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.formInline.channel_name_us) {
        Message({
          showClose: true,
          message: "请输入频道英文名称！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.formInline.stat_time || !this.formInline.end_time) {
        Message({
          showClose: true,
          message: "请选择运营时间！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.formInline.stat_time >= this.formInline.end_time) {
        Message({
          showClose: true,
          message: "结束日期必须大于开始日期！",
          type: "error",
          duration: 3000
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
            duration: 3000
          });
          return;
        }
      }
      let cardlist;
      if (this.isAddCard) {
        cardlist = [];
        for (let i = 0; i < this.cardNum; i++) {
          if (!this.cardlist[i].title_sub) {
            Message({
              showClose: true,
              message: `请填写位置${i + 1}的图标对应文案！`,
              type: "error",
              duration: 3000
            });
            return;
          }
          if (!this.cardlist[i].pic) {
            Message({
              showClose: true,
              message: `请填写位置${i + 1}的图标地址！`,
              type: "error",
              duration: 3000
            });
            return;
          }
          if (!this.cardlist[i].scheme) {
            Message({
              showClose: true,
              message: `请填写位置${i + 1}的链接跳转地址！`,
              type: "error",
              duration: 3000
            });
            return;
          }
          cardlist.push(this.cardlist[i]);
        }
      }
      // triggers整合
      let triggerList = [];
      const rankValue = this.getRankType();
      if (rankValue === 'return') {
        return;
      } else {
        rankValue && triggerList.push(rankValue);
      }
      if (this.priorityList && this.priorityList.length > 0) {
        triggerList = triggerList.concat(this.priorityList);
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
      this.uid1 && triggerList.push(`channel_uid_priority_${this.uid1}`);
      this.uid2 && triggerList.push(`channel_uid_priority_${this.uid2}`);
      this.cancel_limit && triggerList.push(this.cancel_limit);
      this.more_doc && triggerList.push(this.more_doc);

      const data = {
        url: "/channel/addChannel",
        params: {
          channel_name: this.formInline.channel_name,
          channel_name_tw: this.formInline.channel_name_tw,
          channel_name_us: this.formInline.channel_name_us,
          channel_type: this.formInline.channel_type,
          stat_time: this.formInline.stat_time,
          end_time: this.formInline.end_time,
          source: this.formInline.source,
          tag_id: this.formInline.tag_id,
          order: this.formInline.order,
          cardlist: (cardlist && JSON.stringify(cardlist)) || "",
          triggers: triggerList.join(","),
          channel_expired_timestamp: this.getExpiredTime() || "",
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
    },
    getExpiredTime() {
      return this.channel_expired_day * 24 * 3600 + this.channel_expired_hour * 3600;
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
    handelCardState() {
      if (this.isAddCard && !this.cardNum) {
        this.cardNum = 3;
      }
    }
  },
  created() {
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    },
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
.el-main {
  padding: 0;
  color: #333;
  line-height: 100%;
  .pane-title-wrap {
    padding: 20px 14px;
    background: #fff;
    border-bottom: 1px solid #f0f2f5;
    .pane-title {
      font-size: 16px;
      color: #409eff;
      text-align: left;
    }
  }
  .content-box-wrap {
    padding: 14px;
  }
}
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
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