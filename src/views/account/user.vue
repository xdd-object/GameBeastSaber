<template>
  <basic-container>
    <el-drawer
        title=""
        size="50%"
        :visible.sync="drawer2"
        :direction="direction"
        append-to-body
        :before-close="handleClose2">
      <avue-crud :data="room.data"
                 :page.sync="room.page"
                 :option="room.option"
                 @search-change="searchChangeRecord"
                 @refresh-change="onLoadChangeRecord"
                 @current-change="currentChangeRecord"
      >
      </avue-crud>
    </el-drawer>

    <el-dialog
        title=""
        :visible.sync="drawer"
        width="30%"
        append-to-body
        >

      <el-form ref="form" label-width="100px">
        <el-form-item label="用户id">
          <el-input v-model="disableUserRow.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="禁/启用备注">
          <el-input v-model="disableUserRow.deleteMark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="drawer = false">取 消</el-button>
    <el-button v-if="disableUserRow.isDelete" type="primary" @click="enableUser">启用</el-button>
    <el-button v-else type="primary" @click="disableUser">禁用</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title=""
        :visible.sync="realNameDrawer"
        width="30%"
        append-to-body
        >

      <el-form ref="form" label-width="100px">
        <el-form-item label="用户id">
          <el-input v-model="disableUserRow.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" required>
          <el-input v-model="disableUserRow.realName" placeholder="未输入则后台生成"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" required>
          <el-input v-model="disableUserRow.idCard" placeholder="未输入则后台生成"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="realNameDrawer = false">取 消</el-button>
    <el-button type="primary" @click="realName">实名</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title=""
        :visible.sync="replaceDrawer"
        width="30%"
        append-to-body
        >

      <el-form ref="form" label-width="100px">
        <el-form-item label="用户id">
          <el-input v-model="replaceUser.userId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="绑定用户id" required>
          <el-input v-model="replaceUser.replaceUserId" placeholder="输入绑定用户id"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="replaceDrawer = false">取 消</el-button>
    <el-button type="primary" @click="replaceBinding">更改绑定</el-button>
  </span>
    </el-dialog>


    <el-dialog
        title=""
        :visible.sync="registerDrawer"
        width="30%"
        append-to-body
        >

      <el-form ref="form" label-width="120px">
        <el-form-item label="上级用户id" required>
          <el-input v-model="batchUser.userId"></el-input>
        </el-form-item>
        <el-form-item label="注册下级数量" required>
          <el-input v-model="batchUser.number" placeholder="注册数量"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" required>
          <el-input v-model="batchUser.password" placeholder="登陆密码"></el-input>
        </el-form-item>
        <el-form-item label="支付密码" required>
          <el-input v-model="batchUser.payPassword" placeholder="支付密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="registerDrawer = false">取 消</el-button>
    <el-button type="primary" @click="batchRegister">批量注册下级</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title=""
        :visible.sync="nicknameDrawer"
        width="30%"
        append-to-body
    >
      <el-form ref="form" label-width="100px">
        <el-form-item label="用户id">
          <el-input v-model="nicknameUser.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" required>
          <el-input v-model="nicknameUser.name" placeholder="用户昵称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="nicknameDrawer = false">取 消</el-button>
    <el-button type="primary" @click="updateUserNickname">修改昵称</el-button>
  </span>
    </el-dialog>


    <el-dialog
        title=""
        :visible.sync="phoneDrawer"
        width="30%"
        append-to-body
    >
      <el-form ref="form" label-width="100px">
        <el-form-item label="用户id">
          <el-input v-model="phoneUser.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号" required>
          <el-input v-model="phoneUser.phone" placeholder="手机号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="phoneDrawer = false">取 消</el-button>
    <el-button type="primary" @click="updateUserPhone">修改手机号</el-button>
  </span>
    </el-dialog>

    <el-dialog
        title=""
        :visible.sync="passwordDrawer"
        width="30%"
        append-to-body
    >
      <el-form ref="form" label-width="100px">
        <el-form-item label="用户id">
          <el-input v-model="passwordUser.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input v-model="passwordUser.password" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="passwordDrawer = false">取 消</el-button>
    <el-button type="primary" @click="updateUserPassword">修改密码</el-button>
  </span>
    </el-dialog>


    <el-dialog
        title=""
        :visible.sync="payPasswordDrawer"
        width="30%"
        append-to-body
    >
      <el-form ref="form" label-width="100px">
        <el-form-item label="用户id">
          <el-input v-model="payPasswordUser.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="支付密码" required>
          <el-input v-model="payPasswordUser.payPassword" placeholder="支付密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="payPasswordDrawer = false">取 消</el-button>
    <el-button type="primary" @click="updateUserPayPassword">修改支付密码</el-button>
  </span>
    </el-dialog>

    <avue-crud :option="option"
             :table-loading="loading"
             :page.sync="page"
             :data="data"
               :permission="permissionList"
             @search-change="searchRecord"
             @current-change="searchPageRecord"
             @on-load="onLoad"
             @row-save="rowSave"
             @refresh-change="onLoad">
    <template #menuLeft>
      <el-button v-if="permission.account_batch_register_app" @click="showBatch()"
                 text
                 type="primary"
                 size="small">批量注册下级</el-button>
    </template>
    <template #menu="{size, row,index}">
        <el-button v-if="row.isDelete" @click="openDrawer(row)"
                   text
                   type="primary"
                   size="mini">启用</el-button>
        <el-button v-else @click="openDrawer(row)"
                   text
                   type="primary"
                   size="mini">禁用</el-button>
      <el-button v-if="permission.account_update_real_name && !row.isCertification" @click="showRealName(row)"
                 text
                 type="primary"
                 size="mini">实名</el-button>
      <el-button @click="teamUser(row)"
                 text
                 type="primary"
                 size="mini">团队</el-button>
      <el-button @click="upUser(row)"
                 text
                 type="primary"
                 size="mini">上级</el-button>
      <el-button v-if="permission.account_update_bind" @click="showReplace(row)"
                 text
                 type="primary"
                 size="mini">换绑邀请人</el-button>


      <el-button v-if="permission.account_update_nickname" @click="showNickname(row)"
                 text
                 type="primary"
                 size="mini">改昵称</el-button>
      <el-button v-if="permission.account_update_phone" @click="showPhone(row)"
                 text
                 type="primary"
                 size="mini">改手机号</el-button>
      <el-button v-if="permission.account_update_password" @click="showPassword(row)"
                 text
                 type="primary"
                 size="mini">改登录密码</el-button>
      <el-button v-if="permission.account_update_paypassword" @click="showPayPassword(row)"
                 text
                 type="primary"
                 size="mini">改支付密码</el-button>
      <el-button v-if="permission.account_update_freeze" @click="resetUserFreeze(row)"
                 text
                 type="primary"
                 size="mini">解除输错密码冻结24小时</el-button>
      <el-button v-if="permission.account_update_anchor" @click="updateAnchor(row)"
                 text
                 type="primary"
                 size="mini">开启/取消主播身份</el-button>
    </template>

  </avue-crud>
  </basic-container>

