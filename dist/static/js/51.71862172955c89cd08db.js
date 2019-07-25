webpackJsonp([51],{qKu5:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("mvHQ"),i=a.n(n),l=a("Dd8w"),r=a.n(l),o=a("vzON"),s=a("Obyv"),u=a("NYxO"),_=a("0xDb"),d=a("zL8q"),m={name:"sourceMaterial",components:{Auth:o.a,ItemChart:s.a},data:function(){return{formInline:{status:"daily_ruku_num",item_names:"entire",dt_start:"",dt_end:""},dt_table:"",statusMap:{daily_ruku_num:"日新增入库物料量",daily_ruku_10_num:"日新增热度大于10物料量",daily_expo_weibo:"日新增曝光物料条数",whole_ruku_num:"有效期内入库物料量",whole_ruku_10_num:"有效期内热度大于10物料量",whole_expo_weibo:"有效期内曝光物料量",whole_expo_num:"有效期内物料曝光量",daily_ruku_number_increase_rate:"日新增入库物料量对比上周同期增长率"},itemMap:{entire:"总量",hulianwang:"互联网",jiaotongfuwu:"交通服务",renwenyishu:"人文艺术",jiankangyangsheng:"健康养生",jiankangyiliao:"健康医疗",junshi:"军事",dongman:"动漫",dongwuchongwu:"动物宠物",meizhuang:"美妆",tiyu:"体育",shechipin:"奢侈品",hunqingfuwu:"婚庆服务",meitichuanbo:"媒体传播",zongjiao:"宗教",qingganliangxing:"情感两性",caijing:"财经",gaoxiaoyoumo:"搞笑幽默",sheyingpaizhao:"摄影拍照",zhengfufuwu:"政府服务",jiaoyu:"教育",lvyouchuxing:"旅游出行",shishang:"时尚",xingzuomingli:"星座命理",muyingyuer:"母婴育儿",qiche:"汽车",falv:"法律",shuma:"数码",youxi:"游戏",dianying:"电影",dianshiju:"电视剧",kexuekepu:"科学科普",zongyijiemu:"综艺节目",meinvshuaige:"美女帅哥",meishi:"美食",zhichang:"职场",shejimeixue:"设计美学",dushuzuojia:"读书作家",yundongjiangshen:"运动健身",yinyue:"音乐",jiazheng:"家政",gongyi:"公益",rihua:"日化",yulemingxing:"娱乐明星",jiazhuangjiaju:"家装家居",xiuxianyule:"休闲娱乐",fangdichan:"房地产",shishi:"时事",lishi:"历史",dianshitai:"广播电台",dianxin:"电信",shoucang:"收藏",itjishu:"IT技术",qita:"其它"},chartItem:null,usersTable:null,curTime:"",downloadLoading:!1}},computed:r()({},Object(u.b)(["email","pageAuth"])),methods:{init:function(){this.formInline.dt_start=Object(_.e)(Date.now()-6048e5,"{y}{m}{d}"),this.formInline.dt_end=Object(_.e)(Date.now()-2592e5,"{y}{m}{d}"),this.dt_table=this.formInline.dt_end,this.curTime=this.dt_table,1===this.pageAuth&&(this.getUsersTable(),this.getUsersLine())},getUsersLine:function(){var e=this;if(this.formInline.dt_start)if(this.formInline.dt_end)if(this.formInline.status){var t={url:"http://172.16.105.67:8091/newtest1011/getMaterialWhiteOriginalLine.html",param:this.formInline},a={data:i()(t),cip:230};this.$store.dispatch("ProxyGet",a).then(function(t){t.code&&200==Number(t.code)&&(e.chartItem=e.setAnalyData(t.data,t.data.yAxis.name))})}else Object(d.Message)({showClose:!0,message:"请选择分析项！",type:"error",duration:3e3});else Object(d.Message)({showClose:!0,message:"请选择结束时间！",type:"error",duration:3e3});else Object(d.Message)({showClose:!0,message:"请选择开始时间！",type:"error",duration:3e3})},getUsersTable:function(){var e=this;if(this.dt_table){var t={url:"http://172.16.105.67:8091/newtest1011/getMaterialWhiteOriginalTable.html",param:{dt:this.dt_table}},a={data:i()(t),cip:230};this.$store.dispatch("ProxyGet",a).then(function(t){e.curTime=e.dt_table,t.code&&200==Number(t.code)?e.usersTable=t.data:e.usersTable=[]},function(t){e.curTime=e.dt_table,e.usersTable=[]})}else Object(d.Message)({showClose:!0,message:"请选择数据查询日期！",type:"error",duration:3e3})},setAnalyData:function(e,t){for(var a=e.series,n=[],i=0;i<a.length;i++)n.push({name:a[i].name,type:"line",data:a[i].data,smooth:!0});return{title:t,width:"100%",height:"400px",legendName:e.legendName,xAxis:[{type:"category",data:e.xAxis.data,name:e.xAxis.name,axisLabel:{rotate:0},axisLine:{symbol:["none","arrow"]},splitLine:{show:!0},axisTick:{show:!1}}],yAxis:[{type:"value",name:"",axisLine:{symbol:["none","arrow"]},axisTick:{show:!1}}],series:n}},handleDownload:function(){var e=this;this.downloadLoading=!0,a.e(113).then(a.bind(null,"zWO4")).then(function(t){var a="白名单原创物料_"+e.curTime,n=e.usersTable,i=e.formatJson(["index","name","daily_ruku_num","daily_ruku_10_num","daily_expo_weibo","whole_ruku_num","whole_ruku_10_num","whole_expo_weibo","whole_expo_num","daily_ruku_number_increase_rate"],n);t.export_json_to_excel(["序号","领域","日新增入库物料量","日新增热度大于10物料量","日新增曝光物料条数","有效期内入库物料量","有效期内热度大于10物料量","有效期内曝光物料量","有效期内物料曝光量","日新增入库物料量对比上周同期增长率"],i,a),e.downloadLoading=!1})},formatJson:function(e,t){var a=this;return t.map(function(t,n){return e.map(function(e){return"index"===e?n+1:"daily_ruku_number_increase_rate"===e?a._parsePercent(t[e]):t[e]})})},_formatNum:function(e){return Object(_.b)(e)},_parsePercent:function(e,t){return Object(_.d)(e,t)}},created:function(){this.init()},watch:{email:function(){},pageAuth:function(){this.init()}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-printer",staticStyle:{"margin-right":"6px"}}),e._v("白名单原创物料")])]),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[a("el-form",{attrs:{inline:"",model:e.formInline,size:"mini"}},[a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择开始时间"},model:{value:e.formInline.dt_start,callback:function(t){e.$set(e.formInline,"dt_start",t)},expression:"formInline.dt_start"}}),e._v(" "),a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择结束时间"},model:{value:e.formInline.dt_end,callback:function(t){e.$set(e.formInline,"dt_end",t)},expression:"formInline.dt_end"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"领域"}},[a("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择",filterable:""},model:{value:e.formInline.item_names,callback:function(t){e.$set(e.formInline,"item_names",t)},expression:"formInline.item_names"}},e._l(e.itemMap,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"分析项"}},[a("el-select",{staticStyle:{width:"270px"},attrs:{placeholder:"请选择",filterable:""},model:{value:e.formInline.status,callback:function(t){e.$set(e.formInline,"status",t)},expression:"formInline.status"}},e._l(e.statusMap,function(e,t){return a("el-option",{key:t,attrs:{label:e,value:t}})}))],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.getUsersLine()}}},[e._v("查询")])],1)],1)],1),e._v(" "),a("el-row",{staticClass:"content-box-wrap"},[a("el-col",[a("el-row",{staticClass:"chartWrap"},[a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:24}},[a("item-chart",{attrs:{data:e.chartItem}})],1)],1),e._v(" "),e.usersTable?a("el-row",{staticClass:"table-wrap"},[a("el-col",[a("div",{staticClass:"table-title left"},[e._v(e._s(e.curTime))]),e._v(" "),a("el-date-picker",{staticClass:"left",staticStyle:{"margin-left":"10px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"yyyyMMdd",placeholder:"选择时间",size:"mini"},on:{change:function(t){e.getUsersTable()}},model:{value:e.dt_table,callback:function(t){e.dt_table=t},expression:"dt_table"}}),e._v(" "),e.usersTable.length>0?a("el-button",{staticClass:"right",attrs:{type:"primary",plain:"",size:"mini",loading:e.downloadLoading},on:{click:e.handleDownload}},[a("i",{staticClass:"el-icon-download"}),e._v(" "),a("span",{staticClass:"hidden-xs-only"},[e._v("导出")])]):e._e(),e._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.usersTable,"default-sort":{prop:"daily_ruku_num",order:"descending"},border:"",stripe:"",size:"mini"}},[a("el-table-column",{attrs:{type:"index",prop:"index",label:"序号",width:"50",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"领域（内容标签）"}}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_ruku_num",label:"日新增入库物料量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_ruku_num)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_ruku_10_num",label:"日新增热度大于10物料量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_ruku_10_num)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_expo_weibo",label:"日新增曝光物料条数",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.daily_expo_weibo)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"whole_ruku_num",label:"有效期内入库物料量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.whole_ruku_num)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"whole_ruku_10_num",label:"有效期内热度大于10物料量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.whole_ruku_10_num)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"whole_expo_weibo",label:"有效期内曝光物料量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.whole_expo_weibo)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"whole_expo_num",label:"有效期内物料曝光量",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.whole_expo_num)))]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"daily_ruku_number_increase_rate",label:"日新增入库物料量对比上周同期增长率",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-tag",[e._v(e._s(e._parsePercent(t.row.daily_ruku_number_increase_rate)))])]}}])})],1)],1)],1):e._e()],1)],1)],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var h=a("VU/8")(m,c,!1,function(e){a("sLRz")},"data-v-feded1e4",null);t.default=h.exports},sLRz:function(e,t){}});