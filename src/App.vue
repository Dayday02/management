<template>
  <div>

    <router-view></router-view>
  </div>

    
 
  
</template>

<script>

import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
}
}
</script>

<style lang="less" >
*{
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
