<template>
  <el-row v-if="item">
    <el-col :span="24" class="item-wrapper clearfix">
      <h3 style="padding-left: 20px;height:30px;line-height:30px;">
        视频mid：{{item.id}}
        <el-button
          v-show="item.isLabel == 2 && adminState"
          size="mini"
          class="delete-img"
          type="info"
          round
          plain
          disabled
        >已下线</el-button>
      </h3>
      <div class="user-wrap" v-if="itemData">
        <img class="face-img" :src="itemData.face_img">
        <a class="user-name" target="_blank" :href="itemData.weibo_link">{{itemData.name}}</a>
        <span class="created-at">
          <i class="el-icon-time"></i>
          {{itemData.created_at}}
        </span>
      </div>
      <el-switch class="text-btn" v-model="textBtnState" inactive-text="显示博文"></el-switch>
      <p class="text" v-if="getTextState">{{itemData.text}}</p>
      <div class="video-wrap">
        <i class="el-icon-caret-right start-icon" v-if="!videoState" @click="activeVideo(item.id)"></i>
        <video :poster="itemData.cover_img" :id="item.id" controls="controls">您的浏览器不支持HTML5</video>
      </div>
      <div class="machine-label" v-show="item.info.length == 0 && !editArea">
        <el-tag class="label-name">人工标签</el-tag>
        <el-tree
          node-key="id"
          class="label-tree"
          :data="labelData"
          :expand-on-click-node="false"
          :props="defaultProps"
        >
          <span class="custom-tree-node" slot-scope="{ node }">
            <span v-if="!node.light" style="color:red;">{{ label[node.label].label }}</span>
            <span v-if="node.light">{{ label[node.label].label }}</span>
          </span>
        </el-tree>
        <el-button
          class="label-name"
          v-if="!editArea"
          type="primary"
          size="small"
          @click="openEditArea(labelData)"
        >编辑</el-button>
      </div>
      <div class="machine-label" v-show="item.info.length != 0 && !editArea">
        <el-tag class="label-name-info" type="success">{{rowValue.username}}</el-tag>
        <span style="color:rgb(112,196,66)" v-if="rowValue.check_type === 3">通过</span>
        <span style="color:rgb(244,111,112)" v-if="rowValue.check_type === 2">不通过</span>
        <span v-if="rowValue.check_user">审核人：{{rowValue.check_user}}</span>
        <el-button type="success" size="mini" @click="checkEvent(1,rowValue,rowIndex)">通过</el-button>
        <el-button type="info" size="mini" @click="checkEvent(2,rowValue,rowIndex)">不通过</el-button>
        <el-tree
          node-key="id"
          class="label-tree"
          :data="rowValue.machine_label"
          :expand-on-click-node="false"
          :props="defaultProps"
        >
          <span class="custom-tree-node" slot-scope="{ node }">
            <span v-if="labelColor(node.label)" style="color:red">{{labelName(node.label)}}</span>
            <span v-if="!labelColor(node.label)">{{labelName(node.label)}}</span>
          </span>
        </el-tree>
        <el-button
          class="label-name"
          v-if="!editArea"
          type="primary"
          size="small"
          @click="openEditArea(rowValue.machine_label)"
        >编辑</el-button>
      </div>
      <div v-if="editArea" class="edit-wrap">
        <el-tag class="label-name" type="danger" style="display: block">编辑标签</el-tag>
        <el-input class="search-label" placeholder="输入进行过滤" v-model="filterText" clearable></el-input>
        <el-tree
          class="label-tree"
          :data="label"
          node-key="id"
          show-checkbox
          :default-checked-keys="editLabel"
          :props="defaultProps"
          :filter-node-method="filterNode"
          ref="tree"
        >
          <span class="custom-tree-node" slot-scope="{ node }">
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
        <el-button style="margin-left: 20px" type="primary" size="small" @click="saveEditArea">保存</el-button>
        <el-button type="danger" size="small" @click="closeEditArea">取消</el-button>
      </div>
      <div class="machine-label">
        <el-tag class="label-name">算法标签</el-tag>
        <el-tree
          class="label-tree"
          :data="this.item.machine_label"
          :expand-on-click-node="false"
          :default-expand-all="true"
          :props="defaultProps"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ label[node.label].label }}</span>
            <span style="margin-left=10px">{{ data.weight }}</span>
          </span>
        </el-tree>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";
