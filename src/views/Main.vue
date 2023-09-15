<template>
    <div>
        <el-container>
            <el-aside width="auto"><Common-aside></Common-aside></el-aside>
            <el-container>
                <el-header><Common-head></Common-head>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
  
<script>
import CommonAside from '../components/CommonAside.vue'
import CommonHead from '@/components/CommonHead.vue';
export default {
    data() {
        return {

        }
    },
    components:{
        CommonAside,
        CommonHead
    }
}
</script>
<style lang="less" scoped>
.el-header{
    padding: 0;
}

</style>