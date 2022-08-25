<template>
<!-- 容器 -->
  <div class="echarts" ref="charts">
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
name:'Line',
components:{
    echarts
},
mounted(){
    let linecharts = echarts.init(this.$refs.charts)
    linecharts.setOption({
     xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    // type: 'value',
    show:false
  },
  series: [
    {
      data: [0, 6, 7, 5, 10, 3, 4],
      type: 'line',
      smooth: true
    }
  ]
    })
}
}
</script>

<style>
 .echarts {
     width: 100%;
     height: 100%;
 }
</style>