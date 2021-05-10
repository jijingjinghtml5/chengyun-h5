/**
 * 基础路由
 * @type { *[] }
 */
import { caseRouterMap } from './case'

export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '工作台', keepAlive: false }
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/user/index'),
        meta: { title: '我', keepAlive: false }
      },
      // 案件相关页面
      ...caseRouterMap
    ]
  },
  {
    path: '/login',
    name: 'UserLogin',
    component: () => import('@/views/user/login'),
    meta: { title: '首页', keepAlive: false }
  }
]
