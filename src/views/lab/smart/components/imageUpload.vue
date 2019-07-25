<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="medium"  class="active" @click=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload name="image_file" class="editor-slide-upload"
                 action="http://10.77.9.71:5700/smart_crop/v1.0/predict.json"
                 accept="image/jpeg,image/gif,image/png,image/bmp"
                 :on-remove="handleRemove"
                 :multiple="false"
                 :limit="1"
                  list-type="picture-card"
                 :on-success="handleSuccess"
                 :before-upload="beforeUpload">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <div class="tips">Tips:每次仅可上传一张图片</div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'imageUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      result: '',
      uploadFile: ''
    }
  },
  methods: {
    handleSuccess(response, file) {
     this.result = response;
      this.dialogVisible = false
      this.$emit('successCBK', this.result, this.uploadFile);
    },
    handleRemove(file, fileList){

    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        this.uploadFile = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .upload-container {
    display: inline-block;
    .editor-slide-upload {
      margin-bottom: 20px;
    }
    .tips {
      font-size: 12px;
      color: #909399;
      margin-bottom: 10px;
    }
  }
</style>
