webpackJsonp([70],{"7OiS":function(t,e){},evQv:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("mvHQ"),a=s.n(i),n=s("Dd8w"),c=s.n(n),o=s("vzON"),r=s("NYxO"),l=s("zL8q"),p={name:"WhiteListConfig",components:{Auth:o.a},data:function(){return{editable:!1,tempData:"",resourceContent:"",activeNames:[1,2],stepActive:0,testStatus:{0:"process",1:"error",2:"success",3:"success",4:"success",5:"success",6:"success"},checkStatus:{0:"wait",1:"wait",2:"process",3:"error",4:"success",5:"success",6:"success"},deployStatus:{0:"wait",1:"wait",2:"wait",3:"wait",4:"process",5:"error",6:"success"},deployBackStatus:{0:"wait",1:"wait",2:"wait",3:"wait",4:"wait",5:"wait",6:"success"},testLoading:!1,testDesc:"最新版本白名单配置发布至180脚本",dialogFormVisible:!1,checkDesc:"白名单配置发布验证",deployLoading:!1,deployDesc:"白名单配置文件全量上线",dcp_link_test:"javascript: void(0)",dcp_link_deploy:"javascript: void(0)"}},computed:c()({},Object(r.b)(["email","pageAuth"])),methods:{init:function(){1===this.pageAuth&&this.getConfig()},deployInit:function(){this.stepActive=0,this.dcp_link_test="javascript: void(0)",this.dcp_link_deploy="javascript: void(0)"},getConfig:function(){var t=this;this.deployInit();var e={url:"/proxy/yaconf",params:{action:"get",username:this.email,cip:230}};this.$store.dispatch("CommonGet",e).then(function(e){0===Number(e.code)?(Object(l.Message)({showClose:!0,message:"Success",type:"success",duration:1e3}),t.editable=!1,t.resourceContent=e.data&&e.data.resourceContent?e.data.resourceContent:"",t.tempData=JSON.parse(a()(t.resourceContent))):Object(l.Message)({showClose:!0,message:e.msg||"前端白名单配置获取失败！",type:"error",duration:3e3})},function(t){Object(l.Message)({showClose:!0,message:"前端白名单配置获取接口请求失败！",type:"error",duration:3e3})})},toggleEditEvent:function(){this.editable&&(this.resourceContent=JSON.parse(a()(this.tempData))),this.editable=!this.editable},saveEvent:function(){var t=this;this.resourceContent?this.$confirm("确定保存修改?","",{confirmButtonText:"确定",cancelButtonText:"取消",type:"success"}).then(function(){t.saveAction()}).catch(function(){t.$message({type:"info",message:"取消操作"})}):Object(l.Message)({showClose:!0,message:"配置文件不能为空！",type:"error",duration:3e3})},saveAction:function(){var t=this,e=new URLSearchParams;e.append("resourceContent",this.resourceContent),e.append("action","modify"),e.append("username",this.email),e.append("cip",230);var s={url:"/proxy/setYaconf",params:e};this.$store.dispatch("CommonPost",s).then(function(e){0===Number(e.code)?t.getConfig():Object(l.Message)({showClose:!0,message:e.msg||"保存失败！",type:"error",duration:3e3})},function(t){Object(l.Message)({showClose:!0,message:"前端白名单保存接口请求失败！",type:"error",duration:3e3})})},testEvent:function(){var t=this;this.testLoading=!0;var e=new URLSearchParams;e.append("action","test"),e.append("username",this.email),e.append("cip",230);var s={url:"/proxy/yaconf",params:e};this.$store.dispatch("CommonPost",s).then(function(e){t.testLoading=!1,0===Number(e.code)?(t.stepActive=2,t.testDesc="最新版本白名单配置发布至180脚本",t.dcp_link_test=e.data&&e.data.dcp_link?e.data.dcp_link:"javascript: void(0)"):(t.stepActive=1,t.testDesc=e.msg||"测试启动失败")},function(e){t.testLoading=!1,t.stepActive=1,t.testDesc="测试启动接口请求失败"})},testRollbackEvent:function(){var t=this,e=new URLSearchParams;e.append("type",1),e.append("username",this.email),e.append("cip",230);var s={url:"/proxy/rollback",params:e};this.$store.dispatch("CommonPost",s).then(function(e){t.stepActive=1,0===Number(e.code)?t.testDesc="回滚成功，请重新提交白名单配置文件":t.testDesc=e.msg||"回滚失败"},function(e){t.stepActive=1,t.testDesc="回滚接口请求失败"})},checkRollbackEvent:function(){var t=this,e=new URLSearchParams;e.append("type",2),e.append("username",this.email),e.append("cip",230);var s={url:"/proxy/rollback",params:e};this.$store.dispatch("CommonPost",s).then(function(e){0===Number(e.code)?(t.checkDesc="白名单配置发布验证",Object(l.Message)({showClose:!0,message:"回滚成功！",type:"success",duration:3e3}),t.deployInit()):(t.stepActive=3,t.checkDesc=e.msg||"回滚失败")},function(e){t.stepActive=3,t.checkDesc="回滚接口请求失败"})},checkPass:function(){this.dialogFormVisible=!1,this.stepActive=4,this.checkDesc="白名单配置发布验证"},deployEvent:function(){var t=this;this.deployLoading=!0;var e=new URLSearchParams;e.append("action","deploy"),e.append("username",this.email),e.append("cip",230);var s={url:"/proxy/yaconf",params:e};this.$store.dispatch("CommonPost",s).then(function(e){t.deployLoading=!1,0===Number(e.code)?(t.stepActive=6,t.deployDesc="白名单配置文件全量上线",t.dcp_link_deploy=e.data&&e.data.dcp_link?e.data.dcp_link:"javascript: void(0)"):(t.stepActive=5,t.deployDesc=e.msg||"部署启动失败")},function(e){t.deployLoading=!1,t.stepActive=5,t.deployDesc="部署启动接口请求失败"})}},created:function(){this.init()},watch:{email:function(){},pageAuth:function(){this.init()}}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return 1===t.pageAuth?s("el-main",[s("el-row",{staticClass:"pane-title-wrap"},[s("h6",{staticClass:"pane-title"},[s("i",{staticClass:"el-icon-date hidden-xs-only",staticStyle:{"margin-right":"6px"}}),t._v("前端白名单配置")])]),t._v(" "),s("el-row",{staticClass:"content-box-wrap"},[s("el-col",{attrs:{span:24}},[s("el-dialog",{attrs:{title:"测试验证",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[s("a",{staticClass:"link-btn",attrs:{href:t.dcp_link_test,target:"_blank"}},[t._v("去验证")]),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{attrs:{size:"small"},on:{click:function(e){t.stepActive=3,t.dialogFormVisible=!1}}},[t._v("验证不通过")]),t._v(" "),s("el-button",{attrs:{type:"success",size:"small"},on:{click:function(e){t.checkPass()}}},[t._v("验证通过")])],1)]),t._v(" "),s("el-collapse",{model:{value:t.activeNames,callback:function(e){t.activeNames=e},expression:"activeNames"}},[s("el-collapse-item",{attrs:{name:1}},[s("template",{slot:"title"},[s("div",{staticClass:"collapse-title"},[t._v("发布流程")])]),t._v(" "),s("el-steps",{attrs:{active:t.stepActive,"finish-status":"success","align-center":""}},[s("el-step",{attrs:{description:t.testDesc,status:t.testStatus[t.stepActive]}},[s("template",{slot:"title"},[s("div",{staticStyle:{"padding-bottom":"10px"}},[0===t.stepActive?s("el-button",{attrs:{icon:"el-icon-caret-right",type:"primary",round:"",size:"mini",loading:t.testLoading},on:{click:function(e){t.testEvent()}}},[t._v("启动测试")]):1===t.stepActive?s("div",[s("el-button",{attrs:{type:"primary",icon:"el-icon-caret-right",round:"",size:"mini",loading:t.testLoading},on:{click:function(e){t.testEvent()}}},[t._v("重启测试")]),t._v(" "),s("el-button",{attrs:{type:"warning",icon:"el-icon-refresh",round:"",size:"mini"},on:{click:function(e){t.testRollbackEvent()}}},[t._v("回滚")])],1):s("p",[t._v("启动测试")])],1)])],2),t._v(" "),s("el-step",{attrs:{description:t.checkDesc,status:t.checkStatus[t.stepActive]}},[s("template",{slot:"title"},[s("div",{staticStyle:{"padding-bottom":"10px"}},[2===t.stepActive?s("div",[s("el-button",{attrs:{icon:"el-icon-caret-right",type:"primary",round:"",size:"mini"},on:{click:function(e){t.dialogFormVisible=!0}}},[t._v("测试验证")]),t._v(" "),s("el-button",{attrs:{round:"",size:"mini"},on:{click:function(e){t.checkPass()}}},[t._v("跳过验证")])],1):3===t.stepActive?s("div",[s("el-button",{attrs:{type:"warning",icon:"el-icon-refresh",round:"",size:"mini"},on:{click:function(e){t.checkRollbackEvent()}}},[t._v("回滚")]),t._v(" "),s("el-button",{attrs:{round:"",size:"mini"},on:{click:function(e){t.checkPass()}}},[t._v("跳过验证")])],1):s("p",[t._v("测试验证")])])])],2),t._v(" "),s("el-step",{attrs:{description:t.deployDesc,status:t.deployStatus[t.stepActive]}},[s("template",{slot:"title"},[s("div",{staticStyle:{"padding-bottom":"10px"}},[4===t.stepActive?s("el-button",{attrs:{icon:"el-icon-caret-right",type:"primary",round:"",size:"mini",loading:t.deployLoading},on:{click:function(e){t.deployEvent()}}},[t._v("启动部署")]):5===t.stepActive?s("el-button",{attrs:{type:"primary",icon:"el-icon-caret-right",round:"",size:"mini",loading:t.deployLoading},on:{click:function(e){t.deployEvent()}}},[t._v("重启部署")]):s("p",[t._v("启动部署")])],1)])],2),t._v(" "),s("el-step",{attrs:{title:"部署成功",description:"白名单配置文件全量部署成功",status:t.deployBackStatus[t.stepActive]}})],1),t._v(" "),6===t.stepActive?s("div",{staticClass:"btn-box",staticStyle:{"padding-left":"20px"}},[s("a",{staticClass:"link-btn",attrs:{href:t.dcp_link_deploy,target:"_blank"}},[t._v("查看部署结果")])]):t._e()],2),t._v(" "),s("el-collapse-item",{attrs:{name:2}},[s("template",{slot:"title"},[s("div",{staticClass:"collapse-title"},[t._v("白名单配置")])]),t._v(" "),s("div",{staticClass:"content-edit-box"},[t.editable?t._e():s("pre",{staticStyle:{color:"#000","font-size":"14px",padding:"5px 0px","line-height":"1.5"},domProps:{innerHTML:t._s(t.resourceContent||"暂无内容")}}),t._v(" "),t.editable?s("el-input",{attrs:{type:"textarea",autosize:"",placeholder:"请输入内容"},model:{value:t.resourceContent,callback:function(e){t.resourceContent="string"==typeof e?e.trim():e},expression:"resourceContent"}}):t._e(),t._v(" "),s("div",{staticClass:"operate-box"},[t.editable?s("el-button",{attrs:{size:"small",type:"success"},on:{click:function(e){t.saveEvent()}}},[t._v("保存修改")]):t._e(),t._v(" "),s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){t.toggleEditEvent()}}},[t._v(t._s(t.editable?"取消编辑":"编辑文档"))])],1)],1)],2)],1)],1)],1)],1):0===t.pageAuth?s("el-main",[s("auth")],1):t._e()},staticRenderFns:[]};var u=s("VU/8")(p,d,!1,function(t){s("7OiS")},"data-v-90945990",null);e.default=u.exports}});