<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">重要特征直观可靠性</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form
        inline
        :model="formInline"
        size="small"
      >
        <el-form-item>
          <el-radio-group
            v-model="formInline.view"
            @change="onSearch"
          >
            <el-radio-button
              style="margin-left: 0;"
              :key="key"
              v-for="(val, key) in viewMap"
              :label="key"
            >{{val}}</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <div v-if="formInline.view === 'tag'">
          <el-form-item>
            <el-select
              v-model="tagid"
              placeholder="请选择一级领域"
              filterable
              clearable
              @change="onSearch"
            >
              <el-option
                v-for="(val, id) in category"
                :key="id"
                :label="val"
                :value="id"
              >
              </el-option>
            </el-select>
            <span class="info-tips">支持输入筛选一级领域</span>
          </el-form-item>
        </div>
        <div v-if="formInline.view === 'born_gender'">
          <el-form-item label="年龄：">
            <el-radio-group
              v-model="age"
              @change="onSearch"
            >
              <el-radio
                border
                style="margin-left: 0;margin-right: 5px;margin-bottom: 5px;"
                :key="key"
                v-for="(val, key) in ageMap"
                :label="key"
              >{{val}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            v-if="formInline.view === 'born_gender'"
            label="性别："
          >
            <el-radio-group
              v-model="sex"
              @change="onSearch"
            >
              <el-radio
                border
                style="margin-left: 0;margin-right: 5px;margin-bottom: 5px;"
                :key="key"
                v-for="(val, key) in sexMap"
                :label="key"
              >{{val}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div v-if="formInline.view === 'city_level'">
          <el-form-item label="城市等级：">
            <el-radio-group
              v-model="cityLevel"
              @change="onSearch"
            >
              <el-radio
                border
                style="margin-left: 0;margin-right: 5px;margin-bottom: 5px;"
                :key="key"
                v-for="(val, key) in cityLevelMap"
                :label="key"
              >{{val}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <div v-if="formInline.view === 'province'">
          <el-form-item>
            <el-select
              v-model="provinceid"
              placeholder="请选择中国省份"
              filterable
              clearable
              @change="onSearch"
            >
              <el-option
                v-for="(val, id) in province"
                :key="id"
                :label="val"
                :value="id"
              >
              </el-option>
            </el-select>
            <span class="info-tips">支持输入筛选省份名称</span>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="排序方式：">
            <el-radio-group
              v-model="formInline.sort"
              @change="onSearch"
            >
              <el-radio
                border
                style="margin-left: 0;margin-right: 5px;margin-bottom: 5px;"
                :key="key"
                v-for="(val, key) in sortMap"
                :label="key"
              >{{val}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
    </el-row>
    <el-row
      class="content-box-wrap"
    >
      <div v-if="datalist && datalist.length > 0">
        <item-list :key="item.mid" :item="item" :index="(formInline.page-1) * formInline.count + idx+1" v-for="(item, idx) in datalist"></item-list>
      </div>
      <p v-else class="none-tips">暂无数据</p>
      <div class="page-wrap">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formInline.page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="formInline.count"
          layout="total, sizes, prev, pager, next, jumper"
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
import ItemList from "./components/ItemList";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { FeatureAPI, category, province } from "@/utils/config";
import { Message } from "element-ui";

export default {
  name: "material",
  components: {
    Auth,
    ItemList
  },
  data() {
    return {
      FeatureAPI,
      category,
      province,
      formInline: {
        view: "tag",
        data: "",
        sort: "click", //排序方式
        page: 1,
        count: 10
      },
      total: 0,
      tagid: "1042015:newTagCategory_001",
      age: "70s",
      sex: "m",
      cityLevel: "1",
      provinceid: "1042015:province_11",
      sortMap: {
        click: "点击率",
        inter: "互动率",
        dur: "时长"
      },
      viewMap: {
        tag: "匹配标签头部物料",
        born_gender: "匹配人群头部物料",
        city_level: "匹配城市头部物料",
        province: "匹配省份头部物料",
        all: "全局头部物料"
      },
      ageMap: {
        "70s": "70s",
        "80s": "80s",
        "90s": "90s",
        "00s": "00s",
        other: "其他"
      },
      sexMap: {
        m: "男",
        f: "女",
        o: "其他"
      },
      cityLevelMap: {
        "1": "1线",
        "2": "2线",
        "3": "3线",
        "4": "4线"
      },
      datalist: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.onSearch();
      }
    },
    onSearch() {
      this.formInline.data = "";
      if (this.formInline.view === "tag") {
        if (!this.tagid) {
          Message({
            showClose: true,
            message: "请选择一级领域！",
            type: "error",
            duration: 3000
          });
          return;
        }
        this.formInline.data = this.tagid;
      } else if (this.formInline.view === "born_gender") {
        this.formInline.data = `${this.age}_${this.sex}`;
      } else if (this.formInline.view === "city_level") {
        this.formInline.data = this.cityLevel;
      } else if (this.formInline.view === "province") {
        if (!this.provinceid) {
          Message({
            showClose: true,
            message: "请选择省份！",
            type: "error",
            duration: 3000
          });
          return;
        }
        this.formInline.data = this.provinceid;
      }
      const tempData = {
        url: FeatureAPI.getMaterialInfo,
        param: this.formInline
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
        this.$store.dispatch("ProxyGet", params).then(res => {
          if (res.code && Number(res.code) == 200) {
            Message({
              showClose: true,
              message: "success",
              type: "success",
              duration: 1000
            });
            this.datalist = res.data && res.data.data ? res.data.data : false;
            this.total =
              res.data && res.data.total && this.datalist && this.datalist.length > 0 ? res.data.total : 0;
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
  }
}
</style>