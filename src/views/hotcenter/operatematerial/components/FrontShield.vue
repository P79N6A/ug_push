<template>
  <div>
    <div class="pane-form">
      <el-radio-group
        v-model="type"
        size="small"
      >
        <el-radio-button
          style="margin-bottom: 20px;"
          :key="val"
          v-for="(label, val) in typeMap"
          :label="val"
        >{{label}}</el-radio-button>
      </el-radio-group>
      <div v-if="type === 'mid'">
        <el-form
          size="small"
          label-width="70px"
          label-position="left"
        >
          <el-form-item label="查询微博">
            <el-input
              style="max-width: 360px;"
              v-model.trim="searchForm.nickname"
              placeholder="输入用户昵称"
              clearable
            ></el-input>
            <el-input
              style="max-width: 360px;"
              v-model.trim="searchForm.keyword"
              placeholder="输入关键词"
              clearable
            ></el-input>
            <el-button
              type="primary"
              plain
              size="mini"
              @click="getMid()"
            >查询mid</el-button>
            <div v-if="filterMids && filterMids.length > 0">
              <div
                :key="mid"
                v-for="mid in filterMids"
              >
                <el-checkbox @change="(val) => {handleCheckedMid(val, mid)}"><a
                    class="link-btn"
                    :href="`https://m.weibo.cn/status/${mid}`"
                    target="_blank"
                  >{{mid}}</a> 加入到mid输入框</el-checkbox>
              </div>
            </div>
            <div v-else class="text-info">{{filterTips}}</div>
          </el-form-item>
          <el-form-item label="微博mid">
            <el-input
              style="max-width: 360px;"
              v-model.trim="shieldForm.mid"
              placeholder="请输入mid，多个值英文逗号分隔"
              type="textarea"
              :autosize="{ minRows: 2}"
            ></el-input>
            <div>
              <el-checkbox v-model="checkedMaterial">同时执行物料库屏蔽</el-checkbox>
            </div>
            <el-button
              type="success"
              plain
              size="mini"
              @click="setMidsEvent()"
            >添加屏蔽</el-button>
          </el-form-item>
          <el-form-item v-if="tipsObj">
            <div class="shield-result-box">
              <h6 class="shield-resul-title">物料库屏蔽结果详情</h6>
              <div v-if="tipsObj.data && tipsObj.data.length > 0" class="clearfix">
                <label style="width: 100px;" class="text-success left">屏蔽成功mids：</label>
                <div class="clearfix left">
                  <a class="link-mid left" :href="`https://m.weibo.cn/status/${mid}`" target="_blank" :key="n" v-for="(mid, n) in tipsObj.data">{{mid}}</a>
                </div>
              </div>
              <div v-if="tipsObj.notin && tipsObj.notin.length > 0" class="clearfix">
                <label style="width: 100px;" class="text-info left">不在物料库mids：</label>
                <div class="clearfix left">
                  <a class="link-mid left" :href="`https://m.weibo.cn/status/${mid}`" target="_blank" :key="n" v-for="(mid, n) in tipsObj.notin">{{mid}}</a>
                </div>
              </div>
              <div v-if="tipsObj.field && tipsObj.field.length > 0" class="clearfix">
                <label style="width: 100px;" class="success-error left">屏蔽失败mids：</label>
                <div class="clearfix left">
                  <a class="link-mid left" :href="`https://m.weibo.cn/status/${mid}`" target="_blank" :key="n" v-for="(mid, n) in tipsObj.field">{{mid}}</a>
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div class="clearfix">
          <el-button
            class="left"
            plain
            size="mini"
            @click="delMidListEvent()"
          >批量取消</el-button>
          <el-button
            class="left"
            type="danger"
            plain
            size="mini"
            @click="clearMidsEvent()"
          >清空屏蔽mid</el-button>
        </div>
        <el-table
          :data="midList"
          style="width: 100%"
          size="mini"
          @selection-change="handleSelectMid"
          border
        >
          <el-table-column
            type="selection"
            width="80"
            fixed="left"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="mid"
            min-width="140"
          >
            <template slot-scope="scope"><a class="link-btn" :href="`https://m.weibo.cn/status/${scope.row}`" target="_blank">{{scope.row}}</a></template>
          </el-table-column>
          <el-table-column
            label="单条操作"
            width="100px"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="delMidEvent(scope.row)"
              >取消屏蔽</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="type === 'keyword'">
        <el-form
          size="small"
          label-width="90px"
          label-position="left"
        >
          <el-form-item label="微博关键词">
            <el-input
              style="max-width: 360px;"
              v-model.trim="shieldForm.keyword"
              placeholder="请输入keyword,同一组用逗号分隔，不同组用｜分割"
              type="textarea"
              :autosize="{ minRows: 2}"
            ></el-input>
            <el-button
              type="success"
              plain
              size="mini"
              @click="setKeywordsEvent()"
            >添加屏蔽</el-button>
          </el-form-item>
        </el-form>
        <div class="clearfix">
          <el-button
            class="left"
            plain
            size="mini"
            @click="delKeywordListEvent()"
          >批量取消</el-button>
        </div>
        <el-table
          :data="keywordList"
          style="width: 100%"
          size="mini"
          @selection-change="handleSelectKeyword"
          border
        >
          <el-table-column
            type="selection"
            width="80"
            fixed="left"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="组合关键词"
            min-width="140"
          >
            <template slot-scope="scope">{{scope.row}}</template>
          </el-table-column>
          <el-table-column
            label="单条操作"
            width="100px"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="delKeywordEvent(scope.row)"
              >取消屏蔽</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pane-form">
      <el-radio-group
        v-model="operateForm.ext"
        size="mini"
        @change="getRecords"
      >
        <el-radio
          label="前端屏蔽mid"
          border
        >屏蔽mid_操作记录</el-radio>
        <el-radio
          label="前端敏感词"
          border
        >屏蔽关键词_操作记录</el-radio>
      </el-radio-group>
      <el-table
        :data="recordData"
        style="width: 100%"
        class="table-wrap"
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "FrontShieldPane",
  data() {
    return {
      type: "mid",
      typeMap: {
        mid: "屏蔽mid",
        keyword: "屏蔽关键词"
      },
      midList: [],
      keywordList: [],
      selectMids: [],
      selectKeywords: [],
      recordData: [],
      shieldForm: {
        mid: "",
        keyword: ""
      },
      operateForm: {
        ext: "前端屏蔽mid"
      },
      searchForm: {
        nickname: "", // 用户昵称
        keyword: "" // 关键词
      },
      filterMids: [], // 用户昵称+关键词查询的mids
      filterTips: "", // "暂无相关数据"
      checkedMaterial: true, // 是否同时执行物料库屏蔽
      tipsObj: false // 物料库屏蔽没有全部成功时提示
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
      this.initMids();
      this.initKeywords();
    },
    initMids() {
      this.midList = [];
      this.selectMids = [];
      this.getShieldData("fe_common_black_mid").then(res => {
        this.midList = res.sort().reverse();
      });
      this.getRecords();
    },
    initKeywords() {
      this.keywordList = [];
      this.selectKeywords = [];
      this.getShieldData("fe_black_word").then(res => {
        this.keywordList = res;
      });
      this.getRecords();
    },
    handleCheckedMid(checked, mid) {
      let arr = this.shieldForm.mid ? this.shieldForm.mid.split(",") : [];
      const index = arr.indexOf(mid.toString());
      if (checked && index === -1) {
        // 勾选mid不在输入框
        arr.push(mid);
      } else if (!checked && index > -1) {
        // 取消勾选mid在输入框
        arr.splice(index, 1);
      }
      this.shieldForm.mid = arr.join(",");
    },
    getMid() {
      if (!this.searchForm.nickname) {
        Message({
          showClose: true,
          message: "请输入用户昵称！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.searchForm.keyword) {
        Message({
          showClose: true,
          message: "请输入关键词！",
          type: "error",
          duration: 3000
        });
        return;
      }
      const data = {
        url: "/innerdebug/getMblog",
        params: {
          ...this.searchForm,
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if(Number(res.code) == 200) {
            this.filterMids = res.data || [];
            this.filterTips = "";
          } else {
            this.filterMids = [];
            this.filterTips = res.msg || "暂无相关数据";
          }
        },
        err => {
          this.filterMids = [];
          Message({
            showClose: true,
            message: "mid查询接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    getShieldData(name) {
      return new Promise((resolve, reject) => {
        const tempData = {
          url: `${domain}/3/admin/getDegradeValue`,
          param: {
            name,
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
              const result =
                name === "fe_common_black_mid" ? res.data.split(",") : res.data;
              resolve(result);
            } else {
              resolve([]);
            }
          },
          err => {
            Message({
              showClose: true,
              message: "获取屏蔽内容接口请求失败！",
              type: "error",
              duration: 3000
            });
            resolve([]);
          }
        );
      });
    },
    clearMidsAction() {
      return new Promise((resolve, reject) => {
        const tempData = {
          url: `${domain}/3/admin/delBlackMid`,
          param: {
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
              resolve();
            } else {
              reject();
            }
          },
          err => {
            reject();
          }
        );
      });
    },
    setBlackMids(mids) {
      return new Promise((resolve, reject) => {
        const mid = Array.from(new Set(mids)); // 去重
        // 需要屏蔽的全量mid为空时，调用清空接口
        if (mid.length < 1) {
          this.clearMidsAction().then(
            res => {
              resolve();
            },
            err => {
              reject();
            }
          );
          return;
        }
        const tempData = {
          url: `${domain}/3/admin/setBlackMid`,
          param: {
            data: mid.join(","),
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
              resolve();
            } else {
              reject();
            }
          },
          err => {
            reject();
          }
        );
      });
    },
    setMidsEvent() {
      if (!this.shieldForm.mid) {
        Message({
          showClose: true,
          message: "mid不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将屏蔽所填mid, 是否继续?", "确认屏蔽", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          const mids = this.midList.concat(this.shieldForm.mid.split(","));
          this.setBlackMids(mids).then(
            res => {
              this.initMids();
              Message({
                showClose: true,
                message: "Success",
                type: "success",
                duration: 1000
              });
            },
            err => {
              Message({
                showClose: true,
                message: "mid屏蔽失败！",
                type: "error",
                duration: 3000
              });
            }
          );
          if (this.checkedMaterial) { // 同时执行物料库屏蔽
            const content = Array.from(new Set(this.shieldForm.mid.split(","))); // 去重
            const data = {
              url: "/shield/delMid",
              params: {
                mids: content.join(','),
                username: this.email,
                cip: 189
              }
            };
            this.$store.dispatch("CommonGet", data).then(
              res => {
                if(Number(res.code) == 200) {
                  Message({
                    showClose: true,
                    message: "Success",
                    type: "success",
                    duration: 1000
                  });
                  this.tipsObj  = false;
                } else {
                  Message({
                    showClose: true,
                    message: "物料库没有全部屏蔽成功，请看屏蔽结果详情！",
                    type: "warning",
                    duration: 3000
                  });
                  this.tipsObj = {
                    data: res.data || [],
                    notin: res.notin || [],
                    field: res.field || []
                  }
                }
              },
              err => {
                this.tipsObj  = false;
                Message({
                  showClose: true,
                  message: "物料库屏蔽接口请求失败！",
                  type: "error",
                  duration: 3000
                });
              }
            );
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    delMidEvent(mid) {
      this.$confirm(`将取消屏蔽mid：${mid}, 是否继续?`, "确认取消", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.delMidListAction([mid]);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    delMidListEvent() {
      if (this.selectMids.length < 1) {
        Message({
          showClose: true,
          message: "请勾选需要取消的mid！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将批量取消勾选的mid, 是否继续?", "确认取消", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.delMidListAction(this.selectMids);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    delMidListAction(arr) {
      let tempMids = JSON.parse(JSON.stringify(this.midList));
      for (let i = 0; i < arr.length; i++) {
        let index = tempMids.indexOf(arr[i]);
        tempMids.splice(index, 1);
      }
      this.setBlackMids(tempMids).then(res => {
        this.initMids();
        Message(
          {
            showClose: true,
            message: "Success",
            type: "success",
            duration: 1000
          },
          err => {
            Message({
              showClose: true,
              message: "取消屏蔽失败！",
              type: "error",
              duration: 3000
            });
          }
        );
      });
    },
    clearMidsEvent() {
      this.$confirm("将清空屏蔽的mid, 是否继续?", "确认清空屏蔽", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.clearMidsAction().then(
            res => {
              this.initMids();
              Message({
                showClose: true,
                message: "Success",
                type: "success",
                duration: 1000
              });
            },
            err => {
              Message({
                showClose: true,
                message: "清空屏蔽mid失败！",
                type: "error",
                duration: 3000
              });
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    setKeywordsEvent() {
      let keywords = [];
      if (this.shieldForm.keyword) {
        const keyArr = this.shieldForm.keyword.split("|");
        for (let i = 0; i < keyArr.length; i++) {
          if (keyArr[i]) {
            keywords.push(keyArr[i]);
          }
        }
      }
      if (!this.shieldForm.keyword || keywords.length < 1) {
        Message({
          showClose: true,
          message: "关键词组不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将屏蔽所填关键词组, 是否继续?", "确认屏蔽", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.setKeywords(keywords, "set");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    setKeywords(keywords, action) {
      const keyword = Array.from(new Set(keywords)); // 去重
      const tempData = {
        url: `${domain}/3/admin/setBlackWords`,
        param: {
          data: JSON.stringify(keyword),
          action,
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
            this.initKeywords();
            Message({
              showClose: true,
              message: "Success",
              type: "success",
              duration: 1000
            });
          } else {
            Message({
              showClose: true,
              message: "操作关键词失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "操作关键词接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    delKeywordEvent(keyword) {
      this.$confirm(`将取消屏蔽关键词组：${keyword}, 是否继续?`, "确认取消", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.setKeywords([keyword], "del");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    delKeywordListEvent() {
      if (this.selectKeywords.length < 1) {
        Message({
          showClose: true,
          message: "请勾选需要取消的关键词组！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将批量取消勾选的关键词组, 是否继续?", "确认取消", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.setKeywords(this.selectKeywords, "del");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    handleSelectMid(val) {
      this.selectMids = val;
    },
    handleSelectKeyword(val) {
      this.selectKeywords = val;
    },
    getRecords() {
      const tempData = {
        url: `${domain}/3/admin/getalllog`,
        param: {
          ext: this.operateForm.ext,
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
          if (res.list) {
            this.recordData = res.list;
          } else {
            this.recordData = [];
          }
        },
        err => {
          this.recordData = [];
          Message({
            showClose: true,
            message: "操作记录接口请求失败！",
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
.pane-form {
  margin-top: 10px;
  padding: 20px;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
    0 2px 4px 0 rgba(232, 237, 250, 0.5);
  border: 1px solid #ebebeb;
  border-radius: 3px;
}
.table-wrap {
  margin-top: 10px;
}
.link-btn {
  text-decoration: underline;
  &:hover {
    color: #eb7350;
  }
}
.text-info {
  font-size: 12px;
  color: #e6a23c;
}
.text-success {
  font-size: 12px;
  color: #67C23A;
}
.success-error {
  font-size: 12px;
  color: #F56C6C;
}
.link-mid {
  margin-right: 10px;
  font-size: 12px;
  text-decoration: underline;
  &:hover {
    color: #eb7350;
  }
}
.shield-result-box {
  border-top: 1px dashed #ccc;
  border-bottom: 1px solid #ccc;
  .shield-resul-title {color: #666;}
}
</style>