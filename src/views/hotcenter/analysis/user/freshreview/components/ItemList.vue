<template>
    <el-row v-if="item">
        <el-col :span="24" class="item-wrapper" :style="`background-color: ${backColor}`">
          <el-row>
            <el-col :xs="24" :span="14" class="item-content-box">
              <el-row>
                  <div class="item-status-box clearfix">
                      <label class="item-mid left">本次刷新第
                          <span style="font-size: 18px;font-weight: bold;">{{item.index || index}}</span>条 | <el-tag v-if="mid === item.mid" type="danger" size="small">{{item.mid}}</el-tag><span v-else>{{item.mid}}</span> | {{item.recommend_source}} | {{item.source}}</label>
                  </div>
              </el-row>
              <el-row class="clearfix">
                  <div class="left">
                      <a class="item-avatar" target="_blank" :href="item.author_uid && `//weibo.com/u/${item.author_uid}` || 'javascript:void(0)'" title="跳转微博主页"><img :src="item.author_face" /></a>
                  </div>
                  <div class="left" style="padding: 10px">
                      <el-row>
                          <a class="item-name" :href="item.author_uid && `//weibo.com/u/${item.author_uid}` || 'javascript:void(0)'" target="_blank" title="跳转微博主页">{{item.author_name || '未知'}}</a>
                      </el-row>
                      <el-row type="flex" style="margin-top: 10px;">
                          <span class="item-info" title="查看微博详情" v-if="item.publish_time">
                              <i class="el-icon-time"></i>
                              <a :href="item.mid_link || 'javascript:void(0)'" target="_blank">{{_parseTime(item.publish_time)}}</a>
                          </span>
                          <span v-if="item.send_from" class="info-box">来自
                              <label class="item-info" v-html="item.send_from"></label>
                          </span>
                      </el-row>
                  </div>
              </el-row>
              <el-row class="content-text">
                  <a :href="item.mid_link || 'javascript:void(0)'" target="_blank" title="查看微博详情">{{item.content_text}}</a>
              </el-row>
              <el-row class="item-tag-box" v-if="item.tag_data">
                <span v-if="item.tag_data.first && item.tag_data.first.length > 0">
                  <el-tag class="item-tag" size="small" :key="idx" v-for="(tag, idx) in (item.tag_data.first)">{{tag.name}} (1)</el-tag>
                </span>
                <span v-if="item.tag_data.second && item.tag_data.second.length > 0">
                  <el-tag class="item-tag" type="success" size="small" :key="idx" v-for="(tag, idx) in (item.tag_data.second)">{{tag.name}} (2)</el-tag>
                </span>
                <span v-if="item.tag_data.third && item.tag_data.third.length > 0">
                  <el-tag class="item-tag" type="warning" size="small" :key="idx" v-for="(tag, idx) in (item.tag_data.third)">{{tag.name}} (3)</el-tag>
                </span>
              </el-row>
              <el-row type="flex" class="item-footer">
                  <el-col class="footer-list">
                      <a :href="item.mid_link || 'javascript:void(0)'" target="_blank">
                          <i class="el-icon-thumb hidden-xs-only"></i>
                          <label>点赞 </label>
                          <span>{{_formatNum(item.like_num)}}</span>
                      </a>
                  </el-col>
                  <el-col class="footer-list">
                      <a :href="item.mid_link || 'javascript:void(0)'" target="_blank">
                          <i class="el-icon-share hidden-xs-only"></i>
                          <label>转发 </label>
                          <span>{{_formatNum(item.retweet_num)}}</span>
                      </a>
                  </el-col>
                  <el-col class="footer-list" style="border: 0">
                      <a :href="item.mid_link || 'javascript:void(0)'" target="_blank">
                          <i class="el-icon-chat-dot-round hidden-xs-only"></i>
                          <label>评论 </label>
                          <span>{{_formatNum(item.comment_num)}}</span>
                      </a>
                  </el-col>
              </el-row>
            </el-col>
            <el-col :xs="24" :span="10" class="item-table-box">
              <el-table :data="tableData" style="width: 100%" border stripe size="mini" :show-header="false">
                <el-table-column prop="name" width="120"></el-table-column>
                <el-table-column prop="value"></el-table-column>
              </el-table>
              <div class="link-btn-box">
                <a :href="`/hot/#/hotcenter/analysis/user/freshreview/detail?mid=${item.mid}&intervals=${intervals}&uid=${uid}`" target="_blank" class="link-btn">查看预估详情</a>
              </div>
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
  props: ["item", "index", "intervals", "uid", "mid", "color"],
  data() {
    return {
      tableData: [],
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
      backColor: '#fff'
    };
  },
  methods: {
    init() {
      if(this.item) {
        const arr = this.item.actionType && this.item.actionType.split(',') || [];
        let actionStr = "";
        if (arr.length > 0) {
          let actionArr = [];
          for (let i = 0; i<arr.length; i++) {
            actionArr.push(this.actionTypeMap[arr[i]]);
          }
          actionStr = actionArr.join('、');
        }
        this.tableData = [];
        this.item.mid && this.tableData.push({name: 'mid', value: this.item.mid});
        this.item.recommend_source && this.tableData.push({name: '召回策略', value: this.item.recommend_source});
        this.item.ctr && this.tableData.push({name: '最终模型预估分数', value: this.item.ctr});
        this.item.readDuration && this.tableData.push({name: '展示时长（ms）', value: this.item.readDuration});
        actionStr && this.tableData.push({name: '用户行为', value: actionStr});

        if (actionStr) {
          this.backColor = this.color.actionColor;
        } else if (this.item.readDuration && this.item.readDuration !== '0') {
          this.backColor = this.color.readColor;
        }
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
    index() {},
    time() {},
    uid() {},
    color() {
      this.init();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.item-wrapper {
  margin-top: 10px;
  padding: 15px 0 4px;
  background-color: #fff;
  font-size: 16px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  border: 2px solid #f0f2f5;
  .item-status-box {
    label {
      margin-bottom: 20px;
      font-size: 14px;
    }
    .item-mid {
      color: #999;
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
      color: #eb7350;
    }
  }
  .item-tag-box {
    padding-bottom: 10px;
    .item-tag {
      margin-right: 5px;
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
      a {
        display: inline-block;
      }
    }
  }
  .table-title {
    padding: 5px 10px;
    color: #409eff;
    border-bottom: 2px solid #409eff;
    margin-bottom: 10px;
  }
  .item-content-box {
    padding: 0 10px;
    border-right: 4px solid #eee;
  }
  .item-table-box {
    padding: 0 10px;
    .link-btn-box {
      padding-top: 10px;
    }
  }
  .link-btn {
    font-size: 14px;
    color: #409eff;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
