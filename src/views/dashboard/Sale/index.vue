<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
      <!-- 头部左侧内容 -->
    <el-tabs class="tabs" v-model="activeName">
    <el-tab-pane label="销售额" name="sale"></el-tab-pane>
    <el-tab-pane label="访问量" name="visite"></el-tab-pane>
  </el-tabs>
   <!-- 头部右侧内容 -->
    <div class="right">
       <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
      <!-- 日历组件 -->
         <el-date-picker
      v-model="date"
      class="date"
      size="mini"
      value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="--"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    </div>
  </div>
  <div>
      <el-row :gutter="10">
          <el-col :span="18">
          <!-- 容器 -->
          <div class="charts" ref="charts">

          </div></el-col>
          <el-col :span="6">
          <div class="right" style="margin-right: 10%;">
             <h3>门店{{title}}排名</h3>
          <ul>
            <li>
              <span class="rindex">1</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex">2</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span class="rindex">3</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>4</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>5</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>6</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
            <li>
              <span>7</span>
              <span>肯德基</span>
              <span class="rvalue">123456</span>
            </li>
          </ul>
          </div></el-col>
      </el-row>
  </div>
</el-card>
</template>

<script>
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { title } from '@/settings'
export default {
    name:'Sale',
    data(){
     return {
          activeName: "sale",
      mycharts: null,
      //收集日历数据
      date: [],
        }
    },
    mounted(){
        //初始化
       this.myEcharts = echarts.init(this.$refs.charts)
       //配置数据
       this.myEcharts.setOption({
  title:{
      text:this.title
  },
  xAxis: {
    type: 'category',
    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月' ,'八月','九月','十月','十一月','十二月']
  },
  yAxis: {
    type: 'value',
    max:250
  },
   tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
  series: [
    {
      name:"Direct",
      data: [120, 200, 150, 80, 70, 110, 130,200, 150, 80, 70, 110],
      type: 'bar',
      barWidth:"60%",
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
})
    },
    computed:{
        // 计算属性-标题
        title(){
            return this.activeName == 'sale'?'销售额':'访问量'
        }
    },
    watch:{
        title(){
            this.myEcharts.setOption({
               title:{
                 text:this.title,
               },
            })
            console.log();
        }
    },
    methods:{
      //获取当天日期
      setDay(){
        const day = dayjs().format('YYYY-MM-DD')
        this.date = [day,day]
        console.log(this.data);
      },
      setWeek(){
        const start = dayjs().day(1).format('YYYY-MM-DD')
        const end = dayjs().day(7).format('YYYY-MM-DD')
        this.date = [start,end]
      },
      setMonth(){
        const start = dayjs().startOf('month').format('YYYY-MM-DD')
        const end = dayjs().endOf('month').format('YYYY-MM-DD')
         this.date = [start,end]
      },
      setYear(){
        const start = dayjs().startOf('year').format('YYYY-MM-DD')
        const end = dayjs().endOf('year').format('YYYY-MM-DD')
        this.date = [start,end]
      }
    }
}
</script>

<style>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0px;
}
.date {
  width: 250px;
  margin: 0px 20px;
}
.right span {
  margin: 0px 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0px;
}
ul li {
  height: 8%;
  
}
.rindex {
  float: left;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: black;
  color: white;
  text-align: center;
}
.rvalue {
  float: right;
}

</style>