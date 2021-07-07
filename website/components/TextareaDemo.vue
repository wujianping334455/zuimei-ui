<template>
  <div class="input">
    <h3 @click="handler">Textarea Demo page</h3>
    <z-textarea
      title="标题标题："
      rows="1"
      border
      autoHeight
      @change="handleChange"
    />
    <z-textarea title="姓名：" rows="4" placeholder="请输入..." v-model="msg" />
    <z-textarea title="姓名：" rows="4" placeholder="请输入..." disabled />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ZTextareaDemo",
  setup() {
    const msg = ref("123123123");
    const handleChange = (e: InputEvent, value: string) => {
      console.log(e, value);
    };
    const handler = () => {
      console.log(msg.value);
    };
    return {
      handleChange,
      msg,
      handler
    };
  }
});
</script>
