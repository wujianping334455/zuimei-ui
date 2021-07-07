import { defineComponent, provide, openBlock, createBlock, renderSlot, createCommentVNode } from 'vue';

var script = defineComponent({
    name: "ZRadioGroup",
    props: {
        modelValue: [String, Number],
        name: {
            type: String,
            default: ""
        }
    },
    emits: ["update:modelValue"],
    setup(props, cnt) {
        provide("name", props.name);
        const updateValue = (value) => {
            cnt.emit("update:modelValue", value);
        };
        return {
            updateValue
        };
    }
});

const _hoisted_1 = {
  key: 0,
  class: "z-radio-group"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_ctx.$slots.default)
    ? (openBlock(), createBlock("div", _hoisted_1, [
        renderSlot(_ctx.$slots, "default")
      ]))
    : createCommentVNode("v-if", true)
}

script.render = render;
script.__file = "packages/radio-group/src/radio-group.vue";

script.install = (app) => {
    app.component(script.name, script); // 注册全局组件
};
const _Input = script;

export default _Input;
