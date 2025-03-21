import request from '@/router/axios';

//导出excel
export const reqExportPayOrder = (params) => {
    return request({
        url: '/api/blade-mch/mch/web/mall/orderQuery/exportPayOrder',
        method: 'get',
        params: params
    })
}
//导入excel
export const reqImportPayOrder = (row, merchantId) => {
    return request({
        url: `/api/blade-mch/mch/web/mall/orderQuery/importPayOrder?merchantId=${merchantId}`,
        method: 'post',
        data: row
    })
}
// export const reqImportPayOrder = (row, merchantId) => {
//     return request({
//         url: `/api/blade-mch/mch/web/mall/orderQuery/importPayOrder?merchantId=2`,
//         method: 'post',
//         data: row
//     })
// }