<template>
    <div v-if="data">
      <el-radio-group v-model="score">
        <el-radio style="margin-left: 5px;" label="1"></el-radio>
        <el-radio v-if="level !== '5'" style="margin-left: 5px;" label="0"></el-radio>
        <el-radio v-if="level === '3'" style="margin-left: 5px;" label="-1"></el-radio>
        <el-radio v-if="level === '5'" style="margin-left: 5px;" label="2"></el-radio>
        <el-radio v-if="level === '5'" style="margin-left: 5px;" label="3"></el-radio>
        <el-radio v-if="level === '5'" style="margin-left: 5px;" label="4"></el-radio>
        <el-radio v-if="level === '5'" style="margin-left: 5px;" label="5"></el-radio>
      </el-radio-group>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
  name: "ScoreOperate",
  data() {
    return {
      score: "",
      scoreList: [1, 0, -1, 2, 3, 4, 5],
    };
  },
  props: ["data", "level"],
  watch: {
    data() {
      this.score = "";
    },
    level() {
      this.score = "";
    },
    score() {
      if (this.score !== "") {
        const param = {
          mid: this.data.mid,
          data: {
            mid: this.data.mid,
            uid: this.data.uid,
            score: this.score
          }
        }
        this.$emit('scoreChange', param);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.table-title {
  padding: 5px 10px;
  color: #409eff;
  border-bottom: 2px solid #409eff;
  margin-bottom: 10px;
}
.pane-title-wrap {
  margin-bottom: 20px;
  .pane-title {
    font-size: 20px;
    color: #409eff;
    text-align: left;
  }
}
.link-btn {
  color: #409eff;
  &:hover {
    text-decoration: underline;
  }
}
.white-item {
  max-width: 100%;
  width: 270px;
}
.white-tips {
  margin-top: 6px;
  line-height: 1.5;
  color: #e6a23c;
  font-size: 12px;
}
</style>