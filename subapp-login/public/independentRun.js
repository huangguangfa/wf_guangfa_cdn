let loadUrlList = [
    { name:'vue',        url:'https://gf-cdn.oss-cn-beijing.aliyuncs.com/vue/vue.js', type:'script'},
    { name:'elementJs',  url:'https://gf-cdn.oss-cn-beijing.aliyuncs.com/element/index.js',type:'script' },
    { name:'elementCss', url:'https://gf-cdn.oss-cn-beijing.aliyuncs.com/element/index.css',type:'link' },
    { name:'vuex',       url:'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',type:'script' },
    { name:'vueRouter',  url:'https://unpkg.com/vue-router/dist/vue-router.js',type:'script' },
    { name:'axios',      url:'https://unpkg.com/axios/dist/axios.min.js',type:'script' },
  ]
  if( !window.__POWERED_BY_QIANKUN__ ){
    loadUrlList.forEach( item =>{
      item.type === 'script' && document.write(`<script src="${item.url}"></script>`)
      item.type === 'link' && document.write(` <link rel="stylesheet" href="${item.url}">`)
    })
  }

