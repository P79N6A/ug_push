<template>
    <el-main v-if="Number(pageAuth) > 0">
      <el-row>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <i class="el-icon-picture-outline"></i>
          <text-hover className="mallki-text" text="原始图片"></text-hover>
          <div class="grid-content bg-purple">
            <img
              :class="[isActive ? activeWidth : activeHeight]"
              :src="imgSrc"
              id="primary-img">
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <i class="el-icon-service"></i>
          <text-hover className="mallki-text" text="智能裁剪"></text-hover>
          <div class="grid-content bg-purple-light">
            <canvas :data="cutImage" id="canvas-model">
            </canvas>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <i class="el-icon-view"></i>
          <text-hover className="mallki-text" text="默认裁剪"></text-hover>
          <div class="grid-content bg-purple" id="box">
            <canvas id="canvas-default">
            </canvas>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="5" :sm="5" :md="3" :lg="3" :xl="3">
          <image-upload color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></image-upload>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" @click="urlFn" style="margin-left: 30px;" size="medium">url上传</el-button>
        </el-col>
      </el-row>
      <div class="tips">Tips:图片大小请控制在3M以内</div>
    </el-main>
    <el-main v-else-if="isLogin">
      <auth></auth>
    </el-main>
</template>

<script>
  import Auth from "@/components/Tips/Auth";
  import { mapGetters } from "vuex";
  import { formatNum } from "@/utils";
  import ImageUpload from "./components/imageUpload";
  import TextHover from "./components/textHover";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    name: "imgcut",
    components: {
      ElCol,
      ImageUpload,
      TextHover,
      Auth
    },
    data() {
      return {
        screenWidth: 467,    // div 的宽? 如何获取
        isActive: true,
        activeWidth: 'active-width',
        activeHeight: 'active-height',
        // imgSrc: "http://img1.utuku.china.com/650x0/ent/20170912/67d801c3-256c-4937-88e1-9d8e43f55553.jpg",
        imgSrc: "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/pic/item/4b90f603738da9778d1df437bc51f8198618e3f8.jpg"
      };
    },
    computed: {
      ...mapGetters(["isLogin", "email", "cutImage", "pageAuth"])
    },
    mounted () {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.getElementById('box').offsetWidth
          that.screenWidth = window.screenWidth
        })()
      }
    },
    methods: {
      init() {
        if (Number(this.pageAuth) > 0) {
          console.log("用户已登录");
          this.onSearch();
        } else {
          console.log("用户未登录");
        }
      },
      urlFn() {
        this.$prompt('请输入图片url地址', '提示', {
          confirmButtonText: '上传',
          cancelButtonText: '取消',
          inputPattern: /http(s)?:/,
          inputErrorMessage: '请输入正确的图片url地址'
        }).then(({value}) => {
          this.$message({
            type: 'success',
            message: 'success'
          });
          this.imgSrc = value;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消url上传'
          });
        });
      },
      onSearch () {
        const tempData = {
          url: "http://10.77.9.71:5700/smart_crop/v1.0/predict.json",
          param: {
            url: this.imgSrc
          }
        };
        const params = {
          data: JSON.stringify(tempData),
          cip: 230
        };
        this.$store.dispatch("GetImageInfo", params);
        this.cutImage;
      },
      imageSize() {
        const img = new Image();
        img.src = this.imgSrc
        img.onload = () => {
          if(img.width > img.height) {
            this.isActive = true;
          } else {
            this.isActive = false;
          }
          let realH ;
          let realW ;
          if( this.isActive ) {
            realH = parseInt(this.screenWidth*0.8*img.height/img.width);
            realW = parseInt(this.screenWidth*0.8);
          } else {
            realH = parseInt(480*0.8);
            realW = parseInt(480*0.8*img.width/img.height);
          }
          this.canvasDefault(img.width, img.height);
          this.canvasModel(realW, realH, this.cutImage)
        }
      },
      canvasModel(imgW, imgH, arr) {
        let cImg = new Image();
        cImg.src = this.imgSrc;
        let c = document.getElementById('canvas-model');
        c.style.opacity = 0;
        let ctx = c.getContext('2d');
        cImg.onload = () => {
          const oPremaryImg = document.getElementById('primary-img');

          if(imgW >imgH){
            c.width = c.height = imgH*2;
          } else {
            c.width = c.height = imgW*2;
          }

          ctx.drawImage(oPremaryImg, -( Math.abs( Number(arr[2]))*imgW*2), -(Math.abs( Number(arr[0]))*imgH*2), imgW*2, imgH*2);

          if(imgW >imgH){
            c.style.width = c.style.height =  imgH + 'px';
          } else {
            c.style.width = c.style.height =  imgW + 'px';
          }
          c.style.opacity = 1;
        }
      },
      canvasDefault(imgW, imgH) {
        let realH ;
        let realW ;
        let cImg = new Image();
        cImg.src = this.imgSrc;
        cImg.onload = () => {
          let c = document.getElementById('canvas-default');
          let ctx = c.getContext('2d');
          if( this.isActive ) {
            realH = this.screenWidth*0.8*imgH/imgW;
            realW = this.screenWidth*0.8;
            c.width = c.height = realH*2;
//            console.log(c.width);
            ctx.drawImage(document.getElementById('primary-img'), -(realW*2 - c.width)/2, 0, realW*2, realH*2);
            c.style.width = c.style.height = realH + 'px';
          } else {
            realH = 480*0.8;
            realW = 480*0.8*imgW/imgH;

            c.width = c.height = realW*2;
            ctx.drawImage(document.getElementById('primary-img'), 0, -(realH*2 - c.height)/2, realW*2, realH*2);
            c.style.width = c.style.height = realW + 'px';
          }
        }
      },
      imageSuccessCBK(obj1, obj2) {
        console.log(obj1)
        console.log(obj2)
        const oPremaryImg = document.getElementById('primary-img')
        oPremaryImg.src= obj2
        const img = new Image();
        img.src = obj2;
        img.onload = () => {
          if (img.width > img.height) {
            this.isActive = true;
          } else {
            this.isActive = false;
          }
          let realH;
          let realW;
          if (this.isActive) {
            realH = parseInt(this.screenWidth * 0.8 * img.height / img.width);
            realW = parseInt(this.screenWidth * 0.8);
          } else {
            realH = parseInt(480 * 0.8);
            realW = parseInt(480 * 0.8 * img.width / img.height);
          }
          this.canvasDefault(img.width, img.height);
          this.canvasModel(realW, realH, obj1.thumbnail_square)
        }
      },
      failFn() {
        this.$alert('裁剪失败,换张图片试试', '提示', {
          confirmButtonText: '确定',
          type: 'error',
          callback: action => {
            this.$message({
              type: 'info',
              message: `请重新选择图片`
            });
          }
        });
      }
    },
    created() {
      this.init();
    },
    watch: {
      cutImage(val) {
        if(val == undefined) {
          this.failFn();
          // this.imgSrc = 'http://img1.utuku.china.com/650x0/ent/20170912/67d801c3-256c-4937-88e1-9d8e43f55553.jpg'
          this.imgSrc = 'https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/pic/item/4b90f603738da9778d1df437bc51f8198618e3f8.jpg'
        } else {
          const oPremaryImg = document.getElementById('primary-img');
          oPremaryImg.style.opacity = 1;
          this.imageSize();
          this.screenWidth = document.getElementById('box').offsetWidth;
        }
      },
      isLogin() {},
      email() {},
      pageAuth() {
        this.init();
      },
      imgSrc() {
        this.onSearch()
        const img = new Image();
        img.src = this.imgSrc
        img.onload = () => {
          if(img.width > img.height) {
            this.isActive = true;
          } else {
            this.isActive = false;
          }
          let realH ;
          let realW ;
          if( this.isActive ) {
            realH = parseInt(this.screenWidth*0.8*img.height/img.width);
            realW = parseInt(this.screenWidth*0.8);
          } else {
            realH = parseInt(480*0.8);
            realW = parseInt(480*0.8*img.width/img.height);
          }
        }
      },
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = document.getElementById('box').offsetWidth
          this.timer = true
          let that = this
          setTimeout(function () {
            // that.screenWidth = that.$store.state.canvasWidth
            console.log(that.screenWidth)
            that.init()
            that.timer = false
          }, 400)
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  body {
    .el-container {
      margin-bottom: 40px;
    }
    .el-main {
      color: #333;
      line-height: 100%;
    }
    .pane-title-wrap {
      margin-bottom: 10px;
      .pane-title {
        font-size: 20px;
        color: #409eff;
        text-align: center;
      }
    }
    .pane-form {
      padding: 20px;
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
      border: 1px solid #ebebeb;
      border-radius: 3px;
    }
    .table-title {
      padding: 5px 20px;
      color: #409eff;
      border-bottom: 2px solid #409eff;
      margin-bottom: 10px;
    }
    .page-wrap {
      padding: 20px 0;
    }
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
    }
    .bg-purple {
      background: #d3dce6;
    }
    .bg-purple-light {
      background: #e5e9f2;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .el-button+.el-button {
      margin-left: 30px;
    }
    i {
      margin: 10px 0;
      font-size: 20px;
      color: #409eff;
    }
    .grid-content {
      position: relative;
      height: 480px;
      p {
        color: #409eff;
      }
      img, canvas {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 4px;
        border: 1px solid #fff;
      }
    }
    .tips {
      font-size: 14px;
      color: #909399;
    }
    .active-width {
      width: 80%;
    }
    .active-height {
      height: 80%;
    }
  }

</style>
