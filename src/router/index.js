import { createRouter, createWebHistory } from 'vue-router'
import EstatesView from '../views/EstatesView.vue'
import axios from '@/http-common'

const routes = [
  {
    path: '/',
    name: 'home',
    component: EstatesView
  },
  {
    path: '/estate/:estateId',
    name: 'estate',
    component: () => import('../views/EstateView.vue'),
    props: true
  },
  {
    path: '/myReservation',
    name: 'reservations',
    component: () => import('../views/ReservationsView.vue'),
  },
  {
    path: '/myContracts',
    name: 'contracts',
    component: () => import('../views/ContractsView.vue'),
  },
  {
    path: '/myInfo',
    name: 'information',
    component: () => import('../views/InformationView.vue'),
  },
  {
    path: '/auth/register',
    name: 'register',
    component: () => import('../views/AuthViews/RegisterView.vue')
  },
  {
    path: '/auth/login',
    name: 'login',
    component: () => import('../views/AuthViews/LoginView.vue')
  },
  {
    path: '/forgetPassword',
    name: 'forgetPassword',
    component: () => import('../views/AuthViews/ForgetPasswordView.vue')
  },
  {
    path: '/checkCode',
    name: 'checkCode',
    component: () => import('../views/AuthViews/CheckCodeView.vue')
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: () => import('../views/AuthViews/ChangePasswordView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
