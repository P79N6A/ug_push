<template>
  <el-row v-if="item">
    <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23" class="item-wrapper">
      <el-row class="clearfix">
        <span>No.{{index}}</span>
        <span class="item-title">{{item.title || '暂无'}}</span>
        <el-button v-if="data" class="right" type="primary" plain size="mini" @click="handleUpdate()">编辑</el-button>
      </el-row>
      <el-dialog title="编辑大事件" :visible.sync="dialogVisible" width="60%">
        <el-form label-position="left" size="small">
          <el-form-item label="标题" required>
            <el-input type="textarea" autosize v-model.trim="data.title" placeholder="请输入大事件标题" clearable style="max-width: 360px"></el-input>
          </el-form-item>
          <el-form-item label="描述" required>
            <el-input type="textarea" autosize v-model.trim="text" placeholder="请输入简要描述大事件" clearable style="max-width: 360px"></el-input>
          </el-form-item>
          <el-form-item label="时间" required>
            <el-date-picker v-model="data.event_date" type="datetime" placeholder="选择日期时间" value-format="timestamp">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="监控图" required>
            <div class="left edit-img-box" :key="idx" v-for="(val, idx) in data.img">
              <img class="edit-img" :src="val" :alt="data.title" />
              <div class="edit-img-mask">
                <i class="el-icon-delete edit-img-delete" @click="handleDeleteImg(idx)"></i>
              </div>
            </div>
            <el-upload action="" accept="image/jpeg,image/png" :on-change="handleFile" :on-remove="handleRemove" list-type="picture-card" :auto-upload="false" :file-list="fileList">
              <i class="el-icon-plus"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="updateEvent()">保 存</el-button>
        </div>
      </el-dialog>
      <el-row class="info-box">
        <span class="item-info">{{_parseTime(item.event_date)}}</span>
      </el-row>
      <el-row>
        <p class="content-text" v-html="(item.description && item.description.text) ? item.description.text : '暂无描述'"></p>
      </el-row>
      <el-row class="img-wrapper" v-if="item.img && item.img.length > 0">
        <el-col :md="12" :span="24" :key="idx" v-for="(val, idx) in item.img">
          <div class="img-box" :href="val" target="_blank" title="查看原图" @click="showFullImg(val)">
            <img :src="val" :alt="item.title" />
          </div>
        </el-col>
      </el-row>
    </el-col>
    <div v-show="isShowFull" class="img-full-box" :style="`background-image: url(${fullLink})`" @click="showFullImg()"></div>
  </el-row>
</template>
<script>
import { Message } from "element-ui";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";

export default {
  name: "itemList",
  props: ["item", "index", "callback"],
  data() {
    return {
      dialogVisible: false,
      data: null,
      isShowFull: false,
      fullLink: "",
      imgObj: {},
      fileList: [],
      text: ""
    };
  },
  computed: {
    ...mapGetters(["email"])
  },
  methods: {
    init() {
      if (this.item) {
        this.data = JSON.parse(JSON.stringify(this.item));
        this.text = (this.item.description && this.item.description.text) ? this.item.description.text.replace(/\<br \/\>/g, "\n") : "";
      }
    },
    _parseTime(time, cFormat) {
      return parseTime(time, cFormat);
    },
    handleUpdate() {
      this.fileList = [];
      this.imgObj = {};
      this.init();
      this.dialogVisible = true;
    },
    updateEvent() {
      if (!this.data.title) {
        Message({
          showClose: true,
          message: "请填写标题！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.text) {
        Message({
          showClose: true,
          message: "请填写事件描述！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (!this.data.event_date) {
        Message({
          showClose: true,
          message: "请选择事件发生日期时间！",
          type: "error",
          duration: 3000
        });
        return;
      }
      if (this.data.img.length === 0 && JSON.stringify(this.imgObj) == "{}") {
        Message({
          showClose: true,
          message: "请上传监控图！",
          type: "error",
          duration: 3000
        });
        return;
      }
      this.$confirm("将保存修改, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success"
      })
        .then(() => {
          this.updateAction();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消添加！"
          });
        });
    },
    updateAction() {
      let imgList = JSON.parse(JSON.stringify(this.data.img));
      for (let i in this.imgObj) {
        imgList.push(this.imgObj[i]);
      }
      const description = {text: this.text};
      let params = new URLSearchParams();
      params.append("id", this.data.id);
      params.append("title", this.data.title);
      params.append("event_date", this.data.event_date);
      params.append("description", JSON.stringify(description));
      params.append("img", JSON.stringify(imgList));
      params.append("username", this.email);
      params.append("cip", 230);
      const data = {
        url: "/event/editEvent",
        params: params
      };
      this.$store.dispatch("CommonPost", data).then(res => {
        if (res.code && Number(res.code) == 200) {
          this.dialogVisible = false;
          this.callback(this.index);
        } else {
          Message({
            showClose: true,
            message: res.msg || "操作失败！",
            type: "error",
            duration: 3000
          });
        }
      }, err => {
        Message({
          showClose: true,
          message: "操作接口请求失败！",
          type: "error",
          duration: 3000
        });
      });
    },
    showFullImg(link) {
      if (link) {
        this.fullLink = link;
        this.isShowFull = true;
      } else {
        this.isShowFull = false;
      }
    },
    handleDeleteImg(i) {
      this.data.img.splice(i, 1);
    },
    handleRemove(file, fileList) {
      if (this.imgObj.hasOwnProperty(file.uid)) {
        delete this.imgObj[file.uid];
      }
    },
    handleFile(file) {
      const url = this.blobToDataURL(file.url, file.uid, this.setImgUrl);
    },
    setImgUrl(url, uid) {
      this.imgObj[uid] = url;
    },
    blobToDataURL(blob, uid, callback) {
      fetch(blob)
        .then(data => {
          const blob = data.blob();
          return blob;
        })
        .then(blob => {
          let reader = new window.FileReader();
          reader.onloadend = function() {
            const data = reader.result;
            callback(data, uid);
          };
          reader.readAsDataURL(blob);
        });
    }
  },
  created() {
    this.init();
  },
  watch: {
    item() {
      this.init();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.item-wrapper {
  margin-top: 10px;
  margin-left: 4px;
  padding: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  border: 1px solid #ebeef5;
  .item-title {
    font-weight: 700;
    color: #333;
  }
  .info-box {
    margin-top: 10px;
    .item-info {
      font-size: 14px;
      color: #666;
    }
  }
  .content-text {
    padding: 10px 5px;
    width: 100%;
    color: #606266;
    font-size: 14px;
    line-height: 18px;
  }
  .img-wrapper {
    .img-box {
      display: inline-block;
      width: 100%;
      padding: 5px;
      cursor: zoom-in;
      img {
        width: 100%;
        height: 300px;
        border-radius: 3px;
        border: 1px solid #000;
      }
    }
  }
  .edit-img-box {
    position: relative;
    margin-right: 8px;
    margin-bottom: 8px;
    width: 148px;
    height: 148px;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius:6px;
    .edit-img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    .edit-img-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0,0,0,.5);
      transition: opacity .3s;
      .edit-img-delete {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
    }
    &:hover {
      .edit-img-mask {
        opacity: 1;
      }
    }
  }
}
.img-full-box {
    z-index: 999;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(238,238,238, .8);
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    cursor: zoom-out;
}
</style>