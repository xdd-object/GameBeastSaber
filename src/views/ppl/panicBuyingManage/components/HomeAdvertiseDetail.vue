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
      <el-form-item label="ACC单价" prop="autoPayTime">
        <el-input v-model="homeAdvertise.price" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="购买支付时间：分钟" prop="autoPayTime">
        <el-input v-model="homeAdvertise.autoPayTime" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="自动确认时间：分钟" prop="autoCompleteTime">
        <el-input v-model="homeAdvertise.autoCompleteTime" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="投诉限制交易时间：分钟" prop="autoComplaintTime">
        <el-input v-model="homeAdvertise.autoComplaintTime" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="按时确认奖励信用分" prop="completeAddAmount">
        <el-input v-model="homeAdvertise.completeAddAmount" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="未确认扣除信用分" prop="completeReduceAmount">
        <el-input v-model="homeAdvertise.completeReduceAmount" class="input-width"></el-input>
      </el-form-item>
       <el-form-item label="初始信用积分" prop="defaultAmount">
        <el-input v-model="homeAdvertise.defaultAmount" class="input-width"></el-input>
      </el-form-item>
       <el-form-item label="账户冻结时间：分钟" prop="frozenTime">
        <el-input v-model="homeAdvertise.frozenTime" class="input-width"></el-input>
      </el-form-item>
       <el-form-item label="最高价" prop="maxPrice">
        <el-input v-model="homeAdvertise.maxPrice" class="input-width"></el-input>
      </el-form-item>
       <el-form-item label="单笔最小交易量" prop="minOutAmount">
        <el-input v-model="homeAdvertise.minOutAmount" class="input-width"></el-input>
      </el-form-item>
       <el-form-item label="单笔最大交易量" prop="maxOutAmount">
        <el-input v-model="homeAdvertise.maxOutAmount" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="每次溢价百分比" prop="premiumRate">
        <el-input v-model="homeAdvertise.premiumRate" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="提货溢价比例" prop="pickUpGoodsRate">
        <el-input v-model="homeAdvertise.pickUpGoodsRate" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="规定时间付款奖励信用分" prop="payAddAmount">
        <el-input v-model="homeAdvertise.payAddAmount" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="规定时间扣除奖励信用分" prop="payReduceAmount">
        <el-input v-model="homeAdvertise.payReduceAmount" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="抢购说明图" prop="rulePic">
         <singleUploadedOne v-model="selectProductPics"></singleUploadedOne>
        <!-- <el-input v-model="homeAdvertise.rulePic" class="input-width"></el-input> -->
      </el-form-item>
      <el-form-item label="上传假图扣信用分" prop="uploadFailImgReduceAmount">
        <el-input v-model="homeAdvertise.uploadFailImgReduceAmount" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="初始信用分" prop="unlockReduceAibAmount">
        <el-input v-model="homeAdvertise.unlockReduceAibAmount" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="抢多单规则1信用分" prop="creditScore">
        <el-input v-model="homeAdvertise.creditScore" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="抢多单规则1单数" prop="creditBuyNum">
        <el-input v-model="homeAdvertise.creditBuyNum" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="抢多单规则2信用分" prop="creditScore">
        <el-input v-model="homeAdvertise.creditScoreTwo" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="抢多单规则2单数" prop="creditBuyNum">
        <el-input v-model="homeAdvertise.creditBuyNumTwo" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="捡漏场可抢单数" prop="leakBuyNum">
        <el-input v-model="homeAdvertise.leakBuyNum" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="捡漏场卖家补贴" prop="leakSellReward">
        <el-input v-model="homeAdvertise.leakSellReward" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="捡漏场买家补贴" prop="leakBuyReward">
        <el-input v-model="homeAdvertise.leakBuyReward" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="VIP场可抢单数" prop="vipBuyNum">
        <el-input v-model="homeAdvertise.vipBuyNum" class="input-width"></el-input>
      </el-form-item>
      <el-form-item label="交割单间隔天数" prop="allocationCompleteDay">
        <el-input v-model="homeAdvertise.allocationCompleteDay" class="input-width"></el-input>
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
  updateGameExchangeConfig,
  addGameGoods,
  getGroupNumList,
  getGroupTypeList,
  getGroupNumberList,
  getGroupbyGoodsList,
  getGroupbyGoodsInfo,
  getGameExchangeConfig,
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
        this.typeOptioned=response.data.data.records
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
       getGameExchangeConfig(canshu).then((response) => {
          this.homeAdvertise = response.data.data.records[0]
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
              updateGameExchangeConfig(this.homeAdvertise).then((response) => {
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


