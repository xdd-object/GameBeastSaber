<template>
  <a-modal :visible="visible" title="批量修改价格" @cancel="handleCancel">
    <basic-container>
      <el-form ref="form" :model="form" label-width="120px">
        <el-card shadow="hover">
          <div slot="header">
            <span>批量修改价格</span>
          </div>
          <el-form-item label="价格" prop="expressNo">
            <el-input-number
              :disabled="false"
              :min="0"
              :max="99999999"
              :controls="false"
              :precision="0"
              v-model="form.price"
              clearable
              placeholder="价格"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <input type="submit" value="修改提交" @click="handleSend()" style="background-color: #409EFF;color: white;float: right;width: 89px;height: 40px;border: none">
          </el-form-item>
        </el-card>
      </el-form>
    </basic-container>
  </a-modal>
</template>

<script>

import {settingPrice} from "@/api/goodNumber/goodNumber";

export default {
  name: 'settingPrice',
  props: {
    ids: String,
    visible: Boolean
  },
  data() {
    return {
      form: {}
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.ids = this.$props.ids
      this.form.ids = this.$props.ids
    },
    handleCancel() {
      this.visible = false;
      this.$emit('onHandleSendSuccess')
    },
    handleSend() {
      this.form.ids = this.$props.ids
      const this_ = this
      if (!this_.form.price) {
        this_.$message.warning("请输入价格！");
        return
      }
      this_.$confirm("确定将价格改为"+this_.form.price+"?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return settingPrice(this_.form)
        })
        .then(() => {
          this_.$message.success("修改成功！");
          this_.form.price = null;
          this_.handleCancel();
        });
    }
  }
}
</script>
