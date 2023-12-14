import Vue from 'vue';
import Router from 'vue-router'
import user from '../components/user/user.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/index',
      // redirect:'/mindMap',
    },
    // {
    //   path:'/',
    //   redirect:'/shopIndex'
    // },
    // {
    //   path:'/mindMap',
    //   name:'mindMap',
    //   component:()=>import('@/components/mind/Mindmap.vue')
    // },

    {
      path:'/toLogin',
      redirect:'/userLogin'
    },
    {
      path:'/toRearIndex',
      redirect:'/index/main'
    },
    {
      path:'/toAdmLogin',
      redirect:'/admLogin'
    },
    {
      path:'/toShopIndex',
      redirect:'/shopIndex'
    },
    {
      path:'/admLogin',
      name:'admLogin',
      component:()=>import('@/components/administrators/login.vue'),
    },
    {
      path:'/userLogin',
      name:'userLogin',
      component:()=>import('@/components/shop/login.vue'),
    },
    //要把注册提出来，还没完成
    {
      path:'/userRegister',
      name:'userRegister',
    },
    //用户购买路由
    {
      path:'/shopIndex',
      component:()=>import('@/components/shop/index.vue'),
      children:[
        {
          name:'book',
          path:'book',
          component:()=>import('@/components/shop/showCart.vue'),
        },
      ]
    },
    {
      name:'index',
      path:'/index',
      component:()=>import('@/components/rearIndex.vue'),
      meta:{
        title:'hua后台管理'
      },
      children:[
        //思维导图
        {
          path:'/mindMap',
          name:'mindMap',
          component:()=>import('@/components/mind/Mindmap.vue')
        },
        //学生表的查询管理，
        {
          path:'/student',
          component:()=>import('@/components/student.vue'),
          name:'student',
          meta:{
            title:'college'
          }
        },
        //es index的路由
        {
          path:"esIndex",
          name:"esIndex",
          component:()=>import('@/views/es/index.vue'),
        },
        {
          name:'upload',
          path:'upload',
          component:()=>import('@/components/Upload/Index.vue'),
        },
        {
          name:'user',
          path:'user',
          component:user,
        },
        {
          name:'main',
          path:'main',
          component:()=>import('@/components/main/index.vue'),
        },
        {
          name:'showBook',
          path:'showBook',
          component:()=>import('@/components/book/showBook.vue'),
        },
        {
          name:'order',
          path:'order',
          component:()=>import('@/components/order/index.vue'),
        },
        {
          name:'test',
          path:'test',
          component:()=>import('@/components/test.vue'),
        }
      ]
    },
  ]
})