<template>
  <div
    :class="[
      'z-input-wrapper',
      {
        'input-disabled': disabled,
        'border-size-fix': isRetina,
        'z-input-border': border
      }
    ]"
  >
    <!-- 前置 slot -->
    <div class="z-input-prepend" v-if="$slots.prepend && title">
      <slot name="prepend"></slot>
    </div>
    <div
      :class="['z-input-prepend', `scui-prepend-length-${length}`]"
      v-if="title"
    >
      {{ title }}
    </div>
    <template v-if="$slots.prepend && !title">
      <div class="z-input-prepend">
        <slot name="prepend"></slot>
      </div>
      <div :class="['z-input-prepend', `scui-prepend-length-${length}`]">
        <slot name="prepend-title"></slot>
      </div>
    </template>

    <input
      class="z-input"
      v-bind="$props"
      v-model="curValue"
      :type="type"
      :name="name"
      :autofocus="autofocus"
      :maxlength="maxlength"
      :minlength="minlength"
      ref="input"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <!-- 清空 icon -->
    <div
      class="z-input-append scui-close-clear"
      v-if="isActive"
      @click="handleClear"
    >
      <z-icon icon="close-circle-fill" size="14" color="#ccc"></z-icon>
    </div>
    <!-- 后置 slot -->
    <div class="z-input-append" v-if="$slots.append">
      <slot name="append"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import ZIcon from "@z-ui/icon";

export default defineComponent({
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

    const setCurValue = (value: string | number | undefined) => {
      isActive.value = !!value;
      curValue.value = value;
    };

    const handleFocus = (event: Event) => {
      cnt.emit("focus", event);
    };

    const handleInput = () => {
      cnt.emit("input", curValue.value);
      setCurValue(curValue.value);
      cnt.emit("change", curValue.value);
    };

    const handleBlur = (event: Event) => {
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
</script>