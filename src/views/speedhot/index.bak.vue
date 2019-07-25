<template>
    <el-main v-if="pageAuth === 1" style="padding: 20px 0;">
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23">
          <el-form inline :model="formInline" label-position="right" label-width="70px" class="search-form">
            <!-- mid尾号 -->
            <el-form-item label="mid尾号" class="active">
              <el-select v-model="formInline.last_digit" multiple placeholder="请选择mid尾号，可多选" size="small" @change="handleLastDigit()">
                <el-option v-for="item in initoption.lastdigit" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 召回池 -->
            <!-- <el-form-item label="召回池">
              <el-select v-model="formInline.table_name" placeholder="请选择召回池" size="small">
                <el-option label="推荐物料" value="fast_recommend_materials"></el-option>
                <el-option label="冷启动" value="fast_fro_new_user_recommend_materials"></el-option>
              </el-select>
            </el-form-item> -->
            <!-- 领域 -->
            <el-form-item label="领域">
              <el-cascader v-model="formInline.cate" :options="initoption.cate" placeholder="请选择物料领域" :props="initoption.props" size="small" change-on-select>
              </el-cascader>
            </el-form-item>
            <el-form-item label="物料来源" v-if="materialSourceList">
              <el-select v-model="formInline.material_source" placeholder="请选择物料来源" size="small">
                <el-option label="全部" value=""></el-option>
                <el-option v-for="(val, key) in materialSourceList" :key="key" :label="val" :value="key">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 日期 -->
            <!-- <el-form-item label="日期">
              <el-date-picker v-model="formInline.date" size="small" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="timestamp" unlink-panels :picker-options="initoption.pickerOptions">
              </el-date-picker>
            </el-form-item> -->
            <!-- 排序方式 -->
            <el-form-item label="排序方式">
              <el-radio-group v-model="formInline.sort_type">
                <el-radio style="margin-left: 30px; padding: 10px 0" label="time">发布时间</el-radio>
                <el-radio style="padding: 10px 0" label="hot_num">热度</el-radio>
                <!-- <el-radio style="padding: 10px 0" label="expo">曝光数量</el-radio>
                <el-radio style="padding: 10px 0" label="click_num">点击数量</el-radio>
                <el-radio style="padding: 10px 0" label="click_rate">CTR</el-radio> -->
              </el-radio-group>
            </el-form-item>
            <!-- 物料状态 -->
            <!-- <el-form-item label="物料状态">
              <el-radio-group v-model="formInline.flag_check">
                <el-radio style="margin-left: 30px; padding: 10px 0" label="">全部</el-radio>
                <el-radio style="padding: 10px 0" :label="1">待审</el-radio>
                <el-radio style="padding: 10px 0" :label="0">已通过</el-radio>
                <el-radio style="padding: 10px 0" :label="-1">已删除</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <!-- 搜索方式 -->
            <el-form-item label="搜索方式">
              <el-select style="width: 70px;" v-model="way" placeholder="请选择" size="small">
                <el-option label="mid" value="mid"></el-option>
                <el-option label="uid" value="uid"></el-option>
              </el-select>
              <!-- <el-select v-model="content" multiple filterable allow-create default-first-option :placeholder="`输入内容 选中/回车分隔`" :no-data-text="`输入${way} 选中/回车分隔`" size="small">
                <el-option v-for="item in []" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
              <!-- <el-input style="width: 100%;max-width: 300px;" v-model="content" :placeholder="`请输入${way}`" clearable size="small"></el-input>
              <el-button icon="el-icon-search" type="primary" @click="onSearch()" size="small">
                <span class="hidden-xs-only">查询</span>
              </el-button> -->
            </el-form-item>
            <el-form-item>
              <el-input style="width: 100%;max-width: 320px;" v-model="content" :placeholder="`请输入${way}`" clearable size="small"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" type="primary" @click="onSearch()" size="small">
                <span class="hidden-xs-only">查询</span>
              </el-button>
            </el-form-item>
          </el-form>
          <!-- 审核列表 -->
          <!-- 是否全选 -->
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button type="success" size="mini" style="margin-left:20px;" @click="allPassEvent">勾选物料通过</el-button>
          <el-button type="danger" size="mini" @click="allDeleteEvent">勾选物料删除</el-button>
          <!-- 审核列表 -->
          <el-checkbox-group v-model="checkedMid" @change="handleCheckedMidChange" v-if="datalist && datalist.length > 0">
            <item-list :sourcelist="materialSourceList" :key="idx" :callback="onSearch" :item="item" :index="(formInline.page - 1) * formInline.count + idx + 1" v-for="(item, idx) in datalist"></item-list>
          </el-checkbox-group>
          <div v-else class="none-tips">暂无数据</div>
          <div style="padding-top: 10px;overflow: auto;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[5, 10, 20, 30, 40]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="formInline.total">
            </el-pagination>
          </div>
        </el-col>
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
import { category } from "@/utils/tagconf";
import { Message } from "element-ui";

