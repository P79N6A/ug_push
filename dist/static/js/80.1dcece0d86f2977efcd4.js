webpackJsonp([80],{JFsn:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("mvHQ"),i=s.n(a),n=s("Dd8w"),o=s.n(n),r=s("vzON"),c=s("NYxO"),l=s("zL8q"),u={components:{Auth:r.a},data:function(){return{colorList:["","success","warning","danger","info"],formInline:{uid:"",view:"ugid"},responseData:[],words:[],activeNames:[0]}},methods:{toMidSearch:function(){var e=this.$router.resolve({name:"/hotcenter/analysis/user/synergy/readmid",query:{uid:this.formInline.uid}});window.open(e.href,"_blank")},onSearch:function(){var e=this;if(this.formInline.uid){var t={url:"http://10.77.29.69:8099/ucf",param:o()({},this.formInline)},s={data:i()(t),cip:230};this.$store.dispatch("ProxyGet",s).then(function(t){0===t.code?(Object(l.Message)({showClose:!0,message:t.msg||"success",type:"success",duration:1e3}),e.responseData=t.data):Object(l.Message)({showClose:!0,message:t.msg||"单用户topic查询页面数据获取失败！",type:"error",duration:3e3})},function(e){Object(l.Message)({showClose:!0,message:"单用户topic查询页面接口请求失败！",type:"error",duration:3e3})})}else Object(l.Message)({showClose:!0,message:"请输入要查询的uid！",type:"error",duration:3e3})}},computed:o()({},Object(c.b)(["pageAuth"])),watch:{pageAuth:function(){}}},m={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return 1===e.pageAuth?s("el-main",[s("el-row",{staticClass:"pane-title-wrap"},[s("h6",{staticClass:"pane-title"},[e._v("单用户topic查询页面")])]),e._v(" "),s("el-row",{staticClass:"search-form-wrap"},[s("el-form",{attrs:{inline:"",model:e.formInline,size:"small"}},[s("el-form-item",[s("el-input",{attrs:{placeholder:"请输入uid",clearable:""},model:{value:e.formInline.uid,callback:function(t){e.$set(e.formInline,"uid","string"==typeof t?t.trim():t)},expression:"formInline.uid"}}),e._v(" "),s("span",{staticClass:"info-tips"},[e._v("（uid）")])],1),e._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:e.onSearch}},[e._v("查询")])],1),e._v(" "),s("el-form-item",[s("a",{staticClass:"item-status-mid",on:{click:e.toMidSearch}},[e._v("进入用户阅读mid查询页面")])])],1)],1),e._v(" "),s("el-collapse",{model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},e._l(e.responseData,function(t,a){return s("el-collapse-item",{key:a,attrs:{title:"topic"+t.topic+" - 关键词（"+t.words.length+"）| 权重:"+t.weight,name:a}},[s("div",{staticClass:"row-topic clearfix"},e._l(t.words,function(t,a){return s("el-tag",{key:a,staticClass:"item-tag left",attrs:{type:e.colorList[Math.round(3*Math.random())]}},[e._v(e._s(t.word)+" | "+e._s(t.weight))])}))])}))],1):0===e.pageAuth?s("el-main",[s("auth")],1):e._e()},staticRenderFns:[]};var d=s("VU/8")(u,m,!1,function(e){s("j0Xs")},"data-v-5cbbf626",null);t.default=d.exports},j0Xs:function(e,t){}});