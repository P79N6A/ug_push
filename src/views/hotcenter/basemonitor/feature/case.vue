<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">特征变化轨迹跟踪</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form
        inline
        :model="formInline"
        size="small"
      >
        <el-form-item>
          <el-input
            style="min-width: 180px;"
            placeholder="请输入要查询的mid"
            v-model.trim="formInline.mid"
            clearable
            @change="onSearch"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      v-if="content"
      class="content-box-wrap"
    >
    <div style="text-align: center;">
      <div class="content-title-box">
        <label>mid：</label>
        <a
          class="link-btn"
          :href="`//m.weibo.cn/status/${content.mid}`"
          target="_blank"
          title="跳转至微博详情页"
        >{{content.mid}}</a> |
        <label>可能存在断层：</label>
        <span>{{content.may_rerecord ? '是' : '否'}}</span> |
        <label>mid生成时间：</label>
        <span>{{parseTime(content.mid_create_timestamp)}}</span>
      </div>
    </div>
      <div v-if="content.ttl_info" class="table-box">
        <h6 class="table-title">总计数新增</h6>
        <el-table
          :data="content.ttl_info"
          style="width: 100%"
          size="small"
          border
        >
          <el-table-column
            prop="key"
            label="指标"
            width="110"
          >
            <template slot-scope="scope">{{keyMap[scope.row.key]}}</template>
          </el-table-column>
          <el-table-column
            prop="create_time_mills"
            label="指标创建时间"
            width="140"
          >
            <template slot-scope="scope">{{scope.row.create_time_mills ? parseTime(scope.row.create_time_mills) : '--'}}</template>
          </el-table-column>
          <el-table-column
            prop="create_time_mills"
            label="指标最后更新时间"
            width="140"
          >
            <template slot-scope="scope">{{scope.row.update_time_mills ? parseTime(scope.row.update_time_mills) : '--'}}</template>
          </el-table-column>
          <el-table-column
            prop="ttl"
            label="总计数"
            min-width="200"
          >
            <template slot-scope="scope">
              {{scope.row.key === 'list_duration_ttl' || scope.row.key === 'avg_list_duration' ? `${formatNum(scope.row.ttl / 1000 )} 秒（${scope.row.ttl} 毫秒）` : `${formatNum(scope.row.ttl)}（${scope.row.ttl}）`}}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="content.age_gender" class="table-box">
        <h6 class="table-title">年龄性别计数信息</h6>
        <el-table
          :data="content.age_gender"
          style="width: 100%"
          size="small"
          border
        >
          <el-table-column
            prop="key"
            label="指标"
            width="110"
          >
            <template slot-scope="scope">{{keyMap[scope.row.key]}}</template>
          </el-table-column>
          <el-table-column
            prop="create_time_mills"
            label="指标创建时间"
            width="140"
          >
            <template slot-scope="scope">{{parseTime(scope.row.create_time_mills)}}</template>
          </el-table-column>
          <el-table-column
            prop="create_time_mills"
            label="指标最后更新时间"
            width="140"
          >
            <template slot-scope="scope">{{parseTime(scope.row.update_time_mills)}}</template>
          </el-table-column>
          <el-table-column
            prop="age_gender_ttl"
            label="所有年龄性别总和"
            min-width="200"
          >
            <template slot-scope="scope">{{formatNum(scope.row.age_gender_ttl)}}（{{scope.row.age_gender_ttl}}）</template>
          </el-table-column>
          <el-table-column
            prop="msg"
            label="提示信息"
            min-width="200"
          >
           <template slot-scope="scope">{{scope.row.msg || '--'}}</template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="content.province_city" class="table-box">
        <h6 class="table-title">省份、城市等级相关计数</h6>
        <el-table
          :data="content.province_city"
          style="width: 100%"
          size="small"
          border
        >
          <el-table-column
            prop="key"
            label="指标"
            width="110"
          >
            <template slot-scope="scope">{{keyMap[scope.row.key]}}</template>
          </el-table-column>
          <el-table-column
            prop="create_time_mills"
            label="指标创建时间"
            width="140"
          >
            <template slot-scope="scope">{{parseTime(scope.row.create_time_mills)}}</template>
          </el-table-column>
          <el-table-column
            prop="create_time_mills"
            label="指标最后更新时间"
            width="140"
          >
            <template slot-scope="scope">{{parseTime(scope.row.update_time_mills)}}</template>
          </el-table-column>
          <el-table-column
            prop="city_ttl"
            label="所有城市等级计数总和"
            min-width="200"
          >
            <template slot-scope="scope">{{formatNum(scope.row.city_ttl)}}（{{scope.row.city_ttl}}）</template>
          </el-table-column>
          <el-table-column
            prop="province_ttl"
            label="所有省份计数总和"
            min-width="200"
          >
            <template slot-scope="scope">{{formatNum(scope.row.province_ttl)}}（{{scope.row.province_ttl}}）</template>
          </el-table-column>
          <el-table-column
            prop="msg"
            label="提示信息"
            min-width="200"
          >
           <template slot-scope="scope">{{scope.row.msg || '--'}}</template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <p
      v-else
      class="none-tips"
    >暂无数据</p>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import ItemList from "./components/ItemList";
