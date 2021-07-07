import {createApp } from 'vue';
import router from "./router";
import App from './App.vue'
import ZUI from 'z-ui'

import 'z-ui/lib/index.css'
// 创建应用 并使用组件库

createApp(App).use(router).use(ZUI).mount('#app');



