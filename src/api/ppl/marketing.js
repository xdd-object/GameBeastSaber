/*
 * @author: Liu
 * @LastEditors: Liu
 * @Date: 2021-07-01 09:34:42
 * @LastEditTime: 2022-05-10 17:19:12
 * @FilePath: \abc_mall_houtai\src\api\marketing.js
 */
import request from '@/router/axios'
//轮播图列表
export function carousel(params) {
  return request({
    url:'/banner/list',
    method:'get',
    params:params
  })
}

export function carouselParticulars(id) {
    return request({
      url:'/banner/'+id,
      method:'get'
    })
  }

  export function carouselUpdate(ppl) {
    return request({
      url:'/banner/update',
      method:'post',
      data:ppl
    })
  }

  export function carouselAdd(ppl) {
    return request({
      url:'/banner/add',
      method:'post',
      data:ppl
    })
  }

  export function carouselDelete(ppl) {
    return request({
      url:'/banner/del',
      method:'post',
     data:ppl
    })
  }

  export function carouselDeleteBatch(ppl) {
    return request({
      url:'/banner/del/batch',
      method:'post',
      data:ppl
    })
  }

//金刚区
  export function home_model(params) {
    return request({
      url:'/home_model/list',
      method:'get',
     data:ppl,
     params:params
    })
  }

  export function home_models(id) {
    return request({
      url:'/home_model/'+id,
      method:'get'
    })
  }

  export function home_modelsAdd(ppl) {
    return request({
      url:'/home_model/add',
      method:'post',
      data:ppl
    })
  }

  export function home_modelsUpdate(ppl) {
    return request({
      url:'/home_model/update',
      method:'post',
      data:ppl
    })
  }
  export function home_modelsDelete(ppl) {
    return request({
      url:'/home_model/del',
      method:'post',
      data:ppl
    })
  }
  //首页活动
  export function home_activity(params) {
    return request({
      url:'/home_activity/list',
      method:'get',
      params:params
    })
  }
  export function home_activitys(id) {
    return request({
      url:'/home_activity/'+id,
      method:'get'
    })
  }

  export function home_activityupdate(ppl) {
    return request({
      url:'/home_activity/update',
      method:'post',
      data:ppl
    })
  }

  export function home_activityadd(ppl) {
    return request({
      url:'/home_activity/add',
      method:'post',
      data:ppl
    })
  }

  export function home_activitydelete(ppl) {
    return request({
      url:'/home_activity/del',
      method:'post',
      data:ppl
    })
  }
// 每日热卖
export function hotSale(params) {
  return request({
    url:'/product/setting/hot_sale/list',
    method:'get',
    params:params
  })
}
export function hotSaledelete(ppl) {
  return request({
    url:'/product/setting/hot_sale/status',
    method:'post',
    data:ppl
  })
}
export function hotSales(params) {
return request({
  url:'/product/setting/hot_sale/product/list',
  method:'get',
  params:params
})
}
//每周上新

export function weeklyNew(params) {
  return request({
    url:'/seckillActivity/list',
    method:'get',
    params:params
  })
}
export function snapUpRound(params) {
  return request({
    url:'/snapUpRound/list',
    method:'get',
    params:params
  })
}
export function weeklyNewdelete(ppl) {
  return request({
    url:'/seckillActivity/del',
    method:'post',
    data:ppl
  })
}
export function weeklyNewadd(params) {
  return request({
    url:'/seckillActivity/add',
    method:'post',
    params:params
  })
}
export function weeklyNews(params) {
return request({
  url:'/seckillActivity/not_seckill/list',
  method:'get',
  params:params
})
}
//主题商品
export function theme(params) {
  return request({
    url:'/theme/list',
    method:'get',
    params:params
  })
}

export function themeProduct(params) {
  return request({
    url:'/theme/product/list',
    method:'get',
    params:params
  })
}

export function themeProductDelete(ppl) {
  return request({
    url:'/theme/product/cancel',
    method:'post',
    data:ppl
  })
}

export function themeProducts(params) {
  return request({
    url:'/theme/other_product/list',
    method:'get',
    params:params
  })
}

