import { createApp } from "vue";
import App from "./App.vue";
import VueLazyLoad from "./lazyload";

const app = createApp(App);
app.use(VueLazyLoad, {
  loading: "/src/assets/images/loading.gif",
  error: "/src/assets/images/error.jpg",
  preload: 1,
});
app.mount("#app");
