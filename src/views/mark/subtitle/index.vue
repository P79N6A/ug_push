<template>
<el-main>
  <el-row class="pane-title-wrap">
    <el-col :span="24">
      <h6 class="pane-title">视频字幕识别</h6>
    </el-col>
  </el-row>
  <el-row class="search-form-wrap">
    <el-col :span="24">
      <el-form inline size="small">
        <el-form-item label="视频id">
          <el-input style="min-width: 290px;" v-model="videoID" placeholder="请输入mid/oid/视频url" clearable></el-input>
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
    <el-col class="content-box-demo">
      <div class="content-box-demo-box">
        <div class="content-box-demo-row" v-for="(item, idx) in demo" :key="idx" @click="demoSearch(item)">
          <img src="@/assets/video.png" />
          <span>demo_{{idx}}</span>
        </div>
      </div>
    </el-col>
    <el-col class="content-box-list">
      <div class="content-box-list-box">
        <div class="content-box-list-row" :key="idx" v-for="(item, idx) in list">
          <img :src="imgHeiderUrl+item.pic_url">
          <p>{{item.begin}}. {{item.text}}</p>
        </div>
      </div>
    </el-col>
  </el-row>
</el-main>
</template>

<script>
import {
  mapGetters
} from "vuex";
import {
  Message
} from "element-ui";
import Auth from "@/components/Tips/Auth";

export default {
  name: "MarkSubtitle",
  components: {
    Auth,
  },
  data() {
    return {
      videoID: "",
      imgHeiderUrl: "http://10.85.125.168:8004",
      demo: [],
      list: [],
    }
  },
  created() {
    this.demoLoad()
  },
  methods: {
    demoLoad() {
      const that = this
      const tempData = {
        url: "http://10.85.125.168:8004/demo/",
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            that.demo = res.data
            that.demo[0] && this.demoSearch(that.demo[0]);
          } else {
            Message({
              showClose: true,
              message: res.msg || "demo查询失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "demo查询接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    demoSearch(id) {
      this.videoID = id;
      this.onSearch();
    },
    onSearch() {
      const that = this;
      this.list = [];
      const tempData = {
        url: "http://10.85.125.168:8004/",
        param: {
          id: that.videoID
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.list = res.result.scriptocr.interval
          } else {
            Message({
              showClose: true,
              message: res.msg || "字幕解析失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "字幕查询接口异常！",
            type: "error",
            duration: 0
          });
        }
      );

    }
  }
}
</script>

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
                    border: 1px solid #409EFF;
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
            .content-box-list-box {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
            }
            .content-box-list-row {
                // height: 100px;
                width: 470px;
                margin-top: 30px;
                margin-left: 20px;
                img {
                    width: 450px;
                }
                p {
                    font-size: 18px;
                    line-height: 20px;
                    width: 450px;
                    margin-top: 10px;
                }
            }
        }
    }
}
</style>
