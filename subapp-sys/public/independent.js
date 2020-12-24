const loadUrlList = [
    { name:'vue', url:'https://gf-cdn.oss-cn-beijing.aliyuncs.com/vue/vue.js' },
    { name:'elementJs', url:'https://gf-cdn.oss-cn-beijing.aliyuncs.com/element/index.js' },
    { name:'elementCss', url:'https://gf-cdn.oss-cn-beijing.aliyuncs.com/element/index.css' },
    { name:'vuex', url:'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js' },
    { name:'vueRouter', url:'https://unpkg.com/vue-router/dist/vue-router.js' },
    { name:'axios', url:'https://unpkg.com/axios/dist/axios.min.js' },
]

if(!window.__POWERED_BY_QIANKUN__){
    console.log('单独启动')
    loadUrlList.forEach( item =>{
        document.writeln(`<script src=${item.url}></script>`);
        // loadScript(item.url,() =>{
           
        //     console.log('onload');
        // })
    })
}

function loadJs(url,callback){
    let script = document.createElement('script');
    script.type="text/javascript";
    if(typeof(callback)!="undefined"){
        if(script.readyState){
            script.onreadystatechange=function(){
                if(script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange=null;
                    callback();
                }
            }
        }else{
            script.onload=function(){
                callback();
            }
        }
    }
    script.src=url;
    document.body.appendChild(script);
}
