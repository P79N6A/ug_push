<template>
  <el-main v-if="pageAuth === 1">
    <div
      v-if="midData"
      class="mid-wrapper"
    >
      <el-row class="clearfix">
        <div class="left">
          <a
            class="item-avatar"
            target="_blank"
            :href="midData.user.id && `//weibo.com/u/${midData.user.id}` || 'javascript:void(0)'"
            title="跳转微博主页"
          ><img :src="midData.user.avatar_hd" /></a>
        </div>
        <div
          class="left"
          style="padding: 10px"
        >
          <el-row>
            <a
              class="item-name"
              :href="midData.user.id && `//weibo.com/u/${midData.user.id}` || 'javascript:void(0)'"
              target="_blank"
              title="跳转微博主页"
            >{{midData.user.name || '未知'}}</a>
          </el-row>
          <el-row
            type="flex"
            style="margin-top: 10px;"
          >
            <span
              class="item-info"
              title="查看微博详情"
            >
              <i class="el-icon-time"></i>
              <a
                :href="midData.link || 'javascript:void(0)'"
                target="_blank"
              >{{_parseTime(midData.created_at)}}</a>
            </span>
            <span
              v-if="midData.source"
              class="info-box"
            >来自
              <label
                class="item-info"
                v-html="midData.source"
              ></label>
            </span>
          </el-row>
        </div>
      </el-row>
      <el-row class="content-text">
        <a
          :href="midData.link || 'javascript:void(0)'"
          target="_blank"
          title="查看微博详情"
        >{{midData.text}}</a>
      </el-row>
      <el-row class="item-tag-box" v-if="tag_data">
        <span v-if="tag_data.first && tag_data.first.length > 0">
          <el-tag class="item-tag" size="small" :key="idx" v-for="(tag, idx) in (tag_data.first)">{{tag.name}} (1)</el-tag>
        </span>
        <span v-if="tag_data.second && tag_data.second.length > 0">
          <el-tag class="item-tag" type="success" size="small" :key="idx" v-for="(tag, idx) in (tag_data.second)">{{tag.name}} (2)</el-tag>
        </span>
        <span v-if="tag_data.third && tag_data.third.length > 0">
          <el-tag class="item-tag" type="warning" size="small" :key="idx" v-for="(tag, idx) in (tag_data.third)">{{tag.name}} (3)</el-tag>
        </span>
      </el-row>
      <el-row
        type="flex"
        class="item-footer"
      >
        <el-col class="footer-list">
          <a
            :href="midData.link || 'javascript:void(0)'"
            target="_blank"
          >
            <i class="el-icon-thumb hidden-xs-only"></i>
            <label>点赞 </label>
            <span>{{_formatNum(midData.attitudes_count)}}</span>
          </a>
        </el-col>
        <el-col class="footer-list">
          <a
            :href="midData.link || 'javascript:void(0)'"
            target="_blank"
          >
            <i class="el-icon-share hidden-xs-only"></i>
            <label>转发 </label>
            <span>{{_formatNum(midData.reposts_count)}}</span>
          </a>
        </el-col>
        <el-col
          class="footer-list"
          style="border: 0"
        >
          <a
            :href="midData.link || 'javascript:void(0)'"
            target="_blank"
          >
            <i class="el-icon-chat-dot-round hidden-xs-only"></i>
            <label>评论 </label>
            <span>{{_formatNum(midData.comments_count)}}</span>
          </a>
        </el-col>
      </el-row>
    </div>
    <el-row class="table-wrapper">
      <div class="data-list-title">模型特征</div>
      <el-table
        :data="dataList"
        style="width: 100%"
        border
        stripe
        size="small"
      >
        <el-table-column
          prop="name"
          label="特征名"
        ></el-table-column>
        <el-table-column
          prop="desc"
          label="特征含义"
        ></el-table-column>
        <el-table-column
          prop="value"
          label="特征值"
        ></el-table-column>
      </el-table>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { Message } from "element-ui";
import { mapGetters } from "vuex";
import { formatNum, parseTime } from "@/utils";

