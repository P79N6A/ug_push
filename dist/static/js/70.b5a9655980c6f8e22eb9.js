webpackJsonp([70],{Z5eG:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("mvHQ"),i=a.n(r),n=a("Dd8w"),o=a.n(n),s=a("vzON"),l=a("NYxO"),c=a("0xDb"),u=a("zL8q"),d={name:"datamonitor",components:{Auth:s.a},data:function(){return{datalist:[],originDataList:[],pickerOptions:{disabledDate:function(t){return t.getTime()+864e5>Date.now()},shortcuts:[{text:"昨天",onClick:function(t){var e=new Date;e.setTime(e.getTime()-864e5),t.$emit("pick",e)}},{text:"一周前",onClick:function(t){var e=new Date;e.setTime(e.getTime()-6048e5),t.$emit("pick",e)}}]},formInline:{status:"pv",dt:""},originList:{os:"Android",dt:""},curEntireTime:"",curOriginTime:""}},computed:o()({},Object(l.b)(["pageAuth"])),methods:{init:function(){1===this.pageAuth&&(this.formInline.dt=Object(c.e)(Date.now()-1728e5,"{y}{m}{d}"),this.originList.dt=Object(c.e)(Date.now()-1728e5,"{y}{m}{d}"),this.curEntireTime=this.formInline.dt,this.curOriginTime=this.originList.dt,this.onSearch(),this.onSearchOrigin())},onSearch:function(){var t=this,e=this,a={url:"http://172.16.105.67:8091/newtest1011/getPvuvFromVal.html",param:this.formInline},r={data:i()(a),cip:230};this.$store.dispatch("ProxyGet",r).then(function(a){a.code&&200==Number(a.code)?(e.datalist=a.data||[],t.curEntireTime=t.formInline.dt):Object(u.Message)({showClose:!0,message:"热门微博整体流量分析数据获取失败",type:"error",duration:1e3})},function(t){Object(u.Message)({showClose:!0,message:"热门微博整体流量分析数据接口请求失败",type:"error",duration:1e3})})},onSearchOrigin:function(){var t=this,e={url:"http://172.16.105.67:8091/newtest1011/getEntranceFlowStat.html",param:this.originList},a={data:i()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?(t.originDataList=e.data||[],t.curOriginTime=t.originList.dt):Object(u.Message)({showClose:!0,message:"热门流流量来源数据获取失败",type:"error",duration:1e3})},function(t){Object(u.Message)({showClose:!0,message:"热门流流量来源数据接口请求失败",type:"error",duration:1e3})})},_formatNum:function(t){return Object(c.b)(t)},_parsePercent:function(t){return Object(c.d)(t)},checkRate:function(t,e){return t<-.15?"danger":t>.15?"success":"info"}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return 1===t.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-date hidden-xs-only",staticStyle:{"margin-right":"6px"}}),t._v("流量分析")])]),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("div",{staticClass:"table-title left"},[t._v("热门微博整体流量分析（"+t._s(t.curEntireTime)+"）")]),t._v(" "),a("el-date-picker",{staticClass:"left",attrs:{clearable:!1,editable:!1,align:"right",type:"date",format:"yyyy 年 MM 月 dd 日","value-format":"yyyyMMdd",placeholder:"选择日期",size:"mini","picker-options":t.pickerOptions},on:{change:function(e){t.onSearch()}},model:{value:t.formInline.dt,callback:function(e){t.$set(t.formInline,"dt",e)},expression:"formInline.dt"}}),t._v(" "),a("el-radio-group",{staticStyle:{display:"block"},attrs:{size:"mini"},on:{change:function(e){t.onSearch()}},model:{value:t.formInline.status,callback:function(e){t.$set(t.formInline,"status",e)},expression:"formInline.status"}},[a("el-radio",{staticStyle:{"margin-bottom":"10px","margin-right":"10px","margin-left":"20px"},attrs:{label:"pv",border:""}},[t._v("pv")]),t._v(" "),a("el-radio",{staticStyle:{"margin-bottom":"10px","margin-right":"10px","margin-left":"0"},attrs:{label:"uv",border:""}},[t._v("uv")])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.datalist,border:"",stripe:"",size:"mini"}},[a("el-table-column",{attrs:{align:"center",width:"140",prop:"name",label:"from值",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{staticClass:"link-btn",attrs:{target:"_blank",href:"/hot/#/hotcenter/analysis/data/flow/detail?status="+t.formInline.status}},[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",prop:"hotwb",sortable:"",label:"热门流"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.hotwb&&t._formatNum(e.row.hotwb)||"暂无"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",prop:"top_rank",sortable:"",label:"榜单流"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.top_rank&&t._formatNum(e.row.top_rank)||"暂无"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",prop:"channel",sortable:"",label:"频道流"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.channel&&t._formatNum(e.row.channel)||"暂无"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",prop:"visit",sortable:"",label:"访客流"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.visit&&t._formatNum(e.row.visit)||"暂无"))])]}}])})],1)],1),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("div",{staticClass:"table-title left"},[t._v("热门流流量来源列表（"+t._s(t.curOriginTime)+"）")]),t._v(" "),a("el-date-picker",{staticClass:"left",attrs:{clearable:!1,editable:!1,align:"right",type:"date",format:"yyyy 年 MM 月 dd 日","value-format":"yyyyMMdd",placeholder:"选择日期",size:"mini","picker-options":t.pickerOptions},on:{change:function(e){t.onSearchOrigin()}},model:{value:t.originList.dt,callback:function(e){t.$set(t.originList,"dt",e)},expression:"originList.dt"}}),t._v(" "),a("el-radio-group",{staticStyle:{display:"block"},attrs:{size:"mini"},on:{change:function(e){t.onSearchOrigin()}},model:{value:t.originList.os,callback:function(e){t.$set(t.originList,"os",e)},expression:"originList.os"}},[a("el-radio",{staticStyle:{"margin-bottom":"10px","margin-right":"10px","margin-left":"20px"},attrs:{label:"Android",border:""}},[t._v("Android")]),t._v(" "),a("el-radio",{staticStyle:{"margin-bottom":"10px","margin-right":"10px","margin-left":"0"},attrs:{label:"IOS",border:""}},[t._v("IOS")]),t._v(" "),a("el-radio",{staticStyle:{"margin-bottom":"10px","margin-right":"10px","margin-left":"0"},attrs:{label:"other",border:""}},[t._v("other")])],1),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.originDataList,"default-sort":{prop:"pv",order:"descending"},border:"",stripe:"",size:"mini"}},[a("el-table-column",{attrs:{type:"index",align:"center",width:"50",label:"序号",fixed:""}}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"120",prop:"luicode",label:"luicode",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.luicode))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"120",prop:"name",label:"来源",fixed:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",width:"120",prop:"pv",sortable:"",label:"PV"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.pv)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",prop:"yesterday_pv",sortable:"",label:"PV天环比"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.yesterday_pv)))]),t._v(" "),a("el-tag",{attrs:{type:t.checkRate(e.row.pv_daily_ring_ratio)}},[t._v(t._s(t._parsePercent(e.row.pv_daily_ring_ratio)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",width:"120",prop:"uv",sortable:"",label:"UV"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.uv)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",prop:"yesterday_uv",sortable:"",label:"UV天环比"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.yesterday_uv)))]),t._v(" "),a("el-tag",{attrs:{type:t.checkRate(e.row.uv_daily_ring_ratio)}},[t._v(t._s(t._parsePercent(e.row.uv_daily_ring_ratio)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",width:"120",prop:"exposure",sortable:"",label:"曝光"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.exposure)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",prop:"yesterday_exposure",sortable:"",label:"曝光天环比"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.yesterday_exposure)))]),t._v(" "),a("el-tag",{attrs:{type:t.checkRate(e.row.exposure_daily_ring_ratio)}},[t._v(t._s(t._parsePercent(e.row.exposure_daily_ring_ratio)))])]}}])})],1)],1)],1):0===t.pageAuth?a("el-main",[a("auth")],1):t._e()},staticRenderFns:[]};var _=a("VU/8")(d,p,!1,function(t){a("vUD1")},"data-v-6e84a012",null);e.default=_.exports},vUD1:function(t,e){}});