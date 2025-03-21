<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="homeAdvertise"
             :rules="rules"
             ref="homeAdvertiseFrom"
             label-width="150px"
             size="small">
      <!-- <el-form-item label="编号(id)：" prop="name">
        <el-input v-model="homeAdvertise.id" class="input-width"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="轮播图位置：" prop="bannerType">
        <el-select v-model="homeAdvertise.bannerType">
          <el-option
            v-for="type in typeOptions"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="场次名称：" prop="typeName">
        <el-input v-model="homeAdvertise.typeName" style="width:220px"></el-input>
      </el-form-item>
       <el-form-item label="预约时间：" prop="endSubscribeTimed">
         <!-- {{homeAdvertise.endSubscribeTime | rTime}} -->
        <el-time-picker
          type="datetime"
          placeholder="选择日期"
          v-model="homeAdvertise.endSubscribeTimed"></el-time-picker>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTimed">
        <el-time-picker
          type="datetime"
          placeholder="选择日期"
          v-model="homeAdvertise.startTimed"></el-time-picker>
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTimed">
        <el-time-picker
          type="datetime"
          placeholder="选择日期"
          v-model="homeAdvertise.endTimed"></el-time-picker>
      </el-form-item>
      <el-form-item label="捡漏开始时间：" prop="closeStartTimed">
        <el-time-picker
          type="datetime"
          placeholder="选择日期"
          v-model="homeAdvertise.closeStartTimed"></el-time-picker>
      </el-form-item>
      <el-form-item label="捡漏结束时间：" prop="closeTimed">
        <el-time-picker
          type="datetime"
          placeholder="选择日期"
          v-model="homeAdvertise.closeTimed"></el-time-picker>
      </el-form-item>
      <!-- <el-form-item label="跳转类型：">
        <el-radio-group v-model="homeAdvertise.bannerUrlPathType">
          <el-radio :label="1">原生</el-radio>
          <el-radio :label="0">h5</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="轮播图片：" prop="bannerUrl">
        <single-upload v-model="homeAdvertise.bannerUrl"></single-upload>
      </el-form-item> -->
      <!-- <el-form-item label="排序：">
        <el-input v-model="homeAdvertise.sort" class="input-width"></el-input>
      </el-form-item> -->
      <!-- <el-form-item v-if="homeAdvertise.bannerUrlPathType==0" label="广告链接：" prop="bannerUrlPath">
        <el-input v-model="homeAdvertise.bannerUrlPath" class="input-width"></el-input>
      </el-form-item>
       <el-form-item v-if="homeAdvertise.bannerUrlPathType==1" label="原生跳转的商品ID：" prop="productId">
        <el-input v-model="homeAdvertise.productId" class="input-width"></el-input>
      </el-form-item>
       <el-form-item v-if="homeAdvertise.bannerUrlPathType==1" label="商品类型：" prop="productType">
        <el-select v-model="homeAdvertise.productType">
          <el-option
            v-for="type in typeOptionsed"
            :key="type.value"
            :label="type.label"
            :value="type.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="广告备注：">
        <el-input
          class="input-width"
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="homeAdvertise.note">
        </el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import SingleUpload from '@/components/Upload/singleUpload'
  // import {createHomeAdvertise, getHomeAdvertise, updateHomeAdvertise} from '@/api/homeAdvertise'
   import {updateGameType,addGameType} from '@/api/ppl/marketing';
  const defaultTypeOptionsed = [
    {
      label: '折扣商品',
      value: 1
    },
    {
      label: '普通活动商品',
      value: 2
    },

       {
      label: '积分商品',
      value: 4
    },
       {
      label: '正常商品',
      value: 5
    },
     {
      label: '短时活动商品',
      value: 7
    },
  ];
  const defaultTypeOptions = [
    {
      label: '首页顶端轮播图',
      value: 1
    },
    {
      label: '首页新品轮播图',
      value: 2
    },
       {
      label: '品牌馆轮播图',
      value: 3
    },
       {
      label: '爆款专区轮播图',
      value: 4
    },
       {
      label: '折扣专区轮播图',
      value: 5
    },
     {
      label: '经销商专区轮播图',
      value: 6
    },
     {
      label: '拼团专区轮播图',
      value: 7
    },
     {
      label: '其它可以增加轮播图',
      value: 8
    },
      {
      label: '生活超市轮播图',
      value: 9
    },
  ];
  const defaultHomeAdvertise = {
    name: null,
    type: 1,
    pic: null,
    startTime: null,
    startTimed:null,
    endTime: null,
    endTimed: null,
    endSubscribeTime:null,
    endSubscribeTimed:null,
    status: 0,
    url: null,
    note: null,
    sort: 0
  };
  export default {
    name: 'HomeAdvertiseDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        homeAdvertise: null,
        rules: {
          bannerType: [
            {required: true, message: '请输入广告名称', trigger: 'blur'}
          ],
          bannerUrlPath: [
            {required: true, message: '请输入广告链接', trigger: 'blur'}
          ],
          productType: [
            {required: true, message: '请输入商品类型', trigger: 'blur'}
          ],

            productId: [
            {required: true, message: '请输入原生跳转的商品ID：', trigger: 'blur'}
          ],
          // endTime: [
          //   {required: true, message: '请选择到期时间', trigger: 'blur'}
          // ],
          bannerUrl: [
            {required: true, message: '请选择广告图片', trigger: 'blur'}
          ]
        },
        typeOptions: Object.assign({}, defaultTypeOptions),
        typeOptionsed: Object.assign({}, defaultTypeOptionsed)
      }
    },
    filters:{
      rTime(date) {
          var json_date = new Date(date).toJSON();
          return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      }
    },
    created(){
      if (this.isEdit) {
        // carouselParticulars(this.$route.query.id).then(response => {
          this.homeAdvertise = this.$route.query.row;
        // });
      }else{
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      }
    },
    methods: {
      onSubmit(formName) {
        // this.homeAdvertise.startTime = new Date(this.homeAdvertise.startTime).getTime()/1000
        this.homeAdvertise.endSubscribeTime = 0;
        this.homeAdvertise.startTime = 0;
        this.homeAdvertise.endTime = 0;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateGameType(this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                addGameType(this.homeAdvertise).then(response => {
                  this.$refs[formName].resetFields();
                  this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.homeAdvertise = Object.assign({},defaultHomeAdvertise);
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 70%;
  }
</style>


