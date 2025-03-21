<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             :permission="permissionList"
             @on-load="onLoad"
             @row-update="rowUpdate"
             @refresh-change="onLoad">
  </avue-crud>

</template>

<script>

import {getList,updateWebGameKillConfig} from "@/api/kill/config";
import {mapGetters} from "vuex";
import {mapToOptions} from "@/util/common";
import {typeMap, openMap, killRoomRuleMap} from "@/const/kill/kill"

// const typeMap = {
//   1: '宝石场',
//   2: '钻石场',
// }
// const openMap = {
//   1: '开放',
//   0: '未开放',
// }
export default {
  name: "wel",
  data() {
    return {
      page: {
        total: 10
      },
      data: [
      ],
      option: {
        addBtn: false,
        delBtn: false,
        menu: true,
        column: [
          {
            label: "ID",
            prop: "id",
            span: 14,
            editDisplay: false,
            row: true
          },
          {
            label: "场次类型",
            prop: "type",
            editDisplay: false,
            span: 14,
            row: true,
            formatter: (_row, value)=> {
              return typeMap[value] ||'未知'; //
            }
          },
          {
            label: "是否开放",
            prop: "open",
            span: 14,
            editDisplay: false,
            row: true,
            formatter: (_row, value)=> {
              return openMap[value] ||'未知'; //
            }
          },
          {
            label: "上线时间",
            prop: "onlineTime",
            span: 14,
            editDisplay: false,
            row: true
          },
          {
            label: "最小参与人数",
            prop: "minUser",
          },
          {
            label: "销毁比例",
            prop: "rate",
          },
          {
            label: "延期时间（毫秒）",
            prop: "delayTime",
          },
          {
            label: "可选金额",
            prop: "amountArr",
          },
          {
            label: "被杀规则",
            prop: "killRoomRule",
            type: 'select',
            formatter: (_row, value)=> {
              return killRoomRuleMap[value] ||'未知'; //
            },
            dicData: mapToOptions(killRoomRuleMap),
          },
          {
            label: "不被杀用户id",
            prop: "unKillUserId",
          },
          {
            label: "必杀用户id",
            prop: "killUserId",
          },
          {
            label: "高权重被杀用户",
            prop: "highWeightKillUserId",
          },
          {
            label: "高权重",
            prop: "highWeight",
          },
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        editBtn: this.vaildData(this.permission.kill_config_edit, false),
      };
    },
  },
  created() {
  },
  methods: {
    onLoad(page, params = {}) {
      this.loading = true;
      getList(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateWebGameKillConfig(row).then(() => {
        this.onLoad(this.page);
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
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
