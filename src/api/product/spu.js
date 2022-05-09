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

//修改spu或者添加spu 携带的参数大致一样，携带的参数是否带id

export const reqAddOrUpdateSpu = (spuInfo) =>{
    //如果带id就是修改
    if (spuInfo.id) {
        return request({url:'/admin/product/updateSpuInfo',method:'post',data:spuInfo})
    }
    //如果不带id就是添加
    else{
        return request({url:'/admin/product/saveSpuInfo',method:'post',data:spuInfo})
    }
}
//删除spu
//admin/product/deleteSpu/{spuId}

export const reqDeleteSpu = (spuId)=>request({url:`admin/product/deleteSpu/${spuId}`,method:'delete'})



//获取图片的数据
export const reqSkuImageList = (spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:'get'})

//获取销售属性列表
export const reqSkuSaleAttrList = (spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})

//获取平台属性的数据
export const reqAttrInfoList = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`})

// 添加sku
export const reqAddSku = (skuInfo)=>request({url:`/admin/product/saveSkuInfo`,method:'post',data:skuInfo})

//获取sku列表数据

export const reqSkuList = (spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})
