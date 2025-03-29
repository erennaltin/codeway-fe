import { setAxiosAuthorizationToken } from '@/lib/axios'
import { AuthService } from '@/services/AuthService'
import { onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// Common
const SplashPage = () => import('@/views/common/SplashPage.vue')
const NotFound = () => import('@/views/common/NotFoundPage.vue')

// Auth
const LoginPage = () => import('@/views/auth/LoginPage.vue')

// App
const AppInner = () => import('@/views/app/AppInner.vue')
const Configurations = () => import('@/views/app/ConfigurationsPage.vue')
const ConfigurationEdit = () => import('@/views/app/ConfigurationEditPage.vue')

// Routes
const authRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }
]

const appRoutes = [
  {
    path: '/admin',
    name: 'AppInner',
    component: AppInner,
    children: [
      {
        path: '',
        name: 'Configurations',
        component: Configurations
      },
      {
        path: ':id',
        name: 'ConfigurationEdit',
        component: ConfigurationEdit,
        props: true
      }
    ]
  }
]

const routes = [
  { path: '/:pathMatch(.*)*', name: 'SplashPage', component: SplashPage },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

// Create router instance
export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

// Add navigation guards
router.beforeEach(async (to, _, next) => {
  const user = AuthService.getCurrentUser()
  if (user) {
    if (to.name === 'Login') {
      next({ name: 'AppInner' })
    } else {
      next()
    }
  } else {
    if (to.name !== 'Login') {
      next({ name: 'Login' })
    } else {
      next()
    }
  }
})

function updateRoutes(isAuthenticated: boolean) {
  if (isAuthenticated) {
    // Remove public routes
    router.getRoutes().forEach(route => {
      if (authRoutes.find(r => r.name === route.name)) {
        router.removeRoute(route?.name ?? '')
      }
    })

    // Add private routes
    appRoutes.forEach(route => {
      router.addRoute(route)
    })

    router.push('/admin') // Redirect after login
  } else {
    // Remove private routes
    router.getRoutes().forEach(route => {
      if (appRoutes.find(r => r.name === route.name)) {
        router.removeRoute(route?.name ?? '')
      }
    })

    // Add public routes
    authRoutes.forEach(route => {
      router.addRoute(route)
    })

    router.push('/login') // Redirect to login after logout
  }
}

// Initialize Firebase Auth
export const isAuthenticated = ref(false)
const auth = AuthService.getAuth()
auth.authStateReady().then(async () => {
  const user = auth.currentUser
  if (user) {
    const accessToken = await user.getIdToken()
    setAxiosAuthorizationToken(accessToken, user.uid)
    isAuthenticated.value = true
    updateRoutes(true)
  } else {
    isAuthenticated.value = false
    updateRoutes(false)
  }
})

// Listen for authentication state changes
onAuthStateChanged(AuthService.getAuth(), async user => {
  if (user) {
    updateRoutes(true)
    const accessToken = await user.getIdToken()
    setAxiosAuthorizationToken(accessToken, user.uid)
  } else {
    updateRoutes(false)
  }
})
