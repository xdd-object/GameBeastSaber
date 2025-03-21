<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @on-load="onLoad"
             @row-update="rowUpdate"
             @refresh-change="onLoad">
  </avue-crud>

</template>

<script>

import {listBattleConfig,updateBattleConfig} from "@/api/mythical/mythical";
import {mapGetters} from "vuex";
import {mapToOptions} from "@/util/common";
import {battleRuleMap, battleTypeMap} from "@/const/mythical/mythical";
import {yesMap} from "@/const/account/account";

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
        editBtn: true,
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
              return battleTypeMap[value] ||'未知'; //
            },
            dicData: mapToOptions(battleTypeMap)
          },
          {
            label: "是否开放",
            prop: "open",
            span: 14,
            row: true,
            type: "select",
            formatter: (_row, value)=> {
              return yesMap[value] ||'未知'; //
            },
            dicData: mapToOptions(yesMap)
          },
          {
            label: "开始时间",
            prop: "startTime",
            type: "time",
            format: "HH:mm:ss",
            valueFormat: "HH:mm:ss",
            span: 14,
            row: true,
          },
          {
            label: "结束时间",
            prop: "endTime",
            type: "time",
            format: "HH:mm:ss",
            valueFormat: "HH:mm:ss",
            span: 14,
            row: true,
          },
          {
            label: "最少人数",
            prop: "minUser",
            span: 14,
            row: true,
          },
          {
            label: "每场时间",
            prop: "delayTime",
            span: 14,
            row: true
          },
          {
            label: "每场可选金额",
            prop: "amountArr",
            span: 14,
            row: true
          },
          {
            label: "技能规则",
            prop: "killRoomRule",
            span: 14,
            type: "select",
            row: true,
            formatter: (_row, value)=> {
              return battleRuleMap[value] ||'未知'; //
            },
            dicData: mapToOptions(battleRuleMap)
          },
          {
            label: "胜利奖励比例",
            prop: "winRewardRate",
            span: 14,
            row: true
          },
          {
            label: "平局奖励食物比例",
            prop: "drawRewardRate",
            span: 14,
            row: true
          },
          {
            label: "总伤害",
            prop: "totalDamage",
            span: 14,
            row: true
          },
          {
            label: "发放的奖励",
            prop: "jackpot",
            span: 14,
            row: true
          },
          {
            label: "发放的食物奖励",
            prop: "foodJackpot",
            span: 14,
            row: true
          },
        ]
      }
    };
  },
  computed: {},
  created() {
  },
  methods: {
    onLoad(page, params = {}) {
      this.loading = true;
      listBattleConfig(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateBattleConfig(row).then(() => {
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
