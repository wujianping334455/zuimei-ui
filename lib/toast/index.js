import { defineComponent, ref, computed, resolveComponent, openBlock, createBlock, Transition, withCtx, withDirectives, createVNode, vShow, createCommentVNode, toDisplayString, nextTick, createApp } from 'vue';
import ZIcon from '@z-ui/icon';

var script = defineComponent({
    name: "Toast",
    props: {
        message: String,
        icon: {
            type: String,
            default: ""
        },
        styles: {
            type: Object,
            default: () => ({})
        },
        preicon: {
            type: String,
            default: ""
        },
        iconColor: {
            type: String,
            default: "#fff"
        }
    },
    components: {
        ZIcon
    },
    setup(props) {
        const preiconSize = ref(22);
        const visible = ref(false);
        const iconSize = computed(() => {
            let value = 32;
            if (props.icon && props.message) {
                value = 36;
            }
            else if (props.icon && !props.message) {
                value = 36;
            }
            else if (props.preicon && props.message) {
                value = 36;
            }
            else {
                value = 32;
            }
            return value;
        });
        const curClass = computed(() => {
            let classes = "";
            if (props.icon && props.message) {
                classes = "message-with-icon";
            }
            else if (props.icon && !props.message) {
                classes = "icon-only";
            }
            else if (props.preicon && props.message) {
                classes = "message-with-preicon";
            }
            else {
                classes = "";
            }
            return classes;
        });
        const setVisible = (flag) => {
            visible.value = flag;
        };
        return {
            visible,
            iconSize,
            preiconSize,
            curClass,
            setVisible
        };
    }
});

const _hoisted_1 = { class: "toast-inner" };
const _hoisted_2 = {
  key: 0,
  class: "toast-text"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_z_icon = resolveComponent("z-icon");

  return (openBlock(), createBlock(Transition, null, {
    default: withCtx(() => [
      withDirectives(createVNode("div", {
        class: ["toast", _ctx.curClass],
        style: _ctx.styles
      }, [
        createVNode("div", _hoisted_1, [
          withDirectives(createVNode("span", null, [
            createVNode(_component_z_icon, {
              name: _ctx.icon,
              size: _ctx.iconSize,
              color: _ctx.iconColor
            }, null, 8 /* PROPS */, ["name", "size", "color"])
          ], 512 /* NEED_PATCH */), [
            [vShow, _ctx.icon]
          ]),
          (_ctx.message)
            ? (openBlock(), createBlock("span", _hoisted_2, [
                (_ctx.preicon)
                  ? (openBlock(), createBlock(_component_z_icon, {
                      key: 0,
                      name: _ctx.preicon,
                      size: _ctx.preiconSize,
                      color: _ctx.iconColor,
                      isSvg: ""
                    }, null, 8 /* PROPS */, ["name", "size", "color"]))
                  : createCommentVNode("v-if", true),
                createVNode("em", {
                  class: [{ 'toast-text-preicon': _ctx.preicon }]
                }, toDisplayString(_ctx.message), 3 /* TEXT, CLASS */)
              ]))
            : createCommentVNode("v-if", true)
        ])
      ], 6 /* CLASS, STYLE */), [
        [vShow, _ctx.visible]
      ])
    ]),
    _: 1 /* STABLE */
  }))
}

script.render = render;
script.__file = "packages/toast/src/toast.vue";

// eslint-disable-next-line
const toastPool = [];
const getAnInstance = (options) => {
    const props = {};
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
    }
    else {
        props.icon = options.icon || undefined;
        props.preicon = options.preicon || undefined;
        props.message = options.message || "";
        props.styles = options.style || { top: "46vh" };
        props.iconColor = options.iconColor || undefined;
        props.message = options.message;
    }
    // eslint-disable-next-line
    const ToastConstructor = createApp(script, {
        ...props
    });
    // 实例化
    const instance = ToastConstructor.mount(document.createElement("div"));
    if (instance) {
        toastPool.push(instance);
    }
    return instance;
};
function Toast(options) {
    let timer = null;
    const duration = typeof options === "string" ? 0 : options.duration || 2500;
    const instance = getAnInstance(options);
    if (timer) {
        clearTimeout(timer);
    }
    // DOM插入页面
    document.body.appendChild(instance.$el);
    // 显示toast
    nextTick(function () {
        instance.setVisible(true);
        if (duration > 0) {
            timer = setTimeout(function () {
                // if (instance.closed) return;
                instance.setVisible(false);
            }, duration);
        }
    });
    // 关闭
    instance.close = function () {
        this.setVisible(false);
    };
    return instance;
}
Toast.default = Toast;
// 清空：所有toast都移除
Toast.clear = function () {
    if (toastPool && toastPool.length) {
        toastPool.forEach(item => {
            item.setVisible(false);
            item.$el.parentNode.removeChild(item.$el);
        });
        toastPool.length = 0;
    }
};

Toast.install = (app) => {
    // 兼容vue2 - 可以用this.$toast
    app.config.globalProperties.$toast = Toast;
};

export default Toast;
export { Toast };
