<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0"
      @click="showDialog"
      >添加</el-button
    >
    <!-- 表格组件 -->
    <!-- data表示数据，数组形式 -->
    <!-- border是表格的边框 -->
    <!-- cloumn属性 -->
    <!-- 数据是以一列来展示的数据 -->
    <!-- prop是列对应的内容字段 -->
    <el-table :data="list" style="width: 100%" >
      <el-table-column type="index" label="序号" width="80px" align="center">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌Logo" width="width">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="图片地址失效" style="width:100px; height:100px;">
         
        </template>
      </el-table-column>
      <el-table-column prop="prop"  label="操作" width="width">
        <template slot-scope="{row}">
        <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 
      当前在第几页、数据总条数、每一页展示条数
       total 分页器的所有的数据条数
       page-size 一页展示多少数据
       page-sizes 设置每一页可以展示多少条
       layout 分页器的布局
       pager-count 代表分页器按钮 展示的个数

    -->
    <el-pagination
      style="margin-top:20px; textAlign:center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      :total="total"
      :pager-count = "7"
      layout="prev,pager, next, jumper,sizes,total" 
      @current-change = "handleCurrentChange"
      @size-change = "changeSize"
    >
    </el-pagination>
    <el-dialog :title="tmForm.id? '修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">  
  <!-- form表单  v-model收集数据到哪个对象身上，将来表单验证，也需要这个属性-->
  <el-form :rules="rules"  style="width: 80%;" :model="tmForm" ref="ruleForm">
    <el-form-item label="商品名称" label-width="100px" prop="tmName">
      <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
    </el-form-item>
    <el-form-item label="品牌logo" label-width="100px" prop="logoUrl">
      <!-- upload收集数据不能用v-model因为不是表单元素
      action设置图片上传地址
      on-success检测图片上传，上传成功以后执行
      before-upload 上传图片之前执行
       -->
   <el-upload
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  class="avatar-uploader"
  action="/dev-api/admin/product/fileUpload"
  :show-file-list="false"
  >
  <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2MB</div>

</el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data(){
    //自定义表单验证规则
    var validateTmName = (rule, value, callback) => {
        if (value.length <2 || value.length >10) {
          callback(new Error('请输入2-10之间数量'));
        } else {
          callback();
        }
      };
    return {
      page: 2, //代表分页器第几页
      limit:3, //当前页数列表展示的条数
      total:0,  //数据总条数
      list:[],   //列表展示的条数
      dialogFormVisible:false,  //对话框的展示
      // 收集品牌数据
      tmForm:{
        logoUrl: '', //上传图片的属性
        tmName: ''
      },
      //表单验证规则
      //Form 组件提供了表单验证的功能，只需要通过 rules 
      //属性传入约定的验证规则，并将 Form-Item 的 prop 属性设置为需校验的字段名即可
      rules:{
          tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { validator: validateTmName}
          ],
          logoUrl: [
            { required: true, message: '请选择品牌图片'}
          ],
      }
    }
  },
  // 等原型对象挂载完开始请求数据
  mounted(){
    this.getPageList()
  },
  methods:{
   
    // 获取品牌列表的数据
   async getPageList(){ 
    
      const {page,limit} = this;

      // 获取品牌列表的接口
    let res = await this.$API.trademark.reqTradeMarkList(page,limit)
    if (res.code == 200) {
      this.total = res.data.total
      this.list = res.data.records
      console.log(res.data);
    }
    },
    // 切换页数函数，回传分页器所在的页数pager
    handleCurrentChange(pager){
      this.page = pager //改变当前的页数并再次调用
      console.log(pager);
      this.getPageList()
    },
    //改变一页的条数
    changeSize(limit){
      this.limit = limit
      this.getPageList()
    },
    // 点击添加品牌按钮
    showDialog(){
      this.dialogFormVisible = true
      this.tmForm = {logoUrl:'',tmName:''}

    },
    //修改品牌信息
    updateTradeMark(row){
      this.dialogFormVisible = true
      // row为点击对应的商品信息
      this.tmForm = {...row} // 浅拷贝
    },
    // 上传图片成功以后的回调
    handleAvatarSuccess(res, file) {
        //res上传成功之后返回前端的数据
        // file 服务器返回给前端的数据
        this.tmForm.logoUrl = res.data //收集表单的数据
      },

    // 上传图片以前的回调判断是是否为jpg和大小
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    // 确定添加按钮（添加品牌修改品牌）
    addOrUpdateTradeMark(){
      //获取dom元素验证所有表单是否通过
    this.$refs.ruleForm.validate(async (success)=>{
      console.log(success);
      if (success) {
          this.dialogFormVisible = false
      //发请求，添加或修改品牌
     let result = await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
     console.log(result.code);
     console.log(result);
     if (result.code == 200) {
       //弹出信息的判断是否修改和添加通过tmform.id
       this.$message({
         type:'success',
         message:this.tmForm.id?'修改品牌':'添加品牌'
       })
       //调用分页器方法如果是修改就停留在当前页面，添加就返回第一页
        this.getPageList(this.tmForm.id? this.page : 1);
     }
     else {
            console.log('error submit!!');
            return false;
          }
      }
    })
    },
    //删除品牌操作
    deleteTradeMark(row){
      console.log(row);
      this.$confirm(`你确定删除${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => { 
          //点确定的时候执行
          //向服务器发请求
        const result=  await this.$API.trademark.reqDeleteTradeMark(row.id)
         if (result.code == 200) {
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPageList(this.list.length>1?this.page:this.page-1)
         }
        }).catch(() => { //点取消的时候执行
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
  
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>