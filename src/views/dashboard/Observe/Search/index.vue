<template>
  <div>
    <el-card>
      <div class="header">
        <div class="head-search">
          <span>线上热门搜索</span>
          <el-dropdown>
            <span>
          <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item >双皮奶</el-dropdown-item>
              <el-dropdown-item >蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div>
        <el-row :gutter="10">
          <el-col :span="12"><LineChart></LineChart></el-col>
          <el-col :span="12"></el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>``

<script>
import LineChart from "./LineChart/index.vue";
export default {
  name: "search",
  components: {
    LineChart,
  },
};
</script>

<style>
.head-search {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 10px;
}
</style>