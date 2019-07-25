<template>
  <div>
    <div v-if="item">
      <el-row
        class="clearfix"
        v-if="item.user"
      >
        <div class="left">
          <a
            class="item-avatar"
            target="_blank"
            :href="`//weibo.com/u/${item.user.id}`"
            title="跳转微博主页"
          ><img :src="item.user.profile_image_url" /></a>
        </div>
        <div
          class="left"
          style="padding: 10px"
        >
          <el-row>
            <a
              class="item-name"
              :href="`//weibo.com/u/${item.user.id}`"
              target="_blank"
              title="跳转微博主页"
            >{{item.user.screen_name}}</a>
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
                :href="item.link || 'javascript:void(0)'"
                target="_blank"
              >{{parseTime(item.created_at)}}</a>
            </span>
            <span
              v-if="item.source"
              class="info-box"
            >来自
              <label
                class="item-info"
                v-html="item.source"
              ></label>
            </span>
          </el-row>
        </div>
      </el-row>
      <el-row class="content-text">
        <a
          :href="item.link || 'javascript:void(0)'"
          target="_blank"
          title="查看微博详情"
        >{{item.text}}</a>
      </el-row>
      <el-row
        class="img-wrapper"
        v-if="item.pic_ids && item.pic_ids.length > 0"
      >
        <el-col :xs="24">
          <el-row>
            <el-col
              style="margin: 2px;max-width: 110px;"
              :xs="7"
              :key="idx"
              v-for="(val, idx) in item.pic_ids"
            >
              <a
                class="img-box"
                :href="`//wx1.sinaimg.cn/nmw690/${val}.jpg`"
                target="_blank"
              >
                <div
                  class="bg-img"
                  :style="`background-image: url(//ww2.sinaimg.cn/bmiddle/${val}.jpg);`"
                >{{!val && '图片加载失败' || ''}}</div>
              </a>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row
        v-if="item.retweeted_status"
        class="retweeted-box"
      >
        <el-col>
          <div>
            <a
              class="item-name"
              :href="`//weibo.com/u/${item.retweeted_status.user.id}`"
              target="_blank"
            >@{{item.retweeted_status.user.screen_name}}</a>
          </div>
          <el-row class="content-text">
            <a
              :href="`//m.weibo.cn/status/${item.retweeted_status.mid}`"
              target="_blank"
              title="查看微博详情"
            >{{item.retweeted_status.text}}</a>
          </el-row>
          <el-row
            class="img-wrapper"
            v-if="item.retweeted_status.pic_ids && item.retweeted_status.pic_ids.length > 0"
          >
            <el-col
              :xs="24"
              :span="12"
            >
              <el-row>
                <el-col
                  style="margin: 2px;max-width: 110px;"
                  :span="7"
                  :key="idx"
                  v-for="(val, idx) in item.retweeted_status.pic_ids"
                >
                  <a
                    class="img-box"
                    :href="`//wx1.sinaimg.cn/nmw690/${val}.jpg`"
                    target="_blank"
                  >
                    <div
                      class="bg-img"
                      :style="`background-image: url(//ww2.sinaimg.cn/bmiddle/${val}.jpg);`"
                    >{{!val && '图片加载失败' || ''}}</div>
                  </a>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row
            class="video-wrapper"
            v-if="videoStatus.retweet"
          >
            <span
              class="play-btn"
              v-if="!videoSrc"
              @click="togglePlay(item.retweeted_status.mid)"
            >
              <i class="el-icon-caret-right play-btn-icon"></i>
            </span>
            <video
              :poster="posterSrc"
              :controls="controls"
              :src="videoSrc"
              autoplay
            >您的浏览器不支持HTML5</video>
          </el-row>
          <el-row style="margin-top: 10px;">
            <span
              class="item-info"
              title="查看微博详情"
            >
              <i class="el-icon-time"></i>
              <a
                :href="`//m.weibo.cn/status/${item.retweeted_status.mid}`"
                target="_blank"
              >{{parseTime(item.retweeted_status.created_at, '{y}年{m}月{d}日 {h}:{i}:{s}')}}</a>
            </span>
            <span
              v-if="item.retweeted_status.source"
              class="info-box"
            >来自
              <label
                class="item-info"
                v-html="item.retweeted_status.source"
              ></label>
            </span>
          </el-row>
          <el-row
            type="flex"
            class="item-footer"
          >
            <el-col class="footer-list">
              <label>转发 </label>
              <span>{{formatNum(item.retweeted_status.reposts_count)}}</span>
            </el-col>
            <el-col class="footer-list">
              <label>评论 </label>
              <span>{{formatNum(item.retweeted_status.comments_count)}}</span>
            </el-col>
            <el-col
              class="footer-list"
              style="border: 0"
            >
              <label>点赞 </label>
              <span>{{formatNum(item.retweeted_status.attitudes_count)}}</span>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row
        class="video-wrapper"
        v-if="videoStatus.source"
      >
        <span
          class="play-btn"
          v-if="!videoSrc"
          @click="togglePlay(item.id)"
        >
          <i class="el-icon-caret-right play-btn-icon"></i>
        </span>
        <video
          :poster="posterSrc"
          :controls="controls"
          :src="videoSrc"
          autoplay
        >您的浏览器不支持HTML5</video>
      </el-row>
    </div>
    <el-row
      type="flex"
      class="item-footer"
      v-if="item"
    >
      <el-col class="footer-list">
        <label>转发 </label>
        <span>{{formatNum(item.reposts_count)}}</span>
      </el-col>
      <el-col class="footer-list">
        <label>评论 </label>
        <span>{{formatNum(item.comments_count)}}</span>
      </el-col>
      <el-col
        class="footer-list"
        style="border: 0"
      >
        <label>点赞 </label>
        <span>{{formatNum(item.attitudes_count)}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import { formatNum, parseTime } from "@/utils";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "ItemList",
  props: ["item"],
  data() {
    return {
      formatNum,
      parseTime,
      videoStatus: {
        source: false,
        retweet: false
      },
      videoTempSrc: "",
      videoSrc: "",
      posterSrc: "",
      controls: false
    };
  },
  computed: {
    ...mapGetters(["curvideo"])
  },
  created() {
    this.init();
  },
  methods: {
    // 判断是转发物料还是原创物料
    init() {
      try {
        if (this.item.retweeted_status) {
          // 转发物料
          this.setVideoInfo(this.item.retweeted_status.url_objects, "retweet");
        } else {
          //原创物料
          this.setVideoInfo(this.item.url_objects, "source");
        }
      } catch (err) {
        this.videoStatus.source = false;
        this.videoStatus.retweet = false;
      }
    },
    setVideoInfo(arr, videoType) {
      try {
        for (let i = 0; i < arr.length; i++) {
          const cur = (arr[i].object && arr[i].object.object) || {};
          this.posterSrc = cur.image.url; // 展示视频图片
          if (cur.object_type === "video") {
            if (cur.urls) {
              this.videoTempSrc = cur.urls.mp4_hd_mp4 || cur.urls.mp4_ld_mp4;
              this.videoStatus[videoType] = true;
              return;
            } else if (cur.stream && cur.stream.format === "mp4") {
              this.videoTempSrc = cur.stream.url;
              this.videoStatus[videoType] = true;
              return;
            }
          } else if (cur.object_type === "story") {
            this.videoTempSrc =
              cur.slide_cover &&
              cur.slide_cover.slide_videos &&
              cur.slide_cover.slide_videos[0] &&
              cur.slide_cover.slide_videos[0].url
                ? cur.slide_cover.slide_videos[0].url
                : "";
            if (this.videoTempSrc) {
              this.videoStatus[videoType] = true;
              return;
            }
          }
        }
      } catch (err) {
        //无视频
        this.videoStatus[videoType] = false;
      }
    },
    togglePlay(mid) {
      this.$store.dispatch("updateVideo", mid);
      if (!this.videoSrc) {
        this.videoSrc = this.videoTempSrc;
        this.controls = true;
      }
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
      const mid = (this.item && this.item.id) || 0;
      if (this.curvideo != mid) {
        this.videoSrc = "";
        this.controls = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
body {
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
    .search-form-wrap {
      padding-left: 14px;
      padding-right: 14px;
      padding-top: 18px;
      background-color: #fff;
      border-bottom: 1px solid #f0f2f5;
    }
    .content-box-wrap {
      padding: 40px 10px 10px;
    }
    .none-tips {
      padding: 20px 0;
      text-align: center;
      color: #999;
    }
    .operate-box {
      position: fixed;
      top: 250px;
      z-index: 999;
      background-color: rgba(255, 255, 255, 0.8);
    }
  }

  .item-wrapper {
    margin-top: 10px;
    padding: 15px 10px 4px;
    // background-color: #fff;
    background-color: #fcfcfc;
    font-size: 16px;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border: 2px solid #f0f2f5;
    border-radius: 5px;
    .item-status-box {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      span,
      a {
        color: #666;
        font-size: 14px;
      }
      .item-status-mid {
        font-weight: bold;
        text-decoration: underline;
        &:hover {
          color: #409eff;
        }
      }
      .item-mid-info {
        padding-top: 10px;
        font-size: 14px;
        color: #e6a23c;
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
          padding: 48% 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          text-align: center;
          color: #666;
          border: 1px solid #eee;
        }
      }
    }
    .item-footer {
      margin-top: 10px;
      padding: 10px 0;
      color: #666;
      border-top: 1px solid #f2f2f5;
      .footer-list {
        font-size: 12px;
        text-align: center;
        border-right: 1px solid #ccc;
      }
    }
    .retweeted-box {
      background-color: #f5f5f5;
      padding: 10px;
      padding-bottom: 0;
    }
  }
}
</style>