import { mapGetters } from "vuex";
import { parseTime, formatNum } from "@/utils";
import { FeatureAPI, category, province } from "@/utils/config";
import { Message } from "element-ui";

export default {
  name: "ratePage",
  components: {
    Auth,
    ItemList
  },
  data() {
    return {
      parseTime,
      formatNum,
      FeatureAPI,
      formInline: {
        mid: "" //4352431519802393
      },
      content: null,
      keyMap: {
        expo_ttl: "曝光",
        act_ttl: "点击",
        interact_ttl: "互动",
        realread_ttl: "真实阅读总UV",
        list_duration_ttl: "真实阅读总时长",
        expo_age_gender_ttl: "曝光",
        act_age_gender_ttl: "点击",
        interact_age_gender_ttl: "互动",
        ret_age_gender_ttl: "转发",
        cmt_age_gender_ttl: "评论",
        lik_age_gender_ttl: "点赞",
        expo_province_city_ttl: "曝光",
        act_province_city_ttl: "点击",
        realread_province_city_ttl: "真实阅读",
        act_ratio: "点击率",
        interact_ratio: "互动率",
        avg_list_duration: "列表页人均时长"
      }
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    onSearch() {
      this.content = false;
      if (!this.formInline.mid) {
        return;
      }
      const tempData = {
        url: FeatureAPI.getMidCase,
        param: this.formInline
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetBaseAnaly", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
          const temp = res.data || {};
          this.content = {
            mid: temp.mid,
            may_rerecord: temp.may_rerecord,
            mid_create_timestamp: temp.mid_create_timestamp, //mid生成时间戳，ms
            ttl_info: this.objToArray(temp.ttl_info), //总曝光、点击、互动、真实阅读相关信息
            age_gender: this.objToArray(temp.age_gender), //年龄性别计数信息
            province_city: this.objToArray(temp.province_city) //省份、城市等级信息
          };
        } else {
          Message({
            showClose: true,
            message: res.msg || "数据请求失败！",
            type: "error",
            duration: 3000
          });
        }
      });
    },
    objToArray(obj) {
      return Object.keys(obj).map(
        key =>
          (obj[key] = {
            ...obj[key],
            key: key
          })
      );
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  .el-container {
    .el-noauth {
      background-color: #fff;
    }
  }
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
      .content-title-box {
        display: inline-block;
        padding: 10px 20px;
        border-bottom: 3px solid #ccc;
        border-radius: 8px;
        label {
          font-size: 14px;
        }
        span,
        a {
          font-size: 14px;
          font-weight: bold;
        }
      }
      .table-box {
        padding: 10px 0;
        .table-title {
          display: inline-block;
          margin-bottom: 4px;
          padding: 5px 10px;
          border-bottom: 2px solid #409eff;
          font-size: 14px;
          color: #409eff;
        }
      }
    }
    .none-tips {
      padding-top: 20px;
      text-align: center;
      color: #666;
    }
    .link-btn {
      color: #f56c6c;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>