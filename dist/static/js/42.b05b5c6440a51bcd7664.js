webpackJsonp([42],{"6uCg":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Dd8w"),l=a.n(i),s=a("NYxO"),o=a("zL8q"),r=a("vzON"),n=a("H5q4"),c={props:["data"],data:function(){return{apiConf:{operatorFieldTag:"/tag/operatorFieldTag"},dialogFormVisible:!1,formLabelWidth:"120px",form:{first_tagid:"",second_tagid:"",third_tagname:"",type:"",is_mbiguity:1,nickname:"",keywords:"",weibo_mid:""},is_mbiguity:"",thirdType:null}},computed:l()({},Object(s.b)(["email"])),methods:{showUpdate:function(){this.dialogFormVisible=!0},hideUpdate:function(){this.dialogFormVisible=!1},update:function(){var e=!1;for(var t in this.data)this.data[t]!==this.form[t]&&(e=!0);if(this.form.weibo_mid&&(e=!0),e)if(this.form.type)if(this.form.weibo_mid){this.form.operator=this.email,this.form.update=2;var a={url:this.apiConf.operatorFieldTag,params:this.form};this.$store.dispatch("CommonGet",a).then(function(e){e.code&&200===e.code?Object(o.Message)({showClose:!0,message:"申请修改成功！",type:"success",duration:1e3}):Object(o.Message)({showClose:!0,message:e.msg,type:"error",duration:1e3})},function(e){Object(o.Message)({showClose:!0,message:"申请修改失败",type:"error",duration:1e3})}),this.dialogFormVisible=!1}else Object(o.Message)({showClose:!0,message:"请填写举例微博链接！",type:"error",duration:1e3});else Object(o.Message)({showClose:!0,message:"请选择三级标签类型！",type:"error",duration:1e3});else Object(o.Message)({showClose:!0,message:"请至少修改一项！",type:"error",duration:1e3})}},created:function(){for(var e in this.data)this.form[e]=this.data[e];this.form.originalinfo=this.data,this.thirdType=n.a}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-container",[a("a",{staticClass:"update",on:{click:e.showUpdate}},[e._v("申请修改")]),e._v(" "),a("el-dialog",{style:{fontWeight:"bold"},attrs:{title:"修改三级标签",visible:e.dialogFormVisible,align:"left",width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.data,"label-position":"left","label-width":e.formLabelWidth}},[a("el-form-item",{attrs:{label:"一级标签词",required:""}},[a("el-select",{attrs:{disabled:"",placeholder:"请选择一级标签词"},model:{value:e.form.first_tagname,callback:function(t){e.$set(e.form,"first_tagname",t)},expression:"form.first_tagname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"二级标签词",required:""}},[a("el-select",{attrs:{disabled:"",placeholder:"请选择二级标签词"},model:{value:e.form.second_tagname,callback:function(t){e.$set(e.form,"second_tagname",t)},expression:"form.second_tagname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"三级标签词",required:""}},[a("el-input",{staticClass:"inp",attrs:{placeholder:"请输入三级标签",disabled:""},model:{value:e.form.third_tagname,callback:function(t){e.$set(e.form,"third_tagname",t)},expression:"form.third_tagname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"三级标签类型",required:""}},[a("el-select",{attrs:{placeholder:"请选择三级标签类型",filterable:"",clearable:""},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},e._l(e.thirdType,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"是否有歧义",required:""}},[a("el-select",{model:{value:e.form.is_mbiguity,callback:function(t){e.$set(e.form,"is_mbiguity",t)},expression:"form.is_mbiguity"}},[a("el-option",{attrs:{label:"有歧义",value:1}}),e._v(" "),a("el-option",{attrs:{label:"无歧义",value:0}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"别名或昵称"}},[a("el-input",{staticClass:"inp",attrs:{placeholder:"请输入别名或昵称",clearable:""},model:{value:e.form.nickname,callback:function(t){e.$set(e.form,"nickname",t)},expression:"form.nickname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"关键词"}},[a("el-input",{staticClass:"inp",attrs:{placeholder:"请输入关键词",clearable:""},model:{value:e.form.keywords,callback:function(t){e.$set(e.form,"keywords",t)},expression:"form.keywords"}}),e._v(" "),a("span",{staticClass:"lib"},[e._v('可添加多个关键词，关键词之间用";"分隔，组合关键词用#$#分隔。')])],1),e._v(" "),a("el-form-item",{attrs:{label:"举例微博链接",required:""}},[a("el-input",{staticClass:"inp",attrs:{type:"url",placeholder:"请输入微博链接",clearable:""},model:{value:e.form.weibo_mid,callback:function(t){e.$set(e.form,"weibo_mid",t)},expression:"form.weibo_mid"}}),e._v(" "),a("span",{staticClass:"lib"},[e._v("至少举例一个微博case证明提及关键词或组合关键词符合打上标签的标准。")])],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.hideUpdate}},[e._v("取 消")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:e.update}},[e._v("修 改")])],1)],1)],1)},staticRenderFns:[]};var m=a("VU/8")(c,d,!1,function(e){a("zO77")},"data-v-2a7ea87c",null).exports,u={name:"FieldManage",components:{Auth:r.a,operateUpdate:m},data:function(){return{apiConf:{getUserRole:"/role/getUserRole",getFieldTag:"/tag/getFieldTag",getFirstSecondTag:"/tag/getFirstSecondTag",operatorFieldTag:"/tag/operatorFieldTag"},cateList:null,tips:"loading...",downloadCurLoading:!1,downloadAllLoading:!1,dialogFormVisible:!1,cascaderList:null,secondList:null,total:0,hasExamine:"",hasAllArea:"",hasCurArea:"",formInline:{tagname:"",first_tagid:"",is_like:"",page:1,size:5},tableData:null,formLabelWidth:"120px",form:{first_tagid:"",second_tagid:"",third_tagname:"",type:"",is_mbiguity:1,nickname:"",keywords:"",weibo_mid:""},thirdType:null}},computed:l()({},Object(s.b)(["pageAuth","email"])),methods:{init:function(){1===this.pageAuth&&this.getUserRole()},getTags:function(){var e=this,t={url:this.apiConf.getFirstSecondTag};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200===t.code?e.cascaderList=t.data:Object(o.Message)({showClose:!0,message:t.msg,type:"error",duration:1e3})},function(e){Object(o.Message)({showClose:!0,message:"获取一二级标签列表失败",type:"error",duration:1e3})})},getUserRole:function(){var e=this,t={url:this.apiConf.getUserRole,params:{username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){if(t.code&&200==Number(t.code)){if(e.hasExamine=t.result.permission.indexOf(18)>-1,e.hasAllArea=t.result.permission.indexOf(16)>-1,e.hasCurArea=t.result.permission.indexOf(17)>-1,!e.hasCurArea&&!e.hasAllArea)return void(e.tips="暂无管理权限");e.cateList=t.result.field||[],e.cateList.length>0||(e.tips="暂无有权限的领域"),e.formInline.first_tagid=e.hasAllArea?"none_field":e.cateList[0].id,e.getTags()}else e.tips="暂无有权限的领域"},function(t){e.tips="接口异常"})},onSearch:function(){var e=this,t=l()({},this.formInline);t.is_like=t.is_like?1:0;var a={url:this.apiConf.getFieldTag,params:t};this.$store.dispatch("CommonGet",a).then(function(t){t.code&&200==Number(t.code)?(e.tableData=t.data?t.data.data:null,e.total=t.data?t.data.total:0,t.data&&t.data.data.length||Object(o.Message)({showClose:!0,message:"暂无数据",type:"error",duration:1e3})):Object(o.Message)({showClose:!0,message:t.msg,type:"error",duration:1e3})},function(e){Object(o.Message)({showClose:!0,message:"查询失败",type:"error",duration:1e3})})},handleSizeChange:function(e){this.formInline.size=e,this.onSearch()},handleCurrentChange:function(e){this.formInline.page=e,this.onSearch()},downloadAll:function(e){var t=this;a.e(106).then(a.bind(null,"zWO4")).then(function(a){var i=t.formatJson(["first_tagname","second_tagname","third_tagname","tag3type","is_mbiguity","nickname","keywords"],e);a.export_json_to_excel(["一级标签词","二级标签词","三级标签词","三级标签类型","是否有歧义","别名或昵称","关键词"],i,"FieldList"),t.downloadCurLoading?t.downloadCurLoading=!1:t.downloadAllLoading&&(t.downloadAllLoading=!1)})},formatJson:function(e,t){var a=this;return t.map(function(t,i){return e.map(function(e){return"is_mbiguity"===e?t[e]=t[e]?"是":"否":"tag3type"===e?t[e]=a.thirdType[t.type]?a.thirdType[t.type].label:t.type||"":t[e]})})},handleDownloadAll:function(){var e=this;this.downloadAllLoading=!0;var t=l()({},this.formInline);t.is_like=t.is_like?1:0,t.page=1,t.size=this.total;var a={url:this.apiConf.getFieldTag,params:t};this.$store.dispatch("CommonGet",a).then(function(t){t.code&&200==Number(t.code)?e.downloadAll(t.data.data):e.downloadAllLoading=!1})},handleDownloadCur:function(){this.downloadCurLoading=!0;var e=this.tableData;this.downloadAll(e)},showAdd:function(){this.dialogFormVisible=!0},changeSecondList:function(e){this.form.second_tagid="",this.secondList=e?this.cascaderList[e].second_tagid:[]},add:function(){var e=this;if(this.form.first_tagid)if(this.form.second_tagid)if(this.form.third_tagname)if(this.form.type)if(this.form.weibo_mid){this.form.operator=this.email,this.form.update=1;var t={url:this.apiConf.operatorFieldTag,params:this.form};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200===t.code?(Object(o.Message)({showClose:!0,message:"添加成功！",type:"success",duration:1e3}),e.clearInp()):(Object(o.Message)({showClose:!0,message:t.msg,type:"error",duration:1e3}),e.clearInp())},function(t){Object(o.Message)({showClose:!0,message:"添加失败",type:"error",duration:1e3}),e.clearInp()}),this.dialogFormVisible=!1}else Object(o.Message)({showClose:!0,message:"请填写举例微博链接！",type:"error",duration:1e3});else Object(o.Message)({showClose:!0,message:"请选择三级标签类型！",type:"error",duration:1e3});else Object(o.Message)({showClose:!0,message:"请填写三级标签词！",type:"error",duration:1e3});else Object(o.Message)({showClose:!0,message:"请选择二级标签词！",type:"error",duration:1e3});else Object(o.Message)({showClose:!0,message:"请选择一级标签词！",type:"error",duration:1e3})},hideAdd:function(){this.dialogFormVisible=!1,this.clearInp()},clearInp:function(){for(var e in this.form)this.form[e]="is_mbiguity"===e?1:""},outline:function(e){var t=this,a=this.$createElement;this.$msgbox({message:a("p",null,[a("span",null,"您确认要申请下线该标签词么？")]),showCancelButton:!0,confirmButtonText:"确定",cancelButtonText:"取消",beforeClose:function(a,i,l){if("confirm"===a){e.update=3,e.operator=t.email,e.is_mbiguity="是"===e.is_mbiguity?1:0,e.weibo_mid=e.weibo_mid?e.weibo_mid:1;var s=e,r={url:t.apiConf.operatorFieldTag,params:s};t.$store.dispatch("CommonGet",r).then(function(e){e.code&&200===e.code?(l(),Object(o.Message)({showClose:!0,message:"申请下线请求发送成功",type:"success",duration:1e3})):(l(),Object(o.Message)({showClose:!0,message:e.msg,type:"error",duration:1e3}))},function(e){l(),Object(o.Message)({showClose:!0,message:"接口异常",type:"error",duration:1e3})})}else l()}}).then(function(e){},function(e){})}},created:function(){this.thirdType=n.a,this.init()},watch:{pageAuth:function(){this.init()}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("el-col",{staticClass:"clearfix",attrs:{span:24}},[a("h6",{staticClass:"pane-title left"},[a("i",{staticClass:"el-icon-document hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("标签管理")]),e._v(" "),e.hasExamine?a("router-link",{staticStyle:{"margin-left":"20px"},attrs:{to:"/category/tag/audit"}},[e._v("标签审核")]):e._e(),e._v(" "),a("router-link",{staticClass:"right",attrs:{to:"/category/tag/record"}},[e._v("标签申请记录")])],1)],1),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[e.cateList&&e.cateList.length>0?a("el-col",{attrs:{span:24}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline,"label-position":"left",size:"mini"}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入标签词",clearable:""},model:{value:e.formInline.tagname,callback:function(t){e.$set(e.formInline,"tagname",t)},expression:"formInline.tagname"}})],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择领域",filterable:""},model:{value:e.formInline.first_tagid,callback:function(t){e.$set(e.formInline,"first_tagid",t)},expression:"formInline.first_tagid"}},[e.hasAllArea?a("el-option",{attrs:{label:"不限领域",value:"none_field"}}):e._e(),e._v(" "),e._l(e.cateList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})})],2)],1),e._v(" "),a("el-checkbox",{staticStyle:{"line-height":"32px","margin-right":"15px"},model:{value:e.formInline.is_like,callback:function(t){e.$set(e.formInline,"is_like",t)},expression:"formInline.is_like"}},[e._v("模糊匹配")]),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.onSearch}},[a("span",{staticClass:"hidden-xs-only"},[e._v("查询")])])],1)],1)],1):a("el-col",{attrs:{span:24}},[a("el-alert",{attrs:{title:e.tips,type:"warning","show-icon":"",closable:!1}})],1)],1),e._v(" "),a("el-row",{staticClass:"content-box-wrap"},[e.cateList&&e.cateList.length>0?a("el-col",{attrs:{span:24}},[e.cateList&&e.cateList.length>0?a("div",{staticClass:"clearfix",staticStyle:{padding:"10px 0"}},[a("el-button",{staticClass:"left",attrs:{type:"success",size:"mini"},on:{click:e.showAdd}},[e._v("添加标签词")]),e._v(" "),e.tableData?a("el-button",{staticClass:"right",attrs:{type:"danger",size:"mini",title:"批量导出全部 Excel",loading:e.downloadAllLoading},on:{click:e.handleDownloadAll}},[a("span",[e._v("导出全部")])]):e._e(),e._v(" "),e.tableData?a("el-button",{staticClass:"right",attrs:{type:"warning",size:"mini",title:"批量导出当前页数据 Excel",loading:e.downloadCurLoading},on:{click:e.handleDownloadCur}},[a("span",[e._v("导出当前页")])]):e._e()],1):e._e(),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",size:"mini"}},[a("el-table-column",{attrs:{prop:"first_tagname",label:"一级标签词",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"second_tagname",label:"二级标签词",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"third_tagname",label:"三级标签词",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"type",label:"三级标签类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.thirdType[t.row.type]?e.thirdType[t.row.type].label:t.row.type||""))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"is_mbiguity",label:"是否有歧义",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.is_mbiguity?"是":"否"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"别名或昵称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"keywords",label:"关键词",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"operatorItem",label:"操作",width:"160",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("operate-update",{attrs:{data:t.row,formInline:e.formInline}}),e._v("\n                |\n                "),a("a",{staticClass:"outline",on:{click:function(a){e.outline(t.row)}}},[e._v("申请下线")])]}}])})],1),e._v(" "),a("div",{staticClass:"page-box"},[a("el-pagination",{attrs:{"current-page":e.formInline.page,"page-sizes":[5,10,20,30,40,50],"page-size":e.formInline.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1):e._e(),e._v(" "),a("el-dialog",{style:{fontWeight:"bold"},attrs:{title:"添加新三级标签",visible:e.dialogFormVisible,align:"left",width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form,"label-position":"left","label-width":e.formLabelWidth}},[a("el-form-item",{attrs:{label:"一级标签词",required:""}},[a("el-select",{attrs:{placeholder:"请选择一级标签词",filterable:"",clearable:""},on:{change:e.changeSecondList},model:{value:e.form.first_tagid,callback:function(t){e.$set(e.form,"first_tagid",t)},expression:"form.first_tagid"}},e._l(e.cascaderList,function(e,t){return a("el-option",{key:t,attrs:{label:e.first_tagname,value:e.first_tagid,props:"item.child_tag"}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"二级标签词",required:""}},[a("el-select",{attrs:{placeholder:"请选择二级标签词",filterable:"",clearable:""},model:{value:e.form.second_tagid,callback:function(t){e.$set(e.form,"second_tagid",t)},expression:"form.second_tagid"}},e._l(e.secondList,function(e,t){return a("el-option",{key:t,attrs:{label:e.second_tagname,value:e.second_tagid}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"三级标签词",required:""}},[a("el-input",{staticClass:"inp",attrs:{placeholder:"请输入三级标签",clearable:""},model:{value:e.form.third_tagname,callback:function(t){e.$set(e.form,"third_tagname",t)},expression:"form.third_tagname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"三级标签类型",required:""}},[a("el-select",{attrs:{placeholder:"请选择三级标签类型",filterable:"",clearable:""},model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},e._l(e.thirdType,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"是否有歧义",required:""}},[a("el-select",{model:{value:e.form.is_mbiguity,callback:function(t){e.$set(e.form,"is_mbiguity",t)},expression:"form.is_mbiguity"}},[a("el-option",{attrs:{label:"有歧义",value:1}}),e._v(" "),a("el-option",{attrs:{label:"无歧义",value:0}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"别名或昵称"}},[a("el-input",{staticClass:"inp",attrs:{placeholder:"请输入别名或昵称",clearable:""},model:{value:e.form.nickname,callback:function(t){e.$set(e.form,"nickname",t)},expression:"form.nickname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"关键词"}},[a("el-input",{staticClass:"inp",attrs:{placeholder:"请输入关键词",clearable:""},model:{value:e.form.keywords,callback:function(t){e.$set(e.form,"keywords",t)},expression:"form.keywords"}}),e._v(" "),a("span",{staticClass:"lib"},[e._v('可添加多个关键词，关键词之间用";"分隔，组合关键词用#$#分隔。')])],1),e._v(" "),a("el-form-item",{attrs:{label:"举例微博链接",required:""}},[a("el-input",{staticClass:"inp",attrs:{type:"url",placeholder:"请输入微博链接",clearable:""},model:{value:e.form.weibo_mid,callback:function(t){e.$set(e.form,"weibo_mid",t)},expression:"form.weibo_mid"}}),e._v(" "),a("span",{staticClass:"lib"},[e._v("至少举例一个微博case证明提及关键词或组合关键词符合打上标签的标准。")])],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.hideAdd}},[e._v("取 消")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:e.add}},[e._v("添 加")])],1)],1)],1)],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var p=a("VU/8")(u,f,!1,function(e){a("T0K1")},"data-v-186903f4",null);t.default=p.exports},T0K1:function(e,t){},zO77:function(e,t){}});