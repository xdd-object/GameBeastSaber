<template> 
  <div>
      <!-- action="https://ydnoms.zhilianmanbu.com/admin/aliyun/oss/multiFileUpload" -->
      <!-- :action="url" -->

    <el-upload
      action="https://ydnoms.zhilianmanbu.com/admin/aliyun/oss/multiFileUpload"
      :data="dataObj"
      list-type="picture"
      :multiple="false" :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      accept='.jpg,.png,.jpeg,.gif'
      :on-preview="handlePreview">
       <el-button size="small" type="primary">点击上传</el-button>
       <div style="color:red" slot="tip" class="el-upload__tip">提醒：最佳图片比例为290*406</div> 
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="fileList[0].url" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {policy} from '@/api/oss'

  export default {
    name: 'singleUploads',
    props: {
      value: String
    },
    computed: {
      imageUrl() {
        return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      fileList() {
        return [{
          name: this.imageName,
          url: this.imageUrl
        }]
      },
      showFileList: {
        get: function () {
          return this.value !== null && this.value !== ''&& this.value!==undefined;
        },
        set: function (newValue) {
        }
      }
    },
    data() {
      return {
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: '',
          // callback:'',

        },
        dialogVisible: false,
         url:''
      };
    },
    methods: {
      emitInput(val) {
        this.$emit('input', val)
      },
      handleRemove(file, fileList) {
        this.emitInput('');
      },
      handlePreview(file) {
        this.dialogVisible = true;
      },
      beforeUpload(file) {
        let _self = this;
        return new Promise((resolve, reject) => {
          policy().then(response => {
            console.log('responseresponse=>>>>>>',response)
            _self.dataObj.policy = response.data.policy;
            _self.dataObj.signature = response.data.signature;
            _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
            _self.dataObj.key = response.data.dir + '/${filename}';
            _self.dataObj.dir = response.data.dir;
            _self.dataObj.host = response.data.host;
             _self.url=response.data.host;
            // _self.dataObj.callback = response.data.callback;
              console.log(_self.dataObj.host)
            resolve(true)
          }).catch(err => {
            console.log(err)
            reject(false)
          })
        })
      },
      handleUploadSuccess(res, file) {
        console.log('file=》',file.response.data[0])
        this.showFileList = true;
        this.fileList.pop();
        // this.fileList.push({name: file.name, url: this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name});
        this.fileList.push({name: file.name, url:file.response.data[0]});
        this.emitInput(this.fileList[0].url);
        console.log('fileList=>',this.fileList)
      }
    }
  }
</script>
<style>

</style>
