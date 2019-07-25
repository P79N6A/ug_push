<template>
  <div>
    <el-row class="search-form-wrap">
      <el-form
        inline
        :model="formInline"
        size="small"
      >
        <el-form-item>
          <el-input
            placeholder="请输入mid"
            v-model.trim="formInline.mid"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSearch"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="content-box-wrap">
      <el-dialog
        v-if="tipsObj"
        title="物料库屏蔽失败详情"
        :visible.sync="dialogVisible"
      >
        <el-table style="width: 100%" size="mini" :data="['物料库屏蔽失败详情']">
          <el-table-column label="屏蔽成功mids" min-width="130">
            <template slot-scope="scope">
              <a class="link-btn" :title="scope.row" :href="`https://m.weibo.cn/status/${mid}`" target="_blank" :key="n" v-for="(mid, n) in tipsObj.data">{{mid}}<br /></a>
            </template>
          </el-table-column>
          <el-table-column label="不在物料库mids" min-width="130">
            <template slot-scope="scope">
              <a class="link-btn" :title="scope.row" :href="`https://m.weibo.cn/status/${mid}`" target="_blank" :key="n" v-for="(mid, n) in tipsObj.notin">{{mid}}<br /></a>
            </template>
          </el-table-column>
          <el-table-column label="屏蔽失败mids" min-width="130">
            <template slot-scope="scope">
              <a class="link-btn" :title="scope.row" :href="`https://m.weibo.cn/status/${mid}`" target="_blank" :key="n" v-for="(mid, n) in tipsObj.field">{{mid}}<br /></a>
            </template>
          </el-table-column>
        </el-table>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            size="small"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>
      <div
        v-if="dataList && dataList.length > 0"
      >
        <el-checkbox
          style="margin-left: 12px;"
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >全选</el-checkbox>
        <!-- 前端屏蔽&&物料屏蔽 -->
        <el-checkbox-group
          style="display:inline-block;margin-left: 30px;"
          v-model="checkedOption"
        >
          <el-checkbox
            v-for="(val, key) in option"
            :label="key"
            :key="key"
          >{{val}}</el-checkbox>
          <el-button
            style="marginLeft:20px"
            type="primary"
            plain
            size="small"
            @click="shieldEvent"
          >批量屏蔽</el-button>
        </el-checkbox-group>
        <span class="show-tip-btn" v-if="tipsObj" @click="dialogVisible = true">物料库屏蔽失败详情</span>
      </div>
      <div v-if="dataList && dataList.length > 0">
        <el-checkbox-group
          v-model="checkedMid"
          @change="checkedMidChange"
        >
          <div
            :key="index"
            v-for="(item, index) in dataList"
          >
            <template>
              <el-row v-if="item">
                <el-col
                  :xs="24"
                  :sm="23"
                  :md="23"
                  :lg="23"
                  :xl="23"
                  class="item-wrapper"
                >
                  <el-row>
                    <div class="item-status-box clearfix">
                      <!-- 复选框 -->
                      <el-checkbox
                        :label="item.mid"
                        :key="index"
                      >No.{{index+1}} {{item.mid}}</el-checkbox>
                    </div>
                  </el-row>
                  <item-list :item="item"></item-list>
                </el-col>
              </el-row>
            </template>
          </div>
        </el-checkbox-group>
      </div>
      <p
        v-else
        class="none-tips"
      >暂无数据</p>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import ItemList from "./ItemList";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "GroupShieldPane",
  components: {
    ItemList
  },
  data() {
    return {
      dialogVisible: false,
      formInline: {
        mid: "",
        cip: 189
      },
      dataList: [],
      midArray: [],
      option: {
        front: "前端屏蔽",
        library: "物料库屏蔽"
      },
      checkedOption: ["front", "library"],
      isIndeterminate: false,
      checkAll: false,
      checkedMid: [],
      tipsObj: false, // 物料库屏蔽没有全部成功时提示
      // tipsObj: {
      //   data: [4379089202604479, 4379567697386843],
      //   notin: [4379567697386843],
      //   field: [789]
      // },
      frontShieldMids: []
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.resetData();
      this.getFrontShield();
    },
    getFrontShield() {
      const tempData = {
        url: `${domain}/3/admin/getDegradeValue`,
        param: {
          name: "fe_common_black_mid",
          staff: this.email,
          source: source
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res.data) {
            this.frontShieldMids = res.data.split(",");
          } else {
            this.frontShieldMids = [];
          }
        },
        err => {
          this.frontShieldMids = [];
          Message({
            showClose: true,
            message: "获取前端已屏蔽mids接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    // 数据重置
    resetData() {
      this.midArray = [];
      this.isIndeterminate = false;
      this.checkAll = false;
      this.checkedMid = [];
      this.dataList = [];
      this.tipsObj = false;
    },
    // 批量屏蔽获取选中mid
    shieldEvent() {
      let arr = Array.prototype.slice.call(this.checkedMid);
      if (!this.checkedOption || this.checkedOption.length < 1) {
        Message({
          showClose: true,
          message: "请选择至少一种屏蔽类型！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (arr.length < 1) {
        Message({
          showClose: true,
          message: "请勾选需要屏蔽的mid！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将屏蔽所选mid, 是否继续?", "确认屏蔽", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.tipsObj = false; // 清除物料库屏蔽提示
          //前端屏蔽
          if (this.checkedOption.indexOf("front") > -1) {
            this.frontShield(arr);
          }
          //物料库屏蔽
          if (this.checkedOption.indexOf("library") > -1) {
            this.libraryShield(arr);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    frontShield(arr) {
      const temp = arr.concat(this.frontShieldMids); // 合并前端已屏蔽的mids与勾选mids
      const mids = Array.from(new Set(temp)); // 去重
      const tempData = {
        url: `${domain}/3/admin/setBlackMid`,
        param: {
          data: mids.join(","),
          staff: this.email,
          source: source
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (Number(res.code) === 200) {
            Message({
              showClose: true,
              message: "前端屏蔽成功！",
              type: "success",
              duration: 1000
            });
            this.getFrontShield();
          } else {
            Message({
              showClose: true,
              message: "前端屏蔽失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "前端屏蔽接口请求失败！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    libraryShield(arr) {
      const data = {
        url: "/shield/delMid",
        params: {
          mids: arr.join(","),
          username: this.email,
          cip: 189
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (Number(res.code) == 200) {
            Message({
              showClose: true,
              message: "物料库屏蔽成功！",
              type: "success",
              duration: 1000
            });
            this.tipsObj = false;
          } else {
            Message({
              showClose: true,
              message: "物料库没有全部屏蔽成功，请看屏蔽结果详情！",
              type: "warning",
              duration: 0
            });
            this.tipsObj = {
              data: res.data || [],
              notin: res.notin || [],
              field: res.field || []
            };
          }
        },
        err => {
          this.tipsObj = false;
          Message({
            showClose: true,
            message: "物料库屏蔽接口请求失败！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    checkedMidChange(value) {
      let checkedCount = value.length;
      this.checkAll =
        Array.prototype.slice.call(this.checkedMid).length ==
        this.midArray.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.midArray.length;
    },
    // 全选
    handleCheckAllChange(val) {
      this.checkedMid = val ? this.midArray : [];
      this.isIndeterminate = false;
    },
    onSearch() {
      if (this.checkedOption.length == 0) {
        Message({
          showClose: true,
          message: "请勾选屏蔽标签！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.formInline.mid) {
        Message({
          showClose: true,
          message: "请输入要查询的mid！",
          type: "error",
          duration: 3000
        });
        return;
      }
      const tempData = {
        url: "http://mlplat.intra.weibo.com/shield/similar",
        param: {
          ...this.formInline,
          username: this.email
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.resetData();
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            Message({
              showClose: true,
              message: "success",
              type: "success",
              duration: 1000
            });
            this.dataList = res.data || [];
            // 获取res.data中的全部mid
            for (let i = 0; i < this.dataList.length; i++) {
              this.midArray.push(this.dataList[i].mid);
            }
          } else {
            Message({
              showClose: true,
              message: res.msg || "GroupID屏蔽数据请求失败",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "GroupID屏蔽接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    }
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
      padding: 40px 10px 10px;
    }
    .none-tips {
      padding: 20px 0;
      text-align: center;
      color: #999;
    }
    .link-btn {
      color: #409EFF;
      &:hover {
        text-decoration: underline;
      }
    }
    .show-tip-btn {
      margin-left: 10px;
      font-size: 14px;
      color: #E6A23C;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .item-wrapper {
    margin-top: 10px;
    padding: 15px 10px 4px;
    background-color: #fafafa;
    font-size: 16px;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border: 2px solid #f0f2f5;
    border-radius: 5px;
    .item-status-box {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #eee;
      span,
      a {
        color: #666;
        font-size: 14px;
      }
      .item-status-mid {
        font-weight: bold;
        text-decoration: underline;
        &:hover {
          color: #409eff;
        }
      }
      .item-mid-info {
        padding-top: 10px;
        font-size: 14px;
        color: #e6a23c;
      }
    }
  }
}
</style>