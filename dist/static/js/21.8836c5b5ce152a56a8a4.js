webpackJsonp([21],{"/QdG":function(e,t){},ACmk:function(e,t){},WOxY:function(e,t){},wZP6:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=i("Dd8w"),a=i.n(o),n=i("vzON"),s=i("NYxO"),r=(i("0xDb"),i("zL8q")),c=i("mvHQ"),l=i.n(c),m="http://i.hot.weibo.com",u={name:"PockectPush",props:["email"],data:function(){return{configForm:null,operateText:"",tips:"loading…"}},methods:{init:function(){this.getConfig()},getConfig:function(){var e=this,t={url:m+"/3/admin/getPush",param:{source:"990750541234567890"}},i={data:l()(t),cip:230};this.$store.dispatch("ProxyGet",i).then(function(t){t?e.configForm=t:e.tips="Push降级配置获取失败"})},resetForm:function(e){this.$refs[e].resetFields()},saveEvent:function(){var e=this;""!==this.configForm.limit_qps?this.$prompt("请输入操作说明","确认修改配置",{confirmButtonText:"确定",cancelButtonText:"取消",inputType:"textarea",inputPattern:/[\s\S]/,inputErrorMessage:"输入内容不能为空",beforeClose:function(t,i,o){"confirm"===t&&(e.operateText=i.inputValue),o()}}).then(function(){e.saveConfig()}).catch(function(){e.$message({type:"info",message:"取消操作"})}):Object(r.Message)({showClose:!0,message:"请填写push限流，且值大于等于0！",type:"error",duration:3e3})},saveConfig:function(){var e=this,t={url:m+"/3/admin/setPush",param:{staff:this.email,source:"990750541234567890",ext:this.operateText,data:this.configForm.limit_qps+","+this.configForm.push_recommend+","+this.configForm.push_redis+","+this.configForm.push_uve+","+this.configForm.push_log}},i={data:l()(t),cip:230};this.$store.dispatch("ProxyGet",i).then(function(t){t&&"设置成功!"===t.msg?(e.getConfig(),Object(r.Message)({showClose:!0,message:"设置成功!",type:"success",duration:1e3})):Object(r.Message)({showClose:!0,message:t&&t.msg||"设置失败",type:"error",duration:0})})}},created:function(){this.init()}},f={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.configForm?i("el-col",{attrs:{xs:24,sm:18,md:12,lg:9,xl:4}},[i("el-form",{ref:"configForm",staticClass:"pane-form",attrs:{model:e.configForm,"label-width":"160px","label-position":"left",size:"small"}},[i("el-form-item",{attrs:{label:"push限流",prop:"limit_qps",required:""}},[i("el-input",{attrs:{placeholder:"请输入"},on:{change:function(t){e.configForm.limit_qps=e.configForm.limit_qps>0?e.configForm.limit_qps:0}},model:{value:e.configForm.limit_qps,callback:function(t){e.$set(e.configForm,"limit_qps",e._n(t))},expression:"configForm.limit_qps"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开启后端引擎开关",prop:"push_recommend"}},[i("el-switch",{attrs:{"active-value":0,"inactive-value":1},model:{value:e.configForm.push_recommend,callback:function(t){e.$set(e.configForm,"push_recommend",t)},expression:"configForm.push_recommend"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开启redis资源开关",prop:"push_redis"}},[i("el-switch",{attrs:{"active-value":0,"inactive-value":1},model:{value:e.configForm.push_redis,callback:function(t){e.$set(e.configForm,"push_redis",t)},expression:"configForm.push_redis"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开启push广告开关",prop:"push_uve"}},[i("el-switch",{attrs:{"active-value":0,"inactive-value":1},model:{value:e.configForm.push_uve,callback:function(t){e.$set(e.configForm,"push_uve",t)},expression:"configForm.push_uve"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开启日志开关",prop:"push_log"}},[i("el-switch",{attrs:{"active-value":0,"inactive-value":1},model:{value:e.configForm.push_log,callback:function(t){e.$set(e.configForm,"push_log",t)},expression:"configForm.push_log"}})],1),e._v(" "),i("div",{staticClass:"clearfix"},[i("el-button",{staticClass:"right",attrs:{type:"info",size:"small",plain:""},on:{click:function(t){e.resetForm("configForm")}}},[e._v("重置")]),e._v(" "),i("el-button",{staticClass:"right",staticStyle:{"margin-bottom":"10px","margin-right":"10px"},attrs:{type:"success",size:"small"},on:{click:e.saveEvent}},[e._v("保存设置")])],1)],1)],1):i("p",{staticClass:"none-tips"},[e._v(e._s(e.tips))])},staticRenderFns:[]};var p=i("VU/8")(u,f,!1,function(e){i("WOxY")},"data-v-464f18d6",null).exports,_={name:"operateMixture",props:["email"],data:function(){return{configForm:null,percentList:[{label:"0%",value:0},{label:"25%",value:1},{label:"50%",value:2},{label:"75%",value:3},{label:"100%",value:4}],operateText:"",tips:"loading…"}},methods:{init:function(){this.getConfig()},getConfig:function(){var e=this,t={url:"http://i.hot.weibo.com/3/admin/get",param:{source:"990750541234567890"}},i={data:l()(t),cip:230};this.$store.dispatch("ProxyGet",i).then(function(t){t?e.configForm=t:e.tips="混合流降级配置获取失败"})},resetForm:function(e){this.$refs[e].resetFields()},saveEvent:function(){var e=this;""!==this.configForm.max_mix_backend_retry?""!==this.configForm.max_mix_backend_mhf?""!==this.configForm.max_mix_backend_mlf?""!==this.configForm.max_mix_backend_timeout?this.$prompt("请输入操作说明","确认修改配置",{confirmButtonText:"确定",cancelButtonText:"取消",inputType:"textarea",inputPattern:/[\s\S]/,inputErrorMessage:"输入内容不能为空",beforeClose:function(t,i,o){"confirm"===t&&(e.operateText=i.inputValue),o()}}).then(function(){e.saveConfig()}).catch(function(){e.$message({type:"info",message:"取消操作"})}):Object(r.Message)({showClose:!0,message:"请填写后端错误引擎上限，且值大于等于0！",type:"error",duration:3e3}):Object(r.Message)({showClose:!0,message:"请填写低频限流，且值大于等于0！",type:"error",duration:3e3}):Object(r.Message)({showClose:!0,message:"请填写中高频限流，且值大于等于0！",type:"error",duration:3e3}):Object(r.Message)({showClose:!0,message:"请填写重试限流，且值大于等于0！",type:"error",duration:3e3})},saveConfig:function(){var e=this,t={url:"http://i.hot.weibo.com/3/admin/set",param:{staff:this.email,source:"990750541234567890",ext:this.operateText,data:this.configForm.bigdata+","+this.configForm.show_batch+","+this.configForm.uve+","+this.configForm.max_mix_backend_retry+","+this.configForm.max_mix_backend_mhf+","+this.configForm.max_mix_backend_mlf+","+this.configForm.switch_platform_ifce+","+this.configForm.max_mix_backend_timeout}},i={data:l()(t),cip:230};this.$store.dispatch("ProxyGet",i).then(function(t){t&&"设置成功!"===t.msg?(e.getConfig(),Object(r.Message)({showClose:!0,message:"设置成功!",type:"success",duration:1e3})):Object(r.Message)({showClose:!0,message:t&&t.msg||"设置失败",type:"error",duration:0})})}},created:function(){this.init()}},h={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.configForm?i("el-col",{attrs:{xs:24,sm:18,md:12,lg:9,xl:4}},[i("el-form",{ref:"configForm",staticClass:"pane-form",attrs:{model:e.configForm,"label-width":"160px","label-position":"left",size:"small"}},[i("el-form-item",{attrs:{label:"混合流接口",prop:"bigdata",required:""}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.configForm.bigdata,callback:function(t){e.$set(e.configForm,"bigdata",t)},expression:"configForm.bigdata"}},e._l(e.percentList,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"平台show_batch接口",prop:"show_batch",required:""}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.configForm.show_batch,callback:function(t){e.$set(e.configForm,"show_batch",t)},expression:"configForm.show_batch"}},e._l(e.percentList,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"广告",prop:"uve",required:""}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.configForm.uve,callback:function(t){e.$set(e.configForm,"uve",t)},expression:"configForm.uve"}},e._l(e.percentList,function(e){return i("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"平台接口调用类型",prop:"switch_platform_ifce",required:""}},[i("el-select",{attrs:{placeholder:"请选择"},model:{value:e.configForm.switch_platform_ifce,callback:function(t){e.$set(e.configForm,"switch_platform_ifce",t)},expression:"configForm.switch_platform_ifce"}},[i("el-option",{attrs:{label:"RPC",value:0}}),e._v(" "),i("el-option",{attrs:{label:"HTTP",value:1}})],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"重试限流",prop:"max_mix_backend_retry",required:""}},[i("el-input",{attrs:{placeholder:"请输入"},on:{change:function(t){e.configForm.max_mix_backend_retry=e.configForm.max_mix_backend_retry>0?e.configForm.max_mix_backend_retry:0}},model:{value:e.configForm.max_mix_backend_retry,callback:function(t){e.$set(e.configForm,"max_mix_backend_retry",e._n(t))},expression:"configForm.max_mix_backend_retry"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"中高频限流",prop:"max_mix_backend_mhf",required:""}},[i("el-input",{attrs:{placeholder:"请输入"},on:{change:function(t){e.configForm.max_mix_backend_mhf=e.configForm.max_mix_backend_mhf>0?e.configForm.max_mix_backend_mhf:0}},model:{value:e.configForm.max_mix_backend_mhf,callback:function(t){e.$set(e.configForm,"max_mix_backend_mhf",e._n(t))},expression:"configForm.max_mix_backend_mhf"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"低频限流",prop:"max_mix_backend_mlf",required:""}},[i("el-input",{attrs:{placeholder:"请输入"},on:{change:function(t){e.configForm.max_mix_backend_mlf=e.configForm.max_mix_backend_mlf>0?e.configForm.max_mix_backend_mlf:0}},model:{value:e.configForm.max_mix_backend_mlf,callback:function(t){e.$set(e.configForm,"max_mix_backend_mlf",e._n(t))},expression:"configForm.max_mix_backend_mlf"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"后端引擎错误上限",prop:"max_mix_backend_timeout",required:""}},[i("el-input",{attrs:{placeholder:"请输入"},on:{change:function(t){e.configForm.max_mix_backend_timeout=e.configForm.max_mix_backend_timeout>0?e.configForm.max_mix_backend_timeout:0}},model:{value:e.configForm.max_mix_backend_timeout,callback:function(t){e.$set(e.configForm,"max_mix_backend_timeout",e._n(t))},expression:"configForm.max_mix_backend_timeout"}})],1),e._v(" "),i("div",{staticClass:"clearfix"},[i("el-button",{staticClass:"right",attrs:{type:"info",size:"small",plain:""},on:{click:function(t){e.resetForm("configForm")}}},[e._v("重置")]),e._v(" "),i("el-button",{staticClass:"right",staticStyle:{"margin-bottom":"10px","margin-right":"10px"},attrs:{type:"success",size:"small"},on:{click:e.saveEvent}},[e._v("保存设置")])],1)],1)],1):i("p",{staticClass:"none-tips"},[e._v(e._s(e.tips))])},staticRenderFns:[]};var g=i("VU/8")(_,h,!1,function(e){i("/QdG")},"data-v-3cc53234",null).exports,d={name:"operateMixture",components:{Auth:n.a,Push:p,Mixture:g},data:function(){return{email:"juanmin"}},computed:a()({},Object(s.b)(["pageAuth"])),methods:{init:function(){document.title=this.$route.meta.title,this.email&&this.getPageAuth()},getPageAuth:function(){var e={userid:this.email,username:this.email,path:"/hot/#/hotcenter/operatematerial/pocket",cip:230};this.$store.dispatch("GetPageAuth",e)}},created:function(){this.init()},watch:{email:function(){this.init()},pageAuth:function(){}}},x={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return 1===e.pageAuth?i("el-main",[i("el-row",{staticClass:"pane-title-wrap clearfix"},[i("h6",{staticClass:"pane-title left"},[i("i",{staticClass:"el-icon-date hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("降级配置\n      ")]),e._v(" "),i("el-tag",{staticClass:"right",attrs:{type:"warning",size:"small"}},[e._v(e._s(e.email))])],1),e._v(" "),i("el-row",{staticClass:"content-box-wrap"},[i("el-tabs",{staticStyle:{"padding-top":"18px","padding-left":"14px"},attrs:{"tab-position":"top"}},[i("el-tab-pane",{attrs:{label:"PUSH降级"}},[i("push",{attrs:{email:"email"}})],1),e._v(" "),i("el-tab-pane",{attrs:{label:"混合流降级"}},[i("mixture",{attrs:{email:"email"}})],1)],1)],1)],1):0===e.pageAuth?i("el-main",{staticStyle:{padding:"0 10px"}},[i("auth")],1):e._e()},staticRenderFns:[]};var b=i("VU/8")(d,x,!1,function(e){i("ACmk")},"data-v-01113956",null);t.default=b.exports}});