<template>
    <div class="manage">
        <el-dialog title="提示" :visible.sync="dialogVisible" width="50%" :before-close="Closedialog">
            <!-- 用户表单信息 -->
            <el-form :inline="true" ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input placeholder="请输入年龄" v-model.number="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" style="width: 100%;"
                        value-format="yyyy-MM-DD"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                + 新增
            </el-button>
            <!-- 搜索区域 -->
            <el-form :model="userform" :inline=true>
                <el-form-item >
                    <el-input placeholder="请输入名称" v-model="userform.name"></el-input>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="onSubmit" > 查询</el-button>
                </el-form-item>
            </el-form>

        </div>
        <div class="common-tabel" >
            <el-table stripe :data="tableData" style="width: 100% " >
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="180">
                </el-table-column>
                <el-table-column prop="age" label="年龄">
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination layout="prev, pager, next" :total=total @current-change="handlePage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from '../api'
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                age: '',
                sex: '',
                birth: '',
                addr: ''
            },
            userform:{

            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名' }
                ],
                age: [

                    { required: true, message: '请输入年龄' },
                    { type: 'number', message: '年龄必须为数字值' }

                ],
                sex: [
                    { required: true, message: '请选择性别' }
                ],
                birth: [
                    { required: true, message: '请选择出生年月' }
                ],
                addr: [
                    { required: true, message: '请输入地址' }
                ]
            },
            tableData: [],
            modalType: 0,
            total: 0,//page总条数
            pageDate: {
                page: 1,
                limit: 10
            }

        }
    },
    methods: {
        submit() {
            this.$refs.form.validate((valid) => {
                //表单校验成功
                if (valid) {
                    if (this.modalType == 0) {
                        addUser(this.form).then(() => {
                            this.getList()
                        }
                        )
                    }
                    else {
                        editUser(this.form).then(() => {
                            this.getList()
                        })
                    }
                    this.dialogVisible = false
                    this.$refs.form.resetFields()
                }
            })
        },
        resetFields() {
        },
        handleEdit(row) {
            this.dialogVisible = true
            this.modalType = 1
            //注意需要对当前数据进行深拷贝，否则会出错
            this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete(row) {
            this.$confirm('是否删除此用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delUser({ id: row.id }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //重新获列表
                    this.getList()
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleAdd() {
            this.dialogVisible = true
            this.modalType = 0

        },
        Closedialog(){
            this.dialogVisible = false
        },
        getList() {
            getUser({ params: {...this.userform,...this.pageDate} }).then(({ data }) => {
                console.log(data);
                this.tableData = data.list
                this.total = data.count ? data.count : 0
            })
        },
        //页码回调
        handlePage(val) {
            console.log(val);
            this.pageDate.page = val
            this.getList()
        },
       //列表查询
       onSubmit(){
           this.getList()
       }


    },
    mounted() {
        this.getList()

    }
}
</script>
<style lang="less" scoped>
.manage {
    height: 90%;
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .common-tabel{
        position: relative;
        height: calc(100%-62px);
        .pager{
            position: absolute;
            bottom: -50px;
            right: 20px;
            
        }
    }
}
</style>