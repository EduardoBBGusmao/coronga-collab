import Vue from 'vue';
import App from './App.vue';

const socket = new WebSocket('ws://192.168.0.16:3000');

Vue.prototype.$socket = socket;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
