import { createWebHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/layout.vue'
import Login from '@/views/login/index.vue'

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue')
      },
      // 其他子路由...
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (to.path !== '/login' && !token) {
//     // 未登录，强制跳转到登录页
//     next('/login')
//   } else if (to.path === '/login' && token) {
//     // 已登录，访问登录页时跳转到首页
//     next('/home')
//   } else {
//     next()
//   }
// })

export default router