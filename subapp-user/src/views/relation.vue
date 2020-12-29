<template>
    <div class="about">
        <el-tag type="warning">这里是用户管理模块😊---关系管理</el-tag>
        <p class="menu">关系管理</p>
        <p class="sendMes" @click="sendmsg">修改登陆用户</p>
    </div>
</template>
<script>
    import {setState } from '../utils/app-store';
    export default{
        methods:{
            sendmsg(){
                setState({
                    data:{
                        name:'系统管理用户',
                        mes:'用户管理系统发送的消息',
                        sendUser:'user系统子应用',
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .menu{
        padding: 20px;background:darkblue; margin: 10px 0; color: #fff;
    }
    .sendMes{
        font-size: 12px; width: 80px; border: 1px solid #6A5ACD; padding: 10px; text-align: center; color:#6A5ACD ; border-radius: 10px;cursor: pointer; 
        &:hover{
            background: #6A5ACD; color: #fff; 
        }
    }
</style>