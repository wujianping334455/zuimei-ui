import { defineComponent, ref, resolveComponent, openBlock, createBlock, createCommentVNode, renderSlot, toDisplayString, Fragment, createVNode, withDirectives, mergeProps, vModelDynamic } from 'vue';
import ZIcon from '@z-ui/icon';

var script = defineComponent({
    name: "ZInput",
    components: {
        ZIcon
    },
    props: {
        type: {
            type: String,
            default: "text"
        },
        length: {
            type: String,
            default: "4"
        },
        title: [String],
        value: [String, Number],
        placeholder: {
            type: String,
            default: ""
        },
        readonly: Boolean,
        disabled: Boolean,
        autofocus: Boolean,
        border: Boolean,
        name: String,
        form: String,
        maxlength: Number,
        minlength: Number,
        autoComplete: {
            type: String,
            default: "off"
        }
    },
    setup(props, cnt) {
        const isActive = ref(!!props.value);
        const curValue = ref(props.value);
        const setCurValue = (value) => {
            isActive.value = !!value;
            curValue.value = value;
        };
        const handleFocus = (event) => {
            cnt.emit("focus", event);
        };
        const handleInput = () => {
            cnt.emit("input", curValue.value);
            setCurValue(curValue.value);
            cnt.emit("change", curValue.value);
        };
        const handleBlur = (event) => {
            cnt.emit("blur", event);
        };
        const handleClear = () => {
            setCurValue("");
        };
        return {
            curValue,
            isActive,
            isRetina: window.devicePixelRatio && window.devicePixelRatio >= 2,
            setCurValue,
            handleFocus,
            handleInput,
            handleClear,
            handleBlur
        };
    }
});

const _hoisted_1 = {
  key: 0,
  class: "z-input-prepend"
};
const _hoisted_2 = { class: "z-input-prepend" };
const _hoisted_3 = {
  key: 4,
  class: "z-input-append"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_z_icon = resolveComponent("z-icon");

  return (openBlock(), createBlock("div", {
    class: [
      'z-input-wrapper',
      {
        'input-disabled': _ctx.disabled,
        'border-size-fix': _ctx.isRetina,
        'z-input-border': _ctx.border
      }
    ]
  }, [
    createCommentVNode(" 前置 slot "),
    (_ctx.$slots.prepend && _ctx.title)
      ? (openBlock(), createBlock("div", _hoisted_1, [
          renderSlot(_ctx.$slots, "prepend")
        ]))
      : createCommentVNode("v-if", true),
    (_ctx.title)
      ? (openBlock(), createBlock("div", {
          key: 1,
          class: ['z-input-prepend', `scui-prepend-length-${_ctx.length}`]
        }, toDisplayString(_ctx.title), 3 /* TEXT, CLASS */))
      : createCommentVNode("v-if", true),
    (_ctx.$slots.prepend && !_ctx.title)
      ? (openBlock(), createBlock(Fragment, { key: 2 }, [
          createVNode("div", _hoisted_2, [
            renderSlot(_ctx.$slots, "prepend")
          ]),
          createVNode("div", {
            class: ['z-input-prepend', `scui-prepend-length-${_ctx.length}`]
          }, [
            renderSlot(_ctx.$slots, "prepend-title")
          ], 2 /* CLASS */)
        ], 64 /* STABLE_FRAGMENT */))
      : createCommentVNode("v-if", true),
    withDirectives(createVNode("input", mergeProps({ class: "z-input" }, _ctx.$props, {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.curValue = $event)),
      type: _ctx.type,
      name: _ctx.name,
      autofocus: _ctx.autofocus,
      maxlength: _ctx.maxlength,
      minlength: _ctx.minlength,
      ref: "input",
      onInput: _cache[2] || (_cache[2] = (...args) => (_ctx.handleInput && _ctx.handleInput(...args))),
      onFocus: _cache[3] || (_cache[3] = (...args) => (_ctx.handleFocus && _ctx.handleFocus(...args))),
      onBlur: _cache[4] || (_cache[4] = (...args) => (_ctx.handleBlur && _ctx.handleBlur(...args)))
    }), null, 16 /* FULL_PROPS */, ["type", "name", "autofocus", "maxlength", "minlength"]), [
      [vModelDynamic, _ctx.curValue]
    ]),
    createCommentVNode(" 清空 icon "),
    (_ctx.isActive)
      ? (openBlock(), createBlock("div", {
          key: 3,
          class: "z-input-append scui-close-clear",
          onClick: _cache[5] || (_cache[5] = (...args) => (_ctx.handleClear && _ctx.handleClear(...args)))
        }, [
          createVNode(_component_z_icon, {
            icon: "close-circle-fill",
            size: "14",
            color: "#ccc"
          })
        ]))
      : createCommentVNode("v-if", true),
    createCommentVNode(" 后置 slot "),
    (_ctx.$slots.append)
      ? (openBlock(), createBlock("div", _hoisted_3, [
          renderSlot(_ctx.$slots, "append")
        ]))
      : createCommentVNode("v-if", true)
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "packages/input/src/input.vue";

script.install = (app) => {
    app.component(script.name, script); // 注册全局组件
};
const _Input = script;

export default _Input;
