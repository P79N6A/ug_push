<template>
  <el-main>
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">领域TOP500曝光物料</h6>
    </el-row>
    <el-row class="search-form-wrap" v-if="hasCateAuth">
      <el-form
        :model="formInline"
        size="small"
      >
        <el-form-item>
          <el-date-picker
            v-model="formInline.date"
            align="right"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyyMMdd"
            :picker-options="pickerOptions"
            @change="handleForm"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="fieldList">
          <el-radio-group
            v-model="formInline.field"
            size="mini"
            @change="handleForm"
          >
            <el-radio style="margin-left: 0;margin-right: 2px;margin-top: 2px;" label="" border>全部领域</el-radio>
            <el-radio
              :key="key"
              v-for="(val, key) in fieldList"
              :label="val"
              style="margin-left: 0;margin-right: 2px;margin-top: 2px;"
              border
            ></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="content-box-wrap" v-if="hasCateAuth">
      <div v-if="datalist && datalist.length > 0">
        <item-list
          :key="item.mid"
          :item="item"
          :index="(formInline.page -1) * formInline.count + idx+1"
          v-for="(item, idx) in datalist"
        ></item-list>
      </div>
      <p
        v-else
        class="none-tips"
      >暂无数据</p>
      <div class="page-wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page="formInline.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="formInline.count"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-row>
    <div v-else style="text-align: center;padding: 20px 0;">
      {{tips}}
      <span v-if="!isLoadding">请联系产品
        <a class="link-btn" title="邮件联系" :href="`mailto:yufei7@staff.weibo.com`"> 薛宇飞（yufei7@staff.weibo.com）</a>
      </span>
    </div>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import ItemList from "./components/ItemList";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "multipleMaterial",
  components: {
    Auth,
    ItemList
  },
  data() {
    return {
      fieldList: [],
      pickerOptions: {
        disabledDate(time) {
          const start = Date.now() - 3600 * 1000 * 24 * 9;
          return time.getTime() > Date.now() || time.getTime() < start;
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
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
      },
      formInline: {
        field: "",
        date: "",
        page: 1,
        count: 10
      },
      total: 500,
      datalist: null,
      hasCateAuth: false,
      isLoadding: true,
      tips: "Loading"
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.email) {
        this.formInline.date = parseTime(
          Date.now() - 3600 * 1000 * 24 * 2,
          "{y}{m}{d}"
        );
        this.getUserRole();
      }
    },
    getUserRole() {
      const data = {
        url: "/role/getUserRole",
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res.result && res.result.permission && res.result.permission.indexOf(20) > -1) {
            this.hasCateAuth = true;
            this.tips = "";
            this.getField().then(
              () => {
                this.onSearch();
              },
              err => {
                Message({
                  showClose: true,
                  message: err,
                  type: "error",
                  duration: 3000
                });
              }
            );
          } else {
            this.tips = "暂无页面权限";
          }
          this.isLoadding = false;
        },
        err => {
          this.tips = "接口异常";
          this.isLoadding = false;
        }
      );
    },
    getField() {
      return new Promise((resolve, reject) => {
        const data = {
          url: "/tag/getTagnames",
          params: {
            username: this.email
          }
        };
        this.$store.dispatch("CommonGet", data).then(
          res => {
            if (res && res.code == 200) {
              this.fieldList = res.result || ["时尚", "美妆"];
              resolve();
            } else {
              reject("领域获取失败！");
            }
          },
          err => {
            reject("领域获取接口请求失败！");
          }
        );
      });
    },
    onSearch() {
      const data = {
        url: "/tag/getTagTop",
        params: {
          ...this.formInline,
          username: this.email
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res && res.code == 200) {
            Message({
              showClose: true,
              message: "success",
              type: "success",
              duration: 1000
            });
            this.datalist = res.result || [];
          } else {
            this.datalist = [];
            Message({
              showClose: true,
              message: "Top100曝光获取失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          this.datalist = [];
          Message({
            showClose: true,
            message: "Top100曝光接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    handleForm() {
      this.formInline.page = 1;
      this.onSearch();
    },
    handleSizeChange(val) {
      this.formInline.count = val;
      this.onSearch();
    },
    handlePageChange(val) {
      this.formInline.page = val;
      this.onSearch();
    }
  },
  created() {
    this.init();
  },
  watch: {
    email() {
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
      padding-right: 14px;
      padding-top: 18px;
      background-color: #fff;
      border-bottom: 1px solid #f0f2f5;
    }
    .content-box-wrap {
      padding: 10px;
    }
    .none-tips {
      padding: 20px 0;
      text-align: center;
      color: #999;
    }
    .info-tips {
      font-size: 12px;
      color: #ebb563;
    }
    .page-wrap {
      padding-top: 10px;
      overflow: scroll;
    }
    .link-btn {
      color: #409eff;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>