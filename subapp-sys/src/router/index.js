Vue.use(VueRouter);
const routes = [
    {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/user.vue')
    },
    {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunkName: "role" */ '../views/role.vue')
    },
    {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: "role" */ '../views/menu.vue')
    },
    {
        path: '*',
        name:'404',
        component: () => import(/* webpackChunkName: "sys" */ '../components/404.vue')
    }
]

//不再导出rouer实例而是导出路由数据
export default routes;
