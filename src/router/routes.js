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
            name: 'publications-index',
            component: () => import('@/views/publications/index.vue')
          },
          {
            path: 'index',
            name: 'publications',
            component: () => import('@/views/publications/index.vue')
          },
          {
            path: 'crear',
            name: 'publications-create',
            component: () => import('@/views/publications/create.vue')
          },
          {
            path: ':id/editar',
            name: 'publications-edit',
            component: () => import('@/views/publications/edit.vue')
          },
          {
            path: ':id/visualizar',
            name: 'publications-view',
            component: () => import('@/views/publications/view.vue')
          }
        ]
      },
      {
        path: '/capacitaciones',
        name: 'capacitations',
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            name: 'capacitations-index',
            component: () => import('@/views/capacitations/index.vue')
          },
          {
            path: 'index',
            name: 'capacitations',
            component: () => import('@/views/capacitations/index.vue')
          },
          {
            path: 'crear',
            name: 'capacitations-create',
            component: () => import('@/views/capacitations/create.vue')
          },
          {
            path: ':id/editar',
            name: 'capacitations-edit',
            component: () => import('@/views/capacitations/edit.vue')
          },
          {
            path: ':id/visualizar',
            name: 'capacitations-view',
            component: () => import('@/views/capacitations/view.vue')
          }
        ]
      },
      {
        path: '/libros',
        name: 'books',
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            name: 'books',
            component: () => import('@/views/books/index.vue')
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
