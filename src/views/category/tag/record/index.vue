<template>
    <el-main v-if="pageAuth === 1">
         <!-- 申请标签部分 -->
        <el-row class="pane-title-wrap">
            <el-col :span="24" class="clearfix">
                <h6 class="pane-title left">
                <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>标签申请记录</h6>
                <router-link to="/category/tag/manage" class="right">标签管理</router-link >
            </el-col>
        </el-row>
        <!-- 搜索部分 -->
        <el-row class="search-form-wrap">
            <el-col :span="24" v-if="cateList && cateList.length > 0">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="left" size="mini">
                    <el-form-item>
                        <el-input v-model="formInline.operator" placeholder="请输入申请人邮箱" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="formInline.tagname" placeholder="请输入标签词" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formInline.first_tagid" placeholder="请选择领域" filterable>
                            <el-option label="不限领域" value="none_field" v-if="hasAllArea"></el-option>
                            <el-option v-for="(item,index) in cateList" :key="index" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formInline.tagstatus" placeholder="请选择状态">
                            <el-option v-for="(item,index) in tagstatus" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-checkbox v-model="formInline.is_like" style="line-height:32px; margin-right:15px;">模糊匹配</el-checkbox>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSearch">
                        <span class="hidden-xs-only">查询</span>
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" v-else>
                <el-alert :title="tips" type="warning" show-icon :closable="false">
                </el-alert>
            </el-col>
        </el-row>
        <!-- 表格部分 -->
        <el-row class="content-box-wrap">
            <el-col :span="24" v-if="cateList && cateList.length > 0">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
                    style="width: 100%;"
                    size="mini">
                        <el-table-column
                        prop="first_tagname"
                        label="一级标签词"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        prop="second_tagname"
                        label="二级标签词"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        prop="third_tagname"
                        label="三级标签词"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        prop="type"
                        label="三级标签类型"
                        align='center'>
                            <template slot-scope="scope">
                                <span>{{ thirdType[scope.row.type] ? thirdType[scope.row.type].label : '' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="is_mbiguity"
                        label="是否有歧义"
                        align='center'>
                        <template slot-scope="scope">
                            <span>{{ scope.row.is_mbiguity ? "是" : "否"}}</span>
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="nickname"
                        label="别名或昵称"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        prop="keywords"
                        label="关键词"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        prop="keywords"
                        label="举例微博mid"
                        align='center'>
                            <template slot-scope="scope">
                                <a :href="scope.row.weibo_mid" target="_block">{{scope.row.weibo_mid}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="apply_kinds"
                        label="申请类型"
                        align='center'>
                            <template slot-scope="scope">
                                <span>{{(scope.row.apply_kinds === 1) ? "添加" : (scope.row.apply_kinds === 2 ? "修改" : "删除")}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="lable_status"
                        label="申请状态"
                        align='center'>
                            <template slot-scope="scope">
                                <span>{{(scope.row.lable_status === 1) ? "待审核" : (scope.row.lable_status === 2 ? "已通过" : "已拒绝")}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="operator"
                        label="操作人"
                        align='center'>
                        </el-table-column>
                        <el-table-column
                        prop="modify_time"
                        label="操作时间"
                        align='center'
                        width='100'>
                            <template slot-scope="scope">
                                <span>{{ _parseTime(scope.row.modify_time)}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page-box">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="formInline.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
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
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import Auth from "@/components/Tips/Auth";
import { parseTime } from "@/utils";
import { tag3type } from "@/utils/tag3typeconf";

export default {
    name: "FieldAudit",
    components: {
        Auth
    },
    data() {
        return {
            apiConf: {
                //API
                getUserRole: "/role/getUserRole",//权限获取
                getApplyTag: "/tag/getApplyTag" //我的申请获取
            },
            hasAllArea: '',
            cateList: null,
            tips: 'loading...',
            formInline: {
                tagname: '',
                first_tagid: '',
                operator: '',
                is_like: '',
                tagstatus: 0,
                page: 1,
                size: 5
            },
            tagstatus: [
                {
                    label: "所有状态",
                    value: 0
                },
                {
                    label: "待审核",
                    value: 1
                },
                {
                    label: "已通过",
                    value: 2
                },
                {
                    label: "已拒绝",
                    value: 3
                }
            ],
            tableData: null,
            total: 0,
            downloadCurLoading: false,
            thirdType: null
        }
    },
    computed: {
        ...mapGetters(["pageAuth", "email"])
    },
    methods: {
        _parseTime(time) {
            return parseTime(time);
        },
        init() {
            if (this.pageAuth === 1) {
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
                        this.cateList = res.result.field || [];
                        (this.cateList.length > 0) || (this.tips = "暂无有权限的领域");
                        this.hasAllArea = res.result.permission.indexOf(16) > -1 ? true : false;
                        this.formInline.first_tagid = this.hasAllArea ? 'none_field' : this.cateList[0].id;
                        this.onSearch();
                    } else {
                        this.tips = "暂无有权限的领域";
                    }
                },
                err => {
                    this.tips = "接口异常";
                }
            );
        },
        onSearch() {
            let params = {
                ...this.formInline,
                // username: this.email,
                // cip: 230
            };
            params.is_like = params.is_like ? 1 : 0 ;
            let data = {
                url: this.apiConf.getApplyTag,
                params: params
            };
            this.$store.dispatch("CommonGet", data).then(res => {
                if (res.code && Number(res.code) == 200) {
                    this.tableData = res.data ? res.data.data : [];
                    this.total = res.data ? res.data.total : 0;
                    if (!res.data) {
                        Message({
                            showClose: true,
                            message: "暂无数据",
                            type: "error",
                            duration: 1000
                        });
                    }
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
                    message: "查询失败",
                    type: "error",
                    duration: 1000
                });
            });
        },
        handleSizeChange(val) {
            this.formInline.size = val;
            this.onSearch();
        },
        handleCurrentChange(val) {
            this.formInline.page = val;
            this.onSearch();
        },
    },
    created() {
        this.init();
        // this.formInline.first_tagid = this.hasAllArea ? '' : this.cateList[0];
        this.thirdType = tag3type;
    },
    watch: {
        pageAuth() {
            this.init();
        }
    }
}
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
  }
  .content-box-wrap {
    padding: 10px;
    .page-box {
      padding-top: 10px;
      overflow: auto;
    }
  }
}
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
a {
  font-size:14px; 
  color:#409eff; 
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
.white-item {
  max-width: 100%;
  width: 270px;
}
.white-tips {
  margin-top: 6px;
  line-height: 1.5;
  color: #e6a23c;
  font-size: 12px;
}
.help-doc-tips {
  margin-top: 4px;
  margin-left: 10px;
  font-size: 14px;
  color: #e6a23c;
  &:hover {
    text-decoration: underline;
  }
}
.mode-text {
  margin-top: 4px;
  margin-left: 10px;
  font-size: 14px;
  cursor: pointer;
}
.jump {
    font-size:14px; 
    color:#409eff; 
    margin-left:20px;
    &:hover {
        text-decoration: underline;
    }
}
</style>