export function themeProductAdd(ppl) {
  return request({
    url:'/theme/product/add',
    method:'post',
    data:ppl
  })
}
//积分专区
export function product(params) {
  return request({
    url:'/product/setting/integral/list',
    method:'get',
    params:params
  })
}

export function productDelete(params) {
  return request({
    url:'/product/setting/integral/status',
    method:'post',
    params:params
  })
}
//爆款推荐

export function faddish(params) {
  return request({
    url:'/product/setting/hot_style/list',
    method:'get',
    params:params
  })
}

export function faddishdelete(params) {
  return request({
    url:'/product/setting/hot_style/status',
    method:'post',
    params:params
  })
}

export function faddishs(params) {
  return request({
    url:'/product/setting/hot_style/product/list',
    method:'get',
    params:params
  })
}
//折扣专区
export function discount(params) {
  return request({
    url:'/product/setting/discount/list',
    method:'get',
    params:params
  })
}
export function discountDelete(params) {
  return request({
    url:'/product/setting/discount/status',
    method:'post',
    params:params
  })
}
//锁商品

export function free_lock(params) {
  return request({
    url:'/free_lock/list',
    method:'get',
    params:params
  })
}
export function free_lockUpdate(ppl) {
  return request({
    url:'/free_lock/update',
    method:'post',
    data:ppl
  })
}
export function free_lockAdd(ppl) {
  return request({
    url:'/free_lock/add',
    method:'post',
    data:ppl
  })
}
export function free_lockDelete(ppl) {
  return request({
    url:'/free_lock/del',
    method:'post',
    data:ppl
  })
}
// 场次商品
export function getGameGoodsList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getGameGoodsList',
    method:'get',
    params:params
  })
}
// 场次商品价格
export function getGamePriceList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getGamePriceList',
    method:'get',
    params:params
  })
}
export function updateGameGoods(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/updateGameGoods',
    method:'post',
    data:ppl
  })
}
export function addGameGoods(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/addGameGoods',
    method:'post',
    data:ppl
  })
}
// 抢购参数管理
export function getGameExchangeConfig(params){
  return request({
    url:"/api/blade-game-admin/admin/web/webGame/ppl/getGameExchangeConfig",
    method:'get',
    params:params
  })
}
export function updateGameExchangeConfig(ppl){
  return request({
    url:"/api/blade-game-admin/admin/web/webGame/ppl/updateGameExchangeConfig",
    method:'post',
    data:ppl
  })
}

// 获取奖励配置
export function getGameRewardConfig(params){
  return request({
    url:"/api/blade-game-admin/admin/web/webGame/ppl/getGameRewardConfig",
    method:'get',
    params:params
  })
}

export function updateGameRewardConfig(ppl){
  return request({
    url:"/api/blade-game-admin/admin/web/webGame/ppl/updateGameRewardConfig",
    method:'post',
    data:ppl
  })
}

// 持有订单管理
export function getGameHoldOrderList(params){
  return request({
    url:"/api/blade-game-admin/admin/web/webGame/ppl/getGameHoldOrderList",
    method:'get',
    params:params
  })
}

