import Vue from 'vue'
import Router from 'vue-router'
import Agenda from './views/Agenda.vue'
import Consulta from './views/Consulta.vue'
import Login from './views/Login.vue'
import Pacientes from './views/Pacientes.vue'
import Questionarios from './views/Questionarios.vue'
import Configuracoes from './views/Configuracoes.vue'

import PaginaNaoEncontrada from './views/PaginaNaoEncontrada.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'agenda',
      component: Agenda
    },
    {
      path: '/consulta',
      name: 'consulta',
      component: Consulta
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    {
      path: '/pacientes',
      name: 'pacientes',
      component: Pacientes
    },
    {
      path: '/questionarios',
      name: 'questionarios',
      component: Questionarios
    },
    {
      path: '/configuracoes',
      name: 'configuracoes',
      component: Configuracoes
    },
    {
      path: '*',
      name: 'pageNotFound',
      component: PaginaNaoEncontrada
    }
  ]
})
