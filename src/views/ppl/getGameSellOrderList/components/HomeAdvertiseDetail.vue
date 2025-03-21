<template>
   
  <el-card class="form-container" shadow="never">
    <el-form
      :model="homeAdvertise"
      :rules="rules"
      ref="homeAdvertiseFrom"
      label-width="150px"
      size="small"
    >
      <!-- <el-form-item label="商品(id)" prop="goodsId"> -->
          <!-- <el-input v-model="homeAdvertise.goodsId" class="input-width" disabled></el-input> -->
        <!-- <el-select v-model="homeAdvertise.goodsId">
          <el-option
            v-for="type in goodsList"
            :key="type.id"
            :label="type.name"
            :value="type.id"
          >
          </el-option>
        </el-select> -->
      <!-- </el-form-item> -->
      <el-form-item label="场次id：" prop="typeId">
        <el-select v-model="homeAdvertise.typeId" @change="getGameGoodsList(homeAdvertise.typeId)">
          <el-option
            v-for="type in typeOptioned"
            :key="type.typeId"
            :label="type.typeName"
            :value="type.typeId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="限购分数：" prop="groupNum">
        <el-input v-model="homeAdvertise.groupNum" class="input-width"></el-input>
      </el-form-item>  -->
     <!--        <el-form-item label="限购：" prop="groupNum">
        <el-input v-model="homeAdvertise.groupNum" class="input-width" disabled='true'></el-input>
      </el-form-item> -->
      <!-- v-show="shujus1" -->
      <!-- <el-form-item label="成团人数：" prop="toHome" >
        <el-cascader
           v-model="typeOptionsed"
          :options="typeOptions"
          :props="props"
           @change="ccChange"
        ></el-cascader>
      </el-form-item> -->
      <!-- v-show="shujus" -->
       <!-- <el-form-item label="场次：" prop="toHome" >
          <el-input v-model="homeAdvertise.typeName" class="input-width"></el-input>
      </el-form-item>  -->

      <el-form-item label="商品ID：" prop="typeId">
            <el-select v-model="homeAdvertise.goodsId" @change="getGamePriceList(homeAdvertise.goodsId)">
              <el-option
                v-for="type in goodsNameList"
                :key="type.goodsId"
                :label="type.goodsName"
                :value="type.goodsId"
              >
              </el-option>
            </el-select>
      </el-form-item>

      <el-form-item label="总金额：" prop="amount">
        <el-select v-model="homeAdvertise.amount">
          <el-option
            v-for="price in goodsPriceList"
            :key="price.startPrice"
            :label="price.startPrice"
            :value="price.startPrice"
          >
          </el-option>
        </el-select>
