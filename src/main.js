import Vue from 'vue'
import ElementUI from 'element-ui';             //全局引入element
import 'element-ui/lib/theme-chalk/index.css';    //全局引入element的样式
import App from './App.vue'
import router from './router';
import httprequest from '@/api/axiosapi'
import Vuex from 'vuex'  
import uploader from 'vue-simple-uploader'
Vue.config.productionTip = false
Vue.prototype.$http=httprequest
Vue.use(ElementUI);     //全局注入element
Vue.use(router)
Vue.use(Vuex)
Vue.use(uploader)

router.beforeEach((to,from,next)=>{
  /* 路由发生变化修改页面title */
  if(to.meta.title){
    document.title = to.meta.title
  }
  next()
});
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

