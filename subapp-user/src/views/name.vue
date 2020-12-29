<template>
    <div>
        <el-tag type="warning">这里是用户管理模块😊---姓名管理</el-tag>
        <p class="role">姓名管理</p>
        <router-link to="/list">
            <el-button size="mini" type="danger">to用户列表</el-button>
        </router-link>
    </div>
</template>
<style lang="less">
    .role{
        padding: 20px;background:cornflowerblue; margin: 10px 0; color: #FFF;
    }
</style>