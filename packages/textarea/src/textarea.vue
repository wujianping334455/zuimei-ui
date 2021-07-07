<template>
  <div
    :class="[
      'z-textarea-wrapper',
      {
        'input-disabled': disabled,
        'border-size-fix': isRetina,
        'z-input-border': border
      }
    ]"
  >
    <textarea
      class="z-textarea"
      :style="{ height: `${curHeight}px` }"
      v-bind="$props"
      v-model="curValue"
      :name="name"
      :rows="rows"
      :autofocus="autofocus"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    >
    </textarea>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
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
    const curHeight = ref((props.rows as number) * lineHeight);
    const curValue = ref(props.modelValue);

    const setCurValue = (value: string | number | undefined) => {
      curValue.value = value;
    };

    const handleFocus = (event: Event) => {
      cnt.emit("focus", event, curValue.value);
    };

    const handleInput = (e: InputEvent) => {
      const target = e.target as HTMLInputElement;
      cnt.emit("input", e, curValue.value);
      setCurValue(curValue.value);
      cnt.emit("change", e, curValue.value);
      cnt.emit("update:modelValue", curValue.value);
      if (props.autoHeight) {
        let height = parseInt(getComputedStyle(target).height.slice(0, -2), 10);
        if (target?.scrollHeight > height) {
          target.style.height = `${target.scrollHeight}`;
        } else {
          while (height >= target.scrollHeight) {
            target.style.height = `${height - lineHeight}px`;
            height -= lineHeight;
          }
          target.style.height = `${height + lineHeight}px`;
        }
        if ((props.rows as number) * lineHeight < target.scrollHeight) {
          curHeight.value = target.scrollHeight;
        } else {
          curHeight.value = (props.rows as number) * lineHeight;
        }
      }
    };

    const handleBlur = (event: Event) => {
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
</script>