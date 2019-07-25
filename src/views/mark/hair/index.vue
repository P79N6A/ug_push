<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col :span="24">
        <h6 class="pane-title">人像分割标注-头发</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col :span="24">
        <el-form inline :model="formInline" size="small">
          <el-form-item label="图片id">
            <el-input
              style="min-width: 290px;"
              v-model="formInline.id"
              placeholder="请输入图片id"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input
              style="min-width: 290px;"
              v-model="searchName"
              placeholder="请输入用户名称"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="formInline.type" placeholder="请选择标注类型" clearable>
              <el-option label="未标注" :value="0"></el-option>
              <el-option label="已标注" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发色分类">
            <el-select v-model="color_state" placeholder="请选择" clearable>
              <el-option label="黑色" :value="1"></el-option>
              <el-option label="其他" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="长短分类">
            <el-select v-model="len_state" placeholder="请选择" clearable>
              <el-option label="长" :value="1"></el-option>
              <el-option label="中" :value="2"></el-option>
              <el-option label="短" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="遮挡分类">
            <el-select v-model="cover_state" placeholder="请选择" clearable>
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="formInline.checkType" placeholder="请选择审核状态" clearable>
              <el-option label="未审核" :value="1"></el-option>
              <el-option label="审核未通过" :value="2"></el-option>
              <el-option label="审核通过" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下线状态">
            <el-select v-model="formInline.isLabel" placeholder="请选择下线状态" clearable>
              <el-option label="未下线" :value="1"></el-option>
              <el-option label="已下线" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="图片范围">
            <el-input v-model="formInline.group" placeholder="图片范围，英文逗号分隔" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              style="margin-bottom: 5px;width: 170px;"
              v-model="time"
              type="date"
              format="yyyy年MM月dd日"
              value-format="timestamp"
              placeholder="选择时间"
            ></el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="onSearch">
              <span class="hidden-xs-only">查询</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap">
      <item-list
        :key="idx"
        v-show="showItem(item)"
        v-for="(item, idx) in list"
        :item="item"
        :index="(formInline.page - 1) * formInline.count + idx + curIndex"
      ></item-list>
      <div style="padding-top: 10px;overflow: auto;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formInline.page"
          :page-sizes="[5, 10, 20, 50, 100, 200]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";
import ItemList from "./components/ItemList";

export default {
  name: "Hair",
  components: {
    Auth,
    ItemList
  },
  data() {
    return {
      formInline: {
        id: "", // 图片id
        type: "", // 数字0/1， 0表示未标注，1表示标注
        group: "1,50", // 图片范围， 逗号分隔的字符串
        page: 1, // 查询的页码
        count: 10, // 每页的数量
        isLabel: "",
        checkType: ""
      },
      color_state: "",
      len_state: "",
      cover_state: "",
      searchName: "",
      time: "", // 时间戳，标注时间 13位
      total: 0,
      list: [],
      curIndex: 1,
      itemCheckType: ""
    };
  },
  computed: {
    showItem() {
      return function(item) {
        return this.getShowItem(item);
      };
    },
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    getShowItem(item) {
      let pass = true;
      let nopass = true;
      item.info.forEach((row, index) => {
        pass = row.check_type === 2 ? false : pass;
        nopass = row.check_type === 3 ? false : nopass;
      });
      if (this.itemCheckType === 2) {
        return pass || nopass;
      } else {
        return true;
      }
    },
    init() {
      if (this.pageAuth === 1) {
        this.onSearch();
      }
    },
    onSearch() {
      const that = this;
      this.itemCheckType = this.formInline.checkType;
      this.list = [];
      let uploadTime = this.time;
      uploadTime = uploadTime ? uploadTime : 0;
      const tempData = {
        url: "http://10.85.125.61:13145/query.json", // 接口请求地址
        param: {
          ...this.formInline,
          time: uploadTime,
          username: this.searchName, // 用户邮箱前缀
          color_state: this.color_state,
          len_state: this.len_state,
          cover_state: this.cover_state
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            this.curIndex = Number(this.formInline.group.split(",")[0]);
            this.list = res.result.data;
            this.total = res.result.total;
          } else {
            Message({
              showClose: true,
              message: res.msg || "图片查询失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "图片查询接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    handleSizeChange(val) {
      this.formInline.count = val;
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.onSearch();
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
.el-main {
  padding: 0;
  color: #333;
  line-height: 100%;
  background-color: #f0f2f5;
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
    .table-wrap {
      margin-bottom: 20px;
    }
    .table-title {
      padding: 5px 10px;
      color: #409eff;
      border-bottom: 2px solid #409eff;
      margin-bottom: 10px;
    }
  }
}
</style>
