webpackJsonp([83],{mtVO:function(e,t){},wS6K:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("mvHQ"),l=n.n(a),s=n("Dd8w"),i=n.n(s),r=n("NYxO"),o=n("zL8q"),c={name:"MaterialRecall",components:{Auth:n("vzON").a},data:function(){return{formInline:{channel_id:"",mid:""},channelList:null,result:null,tips:"loading…"}},computed:i()({},Object(r.b)(["pageAuth","email"])),methods:{init:function(){1===this.pageAuth&&this.getChannelList()},getChannelList:function(){var e=this,t={url:"/channel/getAuthChannelList",params:{username:this.email,cip:230}};this.$store.dispatch("CommonGet",t).then(function(t){t&&200==t.code?t.result&&t.result.length>0?(e.channelList=t.result,e.formInline.channel_id=e.channelList[0].channel_id||""):e.tips="暂无有权限的频道":e.tips=t.msg||"频道列表获取失败"},function(t){e.tips="频道列表获取失败"})},onSearch:function(){var e=this;if(this.formInline.channel_id)if(this.formInline.mid){var t={url:"http://10.75.28.123:39988/fk",param:this.formInline},n={data:l()(t),cip:230};this.$store.dispatch("ProxyGet",n).then(function(t){t&&200==t.code?e.result=t.result:Object(o.Message)({showClose:!0,message:t.msg||"物料召回理由查询失败！",type:"error",duration:0})},function(e){Object(o.Message)({showClose:!0,message:"物料召回理由查询接口异常！",type:"error",duration:0})})}else Object(o.Message)({showClose:!0,message:"请填写要查询的mid！",type:"error",duration:3e3});else Object(o.Message)({showClose:!0,message:"请选择频道！",type:"error",duration:3e3})}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return 1===e.pageAuth?n("el-main",[n("el-row",{staticClass:"pane-title-wrap"},[n("el-col",{attrs:{span:24}},[n("h6",{staticClass:"pane-title"},[n("i",{staticClass:"el-icon-document hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("物料召回查询")])])],1),e._v(" "),n("el-row",{staticClass:"search-form-wrap"},[e.channelList&&e.channelList.length>0?n("el-col",{attrs:{span:24}},[n("el-form",{attrs:{inline:"",model:e.formInline,size:"small"}},[n("el-form-item",{attrs:{label:"选择频道"}},[n("el-select",{attrs:{filterable:"",placeholder:"请选择频道"},model:{value:e.formInline.channel_id,callback:function(t){e.$set(e.formInline,"channel_id",t)},expression:"formInline.channel_id"}},e._l(e.channelList,function(e,t){return n("el-option",{key:t,attrs:{label:e.channel_name,value:e.channel_id}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"mid"}},[n("el-input",{attrs:{placeholder:"请输入mid",clearable:""},model:{value:e.formInline.mid,callback:function(t){e.$set(e.formInline,"mid","string"==typeof t?t.trim():t)},expression:"formInline.mid"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.onSearch}},[n("span",{staticClass:"hidden-xs-only"},[e._v("查询")])])],1)],1)],1):n("p",{staticClass:"none-tips"},[e._v(e._s(e.tips))])],1),e._v(" "),e.result?n("el-row",{staticClass:"content-box-wrap"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:[e.result],border:"",stripe:""}},[n("el-table-column",{attrs:{prop:"reason",label:"召回理由"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.reason||"未知"))]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"from",label:"数据来源"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v(e._s(t.row.from||"未知"))]}}])})],1)],1):e._e()],1):0===e.pageAuth?n("el-main",[n("auth")],1):e._e()},staticRenderFns:[]};var h=n("VU/8")(c,u,!1,function(e){n("mtVO")},"data-v-3f3af34c",null);t.default=h.exports}});