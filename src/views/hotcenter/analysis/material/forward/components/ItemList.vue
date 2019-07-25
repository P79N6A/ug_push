<template>
  <el-row>
    <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23" class="item-wrapper">
      <el-row>
        <div class="item-status-box clearfix">
          <span>NO.{{index}}</span>
        </div>
      </el-row>
      <el-row class="clearfix">
        <div class="left">
          <a class="item-avatar" target="_blank" :href="`//weibo.com/u/${item.uid}`" title="跳转微博主页"><img :src="item.profile_image_url" /></a>
        </div>
        <div class="left" style="padding: 10px">
          <el-row>
            <a class="item-name" :href="`//weibo.com/u/${item.uid}`" target="_blank" title="跳转微博主页">{{item.screen_name}}</a>
          </el-row>
          <el-row type="flex" style="margin-top: 10px;">
            <span v-if="item.created_at" class="item-info" title="查看微博详情">
              <i class="el-icon-time"></i>
              <a :href="item.link || 'javascript:void(0)'" target="_blank">{{_parseTime(item.created_at, '{y}年{m}月{d}日 {h}:{i}:{s}')}}</a>
            </span>
            <span v-if="item.source" class="info-box">来自
              <label class="item-info" v-html="item.source"></label>
            </span>
          </el-row>
        </div>
      </el-row>
      <el-row class="content-text">
        <a :href="item.link || 'javascript:void(0)'" target="_blank" title="查看微博详情">{{item.text}}</a>
      </el-row>
      <el-row class="img-wrapper" v-if="item.pic_ids && item.pic_ids.length > 0">
        <el-col :xs="24" :span="12">
          <el-row>
            <el-col style="margin: 2px" :span="7" :key="idx" v-for="(val, idx) in item.pic_ids">
              <div class="img-box">
                <div class="bg-img" :style="`background-image: url(//ww2.sinaimg.cn/bmiddle/${val}.jpg);`">{{!val && '图片加载失败' || ''}}</div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row v-if="item.retweeted_status" class="retweeted-box">
        <el-col>
          <div>
            <a class="item-name" :href="`//weibo.com/u/${item.retweeted_status.user.id}`" target="_blank">@{{item.retweeted_status.user.screen_name}}</a>
          </div>
          <el-row class="content-text">
            <a :href="item.link || 'javascript:void(0)'" target="_blank" title="查看微博详情">{{item.retweeted_status.text}}</a>
          </el-row>
          <el-row class="img-wrapper" v-if="item.retweeted_status.pic_ids && item.retweeted_status.pic_ids.length > 0">
            <el-col :xs="24" :span="12">
              <el-row>
                <el-col style="margin: 2px;max-width: 110px;" :span="7" :key="idx" v-for="(val, idx) in item.retweeted_status.pic_ids">
                  <div class="img-box">
                    <div class="bg-img" :style="`background-image: url(//ww2.sinaimg.cn/bmiddle/${val}.jpg);`">{{!val && '图片加载失败' || ''}}</div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="video-wrapper" v-if="item.retweeted_status.video_pic_urls && item.retweeted_status.video_pic_urls.length > 0">
            <span class="play-btn" v-if="!videoSrc" @click="togglePlay()">
              <i class="el-icon-caret-right play-btn-icon"></i>
            </span>
            <video :id="`video${item.mid}`" :poster="item.retweeted_status.video_pic_urls[0]" :controls="controls" :src="videoSrc" autoplay>您的浏览器不支持HTML5</video>
          </el-row>
          <el-row style="margin-top: 10px;">
            <span class="item-info" title="查看微博详情">
              <i class="el-icon-time"></i>
              <a :href="item.link || 'javascript:void(0)'" target="_blank">{{_parseTime(item.retweeted_status.created_at, '{y}年{m}月{d}日 {h}:{i}:{s}')}}</a>
            </span>
            <span v-if="item.retweeted_status.source" class="info-box">来自
              <label class="item-info" v-html="item.retweeted_status.source"></label>
            </span>
          </el-row>
          <el-row type="flex" class="item-footer">
            <el-col class="footer-list">
              <i class="el-icon-news hidden-xs-only"></i>
              <label>转发 </label>
              <span>{{_formatNum(item.retweeted_status.reposts_count)}}</span>
            </el-col>
            <el-col class="footer-list">
              <i class="el-icon-message hidden-xs-only"></i>
              <label>评论 </label>
              <span>{{_formatNum(item.retweeted_status.comments_count)}}</span>
            </el-col>
            <el-col class="footer-list" style="border: 0">
              <i class="el-icon-star-off hidden-xs-only"></i>
              <label>点赞 </label>
              <span>{{_formatNum(item.retweeted_status.attitudes_count)}}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" class="item-footer">
        <el-col class="footer-list">
          <i class="el-icon-phone-outline hidden-xs-only"></i>
          <label>热度 </label>
          <span>{{_formatNum(item.hot_num)}}</span>
        </el-col>
        <el-col class="footer-list">
          <i class="el-icon-view hidden-xs-only"></i>
          <label>曝光 </label>
          <span>{{_formatNum(item.expo)}}</span>
        </el-col>
        <el-col class="footer-list">
          <i class="el-icon-edit hidden-xs-only"></i>
          <label>点击 </label>
          <span>{{_formatNum(item.click_num)}}</span>
        </el-col>
        <el-col class="footer-list" style="border: 0">
          <i class="el-icon-edit-outline hidden-xs-only"></i>
          <label>点击率 </label>
          <span>{{_parsePercent(item.click_rate)}}</span>
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
  props: ["item", "index"],
  data() {
    return {
      loading: false,
      videoSrc: "",
      controls: false
    };
  },
  computed: {
    ...mapGetters(["curvideo", "email"])
  },
  methods: {
    init() {},
    togglePlay() {
      this.$store.dispatch("updateVideo", this.item.mid);
      if (!this.videoSrc) {
        this.setVideoSrc();
        this.controls = true;
      }
    },
    setVideoSrc() {
      const data = {
        url: "/lab/showbatch",
        params: {
          ids: this.item.retweeted_status.mid,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        try {
          this.videoSrc = res[0].url_objects[0].object.object.stream.url;
        } catch (err) {
          this.videoSrc = this.item.retweeted_status.video_urls[0];
        }
        this.controls = true;
      });
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
    index() {},
    curvideo() {
      if (this.curvideo != this.item.mid) {
        this.videoSrc = "";
        this.controls = false;
      }
    },
    email() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.item-wrapper {
  margin-top: 10px;
  padding: 15px 10px 4px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 16px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  border: 2px solid #f0f2f5;
  .item-status-box {
    margin-bottom: 10px;
    span {
      color: #999;
      font-size: 14px;
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
    color: #606266;
    font-size: 14px;
    line-height: 18px;
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
    margin-top: 10px;
    padding: 10px 0;
    color: #666;
    border-top: 1px solid #eee;
    .footer-list {
      font-size: 12px;
      text-align: center;
      border-right: 1px solid #ccc;
    }
  }
  .table-title {
    padding: 5px 10px;
    color: #409eff;
    border-bottom: 2px solid #409eff;
    margin-bottom: 10px;
  }
  .retweeted-box {
    background-color: #f5f5f5;
    padding: 10px;
    padding-bottom: 0;
  }
}
</style>
