<template>
  <transition>
    <div class="toast" :class="curClass" v-show="visible" :style="styles">
      <div class="toast-inner">
        <span v-show="icon">
          <z-icon :name="icon" :size="iconSize" :color="iconColor" isSvg></z-icon>
        </span>
        <span class="toast-text" v-if="message">
          <z-icon
            v-if="preicon"
            :name="preicon"
            :size="preiconSize"
            :color="iconColor"
            isSvg
          ></z-icon>
          <em :class="[{ 'toast-text-preicon': preicon }]">{{ message }}</em>
        </span>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import ZIcon from '@z-ui/icon';

export default defineComponent({
  name: "Toast",
  props: {
    message: String,
    icon: {
      type: String,
      default: ""
    },
    styles: {
      type: Object,
      default: () => ({})
    },
    preicon: {
      type: String,
      default: ""
    },
    iconColor: {
      type: String,
      default: "#fff"
    }
  },
  components: {
    ZIcon
  },
  setup(props) {
    const preiconSize = ref(22);
    const visible = ref(false);

    const iconSize = computed(() => {
      let value = 32;
      if (props.icon && props.message) {
        value = 36;
      } else if (props.icon && !props.message) {
        value = 36;
      } else if (props.preicon && props.message) {
        value = 36;
      } else {
        value = 32;
      }
      return value;
    });

    const curClass = computed(() => {
      let classes = "";
      if (props.icon && props.message) {
        classes = "message-with-icon";
      } else if (props.icon && !props.message) {
        classes = "icon-only";
      } else if (props.preicon && props.message) {
        classes = "message-with-preicon";
      } else {
        classes = "";
      }
      return classes;
    });

    const setVisible = (flag: boolean) => {
      visible.value = flag;
    };

    return {
      visible,
      iconSize,
      preiconSize,
      curClass,
      setVisible
    };
  }
});
</script>