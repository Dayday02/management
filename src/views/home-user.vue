<template>
  <div>
<div class="user">
    <img src="../assets/images/user.png" alt="">
    <div class="userinfo">
      <p class="name">Admin</p>
      <p class="access">超级管理员</p>
    </div>
    
    
  </div>
  <div class="login-info">
    <p>上次登录时间:<span>2023-9-15</span></p>
    <p>上次登录地点:<span>南宁</span></p>
  </div></div>
</template>

<script>
export default{
    data(){
        return{

        }
    },
    
}
</script>

<style lang="less" scoped>
.user{
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-right: 40px;
  }
  .userinfo{
    .name{
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access{
      color: #999999;
    }
  }

}
.login-info{
    p{
      line-height: 28px;
      font-size: 14px;
      color: #999999;
      span{
        color: #666666;
        margin-left: 60px;
      }
    }
  }
</style>