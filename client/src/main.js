import Vue from 'vue';
import VueCodeMirror from 'vue-codemirror';
import App from './App.vue';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';

const socket = new WebSocket('ws://192.168.0.16:3000');

Vue.prototype.$socket = socket;

Vue.config.productionTip = false;

Vue.use(VueCodeMirror);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
