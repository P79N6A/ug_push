<template>
  <el-row v-if="item">
    <el-col :span="24" class="item-wrapper clearfix">
      <h3 style="padding-left: 20px;height:30px;line-height:30px;">
        图{{item.index}} 点击图片标注
        <el-button
          v-show="item.isLabel == 1 && adminState"
          style="background-color: #909399;border-color: #909399;color: #fff;border-radius: 20px;"
          class="delete-img"
          type="text"
          @click="openPopup"
          round
        >下线</el-button>
        <el-button
          v-show="item.isLabel == 2 && adminState"
          class="delete-img"
          type="info"
          round
          plain
          disabled
        >已下线</el-button>
      </h3>
      <div class="item-select">
        <span>人手分离：<span style="color:green;white-space: nowrap;">{{activeState.hand}}</span></span>
        <el-select style="margin-left:10px" v-model="item.hand_state" placeholder="请选择">
          <el-option
            v-for="item in handOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="margin-left:20px;white-space: nowrap;">标注更改：<span style="color:green">{{activeState.change}}</span></span>
        <el-select style="margin-left:10px" v-model="item.change_state" placeholder="请选择">
          <el-option
            v-for="item in changeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button
          type="success"
          style="margin-left:20px;width:70px"
          size="mini"
          @click="imgStateCheck(5)"
          round
        >上传</el-button>
      </div>
      <div
        style="position: relative;display:flex;flex-wrap: wrap;margin-top:20px;padding-bottom:20px;"
      >
        <div class="item-img-row">
          <img height="250px;" :src="imgUrlHeader+item.pic_url">
          <span class="item-img-row-user">原图</span>
        </div>
        <div class="item-img-row" :id="item.id" @click="openDrawImg(item.mask_url)">
          <img height="250px;" :src="imgUrlHeader+item.mask_url">
          <span class="item-img-row-user">粗掩码</span>
        </div>
        <div class="item-img-row" :key="idx" v-for="(row, idx) in item.info" :id="row.id">
          <img height="250px;" :src="maskUrl(row.mask_url)" @click="openDrawImg(row.mask_url)">
          <span class="item-img-row-user">{{row.username}}</span>
          <div class="item-img-row-check-state" v-if="row.check_type != 1">
            <span class="state" v-if="row.check_type === 3" style="color:rgb(112,196,66)">审核通过</span>
            <span class="state" v-if="row.check_type === 2" style="color:rgb(244,111,112)">审核不通过</span>
            <span class="check-user">{{row.check_user}}</span>
          </div>
          <div class="item-img-row-check" v-if="adminState">
            <el-button type="primary" @click="checkEvent(1,row,idx)" round size="mini">通过</el-button>
            <el-button type="danger" @click="checkEvent(2,row,idx)" round size="mini">不通过</el-button>
          </div>
        </div>
      </div>
    </el-col>
    <div v-if="drawImg">
      <div class="mask"></div>
      <i class="el-icon-error close-icon" @click="closeDrawImg"></i>
      <div class="draw-img">
        <div class="draw-img-content">
          <div class="btn-wrap">
            <el-button type="primary" id="blackBtn">黑笔</el-button>
            <el-button type="primary" id="whiteBtn">白笔</el-button>
            <el-button type="primary" id="recallBtn">撤回</el-button>
            <el-button type="primary" id="clearBtn">重置</el-button>
            <el-button type="primary" id="saveBtn" @click="saveImg">保存</el-button>
            <el-slider v-model="painterWidth" class="range" show-input :min="1" :max="50"></el-slider>
            <el-slider
              v-model="canvasOpacity"
              class="range"
              show-input
              :step="0.1"
              :min="0.0"
              :max="1"
            ></el-slider>
          </div>
          <img id="mask-img" @load="imgLoad" :src="imgUrlHeader+item.pic_url" draggable="false">
          <div id="round" class="round"></div>
          <canvas id="box" class="canvas-cover"></canvas>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import $ from "jquery";
