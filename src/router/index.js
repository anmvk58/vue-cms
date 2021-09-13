import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const Breadcrumbs = () => import('@/views/Breadcrumbs')

//Foods
const FoodManager = () => import('@/views/foods/FoodManager')
const Test = () => import('@/views/foods/TestTable')

// Pages
const Login = () => import('@/views/pages/Login')

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            requireAuth: true,
          },
        },
        {
          path: 'breadcrumbs',
          name: 'Breadcrumbs',
          component: Breadcrumbs
        }
      ]
    },
    {
      path: "/foods",
      // redirect: "/foods/manager",
      name: "Foods",
      component: DefaultContainer,
      children: [
        {
          path: 'manager',
          name: 'Food Manager',
          component: FoodManager,
          meta: {
            requireAuth: true,
          }
        },
        {
          path: 'test',
          name: 'Food Manager 2',
          component: Test,
          meta: {
            requireAuth: true,
          }
        }
      ]
    },
    {
      path: "/pages",
      redirect: "/pages/404",
      name: "Pages",
      component: {
        render (c) { return c("router-view"); }
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: Login
        }
      ]
    }
  ]
})
