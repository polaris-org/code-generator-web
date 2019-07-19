import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import ElementUI from 'element-ui'
import 'iview/dist/styles/iview.css'


import Home from '@/components/Home'
import Animation from '@/components/Animation'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Project from '@/components/Project'
import ProjectCreate from '@/components/ProjectCreate'
import ProjectUpdate from '@/components/ProjectUpdate'
import Template from '@/components/Template'
import TemplateCreate from '@/components/TemplateCreate'
import TemplateUpdate from '@/components/TemplateUpdate'
import Generate from '@/components/Generate'
import Instructions from '@/components/Instructions'
import Grammar from '@/components/Grammar'


Vue.use(Router)
Vue.use(iView)
Vue.use(ElementUI)


var r = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[,
        {
          path: '/project',
          name: 'Project',
          component: Project
        },
        {
          path: '/project/create',
          name: 'ProjectCreate',
          component: ProjectCreate
        },
        {
          path: '/project/update',
          name: 'ProjectUpdate',
          component: ProjectUpdate
        },
        {
          path: '/template',
          name: 'Template',
          component: Template
        },
        {
          path: '/template/create',
          name: 'TemplateCreate',
          component: TemplateCreate
        },
        {
          path: '/template/update',
          name: 'TemplateUpdate',
          component: TemplateUpdate
        },
        {
          path: '/template/generate',
          name: 'Generate',
          component: Generate
        },
        {
          path: '/instructions',
          name: 'Instructions',
          component: Instructions
        },
        {
          path: '/grammar',
          name: 'Grammar',
          component: Grammar
        }]
    },
    {
      path: '/animation/:id',
      name: 'Animation',
      component: Animation
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

r.beforeEach((to, from, next) => {
  if(localStorage.getItem("token") || to.name =="Login" || to.name == "Register"){
    next()
  }else{
    next({
      path:"/Login"
    })
  }
  next();
})

export default r