import { faceAdmin } from "../../authlist";

export default {
  name: "itemList",
  props: ["item", "index"],
  data() {
    return {
      adminState: false,
      canvas: null,
      drawImg: false,
      painterWidth: 25,
      ogWidth: 0,
      ogHeight: 0,
      canvasHistory: [],
      canvasOpacity: 0.5,
      handOptions: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      changeOptions: [
        {
          value: 0,
          label: "否"
        },
        {
          value: 1,
          label: "是"
        }
      ],
      imgMaskUrl: "",
      imgUrlHeader: "http://10.85.125.60:13141",
      loading: "",
      halfWidth: 12.5,
      isFirst: true,
      activeState: {
        hand: "否",
        change: "否"
      },
    };
  },
  created() {
    this.activeState.hand = this.item.hand_state ? "是" : "否" 
    this.activeState.change = this.item.change_state ? "是" : "否" 
    faceAdmin.forEach((row, idx) => {
      if (row.email == this.email) {
        this.adminState = true;
      }
    });
  },
  computed: {
    maskUrl(url) {
      return function(value) {
        return this.methodGetUrl(value);
      };
    },
    ...mapGetters(["email"])
  },
  methods: {
    imgStateCheck(state) {
      var tempData = {
        url: "http://10.85.125.60:13141/check_data.json", // 接口请求地址
        param: {
          check_type: state,
          id: this.item.id,
          hand_state: this.item.hand_state,
          change_state: this.item.change_state
          // check_user: this.email // 用户邮箱前缀
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
               this.activeState.hand = this.item.hand_state ? "是" : "否" 
               this.activeState.change = this.item.change_state ? "是" : "否" 
               Message({
                showClose: true,
                message: res.msg || "成功！",
                type: "success",
                duration: 1500
              });
          } else {
               Message({
                showClose: true,
                message: res.msg || "失败",
                type: "success",
                duration: 1500
              });
  
            
          }
        },
        err => {
          Message({
            showClose: true,
            message: "接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    openPopup() {
      this.$confirm("是否确认下线改组图片", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.checkRow(3);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消下线"
          });
        });
    },
    checkEvent(state, row, idx) {
      this.$confirm("确定执行审核操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.checkRow(state, row, idx);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
    },
    checkRow(state, row, idx) {
      if (state == 3) {
        var tempData = {
          url: "http://10.85.125.60:13141/check_data.json", // 接口请求地址
          param: {
            check_type: state,
            id: this.item.id,
            check_user: this.email // 用户邮箱前缀
          }
        };
      } else {
        var tempData = {
          url: "http://10.85.125.60:13141/check_data.json", // 接口请求地址
          param: {
            check_type: state,
            id: this.item.id,
            username: row.username,
            check_user: this.email // 用户邮箱前缀
          }
        };
      }
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            if (state != 3) {
              Message({
                showClose: true,
                message: res.msg || "审核成功！",
                type: "success",
                duration: 1500
              });
              if (state == 1) {
                this.item.info[idx].check_type = 3;
                this.item.info[idx].check_user = this.email;
              } else {
                this.item.info[idx].check_type = 2;
                this.item.info[idx].check_user = this.email;
              }
            } else {
              Message({
                showClose: true,
                message: res.msg || "下线成功！",
                type: "success",
                duration: 1500
              });
              this.item.isLabel = 2;
            }
          } else {
            if (state != 3) {
              Message({
                showClose: true,
                message: res.msg || "审核失败！",
                type: "error",
                duration: 0
              });
            } else {
              Message({
                showClose: true,
                message: res.msg || "下线失败！",
                type: "error",
                duration: 0
              });
            }
          }
        },
        err => {
          Message({
            showClose: true,
            message: "接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    // 处理url
    methodGetUrl(url) {
      const that = this;
      if (url.indexOf("data:image/jpeg") < 0) {
        return that.imgUrlHeader + url;
      } else {
        return url;
      }
    },
    saveImg() {
      //放大为正常尺寸图片转化canvas -> base64
      const that = this;
      let saveImg = new Image();
      saveImg.src = $("#box")[0].toDataURL("image/jpeg");
      saveImg.onload = () => {
        saveImg.width = this.ogWidth;
        saveImg.height = this.ogHeight;
        let saveCanvas = document.createElement("canvas");
        let saveCanvasCtx = saveCanvas.getContext("2d");
        saveCanvas.width = this.ogWidth;
        saveCanvas.height = this.ogHeight;
        saveCanvasCtx.drawImage(saveImg, 0, 0, saveImg.width, saveImg.height);
        saveCanvasCtx.scale(1, 1);
        let url = saveCanvas.toDataURL("image/jpeg");
        const tempData = {
          url: "http://10.85.125.60:13141/push_result.json", // 接口请求地址
          param: {
            id: this.item.id,
            pic_data: url,
            username: this.email // 用户邮箱前缀
          }
        };
        let params = new URLSearchParams();
        params.append("data", JSON.stringify(tempData));
        params.append("cip", 230);
        this.$store.dispatch("ProxyPost", params).then(
          res => {
            if (res && res.code == 200) {
              let isAdd = true;
              that.item.info.forEach((row, index) => {
                if (row.username == that.email) {
                  row.mask_url = url;
                  isAdd = false;
                }
              });
              if (isAdd) {
                this.item.info.push({
                  id: this.item.id,
                  mask_url: url,
                  username: this.email, // 用户邮箱前缀
                  check_user: "",
                  check_type: ""
                });
              }
              this.closeDrawImg();
              Message({
                showClose: false,
                message: "图片保存成功",
                type: "success",
                duration: 1000
              });
            } else {
              Message({
                showClose: true,
                message: res.msg || "图片保存失败！",
                type: "error",
                duration: 0
              });
            }
          },
          err => {
            Message({
              showClose: true,
              message: "图片保存接口异常！",
              type: "error",
              duration: 0
            });
          }
        );
      };
    },
    imgLoad() {
      const that = this;
      let canvasEle = $("#box")[0];
      let img = new Image();
      img.crossOrigin = "anonymous";
      img.style = "opacity: .6;";
      img.src = this.imgMaskUrl;
      let context = canvasEle.getContext("2d");
      img.onload = () => {
        this.loading.close();
        this.ogWidth = img.width;
        this.ogHeight = img.height;
        let orImgWidth = $("#mask-img").width();
        let orImgHeight = $("#mask-img").height();
        // 记录图片原始大小
        canvasEle.width = orImgWidth;
        canvasEle.height = orImgHeight;
        context.drawImage(img, 0, 0, orImgWidth, orImgHeight);
        // 直接使用img伸缩防止canvas伸缩导致画笔错位
        let imgDataUrl = context.getImageData(0, 0, orImgWidth, orImgHeight);
        this.scale = img.width / orImgWidth;
        context.scale(1, 1);
      };
      context.lineCap = "round";
      context.strokeStyle = "#FFFFFF";
      context.lineWidth = 25;
      this.drawLine();
      $("#blackBtn").click(() => {
        context.strokeStyle = "#000000";
        $("#round").css("background", "black");
      });
      $("#whiteBtn").click(() => {
        context.strokeStyle = "#FFFFFF";
        $("#round").css("background", "#FFFFFF");
      });
      $("#recallBtn").click(() => {
        if (this.canvasHistory.length > 0) {
          this.painterWidth = this.painterWidth - 1;
          context.clearRect(0, 0, canvasEle.width, canvasEle.height);
          let imgLast = new Image();
          imgLast.src = this.canvasHistory[this.canvasHistory.length - 1].url;
          imgLast.onload = () => {
            this.ogWidth = img.width;
            this.ogHeight = img.height;
            let orImgWidth = $("#mask-img").width();
            let orImgHeight = $("#mask-img").height();
            // 记录图片原始大小
            canvasEle.width = orImgWidth;
            canvasEle.height = orImgHeight;
            context.drawImage(imgLast, 0, 0, orImgWidth, orImgHeight);
            // 直接使用img伸缩防止canvas伸缩导致画笔错位
            let imgDataUrl = context.getImageData(
              0,
              0,
              orImgWidth,
              orImgHeight
            );
            this.scale = imgLast.width / orImgWidth;
            context.scale(1, 1);
            context.strokeStyle = this.canvasHistory[
              this.canvasHistory.length - 1
            ].color;
            $("#round").css(
              "background",
              this.canvasHistory[this.canvasHistory.length - 1].color
            );
            this.painterWidth = this.painterWidth + 1;
            this.canvasHistory.pop();
          };
        } else {
          Message({
            showClose: false,
            message: "不能再撤销了",
            type: "error",
            duration: 1000
          });
        }
      });
      $("#clearBtn").click(() => {
        context.clearRect(0, 0, innerWidth, innerHeight);
        that.painterWidth = 25;
        round.style.borderRadius = "50%";
        round.style.width = "25px";
        round.style.height = "25px";
        that.isFirst = true;
        that.canvasHistory = [];
        $("#round").css("background", "black");
        this.imgLoad();
      });
    },
    closeDrawImg() {
      this.painterWidth = 25;
      this.isFirst = true;
      this.drawImg = false;
      $("body").css("overflow", "auto");
    },
    openDrawImg(url) {
      this.drawImg = true;
      this.canvasHistory = [];
      this.canvasOpacity = 0.5;
      (this.halfWidth = 12.5), (this.isFirst = true);
      $("body").css("overflow", "hidden");
      this.loading = this.$loading({
        fullscreen: true,
        text: "Loading",
        background: "rgba(0, 0, 0, 0.8)"
      });
      this.imgMaskUrl = this.methodGetUrl(url);
    },
    drawLine() {
      const that = this;
      //添加鼠标按下抬起事件
      let canvasEle = $("#box")[0];
      let context = canvasEle.getContext("2d");
      let round = $("#round")[0];
      context.lineCap = "round";
      $("#round")
        .off("mousedown")
        .on("mousedown", startAction);
      $("#round")
        .off("mouseup")
        .on("mouseup", endAction);
      $(".draw-img-content")
        .off("mouseleave")
        .on("mouseleave", endAction);
      // context.canvas.addEventListener("mouseup", endAction)
      // context.canvas.addEventListener("mouseleave", endAction)
      round.style.display = "block";
      round.style.borderRadius = "50%";
      round.style.width = "25px";
      round.style.height = "25px";
      $(".draw-img-content")
        .off("mousemove")
        .on("mousemove", moveRound);
      // $(".draw-img-content").off().on("mousemove", moveAction);
      // round.addEventListener("mousedown", cancelRound);

      function cancelRound() {
        round.style.display = "none";
        if (that.isFirst) {
          context.lineWidth = 25;
          that.isFirst = false;
        }
        $(".draw-img-content").off("mousemove");
      }

      function moveRound(event) {
        let mouseX1 = event.pageX - $("#box").offset().left + 200;
        let mouseY1 = event.pageY - $("#box").offset().top;
        if (mouseX1 < 200 || mouseY1 <= 0) {
          round.style.display = "none";
        } else {
          round.style.display = "block";
        }
        round.style.left = mouseX1 - that.halfWidth + "px";
        round.style.top = mouseY1 - that.halfWidth + "px";
      }

      function startAction(event) {
        //监听鼠标移动事件
        if (that.isFirst) {
          context.lineWidth = that.painterWidth;
          that.isFirst = false;
        }
        that.canvasHistory.push({
          url: canvasEle.toDataURL(),
          color: context.strokeStyle
        });
        if (!that.isClear) {
          //开始新的路径
          context.beginPath();
          context.lineCap = "round";
          let mouseX1 = event.pageX - $("#box").offset().left;
          let mouseY1 = event.pageY - $("#box").offset().top;
          context.moveTo(mouseX1, mouseY1);
          context.lineTo(mouseX1, mouseY1);
          context.stroke();
        }
        $(".draw-img-content")
          .off("mousemove")
          .on("mousemove", moveAction);
      }

      function endAction() {
        //移除鼠标移动事件、
        round.style.display = "none";
        that.isClear = false;
        context.lineCap = "round";
        $(".draw-img-content")
          .off("mousemove")
          .on("mousemove", moveRound);
      }
      //鼠标移动函数
      function moveAction(event) {
        let mouseX1 = event.pageX - $("#box").offset().left;
        let mouseY1 = event.pageY - $("#box").offset().top;
        if (that.isClear) {
          context.clearRect(mouseX1 - 8, mouseY1 - 8, 16, 16);
          return;
        }
        let left = mouseX1 - that.halfWidth + 200;
        let top = mouseY1 - that.halfWidth;
        round.style.left = left + "px";
        round.style.top = top + "px";
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineTo(mouseX1, mouseY1);
        context.stroke();
      }
    }
  },
  mounted() {},
  watch: {
    canvasOpacity(newVal, oldVal) {
      $(".canvas-cover").css("opacity", newVal);
    },
    painterWidth(newVal, oldVal) {
      var canvasEle = $("#box")[0];
      let context = canvasEle.getContext("2d");
      let round = $("#round")[0];
      context.lineWidth = newVal;
      this.halfWidth = newVal / 2;
      round.style.borderRadius = newVal + "px";
      round.style.width = newVal + "px";
      round.style.height = newVal + "px";
    },
    item() {}
  }
};
</script>
<style lang="scss">
.draw-img {
  .el-slider__runway.show-input {
    margin-right: 0;
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
img {
  user-select: none;
}
.item-select {
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  margin-top: 10px;
  align-items: center;
  min-width: 720px;
}
.round {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  background: black;
  // border: 1px solid #f0f2f5;
}
.item-wrapper {
  margin-top: 10px;
  padding: 15px 10px 4px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 16px;
  .delete-img {
    margin-left: 20px;
    padding-top: 8px;
    height: 30px;
    // color: #fff;
    // background-color: #909399;
    // border-color: #909399;
    // border-radius: 20px;
  }
  .item-img-row {
    display: flex;
    flex-direction: column;
    align-content: center;
    height: auto;
    margin-left: 20px;
    img {
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
    }
    canvas {
      height: 250px;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
    }
    .item-img-row-user {
      width: 140px;
      margin-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
    }
    .item-img-row-check {
      width: 100%;
      margin-top: 5px;
      padding-top: 5px;
      border-top: 1px solid #eee;
    }
    .item-img-row-check-state {
      display: flex;
      flex-direction: column;
      margin-top: 5px;
      padding-top: 5px;
      border-top: 1px solid #eee;
      font-size: 14px;
      .state {
        font-weight: 600;
      }
      .check-user {
        width: 140px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  z-index: 21;
}
.close-icon {
  position: fixed;
  top: 15px;
  right: 30px;
  font-size: 40px;
  z-index: 2020;
  color: rgb(231, 231, 231);
}
.draw-img {
  height: 100%;
  width: 100%;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  user-select: none;
  .draw-img-content {
    position: absolute;
    top: 60px;
    left: 50%;
    margin-bottom: 50px;
    width: auto;
    transform: translate3d(-50%, 0, 0);
    display: flex;
  }
  .btn-wrap {
    width: 200px;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    align-items: center;
  }
  .range {
    display: flex;
    flex-direction: column-reverse;
  }
  img {
    height: 600px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
    user-select: none;
  }
  .canvas-cover {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 20;
    opacity: 0.5;
  }
}
</style>
