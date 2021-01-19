
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
 - 除了这些、从项目的需求和系统的数量微前端非常适合我们、我们一共有七个系统、每个用户因为角色权限、所管理的系统也是不一样的、张三负责两个系统权限、李四负责一个系统、也可能王五负责一个系统的其中某几个菜单权限等...如果全部系统写到一个项目可想而至...代码量...项目维护..性能.都是非常难折腾！下面放一张我们的系统UI图
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/357d09dc329c4cc08f01a1509fbf0002~tplv-k3u1fbpfcp-watermark.image)
由于那啥所以打了码、顶部是所有系统、左侧是当前系统的菜单栏、从UI的设计图上看这个项目是很适合微前端！后面我会用基座（微前端环境）和子应用与主应用去介绍我的踩坑之路-😄

## 技术选型与项目的整体规划

- vue、element、webpack、websocket、eslint、babel、qiankun2.0
- 支持子应用独立运行和可运行在微前端基座方式
- 主应用使用cdn统一管理公共静态资源，所有子应用运行在基座上时共享此静态资源，大幅减小子应用体积，减少带宽消耗，减少重复资源消耗，大幅加快项目加载速度
- 应用与应用之前可进行通信和跳转
- 应用独立维护、互不依赖不耦合
- 项目拆分但和单体的开发模式应该是差不多的、比如启动、打包、安装、依赖、部署（一键模式）
- 编写一键部署脚本、先部署至测试服务器、测试通过直接发行到生产环境
- 项目状态、公共数据的维护
## 主应用环境搭建（基座）
- 主应用(vue脚手架搭建)、因为打算核心公共模块采用cdn方式、所以脚手架选择 ：``` Default ([Vue 2] babel, eslint)``` 主应用需要做的事情是：``` 对qiankun框架单独模块化封装导出核心方法、配置cdn方式加载核心模块 、配置 eslint 忽略指定全局变量、配置webpack的externals排除某些依赖，使用 cdn 资源代替```
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
  配置了这个只是把代码校验忽略检测某些变量、我们还需要配置下 ``` webpack 的 externals``` [externals介绍](https://webpack.docschina.org/configuration/externals "externals")、简单来讲就是 ```打包的时候排除某些依赖，使用 cdn 资源代替 ``` 在vue.config.js里面配置
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
  
  - quankun配置
  
  	+ src里面新建一个core文件夹、分别创建 ``` app.config.js（管理子应用的注册信息）``` 和 ``` qiankun.js（这里统一导出启动qiankun的方法） ``` 还有 ``` app.store.js(管理qiankun的通信方法）```
    
  ```app.config.js ```
    
  ``` javascript
 const apps = [
      {
        name: "subapp-sys", //微应用的名称
        defaultRegister: true, //默认注册
        devEntry: "http://localhost:6002",//开发环境地址
        depEntry: "http://108.54.70.48:6002",//生产环境地址
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

``` app.store.js  ```
``` javascript
let DISPATCHAPPLYMESSAGE = null;
let GETAPPLYMESSAGE = null;
const appStore = ( initGlobalState ) => {
    //定义应用之间所接收的key、不然主应用不接收数据
    const initialState = {  
        data: '给子应用的测试数据',
        token: '',
        appsRefresh: false,
    };
    const { onGlobalStateChange, setGlobalState } = initGlobalState( initialState );
    dispatchApplyMessage = setGlobalState;
    getApplyMessage = onGlobalStateChange;
}
//导出应用通信方法
export {
    DISPATCHAPPLYMESSAGE,
    GETAPPLYMESSAGE
}
export default appStore;
```

> qiankun的通信是 initGlobalState 这个方法返回的 ``` onGlobalStateChange, setGlobalState ``` 接收和派发方法、另外需要注意的是 ``` 只有主应用注册了 initGlobalState 才会附加到子应用接收的props里面、主应用没注册通信方法是没有的 ``` 还有一个就是 ``` 如果你没先在 initGlobalState方法传入定义好的通信key、那其他应用传入给主应用的数据是接收不到的 ```

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

> 整个主应用（基座）配置完、可以发现并没有什么难度、qiankun给我提供了直接开箱即用的方便、剩下的我们就是去配置子应用了、配置子应用相对来说还要更简单些、接下来就是子应用的环境搭建了

 ## 子应用环境
 
- 第一步使用官方脚手架把项目创建好、和主应用同理选择默认的 ``` Default ([Vue 2] babel ``` 进行创建项目
 ```
  vue create subapp-sys
 ```
+ 第二步我们改造下脚手架默认的模块和打包后的格式配置、还有给qiankun导出对应的生命周期函数 ``` 修改打包配置 -  vue.config.js ```


``` javascript
const { name } = require('./package');
module.exports = {
  devServer: {
    hot: true,
    disableHostCheck: true,
    port:6002,
    overlay: {
        warnings: false,
        errors: true,
    },
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    //防止单体项目刷新后404
    historyApiFallback:true,
},
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd',// 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
};
```
- 第三步同src下创建一个导出qiankun的js文件、统一管理，名叫 ```life-cycle.js ```

``` javascript
import App from "./App.vue";
import store from "./store";
import selfRoutes from "./router";
//导入官方通信方法 和 主应用的一样把应用通信封装到一个js文件独立管理
import appStore from "./utils/app-store";

const __qiankun__ = window.__POWERED_BY_QIANKUN__;
let router = null;
let instance = null;

/**
 * @name 导出qiankun生命周期函数
 */
const lifeCycle = () => {
  return {
    async bootstrap() {},
    //应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
    async mount( props ) {
        // 注册应用间通信
        appStore(props);
        // 注册微应用实例化函数
        render(props);
    },
    //微应用卸载
    async unmount() {
        instance.$destroy?.();
        instance = null;
        router = null;
    },
  //主应用手动更新微应用
    async update(props) {
        console.log("update props", props);
    }
  };
};

//子应用实例化函数 routerBase container是通过主应用props传入过来的数据
const render = ({ routerBase, container } = {}) => {
    Vue.config.productionTip = false;
    router = new VueRouter({
        base: __qiankun__ ? routerBase : "/",
        mode: "history",
        routes: selfRoutes
    });
    instance = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount(container ? container.querySelector("#sys") : "#sys");
};

export { lifeCycle, render };
```
- 第四步 接下来src目录新增 ```public-path.js ```
```javascript
if (window.__POWERED_BY_QIANKUN__) {
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

- 最后``` main.js ``` 引入封装
```javascript
import "./public-path";
import { lifeCycle, render } from "./life-cycle";
/**
* @name 导出微应用生命周期
*/
const { bootstrap, mount, unmount } = lifeCycle();
export { bootstrap, mount, unmount };

/**
* @name 不在微前端基座独立运行
*/
const __qiankun__ = window.__POWERED_BY_QIANKUN__;
__qiankun__ || render();
```
  > 子应用 ``` life-cycle.js ``` 中引入了 ``` import appStore from "./utils/app-store"; ```这里的app-store和主应用的一样、在相同的位置重新复制一份即可
## 我的整个项目结构（使用了vue + react + qiankun)
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc96bcbe6e7b4e069aebf2d0b9bb2b79~tplv-k3u1fbpfcp-watermark.image)
## 遇到的问题
#### ``` qiankun 环境搭建好了,接下来  分别  进入主应用和子应用启动项目 yarn serve 然后访问主应用、没有问题的话应该两个项目的页面都出来了、接下来我说下我做集成时候遇到的问题```


>问题一，挂载微应用的容器节点找不到 ```#subapp-viewport 、添加一个你设置应用挂载container的dom节点就好``` 
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/144bba1a35084d6d992325b5ca19eaa8~tplv-k3u1fbpfcp-watermark.image)
>问题二，主应用代理的地址如果和子应用proxy的接口匹配如果和路由前缀一样的话、页面进行一个刷新操作后的一个页面错误 ```感谢wl提前踩坑、哈哈哈 ```
 
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1687f0cbf28449679d1ac25672602f2b~tplv-k3u1fbpfcp-watermark.image)
配置主应用vue.config.js的devServer为proxy添加一个函数绕过代理、``` 浏览器请求，希望返回的是HTML页面 ```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adbe47cd6a2349159b6212e228f8b9ab~tplv-k3u1fbpfcp-watermark.image)
> 问题三，某个子应用服务没启动、没有获取到资源
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cbb9bca2db84d3a807eb02b3c2724f9~tplv-k3u1fbpfcp-watermark.image)
> 问题四、子应用给其他应用传输数据时候、主应用里面没有提前定义通信的key、所以接收不到数据、解决：```在主应用注册通信方法 initGlobalState({...}) 定义好需要通信的key就好、按定义好的约定进行传输数据```
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9575bca6acb544c49a6162b63f875a18~tplv-k3u1fbpfcp-watermark.image)


