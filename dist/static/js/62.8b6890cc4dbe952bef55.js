webpackJsonp([62],{Xk2d:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("mvHQ"),s=i.n(n),o=i("Dd8w"),a=i.n(o),r=i("vzON"),c=i("NYxO"),l=(i("0xDb"),i("zL8q")),m="http://i.hot.weibo.com",f="990750541234567890",h={name:"operateMixture",components:{Auth:r.a},data:function(){return{configForm:{},channel_id:"",channelList:null,tips:"loading…"}},computed:a()({},Object(c.b)(["email","pageAuth"])),methods:{init:function(){1===this.pageAuth&&this.getChannelList()},getChannelList:function(){var e=this,t={url:"/channel/getAuthChannelList",params:{username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t&&200==t.code?(e.channelList=e.getValidChannel(t.result),e.channelList.length>0?(e.channel_id=e.channelList[0]&&e.channelList[0].channel_id||"",e.channel_id&&e.getConfig()):e.tips="暂无有权限的频道"):e.tips=t.msg||"频道列表获取失败"},function(t){e.tips="频道列表获取失败"})},getConfig:function(){var e=this;if(this.channel_id){var t={url:m+"/3/admin/configChannel",param:{staff:this.email,source:f,type:"tip",action:"get",value:this.channel_id}},i={data:s()(t),cip:230};this.$store.dispatch("ProxyGet",i).then(function(t){t&&200==t.code?e.configForm=t.data||!1:(Object(l.Message)({showClose:!0,message:t&&t.msg||"频道已配置Tip获取失败",type:"error",duration:0}),e.tips=t&&t.msg||"频道已配置Tip获取失败")})}},saveEvent:function(){var e=this;this.channel_id?this.configForm.text?0===this.configForm.times||this.configForm.times?0===this.configForm.interval||this.configForm.interval?0===this.configForm.insert_index||this.configForm.insert_index?this.configForm.start_time?this.configForm.end_time?this.$confirm("保存当前配置, 是否继续?","确认修改配置",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.setConfig()}).catch(function(){e.$message({type:"info",message:"取消操作"})}):Object(l.Message)({showClose:!0,message:"请输入结束时间！",type:"error",duration:3e3}):Object(l.Message)({showClose:!0,message:"请输入开始时间！",type:"error",duration:3e3}):Object(l.Message)({showClose:!0,message:"请输入插入序号！",type:"error",duration:3e3}):Object(l.Message)({showClose:!0,message:"请输入间隔时间！",type:"error",duration:3e3}):Object(l.Message)({showClose:!0,message:"请输入提示次数！",type:"error",duration:3e3}):Object(l.Message)({showClose:!0,message:"请输入提示文案！",type:"error",duration:3e3}):Object(l.Message)({showClose:!0,message:"请选择频道！",type:"error",duration:3e3})},setConfig:function(){var e=this,t={url:m+"/3/admin/configChannel",param:{staff:this.email,source:f,type:"tip",action:"set",value:this.channel_id+","+this.configForm.text+","+this.configForm.times+","+this.configForm.interval+","+this.configForm.insert_index,start_time:this.configForm.start_time,end_time:this.configForm.end_time}},i={data:s()(t),cip:230};this.$store.dispatch("ProxyGet",i).then(function(t){t&&200==t.code?(e.getConfig(),Object(l.Message)({showClose:!0,message:"配置成功!",type:"success",duration:1e3})):Object(l.Message)({showClose:!0,message:t&&t.msg||"配置失败",type:"error",duration:0})})},deleteEvent:function(){var e=this;this.$confirm("将删除所有频道配置?","确认删除",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.deleteConfig()}).catch(function(){e.$message({type:"info",message:"取消操作"})})},deleteConfig:function(){var e=this,t={url:m+"/3/admin/configChannel",param:{staff:this.email,source:f,type:"tip",action:"del"}},i={data:s()(t),cip:230};this.$store.dispatch("ProxyGet",i).then(function(t){t&&200==t.code?(e.getConfig(),Object(l.Message)({showClose:!0,message:"删除成功!",type:"success",duration:1e3})):Object(l.Message)({showClose:!0,message:t&&t.msg||"删除失败",type:"error",duration:0})})},isValid:function(e){return Date.now()<=1e3*e.end_time||1===e.channel_history},getValidChannel:function(e){var t=[];if(e&&e.length>0)for(var i=0;i<e.length;i++)this.isValid(e[i])&&t.push(e[i]);return t}},created:function(){this.init()},watch:{email:function(){},pageAuth:function(){this.init()},channelList:function(){}}},g={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return 1===e.pageAuth?i("el-main",[i("el-row",{staticClass:"pane-title-wrap"},[i("h6",{staticClass:"pane-title"},[i("i",{staticClass:"el-icon-date hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("Tip配置")])]),e._v(" "),i("el-row",{staticClass:"content-box-wrap"},[e.configForm?i("el-col",{attrs:{xs:24,sm:18,md:16,lg:12,xl:4}},[i("el-form",{staticClass:"pane-form",attrs:{"label-width":"120px","label-position":"left",size:"small"}},[i("el-form-item",{attrs:{label:"选择频道",required:""}},[i("el-select",{staticClass:"left",attrs:{placeholder:"请选择",filterable:""},on:{change:e.getConfig},model:{value:e.channel_id,callback:function(t){e.channel_id=t},expression:"channel_id"}},e._l(e.channelList,function(t,n){return e.isValid(t)?i("el-option",{key:n,attrs:{label:t.channel_name,value:t.channel_id}}):e._e()})),e._v(" "),i("span",{staticClass:"info-tips left hidden-xs-only"},[e._v("（可输入搜索选择频道）")])],1),e._v(" "),i("el-form-item",{attrs:{label:"提示文案",required:""}},[i("el-input",{attrs:{type:"textarea",placeholder:"请输入提示文案"},model:{value:e.configForm.text,callback:function(t){e.$set(e.configForm,"text",t)},expression:"configForm.text"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"提示次数",required:""}},[i("el-input",{attrs:{placeholder:"请输入提示次数"},on:{change:function(t){e.configForm.times=e.configForm.times>1?e.configForm.times:1}},model:{value:e.configForm.times,callback:function(t){e.$set(e.configForm,"times",e._n(t))},expression:"configForm.times"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"间隔时间（秒）",required:""}},[i("el-input",{attrs:{placeholder:"请输入间隔时间"},on:{change:function(t){e.configForm.interval=e.configForm.interval>1?e.configForm.interval:1}},model:{value:e.configForm.interval,callback:function(t){e.$set(e.configForm,"interval",e._n(t))},expression:"configForm.interval"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"插入序号",required:""}},[i("el-input",{attrs:{placeholder:"请输入插入序号"},on:{change:function(t){e.configForm.insert_index=e.configForm.insert_index>1?e.configForm.insert_index:1}},model:{value:e.configForm.insert_index,callback:function(t){e.$set(e.configForm,"insert_index",e._n(t))},expression:"configForm.insert_index"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"开始时间",required:""}},[i("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择开始日期时间"},model:{value:e.configForm.start_time,callback:function(t){e.$set(e.configForm,"start_time",t)},expression:"configForm.start_time"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"结束时间",required:""}},[i("el-date-picker",{attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss","value-format":"yyyy-MM-dd HH:mm:ss",placeholder:"选择结束日期时间"},model:{value:e.configForm.end_time,callback:function(t){e.$set(e.configForm,"end_time",t)},expression:"configForm.end_time"}})],1),e._v(" "),i("el-form-item",[i("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"success",size:"small"},on:{click:e.saveEvent}},[e._v("保存设置")]),e._v(" "),i("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"danger",size:"small"},on:{click:e.deleteEvent}},[e._v("删除配置")])],1)],1)],1):i("p",{staticClass:"none-tips"},[e._v(e._s(e.tips))])],1)],1):0===e.pageAuth?i("el-main",[i("auth")],1):e._e()},staticRenderFns:[]};var d=i("VU/8")(h,g,!1,function(e){i("sgQa")},"data-v-98a7ba56",null);t.default=d.exports},sgQa:function(e,t){}});