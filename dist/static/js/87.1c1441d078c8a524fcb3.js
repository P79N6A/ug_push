webpackJsonp([87],{"+svs":function(t,e){},Zt7G:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("mvHQ"),l=a.n(s),r=a("Dd8w"),n=a.n(r),i=a("NYxO"),o=a("zL8q"),c={name:"MaterialRecall",components:{Auth:a("vzON").a},data:function(){return{formInline:{mid:"4293173360951194"},on_board_list:null,reject_reason_list:null}},computed:n()({},Object(i.b)(["pageAuth","email"])),methods:{init:function(){1===this.pageAuth&&this.onSearch()},onSearch:function(){var t=this;if(this.formInline.mid){var e={url:"http://10.77.136.62:8083/query/mid",param:this.formInline},a={data:l()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e&&200==e.code?(t.on_board_list=e.on_board_list,t.reject_reason_list=e.reject_reason_list):Object(o.Message)({showClose:!0,message:e.msg||"榜单查询失败！",type:"error",duration:0})},function(t){Object(o.Message)({showClose:!0,message:"榜单查询接口异常！",type:"error",duration:0})})}else Object(o.Message)({showClose:!0,message:"请填写要查询的mid！",type:"error",duration:3e3})}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return 1===t.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("el-col",{attrs:{span:24}},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-document hidden-xs-only",staticStyle:{"margin-right":"6px"}}),t._v("物料上榜查询")])])],1),t._v(" "),a("el-row",{staticClass:"search-form-wrap"},[a("el-col",{attrs:{span:24}},[a("el-form",{attrs:{inline:"",model:t.formInline,size:"small"}},[a("el-form-item",{attrs:{label:"mid"}},[a("el-input",{attrs:{placeholder:"请输入mid",clearable:""},model:{value:t.formInline.mid,callback:function(e){t.$set(t.formInline,"mid",e)},expression:"formInline.mid"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.onSearch}},[a("span",{staticClass:"hidden-xs-only"},[t._v("查询")])])],1)],1)],1)],1),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[t.on_board_list?a("el-col",{staticClass:"table-wrap",staticStyle:{"margin-right":"10px"},attrs:{span:8,xs:24}},[a("div",{staticClass:"table-title left"},[t._v("上榜列表")]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.on_board_list,border:"",stripe:""}},[a("el-table-column",{attrs:{prop:"board_type",label:"榜单类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.board_type||"未知"))]}}])})],1)],1):t._e(),t._v(" "),t.reject_reason_list?a("el-col",{staticClass:"table-wrap",attrs:{span:15,xs:24}},[a("div",{staticClass:"table-title left"},[t._v("被拒榜单列表")]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.reject_reason_list,border:"",stripe:""}},[a("el-table-column",{attrs:{prop:"board_type",label:"榜单类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.board_type||"未知"))]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"reject_reason",label:"原因"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(e.row.reject_reason||"未知"))]}}])})],1)],1):t._e()],1)],1):0===t.pageAuth?a("el-main",[a("auth")],1):t._e()},staticRenderFns:[]};var u=a("VU/8")(c,d,!1,function(t){a("+svs")},"data-v-30dae792",null);e.default=u.exports}});