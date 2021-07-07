<template>
  <label
    :class="className"
    :style="style"
    :name="name"
    role="radio"
    :value="value"
    @click="toggle"
  >
    <template v-if="type === 'circle'">
      <span class="z-circle-core"></span>
    </template>
    <template v-else-if="$slots.prepend">
      <slot name="prepend"></slot>
    </template>
    <label :class="['z-label', `z-label-${type}`]" v-if="$slots.default">
      <slot></slot>
    </label>
  </label>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  inject,
  getCurrentInstance,
  ComponentInternalInstance
} from "vue";

export default defineComponent({
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
    const current: ComponentInternalInstance | null = getCurrentInstance();
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
      } else {
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
</script>
