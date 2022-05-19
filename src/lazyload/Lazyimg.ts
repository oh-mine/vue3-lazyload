// @ts-nocheck

import { imgLoad } from "./utils";

export default class Lazyimg {
  constructor({ el, src, options, imgRender }) {
    this.el = el;
    this.src = src;
    // { loading: "xxx.jpg", error: "xxx.jpg" }
    this.options = options;
    this.imgRender = imgRender;
    this.loaded = false;

    this.state = {
      loading: false,
      error: false,
    };
  }

  checkIsVisible() {
    const { top } = this.el.getBoundingClientRect();
    return top < window.innerHeight * (this.options.preload || 1);
  }

  // 请求图片：loading.gif => success.jpg
  //                     => error.jpg
  loadImg() {
    this.imgRender(this, "loading");

    // 请求图片资源，获取成功执行渲染函数
    imgLoad(this.src)
      // 请求成功
      .then(() => {
        this.state.loading = true;
        this.imgRender(this, "ok");
      })
      // 请求失败
      .catch(() => {
        this.state.error = true;
        this.imgRender(this, "error");
      })
      .finally(() => {
        this.loaded = true;
      });
  }
}
