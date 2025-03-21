import {listGoods} from "@/api/ppl/marketing";
import {listTeam} from "@/api/common/common";
export const statusMap = {
  0: '未开始',
  1: '进行中',
  2: '结算中',
  3: '已结束',
}
export const statusRecordMap = {
  '-1': '已取消',
  0: '未处理',
  1: '已处理',
}

export const typeIdMap = {
  20: '鸡',
  21: '猪',
  22: '羊',
  23: '牛',
}
export const selfMap = {
  'left': 'left',
  'right': 'right',
}
export const skillMap = {
  1: '撞击',
  2: '爪击',
  3: '坚盾',
}

export const cccMap ={
  label: "团队",
    prop: "teamId",
    row: true,
    type: "select",
    search: true,
    dicMethod: "post",
    props: {
      label: "teamName",
      value: "id"
    },
    dicUrl: "/api/blade-game-admin/admin/web/loan/team/listTeam",
  }
let goodsMap;
listGoods().then(res => {
  goodsMap = res.data.data;
});

let teamMap;
listTeam().then(res => {
  teamMap = res.data.data;
});

export {goodsMap,teamMap};


