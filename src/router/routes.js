const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/index',
    component: () => import('@/Layout/index.vue'),
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
        path: '/users',
        name: 'users',
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            name: 'users index'
          },
          {
            path: 'index',
            name: 'users'
          },
          {
            path: 'create',
            name: 'users-create'
          },
          {
            path: ':id/edit',
            name: 'users-edit'
          },
          {
            path: ':id',
            name: 'users-view'
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'login'
  },
  {
    path: '/register',
    name: 'register'
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
