import request from '@/utils/request';

//获取SPU列表数据的接口
///admin/product/{page}/{limit}   get   page limit category3Id
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } });

//获取spu信息
export const reqSpu = (spuId) => request({url:`/admin/product/getSpuById/${spuId}`,method:'get'})

//获取商品品牌信息
export const reqTradeMarkList = ()=>request({url:'/admin/product/baseTrademark/getTrademarkList',method:'get'})
 //获取图片请求
export const reqSpuImageList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'}) 
//获取整个平台的销售属性
// /admin/product/baseSaleAttrList
export const reqbaseSaleAttrList = ()=>request({url:'/admin/product/baseSaleAttrList',method:'get'})