<template>
  <div>
    <el-card style="margin: 20px 0px">
      <CategorySelect @getCategoryId="getCategoryId" :show="!isShowTable"> </CategorySelect>
    </el-card>
    <el-card>
      <!-- tab表格结构 -->
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-puls"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table style="width: 100%" border :data="attrList">
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150">
          </el-table-column>
          <el-table-column prop="attr" label="属性值列表" width="width">
            <template slot-scope="{ row }">
              <el-tag
                style="margin: 0px 20px"
                type="success"
                v-for="attrValue in row.attrValueList"
                :key="attrValue.id"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加属性和修改属性的结构 -->
      <div v-show="!isShowTable">
        <el-form :inline="true" ref="form" label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName">
            </el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-puls"
          @click="addAttrValue"
          :disabled="!attrInfo.attrName"
        >
          添加属性值
        </el-button>
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table style="width: 100%" border :data="attrInfo.attrValueList">
          <el-table-column prop="prop" label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column header-align="center" prop="prop" label="属性值名称">
            <template slot-scope="{ row, $index }">
              <!-- 需要进行input和span的来回切换 -->
              <el-input
                :ref="$index"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                v-if="row.flag"
                @blur="toLook(row)"
                @keyup.native.enter="toLook(row)"
              ></el-input>
              <span v-else @click="toEdit(row, $index)">{{
                row.valueName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column header-align="center" prop="prop" label="操作">
            <template slot-scope="{ row, $index }">
              <!-- 气泡确认框 -->
               <el-popconfirm :title="`确定删除${row.valueName}?`" @onConfirm="deleteAttrValue($index)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "arrt",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 接受平台属性的数据
      attrList: [],
      // 控制table表格的显示与隐藏
      isShowTable: true,
      //收集新增属性或者修改属性
      attrInfo: {
        attrName: "string", //属性名
        attrValueList: [
          //属性值可能是多值所以用数组
          {
            attrId: 0,
            valueName: "string",
          },
        ],
        categoryId: 0, //三级分类的ID
        categoryLevel: 0, //因为服务器也需要区分几级ID
      },
    };
  },
  methods: {
    // 自定义事件的回调
    getCategoryId({ categoryId, level }) {
      //区分三级分类相应的id
      if (level == 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level == 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        this.getAttrList();
      }
    },
    // 获取平台属性数据
    //当确定三级分类的数据的时候可以向服务器发送请求，获取平台属性进行展示
    async getAttrList() {
      //获取分类的id
      const { category1Id, category2Id, category3Id } = this;
      const result = await this.$API.attr.reqAttrList(
        category1Id,
        category2Id,
        category3Id
      );
      if (result.code === 200) {
        this.attrList = result.data;
      }
    },
    //添加属性值回调
    addAttrValue() {
      //向数组里添加属性值
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id, //对于修改某一个属性值，可以在已有的属性值之上，新增新的属性值
        valueName: "",
        flag: true, //可以控制单个自己的模式切换，不会影响其他表单
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //添加属性按钮的回调
    addAttr() {
      this.isShowTable = false;
      //清除数据
      //收集三级分类的ID
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 0,
      };
    },
    //修改某一个属性值
    updateAttr(row) {
      this.isShowTable = false;
      this.attrInfo = JSON.parse(JSON.stringify(row));
      this.attrInfo.attrValueList.forEach((item) => {
        //如果给对象添加一个属性，必须通过vue.$set()设置,这样才是响应式的
        this.$set(item, "flag", false);
      });
    },
    //切换样式单独变换的标志
    toLook(row) {
      //row为用户新修改的属性值,去掉空格以外还是空字符串，不能输入
      if (row.valueName.trim() == "") {
        this.$message("请你输入一个正常的属性值");
        return;
      }
      //新增的属性值和已经存在的属性值不能重复
      let isRepat = this.attrInfo.attrValueList.some((item) => {
        //去除数组里，新增的属性值,row是最新值，不能自己跟自己比
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) return; //不执行后面代码
      row.flag = false;
    },
    //实现自动聚焦的方法
    toEdit(row, index) {
      row.flag = true;
      //因为使用v-if重新渲染的时候，是一个费时间的操作，dom元素来不及渲染，通过调用vm也就是this身上的$nextTick方法
      this.$nextTick(() => {
        //因为index为变量要直接获取，需要通过枚举使用[]不能使用.
        this.$refs[index].focus();
      });
    },
    //气泡确认框 确认按钮的回调
    deleteAttrValue(index){
      // 当前的删除属性值的操作不需要发送请求
      this.attrInfo.attrValueList.splice(index,1)
    },
    //添加或者修改保存信息
   async addOrUpdateAttr(){
      //整理提交给服务的参数，不能提交空，
    this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter((item)=>{
        //判断都属性值不为空
        if (item!=='') {
          //删除掉flag属性
          delete item.flag
          return true
        }
      })
      //发送请求
      try {
       await this.$API.attr.reqAddAttr(this.attrInfo)
       this.$message({type:'success',message:'保存成功'})
       //保存成功后重新获取一下平台数据进行展示
       this.getAttrList()
       //展示切换展示平台属性
       this.isShowTable=true
      } catch (error) {
        
      }
    }
  },
};
</script>

<style scoped>
</style>