export function getGameGoodsInfo(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getGameGoodsInfo',
    method:'get',
    params:params
  })
}
// 预约记录
export function getGamePreList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getGamePreList',
    method:'get',
    params:params
  })
}
// 抢购数据统计
export function getTodayPreReport(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getTodayPreReport',
    method:'get',
    params:params
  })
}
// 新人场抢购数据统计
export function getNewTodayPreReport(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getNewTodayPreReport',
    method:'get',
    params:params
  })
}
// VIP数量
export function getVipCount(){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getVipCount',
    method:'get'
  })
}
// 新增VIP未抢到的抢购
export function addVipGoodsBuy(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/addVipGoodsBuy',
    method:'get',
    params:params
  })
}
// 回收用户订单
export function recycleOrder(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/recycleOrder',
    method:'get',
    params:params
  })
}
// 转售
export function getGameSellOrderList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getGameSellOrderList',
    method:'get',
    params:params
  })
}
// 未付款转售
export function getGameSellOrderListByMember(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getGameSellOrderListByMember',
    method:'get',
    params:params
  })
}
export function updateGameSellOrder(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/updateGameSellOrder',
    method:'post',
    data:ppl
  })
}
export function addGameSellOrder(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/addGameSellOrder',
    method:'post',
    data:ppl
  })
}
export function decomposeGameSellOrder(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/decomposeGameSellOrder',
    method:'post',
    data:ppl
  })
}
//指派订单给指定用户
export function setGameOrderToUser(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/setGameOrderToUser',
    method:'post',
    data:ppl
  })
}
//销毁该订单
export function recoveryOrder(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/recoveryOrder',
    method:'post',
    data:ppl
  })
}
// 交易订单列表
export function getGameOrderList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getGameOrderList',
    method:'get',
    params:params
  })
}
// 交易订单详情
export function getGameOrderInfo(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getGameOrderInfo',
    method:'get',
    params:params
  })
}
// 交易订单详情 -- 申诉
export function setGameOrderAppeal(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/setGameOrderAppeal',
    method:'post',
    data:ppl
  })
}
// 交易订单详情 -- 取消订单
export function setCancelOrder(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/setCancelOrder',
    method:'post',
    data:ppl
  })
}
// 全部订单列表
// export function getGameOrderList(params){
//   return request({
//     url:'/api/blade-game-admin/admin/web/webGame/ppl/getGameOrderList',
//     method:'get',
//     params:params
//   })
// }

//拼团商品
export function group(params) {
  return request({
    url:'/group/buy/list',
    method:'get',
    params:params
  })
}
export function groupUpdate(ppl) {
  return request({
    url:'/group/buy/update',
    method:'post',
    data:ppl
  })
}
// export function buyupdate(ppl) {
//   return request({
//     url:'/group/buy/update',
//     method:'post',
//     data:ppl
//   })
// }
export function groupAdd(ppl) {
  return request({
    url:'/group/buy/add',
    method:'post',
    data:ppl
  })
}
export function getGroupNumList(ppl) {
  return request({
    url:'/group/buy/getGroupNumList',
    method:'post',
    data:ppl
  })
}

export function user(params) {
  return request({
    url:'/group/buy/user',
    method:'get',
    params:params
  })
}

export function userupdate(params) {
  return request({
    url:'/group/buy/user/update',
    method:'get',
    params:params
  })
}
//拼团

export function buy_number(params) {
  return request({
    url:'/group/buy_number/list',
    method:'get',
    params:params
  })
}

export function buy_numberUpdate(ppl) {
  return request({
    url:'/group/buy_number/update',
    method:'post',
    data:ppl
  })
}

export function buy_numberAdd(ppl) {
  return request({
    url:'/group/buy_number/add',
    method:'post',
    data:ppl
  })
}

// 支付方式管理
export function getpaymentList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getpaymentList',
    method:'get',
    params:params
  })
}

// 场次列表
export function getGameTypeList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getGameTypeList',
    method:'get',
    params:params
  })
}

export function updateGameType(ppl) {
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/updateGameType',
    method:'post',
    data:ppl
  })
}

export function updatePayment(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/updatePayment',
    method:'post',
    data:ppl
  })
}

export function addGameType(ppl) {
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/addGameType',
    method:'post',
    data:ppl
  })
}

export function deleteGameType(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/deleteGameType',
    method:'post',
    data:ppl
  })
}

// 每日业绩管理
export function getAchievementDayList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getAchievementDayList',
    method:'get',
    params:params
  })
}

// 总业绩管理
export function getAchievementList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getAchievementList',
    method:'get',
    params:params
  })
}

//支付列表
export function pay_list(params) {
  return request({
    url:'/order/getList',
    method:'get',
    params:params
  })
}

export function pay_add(ppl) {
  return request({
    url:'/order/addPayInfo',
    method:'post',
    data:ppl
  })
}

export function pay_update(ppl) {
  return request({
    url:'/order/updatePayInfo',
    method:'post',
    data:ppl
  })
}

export function pay_delete(ppl) {
  return request({
    url:'/order/delPayInfo',
    method:'post',
   data:ppl
  })
}
// 订单列表--审核
export function handle_audit(ppl) {
  return request({
    url:'/order/verify',
    method:'post',
   data:ppl
  })
}

