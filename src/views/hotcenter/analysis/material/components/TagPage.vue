<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23">
        <el-row type="flex" justify="space-between" class="pane-title-wrap">
          <h6 class="pane-title">
            <i class="el-icon-goods"></i>内容标签统计</h6>
        </el-row>
        <el-row class="search-box">
          <el-date-picker v-model="formData.date" align="right" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
          <el-button type="primary" icon="el-icon-search" :loading="formData.loading" @click="onSearch">查询</el-button>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" v-if="dataList">
      <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23">
        <el-radio-group v-model="tabName">
          <el-radio border label="offline">原始数据</el-radio>
          <el-radio border label="online">入库数据</el-radio>
        </el-radio-group>
        <el-table :data="dataList" :default-sort="{prop: 'total_num', order: 'descending'}" style="width: 100%" class="pane-table" border>
          <el-table-column type="index" align="center" width="50" label="序号" fixed>
          </el-table-column>
          <el-table-column fixed align="left" min-width="80" prop="name" label="所属领域">
          </el-table-column>
          <el-table-column align="left" min-width="90" sortable prop="total_num" label="总曝光数（条）" :formatter="setNum">
          </el-table-column>
          <el-table-column align="left" width="150" sortable prop="second_tag_rate_material" label="内容标签2级覆盖率（按物料统计）">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.second_tag_rate_material">{{ _parsePercent(scope.row.second_tag_rate_material) }}</el-tag>
              <el-tag type="danger" v-else>0%</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="left" width="150" sortable prop="third_tag_rate_material" label="内容标签3级覆盖率（按物料统计）">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.third_tag_rate_material">{{ _parsePercent(scope.row.third_tag_rate_material) }}</el-tag>
              <el-tag type="danger" v-else>0%</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="left" width="150" sortable prop="second_tag_rate_expose" label="内容标签2级覆盖率（按曝光统计）">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.second_tag_rate_expose">{{ _parsePercent(scope.row.second_tag_rate_expose) }}</el-tag>
              <el-tag type="danger" v-else>0%</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="left" width="150" sortable prop="third_tag_rate_expose" label="内容标签3级覆盖率（按曝光统计）">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.third_tag_rate_expose">{{ _parsePercent(scope.row.third_tag_rate_expose) }}</el-tag>
              <el-tag type="danger" v-else>0%</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="left" min-width="150" sortable prop="second_user_rate_expose" label="用户2级兴趣匹配度（按曝光统计）">
            <template slot-scope="scope">
              <el-tag type="warning" v-if="scope.row.second_user_rate_expose">{{ _parsePercent(scope.row.second_user_rate_expose) }}</el-tag>
              <el-tag type="danger" v-else>0%</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="left" min-width="150" sortable prop="third_user_rate_expose" label="用户3级兴趣匹配度（按曝光统计）">
            <template slot-scope="scope">
              <el-tag type="warning" v-if="scope.row.third_user_rate_expose">{{ _parsePercent(scope.row.third_user_rate_expose) }}</el-tag>
              <el-tag type="danger" v-else>0%</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { formatNum, parseTime, parsePercent } from "@/utils";

export default {
  name: "tagPage",
  data() {
    return {
      tabName: "offline",
      searchTimer: null,
      dataList: null,
      formData: {
        date: "",
        loading: false
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 3600 * 1000 * 24 > Date.now();
        },
        shortcuts: [
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["email", "materialMonitor", "pageAuth"])
  },
  methods: {
    init() {
      this.formData.date = parseTime(
        Date.now() - 3600 * 1000 * 48,
        "{y}{m}{d}"
      );
      if (this.pageAuth === 1) {
        this.onSearch();
      }
    },
    onSearch() {
      this.formData.loading = true;
      if (!this.searchTimer) {
        //请求超时处理
        this.setTimer();
      }
      const tempData = {
        url:
          "http://172.16.105.67:8091/newtest1011/getMaterialMonitorData.html",
        param: {
          dt: this.formData.date
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetMonitor", params);
    },
    setTimer() {
      //请求5s后搜索按钮解锁
      const that = this;
      this.searchTimer = setTimeout(() => {
        that.formData.loading && (that.formData.loading = false);
        that.searchTimer = null;
      }, 5000);
    },
    setNum(row, column, cellValue) {
      return formatNum(cellValue) || 0;
    },
    _parsePercent(num) {
      return parsePercent(num);
    },
    setData() {
      this.dataList = this.materialMonitor[this.tabName];
    }
  },
  created() {
    this.init();
  },
  watch: {
    materialMonitor() {
      this.formData.loading = false;
      this.materialMonitor && this.setData();
    },
    tabName() {
      this.setData();
    },
    email() {},
    pageAuth() {
      this.init();
    }
  }
};
</script>

<style lang="scss" scoped>
.pane-title-wrap {
  margin-bottom: 10px;
  .pane-title {
    font-size: 20px;
    color: #409eff;
    text-align: center;
  }
}
.search-box {
  margin: 20px 0;
}
.pane-table {
  margin-top: 10px;
}
</style>
