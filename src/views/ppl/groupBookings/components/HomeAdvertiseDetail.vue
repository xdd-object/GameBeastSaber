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
        <el-select v-model="homeAdvertise.typeId">
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

      <el-form-item label="商品名称：" prop="groupMax">
        <el-input
          v-model="homeAdvertise.goodsName"
          class="input-width"
        ></el-input>
      </el-form-item>

      <el-form-item label="商品图片：" style="margin-bottom:40px">
        <!-- <multi-upload v-model="selectProductPics"></multi-upload> -->
         <singleUploadedOne v-model="selectProductPics"></singleUploadedOne>
      </el-form-item>

      <el-form-item label="区间" prop="winRate">
        <template slot-scope="scope">
            最小值：
            <el-input
              v-model="homeAdvertise.minPrice"
              class="input-width"
              style="width:120px"
            ></el-input>
            最大值：
            <el-input
              v-model="homeAdvertise.maxPrice"
              class="input-width"
              style="width:120px"
            ></el-input>

        </template>
      </el-form-item>
      <el-form-item label="预约ACC" prop="point">
        <el-input v-model="homeAdvertise.point" class="input-width"></el-input>
      </el-form-item>
      <!-- <el-form-item label="参团所需爱心" prop="integral">
        <el-input
          v-model="homeAdvertise.integral"
          class="input-width"
        ></el-input>
      </el-form-item> -->
               <!-- <el-form-item label="私募单价" prop="price">
        <el-input v-model="homeAdvertise.price" class="input-width"></el-input>
      </el-form-item> -->
       <!-- <el-form-item label="直接分润" prop="secendAward">
        <el-input v-model="homeAdvertise.secendAward" class="input-width"></el-input>
      </el-form-item> -->
       <!-- <el-form-item label="间接分润" prop="shareAward">
        <el-input v-model="homeAdvertise.shareAward" class="input-width"></el-input>
      </el-form-item>  -->

           <el-form-item label="排序" prop="sortId">
        <el-input v-model="homeAdvertise.sortId" class="input-width"></el-input>
         <p style="color:red">数字越大越排在前面</p>
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

      <el-form-item label="上架状态：" prop="status">
        <el-radio-group v-model="homeAdvertise.status">
          <el-radio :label="1">上架</el-radio>
          <el-radio :label="0">下架</el-radio>
        </el-radio-group>
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
  updateGameGoods,
  addGameGoods,
  getGroupNumList,
  getGroupTypeList,
  getGroupNumberList,
  getGroupbyGoodsList,
  getGroupbyGoodsInfo,
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
          if(this.homeAdvertise.picUrl===undefined||this.homeAdvertise.picUrl==null||this.homeAdvertise.picUrl===''){
            return pics;
          }
          pics.push(this.homeAdvertise.picUrl);
          console.log('get=>',this.homeAdvertise.picUrl)
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
          this.homeAdvertise = response.data.data
          this.typeOptions= this.homeAdvertise.grouptypeList
          console.log('picUrl=>',this.homeAdvertise)
          console.log('picUrl=>',this.homeAdvertise.picUrl)
          this.selectProductPics = this.homeAdvertise.picUrl
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
            // this.homeAdvertise.picUrl = this.homeAdvertise.picUrl[0]
            if(Array.isArray(this.homeAdvertise.picUrl)){
              this.homeAdvertise.picUrl =this.homeAdvertise.picUrl[0]
            }
            if (this.isEdit) {

              //  this.homeAdvertise.typeId = 22
                // this.homeAdvertise.typeName = '晚上'

              console.log('this.homeAdvertise=>',this.homeAdvertise)
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


