// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/scss/iconfont/iconfont.css';
import Vue from 'vue'
import App from './App'
import router from './router';
import store from './store'
import 'lib-flexible/flexible.js' //移动端适配
Vue.use(require('vue-wechat-title'))
import {
  Lazyload,
  Toast,
  Tag,
  Dialog,
  Cell,
  SwipeCell,
  CellGroup,
  Field,
  Icon,
  Button,
  Popup,
  loading,
  List,
  Search,
  Tab,
  Tabs,
  Checkbox,
  CheckboxGroup,
  NavBar,
  Row, 
  Col
} from 'vant';

// vant
// Vue.use(Lazyload, {
//   preLoad: 1.3,
//   error: '/static/img/goods_default.png',
//   loading: '/static/img/goods_default.png',
//   attempt: 1,
//   listenEvents: ['scroll'],
//   lazyComponent: true,
// });

Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Cell);
Vue.use(SwipeCell);
Vue.use(CellGroup);
Vue.use(Field);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Popup);
Vue.use(loading);
Vue.use(List);
Vue.use(Search);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(NavBar);
Toast.setDefaultOptions({
  duration: 1500
})
Vue.use(Toast);
Vue.use(Row);
Vue.use(Col);


Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
