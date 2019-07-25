<template>
  <div>
    <input id="excel-upload-input" type="file" accept=".xlsx, .xls" class="c-hide" @change="handkeFileChange">
    <div id="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      将excel文件拖拽到此处或
      <el-button style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">浏览</el-button>
    </div>
    <div>
      <a class="example-title" @click="isShowExample = !isShowExample">{{isShowExample ? '隐藏' : '查看'}}样例</a>
      <span class="excel-upload-tips">（excel表格中，一条数据一行，请不要整行留空，表头务必与样例保持一致）</span>
    </div>
    <div v-show="isShowExample">
      <el-table :data="example.tableData" border style="width:100%;" size="mini">
        <el-table-column v-for='item of example.tableHeader' :prop="item" :label="item" :key='item'>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx'

export default {
  props: ["example", "showexample"],
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      },
      isShowExample: true
    }
  },
  methods: {
    generateDate({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.$emit('on-selected-file', this.excelData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const itemFile = files[0] // only use files[0]
      itemFile && this.readerData(itemFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      document.getElementById('excel-upload-input').click()
    },
    handkeFileChange(e) {
      const files = e.target.files
      const itemFile = files[0] // only use files[0]
      itemFile && this.readerData(itemFile)
    },
    readerData(itemFile) {
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target.result
        const fixedData = this.fixdata(data)
        const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = this.get_header_row(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        this.generateDate({ header, results })
      }
      reader.readAsArrayBuffer(itemFile)
    },
    fixdata(data) {
      let o = ''
      let l = 0
      const w = 10240
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    },
    get_header_row(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
        var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    }
  },
  created() {
    this.isShowExample = this.showexample || false;
  },
  watch: {
    example() {}
  }
}
</script>

<style scoped>
#excel-upload-input{
  display: none;
  z-index: -9999;
}
#drop{
  border: 2px dashed #bbb;
  min-width: 300px;
  height: 80px;
  line-height: 80px;
  margin: 0 auto;
  font-size: 18px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
.example-title {
  color: #409eff;
  cursor: pointer;
}
.example-title:hover {
  text-decoration: underline;
}
.excel-upload-tips {
  display: inline-block;
  color: #ebb563;
  line-height: 20px;
}
</style>
