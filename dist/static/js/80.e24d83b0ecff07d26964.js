webpackJsonp([80],{IgMu:function(t,a){},ptS7:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("Dd8w"),s=e.n(i),r=e("vzON"),n=(e("zL8q"),e("NYxO")),l=e("0xDb"),o={name:"freshreviewDetail",components:{Auth:r.a},data:function(){return{formInline:null,dataList:[],midData:null,dataMap:{timestamp:"时间戳",serviceType:"",firstLevelInteWeight:"一级标签匹配度",infoFairExpoAppendType:"",likeNumRecent:"最近赞数",hotCmtNumRecent:"最近站内评论数",userDetailTags:"用户兴趣标签",groupId:"GroupID",cmtNumRecent:"最近评论数",errorCode:"",articleWeight:"长文权重",likeNum:"赞数",vid:"访客ID ",scenesHotwb:"",exposeNumRecent:"最近曝光数",exposureMidActTotal:"",exposeNum:"曝光数",respDictionaryStr:"",specialRecommend:"",mblogMiaopaiNum:"秒拍观看数",ctr:"CTR",interestWeight:"兴趣权重",thirdLevelInteWeight:"三级标签匹配度",objWeight:"",hotRetNum:"站内转发数",picWeight:"图片权重",recommendSourceDetail:"",domain:"",timeSpentMillis:"",actNum:"行为数",aid:"",hotLikeNum:"站内赞数",infoNegTagDetail:"负反馈信息",userWeight:"",hotCmtNum:"站内评论数",recommendSource:"推荐来源",hotRetNumRecent:"最近站内转发数",userDetailGender:"性别",recommendReason:"推荐原因",mid:"微博ID",secondLevelInteWeight:"二级标签匹配度",userDetailBorn:"年龄",uid:"登录用户ID",articleReadNum:"文章阅读数",totalReadNum:"微博阅读数",networkType:"网络状态",hotWeight:"热度权重",interActNum:"互动数",parameterType:"",interActNumRecent:"最近互动数",retNum:"转发数",miaopaiViewNum:"秒拍观看数",recommendSourceId:"推荐来源ID",authorId:"博主ID",errorMsg:"",hotLikeNumRecent:"最近站内赞数",actNumRecent:"最近行为数",retNumRecent:"最近赞数",areaId:"地域ID",videoWeight:"视频权重",informationHotTagDetail:"微博标签信息",cmtNum:"评论数",category:"推荐领域",effectWeight:"时效性",categoryId:"",count:""},tag_data:null}},computed:s()({},Object(n.b)(["pageAuth","email"])),methods:{init:function(){if(1===this.pageAuth){var t=this.$route.query,a=t.mid,e=t.intervals,i=t.uid;this.formInline={mid:a,intervals:e,uid:i},this.showbatch(a),this.onSearch()}},showbatch:function(t){var a=this,e={url:"/lab/showbatch",params:{ids:t,cip:230}};this.$store.dispatch("CommonGet",e).then(function(t){a.midData=t&&t[0]||""})},onSearch:function(){var t=this,a={url:"/dataview/exposureDetail",params:s()({},this.formInline,{cip:230})};this.$store.dispatch("CommonGet",a).then(function(a){a&&200==a.code&&(a.result&&t.annalyData(a.result),t.tag_data=a.tag_data||!1)})},annalyData:function(t){for(var a in t)this.dataList.push({name:a,desc:this.dataMap[a]||a,value:void 0==t[a]||""==t[a]?"暂无":t[a]})},_formatNum:function(t){return Object(l.b)(t)},_parseTime:function(t,a){return Object(l.e)(t,a)}},created:function(){this.init()},watch:{pageAuth:function(){this.init()},email:function(){}}},c={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return 1===t.pageAuth?e("el-main",[t.midData?e("div",{staticClass:"mid-wrapper"},[e("el-row",{staticClass:"clearfix"},[e("div",{staticClass:"left"},[e("a",{staticClass:"item-avatar",attrs:{target:"_blank",href:t.midData.user.id&&"//weibo.com/u/"+t.midData.user.id||"javascript:void(0)",title:"跳转微博主页"}},[e("img",{attrs:{src:t.midData.user.avatar_hd}})])]),t._v(" "),e("div",{staticClass:"left",staticStyle:{padding:"10px"}},[e("el-row",[e("a",{staticClass:"item-name",attrs:{href:t.midData.user.id&&"//weibo.com/u/"+t.midData.user.id||"javascript:void(0)",target:"_blank",title:"跳转微博主页"}},[t._v(t._s(t.midData.user.name||"未知"))])]),t._v(" "),e("el-row",{staticStyle:{"margin-top":"10px"},attrs:{type:"flex"}},[e("span",{staticClass:"item-info",attrs:{title:"查看微博详情"}},[e("i",{staticClass:"el-icon-time"}),t._v(" "),e("a",{attrs:{href:t.midData.link||"javascript:void(0)",target:"_blank"}},[t._v(t._s(t._parseTime(t.midData.created_at)))])]),t._v(" "),t.midData.source?e("span",{staticClass:"info-box"},[t._v("来自\n            "),e("label",{staticClass:"item-info",domProps:{innerHTML:t._s(t.midData.source)}})]):t._e()])],1)]),t._v(" "),e("el-row",{staticClass:"content-text"},[e("a",{attrs:{href:t.midData.link||"javascript:void(0)",target:"_blank",title:"查看微博详情"}},[t._v(t._s(t.midData.text))])]),t._v(" "),t.tag_data?e("el-row",{staticClass:"item-tag-box"},[t.tag_data.first&&t.tag_data.first.length>0?e("span",t._l(t.tag_data.first,function(a,i){return e("el-tag",{key:i,staticClass:"item-tag",attrs:{size:"small"}},[t._v(t._s(a.name)+" (1)")])})):t._e(),t._v(" "),t.tag_data.second&&t.tag_data.second.length>0?e("span",t._l(t.tag_data.second,function(a,i){return e("el-tag",{key:i,staticClass:"item-tag",attrs:{type:"success",size:"small"}},[t._v(t._s(a.name)+" (2)")])})):t._e(),t._v(" "),t.tag_data.third&&t.tag_data.third.length>0?e("span",t._l(t.tag_data.third,function(a,i){return e("el-tag",{key:i,staticClass:"item-tag",attrs:{type:"warning",size:"small"}},[t._v(t._s(a.name)+" (3)")])})):t._e()]):t._e(),t._v(" "),e("el-row",{staticClass:"item-footer",attrs:{type:"flex"}},[e("el-col",{staticClass:"footer-list"},[e("a",{attrs:{href:t.midData.link||"javascript:void(0)",target:"_blank"}},[e("i",{staticClass:"el-icon-phone-outline hidden-xs-only"}),t._v(" "),e("label",[t._v("点赞 ")]),t._v(" "),e("span",[t._v(t._s(t._formatNum(t.midData.attitudes_count)))])])]),t._v(" "),e("el-col",{staticClass:"footer-list"},[e("a",{attrs:{href:t.midData.link||"javascript:void(0)",target:"_blank"}},[e("i",{staticClass:"el-icon-news hidden-xs-only"}),t._v(" "),e("label",[t._v("转发 ")]),t._v(" "),e("span",[t._v(t._s(t._formatNum(t.midData.reposts_count)))])])]),t._v(" "),e("el-col",{staticClass:"footer-list",staticStyle:{border:"0"}},[e("a",{attrs:{href:t.midData.link||"javascript:void(0)",target:"_blank"}},[e("i",{staticClass:"el-icon-edit-outline hidden-xs-only"}),t._v(" "),e("label",[t._v("评论 ")]),t._v(" "),e("span",[t._v(t._s(t._formatNum(t.midData.comments_count)))])])])],1)],1):t._e(),t._v(" "),e("el-row",{staticClass:"table-wrapper"},[e("div",{staticClass:"data-list-title"},[t._v("模型特征")]),t._v(" "),e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.dataList,border:"",stripe:"",size:"small"}},[e("el-table-column",{attrs:{prop:"name",label:"特征名"}}),t._v(" "),e("el-table-column",{attrs:{prop:"desc",label:"特征含义"}}),t._v(" "),e("el-table-column",{attrs:{prop:"value",label:"特征值"}})],1)],1)],1):0===t.pageAuth?e("el-main",[e("auth")],1):t._e()},staticRenderFns:[]};var m=e("VU/8")(o,c,!1,function(t){e("IgMu")},"data-v-49c1036a",null);a.default=m.exports}});