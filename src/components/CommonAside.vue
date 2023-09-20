<template>
  
    <el-menu router  default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen"
     @close="handleClose"
     background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse">
      <!-- h3 v-show="!isCollapse">后台管理系统</h3>
      <h3 v-show="isCollapse">后台</h3> -->
      <h3>{{isCollapse ? "后台": "后台管理系统"  }}</h3>
      <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name" @click="clickMenu(item)">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{item.label}}</span>
      </el-menu-item>
      <el-submenu   v-for="item in hasChildren" :key="item.label" :index="item.label" >
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span>{{item.label}}</span>
        </template>
        <el-menu-item-group  v-for="subitem in item.children" :key="subitem.path">

          <el-menu-item  :index="subitem.path">{{subitem.label}}</el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <el-menu-item >
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item >
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
 
</template>
<script>
export default {
  data() {
    return {

      menuData: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]
    }
  },
  methods: {
    clickMenu(item){
      console.log(item);
      this.$store.commit('selectMenu',item)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  computed:{
    //没有子菜单
    noChildren(){
      return this.menuData.filter(item => !item.children)
    },
    //有子菜单
    hasChildren(){
      return this.menuData.filter(item => item.children)
    },
    isCollapse(){
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>
<style lang="less" scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100%;
}
.el-menu--collapse{
  min-height: 100%;
}
.el-menu{
  height: 100vh;
    h3{
    text-align: center;
    color: white;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  
  }
}
.el-menu-vertical-demo {
  border: 0;
}

</style>