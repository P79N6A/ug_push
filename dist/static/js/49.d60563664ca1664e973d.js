webpackJsonp([49],{BQMr:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),i=a.n(n),r=a("Dd8w"),o=a.n(r),s=a("vzON"),l=a("Obyv"),c=a("NYxO"),m=a("0xDb"),d=a("bzuE"),f=a("zL8q"),u={name:"business",components:{Auth:s.a,ItemChart:l.a},data:function(){return{FeatureAPI:d.a,formInline:{view:"diff",metric:"show",from_dt:"",to_dt:""},chartData:null,metricMap:{show:"曝光量",ctr1:"4+3+1种行为内部去重求和/曝光*1000",pic_ctr:"图片点击率",vid_ctr:"视频点击率",txt_ctr:"正文页点击率",lng_ctr:"长文点击率",itr1:"3种互动行为（不去重）求和/曝光*1000",itr2:"3种互动行为整体去重求和/曝光*1000",ret_itr:"转发率",cmt_itr:"评论率",lik_itr:"赞率",dur:"列表页人均时长"},viewMap:{diff:"对比趋势",offline:"离线趋势",online:"在线趋势"}}},computed:o()({},Object(c.b)(["pageAuth"])),methods:{init:function(){1===this.pageAuth&&(this.formInline.from_dt=Object(m.e)(Date.now()-12096e5,"{y}{m}{d}"),this.formInline.to_dt=Object(m.e)(Date.now()-864e5,"{y}{m}{d}"),this.onSearch())},onSearch:function(){var e=this,t={url:d.a.getCoreBusiness,param:this.formInline},a={data:i()(t),cip:230};this.$store.dispatch("ProxyGet",a).then(function(t){if(t.code&&200==Number(t.code)){Object(f.Message)({showClose:!0,message:"success",type:"success",duration:1e3});var a=t.data.title||t.data.yAxis.name;e.chartData=e.setAnalyData(t.data,a)}else e.chartData=null,Object(f.Message)({showClose:!0,message:t.msg||"数据请求失败！",type:"error",duration:3e3})})},setAnalyData:function(e,t){for(var a=e.series,n=[],i=0;i<a.length;i++)n.push({name:a[i].name,type:a[i].type||e.type||"line",data:a[i].data,smooth:!0});return{title:t,width:"100%",height:"400px",legendName:e.legendName,xAxis:[{type:"category",data:e.xAxis.data,name:e.xAxis.name,axisLabel:{rotate:0},axisLine:{symbol:["none","arrow"]},splitLine:{show:!0},axisTick:{show:!1}}],yAxis:[{type:"value",name:e.yAxis.name,axisLine:{symbol:["none","arrow"]},axisTick:{show:!1}}],series:n}}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[e._v("核心业务指标")])]),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[a("el-form",{attrs:{model:e.formInline,size:"small"}},[a("el-form-item",[a("el-radio-group",{on:{change:e.onSearch},model:{value:e.formInline.metric,callback:function(t){e.$set(e.formInline,"metric",t)},expression:"formInline.metric"}},e._l(e.metricMap,function(t,n){return a("el-radio",{key:n,staticStyle:{"margin-left":"0","margin-right":"5px","margin-bottom":"5px"},attrs:{border:"",label:n}},[e._v(e._s(t))])}))],1),e._v(" "),a("el-form-item",[a("el-date-picker",{staticStyle:{width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择开始时间"},on:{change:e.onSearch},model:{value:e.formInline.from_dt,callback:function(t){e.$set(e.formInline,"from_dt",t)},expression:"formInline.from_dt"}}),e._v(" "),a("el-date-picker",{staticStyle:{width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择结束时间"},on:{change:e.onSearch},model:{value:e.formInline.to_dt,callback:function(t){e.$set(e.formInline,"to_dt",t)},expression:"formInline.to_dt"}})],1),e._v(" "),a("el-form-item",[a("el-radio-group",{on:{change:e.onSearch},model:{value:e.formInline.view,callback:function(t){e.$set(e.formInline,"view",t)},expression:"formInline.view"}},e._l(e.viewMap,function(t,n){return a("el-radio-button",{key:n,staticStyle:{"margin-left":"0"},attrs:{label:n}},[e._v(e._s(t))])}))],1)],1)],1),e._v(" "),e.chartData?a("el-row",{staticClass:"content-box-wrap"},[a("el-col",{attrs:{span:24}},[a("item-chart",{attrs:{data:e.chartData}})],1)],1):a("p",{staticClass:"none-tips"},[e._v("暂无数据")])],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var p=a("VU/8")(u,h,!1,function(e){a("o0bI")},"data-v-d967234e",null);t.default=p.exports},o0bI:function(e,t){}});