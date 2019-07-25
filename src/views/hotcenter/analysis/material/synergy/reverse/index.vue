<template>
    <el-main v-if="pageAuth === 1">
        <el-row class="pane-title-wrap">
            <h6 class="pane-title">mid协同反向页面</h6>
        </el-row>
        <el-row class="search-form-wrap">
            <el-form
                    inline
                    :model="formInline"
                    size="small"
                >
                    <el-form-item>
                        <el-input
                            placeholder="请输入mid"
                            v-model.trim="formInline.mid"
                            clearable
                        ></el-input>
                        <span class="info-tips">（mid）</span>
                    </el-form-item>
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
                </el-form>
            </el-row>
            <el-row class="content-box-wrap">
            <div v-if="dataList && dataList.length > 0">
                <item-list
                :key="mid.mid_info.mid+idx"
                :index="idx+1"
                :sim_info="mid.mid_info"
                :showbatch="mid.showbatch"
                :item="mid"
                v-for="(mid, idx) in dataList"
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
    components: {
        Auth,
        ItemList
    },
    data() {
        return{
            formInline: {
                mid: '',
                uid: ''
            },
            dataList: []
        }
    },
    methods: {
        onSearch() {
            if (!this.formInline.mid) {
                Message({
                    showClose: true,
                    message: "请输入要查询的mid！",
                    type: "warning",
                    duration: 3000
                });
                return;
            }
            if (!this.formInline.uid) {
                Message({
                    showClose: true,
                    message: "请输入要查询的uid!",
                    type: "warning",
                    duration: 3000
                });
                return;
            }
            const tempData = {
                url: 'http://10.77.29.69:8800/show_mid_cf_source',
                param: this.formInline
            }
            const params = {
                data: JSON.stringify(tempData),
                cip: 230
            }
            this.$store.dispatch('ProxyGet', params).then(res => {
                if (res.code && Number(res.code) == 200) {
                    Message({
                        showClose: true,
                        message: "success",
                        type: "success",
                        duration: 1000
                    });
                    this.dataList = res.source_results;
                } else {
                    Message({
                        showClose: true,
                        message: "mid协同反向页面数据请求失败",
                        type: "error",
                        duration: 1000
                    })
                }
            }, err => {
                Message({
                    showClose: true,
                    message: "mid协同反向接口请求失败！",
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
    }
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
  }
}
</style>
