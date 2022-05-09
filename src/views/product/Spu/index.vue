<template>
  <div>
    <!-- 三级分类 -->
    <el-card style="margin: 0 20px">
      <CategorySelect @getCategoryId="getCategoryId" :show="scene!==0">
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
            <template slot-scope="{ row}">
              <el-button
                type="success"
                icon="el-icon-check"
                size="mini"
                title="添加spu"
                @click="addSku(row)"
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
                @click="handler(row)"
              ></el-button>
              <el-popconfirm
  title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">  <el-button  slot="reference"  type="danger"  icon="el-icon-delete"  size="mini" ></el-button> </el-popconfirm>

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
      <SkuForm v-show="scene==2" ref="sku" @changeScenes="changeScenes"></SkuForm>
    </el-card>
    <el-dialog :title="`${spu.spuName}`" :visible.sync="dialogTableVisible"
    :before-close="close"
    >
  <el-table :data="skuList"  style="width:1000px;" border v-loading="loading">
    <el-table-column prop="skuName" label="名称" width="150"></el-table-column>
    <el-table-column prop="price" label="价格" width="200"></el-table-column>
    <el-table-column prop="weight" label="重量"></el-table-column>
    <el-table-column  label="默认图片">
      <template slot-scope="{row}">
        <img :src="row.skuDefaultImg" style="width:100px;height:100px">
      </template>
    </el-table-column>
  </el-table>
</el-dialog>
  </div>
</template>

<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'
export default {
  name: "Spu",
  data() {
    return {
      category2Id: "",
      category1Id: "",
      category3Id: "",
      page:1,
      limit:3,
      total:0, //数据总数
      records:[],//列表的数据
      scene:0,  //0spu 1修改 2添加sku
      dialogTableVisible:false, //sku对话框
      spu : {}, //保存spu的信息
      skuList:[], //存储的是sku列表的数据
      loading:true,
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
     //通知spuform发送请求--两个,操作子组件里得方法
     this.$refs.spu.addSpuDate(this.category3Id)
     //传入三级分类得id

},
   //修改spu
   updateSpu(row){
     this.scene=1
     //获取组件的实例对象，并对其里面的方法进行操作
     this.$refs.spu.initSpudate(row)
   },
   //子组件点击取消以后的回调
   changeScene({scene,flag}){
     //切换结构
     this.scene = scene
     //更新保存修改的值
     console.log(flag);
    if (flag=='修改') {
      this.getSpuList(this.page)
    }
    else {
      this.getSpuList()
    }
   },
   //删除spu的回调
  async deleteSpu(row){
   let result = await this.$API.spu.reqDeleteSpu(row.id)
   if (result.code==200) {
     this.$message({type:'success',message:'删除成功'})
       //如果spu个数小于1回到上一页大于一回到当前页
     this.getSpuList(this.records.length > 1 ? this.page : this.page - 1)
   }
   },
   //添加sku的回调
   addSku(row){
     //切换场景为2
     this.scene = 2
    //调用子组件的方法
    this.$refs.sku.getData(this.category1Id,this.category2Id,row)
   },
   //切换场景
   changeScenes(scene){
     this.scene = scene
   },
   //查看sku按钮的回调
  async handler(spu){
     this.dialogTableVisible = true
     this.spu = spu
     let result = await this.$API.spu.reqSkuList(spu.id)
     console.log(result);
     if (result.code == 200) {
       this.skuList = result.data
       this.loading = false
     }
   },
   close(done){
     //loding属性切换
     this.loading = true
     //清楚sku的数据
     this.skuList = []
     done()
   }
  },
};
</script>

<style>
</style>