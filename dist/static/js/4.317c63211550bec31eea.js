webpackJsonp([4],{"3C/1":function(e,t,n){n("M6a0"),n("zQR9"),n("+tPU"),n("qCoq"),n("UvrK"),n("Xjd4"),n("bqnK"),e.exports=n("FeBl").Map},"IfX+":function(e,t){},QIlr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("mvHQ"),a=n.n(i),s=n("Dd8w"),o=n.n(s),c=n("ifoU"),l=n.n(c),r=n("vzON"),h=n("NYxO"),u=(n("0xDb"),n("zL8q")),f="http://i.hot.weibo.com",d="990750541234567890",p={name:"operateMixture",components:{Auth:r.a},data:function(){return{channel_id:"",icon_url:"",channelList:null,channelMap:new l.a,tips:"loading…"}},computed:o()({},Object(h.b)(["email","pageAuth"])),methods:{init:function(){1===this.pageAuth&&this.getChannelList()},getChannelList:function(){var e=this,t={url:"/channel/getAuthChannelList",params:{username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t&&200==t.code?(e.channelList=e.getValidChannel(t.result),e.channelList.length>0?(e.channel_id=e.channelList[0]&&e.channelList[0].channel_id||"",e.setChannelMap(),e.channel_id&&e.getConfig()):e.tips="暂无有权限的频道"):e.tips=t.msg||"频道列表获取失败"},function(t){e.tips="频道列表获取失败"})},setChannelMap:function(){for(var e=this.channelList,t=0;t<e.length;t++)this.channelMap.set(e[t].channel_id,e[t].channel_name)},getConfig:function(){var e=this;if(this.channel_id){var t={url:f+"/3/admin/configChannel",param:{staff:this.email,source:d,type:"icon",action:"get",value:this.channel_id}},n={data:a()(t),cip:230};this.$store.dispatch("ProxyGet",n).then(function(t){t&&200==t.code?e.icon_url=t.data[e.channel_id]:Object(u.Message)({showClose:!0,message:t&&t.msg||"频道已配置Icon获取失败",type:"error",duration:0})})}},saveEvent:function(){var e=this;this.channel_id?this.icon_url?this.icon_url.indexOf(",")>-1?Object(u.Message)({showClose:!0,message:"图标地址中不能有英文逗号（,）",type:"error",duration:3e3}):this.$confirm("保存当前配置, 是否继续?","确认修改配置",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.setConfig()}).catch(function(){e.$message({type:"info",message:"取消操作"})}):Object(u.Message)({showClose:!0,message:"请填写图标地址！",type:"error",duration:3e3}):Object(u.Message)({showClose:!0,message:"请选择频道！",type:"error",duration:3e3})},setConfig:function(){var e=this,t={url:f+"/3/admin/configChannel",param:{staff:this.email,source:d,type:"icon",action:"set",value:this.channel_id+","+this.icon_url}},n={data:a()(t),cip:230};this.$store.dispatch("ProxyGet",n).then(function(t){t&&200==t.code?(e.getConfig(),Object(u.Message)({showClose:!0,message:"配置成功!",type:"success",duration:1e3})):Object(u.Message)({showClose:!0,message:t&&t.msg||"配置失败",type:"error",duration:0})})},deleteEvent:function(){var e=this;this.$confirm("将删除【"+this.channelMap.get(this.channel_id)+"】频道配置?","确认删除",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.deleteConfig()}).catch(function(){e.$message({type:"info",message:"取消操作"})})},deleteConfig:function(){var e=this,t={url:f+"/3/admin/configChannel",param:{staff:this.email,source:d,type:"icon",action:"del",value:""+this.channel_id}},n={data:a()(t),cip:230};this.$store.dispatch("ProxyGet",n).then(function(t){t&&200==t.code?(e.getConfig(),Object(u.Message)({showClose:!0,message:"删除成功!",type:"success",duration:1e3})):Object(u.Message)({showClose:!0,message:t&&t.msg||"删除失败",type:"error",duration:0})})},isValid:function(e){return Date.now()<=1e3*e.end_time||1===e.channel_history},getValidChannel:function(e){var t=[];if(e&&e.length>0)for(var n=0;n<e.length;n++)this.isValid(e[n])&&t.push(e[n]);return t},fiterEvent:function(){this.icon_url.indexOf(",")>-1&&Object(u.Message)({showClose:!0,message:"图标地址中不能有英文逗号（,）",type:"error",duration:3e3})}},created:function(){this.init()},watch:{email:function(){},pageAuth:function(){this.init()},channelList:function(){}}},g={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return 1===e.pageAuth?n("el-main",[n("el-row",{staticClass:"pane-title-wrap"},[n("h6",{staticClass:"pane-title"},[n("i",{staticClass:"el-icon-date hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("Icon配置")])]),e._v(" "),n("el-row",{staticClass:"content-box-wrap"},[e.channelList&&e.channelList.length>0?n("el-col",{attrs:{xs:24,sm:18,md:16,lg:12,xl:4}},[n("el-form",{staticClass:"pane-form",attrs:{"label-width":"80px","label-position":"left",size:"small"}},[n("el-form-item",{attrs:{label:"选择频道",required:""}},[n("el-select",{staticClass:"left",attrs:{placeholder:"请选择",filterable:""},on:{change:e.getConfig},model:{value:e.channel_id,callback:function(t){e.channel_id=t},expression:"channel_id"}},e._l(e.channelList,function(e){return n("el-option",{key:e.channel_id,attrs:{label:e.channel_name,value:e.channel_id}})})),e._v(" "),n("span",{staticClass:"info-tips left hidden-xs-only"},[e._v("（可输入搜索选择频道）")])],1),e._v(" "),n("el-form-item",{attrs:{label:"图标地址",required:""}},[n("el-input",{attrs:{type:"textarea",autosize:{minRows:4},placeholder:"请输入图标（Icon）地址"},on:{change:function(t){e.fiterEvent()}},model:{value:e.icon_url,callback:function(t){e.icon_url=t},expression:"icon_url"}}),e._v(" "),n("span",{staticClass:"info-tips left hidden-xs-only"},[e._v("（图标地址中不可包含英文逗号,）")])],1),e._v(" "),n("el-form-item",[n("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"success",size:"small"},on:{click:e.saveEvent}},[e._v("保存设置")]),e._v(" "),n("el-button",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"danger",size:"small"},on:{click:e.deleteEvent}},[e._v("删除配置")])],1)],1)],1):n("p",{staticClass:"none-tips"},[e._v(e._s(e.tips))])],1)],1):0===e.pageAuth?n("el-main",[n("auth")],1):e._e()},staticRenderFns:[]};var m=n("VU/8")(p,g,!1,function(e){n("IfX+")},"data-v-5edd7461",null);t.default=m.exports},UvrK:function(e,t,n){var i=n("kM2E");i(i.P+i.R,"Map",{toJSON:n("m9gC")("Map")})},Xjd4:function(e,t,n){n("9Bbf")("Map")},bqnK:function(e,t,n){n("HpRW")("Map")},ifoU:function(e,t,n){e.exports={default:n("3C/1"),__esModule:!0}},qCoq:function(e,t,n){"use strict";var i=n("9C8M"),a=n("LIJb");e.exports=n("qo66")("Map",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{get:function(e){var t=i.getEntry(a(this,"Map"),e);return t&&t.v},set:function(e,t){return i.def(a(this,"Map"),0===e?0:e,t)}},i,!0)}});