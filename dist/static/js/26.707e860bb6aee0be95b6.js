webpackJsonp([26],{HuLq:function(e,t){},PapF:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s("mvHQ"),i=s.n(o),a=(s("NYxO"),s("zL8q")),r={name:"MarkSubtitle",components:{Auth:s("vzON").a},data:function(){return{videoID:"",imgHeiderUrl:"http://10.85.125.168:8004",demo:[],list:[]}},created:function(){this.demoLoad()},methods:{demoLoad:function(){var e=this,t=this,s={data:i()({url:"http://10.85.125.168:8004/demo/"}),cip:230};this.$store.dispatch("ProxyGet",s).then(function(s){s&&200==s.code?(t.demo=s.data,t.demo[0]&&e.demoSearch(t.demo[0])):Object(a.Message)({showClose:!0,message:s.msg||"demo查询失败！",type:"error",duration:0})},function(e){Object(a.Message)({showClose:!0,message:"demo查询接口异常！",type:"error",duration:0})})},demoSearch:function(e){this.videoID=e,this.onSearch()},onSearch:function(){var e=this;this.list=[];var t={url:"http://10.85.125.168:8004/",param:{id:this.videoID}},s={data:i()(t),cip:230};this.$store.dispatch("ProxyGet",s).then(function(t){t&&200==t.code?e.list=t.result.scriptocr.interval:Object(a.Message)({showClose:!0,message:t.msg||"字幕解析失败！",type:"error",duration:0})},function(e){Object(a.Message)({showClose:!0,message:"字幕查询接口异常！",type:"error",duration:0})})}}},n={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("el-main",[o("el-row",{staticClass:"pane-title-wrap"},[o("el-col",{attrs:{span:24}},[o("h6",{staticClass:"pane-title"},[e._v("视频字幕识别")])])],1),e._v(" "),o("el-row",{staticClass:"search-form-wrap"},[o("el-col",{attrs:{span:24}},[o("el-form",{attrs:{inline:"",size:"small"}},[o("el-form-item",{attrs:{label:"视频id"}},[o("el-input",{staticStyle:{"min-width":"290px"},attrs:{placeholder:"请输入mid/oid/视频url",clearable:""},model:{value:e.videoID,callback:function(t){e.videoID=t},expression:"videoID"}})],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.onSearch}},[o("span",{staticClass:"hidden-xs-only"},[e._v("识别")])])],1)],1)],1)],1),e._v(" "),o("el-row",{staticClass:"content-box-wrap"},[o("el-col",{staticClass:"content-box-demo"},[o("div",{staticClass:"content-box-demo-box"},e._l(e.demo,function(t,i){return o("div",{key:i,staticClass:"content-box-demo-row",on:{click:function(s){e.demoSearch(t)}}},[o("img",{attrs:{src:s("wa1j")}}),e._v(" "),o("span",[e._v("demo_"+e._s(i))])])}))]),e._v(" "),o("el-col",{staticClass:"content-box-list"},[o("div",{staticClass:"content-box-list-box"},e._l(e.list,function(t,s){return o("div",{key:s,staticClass:"content-box-list-row"},[o("img",{attrs:{src:e.imgHeiderUrl+t.pic_url}}),e._v(" "),o("p",[e._v(e._s(t.begin)+". "+e._s(t.text))])])}))])],1)],1)},staticRenderFns:[]};var c=s("VU/8")(r,n,!1,function(e){s("HuLq")},"data-v-dcdcb678",null);t.default=c.exports},wa1j:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAgCAYAAACPb1E+AAAB4UlEQVRYR+3YPWsUQRgA4CeNggQMWFhopUVERAVtgo2ihZDCRht/gY0WitrZiYKYKnVqIRYBBfEHqCiKChIFFUQU/EDF76+QhJfMhkRu95K7uVsDmeaOu9nZZ955Z3dmesyUPTiPbViZfqvz4yfu4DRu92AH7uIL7pfIelO913hWoV+PjRjH+4p6W7AGN/G3Qb212JT+GwjkdexNiIclDRcdGcbRipsfx0UcwuWKemM4gMC8K6l3EKO4FMiPqdf9FY3WgQzODzwN5Hc8x9b/EPkJbwrkVMrLMme3c7Jw7Io5UCBX1TmVm9z7yUKHu64+zBvuZjm5jKyIQNZIbsAEXmYOeTbkanzAH5zBECYzYbMh1+HVHNQDHMbjDNCOIcMWUT2LcyXv5oX6O4osEBHNiGpEt5XSFWTAIj9PplxdLLRryIBdwKnFCtEV5AscScvBFoydRf5KK/1Y7f9uRZeu6Vgkr+AYIortlmzIvpQ77Q5tow5lQ0bjA3iEr+2G7p/rsyIz22abW0bmiuy8SC6J7cOS2Ig12z7Ute+eHe748jYda5TlUl3Ib8WW9hZ2YjdulCjrQA7iKkZiS7sf1xIu1n2fG0DrOByIF0TMlc2BjLIvraS3Y0Wu50cb7RRHfydwbxrRVdeDS6HLBQAAAABJRU5ErkJggg=="}});