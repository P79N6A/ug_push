<template>
    <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">用户群体topic分布页面</h6>
    </el-row>
    <div class="clearfix" :key="topic.topic" v-for="topic in responseData">
      <div class="topic-title">topic{{topic.topic}} - 关键词（{{topic.words ? topic.words.length : 0}}）</div>
      <div class="row-topic clearfix">
        <el-tag
        class="item-tag left"
        :key="index"
        v-for="(tag, index) in topic.words || []"
        :type="colorList[Math.round(3*Math.random())]"
        >{{tag.word}} | {{tag.weight}}</el-tag>
      </div>
    </div>
    <template>
        <div class="block paginations">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="formMid.page"
            :page-sizes="[5, 10]"
            :page-size="formMid.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="formMid.count">
            </el-pagination>
        </div>
    </template>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
        <auth></auth>
    </el-main>
</template>


<script>
import Auth from "@/components/Tips/Auth";
import { mapGetters } from "vuex";
import { Message } from "element-ui";

export default {
    components: {
        Auth,
    },
    data() {
        return {
          colorList: ["", "success", "warning", "danger"],
          formInline: {
              page: 1,
              size: 5,
              view: 'agid'
          },
          formMid: {
            page: 1,
            size: 5,
            count: 0
          },
          responseData: [],
          words:[]
        }
    },
    methods: {
      onSearch() {
        const tempData = {
          url:"http://10.77.29.69:8099/ucf",
          param: { ...this.formInline }
        };
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("ProxyGet", params).then(
        res => {
          if (res.code === 0) {
            Message({
              showClose: true,
              message: res.msg || "success",
              type: "success",
              duration: 1000
            });
            this.responseData = res.data;
            this.formMid.count = res.count;
          } else {
            Message({
              showClose: true,
              message: res.msg || "用户群体topic分布数据获取失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "用户群体topic分布数据接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
      },
      handleSizeChange(val) {
        this.formInline.size = val
        this.onSearch()
      },
      handleCurrentChange(val) {
        this.formInline.page = val;
        this.onSearch();  
      }
    },
    computed: {
      ...mapGetters(["pageAuth"])
    },
    watch: {
        pageAuth() {}
    },
    mounted() {
      this.onSearch();
    },
}
</script>

<style lang="scss" scoped>
  body {
  .el-main {
    padding: 0;
    color: #333;
    line-height: 100%;
    .pane-title-wrap {
      padding: 20px 14px;
      background: #fff;
      border-bottom: 1px solid #f0f2f5;
      .pane-title {
        font-size: 16px;
        color: #409eff;
        text-align: left;
      }
    }
    .item-tag {
      margin-right: 5px;
      margin-top: 5px;
    }
    .row-topic {
      margin-top: 10px;
      padding-left: 20px;
      margin-right: 10px;
      padding-bottom: 20px;
      border-bottom: 1px dashed #dcdcdc;
    }
    .paginations {
      margin-top: 20px;
    }
    .topic-title{
      margin-top: 10px;
      margin-left: 20px;
      font-size: 13px;
      font-weight: 700;
    }
  }
}
</style>

