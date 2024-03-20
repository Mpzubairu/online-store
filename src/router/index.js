import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/template/AdminView.vue'
import AboutView from '../views/AboutView.vue'
import HomeView from '../views/HomeView.vue'
import Store from '../views/StoreView.vue'
import ShoppinCart from '../views/ShoppingView'
import SingleProduct from '../views/SingleProduct'
import Order from '../views/OrderView'
import AdminOrder from '../views/AdminOrderView'
import OrderPreview from '../views/OrderPreview.vue'
import ContactView from '../views/ContactView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/shop',
    name: 'store',
    component: Store
  },
  {
    path: '/cart',
    name: 'ShoppingCart',
    component: ShoppinCart
  },
  {
    path: '/preview/:id',
    name: 'SingleProduct',
    component: SingleProduct
  },
  {
    path: '/order',
    name: 'OrderView',
    component: Order
  },
  {
    path: '/contact',
    name: 'ContactView',
    component: ContactView
  },
  {
    path: '/about',
    name: 'AboutView',
    component: AboutView
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: Admin,
    children: [
      {
        path: '',
        name: 'AdminOrder',
        component: AdminOrder
      },
      {
        path: 'preview/:id',
        name: 'OrderPreview',
        component: OrderPreview
      }
    ]
  }

  // {
  //   // path: '/about',
  //   // name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

export default router
