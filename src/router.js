import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', component: Home },
    { path: '/practice', component: () => import('./views/Practice.vue') },
    { path: '/exam', component: () => import('./views/Exam.vue') },
    { path: '/flashcards', component: () => import('./views/Flashcards.vue') },
    { path: '/notes', component: () => import('./views/Notes.vue') },
    { path: '/progress', component: () => import('./views/Progress.vue') },
    { path: '/settings', component: () => import('./views/Settings.vue') },
    { path: '/login', component: () => import('./views/Login.vue') },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})
