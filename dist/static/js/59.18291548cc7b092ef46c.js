webpackJsonp([59],{"1bLX":function(e,t){},vV3x:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),s=a.n(n),r=a("Dd8w"),i=a.n(r),o=a("vzON"),l=a("Obyv"),c=a("NYxO"),d=a("0xDb"),m=a("bzuE"),h=a("zL8q"),p={name:"RetainTarget",components:{Auth:o.a,ItemChart:l.a},data:function(){return{FeatureAPI:m.a,formInline:{subclass:"retain",type:"two_save_rate",dt_start:"",dt_end:""},chartData:null,typeMap:{two_save_rate:"次日留存",three_save_rate:"三日留存",seven_save_rate:"七日留存"}}},computed:i()({},Object(c.b)(["pageAuth"])),methods:{init:function(){1===this.pageAuth&&(this.formInline.dt_start=Object(d.e)(Date.now()-12096e5,"{y}{m}{d}"),this.formInline.dt_end=Object(d.e)(Date.now()-864e5,"{y}{m}{d}"),this.onSearch())},onSearch:function(){var e=this,t={url:"http://172.16.105.67:8091/newtest1011/getUnionMonitorData.html",param:this.formInline},a={data:s()(t),cip:230};this.$store.dispatch("ProxyGet",a).then(function(t){if(t.code&&200==Number(t.code)){Object(h.Message)({showClose:!0,message:"success",type:"success",duration:1e3});var a=t.data.title||t.data.yAxis.name;e.chartData=e.setAnalyData(t.data,a)}else e.chartData=null,Object(h.Message)({showClose:!0,message:t.msg||"数据请求失败！",type:"error",duration:3e3})})},setAnalyData:function(e,t){for(var a=e.series,n=[],s=0;s<a.length;s++)n.push({name:a[s].name,type:a[s].type||e.type||"line",data:a[s].data,smooth:!0});return{title:t,width:"100%",height:"400px",legendName:e.legendName,xAxis:[{type:"category",data:e.xAxis.data,name:e.xAxis.name,axisLabel:{rotate:0},axisLine:{symbol:["none","arrow"]},splitLine:{show:!0},axisTick:{show:!1}}],yAxis:[{type:"value",name:e.yAxis.name,axisLine:{symbol:["none","arrow"]},axisTick:{show:!1}}],series:n}}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[e._v("留存类指标")])]),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[a("el-form",{attrs:{model:e.formInline,size:"small"}},[a("el-form-item",[a("el-date-picker",{staticStyle:{width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择开始时间"},on:{change:e.onSearch},model:{value:e.formInline.dt_start,callback:function(t){e.$set(e.formInline,"dt_start",t)},expression:"formInline.dt_start"}}),e._v(" "),a("el-date-picker",{staticStyle:{width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择结束时间"},on:{change:e.onSearch},model:{value:e.formInline.dt_end,callback:function(t){e.$set(e.formInline,"dt_end",t)},expression:"formInline.dt_end"}})],1),e._v(" "),a("el-form-item",[a("el-radio-group",{on:{change:e.onSearch},model:{value:e.formInline.type,callback:function(t){e.$set(e.formInline,"type",t)},expression:"formInline.type"}},e._l(e.typeMap,function(t,n){return a("el-radio-button",{key:n,staticStyle:{"margin-left":"0"},attrs:{label:n}},[e._v(e._s(t))])}))],1)],1)],1),e._v(" "),e.chartData?a("el-row",{staticClass:"content-box-wrap"},[a("el-col",{attrs:{span:24}},[a("item-chart",{attrs:{data:e.chartData}})],1)],1):a("p",{staticClass:"none-tips"},[e._v("暂无数据")])],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var y=a("VU/8")(p,u,!1,function(e){a("1bLX")},"data-v-c8125f02",null);t.default=y.exports}});