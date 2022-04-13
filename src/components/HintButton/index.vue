<template>
  <a :title="title" style="matgin:10px" v-bind="$attrs" v-on="$listeners"></a>
</template>

<script>
export default {
 name:"HintButton",
 props:['title'],

}
</script>

<style>

</style>