<template>
  <avue-crud :option="option"
             :page.sync="page"
             :data="data"
             @on-load="onLoad"
             @refresh-change="onLoad"/>

</template>

<script>

import {getList} from "@/api/kill2/config";
import {mapGetters} from "vuex";

const typeMap = {
  1: 'ZCoin场',
  2: '金豆场',
}
const openMap = {
  1: '开放',
  0: '未开放',
}
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
        menu: false,
        column: [
          {
            label: "ID",
            prop: "id",
            span: 14,
            row: true
          },
          {
            label: "场次类型",
            prop: "type",
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
            row: true,
            formatter: (_row, value)=> {
              return openMap[value] ||'未知'; //
            }
          },
          {
            label: "上线时间",
            prop: "onlineTime",
            span: 14,
            row: true
          },
          {
            label: "最小参与人数",
            prop: "minUser",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "最小被杀房间数",
            prop: "minKillNum",
            row: true
          },
          {
            label: "最大被杀房间数（不包括）",
            prop: "maxKillNum",
            row: true
          },
          {
            label: "最小被杀比例",
            prop: "minKillRate",
            row: true,
            formatter: (_row, value)=> {
              return value + '%'; //
            }
          },
          {
            label: "最小被杀比例（不包括）",
            prop: "maxKillRate",
            row: true,
            formatter: (_row, value)=> {
              return value + '%'; //
            }
          },
          {
            label: "销毁比例",
            prop: "rate",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "延期时间（毫秒）",
            prop: "delayTime",
            minRows: 8,
            span: 24,
            row: true
          },
          {
            label: "可选金额",
            prop: "amountArr",
            minRows: 8,
            span: 24,
            row: true
          }
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
      getList(1, 10, Object.assign(params, this.query)).then(res => {
        const data = res.data.data;
        this.data = data;
        this.loading = false;
        // this.selectionClear();
      });
    }
  },

};
</script>

<style scoped="scoped" lang="scss">
</style>
