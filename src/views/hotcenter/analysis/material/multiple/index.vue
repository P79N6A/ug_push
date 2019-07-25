<template>
  <el-main>
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">多条物料ShowBatch</h6>
    </el-row>
    <el-row class="search-form-wrap">
      <el-form
        :model="formInline"
        size="small"
      >
        <el-form-item>
          <el-input
            style="max-width: 90%;"
            type="textarea"
            autosize
            placeholder="请输入mid 多个值英文逗号分隔"
            v-model="formInline.ids"
          ></el-input>
          <el-button
            type="primary"
            @click="onSearch"
          >查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row class="content-box-wrap">
      <div v-if="datalist && datalist.length > 0">
        <item-list
          :key="item.id"
          :item="item"
          :index="idx+1"
          :info="infoMap"
          v-for="(item, idx) in datalist"
        ></item-list>
      </div>
      <p
        v-else
        class="none-tips"
      >暂无数据</p>
    </el-row>
  </el-main>
</template>

<script>
import Auth from "@/components/Tips/Auth";
import ItemList from "./components/ItemList";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
import { Message } from "element-ui";

export default {
  name: "multipleMaterial",
  components: {
    Auth,
    ItemList
  },
  data() {
    return {
      formInline: {
        ids: ""
      },
      total: 0,
      datalist: null,
      infoMap: {}
    };
  },
  methods: {
    onSearch() {
      if (!this.formInline.ids) {
        return;
      }
      this.getInfo();
      const data = {
        url: "/lab/showbatch",
        params: {
          ...this.formInline
        }
      };
      this.$store.dispatch("CommonGet", data).then(
        res => {
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
          this.datalist = res;
        },
        err => {
          Message({
            showClose: true,
            message: "showbatch接口请求失败！",
            type: "error",
            duration: 3000
          });
        }
      );
    },
    getInfo() {
      const tempData = {
        url: "http://172.16.139.44:8001/",
        param: { 
            mids: this.formInline.ids 
        }
      };
      const params = {
          data: JSON.stringify(tempData),
          cip: 230
      }
      this.$store.dispatch("ProxyGet", params).then(res => {
          if (res.code && Number(res.code) == 200) {
            this.infoMap = res.data;
          } else {
            this.infoMap = {};
          }
      }, err => {
          this.infoMap = {};
      })
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  .el-container {
    .el-noauth {
      background-color: #fff;
    }
  }
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
    .content-box-wrap {
      padding: 10px;
    }
    .none-tips {
      padding: 20px 0;
      text-align: center;
      color: #999;
    }
    .info-tips {
      font-size: 12px;
      color: #ebb563;
    }
    .page-wrap {
      padding-top: 10px;
      overflow: scroll;
    }
  }
}
</style>