<template>
  <div class="input">
    <h3>Toast Demo page</h3>
    <div @click="handleClick">点击打开</div>
    <div @click="handleClose">点击关闭</div>
    <div @click="handleCloseAll">关闭所有</div>
    <div @click="handleToast">提示框</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Toast } from "z-ui";

export default defineComponent({
  name: "ZToastDemo",
  setup() {
    let instance: any;
    const handleClick = () => {
      instance = Toast("loading");
    };
    const handleClose = () => {
      instance.close();
    };
    const handleCloseAll = () => {
      Toast.clear();
    };
    const handleToast = () => {
      Toast({
        message: "温馨提示！",
        icon: "info"
      });
    };
    return {
      handleClick,
      handleClose,
      handleCloseAll,
      handleToast
    };
  }
});
</script>
