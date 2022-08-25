<template>
  <div>
    <h2>我是card组件</h2>
    <el-row :gutter="10">
        <el-col :span="6">
            <el-card>
                <Detail title="总销售额" count="$ 12306">
                    <!-- 作用域插槽传入子组件需要展示得内容  -->
                    <template slot="charts">
                        <span>周同比&nbsp;56.67%</span><br>
                        <span>日销售额</span>
                    </template>
                
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title="访问量" count="￥ 12306">
                    <template slot="charts">
                        <LineChat></LineChat>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title="支付笔数" count="106%">
                     <template slot="charts">
                        <LineChat></LineChat>
                    </template>
                </Detail>
            </el-card>
        </el-col>
        <el-col :span="6">
            <el-card>
                <Detail title="运行活动效果" count="12%"></Detail>
            </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineChat from './LineChat'
export default {
  name: "Card",
  components: {
    Detail,
    LineChat,
  },
 
};
</script>

<style>
</style>