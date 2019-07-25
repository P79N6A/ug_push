<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">后端降级详情页面</h6>
    </el-row>
    <el-row class="search-form-wrap" v-if="resultData">
      <div class="clearfix">
        <span class="table-title left">当前降级</span>
      </div>
      <div class="info-box">
        <span class="info-mark">降级等级：<span style="font-weight: bold;font-size: 24px;">{{calculate(resultData.content.into_detail_rank_ratio)}}</span></span>
        <span class="info-text">操作人: &nbsp;{{ resultData.operator.trim() || '暂无' }}</span>
        <span class="info-text">操作时间: &nbsp;{{ _parseTime(resultData.create_time) }}</span>
      </div>
      <div class="info-box">
        <div class="item-title">降级内容:</div>
        <div>
          <span v-if="resultDatahandle(resultData.content).length === 0">无内容</span>
          <span
            :key="key"
            v-for="(item, key) in resultDatahandle(resultData.content)"
          >
            <el-tag class="tag-item" :type="colorList[Math.round(3*Math.random())]">{{ item }}</el-tag>
          </span>
        </div>
      </div>
      <div class="info-tips">
        <div class="item-title">自动降级说明:</div>
        <p>1. 只有降级控制中自动等级降级开关打开才允许调用自动降级接口</p>
        <p>2. 自动降级接口提供降级和恢复两种操作</p>
        <p>3. 自动降级接口将根据当前降级状态自动判断降级/恢复等级</p>
        <p>4. 无论降级或者恢复操作，时间间隔不少于3分钟</p>
        <p>5. 恢复操作之间的等待间隔默认15分钟，若在某个等级恢复操作之后的15分钟内出现连续降级操作，则将调整此等级下恢复操作对应等待间隔。<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;e.g.  正常情况:  恢复2  -> 恢复1  （等待间隔为15分钟）<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;特殊情况:  恢复1  -> 降级1 –> 降级2 –> <span style="color: #F56C6C;">恢复2 –> 恢复1</span></p>
        <p>&nbsp;&nbsp;&nbsp;注: 若恢复1后15分钟内连续出现降级，则调整恢复1对应的等待间隔（等待间隔时长对应降级操作次数15、30、60、120），此例中恢复1等待间隔调整为60分钟</p>
      </div>
    </el-row>
    <el-row class="content-box-wrap">
      <div class="table-title left">历史降级列表</div>
      <el-table
          :data="tableData"
          style="width: 100%;"
          border
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form
                label-position="left"
                inline
              >
                <el-form-item
                  class="el-form-item-div"
                  label="降级内容："
                >
                  <el-tag
                    class="tag-item"
                    :key="key"
                    v-for="(item, key) in resultDatahandle(props.row.content)"
                    :type="colorList[key%3]"
                  >{{ item }}</el-tag>
                  <span v-if="resultDatahandle(props.row.content).length === 0">无内容</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="降级等级"
            prop="into_detail_rank_ratio"
            min-width="100"
          >
            <template slot-scope="scope">
              <span style="font-weight: bold;font-size: 20px;">{{calculate(scope.row.content.into_detail_rank_ratio)}}</span> 级降级
            </template>
          </el-table-column>
          <el-table-column
            label="操作时间"
            prop="create_time"
          >
            <template slot-scope="scope">{{_parseTime(scope.row.create_time)}}</template>
          </el-table-column>
          <el-table-column
            label="操作人"
            prop="operator"
          >
            <template slot-scope="scope">{{scope.row.operator.trim() || '暂无'}}</template>
          </el-table-column>
        </el-table>
        <div class="page-wrap">
          <el-pagination
            @current-change="handlePageChange"
            :current-page="formInline.page"
            :page-size="formInline.count"
            layout="total, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import { parseTime } from "@/utils";
