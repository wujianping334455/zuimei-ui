import { App } from 'vue';
import Radio from './src/radio.vue';

Radio.install = (app:App): void => {
    app.component(Radio.name,Radio); // 注册全局组件
}
type IWithInstall<T> = T & { install(app:App): void };
const _Input: IWithInstall<typeof Radio> = Radio;
export default _Input;
