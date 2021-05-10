export const caseRouterMap = [
  {
    path: '/report',
    name: 'Report',
    component: () => import('@/views/report/index'),
    meta: { title: '案件上报', keepAlive: false }
  }
]