</template>

<script>

import {pageUser, disableUser, enableUser, realName, pageUserLevel,register,replaceBinding,multipleInvitees,updateUserNickname,updateUserPhone,updateUserPassword, updateUserPayPassword, resetUserFreeze,updateAnchor} from "@/api/account/account";
import {yesMap, boolMap} from "@/const/account/account";
import dayjs from "dayjs";
import {statusRecordMap} from "@/const/kill/kill";
import {pageRecord} from "@/api/kill/config";
import {add} from "@/api/desk/notice";
import {mapGetters} from "vuex";

export default {
  name: "wel",
  data() {
    return {
      room : {
        query: {
          pageNum: 1,
          pageSize: 10,
          userId: null,
          pid: null,
          level: null,
        },
        row: {
          roomId: null,
        },
        page: {
          total: 0
        },
        data: [

        ],
        option:{
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
              prop: "userId",
              span: 8,
              search: true,
              row: true
            },
            {
              label: "用户昵称",
              prop: "name",
              span: 8,
              row: true
            },
            {
              label: "上级id",
              prop: "pid",
              search: true,
              span: 8,
              row: true
            },
            {
              label: "上级昵称",
              prop: "pName",
              span: 8,
              row: true
            },
            {
              label: "层级",
              prop: "level",
              search: true,
              span: 8,
              row: true
            },

          ]
        },
      },
      replaceUser: {
        userId: null,
        replaceUserId: null,
      },
      batchUser: {
        userId: null,
        number: 0,
        password: null,
        payPassword: '',
      },
      nicknameUser:{},
      phoneUser:{},
      passwordUser:{},
      payPasswordUser:{},
      freezeUser:{},
      page: {
        total: 0
      },
      drawer: false,
      drawer2: false,
      realNameDrawer: false,
      replaceDrawer: false,
      registerDrawer: false,

      nicknameDrawer: false,
      phoneDrawer: false,
      passwordDrawer: false,
      payPasswordDrawer: false,
      freezeDrawer: false,

      direction: 'rtl',
      loading: true,
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      disableUserRow:{},
      data: [
      ],
      option: {
        delBtn: false,
        editBtn: false,
        menuWidth: 250,
        border:true,
        align:'center',
        menuAlign:'center',
        column:[
          {
            label: "用户id",
            prop: "id",
            span: 8,
            search: true,
            row: true,
            addDisplay: false,
          },
          {
            label: "靓号",
            prop: "goodNumber",
            search: true,
          },
          {
            label: "昵称",
            prop: "name",
            addDisplay:false,
          },
          {
            label: "手机号",
            search: true,
            prop: "phone",
            rules: [
              {
                required: true,
                message: "请输入手机号",
                trigger: "blur"
              }
            ],
          },
          {
            label: "是否禁用",
            prop: "isDelete",
            formatter: (_row, value)=> {
              return boolMap[value] ||'未知'; //
            },
            addDisplay:false,
          },
          {
            label: "禁用备注",
            prop: "deleteMark",
            addDisplay:false,
          },
          {
            label: "是否实名",
            prop: "isCertification",
            formatter: (_row, value)=> {
              return yesMap[value] ||'未知'; //
            },
            addDisplay:false,
          },
          {
            label: "真实姓名",
            prop: "realName",
            addDisplay:false,
          },
          {
            label: "身份证",
            prop: "idCard",
            addDisplay:false,
          },
          {
            label: "团队id",
            prop: "groupId",
            addDisplay:false,
          },
          {
            label: "实名时间",
            prop: "certificationTime",
            formatter: (_row, value)=> {
              if (value>0) {
                return dayjs(value*1000).format('YYYY-MM-DD HH:mm:ss') ||'未知'; //
              } else {
                return "";
              }
            },
            addDisplay:false,
          },
          {
            label: "是否设置支付密码",
            prop: "payPassword",
            formatter: (_row, value)=> {
              return value?'是':'否'; //
            },
            addDisplay:false,
          },
          {
            label: "时间",
            prop: "createTime",
            span: 8,
            row: true,
            formatter: (_row, value)=> {
              return dayjs(value*1000).format('YYYY-MM-DD HH:mm:ss') ||'未知'; //
            },
            addDisplay:false,
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
          {
            label: "密码",
            prop: "password",
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入密码",
                trigger: "blur"
              }
            ],
          },
          {
            label: "邀请人",
            prop: "dymOpenid",
            hide: true,
            rules: [
              {
                required: true,
                message: "请输入邀请人id",
                trigger: "blur"
              }
            ],
          },
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        addBtn: this.vaildData(this.permission.account_batch_register_app, false),
      };
    },
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
      pageUser(this.query).then(res => {
        const data = res.data.data;
        this.data = data.records;
        this.page.total = data.total;
        this.loading = false;
        // this.selectionClear();
      });
    },
    openDrawer(row) {
      this.disableUserRow=row
      this.drawer = true;
    },
    enableUser() {
      console.info("enableUser", this.disableUserRow)
      enableUser(this.disableUserRow).then(res => {
        this.drawer = false;
        this.onLoadRecord();
      });
    },
    disableUser() {
      console.info("disableUser", this.disableUserRow)
      disableUser(this.disableUserRow).then(res => {
        this.drawer = false;
        this.onLoadRecord();
      });
    },
    realName() {
      console.info("realName", this.disableUserRow)
      realName(this.disableUserRow).then(res => {
        this.realNameDrawer = false;
        this.onLoadRecord();
      });
    },
    batchRegister() {
      console.info("batchRegister", this.batchUser)
      multipleInvitees(this.batchUser).then(res => {
        this.registerDrawer = false;
        this.onLoadRecord();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      });
    },
    showRealName(row) {
      this.disableUserRow=row
      this.realNameDrawer = true;
    },
    showNickname(row) {
      this.nicknameUser=row
      this.nicknameDrawer = true;
    },
    showPhone(row) {
      this.phoneUser=row
      this.phoneDrawer = true;
    },
    showPassword(row) {
      this.passwordUser=row
      this.passwordUser.password=""
      this.passwordDrawer = true;
    },
    showPayPassword(row) {
      this.payPasswordUser=row
      if (this.payPasswordUser.payPassword) {
        this.payPasswordUser.payPassword=''
      }
      this.payPasswordDrawer = true;
    },
    showFreeze(row) {
      this.freezeUser=row
      this.freezeDrawer = true;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    handleClose2(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    teamUser(row) {
      this.drawer2 = true;
      this.room.query.userId=null;
      this.room.query.pid=row.id;
      this.onLoadChangeRecord();
    },
    upUser(row) {
      this.drawer2 = true;
      this.room.query.userId=row.id;
      this.room.query.pid=null;
      this.onLoadChangeRecord();
    },
    onLoadChangeRecord() {
      this.room.loading = true;
      pageUserLevel(this.room.query).then(res => {
        const data = res.data.data;
        this.room.data = data.records;
        this.room.page.total = data.total;
        this.room.loading = false;
        // this.selectionClear();
      });
    },
    searchChangeRecord(params, done) {
      this.room.query = params;
      this.room.query.pageNum = 1;
      this.room.query.pageSize = 10;
      this.onLoadChangeRecord();
      done();
    },
    currentChangeRecord(currentPage, done) {
      this.room.query.pageNum = currentPage;
      this.onLoadChangeRecord();
      done();
    },
    showReplace(row) {
      this.replaceUser.userId=row.id
      this.replaceUser.replaceUserId=null
      this.replaceDrawer = true;
    },
    showBatch() {
      this.batchUser.userId=""
      this.batchUser.num=""
      this.registerDrawer = true;
    },
    replaceBinding() {
      replaceBinding(this.replaceUser).then(res => {
        this.replaceDrawer = false;
        this.onLoadRecord();
      });
    },
    rowSave(row, done, loading) {
      var params={
        phone:row.phone,
        password:row.password,
        pid:row.dymOpenid,
      }
      row.dymOpenid=null
      register(params).then(() => {
        this.onLoadRecord();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      }, error => {
        window.console.log(error);
        loading();
      });
    },
    updateUserNickname() {
      updateUserNickname(this.nicknameUser).then(res => {
        this.nicknameDrawer = false;
        this.onLoadRecord();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      });
    },
    updateUserPhone() {
      updateUserPhone(this.phoneUser).then(res => {
        this.phoneDrawer = false;
        this.onLoadRecord();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      });
    },
    updateUserPassword() {
      updateUserPassword(this.passwordUser).then(res => {
        this.passwordDrawer = false;
        this.onLoadRecord();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      });
    },
    updateUserPayPassword() {
      updateUserPayPassword(this.payPasswordUser).then(res => {
        this.payPasswordDrawer = false;
        this.onLoadRecord();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      });
    },
    resetUserFreeze(row) {
      resetUserFreeze(row).then(res => {
        this.freezeDrawer = false;
        this.onLoadRecord();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      });
    },
    updateAnchor(row) {
      updateAnchor(row).then(res => {
        this.freezeDrawer = false;
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
.abc{
  display: flex;
}
</style>
