webpackJsonp([33],{QDVK:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("Dd8w"),n=l.n(a),i=l("vzON"),s=l("NYxO"),r=l("0xDb"),o=l("zL8q"),c={name:"operateWhite",data:function(){return{dialogVisible:!1,delBtnPopover:!1,updatePopover:!1,selectedChannel:[],tempval:[]}},computed:n()({},Object(s.b)(["email","allChannel"])),props:["data","callback","defaultChannel"],methods:{init:function(){var e=this.data.channellist;if(e&&e.length>0){this.selectedChannel=[];for(var t=0;t<e.length;t++)this.selectedChannel.push(e[t].channel_history+":"+e[t].cid);this.tempval=this.selectedChannel}},_parseTime:function(e,t){return Object(r.e)(e,t)},deleteEvent:function(){var e=this;this.delBtnPopover=!1;var t={url:"/channel_auth/delCAuthByUnames",params:{userids:this.data.username,username:this.email,cip:230}};this.$store.dispatch("DeleteUserChannels",t).then(function(t){t.code&&200==Number(t.code)?(e.dialogVisible=!1,e.callback()):Object(o.Message)({showClose:!0,message:t.msg||"删除失败!",type:"error",duration:3e3})})},updateEvent:function(){var e=this;this.updatePopover=!1;var t={url:"/channel_auth/setCAuthByuserid",params:{channellist:this.selectedChannel.join(","),userid:this.data.username,username:this.email,cip:230}};this.$store.dispatch("SetUserChannels",t).then(function(t){t.code&&200==Number(t.code)?e.callback():Object(o.Message)({showClose:!0,message:t.msg||"保存失败!",type:"error",duration:3e3})})},cancelEvent:function(){this.dialogVisible=!1,this.selectedChannel=this.tempval}},created:function(){this.init()},watch:{data:function(){this.init()}}},h={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return e.data?l("div",[l("el-dialog",{attrs:{title:"【"+e.data.username+"】用户 频道授权",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("el-form",{attrs:{size:"small"}},[l("el-form-item",{attrs:{label:"用户名","label-width":"120px"}},[l("el-input",{attrs:{disabled:""},model:{value:e.data.username,callback:function(t){e.$set(e.data,"username",t)},expression:"data.username"}})],1),e._v(" "),e.allChannel?l("el-form-item",{attrs:{label:"授权频道","label-width":"120px",required:""}},[l("el-select",{attrs:{filterable:"",multiple:"",placeholder:"请选择频道",clearable:""},model:{value:e.selectedChannel,callback:function(t){e.selectedChannel=t},expression:"selectedChannel"}},e._l(e.allChannel,function(e,t){return l("el-option",{key:t,attrs:{label:e.channel_name,value:e.channel_history+":"+e.cid}})}))],1):e._e()],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-popover",{ref:"popoverUpdate",attrs:{placement:"top",width:"200"},model:{value:e.updatePopover,callback:function(t){e.updatePopover=t},expression:"updatePopover"}},[l("p",[e._v("确定保存当前修改？")]),e._v(" "),l("div",{staticStyle:{"text-align":"right",margin:"0"}},[l("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){e.updatePopover=!1}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"primary",round:"",size:"mini"},on:{click:function(t){e.updateEvent()}}},[e._v("确定")])],1)]),e._v(" "),l("el-button",{directives:[{name:"popover",rawName:"v-popover:popoverUpdate",arg:"popoverUpdate"}],attrs:{type:"primary",size:"small"}},[e._v("保 存")]),e._v(" "),l("el-button",{attrs:{size:"small"},on:{click:function(t){e.cancelEvent()}}},[e._v("取 消")])],1)],1),e._v(" "),l("el-popover",{ref:"popDelBtn",attrs:{placement:"top",width:"200"},model:{value:e.delBtnPopover,callback:function(t){e.delBtnPopover=t},expression:"delBtnPopover"}},[l("p",[e._v("确定删除所有授权频道？")]),e._v(" "),l("div",{staticStyle:{"text-align":"right",margin:"0"}},[l("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){e.delBtnPopover=!1}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"primary",round:"",size:"mini"},on:{click:function(t){e.deleteEvent()}}},[e._v("确定")])],1)]),e._v(" "),l("el-button",{staticStyle:{"margin-left":"5px","margin-bottom":"5px"},attrs:{type:"primary",icon:"el-icon-edit",plain:"",size:"mini",title:"编辑"},on:{click:function(t){e.dialogVisible=!0}}},[l("span",{staticClass:"hidden-xs-only"})]),e._v(" "),l("el-button",{directives:[{name:"popover",rawName:"v-popover:popDelBtn",arg:"popDelBtn"}],staticStyle:{"margin-left":"5px"},attrs:{type:"danger",icon:"el-icon-delete",plain:"",size:"mini",title:"删除授权用户"}},[l("span",{staticClass:"hidden-xs-only"})])],1):e._e()},staticRenderFns:[]};var u=l("VU/8")(c,h,!1,function(e){l("lZVA")},"data-v-83004f6c",null).exports,d={name:"accredit",components:{Auth:i.a,OperateAuthuser:u},data:function(){return{userlist:null,dialogVisible:!1,defaultChannel:"",formInline:{ckey:"all:all",userid:"",curPage:1,count:5,total:0},formWhite:{userids:"",ckey:"",popover:!1}}},computed:n()({},Object(s.b)(["pageAuth","email","allChannel"])),methods:{init:function(){1===this.pageAuth&&this.getAllChannel()},getAllChannel:function(){var e={url:"/channel_auth/getChannelList",params:{channel_name:"",username:this.email,cip:230}};this.$store.dispatch("GetAllChannel",e)},onSearch:function(){var e=this,t=this.formInline.ckey.split(":"),l={url:"/channel_auth/getChannelAuthByCid",params:{cid:t[1],channel_history:t[0],userid:this.formInline.userid,username:this.email,page:this.formInline.curPage,count:this.formInline.count,cip:230}};this.$store.dispatch("GetChannelUsers",l).then(function(t){t.code&&200==Number(t.code)&&(e.userlist=t.result,e.userlist&&(e.formInline.total=e.userlist.total||0),Object(o.Message)({showClose:!0,message:"success",type:"success",duration:1e3}))})},showAdd:function(){this.formWhite.ckey="all:all"==this.formInline.ckey?this.defaultChannel:this.formInline.ckey,this.dialogVisible=!0},addEvent:function(){var e=this;if(this.formWhite.popover=!1,this.formWhite.ckey)if(this.formWhite.userids){this.dialogVisible=!1;var t={url:"/channel_auth/addChannelAuth",params:{channellist:this.formWhite.ckey,userids:this.formWhite.userids,username:this.email,cip:230}};this.$store.dispatch("AddChannelUsers",t).then(function(t){t.code&&200==Number(t.code)?(e.cancelEvent(),e.onSearch()):Object(o.Message)({showClose:!0,message:t.msg||"操作失败！",type:"error",duration:3e3})})}else Object(o.Message)({showClose:!0,message:"请输入用户邮箱前缀！",type:"error",duration:1e3});else Object(o.Message)({showClose:!0,message:"请选择频道！",type:"error",duration:1e3})},cancelEvent:function(){this.dialogVisible=!1,this.formWhite={userids:"",ckey:""}},handleSizeChange:function(e){this.formInline.count=e,this.onSearch()},handleCurrentChange:function(e){this.formInline.curPage=e,this.onSearch()},_parseTime:function(e,t){return Object(r.e)(e,t)},getChannelName:function(e){var t="暂无";if(e&&e.length>0){for(var l=[],a=0;a<e.length;a++)l.push(e[a].channel_name);t=l.join("、")}return t}},created:function(){this.init()},watch:{pageAuth:function(){this.init()},allChannel:function(){this.allChannel&&this.allChannel.length>0&&(this.defaultChannel=this.allChannel[0].channel_history+":"+this.allChannel[0].cid,this.onSearch())}}},p={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return 1===e.pageAuth?l("el-main",[l("el-row",{staticClass:"pane-title-wrap"},[l("el-col",{attrs:{span:24}},[l("h6",{staticClass:"pane-title"},[l("i",{staticClass:"el-icon-edit-outline hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("频道授权")])])],1),e._v(" "),l("el-row",{staticClass:"search-form-wrap"},[e.allChannel&&e.allChannel.length>0?l("el-col",{attrs:{span:24}},[e.allChannel?l("el-form",{attrs:{inline:"",model:e.formInline,size:"small"}},[l("el-form-item",{attrs:{label:"邮箱前缀"}},[l("el-input",{attrs:{placeholder:"请输入用户邮箱前缀",clearable:""},model:{value:e.formInline.userid,callback:function(t){e.$set(e.formInline,"userid",t)},expression:"formInline.userid"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"选择频道"}},[l("el-select",{attrs:{filterable:"",placeholder:"请选择频道"},model:{value:e.formInline.ckey,callback:function(t){e.$set(e.formInline,"ckey",t)},expression:"formInline.ckey"}},[l("el-option",{attrs:{label:"所有频道",value:"all:all"}}),e._v(" "),e._l(e.allChannel,function(e,t){return l("el-option",{key:t,attrs:{label:e.channel_name,value:e.channel_history+":"+e.cid}})})],2),e._v(" "),l("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.onSearch}},[l("span",{staticClass:"hidden-xs-only"},[e._v("查询")])])],1)],1):e._e()],1):e._e()],1),e._v(" "),l("el-row",{staticClass:"content-box-wrap"},[l("el-col",{attrs:{span:24}},[e.allChannel&&e.allChannel.length>0?l("div",{staticClass:"clearfix",staticStyle:{padding:"10px 0"}},[l("el-button",{staticClass:"left",attrs:{type:"success",size:"mini"},on:{click:function(t){e.showAdd()}}},[e._v("添加授权用户")])],1):e._e(),e._v(" "),l("el-dialog",{attrs:{title:"添加授权用户",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[l("el-form",{attrs:{model:e.formWhite,size:"small"}},[e.allChannel?l("el-form-item",{attrs:{label:"选择频道","label-width":"120px",required:""}},[l("el-select",{attrs:{filterable:"",placeholder:"请选择频道",clearable:""},model:{value:e.formWhite.ckey,callback:function(t){e.$set(e.formWhite,"ckey",t)},expression:"formWhite.ckey"}},e._l(e.allChannel,function(e,t){return l("el-option",{key:t,attrs:{label:e.channel_name,value:e.channel_history+":"+e.cid}})}))],1):e._e(),e._v(" "),l("el-form-item",{attrs:{label:"邮箱前缀","label-width":"120px",required:""}},[l("el-input",{staticStyle:{"max-width":"194px"},attrs:{type:"textarea",placeholder:"输入用户邮箱前缀 多个值,分隔",clearable:""},model:{value:e.formWhite.userids,callback:function(t){e.$set(e.formWhite,"userids",t)},expression:"formWhite.userids"}})],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-popover",{ref:"popoverAdd",attrs:{placement:"top",width:"200"},model:{value:e.formWhite.popover,callback:function(t){e.$set(e.formWhite,"popover",t)},expression:"formWhite.popover"}},[l("p",[e._v("确定授权？")]),e._v(" "),l("div",{staticStyle:{"text-align":"right",margin:"0"}},[l("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){e.formWhite.popover=!1}}},[e._v("取消")]),e._v(" "),l("el-button",{attrs:{type:"primary",round:"",size:"mini"},on:{click:function(t){e.addEvent()}}},[e._v("确定")])],1)]),e._v(" "),l("el-button",{attrs:{size:"small"},on:{click:function(t){e.cancelEvent()}}},[e._v("取 消")]),e._v(" "),l("el-button",{directives:[{name:"popover",rawName:"v-popover:popoverAdd",arg:"popoverAdd"}],attrs:{type:"primary",size:"small"}},[e._v("添 加")])],1)],1),e._v(" "),e.userlist&&e.userlist.data?l("el-row",[l("el-table",{staticStyle:{width:"100%"},attrs:{data:e.userlist.data,border:"",stripe:""}},[l("el-table-column",{attrs:{align:"left",prop:"username",label:"用户"}}),e._v(" "),l("el-table-column",{attrs:{align:"left",prop:"channellist",label:"频道"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.getChannelName(t.row.channellist)))]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"160",align:"left",prop:"modify_time",label:"授权时间"}}),e._v(" "),l("el-table-column",{attrs:{align:"left",prop:"operator",label:"操作人"}}),e._v(" "),l("el-table-column",{attrs:{align:"left",label:"操作项"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("operate-authuser",{attrs:{data:t.row,"default-channel":e.defaultChannel,callback:e.onSearch}})]}}])})],1),e._v(" "),l("div",{staticStyle:{"padding-top":"10px",overflow:"auto"}},[l("el-pagination",{attrs:{"current-page":e.formInline.curPage,"page-sizes":[5,10,20],"page-size":5,layout:"total, sizes, prev, pager, next, jumper",total:e.formInline.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1):e._e()],1)],1)],1):0===e.pageAuth?l("el-main",[l("auth")],1):e._e()},staticRenderFns:[]};var m=l("VU/8")(d,p,!1,function(e){l("gJ19")},"data-v-4a3a1017",null);t.default=m.exports},gJ19:function(e,t){},lZVA:function(e,t){}});