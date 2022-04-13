//平台属性管理模块的请求

import request from '@/utils/request'

// 获取一级分类

export const reqCategory1List = ()=>request({url:'/admin/product/getCategory1',method:'get'})


// 获取二级分类

export const reqCategory2List = (category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`,method:'get'})

// 获取三级分类

export const reqCategory3List = (category2Id)=>request({url:`/admin/product/getCategory3/${category2Id}`,method:'get'})

// 获取平台属性接口 put

export const reqAttrList = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:'get'})

// 添加属性接口

export const reqAddAttr = (data)=>request({url:'/admin/product/saveAttrInfo',method:'post',data})

/*{
    "attrName": "string",
    "attrValueList": [
      {
        "attrId": 0,
        "id": 0,
        "valueName": "string"
      }
    ],
    "categoryId": 0,
    "categoryLevel": 0,
    "id": 0
  }*/