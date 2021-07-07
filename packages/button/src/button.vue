<template>
  <button
    :disabled="disabled"
    class="z-button"
    @touchstart="toggleActive"
    @click="handleClick"
    :autofocus="autofocus"
    :class="classez"
    :style="{
      width: buttonWidth,
      height: buttonHeight,
    }"
  >
    <icon :icon="icon" v-if="icon && !loading" size="20"></icon>
    <icon
      icon="loading"
      v-if="loading && type"
      size="20"
      color="#27a5f9"
    ></icon>
    <icon icon="loading" v-if="loading && !type" size="20"></icon>
    <span class="button-text" v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
type IButtonType =
  | "primary"
  | "warning"
  | "danger"
  | "default"
  | "info"
  | "success";

export default defineComponent({
  name: "ZButton",
  props: {
    type: {
      type: String as PropType<IButtonType>,
      default: "primary",
      vaildator: (val: string) => {
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
    const toggleActive: () => void = (): void => {
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
</script>
