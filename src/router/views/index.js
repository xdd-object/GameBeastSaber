import Layout from "@/page/index/";

export default [
  {
    path: "/wel",
    component: Layout,
    redirect: "/wel/index",
    children: [
      {
        path: "index",
        name: "首页",
        meta: {
          i18n: "dashboard",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/wel/index"),
      },
      {
        path: "dashboard",
        name: "控制台",
        meta: {
          i18n: "dashboard",
          menu: false,
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/wel/dashboard"),
      },
    ],
  },
  {
    path: "/test",
    component: Layout,
    redirect: "/test/index",
    children: [
      {
        path: "index",
        name: "测试页",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/util/test"),
      },
    ],
  },
  {
    path: "/dict-horizontal",
    component: Layout,
    redirect: "/dict-horizontal/index",
    children: [
      {
        path: "index",
        name: "字典管理",
        meta: {
          i18n: "dict",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/util/demo/dict-horizontal"
          ),
      },
    ],
  },
  {
    path: "/dict-vertical",
    component: Layout,
    redirect: "/dict-vertical/index",
    children: [
      {
        path: "index",
        name: "字典管理",
        meta: {
          i18n: "dict",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/util/demo/dict-vertical"
          ),
      },
    ],
  },
  {
    path: "/info",
    component: Layout,
    redirect: "/info/index",
    children: [
      {
        path: "index",
        name: "个人信息",
        meta: {
          i18n: "info",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/system/userinfo"),
      },
    ],
  },
  {
    path: "/work/process/leave",
    component: Layout,
    redirect: "/work/process/leave/form",
    children: [
      {
        path: "form/:processDefinitionId",
        name: "请假流程",
        meta: {
          i18n: "work",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/work/process/leave/form"
          ),
      },
      {
        path: "handle/:taskId/:processInstanceId/:businessId",
        name: "处理请假流程",
        meta: {
          i18n: "work",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/work/process/leave/handle"
          ),
      },
      {
        path: "detail/:processInstanceId/:businessId",
        name: "请假流程详情",
        meta: {
          i18n: "work",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/work/process/leave/detail"
          ),
      },
    ],
  },
  {
    path: "/kill",
    component: Layout,
    redirect: "/kill",
    children: [
      {
        path: "config",
        name: "大逃杀配置",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/kill/config"),
      },
      {
        path: "room",
        name: "大逃杀场次管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/kill/room"),
      },
      {
        path: "alarm",
        name: "监控与异常",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/kill/alarm"),
      },
      {
        path: "statistics",
        name: "历史统计",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/kill/statistics"),
      },
      {
        path: "defeat",
        name: "被杀统计",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/kill/defeat.vue"),
      },
      {
        path: "record",
        name: "play记录",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/kill/record"),
      },
    ],
  },
  {
    path: "/small",
    component: Layout,
    redirect: "/small",
    children: [
      {
        path: "shop",
        name: "店铺管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/small/shop"),
      },
      {
        path: "categorys",
        name: "类别管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/small/categorys"),
      },
      {
        path: "product",
        name: "商品管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/small/product"),
      },
      {
        path: "order",
        name: "订单管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/small/order"),
      },
      {
        path: "attribute",
        name: "商品属性管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/small/attribute"),
      },
      {
        path: "shipments",
        name: "发货管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/small/shipments"),
      },
    ],
  },
  {
    path: "/goodNumber",
    component: Layout,
    redirect: "/goodNumber",
    children: [
      {
        path: "goodNumber",
        name: "靓号管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/goodNumber/goodNumber"
          ),
      },
      {
        path: "config",
        name: "靓号规则配置",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/goodNumber/config"),
      },
    ],
  },
  {
    path: "/crystalHouse",
    component: Layout,
    redirect: "/crystalHouse",
    children: [
      {
        path: "crystalHouse",
        name: "水晶屋报表",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/crystal/report"),
      },
    ],
  },
  {
    path: "/finance",
    component: Layout,
    redirect: "/finance",
    children: [
      {
        path: "finance",
        name: "资金池报表",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/finance/index"),
      },
      {
        path: "smsUser",
        name: "短信监控",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/finance/smsUser"),
      },
    ],
  },
  {
    path: "/hainan",
    component: Layout,
    redirect: "/hainan",
    children: [
      {
        path: "hainan",
        name: "签到管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/user/index"),
      },
    ],
  },
  {
    path: "/castle",
    component: Layout,
    redirect: "/castle",
    children: [
      {
        path: "index",
        name: "淘金统计",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/castle/index"),
      },
      {
        path: "record",
        name: "淘金记录",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/castle/record"),
      },
      {
        path: "userList",
        name: "会员汇总",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/castle/userList"),
      },
      {
        path: "amount",
        name: "账本管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/castle/amount"),
      },
      {
        path: "config",
        name: "淘金配置",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/castle/config"),
      }
    ],
  },

  {
    path: "/teamwork",
    component: Layout,
    redirect: "/teamwork",
    children: [
      {
        path: "rule",
        name: "拼团规则",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/teamwork/rule"),
      },
      {
        path: "config",
        name: "拼团配置",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/teamwork/config"),
      },
      {
        path: "record",
        name: "拼团记录",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/teamwork/record"),
      },
      {
        path: "room",
        name: "拼团场次",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/teamwork/room"),
      },
      {
        path: "pack",
        name: "ZCoin拼团",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/teamwork/pack"),
      }
    ],
  },

  {
    path: "/ppl",
    component: Layout,
    redirect: "/ppl",
    children: [
      {
        path: "typeList",
        name: "场次列表",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/ppl/Screening/index"),
      },
      {
        path: "ScreeningAdd",
        name: "添加",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/ppl/Screening/add"),
      },
      {
        path: "ScreeningUpdate",
        name: "修改",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/Screening/update"
          ),
      },
      {
        path: "goodsList",
        name: "场次商品",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/groupBookings/index"
          ),
      },
      {
        path: "HomeAdvertiseDetail",
        name: "添加",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/groupBookings/components/HomeAdvertiseDetail"
          ),
      },
      {
        path: "groupBookingsUpdate",
        name: "修改",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/groupBookings/update"
          ),
      },
      {
        path: "preList",
        name: "预约列表",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/getGamePreList/index"
          ),
      },
      {
        path: "rentList",
        name: "转售列表",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/getGameSellOrderList/index"
          ),
      },
      {
        path: "rentListByMember",
        name: "未付款转售列表",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/getGameSellOrderList/indexMember"
          ),
      },
      {
        path: "getGameSellOrderListAdd",
        name: "添加",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/getGameSellOrderList/add"
          ),
      },
      {
        path: "pplConfigList",
        name: "抢购参数管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/panicBuyingManage/index"
          ),
      },
      {
        path: "panicBuyingManageUpdate",
        name: "编辑",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/panicBuyingManage/update"
          ),
      },
      {
        path: "rewardConfigList",
        name: "抢购奖励参数",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/panicBuyingManageParameter/index"
          ),
      },
      {
        path: "panicBuyingManageParameterUpdate",
        name: "编辑",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/panicBuyingManageParameter/update"
          ),
      },
      {
        path: "myOrderList",
        name: "持有订单管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/holdOrderManage/index"
          ),
      },
      {
        path: "statistics",
        name: "抢购数据统计",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/panicBuyingStatistics/index"
          ),
      },
      {
        path: "forbiddenUser",
        name: "拍拍乐用户解封",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/forbiddenUser/index"
          ),
      },
      {
        path: "userCompletePool",
        name: "交割用户管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/userCompletePool/index"
          ),
      },
      {
        path: "userCompleteSplit",
        name: "拆单管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/userCompleteSplit/index"
          ),
      },
      {
        path: "completeOrderReport",
        name: "交割订单报表",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/userCompletePool/report"
          ),
      },
      {
        path: "completePoolConfig",
        name: "交割配置管理",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/userCompletePool/config"
          ),
      },
      {
        path: "orderData",
        name: "金额统计",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/ppl/orderData/index"),
      },
      {
        path: "nopay",
        name: "未付款人员",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/ppl/orderData/nopay"),
      },
      {
        path: "umsIndex",
        name: "封号日志",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/forbiddenUser/umsIndex"
          ),
      },
      {
        path: "orderCount",
        name: "订单数量列表",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/ppl/orderData/orderCount"
          ),
      },
    ],
  },
  {
    path: "/team",
    component: Layout,
    redirect: "/team",
    children: [
      {
        path: "count",
        name: "团队统计",
        meta: {
          i18n: "test",
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/team/count"),
      },
    ],
  },
];
