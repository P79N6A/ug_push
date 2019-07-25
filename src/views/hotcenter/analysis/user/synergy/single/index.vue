<template>
    <el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">单用户topic查询页面</h6>
    </el-row>
    <el-row class="search-form-wrap">
        <el-form
            inline
            :model="formInline"
            size="small"
        >
            <el-form-item>
                <el-input
                    placeholder="请输入uid"
                    v-model.trim="formInline.uid"
                    clearable
                ></el-input>
                <span class="info-tips">（uid）</span>
            </el-form-item>
            <el-form-item>
                <el-button
                type="primary"
                @click="onSearch"
                >查询</el-button>
            </el-form-item>
            <el-form-item>
              <a class="item-status-mid" @click="toMidSearch">进入用户阅读mid查询页面</a>  
            </el-form-item>
        </el-form>
    </el-row>

    <el-collapse v-model="activeNames">
        <el-collapse-item :title="`topic${topic.topic} - 关键词（${topic.words.length}）| 权重:${topic.weight}`" :name="index" :key="index" v-for="(topic, index) in responseData">
            <div class="row-topic clearfix">
                <el-tag 
                class="item-tag left"
                :key="index"
                v-for="(tag, index) in topic.words"
                :type="colorList[Math.round(3*Math.random())]"
                >{{tag.word}} | {{tag.weight}}</el-tag>
            </div>
        </el-collapse-item>
    </el-collapse>
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
          colorList: ["", "success", "warning", "danger","info"],
          formInline: {
              uid: '',
              view: 'ugid'
          },
          responseData: [],
          words:[],
          activeNames: [0]
        }
    },
    methods: {
      toMidSearch() {
        let routeUrl = this.$router.resolve({
          name: '/hotcenter/analysis/user/synergy/readmid',
          query: {uid: this.formInline.uid}
        });
        window.open(routeUrl.href, '_blank');
      },
      onSearch() {
        if(!this.formInline.uid) {
          Message({
            showClose: true,
            message: "请输入要查询的uid！",
            type: "error",
            duration: 3000
          });
          return;
        }
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
          } else {
            Message({
              showClose: true,
              message: res.msg || "单用户topic查询页面数据获取失败！",
              type: "error",
              duration: 3000
            });
          }
        },
        err => {
          Message({
            showClose: true,
            message: "单用户topic查询页面接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
      },
    },
    computed: {
        ...mapGetters(["pageAuth"])
    },
    watch: {
        pageAuth() {}
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
    .search-form-wrap {
      padding-left: 14px;
      padding-right: 14px;
      padding-top: 18px;
      background-color: #fff;
      border-bottom: 1px solid #f0f2f5;
    }
    .item-tag {
      margin-right: 5px;
      margin-top: 5px;
    }
    .row-topic {
      margin: 0px 10px;
    }
    .paginations {
      margin-top: 20px;
    }
    .info-tips {
      font-size: 12px;
      color: #ebb563;
    }
    .item-status-mid {
      font-weight: bold;
      text-decoration: underline;
      &:hover {
        color: #409eff;
      }
    }
    .el-collapse {
      padding-left: 10px;
    }
  }
}
</style>
