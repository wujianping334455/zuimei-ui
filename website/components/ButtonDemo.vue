<template>
  <div class="button">
    <h1>Button Demo page</h1>
    <z-button @click="handleClick" class="customs">按钮</z-button>
    <z-button @click="handleClick" long>按钮</z-button>
    <z-button @click="handleClick" long>按钮</z-button>
    <z-button disabled>禁用</z-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonDemo",
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
