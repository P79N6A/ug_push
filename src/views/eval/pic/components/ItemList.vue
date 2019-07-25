<template>
  <el-row v-if="item">
    <el-col :span="24" class="item-wrapper clearfix">
      <div class="img-wrapper left" v-if="item.pid">
        <a :href="`//ww2.sinaimg.cn/bmiddle/${item.pid}.jpg`" target="_blank" title="查看原图" class="img-box">
          <div class="bg-img" :style="`background-image: url(//ww2.sinaimg.cn/bmiddle/${item.pid}.jpg);`">{{!item.pid && '图片加载失败' || ''}}</div>
        </a>
      </div>
      <div class="item-status-box left">
        <p>mid: <span class="item-info">{{item.mid}}</span></p>
        <p>pid: <span class="item-info">{{item.pid}}</span></p>
        <p class="item-score">评分: {{item.score}}</p>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: "itemList",
  props: ["item"],
  data() {
    return {
      test: ""
    };
  },
  methods: {},
  watch: {
    item() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.item-wrapper {
  margin-top: 10px;
  padding: 15px 10px 4px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 16px;
  .item-status-box {
    margin-left: 10px;
    p {
      margin-bottom: 10px;
      font-size: 14px;
    }
    .item-info {
      margin-right: 10px;
      font-size: 14px;
      color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
    .item-score {
      color: #f56c6c;
    }
  }
  .img-wrapper {
    width: 110px;
    .img-box {
      position: relative;
      padding-bottom: 100%;
      display: inline-block;
      width: 100%;
      height: 0;
      background-color: #e6e6e6;
      .bg-img {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        text-align: center;
        color: #666;
        padding: 48% 0;
      }
    }
  }
}
</style>

