<template>
  <div>
    <!-- 三级分类 -->
    <el-card style="margin: 0 20px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!show">
      </CategorySelect>
    </el-card>
    <el-card>
      <!-- 将来会有三部分进行切换 -->
      <div v-show="scene==0">
        <el-button type="primary" :disabled="!category3Id" @click="addSpu">添加SPU属性</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width" >
          </el-table-column>
          <el-table-column prop="description" label="SKU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="success"
                icon="el-icon-check"
                size="mini"
                title="添加spu"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-star-off"
                size="mini"
                @click="updateSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-message"
                size="mini"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  @current-change = "handleCurrentChange"
      @size-change = "changeSize" -->
        <el-pagination
      style="margin-top:20px; textAlign:center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :total="total"
      :pager-count = "7"
      layout="prev,pager, next, jumper,sizes,total" 
      @current-change = "getSpuList"
      @size-change = "changeSize"
    >
    </el-pagination>
      </div>
       <SpuForm v-show="scene==1" @changeScene="changeScene" ref="spu"></SpuForm>
      <SkuForm v-show="scene==2"></SkuForm>
    </el-card>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: "Spu",
  data() {
    return {
      show: true,
      category2Id: "",
      category1Id: "",
      category3Id: "",
      page:1,
      limit:3,
      total:0, //数据总数
      records:[],//列表的数据
      scene:0,  //0spu 1修改 2 添加sku
    };
  },
  components:{
    SpuForm,
    SkuForm
  },
  methods: {
    //三级联动的自定义事件，把三级分类的id传给父组件
    getCategoryId({ categoryId, level }) {
      //获取一级二级三级分类的id,为了区分几级id
      if (level == 1) {
        this.category1Id = categoryId;
        //清楚二三级id
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        //三级id
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        //获取spu列表进行展示
        this.getSpuList();
      }
    },
    //获取spu列表的回调
   async getSpuList(pages = 1) {
      this.page=pages
      const {page,limit,category3Id} = this
     const result = await this.$API.spu.reqSpuList(page,limit,category3Id)
      if (result.code===200) {
        this.total = result.data.total
        this.records = result.data.records
      }
    },
    //分页器数目
   changeSize(limit){
     //修改新传进来的参数分页器数目
     this.limit = limit
     //重新发送请求
     this.getSpuList()
   },
   //添加spu按钮的回调
   addSpu(){
     this.scene=1
   },
   //修改spu
   updateSpu(row){
     this.scene=1
     //获取组件的实例对象，并对其里面的方法进行操作
     this.$refs.spu.initSpudate(row)
   },
   //子组件点击取消以后的回调
   changeScene(scene){
     //切换结构
     this.scene = scene
   }
  },
};
</script>

<style>
</style>