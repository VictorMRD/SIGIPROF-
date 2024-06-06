const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/index',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/profile',
        name: 'profile',
        meta: { requiresAuth: true }
      },
      {
        path: '/index',
        name: 'index',
        meta: { requiresAuth: true },
        component: () => import('@/views/index.vue')
      },
      {
        path: '/publicaciones',
        name: 'publications',
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            name: 'publications index',
            component: () => import('@/views/publications/index.vue')
          },
          {
            path: 'index',
            name: 'publications'
          },
          {
            path: 'create',
            name: 'publications-create'
          },
          {
            path: ':id/edit',
            name: 'publications-edit'
          },
          {
            path: ':id',
            name: 'publications-view'
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/register.vue')
  },
  {
    path: '/forgot',
    name: 'forgot'
  },
  {
    path: '/:catchAll(.*)',
    name: '404'
  }
]

export default routes
