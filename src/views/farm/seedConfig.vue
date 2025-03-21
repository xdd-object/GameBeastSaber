<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @on-load="onLoad"
             @row-update="rowUpdate"
             :permission="permissionList"
             @refresh-change="onLoad">
  </avue-crud>

</template>

<script>

import {listSeedConfig,updateSeedConfig} from "@/api/farm/farm";
import {mapGetters} from "vuex";
import {mapToOptions} from "@/util/common";
import {buyMap,openMap} from "@/const/farm/farm";
import {currencyMap} from "@/const/currency/currency";

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
            label: "名称",
            prop: "name",
            span: 14,
            row: true,
          },
          {
            label: "购买状态",
            prop: "buy",
            span: 14,
            row: true,
            type: 'select',
            formatter: (_row, value)=> {
              return buyMap[value] ||'未知'; //
            },
            dicData: mapToOptions(buyMap),
          },
          {
            label: "开启状态",
            prop: "open",
            span: 14,
            row: true,
            type: 'select',
            formatter: (_row, value)=> {
              return openMap[value] ||'未知'; //
            },
            dicData: mapToOptions(openMap),
          },
          {
            label: "购买金额",
            prop: "amount",
            span: 14,
            row: true,
          },
          {
            label: "购买货币",
            prop: "currencyId",
            span: 14,
            row: true,
            type: 'select',
            formatter: (_row, value)=> {
              return currencyMap[value] ||'未知'; //
            },
            dicData: mapToOptions(currencyMap),
          },
          {
            label: "奖励基数",
            prop: "rewardAmount",
            span: 14,
            row: true,
          },
          {
            label: "每次收益",
            prop: "everyIncome",
            span: 14,
            row: true,
          },
          {
            label: "每次Vip领取收益",
            prop: "everyVipIncome",
            span: 14,
            row: true,
          },
          {
            label: "总收益",
            prop: "totalIncome",
            span: 14,
            row: true,
          },
          {
            label: "生长周期",
            prop: "totalDay",
            span: 14,
            row: true,
          },
          {
            label: "排序",
            prop: "sort",
            span: 14,
            row: true,
          },
          {
            label: "解锁条件",
            prop: "unlock",
            span: 14,
            row: true,
          },
          {
            label: "解锁条件描述",
            prop: "unlockDesc",
            overHidden: true,
            span: 14,
            row: true
          },
          {
            label: "创建时间",
            prop: "createTime",
            minRows: 8,
            span: 24,
            editDisplay: false,
            row: true
          },
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["permission"]),
    permissionList() {
      return {
        editBtn: this.vaildData(this.permission.farm_seed_config_edit, false),
      };
    },
  },
  created() {
  },
  methods: {
    onLoad(page, params = {}) {
      this.loading = true;
      listSeedConfig(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    },
    rowUpdate(row, index, done, loading) {
      updateSeedConfig(row).then(() => {
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
