webpackJsonp([66],{ElTM:function(t,e){},T62f:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("mvHQ"),r=a.n(n),i=a("Dd8w"),s=a.n(i),o=a("vzON"),l=a("NYxO"),c=a("0xDb"),u=a("zL8q"),m={name:"datamonitor",components:{Auth:o.a},data:function(){return{entireData:null,entireDate:"",pickerOptions:{disabledDate:function(t){return t.getTime()+864e5>Date.now()},shortcuts:[{text:"昨天",onClick:function(t){var e=new Date;e.setTime(e.getTime()-864e5),t.$emit("pick",e)}},{text:"一周前",onClick:function(t){var e=new Date;e.setTime(e.getTime()-6048e5),t.$emit("pick",e)}}]}}},computed:s()({},Object(l.b)(["pageAuth"])),methods:{init:function(){1===this.pageAuth&&(this.entireDate=Object(c.e)(Date.now()-1728e5,"{y}{m}{d}"),this.curEntireTime=this.entireDate,this.onSearch())},onSearch:function(){var t=this,e=this,a={url:"http://172.16.105.67:8091/newtest1011/getKpiMonitorData.html",param:{dt:this.entireDate}},n={data:r()(a),cip:230};this.$store.dispatch("GetDataMonitor",n).then(function(a){a.code&&200==Number(a.code)&&(Object(u.Message)({showClose:!0,message:"success",type:"success",duration:1e3}),e.entireData=a.data&&a.data.entire||[],t.curEntireTime=t.entireDate)})},_formatNum:function(t){return Object(c.b)(t)},_parsePercent:function(t){return t?Object(c.d)(t):"0%"},entireRate:function(t,e){return t<-.1?"danger":t>.1?"success":"info"}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return 1===t.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-bell hidden-xs-only",staticStyle:{"margin-right":"6px"}}),t._v("热门流-整体数据分析（"+t._s(t.curEntireTime)+"）")])]),t._v(" "),a("el-row",{staticClass:"search-form-wrap",attrs:{type:"flex"}},[a("el-form",{attrs:{size:"mini"}},[a("el-form-item",[a("el-date-picker",{attrs:{align:"right",type:"date",format:"yyyy 年 MM 月 dd 日","value-format":"yyyyMMdd",placeholder:"选择日期","picker-options":t.pickerOptions},model:{value:t.entireDate,callback:function(e){t.entireDate=e},expression:"entireDate"}}),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(e){t.onSearch()}}},[a("span",{staticClass:"hidden-xs-only"},[t._v("查询")])])],1)],1)],1),t._v(" "),t.entireData?a("el-row",{staticClass:"content-box-wrap"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.entireData,border:"",stripe:"",size:"mini"}},[a("el-table-column",{attrs:{align:"center",width:"140",prop:"name",label:"KPI指标",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{staticClass:"link-btn",attrs:{target:"_blank",href:"/hot/#/hotcenter/analydata"}},[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",width:"160",prop:"day_num",sortable:"",label:"当日数据"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.day_num)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left","min-width":"120",prop:"day_rate",sortable:"",label:"天环比"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"numBox"},[t._v(t._s(t._formatNum(e.row.yesterday_num)))]),t._v(" "),a("el-tag",{attrs:{type:t.entireRate(e.row.day_rate)}},[t._v(t._s(t._parsePercent(e.row.day_rate)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left","min-width":"120",prop:"week_rate",sortable:"",label:"周环比"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"numBox"},[t._v(t._s(t._formatNum(e.row.week_num)))]),t._v(" "),a("el-tag",{attrs:{type:t.entireRate(e.row.week_rate)}},[t._v(t._s(t._parsePercent(e.row.week_rate)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left","min-width":"120",prop:"month_rate",sortable:"",label:"月环比"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{staticClass:"numBox"},[t._v(t._s(t._formatNum(e.row.month_num)))]),t._v(" "),a("el-tag",{attrs:{type:t.entireRate(e.row.month_rate)}},[t._v(t._s(t._parsePercent(e.row.month_rate)))])]}}])})],1)],1):t._e()],1):0===t.pageAuth?a("el-main",[a("auth")],1):t._e()},staticRenderFns:[]};var d=a("VU/8")(m,p,!1,function(t){a("ElTM")},"data-v-a5a789de",null);e.default=d.exports}});