export default {
  name: "freshreviewDetail",
  components: {
    Auth
  },
  data() {
    return {
      formInline: null,
      dataList: [],
      midData: null,
      dataMap: {
        timestamp: "时间戳",
        serviceType: "",
        firstLevelInteWeight: "一级标签匹配度",
        infoFairExpoAppendType: "",
        likeNumRecent: "最近赞数",
        hotCmtNumRecent: "最近站内评论数",
        userDetailTags: "用户兴趣标签",
        groupId: "GroupID",
        cmtNumRecent: "最近评论数",
        errorCode: "",
        articleWeight: "长文权重",
        likeNum: "赞数",
        vid: "访客ID ",
        scenesHotwb: "",
        exposeNumRecent: "最近曝光数",
        exposureMidActTotal: "",
        exposeNum: "曝光数",
        respDictionaryStr: "",
        specialRecommend: "",
        mblogMiaopaiNum: "秒拍观看数",
        ctr: "CTR",
        interestWeight: "兴趣权重",
        thirdLevelInteWeight: "三级标签匹配度",
        objWeight: "",
        hotRetNum: "站内转发数",
        picWeight: "图片权重",
        recommendSourceDetail: "",
        domain: "",
        timeSpentMillis: "",
        actNum: "行为数",
        aid: "",
        hotLikeNum: "站内赞数",
        infoNegTagDetail: "负反馈信息",
        userWeight: "",
        hotCmtNum: "站内评论数",
        recommendSource: "推荐来源",
        hotRetNumRecent: "最近站内转发数",
        userDetailGender: "性别",
        recommendReason: "推荐原因",
        mid: "微博ID",
        secondLevelInteWeight: "二级标签匹配度",
        userDetailBorn: "年龄",
        uid: "登录用户ID",
        articleReadNum: "文章阅读数",
        totalReadNum: "微博阅读数",
        networkType: "网络状态",
        hotWeight: "热度权重",
        interActNum: "互动数",
        parameterType: "",
        interActNumRecent: "最近互动数",
        retNum: "转发数",
        miaopaiViewNum: "秒拍观看数",
        recommendSourceId: "推荐来源ID",
        authorId: "博主ID",
        errorMsg: "",
        hotLikeNumRecent: "最近站内赞数",
        actNumRecent: "最近行为数",
        retNumRecent: "最近赞数",
        areaId: "地域ID",
        videoWeight: "视频权重",
        informationHotTagDetail: "微博标签信息",
        cmtNum: "评论数",
        category: "推荐领域",
        effectWeight: "时效性",
        categoryId: "",
        count: ""
      },
      tag_data: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        const { mid, intervals, uid } = this.$route.query;
        this.formInline = {
          mid,
          intervals,
          uid
        };
        this.showbatch(mid);
        this.onSearch();
      }
    },
    showbatch(mid) {
      const data = {
        url: "/lab/showbatch",
        params: {
          ids: mid,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        this.midData = (res && res[0]) || "";
      });
    },
    onSearch() {
      const data = {
        url: "/dataview/exposureDetail",
        params: {
          ...this.formInline,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res && res.code == 200) {
            res.result && this.annalyData(res.result);
            this.tag_data = res.tag_data || false;
        }
      });
    },
    annalyData(obj) {
        for (let k in obj) {
            this.dataList.push({
                name: k,
                desc: this.dataMap[k] || k,
                value: (obj[k] == undefined || obj[k] == "") ? "暂无" : obj[k]
            });
        }
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parseTime(time, cFormat) {
      return parseTime(time, cFormat);
    }
  },
  created() {
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    },
    email() {}
  }
};
</script>

<style lang="scss" scoped>
body {
  .el-main {
    padding: 0;
    color: #333;
    line-height: 100%;
    .mid-wrapper {
      padding: 10px;
      border-bottom: 1px dashed #ddd;
      .item-avatar {
        display: inline-block;
        width: 60px;
        height: 60px;
        box-shadow: 1px 1px 3px 2px #ccc;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .item-name {
        font-weight: 700;
        color: #333;
      }
      .item-name:hover,
      .item-info:hover {
        color: #eb7350;
        text-decoration: underline;
      }
      .info-box,
      .item-info {
        margin-right: 10px;
        font-size: 14px;
        color: #666;
      }
      .content-text {
        padding: 15px 0;
        width: 100%;
        color: #606266;
        font-size: 14px;
        line-height: 18px;
        &:hover {
          text-decoration: underline;
          color: #eb7350;
        }
      }
      .item-tag-box {
        padding-bottom: 10px;
        .item-tag {
          margin-right: 5px;
        }
      }
      .item-footer {
        padding: 10px 0;
        color: #666;
        border-top: 1px solid #f2f2f5;
        .footer-list {
          font-size: 12px;
          text-align: center;
          border-right: 1px solid #ccc;
          a {
            display: inline-block;
          }
        }
      }
    }
    .table-wrapper {
      padding: 10px;
      .data-list-title {
        display: inline-block;
        padding: 5px 20px;
        font-size: 14px;
        color: #409eff;
        border-bottom: 2px solid #409eff;
        margin: 10px 0;
      }
    }
  }
}
</style>
