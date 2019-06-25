import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import '@/assets/css/reset.css'
import '@/filters'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(ElementUI,{ locale })
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.prototype.params=function(parameter){
  var obj={
    keys:'ed1950c74039f988ae8e01709725b610'
  }
  var object={...obj,...parameter}
  return object
}


Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
