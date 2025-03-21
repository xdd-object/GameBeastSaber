<template>
  <basic-container>
  <el-upload
      class="upload-demo"
      action="/api/blade-game-admin/aliyun/oss/simpleFileUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :headers="token"
      :on-exceed="handleExceed"
      :on-success="onSuccess"
      :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>

  </el-upload>

  <div v-for="(item,index) in tempFile">
    <div>{{item.name}}<label>&nbsp;&nbsp;-------&nbsp;&nbsp;</label>{{item.fileUrl}}</div>
  </div>
  </basic-container>
</template>

<script>

import {mapGetters} from "vuex";
import {yesMap} from "@/const/account/account";
import {mapToOptions} from "@/util/common";
import {Base64} from "js-base64";
import website from "@/config/website";
import {getToken} from "@/util/auth";


export default {
  name: "wel",
  data() {
    return {
      fileList: [],
      token:{
        'Authorization':`Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`,
        'Blade-Auth': 'bearer ' + getToken()
      },
      tempFile: []
    };
  },
  computed: {
    website() {
      return website
    }
  },
  created() {
    // this.onLoadRecord()
  },
  methods: {
    getToken,
    Base64,
    handleRemove(file, fileList) {
      this.fileUrl=''
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      this.fileUrl=''
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    onSuccess(response, file, fileList) {
      console.log(fileList);
      this.fileUrl=response.data
      file.url=response.data

      this.tempFile.push({name:file.name,fileUrl:response.data})
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
