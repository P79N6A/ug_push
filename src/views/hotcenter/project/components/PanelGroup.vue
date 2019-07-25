<template>
  <el-row class="panel-group" :gutter="10">
    <el-col :xs="12" :span="12" class="card-panel-col">
      <div class='card-panel' @click="handleSetProjectType(1, 1)">
        <div class="card-panel-icon-wrapper icon-people">
          <span class="card-panel-icon">A级</span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">项目进行中</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="this.total.A1" :duration="500"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :span="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetProjectType(2, 1)">
        <div class="card-panel-icon-wrapper icon-blue">
          <span class="card-panel-icon">B级</span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">项目进行中</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="this.total.B1" :duration="500"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :span="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetProjectType(1, 2)">
        <div class="card-panel-icon-wrapper icon-message">
          <span class="card-panel-icon">A级</span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">项目已完成</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="this.total.A2" :duration="500"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :span="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetProjectType(2, 2)">
        <div class="card-panel-icon-wrapper icon-yellow">
          <span class="card-panel-icon">B级</span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">项目已完成</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="this.total.B2" :duration="500"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :span="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetProjectType(1, 3)">
        <div class="card-panel-icon-wrapper icon-money">
          <span class="card-panel-icon">A级</span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">项目已关闭</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="this.total.A3" :duration="500"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :span="12" class="card-panel-col">
      <div class="card-panel" @click="handleSetProjectType(2, 3)">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <span class="card-panel-icon">B级</span>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">项目已关闭</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="this.total.B3" :duration="500"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: ["total"],
  methods: {
    handleSetProjectType(type, status) {
      this.$emit('handleSetProjectType', type, status)
    }
  },
  watch: {
    total() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  .card-panel-col{
    margin-bottom: 12px;
  }
  .card-panel {
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
      .icon-yellow {
        background: #fec171;
      }
      .icon-blue {
        background: #3a71a8
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .icon-yellow {
      color: #fec171;
    }
    .icon-blue {
      color: #3a71a8
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 5px 0 0 5px;
      padding: 15px 10px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 20px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 10px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        margin-bottom: 6px;
      }
      .card-panel-num {
        font-size: 18px;
      }
    }
  }
}
</style>
