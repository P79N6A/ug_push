webpackJsonp([76],{WvR7:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("mvHQ"),i=a.n(n),s=a("Dd8w"),r=a.n(s),o=a("vzON"),l=a("Obyv"),m=a("NYxO"),d=a("0xDb"),c=a("zL8q"),h={name:"datamonitor",components:{Auth:o.a,ItemChart:l.a},data:function(){return{analyData:null,formInline:{type:"read_duration",items:"real_read_data",date:[],dt_start:"",dt_end:""},chartItem:[],chartEntire:null}},computed:r()({},Object(m.b)(["email","pageAuth"])),methods:{init:function(){this.formInline.dt_start=Object(d.e)(Date.now()-2592e6,"{y}{m}{d}"),this.formInline.dt_end=Object(d.e)(Date.now()-864e5,"{y}{m}{d}"),1===this.pageAuth&&this.onSearch()},onSearch:function(){this.formInline.dt_start?this.formInline.dt_end?this.getKpiLine():Object(c.Message)({showClose:!0,message:"请选择结束时间！",type:"error",duration:3e3}):Object(c.Message)({showClose:!0,message:"请选择开始时间！",type:"error",duration:3e3})},getKpiLine:function(){var t=this,e={url:"http://172.16.105.67:8091/newtest1011/getKpiLine.html",param:{dt_start:this.formInline.dt_start,dt_end:this.formInline.dt_end,type:this.formInline.type,items:this.formInline.items}},a={data:i()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?t.analyData=e.data:Object(c.Message)({showClose:!0,message:e.msg||"数据获取失败",type:"error",duration:0})},function(t){Object(c.Message)({showClose:!0,message:"数据接口请求失败",type:"error",duration:0})})},setAnalyData:function(t,e){for(var a=t.series,n=[],i=0;i<a.length;i++)n.push({name:a[i].name,type:"line",data:a[i].data,smooth:!0});return{title:e,width:"100%",height:"400px",legendName:t.legendName,xAxis:[{type:"category",data:t.xAxis.data,name:t.xAxis.name,axisLabel:{rotate:0},axisLine:{symbol:["none","arrow"]},splitLine:{show:!0},axisTick:{show:!1}}],yAxis:[{type:"value",name:"",axisLine:{symbol:["none","arrow"]},axisTick:{show:!1}}],series:n}}},created:function(){this.init()},watch:{email:function(){},pageAuth:function(){this.init()},analyData:function(){var t=this;this.analyData&&(this.chartItem=this.analyData.item.legendName.map(function(e,a){return t.setAnalyData({legendName:[e],series:[t.analyData.item.series[a]],xAxis:t.analyData.item.xAxis,yAxis:t.analyData.item.yAxis},"真实阅读时长-"+e)}),this.chartEntire=this.setAnalyData(this.analyData.entire,"真实阅读时长-整体"))}}},y={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return 1===t.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-printer",staticStyle:{"margin-right":"6px"}}),t._v("热门流-数据分析-真实阅读时长")])]),t._v(" "),a("el-row",{staticClass:"search-form-wrap"},[a("el-form",{attrs:{inline:"",model:t.formInline,size:"small"}},[a("el-form-item",{attrs:{label:"时间段"}},[a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择开始时间"},model:{value:t.formInline.dt_start,callback:function(e){t.$set(t.formInline,"dt_start",e)},expression:"formInline.dt_start"}}),t._v(" "),a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择结束时间"},model:{value:t.formInline.dt_end,callback:function(e){t.$set(t.formInline,"dt_end",e)},expression:"formInline.dt_end"}})],1)],1)],1),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("el-col",[t.chartItem?a("el-row",{staticClass:"chartWrap"},[a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:24}},[a("item-chart",{attrs:{data:t.chartEntire}})],1),t._v(" "),t._l(t.chartItem,function(t,e){return a("el-col",{key:e,staticStyle:{"margin-bottom":"10px"},attrs:{xs:24,span:12}},[a("item-chart",{attrs:{data:t}})],1)})],2):t._e()],1)],1)],1):0===t.pageAuth?a("el-main",[a("auth")],1):t._e()},staticRenderFns:[]};var p=a("VU/8")(h,y,!1,function(t){a("yzIp")},"data-v-66a14580",null);e.default=p.exports},yzIp:function(t,e){}});