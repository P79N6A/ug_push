webpackJsonp([83],{"7k3T":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("Dd8w"),l=i.n(a),s=i("NYxO"),n=i("0xDb"),o=i("zL8q"),r=i("vzON"),c={name:"operateWhite",data:function(){return{dialogVisible:!1,prefix:[]}},computed:l()({},Object(s.b)(["email"])),props:["data","apiconf","callback"],methods:{init:function(){if(this.prefix=[],this.data.account&&this.data.account.length>0)for(var e=0;e<this.data.account.length;e++)this.prefix.push(this.data.account[e].email_prefix)},setEvent:function(){var e=this,t={url:this.apiconf.setFieldAccount,params:{field_id:this.data.id,prefix:this.prefix.join(","),username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)?(Object(o.Message)({showClose:!0,message:"保存成功！",type:"success",duration:1e3}),e.dialogVisible=!1,e.callback()):Object(o.Message)({showClose:!0,message:t.msg||"保存失败!",type:"error",duration:0})})},cancelEvent:function(){this.dialogVisible=!1,this.init()}},created:function(){this.init()},watch:{data:function(){this.init()}}},d={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.data?i("div",[i("el-dialog",{attrs:{title:"编辑角色用户",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-form",{attrs:{size:"small","label-width":"100px"}},[i("el-form-item",{attrs:{label:"领域业务方"}},[i("el-input",{staticStyle:{"max-width":"400px"},attrs:{disabled:!0},model:{value:e.data.name,callback:function(t){e.$set(e.data,"name",t)},expression:"data.name"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"邮箱前缀"}},[i("el-select",{attrs:{multiple:"","default-first-option":"",placeholder:"输入用户邮箱前缀"},model:{value:e.prefix,callback:function(t){e.prefix=t},expression:"prefix"}},e._l(e.data.account,function(e){return i("el-option",{key:e.id,attrs:{label:e.email_prefix,value:e.email_prefix}})}))],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(t){e.cancelEvent()}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-edit",title:"编辑",size:"mini"},on:{click:function(t){e.setEvent()}}},[i("span",{staticClass:"hidden-xs-only"},[e._v("保存")])])],1)],1),e._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-edit",title:"编辑",size:"mini"},on:{click:function(t){e.dialogVisible=!0}}},[i("span",{staticClass:"hidden-xs-only"},[e._v("编辑")])])],1):e._e()},staticRenderFns:[]},u=i("VU/8")(c,d,!1,null,null,null).exports,f={name:"categoryList",components:{Auth:r.a,OperateField:u},data:function(){return{apiConf:{getField:"/field/getFieldList",getUserRole:"/role/getUserRole",addFieldAccount:"/field/addFieldAccount",setFieldAccount:"/field/setFieldAccount"},dialogVisible:!1,cateList:null,dataList:null,formInline:{field_id:"",prefix:""},formAdd:{field_id:"",prefix:""},realname:"",tips:"loading...",hasAllAuth:!1}},computed:l()({},Object(s.b)(["pageAuth","email"])),methods:{init:function(){1===this.pageAuth&&this.getUserRole()},getUserRole:function(){var e=this,t={url:this.apiConf.getUserRole,params:{username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)&&t.result&&(t.result.permission.indexOf(5)>-1||t.result.permission.indexOf(4)>-1)?(e.cateList=t.result&&t.result.field||[],e.hasAllAuth=t.result.permission.indexOf(4)>-1,e.cateList.length>0?(e.formAdd.field_id=e.cateList[0].id,!e.hasAllAuth&&(e.formInline.field_id=e.cateList[0].id),e.onSearch()):e.tips="暂无可授权的领域"):e.tips="暂无可授权的领域"},function(t){e.tips="接口异常"})},onSearch:function(){var e=this,t={url:this.apiConf.getField,params:l()({},this.formInline,{username:this.email,cip:230})};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)&&(Object(o.Message)({showClose:!0,message:"success!",type:"success",duration:1e3}),e.dataList=t.result)})},addEvent:function(){this.formAdd.prefix?this.addHotUser():Object(o.Message)({showClose:!0,message:"请输入用户邮箱前缀！",type:"error",duration:3e3})},addHotUser:function(){var e=this,t={url:"/user/add",params:{userid:this.formAdd.prefix,realname:this.realname,type:"2",usergroup:"outer",username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)?e.addFieldAccount():t&&"The data has already existed"==t.msg?e.addFieldAccount():Object(o.Message)({showClose:!0,message:t.msg||"用户添加失败！",type:"error",duration:0})})},addFieldAccount:function(){var e=this,t={url:this.apiConf.addFieldAccount,params:l()({},this.formAdd,{username:this.email,cip:230})};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)?(Object(o.Message)({showClose:!0,message:"添加成功!",type:"success",duration:1e3}),e.dialogVisible=!1,e.cancelEvent(),e.onSearch()):Object(o.Message)({showClose:!0,message:t.msg||"添加失败!",type:"error",duration:0})})},cancelEvent:function(){this.dialogVisible=!1,this.$refs.formAdd.resetFields()},formatEmailList:function(e){if(e&&e.length>0){for(var t=[],i=0;i<e.length;i++)t.push(e[i].email_prefix);return t.join("、")}return"暂无"},_parseTime:function(e,t){return Object(n.e)(e,t)}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},p={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return 1===e.pageAuth?i("el-main",[i("el-row",{staticClass:"pane-title-wrap"},[i("el-col",{attrs:{span:24}},[i("h6",{staticClass:"pane-title"},[i("i",{staticClass:"el-icon-edit-outline hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("领域授权")])])],1),e._v(" "),i("el-row",{staticClass:"search-form-wrap"},[e.cateList&&e.cateList.length>0?i("el-col",{attrs:{span:24}},[i("el-form",{attrs:{inline:"",model:e.formInline,"label-position":"left",size:"mini"}},[i("el-form-item",{attrs:{label:"邮箱前缀","label-width":"70px"}},[i("el-input",{attrs:{placeholder:"请输入邮箱前缀",clearable:""},model:{value:e.formInline.prefix,callback:function(t){e.$set(e.formInline,"prefix",t)},expression:"formInline.prefix"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"选择领域","label-width":"70px"}},[i("el-select",{attrs:{filterable:"",placeholder:"请选择领域"},model:{value:e.formInline.field_id,callback:function(t){e.$set(e.formInline,"field_id",t)},expression:"formInline.field_id"}},[e.hasAllAuth?i("el-option",{attrs:{label:"所有领域",value:""}}):e._e(),e._v(" "),e._l(e.cateList,function(e,t){return i("el-option",{key:t,attrs:{label:e.name,value:e.id}})})],2),e._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.onSearch}},[i("span",{staticClass:"hidden-xs-only"},[e._v("查询")])])],1)],1)],1):i("el-col",{attrs:{span:24}},[i("el-alert",{attrs:{title:e.tips,type:"warning","show-icon":"",closable:!1}})],1)],1),e._v(" "),e.cateList&&e.cateList.length>0?i("el-row",{staticClass:"content-box-wrap"},[i("el-col",{attrs:{span:24}},[i("div",{staticClass:"clearfix",staticStyle:{padding:"10px 0"}},[i("el-button",{staticClass:"left",attrs:{type:"success",size:"mini"},on:{click:function(t){e.dialogVisible=!0}}},[e._v("添加领域业务方")])],1),e._v(" "),i("el-dialog",{attrs:{title:"添加领域业务方",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[i("el-form",{ref:"formAdd",attrs:{model:e.formAdd,size:"small"}},[e.cateList?i("el-form-item",{attrs:{prop:"field_id",label:"选择领域","label-width":"120px",required:""}},[i("el-select",{attrs:{placeholder:"请选择领域",filterable:""},model:{value:e.formAdd.field_id,callback:function(t){e.$set(e.formAdd,"field_id",t)},expression:"formAdd.field_id"}},e._l(e.cateList,function(e,t){return i("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1):e._e(),e._v(" "),i("el-form-item",{attrs:{prop:"prefix",label:"邮箱前缀","label-width":"120px",required:""}},[i("el-input",{staticStyle:{"max-width":"400px"},attrs:{placeholder:"输入用户邮箱前缀"},model:{value:e.formAdd.prefix,callback:function(t){e.$set(e.formAdd,"prefix",t)},expression:"formAdd.prefix"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"用户名","label-width":"120px"}},[i("el-input",{staticStyle:{"max-width":"400px"},attrs:{placeholder:"请输入中文名"},model:{value:e.realname,callback:function(t){e.realname=t},expression:"realname"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{size:"small"},on:{click:function(t){e.cancelEvent()}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(t){e.addEvent()}}},[e._v("添 加")])],1)],1),e._v(" "),i("el-row",[i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.dataList,border:"",stripe:"",size:"mini"}},[i("el-table-column",{attrs:{fixed:"",align:"center",prop:"id",label:"领域id",width:"70px"}}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"name",label:"授权领域"}}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"account",label:"邮箱"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(e.formatEmailList(t.row.account)))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"update_time",label:"授权时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s((t.row.update_time||t.row.create_time)&&e._parseTime(t.row.update_time||t.row.create_time)||"未知"))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"left",prop:"operator",label:"操作人"}}),e._v(" "),i("el-table-column",{attrs:{align:"left",label:"操作项","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("operate-field",{attrs:{data:t.row,callback:e.onSearch,apiconf:e.apiConf}})]}}])})],1)],1)],1)],1):e._e()],1):0===e.pageAuth?i("el-main",[i("auth")],1):e._e()},staticRenderFns:[]};var m=i("VU/8")(f,p,!1,function(e){i("vMrH")},"data-v-39073474",null);t.default=m.exports},vMrH:function(e,t){}});