import { getAuth } from 'firebase/auth'
import { createRouter, createWebHistory } from 'vue-router'

const LoginPage = () => import('@/views/auth/LoginPage.vue')
const AppInner = () => import('@/views/app/AppInner.vue')
const NotFound = () => import('@/views/common/NotFoundPage.vue')

const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }
]

const auth = getAuth()
const appRoutes = [{ path: '/', name: 'AppInner', component: AppInner }]

let isLoggedIn = auth.currentUser !== null

const routes = [
  ...(isLoggedIn ? appRoutes : authRoutes),
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach(async (to, _, next) => {
  const user = auth.currentUser
  if (user) {
    isLoggedIn = true
    if (to.name === 'Login') {
      next({ name: 'AppInner' })
    } else {
      next()
    }
  } else {
    isLoggedIn = false
    if (to.name !== 'Login') {
      next({ name: 'Login' })
    } else {
      next()
    }
  }
})

export default router
