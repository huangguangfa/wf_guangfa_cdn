/**
 * @author guangfa
 * @time 2020.07.16
 * @name 无需服务端获取的微应用
 */

const noAuthApps = [
  {
    module: "subapp-sys",
    defaultRegister: false, //默认注册
    devEntry: "http://localhost:6002",
    depEntry: "http://106.54.70.48:6002",
    routerBase: "/sys",
    data: []
  },
  {
    module: "subapp-login",
    defaultRegister: false,
    devEntry: "http://localhost:6003",
    depEntry: "http://106.54.70.48:6003",
    routerBase: "/login",
    data: []
  },
  {
    module: "subapp-car",
    defaultRegister: false,
    devEntry: "http://localhost:6004",
    depEntry: "http://106.54.70.48:6004",
    routerBase: "/car",
    data: []
  },
  {
    module: "subapp-user",
    defaultRegister: false,
    devEntry: "http://localhost:6005",
    depEntry: "http://106.54.70.48:6005",
    routerBase: "/user",
    data: []
  },
]

export default noAuthApps;