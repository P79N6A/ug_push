webpackJsonp([54],{COyt:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("mvHQ"),i=n.n(a),s=n("Dd8w"),l=n.n(s),c=n("vzON"),o=n("NYxO"),r=n("zL8q"),h={name:"shieldPage",components:{Auth:c.a},data:function(){return{typeList:{uid:"UID",url:"URL",keyword:"关键字"},placeholder:{uid:"请输入uid 多个值英文逗号（,）分割",url:"请输入url 多个值英文逗号（,）分割",keyword:"请输入关键字 多个值同组内英文逗号（,）分割 不同组 | 分割"},formInline:{type:"uid",value:""},channel_id:""}},computed:l()({},Object(o.b)(["pageAuth","email","channelList","channelApi"])),methods:{init:function(){1===this.pageAuth&&this.setChannelList()},setChannelList:function(){var e={url:"/channel/getAuthChannelList",params:{username:this.email,cip:230}};this.$store.dispatch("SetChannelList",e)},blackEvent:function(e){var t=this;if(this.formInline.value){var n="channel_black_content_add"===e?"确定屏蔽物料？":"确定取消屏蔽？";this.$confirm(n,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){t.blackAction(e)}).catch(function(){t.$message({type:"info",message:"已取消操作"})})}else Object(r.Message)({showClose:!0,message:this.placeholder[this.formInline.type],type:"error",duration:3e3})},blackAction:function(e){var t={url:"http://10.75.28.123:7020/channel_business",param:{staff:this.email,type:e,value:i()(this.formInline)}};i()(t);console.log(t)},clearEvent:function(){var e=this;this.channel_id?this.$confirm("确定清除历史库？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.clearAction()}).catch(function(){e.$message({type:"info",message:"已取消操作"})}):Object(r.Message)({showClose:!0,message:"请选择频道！",type:"error",duration:3e3})},clearAction:function(){var e=this,t={url:"http://172.16.140.62:9999/clean",param:{staff:this.email,channel_id:this.channel_id}},n={data:i()(t),cip:230};this.$store.dispatch("ProxyGet",n).then(function(t){e.$alert("正在清除历史库，请稍后验证！","",{confirmButtonText:"确定",callback:function(t){e.channel_id=""}})}).catch(function(e){Object(r.Message)({showClose:!0,message:"操作失败",type:"error",duration:3e3})})},isValid:function(e){return 0===e.channel_history}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return 1===e.pageAuth?n("el-main",[n("el-row",{staticClass:"pane-title-wrap"},[n("el-col",{attrs:{span:24}},[n("h6",{staticClass:"pane-title"},[n("i",{staticClass:"el-icon-goods hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("屏蔽操作（活动频道）")])])],1),e._v(" "),n("el-row",{staticClass:"content-box-wrap"},[n("el-col",{attrs:{xs:24,sm:18,md:12,lg:9,xl:4}},[n("el-form",{ref:"formInline",staticClass:"pane-form",attrs:{model:e.formInline,"label-width":"80px",size:"small"}},[n("el-form-item",{attrs:{label:"选择频道",required:""}},[n("el-select",{attrs:{placeholder:"请选择选择频道"},model:{value:e.channel_id,callback:function(t){e.channel_id=t},expression:"channel_id"}},e._l(e.channelList,function(t,a){return e.isValid(t)?n("el-option",{key:a,attrs:{label:t.channel_name,value:t.channel_id}}):e._e()}))],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"danger",size:"small"},on:{click:function(t){e.clearEvent()}}},[e._v("清除历史库")])],1)],1)],1)],1)],1):0===e.pageAuth?n("el-main",[n("auth")],1):e._e()},staticRenderFns:[]};var d=n("VU/8")(h,u,!1,function(e){n("aogA")},"data-v-d8823a28",null);t.default=d.exports},aogA:function(e,t){}});