webpackJsonp([107],{FjND:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=o("mvHQ"),i=o.n(a),n=o("Dd8w"),r=o.n(n),c=o("vzON"),m=o("NYxO"),l=(o("0xDb"),o("zL8q")),s="http://i.hot.weibo.com",_={name:"operateMixture",components:{Auth:c.a},data:function(){return{configForm:null,percentList:[{label:"0%",value:0},{label:"25%",value:1},{label:"50%",value:2},{label:"75%",value:3},{label:"100%",value:4}],operateText:"",tips:"loading…"}},computed:r()({},Object(m.b)(["email","pageAuth"])),methods:{init:function(){1===this.pageAuth&&this.getConfig()},getConfig:function(){var e=this,t={url:s+"/3/admin/get",param:{source:"990750541234567890"}},o={data:i()(t),cip:230};this.$store.dispatch("ProxyGet",o).then(function(t){t?e.configForm=t:e.tips="混合流降级配置获取失败"})},resetForm:function(e){this.$refs[e].resetFields()},saveEvent:function(){var e=this;""!==this.configForm.max_mix_backend_retry&&void 0!=this.configForm.max_mix_backend_retry?""!==this.configForm.max_mix_backend_mhf&&void 0!=this.configForm.max_mix_backend_mhf?""!==this.configForm.max_mix_backend_mlf&&void 0!=this.configForm.max_mix_backend_mlf?""!==this.configForm.max_mix_backend_not200&&void 0!=this.configForm.max_mix_backend_not200?""!==this.configForm.max_hot_backend&&void 0!=this.configForm.max_hot_backend?this.$prompt("请输入操作说明","确认修改配置",{confirmButtonText:"确定",cancelButtonText:"取消",inputType:"textarea",inputPattern:/[\s\S]/,inputErrorMessage:"输入内容不能为空",beforeClose:function(t,o,a){"confirm"===t&&(e.operateText=o.inputValue),a()}}).then(function(){e.saveConfig()}).catch(function(){e.$message({type:"info",message:"取消操作"})}):Object(l.Message)({showClose:!0,message:"请填写热点流限流，且值大于等于0！",type:"error",duration:3e3}):Object(l.Message)({showClose:!0,message:"请填写后端错误引擎上限，且值大于等于0！",type:"error",duration:3e3}):Object(l.Message)({showClose:!0,message:"请填写低频限流，且值大于等于0！",type:"error",duration:3e3}):Object(l.Message)({showClose:!0,message:"请填写中高频限流，且值大于等于0！",type:"error",duration:3e3}):Object(l.Message)({showClose:!0,message:"请填写重试限流，且值大于等于0！",type:"error",duration:3e3})},saveConfig:function(){var e=this,t={url:s+"/3/admin/set",param:{staff:this.email,source:"990750541234567890",ext:this.operateText,data:this.configForm.bigdata+","+this.configForm.show_batch+","+this.configForm.uve+","+this.configForm.max_mix_backend_retry+","+this.configForm.max_mix_backend_mhf+","+this.configForm.max_mix_backend_mlf+","+this.configForm.switch_platform_ifce+","+this.configForm.max_mix_backend_not200+","+this.configForm.max_hot_backend+","+this.configForm.switch_filter_read+","+this.configForm.max_mix_automatic}},o={data:i()(t),cip:230};this.$store.dispatch("ProxyGet",o).then(function(t){t&&"设置成功!"===t.msg?(e.getConfig(),Object(l.Message)({showClose:!0,message:"设置成功!",type:"success",duration:1e3})):Object(l.Message)({showClose:!0,message:t&&t.msg||"设置失败",type:"error",duration:0})})}},created:function(){this.init()},watch:{email:function(){},pageAuth:function(){this.init()}}},f={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return 1===e.pageAuth?o("el-main",[o("el-row",{staticClass:"pane-title-wrap"},[o("h6",{staticClass:"pane-title"},[o("i",{staticClass:"el-icon-date hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("混合流降级配置")])]),e._v(" "),o("el-row",{staticClass:"content-box-wrap"},[e.configForm?o("el-col",{attrs:{xs:24,sm:18,md:12,lg:9,xl:4}},[o("el-form",{ref:"configForm",staticClass:"pane-form",attrs:{model:e.configForm,"label-width":"160px","label-position":"left",size:"small"}},[o("el-form-item",{attrs:{label:"混合流接口",prop:"bigdata",required:""}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:e.configForm.bigdata,callback:function(t){e.$set(e.configForm,"bigdata",t)},expression:"configForm.bigdata"}},e._l(e.percentList,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),o("el-form-item",{attrs:{label:"平台show_batch接口",prop:"show_batch",required:""}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:e.configForm.show_batch,callback:function(t){e.$set(e.configForm,"show_batch",t)},expression:"configForm.show_batch"}},e._l(e.percentList,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),o("el-form-item",{attrs:{label:"广告",prop:"uve",required:""}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:e.configForm.uve,callback:function(t){e.$set(e.configForm,"uve",t)},expression:"configForm.uve"}},e._l(e.percentList,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),o("el-form-item",{attrs:{label:"平台接口调用类型",prop:"switch_platform_ifce",required:""}},[o("el-select",{attrs:{placeholder:"请选择"},model:{value:e.configForm.switch_platform_ifce,callback:function(t){e.$set(e.configForm,"switch_platform_ifce",t)},expression:"configForm.switch_platform_ifce"}},[o("el-option",{attrs:{label:"RPC",value:0}}),e._v(" "),o("el-option",{attrs:{label:"HTTP",value:1}})],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"重试限流",prop:"max_mix_backend_retry",required:""}},[o("el-input",{attrs:{placeholder:"请输入"},on:{change:function(t){e.configForm.max_mix_backend_retry=e.configForm.max_mix_backend_retry>0?e.configForm.max_mix_backend_retry:0}},model:{value:e.configForm.max_mix_backend_retry,callback:function(t){e.$set(e.configForm,"max_mix_backend_retry",e._n(t))},expression:"configForm.max_mix_backend_retry"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"中高频限流",prop:"max_mix_backend_mhf",required:""}},[o("el-input",{attrs:{placeholder:"请输入"},on:{change:function(t){e.configForm.max_mix_backend_mhf=e.configForm.max_mix_backend_mhf>0?e.configForm.max_mix_backend_mhf:0}},model:{value:e.configForm.max_mix_backend_mhf,callback:function(t){e.$set(e.configForm,"max_mix_backend_mhf",e._n(t))},expression:"configForm.max_mix_backend_mhf"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"低频限流",prop:"max_mix_backend_mlf",required:""}},[o("el-input",{attrs:{placeholder:"请输入"},on:{change:function(t){e.configForm.max_mix_backend_mlf=e.configForm.max_mix_backend_mlf>0?e.configForm.max_mix_backend_mlf:0}},model:{value:e.configForm.max_mix_backend_mlf,callback:function(t){e.$set(e.configForm,"max_mix_backend_mlf",e._n(t))},expression:"configForm.max_mix_backend_mlf"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"后端引擎错误上限",prop:"max_mix_backend_not200",required:""}},[o("el-input",{attrs:{placeholder:"请输入"},on:{change:function(t){e.configForm.max_mix_backend_not200=e.configForm.max_mix_backend_not200>0?e.configForm.max_mix_backend_not200:0}},model:{value:e.configForm.max_mix_backend_not200,callback:function(t){e.$set(e.configForm,"max_mix_backend_not200",e._n(t))},expression:"configForm.max_mix_backend_not200"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"热点流限流",prop:"max_hot_backend",required:""}},[o("el-input",{attrs:{placeholder:"请输入"},on:{change:function(t){e.configForm.max_hot_backend=e.configForm.max_hot_backend>0?e.configForm.max_hot_backend:0}},model:{value:e.configForm.max_hot_backend,callback:function(t){e.$set(e.configForm,"max_hot_backend",e._n(t))},expression:"configForm.max_hot_backend"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"过已读开关",prop:"switch_filter_read",required:""}},[o("el-switch",{attrs:{"active-value":1,"inactive-value":2},model:{value:e.configForm.switch_filter_read,callback:function(t){e.$set(e.configForm,"switch_filter_read",t)},expression:"configForm.switch_filter_read"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"自动恢复开关",prop:"max_mix_automatic",required:""}},[o("el-switch",{attrs:{"active-value":0,"inactive-value":1},model:{value:e.configForm.max_mix_automatic,callback:function(t){e.$set(e.configForm,"max_mix_automatic",t)},expression:"configForm.max_mix_automatic"}})],1),e._v(" "),o("el-form-item",[o("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"success",size:"small"},on:{click:e.saveEvent}},[e._v("保存设置")]),e._v(" "),o("el-button",{attrs:{type:"info",size:"small",plain:""},on:{click:function(t){e.resetForm("configForm")}}},[e._v("重置")])],1)],1)],1):o("p",{staticClass:"none-tips"},[e._v(e._s(e.tips))])],1)],1):0===e.pageAuth?o("el-main",[o("auth")],1):e._e()},staticRenderFns:[]};var u=o("VU/8")(_,f,!1,function(e){o("rmVF")},"data-v-0425d3f2",null);t.default=u.exports},rmVF:function(e,t){}});