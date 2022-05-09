<template>
  <div>
    <!-- 表格 -->
   <el-table style="width: 100%" border :data="records">
     <el-table-column type="index" prop="prop" label="序号" align="center" width="80">
     </el-table-column>
     <el-table-column prop="skuName" label="名称" width="width">
     </el-table-column>
     <el-table-column prop="skuDesc" label="描述" width="width">
     </el-table-column>
     <el-table-column prop="prop" label="默认图片" width="110">
       <template slot-scope="{row}">
         <img :src="row.skuDefaultImg" alt="" style="width:80px;height:80px">
       </template>
     </el-table-column>
     <el-table-column prop="weight" label="重量" width="80">
     </el-table-column>
     <el-table-column prop="price" label="价格" width="80">
     </el-table-column>
     <el-table-column prop="prop" label="操作" width="width">
       <template slot-scope="{row}">
         <el-button type="success" size="mini" icon="el-icon-sort-down" v-if="row.isSale == 0" @click="cancel(row)"></el-button>
         <el-button type="success" size="mini" icon="el-icon-sort-up" v-else @click="sale(row)"></el-button>
         <el-button type="primary" size="mini" icon="el-icon-edit" ></el-button>
         <el-button type="info" size="mini" icon="el-icon-info" @click="getSkuInfo(row)"></el-button>
         <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
       </template> size="mini"
     </el-table-column>
   </el-table>
   <!-- 分页器 @size-change="handleSizeChange"
      @current-change="handleCurrentChange"   -->
    <el-pagination
      @current-change="getSkuList"
      @size-change="handleSizeChange"
      style="text-algin:center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout=" prev, pager, next, jumper,->,sizes,total"
      :total="20">
    </el-pagination>
    <!-- 抽屉效果 -->
   <el-drawer  :visible.sync="show" :show-close="false" size="50%">
      <el-row>
      <el-col :span="5">名称</el-col>
      <el-col :span="16">{{skuInfo.skuName}}</el-col>
    </el-row>
       <el-row>
      <el-col :span="5">描述</el-col>
      <el-col :span="16">{{skuInfo.skuDesc}}</el-col>
    </el-row>
       <el-row>
      <el-col :span="5">价格</el-col>
      <el-col :span="16">{{skuInfo.price}}元</el-col>
    </el-row>
       <el-row>
      <el-col :span="5">平台属性</el-col>
      <el-col :span="16">
        <template>
            <el-tag type="success" v-for="attr in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right:10px">{{attr.attrId}}-{{attr.valueId}}</el-tag>
        </template>
      </el-col>
    </el-row>
       <el-row>
      <el-col :span="5">商品图片</el-col>
      <el-col :span="16">
        <el-carousel height="150px">
         <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">  
               <img :src="item.imgUrl">
        </el-carousel-item>
    </el-carousel>
      </el-col>
    </el-row>
    </el-drawer>
  </div>
</template>

<script>
 export default {
 name : 'Sku',
 data(){
   return {
     page:1,
     limit:10,
     records:[],//存储sku列表的数据
     total:0, //一共展示的数据
     skuInfo:{
     },
     show:false //抽屉框
     
   }
 },
 mounted(){
   this.getSkuList()
   this.show = false
 },
 methods:{
  async getSkuList(pages = 1) {
      this.page = pages;
      //解构出默认的参数
      const { page, limit } = this;
      let result = await this.$API.sku.reqSkuList(page, limit);
      if (result.code == 200) {
        this.total = result.data.total;
        this.records = result.data.records;
      }
   },
   //分页器
   handleSizeChange(limit){
     this.limit = limit
     this.getSkuList()
   },
   //上架
  async sale(row){
   let result = await this.$API.sku.reqSale(row.id)
   if (result.code == 200) {
     row.isSale = 0
     this.$message({type:'success',message:'上架成功'})
   }
   },
   async cancel(row){
    let result = await this.$API.sku.reqCancel(row.id)
    if (result.code == 200) {
      row.isSale = 1
      this.$message({type:'success',message:'下架成功'})
    }
   },
    async getSkuInfo(sku){
      //展示抽屉
      this.show = true;
      //获取SKU数据
      let result = await this.$API.sku.reqSkuById(sku.id);
      console.log(result);
      if(result.code==200){
         this.skuInfo = result.data;
      }
      }
      }
    }
</script>

<style>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>

<style scoped>
   .el-row .el-col-5{
      font-size:18px;
      text-align:right;
   }
   .el-col{
     margin:10px 10px;
   }

   .el-carousel__button{
    width:10px;
    height:10px;
    background:red;
    border-radius:50%;
  }
</style>