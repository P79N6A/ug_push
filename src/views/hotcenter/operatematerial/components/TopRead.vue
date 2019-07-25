<template>
  <div>
    <div class="pane-form">
      <el-dialog
        title="过已读置顶操作"
        :visible.sync="dialogVisible"
      >
        <el-form
          :model="goTopReadForm"
          :rules="goTopReadRules"
          label-width="100px"
          size="small"
        >
          <el-form-item
            label="物料类型"
            prop="flow"
          >
            <el-checkbox-group v-model="goTopReadForm.flow">
              <el-checkbox label="1">混合流</el-checkbox>
              <el-checkbox label="2">访客流</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item
            label="微博mid"
            prop="mid"
          >
            <el-input
              v-model.trim="goTopReadForm.mid"
              placeholder="请输入mid，多个值英文逗号分隔"
              type="textarea"
              :autosize="{ minRows: 2}"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            style="margin-right: 10px;margin-bottom: 5px;"
            type="success"
            size="small"
            @click="goTopReadEvent()"
          >添加置顶</el-button>
          <el-button
            style="margin-left: 0;"
            type="warning"
            size="small"
            @click="clearTopReadEvent()"
          >清空置顶</el-button>
        </div>
      </el-dialog>
      <div class="clearfix"><h6 class="table-title left">已置顶mid列表</h6></div>
      <div class="clearfix">
        <el-button
          class="left"
          plain
          size="mini"
          @click="delTopMidsEvent()"
        >批量取消</el-button>
        <el-button
          class="right"
          type="primary"
          plain
          size="mini"
          @click="dialogVisible = true;"
        >添加/清空 置顶</el-button>
      </div>
      <el-table
        :data="midList"
        style="width: 100%"
        size="mini"
        :default-sort="{prop: 'mid', order: 'ascending'}"
        @selection-change="handleSelectionChange"
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
          prop="mid"
          label="mid"
          sortable
          min-width="140"
        >
          <template slot-scope="scope">
            <a class="link-btn" :href="`https://m.weibo.cn/status/${scope.row.mid}`" target="_blank">{{scope.row.mid}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="flow"
          label="物料类型"
          sortable
          min-width="100"
        >
          <template slot-scope="scope">{{scope.row.flow === '1' ? '混合流' : '访客流'}}</template>
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
              @click="delTopReadEvent(scope.row)"
            >取消置顶</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pane-form">
      <el-radio-group
        v-model="operateForm.ext"
        size="mini"
        @change="getRecords"
      >
        <el-radio
          label="混合流通用置顶"
          border
        >混合流置顶_操作记录</el-radio>
        <el-radio
          label="访客流通用置顶"
          border
        >访客流置顶_操作记录</el-radio>
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
  name: "GoTopReadPane",
  data() {
    return {
      dialogVisible: false,
      selectMids: [], // 批量勾选的mids
      midList: [], // 混合流与访客流汇总的mids，已格式化数据，用于渲染table
      mixMids: [], // 混合流mids
      visitMids: [], // 访客流mids
      recordData: [],
      goTopReadForm: {
        mid: "",
        flow: ["1"]
      },
      goTopReadRules: {
        flow: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个流",
            trigger: "change"
          }
        ]
      },
      operateForm: {
        ext: "混合流通用置顶"
      }
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
      this.selectMids = [];
      this.midList = [];
      this.mixMids = [];
      this.visitMids = [];
      this.getTopMids("mix_common_top");
      this.getTopMids("visit_common_top");
      this.getRecords();
    },
    //获取已置顶的mids
    getTopMids(name) {
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
            this.setMids(name, res.data.split(","));
          } else {
            this.setMids(name, []);
          }
        },
        err => {
          this.setMids(name, []);
          Message({
            showClose: true,
            message: "获取置顶mid接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    //混合流mids、访客流mids、汇总mids格式化为数组
    setMids(type, mids) {
      if (type === "mix_common_top") {
        this.mixMids = mids;
        this.midList = this.midList.concat(this.formatMids("1", mids));
      } else {
        this.visitMids = mids;
        this.midList = this.midList.concat(this.formatMids("2", mids));
      }
    },
    // mids格式化为table渲染所需的数据结构
    formatMids(flow, arr) {
      const res = [];
      for (let i = 0; i < arr.length; i++) {
        res.push({
          mid: arr[i],
          flow
        });
      }
      return res;
    },
    // 全量置顶mids请求
    setTopReadMids(flow, mids) {
      return new Promise((resolve, reject) => {
        const mid = Array.from(new Set(mids));
        // 需要置顶的全量mid为空时，调用清空接口
        if (mid.length < 1) {
          this.clearTopReadAction(flow).then(
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
          url: `${domain}/3/admin/setCommonTop`,
          param: {
            flow,
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
    // 添加置顶前校验与确认
    goTopReadEvent() {
      if (!this.goTopReadForm.mid) {
        Message({
          showClose: true,
          message: "mid不能为空！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.goTopReadForm.flow.length < 1) {
        Message({
          showClose: true,
          message: "请至少选择一个物料类型！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将置顶所填mid, 是否继续?", "确认置顶", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.goTopReadAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    // 添加置顶
    goTopReadAction() {
      let mids = this.goTopReadForm.mid.split(",");
      //混合流与访客流同时添加
      if (this.goTopReadForm.flow.length === 2) {
        Promise.all([
          this.setTopReadMids(1, mids.concat(this.mixMids)), // 参数2，合并混合流已置顶的mids
          this.setTopReadMids(2, mids.concat(this.visitMids)) // 参数2，合并访客流已置顶的mids
        ]).then(
          res => {
            this.init();
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
              message: "添加置顶失败！",
              type: "error",
              duration: 3000
            });
          }
        );
      } else if (this.goTopReadForm.flow[0] === "1") {
        // 只添加混合流
        this.setTopReadMids(1, mids.concat(this.mixMids)).then(
          res => {
            this.init();
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
              message: "混合流添加置顶失败！",
              type: "error",
              duration: 3000
            });
          }
        );
      } else if (this.goTopReadForm.flow[0] === "2") {
        // 只添加访客流
        this.setTopReadMids(2, mids.concat(this.visitMids)).then(
          res => {
            this.init();
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
              message: "访客流添加置顶失败！",
              type: "error",
              duration: 3000
            });
          }
        );
      }
    },
    // 清空置顶确认
    clearTopReadEvent(flow) {
      this.$confirm("将清空置顶的mid, 是否继续?", "确认清空置顶", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.clearTopReadAction(flow).then(
            res => {
              this.init();
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
                message: "清空置顶失败！",
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
    // 清空置顶请求
    clearTopReadAction(flow) {
      return new Promise((resolve, reject) => {
        const tempData = {
          url: `${domain}/3/admin/delCommonTop`,
          param: {
            flow,
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
    // 取消单个置顶的mid确认
    delTopReadEvent(obj) {
      this.$confirm(`将取消置顶的mid：${obj.mid}, 是否继续?`, "确认取消", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.delTopReadAction(obj);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    // 取消单个置顶的mid
    delTopReadAction(obj) {
      if (obj.flow === "1") {
        let index = this.mixMids.indexOf(obj.mid);
        this.mixMids.splice(index, 1);
        this.setTopReadMids(1, this.mixMids).then(
          res => {
            this.init();
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
              message: "混合流取消置顶失败！",
              type: "error",
              duration: 3000
            });
          }
        );
      } else {
        let index = this.visitMids.indexOf(obj.mid);
        this.visitMids.splice(index, 1);
        this.setTopReadMids(2, this.visitMids).then(
          res => {
            this.init();
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
              message: "访客流取消置顶失败！",
              type: "error",
              duration: 3000
            });
          }
        );
      }
    },
    handleSelectionChange(val) {
      this.selectMids = val;
    },
    // 批量取消置顶的mid确认
    delTopMidsEvent() {
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
          this.delTopMidsAction(this.selectMids);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
    },
    // 批量取消置顶的mid
    delTopMidsAction(arr) {
      let deleteMix = false;
      let deleteVisit = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].flow === "1") {
          deleteMix = true;
          let index = this.mixMids.indexOf(arr[i].mid);
          this.mixMids.splice(index, 1);
        } else {
          deleteVisit = true;
          let index = this.visitMids.indexOf(arr[i].mid);
          this.visitMids.splice(index, 1);
        }
      }
      //批量勾选的mids包含混合流与访客流
      if (deleteMix && deleteVisit) {
        Promise.all([
          this.setTopReadMids(1, this.mixMids),
          this.setTopReadMids(2, this.visitMids)
        ]).then(
          res => {
            this.init();
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
              message: "批量取消置顶失败！",
              type: "error",
              duration: 3000
            });
          }
        );
      } else if (deleteMix) {
        // 批量勾选的mids只有混合流
        this.setTopReadMids(1, this.mixMids).then(
          res => {
            this.init();
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
              message: "批量取消置顶失败！",
              type: "error",
              duration: 3000
            });
          }
        );
      } else if (deleteVisit) {
        // 批量勾选的mids只有访客流
        this.setTopReadMids(2, this.visitMids).then(
          res => {
            this.init();
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
              message: "批量取消置顶失败！",
              type: "error",
              duration: 3000
            });
          }
        );
      }
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
            message: "置顶操作记录接口请求失败！",
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
.table-title {
  padding: 5px 20px;
  color: #409eff;
  border-bottom: 2px solid #409eff;
  margin-bottom: 10px;
}
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
.text-info {
  font-size: 12px;
  color: #e6a23c;
}
</style>
