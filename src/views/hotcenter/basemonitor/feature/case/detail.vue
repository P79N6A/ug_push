<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">特征变化轨迹跟踪-细分点击率</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form
        :model="formInline"
        size="small"
      >
        <el-form-item>
          <el-input
            style="width: 180px;"
            placeholder="请输入要查询的mid"
            v-model.trim="formInline.mid"
            clearable
            @change="onSearch"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
            <el-radio-group v-model="type" size="mini" border>
                <el-radio-button :label="1" border>年龄性别点击率</el-radio-button >
                <el-radio-button  :label="2" border>省份点击率</el-radio-button >
                <el-radio-button  :label="3" border>城市点击率</el-radio-button >
            </el-radio-group>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row
      v-if="content"
      class="content-box-wrap"
    >
      <div
        v-show="type === 1 && content.age_gender_act_ratio"
        class="table-box"
      >
        <h6 class="table-title">年龄性别点击率</h6>
        <el-table
          :data="content.age_gender_act_ratio"
          style="width: 100%"
          size="small"
        >
          <el-table-column
            width="50"
            type="index"
            align="center"
            fixed
            label="序号"
          >
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="age"
            label="年龄"
          >
            <template slot-scope="scope">
              <el-tag type="success">{{scope.row.age}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="gender"
            label="性别"
          >
            <template slot-scope="scope">
              <el-tag type="warning">{{scope.row.gender}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            min-width="90"
            prop="expo"
            label="曝光量"
            :formatter="setNum"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            min-width="90"
            prop="act"
            label="点击量"
            :formatter="setNum"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            min-width="90"
            prop="act_ratio"
            label="点击率"
          >
            <template slot-scope="scope">
              <el-tag :type="Number(scope.row.act_ratio) === 0 ? 'danger' : 'primary'">{{parsePercent(scope.row.act_ratio)}}</el-tag>
              <div v-if="scope.row.act_ratio">（{{scope.row.act_ratio}}）</div>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            min-width="90"
            prop="interact"
            label="互动量"
            :formatter="setNum"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            min-width="90"
            prop="interact_ratio"
            label="互动率"
          >
            <template slot-scope="scope">
              <el-tag :type="Number(scope.row.interact_ratio) === 0 ? 'danger' : 'primary'">{{parsePercent(scope.row.interact_ratio)}}</el-tag>
              <div v-if="scope.row.interact_ratio">（{{scope.row.interact_ratio}}）</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        v-show="type === 2 && content.province_act_ratio"
        class="table-box"
      >
        <h6 class="table-title">省份点击率</h6>
        <el-table
          :data="content.province_act_ratio"
          style="width: 100%"
          size="small"
        >
          <el-table-column
            width="50"
            type="index"
            align="center"
            fixed
            label="序号"
          >
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="name"
            label="省份"
          >
            <template slot-scope="scope">
              <el-tag type="success">{{province[`1042015:${scope.row.name}`]}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            min-width="90"
            prop="expo"
            label="曝光量"
            :formatter="setNum"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            min-width="90"
            prop="act"
            label="点击量"
            :formatter="setNum"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            min-width="90"
            prop="act_ratio"
            label="点击率"
          >
            <template slot-scope="scope">
              <el-tag :type="Number(scope.row.act_ratio) === 0 ? 'danger' : 'primary'">{{parsePercent(scope.row.act_ratio)}}</el-tag>
              <div v-if="scope.row.act_ratio">（{{scope.row.act_ratio}}）</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div
        v-show="type === 3 && content.city_act_ratio"
        class="table-box"
      >
        <h6 class="table-title">城市点击率</h6>
        <el-table
          :data="content.city_act_ratio"
          style="width: 100%"
          size="small"
        >
          <el-table-column
            width="50"
            type="index"
            align="center"
            fixed
            label="序号"
          >
          </el-table-column>
          <el-table-column
            width="100"
            align="center"
            prop="name"
            label="城市等级"
          >
            <template slot-scope="scope">
              <el-tag type="success">{{scope.row.name}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            min-width="90"
            prop="expo"
            label="曝光量"
            :formatter="setNum"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            min-width="90"
            prop="act"
            label="点击量"
            :formatter="setNum"
          >
          </el-table-column>
          <el-table-column
            sortable
            align="center"
            min-width="90"
            prop="act_ratio"
            label="点击率"
          >
            <template slot-scope="scope">
              <el-tag :type="Number(scope.row.act_ratio) === 0 ? 'danger' : 'primary'">{{parsePercent(scope.row.act_ratio)}}</el-tag>
              <div v-if="scope.row.act_ratio">（{{scope.row.act_ratio}}）</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>
    <p class="none-tips" v-else>暂无数据</p>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { formatNum, parsePercent } from "@/utils";
import { FeatureAPI, province } from "@/utils/config";
import { Message } from "element-ui";

export default {
  name: "CaseDetail",
  components: {
    Auth
  },
  data() {
    return {
      formatNum,
      parsePercent,
      province,
      type: 1,
      formInline: {
        mid: ""
      },
      content: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      this.formInline.mid = this.$route.query.mid;
      if (this.pageAuth === 1) {
        this.onSearch();
      }
    },
    onSearch() {
      if (!this.formInline.mid) {
        this.content = null;
        return;
      }
      const tempData = {
        url: FeatureAPI.getMidCaseDetail,
        param: this.formInline
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            Message({
              showClose: true,
              message: "success",
              type: "success",
              duration: 1000
            });
            this.content = res.data;
          } else {
            Message({
              showClose: true,
              message: res.msg || "数据获取失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: res.msg || "数据接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    setNum(row, column, cellValue) {
      return cellValue ? `${formatNum(cellValue)}（${cellValue}）` : 0;
    }
  },
  created() {
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
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
  }
}
</style>
