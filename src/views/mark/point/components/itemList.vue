<template>
  <el-row v-if="item && labelState">
    <el-col :span="24" class="item-wrapper clearfix">
      <h3 style="padding-left: 20px;height:30px;line-height:30px;">图{{item.index}} 点击图片标注</h3>
      <div
        style="position: relative;display:flex;flex-wrap: wrap;margin-top:20px;padding-bottom:20px;"
      >
        <div style="position: relative;display:flex;flex-direction: row;">
          <div class="item-img-row" @click="openDrawImg(item.keypoint,imgId(item.id,-1))">
            <div class="item-img-row-draw">
              <img
                height="250px;"
                :src="maskUrl(item.pic_url)"
                :id="imgId(item.id,-1)"
                @load="miniImgLoad(item.keypoint,item.new_keypoint,imgId(item.id,-1),$event)"
              >
              <canvas v-show="!showState" :id="canvasId(imgId(item.id,-1),224)"></canvas>
              <canvas v-show="showState" :id="canvasId(imgId(item.id,-1),106)"></canvas>
            </div>
            <span>原图</span>
          </div>
          <div class="check-wrap">
            <div class="check-row" :style="checkBorder(1,'eye_state')">
              <div class="state-wrap">
                <span>眼眶:</span>
                <span
                  style="color:rgb(112,196,66);margin-left:10px;"
                  v-if="item.eye_state.file == 1 && item.eye_state.type == 3"
                >通过</span>
                <span
                  style="color:#909399;margin-left:10px;"
                  v-if="item.eye_state.file == 1 && item.eye_state.type == 4"
                >暂定</span>
                <span
                  style="color:#e6a23c;margin-left:10px;"
                  v-if="item.eye_state.file == 1 && item.eye_state.type == 2"
                >不通过</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;"
                  v-if="item.eye_state.file == 1"
                >{{item.eye_state.user}}</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.eye_state.file == 1 && item.eye_state.state == 1"
                >已确认</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.eye_state.file == 1  && item.eye_state.state == 1"
                >{{item.eye_state.state_user}}</span>
              </div>
              <div class="btn-wrap">
                <el-button
                  v-if="item.eye_state.file == 1 && item.eye_state.type == 3 && adminState"
                  type="primary"
                  size="mini"
                  @click="checkEvent(5,'eye_state',1)"
                  plain
                >确认</el-button>
                <el-button
                  v-if="!(item.eye_state.file == 1 && item.eye_state.type == 3) && adminState"
                  size="mini"
                  plain
                  disabled
                >确认</el-button>
                <el-button type="success" size="mini" @click="checkEvent(3,'eye_state',1)" plain>通过</el-button>
                <el-button type="info" size="mini" @click="checkEvent(4,'eye_state',1)" plain>暂定</el-button>
                <el-button type="warning" size="mini" @click="checkEvent(2,'eye_state',1)" plain>不通过</el-button>
              </div>
            </div>
            <div class="check-row" :style="checkBorder(1,'lip_state')">
              <div class="state-wrap">
                <span>嘴唇:</span>
                <span
                  style="color:rgb(112,196,66);margin-left:10px;"
                  v-if="item.lip_state.file == 1 && item.lip_state.type == 3"
                >通过</span>
                <span
                  style="ccolor:#909399;margin-left:10px;"
                  v-if="item.lip_state.file == 1 && item.lip_state.type == 4"
                >暂定</span>
                <span
                  style="color:#e6a23c;margin-left:10px;"
                  v-if="item.lip_state.file == 1 && item.lip_state.type == 2"
                >不通过</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;"
                  v-if="item.lip_state.file == 1"
                >{{item.lip_state.user}}</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.lip_state.file == 1 && item.lip_state.state == 1"
                >已确认</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.lip_state.file == 1  && item.lip_state.state == 1"
                >{{item.lip_state.state_user}}</span>
              </div>
              <div class="btn-wrap">
                <el-button
                  type="primary"
                  v-if="item.lip_state.file == 1 && item.lip_state.type == 3 && adminState"
                  size="mini"
                  @click="checkEvent(5,'lip_state',1)"
                  plain
                >确认</el-button>
                <el-button
                  v-if="!(item.lip_state.file == 1 && item.lip_state.type == 3) && adminState"
                  size="mini"
                  plain
                  disabled
                >确认</el-button>
                <el-button type="success" size="mini" @click="checkEvent(3,'lip_state',1)" plain>通过</el-button>
                <el-button type="info" size="mini" @click="checkEvent(4,'lip_state',1)" plain>暂定</el-button>
                <el-button type="warning" size="mini" @click="checkEvent(2,'lip_state',1)" plain>不通过</el-button>
              </div>
            </div>
            <div class="check-row" :style="checkBorder(1,'new_all')">
              <div class="state-wrap">
                <span>106点:</span>
                <span
                  style="color:rgb(112,196,66);margin-left:10px;"
                  v-if="item.new_all.file == 1 && item.new_all.type == 3"
                >通过</span>
                <span
                  style="color:#909399;margin-left:10px;"
                  v-if="item.new_all.file == 1 && item.new_all.type == 4"
                >暂定</span>
                <span
                  style="color:#e6a23c;margin-left:10px;"
                  v-if="item.new_all.file == 1 && item.new_all.type == 2"
                >不通过</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;"
                  v-if="item.new_all.file == 1"
                >{{item.new_all.user}}</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.new_all.file == 1 && item.new_all.state == 1"
                >已确认</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.new_all.file == 1  && item.new_all.state == 1"
                >{{item.new_all.state_user}}</span>
              </div>
              <div class="btn-wrap">
                <el-button
                  type="primary"
                  v-if="(item.new_all.file == 1 && item.new_all.type == 3) && adminState"
                  size="mini"
                  @click="checkEvent(5,'new_all',1)"
                  plain
                >确认</el-button>
                <el-button
                  v-if="!(item.new_all.file == 1 && item.new_all.type == 3) && adminState"
                  size="mini"
                  plain
                  disabled
                >确认</el-button>
                <el-button type="success" size="mini" @click="checkEvent(3,'new_all',1)" plain>通过</el-button>
                <el-button type="info" size="mini" @click="checkEvent(4,'new_all',1)" plain>暂定</el-button>
                <el-button type="warning" size="mini" @click="checkEvent(2,'new_all',1)" plain>不通过</el-button>
              </div>
            </div>
            <div class="check-row" :style="checkBorder(1,'pupil_state')">
              <div class="state-wrap">
                <span>瞳孔:</span>
                <span
                  style="color:rgb(112,196,66);margin-left:10px;"
                  v-if="item.pupil_state.file == 1 && item.pupil_state.type == 3"
                >通过</span>
                <span
                  style="color:#909399;margin-left:10px;"
                  v-if="item.pupil_state.file == 1 && item.pupil_state.type == 4"
                >暂定</span>
                <span
                  style="color:#e6a23c;margin-left:10px;"
                  v-if="item.pupil_state.file == 1 && item.pupil_state.type == 2"
                >不通过</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;"
                  v-if="item.pupil_state.file == 1"
                >{{item.pupil_state.user}}</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.pupil_state.file == 1 && item.pupil_state.state == 1"
                >已确认</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.pupil_state.file == 1  && item.pupil_state.state == 1"
                >{{item.pupil_state.state_user}}</span>
              </div>
              <div class="btn-wrap">
                <el-button
                  type="primary"
                  v-if="(item.pupil_state.file == 1 && item.pupil_state.type == 3) && adminState"
                  size="mini"
                  @click="checkEvent(5,'pupil_state',1)"
                  plain
                >确认</el-button>
                <el-button
                  v-if="!(item.pupil_state.file == 1 && item.pupil_state.type == 3) && adminState"
                  size="mini"
                  plain
                  disabled
                >确认</el-button>
                <el-button
                  type="success"
                  size="mini"
                  @click="checkEvent(3,'pupil_state',1)"
                  plain
                >通过</el-button>
                <el-button type="info" size="mini" @click="checkEvent(4,'pupil_state',1)" plain>暂定</el-button>
                <el-button
                  type="warning"
                  size="mini"
                  @click="checkEvent(2,'pupil_state',1)"
                  plain
                >不通过</el-button>
              </div>
            </div>
          </div>
        </div>
        <div style="position: relative;display:flex;flex-direction: row;">
          <div
            class="item-img-row"
            v-if="item.info.username_part.length > 0"
            :key="index"
            @click="openDrawImg(item.info.keypoint,imgId(item.id,index))"
          >
            <div class="item-img-row-draw">
              <img
                height="250px;"
                :id="imgId(item.id,index)"
                @load="miniImgLoad(item.info.keypoint, item.new_keypoint, imgId(item.id,index),$event)"
                :src="maskUrl(item.pic_url)"
              >
              <canvas v-show="!showState" :id="canvasId(imgId(item.id,index),224)"></canvas>
              <canvas v-show="showState" :id="canvasId(imgId(item.id,index),106)"></canvas>
            </div>
            <div class="item-img-row-user" :key="idx" v-for="(row,idx) in item.info.username_part">
              <h4>{{row.username}}</h4>
              <span>{{partValue[row.part-1]}}</span>
            </div>
          </div>
          <div class="check-wrap" v-if="item.info.username_part.length > 0">
            <div class="check-row" :style="checkBorder(2,'eye_state')">
              <div class="state-wrap">
                <span>眼眶:</span>
                <span
                  style="color:rgb(112,196,66);margin-left:10px;"
                  v-if="item.eye_state.file == 2 && item.eye_state.type == 3"
                >通过</span>
                <span
                  style="color:#909399;margin-left:10px;"
                  v-if="item.eye_state.file == 2 && item.eye_state.type == 4"
                >暂定</span>
                <span
                  style="color:#e6a23c;margin-left:10px;"
                  v-if="item.eye_state.file == 2 && item.eye_state.type == 2"
                >不通过</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;"
                  v-if="item.eye_state.file == 2"
                >{{item.eye_state.user}}</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.eye_state.file == 2 && item.eye_state.state == 1"
                >已确认</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.eye_state.file == 2  && item.eye_state.state == 1"
                >{{item.eye_state.state_user}}</span>
              </div>
              <div class="btn-wrap">
                <el-button
                  type="primary"
                  v-if="(item.eye_state.file == 2 && item.eye_state.type == 3) && adminState "
                  size="mini"
                  @click="checkEvent(5,'eye_state',2)"
                  plain
                >确认</el-button>
                <el-button
                  v-if="!(item.eye_state.file == 2 && item.eye_state.type == 3) && adminState"
                  size="mini"
                  plain
                  disabled
                >确认</el-button>
                <el-button type="success" size="mini" @click="checkEvent(3,'eye_state',2)" plain>通过</el-button>
                <el-button type="info" size="mini" @click="checkEvent(4,'eye_state',2)" plain>暂定</el-button>
                <el-button type="warning" size="mini" @click="checkEvent(2,'eye_state',2)" plain>不通过</el-button>
              </div>
            </div>
            <div class="check-row" :style="checkBorder(2,'lip_state')">
              <div class="state-wrap">
                <span>嘴唇:</span>
                <span
                  style="color:rgb(112,196,66);margin-left:10px;"
                  v-if="item.lip_state.file == 2 && item.lip_state.type == 3"
                >通过</span>
                <span
                  style="color:#909399;margin-left:10px;"
                  v-if="item.lip_state.file == 2 && item.lip_state.type == 4"
                >暂定</span>
                <span
                  style="color:#e6a23c;margin-left:10px;"
                  v-if="item.lip_state.file == 2 && item.lip_state.type == 2"
                >不通过</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;"
                  v-if="item.lip_state.file == 2"
                >{{item.lip_state.user}}</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.lip_state.file == 2 && item.lip_state.state == 1"
                >已确认</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.lip_state.file == 2  && item.lip_state.state == 1"
                >{{item.lip_state.state_user}}</span>
              </div>
              <div class="btn-wrap">
                <el-button
                  type="primary"
                  v-if="(item.lip_state.file == 2 && item.lip_state.type == 3) && adminState"
                  size="mini"
                  @click="checkEvent(5,'lip_state',2)"
                  plain
                >确认</el-button>
                <el-button
                  v-if="!(item.lip_state.file == 2 && item.lip_state.type == 3) && adminState"
                  size="mini"
                  plain
                  disabled
                >确认</el-button>
                <el-button type="success" size="mini" @click="checkEvent(3,'lip_state',2)" plain>通过</el-button>
                <el-button type="info" size="mini" @click="checkEvent(4,'lip_state',2)" plain>暂定</el-button>
                <el-button type="warning" size="mini" @click="checkEvent(2,'lip_state',2)" plain>不通过</el-button>
              </div>
            </div>
            <div class="check-row" :style="checkBorder(2,'new_all')">
              <div class="state-wrap">
                <span>106点:</span>
                <span
                  style="color:rgb(112,196,66);margin-left:10px;"
                  v-if="item.new_all.file == 2 && item.new_all.type == 3"
                >通过</span>
                <span
                  style="color:#909399;margin-left:10px;"
                  v-if="item.new_all.file == 2 && item.new_all.type == 4"
                >暂定</span>
                <span
                  style="color:#e6a23c;margin-left:10px;"
                  v-if="item.new_all.file == 2 && item.new_all.type == 2"
                >不通过</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;"
                  v-if="item.new_all.file == 2"
                >{{item.new_all.user}}</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.new_all.file == 2 && item.new_all.state == 1"
                >已确认</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.new_all.file == 2  && item.new_all.state == 1"
                >{{item.new_all.state_user}}</span>
              </div>
              <div class="btn-wrap">
                <el-button
                  type="primary"
                  v-if="(item.new_all.file == 2 && item.new_all.type == 3) && adminState"
                  size="mini"
                  @click="checkEvent(5,'new_all',2)"
                  plain
                >确认</el-button>
                <el-button
                  v-if="!(item.new_all.file == 2 && item.new_all.type == 3) && adminState"
                  size="mini"
                  plain
                  disabled
                >确认</el-button>
                <el-button type="success" size="mini" @click="checkEvent(3,'new_all',2)" plain>通过</el-button>
                <el-button type="info" size="mini" @click="checkEvent(4,'new_all',2)" plain>暂定</el-button>
                <el-button type="warning" size="mini" @click="checkEvent(2,'new_all',2)" plain>不通过</el-button>
              </div>
            </div>
            <div class="check-row" :style="checkBorder(2,'pupil_state')">
              <div class="state-wrap">
                <span>瞳孔:</span>
                <span
                  style="color:rgb(112,196,66);margin-left:10px;"
                  v-if="item.pupil_state.file == 2 && item.pupil_state.type == 3"
                >通过</span>
                <span
                  style="color:#909399;margin-left:10px;"
                  v-if="item.pupil_state.file == 2 && item.pupil_state.type == 4"
                >暂定</span>
                <span
                  style="color:#e6a23c;margin-left:10px;"
                  v-if="item.pupil_state.file == 2 && item.pupil_state.type == 2"
                >不通过</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;"
                  v-if="item.pupil_state.file == 2"
                >{{item.pupil_state.user}}</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.pupil_state.file == 2 && item.pupil_state.state == 1"
                >已确认</span>
                <span
                  style="font-family:Helvetica Neue;margin-left:10px;color:red"
                  v-if="item.pupil_state.file == 2  && item.pupil_state.state == 1"
                >{{item.pupil_state.state_user}}</span>
              </div>
              <div class="btn-wrap">
                <el-button
                  type="primary"
                  v-if="(item.pupil_state.file == 2 && item.pupil_state.type == 3) && adminState"
                  size="mini"
                  @click="checkEvent(5,'pupil_state',2)"
                  plain
                >确认</el-button>
                <el-button
                  v-if="!(item.pupil_state.file == 2 && item.pupil_state.type == 3) && adminState"
                  size="mini"
                  plain
                  disabled
                >确认</el-button>
                <el-button
                  type="success"
                  size="mini"
                  @click="checkEvent(3,'pupil_state',2)"
                  plain
                >通过</el-button>
                <el-button type="info" size="mini" @click="checkEvent(4,'pupil_state',2)" plain>暂定</el-button>
                <el-button
                  type="warning"
                  size="mini"
                  @click="checkEvent(2,'pupil_state',2)"
                  plain
                >不通过</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-col>
    <div v-if="drawImg">
      <div class="mask"></div>
      <i class="el-icon-error close-icon" @click="closeDrawImg"></i>
      <div class="draw-img">
        <div class="draw-img-content">
          <span class="tooltip"></span>
          <div class="btn-wrap-left-new" v-if="pointModel">
            <el-switch
              style="padding:5px;height:40px;border-radius:2px;background-color: white;border-color: white;"
              v-model="pointModel"
              active-text="106点"
              inactive-text="224点"
            ></el-switch>
            <el-input-number
              style="margin-top:20px;"
              v-model="roundRadius"
              size="small"
              show-input
              :min="1"
              :max="10"
              :step="1"
            ></el-input-number>
          </div>
          <div class="btn-wrap-left" v-if="!pointModel">
            <el-switch
              style="padding:5px;height:40px;border-radius:2px;background-color: white;border-color: white;"
              v-model="pointModel"
              active-text="106点"
              inactive-text="224点"
            ></el-switch>
            <el-button type="primary" class="change-btn" @click="showArea(1)" plain>脸框、鼻梁</el-button>
            <el-button type="primary" class="change-btn" @click="showArea(2)" plain>眼睛、眉毛、眼框中心</el-button>
            <el-button type="primary" class="change-btn" @click="showArea(3)" plain>鼻子下沿、外侧、眼瞳、眼球中心</el-button>
            <el-button type="primary" class="change-btn" @click="showArea(4)" plain>上嘴唇</el-button>
            <el-button type="primary" class="change-btn" @click="showArea(5)" plain>下嘴唇</el-button>
            <el-button type="primary" class="change-btn" @click="showArea(6)" plain>全部</el-button>
            <el-button type="primary" class="change-btn" @click="changeRound" plain>圆点变色</el-button>
            <el-input-number
              v-model="roundRadius"
              size="small"
              show-input
              :min="1"
              :max="10"
              :step="1"
            ></el-input-number>
            <div class="save-btn">
              <el-button type="success" style="width:200px;margin-left:10px;" @click="saveSpot">保存</el-button>
              <el-button type="info" style="width:200px;" @click="reacllSpot">关键点重置</el-button>
            </div>
          </div>
          <img
            class="background-img"
            id="max-img"
            :src="maskUrl(item.pic_url)"
            draggable="false"
            @load="imgload"
          >
          <svg
            v-if="!pointModel"
            class="round-wrap"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <circle
              v-for="(row, index) in spotList"
              :key="index"
              @mouseenter="openTitle(index,$event,1)"
              @mouseleave="closeTitle"
              v-show="row.display === 'block' && row.showState"
              :cx="row.left"
              :cy="row.top"
              :title="indexContent(index)"
              :fill="row.background"
              @click="activePoint(index)"
              :r="roundRadiusValue"
            ></circle>
          </svg>
          <svg
            v-if="pointModel"
            class="round-wrap"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <circle
              v-for="(row, index) in new_spotList"
              :key="index"
              @mouseenter="openTitle(index,$event,2)"
              @mouseleave="closeTitle"
              v-show="row.display === 'block'"
              :cx="row.left"
              :cy="row.top"
              :fill="row.background"
              :r="roundRadiusValue"
            ></circle>
          </svg>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import $ from "jquery";
