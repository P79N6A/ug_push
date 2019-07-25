<template>
  <div>
    <el-row
      type="flex"
      align="middle"
      justify="start"
    >
      <el-col
        :xs="24"
        :span="23"
      >
        <el-form
          :model="shieldForm"
          :rules="shieldRules"
          ref="shieldForm"
          label-width="100px"
          class="pane-form"
          size="small"
        >
          <el-form-item
            label="屏蔽类型"
            prop="type"
          >
            <el-select
              v-model="shieldForm.type"
              clearable
              placeholder="请选择"
              @change="shieldChangeEvent()"
            >
              <el-option
                v-for="item in shieldForm.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="输入物料"
            prop="content"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              suffix-icon="el-icon-edit"
              v-model="shieldForm.content"
              :placeholder="shieldForm.placeholder"
              :clearable="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-popover
              ref="addBlack"
              placement="bottom"
              width="200"
              v-model="shieldForm.addPopover"
            >
              <p>确定屏蔽？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="shieldForm.addPopover = false"
                >取消</el-button>
                <el-button
                  type="primary"
                  round
                  size="mini"
                  @click="shieldEvent('shieldForm', 'add_black')"
                >确定</el-button>
              </div>
            </el-popover>
            <el-popover
              ref="cancelBlack"
              placement="bottom"
              width="200"
              v-model="shieldForm.cancelPopover"
            >
              <p>取消屏蔽？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="shieldForm.cancelPopover = false"
                >取消</el-button>
                <el-button
                  type="primary"
                  round
                  size="mini"
                  @click="shieldEvent('shieldForm', 'cancel_black')"
                >确定</el-button>
              </div>
            </el-popover>
            <el-button
              type="success"
              size="small"
              v-popover:addBlack
            >屏蔽物料</el-button>
            <el-button
              type="warning"
              size="small"
              v-show="shieldForm.isShowCancel"
              v-popover:cancelBlack
            >取消屏蔽</el-button>
            <el-button
              type="info"
              size="small"
              plain
              @click="resetForm('shieldForm')"
            >重置</el-button>
          </el-form-item>
          <el-form-item
            v-if="tipsObj"
            label="屏蔽结果详情"
          >
            <div
              v-if="tipsObj.data && tipsObj.data.length > 0"
              class="clearfix"
            >
              <label
                style="width: 100px;"
                class="text-success left"
              >屏蔽成功mids：</label>
              <div class="clearfix left">
                <a
                  class="link-mid left"
                  :href="`https://m.weibo.cn/status/${mid}`"
                   target="_blank"
                  :key="n"
                  v-for="(mid, n) in tipsObj.data"
                >{{mid}}</a>
              </div>
            </div>
            <div
              v-if="tipsObj.notin && tipsObj.notin.length > 0"
              class="clearfix"
            >
              <label
                style="width: 100px;"
                class="text-info left"
              >不在物料库mids：</label>
              <div class="clearfix left">
                <a
                  class="link-mid left"
                  :href="`https://m.weibo.cn/status/${mid}`"
                   target="_blank"
                  :key="n"
                  v-for="(mid, n) in tipsObj.notin"
                >{{mid}}</a>
              </div>
            </div>
            <div
              v-if="tipsObj.field && tipsObj.field.length > 0"
              class="clearfix"
            >
              <label
                style="width: 100px;"
                class="success-error left"
              >屏蔽失败mids：</label>
              <div class="clearfix left">
                <a
                  class="link-mid left"
                  :href="`https://m.weibo.cn/status/${mid}`"
                   target="_blank"
                  :key="n"
                  v-for="(mid, n) in tipsObj.field"
                >{{mid}}</a>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row
      type="flex"
      justify="center"
    >
      <el-col
        :xs="24"
        :span="23"
      >
        <div class="table-title left">物料库屏蔽操作记录</div>
        <el-table
          class="table-wrap"
          :data="midRecordData"
          border
          style="width: 100%"
          max-height="600"
          size="mini"
        >
          <el-table-column
            width="50"
            type="index"
            align="center"
            label="序号"
          ></el-table-column>
          <el-table-column
            label="Uid"
            prop="uid"
            align="center"
          >
            <template slot-scope="scope">
              <a
                v-if="scope.row.uid"
                class="link-btn"
                target="_blank"
                :href="`https://weibo.com/u/${scope.row.uid}`"
              >{{scope.row.uid}}</a>
              <span v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column
            label="昵称"
            prop="name"
            align="center"
          >
            <template slot-scope="scope">
              <a
                v-if="scope.row.name"
                class="link-btn"
                target="_blank"
                :href="`https://weibo.com/u/${scope.row.uid}`"
              >{{scope.row.name}}</a>
              <span v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column
            label="领域(最高分能力领域)"
            prop="tagName"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.tagName"
                type="success"
                size="medium"
              >{{scope.row.tagName}}</el-tag>
              <span v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column
            label="历史拉黑微博数(条)"
            prop="num"
            sortable
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                type="warning"
                size="medium"
              >{{ formatNum(scope.row.num) }}条</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="拉黑微博MID | 操作人"
            prop="list"
            header-align="center"
          >
            <template slot-scope="props">
              <div
                :key="key"
                v-for="(item, key) in props.row.list"
              >
                <a
                  class="link-btn"
                  target="_blank"
                  :href="item.link"
                >{{item.mid}}</a> |
                <span>{{item.operater}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-wrap">
          <el-pagination
            @size-change="handleMidSizeChange"
            @current-change="handleMidCurrentChange"
            :current-page="midRecordForm.page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="midRecordForm.count"
            layout="total, sizes, prev, pager, next, jumper"
            :total="midRecordForm.total"
          >
          </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import { formatNum } from "@/utils";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "LibraryShieldPane",
  data() {
    return {
      formatNum,
      shieldForm: {
        isShowCancel: false,
        placeholder: "请先选择屏蔽类型",
        content: "",
        type: "",
        addPopover: false,
        cancelPopover: false,
        options: [
          {
            value: "link",
            label: "微博链接"
          },
          // {
          //   value: "uid",
          //   label: "uid"
          // },
          {
            value: "mid",
            label: "mid"
          }
          // {
          //   value: "url",
          //   label: "URL"
          // },
          // {
          //   value: "tag",
          //   label: "标签"
          // },
          // {
          //   value: "keyword",
          //   label: "关键字"
          // }
        ],
        placeObj: {
          link:
            "请输入微博链接，例如：https://m.weibo.cn/3187525994/4377386562769240",
          uid: "请输入uid,使用 , 分隔多个值",
          mid: "请输入mid 使用 , 分隔多个值",
          url: "请输入URL,使用 , 分隔多个值",
          tag: "请输入tag,使用 , 分隔多个值",
          keyword: "输入keyword,同一组用逗号分隔，不同组用｜分割"
        },
        effect_time: "",
        filter_type: []
      },
      shieldRules: {
        content: [{ required: true, message: "物料不能为空", trigger: "blur" }],
        type: [{ required: true, message: "请选择屏蔽类型", trigger: "blur" }]
      },
      tipsObj: false,
      midRecordForm: {
        page: 1,
        count: 10,
        totel: 0
      },
      midRecordData: []
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
      this.getMidRecord();
    },
    shieldEvent(formName, action) {
      const that = this;
      this.shieldForm.addPopover = false;
      this.shieldForm.cancelPopover = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let type = that.shieldForm.type;
          let content = that.shieldForm.content;
          if (type == "link") {
            type = "mid";
            content = that.urlToMid(content);
          }

          const data = {
            url: "/shield/delMid",
            params: {
              mids: content,
              username: this.email,
              cip: 189
            }
          };
          this.$store.dispatch("CommonGet", data).then(
            res => {
              if (Number(res.code) == 200) {
                Message({
                  showClose: true,
                  message: "Success",
                  type: "success",
                  duration: 1000
                });
                this.tipsObj = false;
              } else {
                Message({
                  showClose: true,
                  message: "没有全部屏蔽成功，请看屏蔽结果详情！",
                  type: "warning",
                  duration: 3000
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
                duration: 3000
              });
            }
          );
          // let data = {
          //   staff: that.email,
          //   source: source,
          //   action: action,
          //   flow: 1,
          //   type: type,
          //   data: content
          // };
          // const tempData = {
          //   url: `${domain}/3/admin/apiAgent`,
          //   param: data
          // };
          // const params = {
          //   data: JSON.stringify(tempData),
          //   cip: 230
          // };
          // this.$store.dispatch("ShieldMaterial", params);
        } else {
          console.log(`error ${action}`);
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.shieldForm.placeholder = "请先选择屏蔽类型";
      this.tipsObj = false;
    },
    shieldChangeEvent() {
      if (this.shieldForm.type == "") {
        this.shieldForm.placeholder = "请先选择屏蔽类型";
      } else {
        this.shieldForm.isShowCancel =
          this.shieldForm.type == "mid" || this.shieldForm.type == "link"
            ? false
            : true;
        this.shieldForm.placeholder = this.shieldForm.placeObj[
          this.shieldForm.type
        ];
      }
    },
    urlToMid(url) {
      const arrStr = url.split("/");
      return arrStr[arrStr.length - 1];
    },
    getMidRecord() {
      //获取物料库屏蔽日志
      const data = {
        url: "/Shield/get",
        params: {
          page: this.midRecordForm.page,
          count: this.midRecordForm.count,
          isall: "all",
          username: this.email,
          cip: 230
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          if (res.code && Number(res.code) == 200) {
            this.midRecordData = res.result;
            this.midRecordForm.total = res.total;
          }
        },
        err => {}
      );
    },
    handleMidSizeChange(val) {
      this.midRecordForm.count = val;
      this.getMidRecord();
    },
    handleMidCurrentChange(val) {
      this.midRecordForm.page = val;
      this.getMidRecord();
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
  .pane-form {
    margin-top: 10px;
    padding: 20px;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border: 1px solid #ebebeb;
    border-radius: 3px;
  }
  .page-wrap {
    padding: 20px 0;
    overflow: auto;
  }
  .table-title {
    margin-top: 40px;
    padding: 5px 20px;
    color: #409eff;
    border-bottom: 2px solid #409eff;
    margin-bottom: 10px;
  }
  .table-wrap {
    border-radius: 3px;
  }
  .link-btn {
    color: #409eff;
    &:hover {
      text-decoration: underline;
    }
  }
  .text-info {
    font-size: 12px;
    color: #E6A23C;
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
}
</style>