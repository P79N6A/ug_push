webpackJsonp([80],{"/HO5":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Dd8w"),n=a.n(l),i=a("NYxO"),s=a("zL8q"),r=a("vzON"),o=a("0xDb"),c=a("H5q4"),p={name:"FieldAudit",components:{Auth:r.a},data:function(){return{apiConf:{getUserRole:"/role/getUserRole",getApplyTag:"/tag/getApplyTag"},hasAllArea:"",cateList:null,tips:"loading...",formInline:{tagname:"",first_tagid:"",operator:"",is_like:"",tagstatus:0,page:1,size:5},tagstatus:[{label:"所有状态",value:0},{label:"待审核",value:1},{label:"已通过",value:2},{label:"已拒绝",value:3}],tableData:null,total:0,downloadCurLoading:!1,thirdType:null}},computed:n()({},Object(i.b)(["pageAuth","email"])),methods:{_parseTime:function(e){return Object(o.e)(e)},init:function(){1===this.pageAuth&&this.getUserRole()},getUserRole:function(){var e=this,t={url:this.apiConf.getUserRole,params:{username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)?(e.cateList=t.result.field||[],e.cateList.length>0||(e.tips="暂无有权限的领域"),e.hasAllArea=t.result.permission.indexOf(16)>-1,e.formInline.first_tagid=e.hasAllArea?"none_field":e.cateList[0].id,e.onSearch()):e.tips="暂无有权限的领域"},function(t){e.tips="接口异常"})},onSearch:function(){var e=this,t=n()({},this.formInline);t.is_like=t.is_like?1:0;var a={url:this.apiConf.getApplyTag,params:t};this.$store.dispatch("CommonGet",a).then(function(t){t.code&&200==Number(t.code)?(e.tableData=t.data?t.data.data:[],e.total=t.data?t.data.total:0,t.data||Object(s.Message)({showClose:!0,message:"暂无数据",type:"error",duration:1e3})):Object(s.Message)({showClose:!0,message:t.msg,type:"error",duration:1e3})},function(e){Object(s.Message)({showClose:!0,message:"查询失败",type:"error",duration:1e3})})},handleSizeChange:function(e){this.formInline.size=e,this.onSearch()},handleCurrentChange:function(e){this.formInline.page=e,this.onSearch()}},created:function(){this.init(),this.thirdType=c.a},watch:{pageAuth:function(){this.init()}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("el-col",{staticClass:"clearfix",attrs:{span:24}},[a("h6",{staticClass:"pane-title left"},[a("i",{staticClass:"el-icon-document hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("标签申请记录")]),e._v(" "),a("router-link",{staticClass:"right",attrs:{to:"/category/tag/manage"}},[e._v("标签管理")])],1)],1),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[e.cateList&&e.cateList.length>0?a("el-col",{attrs:{span:24}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline,"label-position":"left",size:"mini"}},[a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入申请人邮箱",clearable:""},model:{value:e.formInline.operator,callback:function(t){e.$set(e.formInline,"operator",t)},expression:"formInline.operator"}})],1),e._v(" "),a("el-form-item",[a("el-input",{attrs:{placeholder:"请输入标签词",clearable:""},model:{value:e.formInline.tagname,callback:function(t){e.$set(e.formInline,"tagname",t)},expression:"formInline.tagname"}})],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择领域",filterable:""},model:{value:e.formInline.first_tagid,callback:function(t){e.$set(e.formInline,"first_tagid",t)},expression:"formInline.first_tagid"}},[e.hasAllArea?a("el-option",{attrs:{label:"不限领域",value:"none_field"}}):e._e(),e._v(" "),e._l(e.cateList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})})],2)],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:e.formInline.tagstatus,callback:function(t){e.$set(e.formInline,"tagstatus",t)},expression:"formInline.tagstatus"}},e._l(e.tagstatus,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-checkbox",{staticStyle:{"line-height":"32px","margin-right":"15px"},model:{value:e.formInline.is_like,callback:function(t){e.$set(e.formInline,"is_like",t)},expression:"formInline.is_like"}},[e._v("模糊匹配")]),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.onSearch}},[a("span",{staticClass:"hidden-xs-only"},[e._v("查询")])])],1)],1)],1):a("el-col",{attrs:{span:24}},[a("el-alert",{attrs:{title:e.tips,type:"warning","show-icon":"",closable:!1}})],1)],1),e._v(" "),a("el-row",{staticClass:"content-box-wrap"},[e.cateList&&e.cateList.length>0?a("el-col",{attrs:{span:24}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"",size:"mini"}},[a("el-table-column",{attrs:{prop:"first_tagname",label:"一级标签词",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"second_tagname",label:"二级标签词",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"third_tagname",label:"三级标签词",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"type",label:"三级标签类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e.thirdType[t.row.type]?e.thirdType[t.row.type].label:""))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"is_mbiguity",label:"是否有歧义",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.is_mbiguity?"是":"否"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"别名或昵称",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"keywords",label:"关键词",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"keywords",label:"举例微博mid",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{attrs:{href:t.row.weibo_mid,target:"_block"}},[e._v(e._s(t.row.weibo_mid))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"apply_kinds",label:"申请类型",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(1===t.row.apply_kinds?"添加":2===t.row.apply_kinds?"修改":"删除"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"lable_status",label:"申请状态",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(1===t.row.lable_status?"待审核":2===t.row.lable_status?"已通过":"已拒绝"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"operator",label:"操作人",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"modify_time",label:"操作时间",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._parseTime(t.row.modify_time)))])]}}])})],1),e._v(" "),a("div",{staticClass:"page-box"},[a("el-pagination",{attrs:{"current-page":e.formInline.page,"page-sizes":[5,10,20,30,40,50],"page-size":e.formInline.size,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1):e._e()],1)],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var m=a("VU/8")(p,u,!1,function(e){a("uFvk")},"data-v-49dd5f14",null);t.default=m.exports},uFvk:function(e,t){}});