<template>
  <div>
    <el-row>
      <el-col :span="24">
        <third-register></third-register>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
      </el-col>
      <el-col :span="8">
        <el-row>

        </el-row>
        <el-row>

        </el-row>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    name: "wel",
    data() {
      return {
        activeNames: ['1', '2', '3', '5'],
        logActiveNames: ['30']
      };
    },
    computed: {
      ...mapGetters(["userInfo"]),
    },
    methods: {
      handleChange(val) {
        window.console.log(val);
      }
    },
  };
</script>

<style>
  .el-font-size {
    font-size: 14px;
  }
</style>

