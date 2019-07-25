<template>
  <el-row>
    <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23" class="item-wrapper">
      <el-row>
        <div class="item-status-box clearfix">
          <el-checkbox class="left" :label="item.mid">NO.{{index}}</el-checkbox>
          <div class="clearfix left">
            <label class="item-mid left">mid: {{item.mid}}</label>
            <label class="item-uid left">uid: {{item.uid}}</label>
            <label class="item-mysql left">召回池: {{getMysql(item.mysql)}}</label>
            <label class="item-origin left">原创: 是</label>
            <label class="item-state left">物料状态: {{getState(Number(item.materials_type))}}</label>
            <label class="item-source left"><span style="margin-right: 5px;">物料来源: </span><span>{{getSourceName(item.material_source)}}</span></label>
          </div>
          <div class="clearfix right">
            <el-button v-if="Number(item.materials_type) != -1" type="danger" plain size="mini" class="right" style="margin-left: 10px;" @click="deleteEvent">删除</el-button>
            <el-button v-if="Number(item.materials_type) != 1" type="success" plain size="mini" class="right" style="margin-left: 10px;" @click="passEvent">通过</el-button>
            <el-button type="primary" plain size="mini" class="right" @click="isEditable = true">修改标签</el-button>
          </div>
        </div>
        <div style="margin: 10px;">
          <el-form :inline="true" label-position="left" label-width="50px">
            <el-form-item label="分类1" size="mini" v-if="category">
              <el-select v-model="cate" multiple placeholder="请选择" filterable :disabled="!isEditable">
                <el-option v-for="(name, tagid) in category" :key="tagid" :label="name" :value="tagid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类2" size="mini" v-if="ability">
              <el-select v-model="second_tag" multiple placeholder="请选择" filterable :disabled="!isEditable">
                <el-option v-for="(name, tagid) in ability" :key="tagid" :label="name" :value="tagid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="tags" size="mini">
              <el-select v-model="third_tag" multiple filterable remote reserve-keyword :remote-method="remoteMethod" placeholder="请输入关键词" :loading="loading" :disabled="!isEditable">
                <el-option v-for="obj in thirdTagList" :key="obj.tagid" :label="obj.name" :value="obj.tagid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button v-if="isEditable" size="mini" @click="cancelEvent()">取消</el-button>
            <el-button v-if="isEditable" type="primary" size="mini" @click="saveEvent()">保存并通过审核</el-button>
          </el-form>
        </div>
        <div style="padding-bottom: 10px;" v-if="item.logList">
          <div class="table-title left">【操作记录】</div>
          <el-table :data="item.logList" style="width: 100%" max-height="200" border stripe>
            <el-table-column align="left" prop="content" label="内容">
            </el-table-column>
            <el-table-column align="left" prop="operator" label="操作人">
            </el-table-column>
            <el-table-column align="left" prop="create_time" label="操作时间" min-width="160">
              <template slot-scope="scope">{{_parseTime(scope.row.create_time, '{y}-{m}-{d} {h}:{i}:{s}')}}</template>
            </el-table-column>
            <el-table-column align="left" prop="description" label="说明">
              <template slot-scope="scope">
                <span>{{scope.row.description || '暂无'}}</span>
              </template>
            </el-table-column>
          </el-table>
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
      <el-row class="video-wrapper" v-if="item.video_pic_urls && item.video_pic_urls[0]">
        <span class="play-btn" v-if="!videoSrc" @click="togglePlay">
          <i class="el-icon-caret-right play-btn-icon"></i>
        </span>
        <video :id="`video${item.mid}`" :poster="item.video_pic_urls[0]" :controls="controls" :src="videoSrc" autoplay>您的浏览器不支持HTML5</video>
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
          <label>ctr </label>
          <span>{{_parsePercent(item.click_rate)}}</span>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { formatNum, parsePercent, parseTime } from "@/utils";
import { category, ability } from "@/utils/tagconf";

const api_domain = 'http://10.41.15.147:5000';

