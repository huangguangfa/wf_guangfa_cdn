<template>
    <div class="about">
        <el-tag type="warning">这里是用户管理模块😊---用户列表</el-tag>
        <div class="user_table">
            <el-table
                    :data="tableData"
                    stripe
                    border
                    style="width: 100%">
                <el-table-column
                    prop="date"
                    label="日期">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="地址">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="220">
                    <template >
                        <el-button  type="primary" size="mini">查看</el-button>
                        <el-button type="info" size="mini">编辑</el-button>
                        <el-button type="danger" size="mini">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-button size="mini" type="primary" @click="toChildren">to姓名维护</el-button>
        <el-button size="mini" type="warning" @click="toSysApp">跳转系统子应用--角色管理</el-button>
        
    </div>
</template>

<script>
    import { routerGo } from '../utils/utils'
    export default{
        data(){
            return {
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, 
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, 
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, 
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }
                ]
            }
        },
        methods:{
            toSysApp(){
                routerGo('/sys/role')
            },
            toChildren(){
                this.$router.push({
                    path:'/name'
                })
            }
        }
    }
</script>

<style lang="less">
    .user_table{
        margin: 10px 0; color: #fff;
    }

</style>