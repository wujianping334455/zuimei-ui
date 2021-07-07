<template>
  <div class="input">
    <h3>Input Demo page</h3>
    <z-input title="标题：" length="3" border />
    <z-input title="标题：" length="3" placeholder="请输入名称..." />
    <z-input title="标题：" length="3" placeholder="请输入名称..." disabled />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "InputDemo",
  setup() {
    const handleClick = (e: Event) => {
      console.log(e);
    };
    return {
      handleClick
    };
  }
});
</script>