import { pointAdmin } from "../../authlist";

export default {
  name: "itemList",
  props: ["item", "index", "labelState", "showState","pointState"],
  data() {
    return {
      nWidth: 0,
      nHeight: 0,
      adminState: false,
      selectArea: 6,
      drawImg: false,
      imgUrlHeader: "http://10.85.125.61:13141",
      spotList: [],
      popupList: [],
      new_spotList: [],
      roundRadius: 3,
      colorSite: 0,
      pointModel: false,
      // pointSelet: '',
      lastSite: "",
      color: ["red", "green", "blue", "white"],
      partValue: [
        "脸框、鼻梁",
        "眼睛、眉毛、眼框中心",
        "鼻子下沿、外侧、眼瞳、眼球中心",
        "上嘴唇",
        "下嘴唇",
        "全部"
      ]
    };
  },
  created() {
    pointAdmin.forEach((row, idx) => {
      if (row.email == this.email) {
        this.adminState = true;
      }
    });
  },
  watch: {
    pointModel(val) {
      if (val) {
        this.roundRadius = 3;
      } else {
        this.roundRadius = 2;
      }
    },
    showState(val) {},
    roundRadius(newVal, oldVal) {
      let round = $(".round");
      round.css("height", newVal);
      round.css("width", newVal);
      this.spotList.forEach((row, index) => {
        row.top = parseFloat(row.top);
        row.left = parseFloat(row.left);
      });
    }
  },
  computed: {
    canvasId() {
      return function(id, point) {
        return this.getCanvasId(id, point);
      };
    },
    checkBorder() {
      //   return {
      //   border: "1px dashed #409EFF"
      // };
      return function(file, state) {
        return this.getCheckBorder(file, state);
      };
    },
    roundRadiusValue() {
      return this.roundRadius / 2;
    },
    indexContent() {
      return function(index) {
        return this.getIndexContent(index);
      };
    },
    maskUrl(url) {
      return function(value) {
        return this.methodGetUrl(value);
      };
    },
    imgId() {
      return function(id, index) {
        return this.backImgId(id, index);
      };
    },
    ...mapGetters(["email"])
  },
  methods: {
    getCanvasId(id, point) {
      if (point == 224) {
        return id + "canvas";
      } else if (point == 106) {
        return id + "canvas_106";
      }
    },
    getCheckBorder(file, state) {
      if (this.item[state].file == file && this.item[state].state == 1) {
        return {
          border: "2px dashed #409EFF"
        };
      } else {
        return {
          border: "2px dashed #d3d4d6"
        };
      }
    },
    closeTitle() {
      $(".tooltip").css("display", "none");
      $(".tooltip").text("");
    },
    openTitle(index, $event, type) {
      const that = this;
      $(".tooltip").css("top", $event.target.cy.baseVal.value - 60);
      $(".tooltip").css("left", $event.target.cx.baseVal.value);
      if (type == 1) {
        $(".tooltip").text(that.getIndexContent(index));
      } else if (type == 2) {
        $(".tooltip").text(that.getNewIndexContent(index));
      }

      $(".tooltip").css("display", "block");
    },
    changeRoundKey(event) {
      console.log(event.keyCode);
      switch (event.keyCode) {
        case 27:
          this.closeDrawImg();
          break;
        case 82:
          this.changeRound();
          // W 向上一格
          break;
        case 81:
          this.roundRadius -= 1;
          // 半径变小
          break;
        case 69:
          this.roundRadius += 1;
          // 半径变大
          break;
        case 70:
          this.pointModel = !this.pointModel;
          // 224 106点切换
          break;
      }
    },
    changeRound() {
      // let round = $(".round")
      // round.css("background", this.color[this.colorSite])
      this.spotList.forEach(row => {
        row.background = this.color[this.colorSite];
      });
      this.colorSite = this.colorSite >= 3 ? 0 : this.colorSite + 1;
    },
    checkEvent(type, state, file) {
      this.$confirm("确定执行审核操作？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.checkRow(type, state, file);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
    },
    checkRow(type, state, file) {
      var tempData = {
        url: "http://10.85.125.61:13141/check_data.json", // 接口请求地址
        param: {
          check_type: type,
          id: this.item.id,
          check_model: state,
          check_user: this.email, // 用户邮箱前缀
          check_file: file
        }
      };

      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            Message({
              showClose: true,
              message: res.msg || "审核成功！",
              type: "success",
              duration: 1500
            });
            if (type == 5) {
              this.item[state].state = 1;
              this.item[state].state_user = this.email;
            } else {
              if (type != 3 || this.item[state].file != file) {
                this.item[state].state = 0;
                this.item[state].state_user = "";
              }
              this.item[state].type = type;
              this.item[state].user = this.email;
              this.item[state].file = file;
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
    reacllSpot() {
      const that = this;
      $(".round-wrap").off("click");
      if (this.lastSite) {
        this.spotList[this.lastSite].background = "red";
      } else {
        this.lastSite = "";
      }
      let width = $("#max-img").width();
      let height = $("#max-img").height();
      this.spotList = this.popupList.map((row, index) => {
        if (index >= 52 && index <= 185) {
          return {
            top:
              Math.round(
                ((row.y / this.nHeight) * height - this.roundRadius / 2) * 10000
              ) / 10000,
            left:
              Math.round(
                ((row.x / this.nWidth) * width - this.roundRadius / 2 + 200) *
                  10000
              ) / 10000,
            display: "block",
            background: "red"
          };
        } else {
          return {
            top:
              Math.round(
                ((row.y / this.nHeight) * height - this.roundRadius / 2) * 10000
              ) / 10000,
            left:
              Math.round(
                ((row.x / this.nWidth) * width - this.roundRadius / 2 + 200) *
                  10000
              ) / 10000,
            display: "none",
            background: "red"
          };
        }
      });
      this.lastSite = "";
      // this.roundRadius = 3;11
    },
    activePoint(site) {
      const that = this;
      if (this.siteState(site, this.selectArea)) {
        if (this.lastSite === "") {
          this.spotList[site].background = "yellow";
        } else {
          this.spotList[this.lastSite].background =
            this.colorSite <= 0
              ? this.color[3]
              : this.color[this.colorSite - 1];
          this.spotList[site].background = "yellow";
        }
        this.lastSite = site;
        $(".round-wrap")
          .off("click")
          .on("click", clickAction);
        $(document)
          .off("keydown")
          .on("keydown", keyInput);

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
            case 90:
              // 上一个点
              if (site >= 223) {
                break;
              } else {
                that.activePoint(site + 1);
                break;
              }
            case 88:
              // 下一个点
              if (site <= 0) {
                break;
              } else {
                that.activePoint(site - 1);
                break;
              }
            case 82:
              // D 向右一格
              that.changeRound();
              break;
            case 81:
              that.roundRadius -= 1;
              // 缩小
              break;
            case 69:
              that.roundRadius += 1;
              // 放大
              break;
            case 70:
              this.pointModel = !this.pointModel;
              // 224 106 点切换
              break;
            case 13:
              // that.roundRadius += 1;
              that.spotList[that.lastSite].background =
                that.colorSite <= 0
                  ? that.color[0]
                  : that.color[that.colorSite - 1];
              that.lastSite = "";
              $(document)
                .off("keydown")
                .on("keydown", that.changeRoundKey);
              $(".round-wrap").off("click");
              break;
          }
        }

        function changeStepSport(key, step) {
          let overX = parseInt(that.spotList[site].left);
          let overY = parseInt(that.spotList[site].top);
          if (
            (key === "a" || key === "d") &&
            (overX < $("#max-img").width() + 198 && overX > 198)
          ) {
            that.spotList[site].left =
              parseInt(that.spotList[site].left) + step;
          } else if (
            (key === "w" || key === "s") &&
            (overY < $("#max-img").height() - 1 && overY > -1)
          ) {
            that.spotList[site].top = parseInt(that.spotList[site].top) + step;
          }
        }

        function clickAction(event) {
          that.spotList[site].left =
            Math.round(
              (event.pageX - $("#max-img").offset().left + 200) * 10000
            ) / 10000;
          that.spotList[site].top =
            Math.round((event.pageY - $("#max-img").offset().top) * 10000) /
            10000;
        }
      }
    },
    getNewIndexContent(index) {
      if (index >= 0 && index <= 32) {
        return `${index}、脸框,共33`;
      } else if (index >= 43 && index <= 46) {
        return `${index}、鼻梁,共4`;
      } else if (index >= 47 && index <= 51) {
        return `${index}、鼻子下沿,共5`;
      } else if (index >= 78 && index <= 83) {
        return `${index}、鼻子外侧,共6`;
      } else if (index == 48 || index == 104) {
        return `${index}、左眼眶中心点,共2`;
      } else if ((index >= 52 && index <= 57) || (index >= 72 && index <= 73)) {
        return `${index}、左眼眶,共8`;
      } else if (index == 77 && index == 105) {
        return `${index}、右眼眶中心点,共2`;
      } else if ((index >= 58 && index <= 63) || (index >= 75 && index <= 76)) {
        return `${index}、右眼眶,共8`;
      } else if ((index >= 33 && index <= 37) || (index >= 64 && index <= 67)) {
        return `${index}、左眉毛，共9`;
      } else if ((index >= 38 && index <= 42) || (index >= 68 && index <= 71)) {
        return `${index}、右眉毛，共9`;
      } else if (
        (index >= 84 && index <= 90) ||
        (index >= 96 && index <= 100)
      ) {
        return `${index}、上嘴唇,共12`;
      } else if (
        (index >= 91 && index <= 95) ||
        (index >= 101 && index <= 103)
      ) {
        return `${index}、下嘴唇，共12`;
      }
    },
    getIndexContent(index) {
      if (index >= 0 && index <= 32) {
        return `${index}、脸框${index + 1}号点,共33`;
      } else if (index >= 33 && index <= 36) {
        return `${index}、鼻梁${index - 33 + 1}号点,共4`;
      } else if (index >= 37 && index <= 41) {
        return `${index}、鼻子下沿${index - 37 + 1}号点,共5`;
      } else if (index >= 42 && index <= 47) {
        return `${index}、鼻子外侧${index - 42 + 1}号点,共6`;
      } else if (index == 48) {
        return `${index}、左眼眶中心点${index - 48 + 1}号点,共1`;
      } else if (index == 49) {
        return `${index}、左眼球中心点${index - 49 + 1}号点,共1`;
      } else if (index == 50) {
        return `${index}、左眼球中心点${index - 50 + 1}号点,共1`;
      } else if (index == 51) {
        return `${index}、左眼球中心点${index - 51 + 1}号点,共1`;
      } else if (index >= 52 && index <= 62) {
        return `${index}、左眼睛下沿${index - 52 + 1}号点,共11`;
      } else if (index >= 63 && index <= 73) {
        return `${index}、左眼睛上沿${index - 63 + 1}号点,共11`;
      } else if (index >= 74 && index <= 84) {
        return `${index}、右眼睛下沿${index - 74 + 1}号点,共11`;
      } else if (index >= 85 && index <= 95) {
        return `${index}、右眼睛上沿${index - 85 + 1}号点,共11`;
      } else if (index >= 96 && index <= 102) {
        return `${index}、左眉毛上沿${index - 96 + 1}号点,共7`;
      } else if (index >= 103 && index <= 108) {
        return `${index}、左眉毛下沿${index - 103 + 1}号点,共6`;
      } else if (index >= 109 && index <= 115) {
        return `${index}、右眉毛上沿${index - 103 + 1}号点,共7`;
      } else if (index >= 116 && index <= 121) {
        return `${index}、左眉毛下沿${index - 109 + 1}号点,共6`;
      } else if (index >= 122 && index <= 138) {
        return `${index}、上嘴唇上沿${index - 122 + 1}号点,共17`;
      } else if (index >= 139 && index <= 155) {
        return `${index}、上嘴唇下沿${index - 139 + 1}号点,共17`;
      } else if (index >= 156 && index <= 170) {
        return `${index}、下嘴唇上沿${index - 156 + 1}号点,共15`;
      } else if (index >= 171 && index <= 185) {
        return `${index}、下嘴唇下沿${index - 171 + 1}号点,共15`;
      } else if (index >= 186 && index <= 204) {
        return `${index}、下嘴唇下沿${index - 186 + 1}号点,共19`;
      } else if (index >= 205 && index <= 223) {
        return `${index}、下嘴唇下沿${index - 205 + 1}号点,共19`;
      }
    },
    methodGetUrl(url) {
      const that = this;
      if (url.indexOf("data:image/jpeg") < 0) {
        return that.imgUrlHeader + url;
      } else {
        return url;
      }
    },
    saveSpot() {
      const that = this;
      $(document).off("keydown");
      let width = $("#max-img").width();
      let height = $("#max-img").height();
      let uploadList = this.spotList.map((row, index) => {
        return {
          x:
            Math.round(
              ((parseFloat(row.left) + this.roundRadius / 2 - 200) / width) *
                this.nWidth *
                10000
            ) / 10000,
          y:
            Math.round(
              ((parseFloat(row.top) + this.roundRadius / 2) / height) *
                this.nHeight *
                10000
            ) / 10000
        };
      });
      const tempData = {
        url: "http://10.85.125.61:13141/push_result.json", // 接口请求地址
        param: {
          id: this.item.id,
          username: this.email, // 用户邮箱前缀
          keypoint: JSON.stringify(uploadList),
          part: that.selectArea
        }
      };
      let params = new URLSearchParams();
      params.append("data", JSON.stringify(tempData));
      params.append("cip", 230);
      this.$store.dispatch("ProxyPost", params).then(
        res => {
          if (res && res.code == 200) {
            // 添加bug canvas上为绘制点
            let id = that.item.id;
            let isAdd = true;
            this.item.info.keypoint = JSON.parse(JSON.stringify(uploadList));
            this.item.info.username_part.forEach((row, index) => {
              if (row.part == that.selectArea) {
                row.username = that.email;
                let isAdd = false;
              }
            });
            if (isAdd) {
              this.item.info.username_part.push({
                username: that.email,
                part: that.selectArea
              });
            }
            this.miniImgLoad(uploadList, this.item.item.new_keypoint, id);
            that.drawImg = false;
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
      return id.split(".jpg")[0] + index;
      // return 123
    },
    closeDrawImg() {
      // this.roundRadius = 3;12
      this.drawImg = false;
      this.popupList = [];
      this.colorSite = 0;
      $("body").css("overflow", "auto");
      $(document).off("keydown");
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
    openDrawImg(list, id) {
      $("body").css("overflow", "hidden");
      $(document)
        .off("keydown")
        .on("keydown", this.changeRoundKey);
      this.drawImg = true;
      this.pointModel = this.showState;
      if (this.pointModel) {
        this.roundRadius = 3;
      } else {
        this.roundRadius = 2;
      }
      this.colorSite = 0;
      this.popupList = list;
    },
    siteState(site, area) {
      if (area === 6) {
        return true;
      } else if (site >= 0 && site <= 36) {
        //脸框 鼻梁
        return area == 1;
      } else if ((site >= 52 && site <= 121) || site == 48 || site == 50) {
        //  眼睛 眉毛上下沿 左右眼狂中心
        return area == 2;
      } else if (
        (site >= 37 && site <= 47) ||
        (site >= 186 && site <= 223) ||
        site == 49 ||
        site == 51
      ) {
        //  鼻子下沿 鼻子外侧 左右眼瞳 左右眼球中心
        return area == 3;
      } else if (site >= 122 && site <= 155) {
        //  上嘴唇
        return area == 4;
      } else if (site >= 156 && site <= 185) {
        //  下嘴唇
        return area == 5;
      }
    },
    showArea(area) {
      const that = this;
      this.selectArea = area;
      // this.pointSelet = ''
      $(".round-wrap").off("click");
      $(document).off("keydown");
      $(document)
        .off("keydown")
        .on("keydown", that.changeRoundKey);

      if (this.lastSite) {
        this.spotList[this.lastSite].background = this.color[
          this.colorSite - 1
        ];
      } else {
        this.lastSite = "";
      }
      this.spotList.forEach((row, index) => {
        row.display = this.siteState(index, area) ? "block" : "none";
      });
    },
    imgload(event) {
      this.nWidth = event.target.naturalWidth;
      this.nHeight = event.target.naturalHeight;
      let width = event.target.width;
      let height = event.target.height;
      if(this.pointState){
        this.spotList = this.popupList.map((row, index) => {
        if ((index >= 96 && index <= 185) || (index >= 186 && index <= 223)) {
          return {
            top:
              Math.round(
                ((row.y / this.nHeight) * height - this.roundRadius / 2) * 10000
              ) / 10000,
            left:
              Math.round(
                ((row.x / this.nWidth) * width - this.roundRadius / 2 + 200) *
                  10000
              ) / 10000,
            display: "block",
            background: "red",
            showState: true
          };
        } else {
          return {
            top:
              Math.round(
                ((row.y / this.nHeight) * height - this.roundRadius / 2) * 10000
              ) / 10000,
            left:
              Math.round(
                ((row.x / this.nWidth) * width - this.roundRadius / 2 + 200) *
                  10000
              ) / 10000,
            display: "none",
            background: "red",
            showState: false
          };
        }
      });
      }else{
        this.spotList = this.popupList.map((row, index) => {
        if (index >= 52 && index <= 185) {
          return {
            top:
              Math.round(
                ((row.y / this.nHeight) * height - this.roundRadius / 2) * 10000
              ) / 10000,
            left:
              Math.round(
                ((row.x / this.nWidth) * width - this.roundRadius / 2 + 200) *
                  10000
              ) / 10000,
            display: "block",
            background: "red",
            showState: true
          };
        } else {
          return {
            top:
              Math.round(
                ((row.y / this.nHeight) * height - this.roundRadius / 2) * 10000
              ) / 10000,
            left:
              Math.round(
                ((row.x / this.nWidth) * width - this.roundRadius / 2 + 200) *
                  10000
              ) / 10000,
            display: "none",
            background: "red",
            showState: false
          };
        }
      });
      }
      
      this.new_spotList = this.item.new_keypoint.map((row, index) => {
        return {
          top:
            Math.round(
              ((row.y / this.nHeight) * height - this.roundRadius / 2) * 10000
            ) / 10000,
          left:
            Math.round(
              ((row.x / this.nWidth) * width - this.roundRadius / 2 + 200) *
                10000
            ) / 10000,
          display: "block",
          background: "red"
        };
      });
      this.showArea(this.labelState);
      this.changeRound();
    },
    miniImgLoad(list, list_106, id, event = "") {
      const that = this;
      if (event) {
        this.nWidth = event.target.naturalWidth;
        this.nHeight = event.target.naturalHeight;
      }
      // $("#" + id + "canvas").remove();
      let width = $("#" + id).width();
      let height = $("#" + id).height();
      // 初始化204点
      let canvasObj = $("#" + id + "canvas");
      canvasObj.css({
        position: "absolute",
        top: "0",
        left: "0",
        "z-index": "10"
      });
      let canvas = canvasObj[0];
      let context = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      canvas.id = id + "canvas";
      list.forEach((row, index) => {
        context.beginPath();
        context.fillStyle = "#FF0000";
        let x = (row.x / this.nWidth) * width;
        let y = (row.y / this.nHeight) * height;
        context.arc(x, y, 1, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
      });
      // if ($("#" + id + "canvas").length > 0) {
      //   $("#" + id + "canvas").remove();
      // }
      // $("#" + id).after(canvas);
      // 初始化106点
      // $("#" + id + "canvas_106").remove();
      let canvasObj_106 = $("#" + id + "canvas_106");
      canvasObj_106.css({
        position: "absolute",
        top: "0",
        left: "0",
        "z-index": "10"
      });
      let canvas_106 = canvasObj_106[0];
      let context_106 = canvas_106.getContext("2d");
      canvas_106.width = width;
      canvas_106.height = height;
      canvas_106.id = id + "canvas_106";
      list_106.forEach((row, index) => {
        context_106.beginPath();
        context_106.fillStyle = "#FF0000";
        let x = (row.x / this.nWidth) * width;
        let y = (row.y / this.nHeight) * height;
        context_106.arc(x, y, 1, 0, Math.PI * 2, true);
        context_106.closePath();
        context_106.fill();
      });
      // if ($("#" + id + "canvas_106").length > 0) {
      //   $("#" + id + "canvas_106").remove();
      // }
      // $("#" + id).after(canvas_106);
    }
  }
};
</script>

<style lang="scss" scoped>
.tooltip {
  display: none;
  position: absolute;
  z-index: 30;
  border-radius: 4px;
  padding: 10px;
  z-index: 2000;
  font-size: 12px;
  line-height: 1.2;
  min-width: 200px;
  word-wrap: break-word;
  background: #fff;
  border: 1px solid #303133;
  transform-origin: center top 0;
}
.round-wrap {
  width: 100%;
  height: 100%;
  // z-index: 10;
  position: absolute;
}
.save-btn {
  display: flex;
  flex-direction: column;
  align-content: flex-end;
}
// .change-btn{
//   z-index: 20;
// }
img {
  user-select: none;
}
.round {
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  background: red;
  cursor: crosshair;
}
.item-img-row-draw {
  position: relative;
  // box-shadow: 0 0 8px 0 rgba(0,0,0,0.2);
  .canvas-cover {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }
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
  .check-wrap {
    min-width: 290px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    .check-row {
      padding: 5px;
      margin-bottom: 15px;
      // border: 1px dashed #67c23a;
    }
    .state-wrap {
      display: flex;
      flex-direction: row;
    }
    .btn-wrap {
      display: flex;
      margin-top: 5px;
      flex-direction: row;
    }
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
      width: 100%;
      margin-top: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 14px;
      border-bottom: 1px solid #eee;
      span {
        display: block;
        margin-top: 5px;
        margin-bottom: 2px;
      }
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
      // border-top: 1px solid #eee;
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
  cursor: crosshair;
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
  .background-img {
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
  .btn-wrap-left-new {
    width: 200px;
    height: 600px;
    display: flex;
    z-index: 20;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 20px;
    justify-content: flex-start;
  }
  .btn-wrap-left {
    width: 200px;
    height: 600px;
    display: flex;
    z-index: 20;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 20px;
    justify-content: space-between;
  }
}
</style>
