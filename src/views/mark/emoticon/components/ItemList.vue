<template>
<el-row v-if="item">
  <el-col :span="24" class="item-wrapper clearfix">
    <h3 style="padding-left: 20px;height:30px;line-height:30px;">图{{item.index}} 点击图片标注
      <el-button v-show="item.isLabel == 1 && adminState" size="mini" style="background-color: #909399;border-color: #909399;color: #fff;border-radius: 20px;" class="delete-img"  type="text" @click="openPopup" round>
        下线
      </el-button>
      <el-button v-show="item.isLabel == 2 && adminState" size="mini" class="delete-img" type="info" round plain disabled>
        已下线
      </el-button></h3>
    <div style="position: relative;display:flex;flex-wrap: wrap;margin-top:20px;padding-bottom:20px;">
      <div class="item-img-row" @click="openDrawImg(item.landmark,imgId(item.id,-1))">
        <div class="item-img-row-draw">
          <img height="250px;" :src="imgUrlHeader+item.pic_url" :id="imgId(item.id,-1)" @load="miniImgLoad(item.landmark,imgId(item.id,-1))" />
        </div>
        <span>原图</span>
      </div>
      <div class="item-img-row" v-for="(row, index) in item.info" :key="index" @click="openDrawImg(row.landmark,imgId(item.id,index))">
        <div class="item-img-row-draw">
          <img height="250px;" :id="imgId(item.id,index)" @load="miniImgLoad(row.landmark,imgId(item.id,index))" :src="imgUrlHeader+item.pic_url" />
        </div>
        <span class="item-img-row-user">{{row.username}}</span>
        <div class="item-img-row-check-state" v-if="row.check_type === 3||row.check_type === 2">
          <span class="state" v-if="row.check_type === 3" style="color:rgb(112,196,66)">审核通过</span>
          <span class="state" v-if="row.check_type === 2" style="color:rgb(244,111,112)">审核不通过</span>
          <span class="check-user">{{row.check_user}}</span>
        </div>
        <div class="item-img-row-check" v-if="adminState">
          <el-button type="primary" @click.stop="checkEvent(1,row,index)" round size="mini">通过</el-button>
          <el-button type="danger" @click.stop="checkEvent(2,row,index)" round size="mini">不通过</el-button>
        </div>
      </div>
    </div>
  </el-col>
  <div v-if="drawImg">
    <div class="mask"></div>
    <i class="el-icon-error close-icon" @click="closeDrawImg"></i>
    <div class="draw-img">
      <div class="draw-img-content">
        <div class="btn-wrap-left">
          <el-button type="primary" class="change-btn" @click="changeSpot(1)" plain>1.(左边眉毛最高点)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(2)" plain>2.(左边眉毛眉心点)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(5)" plain>5.(左边眼皮最高点)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(6)" plain>6.(左边眼瞳最低点)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(9)" plain>9.(左边嘴角)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(11)" plain>13.(下嘴唇上方中点)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(12)" plain>14.(左眼内角)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(14)" plain>16.(鼻尖下端)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(15)" plain>17.(左边眼球中心)</el-button>
        </div>
        <img id="max-img" class="img-back" draggable="false" :src="imgUrlHeader+item.pic_url" @load="imgload">
        <el-tooltip class="item" v-for="(row, index) in spotList" :key="index" effect="light" :content="textArr[index]" placement="top-start">
          <div class="round" :style="row" :id="index" @click="changeSpot(index+1)"></div>
        </el-tooltip>
        <div class="btn-wrap-right">
          <el-button type="primary" class="change-btn" @click="changeSpot(3)" plain>3.(右边眉毛最高点)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(4)" plain>4.(右边眉毛眉心点)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(7)" plain>7.(右边眼皮最高点)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(8)" plain>8.(右边眼瞳最低点)</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(10)" plain>11.(右边嘴角}</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(13)" plain>15.(右眼内角}</el-button>
          <el-button type="primary" class="change-btn" @click="changeSpot(16)" plain>18.(右边眼球中心)</el-button>
          <div class="save-btn">
            <el-button type="success" @click="saveSpot">保存</el-button>
            <el-button type="info" style="width:200px;" @click="reacllSpot">单点重置</el-button>
            <el-button type="warning" style="width:200px;" @click="imgload">全部重置</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</el-row>
</template>
<script>
import {
  mapGetters
} from "vuex";
import {
  Message
} from "element-ui";
import $ from "jquery";
import {
  emoticonAdmin
} from "../../authlist";

