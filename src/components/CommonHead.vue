<template>
    <div class="header-container">
        <div @click="handleMenu()" class="l-content"><el-button icon="el-icon-menu" size="mini"></el-button>
        <span>首页</span></div>
        <div class="r-content">
            <el-dropdown>
 
    <img class="headpic" src="../assets/images/user.png" alt="">
 
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>个人中心</el-dropdown-item>
    <el-dropdown-item>退出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
        </div>
    </div>
  </template>
  
  <script>
  export default{
      data(){
          return{
  
          }
      },
      methods:{
        handleMenu(){
            this.$store.commit('collapseMenu')
        }
      }
  }
  </script>
  <style lang="less" scoped>
  .header-container{
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
        color: #fff;
        font-size: 16px;
        margin-left: 20px;
    }
    .headpic{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
  }

</style>