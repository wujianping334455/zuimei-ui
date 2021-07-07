<template>
  <i :class="`z-icon-${name}`" v-if="!isSvg"></i>
  <svg
    viewBox="0 0 1024 1024"
    class="z-svg-icon"
    v-if="isSvg"
    v-html="svgIcon"
    :style="{
      stroke: iconColor,
      fill: iconColor,
      width: iconSize,
      height: iconSize,
    }"
  ></svg>
</template>

<script>
import { defineComponent, computed } from "vue";
import { IconTypes } from "./constants.ts";

export default defineComponent({
  name: "ZIcon",
  props: {
    name: {
      type: String,
      default: "",
    },
    isSvg: {
      type: Boolean,
      default: false,
    },
    size: {
      default: "24",
    },
    color: {
      type: String,
      default: "currentColor",
    },
  },
  setup(props) {
    const svgIcon = computed(() => {
      return IconTypes[props.name];
    });
    const iconSize = computed(() => {
      return props.size.toString().endsWith("px")
        ? props.size
        : props.size + "px";
    });
    const iconColor = computed(() => {
      return props.color;
    });
    return {
      svgIcon,
      iconSize,
      iconColor,
    };
  },
});
</script>
