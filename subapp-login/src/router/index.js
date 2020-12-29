
Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/login.vue'),
    },
    
]

//不再导出rouer实例而是导出路由数据
export default routes;
