<template>
  <div class="home">
    <div v-for="(route, index) in routes" :key="index">
      <div class="list-item" @click="clickHandler(route)">
        {{ route.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteRecordRaw, useRouter } from "vue-router";
import componentsRoutes from "../router/components-routes";

export default defineComponent({
  name: "Home",
  setup() {
    const router = useRouter();
    const routes = componentsRoutes;
    const clickHandler = (item: RouteRecordRaw) => {
      router.push(item.path);
    };
    return {
      routes,
      clickHandler
    };
  }
});
</script>
<style scoped lang="scss">
.home {
  .list-item {
    height: 50px;
    line-height: 50px;
    border-bottom: solid 1px #eee;
  }
}
</style>