export default {
  name: "itemList",
  props: ["item", "index", "callback", "sourcelist"],
  data() {
    return {
      category,
      ability,
      loading: false,
      isEditable: false,
      videoSrc: "",
      thirdTagList: [],
      cate: [],
      second_tag: [],
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
    ...mapGetters(["curvideo", "email"])
  },
  methods: {
    init() {
      this.cate = this.formatTag(this.item.cate);
      this.second_tag = this.formatTag(this.item.second_tag);
      this.thirdTagList = this.formatThirdTag(this.item.third_tag);
      this.third_tag = this.formatTag(this.item.third_tag);
    },
    togglePlay() {
      this.$store.dispatch("updateVideo", this.item.mid);
      if (!this.videoSrc) {
        this.setVideoSrc();
      }
    },
    setVideoSrc() {
      const data = {
        url: "/lab/showbatch",
        params: {
          ids: this.item.mid,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        try {
          this.videoSrc = res[0].url_objects[0].object.object.stream.url;
        } catch (err) {
          this.videoSrc = this.item.video_urls[0];
        }
        this.controls = true;
      });
    },
    formatTag(str) {
      if(str === '' || str === '|') {
        return []
      }
      return str.slice(0, -1).split('|');
    },
    formatTag(arr) {
      let res = [];
      if(arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i ++) {
          res.push(arr[i].tagid);
        }
      }
      return res;
    },
    formatThirdTag(arr) {
      let res = [];
      if(arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i ++) {
          res.push({ "tagid": arr[i].tagid, "name": arr[i].name});
        }
      }
      return res;
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num, dec) {
      return parsePercent(num, dec);
    },
    _parseTime(time, cFormat) {
      return parseTime(time, cFormat);
    },
    getMysql(val) {
      return val == "fast_recommend_materials" ? "推荐物料" : "冷启动";
    },
    getState(val) {
      let res = "";
      switch (val) {
        case -1:
          res = "已删除";
          break;
        case 0:
          res = "待审";
          break;
        case 1:
          res = "已通过";
          break;
      }
      return res;
    },
    remoteMethod(keyword) {
      if (keyword !== "") {
        this.loading = true;
        const tempData = {
          url: `${api_domain}/query_tag`,
          param: {
            tag_name: keyword
          }
        };
        const params = {
          data: JSON.stringify(tempData),
          cip: 230
        };
        this.$store.dispatch("GetThirdTag", params).then(res => {
          this.loading = false;
          if (res.code && Number(res.code) == 200) {
            this.thirdTagList = res.data;
          }
        });
      }
    },
    cancelEvent() {
      this.isEditable = false;
      this.init();
    },
    saveEvent() {
      this.isEditable = false;
      const tempData = {
        url: `${api_domain}/update_mid`,
        param: {
          mids: this.item.mid,
          table_name: this.item.mysql,
          op_type: 'update_tags',
          category: this.cate.join(','),
          ability: this.second_tag.join(','),
          tag: this.third_tag.join(','),
          user: this.email
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      console.log('修改标签：', tempData);
      this.$store.dispatch("SetManageData", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          //刷新页面
          this.callback();
        }
      });
    },
    passEvent() {
      this.$confirm("物料审核通过, 是否继续?", "物料通过审核", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.passAction(this.item.mid)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消通过审核"
          });
        });
    },
    passAction(mids) {
      const tempData = {
        url: `${api_domain}/update_mid`,
        param: {
          mids: mids,
          table_name: this.item.mysql,
          op_type: 'manual_pass',
          user: this.email
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      console.log('通过审核：', tempData);
      this.$store.dispatch("SetManageData", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.$message({
            type: "success",
            message: "通过审核成功!"
          });
          //刷新页面
          this.callback();
        }
      });
    },
    deleteEvent() {
      this.$prompt("请输入删除原因", "删除当前物料", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "textarea",
        // inputPattern: /[\s\S]/,
        // inputErrorMessage: "输入内容不能为空",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            this.deleteReason = instance.inputValue || ""; // 获取删除原因
          }
          done();
        }
      })
        .then(() => {
          this.deleteAction(this.item.mid, this.deleteReason)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    deleteAction(mids, reason) {
      const tempData = {
        url: `${api_domain}/update_mid`,
        param: {
          mids: mids,
          table_name: this.item.mysql,
          op_type: 'delete',
          reason: reason,
          user: this.email
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      console.log('审核删除：', tempData);
      this.$store.dispatch("SetManageData", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.$message({
            type: "success",
            message: "删除成功！"
          });
          //刷新页面
          this.callback();
        }
      });
    },
    getSourceName(ids) {
      let res = '未知';
      if (ids && ids.length > 0) {
        let arr = []
        for (let i =0; i < ids.length; i++){
          arr.push(this.sourcelist[ids[i]]);
        }
        res = arr.join('、');
      }
      return res;
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
    .item-source {
      color: #3a71a8;
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
}
</style>
