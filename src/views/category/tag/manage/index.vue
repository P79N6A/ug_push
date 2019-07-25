<template>
  <el-main v-if="pageAuth === 1">
    <!-- 领域标签部分 -->
    <el-row class="pane-title-wrap">
      <el-col :span="24" class="clearfix">
        <h6 class="pane-title left">
          <i class="el-icon-document hidden-xs-only" style="margin-right: 6px;"></i>标签管理</h6>
          <router-link to="/category/tag/audit" v-if="hasExamine" style="margin-left:20px;">标签审核</router-link >
          <router-link to="/category/tag/record" class='right' >标签申请记录</router-link>
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
                <el-select v-model="formInline.first_tagid" placeholder="请选择领域" filterable>
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
          <el-button type="success" size="mini" class="left" @click='showAdd'>添加标签词</el-button>
          <el-button type="danger" size="mini" class="right" v-if="tableData" title="批量导出全部 Excel" :loading="downloadAllLoading" @click="handleDownloadAll">
            <span>导出全部</span>
          </el-button>
          <el-button type="warning" size="mini" class="right" v-if="tableData" title="批量导出当前页数据 Excel" :loading="downloadCurLoading" @click="handleDownloadCur">
            <span>导出当前页</span>
          </el-button>
        </div>
         <el-table
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
                    <span>{{ thirdType[scope.row.type] ? thirdType[scope.row.type].label : (scope.row.type || '') }}</span>
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
              prop="operatorItem"
              label="操作"
              width='160'
              align='center'>
                <template slot-scope="scope">
                  <operate-update :data="scope.row" :formInline="formInline"></operate-update>
                  |
                  <a @click='outline(scope.row)' class='outline'>申请下线</a>
                </template>
            </el-table-column>
        </el-table>
        <div class="page-box">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formInline.page" :page-sizes="[5, 10, 20, 30, 40, 50]" :page-size="formInline.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
      </el-col>
      <!-- 添加标签部分 -->
       <el-dialog title="添加新三级标签" :visible.sync="dialogFormVisible" align='left' :style="{ fontWeight: 'bold'}" width='800px'>
        <el-form :model="form" label-position='left' :label-width="formLabelWidth" >
            <el-form-item label="一级标签词" required>
            <el-select v-model="form.first_tagid" placeholder="请选择一级标签词" @change='changeSecondList' filterable clearable>
                <el-option v-for="(item, index) in cascaderList" :label="item.first_tagname" :key='index' :value="item.first_tagid" props="item.child_tag"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="二级标签词" required>
            <el-select v-model="form.second_tagid" placeholder="请选择二级标签词" filterable clearable>
                <el-option v-for='(item,index) in secondList' :key='index' :label="item.second_tagname" :value="item.second_tagid"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="三级标签词" required>
                <el-input v-model="form.third_tagname" placeholder="请输入三级标签" class='inp' clearable></el-input>
            </el-form-item>
             <el-form-item label="三级标签类型" required>
            <el-select v-model="form.type" placeholder="请选择三级标签类型" filterable clearable>
                <el-option v-for='(item,index) in thirdType' :key='index' :label="item.label" :value="item.value"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="是否有歧义" required>
            <el-select v-model="form.is_mbiguity">
                <el-option label="有歧义" :value="1"></el-option>
                <el-option label="无歧义" :value="0" ></el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="别名或昵称">
                <el-input v-model="form.nickname" placeholder="请输入别名或昵称" class='inp' clearable></el-input>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="form.keywords" placeholder="请输入关键词" class='inp' clearable></el-input>
                <span class='lib'>可添加多个关键词，关键词之间用";"分隔，组合关键词用#$#分隔。</span>
            </el-form-item>
            <el-form-item label="举例微博链接" required>
                <el-input type="url" v-model="form.weibo_mid" placeholder="请输入微博链接" class='inp' clearable></el-input>
                <span class='lib'>至少举例一个微博case证明提及关键词或组合关键词符合打上标签的标准。</span>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hideAdd">取 消</el-button>
            <el-button type="primary" @click="add" style='margin-left:20px;'>添 加</el-button>
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
import operateUpdate from "./operateUpdate";
import { tag3type } from "@/utils/tag3typeconf";

