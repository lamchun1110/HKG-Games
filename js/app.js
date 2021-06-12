import Vue from 'vue/dist/vue';
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Setup ajax
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Vue = Vue;
Vue.use(BootstrapVue)
Vue.use(VueRouter)
// Define vue router

// Define route components
Vue.component('header-component', require('./components/Header.vue').default)
const Landing = Vue.component('landing-component', require('./pages/LandingComponent.vue')).default
const NewsDetail = Vue.component('news-detail-component', require('./pages/NewsDetailComponent.vue')).default
// Define routes
const routes = [
	{
		path: '/',
		component: Landing
	},
	{
		path: '/news/:id',
		component: NewsDetail
	}
]

// Create router instance and pass the `routes` option
const router = new VueRouter({
	mode: 'history',
	routes // Short form for `routes: routes`
})

// Create Vuejs instance with your settings
window.onload = () => {
	const app = new Vue({
		router
	}).$mount('#app'); // Point to html's div that you want to use Vuejs
}
