import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'

Vue.use(VueAwesomeSwiper)

Vue.config.debug = true;

new Vue({
    el: '#app',
    template: "<App/>",
    components: {App}
});
