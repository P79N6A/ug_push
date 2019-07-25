<template>
  <el-row
    type="flex"
    align="middle"
    justify="center"
  >
    <el-col
      :xs="24"
      :span="24"
    >
      <el-form
        :inline="true"
        size="mini"
      >
        <el-form-item>
          <el-input
            style="width: 300px;"
            prefix-icon="el-icon-search"
            v-model="operateForm.user"
            placeholder="查询指定用户, 为空则查询所有记录"
            clearable
            @change="operateChangeEvent()"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            :loading="operateForm.loading"
            @click="onSearch"
          ><span class="hidden-xs-only">搜索</span></el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="materialRecord && materialRecord.list"
        style="width: 100%"
        class="pane-table"
        border
        size="mini"
      >
        <el-table-column
          align="left"
          width="190"
          sortable
          prop="time"
          label="时间"
        >
          <template slot-scope="scope">
            <i class="el-icon-time hidden-xs-only"></i>
            <span style="margin-left: 10px">{{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          min-width="120"
          prop="name"
          label="操作人"
        >
        </el-table-column>
        <el-table-column
          align="left"
          min-width="300"
          prop="content"
          label="内容"
        >
        </el-table-column>
      </el-table>
      <div class="page-wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="operateForm.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="operateForm.total"
        >
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "OperateRecordPane",
  data() {
    return {
      searchTimer: null,
      operateForm: {
        loading: false,
        user: "",
        total: 0,
        count: 10,
        currentPage: 1
      }
    };
  },
  computed: {
    ...mapGetters(["email", "materialRecord"])
  },
  created() {
    this.init();
  },
  methods: {
    init() {
        this.onSearch();
    },
    onSearch() {
      this.operateForm.loading = true;
      if (!this.searchTimer) {
        //请求超时处理
        this.setTimer();
      }
      const tempData = {
        url: `${domain}/3/admin/getalllog`,
        param: {
          staff: this.email,
          source: source,
          user: this.operateForm.user,
          page: this.operateForm.currentPage,
          count: this.operateForm.count
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetRecord", params);
    },
    operateChangeEvent() {
      this.operateForm.currentPage = 1;
    },
    setTimer() {
      //请求5s后搜索按钮解锁
      const that = this;
      this.searchTimer = setTimeout(() => {
        that.operateForm.loading && (that.operateForm.loading = false);
        that.searchTimer = null;
      }, 5000);
    },
    handleSizeChange(val) {
      this.operateForm.count = val;
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.operateForm.currentPage = val;
      this.onSearch();
    }
  },
  watch: {
    materialRecord() {
      this.operateForm.loading = false;
      this.operateForm.total = Number(this.materialRecord.total);
    },
    email() {}
  }
};
</script>

<style lang="scss" scoped>
.pane-form {
  margin-top: 10px;
  padding: 20px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  border: 1px solid #ebebeb;
  border-radius: 3px;
}
</style>