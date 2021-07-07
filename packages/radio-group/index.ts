import { App } from 'vue';
import RadioRroup from './src/radio-group.vue';

RadioRroup.install = (app:App): void => {
    app.component(RadioRroup.name,RadioRroup); // 注册全局组件
}
type IWithInstall<T> = T & { install(app:App): void };
const _Input: IWithInstall<typeof RadioRroup> = RadioRroup;
export default _Input;
