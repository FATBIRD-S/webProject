import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import cateGory from '../views/category.vue'
import categorylist from '../views/categorylist.vue'
import product from '../views/product.vue'
import buycart from '../views/buycart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: cateGory
  },
  {
      path: '/categorylist/:id',
      name: 'categorylist',
      component: categorylist,
      props: true
  },
  {
      path: '/product/:id',
      name: 'product',
      component: product,
      props: true
  },
  {
      path: '/buycart',
      name: 'buycart',
      component: buycart,
  }
  
]

const router = new VueRouter({
  routes
})

export default router
