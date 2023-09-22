<template>
    <el-form ref="form" class="login-container" :model="form" :rules="rules" label-width="70px" >
        <h3 class="login_title">系统登录</h3>

        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input   @keyup.enter.native="submit" v-model="form.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item class="login_btn">
            <el-button type="primary" @click="submit">登录</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie'
import { getMenu } from "../api";
export default {

    data() {
        return {
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        //登陆
        submit() {
            //const token=Mock.Random.guid()
            //token信息存入cookie
            this.$refs.form.validate((valid) => {
                if (valid) {
                    getMenu(this.form).then(({ data }) => {
                        console.log(data);
                        if (data.code === 20000) {
                            Cookie.set('token', data.data.token)
                            //获取登陆数据
                            this.$store.commit('setMenu',data.data.menu)
                            //设置路由信息
                            this.$store.commit('addMenu',this.$router)
                            this.$message({
                                type: 'success',
                                message: '登陆成功'
                            });
                            this.$router.push('/home')
                        }
                        else {
                            this.$message({
                                type: 'error',
                                message: '用户名或密码错误'
                            });
                        }
                    })
                }
            })


        }
    }
}

</script>
<style lang="less" scoped>
.login-container {
    width: 350px;
    height: 300px;
    margin: 160px auto;
    border: 1px solid #eaeaea;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    position: relative;

    .login_title {
        text-align: center;
        margin: 40px auto;
        color: #505458;

    }

    .login_btn {
        text-align: center;
        position: absolute;
        margin-top: 10px;
        left: 25%;
    }
}
</style>