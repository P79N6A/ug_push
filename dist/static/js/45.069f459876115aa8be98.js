webpackJsonp([45],{AKYP:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("mvHQ"),s=i.n(a),n=i("Dd8w"),o=i.n(n),c=i("bOdI"),r=i.n(c),l=i("NYxO"),p=i("zL8q"),m=i("vzON"),h=i("7t+N"),u=i.n(h),d=i("Rfj3"),g={name:"itemList",props:["item","index"],data:function(){return{adminState:!1,drawImg:!1,coordinate:"10.20",popupList:[],spotList:[],saveId:"",lastId:"",thisId:"",spotListHistory:[],imgMaskUrl:"",reacllSpotData:[],imgUrlHeader:"http://10.85.125.60:13142",textArr:["1.(左边眉毛最高点)","2.(左边眉毛眉心点)","3.(右边眉毛最高点)","4.(右边眉毛眉心点)","5.(左边眼皮最高点)","6.(左边眼瞳最低点)","7.(右边眼皮最高点)","8.(右边眼瞳最低点)","9.(左边嘴角)","11.(右边嘴角}","13.(下嘴唇上方中点)","14.左眼内角","15.右眼内角","16.鼻尖下端","17.左边眼球中心","18.右边眼球中心"]}},created:function(){var t=this;d.a.forEach(function(e,i){e.email==t.email&&(t.adminState=!0)})},computed:o()({imgId:function(){return function(t,e){return this.backImgId(t,e)}}},Object(l.b)(["email"])),methods:{openPopup:function(){var t=this;this.$confirm("是否确认下线改组图片","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){t.checkRow(3)}).catch(function(){t.$message({type:"info",message:"已取消下线"})})},checkEvent:function(t,e,i){var a=this;this.$confirm("确定执行审核操作？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a.checkRow(t,e,i)}).catch(function(){a.$message({type:"info",message:"已取消审核"})})},checkRow:function(t,e,i){var a=this;if(3==t)var n={url:"http://10.85.125.60:13142/check_data.json",param:{check_type:t,id:this.item.id,check_user:this.email}};else n={url:"http://10.85.125.60:13142/check_data.json",param:{check_type:t,id:this.item.id,username:e.username,check_user:this.email}};var o={data:s()(n),cip:230};this.$store.dispatch("ProxyGet",o).then(function(e){e&&200==e.code?3!=t?(Object(p.Message)({showClose:!0,message:e.msg||"审核成功！",type:"success",duration:1500}),1==t?(a.item.info[i].check_type=3,a.item.info[i].check_user=a.email):(a.item.info[i].check_type=2,a.item.info[i].check_user=a.email)):(Object(p.Message)({showClose:!0,message:e.msg||"下线成功！",type:"success",duration:1500}),a.item.isLabel=2):3!=t?Object(p.Message)({showClose:!0,message:e.msg||"审核失败！",type:"error",duration:0}):Object(p.Message)({showClose:!0,message:e.msg||"下线失败！",type:"error",duration:0})},function(t){Object(p.Message)({showClose:!0,message:"接口异常！",type:"error",duration:0})})},saveSpot:function(){var t=this,e=this;u()(document).off("keydown");var i=u()("#max-img").width(),a=u()("#max-img").height(),n=this.spotList.map(function(t,e){return{x:Math.round((parseFloat(t.left.split("px")[0])+2-200)/i*1e4)/1e4,y:Math.round((parseFloat(t.top.split("px")[0])+2)/a*1e4)/1e4}}),o={url:"http://10.85.125.60:13142/push_result.json",param:{id:this.item.id,username:this.email,landmark:s()(n)}},c={data:s()(o),cip:230};this.$store.dispatch("ProxyGet",c).then(function(i){if(i&&200==i.code){var a=e.item.id,o=!0;e.item.info.forEach(function(t,i){t.username==e.email&&(t.landmark=JSON.parse(s()(n)),a=a.split(".jpg")[0]+i,o=!1)}),o&&t.item.info.push({landmark:JSON.parse(s()(n)),username:t.email,check_user:"",check_type:""}),t.miniImgLoad(n,a),e.drawImg=!1,u()("body").css("overflow","auto"),Object(p.Message)({showClose:!0,message:"保存成功！",type:"success",duration:1e3})}else Object(p.Message)({showClose:!0,message:i.msg||"数据保存失败！",type:"error",duration:0})},function(t){Object(p.Message)({showClose:!0,message:"数据保存接口异常！",type:"error",duration:0})})},backImgId:function(t,e){return t.split(".jpg")[0]+e},reacllSpot:function(){var t=u()("#max-img").width(),e=u()("#max-img").height();this.spotList[this.thisId].left=t*this.popupList[this.thisId].x-2+200+"px",this.spotList[this.thisId].top=e*this.popupList[this.thisId].y-2+"px",u()("#"+this.thisId).animate({height:"15px",width:"15px","border-radius":"50%"},100),u()("#"+this.thisId).animate({height:"4px",width:"4px","border-radius":"50%"},100)},changeSpot:function(t){var e=this;function i(i,a){var s=parseInt(e.spotList[t-1].left.split("px")[0]),n=parseInt(e.spotList[t-1].top.split("px")[0]);("a"===i||"d"===i)&&s<u()("#max-img").width()+198&&s>198?e.spotList[t-1].left=parseInt(e.spotList[t-1].left.split("px")[0])+a+"px":("w"===i||"s"===i)&&n<u()("#max-img").height()-2&&n>-2&&(e.spotList[t-1].top=parseInt(e.spotList[t-1].top.split("px")[0])+a+"px")}this.thisId=t-1,this.spotListHistory.push({index:t-1,left:e.spotList[t-1].left,top:e.spotList[t-1].top}),""===this.lastId?this.spotList[t-1].background="yellow":(this.spotList[this.lastId-1].background="red",this.spotList[t-1].background="yellow"),u()("#"+(t-1)).animate({height:"15px",width:"15px","border-radius":"50%"},100),u()("#"+(t-1)).animate({height:"4px",width:"4px","border-radius":"50%"},100),this.lastId=t,u()("#max-img").off("click").on("click",function(i){e.spotList[t-1].left=i.pageX-u()("#max-img").offset().left-2+200+"px",e.spotList[t-1].top=i.pageY-u()("#max-img").offset().top-2+"px"}),u()(document).off("keydown").on("keydown",function(t){switch(t.keyCode){case 87:i("w",-1);break;case 65:i("a",-1);break;case 83:i("s",1);break;case 68:i("d",1)}})},miniImgLoad:function(t,e){u()("#"+e+"canvas").remove();var i=u()("#"+e).width(),a=u()("#"+e).height(),s=u()("<canvas>").css({position:"absolute",top:"0",left:"0","z-index":"10"})[0],n=s.getContext("2d");s.width=i,s.height=a,s.id=e+"canvas",t.forEach(function(t,e){n.beginPath(),n.fillStyle="#FF0000";var s=i*t.x,o=a*t.y;n.arc(s,o,1,0,2*Math.PI,!0),n.closePath(),n.fill()}),u()("#"+e).after(s)},imgload:function(){var t=u()("#max-img").width(),e=u()("#max-img").height();if(this.popupList.length<=11){for(var i=0;i<5;)this.popupList.push({x:0,y:0}),i++;this.popupList.push}this.spotList=this.popupList.map(function(i,a){return{left:t*i.x-2+200+"px",top:e*i.y-2+"px",background:"red"}}),u()("#max-img").off("click"),u()(document).off("keydown")},openDrawImg:function(t,e){this.drawImg=!0,this.spotListHistory=[],this.saveId=e,u()("body").css("overflow","hidden"),this.popupList=t},closeDrawImg:function(){this.drawImg=!1,this.popupList=[],u()("body").css("overflow","auto"),u()(document).off("keydown")}}},f={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.item?i("el-row",[i("el-col",{staticClass:"item-wrapper clearfix",attrs:{span:24}},[i("h3",{staticStyle:{"padding-left":"20px",height:"30px","line-height":"30px"}},[t._v("图"+t._s(t.item.index)+" 点击图片标注\n      "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:1==t.item.isLabel&&t.adminState,expression:"item.isLabel == 1 && adminState"}],staticClass:"delete-img",staticStyle:{"background-color":"#909399","border-color":"#909399",color:"#fff","border-radius":"20px"},attrs:{size:"mini",type:"text",round:""},on:{click:t.openPopup}},[t._v("\n        下线\n      ")]),t._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:2==t.item.isLabel&&t.adminState,expression:"item.isLabel == 2 && adminState"}],staticClass:"delete-img",attrs:{size:"mini",type:"info",round:"",plain:"",disabled:""}},[t._v("\n        已下线\n      ")])],1),t._v(" "),i("div",{staticStyle:{position:"relative",display:"flex","flex-wrap":"wrap","margin-top":"20px","padding-bottom":"20px"}},[i("div",{staticClass:"item-img-row",on:{click:function(e){t.openDrawImg(t.item.landmark,t.imgId(t.item.id,-1))}}},[i("div",{staticClass:"item-img-row-draw"},[i("img",{attrs:{height:"250px;",src:t.imgUrlHeader+t.item.pic_url,id:t.imgId(t.item.id,-1)},on:{load:function(e){t.miniImgLoad(t.item.landmark,t.imgId(t.item.id,-1))}}})]),t._v(" "),i("span",[t._v("原图")])]),t._v(" "),t._l(t.item.info,function(e,a){return i("div",{key:a,staticClass:"item-img-row",on:{click:function(i){t.openDrawImg(e.landmark,t.imgId(t.item.id,a))}}},[i("div",{staticClass:"item-img-row-draw"},[i("img",{attrs:{height:"250px;",id:t.imgId(t.item.id,a),src:t.imgUrlHeader+t.item.pic_url},on:{load:function(i){t.miniImgLoad(e.landmark,t.imgId(t.item.id,a))}}})]),t._v(" "),i("span",{staticClass:"item-img-row-user"},[t._v(t._s(e.username))]),t._v(" "),3===e.check_type||2===e.check_type?i("div",{staticClass:"item-img-row-check-state"},[3===e.check_type?i("span",{staticClass:"state",staticStyle:{color:"rgb(112,196,66)"}},[t._v("审核通过")]):t._e(),t._v(" "),2===e.check_type?i("span",{staticClass:"state",staticStyle:{color:"rgb(244,111,112)"}},[t._v("审核不通过")]):t._e(),t._v(" "),i("span",{staticClass:"check-user"},[t._v(t._s(e.check_user))])]):t._e(),t._v(" "),t.adminState?i("div",{staticClass:"item-img-row-check"},[i("el-button",{attrs:{type:"primary",round:"",size:"mini"},on:{click:function(i){i.stopPropagation(),t.checkEvent(1,e,a)}}},[t._v("通过")]),t._v(" "),i("el-button",{attrs:{type:"danger",round:"",size:"mini"},on:{click:function(i){i.stopPropagation(),t.checkEvent(2,e,a)}}},[t._v("不通过")])],1):t._e()])})],2)]),t._v(" "),t.drawImg?i("div",[i("div",{staticClass:"mask"}),t._v(" "),i("i",{staticClass:"el-icon-error close-icon",on:{click:t.closeDrawImg}}),t._v(" "),i("div",{staticClass:"draw-img"},[i("div",{staticClass:"draw-img-content"},[i("div",{staticClass:"btn-wrap-left"},[i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(1)}}},[t._v("1.(左边眉毛最高点)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(2)}}},[t._v("2.(左边眉毛眉心点)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(5)}}},[t._v("5.(左边眼皮最高点)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(6)}}},[t._v("6.(左边眼瞳最低点)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(9)}}},[t._v("9.(左边嘴角)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(11)}}},[t._v("13.(下嘴唇上方中点)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(12)}}},[t._v("14.(左眼内角)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(14)}}},[t._v("16.(鼻尖下端)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(15)}}},[t._v("17.(左边眼球中心)")])],1),t._v(" "),i("img",{staticClass:"img-back",attrs:{id:"max-img",draggable:"false",src:t.imgUrlHeader+t.item.pic_url},on:{load:t.imgload}}),t._v(" "),t._l(t.spotList,function(e,a){return i("el-tooltip",{key:a,staticClass:"item",attrs:{effect:"light",content:t.textArr[a],placement:"top-start"}},[i("div",{staticClass:"round",style:e,attrs:{id:a},on:{click:function(e){t.changeSpot(a+1)}}})])}),t._v(" "),i("div",{staticClass:"btn-wrap-right"},[i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(3)}}},[t._v("3.(右边眉毛最高点)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(4)}}},[t._v("4.(右边眉毛眉心点)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(7)}}},[t._v("7.(右边眼皮最高点)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(8)}}},[t._v("8.(右边眼瞳最低点)")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(10)}}},[t._v("11.(右边嘴角}")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(13)}}},[t._v("15.(右眼内角}")]),t._v(" "),i("el-button",{staticClass:"change-btn",attrs:{type:"primary",plain:""},on:{click:function(e){t.changeSpot(16)}}},[t._v("18.(右边眼球中心)")]),t._v(" "),i("div",{staticClass:"save-btn"},[i("el-button",{attrs:{type:"success"},on:{click:t.saveSpot}},[t._v("保存")]),t._v(" "),i("el-button",{staticStyle:{width:"200px"},attrs:{type:"info"},on:{click:t.reacllSpot}},[t._v("单点重置")]),t._v(" "),i("el-button",{staticStyle:{width:"200px"},attrs:{type:"warning"},on:{click:t.imgload}},[t._v("全部重置")])],1)],1)],2)])]):t._e()],1):t._e()},staticRenderFns:[]};var v=i("VU/8")(g,f,!1,function(t){i("XfBA")},"data-v-524b0270",null).exports,b={name:"MarkEmoticon",components:{Auth:m.a,ItemList:v},data:function(){var t;return t={formInline:{id:"",type:"",group:"1,50",page:1,count:5,isLabel:"",checkType:""},searchName:"",time:""},r()(t,"searchName",""),r()(t,"total",0),r()(t,"curIndex",1),r()(t,"list",[]),t},computed:o()({},Object(l.b)(["pageAuth","email"])),created:function(){this.init()},watch:{pageAuth:function(){this.init()}},methods:{init:function(){1===this.pageAuth&&this.onSearch()},onSearch:function(){var t=this;this.list=[];var e=this.time;e=e||0;var i={url:"http://10.85.125.60:13142/query.json",param:o()({},this.formInline,{time:e,username:this.searchName})},a={data:s()(i),cip:230};this.$store.dispatch("ProxyGet",a).then(function(e){e&&200==e.code?(t.curIndex=Number(t.formInline.group.split(",")[0]),t.list=e.result.data,t.total=e.result.total):Object(p.Message)({showClose:!0,message:e.msg||"图片查询失败！",type:"error",duration:0})},function(t){Object(p.Message)({showClose:!0,message:"图片查询接口异常！",type:"error",duration:0})})},handleSizeChange:function(t){this.formInline.count=t,this.onSearch()},handleCurrentChange:function(t){this.formInline.page=t,this.onSearch()}}},y={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return 1===t.pageAuth?i("el-main",[i("el-row",{staticClass:"pane-title-wrap"},[i("el-col",{attrs:{span:24}},[i("h6",{staticClass:"pane-title"},[t._v("人像表情标注")])])],1),t._v(" "),i("el-row",{staticClass:"search-form-wrap"},[i("el-col",{attrs:{span:24}},[i("el-form",{attrs:{inline:"",model:t.formInline,size:"small"}},[i("el-form-item",{attrs:{label:"图片id"}},[i("el-input",{staticStyle:{"min-width":"290px"},attrs:{placeholder:"请输入图片id",clearable:""},model:{value:t.formInline.id,callback:function(e){t.$set(t.formInline,"id",e)},expression:"formInline.id"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"用户名"}},[i("el-input",{staticStyle:{"min-width":"170px"},attrs:{placeholder:"请输入用户名",clearable:""},model:{value:t.searchName,callback:function(e){t.searchName=e},expression:"searchName"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"类型"}},[i("el-select",{attrs:{placeholder:"请选择标注类型",clearable:""},model:{value:t.formInline.type,callback:function(e){t.$set(t.formInline,"type",e)},expression:"formInline.type"}},[i("el-option",{attrs:{label:"未标注",value:0}}),t._v(" "),i("el-option",{attrs:{label:"已标注",value:1}})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"审核状态"}},[i("el-select",{attrs:{placeholder:"请选择审核状态",clearable:""},model:{value:t.formInline.checkType,callback:function(e){t.$set(t.formInline,"checkType",e)},expression:"formInline.checkType"}},[i("el-option",{attrs:{label:"未审核",value:1}}),t._v(" "),i("el-option",{attrs:{label:"审核未通过",value:2}}),t._v(" "),i("el-option",{attrs:{label:"审核通过",value:3}})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"下线状态"}},[i("el-select",{attrs:{placeholder:"请选择下线状态",clearable:""},model:{value:t.formInline.isLabel,callback:function(e){t.$set(t.formInline,"isLabel",e)},expression:"formInline.isLabel"}},[i("el-option",{attrs:{label:"未下线",value:1}}),t._v(" "),i("el-option",{attrs:{label:"已下线",value:2}})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"图片范围"}},[i("el-input",{attrs:{placeholder:"图片范围，英文逗号分隔",clearable:""},model:{value:t.formInline.group,callback:function(e){t.$set(t.formInline,"group",e)},expression:"formInline.group"}})],1),t._v(" "),i("el-form-item",[i("el-date-picker",{staticStyle:{"margin-bottom":"5px",width:"170px"},attrs:{type:"date",format:"yyyy年MM月dd日","value-format":"timestamp",placeholder:"选择时间"},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}}),t._v(" "),i("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.onSearch}},[i("span",{staticClass:"hidden-xs-only"},[t._v("查询")])])],1)],1)],1)],1),t._v(" "),i("el-row",{staticClass:"content-box-wrap"},[t._l(t.list,function(e,a){return i("item-list",{key:a,attrs:{item:e,index:(t.formInline.page-1)*t.formInline.count+a+t.curIndex}})}),t._v(" "),i("div",{staticStyle:{"padding-top":"10px",overflow:"auto"}},[i("el-pagination",{attrs:{"current-page":t.formInline.page,"page-sizes":[5,10,20],"page-size":10,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],2)],1):0===t.pageAuth?i("el-main",[i("auth")],1):t._e()},staticRenderFns:[]};var _=i("VU/8")(b,y,!1,function(t){i("xT4h")},"data-v-137fb9ec",null);e.default=_.exports},XfBA:function(t,e){},xT4h:function(t,e){}});