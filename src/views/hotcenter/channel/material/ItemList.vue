<template>
  <el-row v-if="item.card_type == 9 && item.mblog" type="flex" justify="center">
    <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23" class="item-wrapper">
      <el-row class="clearfix">
        <div class="left">
          <a class="item-avatar" target="_blank" :href="item.mblog.user.profile_url" title="跳转微博主页"><img :src="item.mblog.user.profile_image_url" /></a>
        </div>
        <div class="left" style="padding: 10px">
          <el-row>
            <a class="item-name" :href="item.mblog.user.profile_url" target="_blank" title="跳转微博主页">{{item.mblog.user.screen_name}}</a>
          </el-row>
          <el-row type="flex" style="margin-top: 10px;">
            <span class="item-info" title="查看微博详情">
              <i class="el-icon-time"></i>
              <a :href="`//weibo.com/${item.mblog.user.id}/${item.mblog.bid}`" target="_blank">{{item.mblog.created_at}}</a>
            </span>
            <span class="info-box" v-if="item.mblog.source">来自
              <label class="item-info">{{item.mblog.source}}</label>
            </span>
          </el-row>
        </div>
      </el-row>
      <el-row class="content-text">
        <a class="text-box" :href="`//weibo.com/${item.mblog.user.id}/${item.mblog.bid}`" target="_blank" title="查看微博详情">
            <div v-html="formartText(item.mblog.text)"></div>
        </a>
      </el-row>
      <el-row class="img-wrapper" v-if="item.mblog.pics && item.mblog.pics.length > 0">
        <el-col style="margin: 2px"  :span="7" :key="idx" v-for="(obj, idx) in item.mblog.pics">
          <div class="img-box">
            <div class="bg-img" :style="`background-image: url(${obj.url});`">{{!obj.url && '图片加载失败' || ''}}</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="video-wrapper" v-if="item.mblog.page_info && item.mblog.page_info.type == 'video'">
        <span class="play-btn" v-if="!videoSrc" @click="togglePlay()">
          <i class="el-icon-caret-right play-btn-icon"></i>
        </span>
        <video :poster="item.mblog.page_info.page_pic.url" :controls="controls" :src="videoSrc" autoplay>您的浏览器不支持HTML5</video>
      </el-row>
      <el-row type="flex" class="item-footer">
        <el-col class="footer-list">
          <i class="el-icon-edit-outline hidden-xs-only"></i>
          <label>转发 </label>
          <span>{{_formatNum(item.mblog.reposts_count)}}</span>
        </el-col>
        <el-col class="footer-list">
          <i class="el-icon-view hidden-xs-only"></i>
          <label>评论 </label>
          <span>{{_formatNum(item.mblog.comments_count)}}</span>
        </el-col>
        <el-col class="footer-list" style="border: 0">
          <i class="el-icon-phone-outline hidden-xs-only"></i>
          <label>点赞 </label>
          <span>{{_formatNum(item.mblog.attitudes_count)}}</span>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { formatNum, parsePercent, parseTime } from "@/utils";
import { category, ability } from "@/utils/tagconf";

export default {
  name: "itemList",
  props: ["item"],
  data() {
    return {
      loading: false,
      isEditable: false,
      videoSrc: "",
      categoryList: [],
      secondTagList: [],
      thirdTagList: [],
      cate: "",
      second_tag: "",
      third_tag: [],
      deleteReason: "",
      controls: false,
      logList: [
        {
          content: "删除",
          operator: "tester",
          create_time: 1524672798,
          description: "内容有待审核"
        },
        {
          content: "通过审核",
          operator: "tester",
          create_time: 1524672598
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["curvideo"])
  },
  methods: {
    togglePlay() {
      this.$store.dispatch("updateVideo", this.item.mblog.mid);
      if (!this.videoSrc) {
        this.videoSrc = this.item.mblog.page_info.media_info.stream_url;
        this.controls = true;
      }
    },
    formartText(text) {
        return text.replace(`href='/n/`, `href='//m.weibo.cn/n/`);
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num, dec) {
      return parsePercent(num, dec);
    },
    _parseTime(time, cFormat) {
      return parseTime(time, cFormat);
    }
  },
  watch: {
    item() {},
    curvideo() {
      if (this.item.card_type == 9 && this.curvideo != this.item.mblog.mid) {
        this.videoSrc = "";
        this.controls = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.item-wrapper {
  padding: 15px 10px 4px;
  max-width: 750px;
  background-color: #fff;
  font-size: 16px;
  border-top: 1px solid #f2f2f5;
  .item-status-box {
    label {
      margin-left: 10px;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .item-mid {
      color: #f4516c;
    }
    .item-uid {
      color: #30b08f;
    }
    .item-mysql {
      color: #fec171;
    }
    .item-origin {
      color: #4ab7bd;
    }
    .item-state {
      color: #eb7350;
    }
  }
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
    color: #333;
    font-size: 1rem;
    line-height: 1.5;
    .text-box {
        display: inline-block;
        .url-icon {
            display: inline-block;
            vertical-align: middle;
            margin-right: .125rem;
        }
        a { color: #3c6e9e; }
    }
  }
  .video-wrapper {
    position: relative;
    margin-bottom: 15px;
  }
  .video-wrapper,
  .video-wrapper video {
    width: 100%;
    max-width: 500px;
    max-height: 281px;
    background-color: #000;
  }
  .play-btn {
    z-index: 200;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    cursor: pointer;
  }
  .play-btn-icon {
    margin-top: 16px;
    margin-left: 16px;
    color: #f4516c;
    font-size: 48px;
  }
  .img-wrapper {
    .img-box {
      position: relative;
      padding-bottom: 100%;
      display: inline-block;
      width: 100%;
      height: 0;
      background-color: #e6e6e6;
      .bg-img {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        text-align: center;
        color: #666;
        padding: 48% 0;
      }
    }
  }
  .item-footer {
    padding: 10px 0;
    color: #666;
    .footer-list {
      text-align: center;
      border-right: 1px solid #ccc;
      label,span {
          font-size: 14px;
      }
    }
  }
  .table-title {
    padding: 5px 10px;
    color: #409eff;
    border-bottom: 2px solid #409eff;
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss">
.content-text {
    .text-box {
        .url-icon {
            display: inline-block;
            vertical-align: middle;
            margin-right: .125rem;
        }
        a { color: #3c6e9e; }
    }
  }
</style>
