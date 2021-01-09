<template>
    <div class="right_content">
        <el-tag type="warning">这里是系统管理模块😊---角色管理</el-tag>
        <el-table border :data="tableData"  stripe style="width: 100%;margin-top:20px">
            <el-table-column type="selection" width="55" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="角色名称" > </el-table-column>
            <el-table-column prop="dec" label="角色描述" > </el-table-column>
            <el-table-column prop="id"  label="角色ID"> </el-table-column>
            <el-table-column label="操作"  width="220">
                <template >
                    <el-button  type="primary" size="mini">查看</el-button>
                    <el-button type="info" size="mini">编辑</el-button>
                    <el-button type="danger" size="mini">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                background
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
        <router-link to="/user">
            <el-button size="mini" type="danger">to用户管理</el-button>
        </router-link>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                tableData: [{
                    dec: '这是一个超级管理员',
                    name: '超级管理员',
                    id: '324324324242'
                    }, {
                    dec: 'xasxa',
                    name: '管理员',
                    id: '2364782364728'
                    }, {
                    dec: '普通用户',
                    name: '普通用户',
                    id: '47283647264723'
                    }]
            }
        },
    }
</script>