<template>
    <el-main v-if="pageAuth === 1" style="padding: 20px 14px;">
      <el-row>
        <el-col :xs="24" :span="13">
          <panel-group :total="statList" @handleSetProjectType="handleSetProjectType"></panel-group>
        </el-col>
        <el-col :xs="24" :span="10">
          <todo-list :readonly="readonly"></todo-list>
        </el-col>
      </el-row>
      <el-form inline :model="formInline" size="small">
        <el-form-item label="分类：" style="background-color: #fff;padding: 0 10px;border-radius: 3px;">
          <el-radio-group v-model="formInline.type" size="mini">
            <el-radio style="margin-left: 0" label="">全部</el-radio>
            <el-radio style="margin-left: 10px" :label="1">A级</el-radio>
            <el-radio style="margin-left: 10px" :label="2">B级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态：" style="background-color: #fff;padding: 0 10px;border-radius: 3px;">
          <el-radio-group v-model="formInline.state" size="mini">
            <el-radio style="margin-left: 0px" label="">全部</el-radio>
            <el-radio style="margin-left: 10px" :label="1">进行中</el-radio>
            <el-radio style="margin-left: 10px" :label="2">已完成</el-radio>
            <el-radio style="margin-left: 10px" :label="3">已关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="完成日期">
                    <el-date-picker v-model="formInline.date" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy年MM月dd日" value-format="timestamp" unlink-panels :picker-options="pickerOptions" size="small">
                    </el-date-picker>
                </el-form-item> -->
        <el-form-item>
          <el-input style="max-width: 300px;" v-model="formInline.name" placeholder="请输入项目名称" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSearch">
            <span class="hidden-xs-only">查询</span>
          </el-button>
        </el-form-item>
      </el-form>
      <div class="table-title-wrap clearfix">
        <span class="table-title left">项目列表</span>
        <el-button v-if="!readonly" type="success" size="mini" class="right" @click="showAdd()">添加</el-button>
      </div>
      <el-dialog title="添加项目" :visible.sync="dialogVisible" width="60%">
        <el-form :model="formAdd" size="small">
          <el-form-item label="项目名称" required>
            <el-input style="max-width: 300px;" v-model="formAdd.name" placeholder="请输入项目名称" size="small" clearable></el-input>
          </el-form-item>
          <el-form-item label="分类" required>
            <el-radio-group v-model="formAdd.type" size="small">
              <el-radio :label="1">A级</el-radio>
              <el-radio :label="2">B级</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="状态" required>
            <el-radio-group v-model="formAdd.state" size="small">
              <el-radio :label="1">进行中</el-radio>
              <el-radio :label="2">已完成</el-radio>
              <el-radio :label="3">已关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="需 求 人" required>
            <el-input style="max-width: 300px;" v-model="formAdd.demander" placeholder="请输入项目需求人 多个用值用英文逗号(,)分隔" size="small" clearable></el-input>
          </el-form-item>
          <el-form-item label="负 责 人" required>
            <el-input style="max-width: 300px;" v-model="formAdd.responsible" placeholder="请输入项目负责人 多个用值用英文逗号(,)分隔" size="small" clearable></el-input>
          </el-form-item>
          <el-form-item label="参 与 者" required>
            <el-input type="textarea" style="max-width: 300px;" v-model="formAdd.participant" placeholder="请输入项目参与者 多个用值用英文逗号(,)分隔" size="small" clearable></el-input>
          </el-form-item>
          <el-form-item label="项目描述">
            <el-input type="textarea" style="max-width: 300px;" v-model="formAdd.describe" placeholder="请输入项目描述" size="small" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-popover ref="popoverAdd" placement="top" width="200" v-model="addPopover">
            <p>确定提交项目？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="addPopover = false">取消</el-button>
              <el-button type="primary" round size="mini" @click="addEvent()">提交</el-button>
            </div>
          </el-popover>
          <el-button @click="cancelEvent()" size="small">取 消</el-button>
          <el-button type="primary" v-popover:popoverAdd size="small">添 加</el-button>
        </div>
      </el-dialog>
      <el-row v-if="proList">
        <el-table :data="proList" style="width: 100%" border stripe>
          <el-table-column prop="name" label="项目名称"></el-table-column>
          <el-table-column width="50" prop="type" label="类型">
            <template slot-scope="scope">
              <span>{{getType(scope.row.type)}}</span>
            </template>
          </el-table-column>
          <el-table-column width="70" prop="state" label="状态">
            <template slot-scope="scope">
              <span>{{getState(Number(scope.row.state))}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="describe" label="项目描述"></el-table-column>
          <el-table-column prop="demander" label="项目需求人">
            <template slot-scope="scope">
              <a class="link-btn" :key="idx" v-for="(val, idx) in scope.row.demander.split(',')">{{val}}<br /></a>
            </template>
          </el-table-column>
          <el-table-column prop="responsible" label="项目负责人">
            <template slot-scope="scope">
              <a class="link-btn" :key="idx" v-for="(val, idx) in scope.row.responsible.split(',')">{{val}}<br /></a>
            </template>
          </el-table-column>
          <el-table-column prop="participant" label="项目参与者">
            <template slot-scope="scope">
              <a class="link-btn" :key="idx" v-for="(val, idx) in scope.row.participant.split(',')">{{val}}<br /></a>
            </template>
          </el-table-column>
          <el-table-column prop="subtaskList" label="子任务 | 完成日期" min-width="260" align="center">
            <template slot-scope="scope">
              <el-table :data="scope.row.subtaskList" :show-header="false" style="width: 100%" border>
                <el-table-column prop="name" align="left"></el-table-column>
                <el-table-column width="160" prop="end_time">
                  <template slot-scope="scope">
                    <div v-if="scope.row.time_list">
                      <span class="task-overtime" :key="idx" v-for="(obj, idx) in scope.row.time_list.split(',')">{{obj}}<br /></span>
                    </div>
                    <span>{{scope.row.end_time}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <!-- <el-table-column min-width="160" prop="subtask" label="子任务：完成日期">
            <template slot-scope="scope">
              <div v-if="scope.row.subtaskList && scope.row.subtaskList.length > 0">
                <div class="clearfix" style="border-bottom: 1px solid #ccc;" :key="key" v-for="(item, key) in scope.row.subtaskList">
                  <label class="left">{{item.name}}：</label>
                  <div class="left">
                    <div v-if="item.time_list">
                      <span class="task-overtime" :key="idx" v-for="(obj, idx) in item.time_list.split(',')">{{obj}}<br /></span>
                    </div>
                    <span>{{item.end_time}}</span>
                  </div>
                </div>
              </div>
              <div v-else>暂无子任务</div>
            </template>
          </el-table-column> -->
          <el-table-column v-if="!readonly" label="操作">
            <template slot-scope="scope">
              <operate-project :data="scope.row" :callback="onSearch"></operate-project>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
      <auth></auth>
    </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import PanelGroup from "./components/PanelGroup";
import OperateProject from "./components/Operate";
import TodoList from "./components/TodoList";
import { mapGetters } from "vuex";
import { formatNum, parseTime } from "@/utils";
import { Message } from "element-ui";
import { projectlist } from "./components/whitelist";

export default {
  name: "project",
  components: {
    Auth,
    PanelGroup,
    OperateProject,
    TodoList
  },
  data() {
    return {
      testTime: "2018-07-28 11:58:54,2018-08-01 23:00:00",
      readonly: true,
      formInline: {
        name: "",
        state: 1,
        type: "",
        date: []
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              end.setTime(end.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      proList: null,
      statList: {
        A1: 0,
        A2: 0,
        A3: 0,
        B1: 0,
        B2: 0,
        B3: 0
      },
      dialogVisible: false,
      addPopover: false,
      formAdd: {
        name: "",
        type: 1,
        state: 1,
        describe: "", //项目描述
        demander: "", //项目需求人
        responsible: "", //项目负责人
        participant: "" //项目参与者
      }
    };
  },
  computed: {
    ...mapGetters(["email", "pageAuth"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        const start = Date.now() - 3600 * 1000 * 24 * 6;
        const end = Date.now();
        this.formInline.date = [start, end];
        this.setReadonly();
        this.onSearch();
      }
    },
    setReadonly() {
      projectlist.map((obj, i) => {
        if (this.email && this.email == obj.email) {
          this.readonly = false;
        }
      });
    },
    onSearch() {
      let tempData = {};
      this.formInline.type && (tempData["type"] = this.formInline.type);
      this.formInline.state && (tempData["state"] = this.formInline.state);
      this.formInline.name && (tempData["name"] = this.formInline.name);
      const param = {
        url: "/project/getProjectList",
        params: {
          where: JSON.stringify(tempData),
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", param).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
          this.proList = res.result.list;
          if (res.result.stat) {
            for (let key in res.result.stat) {
              this.statList[key] = res.result.stat[key].total || 0;
            }
          }
        }
      });
    },
    handleSetProjectType(type, state) {
      this.formInline.type = type;
      this.formInline.state = state;
      this.onSearch();
    },
    getState(state) {
      let res = "";
      switch (state) {
        case 1:
          res = "进行中";
          break;
        case 2:
          res = "已完成";
          break;
        case 3:
          res = "已关闭";
          break;
      }
      return res;
    },
    getType(type) {
      return type == "2" ? "B级" : "A级";
    },
    _parseTime(time, option) {
      return parseTime(time, option);
    },
    showAdd() {
      this.dialogVisible = true;
    },
    addEvent() {
      this.addPopover = false;
      if (!this.formAdd.name) {
        Message({
          showClose: true,
          message: "请填写项目名称！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formAdd.demander) {
        Message({
          showClose: true,
          message: "请填写项目需求人！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formAdd.responsible) {
        Message({
          showClose: true,
          message: "请填写项目负责人！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.formAdd.participant) {
        Message({
          showClose: true,
          message: "请填写项目参与者！",
          type: "error",
          duration: 1000
        });
        return;
      }
      const param = {
        url: "/project/addProject",
        params: {
          projectData: JSON.stringify(this.formAdd),
          // subtaskData: JSON.stringify(subtaskData),
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", param).then(res => {
        if (res.code && Number(res.code) == 200) {
          Message({
            showClose: true,
            message: "添加成功！",
            type: "success",
            duration: 1000
          });
          this.cancelEvent();
          this.onSearch();
        }
      });
    },
    cancelEvent() {
      this.dialogVisible = false;
      this.addPopover = false;
      this.formAdd = {
        name: "",
        type: "1",
        state: "1",
        describe: "", //项目描述
        demander: "", //项目需求人
        responsible: "", //项目负责人
        participant: "" //项目参与者
      };
    }
  },
  created() {
    this.init();
  },
  watch: {
    email() {},
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
    padding: 18px 14px;
    background-color: #f0f2f5;
    color: #333;
    line-height: 100%;
  }
  .link-btn {
    color: #409eff;
    &:hover {
      text-decoration: underline;
    }
  }
  .table-title-wrap{
    margin-bottom: 4px;
    .table-title {
    padding: 5px 10px;
    color: #409eff;
    border-bottom: 2px solid #409eff;
  }
  }
}
.task-overtime {
  color: #f56c6c;
  text-decoration: line-through;
}
</style>
