import User from '../views/User.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import pageone from '../views/PageOne.vue'
import pagetwo from '../views/PageTwo.vue'
import login from '@/views/Login.vue'
import VueRouter from 'vue-router'
import Cookies from 'js-cookie'
const router = new VueRouter({
    mode:'hash',
    routes: [
        {
            path: '/',
            component: Main,
            name:'Main',
            redirect:'/home',
            children: [
                /* {
                    path: 'home', name:'home',component: Home
                },
                {
                    path: 'user',component: User

                },
                {
                    path: 'mall',component: Mall
                },
                {
                    path: 'page1',component: pageone
                },
                {
                    path: 'page2',component: pagetwo
                } */
            ]
        },
        {
            path:'/login',
            name:'login',
            component:login
        }

    ]

})

router.beforeEach((to,from,next)=>{
  const token= Cookies.get('token')
  //token存不存在
  if (!token && to.name !=='login') {
    next({
        name:'login'
    })
  }
  else if(token && to.name =='login'){
    next({
        name:'home'
    })
  }
  else{
    next()
  }
})

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
