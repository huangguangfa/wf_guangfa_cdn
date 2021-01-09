<template>
    <div class="about right_content">
        <el-tag type="warning">这里是系统管理模块😊---用户管理</el-tag>
        <el-table border :data="tableData"  stripe style="width: 100%;margin-top:20px">
            <el-table-column type="selection" width="55" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="date" label="日期" > </el-table-column>
            <el-table-column prop="name" label="姓名" > </el-table-column>
            <el-table-column prop="address"  label="地址"> </el-table-column>
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
        <el-button size="mini" type="primary" @click="toChildren">to角色管理</el-button>
    </div>
</template>

<script>
    import ajax from '../utils/ajax'
    export default{
        data(){
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    date: '2016-05-04',
                    name: '王小虎4',
                    address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                    date: '2016-05-01',
                    name: '王小虎5',
                    address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                    date: '2016-05-03',
                    name: '王小虎6',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                    date: '2016-05-02',
                    name: '王小虎8',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    date: '2016-05-04',
                    name: '王小虎99',
                    address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        created(){
            this.getUserList()
        },
        methods:{
            toChildren(){
                this.$router.push({
                    path:'/role'
                })
            },
            async getUserList(){
                let result = await ajax.$get('/blogs/demo');
                this.$message({type:'success',  message:'请求用户列表成功'})
                console.log('请求用户列表成功',result)
            }
        }
    }
</script>