//获取品牌管理数据模块
import request from '@/utils/request'

// 获取商品列表并对外暴露
export const reqTradeMarkList = (page,limit) => request({
    url :`/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
})


// 处理添加品牌
// 新增品牌: /admin/product/baseTrademark/save    post请求 携带两个参数名称和图片
// 对于新增品牌，不需要传递id，由服务器生成

// 修改品牌操作
// 地址 /admin/product/baseTrademark/update put请求

export const  reqAddOrUpdateTradeMark = (tradeMark) =>{
    //如果带给服务器的数据含id就是修改
    if (tradeMark.id) {
         return request({url:'/admin/product/baseTrademark/update',method:'put',data:tradeMark})
    }
    else {
        //新增商品
        return request({url:'/admin/product/baseTrademark/save',method:'post',data:tradeMark})
    }
    
}


//删除品牌接口

export const reqDeleteTradeMark = (id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})