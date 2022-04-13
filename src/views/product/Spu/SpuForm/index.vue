<template>
  <div>
      <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="Spu名称">
    <el-input v-model="spu.spuName" placeholder="SPU名称" ></el-input>
  </el-form-item>
  <el-form-item label="品牌 ">
    <el-select v-model="form.region" placeholder="请选择品牌">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="活动形式">
    <el-input type="textarea" v-model="form.desc" rows="4" placeholder="请输入品牌描述"></el-input>
  </el-form-item>
  <el-form-item label="SPU图片">
      <el-upload
  action="https://jsonplaceholder.typicode.com/posts/"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove">
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
  </el-form-item>
  <el-form-item label="销售属性">
     <el-select  placeholder="销售属性">
         <el-option>
         </el-option>
     </el-select> 
     <el-button type="primary">添加销售属性</el-button>
     <el-table style="width: 100%" border>
        <el-table-column header-align="center" align="center" type="index" label="序号" width="100" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="value" label="属性名" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="value" label="属性值名称列表" ></el-table-column>
        <el-table-column header-align="center" align="center" prop="value" label="操作" >
         </el-table-column>
     </el-table>
  </el-form-item>
  <el-form-item>
      <el-button type="primary">保存</el-button>
      <el-button @click="$emit('changeScene',0)">取消</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>

export default {
name:'SpuForm',
data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
         dialogImageUrl: '',
        dialogVisible: false,
        spu:{},
        TradeMarkList:[],
        SpuImageList:[],
        SaleAttrList:[]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
       handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //初始化spuFrom请求
     async initSpudate(spu){
          //获取spu信息的数据
        let spuResult = await this.$API.spu.reqSpu(spu.id)
        if (spuResult.code===200) {
            this.spu = spuResult.data
        }
        let TradeMarkList = await this.$API.spu.reqTradeMarkList()
        if (TradeMarkList.code===200) {
            this.TradeMarkList = TradeMarkList.data
        }
        let SpuImageList = await this.$API.spu.reqSpuImageList(spu.id)
        if (SpuImageList.code===200) {
            this.SpuImageList = SpuImageList.data
        }
        let SaleAttrList = await this.$API.spu.reqbaseSaleAttrList()
        if (SaleAttrList.code===200) {
            this.SaleAttrList = SaleAttrList.data
        }
        console.log(spuResult,TradeMarkList,SpuImageList,SaleAttrList);
      }
    }
  
}
</script>

<style>

</style>