> 目前就遇到这些问题、也欢迎留言区评论自己遇到的问题、顺便把qiankun的常见问题贴出来 https://qiankun.umijs.org/zh/faq

## 编写应用指令脚本```一键式 [ 启动、依赖安装、打包 】 ```

> 上面讲到、我们需要一个一个应用下进行yarn serve下、这样是很不方便的、应用一多我们启动就成了很麻烦的一件事情、所以我们需要重新写一个yarn脚本文件、目的就是让他去自动帮我们执行脚本命令 （其中包括 启动 打包 安装依赖）
- 第一步在```整个```应用项目下生成一个```package.json```配置scripts脚本文件
```javascript
yarn init //然后按提示执行下去
```
- 添加scripts脚本配置 ``` 下面是定一个start指令然后去执行config下的start.js```
```
"scripts": {
  "start":"node config/start.js"
}
```
- 第二步在、我们需要在package.json```同级```下创建一个```config```文件夹、同时往文件里面添加一个```start.js```
```
mkdir config
cd config 
touch start.js
```
- 第三步往start.js随便输出一个console.log('yarn serve'),然后在整个项目启动终端执行一下 ```yarn start ```正常输出 yarn serve 、然后我们需要开始编写```一键启动脚本 需求就是执行脚本、脚本自动帮我们在每个项目中去执行 yarn serve ```