export default {
  name: "itemList",
  props: ["item", "index"],
  data() {
    return {
      adminState: false,
      drawImg: false,
      coordinate: "10.20",
      popupList: [],
      spotList: [],
      saveId: "",
      lastId: "",
      thisId: "",
      spotListHistory: [],
      imgMaskUrl: '',
      reacllSpotData: [],
      imgUrlHeader: "http://10.85.125.60:13142",
      textArr: [
        '1.(左边眉毛最高点)',
        '2.(左边眉毛眉心点)',
        '3.(右边眉毛最高点)',
        '4.(右边眉毛眉心点)',
        '5.(左边眼皮最高点)',
        '6.(左边眼瞳最低点)',
        '7.(右边眼皮最高点)',
        '8.(右边眼瞳最低点)',
        '9.(左边嘴角)',
        '11.(右边嘴角}',
        '13.(下嘴唇上方中点)',
        '14.左眼内角',
        '15.右眼内角',
        '16.鼻尖下端',
        '17.左边眼球中心',
        '18.右边眼球中心'
      ]
    }
  },
  created() {
    emoticonAdmin.forEach((row, idx) => {
      if (row.email == this.email) {
        this.adminState = true
      }
    })
  },
  computed: {
    imgId() {
      return function(id, index) {
        return this.backImgId(id, index)
      }
    },
    ...mapGetters(["email"])
  },
  methods: {
    openPopup() {
      this.$confirm('是否确认下线改组图片', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.checkRow(3)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消下线'
        });
      });
    },
    checkEvent(state, row, idx) {
      this.$confirm('确定执行审核操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.checkRow(state, row, idx)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消审核'
        });
      });
    },
    checkRow(state, row, idx) {
      if (state == 3) {
        var tempData = {
          url: "http://10.85.125.60:13142/check_data.json", // 接口请求地址
          param: {
            check_type: state,
            id: this.item.id,
            check_user: this.email // 用户邮箱前缀
          }
        };
      } else {
        var tempData = {
          url: "http://10.85.125.60:13142/check_data.json", // 接口请求地址
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
                this.item.info[idx].check_type = 3
                this.item.info[idx].check_user = this.email
              } else {
                this.item.info[idx].check_type = 2
                this.item.info[idx].check_user = this.email
              }
            } else {
              Message({
                showClose: true,
                message: res.msg || "下线成功！",
                type: "success",
                duration: 1500
              });
              this.item.isLabel = 2
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
    saveSpot() {
      const that = this
      $(document).off("keydown")
      let width = $("#max-img").width()
      let height = $("#max-img").height()
      let uploadList = this.spotList.map((row, index) => {
        return {
          x: Math.round(((parseFloat(row.left.split("px")[0]) + 2 - 200) / width) * 10000) / 10000,
          y: Math.round(((parseFloat(row.top.split("px")[0]) + 2) / height) * 10000) / 10000
        }
      })
      const tempData = {
        url: "http://10.85.125.60:13142/push_result.json", // 接口请求地址
        param: {
          id: this.item.id,
          username: this.email, // 用户邮箱前缀
          landmark: JSON.stringify(uploadList)
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            // 添加bug canvas上为绘制点
            let id = that.item.id
            let isAdd = true
            that.item.info.forEach((row, index) => {
              if (row.username == that.email) {
                row.landmark = JSON.parse(JSON.stringify(uploadList)),
                  id = id.split(".jpg")[0] + index
                isAdd = false
              }
            })
            if (isAdd) {
              this.item.info.push({
                landmark: JSON.parse(JSON.stringify(uploadList)),
                username: this.email, // 用户邮箱前缀
                check_user: "",
                check_type: "",
              })
            }
            this.miniImgLoad(uploadList, id)
            that.drawImg = false
            $("body").css("overflow", "auto");
            Message({
              showClose: true,
              message: "保存成功！",
              type: "success",
              duration: 1000
            });
            // todo
          } else {
            Message({
              showClose: true,
              message: res.msg || "数据保存失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "数据保存接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    backImgId(id, index) {
      return id.split(".jpg")[0] + index
    },
    reacllSpot() {
      const that = this
      let width = $("#max-img").width()
      let height = $("#max-img").height()
      this.spotList[this.thisId].left = width * this.popupList[this.thisId].x - 2 + 200 + 'px'
      this.spotList[this.thisId].top = height * this.popupList[this.thisId].y - 2 + 'px'
      $("#" + this.thisId).animate({
        height: "15px",
        width: "15px",
        "border-radius": "50%"
      }, 100);
      $("#" + this.thisId).animate({
        height: "4px",
        width: "4px",
        "border-radius": "50%"
      }, 100);
    },
    changeSpot(id) {
      const that = this
      this.thisId = id - 1
      this.spotListHistory.push({
        index: id - 1,
        left: that.spotList[id - 1].left,
        top: that.spotList[id - 1].top
      })
      if (this.lastId === "") {
        this.spotList[id - 1].background = "yellow"
      } else {
        this.spotList[this.lastId - 1].background = "red"
        this.spotList[id - 1].background = "yellow"
      }
      $("#" + (id - 1)).animate({
        height: "15px",
        width: "15px",
        "border-radius": "50%"
      }, 100);
      $("#" + (id - 1)).animate({
        height: "4px",
        width: "4px",
        "border-radius": "50%"
      }, 100);
      this.lastId = id
      $('#max-img').off("click").on("click", clickAction);
      $(document).off("keydown").on("keydown", keyInput);

      function keyInput(event) {
        switch (event.keyCode) {
          case 87:
            changeStepSport("w", -1);
            // W 向上一格
            break;
          case 65:
            // A 向左一格
            changeStepSport("a", -1);
            break;
          case 83:
            // S 向下一格
            changeStepSport("s", +1);
            break;
          case 68:
            // D 向右一格
            changeStepSport("d", +1);
            break;
        }
      }

      function changeStepSport(key, step) {
        let overX = parseInt(that.spotList[id - 1].left.split("px")[0])
        let overY = parseInt(that.spotList[id - 1].top.split("px")[0])
        if ((key === "a" || key === "d") && (overX < $("#max-img").width() + 198 && overX > 198)) {
          that.spotList[id - 1].left = parseInt(that.spotList[id - 1].left.split("px")[0]) + step + 'px'
        } else if ((key === "w" || key === "s") && (overY < $("#max-img").height() - 2 && overY > -2)) {
          that.spotList[id - 1].top = parseInt(that.spotList[id - 1].top.split("px")[0]) + step + 'px'
        }
      }

      function clickAction(event) {
        that.spotList[id - 1].left = event.pageX - $("#max-img").offset().left - 2 + 200 + 'px'
        that.spotList[id - 1].top = event.pageY - $("#max-img").offset().top - 2 + 'px'
      }
    },
    miniImgLoad(list, id) {
      const that = this
      $("#" + id + "canvas").remove()
      let width = $('#' + id).width()
      let height = $('#' + id).height()
      let canvasObj = $("<canvas>").css({
        "position": "absolute",
        "top": "0",
        "left": "0",
        "z-index": "10"
      });
      let canvas = canvasObj[0]
      let context = canvas.getContext("2d");
      canvas.width = width
      canvas.height = height
      canvas.id = id + "canvas"
      list.forEach((row, index) => {
        context.beginPath();
        context.fillStyle = "#FF0000";
        let x = width * row.x
        let y = height * row.y
        context.arc(x, y, 1, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      })
      $('#' + id).after(canvas)
    },
    imgload() {
      let width = $("#max-img").width()
      let height = $("#max-img").height()
      if (this.popupList.length <= 11) {
        let i = 0
        while (i < 5) {
          this.popupList.push({
            x: 0,
            y: 0,
          });
          i++;
        }
        this.popupList.push
      }
      this.spotList = this.popupList.map((row, index) => {
        return {
          left: width * row.x - 2 + 200 + 'px',
          top: height * row.y - 2 + 'px',
          background: "red"
        }
      })
      $('#max-img').off("click")
      $(document).off("keydown")
    },
    openDrawImg(list, id) {
      this.drawImg = true;
      this.spotListHistory = []
      this.saveId = id
      $("body").css("overflow", "hidden");
      this.popupList = list;
    },
    closeDrawImg() {
      this.drawImg = false
      this.popupList = []
      $("body").css("overflow", "auto");
      $(document).off("keydown");
    },
  }
}
</script>

<style lang="scss" scoped>
img {
    user-select: none;
}
.item-wrapper {
    margin-top: 10px;
    padding: 15px 10px 4px;
    background-color: #fff;
    border-radius: 5px;
    font-size: 16px;
    .item-img-row {
        margin-left: 20px;
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
        }
        .item-img-row-check-state {
            display: flex;
            flex-direction: column;
            margin-top: 5px;
            padding-top: 5px;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
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
        .item-img-row-draw {
            position: relative;
            box-shadow: 0 0 8px 0 rgba(0,0,0,0.2);
            .canvas-cover {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 10;
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
    background-color: rgba(0, 0, 0, .8);
    height: 100%;
    z-index: 21;
}
.close-icon {
    position: fixed;
    top: 15px;
    right: 30px;
    font-size: 40px;
    z-index: 2020;
    color: rgb(231,231,231);
}
.draw-img {
    height: 100%;
    width: 100%;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 22;
    user-select: none;
    .draw-img-content {
        position: absolute;
        top: 40px;
        left: 50%;
        transform: translate(-50%,0);
        display: flex;
    }
    .round {
        height: 4px;
        width: 4px;
        border-radius: 3px;
        background: red;
        position: absolute;
        top: 210px;
        left: 300px;
        z-index: 100;
        cursor: crosshair;
    }
    .img-back {
        z-index: 90;
        height: 600px;
        box-shadow: 0 0 8px 0 rgba(0,0,0,0.2);
        cursor: crosshair;
    }
    .canvas-cover {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%,0);
        z-index: 100;
    }
    .btn-wrap-left {
        width: 200px;
        height: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .btn-wrap-right {
        width: 200px;
        height: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }
    .change-btn {
        width: 150px;
        display: flex;
        justify-content: center;
    }
    .save-btn {
        display: flex;
        justify-content: flex-start;
        width: 200px;
        button {
            margin: 0;
            width: 50px;
            display: flex;
            margin-left: 10px;
            justify-content: center;
        }
    }
}
</style>
