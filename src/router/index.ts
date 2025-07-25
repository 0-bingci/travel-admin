import { createWebHistory, createRouter } from 'vue-router'
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
      {
        path: 'users', // 父路由路径
        children: [
          {
            path: 'list', // 子路由路径
            component: () => import('@/views/home/index.vue')
          },
          {
            path: 'role', // 子路由路径
            component: () => import('@/views/home/index.vue')
          }
        ]
      },
      {
        path: 'settings', // 父路由路径
        children: [
          {
            path: 'order',
            component: () => import('@/views/order/index.vue')
          },
          {
            path: 'trip',
            component: () => import('@/views/trip/index.vue')
          },
          {
            path: 'attraction',
            component: () => import('@/views/attraction/index.vue')
          },
        ]
      }
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