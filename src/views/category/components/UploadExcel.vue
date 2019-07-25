<template>
  <div class="app-container">
    <upload-excel-component :example="example" :showexample="showexample" @on-selected-file='selected'></upload-excel-component>
    <p class="excel-text-tips" v-show="tips">下线理由请填写数字：<br />1 博主发博与领域严重不符且低质、2 广告营销、3 搬运低质、4 色情、5 政治敏感、6 恶意涨粉涨互动、7 不实造谣炒作、8 其他</p>
    <el-table :data="tableData" border style="width:100%;margin-top:20px;" max-height="200" class="tableBox">
      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'>
      </el-table-column>
    </el-table>
    <div class="excel-upload-tips" v-if="tableData && tableData.length > 0"><span>{{tableData.length}}</span> 条数据，请点击【添加】按钮上传</div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'uploadExcel',
  components: { UploadExcelComponent },
  props: ["callback", "initdata", "tips", "example", "showexample"],
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    selected(data) {
      this.tableData = data.results
      this.tableHeader = data.header
      this.callback(data.results);
    }
  },
  watch: {
    initdata() {
      if (!this.initdata) {
        this.tableData = []
        this.tableHeader = []
      }
    },
    example() {}
  }
}
</script>

<style lang="scss" scoped>
.tableBox {
  max-height: 265px !important;
}
.excel-upload-tips {
  line-height: 20px;
  font-size: 14px;
  color: #ebb563;
  span {
    font-weight: bold;
    font-size: 18px;
  }
}
.excel-text-tips {
  margin-top: 10px;
  line-height: 20px;
  color: #F56C6C;
}
</style>
