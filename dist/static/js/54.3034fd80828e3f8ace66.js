webpackJsonp([54],{"TS+f":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Dd8w"),l=a.n(r),o=a("vzON"),n=a("Obyv"),s=a("NYxO"),i=a("0xDb"),u=(a("zL8q"),{name:"categoryList",components:{Auth:o.a,ItemChart:n.a},data:function(){return{apiConf:{getUserRole:"/role/getUserRole",getDataReport:"/field/getDataReport"},formInline:{field_id:"",start_time:"",end_time:""},curField:",所有领域",curFieldName:"所有领域",hasAllAuth:!1,reportData:[],cateList:null,tips:"loading...",downloadLoading:!1,itemMap:{white_sum:"白名单总量",new_white:"新增白名单量",white_send_weibo:"白名单发博用户量",original_sum:"原创微博总量",forward_sum:"转发微博总量",original_tag_sum:"原创微博标签覆盖量",storage_material_sum:"当天发布当天入库物料总量",exposure_material_sum:"当天发布当天入库当天曝光的物料量",exposure_sum:"当天发布当天入库当天曝光量",exposure_blogger:"当天曝光博主人数",exposure_material_all_sum:"当天曝光物料量",exposure_all_sum:"当天曝光量"},item:"white_sum",chartMap:null,chartOption:null}},computed:l()({},Object(s.b)(["pageAuth","email"])),methods:{init:function(){1===this.pageAuth&&this.getUserRole()},getUserRole:function(){var e=this,t={url:this.apiConf.getUserRole,params:{username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)?(e.cateList=t.result.field||[],e.cateList.length>0?(t.result.permission.indexOf(13)>-1?e.hasAllAuth=!0:(e.formInline.field_id=e.cateList[0].id,e.curField=e.cateList[0].id+","+e.cateList[0].name),e.onSearch()):e.tips="暂无有权限的领域"):e.tips="暂无有权限的领域"},function(t){e.tips="接口异常"})},onSearch:function(){var e=this,t={url:this.apiConf.getDataReport,params:l()({},this.formInline,{username:this.email,cip:230})};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)&&(e.reportData=t.result||[],e.curFieldName=e.curField.split(",")[1],e.chartMap=t.data,e.handleChart())})},_formatNum:function(e){return Object(i.b)(e)},setField:function(){this.formInline.field_id=this.curField.split(",")[0]},handleDownload:function(){var e=this;this.downloadLoading=!0,a.e(111).then(a.bind(null,"zWO4")).then(function(t){var a="分领域白名单生产与曝光统计_"+Object(i.e)(Date.now(),"{y}{m}{d}"),r=e.reportData,l=e.formatJson(["data_date","exposure_ranking","field_name","user_sum","f_c_sum","white_sum","new_white","white_send_weibo","original_sum","forward_sum","original_tag_sum","interest_sum","storage_material_sum","exposure_material_sum","exposure_sum","exposure_blogger","exposure_material_all_sum","exposure_all_sum","send_weibo_rate","growth_rate"],r);t.export_json_to_excel(["日期","曝光量分领域排名","领域","领域用户总量","F01&C12总量","白名单总量","新增白名单量","白名单发博用户量","原创微博总量","转发微博总量","原创微博标签覆盖量","兴趣用户总量","当天发布当天入库物料总量","当天发布当天入库当天曝光的物料量","当天发布当天入库当天曝光量","当天曝光博主人数","当天曝光物料量","当天曝光量","发博量较前1天增长率","曝光量较前1天增长率"],l,a),e.downloadLoading=!1})},formatJson:function(e,t){var a=this;return t.map(function(t,r){return e.map(function(e){return"index"===e?r+1:"field_name"===e?a.curFieldName:"send_weibo_rate"===e||"growth_rate"===e?isNaN(t[e])?"-":t[e]+"%":t[e]})})},setAnalyData:function(e,t){for(var a=e.series,r=[],l=0;l<a.length;l++)r.push({name:a[l].name,type:a[l].type||"line",data:a[l].data,smooth:!0});return{title:t,width:"100%",height:"400px",legendName:e.legendName,xAxis:[{type:"category",data:e.xAxis.data,name:e.xAxis.name,axisLabel:{rotate:0},axisLine:{symbol:["none","arrow"]},splitLine:{show:!0},axisTick:{show:!1}}],yAxis:[{type:"value",name:"",axisLine:{symbol:["none","arrow"]},axisTick:{show:!1}}],series:r}},handleChart:function(){this.chartOption=null,this.chartMap&&(this.chartOption=this.setAnalyData(this.chartMap[this.item],this.itemMap[this.item]))}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}}),_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("el-col",{attrs:{span:24}},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-document hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("分领域白名单生产与曝光统计")])])],1),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[e.cateList&&e.cateList.length>0?a("el-col",{attrs:{span:24}},[a("el-form",{attrs:{inline:"",model:e.formInline,size:"mini"}},[a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyy-MM-dd",placeholder:"选择开始时间"},model:{value:e.formInline.start_time,callback:function(t){e.$set(e.formInline,"start_time",t)},expression:"formInline.start_time"}}),e._v(" "),a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyy-MM-dd",placeholder:"选择结束时间"},model:{value:e.formInline.end_time,callback:function(t){e.$set(e.formInline,"end_time",t)},expression:"formInline.end_time"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"领域"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择领域"},on:{change:function(t){e.setField()}},model:{value:e.curField,callback:function(t){e.curField=t},expression:"curField"}},[e.hasAllAuth?a("el-option",{attrs:{label:"所有领域",value:",所有领域"}}):e._e(),e._v(" "),e._l(e.cateList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id+","+e.name}})})],2)],1),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.onSearch}},[a("span",{staticClass:"hidden-xs-only"},[e._v("查询")])])],1)],1):a("el-col",{attrs:{span:24}},[a("el-alert",{attrs:{title:e.tips,type:"warning","show-icon":"",closable:!1}})],1)],1),e._v(" "),e.cateList&&e.cateList.length>0?a("el-row",{staticClass:"content-box-wrap"},[a("el-col",{attrs:{span:24}},[e.chartOption?a("el-row",{staticClass:"chartWrap"},[a("el-radio-group",{attrs:{size:"mini"},on:{change:function(t){e.handleChart()}},model:{value:e.item,callback:function(t){e.item=t},expression:"item"}},e._l(e.itemMap,function(t,r){return a("el-radio",{key:r,staticStyle:{"margin-left":"0","margin-right":"10px","margin-bottom":"10px"},attrs:{label:r,border:""}},[e._v(e._s(t))])})),e._v(" "),a("item-chart",{attrs:{data:e.chartOption}})],1):e._e(),e._v(" "),a("el-row",{staticClass:"table-wrap"},[a("div",{staticClass:"table-title left"},[e._v("数据统计")]),e._v(" "),e.reportData&&e.reportData.length>0?a("el-button",{staticClass:"right",attrs:{type:"primary",plain:"",size:"mini",loading:e.downloadLoading},on:{click:e.handleDownload}},[a("i",{staticClass:"el-icon-download"}),e._v(" "),a("span",{staticClass:"hidden-xs-only"},[e._v("导出")])]):e._e(),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.reportData,"default-sort":{prop:"data_date",order:"descending"},"max-height":"500",border:"",stripe:"",size:"mini"}},[a("el-table-column",{attrs:{width:"100",prop:"data_date",label:"日期",fixed:"",sortable:""}}),e._v(" "),a("el-table-column",{attrs:{width:"70",prop:"exposure_ranking",label:"曝光量分领域排名"}}),e._v(" "),a("el-table-column",{attrs:{label:"领域"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e.curFieldName))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"user_sum",label:"领域用户总量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.user_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"f_c_sum",label:"F01&C12总量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.f_c_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"white_sum",label:"白名单总量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.white_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"new_white",label:"新增白名单量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.new_white)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"white_send_weibo",label:"白名单发博用户量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.white_send_weibo)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"original_sum",label:"原创微博总量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.original_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"forward_sum",label:"转发微博总量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.forward_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"original_tag_sum",label:"原创微博标签覆盖量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.original_tag_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"interest_sum",label:"兴趣用户总量",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1e4===t.row.field_id?"—":e._formatNum(t.row.interest_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"80",prop:"storage_material_sum",label:"当天发布当天入库物料总量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.storage_material_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"80",prop:"exposure_material_sum",label:"当天发布当天入库当天曝光的物料量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.exposure_material_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"80",prop:"exposure_sum",label:"当天发布当天入库当天曝光量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.exposure_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"exposure_blogger",label:"当天曝光博主人数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.exposure_blogger)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"exposure_material_all_sum",label:"当天曝光物料量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.exposure_material_all_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"exposure_all_sum",label:"当天曝光量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.exposure_all_sum)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"send_weibo_rate",label:"发博量较前1天增长率","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",[e._v(e._s(isNaN(t.row.send_weibo_rate)?"-":t.row.send_weibo_rate+"%"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"growth_rate",label:"曝光量较前1天增长率","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",[e._v(e._s(isNaN(t.row.growth_rate)?"-":t.row.growth_rate+"%"))])]}}])})],1),e._v(" "),a("p",{staticClass:"table-info"},[e._v("\n          数据口径说明："),a("br"),e._v("\n          原创微博标签覆盖量：白名单博主发布的原创微博，打上一级标签的覆盖量;"),a("br"),e._v("\n          兴趣用户总量:DAU（客户端主版本）中的兴趣用户量（权重>60）;"),a("br"),e._v("\n          当天曝光物料量：白名单博主近7天发博（原创&转发）在当天曝光的微博量（站内整体热门）;"),a("br"),e._v("\n          当天曝光量：白名单博主近7天发博（原创&转发）在当天的曝光量（站内整体热门）。\n        ")])],1)],1)],1):e._e()],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var m=a("VU/8")(u,_,!1,function(e){a("py6y")},"data-v-d8a21290",null);t.default=m.exports},py6y:function(e,t){}});