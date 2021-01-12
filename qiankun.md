
前言
<blockquote style=' padding: 10px 10px 10px 1rem; font-size: 0.9em; margin: 1em 0px; color: rgb(0, 0, 0); border-left: 5px solid #10c921; background: rgb(239, 235, 233);'> 
<p>
	 笔者在2019年末的时候开始了解微前端这个东西、当时看到两个微前端的框架、分别是 single-spa 和 qiankun、在这两种技术去做选择去学习、看到qiankun是基于single-spa二次封装的、文档简洁明了、使用简单后面决定学习qiankun！并把自己踩的坑记录下来
<p> 
</blockquote>

<h2 style='color: inherit; line-height: inherit; padding: 0px; margin: 1.6em 0px; font-weight: bold; border-bottom: 2px solid rgb(127, 127, 127); font-size: 1.3em;'><span style='font-size: inherit; line-height: inherit; margin: 0px; display: inline-block; font-weight: normal; background: rgb(127, 127, 127); color: rgb(255, 255, 255); padding: 3px 10px 1px; border-top-right-radius: 3px; border-top-left-radius: 3px; margin-right: 3px;'>什么是微前端  </span></h2>

[自己在服务器部署的一个微前端demo](http://106.54.70.48:6001 "qiankun") 

1、技术栈无关

2、主框架不限制接入应用的技术栈，微应用具备完全自主权

3、独立开发、独立部署

4、微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新

### 需求分析
 - 除了这些、从项目的需求和系统的数量微前端非常适合我们、我们一共有七个系统、每个用户因为角色权限、所管理的系统也是不一样的、张三负责两个系统权限、李四负责一个系统、如果全部系统写到一个项目可想而至...除了代码量...维护成本...都是非常大的！下面放一张我们的系统UI图
 
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/401ad52746e1460ba31dc3cc0434301c~tplv-k3u1fbpfcp-watermark.image)
由于那啥所以打了码、顶部是所有系统、左侧是当前系统的菜单栏、从UI的设计图上看这个项目是很适合微前端！后面我会用基座（微前端环境）和子应用与主应用去介绍我的踩坑之路-😄

## 技术选型与多项目的整体规划

- vue、element、webpack、websocket、eslint、babel、qiankun2.0
- 支持子应用独立运行和可运行在微前端基座方式
- 主应用使用cdn统一管理公共静态资源，所有子应用运行在主应用基座上时共享此静态资源，大幅减小子应用体积，减少带宽消耗，减少重复资源消耗，大幅加快项目加载速度
- 应用与应用之前可进行通信和跳转
- 应用独立维护、互不依赖不耦合
- 项目拆分但和单体的开发模式应该是差不多的、比如启动、打包、安装、依赖、部署（一键模式）
- 编写一键部署脚本、先部署至测试服务器、测试通过直接发行到生产环境
- 项目状态、公共数据的维护
## 主应用环境搭建（基座）
- 主应用(vue脚手架搭建)、因为打算核心公共模块采用cdn方式、所以脚手架选择 ：``` Default ([Vue 2] babel, eslint)``` 主应用需要做的事情是：``` 对qiankun框架单独模块化封装导出核心方法、配置cdn方式加载核心模块 、添加 eslint 忽略指定全局变量、配置webpack的externals排除某些依赖，使用 cdn 资源代替```
### 开始
``` javascript
vue create main-app 
```
脚手架好了之后我们需要安装 ``` qiankun ```