//抽奖商品
export function lottery(params) {
  return request({
    url:'/lottery/prize/list',
    method:'get',
    params:params
  })
}

export function lotterys(id) {
  return request({
    url:'/lottery/prize/'+id,
    method:'get',
  })
}

export function lotteryUpdate(ppl) {
  return request({
    url:'/lottery/prize/update',
    method:'post',
    data:ppl
  })
}

export function lotteryAdd(ppl) {
  return request({
    url:'/lottery/prize/add',
    method:'post',
    data:ppl
  })
}
export function lotteryDelete(ppl) {
  return request({
    url:'/lottery/prize/del',
    method:'post',
    data:ppl
  })
}
//分润
export function dividends(params) {
  return request({
    url:'/product/dividends/list',
    method:'get',
    params:params
  })
}

export function dividendsAdd(ppl) {
  return request({
    url:'/product/dividends/add',
    method:'post',
    data:ppl
  })
}
export function dividendsUpdate(ppl) {
  return request({
    url:'/product/dividends/update',
    method:'post',
    data:ppl
  })
}
export function dividendsDelete(ppl) {
  return request({
    url:'/product/dividends/del',
    method:'post',
    data:ppl
  })
}
//分润股东
export function shareholder(params) {
  return request({
    url:'/product/dividends/shareholder/list',
    method:'get',
    params:params
  })
}

export function shareholderAdd(ppl) {
  return request({
    url:'/product/dividends/shareholder/add',
    method:'post',
    data:ppl
  })
}
export function shareholderUpdate(ppl) {
  return request({
    url:'/product/dividends/shareholder/update',
    method:'post',
    data:ppl
  })
}
export function shareholderDelete(ppl) {
  return request({
    url:'/product/dividends/shareholder/del',
    method:'post',
    data:ppl
  })
}
//商品利润模板
export function distribution(params) {
  return request({
    url:'/product/distribution/profit/list',
    method:'get',
    params:params
  })
}

export function distributionAdd(ppl) {
  return request({
    url:'/product/distribution/profit/add',
    method:'post',
    data:ppl
  })
}
export function distributionUpdate(ppl) {
  return request({
    url:'/product/distribution/profit/update',
    method:'post',
    data:ppl
  })
}
export function distributionDelete(ppl) {
  return request({
    url:'/product/distribution/profit/del',
    method:'post',
    data:ppl
  })
}
export function distributions(id) {
  return request({
    url:'/product/distribution/profit/'+id,
    method:'get',
  })
}
//国庆活动

export function activityStatus(params) {
  return request({
    url:'/product/setting/activity_status/list',
    method:'get',
    params:params
  })
}

export function activityStatued(params) {
  return request({
    url:'/product/setting/activity_status/product/list',
    method:'get',
    params:params
  })
}

export function statusadd(params) {
  return request({
    url:'/product/setting/activity_status/status',
    method:'post',
    params:params

  })
}
//奖励
export function awardSetting(params) {
  return request({
    url:'/awardSetting/detail',
    method:'get',
    params:params
  })
}
export function awardSettingAdd(ppl) {
  return request({
    url:'/awardSetting/add',
    method:'post',
    data:ppl
  })
}
export function awardSettingUpdate(ppl) {
  return request({
    url:'/awardSetting/update',
    method:'post',
    data:ppl
  })
}

export function awardSettingDelete(ppl) {
  return request({
    url:'/awardSetting/del',
    method:'post',
    data:ppl
  })
}

