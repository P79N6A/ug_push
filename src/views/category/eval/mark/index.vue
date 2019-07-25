<template>
  <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <el-col
        :span="24"
        class="clearfix"
      >
        <h6 class="pane-title left">
          <i
            class="el-icon-document hidden-xs-only"
            style="margin-right: 6px;"
          ></i>物料内容评估</h6>
      </el-col>
    </el-row>
    <el-row class="search-form-wrap">
      <el-col
        :span="24"
        v-if="!tips"
      >
        <el-form
          inline
          :model="formInline"
          label-position="left"
          size="mini"
        >
          <el-form-item label="日期">
            <el-date-picker
              style="margin-bottom: 5px;width: 170px;"
              v-model="formInline.exposure_date"
              type="date"
              format="yyyy年MM月dd日"
              value-format="timestamp"
              placeholder="选择曝光日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="查看">
            <el-select
              v-model="formInline.total"
              placeholder="请选择曝光排行"
              clearable
            >
              <el-option
                label="曝光Top 100"
                value="100"
              > </el-option>
              <el-option
                label="曝光Top 500"
                value="500"
              > </el-option>
              <el-option
                label="曝光Top 1000"
                value="1000"
              > </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="一级标签">
            <el-select
              v-model="formInline.first_tagid"
              placeholder="请选择一级标签"
              filterable
              clearable
            >
              <el-option v-for="(item, index) in firstTagList" :label="item.first_tagname" :key='index' :value="item.first_tagid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="筛选条件"
          >
            <el-input
              v-model.trim="formInline.sel"
              type="textarea"
              autosize
              placeholder="输入查询条件"
              clearable
            ></el-input>
            <div style="position: relative;">
              <span
                class="info-tips"
                @click="showConditions = !showConditions;"
              >{{showConditions ? '收起' : '查看'}}筛选条件（表格可滚动）</span>
              <div
                v-if="showConditions"
                class="tips-table"
              >
                <el-table
                  :data="conditionsList"
                  style="width: 100%"
                  border
                  size="mini"
                  max-height="340"
                >
                  <el-table-column
                    prop="sel_sql"
                    label="字段名"
                  ></el-table-column>
                  <el-table-column
                    prop="name"
                    label="含义"
                  ></el-table-column>
                </el-table>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="onSearch"
            >
              <span class="hidden-xs-only">查询</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col
        :span="24"
        v-else
      >
        <el-alert
          :title="tips"
          type="warning"
          show-icon
          :closable="false"
        >
        </el-alert>
      </el-col>
    </el-row>
    <el-row class="content-box-wrap" v-if="!tips">
      <el-form
        inline
        size="mini"
      >
        <el-form-item
          label="评估分级"
          label-width="72px"
        >
          <el-radio-group
            v-model="level"
            @change="handleLevel"
          >
            <el-radio label="2">2级</el-radio>
            <el-radio label="3">3级</el-radio>
            <el-radio label="5">5级</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-show="level">
          <el-form-item label="Title">
            <el-input
              v-model.trim="title"
              style="max-width: 360px;"
              placeholder="请填写评分标题"
              clearable
            ></el-input>
          </el-form-item>
          <div><span class="table-title">分级意义：</span></div>
          <el-form-item
            :key="idx"
            v-for="(val, idx) in levelMap[level]"
            :label="`${idx}分`"
          >
            <el-input
              v-model.trim="levelMap[level][idx]"
              style="max-width: 360px;"
              type="textarea"
              autosize
              :placeholder="`请填写${idx}分意义`"
              clearable
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-col :span="24">
        <div
          v-if="dataList && dataList.length > 0"
          style="padding: 10px 0;"
          class="clearfix"
        >
          <el-button
            type="primary"
            size="mini"
            class="left"
            @click="submitEvent()"
          >提交评估</el-button>
          <div
            class="left params-wrapper"
            id="paramsDom"
          >
            <span
              class="params-title"
              @click="showParamList = !showParamList"
            >列表属性选择 <i class="el-icon-caret-bottom" /></span>
            <div
              v-show="showParamList"
              class="params-box"
            >
              <el-checkbox-group v-model="paramChecked">
                <el-checkbox
                  style="margin-left: 10px;display: block;"
                  :key="key"
                  v-for="(val, key) in paramList"
                  :label="key"
                >{{val}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <el-button
            type="danger"
            size="mini"
            class="right"
            title="批量导出全部 Excel"
            :loading="downloadAllLoading"
            @click="handleDownloadAll"
          >
            <span>导出全部</span>
          </el-button>
          <el-button
            style="margin-right: 5px;"
            type="warning"
            size="mini"
            class="right"
            title="批量导出当前页数据 Excel"
            :loading="downloadCurLoading"
            @click="handleDownloadCur"
          >
            <span>导出当前页</span>
          </el-button>
        </div>
        <el-row v-if="dataList">
          <el-table
            :data="dataList"
            style="width: 100%"
            border
            stripe
            size="mini"
          >
            <el-table-column
              fixed
              type="index"
              label="序号"
              width="50px"
            ></el-table-column>
            <el-table-column
              width="130"
              prop="mid"
              label="mid"
            >
              <template slot-scope="scope">
                <a
                  class="link-btn"
                  :href="`//m.weibo.cn/status/${scope.row.mid}`"
                  target="_blank"
                  title="跳转至微博详情页"
                >{{scope.row.mid}}</a>
              </template>
            </el-table-column>
            <el-table-column
              width="90"
              prop="uid"
              label="uid"
            >
              <template slot-scope="scope">
                <a
                  class="link-btn"
                  :href="`//weibo.com/u/${scope.row.uid}`"
                  target="_blank"
                  title="跳转至微博主页"
                >{{scope.row.uid}}</a>
              </template>
            </el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('user_name') > -1"
              prop="user_name"
              label="昵称"
              min-width="90px"
            >
              <template slot-scope="scope">
                <a
                  :class="scope.row.user_name ? 'link-btn' : 'errorBtn'"
                  :href="`//weibo.com/u/${scope.row.uid}`"
                  target="_blank"
                  title="跳转至微博主页"
                >{{scope.row.user_name || scope.row.uid || '未知'}}</a>
              </template>
            </el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('field_name') > -1"
              prop="field_name"
              label="领域"
            >
              <template slot-scope="scope">{{scope.row.field_name || '未知'}}</template>
            </el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('release_date') > -1"
              prop="release_date"
              label="发布时间"
              min-width="80px"
            ></el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('F_level') > -1"
              prop="F_level"
              label="F层级"
              width="60px"
            ></el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('C_level') > -1"
              prop="C_level"
              label="C层级"
              width="60px"
            ></el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('is_local') > -1"
              prop="is_local"
              label="是否本地用户本地发布"
              width="142px"
            ><template slot-scope="scope">{{scope.row.is_local == 1 ? '是': '否'}}</template>
            </el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('is_star') > -1"
              prop="is_star"
              label="是否纯明星"
              width="82px"
            ><template slot-scope="scope">{{scope.row.is_star == 1 ? '是': '否'}}</template></el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('is_fans') > -1"
              prop="is_fans"
              label="是否粉丝团"
              width="82px"
            ><template slot-scope="scope">{{scope.row.is_fans == 1 ? '是': '否'}}</template></el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('is_full_pc') > -1"
              prop="is_full_pc"
              label="是否全景图"
              width="82px"
            ><template slot-scope="scope">{{scope.row.is_full_pc == 1 ? '是': '否'}}</template></el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('is_video') > -1"
              prop="is_video"
              label="是否视频"
              width="80px"
            ><template slot-scope="scope">{{scope.row.is_video == 1 ? '是': '否'}}</template></el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('is_article') > -1"
              prop="is_article"
              label="是否纯文本"
              width="82px"
            ><template slot-scope="scope">{{scope.row.is_article == 1 ? '是': '否'}}</template></el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('is_marketing') > -1"
              prop="is_marketing"
              label="是否营销号"
              width="82px"
            ><template slot-scope="scope">{{scope.row.is_marketing == 1 ? '是': '否'}}</template></el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('is_pay') > -1"
              prop="is_pay"
              label="是否付费阅读"
              width="100px"
            ><template slot-scope="scope">{{scope.row.is_pay == 1 ? '是': '否'}}</template></el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('is_praise_pic') > -1"
              prop="is_praise_pic"
              label="是否带求赞图"
              width="100px"
            ><template slot-scope="scope">{{scope.row.is_praise_pic == 1 ? '是': '否'}}</template></el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('exposure') > -1"
              prop="exposure"
              label="曝光量"
              min-width="90px"
              sortable
            >
              <template slot-scope="scope">{{_formatNum(scope.row.exposure)}}</template>
            </el-table-column>
            <el-table-column
              v-if="paramChecked.indexOf('exposure_date') > -1"
              prop="exposure_date"
              label="曝光日期"
              width="80px"
            ></el-table-column>
            <el-table-column
              label="打分"
              fixed="right"
              width="250px"
            >
              <template slot-scope="scope">
                <operate
                  v-if="level"
                  :data="scope.row"
                  :level="level"
                  @scoreChange="handleScore"
                ></operate>
                <span v-else class="info-tips">请先选择评估分级</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="备注" fixed="right" min-width="200px">
                <template slot-scope="scope">
                    <el-input placeholder="请输入备注" clearable></el-input>
                </template>
            </el-table-column> -->
          </el-table>
          <div style="padding-top: 10px;overflow: auto;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="formInline.page"
              :page-sizes="[5, 10, 20]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import { formatNum } from "@/utils";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";
import Operate from "./operate";
import UploadExcel from "../../components/UploadExcel";

export default {
  name: "MaterialMark",
  components: {
    Auth,
    Operate,
    UploadExcel
  },
  data() {
    return {
      apiConf: {
        //API
        getUserRole: "/role/getUserRole",
        getMaterialInfo: "/material/getList", //获取物料信息列表
        getConditions: "/material/getSelList", //获取筛选条件表
        addMark: "/material/addMark", //提交评估
        getFirstSecondTag: "/tag/getFirstSecondTag" //获取一二级标签
      },
      showConditions: false,
      conditionsList: [],
      firstTagList: [],
      downloadAllLoading: false,
      downloadCurLoading: false,
      paramChecked: [
        "user_name",
        "field_name",
        "release_date",
        "F_level",
        "C_level",
        "exposure",
        "exposure_date"
      ],
      paramList: {
        "user_name": "昵称",
        "field_name": "领域",
        "release_date": "发布时间",
        "F_level": "F层级",
        "C_level": "C层级",
        "is_local": "是否本地用户本地发布",
        "is_star": "是否纯明星",
        "is_fans": "是否粉丝团",
        "is_full_pc": "是否全景图",
        "is_video": "是否视频",
        "is_article": "是否纯文本",
        "is_marketing": "是否营销号",
        "is_pay": "是否付费阅读",
        "is_praise_pic": "是否带求赞图",
        "exposure": "曝光量",
        "exposure_date": "曝光日期"
      },
      showParamList: false,
      total: 0,
      formInline: {
        total: "", //曝光排行类型
        exposure_date: "", //查询日期 时间戳
        sel: "", //筛选条件
        first_tagid: "", //一级标签
        page: 1,
        count: 10
      },
      title: "",
      level: "",
      levelMap: {
        2: {
          "1": "",
          "0": ""
        },
        3: {
          "1": "",
          "0": "",
          "-1": ""
        },
        5: {
          "1": "",
          "2": "",
          "3": "",
          "4": "",
          "5": ""
        }
      },
      dataList: [],
      markMap: {},
      tips: "loading..." //暂无有权限的领域
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getFirstTag()
        this.getConditions();
        this.getUserRole();
      }
    },
    getUserRole() {
      const data = {
        url: this.apiConf.getUserRole,
        params: {
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            if (res.result && res.result.permission.indexOf(15) > -1) {
              //判断是否有权限
              this.tips = "";
              this.onSearch();
            } else {
              this.tips = "暂无物料内容评估权限";
            }
          } else {
            this.tips = "暂无物料内容评估权限";
          }
        },
        err => {
          this.tips = "接口异常";
        }
      );
    },
    getConditions() {
      let params = {
        username: this.email,
        cip: 230
      };
      const data = {
        url: this.apiConf.getConditions,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.conditionsList = res.result || [];
        }
      });
    },
    getFirstTag() {
      let data = {
        url : this.apiConf.getFirstSecondTag
      }
      this.$store.dispatch("CommonGet", data).then( res => {
        if (res.code && res.code === 200) {
          this.firstTagList = res.data;
        } else {
          Message({
            showClose: true,
            message: res.msg,
            type: "error",
            duration: 1000
          });
        }
      }, error => {
        Message({
            showClose: true,
            message: "获取一级标签列表失败",
            type: "error",
            duration: 1000
          });
      })
    },
    onSearch() {
      let params = {
        ...this.formInline,
        username: this.email,
        cip: 230
      };
      const data = {
        url: this.apiConf.getMaterialInfo,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            this.total = res.total || 0;
            this.dataList = res.result || [];
          } else {
            Message({
              showClose: true,
              message: res.msg || "物料信息获取失败",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "物料信息接口请求错误",
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
    },
    handleLevel(val) {
      this.markMap = {};
    },
    handleScore(obj) {
      this.markMap[obj.mid] = obj.data;
    },
    handleDownloadAll() {
      this.downloadAllLoading = true;
      const params = {
        total: this.formInline.total, //曝光排行类型
        exposure_date: this.formInline.exposure_date, //查询日期 时间戳
        sel: this.formInline.sel, //筛选条件
        page: 1,
        count: this.total,
        username: this.email,
        cip: 230
      }
      const data = {
        url: this.apiConf.getMaterialInfo,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.downloadAll(res.result || []);
        } else {
          this.downloadAllLoading = false;
          Message({
            showClose: true,
            message: res.msg || "物料信息获取失败",
            type: "error",
            duration: 0
          });
        }
      }, err => {
        this.downloadAllLoading = false;
        Message({
          showClose: true,
          message: res.msg || "物料信息接口请求错误",
          type: "error",
          duration: 0
        });
      });
    },
    downloadAll(list) {
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "物料内容评估";
        const {tHeader, filterVal} = this.getTableConf();
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadAllLoading = false;
      });
    },
    handleDownloadCur() {
      this.downloadCurLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "物料内容评估";
        const {tHeader, filterVal} = this.getTableConf();
        const list = this.dataList;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        this.downloadCurLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, i) =>
        filterVal.map(j => {
          if (j === "index") {
            return i + 1;
          } if (j === "user_name") {
            return `http://weibo.com/u/${v['uid']}`;
          } else if (j === "is_local" || j === "is_star" || j === "is_fans" || j === "is_full_pc" || j === "is_video" || j === "is_article" || j === "is_marketing" || j === "is_pay" || j === "is_praise_pic") {
            return v[j] === 1 ? "是" : "否";``
          } else {
            return typeof v[j] === 'number' ? v[j].toString() : v[j];
          }
        })
      );
    },
    getTableConf() {
      const arr = this.paramChecked;
      let tHeader = ["序号", "mid", "uid"];
      let filterVal = ["index", "mid", "uid"];
      if (arr && arr.length > 0) {
        for (let i =0; i<arr.length; i++) {
          tHeader.push(this.paramList[arr[i]]);
          filterVal.push(arr[i]);
        }
      }
      return {tHeader, filterVal};
    },
    _formatNum(num) {
      return formatNum(num);
    },
    isLevelText() {
      // 判断分级意义是否填写
      const obj = this.levelMap[this.level];
      for (let k in obj) {
        if (obj[k] === "") {
          return false;
        }
      }
      return true;
    },
    submitEvent() {
      if (!this.level) {
        Message({
          showClose: true,
          message: "请选择评估分级！",
          type: "error",
          duration: 0
        });
        return;
      }
      if (!this.title) {
        Message({
          showClose: true,
          message: "请填写评分标题！",
          type: "error",
          duration: 0
        });
        return;
      }
      if (!this.isLevelText()) {
        Message({
          showClose: true,
          message: "请填写分级意义！",
          type: "error",
          duration: 0
        });
        return;
      }
      if (JSON.stringify(this.markMap) === "{}") {
        Message({
          showClose: true,
          message: "评估数量为0，请打分！",
          type: "error",
          duration: 0
        });
        return;
      }
      this.$confirm("批量提交评估结果, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.addMark();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消评估提交！"
          });
        });
    },
    addMark() {
      const state = this.levelMap[this.level];
      const mark = Object.keys(this.markMap).map(key => this.markMap[key]); // 转为数组
      let params = new URLSearchParams();
      params.append("title", this.title);
      params.append("level", this.level);
      params.append("state", JSON.stringify(state));
      params.append("mark", JSON.stringify(mark));
      params.append("username", this.email);
      params.append("cip", 230);
      const data = {
        url: this.apiConf.addMark,
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            Message({
              showClose: true,
              message: "评估提交成功！",
              type: "success",
              duration: 1000
            });
          } else {
            Message({
              showClose: true,
              message: res.msg || "评估提交失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "评估提交接口请求错误",
            type: "error",
            duration: 0
          });
        }
      );
    },
    autoHide(evt) {
      const paramsDom = document.getElementById("paramsDom");
      if (paramsDom && !paramsDom.contains(evt.target)) {
        this.showParamList = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.autoHide, false);
  },
  destroyed() {
    document.removeEventListener("click", this.autoHide, false);
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
    .tips-table {
      position: absolute;
      top: 30px;
      left: 0px;
      z-index: 99;
      width: 100%;
      opacity: 0.9;
      border: 1px solid #eee;
      border-radius: 5px;
      box-shadow: #eee 1px 1px 2px 2px;
    }
  }
  .content-box-wrap {
    padding: 10px;
    .params-wrapper {
      position: relative;
      margin-left: 10px;
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      .params-title {
        color: #409eff;
        cursor: pointer;
      }
      .params-box {
        z-index: 9;
        position: absolute;
        top: 36px;
        left: 0;
        padding: 5px;
        min-width: 220px;
        left: -46px;
        background-color: rgba(255, 255, 255, 0.8);
        border: 1px solid #eee;
        border-radius: 5px;
        box-shadow: 1px 1px 2px 2px #eee;
      }
    }
  }
}
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
.errorBtn {
  color: #f56c6c;
  &:hover {
    text-decoration: underline;
  }
}
.info-tips {
  font-size: 14px;
  color: #ebb563;
  cursor: pointer;
}
.table-title {
  display: inline-block;
  padding: 5px 10px;
  color: #409eff;
  border-bottom: 2px solid #409eff;
  margin-bottom: 10px;
}
</style>