const api_ip = 'http://10.41.15.147';

export default {
  name: "manage",
  components: {
    Auth,
    ItemList
  },
  data() {
    return {
      datalist: null,
      formInline: {
        last_digit: ["all"], // mid尾号
        table_name: "fast_recommend_materials", //召回池，默认为推荐物料
        cate: [""], //领域
        material_source: "", // 物料来源
        date: [], //时间
        sort_type: "time", //排序方式
        flag_check: "", //物料状态
        mid: [], //mid
        uid: [], //uid
        page: 1, //第几页
        count: 5, //每页显示的物料数量
        total: 0
      },
      initoption: {
        cate: [
          {
            tagid: "",
            name: "全部"
          },
          {
            tagid: "tags",
            name: "一级标签",
            children: category
          }
        ],
        lastdigit: [
          {
            value: "all",
            label: "全部"
          },
          {
            value: "0",
            label: 0
          },
          {
            value: "1",
            label: 1
          },
          {
            value: "2",
            label: 2
          },
          {
            value: "3",
            label: 3
          },
          {
            value: "4",
            label: 4
          },
          {
            value: "5",
            label: 5
          },
          {
            value: "6",
            label: 6
          },
          {
            value: "7",
            label: 7
          },
          {
            value: "8",
            label: 8
          },
          {
            value: "9",
            label: 9
          }
        ],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "最近三个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        props: {
          value: "tagid",
          label: "name"
        }
      },
      way: "mid", // 查询方式
      // content: [], // 查询内容
      content: "", // 查询内容
      isIndeterminate: false,
      checkAll: false,
      midList: [],
      checkedMid: [],
      deleteReason: "",
      materialSourceList: null,
    };
  },
  computed: {
    ...mapGetters(["email", "pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.formInline.date = [Date.now(), Date.now()];
        this.getMaterialSource();
      }
    },
    getMaterialSource() {
      const tempData = {
        url: `${api_ip}:6067/query_source_list`,
        param: {}
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(res => {
        // if (res.code && Number(res.code) == 200) {
        //   this.materialSourceList = res.data || null;
        // }
        this.materialSourceList = res || null;
        this.onSearch();
      });
    },
    onSearch() {
      // if (this.formInline.date.length == 0) {
      //   Message({
      //     showClose: true,
      //     message: "请选择查询时间！",
      //     type: "error",
      //     duration: 3000
      //   });
      //   return;
      // }
      // this.formInline[this.way] = this.content.join(",");
      this.formInline[this.way] = this.content;
      if (this.way == "mid") {
        this.formInline.uid = "";
      } else {
        this.formInline.mid = "";
      }

      const tempData = {
        url: `${api_ip}:6065/query_mid`,
        param: {
          mid: this.formInline.mid,
          uid: this.formInline.uid,
          last_digit:
            this.formInline.last_digit == "all"
              ? ""
              : this.formInline.last_digit.join(","),
          table_name: this.formInline.table_name,
          cate:
            this.formInline.cate[0] == "tags" ? this.formInline.cate[1] : "",
          material_source: this.formInline.material_source,
          sort_type: this.formInline.sort_type,
          // flag_check: this.formInline.flag_check,
          // start_stamp: this.formInline.date[0],
          // end_stamp: this.formInline.date[1],
          page: this.formInline.page,
          count: this.formInline.count
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetManageData", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
          this.datalist = res.data;
          this.formInline.total = res.total_length;
          this.setMidList(res.data);
        }
      });
    },
    setMidList(data) {
      this.midList = [];
      if (data && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          this.midList.push(data[i].mid);
        }
      }
    },
    handleCheckAllChange(val) {
      this.checkedMid = val ? this.midList : [];
      this.isIndeterminate = false;
    },
    handleCheckedMidChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.midList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.midList.length;
    },
    allPassEvent() {
      this.$confirm("所选物料将全部通过审核, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.passAction(this.checkedMid.join(','))
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消通过审核"
          });
        });
    },
    passAction(mids) {
      const tempData = {
        url: `${api_ip}:6069/update_mid`,
        param: {
          mids: mids,
          table_name: 'fast_recommend_materials', //推荐物料
          op_type: 'manual_pass',
          user: this.email
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("SetManageData", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.$message({
            type: "success",
            message: "所选物料已全部通过审核!"
          });
          //刷新页面
          this.onSearch();
        }
      });
    },
    allDeleteEvent() {
      this.$prompt("请输入删除原因", "删除所选物料", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputType: "textarea",
        // inputPattern: /[\s\S]/,
        // inputErrorMessage: "输入内容不能为空",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            this.deleteReason = instance.inputValue; // 获取删除原因
          }
          done();
        }
      })
        .then(() => {
          this.deleteAction(this.checkedMid, this.deleteReason);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    deleteAction(mids, reason) {
      const tempData = {
        url: `${api_ip}:6069/update_mid`,
        param: {
          mids: mids,
          table_name: 'fast_recommend_materials', //推荐物料
          op_type: 'delete',
          reason: reason,
          user: this.email
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("SetManageData", params).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.$message({
            type: "success",
            message: "删除成功！"
          });
          //刷新页面
          this.onSearch();
        }
      });
    },
    handleLastDigit() {
      if (
        this.formInline.last_digit.indexOf("all") != -1 &&
        this.formInline.last_digit.indexOf("all") != 0
      ) {
        this.formInline.last_digit = ["all"];
      } else if (
        this.formInline.last_digit.length >= 2 &&
        this.formInline.last_digit.indexOf("all") == 0
      ) {
        this.formInline.last_digit.splice(0, 1);
      }
    },
    handleSizeChange(val) {
      this.formInline.count = val;
      this.$store.dispatch("updateVideo", "");
      this.onSearch();
    },
    handleCurrentChange(val) {
      this.formInline.page = val;
      this.$store.dispatch("updateVideo", "");
      this.onSearch();
    }
  },
  created() {
    this.init();
  },
  watch: {
    email() {},
    pageAuth() {
      this.init();
    },
    datalist() {}
  }
};
</script>

