<template>
  <div class="app-container">
    <upload-excel-component :example="example" @on-selected-file='selected'></upload-excel-component>
    <el-table :data="tableData" border style="width:100%;margin-top:20px;" max-height="200" class="tableBox">
      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'>
      </el-table-column>
    </el-table>
    <div class="excel-upload-tips" v-if="tableData && tableData.length > 0">共上传 <span>{{tableData.length}}</span> 条数据</div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'uploadExcel',
  components: { UploadExcelComponent },
  props: ["callback", "initdata", "example"],
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
  font-size: 14px;
  color: #ebb563;
  span {
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
