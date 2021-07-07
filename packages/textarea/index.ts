import { App } from 'vue';
import Textarea from './src/textarea.vue';

Textarea.install = (app:App): void => {
    app.component(Textarea.name,Textarea); // 注册全局组件
}
type IWithInstall<T> = T & { install(app:App): void };
const _Input: IWithInstall<typeof Textarea> = Textarea;
export default _Input;
