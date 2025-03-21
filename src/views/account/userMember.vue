<template>
  <basic-container>
    <el-dialog
        title=""
        :visible.sync="gradeDrawer"
        width="30%"
        append-to-body
        :before-close="handleClose">

      <el-form ref="form" label-width="120px">
        <el-form-item label="用户id" required>
          <el-input v-model="gradeUser.memberId" disabled></el-input>
        </el-form-item>
        <el-form-item label="手动级数" required>
          <el-input v-model="gradeUser.handGradeId" placeholder="手动级数"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="gradeDrawer = false">取 消</el-button>
    <el-button type="primary" @click="updateUserGrade">手动调级</el-button>
  </span>
    </el-dialog>



  <avue-crud :option="option"
             :table-loading="loading"
             :page.sync="page"
             :data="data"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @on-load="onLoad"
             @refresh-change="onLoad">

    <template #menu="{size, row,index}" v-if="permission.member_update_grade">
      <el-button @click="showUpdateGrade(row)"
                 text
                 type="primary"
                 size="mini">手动调级</el-button>
    </template>
  </avue-crud>
  </basic-container>
</template>

<script>

import {multipleInvitees, pageUserMember, updateUserGrade} from "@/api/account/account";
import {buyMap, seedIdMap} from "@/const/farm/farm";
import {boolMap, yesMap} from "@/const/account/account";
import dayjs from "dayjs";
import {mapToOptions} from "@/util/common";
import {mapGetters} from "vuex";

export default {
  name: "wel",
  data() {
    return {
      page: {
        total: 0
      },
      loading: true,
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      gradeUser: {
        id: null,
        memberId: null,
        gradeId: null,
        handGradeId: null,
      },
      gradeDrawer: false,
      data: [
      ],
      option: {
        delBtn: false,
        editBtn: false,
        menuWidth: 150,
        border:true,
        align:'center',
        menuAlign:'center',
        addBtn: false,
        column:[
          {
            label: "用户id",
            prop: "memberId",
            span: 8,
            search: true,
            row: true
          },
          {
            label: "VIP的等级",
            prop: "vipLevel",
          },
          {
            label: "微信号",
            prop: "wx",
          },
          {
            label: "QQ号",
            prop: "qq",
          },
          {
            label: "vip过期时间",
            prop: "vipExpiredTime",
            formatter: (_row, value)=> {
              if (value>0) {
                return dayjs(value*1000).format('YYYY-MM-DD HH:mm:ss') ||'未知'; //
              } else {
                return "";
              }
            },
          },
          {
            label: "星级id",
            prop: "gradeId",
          },
          {
            label: "手动星级",
            prop: "handGradeId",
          },
          {
            label: "是否商人",
            prop: "richManLevel",
            search: true,
            type: 'select',
            formatter: (_row, value)=> {
              return boolMap[value] ||'未知'; //
            },
            dicData: mapToOptions(boolMap),
          },
          {
            label: "是否牧场会员",
            prop: "paipaileLevel",
            formatter: (_row, value)=> {
              return boolMap[value] ||'未知'; //
            },
          },
          {
            label: "牧场会员过期时间",
            prop: "paipaileExpiredTime",
            formatter: (_row, value)=> {
              if (value>0) {
                return dayjs(value*1000).format('YYYY-MM-DD HH:mm:ss') ||'未知'; //
              } else {
                return "";
              }
            },
          },
          {
            label: "牧场是否开启自动支付",
            prop: "paipaileAutoPayStatus",
            formatter: (_row, value)=> {
              return boolMap[value] ||'未知'; //
            },
          },
          {
            label: "是否农场会员",
            prop: "farmLevel",
            formatter: (_row, value)=> {
              return yesMap[value] ||'未知'; //
            },
          },
          {
            label: "农场会员过期时间",
            prop: "farmExpiredTime",
          },
          {
            label: "下级有效解锁次数",
            prop: "downUnlockNum",
          },
          {
            label: "下次领取摇钱树时间",
            prop: "nextCollectTime",
          },
          // {
          //   label: "团队",
          //   prop: "teamId",
          //   row: true,
          //   type: "select",
          //   search: true,
          //   dicMethod: "post",
          //   props: {
          //     label: "teamName",
          //     value: "id"
          //   },
          //   dicUrl: "/api/blade-game-admin/admin/web/loan/team/listTeam",
          //   addDisplay:false,
          // },
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["permission"]),
  },
  created() {
    this.onLoadRecord()
  },
  methods: {
    onLoad(page, params = {}) {
      this.onLoadRecord();
    },
    searchRecord(params, done) {
      this.query = params;
      this.query.pageNum = 1;
      this.query.pageSize = 10;
      this.onLoad(this.query);
      done();
    },
    searchPageRecord(currentPage, done) {
      this.query.pageNum = currentPage;
      this.onLoadRecord(this.query);
      done();
    },
    onLoadRecord() {
      this.loading = true;
      pageUserMember(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    showUpdateGrade(row) {
      this.gradeUser=row
      this.gradeDrawer = true;
    },
    updateUserGrade() {
      updateUserGrade(this.gradeUser).then(res => {
        this.gradeDrawer = false;
        this.onLoadRecord();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      });
    },
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
