import { defineComponent, ref, openBlock, createBlock, withDirectives, createVNode, mergeProps, vModelText } from 'vue';

var script = defineComponent({
    name: "ZTextarea",
    emits: ["update:modelValue", "focus", "input", "change", "blur"],
    props: {
        modelValue: [String, Number],
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
        },
        autoHeight: Boolean,
        rows: [Number, String]
    },
    setup(props, cnt) {
        const lineHeight = 25;
        const curHeight = ref(props.rows * lineHeight);
        const curValue = ref(props.modelValue);
        const setCurValue = (value) => {
            curValue.value = value;
        };
        const handleFocus = (event) => {
            cnt.emit("focus", event, curValue.value);
        };
        const handleInput = (e) => {
            const target = e.target;
            cnt.emit("input", e, curValue.value);
            setCurValue(curValue.value);
            cnt.emit("change", e, curValue.value);
            cnt.emit("update:modelValue", curValue.value);
            if (props.autoHeight) {
                let height = parseInt(getComputedStyle(target).height.slice(0, -2), 10);
                if (target?.scrollHeight > height) {
                    target.style.height = `${target.scrollHeight}`;
                }
                else {
                    while (height >= target.scrollHeight) {
                        target.style.height = `${height - lineHeight}px`;
                        height -= lineHeight;
                    }
                    target.style.height = `${height + lineHeight}px`;
                }
                if (props.rows * lineHeight < target.scrollHeight) {
                    curHeight.value = target.scrollHeight;
                }
                else {
                    curHeight.value = props.rows * lineHeight;
                }
            }
        };
        const handleBlur = (event) => {
            cnt.emit("blur", event, curValue.value);
        };
        return {
            curValue,
            curHeight,
            isRetina: window.devicePixelRatio && window.devicePixelRatio >= 2,
            setCurValue,
            handleFocus,
            handleInput,
            handleBlur
        };
    }
});

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createBlock("div", {
    class: [
      'z-textarea-wrapper',
      {
        'input-disabled': _ctx.disabled,
        'border-size-fix': _ctx.isRetina,
        'z-input-border': _ctx.border
      }
    ]
  }, [
    withDirectives(createVNode("textarea", mergeProps({
      class: "z-textarea",
      style: { height: `${_ctx.curHeight}px` }
    }, _ctx.$props, {
      "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (_ctx.curValue = $event)),
      name: _ctx.name,
      rows: _ctx.rows,
      autofocus: _ctx.autofocus,
      onInput: _cache[2] || (_cache[2] = (...args) => (_ctx.handleInput && _ctx.handleInput(...args))),
      onFocus: _cache[3] || (_cache[3] = (...args) => (_ctx.handleFocus && _ctx.handleFocus(...args))),
      onBlur: _cache[4] || (_cache[4] = (...args) => (_ctx.handleBlur && _ctx.handleBlur(...args)))
    }), null, 16 /* FULL_PROPS */, ["name", "rows", "autofocus"]), [
      [vModelText, _ctx.curValue]
    ])
  ], 2 /* CLASS */))
}

script.render = render;
script.__file = "packages/textarea/src/textarea.vue";

script.install = (app) => {
    app.component(script.name, script); // 注册全局组件
};
const _Input = script;

export default _Input;
