webpackJsonp([18],{"9Uu7":function(e,t){},"Y/kO":function(e,t){},f93T:function(e,t){},fnyA:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("mvHQ"),s=a.n(i),o=a("Dd8w"),n=a.n(o),l=a("NYxO"),r=a("zL8q"),c=a("vzON"),m=a("7t+N"),u=a.n(m),h=a("Rfj3"),d={name:"itemList",props:["item","index"],data:function(){return{adminState:!1,canvas:null,drawImg:!1,roundState:!1,painterWidth:25,painterWidthState:!1,colorOptions:[{value:1,label:"黑色"},{value:2,label:"其他"}],lenOptions:[{value:1,label:"长"},{value:2,label:"中"},{value:3,label:"短"}],coverOptions:[{value:1,label:"是"},{value:2,label:"否"}],ogWidth:0,ogHeight:0,canvasHistory:[],canvasOpacity:.5,imgMaskUrl:"",imgUrlHeader:"http://10.85.125.61:13145",loading:"",halfWidth:12.5,isFirst:!0,activeState:{color:"",len:"",cover:""}}},created:function(){var e=this;this.changeActiveState(),h.c.forEach(function(t,a){t.email==e.email&&(e.adminState=!0)})},computed:n()({maskUrl:function(e){return function(e){return this.methodGetUrl(e)}}},Object(l.b)(["email"])),methods:{changeActiveState:function(){1==this.item.color_state?this.activeState.color="黑色":2==this.item.color_state&&(this.activeState.color="其他"),1==this.item.len_state?this.activeState.len="长":2==this.item.len_state?this.activeState.len="中":3==this.item.len_state&&(this.activeState.len="短"),1==this.item.cover_state?this.activeState.cover="是":2==this.item.cover_state&&(this.activeState.cover="否")},imgStateCheck:function(e){var t=this,a={url:"http://10.85.125.61:13145/check_data.json",param:{check_type:e,id:this.item.id,color_state:this.item.color_state,len_state:this.item.len_state,cover_state:this.item.cover_state}},i={data:s()(a),cip:230};this.$store.dispatch("ProxyGet",i).then(function(e){e&&200==e.code?(t.changeActiveState(),Object(r.Message)({showClose:!0,message:e.msg||"成功！",type:"success",duration:1500})):Object(r.Message)({showClose:!0,message:e.msg||"失败",type:"success",duration:1500})},function(e){Object(r.Message)({showClose:!0,message:"接口异常！",type:"error",duration:0})})},openPopup:function(e){var t=this;3==e?this.$confirm("是否确认下线改组图片","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.checkRow(3)}).catch(function(){t.$message({type:"info",message:"已取消操作"})}):4==e&&this.$confirm("是否确认取消下线改组图片","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.checkRow(4)}).catch(function(){t.$message({type:"info",message:"已取消操作"})})},checkEvent:function(e,t,a){var i=this;this.$confirm("确定执行审核操作？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.checkRow(e,t,a)}).catch(function(){i.$message({type:"info",message:"已取消审核"})})},checkRow:function(e,t,a){var i=this;if(4==e)var o={url:"http://10.85.125.61:13145/check_data.json",param:{check_type:e,id:this.item.id,check_user:this.email}};else if(3==e)o={url:"http://10.85.125.61:13145/check_data.json",param:{check_type:e,id:this.item.id,check_user:this.email}};else o={url:"http://10.85.125.61:13145/check_data.json",param:{check_type:e,id:this.item.id,username:t.username,check_user:this.email}};var n={data:s()(o),cip:230};this.$store.dispatch("ProxyGet",n).then(function(t){t&&200==t.code?1==e||2==e?(Object(r.Message)({showClose:!0,message:t.msg||"审核成功！",type:"success",duration:1500}),1==e?(i.item.info[a].check_type=3,i.item.info[a].check_user=i.email):(i.item.info[a].check_type=2,i.item.info[a].check_user=i.email)):3==e?(Object(r.Message)({showClose:!0,message:t.msg||"下线成功！",type:"success",duration:1500}),i.item.isLabel=2,i.item.check_user=i.eamil):4==e&&(Object(r.Message)({showClose:!0,message:t.msg||"取消下线成功！",type:"success",duration:1500}),i.item.isLabel=1,i.item.check_user=""):3!=e?Object(r.Message)({showClose:!0,message:t.msg||"审核失败！",type:"error",duration:0}):Object(r.Message)({showClose:!0,message:t.msg||"下线失败！",type:"error",duration:0})},function(e){Object(r.Message)({showClose:!0,message:"接口异常！",type:"error",duration:0})})},methodGetUrl:function(e){return e.indexOf("data:image/jpeg")<0?this.imgUrlHeader+e:e},saveImg:function(){var e=this,t=this,a=new Image;a.src=u()("#box")[0].toDataURL("image/jpeg"),a.onload=function(){a.width=e.ogWidth,a.height=e.ogHeight;var i=document.createElement("canvas"),o=i.getContext("2d");i.width=e.ogWidth,i.height=e.ogHeight,o.drawImage(a,0,0,a.width,a.height),o.scale(1,1);var n=i.toDataURL("image/jpeg"),l={url:"http://10.85.125.61:13145/push_result.json",param:{id:e.item.id,pic_data:n,username:e.email}},c=new URLSearchParams;c.append("data",s()(l)),c.append("cip",230),e.$store.dispatch("ProxyPost",c).then(function(a){if(a&&200==a.code){var i=!0;t.item.info.forEach(function(e,a){e.username==t.email&&(e.mask_url=n,i=!1)}),i&&e.item.info.push({id:e.item.id,mask_url:n,username:e.email,check_user:"",check_type:""}),e.closeDrawImg(),Object(r.Message)({showClose:!1,message:"图片保存成功",type:"success",duration:1e3})}else Object(r.Message)({showClose:!0,message:a.msg||"图片保存失败！",type:"error",duration:0})},function(e){Object(r.Message)({showClose:!0,message:"图片保存接口异常！",type:"error",duration:0})})}},imgLoad:function(){var e=this,t=this,a=u()("#box")[0],i=new Image;i.crossOrigin="anonymous",i.style="opacity: .6;",i.src=this.imgMaskUrl;var s=a.getContext("2d");i.onload=function(){e.loading.close(),e.ogWidth=i.width,e.ogHeight=i.height;var t=u()("#mask-img").width(),o=u()("#mask-img").height();a.width=t,a.height=o,s.drawImage(i,0,0,t,o);s.getImageData(0,0,t,o);e.scale=i.width/t,s.scale(1,1)},s.lineCap="round",s.strokeStyle="#FFFFFF",s.lineWidth=25,this.drawLine(),u()("#blackBtn").click(function(){u()(".canvas-cover").off("mousedown"),e.drawLine(),s.strokeStyle="#000000",e.painterWidth=25,u()("#round").css("background","black")}),u()("#whiteBtn").click(function(){u()(".canvas-cover").off("mousedown"),e.drawLine(),s.strokeStyle="#FFFFFF",e.painterWidth=25,u()("#round").css("background","#FFFFFF")}),u()("#blackRoundBtn").click(function(){u()(".canvas-cover").off("mousedown").on("mousedown",e.drawRound("black"))}),u()("#whiteRoundBtn").click(function(){u()(".canvas-cover").off("mousedown").on("mousedown",e.drawRound("white"))}),u()("#autoBtn").click(function(){u()(".canvas-cover").off("mousedown").on("mousedown",e.drawAuto("black"))}),u()("#recallBtn").click(function(){if(e.canvasHistory.length>0){e.painterWidth=e.painterWidth-1,s.clearRect(0,0,a.width,a.height);var t=new Image;t.src=e.canvasHistory[e.canvasHistory.length-1].url,t.onload=function(){e.ogWidth=i.width,e.ogHeight=i.height;var o=u()("#mask-img").width(),n=u()("#mask-img").height();a.width=o,a.height=n,s.drawImage(t,0,0,o,n);s.getImageData(0,0,o,n);e.scale=t.width/o,s.scale(1,1),e.painterWidth=e.painterWidth+1,e.canvasHistory.pop()}}else Object(r.Message)({showClose:!1,message:"不能再撤销了",type:"error",duration:1e3})}),u()("#clearBtn").click(function(){s.clearRect(0,0,innerWidth,innerHeight),t.painterWidth=25,round.style.borderRadius="50%",round.style.width="25px",round.style.height="25px",t.isFirst=!0,t.canvasHistory=[],u()("#round").css("background","black"),e.imgLoad()})},closeDrawImg:function(){this.painterWidth=25,this.isFirst=!0,this.drawImg=!1,u()("body").css("overflow","auto")},openDrawImg:function(e){this.drawImg=!0,this.canvasHistory=[],this.canvasOpacity=.5,this.halfWidth=12.5,this.isFirst=!0,u()("body").css("overflow","hidden"),this.loading=this.$loading({fullscreen:!0,text:"Loading",background:"rgba(0, 0, 0, 0.8)"}),this.imgMaskUrl=this.methodGetUrl(e)},drawAuto:function(e){var t=this;this.clearEventListen(),this.painterWidthState=!1;var a=u()("#box")[0],i=a.getContext("2d");i.lineCap="round",i.strokeStyle=e,i.fillStyle=e,this.painterWidth=2;var s={x:0,y:0},o={x:0,y:0},n={x:0,y:0},l={x:0,y:0};function r(){l.x=event.pageX-u()("#box").offset().left,l.y=event.pageY-u()("#box").offset().top,l.x>n.x?(i.lineTo(s.x,s.y),i.lineTo(a.width,s.y),i.lineTo(a.width,a.height),i.lineTo(0,a.height),i.lineTo(0,o.y),i.lineTo(o.x,o.y)):(i.lineTo(o.x,o.y),i.lineTo(0,o.y),i.lineTo(0,a.height),i.lineTo(a.width,a.height),i.lineTo(a.width,s.y),i.lineTo(s.x,s.y)),i.stroke(),i.fill(),t.isClear=!1,u()(".canvas-cover").off("mousemove"),u()(".canvas-cover").off("mouseup"),u()(".canvas-cover").off("mouseleave")}function c(e){var a=e.pageX-u()("#box").offset().left,n=e.pageY-u()("#box").offset().top;t.isClear?i.clearRect(a-8,n-8,16,16):(i.lineCap="lineCap",i.lineJoin="round",a>=s.x&&(s.x=a,s.y=n),a<=o.x&&(o.x=a,o.y=n),i.lineTo(a,n),i.stroke(),u()(".canvas-cover").off("mouseup").on("mouseup",r),u()(".canvas-cover").off("mouseleave").on("mouseleave",r))}u()(".canvas-cover").off("mousedown").on("mousedown",function(e){t.isFirst&&(i.lineWidth=t.painterWidth,t.isFirst=!1);if(t.canvasHistory.push({url:a.toDataURL(),color:i.strokeStyle}),!t.isClear){i.beginPath(),i.lineCap="round";var l=e.pageX-u()("#box").offset().left,r=e.pageY-u()("#box").offset().top;o={x:l,y:r},n={x:l,y:r},s={x:0,y:0},i.moveTo(l,r),i.lineTo(l,r),i.stroke()}u()(".canvas-cover").off("mousemove").on("mousemove",c)})},drawRound:function(e){var t=this;this.clearEventListen(),this.painterWidthState=!1;var a=u()("#box")[0],i=a.getContext("2d");function s(){i.closePath(),i.fill(),t.isClear=!1,u()(".canvas-cover").off("mousemove",o),u()(".canvas-cover").off("mouseup")}function o(e){var a=e.pageX-u()("#box").offset().left,o=e.pageY-u()("#box").offset().top;t.isClear?i.clearRect(a-8,o-8,16,16):(i.lineCap="lineCap",i.lineJoin="round",i.lineTo(a,o),i.stroke(),u()(".canvas-cover").off("mouseup").on("mouseup",s),u()(".canvas-cover").off("mouseleave").on("mouseleave",s))}i.lineCap="round",i.strokeStyle=e,i.fillStyle=e,this.painterWidth=2,u()(".canvas-cover").off().on("mousedown",function(e){t.isFirst&&(i.lineWidth=t.painterWidth,t.isFirst=!1);if(t.canvasHistory.push({url:a.toDataURL(),color:i.strokeStyle}),!t.isClear){i.beginPath(),i.lineCap="round";var s=e.pageX-u()("#box").offset().left,n=e.pageY-u()("#box").offset().top;i.moveTo(s,n),i.lineTo(s,n),i.stroke()}u()(".canvas-cover").off("mousemove").on("mousemove",o)})},clearEventListen:function(){u()(".canvas-cover").unbind(),u()(".draw-img-content").unbind(),u()(".draw-img-content").unbind()},drawLine:function(){var e=this;this.roundState=!0,this.painterWidthState=!0,this.clearEventListen();var t=u()("#box")[0],a=t.getContext("2d"),i=u()("#round")[0];function s(t){var a=t.pageX-u()("#box").offset().left+200,s=t.pageY-u()("#box").offset().top;i.style.display=a<200||s<=0?"none":"block",i.style.left=a-e.halfWidth+"px",i.style.top=s-e.halfWidth+"px"}function o(){i.style.display="none",e.isClear=!1,a.lineCap="round",u()(".draw-img-content").off("mousemove").on("mousemove",s)}function n(t){var s=t.pageX-u()("#box").offset().left,o=t.pageY-u()("#box").offset().top;if(e.isClear)a.clearRect(s-8,o-8,16,16);else{var n=s-e.halfWidth+200,l=o-e.halfWidth;i.style.left=n+"px",i.style.top=l+"px",a.lineCap="round",a.lineJoin="round",a.lineTo(s,o),a.stroke()}}a.lineCap="round",u()("#round").off("mousedown").on("mousedown",function(i){e.isFirst&&(a.lineWidth=e.painterWidth,e.isFirst=!1);if(e.canvasHistory.push({url:t.toDataURL(),color:a.strokeStyle}),!e.isClear){a.beginPath(),a.lineCap="round";var s=i.pageX-u()("#box").offset().left,o=i.pageY-u()("#box").offset().top;a.moveTo(s,o),a.lineTo(s,o),a.stroke()}u()(".draw-img-content").off("mousemove").on("mousemove",n)}),u()("#round").off("mouseup").on("mouseup",o),u()(".draw-img-content").off("mouseleave").on("mouseleave",o),i.style.display="block",i.style.borderRadius="50%",i.style.width="25px",i.style.height="25px",u()(".draw-img-content").off("mousemove").on("mousemove",s)}},mounted:function(){},watch:{canvasOpacity:function(e,t){u()(".canvas-cover").css("opacity",e)},painterWidth:function(e,t){var a=u()("#box")[0].getContext("2d"),i=u()("#round")[0];a.lineWidth=e,this.halfWidth=e/2,i.style.borderRadius=e+"px",i.style.width=e+"px",i.style.height=e+"px"},item:function(){}}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.item?a("el-row",[a("el-col",{staticClass:"item-wrapper clearfix",attrs:{span:24}},[a("h3",{staticStyle:{"padding-left":"20px",height:"30px","line-height":"30px"}},[e._v("\n      图"+e._s(e.item.index)+" 点击图片标注\n      "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:1==e.item.isLabel&&e.adminState,expression:"item.isLabel == 1 && adminState"}],staticClass:"delete-img",staticStyle:{"background-color":"#909399","border-color":"#909399",color:"#fff","border-radius":"20px"},attrs:{type:"text",round:""},on:{click:function(t){e.openPopup(3)}}},[e._v("下线")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:2==e.item.isLabel&&e.adminState,expression:"item.isLabel == 2 && adminState"}],staticClass:"delete-img",attrs:{type:"info",round:"",plain:""},on:{click:function(t){e.openPopup(4)}}},[e._v("已下线")]),e._v(" "),e.item.check_user?a("span",{staticStyle:{"font-weight":"400"}},[e._v("审核人："+e._s(e.item.check_user))]):e._e()],1),e._v(" "),a("div",{staticClass:"item-select"},[a("span",{staticStyle:{"white-space":"nowrap"}},[e._v("发色分类：\n        "),a("span",{staticStyle:{color:"green"}},[e._v(e._s(e.activeState.color))])]),e._v(" "),a("el-select",{staticStyle:{"margin-left":"10px"},attrs:{placeholder:"请选择"},model:{value:e.item.color_state,callback:function(t){e.$set(e.item,"color_state",t)},expression:"item.color_state"}},e._l(e.colorOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("span",{staticStyle:{"margin-left":"20px","white-space":"nowrap"}},[e._v("长短分类：\n        "),a("span",{staticStyle:{color:"green"}},[e._v(e._s(e.activeState.len))])]),e._v(" "),a("el-select",{staticStyle:{"margin-left":"10px"},attrs:{placeholder:"请选择"},model:{value:e.item.len_state,callback:function(t){e.$set(e.item,"len_state",t)},expression:"item.len_state"}},e._l(e.lenOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("span",{staticStyle:{"margin-left":"20px","white-space":"nowrap"}},[e._v("遮挡分类：\n        "),a("span",{staticStyle:{color:"green"}},[e._v(e._s(e.activeState.cover))])]),e._v(" "),a("el-select",{staticStyle:{"margin-left":"10px"},attrs:{placeholder:"请选择"},model:{value:e.item.cover_state,callback:function(t){e.$set(e.item,"cover_state",t)},expression:"item.cover_state"}},e._l(e.coverOptions,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:2!=e.item.isLabel,expression:"item.isLabel != 2"}],staticStyle:{"margin-left":"20px",width:"70px"},attrs:{type:"success",size:"mini",round:""},on:{click:function(t){e.imgStateCheck(5)}}},[e._v("上传")]),e._v(" "),a("el-button",{directives:[{name:"show",rawName:"v-show",value:2==e.item.isLabel,expression:"item.isLabel == 2"}],staticStyle:{"margin-left":"20px",width:"70px"},attrs:{type:"success",size:"mini",round:"",disabled:""},on:{click:function(t){e.imgStateCheck(5)}}},[e._v("上传")])],1),e._v(" "),a("div",{staticStyle:{position:"relative",display:"flex","flex-wrap":"wrap","margin-top":"20px","padding-bottom":"20px"}},[a("div",{staticClass:"item-img-row"},[a("img",{attrs:{height:"250px;",src:e.imgUrlHeader+e.item.pic_url}}),e._v(" "),a("span",{staticClass:"item-img-row-user"},[e._v("原图")])]),e._v(" "),a("div",{staticClass:"item-img-row",attrs:{id:e.item.id},on:{click:function(t){e.openDrawImg(e.item.mask_url)}}},[a("img",{attrs:{height:"250px;",src:e.imgUrlHeader+e.item.mask_url}}),e._v(" "),a("span",{staticClass:"item-img-row-user"},[e._v("粗掩码")])]),e._v(" "),e._l(e.item.info,function(t,i){return a("div",{key:i,staticClass:"item-img-row",attrs:{id:t.id}},[a("img",{attrs:{height:"250px;",src:e.maskUrl(t.mask_url)},on:{click:function(a){e.openDrawImg(t.mask_url)}}}),e._v(" "),a("span",{staticClass:"item-img-row-user"},[e._v(e._s(t.username))]),e._v(" "),1!=t.check_type?a("div",{staticClass:"item-img-row-check-state"},[3===t.check_type?a("span",{staticClass:"state",staticStyle:{color:"rgb(112,196,66)"}},[e._v("审核通过")]):e._e(),e._v(" "),2===t.check_type?a("span",{staticClass:"state",staticStyle:{color:"rgb(244,111,112)"}},[e._v("审核不通过")]):e._e(),e._v(" "),a("span",{staticClass:"check-user"},[e._v(e._s(t.check_user))])]):e._e(),e._v(" "),e.adminState?a("div",{staticClass:"item-img-row-check"},[a("el-button",{attrs:{type:"primary",round:"",size:"mini"},on:{click:function(a){e.checkEvent(1,t,i)}}},[e._v("通过")]),e._v(" "),a("el-button",{attrs:{type:"danger",round:"",size:"mini"},on:{click:function(a){e.checkEvent(2,t,i)}}},[e._v("不通过")])],1):e._e()])})],2)]),e._v(" "),e.drawImg?a("div",[a("div",{staticClass:"mask"}),e._v(" "),a("i",{staticClass:"el-icon-error close-icon",on:{click:e.closeDrawImg}}),e._v(" "),a("div",{staticClass:"draw-img"},[a("div",{staticClass:"draw-img-content"},[a("div",{staticClass:"btn-wrap"},[a("el-button",{attrs:{type:"primary",id:"blackBtn"}},[e._v("黑笔")]),e._v(" "),a("el-button",{attrs:{type:"primary",id:"whiteBtn"}},[e._v("白笔")]),e._v(" "),a("el-button",{attrs:{type:"primary",id:"blackRoundBtn"}},[e._v("黑圈")]),e._v(" "),a("el-button",{attrs:{type:"primary",id:"whiteRoundBtn"}},[e._v("白圈")]),e._v(" "),a("el-button",{attrs:{type:"primary",id:"autoBtn"}},[e._v("线条")]),e._v(" "),a("el-button",{attrs:{type:"primary",id:"recallBtn"}},[e._v("撤回")]),e._v(" "),a("el-button",{attrs:{type:"primary",id:"clearBtn"}},[e._v("重置")]),e._v(" "),a("el-button",{attrs:{type:"primary",id:"saveBtn"},on:{click:e.saveImg}},[e._v("保存")]),e._v(" "),e.painterWidthState?a("el-slider",{staticClass:"range",attrs:{"show-input":"",min:1,max:50},model:{value:e.painterWidth,callback:function(t){e.painterWidth=t},expression:"painterWidth"}}):e._e(),e._v(" "),e.painterWidthState?e._e():a("el-slider",{staticClass:"range",attrs:{"show-input":"",min:1,max:50,disabled:""},model:{value:e.painterWidth,callback:function(t){e.painterWidth=t},expression:"painterWidth"}}),e._v(" "),a("el-slider",{staticClass:"range",attrs:{"show-input":"",step:.1,min:0,max:1},model:{value:e.canvasOpacity,callback:function(t){e.canvasOpacity=t},expression:"canvasOpacity"}})],1),e._v(" "),a("img",{attrs:{id:"mask-img",src:e.imgUrlHeader+e.item.pic_url,draggable:"false"},on:{load:e.imgLoad}}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.roundState,expression:"roundState"}],staticClass:"round",attrs:{id:"round"}}),e._v(" "),a("canvas",{staticClass:"canvas-cover",attrs:{id:"box"}})])])]):e._e()],1):e._e()},staticRenderFns:[]};var v=a("VU/8")(d,p,!1,function(e){a("9Uu7"),a("Y/kO")},"data-v-61d9c1d3",null).exports,f={name:"Hair",components:{Auth:c.a,ItemList:v},data:function(){return{formInline:{id:"",type:"",group:"1,50",page:1,count:10,isLabel:"",checkType:""},color_state:"",len_state:"",cover_state:"",searchName:"",time:"",total:0,list:[],curIndex:1,itemCheckType:""}},computed:n()({showItem:function(){return function(e){return this.getShowItem(e)}}},Object(l.b)(["pageAuth","email"])),methods:{getShowItem:function(e){var t=!0,a=!0;return e.info.forEach(function(e,i){t=2!==e.check_type&&t,a=3!==e.check_type&&a}),2!==this.itemCheckType||(t||a)},init:function(){1===this.pageAuth&&this.onSearch()},onSearch:function(){var e=this;this.itemCheckType=this.formInline.checkType,this.list=[];var t=this.time;t=t||0;var a={url:"http://10.85.125.61:13145/query.json",param:n()({},this.formInline,{time:t,username:this.searchName,color_state:this.color_state,len_state:this.len_state,cover_state:this.cover_state})},i={data:s()(a),cip:230};this.$store.dispatch("ProxyGet",i).then(function(t){t&&200==t.code?(e.curIndex=Number(e.formInline.group.split(",")[0]),e.list=t.result.data,e.total=t.result.total):Object(r.Message)({showClose:!0,message:t.msg||"图片查询失败！",type:"error",duration:0})},function(e){Object(r.Message)({showClose:!0,message:"图片查询接口异常！",type:"error",duration:0})})},handleSizeChange:function(e){this.formInline.count=e,this.onSearch()},handleCurrentChange:function(e){this.formInline.page=e,this.onSearch()}},created:function(){this.init()},watch:{pageAuth:function(){this.init()}}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return 1===e.pageAuth?a("el-main",[a("el-row",{staticClass:"pane-title-wrap"},[a("el-col",{attrs:{span:24}},[a("h6",{staticClass:"pane-title"},[e._v("人像分割标注-头发")])])],1),e._v(" "),a("el-row",{staticClass:"search-form-wrap"},[a("el-col",{attrs:{span:24}},[a("el-form",{attrs:{inline:"",model:e.formInline,size:"small"}},[a("el-form-item",{attrs:{label:"图片id"}},[a("el-input",{staticStyle:{"min-width":"290px"},attrs:{placeholder:"请输入图片id",clearable:""},model:{value:e.formInline.id,callback:function(t){e.$set(e.formInline,"id",t)},expression:"formInline.id"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"用户名"}},[a("el-input",{staticStyle:{"min-width":"290px"},attrs:{placeholder:"请输入用户名称",clearable:""},model:{value:e.searchName,callback:function(t){e.searchName=t},expression:"searchName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"类型"}},[a("el-select",{attrs:{placeholder:"请选择标注类型",clearable:""},model:{value:e.formInline.type,callback:function(t){e.$set(e.formInline,"type",t)},expression:"formInline.type"}},[a("el-option",{attrs:{label:"未标注",value:0}}),e._v(" "),a("el-option",{attrs:{label:"已标注",value:1}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"发色分类"}},[a("el-select",{attrs:{placeholder:"请选择",clearable:""},model:{value:e.color_state,callback:function(t){e.color_state=t},expression:"color_state"}},[a("el-option",{attrs:{label:"黑色",value:1}}),e._v(" "),a("el-option",{attrs:{label:"其他",value:2}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"长短分类"}},[a("el-select",{attrs:{placeholder:"请选择",clearable:""},model:{value:e.len_state,callback:function(t){e.len_state=t},expression:"len_state"}},[a("el-option",{attrs:{label:"长",value:1}}),e._v(" "),a("el-option",{attrs:{label:"中",value:2}}),e._v(" "),a("el-option",{attrs:{label:"短",value:3}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"遮挡分类"}},[a("el-select",{attrs:{placeholder:"请选择",clearable:""},model:{value:e.cover_state,callback:function(t){e.cover_state=t},expression:"cover_state"}},[a("el-option",{attrs:{label:"是",value:1}}),e._v(" "),a("el-option",{attrs:{label:"否",value:2}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"审核状态"}},[a("el-select",{attrs:{placeholder:"请选择审核状态",clearable:""},model:{value:e.formInline.checkType,callback:function(t){e.$set(e.formInline,"checkType",t)},expression:"formInline.checkType"}},[a("el-option",{attrs:{label:"未审核",value:1}}),e._v(" "),a("el-option",{attrs:{label:"审核未通过",value:2}}),e._v(" "),a("el-option",{attrs:{label:"审核通过",value:3}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"下线状态"}},[a("el-select",{attrs:{placeholder:"请选择下线状态",clearable:""},model:{value:e.formInline.isLabel,callback:function(t){e.$set(e.formInline,"isLabel",t)},expression:"formInline.isLabel"}},[a("el-option",{attrs:{label:"未下线",value:1}}),e._v(" "),a("el-option",{attrs:{label:"已下线",value:2}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"图片范围"}},[a("el-input",{attrs:{placeholder:"图片范围，英文逗号分隔",clearable:""},model:{value:e.formInline.group,callback:function(t){e.$set(e.formInline,"group",t)},expression:"formInline.group"}})],1),e._v(" "),a("el-form-item",[a("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"timestamp",placeholder:"选择时间"},model:{value:e.time,callback:function(t){e.time=t},expression:"time"}}),e._v(" "),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.onSearch}},[a("span",{staticClass:"hidden-xs-only"},[e._v("查询")])])],1)],1)],1)],1),e._v(" "),a("el-row",{staticClass:"content-box-wrap"},[e._l(e.list,function(t,i){return a("item-list",{directives:[{name:"show",rawName:"v-show",value:e.showItem(t),expression:"showItem(item)"}],key:i,attrs:{item:t,index:(e.formInline.page-1)*e.formInline.count+i+e.curIndex}})}),e._v(" "),a("div",{staticStyle:{"padding-top":"10px",overflow:"auto"}},[a("el-pagination",{attrs:{"current-page":e.formInline.page,"page-sizes":[5,10,20,50,100,200],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],2)],1):0===e.pageAuth?a("el-main",[a("auth")],1):e._e()},staticRenderFns:[]};var _=a("VU/8")(f,g,!1,function(e){a("f93T")},"data-v-1606efd8",null);t.default=_.exports}});