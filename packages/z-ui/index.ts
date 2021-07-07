import { App } from 'vue';
import Button from '@z-ui/button';
import Icon from '@z-ui/icon';
import Input from '@z-ui/input';
import Radio from '@z-ui/radio';
import RadioGroup from '@z-ui/radio-group';
import Textarea from '@z-ui/textarea';
import Toast from '@z-ui/toast'

const components = [
    Button,
    Icon,
    Input,
    Radio,
    RadioGroup,
    Textarea,
    Toast
]
const install = (app: App): void => {
    components.forEach(component => {
        app.component(component.name, component)
    })
}

export {
    Toast
}
// 在使用组件库的时候可以使用 createApp().use(XXX)
export default {
    install
}

// 组件库看效果的网址 -》 文档  =》 md -> webpack