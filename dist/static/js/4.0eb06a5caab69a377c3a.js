webpackJsonp([4],{"3C/1":function(e,t,a){a("M6a0"),a("zQR9"),a("+tPU"),a("qCoq"),a("UvrK"),a("Xjd4"),a("bqnK"),e.exports=a("FeBl").Map},"7Pkx":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("mvHQ"),i=a.n(l),n=a("ifoU"),r=a.n(n),s=a("Dd8w"),o=a.n(s),m=a("vzON"),c=a("Obyv"),u=a("NYxO"),p=a("0xDb"),h=a("zL8q"),f={name:"datamonitor",components:{Auth:m.a,ItemChart:c.a},data:function(){return{formInline:{type:"",items:"author_c_level",date:[],charts:[]},typeList:[{label:"千次点击",value:"thd_click"},{label:"千次互动",value:"thd_act"},{label:"人均刷新",value:"average_fresh_times"},{label:"PV",value:"pv"},{label:"UV",value:"uv"},{label:"曝光量",value:"exposure"},{label:"次日留存(热门)",value:"two_save_rate"},{label:"次日留存(首页)",value:"two_feed_save_rate"},{label:"转发量",value:"retweet"},{label:"评论量",value:"comment"},{label:"点赞量",value:"like_volume"},{label:"互动量",value:"interact_volume"}],itemsList:[{value:"recommend_source",label:"来源"},{value:"agent_version",label:"客户端版本"},{value:"system",label:"操作系统"},{value:"network_type",label:"网络环境"},{value:"hotwb_frequency_type",label:"分登录频次-热门"},{value:"all_frequency_type",label:"分登录频次-全站"},{value:"age",label:"年龄"},{value:"gender",label:"性别"},{value:"mid_type",label:"内容形式"},{value:"user_c_level",label:"C类型"},{value:"user_v_level",label:"V类型"},{value:"source",label:"领域"},{value:"wm",label:"渠道"},{value:"ispageup",label:"刷新方向"},{value:"luicode",label:"入口"},{value:"refresh",label:"刷新方式"}],pickerOptions:{disabledDate:function(e){return e.getTime()+864e5>Date.now()},shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),t.setTime(t.getTime()-864e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),t.setTime(t.getTime()-864e5),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),t.setTime(t.getTime()-864e5),e.$emit("pick",[a,t])}}]},itemMap:null,chartItem:null,chartEntire:null}},computed:o()({},Object(u.b)(["email","pageAuth","analyDropList","analyData"])),methods:{init:function(){var e=Object(p.e)(Date.now()-2592e6,"{y}{m}{d}"),t=Object(p.e)(Date.now()-864e5,"{y}{m}{d}");this.formInline.date=[e,t],this.formInline.type=this.$route.query.type||"thd_click",this.formInline.items=this.$route.query.items||"recommend_source",this.itemMap=new r.a([["recommend_source","来源"],["agent_version","客户端版本"],["system","操作系统"],["network_type","网络环境"],["hotwb_frequency_type","分登录频次-热门"],["all_frequency_type","分登录频次-全站"],["age","年龄"],["gender","性别"],["mid_type","内容形式"],["user_c_level","C类型"],["user_v_level","V类型"],["source","领域"],["wm","渠道"],["ispageup","刷新方向"],["luicode","入口"],["refresh","刷新方式"]]),1===this.pageAuth&&this.getDropList()},onSearch:function(){var e=this.formInline.charts.join(",");if(e){var t={url:"http://172.16.105.67:8091/newtest1011/getKpiLine.html",param:{dt_start:this.formInline.date[0],dt_end:this.formInline.date[1],type:this.formInline.type,items:this.formInline.items,items_name:e}},a={data:i()(t),cip:230};this.$store.dispatch("GetAnalyData",a)}else Object(h.Message)({showClose:!0,message:"请选择数据分析列表项！",type:"error",duration:1e3})},getDropList:function(){var e={url:"http://172.16.105.67:8091/newtest1011/getKpiWeiduName.html",param:{dt_start:this.formInline.date[0],dt_end:this.formInline.date[1],items:this.formInline.items}},t={data:i()(e),cip:230};this.$store.dispatch("GetAnalyDrop",t)},setAnalyData:function(e,t){for(var a=e.series,l=[],i=0;i<a.length;i++)l.push({name:a[i].name,type:"line",data:a[i].data,smooth:!0});return{title:t,width:"100%",height:"400px",legendName:e.legendName,xAxis:[{type:"category",data:e.xAxis.data,name:e.xAxis.name,axisLabel:{rotate:0},axisLine:{symbol:["none","arrow"]},splitLine:{show:!0},axisTick:{show:!1}}],yAxis:[{type:"value",name:"",axisLine:{symbol:["none","arrow"]},axisTick:{show:!1}}],series:l}}},created:function(){this.init()},watch:{email:function(){},pageAuth:function(){this.init()},analyDropList:function(){this.formInline.charts=[],this.analyDropList[0]&&this.formInline.charts.push(this.analyDropList[0].value),this.onSearch()},analyData:function(){this.analyData&&(this.chartItem=this.setAnalyData(this.analyData.item,this.itemMap.get(this.formInline.items)+"-"+this.analyData.item.yAxis.name),this.chartEntire=this.setAnalyData(this.analyData.entire,"整体-"+this.analyData.entire.yAxis.name))}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-printer",staticStyle:{"margin-right":"6px"}}),e._v("热门流数据分析")])]),e._v(" "),a("el-row",[a("el-form",{attrs:{inline:"",model:e.formInline,size:"small"}},[a("el-form-item",{attrs:{label:"时间"}},[a("el-date-picker",{staticStyle:{width:"290px"},attrs:{align:"center","unlink-panels":"",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy年MM月dd日","value-format":"yyyyMMdd","picker-options":e.pickerOptions},on:{change:function(t){e.getDropList()}},model:{value:e.formInline.date,callback:function(t){e.$set(e.formInline,"date",t)},expression:"formInline.date"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"维度选择"}},[a("el-select",{staticStyle:{width:"140px"},attrs:{placeholder:"请选择查询维度"},model:{value:e.formInline.type,callback:function(t){e.$set(e.formInline,"type",t)},expression:"formInline.type"}},e._l(e.typeList,function(e,t){return a("el-option",{key:t,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"分析项"}},[a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择"},on:{change:function(t){e.getDropList()}},model:{value:e.formInline.items,callback:function(t){e.$set(e.formInline,"items",t)},expression:"formInline.items"}},e._l(e.itemsList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",[a("el-select",{attrs:{multiple:"",filterable:"",placeholder:"请选择，支持搜索"},model:{value:e.formInline.charts,callback:function(t){e.$set(e.formInline,"charts",t)},expression:"formInline.charts"}},e._l(e.analyDropList,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSearch}},[e._v("查询")])],1)],1)],1),e._v(" "),a("el-row",{staticClass:"chartWrap"},[a("el-col",{staticStyle:{"margin-right":"5px","margin-bottom":"10px"},attrs:{xs:24,sm:11,md:11,lg:11,xl:11}},[a("item-chart",{attrs:{data:e.chartEntire}})],1),e._v(" "),a("el-col",{attrs:{xs:24,sm:12,md:12,lg:12,xl:12}},[a("item-chart",{attrs:{data:e.chartItem}})],1)],1)],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var d=a("VU/8")(f,v,!1,function(e){a("9ojY")},"data-v-df28ac68",null);t.default=d.exports},"9ojY":function(e,t){},UvrK:function(e,t,a){var l=a("kM2E");l(l.P+l.R,"Map",{toJSON:a("m9gC")("Map")})},Xjd4:function(e,t,a){a("9Bbf")("Map")},bqnK:function(e,t,a){a("HpRW")("Map")},ifoU:function(e,t,a){e.exports={default:a("3C/1"),__esModule:!0}},qCoq:function(e,t,a){"use strict";var l=a("9C8M"),i=a("LIJb");e.exports=a("qo66")("Map",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{get:function(e){var t=l.getEntry(i(this,"Map"),e);return t&&t.v},set:function(e,t){return l.def(i(this,"Map"),0===e?0:e,t)}},l,!0)}});