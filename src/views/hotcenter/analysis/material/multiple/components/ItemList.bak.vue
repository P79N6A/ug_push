<template>
  <el-row v-if="item">
    <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23" class="item-wrapper">
      <el-dialog :visible.sync="dialogVisible" :title="`查看【${dialogCurMid}】图片列表`">
        <h3 style="text-align: center;padding-bottom: 10px;">图{{dialogCurImg+1}}</h3>
        <img width="100%" :src="`//ww2.sinaimg.cn/bmiddle/${dialogImgList[dialogCurImg]}.jpg`" style="border: 1px solid #eee;">
        <div v-show="dialogCurImg > 0" class="item-arrow item-arrow-left" @click="handleImgChange(dialogCurImg-1)">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div v-show="dialogCurImg < (dialogImgList.length-1)" class="item-arrow item-arrow-right" @click="handleImgChange(dialogCurImg+1)">
          <i class="el-icon-arrow-right"></i>
        </div>
      </el-dialog>
      <el-row>
        <div class="item-status-box clearfix">
          <span>No.{{index}}</span>
          <a class="item-status-mid" :href="item.link" target="_blank" title="查看微博详情">{{item.mid}}</a>
          <p class="item-mid-info" v-if="item.id && info[item.id]">相关信息：{{info[item.id]}}</p>
        </div>
      </el-row>
      <div>
        <el-row class="clearfix" v-if="item.user">
          <div class="left">
            <a class="item-avatar" target="_blank" :href="`//weibo.com/u/${item.user.id}`" title="跳转微博主页"><img :src="item.user.profile_image_url" /></a>
          </div>
          <div class="left" style="padding: 10px">
            <el-row>
              <a class="item-name" :href="`//weibo.com/u/${item.user.id}`" target="_blank" title="跳转微博主页">{{item.user.screen_name}}</a>
            </el-row>
            <el-row type="flex" style="margin-top: 10px;">
              <span class="item-info" title="查看微博详情">
                <i class="el-icon-time"></i>
                <a :href="item.link || 'javascript:void(0)'" target="_blank">{{_parseTime(item.created_at)}}</a>
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
          <el-col :xs="24">
            <el-row>
              <el-col style="margin: 2px;max-width: 110px;" :xs="7" :key="idx" v-for="(val, idx) in item.pic_ids">
                <a class="img-box" @click="handlePicPreview(idx, item.pic_ids, item.mid)">
                  <div class="bg-img" :style="`background-image: url(//ww2.sinaimg.cn/bmiddle/${val}.jpg);`">{{!val && '图片加载失败' || ''}}</div>
                </a>
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
              <a :href="`//m.weibo.cn/status/${item.retweeted_status.mid}`" target="_blank" title="查看微博详情">{{item.retweeted_status.text}}</a>
            </el-row>
            <el-row class="img-wrapper" v-if="item.retweeted_status.pic_ids && item.retweeted_status.pic_ids.length > 0">
              <el-col :xs="24" :span="12">
                <el-row>
                  <el-col style="margin: 2px;max-width: 110px;" :span="7" :key="idx" v-for="(val, idx) in item.retweeted_status.pic_ids">
                    <a class="img-box" @click="handlePicPreview(idx, item.retweeted_status.pic_ids, item.retweeted_status.mid)">
                      <div class="bg-img" :style="`background-image: url(//ww2.sinaimg.cn/bmiddle/${val}.jpg);`">{{!val && '图片加载失败' || ''}}</div>
                    </a>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row class="video-wrapper" v-if="videoStatus.retweet">
              <span class="play-btn" v-if="!videoSrc" @click="togglePlay(item.retweeted_status.mid)">
                <i class="el-icon-caret-right play-btn-icon"></i>
              </span>
              <video :poster="posterSrc" :controls="controls" :src="videoSrc" autoplay>您的浏览器不支持HTML5</video>
            </el-row>
            <el-row style="margin-top: 10px;">
              <span class="item-info" title="查看微博详情">
                <i class="el-icon-time"></i>
                <a :href="`//m.weibo.cn/status/${item.retweeted_status.mid}`" target="_blank">{{_parseTime(item.retweeted_status.created_at, '{y}年{m}月{d}日 {h}:{i}:{s}')}}</a>
              </span>
              <span v-if="item.retweeted_status.source" class="info-box">来自
                <label class="item-info" v-html="item.retweeted_status.source"></label>
              </span>
            </el-row>
            <el-row type="flex" class="item-footer">
              <el-col class="footer-list">
                <label>转发 </label>
                <span>{{_formatNum(item.retweeted_status.reposts_count)}}</span>
              </el-col>
              <el-col class="footer-list">
                <label>评论 </label>
                <span>{{_formatNum(item.retweeted_status.comments_count)}}</span>
              </el-col>
              <el-col class="footer-list" style="border: 0">
                <label>点赞 </label>
                <span>{{_formatNum(item.retweeted_status.attitudes_count)}}</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="video-wrapper" v-if="videoStatus.source">
          <span class="play-btn" v-if="!videoSrc" @click="togglePlay(item.id)">
            <i class="el-icon-caret-right play-btn-icon"></i>
          </span>
          <video :poster="posterSrc" :controls="controls" :src="videoSrc" autoplay>您的浏览器不支持HTML5</video>
        </el-row>
      </div>
      <el-row type="flex" class="item-footer">
        <el-col class="footer-list">
          <label>转发 </label>
          <span>{{_formatNum(item.reposts_count)}}</span>
        </el-col>
        <el-col class="footer-list">
          <label>评论 </label>
          <span>{{_formatNum(item.comments_count)}}</span>
        </el-col>
         <el-col class="footer-list" style="border: 0">
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
  props: ["item", "index", "info"],
  data() {
    return {
      dialogVisible: false,
      dialogImgList: [],
      dialogCurImg: 0,
      dialogCurMid: "",
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
  methods: {
    init() {
      try {
        if(this.item.retweeted_status) {
          // 转发物料
          this.setVideoInfo(this.item.retweeted_status.url_objects, 'retweet');
        } else {
          //原创物料
          this.setVideoInfo(this.item.url_objects, 'source');
        }
      } catch (err) {
        this.videoStatus.source = false;
        this.videoStatus.retweet = false;
      }
    },
    handlePicPreview(n, urls, mid) {
      this.dialogCurImg = n;
      this.dialogImgList = urls;
      this.dialogCurMid = mid;
      this.dialogVisible = true;
    },
    handleImgChange(n) {
      if(n >= 0 && n < this.dialogImgList.length) {
        this.dialogCurImg = n;
      }
    },
    setVideoInfo(arr, videoType){
      try {
        for (let i = 0; i < arr.length; i++) {
          const cur = arr[i].object && arr[i].object.object || {};
          this.posterSrc = cur.image.url;
          if (cur.object_type === 'video') {
            if (cur.urls) {
              this.videoTempSrc = cur.urls.mp4_hd_mp4 || cur.urls.mp4_ld_mp4;
              this.videoStatus[videoType] = true;
              return;
            } else if (cur.stream && cur.stream.format === 'mp4') {
              this.videoTempSrc = cur.stream.url;
              this.videoStatus[videoType] = true;
              return;
            }
          } else if (cur.object_type === 'story') {
            this.videoTempSrc = (cur.slide_cover && cur.slide_cover.slide_videos && cur.slide_cover.slide_videos[0] && cur.slide_cover.slide_videos[0].url) ? cur.slide_cover.slide_videos[0].url : "";
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
    index() {},
    info() {},
    item() {
      this.init();
    },
    curvideo() {
      const mid = this.item && this.item.id || 0;
      if (this.curvideo != mid) {
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
  margin-top: 10px;
  padding: 15px 10px 4px;
  background-color: #fff;
  font-size: 16px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  border: 2px solid #f0f2f5;
  border-radius: 5px;
  .item-status-box {
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    span, a {
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
      padding-top:10px;
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
    &:hover {
      text-decoration: underline;
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
      cursor: zoom-in;
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
  .item-tag-box {
    padding-top: 10px;
    .item-tag {
      margin-right: 5px;
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
    .multiple-list {
      margin: 2px;
      max-width: 110px;
      border: 1px solid #ccc;
    }
  }
  .retweeted-box {
    background-color: #f5f5f5;
    padding: 10px;
    padding-bottom: 0;
  }
  .item-arrow{
    position: fixed;
    transform: translateY(-50%);
    padding: 10px;
    width: 50px;
    height: 50px;
    background-color: rgba(0,0,0,.3);
    border-radius: 50%;
    cursor: pointer;
    i {
      font-size: 30px;
      font-weight: 800;
      color: #fff;
    }
  }
  .item-arrow-right {
    top: 45%;
    right: 25%;
  }
  .item-arrow-left {
    top: 55%;
    right: 25%;
  }
}
</style>
