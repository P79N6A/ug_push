webpackJsonp([91],{Th8V:function(t,e){},qoSe:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("mvHQ"),r=a.n(o),n=a("Dd8w"),s=a.n(n),i=a("vzON"),l=a("Obyv"),d=a("NYxO"),c=a("0xDb"),u=a("zL8q"),p={name:"materialPage",components:{Auth:i.a,ItemChart:l.a},data:function(){return{downloadReadLoading:!1,downloadNewReadLoading:!1,pickerOptions:{disabledDate:function(t){return t.getTime()+864e5>Date.now()},shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.setTime(e.getTime()-864e5),t.$emit("pick",[a,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.setTime(e.getTime()-864e5),t.$emit("pick",[a,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.setTime(e.getTime()-864e5),t.$emit("pick",[a,e])}}]},formInline:{status:"expose_author_num",item_names:"entire"},formInlineDate:{date:[]},formField:{date:[]},formSection:{date:[]},formType:{date:[]},formAuthorAreaCount:{date:[]},formAuthorExpoW:{date:[]},formAuthorType:{date:[]},formWeiboRead:{date:[]},formNewWeiboRead:{date:[]},chartData:null,itemsList:null,fieldDataList:[],sectionDataList:[],typeDataList:[],authorAreaCount:[],authorExpoW:[],authorType:[],weiboRead:[],newWeiboRead:[]}},computed:s()({},Object(d.b)(["pageAuth"])),methods:{init:function(){if(1===this.pageAuth){var t=Object(c.e)(Date.now()-6048e5,"{y}{m}{d}"),e=Object(c.e)(Date.now()-864e5,"{y}{m}{d}");this.formInlineDate.date=[t,e],this.formField.date=[t,e],this.formSection.date=[t,e],this.formType.date=[t,e],this.formAuthorAreaCount.date=[t,e],this.formAuthorExpoW.date=[t,e],this.formAuthorType.date=[t,e],this.formWeiboRead.date=[t,e],this.formNewWeiboRead.date=[t,e],this.onSearch(),this.getFieldData(),this.getSectionData(),this.getTypeData(),this.getAuthorAreaCountData(),this.getAuthorExpoWData(),this.getAuthorTypeData(),this.getWeiboReadData(),this.getNewWeiboReadData()}},onSearch:function(){var t=this,e={url:"http://172.16.105.67:8091/newtest1011/getHotwbMidExposeLine.html",param:s()({},this.formInline,{dt_start:this.formInlineDate.date[0],dt_end:this.formInlineDate.date[1]})},a={data:r()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?t.chartData=t.setAnalyData(e.data,"趋势分析"):Object(u.Message)({showClose:!0,message:"曝光趋势分析图数据获取失败",type:"error",duration:1e3})},function(t){Object(u.Message)({showClose:!0,message:"曝光趋势分析图数据接口请求失败",type:"error",duration:1e3})})},setAnalyData:function(t,e){for(var a=t.series,o=[],r=0;r<a.length;r++)o.push({name:a[r].name,type:"line",data:a[r].data,smooth:!0});return{title:e,width:"100%",height:"400px",legendName:t.legendName,xAxis:[{type:"category",data:t.xAxis.data,name:t.xAxis.name,axisLabel:{rotate:0},axisLine:{symbol:["none","arrow"]},splitLine:{show:!0},axisTick:{show:!1}}],yAxis:[{type:"value",name:t.yAxis.name,axisLine:{symbol:["none","arrow"]},axisTick:{show:!1}}],series:o}},getFieldData:function(){var t=this,e={url:"http://172.16.105.67:8091/newtest1011/getExposureCountByCategory.html",param:{dt_start:this.formField.date[0],dt_end:this.formField.date[1]}},a={data:r()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?t.fieldDataList=e.data||[]:Object(u.Message)({showClose:!0,message:"曝光博文领域分布数据获取失败",type:"error",duration:1e3})},function(t){Object(u.Message)({showClose:!0,message:"曝光博文领域分布数据接口请求失败",type:"error",duration:1e3})})},getSectionData:function(){var t=this,e={url:"http://172.16.105.67:8091/newtest1011/getExposureCountByExposure.html",param:{dt_start:this.formSection.date[0],dt_end:this.formSection.date[1]}},a={data:r()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?t.sectionDataList=e.data||[]:Object(u.Message)({showClose:!0,message:"曝光博文曝光量区间分布数据获取失败",type:"error",duration:1e3})},function(t){Object(u.Message)({showClose:!0,message:"曝光博文曝光量区间分布数据接口请求失败",type:"error",duration:1e3})})},getTypeData:function(){var t=this,e={url:"http://172.16.105.67:8091/newtest1011/getExposureCountByContentType.html",param:{dt_start:this.formType.date[0],dt_end:this.formType.date[1]}},a={data:r()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?t.typeDataList=e.data||[]:Object(u.Message)({showClose:!0,message:"曝光博文内容形式分布数据获取失败",type:"error",duration:1e3})},function(t){Object(u.Message)({showClose:!0,message:"曝光博文内容形式分布数据接口请求失败",type:"error",duration:1e3})})},getAuthorAreaCountData:function(){var t=this,e={url:"http://172.16.105.67:8091/newtest1011/getAuthorAreaCount.html",param:{dt_start:this.formAuthorAreaCount.date[0],dt_end:this.formAuthorAreaCount.date[1]}},a={data:r()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?t.authorAreaCount=e.data||[]:Object(u.Message)({showClose:!0,message:"各个标签的博主数量统计数据获取失败",type:"error",duration:1e3})},function(t){Object(u.Message)({showClose:!0,message:"各个标签的博主数量统计数据接口请求失败",type:"error",duration:1e3})})},getAuthorExpoWData:function(){var t=this,e={url:"http://172.16.105.67:8091/newtest1011/getAuthorExpoW.html",param:{dt_start:this.formAuthorExpoW.date[0],dt_end:this.formAuthorExpoW.date[1]}},a={data:r()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?t.authorExpoW=e.data||[]:Object(u.Message)({showClose:!0,message:"各个曝光数区间的博主数量统计数据获取失败",type:"error",duration:1e3})},function(t){Object(u.Message)({showClose:!0,message:"各个曝光数区间的博主数量统计数据接口请求失败",type:"error",duration:1e3})})},getAuthorTypeData:function(){var t=this,e={url:"http://172.16.105.67:8091/newtest1011/getAuthorType.html",param:{dt_start:this.formAuthorType.date[0],dt_end:this.formAuthorType.date[1]}},a={data:r()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?t.authorType=e.data||[]:Object(u.Message)({showClose:!0,message:"各个博主类型的博主数量统计数据获取失败",type:"error",duration:1e3})},function(t){Object(u.Message)({showClose:!0,message:"各个博主类型的博主数量统计数据接口请求失败",type:"error",duration:1e3})})},getWeiboReadData:function(){var t=this,e={url:"http://172.16.105.67:8091/newtest1011/getTagMonitorData.html",param:{dt_start:this.formWeiboRead.date[0],dt_end:this.formWeiboRead.date[1]}},a={data:r()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?t.weiboRead=e.data||[]:Object(u.Message)({showClose:!0,message:"分领域的微博点击阅读情况数据获取失败",type:"error",duration:3e3})},function(t){Object(u.Message)({showClose:!0,message:"分领域的微博点击阅读情况数据接口请求失败",type:"error",duration:3e3})})},getNewWeiboReadData:function(){var t=this,e={url:"http://172.16.105.67:8091/newtest1011/getNewTagMonitorData.html",param:{dt_start:this.formNewWeiboRead.date[0],dt_end:this.formNewWeiboRead.date[1]}},a={data:r()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?t.newWeiboRead=e.data||[]:Object(u.Message)({showClose:!0,message:"分领域（新体系）的微博点击阅读情况数据获取失败",type:"error",duration:3e3})},function(t){Object(u.Message)({showClose:!0,message:"分领域（新体系）的微博点击阅读情况接口请求失败",type:"error",duration:3e3})})},_formatNum:function(t){return Object(c.b)(t)},handleDownloadRead:function(){var t=this;this.downloadReadLoading=!0,a.e(111).then(a.bind(null,"zWO4")).then(function(e){var a=t.weiboRead,o=t.formatJson(["index","tag","thd_click","thd_act","avg_duration","exposure","count_mid"],a);e.export_json_to_excel(["序号","领域","千曝点击","千曝互动","平均时长","曝光量","曝光微博数量"],o,"分领域的微博点击阅读情况"),t.downloadReadLoading=!1})},handleDownloadNewRead:function(){var t=this;this.downloadNewReadLoading=!0,a.e(111).then(a.bind(null,"zWO4")).then(function(e){var a=t.newWeiboRead,o=t.formatJson(["index","tag","thd_click","thd_act","avg_duration","exposure","count_mid"],a);e.export_json_to_excel(["序号","领域","千曝点击","千曝互动","平均时长","曝光量","曝光微博数量"],o,"分领域（新体系）的微博点击阅读情况"),t.downloadNewReadLoading=!1})},formatJson:function(t,e){return e.map(function(e,a){return t.map(function(t){return"index"===t?a+1:e[t]})})}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},m={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return 1===t.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-printer hidden-xs-only",staticStyle:{"margin-right":"6px"}}),t._v("曝光常规检测")])]),t._v(" "),t.chartData?a("el-row",{staticClass:"content-box-wrap"},[a("el-col",[a("el-row",{staticStyle:{"margin-bottom":"5px"}},[a("el-radio-group",{staticClass:"left",attrs:{size:"mini"},on:{change:t.onSearch},model:{value:t.formInline.status,callback:function(e){t.$set(t.formInline,"status",e)},expression:"formInline.status"}},[a("el-radio",{attrs:{label:"expose_author_num",border:""}},[t._v("曝光作者数量")]),t._v(" "),a("el-radio",{attrs:{label:"expose_mid_num",border:""}},[t._v("曝光微博数量")])],1),t._v(" "),a("el-date-picker",{staticClass:"left",staticStyle:{width:"290px","margin-left":"20px"},attrs:{align:"center","unlink-panels":"",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy年MM月dd日","value-format":"yyyyMMdd","picker-options":t.pickerOptions,clearable:!1,size:"mini"},on:{change:function(e){t.onSearch()}},model:{value:t.formInlineDate.date,callback:function(e){t.$set(t.formInlineDate,"date",e)},expression:"formInlineDate.date"}})],1),t._v(" "),a("el-row",[a("el-col",{staticStyle:{"margin-right":"5px"},attrs:{span:24}},[a("item-chart",{attrs:{data:t.chartData}})],1)],1)],1)],1):t._e(),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("div",{staticClass:"table-title left"},[t._v("曝光博文领域分布")]),t._v(" "),a("el-date-picker",{staticClass:"left",staticStyle:{width:"290px"},attrs:{align:"center","unlink-panels":"",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy年MM月dd日","value-format":"yyyyMMdd","picker-options":t.pickerOptions,clearable:!1,size:"mini"},on:{change:function(e){t.getFieldData()}},model:{value:t.formField.date,callback:function(e){t.$set(t.formField,"date",e)},expression:"formField.date"}}),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.fieldDataList,border:"",stripe:"","max-height":"500",size:"mini"}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"50"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name",label:"领域"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"ex_num",sortable:"",label:"曝光总数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.ex_num)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"mid_num",sortable:"",label:"曝光微博个数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.mid_num)))])]}}])})],1)],1),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("div",{staticClass:"table-title left"},[t._v("曝光博文曝光量区间分布")]),t._v(" "),a("el-date-picker",{staticClass:"left",staticStyle:{width:"290px"},attrs:{align:"center","unlink-panels":"",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy年MM月dd日","value-format":"yyyyMMdd","picker-options":t.pickerOptions,clearable:!1,size:"mini"},on:{change:function(e){t.getSectionData()}},model:{value:t.formSection.date,callback:function(e){t.$set(t.formSection,"date",e)},expression:"formSection.date"}}),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.sectionDataList,"default-sort":{prop:"flag",order:"descending"},border:"",stripe:"",size:"mini"}},[a("el-table-column",{attrs:{type:"index",width:"50",label:"序号",align:"center",fixed:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"flag",label:"曝光量区间",sortable:""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"ex_num",sortable:"",label:"曝光总数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.ex_num)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"mid_num",sortable:"",label:"曝光微博个数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.mid_num)))])]}}])})],1)],1),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("div",{staticClass:"table-title left"},[t._v("曝光博文内容形式分布")]),t._v(" "),a("el-date-picker",{staticClass:"left",staticStyle:{width:"290px"},attrs:{align:"center","unlink-panels":"",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy年MM月dd日","value-format":"yyyyMMdd","picker-options":t.pickerOptions,clearable:!1,size:"mini"},on:{change:function(e){t.getTypeData()}},model:{value:t.formType.date,callback:function(e){t.$set(t.formType,"date",e)},expression:"formType.date"}}),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.typeDataList,border:"",stripe:"",size:"mini"}},[a("el-table-column",{attrs:{prop:"name",label:"内容形式"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"ex_num",sortable:"",label:"曝光总数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.ex_num)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"mid_num",sortable:"",label:"曝光微博个数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.mid_num)))])]}}])})],1)],1),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("div",{staticClass:"table-title left"},[t._v("各个标签的博主数量统计")]),t._v(" "),a("el-date-picker",{staticClass:"left",staticStyle:{width:"290px"},attrs:{align:"center","unlink-panels":"",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy年MM月dd日","value-format":"yyyyMMdd","picker-options":t.pickerOptions,clearable:!1,size:"mini"},on:{change:function(e){t.getAuthorAreaCountData()}},model:{value:t.formAuthorAreaCount.date,callback:function(e){t.$set(t.formAuthorAreaCount,"date",e)},expression:"formAuthorAreaCount.date"}}),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.authorAreaCount,border:"",stripe:"","max-height":"500",size:"mini"}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tag_category_name",label:"标签"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.tag_category_name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"count",sortable:"",label:"博主个数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.count)))])]}}])})],1)],1),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("div",{staticClass:"table-title left"},[t._v("各个曝光数区间的博主数量统计")]),t._v(" "),a("el-date-picker",{staticClass:"left",staticStyle:{width:"290px"},attrs:{align:"center","unlink-panels":"",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy年MM月dd日","value-format":"yyyyMMdd","picker-options":t.pickerOptions,clearable:!1,size:"mini"},on:{change:function(e){t.getAuthorExpoWData()}},model:{value:t.formAuthorExpoW.date,callback:function(e){t.$set(t.formAuthorExpoW,"date",e)},expression:"formAuthorExpoW.date"}}),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.authorExpoW,border:"",stripe:"",size:"mini"}},[a("el-table-column",{attrs:{prop:"bucket",label:"区间"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.bucket))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"count",sortable:"",label:"博主个数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.count)))])]}}])})],1)],1),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("div",{staticClass:"table-title left"},[t._v("各个博主类型的博主数量统计")]),t._v(" "),a("el-date-picker",{staticClass:"left",staticStyle:{width:"290px"},attrs:{align:"center","unlink-panels":"",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy年MM月dd日","value-format":"yyyyMMdd","picker-options":t.pickerOptions,clearable:!1,size:"mini"},on:{change:function(e){t.getAuthorTypeData()}},model:{value:t.formAuthorType.date,callback:function(e){t.$set(t.formAuthorType,"date",e)},expression:"formAuthorType.date"}}),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.authorType,border:"",stripe:"","max-height":"500",size:"mini"}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"author_type",label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.author_type))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"count",sortable:"",label:"博主个数"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.count)))])]}}])})],1)],1),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("div",{staticClass:"table-title left"},[t._v("分领域的微博点击阅读情况")]),t._v(" "),a("el-date-picker",{staticClass:"left",staticStyle:{width:"290px"},attrs:{align:"center","unlink-panels":"",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy年MM月dd日","value-format":"yyyyMMdd","picker-options":t.pickerOptions,clearable:!1,size:"mini"},on:{change:function(e){t.getWeiboReadData()}},model:{value:t.formWeiboRead.date,callback:function(e){t.$set(t.formWeiboRead,"date",e)},expression:"formWeiboRead.date"}}),t._v(" "),a("el-button",{staticClass:"right",attrs:{type:"primary",size:"mini",loading:t.downloadReadLoading},on:{click:t.handleDownloadRead}},[t._v("导出")]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.weiboRead,border:"",stripe:"","max-height":"500",size:"mini"}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tag",label:"领域"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.tag))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"thd_click",sortable:"",label:"千曝点击"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.thd_click)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"thd_act",sortable:"",label:"千曝互动"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.thd_act)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"avg_duration",sortable:"",label:"平均时长"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.avg_duration)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"exposure",sortable:"",label:"曝光量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.exposure)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"count_mid",sortable:"",label:"曝光微博数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.count_mid)))])]}}])})],1)],1),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("div",{staticClass:"table-title left"},[t._v("分领域（新体系）的微博点击阅读情况")]),t._v(" "),a("el-date-picker",{staticClass:"left",staticStyle:{width:"290px"},attrs:{align:"center","unlink-panels":"",type:"daterange","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期",format:"yyyy年MM月dd日","value-format":"yyyyMMdd","picker-options":t.pickerOptions,clearable:!1,size:"mini"},on:{change:function(e){t.getNewWeiboReadData()}},model:{value:t.formNewWeiboRead.date,callback:function(e){t.$set(t.formNewWeiboRead,"date",e)},expression:"formNewWeiboRead.date"}}),t._v(" "),a("el-button",{staticClass:"right",attrs:{type:"primary",size:"mini",loading:t.downloadNewReadLoading},on:{click:t.handleDownloadNewRead}},[t._v("导出")]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.newWeiboRead,border:"",stripe:"","max-height":"500",size:"mini"}},[a("el-table-column",{attrs:{type:"index",label:"序号",align:"center",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"tag",label:"领域"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.tag))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"thd_click",sortable:"",label:"千曝点击"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.thd_click)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"thd_act",sortable:"",label:"千曝互动"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.thd_act)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"avg_duration",sortable:"",label:"平均时长"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.avg_duration)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"exposure",sortable:"",label:"曝光量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.exposure)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"count_mid",sortable:"",label:"曝光微博数量"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._formatNum(e.row.count_mid)))])]}}])})],1)],1)],1):0===t.pageAuth?a("el-main",[a("auth")],1):t._e()},staticRenderFns:[]};var f=a("VU/8")(p,m,!1,function(t){a("Th8V")},"data-v-2600db21",null);e.default=f.exports}});