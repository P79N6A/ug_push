webpackJsonp([37],{"s/Ar":function(t,e){},t4Wb:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("mvHQ"),i=a.n(s),r=a("Dd8w"),o=a.n(r),l=a("vzON"),n=a("NYxO"),c=a("0xDb"),d={name:"itemList",props:["item","index"],data:function(){return{hasRetweetedVideo:!1,videoStatus:{source:!1,retweet:!1},videoTempSrc:"",videoSrc:"",posterSrc:"",controls:!1,showbatchData:!1}},computed:o()({},Object(n.b)(["curvideo"])),methods:{init:function(){this.showbatchData=!(!this.item.showbatch||!this.item.showbatch[0])&&this.item.showbatch[0];try{this.showbatchData.retweeted_status?this.setVideoInfo(this.showbatchData.retweeted_status.url_objects,"retweet"):this.setVideoInfo(this.showbatchData.url_objects,"source")}catch(t){this.videoStatus.source=!1,this.videoStatus.retweet=!1}},setVideoInfo:function(t,e){try{for(var a=0;a<t.length;a++){var s=t[a].object&&t[a].object.object||{};if(this.posterSrc=s.image.url,"video"===s.object_type){if(s.urls)return this.videoTempSrc=s.urls.mp4_hd_mp4||s.urls.mp4_ld_mp4,void(this.videoStatus[e]=!0);if(s.stream&&"mp4"===s.stream.format)return this.videoTempSrc=s.stream.url,void(this.videoStatus[e]=!0)}else if("story"===s.object_type&&(this.videoTempSrc=s.slide_cover&&s.slide_cover.slide_videos&&s.slide_cover.slide_videos[0]&&s.slide_cover.slide_videos[0].url?s.slide_cover.slide_videos[0].url:"",this.videoTempSrc))return void(this.videoStatus[e]=!0)}}catch(t){this.videoStatus[e]=!1}},togglePlay:function(t){this.$store.dispatch("updateVideo",t),this.videoSrc||(this.videoSrc=this.videoTempSrc,this.controls=!0)},_formatNum:function(t){return Object(c.b)(t)},_parsePercent:function(t,e){return Object(c.d)(t,e)},_parseTime:function(t,e){return Object(c.e)(t,e)}},created:function(){this.init()},watch:{item:function(){this.init()},index:function(){},curvideo:function(){var t=this.item&&this.showbatchData&&this.showbatchData.id||0;this.curvideo!=t&&(this.videoSrc="",this.controls=!1)}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return t.item?a("el-row",[a("el-col",{staticClass:"item-wrapper",attrs:{xs:24,sm:23,md:23,lg:23,xl:23}},[a("el-row",[a("div",{staticClass:"item-status-box clearfix"},[a("span",[t._v("NO."+t._s(t.index))]),t._v(" "),a("a",{staticClass:"item-status-mid",attrs:{href:"http://172.16.139.44:65531/?mids="+t.item.mid+"&region=21",target:"_blank",title:"查看微博详情"}},[t._v(t._s(t.item.mid))])])]),t._v(" "),t.showbatchData?a("div",[t.showbatchData.user?a("el-row",{staticClass:"clearfix"},[a("div",{staticClass:"left"},[a("a",{staticClass:"item-avatar",attrs:{target:"_blank",href:"//weibo.com/u/"+t.showbatchData.user.id,title:"跳转微博主页"}},[a("img",{attrs:{src:t.showbatchData.user.profile_image_url}})])]),t._v(" "),a("div",{staticClass:"left",staticStyle:{padding:"10px"}},[a("el-row",[a("a",{staticClass:"item-name",attrs:{href:"//weibo.com/u/"+t.showbatchData.user.id,target:"_blank",title:"跳转微博主页"}},[t._v(t._s(t.showbatchData.user.screen_name))])]),t._v(" "),a("el-row",{staticStyle:{"margin-top":"10px"},attrs:{type:"flex"}},[a("span",{staticClass:"item-info",attrs:{title:"查看微博详情"}},[a("i",{staticClass:"el-icon-time"}),t._v(" "),a("a",{attrs:{href:t.showbatchData.link||"javascript:void(0)",target:"_blank"}},[t._v(t._s(t._parseTime(t.showbatchData.created_at)))])]),t._v(" "),t.showbatchData.source?a("span",{staticClass:"info-box"},[t._v("来自\n              "),a("label",{staticClass:"item-info",domProps:{innerHTML:t._s(t.showbatchData.source)}})]):t._e()])],1)]):t._e(),t._v(" "),a("el-row",{staticClass:"content-text"},[a("a",{attrs:{href:t.showbatchData.link||"javascript:void(0)",target:"_blank",title:"查看微博详情"}},[t._v(t._s(t.showbatchData.text))])]),t._v(" "),t.showbatchData.pic_ids&&t.showbatchData.pic_ids.length>0?a("el-row",{staticClass:"img-wrapper"},[a("el-col",{attrs:{xs:24}},[a("el-row",t._l(t.showbatchData.pic_ids,function(e,s){return a("el-col",{key:s,staticStyle:{margin:"2px","max-width":"110px"},attrs:{xs:7}},[a("a",{staticClass:"img-box",attrs:{href:"//wx1.sinaimg.cn/nmw690/"+e+".jpg",target:"_blank"}},[a("div",{staticClass:"bg-img",style:"background-image: url(//ww2.sinaimg.cn/bmiddle/"+e+".jpg);"},[t._v(t._s(e?"":"图片加载失败"))])])])}))],1)],1):t._e(),t._v(" "),t.showbatchData.retweeted_status?a("el-row",{staticClass:"retweeted-box"},[a("el-col",[a("div",[a("a",{staticClass:"item-name",attrs:{href:"//weibo.com/u/"+t.showbatchData.retweeted_status.user.id,target:"_blank"}},[t._v("@"+t._s(t.showbatchData.retweeted_status.user.screen_name))])]),t._v(" "),a("el-row",{staticClass:"content-text"},[a("a",{attrs:{href:"//m.weibo.cn/status/"+t.showbatchData.retweeted_status.mid,target:"_blank",title:"查看微博详情"}},[t._v(t._s(t.showbatchData.retweeted_status.text))])]),t._v(" "),t.showbatchData.retweeted_status.pic_ids&&t.showbatchData.retweeted_status.pic_ids.length>0?a("el-row",{staticClass:"img-wrapper"},[a("el-col",{attrs:{xs:24,span:12}},[a("el-row",t._l(t.showbatchData.retweeted_status.pic_ids,function(e,s){return a("el-col",{key:s,staticStyle:{margin:"2px","max-width":"110px"},attrs:{span:7}},[a("a",{staticClass:"img-box",attrs:{href:"//wx1.sinaimg.cn/nmw690/"+e+".jpg",target:"_blank"}},[a("div",{staticClass:"bg-img",style:"background-image: url(//ww2.sinaimg.cn/bmiddle/"+e+".jpg);"},[t._v(t._s(e?"":"图片加载失败"))])])])}))],1)],1):t._e(),t._v(" "),t.videoStatus.retweet?a("el-row",{staticClass:"video-wrapper"},[t.videoSrc?t._e():a("span",{staticClass:"play-btn",on:{click:function(e){t.togglePlay(t.showbatchData.retweeted_status.mid)}}},[a("i",{staticClass:"el-icon-caret-right play-btn-icon"})]),t._v(" "),a("video",{attrs:{poster:t.posterSrc,controls:t.controls,src:t.videoSrc,autoplay:""}},[t._v("您的浏览器不支持HTML5")])]):t._e(),t._v(" "),a("el-row",{staticStyle:{"margin-top":"10px"}},[a("span",{staticClass:"item-info",attrs:{title:"查看微博详情"}},[a("i",{staticClass:"el-icon-time"}),t._v(" "),a("a",{attrs:{href:"//m.weibo.cn/status/"+t.showbatchData.retweeted_status.mid,target:"_blank"}},[t._v(t._s(t._parseTime(t.showbatchData.retweeted_status.created_at,"{y}年{m}月{d}日 {h}:{i}:{s}")))])]),t._v(" "),t.showbatchData.retweeted_status.source?a("span",{staticClass:"info-box"},[t._v("来自\n              "),a("label",{staticClass:"item-info",domProps:{innerHTML:t._s(t.showbatchData.retweeted_status.source)}})]):t._e()]),t._v(" "),a("el-row",{staticClass:"item-footer",attrs:{type:"flex"}},[a("el-col",{staticClass:"footer-list"},[a("i",{staticClass:"el-icon-news hidden-xs-only"}),t._v(" "),a("label",[t._v("转发 ")]),t._v(" "),a("span",[t._v(t._s(t._formatNum(t.showbatchData.retweeted_status.reposts_count)))])]),t._v(" "),a("el-col",{staticClass:"footer-list"},[a("i",{staticClass:"el-icon-message hidden-xs-only"}),t._v(" "),a("label",[t._v("评论 ")]),t._v(" "),a("span",[t._v(t._s(t._formatNum(t.showbatchData.retweeted_status.comments_count)))])]),t._v(" "),a("el-col",{staticClass:"footer-list",staticStyle:{border:"0"}},[a("i",{staticClass:"el-icon-star-off hidden-xs-only"}),t._v(" "),a("label",[t._v("点赞 ")]),t._v(" "),a("span",[t._v(t._s(t._formatNum(t.showbatchData.retweeted_status.attitudes_count)))])])],1)],1)],1):t._e(),t._v(" "),t.videoStatus.source?a("el-row",{staticClass:"video-wrapper"},[t.videoSrc?t._e():a("span",{staticClass:"play-btn",on:{click:function(e){t.togglePlay(t.showbatchData.id)}}},[a("i",{staticClass:"el-icon-caret-right play-btn-icon"})]),t._v(" "),a("video",{attrs:{poster:t.posterSrc,controls:t.controls,src:t.videoSrc,autoplay:""}},[t._v("您的浏览器不支持HTML5")])]):t._e()],1):t._e(),t._v(" "),a("el-row",{staticClass:"item-footer",attrs:{type:"flex"}},[a("el-col",{staticClass:"footer-list"},[a("label",[t._v("曝光 ")]),t._v(" "),a("span",[t._v(t._s(t._formatNum(t.item.expo)))])]),t._v(" "),a("el-col",{staticClass:"footer-list"},[a("label",[t._v("点击率 ")]),t._v(" "),a("span",[t._v(t._s(t._formatNum(t.item.ctr)))])]),t._v(" "),a("el-col",{staticClass:"footer-list"},[a("label",[t._v("互动率 ")]),t._v(" "),a("span",[t._v(t._s(t._formatNum(t.item.itr)))])]),t._v(" "),a("el-col",{staticClass:"footer-list",staticStyle:{border:"0"}},[a("label",[t._v("时长 ")]),t._v(" "),a("span",[t._v(t._s(t._formatNum(t.item.dur)))])])],1)],1)],1):t._e()},staticRenderFns:[]};var _=a("VU/8")(d,h,!1,function(t){a("s/Ar")},"data-v-e1c235e2",null).exports,m=a("bzuE"),v=a("zL8q"),u={name:"material",components:{Auth:l.a,ItemList:_},data:function(){return{FeatureAPI:m.a,category:m.b,province:m.c,formInline:{view:"tag",data:"",sort:"click",page:1,count:10},total:0,tagid:"1042015:newTagCategory_001",age:"70s",sex:"m",cityLevel:"1",provinceid:"1042015:province_11",sortMap:{click:"点击率",inter:"互动率",dur:"时长"},viewMap:{tag:"匹配标签头部物料",born_gender:"匹配人群头部物料",city_level:"匹配城市头部物料",province:"匹配省份头部物料",all:"全局头部物料"},ageMap:{"70s":"70s","80s":"80s","90s":"90s","00s":"00s",other:"其他"},sexMap:{m:"男",f:"女",o:"其他"},cityLevelMap:{1:"1线",2:"2线",3:"3线",4:"4线"},datalist:null}},computed:o()({},Object(n.b)(["pageAuth"])),methods:{init:function(){1===this.pageAuth&&this.onSearch()},onSearch:function(){var t=this;if(this.formInline.data="","tag"===this.formInline.view){if(!this.tagid)return void Object(v.Message)({showClose:!0,message:"请选择一级领域！",type:"error",duration:3e3});this.formInline.data=this.tagid}else if("born_gender"===this.formInline.view)this.formInline.data=this.age+"_"+this.sex;else if("city_level"===this.formInline.view)this.formInline.data=this.cityLevel;else if("province"===this.formInline.view){if(!this.provinceid)return void Object(v.Message)({showClose:!0,message:"请选择省份！",type:"error",duration:3e3});this.formInline.data=this.provinceid}var e={url:m.a.getMaterialInfo,param:this.formInline},a={data:i()(e),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e.code&&200==Number(e.code)?(Object(v.Message)({showClose:!0,message:"success",type:"success",duration:1e3}),t.datalist=!(!e.data||!e.data.data)&&e.data.data,t.total=e.data&&e.data.total&&t.datalist&&t.datalist.length>0?e.data.total:0):Object(v.Message)({showClose:!0,message:e.msg||"数据请求失败！",type:"error",duration:3e3})})},handleSizeChange:function(t){this.formInline.count=t,this.onSearch()},handleCurrentChange:function(t){this.formInline.page=t,this.onSearch()}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return 1===t.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("h6",{staticClass:"pane-title"},[t._v("重要特征直观可靠性")])]),t._v(" "),a("el-row",{staticClass:"search-form-wrap"},[a("el-form",{attrs:{inline:"",model:t.formInline,size:"small"}},[a("el-form-item",[a("el-radio-group",{on:{change:t.onSearch},model:{value:t.formInline.view,callback:function(e){t.$set(t.formInline,"view",e)},expression:"formInline.view"}},t._l(t.viewMap,function(e,s){return a("el-radio-button",{key:s,staticStyle:{"margin-left":"0"},attrs:{label:s}},[t._v(t._s(e))])}))],1),t._v(" "),"tag"===t.formInline.view?a("div",[a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择一级领域",filterable:"",clearable:""},on:{change:t.onSearch},model:{value:t.tagid,callback:function(e){t.tagid=e},expression:"tagid"}},t._l(t.category,function(t,e){return a("el-option",{key:e,attrs:{label:t,value:e}})})),t._v(" "),a("span",{staticClass:"info-tips"},[t._v("支持输入筛选一级领域")])],1)],1):t._e(),t._v(" "),"born_gender"===t.formInline.view?a("div",[a("el-form-item",{attrs:{label:"年龄："}},[a("el-radio-group",{on:{change:t.onSearch},model:{value:t.age,callback:function(e){t.age=e},expression:"age"}},t._l(t.ageMap,function(e,s){return a("el-radio",{key:s,staticStyle:{"margin-left":"0","margin-right":"5px","margin-bottom":"5px"},attrs:{border:"",label:s}},[t._v(t._s(e))])}))],1),t._v(" "),"born_gender"===t.formInline.view?a("el-form-item",{attrs:{label:"性别："}},[a("el-radio-group",{on:{change:t.onSearch},model:{value:t.sex,callback:function(e){t.sex=e},expression:"sex"}},t._l(t.sexMap,function(e,s){return a("el-radio",{key:s,staticStyle:{"margin-left":"0","margin-right":"5px","margin-bottom":"5px"},attrs:{border:"",label:s}},[t._v(t._s(e))])}))],1):t._e()],1):t._e(),t._v(" "),"city_level"===t.formInline.view?a("div",[a("el-form-item",{attrs:{label:"城市等级："}},[a("el-radio-group",{on:{change:t.onSearch},model:{value:t.cityLevel,callback:function(e){t.cityLevel=e},expression:"cityLevel"}},t._l(t.cityLevelMap,function(e,s){return a("el-radio",{key:s,staticStyle:{"margin-left":"0","margin-right":"5px","margin-bottom":"5px"},attrs:{border:"",label:s}},[t._v(t._s(e))])}))],1)],1):t._e(),t._v(" "),"province"===t.formInline.view?a("div",[a("el-form-item",[a("el-select",{attrs:{placeholder:"请选择中国省份",filterable:"",clearable:""},on:{change:t.onSearch},model:{value:t.provinceid,callback:function(e){t.provinceid=e},expression:"provinceid"}},t._l(t.province,function(t,e){return a("el-option",{key:e,attrs:{label:t,value:e}})})),t._v(" "),a("span",{staticClass:"info-tips"},[t._v("支持输入筛选省份名称")])],1)],1):t._e(),t._v(" "),a("div",[a("el-form-item",{attrs:{label:"排序方式："}},[a("el-radio-group",{on:{change:t.onSearch},model:{value:t.formInline.sort,callback:function(e){t.$set(t.formInline,"sort",e)},expression:"formInline.sort"}},t._l(t.sortMap,function(e,s){return a("el-radio",{key:s,staticStyle:{"margin-left":"0","margin-right":"5px","margin-bottom":"5px"},attrs:{border:"",label:s}},[t._v(t._s(e))])}))],1)],1)],1)],1),t._v(" "),a("el-row",{staticClass:"content-box-wrap"},[t.datalist&&t.datalist.length>0?a("div",t._l(t.datalist,function(e,s){return a("item-list",{key:e.mid,attrs:{item:e,index:(t.formInline.page-1)*t.formInline.count+s+1}})})):a("p",{staticClass:"none-tips"},[t._v("暂无数据")]),t._v(" "),a("div",{staticClass:"page-wrap"},[a("el-pagination",{attrs:{"current-page":t.formInline.page,"page-sizes":[5,10,15,20],"page-size":t.formInline.count,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])],1):0===t.pageAuth?a("el-main",[a("auth")],1):t._e()},staticRenderFns:[]};var f=a("VU/8")(u,p,!1,function(t){a("xNQR")},"data-v-2a3c4e03",null);e.default=f.exports},xNQR:function(t,e){}});