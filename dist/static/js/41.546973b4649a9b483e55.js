webpackJsonp([41],{eAVq:function(t,e){},eez4:function(t,e){},rX7e:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("Dd8w"),i=s.n(a),l=s("NYxO"),r=s("0xDb"),o={name:"itemList",props:["item","index"],data:function(){return{hasRetweetedVideo:!1,videoStatus:{source:!1,retweet:!1},videoTempSrc:"",videoSrc:"",posterSrc:"",controls:!1}},computed:i()({},Object(l.b)(["curvideo"])),methods:{init:function(){try{this.item.showbatch.retweeted_status?this.setVideoInfo(this.item.showbatch.retweeted_status.url_objects,"retweet"):this.setVideoInfo(this.item.showbatch.url_objects,"source")}catch(t){this.videoStatus.source=!1,this.videoStatus.retweet=!1}},setVideoInfo:function(t,e){try{for(var s=0;s<t.length;s++){var a=t[s].object&&t[s].object.object||{};if(this.posterSrc=a.image.url,"video"===a.object_type){if(a.urls)return this.videoTempSrc=a.urls.mp4_hd_mp4||a.urls.mp4_ld_mp4,void(this.videoStatus[e]=!0);if(a.stream&&"mp4"===a.stream.format)return this.videoTempSrc=a.stream.url,void(this.videoStatus[e]=!0)}else if("story"===a.object_type&&(this.videoTempSrc=a.slide_cover&&a.slide_cover.slide_videos&&a.slide_cover.slide_videos[0]&&a.slide_cover.slide_videos[0].url?a.slide_cover.slide_videos[0].url:"",this.videoTempSrc))return void(this.videoStatus[e]=!0)}}catch(t){this.videoStatus[e]=!1}},togglePlay:function(t){this.$store.dispatch("updateVideo",t),this.videoSrc||(this.videoSrc=this.videoTempSrc,this.controls=!0)},_formatNum:function(t){return Object(r.b)(t)},_parsePercent:function(t,e){return Object(r.d)(t,e)},_parseTime:function(t,e){return Object(r.e)(t,e)}},created:function(){this.init()},watch:{item:function(){this.init()},index:function(){},curvideo:function(){var t=this.item&&this.item.showbatch&&this.item.showbatch.id||0;this.curvideo!=t&&(this.videoSrc="",this.controls=!1)}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.item?s("el-row",[t.item.showbatch?s("el-col",{staticClass:"item-wrapper",attrs:{xs:24,sm:23,md:23,lg:23,xl:23}},[s("el-row",[s("div",{staticClass:"item-status-box clearfix"},[s("span",[t._v("NO."+t._s(t.index))]),t._v(" "),s("span",{staticClass:"item-status-mid"},[t._v(t._s(t.item.id))]),t._v(" "),s("span",[t._v(t._s(t.item.recommend_title))])])]),t._v(" "),t.item.showbatch.user?s("el-row",{staticClass:"clearfix"},[s("div",{staticClass:"left"},[s("a",{staticClass:"item-avatar",attrs:{target:"_blank",href:"//weibo.com/u/"+t.item.showbatch.user.id,title:"跳转微博主页"}},[s("img",{attrs:{src:t.item.showbatch.user.profile_image_url}})])]),t._v(" "),s("div",{staticClass:"left",staticStyle:{padding:"10px"}},[s("el-row",[s("a",{staticClass:"item-name",attrs:{href:"//weibo.com/u/"+t.item.showbatch.user.id,target:"_blank",title:"跳转微博主页"}},[t._v(t._s(t.item.showbatch.user.screen_name))])]),t._v(" "),s("el-row",{staticStyle:{"margin-top":"10px"},attrs:{type:"flex"}},[s("span",{staticClass:"item-info",attrs:{title:"查看微博详情"}},[s("i",{staticClass:"el-icon-time"}),t._v(" "),s("a",{attrs:{href:t.item.showbatch.link||"javascript:void(0)",target:"_blank"}},[t._v(t._s(t._parseTime(t.item.showbatch.created_at)))])]),t._v(" "),t.item.showbatch.source?s("span",{staticClass:"info-box"},[t._v("来自\n            "),s("label",{staticClass:"item-info",domProps:{innerHTML:t._s(t.item.showbatch.source)}})]):t._e()])],1)]):t._e(),t._v(" "),s("el-row",{staticClass:"content-text"},[s("a",{attrs:{href:t.item.showbatch.link||"javascript:void(0)",target:"_blank",title:"查看微博详情"}},[t._v(t._s(t.item.showbatch.text))])]),t._v(" "),t.item.showbatch.pic_ids&&t.item.showbatch.pic_ids.length>0?s("el-row",{staticClass:"img-wrapper"},[s("el-col",{attrs:{xs:24}},[s("el-row",t._l(t.item.showbatch.pic_ids,function(e,a){return s("el-col",{key:a,staticStyle:{margin:"2px","max-width":"110px"},attrs:{xs:7}},[s("a",{staticClass:"img-box",attrs:{href:"//wx1.sinaimg.cn/nmw690/"+e+".jpg",target:"_blank"}},[s("div",{staticClass:"bg-img",style:"background-image: url(//ww2.sinaimg.cn/bmiddle/"+e+".jpg);"},[t._v(t._s(e?"":"图片加载失败"))])])])}))],1)],1):t._e(),t._v(" "),t.item.showbatch.retweeted_status?s("el-row",{staticClass:"retweeted-box"},[s("el-col",[s("div",[s("a",{staticClass:"item-name",attrs:{href:"//weibo.com/u/"+t.item.showbatch.retweeted_status.user.id,target:"_blank"}},[t._v("@"+t._s(t.item.showbatch.retweeted_status.user.screen_name))])]),t._v(" "),s("el-row",{staticClass:"content-text"},[s("a",{attrs:{href:"//m.weibo.cn/status/"+t.item.showbatch.retweeted_status.mid,target:"_blank",title:"查看微博详情"}},[t._v(t._s(t.item.showbatch.retweeted_status.text))])]),t._v(" "),t.item.showbatch.retweeted_status.pic_ids&&t.item.showbatch.retweeted_status.pic_ids.length>0?s("el-row",{staticClass:"img-wrapper"},[s("el-col",{attrs:{xs:24,span:12}},[s("el-row",t._l(t.item.showbatch.retweeted_status.pic_ids,function(e,a){return s("el-col",{key:a,staticStyle:{margin:"2px","max-width":"110px"},attrs:{span:7}},[s("a",{staticClass:"img-box",attrs:{href:"//wx1.sinaimg.cn/nmw690/"+e+".jpg",target:"_blank"}},[s("div",{staticClass:"bg-img",style:"background-image: url(//ww2.sinaimg.cn/bmiddle/"+e+".jpg);"},[t._v(t._s(e?"":"图片加载失败"))])])])}))],1)],1):t._e(),t._v(" "),t.videoStatus.retweet?s("el-row",{staticClass:"video-wrapper"},[t.videoSrc?t._e():s("span",{staticClass:"play-btn",on:{click:function(e){t.togglePlay(t.item.showbatch.retweeted_status.mid)}}},[s("i",{staticClass:"el-icon-caret-right play-btn-icon"})]),t._v(" "),s("video",{attrs:{poster:t.posterSrc,controls:t.controls,src:t.videoSrc,autoplay:""}},[t._v("您的浏览器不支持HTML5")])]):t._e(),t._v(" "),s("el-row",{staticStyle:{"margin-top":"10px"}},[s("span",{staticClass:"item-info",attrs:{title:"查看微博详情"}},[s("i",{staticClass:"el-icon-time"}),t._v(" "),s("a",{attrs:{href:"//m.weibo.cn/status/"+t.item.showbatch.retweeted_status.mid,target:"_blank"}},[t._v(t._s(t._parseTime(t.item.showbatch.retweeted_status.created_at,"{y}年{m}月{d}日 {h}:{i}:{s}")))])]),t._v(" "),t.item.showbatch.retweeted_status.source?s("span",{staticClass:"info-box"},[t._v("来自\n            "),s("label",{staticClass:"item-info",domProps:{innerHTML:t._s(t.item.showbatch.retweeted_status.source)}})]):t._e()]),t._v(" "),s("el-row",{staticClass:"item-footer",attrs:{type:"flex"}},[s("el-col",{staticClass:"footer-list"},[s("i",{staticClass:"el-icon-news hidden-xs-only"}),t._v(" "),s("label",[t._v("转发 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.showbatch.retweeted_status.reposts_count)))])]),t._v(" "),s("el-col",{staticClass:"footer-list"},[s("i",{staticClass:"el-icon-message hidden-xs-only"}),t._v(" "),s("label",[t._v("评论 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.showbatch.retweeted_status.comments_count)))])]),t._v(" "),s("el-col",{staticClass:"footer-list",staticStyle:{border:"0"}},[s("i",{staticClass:"el-icon-star-off hidden-xs-only"}),t._v(" "),s("label",[t._v("点赞 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.showbatch.retweeted_status.attitudes_count)))])])],1)],1)],1):t._e(),t._v(" "),t.videoStatus.source?s("el-row",{staticClass:"video-wrapper"},[t.videoSrc?t._e():s("span",{staticClass:"play-btn",on:{click:function(e){t.togglePlay(t.item.showbatch.id)}}},[s("i",{staticClass:"el-icon-caret-right play-btn-icon"})]),t._v(" "),s("video",{attrs:{poster:t.posterSrc,controls:t.controls,src:t.videoSrc,autoplay:""}},[t._v("您的浏览器不支持HTML5")])]):t._e(),t._v(" "),t.item.tags_data?s("el-row",{staticClass:"item-tag-box"},[t.item.tags_data.first&&t.item.tags_data.first.length>0?s("span",t._l(t.item.tags_data.first,function(e,a){return s("el-tag",{key:a,staticClass:"item-tag",attrs:{size:"small"}},[t._v(t._s(e.name)+" (1)")])})):t._e(),t._v(" "),t.item.tags_data.second&&t.item.tags_data.second.length>0?s("span",t._l(t.item.tags_data.second,function(e,a){return s("el-tag",{key:a,staticClass:"item-tag",attrs:{type:"success",size:"small"}},[t._v(t._s(e.name)+" (2)")])})):t._e(),t._v(" "),t.item.tags_data.third&&t.item.tags_data.third.length>0?s("span",t._l(t.item.tags_data.third,function(e,a){return s("el-tag",{key:a,staticClass:"item-tag",attrs:{type:"warning",size:"small"}},[t._v(t._s(e.name)+" (3)")])})):t._e()]):t._e(),t._v(" "),t.item.stat?s("el-row",{staticClass:"item-footer",attrs:{type:"flex"}},[s("el-col",{attrs:{xs:24}},[s("el-row",[s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("曝光数 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.expose_num)))])]),t._v(" "),s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("点击数 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.act_num)))])]),t._v(" "),s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("热门流转 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.hot_ret_num)))])]),t._v(" "),s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("热门流评 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.hot_cmt_num)))])]),t._v(" "),s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("热门流赞 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.hot_like_num)))])]),t._v(" "),s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("热门流互动 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.inter_act_num)))])]),t._v(" "),s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("全站转 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.ret_num)))])]),t._v(" "),s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("全站评 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.cmt_num)))])]),t._v(" "),s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("全站赞 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.like_num)))])]),t._v(" "),s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("全站互动 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum((t.item.stat.ret_num||0)+(t.item.stat.cmt_num||0)+(t.item.stat.like_num||0))))])]),t._v(" "),s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("真实曝光 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.real_read_uv)))])]),t._v(" "),t.item.stat.real_read_uv?s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("人均阅读时长 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.real_read_duration_total/1e3/t.item.stat.real_read_uv)))])]):t._e(),t._v(" "),t.item.stat.expose_num?s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("点击率 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.act_num/t.item.stat.expose_num)))])]):t._e(),t._v(" "),t.item.stat.expose_num?s("el-col",{staticClass:"footer-list multiple-list",attrs:{xs:7}},[s("label",[t._v("互动率 ")]),s("br"),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.stat.inter_act_num/t.item.stat.expose_num)))])]):t._e()],1)],1)],1):t._e(),t._v(" "),t.item.debuginfo?s("el-row",{staticClass:"item-footer",attrs:{type:"flex"}},[s("el-col",{staticClass:"footer-list"},[s("label",[t._v("ctr模型预估分数 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.debuginfo.predict_ctr)))])]),t._v(" "),s("el-col",{staticClass:"footer-list"},[s("label",[t._v("itr模型预估分数 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.debuginfo.predict_itr)))])]),t._v(" "),s("el-col",{staticClass:"footer-list"},[s("label",[t._v("time模型预估分数 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.debuginfo.predict_time)))])]),t._v(" "),s("el-col",{staticClass:"footer-list",staticStyle:{border:"0"}},[s("label",[t._v("最终模型预估分数 ")]),t._v(" "),s("span",[t._v(t._s(t._formatNum(t.item.debuginfo.predict_final)))])])],1):t._e()],1):t._e()],1):t._e()},staticRenderFns:[]};var _=s("VU/8")(o,c,!1,function(t){s("eAVq")},"data-v-284167ca",null).exports,n=s("zL8q"),m={name:"freshreview",components:{ItemList:_},data:function(){return{formInline:{url:""},datalist:null,tips:"暂无数据"}},methods:{onSearch:function(){var t=this;this.tips="Loading···";var e=new URLSearchParams;e.append("url",this.formInline.url),e.append("cip",230);var s={url:"/dataview/darwinView",params:e};this.$store.dispatch("CommonPost",s).then(function(e){e.code&&200==Number(e.code)?(Object(n.Message)({showClose:!0,message:"success",type:"success",duration:1e3}),t.datalist=e.result&&e.result.results||"",t.tips=t.datalist?"":"暂无数据"):(Object(n.Message)({showClose:!0,message:e.msg||"数据获取失败！",type:"error",duration:3e3}),t.datalist="",t.tips="暂无数据")},function(e){Object(n.Message)({showClose:!0,message:"数据获取接口请求失败！",type:"error",duration:3e3}),t.datalist="",t.tips="暂无数据"})},_formatNum:function(t){return Object(r.b)(t)},_parsePercent:function(t){return Object(r.d)(t)},_parseTime:function(t,e){return Object(r.e)(t,e)}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-main",[s("el-row",{staticClass:"pane-title-wrap"},[s("h6",{staticClass:"pane-title"},[s("i",{staticClass:"el-icon-news hidden-xs-only",staticStyle:{"margin-right":"6px"}}),t._v("达尔文推荐系统")])]),t._v(" "),s("el-row",{staticClass:"search-form-wrap"},[s("el-form",{attrs:{model:t.formInline,size:"small"}},[s("el-form-item",[s("el-input",{attrs:{autosize:"",type:"textarea",placeholder:"请输入",clearable:""},model:{value:t.formInline.url,callback:function(e){t.$set(t.formInline,"url","string"==typeof e?e.trim():e)},expression:"formInline.url"}})],1),t._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.onSearch}},[s("span",{staticClass:"hidden-xs-only"},[t._v("查询")])])],1)],1)],1),t._v(" "),t.datalist&&t.datalist.length>0?s("el-row",{staticClass:"content-box-wrap"},t._l(t.datalist,function(t,e){return s("item-list",{key:t.id,attrs:{item:t,index:e+1}})})):s("el-row",{staticStyle:{padding:"10px","text-align":"center",color:"#ccc"}},[t._v(t._s(t.tips))])],1)},staticRenderFns:[]};var d=s("VU/8")(m,u,!1,function(t){s("eez4")},"data-v-19a74120",null);e.default=d.exports}});