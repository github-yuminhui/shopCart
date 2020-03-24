const menuGlobal = [
    {
        id: 'index',
        pid: '0',
        name: '购物车',
        icon: 'user',
        path: '/',
        models: () => [import('../models/cart')], //models可多个
        component: () => import('../pages/index'),
    },
    // {
    //     id:'bbb',
    //     pid:'0',
    //     name:'bbb页',
    //     icon:'user',
    //     path: '/aaa/bbb',
    //     component: () => import('../pages/bbb'),
    // }, 
    // {
    //     id:'ccc',
    //     pid:'0',
    //     name:'ccc页',
    //     icon:'user',
    //     path: '/ccc',
    //     component: () => import('../pages/ccc'),
    // }, 
];

export default {
    menuGlobal
}
