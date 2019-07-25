<template>
  <el-container direction="vertical">
    <item-header></item-header>
    <el-main v-if="pageAuth === 1">
      <el-tabs v-model="activeName" :tab-position="tabPosition">
        <el-tab-pane label="物料库规模" name="1">
          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23">
              <el-row class="pane-title-wrap clearfix">
                <h6 class="pane-title left">
                  <i class="el-icon-goods"></i>物料库规模</h6>
                <el-button v-if="materialStatus && materialStatus.material" class="right" type="primary" plain size="mini" :loading="downloadLoading" @click="handleDownload">
                  <i class="el-icon-download"></i> 导出</el-button>
                <el-button style="margin-right: 10px;" class="right" type="success" plain size="mini" @click="onSearch">
                  <i class="el-icon-refresh"></i> 刷新</el-button>
              </el-row>
            </el-col>
          </el-row>
          <!-- <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23">
              <el-form>
                <el-form-item label="维度">
                  <el-select v-model="type" placeholder="请选择维度类型">
                    <el-option label="热门流" value="hot"></el-option>
                    <el-option label="频道流" value="channel"></el-option>
                  </el-select>
                  <el-button type="primary" icon="el-icon-search" @click="onSearch">查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row> -->
          <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="23" :md="23" :lg="23" :xl="23">
              <el-table :data="materialStatus && materialStatus.material" style="width: 100%" class="pane-table" border>
                <el-table-column type="index" align="center" width="50" label="序号" fixed>
                </el-table-column>
                <el-table-column fixed align="left" prop="name" label="所属领域">
                </el-table-column>
                <el-table-column align="left" sortable prop="mysql_num" label="原始数据（条）" :formatter="setNum">
                </el-table-column>
                <el-table-column align="left" sortable prop="online_num" label="入库数据（条）" :formatter="setNum">
                </el-table-column>
                <el-table-column v-if="curType == 'hot'" align="left" sortable prop="expo_num" label="领域曝光（条）" :formatter="setNum">
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="内容标签统计" name="2">
          <tag-page></tag-page>
        </el-tab-pane>
        <el-tab-pane label="单条物料分析" name="3">
          <query-page></query-page>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <el-main v-else-if="pageAuth === 0">
      <auth></auth>
    </el-main>
  </el-container>
</template>

<script>
import ItemHeader from "@/components/ItemHeader";
import Auth from "@/components/Tips/Auth";
import TagPage from "./components/TagPage";
import QueryPage from "./components/QueryPage";
import { mapGetters } from "vuex";
import { formatNum } from "@/utils";

export default {
  name: "operatematerial",
  components: {
    ItemHeader,
    Auth,
    TagPage,
    QueryPage
  },
  data() {
    return {
      tabPosition: "left",
      type: "hot",
      curType: "hot",
      activeName: "1",
      downloadLoading: false,
    };
  },
  computed: {
    ...mapGetters(["materialStatus", "pageAuth", "email"])
  },
  methods: {
    init() {
      if (this.pageAuth === 1) {
        this.activeName = this.$route.query.type || "1";
        this.onSearch();
      }
    },
    onSearch() {
      let tempData = null;
      if (this.type == "hot") {
        tempData = {
          url: "http://172.16.139.44:10999/get_materials_status"
        };
      } 
      // else {
      //   tempData = {
      //     url: "http://172.16.139.44:10999/get_materials_status" //替换为频道流接口即可
      //   };
      // }
      const params = {
        data: JSON.stringify(tempData),
        cip: 230
      };
      this.$store.dispatch("GetStatus", params).then(() => {
        this.curType = this.type;
      });
    },
    setNum(row, column, cellValue) {
      return formatNum(cellValue);
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const filename = 'material';
        const tHeader = ['序号', '所属领域', '原始数据（条）', '入库数据（条）', '领域曝光（条）']
        const filterVal = ['index', 'name', 'mysql_num', 'online_num', 'expo_num']
        const list = this.materialStatus.material
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel(tHeader, data, filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v, i) => filterVal.map(j => {
        if (j === 'index') {
          return i + 1
        } else if (j === 'mysql_num' || j === 'online_num' || j === 'expo_num') {
          return formatNum(v[j])
        } else {
          return v[j]
        }
      }))
    }
  },
  created() {
    if (window.isPhone) {
      this.tabPosition = "top";
    }
    this.init();
  },
  watch: {
    materialStatus() {},
    pageAuth() {
      this.init();
    },
    email() {}
  }
};
</script>

<style lang="scss" scoped>
body {
  .el-container {
    margin-bottom: 40px;
    .el-noauth {
      background-color: #fff;
    }
  }
  .el-main {
    background-color: #f0f2f5;
    color: #333;
    line-height: 100%;
  }
  .pane-title-wrap {
    margin-bottom: 10px;
    .pane-title {
      font-size: 20px;
      color: #409eff;
      text-align: center;
    }
  }
  .pane-form {
    padding: 20px;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
    border: 1px solid #ebebeb;
    border-radius: 3px;
  }
  .table-title {
    padding: 5px 20px;
    color: #409eff;
    border-bottom: 2px solid #409eff;
    margin-bottom: 10px;
  }
  .page-wrap {
    padding: 20px 0;
  }
}
</style>