export function notJackpot(params) {
  return request({
    url:'/group/buy/user/notJackpot',
    method:'get',
    params:params
  })
}
//会议
export function metting(params) {
  return request({
    url:'/metting/list',
    method:'get',
    params:params
  })
}
export function mettingAdd(ppl) {
  return request({
    url:'/metting/add',
    method:'post',
    data:ppl
  })
}
export function mettingUpdate(ppl) {
  return request({
    url:'/metting/update',
    method:'post',
    data:ppl
  })
}
export function mettingDelete(ppl) {
  return request({
    url:'/metting/del',
    method:'post',
    data:ppl
  })
}
export function mettings(id) {
  return request({
    url:'/metting/detail/'+id,
    method:'get',
  })
}
export function mettingUser(params) {
  return request({
    url:'/mettingUser/list',
    method:'get',
    params:params
  })
}
export function expor(params) {
  return request({
    url:'/mettingUser/export',
    method:'get',
    params:params
  })
}
export function mettingUserDelete(ppl) {
  return request({
    url:'/mettingUser/del',
    method:'post',
    data:ppl
  })
}
export function mettingUserupdate(ppl) {
  return request({
    url:'/mettingUser/update',
    method:'post',
    data:ppl
  })
}
//广告
export function advert(params) {
  return request({
    url:'/advert/param/list',
    method:'get',
    params:params
  })
}
export function advertAdd(ppl) {
  return request({
    url:'/advert/param/add',
    method:'post',
    data:ppl
  })
}
export function advertUpdate(ppl) {
  return request({
    url:'/advert/param/update',
    method:'post',
    data:ppl
  })
}
export function advertDelete(ppl) {
  return request({
    url:'/advert/param/del',
    method:'post',
    data:ppl
  })
}
export function adverts(id) {
  return request({
    url:'/advert/param/detail/'+id,
    method:'get',
  })
}
//广告类型
export function advertlx(params) {
  return request({
    url:'/advert/type/list',
    method:'get',
    params:params
  })
}
export function advertlxAdd(ppl) {
  return request({
    url:'/advert/type/add',
    method:'post',
    data:ppl
  })
}
export function advertlxUpdate(ppl) {
  return request({
    url:'/advert/type/update',
    method:'post',
    data:ppl
  })
}
export function advertlxDelete(ppl) {
  return request({
    url:'/advert/type/del',
    method:'post',
    data:ppl
  })
}
export function advertlxs(id) {
  return request({
    url:'/advert/type/detail/'+id,
    method:'get',
  })
}
//拼团卡会员
export function getGroupCardInfo(params) {
  return request({
    url:'/group/card/info/list',
    method:'get',
    params:params
  })
}
export function updateCardType(ppl) {
  return request({
    url:'/group/card/type/update',
    method:'post',
    data:ppl
  })
}
//拼团卡类型
export function cardlist(params) {
  return request({
    url:'/group/card/type/list',
    method:'get',
    params:params
  })
}
export function updatecardlist(ppl) {
  return request({
    url:'/group/card/type/update',
    method:'post',
    data:ppl
  })
}
//拼团设置
export function selectSettingint(params) {
  return request({
    url:'/group/setting',
    method:'get',
    params:params
  })
}
export function updateSetting(ppl) {
  return request({
    url:'/group/setting/update',
    method:'post',
    data:ppl
  })
}

export function luckyAmount(params) {
  return request({
    url:'/group/buy/luckyAmount',
    method:'get',
    params:params
  })
}
export function dailyLuckyDividend(params) {
  return request({
    url:'/group/buy/dailyLuckyDividend',
    method:'post',
    params:params
  })
}
//机器人

export function unpdateRobot(params) {
  return request({
    url:'/group/buy/robot',
    method:'get',
    params:params
  })
}
//拼团机器人资金池余额
export function robotPool(params) {
  return request({
    url:'/group/buy/robotPool',
    method:'get',
    params:params
  })
}

//相册管理
export function getAllList(params) {
  return request({
    url:'/community/alubm/getAllList',
    method:'post',
    params:params
  })
}

export function getAlubmInfo(params) {
  return request({
    url:'/community/alubm/getAlubmInfo',
    method:'post',
    params:params
  })
}
export function getProductList(params) {
  return request({
    url:'/product/getProductList',
    method:'post',
    params:params
  })
}
export function getProductBuyId(params) {
  return request({
    url:'/group/buy/getProductBuyId',
    method:'post',
    params:params
  })
}
export function setAlubmInfo(ppl) {
  return request({
    url:'/community/alubm/setAlubmInfo',
    method:'post',
    data:ppl
  })
}
export function updateAlubmInfo(ppl) {
  return request({
    url:'/community/alubm/updateAlubmInfo',
    method:'post',
    data:ppl
  })
}
export function deleteAlubmInfo(params) {
  return request({
    url:'/community/alubm/deleteAlubmInfo',
    method:'post',
    params:params
  })
}


