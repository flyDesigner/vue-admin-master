// 导入jQuery
// 这是es6的写法
import $ from 'jquery'

// 注意：在webpack中，使用import vue from 'vue' 导入的vue构造函数功能不完整，
// 只提供了runtime-only的方式，并没有提供像网页那样的使用方式，或者我们在配置文件中的reslove中进行配置
import Vue from 'vue'
import Vuex from 'vuex'
// 这种导入的方式也是可以的
// import Vue from '../node_modules/vue/dist/vue.js'
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import routes from './router.js';
import store from './vuex/index'


// 这是node.js的command写法
// 两种写法都太高级了，浏览器解析不了，所以会报错
// const $ = require('jquery')

//将css文件导入main里面，但是webpack默认只支持js文件的打包编译，
// 所以我们需要在配置文件中加入loader配置来读取css文件
import '@static/css/index.css'
import '@static/css/index.less'

import popUp from '@/components/popUp/index'
Vue.prototype.$newPopUp = popUp;

import NewTree from '@/components/newTree/tree.vue'
import NewTable from '@/components/newTable/newTable.vue'
import SelectTable from '@/components/newTable/selectTable.vue'
let components = {
    NewTree,
    NewTable,
    SelectTable
}
Object.keys(components).map((key) => {
    Vue.component(components[key].name, components[key]);
});

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(iView);
Vue.use(ElementUI);

const router = new VueRouter({ routes })
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else if (!!user && to.path == '/'){
        next({ path: '/page1' })
    } else {
        next()
    }
})
window.$app = new Vue({
    el: '#app',
    store:store,
    router: router,
    render: h => h(App)
})
window.$store = store;
window.$channel = new Vue();

// 我们使用webpack打包main.js文件成dist目录下的bundle.js文件，从而浏览器能够解析出来

// webpack能做的事情？
// 1、webpack能够处理js文件的相互依赖关系，
// 2、webpack能够处理js的兼容问题，把高级的，浏览器不能兼容的语法转为低级的、浏览器能够识别的语法

// webpack打包命令：webpack 要打包的文件路径 output 打包好的文件路径 --mode development
// 后面的mode指的是打包模式，可选项有开发development和生产production 和none（阻止默认事件）


// 当我们在控制台直接输入 webpack 命令执行的时候，webpack 做了以下几步：
// 1、首先，webpack发现，我们没有通过命令的形式，给他指定入口和出口
// 2、webpack 就回去项目的根目录中，查找一个叫做'webpack.config.js'的配置文件
// 3、当找到这个配置文件之后，webpack就回去解析这个配置文件，当解析执行完这个配置文件后，就得到了配置文件中，导出的配置对象
// 4、当webpack拿到配置对象后，就拿到了配置对象中，指定的入口和出口，然后打包构建

// 由于webpack每次改代码都得重新启动，我们使用webpack-dev-server这个工具来实现自动打包编译的功能
// 1、运行 npm i webpack-dev-server -D 和 npm i webpack -D 来安装到本地依赖
// 2、安装完毕后，这个工具的用法 ，和 webpack 命令的用法，完全一样
// 3、由于我们是在项目中安装的webpack-dev-server，无法使用其作为脚本命令在终端中直接运行
// 4、我们将webpack-dev-server加在package.json中的script的dev中作为脚本命令
// 5、webpack-dev-server帮我们打包生成的bundle.js文件，没有存放到实际的物理磁盘中，而是直接托管到 电脑的内存中
// ，所以我们在这个项目根目录中，根本找不到这个打包好的bundle.js
