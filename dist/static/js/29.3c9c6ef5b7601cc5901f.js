webpackJsonp([29],{"/8la":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("fZjL"),i=a.n(l),s=a("mvHQ"),n=a.n(s),o=a("Dd8w"),r=a.n(o),c=a("NYxO"),d=a("0xDb"),p=a("zL8q"),u=a("vzON"),m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.data?a("div",[a("el-radio-group",{model:{value:e.score,callback:function(t){e.score=t},expression:"score"}},[a("el-radio",{staticStyle:{"margin-left":"5px"},attrs:{label:"1"}}),e._v(" "),"5"!==e.level?a("el-radio",{staticStyle:{"margin-left":"5px"},attrs:{label:"0"}}):e._e(),e._v(" "),"3"===e.level?a("el-radio",{staticStyle:{"margin-left":"5px"},attrs:{label:"-1"}}):e._e(),e._v(" "),"5"===e.level?a("el-radio",{staticStyle:{"margin-left":"5px"},attrs:{label:"2"}}):e._e(),e._v(" "),"5"===e.level?a("el-radio",{staticStyle:{"margin-left":"5px"},attrs:{label:"3"}}):e._e(),e._v(" "),"5"===e.level?a("el-radio",{staticStyle:{"margin-left":"5px"},attrs:{label:"4"}}):e._e(),e._v(" "),"5"===e.level?a("el-radio",{staticStyle:{"margin-left":"5px"},attrs:{label:"5"}}):e._e()],1)],1):e._e()},staticRenderFns:[]};var _=a("VU/8")({name:"ScoreOperate",data:function(){return{score:"",scoreList:[1,0,-1,2,3,4,5]}},props:["data","level"],watch:{data:function(){this.score=""},level:function(){this.score=""},score:function(){if(""!==this.score){var e={mid:this.data.mid,data:{mid:this.data.mid,uid:this.data.uid,score:this.score}};this.$emit("scoreChange",e)}}}},m,!1,function(e){a("papo")},"data-v-b6edb4c0",null).exports,f=a("522d"),h={name:"MaterialMark",components:{Auth:u.a,Operate:_,UploadExcel:f.a},data:function(){return{apiConf:{getUserRole:"/role/getUserRole",getMaterialInfo:"/material/getList",getConditions:"/material/getSelList",addMark:"/material/addMark",getFirstSecondTag:"/tag/getFirstSecondTag"},showConditions:!1,conditionsList:[],firstTagList:[],downloadAllLoading:!1,downloadCurLoading:!1,paramChecked:["user_name","field_name","release_date","F_level","C_level","exposure","exposure_date"],paramList:{user_name:"昵称",field_name:"领域",release_date:"发布时间",F_level:"F层级",C_level:"C层级",is_local:"是否本地用户本地发布",is_star:"是否纯明星",is_fans:"是否粉丝团",is_full_pc:"是否全景图",is_video:"是否视频",is_article:"是否纯文本",is_marketing:"是否营销号",is_pay:"是否付费阅读",is_praise_pic:"是否带求赞图",exposure:"曝光量",exposure_date:"曝光日期"},showParamList:!1,total:0,formInline:{total:"",exposure_date:"",sel:"",first_tagid:"",page:1,count:10},title:"",level:"",levelMap:{2:{1:"",0:""},3:{1:"",0:"","-1":""},5:{1:"",2:"",3:"",4:"",5:""}},dataList:[],markMap:{},tips:"loading..."}},computed:r()({},Object(c.b)(["pageAuth","email"])),methods:{init:function(){1===this.pageAuth&&(this.getFirstTag(),this.getConditions(),this.getUserRole())},getUserRole:function(){var e=this,t={url:this.apiConf.getUserRole,params:{username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)&&t.result&&t.result.permission.indexOf(15)>-1?(e.tips="",e.onSearch()):e.tips="暂无物料内容评估权限"},function(t){e.tips="接口异常"})},getConditions:function(){var e=this,t={username:this.email,cip:230},a={url:this.apiConf.getConditions,params:t};this.$store.dispatch("CommonGet",a).then(function(t){t.code&&200==Number(t.code)&&(e.conditionsList=t.result||[])})},getFirstTag:function(){var e=this,t={url:this.apiConf.getFirstSecondTag};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200===t.code?e.firstTagList=t.data:Object(p.Message)({showClose:!0,message:t.msg,type:"error",duration:1e3})},function(e){Object(p.Message)({showClose:!0,message:"获取一级标签列表失败",type:"error",duration:1e3})})},onSearch:function(){var e=this,t=r()({},this.formInline,{username:this.email,cip:230}),a={url:this.apiConf.getMaterialInfo,params:t};this.$store.dispatch("CommonGet",a).then(function(t){t.code&&200==Number(t.code)?(e.total=t.total||0,e.dataList=t.result||[]):Object(p.Message)({showClose:!0,message:t.msg||"物料信息获取失败",type:"error",duration:0})},function(e){Object(p.Message)({showClose:!0,message:"物料信息接口请求错误",type:"error",duration:0})})},handleSizeChange:function(e){this.formInline.count=e,this.onSearch()},handleCurrentChange:function(e){this.formInline.page=e,this.onSearch()},handleLevel:function(e){this.markMap={}},handleScore:function(e){this.markMap[e.mid]=e.data},handleDownloadAll:function(){var e=this;this.downloadAllLoading=!0;var t={total:this.formInline.total,exposure_date:this.formInline.exposure_date,sel:this.formInline.sel,page:1,count:this.total,username:this.email,cip:230},a={url:this.apiConf.getMaterialInfo,params:t};this.$store.dispatch("CommonGet",a).then(function(t){t.code&&200==Number(t.code)?e.downloadAll(t.result||[]):(e.downloadAllLoading=!1,Object(p.Message)({showClose:!0,message:t.msg||"物料信息获取失败",type:"error",duration:0}))},function(t){e.downloadAllLoading=!1,Object(p.Message)({showClose:!0,message:res.msg||"物料信息接口请求错误",type:"error",duration:0})})},downloadAll:function(e){var t=this;a.e(107).then(a.bind(null,"zWO4")).then(function(a){var l=t.getTableConf(),i=l.tHeader,s=l.filterVal,n=t.formatJson(s,e);a.export_json_to_excel(i,n,"物料内容评估"),t.downloadAllLoading=!1})},handleDownloadCur:function(){var e=this;this.downloadCurLoading=!0,a.e(107).then(a.bind(null,"zWO4")).then(function(t){var a=e.getTableConf(),l=a.tHeader,i=a.filterVal,s=e.dataList,n=e.formatJson(i,s);t.export_json_to_excel(l,n,"物料内容评估"),e.downloadCurLoading=!1})},formatJson:function(e,t){return t.map(function(t,a){return e.map(function(e){return"index"===e?a+1:"user_name"===e?"http://weibo.com/u/"+t.uid:"is_local"===e||"is_star"===e||"is_fans"===e||"is_full_pc"===e||"is_video"===e||"is_article"===e||"is_marketing"===e||"is_pay"===e||"is_praise_pic"===e?1===t[e]?"是":"否":"number"==typeof t[e]?t[e].toString():t[e]})})},getTableConf:function(){var e=this.paramChecked,t=["序号","mid","uid"],a=["index","mid","uid"];if(e&&e.length>0)for(var l=0;l<e.length;l++)t.push(this.paramList[e[l]]),a.push(e[l]);return{tHeader:t,filterVal:a}},_formatNum:function(e){return Object(d.b)(e)},isLevelText:function(){var e=this.levelMap[this.level];for(var t in e)if(""===e[t])return!1;return!0},submitEvent:function(){var e=this;this.level?this.title?this.isLevelText()?"{}"!==n()(this.markMap)?this.$confirm("批量提交评估结果, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){e.addMark()}).catch(function(){e.$message({type:"info",message:"已取消评估提交！"})}):Object(p.Message)({showClose:!0,message:"评估数量为0，请打分！",type:"error",duration:0}):Object(p.Message)({showClose:!0,message:"请填写分级意义！",type:"error",duration:0}):Object(p.Message)({showClose:!0,message:"请填写评分标题！",type:"error",duration:0}):Object(p.Message)({showClose:!0,message:"请选择评估分级！",type:"error",duration:0})},addMark:function(){var e=this,t=this.levelMap[this.level],a=i()(this.markMap).map(function(t){return e.markMap[t]}),l=new URLSearchParams;l.append("title",this.title),l.append("level",this.level),l.append("state",n()(t)),l.append("mark",n()(a)),l.append("username",this.email),l.append("cip",230);var s={url:this.apiConf.addMark,params:l};this.$store.dispatch("CommonPost",s).then(function(e){e.code&&200==Number(e.code)?Object(p.Message)({showClose:!0,message:"评估提交成功！",type:"success",duration:1e3}):Object(p.Message)({showClose:!0,message:e.msg||"评估提交失败！",type:"error",duration:0})},function(e){Object(p.Message)({showClose:!0,message:"评估提交接口请求错误",type:"error",duration:0})})},autoHide:function(e){var t=document.getElementById("paramsDom");t&&!t.contains(e.target)&&(this.showParamList=!1)}},mounted:function(){document.addEventListener("click",this.autoHide,!1)},destroyed:function(){document.removeEventListener("click",this.autoHide,!1)},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},v={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("el-col",{staticClass:"clearfix",attrs:{span:24}},[a("h6",{staticClass:"pane-title left"},[a("i",{staticClass:"el-icon-document hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("物料内容评估")])])],1),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[e.tips?a("el-col",{attrs:{span:24}},[a("el-alert",{attrs:{title:e.tips,type:"warning","show-icon":"",closable:!1}})],1):a("el-col",{attrs:{span:24}},[a("el-form",{attrs:{inline:"",model:e.formInline,"label-position":"left",size:"mini"}},[a("el-form-item",{attrs:{label:"日期"}},[a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"timestamp",placeholder:"选择曝光日期"},model:{value:e.formInline.exposure_date,callback:function(t){e.$set(e.formInline,"exposure_date",t)},expression:"formInline.exposure_date"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"查看"}},[a("el-select",{attrs:{placeholder:"请选择曝光排行",clearable:""},model:{value:e.formInline.total,callback:function(t){e.$set(e.formInline,"total",t)},expression:"formInline.total"}},[a("el-option",{attrs:{label:"曝光Top 100",value:"100"}}),e._v(" "),a("el-option",{attrs:{label:"曝光Top 500",value:"500"}}),e._v(" "),a("el-option",{attrs:{label:"曝光Top 1000",value:"1000"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"一级标签"}},[a("el-select",{attrs:{placeholder:"请选择一级标签",filterable:"",clearable:""},model:{value:e.formInline.first_tagid,callback:function(t){e.$set(e.formInline,"first_tagid",t)},expression:"formInline.first_tagid"}},e._l(e.firstTagList,function(e,t){return a("el-option",{key:t,attrs:{label:e.first_tagname,value:e.first_tagid}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"筛选条件"}},[a("el-input",{attrs:{type:"textarea",autosize:"",placeholder:"输入查询条件",clearable:""},model:{value:e.formInline.sel,callback:function(t){e.$set(e.formInline,"sel","string"==typeof t?t.trim():t)},expression:"formInline.sel"}}),e._v(" "),a("div",{staticStyle:{position:"relative"}},[a("span",{staticClass:"info-tips",on:{click:function(t){e.showConditions=!e.showConditions}}},[e._v(e._s(e.showConditions?"收起":"查看")+"筛选条件（表格可滚动）")]),e._v(" "),e.showConditions?a("div",{staticClass:"tips-table"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.conditionsList,border:"",size:"mini","max-height":"340"}},[a("el-table-column",{attrs:{prop:"sel_sql",label:"字段名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"name",label:"含义"}})],1)],1):e._e()])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.onSearch}},[a("span",{staticClass:"hidden-xs-only"},[e._v("查询")])])],1)],1)],1)],1),e._v(" "),e.tips?e._e():a("el-row",{staticClass:"content-box-wrap"},[a("el-form",{attrs:{inline:"",size:"mini"}},[a("el-form-item",{attrs:{label:"评估分级","label-width":"72px"}},[a("el-radio-group",{on:{change:e.handleLevel},model:{value:e.level,callback:function(t){e.level=t},expression:"level"}},[a("el-radio",{attrs:{label:"2"}},[e._v("2级")]),e._v(" "),a("el-radio",{attrs:{label:"3"}},[e._v("3级")]),e._v(" "),a("el-radio",{attrs:{label:"5"}},[e._v("5级")])],1)],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.level,expression:"level"}]},[a("el-form-item",{attrs:{label:"Title"}},[a("el-input",{staticStyle:{"max-width":"360px"},attrs:{placeholder:"请填写评分标题",clearable:""},model:{value:e.title,callback:function(t){e.title="string"==typeof t?t.trim():t},expression:"title"}})],1),e._v(" "),a("div",[a("span",{staticClass:"table-title"},[e._v("分级意义：")])]),e._v(" "),e._l(e.levelMap[e.level],function(t,l){return a("el-form-item",{key:l,attrs:{label:l+"分"}},[a("el-input",{staticStyle:{"max-width":"360px"},attrs:{type:"textarea",autosize:"",placeholder:"请填写"+l+"分意义",clearable:""},model:{value:e.levelMap[e.level][l],callback:function(t){e.$set(e.levelMap[e.level],l,"string"==typeof t?t.trim():t)},expression:"levelMap[level][idx]"}})],1)})],2)],1),e._v(" "),a("el-col",{attrs:{span:24}},[e.dataList&&e.dataList.length>0?a("div",{staticClass:"clearfix",staticStyle:{padding:"10px 0"}},[a("el-button",{staticClass:"left",attrs:{type:"primary",size:"mini"},on:{click:function(t){e.submitEvent()}}},[e._v("提交评估")]),e._v(" "),a("div",{staticClass:"left params-wrapper",attrs:{id:"paramsDom"}},[a("span",{staticClass:"params-title",on:{click:function(t){e.showParamList=!e.showParamList}}},[e._v("列表属性选择 "),a("i",{staticClass:"el-icon-caret-bottom"})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.showParamList,expression:"showParamList"}],staticClass:"params-box"},[a("el-checkbox-group",{model:{value:e.paramChecked,callback:function(t){e.paramChecked=t},expression:"paramChecked"}},e._l(e.paramList,function(t,l){return a("el-checkbox",{key:l,staticStyle:{"margin-left":"10px",display:"block"},attrs:{label:l}},[e._v(e._s(t))])}))],1)]),e._v(" "),a("el-button",{staticClass:"right",attrs:{type:"danger",size:"mini",title:"批量导出全部 Excel",loading:e.downloadAllLoading},on:{click:e.handleDownloadAll}},[a("span",[e._v("导出全部")])]),e._v(" "),a("el-button",{staticClass:"right",staticStyle:{"margin-right":"5px"},attrs:{type:"warning",size:"mini",title:"批量导出当前页数据 Excel",loading:e.downloadCurLoading},on:{click:e.handleDownloadCur}},[a("span",[e._v("导出当前页")])])],1):e._e(),e._v(" "),e.dataList?a("el-row",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.dataList,border:"",stripe:"",size:"mini"}},[a("el-table-column",{attrs:{fixed:"",type:"index",label:"序号",width:"50px"}}),e._v(" "),a("el-table-column",{attrs:{width:"130",prop:"mid",label:"mid"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{staticClass:"link-btn",attrs:{href:"//m.weibo.cn/status/"+t.row.mid,target:"_blank",title:"跳转至微博详情页"}},[e._v(e._s(t.row.mid))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"90",prop:"uid",label:"uid"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{staticClass:"link-btn",attrs:{href:"//weibo.com/u/"+t.row.uid,target:"_blank",title:"跳转至微博主页"}},[e._v(e._s(t.row.uid))])]}}])}),e._v(" "),e.paramChecked.indexOf("user_name")>-1?a("el-table-column",{attrs:{prop:"user_name",label:"昵称","min-width":"90px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("a",{class:t.row.user_name?"link-btn":"errorBtn",attrs:{href:"//weibo.com/u/"+t.row.uid,target:"_blank",title:"跳转至微博主页"}},[e._v(e._s(t.row.user_name||t.row.uid||"未知"))])]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("field_name")>-1?a("el-table-column",{attrs:{prop:"field_name",label:"领域"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.field_name||"未知"))]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("release_date")>-1?a("el-table-column",{attrs:{prop:"release_date",label:"发布时间","min-width":"80px"}}):e._e(),e._v(" "),e.paramChecked.indexOf("F_level")>-1?a("el-table-column",{attrs:{prop:"F_level",label:"F层级",width:"60px"}}):e._e(),e._v(" "),e.paramChecked.indexOf("C_level")>-1?a("el-table-column",{attrs:{prop:"C_level",label:"C层级",width:"60px"}}):e._e(),e._v(" "),e.paramChecked.indexOf("is_local")>-1?a("el-table-column",{attrs:{prop:"is_local",label:"是否本地用户本地发布",width:"142px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1==t.row.is_local?"是":"否"))]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("is_star")>-1?a("el-table-column",{attrs:{prop:"is_star",label:"是否纯明星",width:"82px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1==t.row.is_star?"是":"否"))]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("is_fans")>-1?a("el-table-column",{attrs:{prop:"is_fans",label:"是否粉丝团",width:"82px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1==t.row.is_fans?"是":"否"))]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("is_full_pc")>-1?a("el-table-column",{attrs:{prop:"is_full_pc",label:"是否全景图",width:"82px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1==t.row.is_full_pc?"是":"否"))]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("is_video")>-1?a("el-table-column",{attrs:{prop:"is_video",label:"是否视频",width:"80px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1==t.row.is_video?"是":"否"))]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("is_article")>-1?a("el-table-column",{attrs:{prop:"is_article",label:"是否纯文本",width:"82px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1==t.row.is_article?"是":"否"))]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("is_marketing")>-1?a("el-table-column",{attrs:{prop:"is_marketing",label:"是否营销号",width:"82px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1==t.row.is_marketing?"是":"否"))]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("is_pay")>-1?a("el-table-column",{attrs:{prop:"is_pay",label:"是否付费阅读",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1==t.row.is_pay?"是":"否"))]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("is_praise_pic")>-1?a("el-table-column",{attrs:{prop:"is_praise_pic",label:"是否带求赞图",width:"100px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(1==t.row.is_praise_pic?"是":"否"))]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("exposure")>-1?a("el-table-column",{attrs:{prop:"exposure",label:"曝光量","min-width":"90px",sortable:""},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(e._formatNum(t.row.exposure)))]}}])}):e._e(),e._v(" "),e.paramChecked.indexOf("exposure_date")>-1?a("el-table-column",{attrs:{prop:"exposure_date",label:"曝光日期",width:"80px"}}):e._e(),e._v(" "),a("el-table-column",{attrs:{label:"打分",fixed:"right",width:"250px"},scopedSlots:e._u([{key:"default",fn:function(t){return[e.level?a("operate",{attrs:{data:t.row,level:e.level},on:{scoreChange:e.handleScore}}):a("span",{staticClass:"info-tips"},[e._v("请先选择评估分级")])]}}])})],1),e._v(" "),a("div",{staticStyle:{"padding-top":"10px",overflow:"auto"}},[a("el-pagination",{attrs:{"current-page":e.formInline.page,"page-sizes":[5,10,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1):e._e()],1)],1)],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var g=a("VU/8")(h,v,!1,function(e){a("6QVB")},"data-v-92379194",null);t.default=g.exports},"6QVB":function(e,t){},papo:function(e,t){}});