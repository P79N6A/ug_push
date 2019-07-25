<template>
    <el-main v-if="pageAuth === 1">
         <!-- 审核标签部分 -->
        <el-row class="pane-title-wrap">
            <el-col :span="24" class="clearfix">
                <h6 class="pane-title left">
                <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>标签审核</h6>
                <router-link to="/category/tag/manage" class='jump'>标签管理</router-link >
            </el-col>
        </el-row>
        <!-- 搜索部分 -->
        <el-row class="search-form-wrap">
            <el-col :span="24" v-if="cateList && cateList.length > 0">
                <el-form :inline="true" :model="formInline" class="demo-form-inline" label-position="left" size="mini">
                    <el-form-item>
                        <el-input v-model="formInline.tagname" placeholder="请输入标签词" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select v-model="formInline.first_tagid" placeholder="请选择领域"  filterable>
                            <el-option label="不限领域" value="none_field" v-if="hasAllArea"></el-option>
                            <el-option v-for="(item,index) in cateList" :key="index" :label="item.name" :value="item.id"></el-option>
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
                <div style="padding: 10px 0;" class="clearfix" v-if="cateList && cateList.length > 0">
                <el-button type="success" size="mini" class="left" @click="passAllEvent()">勾选名单通过</el-button>
                <el-button type="danger" size="mini" class="left" @click="refuseAllEvent()">勾选名单拒绝</el-button>
                <el-button type="danger" size="mini" class="right" v-if="tableData" title="批量导出全部 Excel" :loading="downloadAllLoading" @click="handleDownloadAll">
                    <span>导出全部</span>
                </el-button>
                <el-button type="warning" size="mini" class="right" v-if="tableData" title="批量导出当前页数据 Excel" :loading="downloadCurLoading" @click="handleDownloadCur">
                    <span>导出当前页</span>
                </el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    border
                    style="width: 100%;"
                    @selection-change="handleSelectionChange"
                    size="mini">
                        <el-table-column
                        prop="id"
                        type="selection"
                        width="50"
                        align='center'>
                        </el-table-column>
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
                        label="请求类型"
                        align='center'>
                            <template slot-scope="scope">
                                <span>{{(scope.row.apply_kinds === 1) ? "添加" : (scope.row.apply_kinds === 2 ? "修改" : "删除")}}</span>
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
                        <el-table-column
                        prop="operatorItem"
                        label="操作"
                        width="97"
                        align='center'>
                            <template slot-scope="scope">
                            <a @click='allow(scope.row)'>通过</a>
                            |
                            <a @click='refuse(scope.row)'>拒绝</a>
                            <a @click='seeOrigin(scope.row)' v-if="scope.row.apply_kinds === 2">查看原标签</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="page-box">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="formInline.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
            </el-col>
            <!-- 查看原标签 -->
            <el-dialog title="原三级标签" :visible.sync="dialogFormVisible" align='left' :style="{ fontWeight: 'bold'}" width='800px'>
                <el-form :model="form" label-position='left' :label-width="formLabelWidth">
                    <el-form-item label="一级标签词">
                    <el-select v-model="form.first_tagname" disabled placeholder="请选择一级标签词">
                    </el-select>
                    </el-form-item>
                    <el-form-item label="二级标签词">
                    <el-select v-model="form.second_tagname" disabled placeholder="请选择二级标签词">
                    </el-select>
                    </el-form-item>
                    <el-form-item label="三级标签词">
                        <el-input v-model="form.third_tagname" disabled placeholder="请输入三级标签" class='inp'></el-input>
                    </el-form-item>
                    <el-form-item label="三级标签类型">
                    <el-select v-model="form.tag3type" disabled placeholder="请选择三级标签类型">
                    </el-select>
                    </el-form-item>
                    <el-form-item label="是否有歧义">
                    <el-select v-model="form.is_mbiguity" disabled>
                        <el-option label="有歧义" :value="1"></el-option>
                        <el-option label="无歧义" :value="0" ></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="别名或昵称">
                        <el-input v-model="form.nickname" disabled class='inp'></el-input>
                    </el-form-item>
                    <el-form-item label="关键词">
                        <el-input v-model="form.keywords" disabled class='inp'></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="hideOrigin" type='success'>关 闭</el-button>
                </div>
            </el-dialog>
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
import { tag3type } from "@/utils/tag3typeconf";
import { parseTime } from "@/utils";

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
                getApplyTag: "/tag/getApplyTag", //获取审核信息
                acceptApplyTags: "/tag/acceptApplyTags" //通过/拒绝通过审核
            },
            hasExamine: '',
            hasAllArea: '',
            cateList: null,
            tips: 'loading...',
            formInline: {
                tagname: '',
                first_tagid: '',
                is_like: '',
                tagstatus: 1,
                page: 1,
                size: 5
            },
            tableData: null,
            total: 0,
            downloadCurLoading: false,
            downloadAllLoading: false,
            row_id: '',
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {},
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
                        this.hasExamine = res.result.permission.indexOf(18) > -1 ? true : false;
                        this.hasAllArea = res.result.permission.indexOf(16) > -1 ? true : false;
                        if (!this.hasExamine) {
                            this.tips = "暂无权审核限";
                            return;
                        }
                        this.cateList = res.result.field || [];
                        if (this.cateList.length > 0) {
                            this.formInline.first_tagid = this.hasAllArea ? 'none_field' : this.cateList[0].id;
                            this.onSearch();
                        } else {
                            this.tips = "暂无有权限的领域"
                        }
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
            this.formInline.is_like = this.formInline.is_like ? 1 : 0 ;
            let params = {
                ...this.formInline
                // username: this.email,
                // cip: 230
            };
            let data = {
                url: this.apiConf.getApplyTag,
                params: params
            };
            this.$store.dispatch("CommonGet", data).then(res => {
                if (res.code && Number(res.code) == 200) {
                    this.tableData = res.data ? res.data.data : null;
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
        passAllEvent() {
           let params = {
                row_id: '',
                accept: 2
            }
            params.row_id = "[" + this.row_id + "]";
            if (params.row_id === "[]") {
                Message({
                    showClose: true,
                    message: "请至少勾选一项",
                    type: "error",
                    duration: 1000
                });
                return;
            }
            let data = {
                url: this.apiConf.acceptApplyTags,
                params: params
            }
            let msg = "您确定要批量通过选中标签词么？";
            let success = "已批量通过选中标签词的审核";
            this.send(data, msg, success);
        },
        refuseAllEvent() {
            let params = {
                row_id: '',
                accept: 3
            }
            params.row_id = "[" + this.row_id + "]";
            if (params.row_id === "[]") {
                Message({
                    showClose: true,
                    message: "请至少勾选一项",
                    type: "error",
                    duration: 1000
                });
                return;
            }
            let data = {
                url: this.apiConf.acceptApplyTags,
                params: params
            }
            let msg = "您确定要批量拒绝选中标签词么？";
            let success = "已批量拒绝选中标签词的审核";
            this.send(data, msg, success);
        },
        handleSelectionChange(val) {
            let str = ''
            const LEN = val.length - 1;
            val.forEach((item,index) => {
                if ( index === LEN ) {
                    return str += item.id
                }
                return str += (item.id + ',');
            });
            this.row_id = str;
        },
        downloadAll(list) {
            import("@/vendor/Export2Excel").then(excel => {
                const filename = "AuditList";
                const tHeader = [
                "一级标签词",
                "二级标签词",
                "三级标签词",
                "三级标签类型",
                "是否有歧义",
                "别名或昵称",
                "关键词",
                "举例微博mid",
                "请求类型",
                "操作人",
                "操作时间",
                ];
                const filterVal = [
                "first_tagname",
                "second_tagname",
                "third_tagname",
                'tag3type',
                "is_mbiguity",
                "nickname",
                "keywords",
                "weibo_mid",
                "apply_kinds",
                "operator",
                "modify_time"
                ];
                const data = this.formatJson(filterVal, list);
                excel.export_json_to_excel(tHeader, data, filename);
                if ( this.downloadCurLoading ) {
                    this.downloadCurLoading = false;
                } else if ( this.downloadAllLoading ) {
                    this.downloadAllLoading = false;
                }
            });
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map((v, i) =>
                    filterVal.map(j => {
                        if (j === "is_mbiguity") {
                            return v[j] = v[j] ? "是" : "否";
                        }
                        if (j === "tag3type") {
                            return v[j] = this.thirdType[v["type"]] ? this.thirdType[v["type"]].label : (v["type"] || '');
                        }
                        if (j === "apply_kinds") {
                            switch(v[j]) {
                                case 1 : return "添加"
                                case 2 : return "修改"
                                case 3 : return "删除"
                            }
                        }
                        if (j === "modify_time") {
                            return parseTime(v[j]);
                        }
                        return v[j];
                })
            );
        },
        handleDownloadCur() {
            this.downloadCurLoading = true;
            const list = this.tableData;
            this.downloadAll(list);
        },
        handleDownloadAll() {
            this.downloadAllLoading = true;
            let params = {
                ...this.formInline,
            };
            params.is_like = params.is_like ? 1 : 0 ;
            params.page = 1;
            params.size = this.total;
            const data = {
                url: this.apiConf.getApplyTag,
                params: params
            };
            this.$store.dispatch("CommonGet", data).then(res => {
                if (res.code && Number(res.code) == 200) {
                    if (res.data) {
                        this.downloadAll(res.data.data || []);
                    } else {
                        this.downloadAllLoading = false;
                    }
                } else {
                this.downloadAllLoading = false;
                }
            });
        },
        allow(row) {
            let params = {
                row_id: '',
                accept: 2
            }
            params.row_id = "[" + row.id + "]";
            let data = {
                url: this.apiConf.acceptApplyTags,
                params: params
            }
            let msg = "您确定要通过该条标签词么？";
            let success = "已通过该条标签词审核";
            this.send(data, msg, success);
        },
        refuse(row) {
            let params = {
                row_id: '',
                accept: 3
            }
            params.row_id = "[" + row.id + "]";
            let data = {
                url: this.apiConf.acceptApplyTags,
                params: params
            }
            let msg = "您确定要拒绝该条标签词么？";
            let success = "已拒绝该条标签词审核";
            this.send(data, msg, success);
        },
        send(data, msg, success) {
            const h = this.$createElement;
            this.$msgbox({
                message: h('p', null, [
                    h('span', null, msg),
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action === 'confirm') {
                        this.$store.dispatch('CommonGet', data).then(res => {
                            if (res.code && res.code === 200 ) {
                                done();
                                Message({
                                    showClose: true,
                                    message: success,
                                    type: "success",
                                    duration: 1000
                                });
                                this.onSearch();
                            } else {
                                done();
                                Message({
                                    showClose: true,
                                    message: res.msg,
                                    type: "error",
                                    duration: 1000
                                });
                            }
                        }, err => {
                            done();
                            Message({
                                showClose: true,
                                message: "接口异常",
                                type: "error",
                                duration: 1000
                            });
                        })
                    } else {
                        done();
                    }
                }
                }).then(action => {
                    
                }, cancel => {
                    
            });
        },
        seeOrigin(row) {
            let obj = JSON.parse(row.originalinfo);
            for ( var i in obj ) {
                this.form[i] = obj[i];
            }
            this.form.tag3type = this.thirdType[this.form.type].label;
            this.dialogFormVisible = true;
        },
        hideOrigin() {
            this.dialogFormVisible = false;
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
.el-form-item {
    margin-bottom: 10px;
}
.dialog-footer {
    height: 50px;
    padding-right: 50px;
}
.inp {
  width: 217px;
}
</style>
