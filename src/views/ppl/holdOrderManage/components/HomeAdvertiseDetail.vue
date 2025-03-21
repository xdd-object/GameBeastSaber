<template>
   
  <el-card class="form-container" shadow="never">
    <el-form
      :model="homeAdvertise"
      :rules="rules"
      ref="homeAdvertiseFrom"
      label-width="200px"
      size="small"
    >
      <el-form-item label="id" prop="id" class="elItem">
        <el-input v-model="homeAdvertise.id" class="input-width" disabled></el-input>
      </el-form-item>
      <el-form-item label="高级节点奖励" prop="advancedReward">
        <el-input v-model="homeAdvertise.advancedReward" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="高级直推人数" prop="advancedRoleOne">
        <el-input v-model="homeAdvertise.advancedRoleOne" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="高级团队交易额" prop="advancedRoleTwo">
        <el-input v-model="homeAdvertise.advancedRoleTwo" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="添加时间" prop="createTime">
        <el-input v-model="homeAdvertise.createTime" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="初级节点奖励" prop="elementaryReward">
        <el-input v-model="homeAdvertise.elementaryReward" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="直推人数" prop="elementaryRoleOne">
        <el-input v-model="homeAdvertise.elementaryRoleOne" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="团队交易额" prop="elementaryRoleTwo">
        <el-input v-model="homeAdvertise.elementaryRoleTwo" class="input-width"></el-input>
      </el-form-item>
       <el-form-item label="管理奖" prop="managerReward">
        <el-input v-model="homeAdvertise.managerReward" class="input-width"></el-input>
      </el-form-item>
       <el-form-item label="中级奖励" prop="middleReward">
        <el-input v-model="homeAdvertise.middleReward" class="input-width"></el-input>
      </el-form-item>
       <el-form-item label="中级团队交易额" prop="middleRoleOne">
        <el-input v-model="homeAdvertise.middleRoleOne" class="input-width"></el-input>
      </el-form-item>
       <el-form-item label="中级直推人数" prop="middleRoleTwo">
        <el-input v-model="homeAdvertise.middleRoleTwo" class="input-width"></el-input>
      </el-form-item>
       <el-form-item label="创始节点奖励" prop="originateReward">
        <el-input v-model="homeAdvertise.originateReward" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="创始直推人数" prop="originateRoleOne">
        <el-input v-model="homeAdvertise.originateRoleOne" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="创始团队交易额" prop="originateRoleTwo">
        <el-input v-model="homeAdvertise.originateRoleTwo" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="平级奖励" prop="peerReward">
        <el-input v-model="homeAdvertise.peerReward" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="直推奖励" prop="recomdReward">
        <el-input v-model="homeAdvertise.recomdReward" class="input-width"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')"
          >提交</el-button
        >
        <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import SingleUpload from "@/components/Upload/singleUpload";
  import singleUploadedOne from '@/components/Upload/singleUploadedOne'

