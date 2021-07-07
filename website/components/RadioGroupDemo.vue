<template>
  <div class="input">
    <h3 @click="handleClick">RadioGroup Demo page</h3>
    <z-radio-group v-model="value" name="RadioGroup">
      <z-radio value="1" type="circle" />
      <z-radio value="2" type="circle" />
      <z-radio value="3" type="circle" />
    </z-radio-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";


export default defineComponent({
  name: "ZRadioGroupDemo",
  setup() {
    const value = ref("2");
    const handleClick = () => {
      console.log("handleClick", value.value);
    };
    return {
      handleClick,
      value
    };
  }
});
</script>
