webpackJsonp([9],{"8aou":function(t,e){},Cj7x:function(t,e){},g4n6:function(t,e){},kCe2:function(t,e,a){"use strict";var l={name:"PanThumb",props:{image:{type:String,required:!0},zIndex:{type:Number,default:100},width:{type:String,default:"150px"},height:{type:String,default:"150px"}}},s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"pan-item",style:{zIndex:this.zIndex,height:this.height,width:this.width}},[e("div",{staticClass:"pan-info"},[e("div",{staticClass:"pan-info-roles-container"},[this._t("default")],2)]),this._v(" "),e("img",{staticClass:"pan-thumb",attrs:{src:this.image}})])},staticRenderFns:[]};var n=a("VU/8")(l,s,!1,function(t){a("Cj7x")},"data-v-530f5f14",null);e.a=n.exports},p37l:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("mvHQ"),s=a.n(l),n=a("Dd8w"),i=a.n(n),r=a("kCe2"),o=a("vzON"),c=a("NYxO"),u=a("0xDb"),m={name:"querymaterial",components:{Auth:o.a,PanThumb:r.a},data:function(){return{formInline:{mid:"4284911404421928",loading:!1},searchTimer:null,list:null,tips:null,materialData:null}},computed:i()({},Object(c.b)(["materialInfo","authorInfo","authorType","pageAuth"])),methods:{init:function(){1===this.pageAuth&&this.onSearch()},onSearch:function(){this.formInline.loading=!0,this.searchTimer||this.setTimer();var t={url:"http://10.85.115.126:8077/get_mid_info",param:{mid:this.formInline.mid}},e={data:s()(t),cip:230};this.$store.dispatch("GetMaterial",e),this.getAuthor()},getAuthor:function(){var t={url:"http://mlplat.intra.weibo.com/lab/showbatch",param:{ids:this.formInline.mid}},e={data:s()(t),cip:230},a={url:"http://172.16.105.67:8091/newtest1011/getMidPersona.html",param:{mid:this.formInline.mid}},l={data:s()(a),cip:230};this.$store.dispatch("ShowBatch",e),this.$store.dispatch("AuthorType",l)},setTimer:function(){var t=this;this.searchTimer=setTimeout(function(){t.formInline.loading&&(t.formInline.loading=!1),t.searchTimer=null},5e3)},focusEvent:function(){this.formInline.loading&&(this.formInline.loading=!1)},setSex:function(t){var e="其他";switch(t){case"male":e="男性";break;case"female":e="女性";break;case"other":e="其他";break;case"all":e="全部";break;default:e="其他"}return e},setAge:function(t){return"other"==t?"其他":"all"==t?"全部":t+"后"},setNum:function(t,e,a){return Object(u.b)(a)},setTagName:function(t,e,a){return a.trim()||"未知"},getSummaries:function(t){t.columns,t.data;var e=[];if(this.materialData){var a=this.materialData.expose_num?Object(u.d)(this.materialData.act_num/this.materialData.expose_num):"0%",l=this.materialData.expose_num?Object(u.d)(this.materialData.inter_act_num/this.materialData.expose_num):"0%";e=["合计","所有年龄","所有性别",Object(u.b)(this.materialData.expose_num),Object(u.b)(this.materialData.act_num),a,Object(u.b)(this.materialData.inter_act_num),l]}return e},_formatNum:function(t){return Object(u.b)(t)},_parsePercent:function(t){return Object(u.d)(t)},analyData:function(){var t=this.materialData.age_gender_expose_rate;this.list=[];for(var e={age70:{age:"70",sex:"all",expose_num:0,click_num:0,act_num:0},age80:{age:"80",sex:"all",expose_num:0,click_num:0,act_num:0},age90:{age:"90",sex:"all",expose_num:0,click_num:0,act_num:0},age00:{age:"00",sex:"all",expose_num:0,click_num:0,act_num:0},ageother:{age:"other",sex:"all",expose_num:0,click_num:0,act_num:0}},a={sexmale:{age:"all",sex:"male",expose_num:0,click_num:0,act_num:0},sexfemale:{age:"all",sex:"female",expose_num:0,click_num:0,act_num:0},sexother:{age:"all",sex:"other",expose_num:0,click_num:0,act_num:0}},l=0;l<t.length;l++){var s=t[l];"other"!=s.age&&"other"==s.sex||this.addList(s),e["age"+s.age].expose_num+=s.expose_num,e["age"+s.age].click_num+=s.click_num,e["age"+s.age].act_num+=s.act_num,a["sex"+s.sex].expose_num+=s.expose_num,a["sex"+s.sex].click_num+=s.click_num,a["sex"+s.sex].act_num+=s.act_num}this.addList(e.age70),this.addList(e.age80),this.addList(e.age90),this.addList(e.age00),this.addList(e.ageother),this.addList(a.sexmale),this.addList(a.sexfemale),this.addList(a.sexother)},addList:function(t){var e=0,a=0;t.expose_num&&(e=t.click_num/t.expose_num,a=t.act_num/t.expose_num),t.click_rate=e,t.act_rate=a,this.list.push(t)},filterHandler:function(t,e,a){return e[a.property]===t}},created:function(){this.init()},watch:{materialInfo:function(){this.materialInfo&&(this.formInline.loading=!1,this.tips=this.materialInfo.msg,this.materialInfo.data&&this.materialInfo.data.age_gender_expose_rate&&(this.materialData=this.materialInfo.data,this.analyData()))},pageAuth:function(){this.init()},authorInfo:function(){},authorType:function(){}}},h={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return 1===t.pageAuth?a("el-main",{staticStyle:{padding:"20px 14px"}},[a("el-row",{attrs:{type:"flex",align:"middle",justify:"left"}},[a("el-col",{staticClass:"main-title",attrs:{sm:8,md:6,lg:4,xl:2}},[a("i",{staticClass:"el-icon-goods hidden-xs-only"}),t._v("热门微博物料查询\n    ")]),t._v(" "),a("el-col",{attrs:{sm:16,md:12,lg:8,xl:4}},[a("el-form",{attrs:{inline:!0,size:"small"}},[a("el-form-item",[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入mid查询物料",clearable:""},on:{focus:function(e){t.focusEvent()}},model:{value:t.formInline.mid,callback:function(e){t.$set(t.formInline,"mid",e)},expression:"formInline.mid"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",icon:"el-icon-search",loading:t.formInline.loading},on:{click:t.onSearch}},[a("span",{staticClass:"hidden-xs-only"},[t._v("查询")])])],1)],1)],1)],1),t._v(" "),t.tips?a("el-row",{attrs:{type:"flex",justify:"center"}},[a("el-col",{staticClass:"error-msg"},[a("el-alert",{attrs:{title:t.tips,type:"warning","show-icon":"",closable:!1}})],1)],1):t._e(),t._v(" "),t.authorInfo&&t.authorInfo.user?a("el-row",{staticClass:"thumb-box",attrs:{type:"flex",align:"middle",justify:"center"}},[a("el-col",{attrs:{title:"进入<"+t.authorInfo.user.name+">的主页"}},[a("el-row",{staticClass:"thumb-wrap",attrs:{type:"flex",align:"middle"}},[a("a",{staticStyle:{display:"inline-block","font-size":"12px",color:"#606266"},attrs:{href:"//weibo.com/"+t.authorInfo.user.profile_url,target:"_blank"}},[a("pan-thumb",{staticClass:"thumb-content",attrs:{image:t.authorInfo.user.avatar_hd,width:"60px",height:"60px"}},[t._v(t._s(t.authorInfo.user.name))])],1),t._v(" "),a("a",{staticClass:"author-name",attrs:{title:t.authorInfo.user.name,href:"//weibo.com/"+t.authorInfo.user.profile_url,target:"_blank"}},[t._v(t._s(t.authorInfo.user.name))])])],1)],1):t._e(),t._v(" "),t.authorInfo&&t.authorInfo.user?a("el-row",{staticClass:"thumb-box",staticStyle:{"margin-left":"2%"}},[a("el-col",{attrs:{xs:24,sm:5,md:5,lg:5,xl:5}},[a("span",{staticClass:"info-label",staticStyle:{color:"#e65d6e"}},[t._v("【关注数】")]),t._v(" "),a("span",{staticClass:"info-value"},[t._v(t._s(t._formatNum(t.authorInfo.user.friends_count)))])]),t._v(" "),a("el-col",{attrs:{xs:24,sm:5,md:5,lg:5,xl:5}},[a("span",{staticClass:"info-label",staticStyle:{color:"#30b08f"}},[t._v("【粉丝数】")]),t._v(" "),a("span",{staticClass:"info-value"},[t._v(t._s(t._formatNum(t.authorInfo.user.followers_count)))])]),t._v(" "),a("el-col",{attrs:{xs:24,sm:5,md:5,lg:5,xl:5}},[a("span",{staticClass:"info-label",staticStyle:{color:"#4ab7bd"}},[t._v("【发博量】")]),t._v(" "),a("span",{staticClass:"info-value"},[t._v(t._s(t._formatNum(t.authorInfo.user.statuses_count)))])]),t._v(" "),t.authorType?a("el-col",{attrs:{xs:24,sm:4,md:4,lg:4,xl:4}},[a("span",{staticClass:"info-label",staticStyle:{color:"#fec171"}},[t._v("【V类型】")]),t._v(" "),a("span",{staticClass:"info-value"},[t._v(t._s(t.authorType.vtype))])]):t._e(),t._v(" "),t.authorType?a("el-col",{attrs:{xs:24,sm:4,md:4,lg:4,xl:4}},[a("span",{staticClass:"info-label",staticStyle:{color:"#3a71a8"}},[t._v("【Clevel】")]),t._v(" "),a("span",{staticClass:"info-value"},[t._v(t._s(t.authorType.clevel))])]):t._e()],1):t._e(),t._v(" "),t.authorInfo?a("el-row",{staticClass:"content-box",attrs:{type:"flex",justify:"center"}},[a("el-col",[a("el-row",[a("a",{staticClass:"info-link",attrs:{target:"_blank",href:t.authorInfo.link}},[t._v("查看微博")])]),t._v(" "),a("el-popover",{ref:"content",attrs:{placement:"top",trigger:"hover",content:t.authorInfo.text,"popper-class":"content-pop","visible-arrow":!1}}),t._v(" "),a("el-row",{directives:[{name:"popover",rawName:"v-popover:content",arg:"content"}],staticClass:"content-text"},[t._v(t._s(t.authorInfo.text))])],1)],1):t._e(),t._v(" "),t.list?a("el-row",{staticClass:"table-wrap"},[a("el-col",{staticStyle:{"margin-right":"10px"},attrs:{xs:24,sm:15,md:15,lg:15,xl:15}},[a("div",{staticClass:"table-title left"},[t._v("物料详情")]),t._v(" "),a("el-table",{staticStyle:{width:"100%",border:"1px solid #f0f2f5"},attrs:{data:t.list,stripe:"","summary-method":t.getSummaries,"show-summary":"","sum-text":"总计"}},[a("el-table-column",{attrs:{width:"50",type:"index",align:"center",fixed:"",label:"序号"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"100",prop:"age",label:"年龄",filters:[{text:"70后",value:"70"},{text:"80后",value:"80"},{text:"90后",value:"90"},{text:"00后",value:"00"},{text:"其他",value:"other"},{text:"全部",value:"all"}],"filter-method":t.filterHandler},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"all"===e.row.age?"danger":"success"}},[t._v(t._s(t.setAge(e.row.age)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",width:"100",prop:"sex",label:"性别",filters:[{text:"男性",value:"male"},{text:"女性",value:"female"},{text:"其他",value:"other"},{text:"全部",value:"all"}],"filter-method":t.filterHandler},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"all"===e.row.sex?"danger":"warning"}},[t._v(t._s(t.setSex(e.row.sex)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{sortable:"",align:"center","min-width":"90",prop:"expose_num",label:"曝光量",formatter:t.setNum}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",align:"center","min-width":"90",prop:"click_num",label:"点击量",formatter:t.setNum}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",align:"center","min-width":"90",prop:"click_rate",label:"点击率"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:0===Number(e.row.click_num)?"danger":"primary"}},[t._v(t._s(t._parsePercent(e.row.click_rate)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{sortable:"",align:"center","min-width":"90",prop:"act_num",label:"互动量",formatter:t.setNum}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",align:"center","min-width":"90",prop:"act_rate",label:"互动率"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:0===Number(e.row.act_num)?"danger":"primary"}},[t._v(t._s(t._parsePercent(e.row.act_rate)))])]}}])})],1)],1),t._v(" "),a("el-col",{attrs:{xs:24,sm:8,md:8,lg:8,xl:8}},[a("div",{staticClass:"table-title left"},[t._v("标签权重")]),t._v(" "),a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.materialData.content_tag,border:"",stripe:""}},[a("el-table-column",{attrs:{align:"left",prop:"tagid",label:"标签ID"}}),t._v(" "),a("el-table-column",{attrs:{align:"left",prop:"name",label:"标签名",formatter:t.setTagName,"show-overflow-tooltip":""}}),t._v(" "),a("el-table-column",{attrs:{sortable:"",align:"left",prop:"rel_weight",label:"权重"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tag",{attrs:{type:"primary"}},[t._v(t._s(t._parsePercent(e.row.rel_weight)))])]}}])})],1)],1)],1):t._e()],1):0===t.pageAuth?a("el-main",[a("auth")],1):t._e()},staticRenderFns:[]};var _=a("VU/8")(m,h,!1,function(t){a("8aou"),a("g4n6")},"data-v-c85aadae",null);e.default=_.exports}});