webpackJsonp([80],{"4TQF":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("mvHQ"),n=a.n(l),i=a("Dd8w"),r=a.n(i),o=a("vzON"),s=a("Obyv"),c=a("NYxO"),d=a("0xDb"),m=a("zL8q"),p={name:"ratePage",components:{Auth:o.a,ItemChart:s.a},data:function(){return{formInline:{dtype:"data_normal",pltfm:"wap",read:"read",value:"expo",view:"hd",start:"",to:""},chartData:null,dtypeList:{data_normal:"正常",data_dupexpo:"重复曝光",data_nomidinfo:"无MID",data_error:"日志错误",data_others:"其他",data_all:"全部"},pltfmList:{wap:"客户端",pc:"PC端",null:"未知",all:"全部"},readList:{read:"读过",noread:"未读过"},valueList:{expo:"曝光量",click:"点击率",inter:"互动率",duration:"平均时长",click_pic:"图片点击率",click_vid:"视频点击率",click_text:"正文点击率",click_lngtxt:"长文点击率",ret:"转",cmt:"评",like:"赞",follow:"关注",list_duration:"列表页时长",detail_duration:"详情页时长",dark_duration:"黑灯流时长"},viewList:{hh:"HH趋势",hd:"HD趋势",dd:"DD趋势",dh:"DH对比"}}},computed:r()({},Object(c.b)(["pageAuth"])),methods:{init:function(){1===this.pageAuth&&(this.formInline.start=Object(d.e)(Date.now()-2592e6,"{y}{m}{d}{h}"),this.formInline.to=Object(d.e)(Date.now(),"{y}{m}{d}{h}"),this.onSearch())},onSearch:function(){var e=this,t={url:"http://172.16.139.44:8090/",param:this.formInline},a={data:n()(t),cip:230};this.$store.dispatch("GetBaseAnaly",a).then(function(t){t.code&&200==Number(t.code)?(Object(m.Message)({showClose:!0,message:"success",type:"success",duration:1e3}),e.chartData=e.setAnalyData(t.data,t.data.yAxis.name)):(e.chartData=null,Object(m.Message)({showClose:!0,message:t.msg||"数据请求失败！",type:"error",duration:3e3}))})},setAnalyData:function(e,t){for(var a=e.series,l=[],n=0;n<a.length;n++)l.push({name:a[n].name,type:a[n].type||"line",data:a[n].data,smooth:!0});return{title:t,width:"100%",height:"400px",legendName:e.legendName,xAxis:[{type:"category",data:e.xAxis.data,name:e.xAxis.name,axisLabel:{rotate:0},axisLine:{symbol:["none","arrow"]},splitLine:{show:!0},axisTick:{show:!1}}],yAxis:[{type:"value",name:e.yAxis.name,axisLine:{symbol:["none","arrow"]},axisTick:{show:!1}}],series:l}}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-date hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("样本数据统计")])]),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[a("el-form",{attrs:{inline:"",model:e.formInline,size:"small"}},[a("el-form-item",{attrs:{label:"数据类型"}},[a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"请选择数据类型"},on:{change:e.onSearch},model:{value:e.formInline.dtype,callback:function(t){e.$set(e.formInline,"dtype",t)},expression:"formInline.dtype"}},e._l(e.dtypeList,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"平台类型"}},[a("el-select",{staticStyle:{width:"90px"},attrs:{placeholder:"请选泽平台类型"},on:{change:e.onSearch},model:{value:e.formInline.pltfm,callback:function(t){e.$set(e.formInline,"pltfm",t)},expression:"formInline.pltfm"}},e._l(e.pltfmList,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"阅读类型"}},[a("el-select",{staticStyle:{width:"90px"},attrs:{placeholder:"请选泽阅读类型"},on:{change:e.onSearch},model:{value:e.formInline.read,callback:function(t){e.$set(e.formInline,"read",t)},expression:"formInline.read"}},e._l(e.readList,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"数据项"}},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选泽数据项",filterable:""},on:{change:e.onSearch},model:{value:e.formInline.value,callback:function(t){e.$set(e.formInline,"value",t)},expression:"formInline.value"}},e._l(e.valueList,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"视图类型"}},[a("el-select",{staticStyle:{width:"100px"},attrs:{placeholder:"请选泽视图类型"},on:{change:e.onSearch},model:{value:e.formInline.view,callback:function(t){e.$set(e.formInline,"view",t)},expression:"formInline.view"}},e._l(e.viewList,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",[a("el-date-picker",{staticStyle:{width:"190px"},attrs:{type:"datetime",format:"yyyy年MM月dd日HH时","value-format":"yyyyMMddHH",placeholder:"选择开始时间"},on:{change:e.onSearch},model:{value:e.formInline.start,callback:function(t){e.$set(e.formInline,"start",t)},expression:"formInline.start"}}),e._v(" "),a("el-date-picker",{staticStyle:{width:"190px"},attrs:{type:"datetime",format:"yyyy年MM月dd日HH时","value-format":"yyyyMMddHH",placeholder:"选择结束时间"},on:{change:e.onSearch},model:{value:e.formInline.to,callback:function(t){e.$set(e.formInline,"to",t)},expression:"formInline.to"}})],1)],1)],1),e._v(" "),e.chartData?a("el-row",{staticClass:"content-box-wrap",attrs:{type:"flex",justify:"space-between"}},[a("el-col",{staticStyle:{"margin-right":"5px"},attrs:{span:24}},[a("item-chart",{attrs:{data:e.chartData}})],1)],1):a("p",{staticClass:"none-tips"},[e._v("暂无数据")])],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var u=a("VU/8")(p,h,!1,function(e){a("9hTc")},"data-v-52537f85",null);t.default=u.exports},"9hTc":function(e,t){}});