# Vue3Lazyload

A vue3 plugin for image lazyload.

## Server

Start server

```shell
yarn server
or
node ./server/index.js
or
nodemon ./server/index.js
```

## Example

Start example

```shell
yarn dev
```

## Usage

not published, please use native code.

`main.js`

```js
import { createApp } from "vue";
import VueLazyLoad from "./lazyload";

const app = createApp();
app.use(VueLazyLoad, {
  loading: "loading.gif",
  error: "error.jpg",
  preload: 1,
});
app.mount("#app");
```

`Example.vue`:

```html
<img v-lazy="xxx.jpg" />
```
