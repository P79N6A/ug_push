webpackJsonp([62],{H0O9:function(e,t){},NrFE:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("mvHQ"),a=n.n(s),i=n("Dd8w"),o=n.n(i),l=n("vzON"),c=n("NYxO"),r=n("zL8q"),u="http://i.hot.weibo.com",h={name:"setTopPage",components:{Auth:l.a},data:function(){return{cname:"",formInline:{category:"",data:""}}},computed:o()({},Object(c.b)(["pageAuth","email","channelList","channelApi"])),methods:{init:function(){1===this.pageAuth&&this.setChannelList()},setChannelList:function(){var e={url:"/channel/getAuthChannelList",params:{username:this.email,cip:230}};this.$store.dispatch("SetChannelList",e)},setTopEvent:function(){var e=this;this.formInline.category?this.formInline.data?this.$confirm("确定上榜?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.setTopAction()}).catch(function(){e.$message({type:"info",message:"已取消上榜操作"})}):Object(r.Message)({showClose:!0,message:"请输入mid！",type:"error",duration:1e3}):Object(r.Message)({showClose:!0,message:"请选择频道！",type:"error",duration:1e3})},setTopAction:function(){var e={url:u+"/3/admin/categoryTop",param:o()({staff:this.email,source:"990750541234567890",type:"set"},this.formInline)},t={data:a()(e),cip:230};this.$store.dispatch("ProxyGet",t).then(function(e){e&&"success"===e.data?Object(r.Message)({showClose:!0,message:"上榜成功",type:"success",duration:1e3}):Object(r.Message)({showClose:!0,message:e&&e.info||"上榜失败",type:"error",duration:0})})},deleteTopEvent:function(){var e=this;this.formInline.category?this.$confirm("确定下榜?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.deleteTopAction()}).catch(function(){e.$message({type:"info",message:"已取消下榜操作"})}):Object(r.Message)({showClose:!0,message:"请选择频道！",type:"error",duration:1e3})},deleteTopAction:function(){var e={url:u+"/3/admin/categoryTop",param:{staff:this.email,source:"990750541234567890",type:"set",category:this.formInline.category}},t={data:a()(e),cip:230};this.$store.dispatch("ProxyGet",t).then(function(e){e&&"success"===e.data?Object(r.Message)({showClose:!0,message:"下榜成功",type:"success",duration:1e3}):Object(r.Message)({showClose:!0,message:e&&e.info||"下榜失败",type:"error",duration:0})})},isValid:function(e){return Date.now()<=1e3*e.end_time||1===e.channel_history}},created:function(){this.init()},watch:{pageAuth:function(){this.init()},channelList:function(){}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return 1===e.pageAuth?n("el-main",[n("el-row",{staticClass:"pane-title-wrap"},[n("el-col",{attrs:{span:24}},[n("h6",{staticClass:"pane-title"},[n("i",{staticClass:"el-icon-goods hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("置顶操作")])])],1),e._v(" "),n("el-row",{staticClass:"content-box-wrap"},[e.channelList&&e.channelList.length>0?n("el-col",{attrs:{xs:24,sm:18,md:12,lg:9,xl:4}},[n("el-form",{ref:"formInline",staticClass:"pane-form",attrs:{model:e.formInline,"label-width":"100px",size:"small"}},[n("el-form-item",{attrs:{label:"选择频道",required:""}},[n("el-select",{attrs:{filterable:"",placeholder:"请选择频道"},model:{value:e.formInline.category,callback:function(t){e.$set(e.formInline,"category",t)},expression:"formInline.category"}},e._l(e.channelList,function(t,s){return e.isValid(t)?n("el-option",{key:s,attrs:{label:t.channel_name,value:t.channel_id}}):e._e()}))],1),e._v(" "),n("el-form-item",{attrs:{label:"微博mid",prop:"mid"}},[n("el-input",{attrs:{"suffix-icon":"el-icon-edit",placeholder:"请输入mid",clearable:""},model:{value:e.formInline.data,callback:function(t){e.$set(e.formInline,"data",t)},expression:"formInline.data"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"success",size:"small"},on:{click:function(t){e.setTopEvent()}}},[e._v("上榜")]),e._v(" "),n("el-button",{attrs:{type:"warning",size:"small"},on:{click:function(t){e.deleteTopEvent()}}},[e._v("下榜")])],1)],1)],1):null==e.channelApi?n("el-col",{attrs:{span:24}},[e._v("\n            loading……\n        ")]):"response failed"==e.channelApi?n("el-col",{attrs:{span:24}},[n("el-alert",{attrs:{title:"网络请求异常，请重试~",type:"warning","show-icon":"",closable:!1}})],1):1==e.channelApi?n("el-col",{attrs:{span:24}},[n("el-alert",{attrs:{title:"暂无有权限的频道",type:"warning","show-icon":"",closable:!1}})],1):e._e()],1)],1):0===e.pageAuth?n("el-main",[n("auth")],1):e._e()},staticRenderFns:[]};var m=n("VU/8")(h,p,!1,function(e){n("H0O9")},"data-v-a8062d52",null);t.default=m.exports}});