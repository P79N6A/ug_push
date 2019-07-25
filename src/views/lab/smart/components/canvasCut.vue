<template>

</template>

<script>
  export default {
    name: 'canvasCut',
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
        fileList: []
      }
    },
    methods: {

    }
  }
</script>
