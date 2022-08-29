<template>
  <div>
    首页的内容
    <Card></Card>
    <Sale></Sale>
    <Observe></Observe>
  </div>
</template>

<script>
import Sale from './Sale'
import Card from './Card'
import Observe from './Observe'
export default {
  name: '',
  components:{
    Card,
    Sale,
    Observe
  },
  mounted(){
    this.$store.dispatch('getData');
  }
}
</script>

<style scoped>

</style>