<!--        <template slot-scope="scope">
            <el-input
              v-model="homeAdvertise.amount"
              class="input-width"
              style="width:120px"
            ></el-input>
        </template>-->
      </el-form-item>

      <el-form-item label="数量：" prop="number">
        <template slot-scope="scope">
            <el-input
              v-model="homeAdvertise.number"
              class="input-width"
              style="width:120px"
            ></el-input>
        </template>
      </el-form-item>

      <el-form-item label="收款用户Id：" prop="memberId">
        <template slot-scope="scope">
            <el-input
              v-model="homeAdvertise.memberId"
              class="input-width"
              style="width:120px"
            ></el-input>
        </template>
      </el-form-item>

      <el-form-item label="收款用户昵称：" prop="nickname">
        <template slot-scope="scope">
            <el-input
              v-model="homeAdvertise.nickname"
              class="input-width"
              style="width:120px"
            ></el-input>
        </template>
      </el-form-item>
    <!-- <el-form-item label="状态开关:"  prop="state">
        <el-radio-group v-model="homeAdvertise.startStatus">
          <el-radio :label="1">抢购中</el-radio>
          <el-radio :label="2">已经抢空</el-radio>
          <el-radio :label="3">已结束</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <!-- <el-form-item label="分润金额" prop="integral">
        <el-input
          v-model="homeAdvertise.awardAmount"
          class="input-width"
        ></el-input>
      </el-form-item> -->

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
  updateGameGoods,
  addGameSellOrder,
  getGameGoodsList,
  getGamePriceList,
  getGameGoodsInfo,
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
  picUrl: null,
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
      zhisd:'3人',
      goodsNameList:null,
      goodsPriceList:null,

    };
  },
  computed:{
    //商品的主图和画册图片
      selectProductPics:{
        get:function () {
          let pics=[];
          if(this.homeAdvertise.picUrl===undefined||this.homeAdvertise.picUrl==null||this.homeAdvertise.picUrl===''){
            return pics;
          }
          pics.push(this.homeAdvertise.picUrl);
          console.log('get=>',this.homeAdvertise.picUrl)
          console.log('get=>',this.homeAdvertise.picUrl.length)
          if(this.homeAdvertise.picUrl.length == 1){
            return pics;
          }else{
            return pics[0]
          }
          // if(this.homeAdvertise.albumPics===undefined||this.homeAdvertise.albumPics==null||this.homeAdvertise.albumPics===''){
          //   return pics;
          // }
          // let albumPics = this.homeAdvertise.albumPics.split(',');
          // for(let i=0;i<albumPics.length;i++){
          //   pics.push(albumPics[i]);
          // }
        },
        set:function (newValue) {
          if (newValue == null || newValue.length === 0) {
            this.homeAdvertise.picUrl = null;
            // this.homeAdvertise.albumPics = null;
          } else {
            this.homeAdvertise.picUrl = newValue;
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
          console.log('set=.',this.homeAdvertise.picUrl)
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
        goodsId:null,
        type:null
      }
      canshu.goodsId=this.$route.query.row.goodsId
      // console.log('this.$route.query.row=>',JSON.parse(this.$route.query.row))
      // canshu.type=this.$route.query.row.type
       getGameGoodsInfo(canshu).then((response) => {
          this.homeAdvertise = response.data
          this.typeOptions= this.homeAdvertise.grouptypeList
          console.log('picUrl=>',this.homeAdvertise)
          console.log('picUrl=>',this.homeAdvertise.picUrl)
          this.selectProductPics = this.homeAdvertise.picUrl
      });
      this.shujus=true
      this.shujus1=false
    } else {
      this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
    //   getGameGoodsList().then((response) => {
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
    getGameGoodsList(typeId){
      let info = {
        typeId:typeId
      }
      getGameGoodsList(info).then((res)=>{
        this.goodsNameList = res.data.data.records
      })
    },
    getGamePriceList(goodsId){
      let info = {
        goodsId:goodsId,
        pageSize:100
      }
      getGamePriceList(info).then((res)=>{
        this.goodsPriceList = res.data.data.records
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm("是否提交数据", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          }).then(() => {
            if(this.homeAdvertise.typeId == 20){
              this.homeAdvertise.typeName = '上午'
            }else if(this.homeAdvertise.typeId == 21){
              this.homeAdvertise.typeName = '下午'
            }else{
              this.homeAdvertise.typeName = '晚上'
            }
            if( this.homeAdvertise.typeName = 20){
              this.homeAdvertise.typeId == 20
              this.homeAdvertise.typeName = '上午'
            }else if(this.homeAdvertise.typeName == 21){
              this.homeAdvertise.typeId == 21
              this.homeAdvertise.typeName = '下午'
            }else{
              this.homeAdvertise.typeId == 22
              this.homeAdvertise.typeName = '晚上'
            }
            this.homeAdvertise.deposit = this.homeAdvertise.point
            // this.homeAdvertise.picUrl = this.homeAdvertise.picUrl[0]
            console.log(' this.homeAdvertise.picUrl =>',  this.homeAdvertise.picUrl )
            if (this.isEdit) {
              updateGameGoods(this.homeAdvertise).then((response) => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: "修改成功",
                  type: "success",
                  duration: 1000,
                });
                this.$router.back();
              });
            } else {
              addGameSellOrder(this.homeAdvertise).then((response) => {
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
  width: 70%;
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


