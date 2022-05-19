// @ts-nocheck

import Lazyimg from "./Lazyimg";
import { getScrollParent } from "./utils";

export default class Lazyload {
  constructor(options) {
    this.options = options;
    this.isAddScrollListener = false;
    this.lazyImgPool = [];
  }
  bindLazy(el, bindings, vnode) {
    const scrollParent = getScrollParent(el);

    // 是否已经给外层容器添加 scroll 监听事件
    // scroll 事件只绑定一次
    if (scrollParent && !this.isAddScrollListener) {
      scrollParent.addEventListener(
        "scroll",
        this.handleScroll.bind(this),
        false
      );
      this.isAddScrollListener = true;
    }

    // 绑定 v-lazy 的单个标签
    // <img v-lazy="xxx.jpg" />
    const lazyImg = new Lazyimg({
      el,
      src: bindings.value,
      options: this.options,
      imgRender: this.imgRender.bind(this),
    });

    // <img v-lazy="xxx.jpg" /> 集合
    this.lazyImgPool.push(lazyImg);
    this.handleScroll();
  }

  handleScroll() {
    // 检测每个 <img v-lazy="xxx.jpg" /> 是否在可视区域
    // 在可视区域内加载图片
    this.lazyImgPool.forEach((lazyImg) => {
      // 图片未加载出来后
      if (!lazyImg.loaded) {
        // 当图片在可视区域(window.innerHeight * (preload || 1))，加载图片
        lazyImg.checkIsVisible() && lazyImg.loadImg();
      }
    });
  }

  // 通过构造函数参数 imgRender 提供给 Lazyimg 类内部调用
  imgRender(lazyImg, state) {
    const { el, options } = lazyImg;
    const { loading, error } = options;
    let src = "";

    switch (state) {
      case "loading":
        src = loading || "";
        break;
      case "error":
        src = error || "";
        break;
      default:
        src = lazyImg.src;
        break;
    }

    el.setAttribute("src", src);
  }
}
