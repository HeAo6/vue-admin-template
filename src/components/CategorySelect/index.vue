<template>
  <div>
    <!-- inline:代表的是行内表单，代表一行可以放置多个表单元素 -->
    <el-form :inline="true" class="demo-form-inline" :model="cForm">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择"
         @change="handler1" 
         v-model="cForm.category1Id"
         :disabled="show"
         >
          <el-option 
          :label="c1.name"
           :value="c1.id" 
           v-for="(c1,index) in list1" 
           :key="c1.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select placeholder="请选择" 
        @change="handler2"
        v-model="cForm.category2Id"
        :disabled="show">
          <el-option 
          :label="c2.name" 
          :value="c2.id" 
          v-for="(c2,index) in list2" 
          :key="c2.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select placeholder="请选择" v-model="cForm.category3Id" @change="handler3" :disabled="show">
          <el-option :Llabel="c3.name" :value="c3.id" v-for="(c3,index) in list3" :key="c3.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  //组件挂载完毕，向服务器发请求，获取相应的一级分类的数据
  props:['show'],
  data(){
    return{
  //一级分类数据
  list1:[],
  list2:[],
  list3:[],
  //收集相应的一级二级三级的分类的id
  cForm:{
    category1Id:'',
    category2Id:'',
    category3Id:''
  }
    }
  },
  mounted(){
    this.getCategory1List()
  },
  methods:{
   async getCategory1List(){
      //获取一级分类的请求，不需要携带数据
  let result = await this.$API.attr.reqCategory1List()
  if (result.code == 200) {
    this.list1 = result.data
  }
    },
    // 一级分类事件的回调(当一级发生变化的时候获取相应的二级分类的数据)
  async handler1(){
    //清除数据
    this.list2=[]
    this.list3=[]
    this.cForm.category2Id=''
    this.cForm.category3Id=''
      const  { category1Id } = this.cForm
      // 传给父组件Id值
      this.$emit('getCategoryId',{categoryId:category1Id,level:1})
     let result= await this.$API.attr.reqCategory2List(category1Id)
   
    if (result.code== 200) {
           this.list2 = result.data
          

    }
},
  //二级事件回调
  async handler2(){
    // 清空数据
    this.list3 = [];
    this.cForm.category3Id = "";
  const {category2Id} = this.cForm
   this.$emit('getCategoryId',{categoryId:category2Id,level:2})
  let result = await this.$API.attr.reqCategory3List(category2Id)
  if (result.code == 200) {
    this.list3 = result.data
  }
},
 //三级事件回调
handler3(){
//  获取三级分类的Id
 const {category3Id} = this.cForm
  this.$emit('getCategoryId',{categoryId:category3Id,level:3})
}
  }
};
</script>

<style>
</style>