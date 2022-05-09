<template>
  <div>
     <el-form ref="form"  label-width="80px">
       <el-form-item label="SPU名称">
         {{spu.spuName}}
       </el-form-item>
        <el-form-item label="SPU名称">
          <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
       </el-form-item>
        <el-form-item label="价格(元)">
          <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price" ></el-input>
       </el-form-item>
        <el-form-item label="重量(kg)">
          <el-input placeholder="重量(kg)" v-model="skuInfo.weight"></el-input>
       </el-form-item>
        <el-form-item label="规格描述">
          <el-input type="textarea" rows="4" placeholder="规格描述" v-model="skuInfo.skuDesc"></el-input>
       </el-form-item>
       <el-form-item label="平台属性">
        <el-form  :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValueId" >
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
       </el-form-item>
       <el-form-item label="销售属性">
        <el-form  :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId" >
              <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="saleAttrValue in saleAttr.saleAttrValueList" :key="saleAttrValue.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
       </el-form-item>
       <el-form-item label="图片列表">
         <el-table :data="spuImageList" @selection-change="handleSelectionChange"
           style="width: 100%">
           <el-table-column  type="selection"   prop="prop" width="80"> </el-table-column>
             <el-table-column  prop="prop"  label="图片"  width="width">
               <template slot-scope="{row}">
                 <img :src="row.imgUrl" style="width:100px; height:100px">
               </template>
             </el-table-column>
             <el-table-column  prop="imgName"  label="名称"  width="width"> </el-table-column>
             <el-table-column prop="prop" label="操作" width="width">
               <template slot-scope="{row}">
              <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">设置默认</el-button>
                <el-button v-else>默认</el-button>
                </template>
           </el-table-column>
         </el-table>
       </el-form-item>
       <el-form-item>
       <el-button type="primary" @click="save">保存</el-button>
       <el-button @click="cancel">取消</el-button>
       </el-form-item>
     </el-form>
  </div>
</template>

<script>
export default {
 name:'skuForm',
 data(){
   return {
     //存储图片信息
      spuImageList:[],
    //存储销售属性
      spuSaleAttrList:[],
    //存储平台属性信息
      attrInfoList:[],
    // 收集sku数据的字段
      skuInfo:{
        //第一类收集的数据，父组件给的数据
        category3Id:0,
        spuId:0,
        tmId:0,
        //第二类通过数据双向绑定的数据
        skuName:'',
        price:0,
        weight:'',
        skuDesc:'',
        //第三类数据需要自己写代码
          //默认展示图片的数据
          skuDefaultImg:'',
          //收集图片的字段
          skuImageList:[],
          //平台属性收集
         skuAttrValueList:[],
          //销售属性收集
         skuSaleAttrValueList:[]

      },
      spu:{},
      //收集图片的数据字段
      imgList:[],
   }
 },
 methods:{
   //获取sku数据
  async getData(category1Id,category2Id,spu){
    //收集父组件传来的数据
    this.skuInfo.category3Id=spu.category3Id
    this.skuInfo.spuId = spu.id
    this.skuInfo.tmId = spu.tmId
    this.spu = spu
      //获取图片的数据
     const result = await this.$API.spu.reqSkuImageList(spu.id)
    if (result.code==200) {
      let list = result.data
      list.forEach(item => {
        item.isDefault = 0
      });
       this.spuImageList = list
    }

       //获取销售属性的数据
     const result1 = await this.$API.spu.reqSkuSaleAttrList(spu.id)
     if (result1 == 200) {
       this.spuSaleAttrList = result1.data
     }

     //获取平台属性的数据
     const result2 = await this.$API.spu.reqAttrInfoList(category1Id,category2Id,spu.category3Id)
     if (result2.code == 200) {
       this.attrInfoList = result2.data
     }
   },
    //table选中的数据
    handleSelectionChange(val){
      //用户中收集到的图片列表对象缺少isDefault字段
      this.imgList = val
    },
    //排他思想
    changeDefault(row){
      //图片列表的isDefault字段变为0
      this.spuImageList.forEach(item=>{
        item.isDefault = 0
      })
      //点击的图片数据变为1
      row.isDefault = 1
      //收集默认图片地址
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    //取消按钮
    cancel(){
      //自定义事件通知父组件通知场景为0
      this.$emit('changeScenes',0)
      //清除数据
     Object.assign(this._data,this.$options.data())
    },
  async save(){
      //整理收集到的平台属性的Id
       const {attrInfoList,skuInfo,spuSaleAttrList,imgList} = this
         //当前平台属性进行了选择
         
          //整理arrtId和valueId
          skuInfo.skuAttrValueList = attrInfoList.reduce((prev,item)=>{
            if (item.attrIdAndValueId) {
              const [attrId,valueId] = item.attrIdAndValueId.split(':')
              let obj = {attrId,valueId}              
              prev.push(obj)
            }
              return prev
          },[])
          //整理销售属性
        skuInfo.skuSaleAttrValueList = spuSaleAttrList.reduce((prev,item)=>{
           if (item.attrIdAndValueId) {
             const [saleAttrId,saleAttrValueId] = item.attrIdAndValueId.split(":")
             prev.push({saleAttrId,saleAttrValueId})
           }
           return prev
         },[])
         //整理图片的数据
         skuInfo.skuImageList = imgList.map(item=>{
           return {
             imgName : item.imgName,
             imgUrl : itme.imgUrl,
             isDefault : item.isDefault,
             spuImgId : item.id,
           }
         })
         //发送请求
          let result  = await this.$API.spu.reqAddSku(skuInfo);
     if(result.code==200){
        this.$message({type:'success',message:'添加SKU成功'})
        this.$emit('changeScenes',0);
     }
    }
 }
}
</script>

<style scoped>

</style>