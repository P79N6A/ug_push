<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">
                <i class="el-icon-refresh hidden-xs-only" style="margin-right: 6px;"></i>用户回看</h6>
        </el-row>
        <el-row class="search-form-wrap">
            <el-form inline :model="formInline" size="small">
                <el-form-item>
                    <el-input style="max-width: 170px" v-model.trim="formInline.uid" placeholder="输入要查询的uid/vid" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-date-picker v-model="formInline.start_time" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-ddTHH:mm" placeholder="选择开始时间">
                    </el-date-picker>
                    <el-date-picker v-model="formInline.end_time" type="datetime" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-ddTHH:mm" placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-input style="max-width: 170px" v-model.trim="formMid" placeholder="输入要查询的mid" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input style="max-width: 170px" v-model.trim="keyword" placeholder="博主昵称/博文关键词" clearable></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="onSearch">
                        <span class="hidden-xs-only">查询</span>
                    </el-button>
                </el-form-item>
            </el-form>
            <el-radio-group v-model="formInline.flow" size="small" @change="onSearch">
              <el-radio border :label="0">首页热门流</el-radio>
              <el-radio border :label="1">发现页热点流</el-radio>
            </el-radio-group>
        </el-row>
        <el-row class="content-box-wrap" v-if="datalist">
            <div v-if="fresh_count !== null" class="content-box-title">
                <div>
                  用户<a class="user-btn" :href="`//weibo.com/u/${curUid}`" target="_blank">{{curUid}}</a>
                  在当前时段内共刷新<el-tag type="danger" size="mini">{{fresh_count || 0}}</el-tag> 次
                  | 曝光物料 <el-tag type="danger" size="mini">{{exposure_count}}</el-tag> 条
                  | 点击物料 <el-tag type="danger" size="mini">{{click_count}}</el-tag> 条
                  | 互动物料 <el-tag type="danger" size="mini">{{act_count}}</el-tag> 条
                </div>
                <el-row :gutter="20">
                  <el-col v-if="clickMap" class="stats-box" :span="12" :xs="24">
                    <span class="stats-title">用户点击分布</span>
                    <el-table :data="[clickMap]" style="width: 100%" border stripe size="mini">
                      <el-table-column :key="key" v-for="(val, key) in clickMap" align="center" :prop="key" :label="actionTypeMap[key]" min-width="100px">
                      </el-table-column>
                    </el-table>
                  </el-col>
                  <el-col v-if="actMap" class="stats-box" :span="12" :xs="24">
                    <span class="stats-title">用户互动分布</span>
                    <el-table :data="[actMap]" style="width: 100%" border stripe size="mini">
                      <el-table-column :key="key" v-for="(val, key) in actMap" align="center" :prop="key" :label="actionTypeMap[key]" min-width="100px">
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
                <div v-if="recommendData" class="stats-box">
                  <span class="stats-title">推荐来源分布</span>
                  <el-table :data="[recommendData]" style="width: 100%" border stripe size="mini">
                    <el-table-column :key="key" v-for="(val, key) in recommendData" align="center" :prop="key" :label="key" min-width="110px">
                    </el-table-column>
                  </el-table>
                </div>
            </div>
            <div v-if="datalist[page-1]">
                <div class="clearfix">
                  <span class="data-list-title left">本次刷新时间：{{_parseTime(datalist[page-1].fresh_timestamp)}}，本次刷新曝光 <el-tag size="mini">{{datalist[page-1].mids_count}}</el-tag> 条{{datalist[page-1].refresh && (datalist[page-1].refresh == 1 ? '（被动刷新）' : '（主动刷新）')}}</span>
                  <div class="color-box right clearfix">
                    <div class="color-box-item left">
                      <el-color-picker v-model="actionColor" size="mini"></el-color-picker>
                      <p>存在“用户行为”背景色</p>
                    </div>
                    <div class="color-box-item left">
                      <el-color-picker v-model="readColor" size="mini"></el-color-picker>
                      <p>存在“展示时长”背景色</p>
                    </div>
                  </div>
                </div>
                <div v-if="datalist[page-1].mids_list.length > 0">
                  <item-list :color="{actionColor, readColor}" :key="item.mid" :item="item" :intervals="intervals" :uid="curUid" :mid="curMid" :index="item.index || (idx + 1)" v-for="(item, idx) in datalist[page-1].mids_list"></item-list>
                </div>
                <div v-else style="padding: 10px;text-align: center;color: #ccc;">暂无相关数据</div>
            </div>
            <div class="page-wrap">
                <el-pagination @current-change="handleCurrentChange" :current-page="page" layout="prev, pager, next, jumper" :page-count="fresh_count || 0">
                </el-pagination>
            </div>
        </el-row>
        <el-row v-else style="padding: 10px;text-align: center;color: #ccc;">{{tips}}</el-row>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
        <auth></auth>
    </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import ItemList from "./components/ItemList";
