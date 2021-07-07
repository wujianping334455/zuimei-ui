import { App } from 'vue';
import Input from './src/input.vue';

Input.install = (app: App): void => {
    app.component(Input.name, Input); // 注册全局组件
}
type IWithInstall<T> = T & { install(app: App): void };
const _Input: IWithInstall<typeof Input> = Input;
export default _Input;