``` javascript
yarn add qiankun
```
 - 采用cdn方式去加载公共核心模块比如vue、vuex、vue-route..等、这样做的目的是让子应用去使用主应用加载好的公共模块、同时减少项目打包体积大小！所以我们需要在main.js里的 ```import Vue from 'vue' ```进行删除、其他的``` vue-router、vuex、Axios ```也都是一样的操作统一不使用 ``` node_modules ```的依赖，然后在主应用的 ```public的index.html、引入公共模块(下方的js） ``` 下面是我自己玩demo的时候储存在我的对象服务器的常用公共文件、建议下载到自己本地玩
 ``` html
 <script src="https://gf-cdn.oss-cn-beijing.aliyuncs.com/vue/vue.js"></script>
 <script src="https://gf-cdn.oss-cn-beijing.aliyuncs.com/vue/vue-router.js"></script>
 <script src="https://gf-cdn.oss-cn-beijing.aliyuncs.com/vue/vuex.js"></script></head>
 <script src="https://gf-cdn.oss-cn-beijing.aliyuncs.com/axios/axios.min.js"></script>
 <link rel="stylesheet" href="https://gf-cdn.oss-cn-beijing.aliyuncs.com/element/index.css">
 <script src="https://gf-cdn.oss-cn-beijing.aliyuncs.com/element/index.js"></script>
 ```
 因为使用了 ``` eslint ``` 原因检测到没有引入vue、所以我们要全局配置忽略我们通过cdn方式引入的模块、在 ```.eslintrc.js ```  添加一个 ``` globals ``` 忽略检测的全局变量
 ``` javascript
 globals: {
    "Vue": true,
    "Vuex": true,
    "VueRouter": true,
    'axios':true
  }
  ```
  配置了这个只是把代码校验忽略检测某些变量、而减少打包项目体积还要使用 ``` webpack ``` 的 ```externals``` [externals介绍](https://webpack.docschina.org/configuration/externals "externals")、简单来讲就是 ```打包的时候排除某些依赖，使用 cdn 资源代替 ``` 在vue.config.js里面配置
  ``` javascript
  module.exports = {
    publicPath: '/',
    outputDir: 'app',
    assetsDir: 'static', 
    ......
    configureWebpack: {
          externals: {
              'element-ui':'ELEMENT',
              'vue':'Vue',
              'vue-router':'VueRouter',
              'vuex': 'Vuex',
              'axios':'axios'
          }
      }
   }
  ```
  
  这样我们的cdn方式加载核心模块就好了、接下来就是配置 ``` qiankun ``` 
  
  - quankun配置、
  
  	+ src里面新建一个core文件夹、分别创建 ``` app.config.js（管理子应用的注册信息）``` 和 ``` qiankun.js（这里统一导出启动qiankun的方法） ``` 还有 ``` app.store.js(管理qiankun的通信方法）```
    
  ```app.config.js ```
    
  ``` javascript
 const apps = [
      {
        name: "subapp-sys", //微应用的名称
        defaultRegister: true, //默认注册
        devEntry: "http://localhost:6002",//开发环境地址
        depEntry: "http://106.54.70.48:6002",//生产环境地址
        routerBase: "/sys", //激活规则路径
        data: []  //传入给子应用的数据
      },
  ]
export default apps;
```

``` qiankun.js ```

``` javascript
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from "qiankun";
const appContainer = "#subapp-viewport"; //加载子应用的dom
import appStore from './app.store' 
const quanKunStart = ( list ) =>{
    let apps = [];      //子应用数组盒子
    let defaultApp = null; // 默认注册应用路由前缀
    let isDev = process.env.NODE_ENV === 'development';
    list.forEach( i => { 
        apps.push({
            name: i.name, //微应用的名称
            entry: isDev ? i.devEntry : i.depEntry, //微应用的 entry 地址
            container: appContainer, //微应用的容器节点的选择器或者 Element 实例
            activeRule: i.routerBase, //微应用的激活规则路径 /login/xxx /sys/xxx
            props: { routes: i.data, routerBase: i.routerBase } //子应用初次挂载传入给子应用的数据
        })
        //初始化第一个加载的应用
        if (i.defaultRegister) defaultApp = i.routerBase;
    });
    //qiankun路由配置
    registerMicroApps(
        apps,
        {
            beforeLoad: [
                app => {
                    console.log('[主应用生命周期] before', app.name);
                },
            ],
            beforeMount: [
                app => {
                    console.log('[主应用生命周期] before', app.name);
                },
            ],
            afterUnmount: [
                app => {
                    console.log('[主应用生命周期] after', app.name);
                },
            ]
        },
    )
    //默认加载第一个子应用
    setDefaultMountApp( defaultApp );
    //启动微前端
    start();
    //第一个微应用 mount 后需要调用的方法
    runAfterFirstMounted(() => { console.log( defaultApp +'--->子应用开启成功' ) });
    //启动qiankun通信机制
    appStore( initGlobalState );
}

export default quanKunStart;

```

``` app.store.js ```
``` javascript
let setGlobalStateMes = null
const appStore = ( initGlobalState ) => {
    //定义全局状态
    const initialState = {  
        data: '给子应用的测试数据',
        token: '',
        appsRefresh: false,
    };
    const { onGlobalStateChange, setGlobalState } = initGlobalState( initialState );
    onGlobalStateChange( (data) => {
        console.log('主应用收到消息', data);
        
    });
    setGlobalStateMes = setGlobalState
}
//导出应用通信方法便于其他地方使用
export {
    setGlobalStateMes
}
export default appStore;
```

- qiankun的通信是 initGlobalState 这个方法返回的 ``` onGlobalStateChange, setGlobalState ``` 接收和派发方法、另外需要注意的是、只有主应用注册了 ``` initGlobalState 才会附加到子应用接收的props里面、主应用没注册通信方法是没有的 ```

- 在主应用的App.vue添加子应用的渲染区域
``` javascript
<template>
    <div class="home-container">
        <p>主应用内容</p>
        <div class="page-conten">
            <!-- 子应用渲染区 -->
            <div id="subapp-viewport" class="app-view-box"></div>
        </div>
    </div>
</template>
```
``` main.js ```
``` javascript
import App from './App.vue'
Vue.config.productionTip = false

import Apps from './core/app.config'
import qianKunStart from './core/qiankun'
qianKunStart(Apps)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

> 整个主应用（基座）配置完、可以发现并没有什么难度、qiankun给我提供了直接开箱即用的方便、剩下的我们就是去配置子应用了、配置子应用相对来说还要更简单些













