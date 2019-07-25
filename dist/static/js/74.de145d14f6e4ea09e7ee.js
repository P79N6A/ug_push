webpackJsonp([74],{DCvK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),l=a.n(n),r=a("Dd8w"),o=a.n(r),s=a("vzON"),i=a("Obyv"),u=a("NYxO"),d=a("0xDb"),_=a("zL8q"),m={name:"materialSummary",components:{Auth:s.a,ItemChart:i.a},data:function(){return{formInline:{status:"daily_ruku_num",item_names:"entire",dt_start:"",dt_end:""},dt_table:"",statusMap:{daily_ruku_num:"日新增入库物料量",daily_expo_weibo:"日新增曝光物料量",daily_expo_num:"日新增物料曝光量",whole_ruku_num:"有效期内入库物料量",whole_expo_weibo:"有效期内曝光物料量",whole_expo_num:"有效期内物料曝光量",daily_ruku_number_increase_rate:"日新增入库物料量对比上周同期增长率"},itemMap:{entire:"总量",total_cf:"全站协同",mannual_tag:"人工标签",short_video:"小视频",vertical_operate:"垂直运营",local:"本地",douyin:"抖音",dujia:"独家",bangdan:"榜单",hot_event:"热点事件",F0:"F0转发",F1:"F1转发",white_user_origin:"白名单原创物料"},chartItem:null,usersTable:null,curTime:"",downloadLoading:!1}},computed:o()({},Object(u.b)(["email","pageAuth"])),methods:{init:function(){this.formInline.dt_start=Object(d.e)(Date.now()-6048e5,"{y}{m}{d}"),this.formInline.dt_end=Object(d.e)(Date.now()-2592e5,"{y}{m}{d}"),this.dt_table=this.formInline.dt_end,this.curTime=this.dt_table,1===this.pageAuth&&(this.getUsersTable(),this.getUsersLine())},getUsersLine:function(){var e=this;if(this.formInline.dt_start)if(this.formInline.dt_end)if(this.formInline.status){var t={url:"http://172.16.105.67:8091/newtest1011/getMaterialComponentsLine.html",param:this.formInline},a={data:l()(t),cip:230};this.$store.dispatch("ProxyGet",a).then(function(t){t.code&&200==Number(t.code)&&(e.chartItem=e.setAnalyData(t.data,t.data.yAxis.name))})}else Object(_.Message)({showClose:!0,message:"请选择分析项！",type:"error",duration:3e3});else Object(_.Message)({showClose:!0,message:"请选择结束时间！",type:"error",duration:3e3});else Object(_.Message)({showClose:!0,message:"请选择开始时间！",type:"error",duration:3e3})},getUsersTable:function(){var e=this;if(this.dt_table){var t={url:"http://172.16.105.67:8091/newtest1011/getMaterialComponentsTable.html",param:{dt:this.dt_table}},a={data:l()(t),cip:230};this.$store.dispatch("ProxyGet",a).then(function(t){t.code&&200==Number(t.code)?(e.curTime=e.dt_table,e.usersTable=t.data):(e.curTime=e.dt_table,e.usersTable=[])},function(t){e.curTime=e.dt_table,e.usersTable=[]})}else Object(_.Message)({showClose:!0,message:"请选择数据查询日期！",type:"error",duration:3e3})},setAnalyData:function(e,t){for(var a=e.series,n=[],l=0;l<a.length;l++)n.push({name:a[l].name,type:"line",data:a[l].data,smooth:!0});return{title:t,width:"100%",height:"400px",legendName:e.legendName,xAxis:[{type:"category",data:e.xAxis.data,name:e.xAxis.name,axisLabel:{rotate:0},axisLine:{symbol:["none","arrow"]},splitLine:{show:!0},axisTick:{show:!1}}],yAxis:[{type:"value",name:"",axisLine:{symbol:["none","arrow"]},axisTick:{show:!1}}],series:n}},handleDownload:function(){var e=this;this.downloadLoading=!0,a.e(100).then(a.bind(null,"zWO4")).then(function(t){var a="物料构成总况_"+e.curTime,n=e.usersTable,l=e.formatJson(["index","name","daily_ruku_num","daily_expo_weibo","daily_expo_num","whole_ruku_num","whole_expo_weibo","whole_expo_num","daily_ruku_number_increase_rate"],n);t.export_json_to_excel(["序号","物料构成","日新增入库物料量","日新增曝光物料量","日新增物料曝光量","有效期内入库物料量","有效期内曝光物料量","有效期内物料曝光量","日新增入库物料量对比上周同期增长率"],l,a),e.downloadLoading=!1})},formatJson:function(e,t){var a=this;return t.map(function(t,n){return e.map(function(e){return"index"===e?n+1:"daily_ruku_number_increase_rate"===e?a._parsePercent(t[e]):t[e]})})},_formatNum:function(e){return Object(d.b)(e)},_parsePercent:function(e,t){return Object(d.d)(e,t)}},created:function(){this.init()},watch:{email:function(){},pageAuth:function(){this.init()}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-printer",staticStyle:{"margin-right":"6px"}}),e._v("物料构成总况")])]),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[a("el-form",{attrs:{inline:"",model:e.formInline,size:"small"}},[a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择开始时间"},model:{value:e.formInline.dt_start,callback:function(t){e.$set(e.formInline,"dt_start",t)},expression:"formInline.dt_start"}}),e._v(" "),a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择结束时间"},model:{value:e.formInline.dt_end,callback:function(t){e.$set(e.formInline,"dt_end",t)},expression:"formInline.dt_end"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"物料构成"}},[a("el-select",{staticStyle:{width:"140px"},attrs:{placeholder:"请选择",filterable:""},model:{value:e.formInline.item_names,callback:function(t){e.$set(e.formInline,"item_names",t)},expression:"formInline.item_names"}},e._l(e.itemMap,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"分析项"}},[a("el-select",{staticStyle:{width:"270px"},attrs:{placeholder:"请选择",filterable:""},model:{value:e.formInline.status,callback:function(t){e.$set(e.formInline,"status",t)},expression:"formInline.status"}},e._l(e.statusMap,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.getUsersLine()}}},[e._v("查询")])],1)],1)],1),e._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("el-col",[a("el-row",{staticClass:"chartWrap"},[a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:24}},[a("item-chart",{attrs:{data:e.chartItem}})],1)],1),e._v(" "),e.usersTable?a("el-row",{staticClass:"table-wrap"},[a("el-col",[a("div",{staticClass:"table-title left"},[e._v(e._s(e.curTime))]),e._v(" "),a("el-date-picker",{staticClass:"left",staticStyle:{"margin-left":"10px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择时间",size:"mini"},on:{change:function(t){e.getUsersTable()}},model:{value:e.dt_table,callback:function(t){e.dt_table=t},expression:"dt_table"}}),e._v(" "),e.usersTable.length>0?a("el-button",{staticClass:"right",attrs:{type:"primary",plain:"",size:"mini",loading:e.downloadLoading},on:{click:e.handleDownload}},[a("i",{staticClass:"el-icon-download"}),e._v(" "),a("span",{staticClass:"hidden-xs-only"},[e._v("导出")])]):e._e(),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.usersTable,"default-sort":{prop:"daily_ruku_num",order:"descending"},border:"",stripe:""}},[a("el-table-column",{attrs:{type:"index",prop:"index",label:"序号",width:"50",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"物料构成"}}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_ruku_num",label:"日新增入库物料量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_ruku_num)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_expo_weibo",label:"日新增曝光物料量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_expo_weibo)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_expo_num",label:"日新增物料曝光量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_expo_num)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"whole_ruku_num",label:"有效期内入库物料量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.whole_ruku_num)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"whole_expo_weibo",label:"有效期内曝光物料量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.whole_expo_weibo)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"whole_expo_num",label:"有效期内物料曝光量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.whole_expo_num)))]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"90",prop:"daily_ruku_number_increase_rate",label:"日新增入库物料量对比上周同期增长率",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",[e._v(e._s(e._parsePercent(t.row.daily_ruku_number_increase_rate)))])]}}])})],1)],1)],1):e._e()],1)],1)],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var p=a("VU/8")(m,c,!1,function(e){a("ZLU+")},"data-v-56ffcb9c",null);t.default=p.exports},"ZLU+":function(e,t){}});