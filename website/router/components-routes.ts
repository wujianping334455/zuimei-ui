import { RouteRecordRaw } from "vue-router";
import { toLine } from "../common/util";

const router: Array<RouteRecordRaw> = [];

const requireComponet = (require as any).context("../components", true, /\.vue$/);

requireComponet.keys().forEach((item: string) => {
  const name = item.replace("./", "").replace(".vue", "");
  const meta = requireComponet(item);
  console.log('name', name)
  router.push({
    path: `/${toLine(name)}`,
    name: `${name}`,
    meta,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "components" */ `../components/${name}.vue`
      )
  });
});

export default router;
