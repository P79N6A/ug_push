webpackJsonp([48],{"+JhK":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Dd8w"),n=a.n(i),r=a("vzON"),o=a("NYxO"),l=a("0xDb"),s=a("zL8q"),u={name:"operateWhite",data:function(){return{apiConf:{getExposureByUid:"/field/getExposureByUid"},midList:[],dialogVisible:!1}},computed:n()({},Object(o.b)(["email"])),props:["data","cur_exposure_date"],methods:{getExposure:function(){var e=this,t=(Object(l.e)(Date.now()-864e5,"{y}-{m}-{d}"),{url:this.apiConf.getExposureByUid,params:{uid:this.data.uid,exposure_date:this.cur_exposure_date,username:this.email,cip:230}});this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)?(e.midList=t.result||[],e.dialogVisible=!0):e.dialogVisible=!0})},_formatNum:function(e){return Object(l.b)(e)}},watch:{data:function(){}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.data?a("div",[a("el-button",{attrs:{type:"primary",icon:"el-icon-view",plain:"",size:"mini",title:"查看mid"},on:{click:function(t){e.getExposure()}}},[a("span",{staticClass:"hidden-xs-only"},[e._v("查看曝光mid")])]),e._v(" "),a("el-dialog",{attrs:{title:"【"+e.data.user_name+"】-曝光mid（"+e.cur_exposure_date+"）",visible:e.dialogVisible,width:"60%"},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.midList,"max-height":"600",border:"",stripe:""}},[a("el-table-column",{attrs:{type:"index",align:"left",label:"序号"}}),e._v(" "),a("el-table-column",{attrs:{align:"left",prop:"mid",label:"mid"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{staticClass:"link-btn",attrs:{href:"//m.weibo.cn/status/"+t.row.mid,target:"_blank",title:"跳转至微博详情页"}},[e._v(e._s(t.row.mid))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"left",prop:"exposure_sum",label:"曝光量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.exposure_sum)))]}}])})],1)],1)],1):e._e()},staticRenderFns:[]};var d=a("VU/8")(u,c,!1,function(e){a("bm1P")},"data-v-0bf357c9",null).exports,p=a("/142"),m={name:"categoryList",components:{Auth:r.a,Operate:d,UserDetail:p.a},data:function(){return{apiConf:{getUserRole:"/role/getUserRole",getExposureTop:"/field/getExposureTop"},formInline:{field_id:"",exposure_date:"",page:1,count:20},cur_page:1,cur_exposure_date:"",hasAllAuth:!1,reportData:null,cateList:null,tips:"loading...",downloadLoading:!1}},computed:n()({},Object(o.b)(["pageAuth","email"])),methods:{init:function(){1===this.pageAuth&&(this.getUserRole(),this.formInline.exposure_date=Object(l.e)(Date.now()-864e5,"{y}-{m}-{d}"))},getUserRole:function(){var e=this,t={url:this.apiConf.getUserRole,params:{username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)?(e.cateList=t.result.field||[],e.cateList.length>0?(t.result.permission.indexOf(13)>-1?e.hasAllAuth=!0:e.formInline.field_id=e.cateList[0].id,e.onSearch()):e.tips="暂无有权限的领域"):e.tips="暂无有权限的领域"},function(t){e.tips="接口异常"})},onSearch:function(){var e=this;if(this.formInline.exposure_date){var t={url:this.apiConf.getExposureTop,params:n()({},this.formInline,{username:this.email,cip:230})};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)&&(e.cur_exposure_date=e.formInline.exposure_date,e.cur_page=e.formInline.page,e.reportData=t.result||[])})}else Object(s.Message)({showClose:!0,message:"请选择查询日期！",type:"error",duration:3e3})},handleSizeChange:function(e){this.formInline.count=e,this.onSearch()},handleCurrentChange:function(e){this.formInline.page=e,this.onSearch()},_formatNum:function(e){return Object(l.b)(e)},indexMethod:function(e){return 20*(this.cur_page-1)+e+1}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("el-col",{attrs:{span:24}},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-document hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("UID曝光排行榜")])])],1),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[e.cateList&&e.cateList.length>0?a("el-col",{attrs:{span:24}},[a("el-form",{attrs:{inline:"",model:e.formInline,size:"mini"}},[a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyy-MM-dd",placeholder:"选择开始时间"},model:{value:e.formInline.exposure_date,callback:function(t){e.$set(e.formInline,"exposure_date",t)},expression:"formInline.exposure_date"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"领域"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择领域"},model:{value:e.formInline.field_id,callback:function(t){e.$set(e.formInline,"field_id",t)},expression:"formInline.field_id"}},[e.hasAllAuth?a("el-option",{attrs:{label:"所有领域",value:""}}):e._e(),e._v(" "),e._l(e.cateList,function(e,t){return a("el-option",{key:t,attrs:{label:e.name,value:e.id}})})],2)],1),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"mini"},on:{click:e.onSearch}},[a("span",{staticClass:"hidden-xs-only"},[e._v("查询")])])],1)],1):a("el-col",{attrs:{span:24}},[a("el-alert",{attrs:{title:e.tips,type:"warning","show-icon":"",closable:!1}})],1)],1),e._v(" "),a("el-row",{staticClass:"content-box-wrap"},[e.reportData?a("el-col",{attrs:{span:24}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.reportData,border:"",stripe:"",size:"mini"}},[a("el-table-column",{attrs:{type:"index",index:e.indexMethod,width:"50",label:"排名",fixed:""}}),e._v(" "),a("el-table-column",{attrs:{width:"130",prop:"uid",label:"uid"},scopedSlots:e._u([{key:"default",fn:function(e){return[a("user-detail",{attrs:{uid:e.row.uid,iswhite:1}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"昵称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{class:t.row.user_name?"link-btn":"errorBtn",attrs:{href:"//weibo.com/u/"+t.row.uid,target:"_blank",title:"跳转至微博主页"}},[e._v(e._s(t.row.user_name||"未知"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"exposure",label:"曝光量"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.exposure)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"count_mid",label:"曝光量条数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.count_mid)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"growth_rate",label:"曝光量较昨天增长率","min-width":"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",[e._v(e._s(isNaN(t.row.growth_rate)?"-":t.row.growth_rate+"%"))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"left",label:"操作项"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("operate",{attrs:{data:t.row,cur_exposure_date:e.cur_exposure_date}})]}}])})],1),e._v(" "),a("div",{staticStyle:{"padding-top":"10px",overflow:"auto"}},[a("el-pagination",{attrs:{"current-page":e.formInline.page,"page-sizes":[20],"page-size":e.formInline.count,layout:"total, sizes, prev, pager, next, jumper",total:100},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1):e._e()],1)],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var h=a("VU/8")(m,f,!1,function(e){a("RErW")},"data-v-6fadf4e8",null);t.default=h.exports},RErW:function(e,t){},bm1P:function(e,t){}});