<template>
  <el-row type="flex" justify="center" v-if="item">
    <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23" class="item-wrapper">
      <el-row class="clearfix">
        <div class="left">
          <a class="item-avatar" target="_blank" :href="`//weibo.com/u/${item.user.id}`" title="跳转微博主页"><img :src="item.user.profile_image_url" /></a>
        </div>
        <div class="left" style="padding: 10px">
          <el-row>
            <a class="item-name" :href="`//weibo.com/u/${item.user.id}`" target="_blank" title="跳转微博主页">{{item.user.screen_name}} {{item.mid}}</a>
          </el-row>
          <el-row type="flex" style="margin-top: 10px;">
            <span class="item-info" title="查看微博详情">
              <i class="el-icon-time"></i>
              <a :href="`//m.weibo.cn/status/${item.mid}`" target="_blank">{{item.created_at}}</a>
            </span>
            <span class="info-box" v-if="item.source">来自
              <label class="item-info" v-html="item.source"></label>
            </span>
          </el-row>
        </div>
      </el-row>
      <el-row class="content-text">
        <a class="text-box" :href="`//m.weibo.cn/status/${item.mid}`" target="_blank" title="查看微博详情">{{item.text}}</a>
      </el-row>
      <el-row class="img-wrapper" v-if="item.pic_ids && item.pic_ids.length > 0">
        <el-col style="margin: 2px"  :span="7" :key="idx" v-for="(pic, idx) in item.pic_ids">
          <div class="img-box">
            <div class="bg-img" :style="`background-image: url(//ww2.sinaimg.cn/bmiddle/${pic}.jpg);`">{{!pic && '图片加载失败' || ''}}</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="video-wrapper" v-if="isVideo">
        <span class="play-btn" v-if="!videoSrc" @click="togglePlay()">
          <i class="el-icon-caret-right play-btn-icon"></i>
        </span>
        <video :poster="item.url_objects[0].object.object.image.url" :controls="controls" :src="videoSrc" autoplay>您的浏览器不支持HTML5</video>
      </el-row>
      <el-row type="flex" class="item-footer">
        <el-col class="footer-list">
          <i class="el-icon-edit-outline hidden-xs-only"></i>
          <label>转发 </label>
          <span>{{_formatNum(item.reposts_count)}}</span>
        </el-col>
        <el-col class="footer-list">
          <i class="el-icon-view hidden-xs-only"></i>
          <label>评论 </label>
          <span>{{_formatNum(item.comments_count)}}</span>
        </el-col>
        <el-col class="footer-list" style="border: 0">
          <i class="el-icon-phone-outline hidden-xs-only"></i>
          <label>点赞 </label>
          <span>{{_formatNum(item.attitudes_count)}}</span>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { formatNum, parsePercent, parseTime } from "@/utils";

export default {
  name: "itemList",
  props: ["item"],
  data() {
    return {
      isVideo: false,
      videoSrc: "",
      controls: false
    };
  },
  computed: {
    ...mapGetters(["curvideo"])
  },
  methods: {
    init() {
      try {
        const res = this.item.url_objects[0].object.object.stream.url;
        this.isVideo = true;
      } catch (err) {
        //无视频
        this.isVideo = false;
      }
    },
    togglePlay() {
      this.$store.dispatch("updateVideo", this.item.mid);
      if (!this.videoSrc) {
        this.videoSrc = this.item.url_objects[0].object.object.stream.url;
        this.controls = true;
      }
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
  created() {
    this.init();
  },
  watch: {
    item() {
      this.init();
    },
    curvideo() {
      if (this.curvideo != this.item.mid) {
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
        &:hover {
          text-decoration: underline;
        }
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
}
</style>