<style lang="scss" scoped>
body {
  .el-main {
    padding: 20px 10px;
    color: #333;
    line-height: 100%;
    background-color: #f0f2f5;
  }
  .none-tips {
    margin-top: 10px;
    padding: 10px;
    font-size: 14px;
    text-align: center;
    color: #999;
    background-color: #fff;
    border-radius: 5px;
  }
  .search-form {
    padding-bottom: 10px;
  }
  .pane-title-wrap {
    margin-bottom: 10px;
    .pane-title {
      font-size: 20px;
      color: #409eff;
      text-align: center;
    }
  }
  .pane-form {
    padding: 20px;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border: 1px solid #ebebeb;
    border-radius: 3px;
  }
  .table-title {
    padding: 5px 20px;
    color: #409eff;
    border-bottom: 2px solid #409eff;
    margin-bottom: 10px;
  }
  .page-wrap {
    padding: 20px 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  .detail-active {
    font-size: 14px;
    span {
      color: #409eff;
      margin-left: 5px;
    }
  }
  .detial-row {
    margin-top: 10px;
    .el-col {
      margin-bottom: 10px;
    }
  }
  .sort-active {
    width: 95px;
  }
  .sort-active-tags {
    min-width: 170px;
    max-width: 230px;
  }
  .delete-reason {
    .el-checkbox {
      display: block;
      margin-left: 0;
    }
  }
  .content-a {
    position: relative;
    display: block;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .time-and-from {
    line-height: 30px;
    font-size: 12px;
    a {
      color: #909399;
    }
    span {
      color: #606266;
    }
  }
  .content-left {
    width: 30%;
    float: left;
  }
  a:hover {
    color: rgb(255, 208, 75);
  }
}
</style>
