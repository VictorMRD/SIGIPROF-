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
          },
          {
            path: ':id/agregar-autores',
            name: 'publications-authors',
            component: () => import('@/views/publications/add-authors.vue')
          }
        ]
      },
      {
        path: '/cursos',
        name: 'courses',
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            name: 'courses-index',
            component: () => import('@/views/courses/index.vue')
          },
          {
            path: 'index',
            name: 'courses',
            component: () => import('@/views/courses/index.vue')
          },
          {
            path: 'crear',
            name: 'courses-create',
            component: () => import('@/views/courses/create.vue')
          },
          {
            path: ':id/editar',
            name: 'courses-edit',
            component: () => import('@/views/courses/edit.vue')
          },
          {
            path: ':id/visualizar',
            name: 'courses-view',
            component: () => import('@/views/courses/view.vue')
          }
        ]
      },
      {
        path: '/proyectos',
        name: 'projects',
        meta: { requiresAuth: true },
        children: [
          {
            path: '',
            name: 'projects-index',
            component: () => import('@/views/projects/index.vue')
          },
          {
            path: 'index',
            name: 'projects',
            component: () => import('@/views/projects/index.vue')
          },
          {
            path: 'crear',
            name: 'projects-create',
            component: () => import('@/views/projects/create.vue')
          },
          {
            path: ':id/editar',
            name: 'projects-edit',
            component: () => import('@/views/projects/edit.vue')
          },
          {
            path: ':id/visualizar',
            name: 'projects-view',
            component: () => import('@/views/projects/view.vue')
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
          },
          {
            path: 'crear',
            name: 'books-create',
            component: () => import('@/views/books/create.vue')
          },
          {
            path: ':id',
            name: 'books-view',
            component: () => import('@/views/books/view.vue')
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
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

export default routes
