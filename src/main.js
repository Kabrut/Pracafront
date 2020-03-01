import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vSelect from 'vue-select'
import axios from 'axios'
import store from './store/store'



Vue.use(axios)
Vue.component('v-select', vSelect)
Vue.use(BootstrapVue)
Vue.config.productionTip = false


Vue.prototype.$http = axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token; }

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')