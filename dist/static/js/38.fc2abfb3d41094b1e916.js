webpackJsonp([38],{LLlN:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("mvHQ"),l=i.n(a),s=i("Dd8w"),o=i.n(s),n=i("NYxO"),r=i("0xDb"),d=i("zL8q"),c=i("vzON"),u={name:"operateWhite",data:function(){return{apiConf:{delFieldBlack:"/field/delFieldBlack",blackAuditPass:"/field/blackAuditPass"},dialogFormVisible:!1,is_expired:0,expire_time:""}},computed:o()({},Object(n.b)(["email"])),props:["data","callback"],methods:{_parseTime:function(e,t){return Object(r.e)(e,t)},changeEpireTime:function(){this.is_expired||(this.expire_time="")},deleteEvent:function(){var e=this;this.$confirm("确定重新上线?","",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.deleteAction()}).catch(function(){e.$message({type:"info",message:"取消操作"})})},deleteAction:function(){var e=this,t={url:this.apiConf.delFieldBlack,params:{uid:this.data.uid,audit_type:1,username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)?(Object(d.Message)({showClose:!0,message:"下线成功！",type:"success",duration:1e3}),e.callback()):Object(d.Message)({showClose:!0,message:t.msg||"下线失败!",type:"error",duration:0})})},showPass:function(){this.dialogFormVisible=!0},passEvent:function(){var e=this,t="";t=2===this.data.audit_type?"确定通过重审？":"确定通过审核?",this.$confirm(t,"",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.passAction()}).catch(function(){e.$message({type:"info",message:"取消操作"})})},passAction:function(){var e=this,t={field_id:this.data.field_id,uid:this.data.uid,audit_type:1,username:this.email,cip:230};if(2!==this.data.audit_type||(t.is_expired=this.is_expired,t.expire_time=this.expire_time,!this.is_expired||this.expire_time)){var i={url:this.apiConf.blackAuditPass,params:t};this.$store.dispatch("CommonGet",i).then(function(t){t.code&&200==Number(t.code)?(Object(d.Message)({showClose:!0,message:"审核成功！",type:"success",duration:1e3}),e.callback()):Object(d.Message)({showClose:!0,message:t.msg||"审核失败!",type:"error",duration:0})}),this.dialogFormVisible=!1}else Object(d.Message)({showClose:!0,message:"请选择有效期！",type:"error",duration:1e3})}},watch:{data:function(){}}},p={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.data?i("div",[i("el-dialog",{attrs:{title:"请选择有效期",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{attrs:{size:"small"}},[i("el-form-item",{attrs:{label:"有效期至","label-width":"80px",required:""}},[i("el-radio-group",{model:{value:e.is_expired,callback:function(t){e.is_expired=t},expression:"is_expired"}},[i("el-radio",{staticStyle:{"margin-top":"5px","margin-left":"10px"},attrs:{label:0},on:{change:e.changeEpireTime}},[e._v("永久")]),e._v(" "),i("el-radio",{staticStyle:{"margin-top":"5px","margin-left":"10px"},attrs:{label:1}},[e._v("自定义")])],1),e._v(" "),i("transition",{attrs:{name:"fade"}},[i("el-date-picker",{directives:[{name:"show",rawName:"v-show",value:e.is_expired,expression:"is_expired"}],staticStyle:{"margin-bottom":"5px","margin-left":"10px",width:"160px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"timestamp",placeholder:"请选择日期"},model:{value:e.expire_time,callback:function(t){e.expire_time=t},expression:"expire_time"}})],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.passEvent}},[e._v("确 定")])],1)],1),e._v(" "),0===e.data.audit_type?i("el-button",{staticStyle:{"margin-left":"5px","margin-bottom":"5px"},attrs:{type:"success",icon:"el-icon-check",plain:"",size:"mini",title:"通过审核"},on:{click:function(t){e.passEvent()}}},[i("span",{staticClass:"hidden-xs-only"},[e._v("通过")])]):e._e(),e._v(" "),2===e.data.audit_type?i("el-button",{staticStyle:{"margin-left":"5px","margin-bottom":"5px"},attrs:{type:"success",icon:"el-icon-check",plain:"",size:"mini",title:"重审通过"},on:{click:function(t){e.showPass()}}},[i("span",{staticClass:"hidden-xs-only"},[e._v("重审通过")])]):e._e(),e._v(" "),i("el-button",{staticStyle:{"margin-left":"5px"},attrs:{type:"danger",icon:"el-icon-delete",plain:"",size:"mini",title:"重新上线"},on:{click:function(t){e.deleteEvent()}}},[i("span",{staticClass:"hidden-xs-only"},[e._v("重新上线")])])],1):e._e()},staticRenderFns:[]};var m=i("VU/8")(u,p,!1,function(e){i("PYO7")},"data-v-27c2ab9d",null).exports,f=i("522d"),h=i("/142"),_={name:"blackList",components:{Auth:c.a,OperateBlack:m,UploadExcel:f.a,UserDetail:h.a},data:function(){return{apiConf:{getUserRole:"/role/getUserRole",getFieldBlackList:"/field/getFieldBlackList",addFieldBlackList:"/field/addFieldBlackList",importFieldBlackList:"/field/importFieldBlackList",blackAuditPassMore:"/field/blackAuditPassMore"},blackList:null,isUpload:!1,hasBatch:"",downloadAllLoading:!1,downloadCurLoading:!1,dialogVisible:!1,total:0,showDownLoadAll:"",formUpload:{uids:null,field_id:""},auditTypeMap:{0:{label:"未审核",class:"errorBtn"},1:{label:"已审核",class:""},2:{label:"需重审(已过有效期)",class:"warningBtn"}},uploadExample:{tableHeader:["uid","user_name","cause"],tableData:[{uid:"1111681197",user_name:"来去之间",cause:1}]},formInline:{uid:"",audit_type:"",operator:"",role_id:"",F_level:"",field_id:"",cause:"",belong_to:null,page:1,count:10},formAdd:{uid:"",user_name:"",cause:"2",expire_time:"",is_expired:0},editList:[{value:"",label:"所有状态"},{value:"1",label:"已编辑"},{value:"0",label:"未编辑"}],auditList:[{value:"",label:"所有审核状态"},{value:"1",label:"已审核"},{value:"0",label:"未审核"},{value:"2",label:"需重审"}],flevelList:[{value:"",label:"全部F层级"},{value:"F0",label:"F0"},{value:"F1",label:"F1"},{value:"F2",label:"F2"},{value:"F3",label:"F3"},{value:"F4",label:"F4"},{value:"NULL",label:"其他"}],delResonMap:{1:"博主发博与领域严重不符且低质",2:"广告营销",3:"搬运低质",4:"色情",5:"政治敏感",6:"恶意涨粉涨互动",7:"不实造谣炒作",8:"其他"},delResonList:[{label:"广告营销",value:"2"},{label:"搬运低质",value:"3"},{label:"恶意涨粉涨互动",value:"6"},{label:"博主发博与领域严重不符且低质",value:"1"},{label:"色情",value:"4"},{label:"政治敏感",value:"5"},{label:"不实造谣炒作",value:"7"},{label:"其他",value:"8"}],verifiedTypeMap:{0:"名人",1:"政府",2:"企业",3:"媒体",4:"校园",5:"网站",6:"应用",7:"团体","-1":"普通用户",8:"待审企业",200:"初级达人",220:"通过审核的达人",400:"已故认证用户"},cateList:null,checkedIds:[],tips:"loading..."}},computed:o()({},Object(n.b)(["pageAuth","email"])),methods:{init:function(){1===this.pageAuth&&this.getUserRole()},getUserRole:function(){var e=this,t={url:this.apiConf.getUserRole,params:{username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)&&t.result&&t.result.permission.indexOf(11)>-1?(e.cateList=t.result&&t.result.field||[],e.cateList.length>0?(e.hasBatch=t.result.permission.indexOf(19)>-1,e.formInline.belong_to=t.result.role,e.onSearch()):e.tips="暂无有权限的领域"):e.tips="暂无黑名单审核权限"},function(t){e.tips="接口异常"})},onSearch:function(){var e=this,t=o()({},this.formInline,{username:this.email,cip:230}),i={url:this.apiConf.getFieldBlackList,params:t};this.$store.dispatch("CommonGet",i).then(function(t){t.code&&200==Number(t.code)&&(e.blackList=t.result)})},changeEpireTime:function(){this.formAdd.is_expired||(this.formAdd.expire_time="")},showAdd:function(){this.dialogVisible=!0},showUpload:function(){this.isUpload=!0},getExcel:function(e){if(this.formUpload.uids=e,e&&e.length>0){if(!e[0].hasOwnProperty("uid"))return this.illegalUidTips="表头没有uid/uid拼写格式错误，请参考样例！",void Object(d.Message)({showClose:!0,message:this.illegalUidTips,type:"error",duration:0});if(!e[0].hasOwnProperty("user_name"))return this.illegalUidTips="表头没有user_name/user_name拼写格式错误，请参考样例！",void Object(d.Message)({showClose:!0,message:this.illegalUidTips,type:"error",duration:0});if(!e[0].hasOwnProperty("cause"))return this.illegalUidTips="表头没有cause/cause拼写格式错误，请参考样例！",void Object(d.Message)({showClose:!0,message:this.illegalUidTips,type:"error",duration:0});for(var t=0;t<e.length;t++){if(!e[t].uid)return this.illegalUidTips="第"+(t+1)+"行 uid不能为空！",void Object(d.Message)({showClose:!0,message:this.illegalUidTips,type:"error",duration:0});if(!e[t].user_name)return this.illegalUidTips="第"+(t+1)+"行 user_name不能为空！",void Object(d.Message)({showClose:!0,message:this.illegalUidTips,type:"error",duration:0});if(!e[t].cause)return this.illegalUidTips="第"+(t+1)+"行 cause不能为空！",void Object(d.Message)({showClose:!0,message:this.illegalUidTips,type:"error",duration:0});if(!/^(1|2|3|4|5|6|7|8)$/.test(e[t].cause))return this.illegalUidTips="第"+(t+1)+"行 cause的值不符合规范！，请填写1~8之间的正整数",void Object(d.Message)({showClose:!0,message:this.illegalUidTips,type:"error",duration:0})}this.uidsIsLegal=!0}else Object(d.Message)({showClose:!0,message:tips,type:"导入Excel为空!",duration:0})},addEvent:function(){var e=this;this.formAdd.uid?this.formAdd.user_name?!this.formAdd.is_expired||this.formAdd.expire_time?this.$confirm("确定添加到黑名单?","",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.addAction()}).catch(function(){e.$message({type:"info",message:"取消操作"})}):Object(d.Message)({showClose:!0,message:"请选择有效期！",type:"error",duration:1e3}):Object(d.Message)({showClose:!0,message:"请输入作者昵称！",type:"error",duration:1e3}):Object(d.Message)({showClose:!0,message:"请输入作者UID！",type:"error",duration:1e3})},addsEvent:function(){var e=this;0===this.formUpload.field_id||this.formUpload.field_id?this.formUpload.uids?this.uidsIsLegal?this.$confirm("将批量添加用户到黑名单, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.setUids()}).catch(function(t){throw e.$message({type:"info",message:"已取消批量添加！"}),t}):Object(d.Message)({showClose:!0,message:this.illegalUidTips,type:"error",duration:3e3}):Object(d.Message)({showClose:!0,message:"请导入用户uid、昵称与下线理由！",type:"error",duration:3e3}):Object(d.Message)({showClose:!0,message:"请选择领域！",type:"error",duration:3e3})},setUids:function(){var e=this,t=new URLSearchParams;t.append("field_id",this.formUpload.field_id),t.append("field_blacklist",l()(this.formUpload.uids)),t.append("username",this.email);var i={url:this.apiConf.importFieldBlackList,params:t};this.$store.dispatch("CommonPost",i).then(function(t){if(t.code&&200==Number(t.code)){var i=t.msg||"success";Object(d.Message)({showClose:!0,message:i,type:"success",duration:0}),e.onSearch()}else Object(d.Message)({showClose:!0,message:t.msg||"操作失败！",type:"error",duration:0})})},cancelUpload:function(){this.isUpload=!1,this.formUpload.uids=null},addAction:function(){var e=this,t={url:this.apiConf.addFieldBlackList,params:o()({},this.formAdd,{audit_type:0,username:this.email,cip:230})};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)?(e.dialogVisible=!1,Object(d.Message)({showClose:!0,message:"添加成功!",type:"success",duration:1e3}),e.cancelEvent(),e.onSearch()):Object(d.Message)({showClose:!0,message:t.msg||"添加失败!",type:"error",duration:0})})},cancelEvent:function(){this.dialogVisible=!1,this.formAdd={uid:"",user_name:"",cause:"2"}},handleSizeChange:function(e){this.formInline.count=e,this.onSearch()},handleCurrentChange:function(e){this.formInline.page=e,this.onSearch()},_parseTime:function(e,t){return Object(r.e)(e,t)},_parsePercent:function(e){return Object(r.d)(e)},_formatNum:function(e){return Object(r.b)(e)},handleDownloadAll:function(){var e=this;this.downloadAllLoading=!0;var t={uid:this.formInline.uid,F_level:this.formInline.F_level,field_id:this.formInline.field_id,audit_type:this.formInline.audit_type,role_id:this.formInline.role_id,username:this.email,page:1,count:this.total,cip:230},i={url:this.apiConf.getFieldBlackList,params:t};this.$store.dispatch("CommonGet",i).then(function(t){t.code&&200==Number(t.code)?e.downloadAll(t.result.data):(Object(d.Message)({showClose:!0,message:"数据获取失败！",type:"error",duration:1e3}),e.downloadAllLoading=!1)},function(t){Object(d.Message)({showClose:!0,message:"请求失败，可能是数据量过大！",type:"error",duration:1e3}),e.downloadAllLoading=!1})},downloadAll:function(e){var t=this;i.e(100).then(i.bind(null,"zWO4")).then(function(i){var a=t.formatJson(["index","uid","user_name","field_name","cause","audit_type","origin_degree","vertical_degree","health_degree","update_time","is_expired","operator"],e);i.export_json_to_excel(["序号","uid","昵称","领域","下线理由","审核状态","原创度","垂直度","健康度","操作时间","有效期","操作人"],a,"blacklist"),t.downloadAllLoading=!1})},handleDownloadCur:function(){var e=this;this.downloadCurLoading=!0,i.e(100).then(i.bind(null,"zWO4")).then(function(t){var i=e.blackList.data,a=e.formatJson(["index","uid","user_name","field_name","cause","audit_type","origin_degree","vertical_degree","health_degree","verified","verified_type","verified_reason","send_weibo_hz","tool_weibo_rate","interaction","description","update_time","is_expired","operator"],i);t.export_json_to_excel(["序号","uid","昵称","领域","下线理由","审核状态","原创度","垂直度","健康度","认证状态","认证类型","认证信息","互动度","日发博频次","工具发博比例","简介","操作时间","有效期","操作人"],a,"blacklist"),e.downloadCurLoading=!1})},formatJson:function(e,t){var i=this;return t.map(function(t,a){return e.map(function(e){return"index"===e?a+1:"cause"===e?t[e]&&i.delResonMap[t[e]]||"暂无":"audit_type"===e?i.auditTypeMap[t[e]].label:"status"===e?1===t[e]?"在线上":"已下线":"origin_degree"===e||"vertical_degree"===e||"health_degree"===e?t[e]&&t[e]+"级"||"暂无":"verified"===e?t[e]?"已认证":"未认证":"verified_type"===e?i.verifiedTypeMap[t[e]]||"普通用户":"verified_reason"===e||"description"===e?t[e]||"暂无":"update_time"===e?i._parseTime(t[e]):"is_expired"===e?t[e]?i._parseTime(t.expire_time):"永久":t[e]})})},handleSelectionChange:function(e){if(this.checkedIds=[],e&&e.length>0)for(var t=0;t<e.length;t++)0===e[t].audit_type&&this.checkedIds.push(e[t].id)},passAllEvent:function(){var e=this;this.checkedIds.join(",")?this.$confirm("所选黑名单将通过审核, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.passAllAction()}).catch(function(){e.$message({type:"info",message:"已取消批量审核！"})}):Object(d.Message)({showClose:!0,message:"请勾选未审核黑名单用户！",type:"error",duration:3e3})},passAllAction:function(){var e=this,t={url:this.apiConf.blackAuditPassMore,params:{ids:this.checkedIds.join(","),username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)?(Object(d.Message)({showClose:!0,message:"批量审核成功!",type:"success",duration:1e3}),e.cancelEvent(),e.onSearch()):Object(d.Message)({showClose:!0,message:t.msg||"批量审核失败!",type:"error",duration:0})})}},created:function(){this.init()},watch:{pageAuth:function(){this.init()},blackList:function(){this.blackList&&(this.total=this.blackList.total||0),this.showDownLoadAll=""!==this.formInline.field_id&&this.total<1e5}}},b={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return 1===e.pageAuth?i("el-main",[i("el-row",{staticClass:"pane-title-wrap"},[i("el-col",{staticClass:"clearfix",attrs:{span:24}},[i("h6",{staticClass:"pane-title left"},[i("i",{staticClass:"el-icon-document hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("领域黑名单")])])],1),e._v(" "),i("el-row",{staticClass:"search-form-wrap"},[e.cateList&&e.cateList.length>0?i("el-col",{attrs:{span:24}},[e.cateList?i("el-form",{attrs:{inline:"",model:e.formInline,"label-position":"left",size:"small"}},[i("el-form-item",[i("el-input",{attrs:{placeholder:"请输入作者UID",clearable:""},model:{value:e.formInline.uid,callback:function(t){e.$set(e.formInline,"uid",t)},expression:"formInline.uid"}})],1),e._v(" "),i("el-form-item",[i("el-select",{staticStyle:{"max-width":"130px"},attrs:{placeholder:"请选择编辑状态"},model:{value:e.formInline.audit_type,callback:function(t){e.$set(e.formInline,"audit_type",t)},expression:"formInline.audit_type"}},e._l(e.auditList,function(e,t){return i("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),i("el-form-item",[i("el-input",{attrs:{placeholder:"请输入操作人邮箱前缀",clearable:""},model:{value:e.formInline.operator,callback:function(t){e.$set(e.formInline,"operator",t)},expression:"formInline.operator"}})],1),e._v(" "),i("el-form-item",[i("el-select",{staticStyle:{"max-width":"120px"},attrs:{placeholder:"请选择F层级"},model:{value:e.formInline.F_level,callback:function(t){e.$set(e.formInline,"F_level",t)},expression:"formInline.F_level"}},e._l(e.flevelList,function(e,t){return i("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),i("el-form-item",[i("el-select",{staticStyle:{"max-width":"140px"},attrs:{placeholder:"请选择拉黑理由",clearable:""},model:{value:e.formInline.cause,callback:function(t){e.$set(e.formInline,"cause",t)},expression:"formInline.cause"}},e._l(e.delResonList,function(e,t){return i("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),i("el-form-item",[i("el-select",{attrs:{filterable:"",placeholder:"请选择领域"},model:{value:e.formInline.field_id,callback:function(t){e.$set(e.formInline,"field_id",t)},expression:"formInline.field_id"}},[i("el-option",{attrs:{label:"所有领域",value:""}}),e._v(" "),e._l(e.cateList,function(e,t){return i("el-option",{key:t,attrs:{label:e.name,value:e.id}})})],2),e._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.onSearch}},[i("span",{staticClass:"hidden-xs-only"},[e._v("查询")])])],1)],1):e._e()],1):i("el-col",{attrs:{span:24}},[i("el-alert",{attrs:{title:e.tips,type:"warning","show-icon":"",closable:!1}})],1)],1),e._v(" "),i("el-row",{staticClass:"content-box-wrap"},[i("el-col",{attrs:{span:24}},[i("el-dialog",{attrs:{title:"Excel批量操作",visible:e.isUpload},on:{"update:visible":function(t){e.isUpload=t}}},[i("el-form",{attrs:{model:e.formUpload}},[e.cateList?i("el-form-item",{attrs:{label:"选择领域","label-width":"90px",required:""}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择领域",clearable:""},model:{value:e.formUpload.field_id,callback:function(t){e.$set(e.formUpload,"field_id",t)},expression:"formUpload.field_id"}},e._l(e.cateList,function(e,t){return i("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1):e._e(),e._v(" "),i("el-form-item",[i("upload-excel",{attrs:{callback:e.getExcel,initdata:e.formUpload.uids,tips:!0,example:e.uploadExample,showexample:!0}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.addsEvent()}}},[e._v("添加")]),e._v(" "),i("el-button",{attrs:{size:"small"},on:{click:function(t){e.cancelUpload()}}},[e._v("取 消")])],1)],1),e._v(" "),e.cateList&&e.cateList.length>0?i("div",{staticClass:"clearfix",staticStyle:{padding:"10px 0"}},[i("el-button",{staticClass:"left",attrs:{round:"",size:"mini"},on:{click:function(t){e.passAllEvent()}}},[e._v("勾选名单通过")]),e._v(" "),i("el-button",{staticClass:"left",attrs:{type:"success",size:"mini"},on:{click:function(t){e.showAdd()}}},[e._v("添加黑名单")]),e._v(" "),e.hasBatch?i("el-button",{staticClass:"left",attrs:{type:"primary",size:"mini",title:"Excel批量导入uid"},on:{click:function(t){e.showUpload()}}},[i("span",[e._v("批量导入")])]):e._e(),e._v(" "),e.showDownLoadAll?i("el-button",{staticClass:"right",attrs:{type:"danger",size:"mini",title:"批量导出全部 Excel",loading:e.downloadAllLoading},on:{click:e.handleDownloadAll}},[i("span",[e._v("导出全部")])]):e._e(),e._v(" "),i("el-button",{staticClass:"right",attrs:{type:"warning",size:"mini",title:"批量导出当前页数据 Excel",loading:e.downloadCurLoading},on:{click:e.handleDownloadCur}},[i("span",[e._v("导出当前页")])])],1):e._e(),e._v(" "),i("el-dialog",{attrs:{title:"添加黑名单账号",visible:e.dialogVisible,width:"60%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-form",{attrs:{model:e.formAdd,"label-position":"left",size:"small"}},[i("el-form-item",{attrs:{label:"作者UID","label-width":"80px",required:""}},[i("el-input",{staticClass:"white-item",attrs:{placeholder:"请输入作者UID",clearable:""},model:{value:e.formAdd.uid,callback:function(t){e.$set(e.formAdd,"uid",t)},expression:"formAdd.uid"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"作者昵称","label-width":"80px",required:""}},[i("el-input",{staticClass:"white-item",attrs:{placeholder:"请输入作者昵称",clearable:""},model:{value:e.formAdd.user_name,callback:function(t){e.$set(e.formAdd,"user_name",t)},expression:"formAdd.user_name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"有效期至","label-width":"80px",required:""}},[i("el-radio-group",{model:{value:e.formAdd.is_expired,callback:function(t){e.$set(e.formAdd,"is_expired",t)},expression:"formAdd.is_expired"}},[i("el-radio",{staticStyle:{"margin-top":"5px","margin-left":"10px"},attrs:{label:0},on:{change:e.changeEpireTime}},[e._v("永久")]),e._v(" "),i("el-radio",{staticStyle:{"margin-top":"5px","margin-left":"10px"},attrs:{label:1}},[e._v("自定义")])],1),e._v(" "),i("transition",{attrs:{name:"fade"}},[i("el-date-picker",{directives:[{name:"show",rawName:"v-show",value:e.formAdd.is_expired,expression:"formAdd.is_expired"}],staticStyle:{"margin-bottom":"5px","margin-left":"10px",width:"160px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"timestamp",placeholder:"请选择日期"},model:{value:e.formAdd.expire_time,callback:function(t){e.$set(e.formAdd,"expire_time",t)},expression:"formAdd.expire_time"}})],1)],1),e._v(" "),i("div",{staticClass:"clearfix"},[i("span",{staticClass:"table-title left"},[e._v("选择添加黑名单的理由")])]),e._v(" "),i("el-form-item",{attrs:{label:"博主发布内容："}},[i("el-radio-group",{model:{value:e.formAdd.cause,callback:function(t){e.$set(e.formAdd,"cause",t)},expression:"formAdd.cause"}},e._l(e.delResonList,function(t,a){return i("el-radio",{key:a,staticStyle:{"margin-top":"5px","margin-left":"10px"},attrs:{label:t.value}},[e._v(e._s(t.label))])}))],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(t){e.cancelEvent()}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.addEvent()}}},[e._v("添 加")])],1)],1),e._v(" "),e.blackList&&e.blackList.data?i("el-row",[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.blackList.data,border:"",stripe:""},on:{"selection-change":e.handleSelectionChange}},[i("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),i("el-table-column",{attrs:{width:"130",prop:"uid",label:"uid"},scopedSlots:e._u([{key:"default",fn:function(e){return[i("user-detail",{attrs:{uid:e.row.uid,iswhite:0}})]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"user_name",label:"昵称"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("a",{class:t.row.user_name?"link-btn":"errorBtn",attrs:{href:"//weibo.com/u/"+t.row.uid,target:"_blank",title:"跳转至微博主页"}},[e._v(e._s(t.row.user_name||"未知"))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"field_name",label:"领域"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.field_name||"无领域"))]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"cause",label:"下线理由"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.cause&&e.delResonMap[t.row.cause]||"暂无"))]}}])}),e._v(" "),i("el-table-column",{attrs:{width:"80",align:"left",prop:"",label:"审核状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",{class:e.auditTypeMap[t.row.audit_type].class},[e._v(e._s(e.auditTypeMap[t.row.audit_type].label))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"verified",label:"认证状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.verified?"已认证":"未认证"))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"verified_type",label:"认证类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(e.verifiedTypeMap[t.row.verified_type]||"普通用户"))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"verified_reason",label:"认证信息"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.verified_reason||"暂无"))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"send_weibo_hz",label:"互动度"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(e._formatNum(t.row.interaction)))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"send_weibo_hz",label:"日发博频次"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(e._formatNum(t.row.send_weibo_hz)))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"tool_weibo_rate",label:"工具发博比例"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(e._parsePercent(t.row.tool_weibo_rate)))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"description",label:"简介"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.description||"暂无"))])]}}])}),e._v(" "),i("el-table-column",{attrs:{width:"160",align:"left",prop:"update_time",label:"操作时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._parseTime(t.row.update_time)))]}}])}),e._v(" "),i("el-table-column",{attrs:{width:"160",align:"left",prop:"is_expired",label:"有效期"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.is_expired?e._parseTime(t.row.expire_time):"永久"))]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"operator",label:"操作人"}}),e._v(" "),i("el-table-column",{attrs:{width:"120",align:"left",label:"操作项"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("operate-black",{attrs:{data:t.row,callback:e.onSearch}})]}}])})],1),e._v(" "),i("div",{staticStyle:{"padding-top":"10px",overflow:"auto"}},[i("el-pagination",{attrs:{"current-page":e.formInline.page,"page-sizes":[5,10,20,30,40,50],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1):e._e()],1)],1)],1):0===e.pageAuth?i("el-main",[i("auth",{attrs:{admin:"hongjiao@staff.weibo.com,wangyang29@staff.weibo.com,juanmin@staff.weibo.com"}})],1):e._e()},staticRenderFns:[]};var v=i("VU/8")(_,b,!1,function(e){i("hxah")},"data-v-66f672da",null);t.default=v.exports},PYO7:function(e,t){},hxah:function(e,t){}});