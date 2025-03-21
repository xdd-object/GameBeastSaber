<template>
  <a-modal :visible="visible" title="发货信息" @cancel="handleCancel">
    <basic-container>
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-card shadow="hover">
          <div slot="header">
            <span>发货信息</span>
          </div>
          <el-form-item label="订单编号">
            <el-input :disabled="true" v-model="form.orderNo" />
          </el-form-item>
          <el-form-item label="快递公司名称">
            <el-input :disabled="false" v-model="form.expressName" />
          </el-form-item>
          <el-form-item label="快递单号" prop="expressNo">
            <el-input :disabled="false" v-model="form.expressNo" />
          </el-form-item>
          <el-form-item>
            <input type="submit" value="发货" @click="handleSend()"
              style="background-color: #409EFF;color: white;float: right;width: 89px;height: 40px;border: none">
          </el-form-item>
        </el-card>
      </el-form>
    </basic-container>
  </a-modal>
</template>

<script>
import { delivery } from "@/api/small/order";

export default {
  name: 'orderSend',
  props: {
    orderNo: String,
    visible: Boolean
  },
  data() {
    return {
      form: {},
      rules: {
        expressNo: [{ required: true, message: '请输入快递单号', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
    console.log(55);

  },
  methods: {
    init() {
      this.orderNo = this.$props.orderNo
      this.form.orderNo = this.$props.orderNo
    },
    initOrder(orderNo) {
      this.orderNo = orderNo
      this.form.orderNo = orderNo
      this.form.expressNo = ''
      this.form.expressName = ''
    },
    handleCancel() {
      this.visible = false;
      this.$emit('onHandleSendSuccess')
    },
    handleSend() {
      const this_ = this
      this_.$refs["form"].validate(valid => {
        if (valid) {
          delivery(this_.form).then(res => {
            console.log(res);
            if (res.data.success) {
              this_.$message.success("发送成功！");
              this_.form = {
                expressNo:'',
                expressName:''
              };
              this_.handleCancel();
            }
          })
        }
      });
    }
  },
  
}
</script>
