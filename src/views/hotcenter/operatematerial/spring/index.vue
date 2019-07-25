<template>
        <el-main v-if="pageAuth === 1">
            <el-row class="pane-title-wrap">
                <el-col :span="24">
                    <h6 class="pane-title">
                        <i class="el-icon-star-off hidden-xs-only" style="margin-right: 6px;"></i>春晚流物料</h6>
                </el-col>
            </el-row>
            <el-row class="content-box-wrap">
                <el-col :span="24">
                    <el-form :model="formInline" label-width="50px" size="small">
                        <el-form-item label="类型" required>
                            <el-radio-group v-model="formInline.type" @change="handleType()">
                                <el-radio :label="1" border>mid</el-radio>
                                <el-radio :label="2" border>链接</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="">
                            <div class="badge-box">
                                <el-badge :value="formInline.content.length || '0'">
                                    <el-tag type="warning">物料录入条数</el-tag>
                                </el-badge>
                            </div>
                            <div v-if="formInline.content && formInline.content.length > 0" class="clearfix">
                                <div class="tag-box left" :key="key" v-for="(val, key) in formInline.content">
                                    <el-tag>{{val}}</el-tag>
                                    <i class="el-icon-error tag-btn-close" @click="deleteMid(key)"></i>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="物料" required>
                            <textarea class="long-text" v-model.trim="content" :placeholder="placeholder" @keyup.enter="setMaterial()" @blur="setMaterial()"></textarea>
                            <p v-show="errorTips" class="error-tips">错误提示：{{errorTips}}</p>
                            <p class="text-tips">mid样例：4326329950075693<br />短链链接样例：https://weibo.com/1594052081/HbhPudlUA<br />mid链接样例：https://m.weibo.cn/2823492977/4328775120155937<br />输入多个值英文逗号分隔，可回车确认</p>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="onSubmit(1)">置顶</el-button>
                            <el-button type="warning" @click="onSubmit(2)">优先分发</el-button>
                            <el-button type="info" plain @click="clearEvent()">清除重置</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-main>
        <el-main v-else-if="pageAuth === 0">
            <auth></auth>
        </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { Message } from "element-ui";

const domain = "http://i.hot.weibo.com";
const source = "990750541234567890";

export default {
  name: "shieldPage",
  components: {
    Auth
  },
  data() {
    return {
      formInline: {
          level: "", // 1 置顶；2 优质物料分发
          type: 1, // 1 mid；2  链接
          content: []
      },
      content: "",
      errorTips: "",
      placeholder: "输入mid，多个mid英文逗号分隔，可回车确认"
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    setMaterial() {
        this.errorTips = "";
        if (this.content) {
            if (this.formInline.content.indexOf(this.content) > -1) { // 输入单条物料，该物料已存在
                this.errorTips = `“${this.content}”已存在以上物料录入列表`;
                return;
            }
            if (this.content.indexOf(',') > -1) { // 输入多条物料，英文逗号（,）分隔
                const arr = this.content.split(',');
                for (let i = 0;i < arr.length; i++) {
                    const cur = arr[i].trim();
                    if (cur) {
                        if (this.formInline.content.indexOf(cur) > -1) {
                            this.errorTips = `“${cur}”（第${i+1}条）已存在以上物料录入列表`;
                            return;
                        } else {
                            this.formInline.content.push(cur);
                        }
                    }
                }
            } else {
                this.formInline.content.push(this.content);
            }
        }
        this.content = "";
        this.formInline.content = Array.from(new Set(this.formInline.content));
    },
    deleteMid(n) {
        this.formInline.content.splice(n, 1);
    },
    handleType() {
        if (this.formInline.type == 1) {
            this.placeholder = "输入mid，多个mid英文逗号分隔，可回车确认";
        } else {
            this.placeholder = "输入链接，多个链接英文逗号分隔，可回车确认";
        }
        this.formInline.content = [];
        this.content = "";
        this.errorTips = "";
    },
    clearEvent() {
        this.placeholder = "输入mid，多个mid英文逗号分隔，可回车确认";
        this.formInline = {
            level: "",
            type: 1,
            content: []
        };
        this.content = "";
        this.errorTips = "";
    },
    onSubmit(level) {
        this.formInline.level = level;
        const text = level === 1 ? '置顶' : '优先分发';
        this.$confirm(`将${text}以上物料, 是否继续?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
        })
            .then(() => {
            this.setChunwan();
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消操作！"
            });
        });
    },
    setChunwan() {
        let params = new URLSearchParams();
        params.append("type", this.formInline.type);
        params.append("level", this.formInline.level);
        params.append("content", JSON.stringify(this.formInline.content));
        params.append("username", this.email);
        params.append("cip", 230);
        const data = {
            url: "/proxy/setChunwan", //春晚流物料干预接口
            params: params
        };
        this.$store.dispatch("CommonPost", data).then(res => {
            if (res.code && Number(res.code) == 200) {
                const tips = res.msg || "success";
                Message({
                    showClose: true,
                    message: tips,
                    type: "success",
                    duration: 3000
                });
            } else {
                Message({
                    showClose: true,
                    message: res.msg || "操作失败！",
                    type: "error",
                    duration: 0
                });
            }
        });
    }
  },
  watch: {
    pageAuth() {}
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
    .content-box-wrap {
        padding: 10px;
        .badge-box {
            margin-bottom: 20px;
        }
        .tag-box {
            position: relative;
            padding-right: 20px;
            padding-bottom: 10px;
            .tag-btn-close {
                position: absolute;
                top: -8px;
                right: 12px;
                font-size: 18px;
            }
        }
    }
    .text-tips {
        color: #e6a23c;
        font-size: 12px;
        line-height: 20px;
    }
    .error-tips {
        color: #f56c6c;
        font-size: 12px;
        line-height: 20px;
    }
    .long-text{
        max-width: 400px;
        min-width: 300px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 3px;
        font-size: 14px;
        &:focus {
            outline: 0;
            border-color: #409eff;
        }
    }
  }
</style>