- ```start.js```

``` javascript
const fs = require('fs');
const path = require('path');
const util = require('util');
const sub_app_ath = path.resolve();
const sub_apps = fs.readdirSync(sub_app_ath).filter(i => /^sub|main/.test(i));
console.log('\033[42;30m 启动中 \033[40;32m 即将进入所有模块并启动服务：' + JSON.stringify(sub_apps) + 'ing...\033[0m')
const exec = util.promisify( require('child_process').exec );
async function start() {
sub_apps.forEach( file_name => {
  exec('yarn serve', { cwd: path.resolve( file_name )});
});
};
start();
setTimeout( () =>{
console.log('\033[42;30m 访问 \033[40;32m http://localhost:6001 \033[0m')
},5000)

```

```先通过正则读取到主应用和子应用文件夹名称、然后使用 child_process模块异步创建子进程 通过这个返回的方法我们可以去执行一个 指令 并且传入一个在那执行的路径 util.promisify把方法封装成promise返回形式 ``` 
> 这里我有个小问题、我有尝试过去找每一个子应用是否成功开启的操作、但是没找到合适的方法、希望有人知道的可以告知我下啦、谢谢、所以我在最后写了一个setTimeout....

### 好啦、目前一键启动就写完了、其他的都是一样的操作、只是创建的文件夹和scripts的脚本命令改下、哦对还有```exec下的指令换成对应的 ``` 剩下就是执行shell脚本进行服务器上传部署


## shell脚本完成自动打包和上传至服务器、关于shell语法大家可以看 [菜鸟shell教程](https://www.runoob.com/linux/linux-shell.html "")
- 在整体项目下新建一个 deploy.sh 文件

``` deploy.sh ```
```sh
set -e
shFilePath=$(cd `dirname $0`; pwd)
# 系统列表名称
sysList=('app' 'car' 'login' 'sys' 'user' 'all')
IP="106.54.xx.xx"
uploadPath="/gf_docker/nginx/web"
#获取当前分支
branch=$(git symbolic-ref --short HEAD)
#开始
echo "\033[35m 当前分支是：${branch} \033[0m"
read -p $'\033[36m 准备进行自动化部署操作、是否继续 y or n  \033[0m ' isbuild
if [ "$isbuild" != 'y' ];then
    exit
fi
echo "\033[36m 目前四个个系统 \033[0m \033[35m【 ${sysList[*]} 】 \033[0m "
read -p $'\033[36m 请选择部署的项目 或 输入 all \033[0m' changeSysName
isSys=$(echo "${sysList[@]}" | grep -wq "${changeSysName}" &&  echo "yes" || echo "no")
#是否存在系统
if [ "$isSys" == 'no' ];then
    echo "\033[31m 没有对应的系统、已退出 \033[0m"
    exit
fi

#没有buildFile文件夹的话就新建一个
if [ -d "$shFilePath/buildFile" ]; then
    rm -rf './buildFile/'
    mkdir "buildFile"  
else
    mkdir "buildFile" 
fi;

#项目文件夹名称
fileName=""
#打包
function build() {
    cd $1
    echo "\033[32m $1准备打包... \033[0m" 
    yarn build 
    echo $1/$2
    mv $shFilePath/$1/$2 $shFilePath/buildFile
    echo "\033[32m $1打包成功、包移动至buildFile \033[0m" 
}
#上传服务器
function uploadServe() {
    echo "\033[32m 准备上传服务器,地址：$uploadPath \033[0m"
    rsync -a -e "ssh -p 22" $shFilePath/buildFile*  root@$IP:$uploadPath
    echo "\033[32m 自动化部署成功！ \033[0m"
}
#单个项目部署文件名转换
function getFileName() {
    case $1 in
        'app')
            fileName="main-app";;
        'car')
            fileName="subapp-car";;
        'login')
            fileName="subapp-login";;
        'sys')
            fileName="subapp-sys";;
        'user')
            fileName="subapp-user";;
        *)
            echo "error"
    esac
}
#按需打包
if [ "$changeSysName" == 'all' ];then
    for i in "${sysList[@]}"; do
        if [ "$i" != 'app' ];then
            cd ..
        fi
        if [ "$i" != 'all' ];then
            getFileName $i
            build $fileName $i
        fi
    done
else
    getFileName $changeSysName
    build $fileName $changeSysName
fi

#部署
uploadServe 
```

语法和菜鸟现学的、也只是代替双手进行一系列的操作、上传服务器的时候需要输入下密码、如果不想输入可在服务端配置密钥、类似git一样！

>最后我们也可以通过配置、脚本指令去执行我们的sh文件、在package.json的scripts添加一个"deploy": "sh deploy.sh" 最后需要部署测试环境的时候直接执行 yarn deploy
    
## 最后
> 最后我要去进行项目的重构工作了、这些也是我下班后自己通过整理自己玩的demo进行的写的一篇踩坑文章、我相信在重构公司项目的时候踩的坑肯定不止这些到时候我统一在、遇到的问题那进行补充！```加油、折腾人```