//助农社区
export function comment(params) {
  return request({
    url:'/comment/list',
    method:'get',
    params:params
  })
}
export function commentinfor(id) {
  return request({
    url:'/comment/'+id,
    method:'get',
  })
}
export function commentupdate(params) {
  return request({
    url:'/comment/update',
    method:'post',
    params:params
  })
}
export function addTaskTimes(params) {
  return request({
    url:'/community/task/addTaskTimes',
    method:'post',
    params:params
  })
}
//任务中心
export function configs(params) {
  return request({
    url:'/community/task/configs',
    method:'get',
    params:params
  })
}

export function configsupdate(ppl) {
  return request({
    url:'/community/task/config/update',
    method:'post',
    data:ppl
  })
}
export function histories(params) {
  return request({
    url:'/community/task/histories',
    method:'get',
    params:params
  })
}
//

export function getGroupTypeList(params) {
  return request({
    url:'/group/buy/getGroupTypeList',
    method:'post',
    params:params
  })
}
export function getGroupNumberList(params) {
  return request({
    url:'/group/buy/getGroupNumberList',
    method:'post',
    params:params
  })
}
export function getGroupbyGoodsList(params) {
  return request({
    url:'/group/buy/getGroupbyGoodsList',
    method:'get',
    params:params
  })
}
export function getGroupbyGoodsInfo(ppl) {
  return request({
    url:'/group/buy/getGroupbyGoodsInfo',
    method:'post',
    data:ppl
  })
}
//拍拍乐封号列表
export function getForbiddenUserList(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getForbiddenUserList',
    method:'post',
    data:ppl
  })
}
//拍拍乐封号解封
export function unsealUser(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/unsealUser',
    method:'post',
    data:ppl
  })
}

export function getAmountListProperty(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getAmountListProperty',
    method:'get',
    params:params
  })
}

export function getAmountListProperty1(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getAmountListProperty1',
    method:'get',
    params:params
  })
}
export function getAmountTypeListProperty(params){
  return request({
    url: '/api/blade-game-admin/admin/web/webGame/ppl/getAmountTypeListProperty',
    method:'get',
    params:params
  })
}
export function getCompletePoolList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getCompletePoolList',
    method:'get',
    params:params
  })
}
export function deleteCompletePool(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/deleteCompletePool',
    method:'post',
    data:ppl
  })
}
export function addCompletePool(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/addCompletePool',
    method:'post',
    data:ppl
  })
}
export function getCompleteSplitList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getCompleteSplitList',
    method:'get',
    params:params
  })
}
export function deleteCompleteSplit(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/deleteCompleteSplit',
    method:'post',
    data:ppl
  })
}
export function addCompleteSplit(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/addCompleteSplit',
    method:'post',
    data:ppl
  })
}
export function getUserByPoolList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getUserByPoolList',
    method:'get',
    params:params
  })
}
export function getPreMemberCount(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getPreMemberCount',
    method:'post',
    data:ppl
  })
}
export function getBuyCompleteListProperty(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getBuyCompleteListProperty',
    method:'post',
    data:ppl
  })
}
export function getCompletePoolConfigList(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getCompletePoolConfigList',
    method:'get',
    params:params
  })
}
export function updateCompletePoolConfig(ppl){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/updateCompletePoolConfig',
    method:'post',
    data:ppl
  })
}
export function getDataInfo(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getDataInfo',
    method:'get',
    params:params
  })
}

export function getNoPayMemberInfo(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getNoPayMemberInfo',
    method:'get',
    params:params
  })
}

export function getPreInfoPage(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getPreInfoPage',
    method:'get',
    params:params
  })
}

export function getUmsInfo(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/getUmsInfo',
    method:'get',
    params:params
  })
}

export function findOrderCount(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/findOrderCount',
    method:'get',
    params:params
  })
}

export function listGoods(params){
  return request({
    url:'/api/blade-game-admin/admin/web/webGame/ppl/listGoods',
    method:'post',
    params:params
  })
}

