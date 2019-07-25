<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">用户阅读mid查询页面</h6>
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
                    <div class="block">
                        <el-date-picker
                        v-model="formInline.dt"
                        align="right"
                        type="date"
                        format="yyyy年MM月dd日"
                        placeholder="选择日期"
                        value-format="yyyyMMdd"
                        :picker-options="pickerOptions1">
                        </el-date-picker>
                    </div>
                    <span class="info-tips">（请选择日期）</span>
                </el-form-item>
                <el-form-item>
                    <el-button
                    type="primary"
                    @click="onSearch"
                    >查询</el-button>
                </el-form-item>
            </el-form>
        </el-row>
        <div class="content-box-wrap">
            <el-table :data="data" border  style="width: 100%;" stripe size="mini">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column label="mid" width="90">
                    <template slot-scope="scope">
                        <a :href="`https://m.weibo.cn/status/${scope.row.uid}`" target="_blank">{{ scope.row.uid }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="tags" label="标签">
                    <template slot-scope="scope">
                        <div v-if="scope.row.tags" slot="reference" class="name-wrapper">
                            <el-tag size="medium" style="margin: 2px 2px" 
                                :type="colorList[Math.round(3*Math.random())]" 
                                :key="idx" v-for="(item, idx) in splitTag1(scope.row.tags)">
                                {{item}}
                            </el-tag>
                        </div>
                        <span v-else>暂无</span>
                    </template>
                </el-table-column>
                <el-table-column prop="acts" label="用户行为">
                    <template slot-scope="scope">
                        <div v-if="scope.row.acts" slot="reference" class="name-wrapper">
                            <el-tag size="medium" style="margin: 2px 2px" :type="colorList[Math.round(3*Math.random())]" :key="idx" v-for="(item, idx) in splitTag(scope.row.acts)">{{ item }}</el-tag>
                        </div>
                        <span v-else>暂无</span>
                    </template>
                </el-table-column>
                <el-table-column prop="expo_rank" label="曝光位置" width="70"> </el-table-column>
                <el-table-column prop="expo_unix_ts" label="时间" width="140">
                    <template slot-scope="scope">
                        <div slot="reference">
                            {{time(scope.row.expo_unix_ts * 1000)}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
        <auth></auth>
    </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
    data() {
        return {
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            formInline: {
                uid: this.$route.query.uid? this.$route.query.uid:'',
                dt: '',
                view: 'umid',
            },
            data:[],
            colorList: ["", "success", "warning", "danger","info"],
            tags: [],
        }
    },
    methods: {
        onSearch() {
            if(!this.formInline.uid) {
                Message({
                    showClose: true,
                    message: "请输入要查询的uid！",
                    type: "error",
                    duration: 3000
                });
                return;
            }
            if(!this.formInline.dt) {
                Message({
                    showClose: true,
                    message: "请选择日期！",
                    type: "error",
                    duration: 3000
                });
                return;
            }
            const tempData = {
                url:"http://10.77.29.69:8099/ucf",
                param: { ...this.formInline },
            };
            const params = {
                data: JSON.stringify(tempData),
                time: 20,
                cip: 230,
            };
            this.$store.dispatch("ProxyGetTimeout", params).then(
                res => {
                if (res.code == 0) {
                    Message({
                        showClose: true,
                        message: res.msg || "success",
                        type: "success",
                        duration: 1000
                    });
                    this.data = res.data;
                } else {
                    Message({
                        showClose: true,
                        message: res.msg || "单用户topic查询页面数据获取失败，请重试！",
                        type: "warning",
                        duration: 3000
                    });
                }
                },
                err => {
                    Message({
                        showClose: true,
                        message: "单用户topic查询页面接口请求失败！",
                        type: "error",
                        duration: 3000
                    });
                }
            );
        },
        // 转换时间格式
        /** ate的‘toJSON’方法返回格林威治时间的JSON格式字符串，实际是使用‘toISOString’方法的结果。
        字符串形如‘2018-08-09T10:20:54.396Z’，转化为北京时间需要额外增加八个时区 **/
        time(time = +new Date()) {
            var date = new Date(time + 8 * 3600 * 1000);
            return date.toJSON().substr(0, 19).replace('T', ' ');
        },
        splitTag(data) {
            return data.split(',');
        },
        splitTag1(data) {
            return data.toString().replace(/@/g, ' | ').split(',');
        }
    },
    components: {
        Auth,
    },
    computed: {
        ...mapGetters(["pageAuth"])
    },
    watch: {
        pageAuth() {}
    },
}
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
      padding: 20px;
    }
    .info-tips {
      font-size: 12px;
      color: #ebb563;
    }
  }
}
</style>
