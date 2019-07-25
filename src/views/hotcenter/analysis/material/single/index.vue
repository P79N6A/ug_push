<template>
  <el-main v-if="pageAuth === 1" style="padding: 20px 14px;">
    <el-row type="flex" align="middle" justify="left">
      <el-col :sm="8" :md="6" :lg="4" :xl="2" class="main-title">
        <i class="el-icon-goods hidden-xs-only"></i>热门微博物料查询
      </el-col>
      <el-col :sm="16" :md="12" :lg="8" :xl="4">
        <el-form :inline="true" size="small">
          <el-form-item>
            <el-input style="width: 200px" v-model.trim="formInline.mid" placeholder="请输入mid查询物料" clearable @focus="focusEvent()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" :loading="formInline.loading" @click="onSearch"><span class="hidden-xs-only">查询</span></el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row v-if="tips" type="flex" justify="center">
      <el-col class="error-msg">
        <el-alert :title="tips" type="warning" show-icon :closable="false">
        </el-alert>
      </el-col>
    </el-row>
    <el-row type="flex" align="middle" justify="center" v-if="authorInfo && authorInfo.user" class="thumb-box">
      <el-col :title="`进入<${authorInfo.user.name}>的主页`">
        <el-row type="flex" align="middle" class="thumb-wrap">
          <a style="display:inline-block;font-size:12px;color:#606266;" :href="`//weibo.com/${authorInfo.user.profile_url}`" target="_blank">
            <pan-thumb class="thumb-content" :image="authorInfo.user.avatar_hd" width="60px" height="60px">{{authorInfo.user.name}}</pan-thumb>
          </a>
          <a class="author-name" :title="authorInfo.user.name" :href="`//weibo.com/${authorInfo.user.profile_url}`" target="_blank">{{authorInfo.user.name}}</a>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-if="authorInfo && authorInfo.user" class="thumb-box" style="margin-left:2%;">
      <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
        <span class="info-label" style="color:#e65d6e;">【关注数】</span>
        <span class="info-value">{{_formatNum(authorInfo.user.friends_count)}}</span>
      </el-col>
      <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
        <span class="info-label" style="color:#30b08f;">【粉丝数】</span>
        <span class="info-value">{{_formatNum(authorInfo.user.followers_count)}}</span>
      </el-col>
      <el-col :xs="24" :sm="5" :md="5" :lg="5" :xl="5">
        <span class="info-label" style="color:#4ab7bd;">【发博量】</span>
        <span class="info-value">{{_formatNum(authorInfo.user.statuses_count)}}</span>
      </el-col>
      <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4" v-if="authorType">
        <span class="info-label" style="color:#fec171;">【V类型】</span>
        <span class="info-value">{{authorType.vtype}}</span>
      </el-col>
      <el-col :xs="24" :sm="4" :md="4" :lg="4" :xl="4" v-if="authorType">
        <span class="info-label" style="color:#3a71a8;">【Clevel】</span>
        <span class="info-value">{{authorType.clevel}}</span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" v-if="authorInfo" class="content-box">
      <el-col>
        <el-row>
          <a class="info-link" target="_blank" :href="authorInfo.link">查看微博</a>
        </el-row>
        <el-popover ref="content" placement="top" trigger="hover" :content="authorInfo.text" popper-class="content-pop" :visible-arrow="false">
        </el-popover>
        <el-row v-popover:content class="content-text">{{authorInfo.text}}</el-row>
      </el-col>
    </el-row>
    <el-row class="table-wrap" v-if="list">
      <el-col :span="24" style="margin-bottom: 10px;">
        <div class="table-title left">物料详情</div>
        <el-table :data="list" style="width: 100%;border: 1px solid #f0f2f5" stripe :summary-method="getSummaries" show-summary sum-text="总计" size="mini">
          <el-table-column width="50" type="index" align="center" fixed label="序号">
          </el-table-column>
          <el-table-column align="center" width="70" prop="age" label="年龄" :filters="[{text: '70后', value: '70'},{text: '80后', value: '80'},{text: '90后', value: '90'},{text: '00后', value: '00'},{text: '其他', value: 'other'},{text: '全部', value: 'all'}]" :filter-method="filterHandler">
            <template slot-scope="scope">
              <el-tag :type="scope.row.age === 'all' ? 'danger' : 'success'">{{ setAge(scope.row.age) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" width="70" prop="sex" label="性别" :filters="[{text: '男性', value: 'male'},{text: '女性', value: 'female'},{text: '其他', value: 'other'},{text: '全部', value: 'all'}]" :filter-method="filterHandler">
            <template slot-scope="scope">
              <el-tag :type="scope.row.sex === 'all' ? 'danger' : 'warning'">{{ setSex(scope.row.sex) }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column sortable align="center" min-width="90" prop="expose_num" label="曝光量" :formatter="setNum">
          </el-table-column>
          <el-table-column sortable align="center" min-width="110" prop="real_read_uv" label="真实曝光量" :formatter="setNum">
          </el-table-column>
          <el-table-column sortable align="center" min-width="90" prop="act_num" label="点击量" :formatter="setNum">
          </el-table-column>
          <el-table-column sortable align="center" min-width="90" prop="act_rate" label="点击率">
            <template slot-scope="scope">
              <el-tag :type="Number(scope.row.act_num) === 0 ? 'danger' : 'primary'">{{_parsePercent(scope.row.act_rate)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column sortable align="center" min-width="90" prop="inter_act_num" label="互动量" :formatter="setNum">
          </el-table-column>
          <el-table-column sortable align="center" min-width="90" prop="inter_act_rate" label="互动率">
            <template slot-scope="scope">
              <el-tag :type="Number(scope.row.inter_act_num) === 0 ? 'danger' : 'primary'">{{_parsePercent(scope.row.inter_act_rate)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column sortable align="center" min-width="140" prop="real_read_duration" label="真实阅读时长(秒)" :formatter="setNum">
          </el-table-column>
          <el-table-column sortable align="center" min-width="160" prop="real_read_duration_rate" label="真实人均阅读时长(秒)" :formatter="setNum">
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <div class="table-title left">标签权重</div>
        <el-table :data="materialData.content_tag" style="width: 100%" border stripe size="mini">
          <el-table-column align="left" prop="tagid" label="标签ID">
          </el-table-column>
          <el-table-column align="left" prop="name" label="标签名" :formatter="setTagName" show-overflow-tooltip>
          </el-table-column>
          <el-table-column sortable align="left" prop="rel_weight" label="权重">
            <template slot-scope="scope">
              <el-tag type="primary">{{_parsePercent(scope.row.rel_weight)}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
    <auth></auth>
  </el-main>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { formatNum, parsePercent } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "querymaterial",
  components: {
    Auth,
    PanThumb
  },
  data() {
    return {
      formInline: {
        mid: "",
        loading: false
      },
      searchTimer: null,
      list: null,
      tips: null,
      materialData: null
    };
  },
  computed: {
    ...mapGetters(["materialInfo", "authorInfo", "authorType", "pageAuth"])
  },
  methods: {
    onSearch() {
      if(!this.formInline.mid) {
        Message({
          showClose: true,
          message: "请输入要查询的mid",
          type: "error",
          duration: 3000
        })
        return;
      }
      this.formInline.loading = true;
      if (!this.searchTimer) {
        //请求超时处理
        this.setTimer();
      }
      const tempData = {
        url: "http://10.85.115.126:8077/get_mid_info",
        param: {
          mid: this.formInline.mid
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetMaterial", params);
      this.getAuthor();
    },
    getAuthor() {
      const batchData = {
        url: "http://mlplat.intra.weibo.com/lab/showbatch",
        param: {
          ids: this.formInline.mid
        }
      };
      const batchParam = {
        data: JSON.stringify(batchData),
        cip: 230
      };

      const typeData = {
        url: "http://172.16.105.67:8091/newtest1011/getMidPersona.html",
        param: {
          mid: this.formInline.mid
        }
      };
      const typeParam = {
        data: JSON.stringify(typeData),
        cip: 230
      };
      this.$store.dispatch("ShowBatch", batchParam);
      this.$store.dispatch("AuthorType", typeParam);
    },
    setTimer() {
      //请求5s后查询按钮解锁
      const that = this;
      this.searchTimer = setTimeout(() => {
        that.formInline.loading && (that.formInline.loading = false);
        that.searchTimer = null;
      }, 5000);
    },
    focusEvent() {
      this.formInline.loading && (this.formInline.loading = false);
    },
    setSex(cellValue) {
      let res = "其他";
      switch (cellValue) {
        case "male":
          res = "男性";
          break;
        case "female":
          res = "女性";
          break;
        case "other":
          res = "其他";
          break;
        case "all":
          res = "全部";
          break;
        default:
          res = "其他";
      }
      return res;
    },
    setAge(cellValue) {
      if (cellValue == "other") {
        return "其他";
      } else if (cellValue == "all") {
        return "全部";
      } else {
        return `${cellValue}后`;
      }
    },
    setNum(row, column, cellValue) {
      return formatNum(cellValue);
    },
    setTagName(row, column, cellValue) {
      return cellValue.trim() || "未知";
    },
    getSummaries(options) {
      const { columns, data } = options;
      let sums = [];
      if (this.materialData) {
        const act_rate = this.materialData.real_read_uv
          ? parsePercent(
              this.materialData.act_num / this.materialData.real_read_uv
            )
          : "0%";
        const inter_act_rate = this.materialData.real_read_uv
          ? parsePercent(
              this.materialData.inter_act_num / this.materialData.real_read_uv
            )
          : "0%";
        const real_read_duration_rate = this.materialData.real_read_uv
          ? formatNum(
            this.materialData.real_read_duration / this.materialData.real_read_uv
            )
          : 0;
        sums = [
          "合计",
          "所有年龄",
          "所有性别",
          formatNum(this.materialData.expose_num),
          formatNum(this.materialData.real_read_uv),
          formatNum(this.materialData.act_num),
          act_rate,
          formatNum(this.materialData.inter_act_num),
          inter_act_rate,
          formatNum(this.materialData.real_read_duration),
          real_read_duration_rate
        ];
      }
      return sums;
    },
    _formatNum(num) {
      return formatNum(num);
    },
    _parsePercent(num) {
      return parsePercent(num);
    },
    analyData() {
      const data = this.materialData.age_gender_expose_rate;
      this.list = [];
      let ageAll = {
        age70: {
          age: "70",
          sex: "all",
          expose_num: 0, // 曝光量
          real_read_uv: 0, // 真实曝光量
          act_num: 0, // 点击量
          inter_act_num: 0, // 互动量
          real_read_duration: 0 // 真实阅读时长
        },
        age80: {
          age: "80",
          sex: "all",
          expose_num: 0,
          real_read_uv: 0,
          act_num: 0,
          inter_act_num: 0,
          real_read_duration: 0
        },
        age90: {
          age: "90",
          sex: "all",
          expose_num: 0,
          real_read_uv: 0,
          act_num: 0,
          inter_act_num: 0,
          real_read_duration: 0
        },
        age00: {
          age: "00",
          sex: "all",
          expose_num: 0,
          real_read_uv: 0,
          act_num: 0,
          inter_act_num: 0,
          real_read_duration: 0
        },
        ageother: {
          age: "other",
          sex: "all",
          expose_num: 0,
          real_read_uv: 0,
          act_num: 0,
          inter_act_num: 0,
          real_read_duration: 0
        }
      };
      let sexAll = {
        sexmale: {
          age: "all",
          sex: "male",
          expose_num: 0,
          real_read_uv: 0,
          act_num: 0,
          inter_act_num: 0,
          real_read_duration: 0
        },
        sexfemale: {
          age: "all",
          sex: "female",
          expose_num: 0,
          real_read_uv: 0,
          act_num: 0,
          inter_act_num: 0,
          real_read_duration: 0
        },
        sexother: {
          age: "all",
          sex: "other",
          expose_num: 0,
          real_read_uv: 0,
          act_num: 0,
          inter_act_num: 0,
          real_read_duration: 0
        }
      };
      for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        if (!(obj.age != "other" && obj.sex == "other")) {
          //70后其他、80后其他、90后其他、00后其他去除
          this.addList(obj);
        }

        ageAll[`age${obj.age}`]["expose_num"] += obj.expose_num; // 曝光量
        ageAll[`age${obj.age}`]["real_read_uv"] += obj.real_read_uv; // 真实曝光量
        ageAll[`age${obj.age}`]["act_num"] += obj.act_num; // 点击量
        ageAll[`age${obj.age}`]["inter_act_num"] += obj.inter_act_num; // 互动量
        ageAll[`age${obj.age}`]["real_read_duration"] += obj.real_read_duration; // 真实阅读时长

        sexAll[`sex${obj.sex}`]["expose_num"] += obj.expose_num; // 曝光量
        sexAll[`sex${obj.sex}`]["real_read_uv"] += obj.real_read_uv; // 真实曝光量
        sexAll[`sex${obj.sex}`]["act_num"] += obj.act_num; // 点击量
        sexAll[`sex${obj.sex}`]["inter_act_num"] += obj.inter_act_num; // 互动量
        sexAll[`sex${obj.sex}`]["real_read_duration"] += obj.real_read_duration; // 真实阅读时长
      }
      this.addList(ageAll.age70);
      this.addList(ageAll.age80);
      this.addList(ageAll.age90);
      this.addList(ageAll.age00);
      this.addList(ageAll.ageother);
      this.addList(sexAll.sexmale);
      this.addList(sexAll.sexfemale);
      this.addList(sexAll.sexother);
    },
    addList(data) {
      let act_rate = 0; // 点击量
      let inter_act_rate = 0; // 互动率
      let real_read_duration_rate = 0; //人均阅读时长
      if (data.real_read_uv) {
        act_rate = data.act_num / data.real_read_uv; // 点击量/真实曝光量
        inter_act_rate = data.inter_act_num / data.real_read_uv; // 互动量/真实曝光量
        real_read_duration_rate = data.real_read_duration / data.real_read_uv; // 阅读时长 / 真实曝光量
      }
      data["act_rate"] = act_rate;
      data["inter_act_rate"] = inter_act_rate;
      data["real_read_duration_rate"] = real_read_duration_rate;
      this.list.push(data);
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  },
  watch: {
    materialInfo() {
      if (this.materialInfo) {
        this.formInline.loading = false;
        this.tips = this.materialInfo.msg;
        if (
          this.materialInfo.data &&
          this.materialInfo.data.age_gender_expose_rate
        ) {
          this.materialData = this.materialInfo.data;
          this.analyData();
        }
      }
    },
    pageAuth() {},
    authorInfo() {},
    authorType() {}
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
    padding: 20px 14px;
    // background-color: #f0f2f5;
    color: #333;
    line-height: 100%;
  }
  .error-msg {
    margin-bottom: 20px;
    border: 1px solid #e8e7e7;
    border-radius: 5px;
  }
  .main-title {
    font-size: 16px;
    margin-bottom: 22px;
    color: #337ab7;
    text-align: center;
  }
  .table-wrap {
    margin-bottom: 20px;
  }
  .table-title {
    padding: 5px 20px;
    color: #409eff;
    border-bottom: 2px solid #409eff;
    margin-bottom: 10px;
  }
  .thumb-box {
    margin-bottom: 20px;
    .thumb-wrap {
      .thumb-content {
        cursor: pointer;
      }
      .author-name {
        margin-left: 5px;
        font-size: 14px;
        color: #606266;
        &:hover {
          color: #409eff;
          text-decoration: underline;
        }
      }
    }
    .info-label {
      display: inline-block;
      padding-bottom: 10px;
      color: #606266;
    }
    .info-value {
      font-size: 16px;
    }
  }
  .content-box {
    margin-bottom: 20px;
    .info-link {
      display: inline-block;
      margin-bottom: 10px;
      &:hover {
        color: #409eff;
        text-decoration: underline;
      }
    }
    .content-text {
      padding: 15px;
      width: 80%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      color: #606266;
      font-size: 14px;
      line-height: 18px;
      border: 1px solid #e8e7e7;
      border-radius: 5px;
      background-color: #fff;
    }
  }
}
</style>
<style lang="scss">
body {
  .content-pop {
    max-width: 60%;
    background: #303133;
    color: #fff;
  }
}
</style>
