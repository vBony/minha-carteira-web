import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Cadastro from '../views/Cadastro.vue'
import Home from '../views/Home.vue'
import NaoEncontrado from '../views/NaoEncontrado.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/cadastro',
    name: 'Cadastro',
    component: Cadastro
  },
  {
    path:'/',
    name: 'Home',
    component: Home
  },
  {
    path:'/:pathMatch(.*)*',
    name: 'NaoEncontrado',
    component: NaoEncontrado
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
