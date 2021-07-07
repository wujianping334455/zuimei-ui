import { defineComponent, getCurrentInstance, inject, ref, computed, openBlock, createBlock, renderSlot, createCommentVNode } from 'vue';

var script = defineComponent({
    name: "ZRadio",
    emits: ["update:modelValue"],
    props: {
        value: {
            type: [String, Number],
            default: ""
        },
        disabled: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: ""
        },
        height: {
            type: Number,
            default: 30
        },
        width: {
            type: Number,
            default: 50
        }
    },
    setup(props, cnt) {
        const current = getCurrentInstance();
        const parent = current?.parent;
        const parentName = inject("name");
        const name = ref(parentName);
        const toggled = () => {
            return parent?.props.modelValue === props.value;
        };
        const className = computed(() => {
            const { disabled } = props;
            return ["z-radio", { toggled: toggled(), disabled }];
        });
        const style = computed(() => {
            const { width, height } = props;
            const distance = width - height + 3; // 开关滑动距离，有3px的补充
            return {
                height: height + "px",
                width: width + "px",
                distance: distance + "px"
            };
        });
        const toggle = () => {
            if (parent) {
                parent.emit("update:modelValue", props.value);
            }
            else {
                cnt.emit("update:modelValue", props.value);
            }
        };
        return {
            toggled,
            className,
            toggle,
            name,
            style
        };
    }
});

const _hoisted_1 = {
  key: 0,
  class: "z-circle-core"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("label", {
    class: _ctx.className,
    style: _ctx.style,
    name: _ctx.name,
    role: "radio",
    value: _ctx.value,
    onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.toggle && _ctx.toggle(...args)))
  }, [
    (_ctx.type === 'circle')
      ? (openBlock(), createBlock("span", _hoisted_1))
      : (_ctx.$slots.prepend)
        ? renderSlot(_ctx.$slots, "prepend", { key: 1 })
        : createCommentVNode("v-if", true),
    (_ctx.$slots.default)
      ? (openBlock(), createBlock("label", {
          key: 2,
          class: ['z-label', `z-label-${_ctx.type}`]
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2 /* CLASS */))
      : createCommentVNode("v-if", true)
  ], 14 /* CLASS, STYLE, PROPS */, ["name", "value"]))
}

script.render = render;
script.__file = "packages/radio/src/radio.vue";

script.install = (app) => {
    app.component(script.name, script); // 注册全局组件
};
const _Input = script;

export default _Input;
