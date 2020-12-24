<template>
    <div>
        <el-tag type="warning">这里是系统管理模块😊---角色管理</el-tag>
        <p class="role">角色管理</p>
        <router-link to="/user">
            <el-button size="mini" type="danger">to用户管理</el-button>
        </router-link>
    </div>
</template>
<style lang="less">
    .role{
        padding: 20px;background: #f56c6c; margin: 10px 0; color: #FFF;
    }
</style>