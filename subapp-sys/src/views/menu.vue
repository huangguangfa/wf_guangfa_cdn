<template>
    <div class="about right_content">
        <el-tag type="warning">这里是系统管理模块😊---菜单管理</el-tag>
         <el-table
            :data="tableData"
            style="width: 100%;margin-bottom: 20px; margin-top:20px"
            row-key="id"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column
            prop="name"
            label="菜单名称"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="dec"
            label="菜单描述"
            sortable
            width="180">
            </el-table-column>
            <el-table-column
            prop="meunid"
            label="菜单ID">
            </el-table-column>
        </el-table>
        <p class="sendMes" @click="sendmsg">修改登陆用户</p>
    </div>
</template>
<script>
    import { setState } from '../utils/app-store';
    export default{
        data(){
            return{
                tableData: [
                    {
                    id: 1,
                    dec: '2016-05-02创建',
                    name: '系统管理',
                    meunid: '231423435423 1518 '
                    }, {
                    id: 2,
                    dec: '2016-05-04创建',
                    name: '系统管理',
                    meunid: '231423435423 1517 '
                    }, {
                    id: 3,
                    dec: '2016-05-01创建',
                    name: '系统管理',
                    meunid: '231423435423 1519 ',
                    children: [{
                        id: 31,
                        dec: '2016-05-01创建',
                        name: '系统管理',
                        meunid: '231423435423 1519 '
                        }, {
                        id: 32,
                        dec: '2016-05-01创建',
                        name: '系统管理',
                        meunid: '231423435423 1519 '
                    }]
                    }, {
                    id: 4,
                    dec: '2016-05-03创建',
                    name: '系统管理',
                    meunid: '231423435423 1516 '
                    }],
                    tableData1: [{
                    id: 1,
                    dec: '2016-05-02创建',
                    name: '系统管理',
                    meunid: '231423435423 1518 '
                    }, {
                    id: 2,
                    dec: '2016-05-04创建',
                    name: '系统管理',
                    meunid: '231423435423 1517 '
                    }
                ]
            }
        },
        methods:{
            sendmsg(){
                setState({
                    data:{
                        name:'系统管理用户',
                        mes:'系统管理发送的消息',
                        sendUser:'sys系统子应用',
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .menu{
        padding: 20px;background: #6A5ACD; margin: 10px 0; color: #fff;
    }
    .sendMes{
        font-size: 12px; width: 80px; border: 1px solid #6A5ACD; padding: 10px; text-align: center; color:#6A5ACD ; border-radius: 10px;cursor: pointer; 
        &:hover{
            background: #6A5ACD; color: #fff; 
        }
    }
</style>