<template>
  <div class="header-container">
    <div class="l-content"><el-button style="margin-right: 20px;" @click="handleMenu()" icon="el-icon-menu" size="mini"></el-button>
      <el-breadcrumb separator="/">
        <!-- 面包屑 -->
        <el-breadcrumb-item v-for=" item in tabsList" :key="item.path"
          :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
      </el-breadcrumb>

    </div>
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
export default {
  data() {
    return {
      tabsList: this.$store.state.tab.tabsList
    }
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    }
  }
}
</script>
<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    color: #fff;
    font-size: 16px;
    margin-left: 20px;
  }

  .headpic {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .l-content {
    display: flex;
    align-items: center;
    /deep/.el-breadcrumb__item {    
      margin-left: 0px;
        .is-link {
          font-weight: normal;
          color: #666;
        } 
       
        &:last-child{
          .is-link {
          font-weight: normal;
          /* color: white; */
        } 
        }
    }
  }

}</style>