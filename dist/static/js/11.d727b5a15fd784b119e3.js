webpackJsonp([11],{"4XAd":function(t,e){},ACaC:function(t,e){},DBmk:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("Dd8w"),a=i.n(s),n=i("vzON"),o={name:"uploadExcel",components:{UploadExcelComponent:i("9K13").a},props:["callback","initdata","example","showexample"],data:function(){return{tableData:[],tableHeader:[]}},methods:{selected:function(t){this.tableData=t.results,this.tableHeader=t.header,this.callback(t.results)}},watch:{initdata:function(){this.initdata||(this.tableData=[],this.tableHeader=[])},example:function(){}}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-container"},[i("upload-excel-component",{attrs:{example:t.example,showexample:t.showexample},on:{"on-selected-file":t.selected}}),t._v(" "),i("el-table",{staticClass:"tableBox",staticStyle:{width:"100%","margin-top":"20px"},attrs:{data:t.tableData,border:"","max-height":"200"}},t._l(t.tableHeader,function(t){return i("el-table-column",{key:t,attrs:{prop:t,label:t}})})),t._v(" "),t.tableData&&t.tableData.length>0?i("div",{staticClass:"excel-upload-tips"},[t._v("共上传 "),i("span",[t._v(t._s(t.tableData.length))]),t._v(" 条数据")]):t._e()],1)},staticRenderFns:[]};var r=i("VU/8")(o,l,!1,function(t){i("4XAd")},"data-v-4fb56181",null).exports,c=i("NYxO"),d=i("0xDb"),h=(i("o7bW"),{name:"itemList",props:["item","inputs","index","callback","selectedarr"],data:function(){return{loading:!1,isVideo:!1,videoSrc:"",controls:!1,inputList:null,checkedArr:[]}},computed:a()({},Object(c.b)(["curvideo"])),methods:{init:function(){this.checkedArr=this.selectedarr;try{this.item.url_objects[0].object.object.stream.url;this.isVideo=!0}catch(t){this.isVideo=!1}this.inputs&&this.inputs.content&&(this.inputList=this.inputs.content.split("|"))},togglePlay:function(){this.$store.dispatch("updateVideo",this.item.mid),this.videoSrc||(this.videoSrc=this.item.url_objects[0].object.object.stream.url,this.controls=!0)},_formatNum:function(t){return Object(d.b)(t)},_parseTime:function(t,e){return Object(d.e)(t,e)},getJsonArray:function(t,e,i,s){return t+","+e+","+i+","+s},handlecheckedArrChange:function(t){var e=[];if(this.checkedArr&&this.checkedArr.length>0)for(var i=0;i<this.checkedArr.length;i++){var s=this.checkedArr[i].split(",");!e[s[0]]&&(e[s[0]]=[]),e[s[0]][s[1]]?e[s[0]][s[1]]+=","+s[3]:e[s[0]][s[1]]=s[3]}this.callback(this.index-1,e,this.checkedArr)}},created:function(){this.init()},watch:{item:function(){this.init()},inputs:function(){this.init()},index:function(){},curvideo:function(){this.curvideo!=this.item.mid&&(this.videoSrc="",this.controls=!1)}}}),p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-row",[i("el-col",{staticClass:"item-wrapper",attrs:{span:24}},[t.inputs?i("el-row",[i("div",{staticClass:"item-status-box clearfix"},[i("span",{staticClass:"left"},[t._v("NO."+t._s(t.index))]),t._v(" "),i("div",{staticClass:"clearfix left"},[i("label",{staticClass:"item-mid left"},[t._v("mid: "+t._s(t.inputs.mid))]),t._v(" "),i("label",{staticClass:"item-cate left"},[t._v("领域: "+t._s(t.inputs.cate))])])])]):t._e(),t._v(" "),t.inputList&&t.inputList.length>0?i("el-row",[i("el-checkbox-group",{on:{change:t.handlecheckedArrChange},model:{value:t.checkedArr,callback:function(e){t.checkedArr=e},expression:"checkedArr"}},t._l(t.inputList,function(e,s){return i("el-col",{key:s,staticStyle:{"margin-bottom":"10px"},attrs:{xs:24,span:8}},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("el-button",{attrs:{type:"danger",round:"",size:"mini"}},[t._v("机器/人工评估"+t._s(s+1))])],1),t._v(" "),i("div",{staticClass:"clearfix"},t._l(e.split(";"),function(e,a){return i("div",{key:a,staticClass:"tag-box"},t._l(e.split(","),function(e,n){return i("div",{key:n,staticClass:"tag-item"},[i("el-checkbox",{attrs:{label:t.getJsonArray(s,a,n,e),size:"mini"}},[t._v(t._s(e))])],1)}))}))])],1)}))],1):t._e(),t._v(" "),t.item?i("div",[i("el-row",{staticClass:"clearfix"},[i("div",{staticClass:"left"},[i("a",{staticClass:"item-avatar",attrs:{target:"_blank",href:t.item.user&&"//weibo.com/u/"+t.item.user.id||"javascript:void(0)",title:"跳转微博主页"}},[t.item.user&&t.item.user.avatar_hd?i("img",{attrs:{alt:"头像",title:"用户头像",src:t.item.user&&t.item.user.avatar_hd}}):t._e()])]),t._v(" "),i("div",{staticClass:"left",staticStyle:{padding:"10px"}},[i("el-row",[i("a",{staticClass:"item-name",attrs:{href:t.item.user&&"//weibo.com/u/"+t.item.user.id||"javascript:void(0)",target:"_blank",title:"跳转微博主页"}},[t._v(t._s(t.item.user&&t.item.user.name||"未知"))])]),t._v(" "),i("el-row",{staticStyle:{"margin-top":"10px"},attrs:{type:"flex"}},[i("span",{staticClass:"item-info",attrs:{title:"查看微博详情"}},[i("i",{staticClass:"el-icon-time"}),t._v(" "),i("a",{attrs:{href:t.item.link||"javascript:void(0)",target:"_blank"}},[t._v(t._s(t._parseTime(t.item.created_at)))])]),t._v(" "),t.item.source?i("span",{staticClass:"info-box"},[t._v("来自\n              "),i("label",{staticClass:"item-info",domProps:{innerHTML:t._s(t.item.source)}})]):t._e()])],1)]),t._v(" "),i("el-row",{staticClass:"content-text"},[i("a",{attrs:{href:t.item.link||"javascript:void(0)",target:"_blank",title:"查看微博详情"}},[t._v(t._s(t.item.text))])]),t._v(" "),t.item.pic_ids&&t.item.pic_ids.length>0?i("el-row",{staticClass:"img-wrapper"},[i("el-col",{attrs:{xs:24}},[i("el-row",t._l(t.item.pic_ids,function(e,s){return i("el-col",{key:s,staticStyle:{margin:"2px","max-width":"110px"},attrs:{xs:7}},[i("div",{staticClass:"img-box"},[i("div",{staticClass:"bg-img",style:"background-image: url(//ww2.sinaimg.cn/bmiddle/"+e+".jpg);"},[t._v(t._s(e?"":"图片加载失败"))])])])}))],1)],1):t._e(),t._v(" "),t.isVideo?i("el-row",{staticClass:"video-wrapper"},[t.videoSrc?t._e():i("span",{staticClass:"play-btn",on:{click:function(e){t.togglePlay()}}},[i("i",{staticClass:"el-icon-caret-right play-btn-icon"})]),t._v(" "),i("video",{attrs:{id:"video"+t.item.mid,poster:t.item.url_objects[0].object.object.image.url,controls:t.controls,src:t.videoSrc,autoplay:""}},[t._v("您的浏览器不支持HTML5")])]):t._e(),t._v(" "),i("el-row",{staticClass:"item-footer",attrs:{type:"flex"}},[i("el-col",{staticClass:"footer-list"},[i("i",{staticClass:"el-icon-news hidden-xs-only"}),t._v(" "),i("label",[t._v("转发 ")]),t._v(" "),i("span",[t._v(t._s(t._formatNum(t.item.reposts_count)))])]),t._v(" "),i("el-col",{staticClass:"footer-list"},[i("i",{staticClass:"el-icon-edit-outline hidden-xs-only"}),t._v(" "),i("label",[t._v("评论 ")]),t._v(" "),i("span",[t._v(t._s(t._formatNum(t.item.comments_count)))])]),t._v(" "),i("el-col",{staticClass:"footer-list",staticStyle:{border:"0"}},[i("i",{staticClass:"el-icon-phone-outline hidden-xs-only"}),t._v(" "),i("label",[t._v("点赞 ")]),t._v(" "),i("span",[t._v(t._s(t._formatNum(t.item.attitudes_count)))])])],1)],1):i("div",{staticClass:"none-tips"},[t._v("暂无数据")])],1)],1)},staticRenderFns:[]};var u=i("VU/8")(h,p,!1,function(t){i("ZdeK"),i("ACaC")},"data-v-7802b464",null).exports,_=(i("zL8q"),{name:"manage",components:{Auth:n.a,UploadExcel:r,ItemList:u},data:function(){return{isUpload:!1,uploadExample:{tableHeader:["cate","mid","content"],tableData:[{cate:"领域1",mid:"2675435273",content:"一级标签id:名字,一级标签id:名字;二级标签id:名字,二级标签id:名字;三级标签id:名字,三级标签id:名字;keyword,keyword|一级标签id:名字,一级标签id:名字;二级标签id:名字,二级标签id:名字;三级标签id:名字,三级标签id:名字;keyword,keyword|一级标签id:名字,一级标签id:名字;二级标签id:名字,二级标签id:名字;三级标签id:名字,三级标签id:名字;keyword,keyword"}]},downloadLoading:!1,page:1,count:5,total:0,excelData:null,mids:null,inputList:null,dataList:null,exportList:null}},computed:a()({},Object(c.b)(["pageAuth"])),methods:{init:function(){},onSearch:function(){var t=this,e=this.mids.slice((this.page-1)*this.count,this.page*this.count),i={url:"/lab/showbatch",params:{ids:e.join(",")}};this.$store.dispatch("CommonGet",i).then(function(i){t.dataList=[];for(var s=0,a=0;s<e.length;s++,a++)i[a]&&e[s]==i[a].id?t.dataList.push(i[a]):(t.dataList.push(""),a--)})},showUpload:function(){this.isUpload=!0},getExcel:function(t){this.excelData=t},setExcelData:function(){var t=this.excelData;if(this.page=1,this.inputList=null,this.dataList=null,this.mids=[],this.exportList=[],t&&t.length>0){this.inputList=t;for(var e=0;e<t.length;e++)this.mids.push(t[e].mid),this.exportList.push({checkedArr:[],cate:t[e].cate,mid:t[e].mid,content:t[e].content,"00":"","01":"","02":"","03":"",10:"",11:"",12:"",13:"",20:"",21:"",22:"",23:"",30:"",31:"",32:"",33:"",40:"",41:"",42:"",43:"",50:"",51:"",52:"",53:"",60:"",61:"",62:"",63:"",70:"",71:"",72:"",73:"",80:"",81:"",82:"",83:"",90:"",91:"",92:"",93:""})}this.total=this.mids&&this.mids.length||0},addsEvent:function(){this.isUpload=!1,this.setExcelData(),this.onSearch()},cancelUpload:function(){this.isUpload=!1,this.excelData=null},getCheckedArr:function(t){return this.exportList[(this.page-1)*this.count+t]&&this.exportList[(this.page-1)*this.count+t].checkedArr||[]},handleSizeChange:function(t){this.$store.dispatch("updateVideo",""),this.count=t,this.mids&&this.mids.length>0&&this.onSearch()},handleCurrentChange:function(t){this.$store.dispatch("updateVideo",""),this.page=t,this.mids&&this.mids.length>0&&this.onSearch()},handleSelectChange:function(t,e,i){if(this.exportList[t].checkedArr=i,e&&e.length>0){console.log(e);for(var s=0;s<e.length;s++)if(e[s]&&e[s].length>0)for(var a=0;a<e[s].length;a++)this.exportList[t][""+s+a]=e[s][a]||"";else this.exportList[t][s+"0"]="",this.exportList[t][s+"1"]="",this.exportList[t][s+"2"]="",this.exportList[t][s+"3"]=""}else this.exportList[t]["00"]="",this.exportList[t]["01"]="",this.exportList[t]["02"]="",this.exportList[t]["03"]="",this.exportList[t][10]="",this.exportList[t][11]="",this.exportList[t][12]="",this.exportList[t][13]="",this.exportList[t][20]="",this.exportList[t][21]="",this.exportList[t][22]="",this.exportList[t][23]="",this.exportList[t][30]="",this.exportList[t][31]="",this.exportList[t][32]="",this.exportList[t][33]="",this.exportList[t][40]="",this.exportList[t][41]="",this.exportList[t][42]="",this.exportList[t][43]="",this.exportList[t][50]="",this.exportList[t][51]="",this.exportList[t][52]="",this.exportList[t][53]="",this.exportList[t][60]="",this.exportList[t][61]="",this.exportList[t][62]="",this.exportList[t][63]="",this.exportList[t][70]="",this.exportList[t][71]="",this.exportList[t][72]="",this.exportList[t][73]="",this.exportList[t][80]="",this.exportList[t][81]="",this.exportList[t][82]="",this.exportList[t][83]="",this.exportList[t][90]="",this.exportList[t][91]="",this.exportList[t][92]="",this.exportList[t][93]="";console.log("exportList:",this.exportList[t])},handleDownload:function(){var t=this;this.downloadLoading=!0,i.e(101).then(i.bind(null,"zWO4")).then(function(e){var i=t.formatJson(["index","cate","mid","content","00","01","02","03","10","11","12","13","20","21","22","23","30","31","32","33","40","41","42","43","50","51","52","53","60","61","62","63","70","71","72","73","80","81","82","83","90","91","92","93"],t.exportList);e.export_json_to_excel(["序号","cate","mid","content","机器/人工0_一级标签","机器/人工0_二级标签","机器/人工0_三级标签","机器/人工0_关键词","机器/人工1_一级标签","机器/人工1_二级标签","机器/人工1_三级标签","机器/人工1_关键词","机器/人工2_一级标签","机器/人工2_二级标签","机器/人工2_三级标签","机器/人工2_关键词","机器/人工3_一级标签","机器/人工3_二级标签","机器/人工3_三级标签","机器/人工3_关键词","机器/人工4_一级标签","机器/人工4_二级标签","机器/人工4_三级标签","机器/人工4_关键词","机器/人工5_一级标签","机器/人工5_二级标签","机器/人工5_三级标签","机器/人工5_关键词","机器/人工6_一级标签","机器/人工6_二级标签","机器/人工6_三级标签","机器/人工6_关键词","机器/人工7_一级标签","机器/人工7_二级标签","机器/人工7_三级标签","机器/人工7_关键词","机器/人工8_一级标签","机器/人工8_二级标签","机器/人工8_三级标签","机器/人工8关键词","机器/人工9_一级标签","机器/人工9_二级标签","机器/人工9_三级标签","机器/人工9_关键词"],i,"demo_export"),t.downloadLoading=!1})},formatJson:function(t,e){return e.map(function(e,i){return t.map(function(t){return"index"===t?i+1:e[t]})})}},created:function(){this.init()},watch:{email:function(){},pageAuth:function(){this.init()},dataList:function(){}}}),m={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return 1===t.pageAuth?i("el-main",{staticStyle:{padding:"20px 14px"}},[i("el-row",{attrs:{type:"flex",justify:"center"}},[i("el-col",{attrs:{xs:24,sm:23,md:23,lg:23,xl:23}},[i("el-dialog",{attrs:{title:"Excel批量操作",visible:t.isUpload},on:{"update:visible":function(e){t.isUpload=e}}},[i("upload-excel",{attrs:{callback:t.getExcel,initdata:t.excelData,example:t.uploadExample,showexample:!0}}),t._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){t.addsEvent()}}},[t._v("导入")]),t._v(" "),i("el-button",{attrs:{size:"small"},on:{click:function(e){t.cancelUpload()}}},[t._v("取 消")])],1)],1),t._v(" "),i("div",{staticClass:"clearfix"},[i("span",{staticClass:"table-title left"},[t._v("标签评估")]),t._v(" "),t.exportList&&t.exportList.length>0?i("el-button",{staticClass:"right",staticStyle:{"margin-left":"5px"},attrs:{type:"success",size:"mini",title:"批量导出全部 Excel",loading:t.downloadLoading},on:{click:t.handleDownload}},[i("span",[t._v("导出评估结果")])]):t._e(),t._v(" "),i("el-button",{staticClass:"right",attrs:{type:"primary",size:"mini",title:"Excel批量导入"},on:{click:function(e){t.showUpload()}}},[i("span",[t._v("Excel导入")])])],1),t._v(" "),t.dataList&&t.dataList.length>0?i("div",t._l(t.dataList,function(e,s){return i("item-list",{key:e.id,attrs:{callback:t.handleSelectChange,selectedarr:t.getCheckedArr(s),item:e,inputs:t.inputList[(t.page-1)*t.count+s],index:(t.page-1)*t.count+s+1}})})):i("div",{staticClass:"none-tips"},[t._v("暂无数据")]),t._v(" "),i("div",{staticStyle:{"padding-top":"10px",overflow:"auto"}},[i("el-pagination",{attrs:{"current-page":t.page,"page-sizes":[5,10,20,30,40,50],"page-size":t.count,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)],1)],1):0===t.pageAuth?i("el-main",[i("auth")],1):t._e()},staticRenderFns:[]};var x=i("VU/8")(_,m,!1,function(t){i("wOuk")},"data-v-170d4f7b",null);e.default=x.exports},ZdeK:function(t,e){},wOuk:function(t,e){}});