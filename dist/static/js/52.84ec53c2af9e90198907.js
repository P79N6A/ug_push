webpackJsonp([52],{Obv8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Dd8w"),l=n.n(a),r=n("NYxO"),s=n("0xDb"),i=(n("zL8q"),{name:"ChannelStats",components:{Auth:n("vzON").a},data:function(){return{downloadLoading:!1,defaultChannel:"",formInline:{channel_id:"all",data_date:""},dataList:[]}},computed:l()({},Object(r.b)(["pageAuth","email","channelList","channelApi"])),methods:{init:function(){1===this.pageAuth&&(this.setChannelList(),this.formInline.data_date=Object(s.e)(Date.now()-864e5,"{y}-{m}-{d}"))},setChannelList:function(){var e={url:"/channel/getAuthChannelList",params:{username:this.email,cip:230}};this.$store.dispatch("SetChannelList",e)},onSearch:function(){var e=this,t=new URLSearchParams;t.append("channel_id","all"===this.formInline.channel_id?this.getAllChannelId():this.formInline.channel_id),t.append("data_date",this.formInline.data_date),t.append("username",this.email),t.append("cip",230);var n={url:"/channel/getChannelStatistics",params:t};this.$store.dispatch("CommonPost",n).then(function(t){t.code&&200==Number(t.code)&&(e.dataList=t.result)})},getAllChannelId:function(){for(var e=this.channelList,t=[],n=0;n<e.length;n++)t.push(e[n].channel_id);return t.join(",")},_formatNum:function(e){return Object(s.b)(e)},_parsePercent:function(e){return e?Object(s.d)(e):"0%"},_parseTime:function(e,t){return Object(s.e)(e,t)}},created:function(){this.init()},watch:{pageAuth:function(){this.init()},channelList:function(){this.channelList&&this.channelList.length>0&&this.onSearch()}}}),o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return 1===e.pageAuth?n("el-main",[n("el-row",{staticClass:"pane-title-wrap"},[n("el-col",{staticClass:"clearfix",attrs:{span:24}},[n("h6",{staticClass:"pane-title left"},[n("i",{staticClass:"el-icon-document hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("频道数据统计")])])],1),e._v(" "),n("el-row",{staticClass:"search-form-wrap"},[e.channelList&&e.channelList.length>0?n("el-col",{attrs:{span:24}},[e.channelList?n("el-form",{attrs:{inline:"",model:e.formInline,"label-position":"left",size:"small"}},[n("el-form-item",{attrs:{label:"选择频道","label-width":"70px"}},[n("el-select",{attrs:{filterable:"",placeholder:"请选择频道"},model:{value:e.formInline.channel_id,callback:function(t){e.$set(e.formInline,"channel_id",t)},expression:"formInline.channel_id"}},[n("el-option",{attrs:{label:"所有频道",value:"all"}}),e._v(" "),e._l(e.channelList,function(e,t){return n("el-option",{key:t,attrs:{label:e.channel_name,value:e.channel_id}})})],2)],1),e._v(" "),n("el-form-item",{attrs:{label:"日期"}},[n("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyy-MM-dd",placeholder:"选择日期"},model:{value:e.formInline.data_date,callback:function(t){e.$set(e.formInline,"data_date",t)},expression:"formInline.data_date"}}),e._v(" "),n("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.onSearch}},[n("span",{staticClass:"hidden-xs-only"},[e._v("查询")])])],1)],1):e._e()],1):null==e.channelApi?n("el-col",{attrs:{span:24}},[e._v("\n      loading……\n    ")]):"response failed"==e.channelApi?n("el-col",{attrs:{span:24}},[n("el-alert",{attrs:{title:"网络请求异常，请重试~",type:"warning","show-icon":"",closable:!1}})],1):1==e.channelApi?n("el-col",{attrs:{span:24}},[n("el-alert",{attrs:{title:"暂无有权限的频道",type:"warning","show-icon":"",closable:!1}})],1):e._e()],1),e._v(" "),e.channelList&&e.channelList.length>0?n("el-row",{staticClass:"content-box-wrap"},[n("el-col",{attrs:{span:24}},[n("el-row",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.dataList,border:"",stripe:""}},[n("el-table-column",{attrs:{type:"index",fixed:"",width:"50",label:"序号"}}),e._v(" "),n("el-table-column",{attrs:{fixed:"",prop:"channel_name",label:"频道名称","min-width":"80"}}),e._v(" "),n("el-table-column",{attrs:{prop:"data_date",label:"日期","min-width":"110"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._parseTime(t.row.data_date,"{y}-{m}-{d}")))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"refresh_user_num",label:"刷新人数","min-width":"102",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.refresh_user_num)))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"refresh_num",label:"刷新次数","min-width":"110",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.refresh_num)))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"exposure_num",label:"曝光量","min-width":"90",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.exposure_num)))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"interact_num",label:"互动量","min-width":"90",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.interact_num)))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"k_click",label:"千次曝光点击量","min-width":"144",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.k_click)))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"add_attention",label:"加关注量","min-width":"102",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.add_attention)))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"morrow_rate",label:"次日留存率",width:"120",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._parsePercent(t.row.morrow_rate)))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"three_rate",label:"3日留存率",width:"110",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._parsePercent(t.row.three_rate)))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"seven_rate",label:"7日留存率",width:"110",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._parsePercent(t.row.seven_rate)))]}}])})],1)],1)],1)],1):e._e()],1):0===e.pageAuth?n("el-main",[n("auth")],1):e._e()},staticRenderFns:[]};var c=n("VU/8")(i,o,!1,function(e){n("slYx")},"data-v-c2fbc652",null);t.default=c.exports},slYx:function(e,t){}});