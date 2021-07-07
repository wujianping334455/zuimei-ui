<template>
  <div class="icon">
    <h3>Icon Demo page</h3>
    <z-icon color="red" name="loading" size="36" isSvg></z-icon>
    <z-icon color="red" name="search"></z-icon>
    <z-icon color="red" name="service" isSvg></z-icon>
    <z-icon color="red" name="eyes" isSvg></z-icon>
    <z-icon color="red" name="eyesHide" isSvg></z-icon>
    <z-icon color="red" name="loading" isSvg></z-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconDemo"
});
</script>
