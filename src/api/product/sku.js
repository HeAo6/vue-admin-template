import request from '@/utils/request'

//  sku列表的接口
export const reqSkuList = (page,limit)=>request({url:`/admin/product/list/${page}/${limit}`,method:'get'})

//上架的接口
export const reqSale = (skuId)=>request({url:`/admin/product/onSale/${skuId}`,method:'get'})

//下架的接口
export const reqCancel = (skuId)=>request({url:`/admin/product/cancelSale/${skuId}`,method:'get'})

//查看sku详情

export const reqSkuById = (skuId)=>request({url:`/admin/product/getSkuById/${skuId}`,method:'get'})