import { Message } from "element-ui";
import { mapGetters } from "vuex";
import { formatNum, parsePercent, parseTime } from "@/utils";

export default {
  name: "freshreview",
  components: {
    Auth,
    ItemList
  },
  data() {
    return {
      formInline: {
        uid: "1111681197",
        start_time: "",
        end_time: "",
        flow: 0
      },
      curUid: "",
      fresh_count: 0, // 刷新次数、总页数
      page: 1, // 当前页数
      datalist: null,
      tips: "Loading···",
      intervals: "",
      actionColor: '#f7e7e7',
      readColor: '#e2ecce',
      curMid:"",
      formMid: "",
      keyword: "",
      exposure_count: 0, // 曝光物料总数
      click_count: 0, // 点击物料总数
      act_count: 0, // 互动物料总数
      clickMap: null,
      actMap: null,
      recommendData: null,
      actionTypeMap: {
        "clickPic": "点图片",
        "clickBlog": "点正文页",
        "clickVideo": "点视频",
        "clickArtical": "点长文",
        "retweet": "转发",
        "comment": "评论",
        "attitude": "点赞",
        "follow": "加关注"
      },
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.formInline.start_time = parseTime(Date.now() - 3600 * 1000 * 24 * 1, "{y}-{m}-{d}T{h}:{i}");
        this.formInline.end_time = parseTime(Date.now(), "{y}-{m}-{d}T{h}:{i}");
        this.onSearch();
      }
    },
    onSearch() {
      if (!this.formInline.uid) {
        Message({
          showClose: true,
          message: "请输入要查询的uid/vid！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formInline.start_time) {
        Message({
          showClose: true,
          message: "请选择开始时间！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formInline.end_time) {
        Message({
          showClose: true,
          message: "请选择结束时间！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const data = {
        url: "/dataview/queryFreshReview",
        params: {
          intervals: `${this.formInline.start_time}/${
            this.formInline.end_time
          }`,
          uid: this.formInline.uid,
          flow: this.formInline.flow,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (!isNaN(res.code) && Number(res.code) === 0) {
          this.curUid = this.formInline.uid;
          this.curMid = this.formMid;
          this.intervals = `${this.formInline.start_time}/${
            this.formInline.end_time
          }`;
          this.page = 1;
          this.setStat(res);
          this.datalist = null;
          this.filterKeyword(res.fresh_result);
          this.tips = this.datalist ? '' : "暂无数据";
        } else {
          this.tips = "暂无数据";
        }
      });
    },
    setStat(res) {
      this.fresh_count = res.fresh_count || 0;
      this.exposure_count = res.exposure_count || 0;
      this.click_count = res.click_cnt || 0;
      this.act_count = res.act_cnt || 0;
      this.clickMap = res.click || false;
      this.actMap = res.act || false;
      this.recommendData = res.recommend || false;
    },
    filterKeyword(arr) { // 根据关键词搜索相关博主/博文
      if (!(arr && arr.length > 0)) return;
      let res = arr.reverse();
      if (this.formMid) {
        let fresh_result = []; // 刷新数据
        for (let i=0; i< res.length; i++) {
          const cur = res[i].mids_list; // 每一刷的数据列表
          let mids_list = [];
          for (let j=0; j< cur.length; j++) {
            if(this.keyword) {
              const name = cur[j].author_name || ""; // 每一条物料的博主名称
              const text = cur[j].content_text || ""; // 每一条物料的博文内容
              if (name.indexOf(this.keyword) > -1 || text.indexOf(this.keyword) > -1) { // 关键词筛选
                mids_list.push({
                  ...cur[j],
                  index: j+1
                });
              }
            }
            if(this.formMid === cur[j].mid) {
              this.page = i+1;
            }
          }
          fresh_result.push({
            fresh_timestamp: res[i].fresh_timestamp,
            mids_count: res[i].mids_count,
            mids_list: mids_list
          });
        }
        this.datalist = this.keyword ? fresh_result : res;
      } else {
        this.datalist = res;
      }
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
      return parsePercent(num);
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
      border-bottom: 1px solid #f0f2f5;
    }
    .content-box-wrap {
      padding: 10px;
      .content-box-title {
        padding: 10px 0;
        border-bottom: 1px dashed #ddd;
      }
      .stats-box {
        padding-top: 10px;
      }
      .data-list-title,.stats-title {
        display: inline-block;
        padding: 5px 20px;
        font-size: 14px;
        color: #409eff;
      }
      .data-list-title {
        margin-top: 30px;
        border-bottom: 2px solid #409eff;
      }
      .color-box {
        margin-top: 10px;
        font-size: 12px;
        text-align: center;
        .color-box-item {
          margin-left: 10px;
        }
      }
    }
    .page-wrap {
      padding-top: 20px;
      padding-bottom: 10px;
      overflow: auto;
    }
    .user-btn {
      color: #f56c6c;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
