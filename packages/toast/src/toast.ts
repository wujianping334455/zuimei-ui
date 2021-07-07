import { createApp, nextTick } from "vue";
import { IMessageOpts } from './types'
import ToastVue from "./toast.vue";

interface GProps {
  duration?: number;
  icon?: string;
  preicon?: string;
  message?: string;
  styles?: object;
  iconColor?: string;
}
// eslint-disable-next-line
const toastPool: any[] = [];
const getAnInstance = (options: IMessageOpts) => {
  const props: GProps = {};
  // Toast('loading')语法糖处理
  if (typeof options === "string") {
    switch (options) {
      case "loading":
        props.icon = "loading";
        break;
      default:
        props.message = options;
        break;
    }
  } else {
    props.icon = options.icon || undefined;
    props.preicon = options.preicon || undefined;
    props.message = options.message || "";
    props.styles = options.style || { top: "46vh" };
    props.iconColor = options.iconColor || undefined;
    props.message = options.message;
  }
  // eslint-disable-next-line
  const ToastConstructor: any = createApp(ToastVue, {
    ...props
  });
  // 实例化
  const instance = ToastConstructor.mount(document.createElement("div"));
  if (instance) {
    toastPool.push(instance);
  }
  return instance;
};

function Toast(options: IMessageOpts) {
  let timer = null;
  const duration = typeof options === "string" ? 0 : options.duration || 2500;
  const instance = getAnInstance(options);
  if (timer) {
    clearTimeout(timer);
  }
  // DOM插入页面
  document.body.appendChild(instance.$el);
  // 显示toast
  nextTick(function() {
    instance.setVisible(true);
    if (duration > 0) {
      timer = setTimeout(function() {
        // if (instance.closed) return;
        instance.setVisible(false);
      }, duration);
    }
  });
  // 关闭
  instance.close = function() {
    this.setVisible(false);
  };
  return instance;
}
Toast.default = Toast;
// 清空：所有toast都移除
Toast.clear = function() {
  if (toastPool && toastPool.length) {
    toastPool.forEach(item => {
      item.setVisible(false);
      item.$el.parentNode.removeChild(item.$el);
    });
    toastPool.length = 0;
  }
};

export default Toast;
