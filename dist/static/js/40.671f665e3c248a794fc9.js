webpackJsonp([40],{"3IMk":function(t,e){},fYJV:function(t,e){},mYqB:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("mvHQ"),a=s.n(i),l=s("Dd8w"),n=s.n(l),o=s("vzON"),r=s("NYxO"),c=s("0xDb"),m={name:"itemList",props:["item","index"],data:function(){return{loading:!1,videoSrc:"",controls:!1}},computed:n()({},Object(r.b)(["curvideo","email"])),methods:{init:function(){},togglePlay:function(){this.$store.dispatch("updateVideo",this.item.mid),this.videoSrc||(this.setVideoSrc(),this.controls=!0)},setVideoSrc:function(){var t=this,e={url:"/lab/showbatch",params:{ids:this.item.retweeted_status.mid,cip:230}};this.$store.dispatch("CommonGet",e).then(function(e){try{t.videoSrc=e[0].url_objects[0].object.object.stream.url}catch(e){t.videoSrc=t.item.retweeted_status.video_urls[0]}t.controls=!0})},_formatNum:function(t){return Object(c.b)(t)},_parsePercent:function(t,e){return Object(c.d)(t,e)},_parseTime:function(t,e){return Object(c.e)(t,e)}},created:function(){this.init()},watch:{item:function(){this.init()},index:function(){},curvideo:function(){this.curvideo!=this.item.mid&&(this.videoSrc="",this.controls=!1)},email:function(){}}},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-row",[s("el-col",{staticClass:"item-wrapper",attrs:{xs:24,sm:23,md:23,lg:23,xl:23}},[s("el-row",[s("div",{staticClass:"item-status-box clearfix"},[s("span",[t._v("NO."+t._s(t.index))])])]),t._v(" "),s("el-row",{staticClass:"clearfix"},[s("div",{staticClass:"left"},[s("a",{staticClass:"item-avatar",attrs:{target:"_blank",href:"//weibo.com/u/"+t.item.uid,title:"跳转微博主页"}},[s("img",{attrs:{src:t.item.profile_image_url}})])]),t._v(" "),s("div",{staticClass:"left",staticStyle:{padding:"10px"}},[s("el-row",[s("a",{staticClass:"item-name",attrs:{href:"//weibo.com/u/"+t.item.uid,target:"_blank",title:"跳转微博主页"}},[t._v(t._s(t.item.screen_name))])]),t._v(" "),s("el-row",{staticStyle:{"margin-top":"10px"},attrs:{type:"flex"}},[t.item.created_at?s("span",{staticClass:"item-info",attrs:{title:"查看微博详情"}},[s("i",{staticClass:"el-icon-time"}),t._v(" "),s("a",{attrs:{href:t.item.link||"javascript:void(0)",target:"_blank"}},[t._v(t._s(t._parseTime(t.item.created_at,"{y}年{m}月{d}日 {h}:{i}:{s}")))])]):t._e(),t._v(" "),t.item.source?s("span",{staticClass:"info-box"},[t._v("来自\n            "),s("label",{staticClass:"item-info",domProps:{innerHTML:t._s(t.item.source)}})]):t._e()])],1)]),t._v(" "),s("el-row",{staticClass:"content-text"},[s("a",{attrs:{href:t.item.link||"javascript:void(0)",target:"_blank",title:"查看微博详情"}},[t._v(t._s(t.item.text))])]),t._v(" "),t.item.pic_ids&&t.item.pic_ids.length>0?s("el-row",{staticClass:"img-wrapper"},[s("el-col",{attrs:{xs:24,span:12}},[s("el-row",t._l(t.item.pic_ids,function(e,i){return s("el-col",{key:i,staticStyle:{margin:"2px"},attrs:{span:7}},[s("div",{staticClass:"img-box"},[s("div",{staticClass:"bg-img",style:"background-image: url(//ww2.sinaimg.cn/bmiddle/"+e+".jpg);"},[t._v(t._s(e?"":"图片加载失败"))])])])}))],1)],1):t._e(),t._v(" "),t.item.retweeted_status?s("el-row",{staticClass:"retweeted-box"},[s("el-col",[s("div",[s("a",{staticClass:"item-name",attrs:{href:"//weibo.com/u/"+t.item.retweeted_status.user.id,target:"_blank"}},[t._v("@"+t._s(t.item.retweeted_status.user.screen_name))])]),t._v(" "),s("el-row",{staticClass:"content-text"},[s("a",{attrs:{href:t.item.link||"javascript:void(0)",target:"_blank",title:"查看微博详情"}},[t._v(t._s(t.item.retweeted_status.text))])]),t._v(" "),t.item.retweeted_status.pic_ids&&t.item.retweeted_status.pic_ids.length>0?s("el-row",{staticClass:"img-wrapper"},[s("el-col",{attrs:{xs:24,span:12}},[s("el-row",t._l(t.item.retweeted_status.pic_ids,function(e,i){return s("el-col",{key:i,staticStyle:{margin:"2px","max-width":"110px"},attrs:{span:7}},[s("div",{staticClass:"img-box"},[s("div",{staticClass:"bg-img",style:"background-image: url(//ww2.sinaimg.cn/bmiddle/"+e+".jpg);"},[t._v(t._s(e?"":"图片加载失败"))])])])}))],1)],1):t._e(),t._v(" "),t.item.retweeted_status.video_pic_urls&&t.item.retweeted_status.video_pic_urls.length>0?s("el-row",{staticClass:"video-wrapper"},[t.videoSrc?t._e():s("span",{staticClass:"play-btn",on:{click:function(e){t.togglePlay()}}},[s("i",{staticClass:"el-icon-caret-right play-btn-icon"})]),t._v(" "),s("video",{attrs:{id:"video"+t.item.mid,poster:t.item.retweeted_status.video_pic_urls[0],controls:t.controls,src:t.videoSrc,autoplay:""}},[t._v("您的浏览器不支持HTML5")])]):t._e(),t._v(" "),s("el-row",{staticStyle:{"margin-top":"10px"}},[s("span",{staticClass:"item-info",attrs:{title:"查看微博详情"}},[s("i",{staticClass:"el-icon-time"}),t._v(" "),s("a",{attrs:{href:t.item.link||"javascript:void(0)",target:"_blank"}},[t._v(t._s(t._parseTime(t.item.retweeted_status.created_at,"{y}年{m}月{d}日 {h}:{i}:{s}")))])]),t._v(" "),t.item.retweeted_status.source?s("span",{staticClass:"info-box"},[t._v("来自\n            "),s("label",{staticClass:"item-info",domProps:{innerHTML:t._s(t.item.retweeted_status.source)}})]):t._e()]),t._v(" "),s("el-row",{staticClass:"item-footer",attrs:{type:"flex"}},[s("el-col",{staticClass:"footer-list"},[s("i",{staticClass:"el-icon-news hidden-xs-only"}),t._v(" "),s("label",[t._v("转发 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.retweeted_status.reposts_count)))])]),t._v(" "),s("el-col",{staticClass:"footer-list"},[s("i",{staticClass:"el-icon-message hidden-xs-only"}),t._v(" "),s("label",[t._v("评论 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.retweeted_status.comments_count)))])]),t._v(" "),s("el-col",{staticClass:"footer-list",staticStyle:{border:"0"}},[s("i",{staticClass:"el-icon-star-off hidden-xs-only"}),t._v(" "),s("label",[t._v("点赞 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.retweeted_status.attitudes_count)))])])],1)],1)],1):t._e(),t._v(" "),s("el-row",{staticClass:"item-footer",attrs:{type:"flex"}},[s("el-col",{staticClass:"footer-list"},[s("i",{staticClass:"el-icon-phone-outline hidden-xs-only"}),t._v(" "),s("label",[t._v("热度 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.hot_num)))])]),t._v(" "),s("el-col",{staticClass:"footer-list"},[s("i",{staticClass:"el-icon-view hidden-xs-only"}),t._v(" "),s("label",[t._v("曝光 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.expo)))])]),t._v(" "),s("el-col",{staticClass:"footer-list"},[s("i",{staticClass:"el-icon-edit hidden-xs-only"}),t._v(" "),s("label",[t._v("点击 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.click_num)))])]),t._v(" "),s("el-col",{staticClass:"footer-list",staticStyle:{border:"0"}},[s("i",{staticClass:"el-icon-edit-outline hidden-xs-only"}),t._v(" "),s("label",[t._v("点击率 ")]),t._v(" "),s("span",[t._v(t._s(t._parsePercent(t.item.click_rate)))])])],1)],1)],1)},staticRenderFns:[]};var d=s("VU/8")(m,_,!1,function(t){s("fYJV")},"data-v-2640834e",null).exports,u=s("zL8q"),p={name:"tagPage",components:{Auth:o.a,ItemList:d},data:function(){return{dataList:null,way:"mid",content:"",formInline:{mid:"",uid:"",user_type:"",sort_type:"",page:1,count:5},total:0,tips:"loading…"}},computed:n()({},Object(r.b)(["pageAuth"])),methods:{init:function(){1===this.pageAuth&&this.onSearch()},onSearch:function(){var t=this;this.formInline[this.way]=this.content;var e={url:"http://10.85.115.126:6088/query_repeat_mid",param:this.formInline},s={data:a()(e),cip:230};this.$store.dispatch("ProxyGet",s).then(function(e){e.code&&200===Number(e.code)?(t.formInline.total=e.total_length||0,t.dataList=e.data||null,t.tips="暂无数据",Object(u.Message)({showClose:!0,message:"success",type:"success",duration:1e3})):(Object(u.Message)({showClose:!0,message:e&&e.msg||"转发物料获取失败",type:"error",duration:3e3}),t.tips="暂无数据")})},handleSizeChange:function(t){this.formInline.count=t,this.$store.dispatch("updateVideo",""),this.onSearch()},handleCurrentChange:function(t){this.formInline.page=t,this.$store.dispatch("updateVideo",""),this.onSearch()}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return 1===t.pageAuth?s("el-main",[s("el-row",{staticClass:"pane-title-wrap"},[s("h6",{staticClass:"pane-title"},[s("i",{staticClass:"el-icon-news hidden-xs-only",staticStyle:{"margin-right":"6px"}}),t._v("转发物料")])]),t._v(" "),s("el-row",{staticClass:"search-form-wrap"},[s("el-form",{attrs:{inline:"",size:"small"}},[s("el-form-item",{attrs:{label:"F层级"}},[s("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择F层级",size:"small"},model:{value:t.formInline.user_type,callback:function(e){t.$set(t.formInline,"user_type",e)},expression:"formInline.user_type"}},[s("el-option",{attrs:{label:"全部",value:""}}),t._v(" "),s("el-option",{attrs:{label:"F0转发",value:"0"}}),t._v(" "),s("el-option",{attrs:{label:"F1转发",value:"1"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"排序方式"}},[s("el-select",{staticStyle:{width:"140px"},attrs:{placeholder:"请选择排序方式",size:"small",clearable:""},model:{value:t.formInline.sort_type,callback:function(e){t.$set(t.formInline,"sort_type",e)},expression:"formInline.sort_type"}},[s("el-option",{attrs:{label:"曝光值",value:"expo"}}),t._v(" "),s("el-option",{attrs:{label:"点击值",value:"click_num"}}),t._v(" "),s("el-option",{attrs:{label:"点击率",value:"click_rate"}}),t._v(" "),s("el-option",{attrs:{label:"热度值",value:"hot_num"}})],1)],1),t._v(" "),s("el-form-item",{attrs:{label:"搜索方式"}},[s("el-select",{staticStyle:{width:"70px"},attrs:{placeholder:"请选择",size:"small"},model:{value:t.way,callback:function(e){t.way=e},expression:"way"}},[s("el-option",{attrs:{label:"mid",value:"mid"}}),t._v(" "),s("el-option",{attrs:{label:"uid",value:"uid"}})],1)],1),t._v(" "),s("el-form-item",[s("el-input",{staticStyle:{width:"100%","max-width":"320px"},attrs:{placeholder:"请输入"+t.way,clearable:"",size:"small"},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),t._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary",icon:"el-icon-search",size:"small"},on:{click:t.onSearch}},[s("span",{staticClass:"hidden-xs-only"},[t._v("查询")])])],1)],1)],1),t._v(" "),s("el-row",{staticClass:"content-box-wrap"},[t.dataList&&t.dataList.length>0?s("div",t._l(t.dataList,function(e,i){return s("item-list",{key:(t.formInline.page-1)*t.formInline.count+i+1,attrs:{item:e,index:(t.formInline.page-1)*t.formInline.count+i+1}})})):s("div",{staticClass:"none-tips"},[t._v(t._s(t.tips))]),t._v(" "),s("div",{staticStyle:{"padding-top":"10px",overflow:"auto"}},[s("el-pagination",{attrs:{"current-page":t.formInline.page,"page-sizes":[5,10,20,30,40],"page-size":t.formInline.count,layout:"total, sizes, prev, pager, next, jumper",total:t.formInline.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])],1):0===t.pageAuth?s("el-main",[s("auth")],1):t._e()},staticRenderFns:[]};var h=s("VU/8")(p,v,!1,function(t){s("3IMk")},"data-v-646ab128",null);e.default=h.exports}});