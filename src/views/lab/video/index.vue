<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">视频打标签</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24">
        <el-form inline size="small">
          <el-form-item label="视频mid">
            <el-input
              style="min-width: 290px;"
              v-model="videoID"
              placeholder="请输入mid"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSearch">
              <span class="hidden-xs-only">识别</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col class="content-box-list" v-if="itemData && labelData">
        <div class="user-wrap">
          <img class="face-img" :src="itemData.face_img" @click="getVideoLabel">
          <a class="user-name" target="_blank" :href="itemData.weibo_link">{{itemData.name}}</a>
          <span class="created-at">
            <i class="el-icon-time"></i>
            {{itemData.created_at}}
          </span>
        </div>
        <el-button class="text-btn" size="small" type="success" round v-if="!textState" @click="textState=true">查看博文</el-button>
        <el-button class="text-btn" size="small" type="info" round v-if="textState" @click="textState=false">关闭博文</el-button>
        <p class="text" v-if="textState">{{itemData.text}}</p>
        <div class="video-wrap">
          <i class="el-icon-caret-right start-icon" @click="activeVideo"></i>
          <video :poster="itemData.cover_img" controls="controls">您的浏览器不支持HTML5</video>
        </div>
        <el-tree class="label-tree-demo" :data="labelData" :expand-on-click-node="false" :default-expand-all="true" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        <!-- <div class="first-label">
          <el-tag>一级标签</el-tag>
          <el-tag v-for="(value, key) in labelData" :key="key" >{{key}}{{weight(value.weight)}}</el-tag>
        </div>
        <div class="first-label">
          <el-tag>二级标签</el-tag>
          <el-tag v-for="(value, key) in labelData" :key="key" >{{key}}{{weight(value.weight)}}</el-tag>
        </div>-->
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";
import $ from "jquery";