import $ from "jquery";
import { pointAdmin } from "../../authlist";

export default {
  name: "itemList",
  props: ["item", "label_list", "index", "labelState", "textBtnState", "label"],
  data() {
    return {
      itemData: "",
      checkList: [],
      visible2: false,
      textState: false,
      adminState: false,
      videoState: false,
      editLabel: [],
      selectLabel: [],
      filterText: "",
      rowValue: "",
      rowIndex: "",
      editArea: false,
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    // mock 标签数据 后期接入接口获取
    this.textState = this.textBtnState;
    pointAdmin.forEach((row, idx) => {
      if (row.email == this.email) {
        this.adminState = true;
      }
    });
    this.searchVideoDetail(this.item.id);
    this.labelData = this.item.machine_label;
    this.getInfo();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  computed: {
    labelColor() {
      return function(label) {
        return this.getLabelColor(label);
      };
    },
    getTextState() {
      return this.textBtnState;
    },
    labelName() {
      return function(index) {
        return this.getLabelName(index);
      };
    },
    iconState() {
      return {
        display: this.videoStates ? "none" : "block"
      };
    },
    ...mapGetters(["email"])
  },
  methods: {
    getLabelColor(label) {
      let backValue = false;
      this.item.select_label.forEach(row => {
        if (row.label == label) {
          backValue = true;
        }
      });
      return backValue;
    },
    getInfo() {
      let maxIndex = 0;
      let maxTime = 0;
      if (this.item.info.length > 0) {
        this.item.info.forEach((row, index) => {
          if (row.time > maxTime) {
            maxTime = row.time;
            maxIndex = index;
          }
        });
        let select_arr_index = [];
        let select_arr = [];
        this.item.info[maxIndex].machine_label.forEach((row, index) => {
          if (this.getLabelColor(row.label)) {
            select_arr_index.push(index);
            select_arr.push(row);
          }
        });
        this.rowValue = this.item.info[maxIndex];
        this.rowIndex = maxIndex;
        select_arr_index.forEach((row, index) => {
          this.rowValue.machine_label.splice(row, 1);
          this.rowValue.machine_label.unshift(select_arr[index]);
        });
      }
    },
    getLabelName(name) {
      return this.label_list[name].label;
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
          url: "http://10.85.125.61:13142/check_data.json", // 接口请求地址
          param: {
            check_type: state,
            id: this.item.id,
            check_user: this.email // 用户邮箱前缀
          }
        };
      } else {
        var tempData = {
          url: "http://10.85.125.61:13142/check_data.json", // 接口请求地址
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
    saveEditArea() {
      let label_arr = [];
      this.label.forEach((row, index) => {
        label_arr.push([]);
        if ("children" in row) {
          row.children.forEach((item, idx) => {
            label_arr[index].push(item.id);
          });
        }
      });
      let HalfCheckedNodes = this.$refs.tree.getHalfCheckedNodes();
      let CheckedNodes = this.$refs.tree.getCheckedNodes(false, false);
      let uploadData = [];
      if (HalfCheckedNodes) {
        HalfCheckedNodes.forEach((row, index) => {
          uploadData.push({
            label: row.id,
            children: []
          });
        });
      }
      if (CheckedNodes) {
        CheckedNodes.forEach((row, index) => {
          if ("children" in row) {
            let children_list = row.children.map((item, idx) => {
              return {
                label: item.id,
                children: []
              };
            });
            uploadData.push({
              label: row.id,
              children: children_list
            });
          } else if (row.id <= this.label.length - 1) {
            uploadData.push({
              label: row.id,
              children: []
            });
          } else {
            uploadData.forEach((item, idx) => {
              if (label_arr[item.label].indexOf(row.id) >= 0) {
                item.children.push({
                  label: row.id,
                  children: []
                });
              }
            });
          }
        });
      }
      this.editArea = false;
      const tempData = {
        url: "http://10.85.125.61:13142/push_result.json",
        param: {
          username: this.email,
          id: this.item.id,
          machine_label: JSON.stringify(uploadData)
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res && res.code == 200) {
            let isAdd = true;
            let timestamp = new Date().getTime();
            this.item.info.forEach((row, index) => {
              if (row.username == this.email) {
                row.machine_label = uploadData;
                row.time = timestamp;
                isAdd = false;
              }
            });
            if (isAdd) {
              this.item.info.push({
                username: this.email, // 用户邮箱前缀
                machine_label: uploadData,
                check_type: 1,
                time: timestamp,
                check_user: ""
              });
            }
            this.editArea = false;
            this.editLabel = "";
          } else {
            Message({
              showClose: true,
              message: res.msg || "标签修改失败！",
              type: "error",
              duration: 0
            });
          }
          this.getInfo();
        },
        err => {
          Message({
            showClose: true,
            message: "标签修改接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    },
    closeEditArea() {
      this.editArea = false;
      this.editLabel = "";
    },
    openEditArea(data) {
      this.editArea = true;
      this.editLabel = data.map((row, index) => {
        return row.label;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return this.label_list[data.id].label.indexOf(value) !== -1;
    },
    activeVideo(id) {
      this.videoState = true;
      $("video").each(function() {
        $(this)[0].pause();
      });
      let startVideo = $("#" + id);
      startVideo.attr("src", this.itemData.video);
      startVideo[0].play();
    },
    searchVideoDetail(ids) {
      const that = this;
      this.itemData = {};
      this.labelData = "";
      const tempData = {
        url: "http://mlplat.intra.weibo.com/lab/showbatch",
        param: {
          ids
        }
      };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res) {
            let date = res[0].user.created_at;
            date = date.substring(0, date.length);
            date = date.replace(/-/g, "/");
            let d = new Date(new Date(date).getTime());
            let time =
              d.getFullYear() +
              "-" +
              (d.getMonth() + 1) +
              "-" +
              d.getDate() +
              " " +
              d.getHours() +
              ":" +
              d.getMinutes() +
              ":" +
              d.getSeconds();
            that.itemData = {
              face_img: res[0].user.avatar_large,
              name: res[0].user.name,
              created_at: time,
              weibo_link: res[0].link,
              text: res[0].text,
              cover_img: res[0].url_objects[0].object.object.image.url,
              video: res[0].url_objects[0].object.object.stream.url
            };
          } else {
            Message({
              showClose: true,
              message: res.msg || "视频获取失败！",
              type: "error",
              duration: 0
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "视频获取接口异常！",
            type: "error",
            duration: 0
          });
        }
      );
    }
  }
};
</script>
<style lang="scss">
.label-tree > .el-tree-node {
  margin: 5px 5px 5px 0;
  padding: 5px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  width: 170px;
}
</style>

<style lang="scss" scoped>
img {
  user-select: none;
}
.search-label {
  width: 300px;
  margin-left: 20px;
  margin-top: 10px;
}
.item-wrapper {
  margin-top: 10px;
  padding: 15px 10px 4px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 16px;
  .user-wrap {
    position: relative;
    width: 100%;
    height: 100px;
    .face-img {
      position: absolute;
      top: 10px;
      left: 20px;
      width: 80px;
      height: 80px;
      box-shadow: 1px 1px 3px 2px #ccc;
      border-radius: 50%;
    }
    .created-at {
      font-size: 18px;
      font-weight: 400;
      position: absolute;
      top: 60px;
      left: 145px;
      i {
        padding-right: 5px;
      }
    }
    .user-name {
      font-size: 20px;
      font-weight: 800;
      position: absolute;
      top: 22px;
      left: 145px;
    }
  }
  .video-wrap {
    position: relative;
    width: 100%;
    max-width: 500px;
    max-height: 280px;
    background-color: #000;
    margin-left: 20px;
    video {
      position: relative;
      width: 100%;
      max-width: 500px;
      max-height: 280px;
      background-color: #000;
    }
    .start-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 20;
      font-size: 100px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      color: #f4516c;
      background-color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
    }
  }
  .text-btn {
    position: relative;
    left: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .machine-label {
    border: 1px dashed #67c23a;
    margin-top: 10px;
    padding-bottom: 10px;
  }
  .edit-wrap {
    border: 1px dashed #f56c6c;
    margin-top: 10px;
    padding-bottom: 10px;
  }
  .text {
    position: relative;
    margin: 20px;
    font-size: 18px;
    line-height: 25px;
  }
  .label-tree {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 90%;
    margin-left: 20px;
    // font-size: 20px;
  }
  .label-name {
    // display: block;
    position: relative;
    // left: 20px;
    width: 70px;
    margin: 10px 0 0 20px;
  }
  .label-name-info {
    // display: block;
    position: relative;
    // left: 20px;
    // width: 76px;
    margin: 10px 0 0 20px;
  }
}
</style>
