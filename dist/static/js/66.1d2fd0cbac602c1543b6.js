webpackJsonp([66],{R7DH:function(t,a){},iIRP:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("mvHQ"),i=e.n(n),l=e("Dd8w"),s=e.n(l),r=e("vzON"),o=e("NYxO"),u=e("0xDb"),c={name:"operatematerial",components:{Auth:r.a},data:function(){return{type:"hot",curType:"hot",downloadLoading:!1}},computed:s()({},Object(o.b)(["materialStatus","pageAuth"])),methods:{init:function(){1===this.pageAuth&&this.onSearch()},onSearch:function(){var t=this,a=null;"hot"==this.type&&(a={url:"http://172.16.139.44:10999/get_materials_status"});var e={data:i()(a),cip:230};this.$store.dispatch("GetStatus",e).then(function(){t.curType=t.type})},setNum:function(t,a,e){return Object(u.b)(e)},handleDownload:function(){var t=this;this.downloadLoading=!0,e.e(100).then(e.bind(null,"zWO4")).then(function(a){var e=t.materialStatus.material,n=t.formatJson(["index","name","mysql_num","online_num","expo_num"],e);a.export_json_to_excel(["序号","所属领域","原始数据（条）","入库数据（条）","领域曝光（条）"],n,"material"),t.downloadLoading=!1})},formatJson:function(t,a){return a.map(function(a,e){return t.map(function(t){return"index"===t?e+1:"mysql_num"===t||"online_num"===t||"expo_num"===t?Object(u.b)(a[t]):a[t]})})}},created:function(){this.init()},watch:{materialStatus:function(){},pageAuth:function(){this.init()}}},m={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return 1===t.pageAuth?e("el-main",[e("el-row",{staticClass:"pane-title-wrap clearfix"},[e("h6",{staticClass:"pane-title left"},[e("i",{staticClass:"el-icon-goods hidden-xs-only",staticStyle:{"margin-right":"6px"}}),t._v("物料库规模")])]),t._v(" "),t.materialStatus&&t.materialStatus.material?e("el-row",{staticClass:"content-box-wrap"},[e("div",{staticClass:"operate-box clearfix"},[e("span",{staticClass:"table-title"},[t._v("规模列表")]),t._v(" "),t.materialStatus&&t.materialStatus.material&&t.materialStatus.material.length>0?e("el-button",{staticClass:"right",attrs:{type:"primary",plain:"",size:"mini",loading:t.downloadLoading},on:{click:t.handleDownload}},[e("i",{staticClass:"el-icon-download"}),t._v(" 导出")]):t._e(),t._v(" "),e("el-button",{staticClass:"right",staticStyle:{"margin-right":"10px"},attrs:{type:"success",plain:"",size:"mini"},on:{click:t.onSearch}},[e("i",{staticClass:"el-icon-refresh"}),t._v(" 刷新")])],1),t._v(" "),e("el-table",{staticClass:"pane-table",staticStyle:{width:"100%"},attrs:{data:t.materialStatus&&t.materialStatus.material,border:""}},[e("el-table-column",{attrs:{type:"index",align:"center",width:"50",label:"序号",fixed:""}}),t._v(" "),e("el-table-column",{attrs:{fixed:"",align:"left",prop:"name",label:"所属领域"}}),t._v(" "),e("el-table-column",{attrs:{align:"left",sortable:"",prop:"mysql_num",label:"原始数据（条）",formatter:t.setNum}}),t._v(" "),e("el-table-column",{attrs:{align:"left",sortable:"",prop:"online_num",label:"入库数据（条）",formatter:t.setNum}}),t._v(" "),"hot"==t.curType?e("el-table-column",{attrs:{align:"left",sortable:"",prop:"expo_num",label:"领域曝光（条）",formatter:t.setNum}}):t._e()],1)],1):t._e()],1):0===t.pageAuth?e("el-main",[e("auth")],1):t._e()},staticRenderFns:[]};var p=e("VU/8")(c,m,!1,function(t){e("R7DH")},"data-v-83b239f4",null);a.default=p.exports}});