export default {
  name: "MarkSubtitle",
  components: {
    Auth
  },
  data() {
    return {
      videoID: "",
      itemData: "",
      labelData: "",
      tags: "",
      textState: false,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    weight() {
      return weight => {
        return this.getWeight(weight);
      };
    },
    ...mapGetters(["pageAuth", "email"])
  },
  created() {
    document.body.scrollTop = 0;
    // this.onSearch();
  },
  methods: {
    getWeight(weight) {
      return Math.floor(weight * 100) / 100;
    },
    activeVideo() {
      $(".start-icon").css("display", "none");
      let video = $(".start-icon").next("video");
      video.attr("src", this.itemData.video);
      video[0].play(); //播放
    },
    disposeLableData(data) {
      let backData = [];
      Object.keys(data).forEach((row, index) => {
        backData.push({
          label: row + " / " + this.getWeight(data[row].weight),
          children: []
        });
        Object.keys(data[row].label).forEach((item, idx) => {
          backData[index].children.push({
            label: item + " / " + this.getWeight(data[row].label[item].weight),
            children: []
          });
          Object.keys(data[row].label[item].label).forEach((key, i) => {
            backData[index].children[idx].children.push({
              label: key + " / " + this.getWeight(data[row].label[item].label[key].weight),
              children: []
            });
          });
        });
      });
      return backData;
    },
    getVideoLabel() {
      const that = this;
      let videoUrl = this.itemData.video.replace("https", "http");
      const tempData = {
        url: "http://10.87.52.132:13141/get_video_label.json",
        param: {
          videoUrl: videoUrl
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        time: 20,
        cip: 230
      };
      this.$store.dispatch("ProxyGetTimeout", params).then(
        res => {
          if (res) {
            this.labelData = that.disposeLableData(res.data);
          } else {
            Message({
              showClose: true,
              message: res.msg || "视频标签解析失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "视频标签解析口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    handleNodeClick(data) {
    },
    onSearch() {
      const that = this;
      this.itemData = {};
      this.labelData = ""
      const tempData = {
        url: "http://mlplat.intra.weibo.com/lab/showbatch",
        param: {
          ids: this.videoID
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res) {
            let date = res[0].user.created_at;
            date = date.substring(0, date.length);
            date = date.replace(/-/g, "/");
            let timestamp = new Date(date).getTime();
            let d = new Date(timestamp);
            let time =
              d.getFullYear() +
              "-" +
              (d.getMonth() + 1) +
              "-" +
              d.getDate() +
              " " +
              d.getHours() +
              ":" +
              d.getMinutes() +
              ":" +
              d.getSeconds();
            that.itemData = {
              face_img: res[0].user.avatar_large,
              name: res[0].user.name,
              created_at: time,
              weibo_link: res[0].link,
              text: res[0].text,
              cover_img: res[0].url_objects[0].object.object.image.url,
              video: res[0].url_objects[0].object.object.stream.url
            };
            this.getVideoLabel();
          } else {
            Message({
              showClose: true,
              message: res.msg || "视频获取失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "视频获取接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    }
  }
};
</script>
<style lang="scss">
.label-tree-demo > .el-tree-node {
  margin: 10px;
  padding: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  width: 200px;
}
</style>

<style lang="scss" scoped>
.el-main {
  padding: 0;
  color: #333;
  line-height: 100%;
  background-color: #f0f2f5;
  overflow: hidden;
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
    padding-top: 18px;
    background-color: #fff;
    border-bottom: 10px solid #f0f2f5;
  }
  .content-box-wrap {
    display: flex;
    height: 100%;
    min-width: 960px;
    background-color: #fff;
    border-bottom: 1px solid #f0f2f5;
    .content-box-demo {
      width: 200px;
      height: 100%;
      border-right: 1px solid #f0f2f5;
      .content-box-demo-box {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: flex-start;
        padding-bottom: 30px;
      }
      .content-box-demo-row:hover {
        img {
          border: 1px solid #409eff;
        }
      }
      .content-box-demo-row {
        display: flex;
        width: 80px;
        flex-direction: column;
        align-items: center;
        margin-top: 30px;
        margin-left: 15px;
        height: 50px;
        cursor: pointer;
        img {
          height: 50px;
          width: 80px;
          padding: 14px 21px 11px;
          border: 1px solid #f0f2f5;
        }
        span {
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
    .content-box-list {
      flex: 1;
      height: 100%;
      padding-bottom: 140px;
      .first-label {
        width: 100%;
        display: flex;
      }
      .user-wrap {
        position: relative;
        height: 120px;
        width: 100%;
        top: 20px;
        left: 20px;
      }
      .user-name {
        font-size: 20px;
        font-weight: 800;
        position: absolute;
        top: 35px;
        left: 150px;
      }
      .label-tree-demo {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        margin-left: 20px;
        font-size: 20px;
      }
      .text-btn {
        position: relative;
        top: 20px;
        left: 50px;
      }
      .text {
        position: relative;
        margin: 30px;
        font-size: 18px;
        line-height: 25px;
      }
      .video-wrap {
        position: relative;
        margin-top: 40px;
        width: 100%;
        max-width: 750px;
        max-height: 421px;
        background-color: #000;
        margin-left: 30px;
        // .cover-img {
        //   position: relative;
        //   z-index: 10;
        //   width: 100%;
        //   max-width: 750px;
        //   max-height: 421px;
        //   background-color: #000;
        // }
        video {
          position: relative;
          width: 100%;
          max-width: 750px;
          max-height: 421px;
          background-color: #000;
        }
        .start-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          font-size: 100px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          color: #f4516c;
          background-color: rgba(0, 0, 0, 0.6);
          cursor: pointer;
        }
      }
      .created-at {
        font-size: 18px;
        font-weight: 400;
        position: absolute;
        top: 75px;
        left: 150px;
        i {
          padding-right: 10px;
        }
      }
      .user-name:hover {
        cursor: pointer;
        color: rgb(237, 114, 86);
        text-decoration: underline;
      }
      .face-img {
        position: absolute;
        top: 10px;
        left: 20px;
        width: 100px;
        height: 100px;
        box-shadow: 1px 1px 3px 2px #ccc;
        border-radius: 50%;
      }
    }
  }
}
</style>
