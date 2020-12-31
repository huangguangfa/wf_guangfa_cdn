# wf_guangfa_cdn
微前端架子

> yarn install 安装依赖

> yarn start 启动所有项目

### 目前主应用是vue、login也是一个单体项目也是基于vue、sys系统管理也是基于vue、然后car车辆管理是基于react

> prot 6001 主应用应用(vue)
> prot 6002 系统子应用(vue)
> prot 6003 登陆子应用(vue)
> prot 6004 车辆子应用(react)
> prot 6004 用户管理应用(vue)

### 运行微前端基座所有应用
``` 
yarn start 

```
- 如果要在微服务运行指定子应用、在main-app文件夹下core -> app-config.js 注释调某个子应用（略显的low后期维护吧）


### 不运行在微前端基座、单独运行某个子应用

``` 
cd 指定子应用文件夹下
yarn start

```

### vue项目都是 vue + vue-router + vuex + axios 的配置选项

### react 是基于 UmiJs进行搭建的一个react框架

> 目前主应用使用cdn方式、把一些子应用的公共东西放到主应用去加载出来、比如vue、element、axios、vue-router、vuex等、子应用如果运行在微前端的基座上则使用主应用挂载到widows里面的公共模块、子应用也支持单独运行、单独运行的话子应用需要自己去加载cdn的公共模块

