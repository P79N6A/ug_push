webpackJsonp([90],{OqJL:function(e,t){},b4Qe:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("mvHQ"),o=i.n(s),n=i("Dd8w"),a=i.n(n),r=i("vzON"),c=i("NYxO"),l=(i("0xDb"),i("zL8q")),u="http://i.hot.weibo.com",m={name:"operateMixture",components:{Auth:r.a},data:function(){return{configForm:null,operateText:"",tips:"loading…"}},computed:a()({},Object(c.b)(["email","pageAuth"])),methods:{init:function(){1===this.pageAuth&&this.getConfig()},getConfig:function(){var e=this,t={url:u+"/3/admin/getPush",param:{source:"990750541234567890"}},i={data:o()(t),cip:230};this.$store.dispatch("ProxyGet",i).then(function(t){t?e.configForm=t:e.tips="Push降级配置获取失败"})},resetForm:function(e){this.$refs[e].resetFields()},saveEvent:function(){var e=this;""!==this.configForm.limit_qps?this.$prompt("请输入操作说明","确认修改配置",{confirmButtonText:"确定",cancelButtonText:"取消",inputType:"textarea",inputPattern:/[\s\S]/,inputErrorMessage:"输入内容不能为空",beforeClose:function(t,i,s){"confirm"===t&&(e.operateText=i.inputValue),s()}}).then(function(){e.saveConfig()}).catch(function(){e.$message({type:"info",message:"取消操作"})}):Object(l.Message)({showClose:!0,message:"请填写push限流，且值大于等于0！",type:"error",duration:3e3})},saveConfig:function(){var e=this,t={url:u+"/3/admin/setPush",param:{staff:this.email,source:"990750541234567890",ext:this.operateText,data:this.configForm.limit_qps+","+this.configForm.push_recommend+","+this.configForm.push_redis+","+this.configForm.push_uve+","+this.configForm.push_log}},i={data:o()(t),cip:230};this.$store.dispatch("ProxyGet",i).then(function(t){t&&"设置成功!"===t.msg?(e.getConfig(),Object(l.Message)({showClose:!0,message:"设置成功!",type:"success",duration:1e3})):Object(l.Message)({showClose:!0,message:t&&t.msg||"设置失败",type:"error",duration:0})})}},created:function(){this.init()},watch:{email:function(){},pageAuth:function(){this.init()}}},p={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return 1===e.pageAuth?i("el-main",[i("el-row",{staticClass:"pane-title-wrap"},[i("h6",{staticClass:"pane-title"},[i("i",{staticClass:"el-icon-date hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("PUSH降级配置")])]),e._v(" "),i("el-row",{staticClass:"content-box-wrap"},[e.configForm?i("el-col",{attrs:{xs:24,sm:18,md:12,lg:9,xl:4}},[i("el-form",{ref:"configForm",staticClass:"pane-form",attrs:{model:e.configForm,"label-width":"160px","label-position":"left",size:"small"}},[i("el-form-item",{attrs:{label:"push限流",prop:"limit_qps",required:""}},[i("el-input",{attrs:{placeholder:"请输入"},on:{change:function(t){e.configForm.limit_qps=e.configForm.limit_qps>0?e.configForm.limit_qps:0}},model:{value:e.configForm.limit_qps,callback:function(t){e.$set(e.configForm,"limit_qps",e._n(t))},expression:"configForm.limit_qps"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开启后端引擎开关",prop:"push_recommend"}},[i("el-switch",{attrs:{"active-value":0,"inactive-value":1},model:{value:e.configForm.push_recommend,callback:function(t){e.$set(e.configForm,"push_recommend",t)},expression:"configForm.push_recommend"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开启redis资源开关",prop:"push_redis"}},[i("el-switch",{attrs:{"active-value":0,"inactive-value":1},model:{value:e.configForm.push_redis,callback:function(t){e.$set(e.configForm,"push_redis",t)},expression:"configForm.push_redis"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开启push广告开关",prop:"push_uve"}},[i("el-switch",{attrs:{"active-value":0,"inactive-value":1},model:{value:e.configForm.push_uve,callback:function(t){e.$set(e.configForm,"push_uve",t)},expression:"configForm.push_uve"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开启日志开关",prop:"push_log"}},[i("el-switch",{attrs:{"active-value":0,"inactive-value":1},model:{value:e.configForm.push_log,callback:function(t){e.$set(e.configForm,"push_log",t)},expression:"configForm.push_log"}})],1),e._v(" "),i("el-form-item",[i("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"success",size:"small"},on:{click:e.saveEvent}},[e._v("保存设置")]),e._v(" "),i("el-button",{attrs:{type:"info",size:"small",plain:""},on:{click:function(t){e.resetForm("configForm")}}},[e._v("重置")])],1)],1)],1):i("p",{staticClass:"none-tips"},[e._v(e._s(e.tips))])],1)],1):0===e.pageAuth?i("el-main",[i("auth")],1):e._e()},staticRenderFns:[]};var f=i("VU/8")(m,p,!1,function(e){i("OqJL")},"data-v-1cf701d8",null);t.default=f.exports}});