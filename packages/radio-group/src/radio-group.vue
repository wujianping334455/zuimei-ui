<template>
  <div class="z-radio-group" v-if="$slots.default">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { provide, defineComponent } from "vue";

export default defineComponent({
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
    const updateValue = (value: unknown) => {
      cnt.emit("update:modelValue", value);
    };
    return {
      updateValue
    };
  }
});
</script>
