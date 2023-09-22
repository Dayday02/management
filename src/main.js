import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router';
import VueRouter from 'vue-router'
import store from './store/index'
import './api/mock'
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI);
new Vue({
  router,
  store,
  created(){
    store.commit('addMenu',this.$router)
  },
  render: h => h(App),
}).$mount('#app')