// import {createHomeAdvertise, getHomeAdvertise, updateHomeAdvertise} from '@/api/homeAdvertise'
import {
  updateGameRewardConfig,
  addGameGoods,
  getGroupNumList,
  getGroupTypeList,
  getGroupNumberList,
  getGroupbyGoodsList,
  getGroupbyGoodsInfo,
  getGameRewardConfig,
  getGameTypeList
} from "@/api/ppl/marketing";
const defaultTypeOptionsed = [
  // {
  //   label: "9.9",
  //   value: 0,
  // },
  // {
  //   label: "惠民区",
  //   value: 1,
  // },
  //  {
  //   label: "扶贫区",
  //   value: 2,
  // }
];
const defaultTypeOptions = [
  {
    label: "首页顶端轮播图",
    value: 1,
  },
];
const defaultHomeAdvertise = {
  name: null,
  type: 1,
  rulePic: null,
  startTime: null,
  endTime: null,
  status: 0,
  url: null,
  note: null,
  sort: 0,
  id: null,
  groupMax: 999,
  integral: 0,
  toHome: 1,
  groupDemandAddList: [],
 grouptypeList:[],
 typeId:'',
 typeName:'',
};
export default {
  name: "HomeAdvertiseDetail",
  components: { SingleUpload,singleUploadedOne },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      shujus:null,
      shujus1:null,
      groupDeman:[],
      props: {
        multiple: true,
      },
      selectProductCateValue: [],
      types: null,
      groupDemandlist: null,
      goodsList: null,
      typeOptioned:null,
      homeAdvertise: {
        integral: 0,
      },
      rules: {
        goodsId: [{ required: true, message: "请输入商品id", trigger: "blur" }],
        groupDemand: [
          { required: true, message: "请输入成团人数", trigger: "blur" },
        ],
        contributionAmount:[
          { required: true, message: "请输入贡献值", trigger: "blur" },

        ],
           point: [
            {required: true, message: '请输入预约ACC', trigger: 'blur'}
          ],
           secendAward: [
            {required: true, message: '请输入直接分润', trigger: 'blur'}
          ],
          shareAward:[
            {required: true, message: '请输入间接分润', trigger: 'blur'}

          ],
          sortId:[
            {required: true, message: '请输入排序', trigger: 'blur'}

          ],
          status:[
            {required: true, message: '请选择状态', trigger: 'blur'}
          ],
           groupId: [
            {required: true, message: '请输入场次ID', trigger: 'blur'}
          ]
      },
      typeOptions: [],
      // typeOptionsed: Object.assign({}, defaultTypeOptionsed)
      typeOptionsed:null,
      zhisd:'3人'
    };
  },
  computed:{
    //商品的主图和画册图片
      selectProductPics:{
        get:function () {
          // let pics=[];
          let pics=[];
          if(this.homeAdvertise.rulePic===undefined||this.homeAdvertise.rulePic==null||this.homeAdvertise.rulePic===''){
            return pics;
          }
          pics.push(this.homeAdvertise.rulePic);
          console.log('get=>',this.homeAdvertise.rulePic)
          console.log('getget=>',pics)
          // if(this.homeAdvertise.albumPics===undefined||this.homeAdvertise.albumPics==null||this.homeAdvertise.albumPics===''){
          //   return pics;
          // }
          // let albumPics = this.homeAdvertise.albumPics.split(',');
          // for(let i=0;i<albumPics.length;i++){
          //   pics.push(albumPics[i]);
          // }
          return pics;
        },
        set:function (newValue) {
          if (newValue == null || newValue.length === 0) {
            this.homeAdvertise.rulePic = null;
            // this.homeAdvertise.albumPics = null;
          } else {
            this.homeAdvertise.rulePic = newValue;
            // this.homeAdvertise.albumPics = '';
            // if (newValue.length > 1) {
            //   for (let i = 1; i < newValue.length; i++) {
            //     this.homeAdvertise.albumPics += newValue[i];
            //     if (i !== newValue.length - 1) {
            //       this.homeAdvertise.albumPics += ',';
            //     }
            //   }
            // }
          }
          console.log('set=.',this.homeAdvertise.rulePic)
        }
      }
  },
  created() {
                //需请求该接口
    getGameTypeList().then((response) => {
        this.typeOptioned=response.data.list
    });

    if (this.isEdit) {
      let canshu={
        // goodsId:null,
        id:null,
        type:null
      }
      canshu.id=this.$route.query.row.id
      // console.log('this.$route.query.row=>',JSON.parse(this.$route.query.row))
      // canshu.type=this.$route.query.row.type
       getGameRewardConfig(canshu).then((response) => {
          this.homeAdvertise = response.data.list[0]
          this.typeOptions= this.homeAdvertise.grouptypeList
          console.log('rulePic=>',this.homeAdvertise)
          console.log('rulePic=>',this.homeAdvertise.rulePic)
          this.selectProductPics = this.homeAdvertise.rulePic
      });
      this.shujus=true
      this.shujus1=false
    } else {
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
    //   getGroupTypeList().then((response) => {
    //   this.typeOptions = response.data;
    // });
      this.shujus=false
      this.shujus1=true
    };

  },
  methods: {
    dianji(){
     this.shujus=false
     this.shujus1=true
    },
    ccChange(vule) {
      this.homeAdvertise.groupDemandAddList=vule.map(x=>x[1])
      this.homeAdvertise.type=vule.map(x=>x[0])[0]
      console.log(this.typeLength,'11111')
    },

    onSubmit(formName) {
      console.log('formName=>',formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            // if(this.homeAdvertise.typeId == 20){
            //   this.homeAdvertise.typeName = '上午'
            // }else if(this.homeAdvertise.typeId == 21){
            //   this.homeAdvertise.typeName = '下午'
            // }else{
            //   this.homeAdvertise.typeName = '晚上'
            // }
            // if( this.homeAdvertise.typeName == 20){
            //   this.homeAdvertise.typeId = 20
            //   this.homeAdvertise.typeName = '上午'
            // }else if(this.homeAdvertise.typeName == 21){
            //   this.homeAdvertise.typeId = 21
            //   this.homeAdvertise.typeName = '下午'
            // }else{
            //   this.homeAdvertise.typeId = 22
            //   this.homeAdvertise.typeName = '晚上'
            // }
            this.homeAdvertise.deposit = this.homeAdvertise.point
            // this.homeAdvertise.rulePic = this.homeAdvertise.rulePic[0]
            if(Array.isArray(this.homeAdvertise.rulePic)){
              this.homeAdvertise.rulePic =this.homeAdvertise.rulePic[0]
            }
            if (this.isEdit) {

              //  this.homeAdvertise.typeId = 22
                // this.homeAdvertise.typeName = '晚上'

              console.log('this.homeAdvertise=>',this.homeAdvertise)
              updateGameRewardConfig(this.homeAdvertise).then((response) => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 1000,
                });
                this.$router.back();
              });
            } else {
              addGameGoods(this.homeAdvertise).then((response) => {
                this.$refs[formName].resetFields();
                this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
                this.$message({
                  message: "提交成功",
                  type: "success",
                  duration: 1000,
                });
                this.$router.back();
              });
            }
          });
        } else {
          this.$message({
            message: "验证失败",
            type: "error",
            duration: 1000,
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
    },
  },
};
</script>
<style scoped>
.input-width {
  width: 60%;
}
.p{
  border: 1px solid #999;
  font-size: 12px;
  width: 70%;
}
.p p{
  margin: 0;
  padding: 0;
  margin-left: 13px;
}
</style>


