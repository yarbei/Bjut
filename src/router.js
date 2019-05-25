import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import('./views/Home.vue'),
    },
    {
      path: '/article',
      name: 'article',
      component: () =>
        import('./views/Article.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import('./views/Login.vue'),
    },
    {
      path: '/userCenter',
      name: 'userCenter?id=8',
      component: () =>
        import('./views/UserCenter.vue'),
      meta: {
        title: 'User Center'
      },
      children: [{
        path: '/',
        name: 'userCenter',
        component: () =>
          import('./views/UserCenterDefult.vue')
      },
      {
        path: '/userInfo',
        name: 'userInfo?id=8',
        component: () =>
          import('./views/UserInfo.vue'),
        meta: {
          title: 'Personal Information'
        }
      }
      ]
    },
  ]
})
