webpackJsonp([16],{BUsK:function(e,t){},"C+fc":function(e,t){},"F+aQ":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("Dd8w"),l=a.n(i),s=a("vzON"),n=a("NYxO"),r=a("0xDb"),c=a("zL8q"),o=a("LzRH"),h={name:"minePage",components:{Auth:s.a,OperateChannel:o.a},data:function(){return{cname:"",formInline:{ckey:""},uid:"",priorityList:[]}},computed:l()({},Object(n.b)(["pageAuth","email","channelList","channelData","channelApi"])),methods:{init:function(){1===this.pageAuth&&this.setChannelList()},setChannelList:function(){var e={url:"/channel/getAuthChannelList",params:{username:this.email,cip:230}};this.$store.dispatch("SetChannelList",e)},onSearch:function(){var e=this.formInline.ckey.split(":"),t={url:"/channel/getDetailByCid",params:{cid:e[1],channel_history:e[0],username:this.email,cip:230}};this.$store.dispatch("GetChannelData",t)},_parseTime:function(e,t){return Object(r.e)(e,t)},toDetailPage:function(){this.uid?location.href="/hot/#/hotcenter/channel/material?cname="+this.channelData[0].channel_name+"&channelid="+this.channelData[0].channel_id+"&uid="+this.uid:Object(c.Message)({showClose:!0,message:"预览前，请先填写uid！",type:"error",duration:3e3})},formatExpiredTime:function(e){var t=Math.floor(e/86400),a=Math.round(e%86400/3600),i=t&&t+"天"||"",l=a&&a+"小时"||"";return i||l?i+l:"0小时"},getRankType:function(e){for(var t=e.split(","),a="",i="自定义排序 ctr序",l=0;l<t.length;l++)if(t[l].indexOf("rank_channel_")>-1){a=t[l];break}var s="rank_channel_split_by_hour_",n="rank_channel_time_segement_",r="rank_channel_tvshow_weekly_";if("rank_channel_by_time"===a)i="自定义排序 时间序";else if(a.indexOf(s)>-1)i="持续热点事件排序 "+a.split(s)[1]+"小时";else if(a.indexOf(n)>-1){var c=a.split(n)[1].split("_");this.rank_by_time=c,i="持续热度节目排序 "+c[0]+"-"+c[1]}else if(a.indexOf(r)>-1){var o=a.split(r)[1].split("_");this.rank_by_weekly_day=Number(o[0]),this.rank_by_weekly_time=o[1],i="周期性节目排序 星期"+this.numUpperCase(o[0])+" "+o[1]}return i},numUpperCase:function(e){var t="一";switch(Number(e)){case 1:t="一";break;case 2:t="二";break;case 3:t="三";break;case 4:t="四";break;case 5:t="五";break;case 6:t="六";break;case 7:t="日"}return t},setMaterialPriority:function(){this.priorityList=[],this.pushMaterial("channel_video_priority"),this.pushMaterial("channel_pic_priority"),this.pushMaterial("channel_article_priority")},pushMaterial:function(e){this.channelData[0].triggers.indexOf(e)>-1&&this.priorityList.push(e)},setUidPriority:function(e){for(var t=[],a=e.split(","),i=0;i<a.length;i++)a[i].indexOf("channel_uid_priority_")>-1&&t.push(a[i].split("channel_uid_priority_")[1]);return t.join("、")||"暂无"}},created:function(){this.init()},watch:{pageAuth:function(){this.init()},channelList:function(){this.channelList&&this.channelList[0]&&this.channelList[0].cid&&(this.formInline.ckey=this.channelList[0].channel_history+":"+this.channelList[0].cid,this.onSearch())},channelData:function(){this.channelData&&(this.cname=this.channelData[0].channel_name),this.setMaterialPriority()}}},_={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("el-col",{attrs:{span:24}},[a("h6",{staticClass:"pane-title"},[a("i",{staticClass:"el-icon-service hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("我的频道 "+e._s(e.cname))])])],1),e._v(" "),a("el-row",{staticClass:"content-box-wrap"},[e.channelList&&e.channelList.length>0?a("el-col",{attrs:{span:23}},[a("div",{staticClass:"clearfix"},[a("el-form",{staticClass:"left",attrs:{inline:"",model:e.formInline,size:"mini"}},[a("el-form-item",{attrs:{label:" 选择频道"}},[a("el-select",{attrs:{filterable:"",placeholder:"请选择频道"},on:{change:e.onSearch},model:{value:e.formInline.ckey,callback:function(t){e.$set(e.formInline,"ckey",t)},expression:"formInline.ckey"}},e._l(e.channelList,function(e,t){return a("el-option",{key:t,attrs:{label:e.channel_name,value:e.channel_history+":"+e.cid}})}))],1)],1),e._v(" "),e.channelData&&e.channelData[0]?a("operate-channel",{staticClass:"left",attrs:{data:e.channelData[0],callback:e.onSearch}}):e._e()],1),e._v(" "),e.channelData&&e.channelData[0]?a("div",[a("div",{staticClass:"item-box"},[a("label",[e._v("【频道名称】")]),e._v(" "),a("el-tag",[e._v(e._s(e.channelData[0].channel_name))])],1),e._v(" "),a("div",{staticClass:"item-box"},[a("label",[e._v("【繁体名称】")]),e._v(" "),a("el-tag",[e._v(e._s(e.channelData[0].channel_name_tw||"暂无"))])],1),e._v(" "),a("div",{staticClass:"item-box"},[a("label",[e._v("【英文名称】")]),e._v(" "),a("el-tag",[e._v(e._s(e.channelData[0].channel_name_us||"暂无"))])],1),e._v(" "),a("div",{staticClass:"item-box"},[a("label",[e._v("【频道属性】")]),e._v(" "),a("el-tag",{attrs:{type:"warning"}},[e._v(e._s(1===e.channelData[0].channel_history?"历史频道":"自定义频道"))])],1),e._v(" "),e.channelData[0].channel_type?a("div",{staticClass:"item-box"},[a("label",[e._v("【频道类型】")]),e._v(" "),a("el-tag",{attrs:{type:"success"}},[e._v(e._s(e.channelData[0].channel_type))])],1):e._e(),e._v(" "),e.channelData[0].stat_time?a("div",{staticClass:"item-box"},[a("label",[e._v("【运营时间】")]),e._v(" "),a("el-tag",{attrs:{type:"danger"}},[e._v(e._s(e._parseTime(e.channelData[0].stat_time,"{y}-{m}-{d}"))+" 到 "+e._s(e._parseTime(e.channelData[0].end_time,"{y}-{m}-{d}")))])],1):e._e(),e._v(" "),e.channelData[0].source?a("div",{staticClass:"item-box"},[a("label",[e._v("【内容来源】")]),e._v(" "),a("el-tag",[e._v(e._s(e.channelData[0].source))])],1):e._e(),e._v(" "),e.channelData[0].tag_id?a("div",{staticClass:"item-box"},[a("label",[e._v("【分类选择】")]),e._v(" "),a("el-tag",{attrs:{type:"warning"}},[e._v(e._s(e.channelData[0].tag_id))])],1):e._e(),e._v(" "),0===e.channelData[0].channel_history?a("div",[a("div",{staticClass:"item-box"},[a("label",[e._v("【物料库物料库物料有效期】")]),e._v(" "),a("el-tag",{attrs:{type:"warning"}},[e._v(e._s(e.formatExpiredTime(e.channelData[0].channel_expired_timestamp)))])],1),e._v(" "),a("div",{staticClass:"item-box"},[a("label",[e._v("【排序方式】")]),e._v(" "),a("el-tag",{attrs:{type:"info"}},[e._v(e._s(e.getRankType(e.channelData[0].triggers)))])],1),e._v(" "),a("div",{staticClass:"item-box clearfix"},[a("label",{staticClass:"left"},[e._v("【物料加权】")]),e._v(" "),a("el-checkbox-group",{staticClass:"left",attrs:{disabled:""},model:{value:e.priorityList,callback:function(t){e.priorityList=t},expression:"priorityList"}},[a("el-checkbox",{attrs:{label:"channel_video_priority"}},[e._v("视频")]),e._v(" "),a("el-checkbox",{attrs:{label:"channel_pic_priority"}},[e._v("图片")]),e._v(" "),a("el-checkbox",{attrs:{label:"channel_article_priority"}},[e._v("文章")])],1)],1),e._v(" "),a("div",{staticClass:"item-box"},[a("label",[e._v("【UID白名单加权】")]),e._v(" "),a("el-tag",{attrs:{type:"info"}},[e._v(e._s(e.setUidPriority(e.channelData[0].triggers)))])],1),e._v(" "),a("div",{staticClass:"item-box"},[a("label",[e._v("【是否放开物料分发限制】")]),e._v(" "),a("el-tag",{attrs:{type:"info"}},[e._v(e._s(e.channelData[0].triggers&&e.channelData[0].triggers.indexOf("cancel_limit")>-1?"是":"否"))])],1),e._v(" "),a("div",{staticClass:"item-box"},[a("label",[e._v("【不过物料基础门槛】")]),e._v(" "),a("el-tag",{attrs:{type:"info"}},[e._v(e._s(e.channelData[0].triggers&&e.channelData[0].triggers.indexOf("more_doc")>-1?"是":"否"))])],1),e._v(" "),a("div",{staticClass:"item-box"},[a("label",[e._v("【运营图标】")]),e._v(" "),a("el-form",{staticClass:"inner-form-box",attrs:{size:"mini",disabled:""}},[a("el-form-item",{attrs:{label:"配置个数"}},[a("el-tag",{attrs:{type:"info"}},[e._v(e._s(e.channelData[0].cardlist&&e.channelData[0].cardlist.length||0))])],1),e._v(" "),e.channelData[0].cardlist&&e.channelData[0].cardlist.length>0?a("div",e._l(e.channelData[0].cardlist,function(t,i){return a("el-form-item",{key:i,attrs:{label:"位置"+(i+1)}},[a("el-input",{staticStyle:{"max-width":"180px"},attrs:{placeholder:"图标底部对应文案"},model:{value:t.title_sub,callback:function(a){e.$set(t,"title_sub",a)},expression:"obj.title_sub"}}),e._v(" "),a("el-input",{staticStyle:{"max-width":"360px"},attrs:{placeholder:"图标地址",type:"textarea",autosize:""},model:{value:t.pic,callback:function(a){e.$set(t,"pic",a)},expression:"obj.pic"}}),e._v(" "),a("el-input",{staticStyle:{"max-width":"360px"},attrs:{placeholder:"链接跳转地址",type:"textarea",autosize:""},model:{value:t.scheme,callback:function(a){e.$set(t,"scheme",a)},expression:"obj.scheme"}})],1)})):e._e()],1)],1)]):e._e(),e._v(" "),e.channelData[0].channel_id?a("div",{staticClass:"item-box"},[a("label",[e._v("【频道 ID】")]),e._v(" "),a("el-tag",{attrs:{type:"success"}},[e._v(e._s(e.channelData[0].channel_id))])],1):e._e(),e._v(" "),0===e.channelData[0].channel_history&&e.channelData[0].channel_id?a("div",{staticClass:"item-box"},[a("label",[e._v("【在线预览】")]),e._v(" "),a("el-input",{staticStyle:{"max-width":"280px"},attrs:{placeholder:"请输入uid 再预览",clearable:""},model:{value:e.uid,callback:function(t){e.uid=t},expression:"uid"}},[a("el-button",{attrs:{slot:"append",type:"primary"},on:{click:function(t){e.toDetailPage()}},slot:"append"},[e._v("在线预览频道")])],1)],1):e._e()]):e._e()]):null==e.channelApi?a("el-col",{attrs:{span:23}},[e._v("\n      loading……\n    ")]):"response failed"==e.channelApi?a("el-col",{attrs:{span:23}},[a("el-alert",{attrs:{title:"网络请求异常，请重试~",type:"warning","show-icon":"",closable:!1}})],1):1==e.channelApi?a("el-col",{attrs:{span:23}},[a("el-alert",{attrs:{title:"暂无有权限的频道",type:"warning","show-icon":"",closable:!1}})],1):e._e()],1)],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var p=a("VU/8")(h,_,!1,function(e){a("BUsK")},"data-v-3d424497",null);t.default=p.exports},LzRH:function(e,t,a){"use strict";var i=a("mvHQ"),l=a.n(i),s=a("woOf"),n=a.n(s),r=a("Dd8w"),c=a.n(r),o=a("NYxO"),h=a("0xDb"),_=a("zL8q"),p={name:"operateWhite",data:function(){return{dialogVisible:!1,delBtnPopover:!1,updatePopover:!1,list:null,isAddCard:!1,cardNum:0,cardlist:[{title_sub:"",pic:"",scheme:""},{title_sub:"",pic:"",scheme:""},{title_sub:"",pic:"",scheme:""},{title_sub:"",pic:"",scheme:""}],cancel_limit:"",more_doc:"",triggerList:[],channel_expired_day:0,channel_expired_hour:0,rankType:1,rank_default:"",rank_by_hour:1,rank_by_time:["00:00","23:59"],rank_by_weekly_day:1,rank_by_weekly_time:"",priorityList:[],uid1:"",uid2:"",pickerOptions:{disabledDate:function(e){return e.getTime()+864e5<Date.now()}}}},computed:c()({},Object(o.b)(["email"])),props:["option","data","callback"],methods:{getData:function(){var e=this,t={url:"/channel/getDetailByCid",params:{cid:this.option.cid,channel_history:this.option.channel_history,username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t&&200==t.code&&(e.list=t.result&&t.result[0]&&n()({},t.result[0])||"",e.setDefault(),e.dialogVisible=!0)})},updateClick:function(){this.data?(this.list=this.data&&n()({},this.data)||"",this.setDefault(),this.dialogVisible=!0):this.getData()},_parseTime:function(e,t){return Object(h.e)(e,t)},deleteEvent:function(){var e=this;this.delBtnPopover=!1;var t={url:"/Channel/",params:{channel_id:this.list.channel_id,channel_history:this.list.channel_history,username:this.email,cip:230}};this.$store.dispatch("",t).then(function(t){t.code&&200==Number(t.code)?(Object(_.Message)({showClose:!0,message:"删除成功！",type:"success",duration:1e3}),e.dialogVisible=!1,e.callback()):Object(_.Message)({showClose:!0,message:t.msg||"删除失败!",type:"error",duration:3e3})})},updateEvent:function(){var e=this;if(this.updatePopover=!1,this.list.channel_name_tw)if(this.list.channel_name_us)if(1!==this.list.channel_history)if(this.list.stat_time&&this.list.end_time)if(this.list.stat_time>=this.list.end_time)Object(_.Message)({showClose:!0,message:"结束日期必须大于开始日期！",type:"error",duration:3e3});else{var t=void 0;if(this.isAddCard){t=[];for(var a=0;a<this.cardNum;a++){if(!this.cardlist[a].title_sub)return void Object(_.Message)({showClose:!0,message:"请填写位置"+(a+1)+"的图标对应文案！",type:"error",duration:3e3});if(!this.cardlist[a].pic)return void Object(_.Message)({showClose:!0,message:"请填写位置"+(a+1)+"的图标地址！",type:"error",duration:3e3});if(!this.cardlist[a].scheme)return void Object(_.Message)({showClose:!0,message:"请填写位置"+(a+1)+"的链接跳转地址！",type:"error",duration:3e3});t.push(this.cardlist[a])}}if(this.uid1&&this.uid1.indexOf(",")>-1)Object(_.Message)({showClose:!0,message:"UID格式不对！",type:"error",duration:3e3});else if(this.uid2&&this.uid2.indexOf(",")>-1)Object(_.Message)({showClose:!0,message:"UID格式不对！",type:"error",duration:3e3});else{this.updateStrTrigger(this.cancel_limit,"cancel_limit"),this.updateStrTrigger(this.more_doc,"more_doc"),this.updateMaterialPriority(),this.updateUidPriority();var i=this.getRankType();if("return"!==i){this.updateRank(),i&&this.triggerList.push(i);var s={url:"/channel/editChannel",params:{cid:this.list.cid,channel_history:this.list.channel_history,channel_id:this.list.channel_id,channel_name_tw:this.list.channel_name_tw,channel_name_us:this.list.channel_name_us,stat_time:this.list.stat_time/1e3,end_time:this.list.end_time/1e3,cardlist:t&&l()(t)||"",triggers:this.triggerList.join(","),channel_expired_timestamp:this.getExpiredTime()||"",username:this.email,cip:230}};this.$store.dispatch("CommonGet",s).then(function(t){t.code&&200==Number(t.code)?(e.dialogVisible=!1,e.callback(),Object(_.Message)({showClose:!0,message:"保存成功！",type:"success",duration:1e3})):Object(_.Message)({showClose:!0,message:t.msg||"保存失败!",type:"error",duration:0})})}}}else Object(_.Message)({showClose:!0,message:"请选择运营时间！",type:"error",duration:1e3});else this.updateHistory();else Object(_.Message)({showClose:!0,message:"请输入频道英文名称！",type:"error",duration:1e3});else Object(_.Message)({showClose:!0,message:"请输入频道繁体字名称！",type:"error",duration:1e3})},updateHistory:function(){var e=this,t={url:"/channel/editChannel",params:{cid:this.list.cid,channel_history:this.list.channel_history,channel_id:this.list.channel_id,channel_name_tw:this.list.channel_name_tw,channel_name_us:this.list.channel_name_us,username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t.code&&200==Number(t.code)?(e.dialogVisible=!1,e.callback(),Object(_.Message)({showClose:!0,message:"保存成功！",type:"success",duration:1e3})):Object(_.Message)({showClose:!0,message:t.msg||"保存失败!",type:"error",duration:0})})},updateStrTrigger:function(e,t){var a=this.triggerList.indexOf(t);e&&-1==a&&this.triggerList.push(t),!e&&a>-1&&this.triggerList.splice(a,1)},updateMaterialPriority:function(){var e=this.priorityList.indexOf("channel_video_priority")>-1?"channel_video_priority":"",t=this.priorityList.indexOf("channel_pic_priority")>-1?"channel_pic_priority":"",a=this.priorityList.indexOf("channel_article_priority")>-1?"channel_article_priority":"";this.updateStrTrigger(e,"channel_video_priority"),this.updateStrTrigger(t,"channel_pic_priority"),this.updateStrTrigger(a,"channel_article_priority")},updateUidPriority:function(){for(var e=this.triggerList,t=(e.length,0);t<e.length;t++){e[t].indexOf("channel_uid_priority_")>-1&&(this.triggerList.splice(t,1),t--)}this.uid1&&this.triggerList.push("channel_uid_priority_"+this.uid1),this.uid2&&this.triggerList.push("channel_uid_priority_"+this.uid2)},updateRank:function(){for(var e=this.triggerList,t=0;t<e.length;t++){if(e[t].indexOf("rank_channel_")>-1){this.triggerList.splice(t,1);break}}},getRankType:function(){var e="";switch(this.rankType){case 1:e=this.rank_default;break;case 2:e="rank_channel_split_by_hour_"+this.rank_by_hour;break;case 3:this.rank_by_time&&this.rank_by_time[0]&&this.rank_by_time[1]?e="rank_channel_time_segement_"+this.rank_by_time[0]+"_"+this.rank_by_time[1]:(Object(_.Message)({showClose:!0,message:"请选择节目热度时间！",type:"error",duration:3e3}),e="return");break;case 4:this.rank_by_weekly_day&&this.rank_by_weekly_time?e="rank_channel_tvshow_weekly_"+this.rank_by_weekly_day+"_"+this.rank_by_weekly_time:(Object(_.Message)({showClose:!0,message:"请选择节目周期时间！",type:"error",duration:3e3}),e="return")}return e},getExpiredTime:function(){return 24*this.channel_expired_day*3600+3600*this.channel_expired_hour},cancelEvent:function(){this.dialogVisible=!1},handelCardState:function(){this.isAddCard&&!this.cardNum&&(this.cardNum=3)},setDefault:function(){if(1!==this.list.channel_history){this.list.stat_time&&(this.list.stat_time=1e3*this.list.stat_time),this.list.end_time&&(this.list.end_time=1e3*this.list.end_time),this.list.channel_expired_timestamp&&(this.channel_expired_day=Math.floor(this.list.channel_expired_timestamp/86400),this.channel_expired_hour=Math.round(this.list.channel_expired_timestamp%86400/3600)),this.list.triggers?(this.triggerList=this.list.triggers.split(","),this.cancel_limit=this.setStrValue("cancel_limit"),this.more_doc=this.setStrValue("more_doc"),this.setMaterialPriority(),this.setUidPriority(),this.setRank()):(this.triggerList=[],this.cancel_limit="",this.more_doc="",this.priorityList=[],this.uid1="",this.uid2=""),this.cardlist=[{title_sub:"",pic:"",scheme:""},{title_sub:"",pic:"",scheme:""},{title_sub:"",pic:"",scheme:""},{title_sub:"",pic:"",scheme:""}],this.cardNum=this.list.cardlist&&this.list.cardlist.length||0,this.isAddCard=!!this.cardNum;for(var e=0;e<this.cardNum;e++)this.cardlist[e]=n()({},this.list.cardlist[e])}},setMaterialPriority:function(){this.pushMaterial("channel_video_priority"),this.pushMaterial("channel_pic_priority"),this.pushMaterial("channel_article_priority")},pushMaterial:function(e){this.triggerList.indexOf(e)>-1&&this.priorityList.push(e)},setUidPriority:function(){for(var e=[],t=this.triggerList,a=0;a<t.length;a++)t[a].indexOf("channel_uid_priority_")>-1&&e.push(t[a].split("channel_uid_priority_")[1]);e[0]&&(this.uid1=e[0]),e[1]&&(this.uid2=e[1])},setRank:function(){for(var e="",t=this.triggerList,a=0;a<t.length;a++)if(t[a].indexOf("rank_channel_")>-1){e=t[a];break}var i="rank_channel_split_by_hour_",l="rank_channel_time_segement_",s="rank_channel_tvshow_weekly_";if(e&&"rank_channel_by_time"!==e){if(e.indexOf(i)>-1)this.rankType=2,this.rank_by_hour=e.split(i)[1];else if(e.indexOf(l)>-1){this.rankType=3;var n=e.split(l)[1].split("_");this.rank_by_time=n}else if(e.indexOf(s)>-1){this.rankType=4;var r=e.split(s)[1].split("_");this.rank_by_weekly_day=Number(r[0]),this.rank_by_weekly_time=r[1]}}else this.rankType=1,this.rank_default=e},setStrValue:function(e){return this.triggerList.indexOf(e)>-1?e:""}},watch:{data:function(){},option:function(){},list:function(){}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.option||e.data?a("div",[e.list?a("el-dialog",{attrs:{title:"编辑【"+e.list.channel_name+"】频道",visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-form",{attrs:{size:"small","label-width":"80px","label-position":"left"}},[a("el-form-item",{attrs:{label:"频道名称"}},[a("el-input",{attrs:{disabled:!0,placeholder:"请输入频道名称"},model:{value:e.list.channel_name,callback:function(t){e.$set(e.list,"channel_name",t)},expression:"list.channel_name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"频道id"}},[a("el-input",{attrs:{disabled:!0,placeholder:"请输入频道id"},model:{value:e.list.channel_id,callback:function(t){e.$set(e.list,"channel_id",t)},expression:"list.channel_id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"英文名称",required:""}},[a("el-input",{attrs:{placeholder:"请输入频道英文名称",clearable:""},model:{value:e.list.channel_name_us,callback:function(t){e.$set(e.list,"channel_name_us",t)},expression:"list.channel_name_us"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"繁体名称",required:""}},[a("el-input",{attrs:{placeholder:"请输入频道繁体名称",clearable:""},model:{value:e.list.channel_name_tw,callback:function(t){e.$set(e.list,"channel_name_tw",t)},expression:"list.channel_name_tw"}})],1),e._v(" "),0===e.list.channel_history?a("div",[e.list.stat_time&&e.list.end_time?a("el-form-item",{attrs:{label:"运营时间",required:""}},[a("el-date-picker",{attrs:{type:"date",placeholder:"开始日期",format:"yyyy年MM月dd日","value-format":"timestamp","picker-options":e.pickerOptions},model:{value:e.list.stat_time,callback:function(t){e.$set(e.list,"stat_time",t)},expression:"list.stat_time"}}),e._v(" "),a("span",{staticClass:"hidden-xs-only"},[e._v("-")]),e._v(" "),a("el-date-picker",{attrs:{type:"date",placeholder:"结束日期",format:"yyyy年MM月dd日","value-format":"timestamp","picker-options":e.pickerOptions},model:{value:e.list.end_time,callback:function(t){e.$set(e.list,"end_time",t)},expression:"list.end_time"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"物料库物料有效期"}},[a("el-input",{staticStyle:{"max-width":"80px"},attrs:{placeholder:"请输入天数"},on:{change:function(t){e.channel_expired_day=e.channel_expired_day>0?e.channel_expired_day:0}},model:{value:e.channel_expired_day,callback:function(t){e.channel_expired_day=e._n(t)},expression:"channel_expired_day"}}),e._v(" "),a("span",{staticClass:"info-tip"},[e._v("单位（天）")]),e._v(" "),a("el-input",{staticStyle:{"max-width":"80px"},attrs:{placeholder:"请输入小时数"},on:{change:function(t){e.channel_expired_hour=e.channel_expired_hour>0?e.channel_expired_hour:0}},model:{value:e.channel_expired_hour,callback:function(t){e.channel_expired_hour=e._n(t)},expression:"channel_expired_hour"}}),e._v(" "),a("span",{staticClass:"info-tip"},[e._v("单位（小时）")])],1),e._v(" "),a("el-form-item",{attrs:{label:"排序方式",required:""}},[a("el-select",{attrs:{placeholder:"请选择排序方式"},model:{value:e.rankType,callback:function(t){e.rankType=t},expression:"rankType"}},[a("el-option",{attrs:{label:"自定义排序",value:1}}),e._v(" "),a("el-option",{attrs:{label:"持续热点事件排序",value:2}}),e._v(" "),a("el-option",{attrs:{label:"持续热度节目排序",value:3}}),e._v(" "),a("el-option",{attrs:{label:"周期性节目排序",value:4}})],1),e._v(" "),a("el-form",{staticClass:"inner-form-box",staticStyle:{"margin-left":"0"},attrs:{size:"small"}},[a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:1===e.rankType,expression:"rankType === 1"}],attrs:{"label-width":"0px"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.rank_default,callback:function(t){e.rank_default=t},expression:"rank_default"}},[a("el-option",{attrs:{label:"ctr排序",value:""}}),e._v(" "),a("el-option",{attrs:{label:"时间序",value:"rank_channel_by_time"}})],1)],1),e._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:2===e.rankType,expression:"rankType === 2"}],attrs:{"label-width":"0px"}},[a("el-input",{staticStyle:{"max-width":"150px"},attrs:{placeholder:"请输入物料跨段时间"},on:{change:function(t){e.rank_by_hour=e.rank_by_hour>1?e.rank_by_hour:1}},model:{value:e.rank_by_hour,callback:function(t){e.rank_by_hour=e._n(t)},expression:"rank_by_hour"}}),e._v(" "),a("span",{staticClass:"info-tip"},[e._v("单位（小时）")])],1),e._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:3===e.rankType,expression:"rankType === 3"}]},[a("el-time-picker",{attrs:{"is-range":"","value-format":"HH:mm","range-separator":"-","start-placeholder":"开始时间","end-placeholder":"结束时间",placeholder:"选择时间范围"},model:{value:e.rank_by_time,callback:function(t){e.rank_by_time=t},expression:"rank_by_time"}})],1),e._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:4===e.rankType,expression:"rankType === 4"}]},[a("el-select",{attrs:{placeholder:"请选择日期"},model:{value:e.rank_by_weekly_day,callback:function(t){e.rank_by_weekly_day=t},expression:"rank_by_weekly_day"}},[a("el-option",{attrs:{label:"星期一",value:1}}),e._v(" "),a("el-option",{attrs:{label:"星期二",value:2}}),e._v(" "),a("el-option",{attrs:{label:"星期三",value:3}}),e._v(" "),a("el-option",{attrs:{label:"星期四",value:4}}),e._v(" "),a("el-option",{attrs:{label:"星期五",value:5}}),e._v(" "),a("el-option",{attrs:{label:"星期六",value:6}}),e._v(" "),a("el-option",{attrs:{label:"星期日",value:7}})],1),e._v(" "),a("el-time-picker",{attrs:{"value-format":"HH:mm",placeholder:"选择时间"},model:{value:e.rank_by_weekly_time,callback:function(t){e.rank_by_weekly_time=t},expression:"rank_by_weekly_time"}})],1)],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"物料加权"}},[a("el-checkbox-group",{model:{value:e.priorityList,callback:function(t){e.priorityList=t},expression:"priorityList"}},[a("el-checkbox",{attrs:{label:"channel_video_priority"}},[e._v("视频")]),e._v(" "),a("el-checkbox",{attrs:{label:"channel_pic_priority"}},[e._v("图片")]),e._v(" "),a("el-checkbox",{attrs:{label:"channel_article_priority"}},[e._v("文章")])],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"UID 加权"}},[a("el-input",{staticStyle:{"max-width":"160px"},attrs:{placeholder:"请输入uid",clearable:""},model:{value:e.uid1,callback:function(t){e.uid1=t},expression:"uid1"}}),e._v(" "),a("el-input",{staticStyle:{"max-width":"160px"},attrs:{placeholder:"请输入uid",clearable:""},model:{value:e.uid2,callback:function(t){e.uid2=t},expression:"uid2"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0px"}},[a("el-checkbox",{attrs:{"true-label":"cancel_limit","false-label":""},model:{value:e.cancel_limit,callback:function(t){e.cancel_limit=t},expression:"cancel_limit"}},[e._v("是否放开物料分发限制")])],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0px"}},[a("el-checkbox",{attrs:{"true-label":"more_doc","false-label":""},model:{value:e.more_doc,callback:function(t){e.more_doc=t},expression:"more_doc"}},[e._v("不过物料基础门槛")])],1),e._v(" "),a("el-form-item",{attrs:{"label-width":"0px"}},[a("el-checkbox",{on:{change:function(t){e.handelCardState()}},model:{value:e.isAddCard,callback:function(t){e.isAddCard=t},expression:"isAddCard"}},[e._v("运营图标")]),e._v(" "),e.isAddCard?a("el-form",{staticClass:"inner-form-box",attrs:{size:"mini"}},[a("el-form-item",{attrs:{label:"配置个数"}},[a("el-radio-group",{model:{value:e.cardNum,callback:function(t){e.cardNum=t},expression:"cardNum"}},[a("el-radio",{attrs:{label:1}},[e._v("1")]),e._v(" "),a("el-radio",{attrs:{label:2}},[e._v("2")]),e._v(" "),a("el-radio",{attrs:{label:3}},[e._v("3")]),e._v(" "),a("el-radio",{attrs:{label:4}},[e._v("4")])],1)],1),e._v(" "),e.cardNum>0?a("el-form-item",{attrs:{label:"位置1"}},[a("el-input",{staticStyle:{"max-width":"360px"},attrs:{placeholder:"请输入图标底部对应文案",clearable:""},model:{value:e.cardlist[0].title_sub,callback:function(t){e.$set(e.cardlist[0],"title_sub",t)},expression:"cardlist[0].title_sub"}}),a("span",{staticClass:"info-tip"},[e._v("（图标底部对应文案）")]),e._v(" "),a("el-input",{staticStyle:{"max-width":"360px","margin-left":"48px","margin-top":"5px"},attrs:{placeholder:"请输入图标地址",clearable:"",type:"textarea",autosize:""},model:{value:e.cardlist[0].pic,callback:function(t){e.$set(e.cardlist[0],"pic",t)},expression:"cardlist[0].pic"}}),a("span",{staticClass:"info-tip"},[e._v("（图标地址）")]),e._v(" "),a("el-input",{staticStyle:{"max-width":"360px","margin-left":"48px","margin-top":"5px"},attrs:{placeholder:"请输入链接跳转地址",clearable:"",type:"textarea",autosize:""},model:{value:e.cardlist[0].scheme,callback:function(t){e.$set(e.cardlist[0],"scheme",t)},expression:"cardlist[0].scheme"}}),a("span",{staticClass:"info-tip"},[e._v("（链接跳转地址）")])],1):e._e(),e._v(" "),e.cardNum>1?a("el-form-item",{attrs:{label:"位置2"}},[a("el-input",{staticStyle:{"max-width":"360px"},attrs:{placeholder:"请输入图标底部对应文案",clearable:""},model:{value:e.cardlist[1].title_sub,callback:function(t){e.$set(e.cardlist[1],"title_sub",t)},expression:"cardlist[1].title_sub"}}),a("span",{staticClass:"info-tip"},[e._v("（图标底部对应文案）")]),e._v(" "),a("el-input",{staticStyle:{"max-width":"360px","margin-left":"48px","margin-top":"5px"},attrs:{placeholder:"请输入图标地址",clearable:"",type:"textarea",autosize:""},model:{value:e.cardlist[1].pic,callback:function(t){e.$set(e.cardlist[1],"pic",t)},expression:"cardlist[1].pic"}}),a("span",{staticClass:"info-tip"},[e._v("（图标地址）")]),e._v(" "),a("el-input",{staticStyle:{"max-width":"360px","margin-left":"48px","margin-top":"5px"},attrs:{placeholder:"请输入链接跳转地址",clearable:"",type:"textarea",autosize:""},model:{value:e.cardlist[1].scheme,callback:function(t){e.$set(e.cardlist[1],"scheme",t)},expression:"cardlist[1].scheme"}}),a("span",{staticClass:"info-tip"},[e._v("（链接跳转地址）")])],1):e._e(),e._v(" "),e.cardNum>2?a("el-form-item",{attrs:{label:"位置3"}},[a("el-input",{staticStyle:{"max-width":"360px"},attrs:{placeholder:"请输入图标底部对应文案",clearable:""},model:{value:e.cardlist[2].title_sub,callback:function(t){e.$set(e.cardlist[2],"title_sub",t)},expression:"cardlist[2].title_sub"}}),a("span",{staticClass:"info-tip"},[e._v("（图标底部对应文案）")]),e._v(" "),a("el-input",{staticStyle:{"max-width":"360px","margin-left":"48px","margin-top":"5px"},attrs:{placeholder:"请输入图标地址",clearable:"",type:"textarea",autosize:""},model:{value:e.cardlist[2].pic,callback:function(t){e.$set(e.cardlist[2],"pic",t)},expression:"cardlist[2].pic"}}),a("span",{staticClass:"info-tip"},[e._v("（图标地址）")]),e._v(" "),a("el-input",{staticStyle:{"max-width":"360px","margin-left":"48px","margin-top":"5px"},attrs:{placeholder:"请输入链接跳转地址",clearable:"",type:"textarea",autosize:""},model:{value:e.cardlist[2].scheme,callback:function(t){e.$set(e.cardlist[2],"scheme",t)},expression:"cardlist[2].scheme"}}),a("span",{staticClass:"info-tip"},[e._v("（链接跳转地址）")])],1):e._e(),e._v(" "),e.cardNum>3?a("el-form-item",{attrs:{label:"位置4"}},[a("el-input",{staticStyle:{"max-width":"360px"},attrs:{placeholder:"请输入图标底部对应文案",clearable:""},model:{value:e.cardlist[3].title_sub,callback:function(t){e.$set(e.cardlist[3],"title_sub",t)},expression:"cardlist[3].title_sub"}}),a("span",{staticClass:"info-tip"},[e._v("（图标底部对应文案）")]),e._v(" "),a("el-input",{staticStyle:{"max-width":"360px","margin-left":"48px","margin-top":"5px"},attrs:{placeholder:"请输入图标地址",clearable:"",type:"textarea",autosize:""},model:{value:e.cardlist[3].pic,callback:function(t){e.$set(e.cardlist[3],"pic",t)},expression:"cardlist[3].pic"}}),a("span",{staticClass:"info-tip"},[e._v("（图标地址）")]),e._v(" "),a("el-input",{staticStyle:{"max-width":"360px","margin-left":"48px","margin-top":"5px"},attrs:{placeholder:"请输入链接跳转地址",clearable:"",type:"textarea",autosize:""},model:{value:e.cardlist[3].scheme,callback:function(t){e.$set(e.cardlist[3],"scheme",t)},expression:"cardlist[3].scheme"}}),a("span",{staticClass:"info-tip"},[e._v("（链接跳转地址）")])],1):e._e()],1):e._e()],1)],1):e._e()],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-popover",{ref:"popoverUpdate",attrs:{placement:"top",width:"200"},model:{value:e.updatePopover,callback:function(t){e.updatePopover=t},expression:"updatePopover"}},[a("p",[e._v("确定保存当前修改？")]),e._v(" "),a("div",{staticStyle:{"text-align":"right",margin:"0"}},[a("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(t){e.updatePopover=!1}}},[e._v("取消")]),e._v(" "),a("el-button",{attrs:{type:"primary",round:"",size:"mini"},on:{click:function(t){e.updateEvent()}}},[e._v("确定")])],1)]),e._v(" "),a("el-button",{directives:[{name:"popover",rawName:"v-popover:popoverUpdate",arg:"popoverUpdate"}],attrs:{type:"primary"}},[e._v("保 存")]),e._v(" "),a("el-button",{on:{click:function(t){e.cancelEvent()}}},[e._v("取 消")])],1)],1):e._e(),e._v(" "),a("el-button",{staticStyle:{"margin-left":"5px","margin-bottom":"5px"},attrs:{type:"primary",icon:"el-icon-edit",plain:"",size:"mini",title:"编辑"},on:{click:function(t){e.updateClick()}}},[a("span",{staticClass:"hidden-xs-only"},[e._v("编辑")])])],1):e._e()},staticRenderFns:[]};var u=a("VU/8")(p,d,!1,function(e){a("C+fc")},"data-v-7324180c",null);t.a=u.exports}});