<template>
  <div>
    <div class="card-header">{{title}}<svg t="1652512820532" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3272" width="16" height="16"><path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#F79484" p-id="3273"></path><path d="M391.68 384s52.48 43.52 120.32 43.52 121.6-43.52 121.6-43.52 58.88-52.48 28.16-75.52-75.52 7.68-75.52 7.68-34.56-37.12-75.52-37.12-72.96 37.12-72.96 37.12-44.8-29.44-75.52-7.68 29.44 75.52 29.44 75.52z" fill="#FFFFFF" p-id="3274"></path><path d="M771.84 693.76c-5.12-16.64-6.4-33.28-6.4-49.92 1.28-25.6-3.84-66.56-29.44-120.32-37.12-75.52-83.2-93.44-103.68-97.28-5.12-1.28-10.24 0-15.36 2.56-15.36 6.4-55.04 25.6-104.96 25.6s-88.32-17.92-103.68-26.88c-5.12-2.56-10.24-3.84-15.36-2.56-20.48 3.84-67.84 21.76-104.96 99.84-24.32 51.2-29.44 93.44-29.44 119.04 0 16.64-1.28 34.56-6.4 51.2-12.8 35.84-3.84 108.8 259.84 108.8 262.4 0 271.36-72.96 259.84-110.08z" fill="#FFFFFF" p-id="3275"></path><path d="M337.92 389.12s64 21.76 128-2.56c62.72-24.32 97.28-84.48 97.28-84.48s35.84-70.4 0-80.64c-35.84-10.24-67.84 33.28-67.84 33.28s-46.08-23.04-83.2-7.68-55.04 61.44-55.04 61.44-52.48-11.52-72.96 20.48c-19.2 32 53.76 60.16 53.76 60.16z" fill="#FFFFFF" opacity=".5" p-id="3276"></path><path d="M577.28 586.24c8.96 0 16.64-7.68 16.64-16.64s-7.68-16.64-16.64-16.64h-34.56l34.56-32c6.4-6.4 6.4-16.64 1.28-23.04-6.4-6.4-16.64-6.4-23.04-1.28L512 537.6l-42.24-39.68c-6.4-6.4-16.64-6.4-23.04 1.28-6.4 6.4-6.4 16.64 1.28 23.04l34.56 32h-35.84c-8.96 0-16.64 7.68-16.64 16.64s7.68 16.64 16.64 16.64h49.92v29.44h-49.92c-8.96 0-16.64 7.68-16.64 16.64 0 8.96 7.68 16.64 16.64 16.64h49.92V691.2c0 8.96 7.68 16.64 16.64 16.64s16.64-7.68 16.64-16.64v-40.96h49.92c8.96 0 16.64-7.68 16.64-16.64 0-8.96-7.68-16.64-16.64-16.64h-49.92v-29.44h47.36z" fill="#F79484" p-id="3277"></path></svg></div>
    <div class="card-content">{{count}}</div>
    <div class="card-charts">
        <!-- 挖好插槽得坑等待父组件通过作用于插槽来填充内容 -->
        <slot name="charts"></slot>
    </div>
    <div class="card-footer">
        <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
    name:'Detail',
    props:['title','count']
};
</script>

<style>
.card-header {
    display: flex;
    justify-content: space-between;
    color: #d9d9d9;
}

.card-content {
    font-size:  30px;
    padding: 10px 0px;
}
.card-charts {
 height: 50px;
}
.card-footer {
 border-top:1px solid #eee ;
}
</style>