webpackJsonp([86],{"1Nmd":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("mvHQ"),n=a.n(r),l=a("Dd8w"),o=a.n(l),s=a("vzON"),i=a("Obyv"),_=a("NYxO"),u=a("0xDb"),d=a("zL8q"),c={name:"whiteAccounts",components:{Auth:s.a,ItemChart:i.a},data:function(){return{formInline:{status:"entire_white_user",item_names:"white_list_info",dt_start:"",dt_end:""},statusMap:{entire_white_user:"白名单总量",daily_write_user:"白名单中当天发博用户数",daily_weibo_number:"日新增发博总量",daily_origin_weibo_num:"日新增原创发博量",daily_transmit_weibo_num:"日新增转发微博量",daily_ruku_user:"日新增入库用户量",daily_expo_user:"日新增曝光用户量",daily_write_user_rate:"日新增发博用户／白名单总量",daily_expo_user_rate:"日新增曝光用户量／白名单总量",daily_weibo_number_increase_rate:"日新增发博总量对比上周同期增长率",whole_ruku_user:"有效期物料所有入库用户数",whole_expo_user:"有效期物料所有曝光用户数",whole_ave_expo:"有效期内人均曝光量"},chartItem:null,usersTable:null,curTime:"",downloadLoading:!1}},computed:o()({},Object(_.b)(["email","pageAuth"])),methods:{init:function(){this.formInline.dt_start=Object(u.e)(Date.now()-6048e5,"{y}{m}{d}"),this.formInline.dt_end=Object(u.e)(Date.now()-2592e5,"{y}{m}{d}"),1===this.pageAuth&&this.onSearch()},onSearch:function(){this.formInline.dt_start?this.formInline.dt_end?this.formInline.status?(this.getUsersTable(),this.getUsersLine()):Object(d.Message)({showClose:!0,message:"请选择分析项！",type:"error",duration:3e3}):Object(d.Message)({showClose:!0,message:"请选择结束时间！",type:"error",duration:3e3}):Object(d.Message)({showClose:!0,message:"请选择开始时间！",type:"error",duration:3e3})},getUsersLine:function(){var e=this,t={url:"http://172.16.105.67:8091/newtest1011/getMaterialWhiteUsersLine.html",param:this.formInline},a={data:n()(t),cip:230};this.$store.dispatch("ProxyGet",a).then(function(t){t.code&&200==Number(t.code)&&(e.chartItem=e.setAnalyData(t.data,e.statusMap[t.data.yAxis.name]))})},getUsersTable:function(){var e=this,t={url:"http://172.16.105.67:8091/newtest1011/getMaterialWhiteUsersTableManyDt.html",param:{dt_start:this.formInline.dt_start,dt_end:this.formInline.dt_end}},a={data:n()(t),cip:230};this.$store.dispatch("ProxyGet",a).then(function(t){e.curTime=e.formInline.dt_start+"-"+e.formInline.dt_end,t.code&&200==Number(t.code)?e.usersTable=t.data:e.usersTable=[]},function(t){e.curTime=e.formInline.dt_start+"-"+e.formInline.dt_end,e.usersTable=[]})},setAnalyData:function(e,t){for(var a=e.series,r=[],n=0;n<a.length;n++)r.push({name:a[n].name,type:"line",data:a[n].data,smooth:!0});return{title:t,width:"100%",height:"400px",legendName:e.legendName,xAxis:[{type:"category",data:e.xAxis.data,name:e.xAxis.name,axisLabel:{rotate:0},axisLine:{symbol:["none","arrow"]},splitLine:{show:!0},axisTick:{show:!1}}],yAxis:[{type:"value",name:"",axisLine:{symbol:["none","arrow"]},axisTick:{show:!1}}],series:r}},handleDownload:function(){var e=this;this.downloadLoading=!0,a.e(106).then(a.bind(null,"zWO4")).then(function(t){var a="白名单账号_"+e.curTime,r=e.usersTable,n=e.formatJson(["dt","entire_white_user","daily_write_user","daily_ruku_user","daily_expo_user","daily_write_user_rate","daily_expo_user_rate","daily_weibo_number","daily_weibo_number_increase_rate","daily_origin_weibo_num","daily_transmit_weibo_num","whole_ruku_user","whole_expo_user","whole_ave_expo"],r);t.export_json_to_excel(["日期","白名单总量","白名单中当天发博用户数","日新增入库用户量","日新增曝光用户量","日新增发博用户／白名单总量","日新增曝光用户量／白名单总量","日新增发博总量","日新增发博总量对比上周同期增长率","日新增原创发博量","日新增转发微博量","有效期物料所有入库用户数","有效期物料所有曝光用户数","有效期内人均曝光量"],n,a),e.downloadLoading=!1})},formatJson:function(e,t){var a=this;return t.map(function(t,r){return e.map(function(e){return"daily_write_user_rate"===e||"daily_expo_user_rate"===e||"daily_weibo_number_increase_rate"===e?a._parsePercent(t[e]):t[e]})})},_formatNum:function(e){return Object(u.b)(e)},_parsePercent:function(e,t){return Object(u.d)(e,t)}},created:function(){this.init()},watch:{email:function(){},pageAuth:function(){this.init()}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-printer",staticStyle:{"margin-right":"6px"}}),e._v("白名单账号")])]),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[a("el-form",{attrs:{inline:"",model:e.formInline,size:"mini"}},[a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择开始时间"},model:{value:e.formInline.dt_start,callback:function(t){e.$set(e.formInline,"dt_start",t)},expression:"formInline.dt_start"}}),e._v(" "),a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择结束时间"},model:{value:e.formInline.dt_end,callback:function(t){e.$set(e.formInline,"dt_end",t)},expression:"formInline.dt_end"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"分析项"}},[a("el-select",{staticStyle:{width:"260px"},attrs:{placeholder:"请选择",filterable:""},model:{value:e.formInline.status,callback:function(t){e.$set(e.formInline,"status",t)},expression:"formInline.status"}},e._l(e.statusMap,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onSearch()}}},[e._v("查询")])],1)],1)],1),e._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("el-col",[a("el-row",{staticClass:"chartWrap"},[a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:24}},[a("item-chart",{attrs:{data:e.chartItem}})],1)],1),e._v(" "),e.usersTable?a("el-row",{staticClass:"table-wrap"},[a("el-col",[a("div",{staticClass:"table-title left"},[e._v(e._s(e.curTime))]),e._v(" "),e.usersTable.length>0?a("el-button",{staticClass:"right",attrs:{type:"primary",plain:"",size:"mini",loading:e.downloadLoading},on:{click:e.handleDownload}},[a("i",{staticClass:"el-icon-download"}),e._v(" "),a("span",{staticClass:"hidden-xs-only"},[e._v("导出")])]):e._e(),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.usersTable,border:"",stripe:"",size:"mini"}},[a("el-table-column",{attrs:{prop:"dt",label:"日期"}}),e._v(" "),a("el-table-column",{attrs:{prop:"entire_white_user",label:"白名单总量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.entire_white_user)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_write_user",label:"白名单中当天发博用户数",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_write_user)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_ruku_user",label:"日新增入库用户量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_ruku_user)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_expo_user",label:"日新增曝光用户量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_expo_user)))]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"90",prop:"daily_write_user_rate",label:"日新增发博用户／白名单总量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",[e._v(e._s(e._parsePercent(t.row.daily_write_user_rate)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"90",prop:"daily_expo_user_rate",label:"日新增曝光用户量／白名单总量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",[e._v(e._s(e._parsePercent(t.row.daily_expo_user_rate)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_weibo_number",label:"日新增发博总量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_weibo_number)))]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"90",prop:"daily_weibo_number_increase_rate",label:"日新增发博总量对比上周同期增长率",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",[e._v(e._s(e._parsePercent(t.row.daily_weibo_number_increase_rate)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_origin_weibo_num",label:"日新增原创发博量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_origin_weibo_num)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_transmit_weibo_num",label:"日新增转发微博量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_transmit_weibo_num)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"whole_ruku_user",label:"有效期物料所有入库用户数",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.whole_ruku_user)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"whole_expo_user",label:"有效期物料所有曝光用户数",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.whole_expo_user)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"whole_ave_expo",label:"有效期内人均曝光量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.whole_ave_expo)))]}}])})],1)],1)],1):e._e()],1)],1)],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var p=a("VU/8")(c,m,!1,function(e){a("bK+r")},"data-v-2db74ada",null);t.default=p.exports},"bK+r":function(e,t){}});