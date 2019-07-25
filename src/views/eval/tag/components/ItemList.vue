<template>
  <el-row>
    <el-col :span="24" class="item-wrapper">
      <el-row v-if="inputs">
        <div class="item-status-box clearfix">
          <span class="left">NO.{{index}}</span>
          <div class="clearfix left">
            <label class="item-mid left">mid: {{inputs.mid}}</label>
            <label class="item-cate left">领域: {{inputs.cate}}</label>
          </div>
        </div>
      </el-row>
      <el-row v-if="inputList && inputList.length > 0">
        <el-checkbox-group v-model="checkedArr" @change="handlecheckedArrChange">
          <el-col style="margin-bottom: 10px;" :xs="24" :span="8" :key="key" v-for="(list, key) in inputList">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <el-button type="danger" round size="mini">机器/人工评估{{key+1}}</el-button>
              </div>
              <div class="clearfix">
                <div class="tag-box" :key="idx" v-for="(val, idx) in list.split(';')">
                  <div class="tag-item" :key="i" v-for="(o, i) in val.split(',')">
                    <el-checkbox :label="getJsonArray(key,idx,i,o)" size="mini">{{o}}</el-checkbox>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-checkbox-group>
      </el-row>
      <div v-if="item">
        <el-row class="clearfix">
          <div class="left">
            <a class="item-avatar" target="_blank" :href="item.user && `//weibo.com/u/${item.user.id}` || 'javascript:void(0)'" title="跳转微博主页"><img v-if="item.user && item.user.avatar_hd" alt="头像" title="用户头像" :src="item.user && item.user.avatar_hd" /></a>
          </div>
          <div class="left" style="padding: 10px">
            <el-row>
              <a class="item-name" :href="item.user && `//weibo.com/u/${item.user.id}` || 'javascript:void(0)'" target="_blank" title="跳转微博主页">{{item.user && item.user.name || '未知'}}</a>
            </el-row>
            <el-row type="flex" style="margin-top: 10px;">
              <span class="item-info" title="查看微博详情">
                <i class="el-icon-time"></i>
                <a :href="item.link || 'javascript:void(0)'" target="_blank">{{parseTime(item.created_at)}}</a>
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
                <div class="img-box">
                  <div class="bg-img" :style="`background-image: url(//ww2.sinaimg.cn/bmiddle/${val}.jpg);`">{{!val && '图片加载失败' || ''}}</div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="video-wrapper" v-if="isVideo">
          <span class="play-btn" v-if="!videoSrc" @click="togglePlay()">
            <i class="el-icon-caret-right play-btn-icon"></i>
          </span>
          <video :id="`video${item.mid}`" :poster="item.url_objects[0].object.object.image.url" :controls="controls" :src="videoSrc" autoplay>您的浏览器不支持HTML5</video>
        </el-row>
        <el-row type="flex" class="item-footer">
          <el-col class="footer-list">
            <i class="el-icon-news hidden-xs-only"></i>
            <label>转发 </label>
            <span>{{formatNum(item.reposts_count)}}</span>
          </el-col>
          <el-col class="footer-list">
            <i class="el-icon-edit-outline hidden-xs-only"></i>
            <label>评论 </label>
            <span>{{formatNum(item.comments_count)}}</span>
          </el-col>
          <el-col class="footer-list" style="border: 0">
            <i class="el-icon-phone-outline hidden-xs-only"></i>
            <label>点赞 </label>
            <span>{{formatNum(item.attitudes_count)}}</span>
          </el-col>
        </el-row>
      </div>
      <div class="none-tips" v-else>暂无数据</div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { formatNum, parseTime } from "@/utils";

export default {
  name: "itemList",
  props: ["item", "inputs", "index", "callback", "selectedarr"],
  data() {
    return {
      formatNum,
      parseTime,
      isVideo: false,
      videoSrc: "",
      controls: false,
      inputList: null,
      checkedArr: []
    };
  },
  computed: {
    ...mapGetters(["curvideo"])
  },
  methods: {
    init() {
      this.checkedArr = this.selectedarr;
      try {
        const res = this.item.url_objects[0].object.object.stream.url;
        this.isVideo = true;
      } catch (err) {
        //无视频
        this.isVideo = false;
      }
      this.inputs &&
        this.inputs.content &&
        (this.inputList = this.inputs.content.split("|"));
    },
    togglePlay() {
      this.$store.dispatch("updateVideo", this.item.mid);
      if (!this.videoSrc) {
        this.videoSrc = this.item.url_objects[0].object.object.stream.url;
        this.controls = true;
      }
    },
    getJsonArray(key, type, idx, tag) {
      return `${key},${type},${idx},${tag}`;
    },
    handlecheckedArrChange(val) {
      let res = [];
      if (this.checkedArr && this.checkedArr.length > 0) {
        for (let i = 0; i < this.checkedArr.length; i++) {
          const temp = this.checkedArr[i].split(",");
          !res[temp[0]] && (res[temp[0]] = []);
          if (res[temp[0]][temp[1]]) {
            res[temp[0]][temp[1]] += ',' + temp[3];
          } else {
            res[temp[0]][temp[1]] = temp[3];
          }
        }
      }
      this.callback(this.index - 1, res, this.checkedArr);
    }
  },
  created() {
    this.init();
  },
  watch: {
    item() {
      this.init();
    },
    inputs() {
      this.init();
    },
    index() {},
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
.none-tips {
    margin-top: 10px;
    padding: 10px;
    font-size: 14px;
    color: #999;
  }
.item-wrapper {
  margin-top: 10px;
  padding: 15px 10px 4px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 16px;
  .item-status-box {
    label {
      margin-left: 10px;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .item-mid {
      color: #f56c6c;
    }
    .item-cate {
      color: #67c23a;
    }
  }
  .item-avatar {
    display: inline-block;
    width: 60px;
    height: 60px;
    box-shadow: 1px 1px 3px 2px #ccc;
    border-radius: 50%;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
      line-height: 480%;
      font-size: 13px;
      color: #999;
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
    padding: 10px 0;
    color: #666;
    border-top: 1px solid #f2f2f5;
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
  .tag-box {
    padding: 8px 0;
    font-size: 12px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    &:last-child {
      border: 0;
    }
    .tag-item {
      .el-checkbox__label {
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>
<style lang="scss" >
.tag-box {
  .tag-item {
    padding: 2px 0;
    .el-checkbox {
      width: 100%;
      .el-checkbox__label {
        font-size: 12px;
        width: 100%;
        white-space: pre-wrap;
        overflow-wrap: break-word;
        word-wrap: break-word;
      }
    }
  }
}
</style>

