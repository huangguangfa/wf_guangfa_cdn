Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "user" */ '../components/Sidebar.vue'),
        children:[
            {
                path: '/list',
                name: 'list',
                component: () => import(/* webpackChunkName: "user" */ '../views/list.vue')
            },
            {
                path: '/name',
                name: 'name',
                component: () => import(/* webpackChunkName: "role" */ '../views/name.vue')
            },
            {
                path: '/relation',
                name: 'relation',
                component: () => import(/* webpackChunkName: "role" */ '../views/relation.vue')
            },
            {
                path: '*',
                name:'404',
                component: () => import(/* webpackChunkName: "sys" */ '../components/404.vue')
            }
        ]
    },
    
]

//不再导出rouer实例而是导出路由数据
export default routes;