export default {
  components: {
    Auth
  },
  data() {
    return {
      colorList: ["success", "warning", "", "info"],
      parseTime,
      tableData: [],
      resultData: null,
      formInline: {
        page: 1,
        count: 10
      },
      total: 0,
      degradeMap: {
        user_portrait_degradation: "用户长期兴趣RPC降级",
        user_temp_interest_degradation: "用户短期兴趣RPC降级",
        category_user_portrait_degradation: "非核心池用户长期兴趣RPC降级",
        category_user_temp_interest_degradation: "非核心池用户短期兴趣RPC降级",
        motan_cache_degradation: "MC缓存降级",
        hot_flow_parallel_degradation: "热门流前端机并行降级",
        user_appinterest_degradation: "用户app兴趣降级",
        category_user_appinterest_degradation: "非核心池用户app兴趣降级",
        user_unreadpool_degradation: "用户feed未读池降级",
        body_user_portrait_degradation: "正文页用户画像降级",
        visitor_portrait_degradation: "访客画像降级",
        user_collaborative_degradation: "用户协同推荐降级",
        user_friendships_degradation: "用户关系降级",
        hot_card_materials_degradation: "热点卡片降级",
        short_feature: "用户短期兴趣降级",
        user_graph_degradation: "用户自填画像降级",
        is_emergency_situation: "热门流旧紧急情况开关",
        user_lost_rate_degradation: "用户流失概率降级",
        user_dec_collaborative_degradation: "矩阵分解协同降级",
        offline_recommend_degradation: "离线推荐流降级",
        latest_interaction_degradation: "最近曝光行为降级",
        tourist_followings_degradation: "访客关系降级",
        mblog_tags_degradation: "获取博文标签降级",
        temporary_emergency_exp: "热门流新紧急情况开关",
        is_open_snake_merge: "蛇形merge降级",
        is_no_detail_sort_process: "精排降级",
        is_no_hot_list_recall: "榜单召回降级",
        is_no_local_recall: "本地召回降级",
        is_no_lbs_recall: "lbs召回降级",
        is_no_top_interest_recall: "高分值召回降级",
        is_no_middle_interest_recall: "中分值召回降级",
        is_no_tail_interest_recall: "低分值召回降级",
        is_no_instant_recall: "即时反馈降级",
        is_no_user_cf_recall: "全站协同降级",
        is_no_site_user_cf_recall: "站内协同降级",
        is_no_attention_recall: "兴趣关注降级",
        is_no_instant_author_recall: "正反馈降级",
        is_no_verticle_yunying_recall: "垂直运营降级",
        is_no_two_step_relation_recall: "二度关系降级",
        is_no_video_recall: "视频召回降级",
        is_no_add_material_recall: "补充物料召回降级",
        is_open_level_degradation: "自动等级降级",
        degrade_platform: "libsvm平台调用降级开关"
      }
    };
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.onSearch();
      }
    },
    onSearch() {
      const data = {
        url: "/innerdebug/getDegradeLog",
        params: {
          ...this.formInline,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            Message({
              showClose: true,
              message: res.msg || "数据查询成功！",
              type: "success",
              duration: 1000
            });
            this.total = res.total || 0;
            this.tableData = res.data || [];
            this.resultData = res.result || null;
          } else {
            Message({
              showClose: true,
              message: res.msg || "数据查询失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "数据接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    handlePageChange(val) {
      this.formInline.page = val;
      this.onSearch();
    },
    calculate(data) {
      return data ? Math.round((1 - data) * 10) : "无";
    },
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    // 将降级内容中的降级等级过滤掉
    resultDatahandle(data) {
      let res = [];
      for (let i in data) {
        if (i == "into_detail_rank_ratio") {
          continue;
        }
        this.degradeMap[i] && res.push(this.degradeMap[i]);
      }
      return res;
    }
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  watch: {
    pageAuth() {
      this.init();
    }
  },
  created() {
    this.init();
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
      padding-top: 10px;
      border-bottom: 10px solid #f0f2f5;
    }
    .content-box-wrap {
      padding: 10px;
    }
    .table-title {
      padding: 5px 10px;
      color: #409eff;
      border-bottom: 2px solid #409eff;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .page-wrap {
      padding-top: 10px;
      overflow: scroll;
    }
    .item-title {
      padding-bottom: 8px;
      font-size: 14px;
    }
    .tag-item {
      margin-right: 5px;
      margin-bottom: 5px;
    }
    .info-box {
      padding: 10px 0;
      border-bottom: 1px dashed #ccc;
    }
    .info-mark {
      margin-right: 14px;
      font-size: 14px;
      color: #F56C6C;
    }
    .info-text {
      margin-right: 10px;
      color: #666;
      font-size: 12px;
      text-decoration: underline;
    }
    .info-tips {
      padding: 10px 0;
      font-size: 12px;
      color: #E6A23C;
    }
  }
}
.el-form-item-div {
  display: block;
}
</style>
