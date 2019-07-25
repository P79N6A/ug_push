<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">FM召回分析</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form
        inline
        :model="formInline"
        size="small"
      >
        <el-form-item>
          <el-input
            placeholder="请输入uid"
            v-model.trim="formInline.uid"
            clearable
          ></el-input>
          <span class="info-tips">（uid）</span>
        </el-form-item>
        <el-form-item>
          <el-input
            placeholder="mid返回最大数量"
            v-model.number="formInline.count"
            @change="formInline.count = formInline.count > 0 ? formInline.count : 1"
          ></el-input>
          <span class="info-tips">（mid返回最大数量）</span>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            autosize
            placeholder="输入triggers"
            v-model.number="formInline.triggers"
          ></el-input>
          <span class="info-tips">（triggers）</span>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSearch"
          >查询</el-button>
        </el-form-item>
        <div>
          <el-form-item>
            <el-radio-group
              v-model="formInline.networkType"
              @change="onSearch"
            >
              <el-radio
                :key="key"
                :label="item"
                v-for="(item, key) in networkList"
                border
              >{{item}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
    </el-row>
    <el-row class="content-box-wrap">
      <el-col
        v-if="midList"
        :span="10"
        :xs="24"
      >
        <div class="clearfix">
          <h6 class="table-title left">mid列表（{{midList.length || 0}}）</h6>
          <el-button
            v-if="midList.length > 0"
            class="right"
            type="primary"
            plain
            size="mini"
            :loading="downloadLoading"
            @click="handleDownload"
          >导出</el-button>
        </div>
        <el-table
          :data="midList"
          style="width: 100%"
          size="mini"
          max-height="484"
          border
          stripe
        >
          <el-table-column
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
            prop="mid"
            label="mid"
            min-width="140"
          >
          </el-table-column>
          <el-table-column
            prop="score"
            label="得分"
            sortable
          >
          </el-table-column>
        </el-table>
      </el-col>
      <el-col
        v-if="userInfo"
        :span="14"
        :xs="24"
        style="padding: 0 10px;"
      >
        <div class="clearfix">
          <h6 class="table-title left">用户特征</h6>
        </div>
        <el-collapse :value="['1']">
          <el-collapse-item name="1">
            <template slot="title">
              <div class="collapse-title"><i class="collapse-title el-icon-info"></i> 基本信息</div>
            </template>
            <div>
              <a
                class="link-btn"
                :href="`//weibo.com/u/${curUid}`"
                target="_blank"
                title="跳转微博主页"
              >UID：{{curUid}}</a>
              <el-tag
                type="info"
                size="mini"
                v-if="userInfo.gender"
              >{{userInfo.gender === 'male' ? '男' : '女'}}</el-tag>
              <el-tag
                type="info"
                size="mini"
                v-if="userInfo.born"
              >年龄：{{userInfo.born}}</el-tag>
              <el-tag
                type="info"
                size="mini"
                v-if="userInfo.provinceId && province[userInfo.provinceId]"
              >{{province[userInfo.provinceId]}}</el-tag>
            </div>
          </el-collapse-item>
          <el-collapse-item name="2" v-if="userInfo.keywordInterest">
            <template slot="title">
              <div class="collapse-title"><i class="collapse-title el-icon-info"></i> 关键词兴趣（{{userInfo.keywordInterest.length}}）</div>
            </template>
            <div class="clearfix">
              <el-tag
                class="item-tag left"
                :key="tag.id"
                v-for="tag in userInfo.keywordInterest"
                :type="colorList[Math.round(3*Math.random())]"
              >{{tag.name || tag.id}}</el-tag>
            </div>
          </el-collapse-item>
          <el-collapse-item name="3" v-if="userInfo.topicInterest">
            <template slot="title">
              <div class="collapse-title"><i class="collapse-title el-icon-info"></i> topic兴趣（{{userInfo.topicInterest.length}}）</div>
            </template>
            <div class="clearfix">
              <el-tag
                class="item-tag left"
                :key="tag.id"
                v-for="tag in userInfo.topicInterest"
                :type="colorList[Math.round(3*Math.random())]"
              >{{tag.name || tag.id}}</el-tag>
            </div>
          </el-collapse-item>
          <el-collapse-item name="4" v-if="userInfo.longFirstTags">
            <template slot="title">
              <div class="collapse-title"><i class="collapse-title el-icon-info"></i> 长期一级兴趣（{{userInfo.longFirstTags.length}}）</div>
            </template>
            <div class="clearfix">
              <el-tag
                class="item-tag left"
                :key="tag.id"
                v-for="tag in userInfo.longFirstTags"
                :type="colorList[Math.round(3*Math.random())]"
              >{{tag.name || tag.id}} | {{formatNum(tag.weight)}}</el-tag>
            </div>
          </el-collapse-item>
          <el-collapse-item name="5" v-if="userInfo.longSecondTags">
            <template slot="title">
              <div class="collapse-title"><i class="collapse-title el-icon-info"></i> 长期二级兴趣（{{userInfo.longSecondTags.length}}）</div>
            </template>
            <div class="clearfix">
              <el-tag
                class="item-tag left"
                :key="tag.id"
                v-for="tag in userInfo.longSecondTags"
                :type="colorList[Math.round(3*Math.random())]"
              >{{tag.name || tag.id}} | {{formatNum(tag.weight)}}</el-tag>
            </div>
          </el-collapse-item>
          <el-collapse-item name="6" v-if="userInfo.longThirdTags">
            <template slot="title">
              <div class="collapse-title"><i class="collapse-title el-icon-info"></i> 长期三级兴趣（{{userInfo.longThirdTags.length}}）</div>
            </template>
            <div class="clearfix">
              <el-tag
                class="item-tag left"
                :key="tag.id"
                v-for="tag in userInfo.longThirdTags"
                :type="colorList[Math.round(3*Math.random())]"
              >{{tag.name || tag.id}} | {{formatNum(tag.weight)}}</el-tag>
            </div>
          </el-collapse-item>
          <el-collapse-item name="7" v-if="userInfo.shortFirstTags">
            <template slot="title">
              <div class="collapse-title"><i class="collapse-title el-icon-info"></i> 短期一级兴趣（{{userInfo.shortFirstTags.length}}）</div>
            </template>
            <div class="clearfix">
              <el-tag
                class="item-tag left"
                :key="tag.id"
                v-for="tag in userInfo.shortFirstTags"
                :type="colorList[Math.round(3*Math.random())]"
              >{{tag.name || tag.id}} | {{formatNum(tag.weight)}}</el-tag>
            </div>
          </el-collapse-item>
          <el-collapse-item name="8" v-if="userInfo.shortSecondTags">
            <template slot="title">
              <div class="collapse-title"><i class="collapse-title el-icon-info"></i> 短期二级兴趣（{{userInfo.shortSecondTags.length}}）</div>
            </template>
            <div class="clearfix">
              <el-tag
                class="item-tag left"
                :key="tag.id"
                v-for="tag in userInfo.shortSecondTags"
                :type="colorList[Math.round(3*Math.random())]"
              >{{tag.name || tag.id}} | {{formatNum(tag.weight)}}</el-tag>
            </div>
          </el-collapse-item>
          <el-collapse-item name="9" v-if="userInfo.shortThirdTags">
            <template slot="title">
              <div class="collapse-title"><i class="collapse-title el-icon-info"></i> 短期三级兴趣（{{userInfo.shortThirdTags.length}}）</div>
            </template>
            <div class="clearfix">
              <el-tag
                class="item-tag left"
                :key="tag.id"
                v-for="tag in userInfo.shortThirdTags"
                :type="colorList[Math.round(3*Math.random())]"
              >{{tag.name || tag.id}} | {{formatNum(tag.weight)}}</el-tag>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <div class="content-box-wrap">
      <div v-if="midsDetail && midsDetail.length > 0">
        <item-list
          :key="item.mid"
          :item="item"
          :index="(formMid.page-1) * formMid.count + idx+1"
          v-for="(item, idx) in midsDetail"
        ></item-list>
        <div class="page-wrap">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formMid.page"
            :page-sizes="[5, 10, 20, 30, 40, 50]"
            :page-size="formMid.count"
            layout="total, sizes, prev, pager, next, jumper"
            :total="formMid.total"
          >
          </el-pagination>
        </div>
      </div>
      <p v-else class="none-tips">暂无物料详情</p>
    </div>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import ItemList from "./components/ItemList";
import { mapGetters } from "vuex";
import { formatNum } from "@/utils";
import { province } from "@/utils/config";
import { Message } from "element-ui";

export default {
  name: "multipleMaterial",
  components: {
    Auth,
    ItemList
  },
  data() {
    return {
      formatNum,
      province,
      formInline: {
        source: 445670032,
        uid: "",
        networkType: "4g",
        count: 1000,
        triggers: ""
      },
      formMid: {
        page: 1,
        count: 5,
        total: 0
      },
      curUid: "",
      networkList: ["wifi", "mobile", "4g", "3g", "2g", "unknown", "N/A"],
      total: 0,
      midList: null,
      dataList: [],
      userInfo: null,
      midsDetail: null,
      downloadLoading: false,
      colorList: ["", "success", "warning", "danger"]
    };
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  methods: {
    onSearch() {
      if (!this.formInline.uid) {
        Message({
          showClose: true,
          message: "uid不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.formInline.count > 1000) {
        this.$confirm("请求返回的mid数量大于1000, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success"
        })
          .then(() => {
            this.getFMData();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消查询！"
            });
          });
        return;
      }
      this.getFMData();
    },
    getFMData() {
      const tempData = {
        url:
          "http://10.73.17.230:8080/2/recommendation/general_fm_recommend.json",
        param: { ...this.formInline }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res.code && res.code === 200) {
            Message({
              showClose: true,
              message: res.msg || "success",
              type: "success",
              duration: 1000
            });
            this.curUid = this.formInline.uid;
            this.midList = res.data;
            this.userInfo = res.userInfo;
            this.formMid.total =
              this.midList && this.midList.length ? this.midList.length : 0;
            this.getDetailMids();
          } else {
            this.midList = [];
            Message({
              showClose: true,
              message: res.msg || "FM召回查询失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          this.midList = [];
          Message({
            showClose: true,
            message: "FM召回查询接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    getDetailMids() {
      const mids = this.midList.slice(
        (this.formMid.page - 1) * this.formMid.count,
        this.formMid.page * this.formMid.count
      );
      const data = {
        url: "/innerdebug/fmDebug",
        params: {
          data: JSON.stringify(mids),
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res.code && res.code === 200) {
            this.midsDetail = res.data;
          } else {
            Message({
              showClose: true,
              message: res.msg || "mid详情查询失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "mid详情查询接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    handleSizeChange(val) {
      this.formMid.count = val;
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.formMid.page = val;
      this.onSearch();
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = `${this.curUid}_FM召回`;
        const tHeader = [
          "序号",
          "mid",
          "得分"
        ];
        const filterVal = [
          "index",
          "mid",
          "score"
        ];
        const data = this.formatJson(filterVal, this.midList);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, i) =>
        filterVal.map(j => {
          if (j === "index") {
            return i + 1;
          } else if (j === "mid"){
            return v[j].toString();
          } else {
            return v[j];
          }
        })
      );
    },
  },
  watch: {
    pageAuth() {}
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
      .table-title {
        padding: 5px 10px;
        color: #409eff;
        border-bottom: 2px solid #409eff;
        font-size: 14px;
      }
      .collapse-title {
        font-size: 14px;
        font-weight: bold;
      }
      .item-tag {
        margin-right: 5px;
        margin-top: 5px;
      }
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
      margin-right: 10px;
      font-size: 14px;
      color: #409eff;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>