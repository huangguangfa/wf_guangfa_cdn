<template>
    <div class="sys-system">
        <ul class="sidebar">
            <li v-for="(item,index) in menuList" 
                :class="{ 'currentRouter':$route.path === item.url } "
                :key="index" @click="toOtherRouter(item)"> {{ item.mName }}
            </li>
        </ul>
        <div class="sys_page_content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                menuList:[
                    {
                        "mName":"用户列表",
                        "url":"/list"
                    },
                    {
                        "mName":"姓名维护",
                        "url":"/name"
                    },
                    {
                        "mName":"关系维护",
                        "url":"/relation"
                    }
                ]
            }
        },
        methods:{
            toOtherRouter(path){
                if(this.$route.path === path.url) return;
                this.$router.push(path.url)
            }
        }
    }
</script>

<style lang="less">
    .sys-system{
        display: flex; height: 100vh;width: 100%;
        .sidebar{
            width: 150px; margin-right: 5px; background: #fff;height: 100%;
            li{
                padding: 10px; cursor: pointer;
                text-align: center; line-height: 20px; 
                border: 1px solid #eee;
            }
            .currentRouter{ background: #409EFF; color: #fff; }
        }
        .sys_page_content{
            width: 100%;
            padding: 20px;
            border: 5px solid yellow;
        }
    }
    
</style>