webpackJsonp([60],{"1ZBs":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("mvHQ"),o=n.n(i),r=n("lHA8"),s=n.n(r),a=n("c/Tr"),l=n.n(a),c=n("Dd8w"),m=n.n(c),p=n("vzON"),u=n("NYxO"),f=n("zL8q"),h={name:"shieldPage",components:{Auth:p.a},data:function(){return{formInline:{level:"",type:1,content:[]},content:"",errorTips:"",placeholder:"输入mid，多个mid英文逗号分隔，可回车确认"}},computed:m()({},Object(u.b)(["pageAuth","email"])),methods:{setMaterial:function(){if(this.errorTips="",this.content){if(this.formInline.content.indexOf(this.content)>-1)return void(this.errorTips="“"+this.content+"”已存在以上物料录入列表");if(this.content.indexOf(",")>-1)for(var e=this.content.split(","),t=0;t<e.length;t++){var n=e[t].trim();if(n){if(this.formInline.content.indexOf(n)>-1)return void(this.errorTips="“"+n+"”（第"+(t+1)+"条）已存在以上物料录入列表");this.formInline.content.push(n)}}else this.formInline.content.push(this.content)}this.content="",this.formInline.content=l()(new s.a(this.formInline.content))},deleteMid:function(e){this.formInline.content.splice(e,1)},handleType:function(){1==this.formInline.type?this.placeholder="输入mid，多个mid英文逗号分隔，可回车确认":this.placeholder="输入链接，多个链接英文逗号分隔，可回车确认",this.formInline.content=[],this.content="",this.errorTips=""},clearEvent:function(){this.placeholder="输入mid，多个mid英文逗号分隔，可回车确认",this.formInline={level:"",type:1,content:[]},this.content="",this.errorTips=""},onSubmit:function(e){var t=this;this.formInline.level=e;var n=1===e?"置顶":"优先分发";this.$confirm("将"+n+"以上物料, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){t.setChunwan()}).catch(function(){t.$message({type:"info",message:"已取消操作！"})})},setChunwan:function(){var e=new URLSearchParams;e.append("type",this.formInline.type),e.append("level",this.formInline.level),e.append("content",o()(this.formInline.content)),e.append("username",this.email),e.append("cip",230);var t={url:"/proxy/setChunwan",params:e};this.$store.dispatch("CommonPost",t).then(function(e){if(e.code&&200==Number(e.code)){var t=e.msg||"success";Object(f.Message)({showClose:!0,message:t,type:"success",duration:3e3})}else Object(f.Message)({showClose:!0,message:e.msg||"操作失败！",type:"error",duration:0})})}},watch:{pageAuth:function(){}}},d={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return 1===e.pageAuth?n("el-main",[n("el-row",{staticClass:"pane-title-wrap"},[n("el-col",{attrs:{span:24}},[n("h6",{staticClass:"pane-title"},[n("i",{staticClass:"el-icon-star-off hidden-xs-only",staticStyle:{"margin-right":"6px"}}),e._v("春晚流物料")])])],1),e._v(" "),n("el-row",{staticClass:"content-box-wrap"},[n("el-col",{attrs:{span:24}},[n("el-form",{attrs:{model:e.formInline,"label-width":"50px",size:"small"}},[n("el-form-item",{attrs:{label:"类型",required:""}},[n("el-radio-group",{on:{change:function(t){e.handleType()}},model:{value:e.formInline.type,callback:function(t){e.$set(e.formInline,"type",t)},expression:"formInline.type"}},[n("el-radio",{attrs:{label:1,border:""}},[e._v("mid")]),e._v(" "),n("el-radio",{attrs:{label:2,border:""}},[e._v("链接")])],1)],1),e._v(" "),n("el-form-item",{attrs:{label:""}},[n("div",{staticClass:"badge-box"},[n("el-badge",{attrs:{value:e.formInline.content.length||"0"}},[n("el-tag",{attrs:{type:"warning"}},[e._v("物料录入条数")])],1)],1),e._v(" "),e.formInline.content&&e.formInline.content.length>0?n("div",{staticClass:"clearfix"},e._l(e.formInline.content,function(t,i){return n("div",{key:i,staticClass:"tag-box left"},[n("el-tag",[e._v(e._s(t))]),e._v(" "),n("i",{staticClass:"el-icon-error tag-btn-close",on:{click:function(t){e.deleteMid(i)}}})],1)})):e._e()]),e._v(" "),n("el-form-item",{attrs:{label:"物料",required:""}},[n("textarea",{directives:[{name:"model",rawName:"v-model.trim",value:e.content,expression:"content",modifiers:{trim:!0}}],staticClass:"long-text",attrs:{placeholder:e.placeholder},domProps:{value:e.content},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.setMaterial()},blur:[function(t){e.setMaterial()},function(t){e.$forceUpdate()}],input:function(t){t.target.composing||(e.content=t.target.value.trim())}}}),e._v(" "),n("p",{directives:[{name:"show",rawName:"v-show",value:e.errorTips,expression:"errorTips"}],staticClass:"error-tips"},[e._v("错误提示："+e._s(e.errorTips))]),e._v(" "),n("p",{staticClass:"text-tips"},[e._v("mid样例：4326329950075693"),n("br"),e._v("短链链接样例：https://weibo.com/1594052081/HbhPudlUA"),n("br"),e._v("mid链接样例：https://m.weibo.cn/2823492977/4328775120155937"),n("br"),e._v("输入多个值英文逗号分隔，可回车确认")])]),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"success"},on:{click:function(t){e.onSubmit(1)}}},[e._v("置顶")]),e._v(" "),n("el-button",{attrs:{type:"warning"},on:{click:function(t){e.onSubmit(2)}}},[e._v("优先分发")]),e._v(" "),n("el-button",{attrs:{type:"info",plain:""},on:{click:function(t){e.clearEvent()}}},[e._v("清除重置")])],1)],1)],1)],1)],1):0===e.pageAuth?n("el-main",[n("auth")],1):e._e()},staticRenderFns:[]};var v=n("VU/8")(h,d,!1,function(e){n("dIIr")},"data-v-bdc9bfe2",null);t.default=v.exports},dIIr:function(e,t){}});