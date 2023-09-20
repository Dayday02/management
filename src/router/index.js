import User from '../views/User.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import pageone from '../views/PageOne.vue'
import pagetwo from '../views/PageTwo.vue'
import VueRouter from 'vue-router'

const router = new VueRouter({

    routes: [
        {
            path: '/',
            component: Main,
            redirect:'/home',
            children: [
                {
                    path: 'home', component: Home
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
                }
            ]
        }

    ]

})
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router