export default {
  name: "FieldManage",
  components: {
    Auth,
    operateUpdate
  },
  data() {
    return {
      apiConf: {
        //API
        getUserRole: "/role/getUserRole" ,//权限获取
        getFieldTag: "/tag/getFieldTag", // 标签查询
        getFirstSecondTag:"/tag/getFirstSecondTag", //获取一二级标签
        operatorFieldTag: "/tag/operatorFieldTag" //领域标签相关操作，增、删、改
      },
      cateList: null,
      tips: "loading...", //暂无有权限的领域
      downloadCurLoading: false,
      downloadAllLoading: false,
      dialogFormVisible: false,
      cascaderList: null,
      secondList: null,
      total: 0,
      hasExamine: '',
      hasAllArea: '',
      hasCurArea: '',
      formInline: {
        tagname: '',
        first_tagid: '',
        is_like: '',
        page: 1,
        size: 5
      },
      tableData: null,
      formLabelWidth: '120px',
      form: {
        first_tagid: '',
        second_tagid: '',
        third_tagname: '',
        type: '',
        is_mbiguity: 1,
        nickname: '',
        keywords: '',
        weibo_mid: ''
      },
      thirdType: null
    };
  },
  computed: {
    ...mapGetters(["pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.getUserRole();
      }
    },
    getTags() {
      let data = {
        url : this.apiConf.getFirstSecondTag
      }
      this.$store.dispatch("CommonGet", data).then( res => {
        if (res.code && res.code === 200) {
          this.cascaderList = res.data;
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
            message: "获取一二级标签列表失败",
            type: "error",
            duration: 1000
          });
      })
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
            this.hasCurArea = res.result.permission.indexOf(17) > -1 ? true : false;
            if (!this.hasCurArea && !this.hasAllArea) {
              this.tips = "暂无管理权限";
              return;
            }
            this.cateList = res.result.field || [];
            (this.cateList.length > 0) || (this.tips = "暂无有权限的领域");
            this.formInline.first_tagid = this.hasAllArea ? 'none_field' : this.cateList[0].id;
            this.getTags();
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
        url: this.apiConf.getFieldTag,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.tableData = res.data ? res.data.data : null;
          this.total = res.data ? res.data.total : 0;
          if (!res.data || !res.data.data.length) {
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
    downloadAll(list) {
      import("@/vendor/Export2Excel").then(excel => {
        const filename = "FieldList";
        const tHeader = [
          "一级标签词",
          "二级标签词",
          "三级标签词",
          "三级标签类型",
          "是否有歧义",
          "别名或昵称",
          "关键词",
        ];
        const filterVal = [
          "first_tagname",
          "second_tagname",
          "third_tagname",
          "tag3type",
          "is_mbiguity",
          "nickname",
          "keywords",
        ];
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel(tHeader, data, filename);
        if (this.downloadCurLoading) {
          this.downloadCurLoading = false;
        } else if (this.downloadAllLoading) {
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
          return v[j];
        })
      );
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
        url: this.apiConf.getFieldTag,
        params: params
      };
      this.$store.dispatch("CommonGet", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.downloadAll(res.data.data);
        } else {
          this.downloadAllLoading = false;
        }
      });
    },
    handleDownloadCur() {
      this.downloadCurLoading = true;
      const list = this.tableData;
      this.downloadAll(list);
    },
    showAdd() {
      this.dialogFormVisible = true
    },
    changeSecondList(val) {
      this.form.second_tagid = '';
      this.secondList = val ? this.cascaderList[val].second_tagid : [];
    },
    add() {
      if (!this.form.first_tagid) {
        Message({
          showClose: true,
          message: "请选择一级标签词！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.form.second_tagid) {
        Message({
          showClose: true,
          message: "请选择二级标签词！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.form.third_tagname) {
        Message({
          showClose: true,
          message: "请填写三级标签词！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.form.type) {
        Message({
          showClose: true,
          message: "请选择三级标签类型！",
          type: "error",
          duration: 1000
        });
        return;
      }
      if (!this.form.weibo_mid) {
        Message({
          showClose: true,
          message: "请填写举例微博链接！",
          type: "error",
          duration: 1000
        });
        return;
      }
      this.form.operator = this.email;
      this.form.update = 1;
      let data = {
        url: this.apiConf.operatorFieldTag,
        params: this.form
      }
      this.$store.dispatch('CommonGet', data).then(res => {
        if (res.code && res.code === 200 ) {
          Message({
            showClose: true,
            message: "添加成功！",
            type: "success",
            duration: 1000
          });
          this.clearInp();
        } else {
          Message({
            showClose: true,
            message: res.msg,
            type: "error",
            duration: 1000
          });
          this.clearInp();
        }
      }, error => {
        Message({
            showClose: true,
            message: "添加失败",
            type: "error",
            duration: 1000
          });
        this.clearInp();
      })
      this.dialogFormVisible = false;
    },
    hideAdd() {
      this.dialogFormVisible = false
      this.clearInp();
    },
    clearInp() {
      // this.form = {
      //   first_tagid: '',
      //   second_tagid: '',
      //   third_tagname: '',
      //   third_tag_type: '',
      //   is_mbiguity: 1,
      //   nickname: '',
      //   keywords: '',
      //   weibo_mid: ''
      // }
      for (var i in this.form) {
        if ( i === 'is_mbiguity') {
          this.form[i] = 1;
        } else {
          this.form[i] = '';
        }
      }
    },
    outline(info) {
      const h = this.$createElement;
      this.$msgbox({
        message: h('p', null, [
          h('span', null, '您确认要申请下线该标签词么？'),
        ]),
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            info.update = 3;
            info.operator = this.email;
            info.is_mbiguity = info.is_mbiguity === "是" ? 1 : 0;
            info.weibo_mid = info.weibo_mid ? info.weibo_mid : 1;
            let params = info;
            let data = {
              url: this.apiConf.operatorFieldTag,
              params: params
            }
            this.$store.dispatch('CommonGet', data).then(res => {
              if (res.code && res.code === 200 ) {
                done();
                Message({
                  showClose: true,
                  message: "申请下线请求发送成功",
                  type: "success",
                  duration: 1000
                });
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
    }
  },
  created() {
    this.thirdType = tag3type;
    this.init();
  },
  watch: {
    pageAuth() {
      this.init();
    }
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
a {
  font-size:14px; 
  color:#409eff; 
  &:hover {
    text-decoration: underline;
  }
}
.lib {
    margin-left: 20px;
    font-size: 12px;
    color: #888;
    font-weight: normal;
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
.outline:hover {
  color: #409eff;
  text-decoration: underline;
}
</style>