import { App } from 'vue';
import Toast from './src/toast';

(Toast as any).install = (app:App): void => {
    // 兼容vue2 - 可以用this.$toast
    app.config.globalProperties.$toast = Toast
}

export { Toast }

export default Toast;
