<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="Spu名称">
        <el-input v-model="spu.spuName" placeholder="SPU名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="(tm, index) in TradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input
          type="textarea"
          v-model="spu.description"
          rows="4"
          placeholder="请输入品牌描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <!-- 上传图片 action图片上传的地址 -->
        <!-- file-list是里面数组需要有name和url属性 
        on-preview当图片预览时的函数
        -->
        <el-upload :file-list="SpuImageList" action="/dev-api/admin/product/fileUpload" list-type="picture-card" :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove" :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择销售属性`" v-model="attrIdandAttrName">
          <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="(unselect,index) in unSelectSaleAttr" :key="unselect.id"> </el-option>
        </el-select>
        <el-button type="primary" :disabled="!attrIdandAttrName" @click="addSaleAttr">添加销售属性</el-button>
        <!-- 展示属于自己的 销售属性 -->
        <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
          <el-table-column  header-align="center"  align="center"  type="index"  label="序号"  width="100"
          ></el-table-column>
          <el-table-column  header-align="center"  align="center"  prop="saleAttrName"  label="属性名"
          ></el-table-column>
          <el-table-column header-align="center" align="center" prop="value" label="属性值名称列表"> 
            <template slot-scope="{ row, $index }">
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable :disable-transitions="false" @close="row.spuSaleAttrValueList.splice(index,1)">
                {{ tag.saleAttrValueName }} 
              </el-tag>
               <!-- 是input和span的切换 -->
              <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="toggleInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column header-align="center" align="center" prop="value" label="操作">
            <template slot-scope="{row,$index}">
         <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        category3Id: 0, //三级分类的id
        description: "", //商品描述
        spuName: "", //spu名称
        tmId: "", //品牌的id
        //图片的信息
        spuImageList: [
          {
            // id: 0,
            // imgName: "string",
            // imgUrl: "string",
            // spuId: 0,
          },
        ],
        //销售属性与属性值的收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      TradeMarkList: [],
      SpuImageList: [], //需要展示照片墙的数据
      SaleAttrList: [], 
      attrIdandAttrName:''//销售属性的id
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    //照片墙删除某一个图片触发的回调
    handleRemove(file, fileList) {
      //file是点击删除的那个图片
      //fileList删除点击图片以后剩余的图片数组
      this.spuImageList = fileList
    },
    //照片墙需要进行预览的回调
    handlePictureCardPreview(file) {
      //将点击的图片地址赋值给需要展示的属性
      this.dialogImageUrl = file.url;
      //控制对话框的展示与隐藏
      this.dialogVisible = true;
    },
    //初始化spuFrom请求
    async initSpudate(spu) {
      //获取spu信息的数据
      let spuResult = await this.$API.spu.reqSpu(spu.id);
      if (spuResult.code === 200) {
        this.spu = spuResult.data;
      }
      //获取平台的信息
      let TradeMarkList = await this.$API.spu.reqTradeMarkList();
      if (TradeMarkList.code === 200) {
        this.TradeMarkList = TradeMarkList.data;
      }
      //返回的图片信息
      let SpuImageList = await this.$API.spu.reqSpuImageList(spu.id);
      //element组件库要求是name和url字段通过遍历进行，替换，照片墙
      if (SpuImageList.code === 200) {
        let imgAttrList = SpuImageList.data;
        imgAttrList.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.SpuImageList = imgAttrList;
      }
      //获取平台的全部的销售属性
      let SaleAttrList = await this.$API.spu.reqbaseSaleAttrList();
      if (SaleAttrList.code === 200) {
        this.SaleAttrList = SaleAttrList.data;
      }
    },
    //图片上传成功的回调
    handlerSuccess(respone,file,fileList){
      this.spuImageList = fileList
    },
    //添加销售属性到el-table里进行展示
    addSaleAttr(){
      //将收集到的数据进行解构
      let [baseSaleAttrId,saleAttrName]=this.attrIdandAttrName.split(':')
      //重命名为一个对象
      let newSaleAttr = {baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
      this.spu.spuSaleAttrList.push(newSaleAttr)
      //清空数据
      this.attrIdandAttrName=''
    },
    //添加属性值的input框
    toggleInput(row){
      this.$set(row,'inputVisible',true)
      this.$set(row,'inputValue','')
    },
    //失去焦点时让input隐藏 button展示
    handleInputConfirm(row){
      // 解构属性值的id和内容
      const {baseSaleAttrId,inputValue} = row
      if (inputValue.trim() =='') {
        this.$message('不能为空')
        return 
      }
      //判断属性值不重复
      if(!(row.spuSaleAttrValueList.some(item=>item.saleAttrValueName!==inputValue))) {
        this.$message('不能重复')
        return 
      }

      //创建新的结构给服务器
      let newSaleAttrValue = {baseSaleAttrId,saleAttrValueName:inputValue}
      //在原来的数据数组中push新输入的数据信息
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
    },
      //保存按钮的回调
     async addOrUpdateSpu(){
        //整理参数，需要整理照片墙的数据
        //携带参数：图片的imageName与imageUrl
      this.spu.spuImageList = this.spuImageList.map(item=>{
          return {
            imgName:item.name,
            imgUrl:(item.respone&&item.respone.data)||item.url
          }
        })
        //发起图片上传成功的请求
        let result= await this.$API.spu.reqAddOrUpdateSpu(this.spu)
        //弹窗提示
        if (result.code===200) {
          this.$message({type:'success',message:'保存成功'})
          //通知父组件回到场景为0的
          this.$emit('changeScene',{scene:0,flag:this.spu.id?'修改':'添加'})
        }
        //清除数据
        Object.assign(this._data,this.$options.data())

    },
    //点击spu添加按钮的时候发请求的函数
    async addSpuDate(sonCategory3Id){
      //添加spu得时候收集三级分类得id
      this.spu.category3Id = sonCategory3Id
      //品牌属性
        let TradeMarkList = await this.$API.spu.reqTradeMarkList();
      if (TradeMarkList.code === 200) {
        this.TradeMarkList = TradeMarkList.data;
      }
      //销售属性
      let SaleAttrList = await this.$API.spu.reqbaseSaleAttrList();
      if (SaleAttrList.code === 200) {
        this.SaleAttrList = SaleAttrList.data;
      }
    },
    //取消按钮得回调
    cancel(){
      // 通知父组件切换场景为0
      this.$emit('changeScene', {scene:0,flag:''})
      //清理数据Object.assign是用于对象得合并，this._data是vue实例对象得响应式数据，this.$options是配置对象
      Object.assign(this._data,this.$options.data())
    }
  },
  computed:{
    //计算还未选择的销售属性
    unSelectSaleAttr(){
      //整个平台的销售属性 saleAttrList
      // 当前SPU含有的自己的销售属性 spu.spuSaleAttrList
    return this.SaleAttrList.filter(item=>{
        return this.spu.spuSaleAttrList.every(item1=>{
          return item.name !== item1.saleAttrName
        })
      })
      
    }
  }
};
</script>

<style>
.el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>