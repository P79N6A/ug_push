webpackJsonp([87],{pTT9:function(e,t){},"s/BH":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Dd8w"),r=a.n(n),i=a("mvHQ"),o=a.n(i),s=a("vzON"),l=a("NYxO"),c=(a("0xDb"),a("bzuE"),a("zL8q")),m=a("Obyv"),d={components:{Auth:s.a,ItemChart:m.a},data:function(){return{formInline:{view:"diff",metric:"txt_ctr",from_dt:"",to_dt:""},viewMap:{diff:"对比趋势",offline:"离线趋势",online:"在线趋势"},metricMap:{show:"曝光",pic_ctr:"图片点击率",adur:"视频总时长",pdur:"视频播放时长",txt_ctr:"正文页点击率",lng_ctr:"长文点击率",flw_ctr:"关注率",ret_itr:"转发率",cmt_itr:"评论率",lik_itr:"点赞率",dur:"列表页平均时长",ddur:"详情页平均时长",playcnt:"有效播放次数",readcnt:"有效阅读次数"},chartData:null}},methods:{onSearch:function(){var e=this;if(this.formInline.from_dt&&this.formInline.to_dt){var t={url:"http://10.77.29.69:8099/ucf",param:this.formInline},a={data:o()(t),cip:230};this.$store.dispatch("ProxyGet",a).then(function(t){if(t.code&&200==t.code){Object(c.Message)({showClose:!0,message:"success",type:"success",duration:1e3});var a=t.data.title||t.data.yAxis.name;e.chartData=e.setAnalyData(t.data,a)}else e.chartData=null,Object(c.Message)({showClose:!0,message:t.msg||"计数正确性监控页面数据获取失败！",type:"error",duration:3e3})},function(e){Object(c.Message)({showClose:!0,message:"计数正确性监控页面接口请求失败！",type:"error",duration:3e3})})}},setAnalyData:function(e,t){for(var a=e.series,n=[],r=0;r<a.length;r++)n.push({name:a[r].name,type:a[r].type||e.type||"line",data:a[r].data,smooth:!0});return{title:t,width:"100%",height:"400px",legendName:e.legendName,xAxis:[{type:"category",data:e.xAxis.data,name:e.xAxis.name,axisLabel:{rotate:0},axisLine:{symbol:["none","arrow"]},splitLine:{show:!0},axisTick:{show:!1}}],yAxis:[{type:"value",name:e.yAxis.name,axisLine:{symbol:["none","arrow"]},axisTick:{show:!1}}],series:n}}},computed:r()({},Object(l.b)(["pageAuth"])),watch:{pageAuth:function(){}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[e._v("计数正确性监控页面")])]),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[a("el-form",{attrs:{model:e.formInline,size:"small"}},[a("el-form-item",[a("el-radio-group",{on:{change:e.onSearch},model:{value:e.formInline.metric,callback:function(t){e.$set(e.formInline,"metric",t)},expression:"formInline.metric"}},e._l(e.metricMap,function(t,n){return a("el-radio",{key:n,staticStyle:{"margin-left":"0","margin-right":"5px","margin-bottom":"5px"},attrs:{border:"",label:n}},[e._v(e._s(t))])}))],1),e._v(" "),a("el-form-item",[a("el-date-picker",{staticStyle:{width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择开始时间"},on:{change:e.onSearch},model:{value:e.formInline.from_dt,callback:function(t){e.$set(e.formInline,"from_dt",t)},expression:"formInline.from_dt"}}),e._v(" "),a("el-date-picker",{staticStyle:{width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择结束时间"},on:{change:e.onSearch},model:{value:e.formInline.to_dt,callback:function(t){e.$set(e.formInline,"to_dt",t)},expression:"formInline.to_dt"}})],1),e._v(" "),a("el-form-item",[a("el-radio-group",{on:{change:e.onSearch},model:{value:e.formInline.view,callback:function(t){e.$set(e.formInline,"view",t)},expression:"formInline.view"}},e._l(e.viewMap,function(t,n){return a("el-radio-button",{key:n,staticStyle:{"margin-left":"0"},attrs:{label:n}},[e._v(e._s(t))])}))],1)],1)],1),e._v(" "),e.chartData?a("el-row",{staticClass:"content-box-wrap"},[a("el-col",{attrs:{span:24}},[a("item-chart",{attrs:{data:e.chartData}})],1)],1):a("p",{staticClass:"none-tips"},[e._v("暂无数据")])],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var p=a("VU/8")(d,f,!1,function(e){a("pTT9")},"data-v-395398a5",null);t.default=p.exports}});