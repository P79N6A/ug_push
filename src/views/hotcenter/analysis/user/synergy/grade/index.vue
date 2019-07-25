<template>
<el-main v-if="pageAuth === 1">
    <el-row class="pane-title-wrap">
      <h6 class="pane-title">用户协同打分评估页面</h6>
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
            </el-form-item>
            <el-form-item>
                <el-button
                type="primary"
                @click="onSearch"
                >查询</el-button>
            </el-form-item>
            <div>
              <el-form-item>
                <el-radio-group
                  v-model="formInline.algo"
                    @change="onSearch"
                >
                  <el-radio-button
                    style="margin-left: 0;"
                    :key="key"
                    v-for="(val, key) in algoMap"
                    :label="key"
                    >{{val}}</el-radio-button>
                  </el-radio-group>
              </el-form-item>
            </div>
        </el-form>
    </el-row>
    <el-row class="content-box-wrap">
      <div v-if="mids && mids.length > 0">
        <item-list
          :key="mid"
          :item="datalist[idx]"
          :index="idx+1"
          :infomid="mid"
          :infosim="sims[idx]"
          v-for="(mid, idx) in mids"
        ></item-list>
      </div>
      <p
        v-else
        class="none-tips"
      >暂无数据</p>
    </el-row>
  </el-main>
  <el-main v-else-if="pageAuth === 0">
        <auth></auth>
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
        view: 'rank',
        algo: 'mf',
        uid: ''
      },
      algoMap: {
        mf: "矩阵分组",
        mgp: "多分组",
      },
      datalist: null,
      mids: [],
      sims: []
    };
  },
  methods: {
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
        url: "http://10.77.29.69:8099/ucf_rank",
        param: this.formInline,
      };
      const params = {
          data: JSON.stringify(tempData),
          cip: 230
      }
      this.$store.dispatch("ProxyGet", params).then(res => {
        if (res.code == 0) {
          Message({
            showClose: true,
            message: "success",
            type: "success",
            duration: 1000
          });
          this.datalist = res.showbatch;
          this.mids = res.mids;
          this.sims = res.sims;
        } else {
          Message({
            showClose: true,
            message: "用户协同打分评估数据请求失败",
            type: "error",
            duration: 1000
          })
        }
      }, err => {
          Message({
            showClose: true,
            message: "用户协同打分评估接口请求失败！",
            type: "error",
            duration: 3000
          });
      })
    }
  },
  computed: {
    ...mapGetters(["pageAuth"])
  },
  watch: {
    pageAuth() {}
  },
};
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
    .content-box-wrap {
      padding: 10px;
    }
    .none-tips {
      padding: 20px 0;
      text-align: center;
      color: #999;
    }
  }
}
</style>