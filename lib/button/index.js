import { defineComponent, computed, resolveComponent, openBlock, createBlock, createCommentVNode, renderSlot } from 'vue';

var script = defineComponent({
    name: "ZButton",
    props: {
        type: {
            type: String,
            default: "primary",
            vaildator: (val) => {
                return [
                    "primary",
                    "warning",
                    "danger",
                    "default",
                    "info",
                    "success",
                ].includes(val);
            },
        },
        icon: {
            type: String,
            default: "",
        },
        loading: Boolean,
        round: Boolean,
        width: {
            type: [String, Number],
            default: "100%",
        },
        height: {
            type: [String, Number],
            default: "44",
        },
        fixed: Boolean,
        disabled: Boolean,
        autofocus: Boolean,
        long: Boolean,
    },
    emits: ["click"],
    setup(props, ctx) {
        // instance 里面摘出了几个属性 给了ctx
        // 我们所有的组件都不会在用optionsApi (this) 全部采用compostionApi
        const classez = computed(() => [
            props.type ? "z-button-" + props.type : "",
            {
                "is-disabled": props.disabled,
                "is-loading": props.loading && !props.disabled,
                "is-long": props.long,
                "is-fixed": props.fixed
            },
        ]);
        const buttonWidth = computed(() => {
            return props.width.toString().endsWith("px")
                ? props.width
                : props.width + "px";
        });
        const buttonHeight = computed(() => {
            return props.height.toString().endsWith("px")
                ? props.height
                : props.height + "px";
        });
        const toggleActive = () => {
            return;
        };
        const handleClick = (e) => {
            ctx.emit("click", e);
        };
        return {
            classez,
            buttonWidth,
            buttonHeight,
            handleClick,
            toggleActive,
        };
    },
});

const _hoisted_1 = {
  key: 3,
  class: "button-text"
};

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_icon = resolveComponent("icon");

  return (openBlock(), createBlock("button", {
    disabled: _ctx.disabled,
    class: ["z-button", _ctx.classez],
    onTouchstart: _cache[1] || (_cache[1] = (...args) => (_ctx.toggleActive && _ctx.toggleActive(...args))),
    onClick: _cache[2] || (_cache[2] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args))),
    autofocus: _ctx.autofocus,
    style: {
      width: _ctx.buttonWidth,
      height: _ctx.buttonHeight,
    }
  }, [
    (_ctx.icon && !_ctx.loading)
      ? (openBlock(), createBlock(_component_icon, {
          key: 0,
          icon: _ctx.icon,
          size: "20"
        }, null, 8 /* PROPS */, ["icon"]))
      : createCommentVNode("v-if", true),
    (_ctx.loading && _ctx.type)
      ? (openBlock(), createBlock(_component_icon, {
          key: 1,
          icon: "loading",
          size: "20",
          color: "#27a5f9"
        }))
      : createCommentVNode("v-if", true),
    (_ctx.loading && !_ctx.type)
      ? (openBlock(), createBlock(_component_icon, {
          key: 2,
          icon: "loading",
          size: "20"
        }))
      : createCommentVNode("v-if", true),
    (_ctx.$slots.default)
      ? (openBlock(), createBlock("span", _hoisted_1, [
          renderSlot(_ctx.$slots, "default")
        ]))
      : createCommentVNode("v-if", true)
  ], 46 /* CLASS, STYLE, PROPS, HYDRATE_EVENTS */, ["disabled", "autofocus"]))
}

script.render = render;
script.__file = "packages/button/src/button.vue";

script.install = (app) => {
    app.component(script.name, script); // 注册全局组件
};
const _Button = script;

export default _Button;
