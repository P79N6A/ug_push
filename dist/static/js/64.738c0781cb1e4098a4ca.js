webpackJsonp([64],{mpnk:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("mvHQ"),s=r.n(a),o=(r("NYxO"),r("zL8q")),n={components:{},props:{},data:function(){return{time:"",username:"",defaultData:"preview",title:"",content:"",tabList:[],editConfig:{bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,superscript:!0,subscript:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,fullscreen:!0,readmodel:!0,htmlcode:!0,help:!0,undo:!0,redo:!0,trash:!0,save:!0,navigation:!0,alignleft:!0,aligncenter:!0,alignright:!0,subfield:!0,preview:!0}}},watch:{},computed:{toListUrl:function(){return{path:"/mark/docs/list",query:{category:this.$route.query.category}}},getTime:function(){return function(e){return new Date(parseInt(e)).toLocaleString().replace(/:\d{1,2}$/," ")}}},methods:{openHandleDelete:function(){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){e.handleDelete()}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},handleDelete:function(){var e=this;console.log(11111);var t={url:"http://10.85.125.61:13150/del_docs.json",param:{category_idx:this.$route.query.category,docs_idx:this.$route.query.id}},r={data:s()(t),cip:230};this.$store.dispatch("ProxyGet",r).then(function(t){t&&200==t.code?e.$router.push({path:"/mark/docs/list",query:{category:e.$route.query.category}}):Object(o.Message)({showClose:!0,message:"删除异常！",type:"error",duration:0})},function(e){Object(o.Message)({showClose:!0,message:"删除接口异常！",type:"error",duration:0})})},handleEdit:function(){this.$router.push({path:"/mark/docs/edit",query:{category:this.$route.query.category,docs:this.$route.query.id,state:2}})},searchDocs:function(){var e=this,t={url:"http://10.85.125.61:13150/query_docs.json",param:{category_idx:this.$route.query.category,docs_idx:this.$route.query.id}},r=new URLSearchParams;r.append("data",s()(t)),r.append("cip",230),this.$store.dispatch("ProxyPost",r).then(function(t){t&&200==t.code?(e.content=t.result.content,e.title=t.result.title,e.time=t.result.creat_time,e.username=t.result.username):Object(o.Message)({showClose:!0,message:"浏览文章异常！",type:"error",duration:0})},function(e){Object(o.Message)({showClose:!0,message:"浏览文章接口异常！",type:"error",duration:0})})},searchCategory:function(){var e=this,t={data:s()({url:"http://10.85.125.61:13150/query_category.json",param:{}}),cip:230};this.$store.dispatch("ProxyGet",t).then(function(t){t&&200==t.code?e.tabList=t.result:Object(o.Message)({showClose:!0,message:"查询异常！",type:"error",duration:0})},function(e){Object(o.Message)({showClose:!0,message:"查询接口异常！",type:"error",duration:0})})}},created:function(){this.searchCategory(),this.searchDocs()},mounted:function(){}},i={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"detail-wrap"},[r("div",[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/mark/docs"}}},[e._v("分类")]),e._v(" "),r("el-breadcrumb-item",{attrs:{to:e.toListUrl}},[e._v("文章列表")]),e._v(" "),r("el-breadcrumb-item",[r("a",[e._v(e._s(e.title))])])],1)],1),e._v(" "),r("div",{staticClass:"title"},[r("span",[e._v(e._s(e.title))])]),e._v(" "),r("div",{staticClass:"time"},[r("span",[e._v(e._s(e.getTime(e.time)))]),e._v(" "),r("span",{staticStyle:{"margin-left":"20px"}},[e._v(e._s(e.username))]),e._v(" "),r("el-button",{attrs:{size:"mini"},on:{click:function(t){return t.stopPropagation(),e.handleEdit(t)}}},[e._v("编辑")]),e._v(" "),r("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(t){return t.stopPropagation(),e.openHandleDelete(t)}}},[e._v("删除")])],1),e._v(" "),r("div",[r("div",{staticClass:"show-wrap"},[r("mavon-editor",{staticClass:"show_markdown",attrs:{subfield:!1,defaultOpen:e.defaultData,toolbarsFlag:!1,boxShadow:!1},model:{value:e.content,callback:function(t){e.content=t},expression:"content"}})],1)])])},staticRenderFns:[]};var c=r("VU/8")(n,i,!1,function(e){r("pAhU")},"data-v-a47c6e0e",null);t.default=c.exports},pAhU:function(e,t){}});